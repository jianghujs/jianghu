'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const pageHook = require('../../../app/middleware/pageHook');

describe('test/app/middleware/pageHook.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware pageHook', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.pageHook = pageHook();
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
      const expPageHook = {
        beforeHook: [
          { field: 'key', service: 'beforeService', serviceFunc: 'beforeFunction' },
        ],
      };

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
      };
      this.ctx.packagePage = {
        pageHook: JSON.stringify(expPageHook),
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      this.beforeFunctionStub.returns('value');
      await this.pageHook(this.ctx, this.nextSpy);

      assert.deepEqual(this.beforeFunctionStub.callCount, 1);
      assert.deepEqual(this.ctx.hookResult.key, 'value');
      assert.deepEqual(this.nextSpy.callCount, 1);
    });
  });
});
