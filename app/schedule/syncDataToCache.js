'use strict';
// 缓存数据到数据库 _cache 表中

const { tableEnum } = require('../constant/constant');
const userInfoUtil = require('../middleware/middlewareUtil/userInfoUtil');

module.exports = app => {
  return {
    schedule: {
      immediate: true, // 应用启动后触发
      interval: app.config.jiangHuConfig.userInfoCacheRefreshInterval || '10s',
      type: 'worker', // worker: 只有一个worker执行
      disable: !app.config.jiangHuConfig.enableUserInfoCache,
    },
    // 定时任务的入口
    async task(ctx) {
      if (!ctx.app.config.jiangHuConfig.enableUserInfoCache) {
        return;
      }
      const startTime = new Date().getTime();
      const { logger, jianghuKnex } = app;

      const cacheList = await jianghuKnex(tableEnum._cache).select('userId');
      const userList = await jianghuKnex(tableEnum._user).select();
      // 未登录场景
      userList.push({ userId: 'visitor' });

      // 生成每个用户的缓存
      for (const user of userList) {
        const { userId } = user;
        const userRuleData = await userInfoUtil.captureUserRuleData({ jianghuKnex, appType: app.config.appType, userId });
        if (cacheList.find(cache => cache.userId === userId)) {
          await jianghuKnex(tableEnum._cache).where({ userId }).update({ userId, content: JSON.stringify(userRuleData) });
        } else {
          await jianghuKnex(tableEnum._cache).insert({ userId, content: JSON.stringify(userRuleData) });
        }
      }

      const endTime = new Date().getTime();
      logger.info('[syncDataToApp.js]', { useTime: `${endTime - startTime}/ms` });
    },

  };
};
