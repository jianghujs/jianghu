'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../utils');
const packageUtil = require('../../../../app/middleware/middlewareUtil/packageUtil');

describe('test/app/middleware/middlewareUtil/packageUtil.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware packageUtil, saveRequestLogForResource', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
    });
    afterEach(() => {
      this.insertStub.restore();
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
        appData: {
          actionData: {},
        },
      };
      const expResponseBody = {
        status: expResponseStatus,
      };
      const expUser = {
        userId: expUserId,
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      const expInsertData = {
        packageId: expPackageId,
        resourceId: expResourceId,
        deviceId: expDeviceId,
        userIp: '127.0.0.1',
        userAgent: '',
        userIpRegion: '',
        requestBody: JSON.stringify(expRequestBody),
        responseBody: '{"status":200}',
        responseStatus: expResponseStatus,
      };

      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;


      await packageUtil.saveRequestLogForResource(this.ctx);

      // assert.deepEqual(this.insertStub.callCount, 1);
      // assert.deepEqual(this.insertStub.getCall(0).args[0], expInsertData);
    });
  });
  describe('Test middleware packageUtil, updateRequestDemoAndResponseDemo', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
      };
      const whereResult = {
        update: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.updateStub = sinon.stub(whereResult, 'update');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.updateStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expResourceId = 'page.index';
      const expResponseStatus = 200;
      const expPackageId = `package_${Date.now()}`;
      const expActionId = 'getList';
      const expPageId = 'index';
      const expRequestBody = {
        packageId: expPackageId,
        actionId: expActionId,
        appData: {
          pageId: expPageId,
          actionId: expActionId,
          actionData: {
          },
        },
      };
      const expResponseBody = {
        status: expResponseStatus,
      };

      const expUser = {
        userId: expUserId,
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      const expWhereCondition = {
        pageId: expPageId,
        actionId: expActionId,
      };
      const expUpdateData = {
        requestDemo: JSON.stringify(expRequestBody),
        responseDemo: JSON.stringify(expResponseBody),
      };

      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;


      await packageUtil.updateRequestDemoAndResponseDemo(this.ctx);

      assert.deepEqual(this.whereStub.callCount, 1);
      assert.deepEqual(this.whereStub.getCall(0).args[0], expWhereCondition);
      assert.deepEqual(this.updateStub.callCount, 1);
      assert.deepEqual(this.updateStub.getCall(0).args[0], expUpdateData);
    });
  });
});
