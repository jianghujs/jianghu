'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../../utils');
const xiaochengxuResourceAfterHook = require('../../../../../plugins/xiaochengxu/app/middleware/xiaochengxuResourceAfterHook');

describe('test/app/middleware/xiaochengxuResourceAfterHook.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware xiaochengxuResourceAfterHook', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      // this.xiaochengxuResourceAfterHook = xiaochengxuResourceAfterHook();
      this.nextSpy = sinon.spy();
      this.ctx.service.beforeService = {
        beforeFunction: () => {},
      };
      this.ctx.service.afterService = {
        afterFunction: () => {},
      };
      this.beforeFunctionStub = sinon.stub(this.ctx.service.beforeService, 'beforeFunction');
      this.afterFunctionStub = sinon.stub(this.ctx.service.afterService, 'afterFunction');
    });
    afterEach(() => {
      this.beforeFunctionStub.restore();
      this.afterFunctionStub.restore();
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
        resourceHook: { before: [{ service: 'beforeService', serviceFunction: 'beforeFunction' }], after: [{ service: 'afterService', serviceFunction: 'afterFunction' }] },
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      const result = await xiaochengxuResourceAfterHook(this.ctx);

      assert.deepEqual(this.beforeFunctionStub.callCount, 0);
      assert.deepEqual(this.ctx, result);
      assert.deepEqual(this.afterFunctionStub.callCount, 1);
    });
  });
});
