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
  etag: {
    enable: true,
    package: 'egg-etag',
  },
  socketIO: {
    enable: true,
    path: path.join(__dirname, '../plugins/socket-io'),
  },
};
