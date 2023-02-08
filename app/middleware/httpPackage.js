'use strict';

const validateUtil = require('../common/validateUtil');
const packageUtil = require('./middlewareUtil/packageUtil');
const { errorInfoEnum, BizError } = require('../constant/error');

const validateSchemaEnum = Object.freeze({
  resourceRequestBody: {
    type: 'object',
    additionalProperties: true,
    required: [ 'packageId', 'packageType', 'appData' ],
    properties: {
      packageId: { type: 'string' },
      packageType: { type: 'string', enum: [ 'httpRequest' ] },
      appData: {
        type: 'object',
        required: [ 'pageId', 'actionId' ],
        properties: {
          pageId: { type: 'string' },
          actionId: { type: 'string' },
          authToken: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          actionData: { type: 'object' },
          where: { type: 'object' },
        },
      },
    },
  },
});


module.exports = options => {
  return async (ctx, next) => {
    const midTime = new Date().getTime();

    const contentType = ctx.request.header['content-type'];
    if (contentType && contentType.startsWith('multipart/form-data;')) {
      ctx.request.body = JSON.parse(ctx.request.body.body);
    }

    const body = ctx.request.body;
    validateUtil.validate(validateSchemaEnum.resourceRequestBody, body, 'body');

    if (!ctx.request.body.appData.actionData) {
      ctx.request.body.appData.actionData = {};
    }


    const { jianghuKnex, config, logger } = ctx.app;
    const { jianghuConfig } = config;
    const { pageId, actionId } = body.appData;

    const resourceId = `${pageId}.${actionId}`;

    // 1. 捕获 package resource
    ctx.packageResource = await jianghuKnex('_resource').where({ pageId, actionId }).first();
    if (!ctx.packageResource) throw new BizError(errorInfoEnum.resource_not_found);
    ctx.packageResource.resourceId = resourceId;
    ctx.packageResource.resourceHook = JSON.parse(ctx.packageResource.resourceHook || '{}');
    ctx.packageResource.resourceData = JSON.parse(ctx.packageResource.resourceData || '{}');
    ctx.packageResource.appDataSchema = JSON.parse(ctx.packageResource.appDataSchema || '{}');

    await next();

    try {
      // 2. 记录 request resource; 这里的错误不能影响主业务 所以 try catch一下
      await packageUtil.saveRequestLogForResource(ctx);

      // 3. 更新 _resource.requestDemo & _resource.responseDemo
      if (jianghuConfig.updateRequestDemoAndResponseDemo) {
        await packageUtil.updateRequestDemoAndResponseDemo(ctx);
      }
    } catch (err) {
      logger.error('[saveRequestLogForResource error]', err);
    }

    logger.info('[httpPackage.js ' + resourceId + ' - cost]', {
      useTime: `${new Date().getTime() - midTime}/ms`,
    });
  };
};

