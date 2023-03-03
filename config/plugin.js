'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  knex: {
    enable: true,
    package: 'egg-knex',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  static: {
    enable: true,
  },
  socketIO: {
    enable: false,
    path: path.join(__dirname, '../plugins/socket-io'),
  },
  xiaochengxu: {
    enable: false,
    path: path.join(__dirname, '../plugins/xiaochengxu'),
  },
  rateLimit: {
    enable: false,
    path: path.join(__dirname, '../plugins/rate-limit'),
  },
  ipBlock: {
    enable: false,
    path: path.join(__dirname, '../plugins/ip-block'),
  },
};
