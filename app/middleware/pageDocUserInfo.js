'use strict';

const userInfoUtil = require('./middlewareUtil/userInfoUtil');

module.exports = options => {
  return async (ctx, next) => {

    const { jianghuKnex, logger, db, config } = ctx.app;
    const { appId, appType } = config;

    // 由于 userInfoUtil 针对的是 post 请求，所以需要构造一个结构一致的 body
    const mockBody = {
      appData: {
        authToken: ctx.cookies.get(`${appId}_authToken`, {
          httpOnly: false,
          signed: false,
        }),
      },
    };

    // 捕获 userInfo: { user, userGroupRoleList, allowPageList, userAppList } 到 ctx.userInfo
    ctx.userInfo = await userInfoUtil.getUserInfo({
      config,
      body: mockBody,
      jianghuKnex,
      db,
      logger,
      appType,
    });

    await next();
  };
};

