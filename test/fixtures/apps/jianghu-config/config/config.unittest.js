'use strict';

const path = require('path');

const { middleware, middlewareMatch } = require(path.join(process.cwd(), 'config/middlewareConfig'));


module.exports = appInfo => {

  return {
    appId: 'jianghu',
    debug: true,
    jianghuConfig: {
      enableSocket: false,
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
