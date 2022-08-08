'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const syncDataToCache = require('../../../app/schedule/syncDataToCache');
const userInfoUtil = require('../../../app/middleware/middlewareUtil/userInfoUtil');

describe('test/app/schedule/syncDataToCache.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test schedule syncDataToCache', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        where: () => {},
        select: () => {},
        insert: () => {},
      };
      const whereResult = {
        update: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      this.syncDataToCache = syncDataToCache(this.app);
      this.nextSpy = sinon.spy();
      this.selectStub = sinon.stub(jianghuKnexResult, 'select');
      this.whereStub = sinon.stub(jianghuKnexResult, 'where').returns(whereResult);
      this.updateStub = sinon.stub(whereResult, 'update');
      this.insertStub = sinon.stub(jianghuKnexResult, 'insert');
      this.captureUserRuleDataStub = sinon.stub(userInfoUtil, 'captureUserRuleData');
    });
    afterEach(() => {
      this.selectStub.restore();
      this.updateStub.restore();
      this.insertStub.restore();
      this.captureUserRuleDataStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expCacheList = [{
        userId: expUserId,
      }];
      const expUserList = [
        {
          userId: expUserId,
        }, {
          userId: 'test2',
        },
      ];
      const expUserRuleData = {};
      const expUpdateInfo = {
        userId: expUserId,
        content: JSON.stringify(expUserRuleData),
      };
      const expInsertData = {
        userId: 'test2',
        content: JSON.stringify(expUserRuleData),
      };

      this.ctx.app.config.jiangHuConfig = {
        enableUserInfoCache: true,
      };

      this.selectStub.onCall(0).returns(expCacheList);
      this.selectStub.onCall(1).returns(expUserList);
      this.captureUserRuleDataStub.returns(expUserRuleData);

      await this.syncDataToCache.task(this.ctx);

      assert.deepEqual(this.selectStub.callCount, 2);
      assert.deepEqual(this.updateStub.callCount, 1);
      assert.deepEqual(this.updateStub.getCall(0).args[0], expUpdateInfo);
      assert.deepEqual(this.insertStub.callCount, 1);
      assert.deepEqual(this.insertStub.getCall(0).args[0], expInsertData);
    });
  });
});
