'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../../utils');
const path = require('path');
const sinon = require('sinon');

describe('test/app/service/error.test.js', () => {
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
  describe('Test service error, htmlErrorLogRecord', () => {
    beforeEach(() => {
      const jianghuKnexResult = {
        jhUpdate: () => {},
        jhInsert: () => {},
        where: () => {},
      };
      this.ctx = this.app.mockContext({ app: { } });
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });
      const loggerResultObj = {
        error: () => {},
      };
      mock(this.app, 'getLogger', () => {
        return loggerResultObj;
      });

      this.errorStub = sinon.stub(loggerResultObj, 'error');
    });
    afterEach(() => {
      this.errorStub.restore();
    });
    it('should success', async () => {
      this.ctx.request.body = {
        appData: {
          actionData: {
            errorLogList: [
              {
                errorTime: '2019-07-16 17:00:00',
                errorMessage: 'test',
              },
              {
                errorTime: '2023-07-16 17:00:00',
                errorMessage: 'test2',
              },
            ],
          },
        },
      };

      await this.ctx.service.error.htmlErrorLogRecord();

      assert.equal(this.errorStub.callCount, 2);
      assert.equal(this.errorStub.getCall(0).args[0], 'htmlErrorLogRecord');
      assert.equal(this.errorStub.getCall(0).args[1], this.ctx.request.body.appData.actionData.errorLogList[0]);
      assert.equal(this.errorStub.getCall(1).args[0], 'htmlErrorLogRecord');
      assert.equal(this.errorStub.getCall(1).args[1], this.ctx.request.body.appData.actionData.errorLogList[1]);
    });
    it('should failed, invalid errorLogList', async () => {
      this.ctx.request.body = {
        appData: {
          actionData: {
            errorLogList: {
              errorTime: '2019-07-16 17:00:00',
              errorMessage: 'test',
            },
          },
        },
      };

      try {
        await this.ctx.service.error.htmlErrorLogRecord();
      } catch (error) {
        assert.equal(error.errorCode, 'request_body_invalid');
        assert.equal(error.errorReason, '请求数据不符合规范');
      }

      assert.equal(this.errorStub.callCount, 0);
    });
  });
});
