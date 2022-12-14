'use strict';

const validateUtil = require('../common/validateUtil');
const { errorInfoEnum, BizError } = require('../constant/error');
const { tableObj } = require('../constant/constant');

const validateSchemaEnum = Object.freeze({
  resourceRequestBody: {
    type: 'object',
    additionalProperties: true,
    required: [ 'packageId', 'packageType', 'appData' ],
    properties: {
      packageId: { type: 'string' },
      packageType: {
        type: 'string',
        enum: [ 'socketForward', 'socketRequest', 'socketResponse' ],
      },
      appData: {
        type: 'object',
        required: [ 'pageId', 'actionId' ],
        properties: {
          pageId: { type: 'string' },
          actionId: { type: 'string' },
          needResponse: { type: 'boolean' },
          authToken: { anyOf: [{ type: 'string' }, { type: 'null' }] },
          actionData: { type: 'object' },
          where: { type: 'object' },
        },
      },
    },
  },
});

module.exports = async ctx => {
  const body = ctx.request.body;
  validateUtil.validate(validateSchemaEnum.resourceRequestBody, body, 'body');

  if (!ctx.request.body.appData.actionData) {
    ctx.request.body.appData.actionData = {};
  }

  const { jianghuKnex, config, logger } = ctx.app;
  const { jianghuConfig } = config;
  const { pageId, actionId } = body.appData;

  const resourceId = `${pageId}.${actionId}`;

  // 1. ζθ· package resource
  ctx.packageResource = await jianghuKnex(tableObj._resource)
    .where({ pageId, actionId })
    .first();
  if (!ctx.packageResource) {
    throw new BizError(errorInfoEnum.resource_not_found);
  }
  ctx.packageResource.resourceId = resourceId;
  ctx.packageResource.resourceHook = JSON.parse(
    ctx.packageResource.resourceHook || '{}'
  );
  ctx.packageResource.resourceData = JSON.parse(
    ctx.packageResource.resourceData || '{}'
  );
  ctx.packageResource.appDataSchema = JSON.parse(
    ctx.packageResource.appDataSchema || '{}'
  );

  // θΏε ctx
  return ctx;
};

