'use strict';

const { tableObj } = require('../constant/constant');

module.exports = () => {
  return async (ctx, next) => {
    const { logger, jianghuKnex } = ctx.app;

    // 按 pageId 获取 page 数据
    const pageId = ctx.request.path.replace(`/${ctx.app.config.appId}/page/`, '');

    // 尝试获取全路径
    let page = null;

    // 除了特殊的多层路由，其它多层路由都变成 /page/pageName/param0/param1...
    // 并将 param[] 放到 ctx.pathParams 中
    if (pageId.includes('/')) {
      const parts = pageId.split('/');
      page = await jianghuKnex(tableObj._page).where({ pageId: parts[0] }).first();
      if (page && page.pageType === 'seo') {
        ctx.pathParams = parts.splice(1);
      }
    }

    if (!page) {
      page = await jianghuKnex(tableObj._page).where({ pageId }).first();
    }

    ctx.packagePage = page;
    if (!ctx.packagePage) {
      logger.error(`[page not found error], url: ${ctx.request.url}`);
      ctx.redirect(ctx.app.config.helpPage);
      return;
    }

    await next();
    // TODO: 记录 page 日志
  };
};

