'use strict';

const { httpResponse } = require('../app/constant/constant');
const { errorInfoEnum } = require('../app/constant/error');
const path = require('path');

module.exports = appInfo => {
  const appPackageName = appInfo.name || 'defaultAppId';

  const config = {
    appId: appPackageName,
    appLoginId: null,
    keys: `${appPackageName}_1638108566009`,
    appTitle: '第一个应用',
    appLogo: `${appPackageName}/public/img/logo.svg`,
    debug: false,

    appType: 'single', // single: 单应用; multiApp: 多应用
    appDirectoryLink: '/',

    indexPage: `/${appPackageName}/page/manual`,
    loginPage: `/${appPackageName}/page/login`,
    helpPage: `/${appPackageName}/page/help`,

    primaryColor: '#1867c0',

    jianghuConfig: {
      // 页面日志收集
      enableHtmlErrorLogRecord: false,
      htmlErrorLogRecordInterval: 60000,

      // resource 日志收集
      enableResourceLogRecord: true,
      ignoreListOfResourceLogRecord: [ 'user.passwordLogin', 'allPage.getConstantList',
        'allPage.httpUploadByStream', 'allPage.httpUploadByBase64', 'allPage.httpDownloadByBase64' ],
      updateRequestDemoAndResponseDemo: false,

      // 自动清理旧日志文件，保留 N 天内的日志
      autoClearOldLogFile: false,
      autoClearOldLogBeforeDays: 7,
      autoClearOldLogFilePrefixList: [
        'common-error', 'egg-web', 'egg-schedule', 'egg-knex', 'egg-agent', '_resource_request_log',
        `${appPackageName}.html`, `${appPackageName}.resource`, `${appPackageName}-web`, `${appPackageName}.html`,
      ],

      // websocket 开关
      enableSocket: false,

      // websocket 在线状态修正任务
      enableSyncSocketStatus: false,
      syncSocketStatusRefreshInterval: '60s',

      // 开启用户信息缓存
      // 参考 schedule/syncDataToCache
      enableUserInfoCache: false,
      userInfoCacheRefreshInterval: '10s',

      // /appPackageName/upload 上传文件的鉴权、缓存配置
      // 参考 downloadUserInfo 中间件
      enableUploadStaticFileCache: true,
      enableUploadStaticFileAuthorization: false,
      uploadFileMaxAge: 30 * 24 * 60 * 60 * 1000, // 30d

      // WAF: 限流
      enableRateLimiter: false,
      rateLimiterDuration: 60000,
      rateLimiterMax: 100,
      rateLimiterIgnorePathPrefix: [ '/${appId}/resource', '/${appId}/page', '/${appId}/public', '${appId}/upload' ],
      rateLimiterWhitelist: [],
      // WAF: IP 黑名单
      enableIpBlock: false,
      ipBlocklist: [],
      ipBlocklistFilePath: '',

      // jhId 配置，用于多应用使用同个数据库场景
      jhIdConfig: {
        // 是否开启
        enable: false,
        // 当前应用使用的 jhId，在使用配置表时，自动用该 jhId 做过滤
        jhId: '',
        // 使用到 jhId 的配置表，一般保持默认即可
        careTableViewList: [
          '_cache',
          '_constant',
          '_file',
          '_group',
          '_page',
          '_record_history',
          '_resource',
          '_resource_request_log',
          '_role',
          '_test_case',
          '_ui',
          '_user',
          '_user_group_role',
          '_user_group_role_page',
          '_user_group_role_resource',
          '_user_session',
          '_view01_user',
        ],
      },
    },

    // https://eggjs.org/zh-cn/plugins/multipart.html
    multipart: {
      mode: 'file',
      fileSize: '100mb',
      allowArrayField: false,
      // 允许所有格式的文件上传
      whitelist: () => true,
      tmpdir: path.join(appInfo.baseDir, 'multipartTmp'),
      cleanSchedule: {
        // run tmpdir clean job on every day 04:30 am
        // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
        cron: '0 30 4 * * *',
        disable: false,
      },
    },

    // 安全配置，关闭 crsf
    security: {
      csrf: { enable: false },
    },
    // egg-cors 插件，https://github.com/eggjs/egg-cors
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    // egg-view-nunjucks 插件，https://github.com/eggjs/egg-view-nunjucks
    nunjucks: {
      cache: false,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      },
    },
    // knex 插件，https://github.com/sunfuze/egg-knex
    knex: {
      client: {
        dialect: 'mysql',
        connection: {
          host: '127.0.0.1',
          port: '3306',
          user: 'jianghu',
          password: '123456',
          database: 'jianghu',
          charset: 'utf8mb4',
        },
        pool: { min: 0, max: 30 },
        acquireConnectionTimeout: 30000,
      },
      app: true,
    },
    // egg 中间件，https://github.com/eggjs/egg/blob/master/app/middleware/body_parser.js
    bodyParser: {
      formLimit: '100mb',
      jsonLimit: '100mb',
      textLimit: '100mb',
    },

    // 日志相关配置
    logger: {
      outputJSON: true,
      level: 'INFO',
      dir: path.join(appInfo.baseDir, 'logs'),
      contextFormatter(meta) {
        return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    },
    // 日志切割
    logrotator: {
      filesRotateBySize: [
        path.join(appInfo.baseDir, `logs/${appPackageName}.page.log`),
        path.join(appInfo.baseDir, `logs/${appPackageName}.page.json.log`),

        path.join(appInfo.baseDir, `logs/${appPackageName}.html.log`),
        path.join(appInfo.baseDir, `logs/${appPackageName}.html.json.log`),
      ],
      maxFileSize: 10 * 1024 * 1024, // 10M
      maxFiles: 20, // 最大文件个数
      maxDays: 20, // 最大天数
    },
    // 定制的分类日志
    customLogger: {
      knex: { consoleLevel: 'WARN' },
      // https://www.eggjs.org/zh-CN/core/logger
      htmlLogger: {
        file: path.join(appInfo.baseDir, `logs/${appPackageName}.html.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
      resourceLogger: {
        file: path.join(appInfo.baseDir, `logs/${appPackageName}.resource.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
      pageLogger: {
        file: path.join(appInfo.baseDir, `logs/${appPackageName}.page.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
        },
      },
    },

    // 异常处理
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
          errorCode === 'request_token_invalid' ||
          errorCode === 'request_user_not_exist' ||
          errorCode === 'request_token_expired' ||
          errorCode === 'request_app_forbidden' ||
          errorCode === 'user_banned'
        ) {
          ctx.cookies.set(`${ctx.app.config.appId}_authToken`, null);
        }
        const errorReasonSupplement = err.errorReasonSupplement || null;
        ctx.body = httpResponse.fail({
          packageId,
          appData: { errorCode, errorReason, errorReasonSupplement },
        });
      },
    },
  };

  return {
    ...config,
  };
};
