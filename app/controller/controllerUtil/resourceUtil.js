'use strict';

const { BizError, errorInfoEnum } = require('../../constant/error');
const _ = require('lodash');
const validateUtil = require('../../common/validateUtil');
const commonUtil = require('../../common/commonUtil');

function validate(ctx, body) {
  const { resourceData, appDataSchema } = ctx.packageResource;
  const { operation } = resourceData;
  const appData = body.appData || {};
  const actionData = appData.actionData || {};

  if (
    ![
      'select',
      'insert',
      'update',
      'delete',
      'jhInsert',
      'jhUpdate',
      'jhDelete',
    ].includes(operation)
  ) {
    throw new BizError(errorInfoEnum.resource_sql_operation_invalid);
  }

  // 如果是更新或删除，需要指定条件
  if ([ 'update', 'delete', 'jhUpdate', 'jhDelete' ].includes(operation)) {
    let hasCondition = false;
    for (const conditionKey of [ 'where', 'whereLike', 'whereOrOption', 'whereOption', 'whereIn', 'whereKnex', 'rawSql' ]) {
      if (resourceData[conditionKey] || appData[conditionKey]) {
        hasCondition = true;
        break;
      }
    }
    if (!hasCondition) {
      throw new BizError(errorInfoEnum.resource_sql_need_condition);
    }
  }

  if (!_.isEmpty(appDataSchema)) {
    validateUtil.validate(appDataSchema, appData, 'appData');
  }

  // 创建 or 更新时不能指定 主键id ===> 避免无操作
  delete actionData.id;
}

async function getFieldListAfterExcluded(jianghuKnex, table, excludedFieldList) {
  const fieldDescs = await jianghuKnex.raw(`desc ${table}`);
  return fieldDescs[0].map(o => o.Field).filter(field => !excludedFieldList.includes(field));
}

/**
 * 构建 Where 语句
 * @param jianghuKnex
 * @param ctx
 * @param requestBody
 */
async function buildWhereCondition(jianghuKnex, ctx, requestBody) {
  const appData = requestBody.appData || {};
  const { resourceData, accessControlTable } = ctx.packageResource;
  const userInfo = ctx.userInfo || {};
  const { userId } = userInfo || {};

  // insert 不需要 where 语句
  if (resourceData.operation === 'insert') {
    return '';
  }

  // 服务端部分，主要来自 resource 数据的 resourceData
  // 但如果配置了 dataAccessControl 数据，则以 dataAccessControl 的 resourceData 为准
  let accessControl = null;
  if (accessControlTable) {
    accessControl = await jianghuKnex(accessControlTable)
      .where({ userId })
      .first();
  }
  const backendResourceData = accessControl
    ? JSON.parse(accessControl.resourceData || '{}')
    : resourceData;
  backendResourceData.table = resourceData.table;
  backendResourceData.operation = resourceData.operation;
  const backendWhere = await buildWhereConditionFromResourceData(
    backendResourceData,
    ctx,
    userInfo
  );

  // 前端部分，来自前端传过来的 actionData，不支持部分参数
  delete appData.whereKnex;
  delete appData.fieldList;
  delete appData.excludedFieldList;
  delete appData.rawSql;
  const frontendWhere = await buildWhereConditionFromAppData(appData);

  return backendWhere + frontendWhere;
}

/**
 * 从 resourceData 构建 Where 语句
 * (ctx, userInfo 参数用于数据 eval 环境)
 * @param resourceData
 * @param ctx
 * @param userInfo
 */
// eslint-disable-next-line no-unused-vars
async function buildWhereConditionFromResourceData(
  resourceData,
  ctx,
  userInfo
) {
  if (!resourceData) {
    return '';
  }

  const backendAppData = {};
  // 如：{ "where": { "field1": "ctx.someData" } }
  [ 'where', 'whereLike', 'whereIn' ].forEach(appDataKey => {
    const expressionObject = resourceData[appDataKey];
    if (!expressionObject) {
      return;
    }
    const valueObject = {};
    _.forEach(expressionObject, (value, key) => {
      // eslint-disable-next-line no-eval
      valueObject[key] = commonUtil.eval({ evalString: value, ctx, userInfo });
    });
    backendAppData[appDataKey] = valueObject;
  });

  // 如：{ "whereOptions": "ctx.someList" }
  [ 'whereOptions', 'whereOrOptions' ].forEach(appDataKey => {
    const expressionObject = resourceData[appDataKey];
    if (!expressionObject) {
      return;
    }
    const valueObject = [];
    _.forEach(expressionObject, (value, key) => {
      const evalString = value[value.length - 1];
      // eslint-disable-next-line no-eval
      value[value.length - 1] = commonUtil.eval({ evalString, ctx, userInfo });
      valueObject.push(value);
    });
    backendAppData[appDataKey] = valueObject;
  });

  return buildWhereConditionFromAppData(backendAppData);
}

