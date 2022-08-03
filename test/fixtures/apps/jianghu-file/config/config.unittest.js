'use strict';

const assert = require('assert');
const path = require('path');

const { middleware, middlewareMatch } = require(path.join(process.cwd(), 'config/middlewareConfig'));


module.exports = appInfo => {
  assert(appInfo);
  const appId = 'jianghu';
  const uploadDir = path.join(appInfo.baseDir, 'upload');
  const downloadBasePath = `/${appId}/upload`;
  return {
    appId,
    debug: true,
    jiangHuConfig: {
      enableSocket: true,
    },
    uploadDir,
    downloadBasePath,
    logger: {
      outputJSON: true,
      consoleLevel: 'DEBUG',
      level: 'DEBUG',
      dir: path.join(appInfo.baseDir, 'logs'),
      contextFormatter(meta) {
        return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    },
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
    knex: {
      client: {
        dialect: 'mysql2',
        connection: {
          host: '0.0.0.0',
          port: 3306,
          user: 'root',
          password: '123456',
          database: 'jianghu',
        },
        pool: { min: 0, max: 5 },
        acquireConnectionTimeout: 30000,
      },
      app: true,
      agent: true,
    },
    middleware,
    ...middlewareMatch,
    socketIO: {
      serveClient: true,
      connectTimeout: 45000,
    },
  };

};
