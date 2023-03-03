'use strict';

const range = require('koa-range');
const send = require('koa-send');
const fs = require('fs');
const userInfoUtil = require('./middlewareUtil/userInfoUtil');

module.exports = options => {
  return async (ctx, next) => {

    const { jianghuKnex, logger, db, config } = ctx.app;
    const { appType, appTitle } = config;

    // 捕获 userInfo: { user, userGroupRoleList, allowPageList, userAppList } 到 ctx.userInfo
    ctx.userInfo = await userInfoUtil.getUserInfo({ ctx, config, body: null, jianghuKnex, db, logger, appType, mockBody: true });

    if (ctx.userInfo && ctx.userInfo.user && Object.keys(ctx.userInfo.user).length) {
      // md 文件中，对资源链接做特殊处理，将 ![](./xxx) 转成 ![]()
      if (ctx.path.endsWith('.md') && !ctx.path.endsWith('_sidebar.md')) {
        if (ctx.path.endsWith('/README.md') && !fs.existsSync(config.baseDir + '/app/view/pageDoc/README.md')) {
          // README.md 如果没有配置，则展示默认的内容
          ctx.body = '# ' + appTitle;
          return;
        }
        const filePath = ctx.path.replace(`/${config.appId}/pageDoc/`, '');
        const content = fs.readFileSync(config.baseDir + '/app/view/pageDoc/' + filePath);
        ctx.body = content.toString().replace(/]\(\.\/([^)]+?)(?<!\.md)\)/g, `](${ctx.request.origin}/${config.appId}/pageDoc/$1)`);
        return;
      }

      // 兼容 /upload 开头的配置
      if (ctx.path.startsWith(`/${config.appId}/pageDoc/`) && ctx.path !== `/${config.appId}/pageDoc/`) {
        await send(ctx, decodeURI(ctx.path.replace(`/${config.appId}/pageDoc/`, '')), {
          root: config.baseDir + '/app/view/pageDoc',
        });
      }
    } else {
      ctx.redirect(ctx.app.config.loginPage || '/');
    }
    return range(ctx, next);
  };
};

