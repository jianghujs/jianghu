'use strict';
// 定时同步 userSession 中的 socketStatus 字段

module.exports = app => {
  return {
    schedule: {
      // immediate: true, // 应用启动后触发 // 刚起来时不需要做处理，因为连接都没过来
      interval:
        app.config.jianghuConfig.syncSocketStatusRefreshInterval || '60s', // 推荐设置大于 socket 超时时间，否则可能导致状态不正确
      type: 'worker', // worker: 只有一个worker执行
      disable: !app.config.jianghuConfig.enableSyncSocketStatus,
    },
    async task(ctx) {
      const startTime = new Date();
      const { app } = ctx;
      const { knex, logger } = app;

      if (app.config.env !== 'prod') {
        return;
      }

      // 获取所有 socket
      const allSockets = await ctx.app.socketIO.fetchSockets();
      if (!allSockets || allSockets.length <= 0) {
        return;
      }
      const onlineSocketIds = [];
      const deviceIds = [];
      allSockets.forEach(socket => {
        const socketId = socket.id;
        if (!socketId.includes('::')) {
          return;
        }
        const parts = socketId.split('::');
        deviceIds.push(parts[0]);
        onlineSocketIds.push(socketId);
      });
      logger.info('[syncSocketStatus.js] 获取所有在线 socketIds', {
        onlineSocketIds,
        length: onlineSocketIds.length,
        useTime: `${new Date().getTime() - startTime.getTime()}/ms`,
      });

      // 获取对应的 user session
      let userSessions = await knex('_user_session')
        .whereIn('deviceId', deviceIds)
        .select();
      // 获取数据库中在线的 user session
      const onlineUserSessions = await knex('_user_session')
        .where('socketStatus', "online")
        .select();
      userSessions = [ ...userSessions, ...onlineUserSessions ];

      // 判断并更新 user session 的 socketStatus
      for (const userSession of userSessions) {
        const realStatus = onlineSocketIds.includes(
          `${userSession.deviceId}::${userSession.userId}`
        )
          ? "online"
          : "offline";
        if (userSession.socketStatus !== realStatus) {
          logger.info(
            '[syncSocketStatus.js] user session 在线状态异常，修复状态',
            {
              deviceId: userSession.deviceId,
              userId: userSession.userId,
              socketStatus: userSession.socketStatus,
              realStatus,
            }
          );
          const updateRes = await knex('_user_session')
            .where('id', '=', userSession.id)
            .update('socketStatus', realStatus);
          if (updateRes) {
            // TODO 同时通知他的好友「上下线消息」
          }
          console.log(updateRes);
        }
      }

      logger.info('[syncSocketStatus.js] 任务执行结束', {
        useTime: `${new Date().getTime() - startTime.getTime()}/ms`,
      });
    },
  };
};
