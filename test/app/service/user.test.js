'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../../utils');
const path = require('path');
const md5 = require('md5-node');
const sinon = require('sinon');
const idGenerateUtil = require('../../../app/common/idGenerateUtil');

describe('test/app/service/user.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });
  afterEach(mock.restore);
  describe('Test service user, passwordLogin', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        jhUpdate: () => {},
        jhInsert: () => {},
        where: () => {},
      };
      const whereResult = {
        first: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.jhUpdateStub = sinon.stub(jianghuKnexResult, 'jhUpdate');
      this.firstStub = sinon.stub(whereResult, 'first');
      this.uuidStub = sinon.stub(idGenerateUtil, 'uuid');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.jhInsertStub.restore();
      this.jhUpdateStub.restore();
      this.firstStub.restore();
      this.uuidStub.restore();
    });
    it('should success, normal login', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expPassword = '123456';
      const expDeviceType = 'pc';
      const expUser = {
        userId: expUserId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      expUser.password = md5(`${expPassword}_${expUser.md5Salt}`);
      const expToken = `tokenadf_${Date.now()}`;
      const expUserSession = {
        userId: expUserId,
        deviceId: expDeviceId,
        userAgent: '',
        userIp: '127.0.0.1',
        userIpRegion: '',
        deviceType: expDeviceType,
        authToken: expToken,
      };
      const expResult = {
        authToken: expToken,
        userId: expUserId,
        deviceId: expDeviceId,
      };

      this.ctx.request.body = {
        appData: {
          actionData: {
            userId: expUserId,
            password: expPassword,
            deviceId: expDeviceId,
            deviceType: expDeviceType,
          },
        },
      };

      this.uuidStub.returns(expToken);
      this.firstStub.onCall(0).returns(expUser);
      this.firstStub.onCall(1).returns(null);

      const result = await this.ctx.service.user.passwordLogin();
      assert.equal(this.firstStub.callCount, 2);
      assert.equal(this.jhInsertStub.callCount, 1);
      assert.deepEqual(this.jhInsertStub.getCall(0).args[0], expUserSession);
      assert.deepEqual(result, expResult);
    });

    it('should failed, user status is banned', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expPassword = '123456';
      const expDeviceType = 'pc';
      const expUser = {
        userId: expUserId,
        userStatus: 'banned',
        md5Salt: 'test',
      };
      expUser.password = md5(`${expPassword}_${expUser.md5Salt}`);
      const expToken = `tokenadf_${Date.now()}`;

      this.ctx.request.body = {
        appData: {
          actionData: {
            userId: expUserId,
            password: expPassword,
            deviceId: expDeviceId,
            deviceType: expDeviceType,
          },
        },
      };

      this.uuidStub.returns(expToken);
      this.firstStub.onCall(0).returns(expUser);
      this.firstStub.onCall(1).returns(null);
      let error;
      try {
        await this.ctx.service.user.passwordLogin();
      } catch (err) {
        error = err;
      }

      assert.equal(this.firstStub.callCount, 1);
      assert.equal(this.jhInsertStub.callCount, 0);
      assert.equal(error.errorCode, 'user_banned');
    });

  });

  describe('Test service user, logout', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.jhUpdateStub = sinon.stub(whereResult, 'jhUpdate');
      this.firstStub = sinon.stub(whereResult, 'first');
      this.uuidStub = sinon.stub(idGenerateUtil, 'uuid');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.jhInsertStub.restore();
      this.jhUpdateStub.restore();
      this.firstStub.restore();
      this.uuidStub.restore();
    });
    it('should success, logout', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expDeviceType = 'pc';
      const expUser = {
        userId: expUserId,
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      const expToken = `tokenadf_${Date.now()}`;
      const expUserSession = {
        id: 1,
        userId: expUserId,
        deviceId: expDeviceId,
        userAgent: '',
        userIp: '127.0.0.1',
        userIpRegion: '',
        deviceType: expDeviceType,
        authToken: expToken,
      };

      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {},
        },
      };

      this.uuidStub.returns(expToken);
      this.firstStub.onCall(0).returns(expUser);
      this.firstStub.onCall(1).returns(expUserSession);

      const result = await this.ctx.service.user.logout();

      assert.equal(this.firstStub.callCount, 2);
      assert.equal(this.jhUpdateStub.callCount, 1);
      assert.equal(this.whereStub.callCount, 3);

      assert.deepEqual(this.whereStub.getCall(0).args[0], { userId: expUserId });
      assert.deepEqual(this.whereStub.getCall(1).args[0], { userId: expUserId, deviceId: expDeviceId });
      assert.deepEqual(this.whereStub.getCall(2).args[0], { id: expUserSession.id });
      assert.deepEqual(this.jhUpdateStub.getCall(0).args[0], { authToken: '' });
      assert.deepEqual(result, {});
    });
  });

  describe('Test service user, userInfo', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.jhUpdateStub = sinon.stub(whereResult, 'jhUpdate');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.firstStub = sinon.stub(whereResult, 'first');
      this.uuidStub = sinon.stub(idGenerateUtil, 'uuid');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.jhInsertStub.restore();
      this.jhUpdateStub.restore();
      this.firstStub.restore();
      this.uuidStub.restore();
      this.selectStub.restore();
    });
    it('should success, userInfo', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expUser = {
        userId: expUserId,
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
        socketStatus: 'online',
      };
      const expSocketList = [
        {
          userId: '123',
          deviceId: '33333',
          socketStatus: 'online',
        },
      ];

      this.ctx.userInfo = {
        user: expUser,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {},
        },
      };

      this.selectStub.returns(expSocketList);

      const result = await this.ctx.service.user.userInfo();

      assert.equal(this.whereStub.callCount, 1);
      assert.equal(this.selectStub.callCount, 1);

      assert.deepEqual(this.whereStub.getCall(0).args[0], { userId: expUserId, socketStatus: 'online' });
      assert.deepEqual(result, { user: expUser, socketList: expSocketList });
    });
  });

  describe('Test service user, resetPassword', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.jhUpdateStub = sinon.stub(whereResult, 'jhUpdate');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.firstStub = sinon.stub(whereResult, 'first');
      this.uuidStub = sinon.stub(idGenerateUtil, 'uuid');
    });
    afterEach(() => {
      this.whereStub.restore();
      this.jhInsertStub.restore();
      this.jhUpdateStub.restore();
      this.firstStub.restore();
      this.uuidStub.restore();
      this.selectStub.restore();
    });
    it('should success, resetPassword', async () => {
      const expUserId = 'test101';
      const expOldPassword = '123456';
      const expNewPassword = '654321';
      const expNewSalt = '122fasdf23s';
      const expCtxUser = {
        userId: expUserId,
      };
      const expUser = {
        userId: expUserId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      expUser.password = md5(`${expOldPassword}_${expUser.md5Salt}`);
      const expNewHashPassword = md5(`${expNewPassword}_${expNewSalt}`);
      const expNewUserInfo = {
        password: expNewHashPassword,
        clearTextPassword: expNewPassword,
        md5Salt: expNewSalt,
      };

      this.ctx.userInfo = {
        user: expCtxUser,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            oldPassword: expOldPassword,
            newPassword: expNewPassword,
          },
        },
      };

      this.uuidStub.returns(expNewSalt);
      this.firstStub.onCall(0).returns(expUser);

      const result = await this.ctx.service.user.resetPassword();

      assert.equal(this.whereStub.callCount, 3);
      assert.equal(this.firstStub.callCount, 1);
      assert.equal(this.jhUpdateStub.callCount, 2);
      assert.deepEqual(this.whereStub.getCall(0).args[0], { userId: expUser.userId });
      assert.deepEqual(this.whereStub.getCall(1).args[0], { userId: expUser.userId });
      assert.deepEqual(this.whereStub.getCall(2).args[0], { userId: expUser.userId });
      assert.deepEqual(this.jhUpdateStub.getCall(0).args[0], expNewUserInfo);
      assert.deepEqual(this.jhUpdateStub.getCall(1).args[0], { authToken: '' });
      assert.deepEqual(result, {});
    });
    it('should failed, oldPassword error', async () => {
      const expUserId = 'test101';
      const expOldPassword = '123456';
      const expNewPassword = '654321';
      const expNewSalt = '122fasdf23s';
      const expCtxUser = {
        userId: expUserId,
      };
      const expUser = {
        userId: expUserId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      expUser.password = md5(`${123123}_${expUser.md5Salt}`);

      this.ctx.userInfo = {
        user: expCtxUser,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            oldPassword: expOldPassword,
            newPassword: expNewPassword,
          },
        },
      };

      this.uuidStub.returns(expNewSalt);
      this.firstStub.onCall(0).returns(expUser);

      let error;
      try {
        await this.ctx.service.user.resetPassword();
      } catch (err) {
        error = err;
      }

      assert.equal(this.whereStub.callCount, 1);
      assert.equal(this.firstStub.callCount, 1);
      assert.equal(this.jhUpdateStub.callCount, 0);
      assert.deepEqual(this.whereStub.getCall(0).args[0], { userId: expUser.userId });
      assert.deepEqual(error.errorCode, 'user_password_reset_old_error');
    });
  });
});
