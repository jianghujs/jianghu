'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const requestRateLimit = require('../../../app/middleware/requestRateLimit');

describe('test/app/middleware/requestRateLimit.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware requestRateLimit, ignored path/whitelist/blacklist', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext();
      this.ctx.app.config.jianghuConfig.enableRateLimiter = true;
      this.nextSpy = sinon.spy();
      this.requestRateLimit = requestRateLimit();
    });
    afterEach(() => {
      mock.restore();
    });

    it('Ignored path, should success', async () => {
      this.ctx.request.path = `/${this.app.config.appId}/resource/`;
      await this.requestRateLimit(this.ctx, this.nextSpy);

      assert.equal(this.nextSpy.callCount, 1);
    });

    it('IP whitelist, should success', async () => {
      this.ctx.app.config.jianghuConfig.rateLimiterWhitelist = ['127.0.0.1'];
      this.ctx.request.path = `/${this.app.config.appId}/notImportant/`;
      await this.requestRateLimit(this.ctx, this.nextSpy);

      assert.equal(this.nextSpy.callCount, 1);
    });

    it('IP blacklist, should success', async () => {
      this.ctx.app.config.jianghuConfig.rateLimiterBlacklist = ['127.0.0.1'];
      this.ctx.request.path = `/${this.app.config.appId}/notImportant/`;

      assert.rejects(async () => await this.requestRateLimit(this.ctx, this.nextSpy), /request_rate_limit_exceeded/);
    });

    it('Limit number reached, should success', async () => {
      this.ctx.app.config.jianghuConfig.rateLimiterWhitelist = [];
      this.ctx.app.config.jianghuConfig.rateLimiterBlacklist = [];
      this.ctx.request.path = `/${this.app.config.appId}/wp-admin.php/`;
      const maxNum = this.ctx.app.config.jianghuConfig.rateLimiterMax;
      for (let i = 0; i < maxNum; ++i) {
        await this.requestRateLimit(this.ctx, this.nextSpy);
      }

      assert.rejects(async () => await this.requestRateLimit(this.ctx, this.nextSpy), /request_rate_limit_exceeded/);
    });
  });
})
