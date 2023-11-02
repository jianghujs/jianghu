'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../../utils');
const socketPackageRecord = require('../../../../../plugins/socket-io/app/middleware/socketPackageRecord');
const packageUtil = require('../../../../../app/middleware/middlewareUtil/packageUtil');

describe('test/app/middleware/socketPackageRecord.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware socketPackageRecord', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
      };
      const whereResult = {
        first: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      // this.socketPackageRecord = socketPackageRecord();
      this.nextSpy = sinon.spy();
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.saveRequestLogForResourceStub = sinon.stub(packageUtil, 'saveRequestLogForResource');
      this.updateRequestDemoAndResponseDemoStub = sinon.stub(packageUtil, 'updateRequestDemoAndResponseDemo');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.firstStub.restore();
      this.saveRequestLogForResourceStub.restore();
      this.updateRequestDemoAndResponseDemoStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expResourceId = 'page.index';
      const expResponseStatus = 200;
      const expPackageId = `package_${Date.now()}`;
      const expRequestBody = {
        packageId: expPackageId,
        packageType: 'httpRequest',
        appData: {
          appId: 'jianghu',
          pageId: 'index',
          actionId: 'selectItem',
          actionData: {},
        },
      };
      const expResponseBody = {
        status: expResponseStatus,
      };
      const expUser = {
        userId: expUserId,
        username: 'username',
        user: {
          userId: expUserId,
          username: 'username',
          deviceId: expDeviceId,
          userStatus: 'active',
          md5Salt: 'test',
        },

      };

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;
      this.ctx.app.config.jianghuConfig = {
        updateRequestDemoAndResponseDemo: true,
      };

      await socketPackageRecord(this.ctx);

      assert.deepEqual(this.saveRequestLogForResourceStub.callCount, 1);
      assert.deepEqual(this.updateRequestDemoAndResponseDemoStub.callCount, 1);
    });
  });
});
