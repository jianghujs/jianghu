'use strict';

const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');

module.exports = app => {
  const { logger, config } = app;
  const socketIO = new Server(config.socketIO);
  if (config.jiangHuConfig.enableSocket !== true ) {
    return socketIO;
  }

  // 如果有配置 redis，则使用 redis 作为 socket.io 的 adapter
  if (config.socketIO.redis) {
    const pubClient = new Redis(config.socketIO.redis);
    const subClient = pubClient.duplicate();
    // subClient.set('____test', 'b');
    socketIO.adapter(createAdapter(pubClient, subClient));
    logger.info('[egg-socket.io] init socket.io redis ready!');
  }

  app.once('server', server => {
    socketIO.attach(server, {
      path: config.socketIO.path,
      maxHttpBufferSize: 1e8,
    });
    logger.info('[socket.io] 启动成功', { pid: process.pid, path: config.socketIO.path });
  });

  return socketIO;
};
