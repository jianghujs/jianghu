'use strict';

const path = require('path');
const eggStatic = require('egg-static/app/middleware/static');
const userInfoUtil = require('./middlewareUtil/userInfoUtil');
const fs = require('fs');

module.exports = (options, app) => {
  // 构造新的 static 配置，生成新的 egg-static 中间件
  let eggStaticMiddleware = null;
  if (app.config.jianghuConfig.enableUploadStaticFileCache) {
    const staticOptions = Object.assign({}, app.config.static, {
      dir: [
        { prefix: `/${app.config.appId}/upload/`, dir: path.join(app.config.baseDir, 'upload') },
        { prefix: '/upload/', dir: path.join(app.config.baseDir, 'upload') },
      ],
    });
    eggStaticMiddleware = eggStatic(staticOptions, app);
  }

  // 进行鉴权，鉴权成功后，使用 static 中间件返回静态资源
  return async (ctx, next) => {

    const { jianghuKnex, logger, db, config } = ctx.app;
    const { appType, jianghuConfig = {} } = config;

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
    if (!!eggStaticMiddleware) {
      return eggStaticMiddleware(ctx, next);
    }
    // 直接返回浏览器可直接显示的文件
    const filePath = path.join(ctx.app.baseDir, 'upload', ctx.path.split('/upload')[1]);
    const file = fs.readFileSync(filePath);
    ctx.body = file;
    // 根据文件扩展名设置正确的 Content-Type
    const fileExtension = path.extname(filePath).toLowerCase();
    
    // 判断是否为图片或其他可在浏览器中直接显示的文件类型
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];
    const textExtensions = ['.txt', '.html', '.css', '.js'];
    const pdfExtension = '.pdf';
    
    if (imageExtensions.includes(fileExtension)) {
      // 图片文件，设置对应的 MIME 类型
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp'
      };
      ctx.type = mimeTypes[fileExtension] || 'image/jpeg';
    } else if (textExtensions.includes(fileExtension)) {
      // 文本文件
      const mimeTypes = {
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
      };
      ctx.type = mimeTypes[fileExtension] || 'text/plain';
    } else if (fileExtension === pdfExtension) {
      // PDF 文件
      ctx.type = 'application/pdf';
    } else {
      // 其他文件类型，设置为下载
      ctx.type = 'application/octet-stream';
    }
    
    ctx.set('Content-Length', file.length);
    ctx.status = 200;
    return;
  };
};

