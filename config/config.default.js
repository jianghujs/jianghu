'use strict';

const { httpResponse } = require('../app/constant/constant');
const { errorInfoEnum } = require('../app/constant/error');
const path = require('path');
const assert = require('assert');
const fs = require('fs');

module.exports = appInfo => {
  assert(appInfo);
  const appId = appInfo.name || 'defaultAppId';

  const config = {
    appId,
    debug: false,
    appTitle: "第一个应用",
    appLogo: `${appId}/public/img/logo.png`,
    appType: "single", // single: 单应用; multiApp: 多应用
    primaryColor: '#1867c0',
    keys: `${appId}_1638108566009`,
    appDirectoryLink: "/",
    indexPage: `/${appId}/page/manual`,
    loginPage: `/${appId}/page/login`,
    helpPage: `/${appId}/page/help`,
    jianghuConfig: {
      enableHtmlErrorLogRecord: false,
      htmlErrorLogRecordInterval: 60000,
      enableResourceLogRecord: true,
      ignoreListOfResourceLogRecord: [ 'user.passwordLogin' ],
      enableSocket: false,
      updateRequestDemoAndResponseDemo: false,
      enableUserInfoCache: false,
      userInfoCacheRefreshInterval: "10s",
      enableSyncSocketStatus: false,
      syncSocketStatusRefreshInterval: "60s",
      ignoreListOfResourceRequestLog: ['allPage.getConstantList', 
        'allPage.httpUploadByStream', 'allPage.httpUploadByBase64', 'allPage.httpDownloadByBase64'],
      // /appId/upload 下的文件在鉴权通过之后，设置 max-age，默认 30 天缓存
      // @see downloadUserInfo 中间件
      uploadFileMaxAge: 30 * 24 * 60 * 60 * 1000, // 30d
      jianghuConfigDataIgnoreIdList: { 
        _constant: [],
        _page: [],
        _resource: [],
        _test_case: [],
        _ui: [],
      },
      // Tip: 兼容配置, 下一个大版本删除
      compatibleConfig: {
        // true =====》 ALTER TABLE `_resource_request_log` ADD COLUMN `userId` varchar(255) NULL COMMENT '用户ID' AFTER `userAgent`;
        // resourceRequestLogRecordUserId: false
      }
    },
    security: {
      csrf: { enable: false },
    },
    nunjucks: {
      cache: false,
      tags: {
        variableStart: "<$",
        variableEnd: "$>",
      },
    },
    knex: {
      client: {
        dialect: "mysql",
        connection: {
          host: "127.0.0.1",
          port: "3306",
          user: "jianghu",
          password: "123456",
          database: "jianghu",
          charset: "utf8mb4",
        },
        pool: { min: 0, max: 30 },
        acquireConnectionTimeout: 30000,
      },
      app: true,
    },
    bodyParser: {
      formLimit: "100mb",
      jsonLimit: "100mb",
      textLimit: "100mb",
    },
    // https://eggjs.org/zh-cn/plugins/multipart.html
    multipart: {
      mode: "file",
      fileSize: "100mb",
      allowArrayField: false,
      // 允许所有格式的文件上传
      whitelist: () => true,
      tmpdir: path.join(appInfo.baseDir, "multipartTmp"),
      cleanSchedule: {
        // run tmpdir clean job on every day 04:30 am
        // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
        cron: "0 30 4 * * *",
        disable: false,
      },
    },
    cors: {
      origin: "*",
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    },
    logger: {
      outputJSON: true,
      level: "INFO",
      dir: path.join(appInfo.baseDir, "logs"),
      contextFormatter(meta) {
        return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    },
    logrotator: {
      filesRotateBySize: [
        path.join(appInfo.baseDir, `logs/${appId}.page.log`),
        path.join(appInfo.baseDir, `logs/${appId}.page.json.log`),
  
        path.join(appInfo.baseDir, `logs/${appId}.html.log`),
        path.join(appInfo.baseDir, `logs/${appId}.html.json.log`),
      ],
      maxFileSize: 10 * 1024 * 1024, // 10M
      maxFiles: 20, // 最大文件个数
      maxDays: 20, // 最大天数 
    },
    customLogger: {
      knex: { consoleLevel: "WARN" },
      // https://www.eggjs.org/zh-CN/core/logger
      htmlLogger: {
        file: path.join(appInfo.baseDir, `logs/${appId}.html.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
      resourceLogger: {
        file: path.join(appInfo.baseDir, `logs/${appId}.resource.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
      pageLogger: {
        file: path.join(appInfo.baseDir, `logs/${appId}.page.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
    },
    onerror: {
      async json(err, ctx) {
        ctx.status = 200;
        const { packageId } = ctx.request.body;
        // TODO: 如何将系统异常 & 数据库异常 & Biz异常 优雅的返回
        const errorCode =
          err.errorCode || err.code || errorInfoEnum.server_error.errorCode;
        const errorReason =
          err.errorReason ||
          err.sqlMessage ||
          err.message ||
          errorInfoEnum.server_error.errorReason;
        // 清除cookie;
        if (
          errorCode === "request_token_invalid" ||
          errorCode === "request_user_not_exist" ||
          errorCode === "request_token_expired" ||
          errorCode === "request_app_forbidden" ||
          errorCode === "user_banned"
        ) {
          ctx.cookies.set(`${ctx.app.config.appId}_authToken`, null);
        }
        const errorReasonSupplement = err.errorReasonSupplement || null;
        ctx.body = httpResponse.fail({
          packageId,
          appData: { errorCode, errorReason, errorReasonSupplement },
        });
      },
    }
  };

  return {
    ...config,
  };
};