/**
 * 从 appData 构建 Where 语句
 *
 * @param appData
 * @param appData.where
 * @param appData.whereLike
 * @param appData.whereIn
 * @param appData.whereOptions
 * @param appData.whereOrOptions
 * @param appData.limit
 * @param appData.offset
 * @param appData.orderBy
 * @param appData.whereKnex
 */
async function buildWhereConditionFromAppData({
  where = {},
  whereLike = {},
  whereIn = {},
  whereOptions = [],
  whereOrOptions = [],
  whereKnex = '',
  limit,
  offset,
  orderBy = [],
}) {
  // where
  let wherePart = '';
  if (!_.isEmpty(where)) {
    wherePart = `.where(${JSON.stringify(where)})`;
  }

  // whereLike
  let whereLikePart = '';
  if (!_.isEmpty(whereLike)) {
    for (const key in whereLike) {
      const value = whereLike[key] || '';
      whereLikePart = whereLikePart + `.where('${key}', 'like', '%${value}%')`;
    }
  }

  // whereIn
  let whereInPart = '';
  if (!_.isEmpty(whereIn)) {
    Object.entries(whereIn).forEach(([ key, value ]) => {
      whereInPart += `.whereIn('${key}', ${JSON.stringify(value)})`;
    });
  }

  // whereOptions： [['name', '=', 'zhangshan'],['level', '>', 3],['a', 100]]
  let whereOptionsPart = '';
  if (!_.isEmpty(whereOptions)) {
    whereOptions.forEach(whereOption => {
      if (whereOption.length === 3) {
        whereOptionsPart += `.where('${whereOption[0]}', '${whereOption[1]}', '${whereOption[2]}')`;
      } else if (whereOption.length === 2) {
        whereOptionsPart += `.where('${whereOption[0]}', '${whereOption[1]}')`;
      } else {
        throw new BizError(errorInfoEnum.resource_sql_where_options_invalid);
      }
    });
  }

  // whereOrOptions，相当于 and ( statement1 or statement2 )
  //  [['name', '=', 'zhangshan'],['level', '>', 3],['a', 100]]
  let whereOrOptionsPart = '';
  if (!_.isEmpty(whereOrOptions)) {
    whereOrOptionsPart += '.where(function() { this';
    whereOrOptions.forEach(whereOrOption => {
      if (whereOrOption.length === 3) {
        whereOrOptionsPart += `.orWhere('${whereOrOption[0]}', '${whereOrOption[1]}', '${whereOrOption[2]}')`;
      } else if (whereOrOption.length === 2) {
        whereOrOptionsPart += `.orWhere('${whereOrOption[0]}', '${whereOrOption[1]}')`;
      } else {
        throw new BizError(errorInfoEnum.resource_sql_where_options_invalid);
      }
    });
    whereOrOptionsPart += '})';
  }

  // limit offset
  let limitAndOffset = '';
  if (limit) {
    limitAndOffset += `.limit(${limit})`;
  }
  if (offset) {
    limitAndOffset += `.offset(${offset})`;
  }

  // orderBy：.orderBy([{ column: 'email' }, { column: 'age', order: 'desc' }])
  let orderByPart = '';
  if (!_.isEmpty(orderBy)) {
    orderByPart = `.orderBy(${JSON.stringify(orderBy)})`;
  }

  return (
    wherePart +
    whereLikePart +
    whereInPart +
    whereOptionsPart +
    whereOrOptionsPart +
    whereKnex +
    orderByPart +
    limitAndOffset
  );
}

async function runKnexFunction(knexFunctionString, args = {}) {
  // eslint-disable-next-line no-empty-function
  const AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  const knexCommandCountFunc = new AsyncFunction(..._.keys(args), knexFunctionString);
  return await knexCommandCountFunc(..._.values(args));
}

