'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');
const mock = require('egg-mock');
const utils = require('../../../../utils');

describe('test/app/service/pageLog.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test service pageLog selectLogFileList', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext();
      this.nextSpy = sinon.spy();
      this.readdirSyncStub = sinon.stub(fs, 'readdirSync');
    });
    afterEach(() => {
      mock.restore();
      this.readdirSyncStub.restore();
    });

    it('should success', async () => {
      this.ctx.app.config.appId = 'jianghu-config';
      this.ctx.app.config.baseDir = 'baseDir';
      const expResult = {
        rows: [
          { filename: 'jianghu-config.page.json.log' },
        ],
      };
      this.readdirSyncStub.returns([ 'jianghu-config.page.json.log' ]);
      const result = await this.ctx.service.pageLog.selectLogFileList();
      assert.equal(this.readdirSyncStub.callCount, 1);
      assert.equal(this.readdirSyncStub.getCall(0).args[0], 'baseDir/logs');
      assert.deepEqual(result, expResult);
    });
  });

  describe('Test service pageLog selectItemListFromLogFile', () => {
    beforeEach(() => {
      this.ctx = this.app.mockContext();
      this.nextSpy = sinon.spy();
      this.readFileSyncStub = sinon.stub(fs, 'readFileSync');
    });
    afterEach(() => {
      mock.restore();
      this.readFileSyncStub.restore();
    });

    it('should success', async () => {
      this.ctx.request.body = {
        appData: {
          actionData: {
            logFile: 'jianghu-config.page.json.log',
          },
        },
      };
      this.ctx.app.config.appId = 'jianghu-config';
      this.ctx.app.config.baseDir = 'baseDir';
      const expResult = {
        rows: [
          { level: 'INFO', date: '2023-10-18 05:16:54,752', pid: 1301369, hostname: 'Product-Name', pageId: 'userManagement', pageName: '用户管理', deviceType: 'web' },
          { level: 'INFO', date: '2023-10-22 10:53:04,913', pid: 1301376, hostname: 'Product-Name', pageId: 'userManagement', pageName: '用户管理', deviceType: 'web' },
          { level: 'INFO', date: '2023-10-29 02:01:22,551', pid: 1301476, hostname: 'Product-Name', pageId: 'userManagement', pageName: '用户管理', deviceType: 'web' },
        ],
      };
      const returnFunObj = {
        toString: () => {
          return `
            {"level":"INFO","date":"2023-10-18 05:16:54,752","pid":1301369,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}\n{"level":"INFO","date":"2023-10-22 10:53:04,913","pid":1301376,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}\n{"level":"INFO","date":"2023-10-29 02:01:22,551","pid":1301476,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}
            `;
        },
      };
      this.readFileSyncStub.returns(returnFunObj);
      const result = await this.ctx.service.pageLog.selectItemListFromLogFile();
      assert.equal(this.readFileSyncStub.callCount, 1);
      assert.equal(this.readFileSyncStub.getCall(0).args[0], 'baseDir/logs/jianghu-config.page.json.log');
      assert.equal(this.readFileSyncStub.getCall(0).args[1], 'UTF-8');
      assert.deepEqual(result, expResult);
    });
    it('Invalid Parameters, should failed', async () => {
      this.ctx.request.body = {
        appData: {
          actionData: {
          },
        },
      };
      this.ctx.app.config.appId = 'jianghu-config';
      this.ctx.app.config.baseDir = 'baseDir';
      const returnFunObj = {
        toString: () => {
          return `
            {"level":"INFO","date":"2023-10-18 05:16:54,752","pid":1301369,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}\n{"level":"INFO","date":"2023-10-22 10:53:04,913","pid":1301376,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}\n{"level":"INFO","date":"2023-10-29 02:01:22,551","pid":1301476,"hostname":"Product-Name","message":"{  pageId: 'userManagement',  pageName: '用户管理', deviceType: 'web'}"}
            `;
        },
      };
      this.readFileSyncStub.returns(returnFunObj);
      try {
        await this.ctx.service.pageLog.selectItemListFromLogFile();
      } catch (err) {
        assert.equal(err.errorCode, 'request_body_invalid');
        assert.equal(err.errorReason, '请求数据不符合规范');
        assert.equal(err.errorReasonSupplement, ' must have required property \'logFile\'');
      }
      assert.equal(this.readFileSyncStub.callCount, 0);
    });
  });
});
