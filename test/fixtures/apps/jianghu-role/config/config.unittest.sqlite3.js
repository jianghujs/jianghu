'use strict';

const assert = require('assert');
const path = require('path');

const { middleware, middlewareMatch } = require(path.join(process.cwd(), 'config/middlewareConfig'));


module.exports = appInfo => {
  assert(appInfo);
  const appId = 'jianghu';
  return {
    appId,
    debug: true,
    jiangHuConfig: {
      enableSocket: true,
    },
    indexPage: `/${appId}/page/manual`,
    loginPage: `/${appId}/page/login`,
    helpPage: `/${appId}/page/help`,
    logger: {
      outputJSON: true,
      consoleLevel: 'DEBUG',
      level: 'DEBUG',
      dir: path.join(appInfo.baseDir, 'logs'),
      contextFormatter(meta) {
        return `[${meta.date}] [${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    },
    knex: {
      client: {
        dialect: 'pg',
        connection: {
          host: '0.0.0.0',
          port: 5432,
          user: 'postgres',
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
