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

      // 遍历
      const walk = function(dir, done) {
        let results = [];
        fs.readdir(dir, (err, list) => {
          if (err) return done(err);
          let i = 0;
          (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
              if (stat && stat.isDirectory()) {
                walk(file, (err, res) => {
                  results = results.concat(res);
                  next();
                });
              } else {
                results.push(file);
                next();
              }
            });
          })();
        });
      };


      // 获取日志文件夹文件
      walk(path.join(app.baseDir, 'logs'), async (error, logFiles) => {
        if (!logFiles || !logFiles.length) {
          logger.error('遍历文件失败或无文件', { error, logFiles });
          return;
        }
        // 过滤要清理的日志文件
        const dateReg = /\d\d\d\d-\d\d-\d\d/ig;
        for (const logFile of logFiles) {
          const fileName = path.basename(logFile);
          const matchPrefix = ctx.app.config.jianghuConfig.autoClearOldLogFilePrefixList.find(prefix => fileName.startsWith(prefix));
          if (!matchPrefix) {
            continue;
          }
          const dateMatches = [ ...fileName.matchAll(dateReg) ];
          if (dateMatches && dateMatches.length) {
            const date = dateMatches[0];
            const dayDiff = dayjs().diff(dayjs(date), 'day');
            if (dayDiff >= ctx.app.config.jianghuConfig.autoClearOldLogBeforeDays) {
              // 大于保留日期则删除
              await fs.promises.rm(logFile);
            }
          }
        }

        const endTime = new Date().getTime();
        logger.info('[clearOldLogFile.js]', { useTime: `${endTime - startTime}/ms` });
      });

    },

  };
};
