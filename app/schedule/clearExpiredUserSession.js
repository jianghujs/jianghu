'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  return {
    schedule: {
      immediate: true, // 应用启动后触发
      interval: app.config.jianghuConfig.clearExpiredUserSessionInterval || '1d',
      type: 'worker', // worker: 只有一个worker执行
      disable: !app.config.jianghuConfig.enableCleanExpiredUserSession,
    },
    // 定时任务的入口
    async task(ctx) {
      if (!ctx.app.config.jianghuConfig.enableCleanExpiredUserSession) {
        return;
      }
      const startTime = new Date().getTime();
      const { logger, jianghuKnex } = app;

      const { appId, authTokenKey, jianghuConfig } = app.config;
      const authTokenExpiredTime = dayjs().subtract(jianghuConfig.authTokenMaxAge, 'ms').format();
      const userSessionRecordExpiredTime = dayjs().subtract(jianghuConfig.userSessionRecordMaxAge, 'ms').format();

      const userSessionTableName = authTokenKey === appId ? '_user_session' : `_${authTokenKey}_user_session`;

      // 第1步：如果 operationAt 为空，则更新为当前时间
      await jianghuKnex(userSessionTableName).where({ operationAt: null }).update({ operationAt: dayjs().format() });

      // 第2步：清理过期authToken
      const userSessionListFull = await jianghuKnex(userSessionTableName).where('operationAt', '<', authTokenExpiredTime).select();

      const authTokenExpiredList = userSessionListFull
        .filter(item => item.authToken && item.operationAt && dayjs(item.operationAt).isBefore(authTokenExpiredTime));
      const authTokenExpiredListIds = authTokenExpiredList.map(item => item.id);
      await jianghuKnex(userSessionTableName).whereIn('id', authTokenExpiredListIds).update({ authToken: '' });

      // 第3步：删除过期userSession记录
      const userSessionRecordExpiredList = userSessionListFull
        .filter(item => !item.authToken && item.operationAt && dayjs(item.operationAt).isBefore(userSessionRecordExpiredTime));
      const userSessionRecordExpiredListIds = userSessionRecordExpiredList.map(item => item.id);
      await jianghuKnex(userSessionTableName).whereIn('id', userSessionRecordExpiredListIds).delete();

      const endTime = new Date().getTime();
      logger.info('[clearExpiredUserSession.js]', { useTime: `${endTime - startTime}/ms` });
    },

  };
};
