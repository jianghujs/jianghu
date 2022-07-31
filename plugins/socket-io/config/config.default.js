'use strict';

/**
 * egg-socket.io-v3 default config
 * @member Config#io
 * @property {String} SOME_KEY - some description
 */
exports.socketIO = {
  path: '/socket.io',
  serveClient: true,
  connectTimeout: 45000,
};
