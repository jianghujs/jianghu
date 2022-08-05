"use strict";

const { tableObj } = require("../constant/constant");
const { BizError, errorInfoEnum } = require("../constant/error");

module.exports = () => {
  return async (ctx, next) => {
    const { logger, jianghuKnex } = ctx.app;

    // 按 pageId 获取 page 数据
    const body = ctx.request.body;
    const { pageId } = body.appData.actionData;

    ctx.packagePage = await jianghuKnex(tableObj._page)
      .where({ pageId })
      .first();

    if (!ctx.packagePage) {
      throw new BizError(errorInfoEnum.page_not_found);
    }
  };
};
