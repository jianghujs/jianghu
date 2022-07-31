'use strict';

const userInfoUtil = require("./middlewareUtil/userInfoUtil");

module.exports = (options) => {
  return async (ctx, next) => {
    const body = ctx.request.body;
    const { jianghuKnex, logger, config } = ctx.app;
    const { appType } = config;
    const { isGroupIdRequired } = ctx.packageResource.resourceData;

    // 捕获 userInfo: { user, userGroupRoleList, allowPageList, userAppList } 到 ctx.userInfo
    ctx.userInfo = await userInfoUtil.getUserInfo({
      config,
      body,
      jianghuKnex,
      logger,
      isGroupIdRequired,
      appType,
    });

    await next();
  };
};

