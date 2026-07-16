'use strict';

const dayjs = require('dayjs');

module.exports = app => {
  const recordHistoryCleanup = app.config.jianghuConfig.recordHistoryCleanup;

  return {
    schedule: {
      cron: recordHistoryCleanup.cron,
      type: 'worker', // worker: 只有一个 worker 执行
      disable: !recordHistoryCleanup.enabled,
    },
    async task(ctx) {
      const { enabled, retentionDays, batchSize } = ctx.app.config.jianghuConfig.recordHistoryCleanup;
      if (!enabled) {
        return;
      }

      const startTime = new Date().getTime();
      const expiredAt = dayjs().subtract(retentionDays, 'day').format();
      let deletedCount = 0;

      while (true) {
        const recordHistoryList = await ctx.app.jianghuKnex('_record_history')
          .where('operationAt', '<', expiredAt)
          .orderBy('id', 'asc')
          .limit(batchSize)
          .select('id');
        if (!recordHistoryList.length) {
          break;
        }

        const idList = recordHistoryList.map(item => item.id);
        const batchDeletedCount = await ctx.app.jianghuKnex('_record_history')
          .whereIn('id', idList)
          .delete();
        deletedCount += batchDeletedCount;
        if (!batchDeletedCount) {
          break;
        }
      }

      ctx.app.logger.info('[clearRecordHistory.js]', {
        expiredAt,
        deletedCount,
        useTime: `${new Date().getTime() - startTime}/ms`,
      });
    },
  };
};
