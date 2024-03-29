'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');

module.exports = () => {
  return async (ctx, next) => {
    const { jianghuKnex } = ctx.app;

    // 按 pageId 获取 page 数据
    const body = ctx.request.body;
    const { pageId } = body.appData.actionData;

    ctx.packagePage = await jianghuKnex('_page')
      .where({ pageId })
      .first();

    if (!ctx.packagePage) {
      throw new BizError(errorInfoEnum.page_not_found);
    }
  };
};
