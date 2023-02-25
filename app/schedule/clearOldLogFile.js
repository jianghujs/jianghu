'use strict';
// 每天 3 点扫描，自动清理旧日志，保留 N 天内的日志

const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

module.exports = app => {
  return {
    schedule: {
      immediate: false, // 应用启动后触发
      cron: '0 0 3 * * *', // 每天 3 点执行
      type: 'worker', // worker: 只有一个worker执行
      disable: !app.config.jianghuConfig.autoClearOldLogFile,
    },
    // 定时任务的入口
    async task(ctx) {
      if (!ctx.app.config.jianghuConfig.autoClearOldLogFile) {
        return;
      }
      const startTime = new Date().getTime();
      const { logger } = app;

      const dateRegex = new RegExp(/\d{4}-\d{2}-\d{2}/);
      const deleteLogFile = async (fileName, fullPath) => {
        const matchPrefix = ctx.app.config.jianghuConfig.autoClearOldLogFilePrefixList.find(prefix => fileName.startsWith(prefix));
        if (!matchPrefix) {
          return;
        }
        const dateMatches = fileName.match(dateRegex);
        if (!dateMatches) {
          return;
        }
        const date = dateMatches[0];
        const dayDiff = dayjs().diff(dayjs(date), 'day');
        if (dayDiff >= ctx.app.config.jianghuConfig.autoClearOldLogBeforeDays) {
          // 大于保留日期则删除
          await fs.promises.unlink(fullPath);
        }
      }

      const walk = async (dirName) => {
        dirName = path.resolve(dirName);
        const files = await fs.promises.readdir(dirName);
        let fullPath = '';
        let stat = null;
        for (const file of files) {
          fullPath = path.join(dirName, file);
          stat = await fs.promises.stat(fullPath);
          if (stat && stat.isDirectory()) {
            await walk(fullPath);
          } else {
            await deleteLogFile(file, fullPath);
          }
        }
      }

      await walk(path.join(app.baseDir, 'logs'));

      const endTime = new Date().getTime();
      logger.info('[clearOldLogFile.js]', { useTime: `${endTime - startTime}/ms` });
    },
  };
};
