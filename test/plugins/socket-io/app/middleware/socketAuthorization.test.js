'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../../utils');
const socketAuthorization = require('../../../../../plugins/socket-io/app/middleware/socketAuthorization');

describe('test/app/middleware/socketAuthorization.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware socketAuthorization', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        select: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.nextSpy = sinon.spy();
      this.selectStub = sinon.stub(jianghuKnexResult, 'select');
    });
    afterEach(() => {
      this.selectStub.restore();
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
      const expAllUserGroupRoleResourceList = [{
        group: 'public',
        role: '*',
        resource: expResourceId,
      }];

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      this.selectStub.returns(expAllUserGroupRoleResourceList);

      const result = await socketAuthorization(this.ctx);

      assert.deepEqual(this.selectStub.callCount, 1);
      assert.deepEqual(result, this.ctx);
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
      const expAllUserGroupRoleResourceList = [{
        group: 'public',
        role: 'role1',
        resource: expResourceId,
      }];

      this.ctx.userInfo = {
        user: expUser,
        allowResourceList: [{ resourceId: expResourceId }],
      };
      this.ctx.packageResource = {
        resourceId: expResourceId,
        resourceData: {},
      };
      this.ctx.request.body = expRequestBody;
      this.ctx.body = expResponseBody;

      this.selectStub.returns(expAllUserGroupRoleResourceList);

      let error;
      try {
        await socketAuthorization(this.ctx, this.nextSpy);
      } catch (err) {
        error = err;
      }

      assert.deepEqual(this.selectStub.callCount, 1);
      assert.deepEqual(error.errorCode, 'user_status_error');
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
      const expAllUserGroupRoleResourceList = [{
        group: 'notPublic',
        role: '*',
        resource: expResourceId,
      }];

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

      this.selectStub.returns(expAllUserGroupRoleResourceList);

      let error;
      try {
        await socketAuthorization(this.ctx, this.nextSpy);
      } catch (err) {
        error = err;
      }

      assert.deepEqual(this.selectStub.callCount, 1);
      assert.deepEqual(error.errorCode, 'request_group_forbidden');
    });
  });
});
