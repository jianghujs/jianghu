'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const pagePackage = require('../../../app/middleware/pagePackage');

describe('test/app/middleware/pagePackage.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware pagePackage', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        select: () => {},
        where: () => {},
      };
      const whereResult = {
        first: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.pagePackage = pagePackage();
      this.nextSpy = sinon.spy();
      this.redirectStub = sinon.stub(this.ctx, 'redirect');
      this.selectStub = sinon.stub(jianghuKnexResult, 'select');
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
    });
    afterEach(() => {
      this.selectStub.restore();
      this.redirectStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expPageId = 'index';
      const expResponseStatus = 200;
      const expResponseBody = {
        status: expResponseStatus,
      };
      const expUser = {
        userId: expUserId,
        username: 'username',
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      const expPage = {
      };

      this.ctx.userInfo = {
        user: expUser,
        allowPageList: [{ page: expPageId }],
      };
      this.ctx.packagePage = {
        page: expPageId,
      };
      this.ctx.request.path = `/${this.ctx.app.config.appId}/page/index`;
      this.ctx.body = expResponseBody;

      this.firstStub.returns(expPage);

      await this.pagePackage(this.ctx, this.nextSpy);

      assert.deepEqual(this.whereStub.callCount, 1);
      assert.deepEqual(this.firstStub.callCount, 1);
      assert.deepEqual(this.redirectStub.callCount, 0);
      assert.deepEqual(this.nextSpy.callCount, 1);
    });
    it('should success, multi level path', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expPageId = 'index';
      const expResponseStatus = 200;
      const expResponseBody = {
        status: expResponseStatus,
      };
      const expUser = {
        userId: expUserId,
        username: 'username',
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      const expPage = {
        pageType: 'seo',
      };

      this.ctx.userInfo = {
        user: expUser,
        allowPageList: [{ page: expPageId }],
      };
      this.ctx.packagePage = {
        page: expPageId,
      };
      this.ctx.request.path = `/${this.ctx.app.config.appId}/page/page1/param1`;
      this.ctx.body = expResponseBody;

      this.firstStub.returns(expPage);

      await this.pagePackage(this.ctx, this.nextSpy);

      assert.deepEqual(this.whereStub.callCount, 1);
      assert.deepEqual(this.firstStub.callCount, 1);
      assert.deepEqual(this.redirectStub.callCount, 0);
      assert.deepEqual(this.ctx.pathParams, [ 'param1' ]);
      assert.deepEqual(this.nextSpy.callCount, 1);
    });
    it('should success, no page', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expPageId = 'index';
      const expResponseStatus = 200;
      const expResponseBody = {
        status: expResponseStatus,
      };
      const expUser = {
        userId: expUserId,
        username: 'username',
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };

      this.ctx.userInfo = {
        user: expUser,
        allowPageList: [{ page: expPageId }],
      };
      this.ctx.packagePage = {
        page: expPageId,
      };
      this.ctx.request.path = `/${this.ctx.app.config.appId}/page/page1/param1`;
      this.ctx.body = expResponseBody;

      this.firstStub.returns(null);

      await this.pagePackage(this.ctx, this.nextSpy);

      assert.deepEqual(this.whereStub.callCount, 2);
      assert.deepEqual(this.firstStub.callCount, 2);
      assert.deepEqual(this.redirectStub.callCount, 1);
      assert.deepEqual(this.nextSpy.callCount, 0);
    });
  });
});
