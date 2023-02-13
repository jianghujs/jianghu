'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');

module.exports = async ctx => {
  const { packageResource } = ctx;
  const {
    resourceHook: { before: beforeHooks, after: afterHooks },
  } = packageResource;

  /**
   * 检查 service 是否存在
   * @param service
   * @param serviceFunction
   */
  const checkServiceFunction = (service, serviceFunction) => {
    const serviceTmp = ctx.service[service];
    if (!serviceTmp) {
      throw new BizError(errorInfoEnum.resource_service_not_found);
    }
    const serviceFunctionTmp = serviceTmp[serviceFunction];
    if (!serviceFunctionTmp) {
      throw new BizError({
        ...errorInfoEnum.resource_service_method_not_found, errorReasonSupplement: {
          service, serviceFunction
        }
      });
    }
  };

  if (afterHooks) {
    for (const afterHook of afterHooks) {
      const { service, serviceFunction } = afterHook;
      checkServiceFunction(service, serviceFunction);
      await ctx.service[service][serviceFunction](
        ctx.request.body.appData.actionData,
        ctx
      );
    }
  }

  return ctx;
};
