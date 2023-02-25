'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const userInfoUtil = require('../../../app/middleware/middlewareUtil/userInfoUtil');
const proxyquire = require('proxyquire');

describe('test/app/middleware/downloadUserInfo.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware downloadUserInfo', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.nextSpy = sinon.spy();
      this.rangeStub = sinon.stub();
      this.sendStub = sinon.stub();
      this.downloadUserInfo = proxyquire('../../../app/middleware/downloadUserInfo', {
        'koa-range': this.rangeStub,
        'koa-send': this.sendStub,
      })();
      this.redirectStub = sinon.stub(this.ctx, 'redirect');
      this.getUserInfoStub = sinon.stub(userInfoUtil, 'getUserInfo');
    });
    afterEach(() => {
      this.getUserInfoStub.restore();
      this.redirectStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      this.ctx.app.config.jianghuConfig = {
        enableUploadStaticFileCache: true,
        enableUploadStaticFileAuthorization: true
      };

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
        username: 'username',
        user: {
          userId: expUserId,
          username: 'username',
          deviceId: expDeviceId,
          userStatus: 'active',
          md5Salt: 'test',
        },
      };
      const expResult = {};

      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      this.getUserInfoStub.returns(expUser);
      this.rangeStub.returns(expResult);

      const result = await this.downloadUserInfo(this.ctx, this.nextSpy);
      assert.deepEqual(this.getUserInfoStub.callCount, 1);
      assert.deepEqual(this.rangeStub.callCount, 1);
      assert.deepEqual(this.sendStub.callCount, 1);
      assert(result, expResult);
    });
  });
});