/**
 * 执行 sql resource
 *
 * actionData 数据参数
 * where 基础 kv 结构查询条件，相当于 where k=v
 * whereLike 模糊查询，相当于 where k like v
 * whereOrOptions or查询
 * whereOptions jianghuKnex 原生的 where 三元查询
 * - [['name', '=', 'zhangshan'],['level', '>', 3]]
 * whereIn in查询
 * whereKnex 直接写 knex 语句，只在 resourceData 中有效
 * offset, limit 分页查询
 * - .limit(10).offset(30)
 * orderBy 排序
 * - .orderBy([{ column: 'email' }, { column: 'age', order: 'desc' }])
 * fieldList 要查询的字段，不传表示查询所有字段 (只能配在 resource 表中)
 * - ["id", ...]
 * excludedFieldList 不查询的字段
 * - ["secret", ...]
 * rawSql 原始查询
 *
 * @param root0
 * @param root0.jianghuKnex
 * @param root0.ctx
 */
async function sqlResource({ jianghuKnex, ctx }) {

  const requestBody = ctx.request.body;
  const appData = requestBody.appData || {};
  const actionData = appData.actionData || {};
  const { resourceData } = ctx.packageResource;
  const { table, operation, excludedFieldList, rawSql } = resourceData;
  let { fieldList } = resourceData;
  const { limit } = appData;

  if (rawSql) {
    const rows = await jianghuKnex.raw(rawSql);
    return { rows: rows[0], count: rows[0].length };
  }

  // 校验并处理数据
  validate(ctx, requestBody);

  if (!fieldList && excludedFieldList) {
    fieldList = await getFieldListAfterExcluded(jianghuKnex, table, excludedFieldList);
  }

  // 1. where 构建：前后端合并
  const whereCondition = await buildWhereCondition(jianghuKnex, ctx, requestBody);
  if ([ 'delete', 'jhDelete', 'update', 'jhUpdate' ].includes(operation) && !whereCondition) {
    throw new BizError(errorInfoEnum.resource_sql_exception_of_update_and_delete);
  }

  // 2. 翻页场景需要 count 计算
  let count;
  if (limit) {
    let knexCommandCountString = `return await jianghuKnex('${table}')${whereCondition}.count('*', {as: 'count'});`;
    // 去掉 limit, offset, orderBy
    knexCommandCountString = knexCommandCountString.replace(/\.limit\([^\)]+\)/, '').replace(/\.offset\([^\)]+\)/, '').replace(/\.orderBy\([^\)]+\)/, '');
    const result = await runKnexFunction(knexCommandCountString, { jianghuKnex, actionData, ctx });
    count = result[0].count;
  }

  // 3. jianghuKnex 执行
  let rows = null;
  await jianghuKnex.transaction(async trx => {
    let knexArgs = [ 'select', 'delete', 'jhDelete' ].includes(operation) ? '' : 'actionData';
    if (operation === 'select' && !_.isEmpty(fieldList)) {
      knexArgs = 'fieldList';
    }
    const knexCommandCountString = `return await trx('${table}', ctx)${whereCondition}.${operation}(${knexArgs});`;
    rows = await runKnexFunction(knexCommandCountString, { trx, actionData, fieldList, ctx });
  });

  return { rows, count };
}

async function serviceResource({ ctx }) {
  const requestBody = ctx.request.body;
  const appData = requestBody.appData || {};
  const actionData = appData.actionData || {};
  const { packageResource: { resourceData, appDataSchema } } = ctx;
  const { service, serviceFunction } = resourceData;

  // 校验 appDataSchema
  if (!_.isEmpty(appDataSchema)) {
    validateUtil.validate(appDataSchema, appData, 'appData');
  }

  const serviceTmp = ctx.service[service];
  if (!serviceTmp) {
    throw new BizError(errorInfoEnum.resource_service_not_found);
  }

  const serviceFunctionTmp = serviceTmp[serviceFunction];
  if (!serviceFunctionTmp) {
    throw new BizError(errorInfoEnum.resource_service_method_not_found);
  }

  // 注意: 这里必须 'ctx.service[serviceName][methodName]' 这样 写; 否则service无法获取egg 相关属性
  return await ctx.service[service][serviceFunction](actionData, ctx);
}

module.exports.sqlResource = sqlResource;
module.exports.serviceResource = serviceResource;
