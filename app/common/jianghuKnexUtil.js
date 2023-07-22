'use strict';

const dayjs = require('dayjs');
const _ = require('lodash');

async function backupNewDataListToRecordHistory({ ids, table, knex, requestBody, operation, operationByUserId, operationByUser, operationAt }) {

  if (_.isEmpty(ids)) {
    return;
  }
  const packageContent = JSON.stringify(requestBody);
  const newDataList = await knex(table).whereIn('id', ids).select();
  if (_.isEmpty(newDataList)) {
    return;
  }
  const recordHistoryList = newDataList.map(newData => {

    if (operation === 'jhDelete') {
      newData.operation = operation;
      newData.operationByUserId = operationByUserId;
      newData.operationByUser = operationByUser;
      newData.operationAt = operationAt;
    }

    return {
      table, recordId: newData.id, recordContent: JSON.stringify(newData),
      packageContent,
      operation: newData.operation,
      operationByUserId: newData.operationByUserId,
      operationByUser: newData.operationByUser,
      operationAt: newData.operationAt,
    };
  });
  return await knex('_record_history').insert(recordHistoryList);

}


/**
 * 包装 knex，增加额外功能
 *
 * 使用: await this.app.jianghuKnex('_constant', this.ctx)
 .where({ constantKey: 'gender' })
 .update({ desc: '777' });
 * 使用: await await this.app.jianghuKnex.transaction(async trx => {
             // trx('table1').insert({ name: 'xx' });
             // trx('table2').insert({ name: 'xx' });
          })
 * @param knex
 */
function buildJianghuKnexFunc(knex) {

  const builderGenerator = (table, ctx = {}, jianghuKnexInstance = null) => {
    let target = jianghuKnexInstance || knex(table);
    const builder = {};
    const { userInfo = {}, request = {} } = ctx;
    const requestBody = request.body || {};
    const { userId: operationByUserId, username: operationByUser } = userInfo;
    const operationAt = dayjs().format();

    // builder模式 ==> 代理knex相关api
    [
      'andWhere',
      'orWhere',
      'where',
      'whereNot',
      'whereIn',
      'whereNotIn',
      'whereNull',
      'whereNotNull',
      'whereExists',
      'whereNotExists',
      'whereBetween',
      'whereNotBetween',
      'whereRaw',
      'whereLike',
      'whereILike',
      'whereJsonObject',
      'whereJsonPath',
      'whereJsonSupersetOf',
      'whereJsonSubsetOf',
      'join',
      'innerJoin',
      'leftJoin',
      'leftOuterJoin',
      'rightJoin',
      'rightOuterJoin',
      'fullOuterJoin',
      'crossJoin',
      'joinRaw',
      'limit',
      'offset',
      'distinct',
      'distinctOn',
      'groupBy',
      'groupByRaw',
      'orderBy',
      'orderByRaw',
      'union',
      'unionAll',
      'onConflict',
      'returning',
      'noWait',
      'min',
      'max',
      'sum',
      'avg',
      'increment',
      'decrement',
      'hintComment',
      'truncate',
      'pluck',
      'rank',
      'denseRank',
      'rowNumber',
      'partitionBy',
      'modify',
      'columnInfo',
      'debug',
      'connection',
      'options',
    ].forEach(method => {
      builder[method] = (...args) => {
        target = target[method](...args);
        return builder;
      };
    });
    [ 'count', 'first', 'select', 'delete' ].forEach(method => {
      builder[method] = (...args) => {
        return target[method](...args);
      };
    });

    builder.clone = () => {
      return builderGenerator(table, ctx, target.clone());
    };

    // 自定义 insert、update、jhInsert、jhDelete、jhUpdate api
    builder.insert = params => {
      const operation = 'insert';
      if (Array.isArray(params)) {
        params = params.map(item => {
          return { ...item, operation, operationByUserId, operationByUser, operationAt };
        });
      } else {
        params = { ...params, operation, operationByUserId, operationByUser, operationAt };
      }
      return target.insert(params);
    };

    builder.update = params => {
      const operation = 'update';
      return target.update({ ...params, operation, operationByUserId, operationByUser, operationAt });
    };

    builder.jhInsert = async params => {
      const operation = 'jhInsert';
      if (Array.isArray(params)) {
        params = params.map(item => {
          return { ...item, operation, operationByUserId, operationByUser, operationAt };
        });
      } else {
        params = { ...params, operation, operationByUserId, operationByUser, operationAt };
      }
      const ids = await target.insert(params);
      // 根据ids查询最新新数据 并 备份最新数据 到 _record_history
      await backupNewDataListToRecordHistory({ ids, table, knex, requestBody, operation });
      return ids;
    };

    builder.jhDelete = async () => {
      const operation = 'jhDelete';

      // 获取要操作的ids
      const idsResult = await target.select('id');
      const ids = idsResult.map(item => item.id);

      // 根据ids查询最新新数据 并 备份最新数据 到 _record_history; Tip: delete需要记录上一个版本的数据
      await backupNewDataListToRecordHistory({ ids, table, knex, requestBody, operation, operationByUserId, operationByUser, operationAt });

      // 执行操作
      const result = await target.delete();

      return result;
    };

    builder.jhUpdate = async params => {
      const operation = 'jhUpdate';

      // 获取要操作的ids
      const idsResult = await target.select('id');
      const ids = idsResult.map(item => item.id);

      // 根据ids查询最新新数据 并 备份最新数据 到 _record_history
      await backupNewDataListToRecordHistory({ ids, table, knex, requestBody, operation: 'jhUpdate:before' });

      // 执行操作
      const result = await knex(table).whereIn('id', ids).update({ ...params, operation, operationByUserId, operationByUser, operationAt });

      // 根据ids查询最新新数据 并 备份最新数据 到 _record_history
      await backupNewDataListToRecordHistory({ ids, table, knex, requestBody, operation: 'jhUpdate:after' });

      return result;
    };

    return builder;
  };

  return builderGenerator;
}

/**
 * 包装 knex
 * @param knex
 */
module.exports.createJianghuKnex = knex => {
  const jianghuKnex = buildJianghuKnexFunc(knex);

  jianghuKnex.raw = async sql => {
    const result = await knex.raw(sql);
    return result;
  };

  jianghuKnex.transaction = async (callback, ctx = {}) => {
    await knex.transaction(async trx => {
      const jianghuKnexTrx = buildJianghuKnexFunc(trx, ctx);

      // 映射事务提交 commit()
      jianghuKnexTrx.commit = async () => {
        return await trx.commit();
      };

      // 映射事务回滚 rollback()
      jianghuKnexTrx.rollback = async () => {
        return await trx.rollback();
      };

      await callback(jianghuKnexTrx);
    });
  };

  return jianghuKnex;
};

