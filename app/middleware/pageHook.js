'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { logger } = ctx.app;

    ctx.hookResult = {};
    if (ctx.packagePage.pageHook) {
      const pageHook = JSON.parse(ctx.packagePage.pageHook);
      const beforeHookList = pageHook.beforeHook || [];
      for (const { field, service, serviceFunc } of beforeHookList) {
        ctx.hookResult[field] = await ctx.service[service][serviceFunc]();
      }
    }

    await next();
    // TODO: 记录 page 日志
  };
};

