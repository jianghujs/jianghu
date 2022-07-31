'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../../utils');
const userInfoUtil = require('../../../../app/middleware/middlewareUtil/userInfoUtil');

describe('test/app/middleware/middlewareUtil/userInfoUtil.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test middleware userInfoUtil, getUserInfo', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.captureUserRuleDataStub = sinon.stub(userInfoUtil, 'captureUserRuleData');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.captureUserRuleDataStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expDeviceId = `${Date.now()}`;
      const expDeviceType = 'PC';
      const expPackageId = `package_${Date.now()}`;
      const expActionId = 'getList';
      const expPageId = 'index';
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
        operationAt: Date.now(),
      };
      const expUser = {
        userId: expUserId,
        userStatus: 'active',
        deviceId: expUserSession.deviceId,
        deviceType: expUserSession.deviceType,
        loginTime: expUserSession.operationAt,
      };
      const expRequestBody = {
        packageId: expPackageId,
        actionId: expActionId,
        appData: {
          authToken: expToken,
          pageId: expPageId,
          actionId: expActionId,
          actionData: {
          },
        },
      };
      const expUserResult = {
        ...expUser,
        password: 'xxxx',
        clearTextPassword: '123456',
        md5Salt: 'x23sdf23f23',
      };
      const captureUserRuleDataResult = {
        test: 1,
      };
      const expResult = {
        userId: expUser.userId,
        username: expUser.username,
        user: expUser,
        ...captureUserRuleDataResult,
      };

      // get userSession
      this.firstStub.onCall(0).returns(expUserSession);
      // get userinfo
      this.firstStub.onCall(1).returns(expUserResult);
      this.captureUserRuleDataStub.returns(captureUserRuleDataResult);

      const result = await userInfoUtil.getUserInfo({
        config: this.app.config,
        body: expRequestBody,
        jianghuKnex: this.app.jianghuKnex,
      });

      assert.deepEqual(this.whereStub.getCall(0).args[0], { authToken: expToken });
      assert.deepEqual(this.whereStub.getCall(1).args[0], { userId: expUserSession.userId });
      assert.deepEqual(this.captureUserRuleDataStub.callCount, 1);
      assert.deepEqual(result, expResult);
    });
  });

  describe('Test middleware userInfoUtil, getUserRuleDataFromCache', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.captureUserRuleDataStub = sinon.stub(userInfoUtil, 'captureUserRuleData');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.captureUserRuleDataStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expContent = {
        test: 'content',
      };
      const firstResult = {
        content: JSON.stringify(expContent),
      };

      this.firstStub.returns(firstResult);

      const result = await userInfoUtil.getUserRuleDataFromCache(this.app.jianghuKnex, expUserId);


      assert.deepEqual(this.whereStub.callCount, 1);
      assert.deepEqual(this.whereStub.getCall(0).args[0], expUserId);
      assert.deepEqual(this.firstStub.callCount, 1);
      assert.deepEqual(result, expContent);
    });
  });

  describe('Test middleware userInfoUtil, captureUserRuleData', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.getRuleIdListStub = sinon.stub(userInfoUtil, 'getRuleIdList');
      this.captureAllowResourceListStub = sinon.stub(userInfoUtil, 'captureAllowResourceList');
      this.captureAllowPageListStub = sinon.stub(userInfoUtil, 'captureAllowPageList');
      this.captureAppListStub = sinon.stub(userInfoUtil, 'captureAppList');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.getRuleIdListStub.restore();
      this.captureAllowResourceListStub.restore();
      this.captureAllowPageListStub.restore();
      this.captureAppListStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expUserGroupRoleList = [{ id: 1 }];
      const expAllowResourceList = [{ id: 1 }];
      const expAllowPageList = [{ id: 1 }];
      const expUserAppList = [{ id: 1 }];
      const expGetRoleIdListResult = {
        userIdList: [{ userId: 1 }],
        groupIdList: [{ groupId: 1 }],
        roleIdList: [{ roleId: 1 }],
      };
      const expResult = { userGroupRoleList: expUserGroupRoleList, allowResourceList: expAllowResourceList, allowPageList: expAllowPageList, userAppList: expUserAppList };

      this.selectStub.returns(expUserGroupRoleList);
      this.getRuleIdListStub.returns(expGetRoleIdListResult);
      this.captureAllowResourceListStub.returns(expAllowResourceList);
      this.captureAllowPageListStub.returns(expAllowPageList);
      this.captureAppListStub.returns(expUserAppList);
      const result = await userInfoUtil.captureUserRuleData({ jianghuKnex: this.app.jianghuKnex, appType: 'multiApp', userId: expUserId });


      assert.deepEqual(this.selectStub.callCount, 1);
      assert.deepEqual(this.getRuleIdListStub.callCount, 1);
      assert.deepEqual(this.captureAllowResourceListStub.callCount, 1);
      assert.deepEqual(this.captureAllowPageListStub.callCount, 1);
      assert.deepEqual(this.captureAppListStub.callCount, 1);
      assert.deepEqual(result, expResult);
    });
  });

  describe('Test middleware userInfoUtil, captureAppList', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.getRuleIdListStub = sinon.stub(userInfoUtil, 'getRuleIdList');
      this.captureAllowResourceListStub = sinon.stub(userInfoUtil, 'captureAllowResourceList');
      this.captureAllowPageListStub = sinon.stub(userInfoUtil, 'captureAllowPageList');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.getRuleIdListStub.restore();
      this.captureAllowResourceListStub.restore();
      this.captureAllowPageListStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expResult = { id: 1 };

      this.selectStub.returns(expResult);

      const result = await userInfoUtil.captureAppList({ jianghuKnex: this.app.jianghuKnex, userId: expUserId });


      assert.deepEqual(this.whereStub.callCount, 1);
      assert.deepEqual(this.whereStub.getCall(0).args[0], { userId: expUserId });
      assert.deepEqual(this.selectStub.callCount, 1);
      assert.deepEqual(result, expResult);
    });
  });

  describe('Test middleware userInfoUtil, getRuleIdList', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      mock.restore();
    });
    it('should success, has groupId and userId', async () => {
      const expUserId = 'test101';
      const expGroupId = 'groupId1';
      const expUserGroupRoleList = [{ groupId: '1', roleId: '11', userId: '111' }, { groupId: '2', roleId: '22', userId: '333' }];
      const expGroupIdList = [ '1', '2', '*' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ expUserId, '*' ];
      const expResult = {
        userIdList: expUserIdList,
        groupIdList: expGroupIdList,
        roleIdList: expRoleIdList,
      };

      const result = userInfoUtil.getRuleIdList(expGroupId, expUserId, expUserGroupRoleList);

      assert.deepEqual(result, expResult);
    });
    it('should success, has userId no groupId', async () => {
      const expUserId = 'test101';
      const expGroupId = null;
      const expUserGroupRoleList = [{ groupId: '1', roleId: '11', userId: '111' }, { groupId: '2', roleId: '22', userId: '333' }];
      const expGroupIdList = [ '1', '2', '*', 'public', 'login' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ expUserId, '*' ];
      const expResult = {
        userIdList: expUserIdList,
        groupIdList: expGroupIdList,
        roleIdList: expRoleIdList,
      };

      const result = userInfoUtil.getRuleIdList(expGroupId, expUserId, expUserGroupRoleList);

      assert.deepEqual(result, expResult);
    });
    it('should success, no userId no groupId', async () => {
      const expUserId = null;
      const expGroupId = null;
      const expUserGroupRoleList = [{ groupId: '1', roleId: '11', userId: '111' }, { groupId: '2', roleId: '22', userId: '333' }];
      const expGroupIdList = [ '1', '2', '*', 'public' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ '*' ];
      const expResult = {
        userIdList: expUserIdList,
        groupIdList: expGroupIdList,
        roleIdList: expRoleIdList,
      };

      const result = userInfoUtil.getRuleIdList(expGroupId, expUserId, expUserGroupRoleList);

      assert.deepEqual(result, expResult);
    });
  });

  describe('Test middleware userInfoUtil, captureAllowResourceList', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        select: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.jianghuKnexSelectStub = sinon.stub(jianghuKnexResult, 'select');
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.computeAllowListStub = sinon.stub(userInfoUtil, 'computeAllowList');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.jianghuKnexSelectStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.computeAllowListStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expGroupIdList = [ '1', '2', '*' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ expUserId, '*' ];
      const expAllResourceList = [{ id: 1, pageId: 'index', actionId: 'selectItem' }, { id: 2, pageId: 'index', actionId: 'insert' }];
      const expAllUserGroupRoleResourceList = [{ id: 1, pageId: 'index', actionId: 'selectItem' }];
      const expAllowResourceList = [{
        resourceId: 'index.selectItem',
        pageId: 'index',
        actionId: 'selectItem',
        resourceType: 'request',
      }];
      const expResult = expAllowResourceList;

      this.jianghuKnexSelectStub.onCall(0).returns(expAllResourceList);
      this.jianghuKnexSelectStub.onCall(1).returns(expAllUserGroupRoleResourceList);
      this.computeAllowListStub.returns(expAllowResourceList);

      const result = await userInfoUtil.captureAllowResourceList({
        jianghuKnex: this.app.jianghuKnex,
        userIdList: expUserIdList,
        groupIdList: expGroupIdList,
        roleIdList: expRoleIdList,
      });


      assert.deepEqual(this.jianghuKnexSelectStub.callCount, 2);
      assert.deepEqual(this.computeAllowListStub.callCount, 1);

      assert.deepEqual(result, expResult);
    });
  });

  describe('Test middleware userInfoUtil, captureAllowPageList', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        select: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.jianghuKnexSelectStub = sinon.stub(jianghuKnexResult, 'select');
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.computeAllowListStub = sinon.stub(userInfoUtil, 'computeAllowList');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.jianghuKnexSelectStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.computeAllowListStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expGroupIdList = [ '1', '2', '*' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ expUserId, '*' ];
      const expAllPageList = [{ id: 1, pageId: 'index', pageName: '首页', pageType: 'static', sort: 1 }, { id: 2, pageId: 'userManagement', pageName: '用户管理', pageType: 'static', sort: 2 }];
      const expAllUserGroupRolePageList = [{ id: 1, pageId: 'index', pageName: '首页', pageType: 'static', sort: 1 }, { id: 2, pageId: 'userManagement', pageName: '用户管理', pageType: 'static', sort: 2 }];
      const expAllowPageList = [{
        pageId: 'index',
        pageName: '首页',
        pageType: 'static',
        sort: 1,
      }];
      const expResult = expAllowPageList;

      this.jianghuKnexSelectStub.onCall(0).returns(expAllPageList);
      this.jianghuKnexSelectStub.onCall(1).returns(expAllUserGroupRolePageList);
      this.computeAllowListStub.returns(expAllowPageList);

      const result = await userInfoUtil.captureAllowPageList({
        jianghuKnex: this.app.jianghuKnex,
        userIdList: expUserIdList,
        groupIdList: expGroupIdList,
        roleIdList: expRoleIdList,
      });


      assert.deepEqual(this.jianghuKnexSelectStub.callCount, 2);
      assert.deepEqual(this.computeAllowListStub.callCount, 1);

      assert.deepEqual(result, expResult);
    });
  });
  describe('Test middleware userInfoUtil, computeAllowList', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        select: () => {},
        innerJoin: () => {},
      };
      const whereResult = {
        jhUpdate: () => {},
        first: () => {},
        select: () => {},
      };
      const innerJoinResult = {
        innerJoin: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.innerJoinStub = sinon.stub(jianghuKnexResult, 'innerJoin').returns(innerJoinResult);
      this.jianghuKnexSelectStub = sinon.stub(jianghuKnexResult, 'select');
      this.returnInnerJoinStub = sinon.stub(innerJoinResult, 'innerJoin').returns(innerJoinResult);
      this.innerJoinWhereStub = sinon.stub(innerJoinResult, 'where').returns(whereResult);
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.firstStub = sinon.stub(whereResult, 'first');
      this.selectStub = sinon.stub(whereResult, 'select');
      this.checkResourceStub = sinon.stub(userInfoUtil, 'checkResource');
      this.checkRuleStub = sinon.stub(userInfoUtil, 'checkRule');
    });
    afterEach(() => {
      this.insertStub.restore();
      this.jianghuKnexSelectStub.restore();
      this.innerJoinStub.restore();
      this.returnInnerJoinStub.restore();
      this.innerJoinWhereStub.restore();
      this.whereStub.restore();
      this.firstStub.restore();
      this.selectStub.restore();
      this.checkResourceStub.restore();
      this.checkRuleStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expFieldKey = 'page';
      const expAllList = [{ id: 1, pageId: 'index', pageName: '首页', pageType: 'static', sort: 1 }, { id: 2, pageId: 'userManagement', pageName: '用户管理', pageType: 'static', sort: 2 }];
      const expAllRuleList = [{ id: 1, pageId: 'index', allowOrDeny: 'allow' }, { id: 2, pageId: 'userManagement', allowOrDeny: 'allow' }];
      const expGroupIdList = [ '1', '2', '*' ];
      const expRoleIdList = [ '11', '22', '*' ];
      const expUserIdList = [ expUserId, '*' ];
      const expResult = expAllList;

      this.checkRuleStub.returns(true);
      this.checkResourceStub.returns(true);

      const result = await userInfoUtil.computeAllowList(
        expFieldKey,
        expAllList,
        expAllRuleList,
        expUserIdList,
        expGroupIdList,
        expRoleIdList
      );


      assert.deepEqual(this.checkRuleStub.callCount, 12);
      assert.deepEqual(this.checkResourceStub.callCount, 4);

      assert.deepEqual(result, expResult);
    });
  });
  describe('Test middleware userInfoUtil, checkRule', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        select: () => {},
        innerJoin: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
    });
    afterEach(() => {
      mock.restore();
    });
    it('should success', async () => {
      const expCheckValueList = [ 'gaibang' ];
      const expRuleFieldValue = 'gaibang';


      const result = await userInfoUtil.checkRule(
        expCheckValueList,
        expRuleFieldValue
      );

      assert.deepEqual(result, true);
    });
    it('should success, has *', async () => {
      const expCheckValueList = [ 'wudang' ];
      const expRuleFieldValue = '*,gaibang';


      const result = await userInfoUtil.checkRule(
        expCheckValueList,
        expRuleFieldValue
      );

      assert.deepEqual(result, true);
    });
  });
  describe('Test middleware userInfoUtil, checkResource', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        insert: () => {},
        where: () => {},
        select: () => {},
        innerJoin: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
    });
    afterEach(() => {
      mock.restore();
    });
    it('should success', async () => {
      const expCheckResource = 'app1.student.res1';
      const expRuleResource = 'app1.student.res1';

      const result = await userInfoUtil.checkResource(
        expCheckResource,
        expRuleResource
      );

      assert.deepEqual(result, true);
    });
    it('should success, has *', async () => {
      const expCheckResource = 'app1.student.res1';
      const expRuleResource = 'app1.student.*';

      const result = await userInfoUtil.checkResource(
        expCheckResource,
        expRuleResource
      );

      assert.deepEqual(result, true);
    });
  });
});
