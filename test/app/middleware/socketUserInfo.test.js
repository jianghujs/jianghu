'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const socketUserInfo = require('../../../plugins/socket-io/app/middleware/socketUserInfo');
const userInfoUtil = require('../../../app/middleware/middlewareUtil/userInfoUtil');

describe('test/app/middleware/socketUserInfo.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware socketUserInfo', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      // this.socketUserInfo = socketUserInfo();
      this.nextSpy = sinon.spy();
      this.getUserInfoStub = sinon.stub(userInfoUtil, 'getUserInfo');
    });
    afterEach(() => {
      this.getUserInfoStub.restore();
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
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
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

      this.getUserInfoStub.returns(expUser);

      const result = await socketUserInfo(this.ctx);

      assert.deepEqual(this.ctx.userInfo, expUser);
      assert.deepEqual(this.ctx, result);
    });
  });
});
