'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const mock = require('egg-mock');
const utils = require('../../utils');
const clearOldLogFile = require('../../../app/schedule/clearOldLogFile');

describe('test/app/schedule/clearOldLogFile.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test schedule clearOldLogFile', () => {
    beforeEach(async () => {
      this.ctx = this.app.mockContext({});
      this.clearOldLogFile = clearOldLogFile(this.app);

      this.autoClearOldLogBeforeDays = 7;

      let logFileNameDatePart = dayjs().subtract(this.autoClearOldLogBeforeDays, 'days').format('YYYY-MM-DD');
      let logFileName = `common-error.log.${logFileNameDatePart}`;
      this.logFile = path.join(this.app.baseDir, 'logs', logFileName);

      logFileNameDatePart = dayjs().subtract(this.autoClearOldLogBeforeDays - 1, 'days').format('YYYY-MM-DD');
      logFileName = `common-error.log.${logFileNameDatePart}`;
      this.logFileShouldExist = path.join(this.app.baseDir, 'logs', logFileName);

      await fs.promises.writeFile(this.logFile, 'Unit Testing');
      await fs.promises.writeFile(this.logFileShouldExist, 'Unit Testing');
    });

    afterEach(() => {
      mock.restore();
    });

    it('should success', async () => {
      let appId = this.ctx.app.config.appId;
      this.ctx.app.config.jianghuConfig = {
        autoClearOldLogFile: true,
        autoClearOldLogBeforeDays: this.autoClearOldLogBeforeDays,
        autoClearOldLogFilePrefixList: [
          'common-error', 'egg-web', 'egg-schedule', 'egg-knex', 'egg-agent', '_resource_request_log',
          `${appId}.html`, `${appId}.resource`, `${appId}-web`, `${appId}.html`,
        ]
      };

      await this.clearOldLogFile.task(this.ctx);

      assert.equal(fs.existsSync(this.logFile), false);
      assert.equal(fs.existsSync(this.logFileShouldExist), true);
    });
  });
});
