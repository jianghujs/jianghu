'use strict';

const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

module.exports = app => {
  const recordHistoryCleanup = app.config.jianghuConfig.recordHistoryCleanup;

  return {
    schedule: {
      immediate: true,
      cron: recordHistoryCleanup.cron,
      type: 'worker', // worker: 只有一个 worker 执行
      disable: !recordHistoryCleanup.enabled,
    },
    async task(ctx) {
      const {
        enabled,
        retentionDays,
        batchSize,
        archiveEnabled,
        archiveDir,
      } = ctx.app.config.jianghuConfig.recordHistoryCleanup;
      if (!enabled) {
        return;
      }

      const startTime = new Date().getTime();
      const expiredAt = dayjs().subtract(retentionDays, 'day').format();
      const runStamp = dayjs().format('YYYYMMDD_HHmmss');
      let deletedCount = 0;
      let archivedCount = 0;
      let partIndex = 0;

      if (archiveEnabled) {
        await fs.promises.mkdir(archiveDir, { recursive: true });
      }

      while (true) {
        const recordHistoryList = await ctx.app.jianghuKnex('_record_history')
          .where('operationAt', '<', expiredAt)
          .orderBy('id', 'asc')
          .limit(batchSize)
          .select(archiveEnabled ? '*' : 'id');
        if (!recordHistoryList.length) {
          break;
        }

        if (archiveEnabled) {
          partIndex += 1;
          const fileName = `${runStamp}_part${String(partIndex).padStart(3, '0')}.json`;
          const filePath = path.join(archiveDir, fileName);
          await fs.promises.writeFile(filePath, JSON.stringify(recordHistoryList, null, 2), 'utf8');
          archivedCount += recordHistoryList.length;
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
        archivedCount,
        archiveEnabled,
        useTime: `${new Date().getTime() - startTime}/ms`,
      });
    },
  };
};
