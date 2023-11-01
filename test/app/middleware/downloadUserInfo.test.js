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
      const pathObj = {
        join: () => {},
      };
      const staticObj = {
        static: () => {},
      };
      this.pathJoinStub = sinon.stub(pathObj, 'join');
      this.staticStub = sinon.stub(staticObj, 'static');
      this.eggStaticMiddlewareStub = sinon.spy();
      this.staticStub.returns(this.eggStaticMiddlewareStub);
      this.downloadUserInfo = proxyquire('../../../app/middleware/downloadUserInfo', {
        path: pathObj,
        'egg-static/app/middleware/static': staticObj,
      })({}, this.app);
      this.redirectStub = sinon.stub(this.ctx, 'redirect');
      this.getUserInfoStub = sinon.stub(userInfoUtil, 'getUserInfo');
    });
    afterEach(() => {
      this.pathJoinStub.restore();
      this.staticStub.restore();
      this.getUserInfoStub.restore();
      this.redirectStub.restore();
      this.eggStaticMiddlewareStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      this.ctx.app.config.jianghuConfig = {
        enableUploadStaticFileCache: true,
        enableUploadStaticFileAuthorization: true,
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
      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      this.getUserInfoStub.returns(expUser);

      await this.downloadUserInfo(this.ctx, this.nextSpy);
      assert.deepEqual(this.getUserInfoStub.callCount, 1);
      assert.deepEqual(this.eggStaticMiddlewareStub.callCount, 1);
      assert.deepEqual(this.eggStaticMiddlewareStub.getCall(0).args[0], this.ctx);
      assert.deepEqual(this.eggStaticMiddlewareStub.getCall(0).args[1], this.nextSpy);
    });
  });
});
