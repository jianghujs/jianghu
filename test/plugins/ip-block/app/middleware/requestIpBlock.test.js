'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../../utils');
const fs = require('fs');
const requestIpBlock = require('../../../../../plugins/ip-block/app/middleware/requestIpBlock');

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

  describe('Test middleware requestIpBlock', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext();
      this.ctx.app.config.jianghuConfig.enableRateLimiter = true;
      this.nextSpy = sinon.spy();
      this.readFileSyncStub = sinon.stub(fs, 'readFileSync');
      this.requestIpBlock = requestIpBlock();
    });
    afterEach(() => {
      mock.restore();
      this.readFileSyncStub.restore();
    });

    it('enableIpBlock false, should success', async () => {
      this.ctx.app.config.jianghuConfig.enableIpBlock = false;
      await this.requestIpBlock(this.ctx, this.nextSpy);

      assert.equal(this.readFileSyncStub.callCount, 0);
      assert.equal(this.nextSpy.callCount, 1);
    });

    it('ip not exist, should success', async () => {
      this.ctx.app.config.jianghuConfig.enableIpBlock = true;
      this.ctx.ip = null;
      await this.requestIpBlock(this.ctx, this.nextSpy);
      assert.equal(this.readFileSyncStub.callCount, 0);
      assert.equal(this.nextSpy.callCount, 1);
    });
    it('in ip block list, should failed', async () => {
      this.ctx.app.config.jianghuConfig.enableIpBlock = true;
      this.ctx.app.config.jianghuConfig.ipBlocklist = [ '127.0.0.1' ];
      this.ctx.ip = '127.0.0.1';
      assert.rejects(async () => await this.requestIpBlock(this.ctx, this.nextSpy), /request_rate_limit_exceeded/);
      assert.equal(this.readFileSyncStub.callCount, 0);
      assert.equal(this.nextSpy.callCount, 0);
    });
    it('in ipBlocklistFilePath, should failed', async () => {
      this.ctx.app.config.jianghuConfig.enableIpBlock = true;
      this.ctx.app.config.jianghuConfig.ipBlocklist = [ '127.0.0.1' ];
      this.ctx.app.config.jianghuConfig.ipBlocklistFilePath = 'ipblocklistfile.txt';
      this.ctx.ip = '127.0.0.2';
      this.readFileSyncStub.returns('127.0.0.2\r\n127.0.0.1');
      assert.rejects(async () => await this.requestIpBlock(this.ctx, this.nextSpy), /request_rate_limit_exceeded/);
      assert.equal(this.readFileSyncStub.callCount, 1);
      assert.equal(this.readFileSyncStub.getCall(0).args[0], 'ipblocklistfile.txt');
      assert.equal(this.nextSpy.callCount, 0);
    });

  });
});
