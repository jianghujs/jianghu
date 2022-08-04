'use strict';


const { tableObj } = require('../constant/constant');
module.exports = () => {
  return async (ctx, next) => {
    const { logger, jianghuKnex } = ctx.app;

    // 按 pageId 获取 page 数据
    let pageId = ctx.request.path
      .replace(`/${ctx.app.config.appId}/pageDoc/`, '')
      .replace(/^manual\//, '')
      .replace(/\.md$/, '');
    if (pageId === '_sidebar' || pageId === 'index') {
      pageId = 'manual';
    }

    ctx.packagePage = await jianghuKnex(tableObj._page).where({ pageId }).first();
    if (!ctx.packagePage) {
      logger.error(`[pageDoc not found error], url: ${ctx.request.url}`);
      ctx.redirect(ctx.app.config.helpPage);
      return;
    }

    await next();
    // TODO: 记录 page 日志
  };
};

