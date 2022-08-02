'use strict';

const assert = require('assert');
const sinon = require('sinon');
const path = require('path');
const mock = require('egg-mock');
const utils = require('../../utils');
const syncSocketStatus = require('../../../app/schedule/syncSocketStatus');

describe('test/app/schedule/syncSocketStatus.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  describe('Test schedule syncSocketStatus', () => {
    beforeEach(() => {
      const knexResult = {
        where: () => {},
        whereIn: () => {},
        insert: () => {},
      };
      const whereResult = {
        update: () => {},
        select: () => {},
      };
      this.ctx = this.app.mockContext({});
      mock(this.app, 'knex', () => {
        return knexResult;
      });

      this.syncSocketStatus = syncSocketStatus(this.app);
      this.nextSpy = sinon.spy();
      this.fetchSocketsStub = sinon.stub(this.ctx.app.socketIO, 'fetchSockets');
      this.whereStub = sinon.stub(knexResult, 'where').returns(whereResult);
      this.whereInStub = sinon.stub(knexResult, 'whereIn').returns(whereResult);
      this.selectStub = sinon.stub(whereResult, 'select');
      this.updateStub = sinon.stub(whereResult, 'update');
    });
    afterEach(() => {
      this.selectStub.restore();
      this.whereStub.restore();
      this.whereInStub.restore();
      this.updateStub.restore();
      this.fetchSocketsStub.restore();
      mock.restore();
    });
    it('should success', async () => {
      const expUserId = 'test101';
      const expDeviceId = 'deviceId';
      const expAllSockets = [
        {
          id: `${expDeviceId}::${expUserId}`,
          socketStatus: 'online',
        },
      ];
      const expUserSessions = [{
        deviceId: expDeviceId,
        userId: expUserId,
        socketStatus: 'offline',
      }];
      const expOnlineUserSessions = [{
        deviceId: expDeviceId,
        userId: expUserId,
        socketStatus: 'online',
      }];

      this.ctx.app.config.jiangHuConfig = {
        enableUserInfoCache: true,
      };
      this.ctx.app.config.env = 'prod';

      this.fetchSocketsStub.returns(expAllSockets);
      this.selectStub.onCall(0).returns(expUserSessions);
      this.selectStub.onCall(1).returns(expOnlineUserSessions);

      await this.syncSocketStatus.task(this.ctx);

      assert.deepEqual(this.fetchSocketsStub.callCount, 1);
      assert.deepEqual(this.selectStub.callCount, 2);
      assert.deepEqual(this.updateStub.callCount, 1);
      assert.deepEqual(this.updateStub.getCall(0).args[0], 'socketStatus');
      assert.deepEqual(this.updateStub.getCall(0).args[1], 'online');
    });
  });
});
