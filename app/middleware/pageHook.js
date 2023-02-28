'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.hookResult = {};
    if (ctx.packagePage.pageHook) {
      const pageHook = JSON.parse(ctx.packagePage.pageHook);
      const beforeHookList = pageHook.beforeHook || [];
      for (const { field, templateVar, service, serviceFunc } of beforeHookList) {
        const result = await ctx.service[service][serviceFunc]();
        if (field) {
          ctx.hookResult[field] = result;
        }
        if (templateVar) {
          ctx.hookResult[templateVar] = result;
        }
      }
    }

    await next();
  };
};

