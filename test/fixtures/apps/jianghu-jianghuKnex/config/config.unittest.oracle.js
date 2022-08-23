'use strict';

const assert = require('assert');
const path = require('path');

const { middleware, middlewareMatch } = require(path.join(process.cwd(), 'config/middlewareConfig'));


module.exports = appInfo => {
  assert(appInfo);
  return {
    appId: 'jianghu',
    debug: true,
    jianghuConfig: {
      enableSocket: true,
    },
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
        dialect: 'oracledb',
        connection: {
          user: 'ROOT',
          password: '123456',
          connectString: 'localhost:1521/XE',
          stmtCacheSize: 0,
          fetchAsString: [ 'number', 'clob' ],

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
