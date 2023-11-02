'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const httpAuthorization = require('../../../app/middleware/httpAuthorization');

describe('test/app/middleware/httpAuthorization.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware httpAuthorization', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext({});
      this.httpAuthorization = httpAuthorization();
      this.nextSpy = sinon.spy();
    });
    afterEach(() => {
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
        username: 'username',
        deviceId: expDeviceId,
        userStatus: 'active',
        md5Salt: 'test',
      };
      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
        userAppList: [],
        userGroupRoleList: [{
          group: 'public',
          role: '*',
          resource: expResourceId,
        }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;


      await this.httpAuthorization(this.ctx, this.nextSpy);

      assert.deepEqual(this.nextSpy.callCount, 1);
    });
    it('should failed, user_status not active', async () => {
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
        deviceId: expDeviceId,
        userStatus: 'inactive',
        md5Salt: 'test',
      };

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
        userAppList: [],
        userGroupRoleList: [{
          group: 'public',
          role: '*',
          resource: expResourceId,
        }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      let error;
      try {
        await this.httpAuthorization(this.ctx, this.nextSpy);
      } catch (err) {
        error = err;
      }

      assert.deepEqual(this.nextSpy.callCount, 0);
      assert.deepEqual(error.errorCode, 'user_status_error');
    });
    it('should failed, user_status banned', async () => {
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
        deviceId: expDeviceId,
        userStatus: 'banned',
        md5Salt: 'test',
      };

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
        userAppList: [],
        userGroupRoleList: [{
          group: 'public',
          role: '*',
          resource: expResourceId,
        }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      let error;
      try {
        await this.httpAuthorization(this.ctx, this.nextSpy);
      } catch (err) {
        error = err;
      }

      assert.deepEqual(this.nextSpy.callCount, 0);
      assert.deepEqual(error.errorCode, 'user_banned');
    });
    it('should failed, request group forbidden', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expResourceId = 'page.index';
      const expResponseStatus = 200;
      const expPackageId = `package_${Date.now()}`;
      const expRequestBody = {
        packageId: expPackageId,
        appData: {
          actionData: {
            groupId: 'groupId1',
          },
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
        groupId: 'groupId2',
        userGroupRoleList: [],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {
          isGroupIdRequired: true,
        },
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      let error;
      try {
        await this.httpAuthorization(this.ctx, this.nextSpy);
      } catch (err) {
        error = err;
      }

      assert.deepEqual(this.nextSpy.callCount, 0);
      assert.deepEqual(error.errorCode, 'request_group_forbidden');
    });
  });
});
