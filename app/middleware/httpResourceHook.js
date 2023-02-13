'use strict';

const { BizError, errorInfoEnum } = require('../constant/error');

module.exports = option => {
  return async (ctx, next) => {

    const { packageResource } = ctx;
    const { resourceHook: { before: beforeHooks, after: afterHooks } } = packageResource;

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

    if (beforeHooks) {
      for (const beforeHook of beforeHooks) {
        const { service, serviceFunction } = beforeHook;
        checkServiceFunction(service, serviceFunction);
        await ctx.service[service][serviceFunction](ctx.request.body.appData.actionData, ctx);
      }
    }

    await next();

    if (afterHooks) {
      for (const afterHook of afterHooks) {
        const { service, serviceFunction } = afterHook;
        checkServiceFunction(service, serviceFunction);
        await ctx.service[service][serviceFunction](ctx.request.body.appData.actionData, ctx);
      }
    }

  };
};

