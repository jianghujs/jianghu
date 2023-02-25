'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const mock = require('egg-mock');
const utils = require('../../utils');
const pageDocUserInfo = require('../../../app/middleware/pageDocUserInfo');
const userInfoUtil = require('../../../app/middleware/middlewareUtil/userInfoUtil');

describe('test/app/middleware/pageDocUserInfo.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware pageDocUserInfo', () => {
    beforeEach(async () => {
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
      this.pageDocUserInfo = pageDocUserInfo();
      this.nextSpy = sinon.spy();
      this.redirectStub = sinon.stub(this.ctx, 'redirect');
      this.selectStub = sinon.stub(jianghuKnexResult, 'select');
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.getUserInfoStub = sinon.stub(userInfoUtil, 'getUserInfo');

      this.pageDocDir = path.join(this.ctx.app.config.baseDir, "app/view/pageDoc");
      this.readMeFile = path.join(this.pageDocDir, "README.md");
      await fs.promises.mkdir(this.pageDocDir, { recursive: true });
      await fs.promises.writeFile(this.readMeFile, "Unit Testing");
    });
    afterEach(async () => {
      this.getUserInfoStub.restore();
      this.selectStub.restore();
      this.redirectStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      mock.restore();

      await fs.promises.unlink(this.readMeFile)
        .then(_ => fs.promises.rmdir(this.pageDocDir))
        // the "view" directory
        .then(_ => fs.promises.rmdir(path.dirname(this.pageDocDir)));
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
        user: {
          userId: expUserId,
          deviceId: 'web'
        }
      };

      this.ctx.userInfo = {
        user: expUser,
        allowPageList: [{ page: expPageId }],
      };
      this.ctx.packagePage = {
        page: expPageId,
      };
      this.ctx.request.path = `/${this.ctx.app.config.appId}/pageDoc/README.md`;
      this.ctx.body = expResponseBody;

      this.getUserInfoStub.returns(expUser);

      await this.pageDocUserInfo(this.ctx, this.nextSpy);

      assert.deepEqual(this.getUserInfoStub.callCount, 1);
      assert.deepEqual(this.ctx.userInfo, expUser);
      assert.deepEqual(this.nextSpy.callCount, 0);
    });
  });
});
