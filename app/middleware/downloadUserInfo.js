'use strict';

const path = require('path');
const eggStatic = require('egg-static/app/middleware/static');
const userInfoUtil = require('./middlewareUtil/userInfoUtil');

module.exports = (options, app) => {

  // 构造新的 static 配置，生成新的 egg-static 中间件
  const staticOptions = Object.assign({}, app.config.static, {
    dir: [
      { prefix: `/${app.config.appId}/upload/`, dir: path.join(app.config.baseDir, 'upload') },
      { prefix: '/upload/', dir: path.join(app.config.baseDir, 'upload') },
    ],
  });
  const eggStaticMiddleware = eggStatic(staticOptions, app);

  // 进行鉴权，鉴权成功后，使用 static 中间件返回静态资源
  return async (ctx, next) => {

    const { jianghuKnex, logger, db, config } = ctx.app;
    const { appId, appType, jianghuConfig = {} } = config;

    if (!jianghuConfig.enableUploadStaticFileCache) {
      return;
    }

    if (jianghuConfig.enableUploadStaticFileAuthorization) {
      // 由于 userInfoUtil 针对的是 post 请求，所以需要构造一个结构一致的 body
      const mockBody = {
        appData: {
          authToken: ctx.cookies.get(`${config.authTokenKey}_authToken`, {
            httpOnly: false,
            signed: false,
          }),
        },
      };

      // 捕获 userInfo: { user, userGroupRoleList, allowPageList, userAppList } 到 ctx.userInfo
      ctx.userInfo = await userInfoUtil.getUserInfo({ config, body: mockBody, jianghuKnex, db, logger, appType });
      if (!ctx.userInfo || !ctx.userInfo.user || !Object.keys(ctx.userInfo.user).length) {
        ctx.redirect(ctx.app.config.loginPage || '/');
        return;
      }
    }

    return eggStaticMiddleware(ctx, next);
  };
};

