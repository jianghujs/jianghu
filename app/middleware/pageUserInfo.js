'use strict';

const userInfoUtil = require('./middlewareUtil/userInfoUtil');

module.exports = options => {
  return async (ctx, next) => {

    const { jianghuKnex, logger, db, config } = ctx.app;
    const { appType } = config;

    // 捕获 userInfo: { user, userGroupRoleList, allowPageList, userAppList } 到 ctx.userInfo
    ctx.userInfo = await userInfoUtil.getUserInfo({
      config,
      body: null,
      jianghuKnex,
      db,
      logger,
      appType,
      mockBody: true,
    });

    await next();
  };
};

