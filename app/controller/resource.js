'use strict';

const { Controller } = require('egg');
const { BizError, errorInfoEnum } = require('../constant/error');
const { tableObj, resourceTypeObj, httpResponse } = require('../constant/constant');
const _ = require('lodash');
const { sqlResource, serviceResource } = require('./controllerUtil/resourceUtil');

class ResourceController extends Controller {

  async httpRequest() {
    const { ctx, app } = this;
    const {
      config: {
        appId,
        jiangHuConfig: { packageIdCheck, ignoreListOfResourceRequestLog },
      },
      jianghuKnex,
    } = app;
    const { body } = ctx.request;
    const { packageId, appData = {} } = body;
    const { packageResource } = ctx;
    const { pageId, actionId, resourceType, resourceId } = packageResource;

    // packageId 唯一性校验
    if (packageIdCheck) {
      const resourceActivity = await jianghuKnex(
        tableObj._resource_request_log
      )
        .where({ packageId })
        .first();
      if (resourceActivity || !packageId) {
        throw new BizError(errorInfoEnum.request_repeated);
      }
    }

    // TODO: base64场景 appData太大了
    if (ignoreListOfResourceRequestLog.indexOf(resourceId) === -1) {
      app.logger.debug('[resource.js httpRequest body]', {
        packageId,
        resourceId,
        appData,
      });
    }

    let resultData;
    switch (resourceType) {
      case resourceTypeObj.sql:
        resultData = await sqlResource({ jianghuKnex, ctx });
        ctx.body = httpResponse.success({
          packageId,
          // TODO: ...resultData, resultData 为兼容代码
          appData: { ...resultData, resultData, appId, pageId, actionId },
        });
        break;
      case resourceTypeObj.service:
        resultData = await serviceResource({ ctx });
        ctx.body = httpResponse.success({
          packageId,
          // TODO: ...resultData, resultData 为兼容代码
          appData: { ...resultData, resultData, appId, pageId, actionId },
        });
        break;
      default:
        throw new BizError(errorInfoEnum.resource_not_support);
    }
  }

}

module.exports = ResourceController;

