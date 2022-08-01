'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const pageUserInfo = require('../../../app/middleware/pageUserInfo');
const userInfoUtil = require('../../../app/middleware/middlewareUtil/userInfoUtil');

describe('test/app/middleware/pageUserInfo.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware pageUserInfo', () => {
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
      this.pageUserInfo = pageUserInfo();
      this.nextSpy = sinon.spy();
      this.redirectStub = sinon.stub(this.ctx, 'redirect');
      this.selectStub = sinon.stub(jianghuKnexResult, 'select');
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.getUserInfoStub = sinon.stub(userInfoUtil, 'getUserInfo');
    });
    afterEach(() => {
      this.getUserInfoStub.restore();
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

      this.ctx.userInfo = {
        user: expUser,
        allowPageList: [{ page: expPageId }],
      };
      this.ctx.packagePage = {
        page: expPageId,
      };
      this.ctx.request.path = `/${this.ctx.app.config.appId}/pageDoc/index`;
      this.ctx.body = expResponseBody;

      this.getUserInfoStub.returns(expUser);

      await this.pageUserInfo(this.ctx, this.nextSpy);

      assert.deepEqual(this.getUserInfoStub.callCount, 1);
      assert.deepEqual(this.ctx.userInfo, expUser);
      assert.deepEqual(this.nextSpy.callCount, 1);
    });
  });
});
