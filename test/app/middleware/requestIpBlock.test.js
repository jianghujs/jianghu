'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const requestIpBlock = require('../../../plugins/ip-block/app/middleware/requestIpBlock');

describe('test/app/middleware/requestIpBlock.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware requestIpBlock, ignored path/whitelist/blacklist', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext();
      this.ctx.app.config.jianghuConfig.enableRateLimiter = true;
      this.nextSpy = sinon.spy();
      this.requestIpBlock = requestIpBlock();
    });
    afterEach(() => {
      mock.restore();
    });

    it('IP whitelist, should success', async () => {
      this.ctx.app.config.jianghuConfig.rateLimiterWhitelist = [ '127.0.0.1' ];
      this.ctx.request.path = `/${this.app.config.appId}/notImportant/`;
      await this.requestIpBlock(this.ctx, this.nextSpy);

      assert.equal(this.nextSpy.callCount, 1);
    });

    it('IP blacklist, should success', async () => {
      this.ctx.app.config.jianghuConfig.rateLimiterBlacklist = [ '127.0.0.1' ];
      this.ctx.request.path = `/${this.app.config.appId}/notImportant/`;

      assert.rejects(async () => await this.requestIpBlock(this.ctx, this.nextSpy), /request_rate_limit_exceeded/);
    });

  });
});
