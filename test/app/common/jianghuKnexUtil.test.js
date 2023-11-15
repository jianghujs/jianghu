'use strict';
const sinon = require('sinon');
const assert = require('assert');
const MockDate = require('mockdate');
const jianghuKnexUtil = require('../../../app/common/jianghuKnexUtil');

describe('test/app/common/jianghuKnexUtil.test.js', () => {
  describe('createJianghuKnex', () => {
    let knexMock;
    let trxMock;

    beforeEach(() => {
      knexMock = {
        raw: sinon.stub().resolves('result'),
        transaction: sinon.stub().callsFake(callback => callback(trxMock)),
        commit: sinon.stub().resolves(),
        rollback: sinon.stub().resolves(),
      };

      trxMock = {
        commit: sinon.stub().resolves(),
        rollback: sinon.stub().resolves(),
      };

    });
    afterEach(() => {
    });

    it('should call knex.raw with the given SQL', async () => {
      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(knexMock);

      await jianghuKnex.raw('SELECT * FROM table');

      sinon.assert.calledOnceWithExactly(knexMock.raw, 'SELECT * FROM table');
    });

    it('should call knex.transaction with the given callback', async () => {
      const callback = sinon.stub().resolves();
      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(knexMock);

      await jianghuKnex.transaction(callback);

      sinon.assert.calledOnceWithExactly(knexMock.transaction, sinon.match.func);
      sinon.assert.calledOnce(callback);
    });

    it('should call knex.insert with jianghuKnex.insert', async () => {
      const knexStub = sinon.stub();
      const mockedknex = function() {
        return knexStub;
      };
      knexStub.insert = sinon.stub().resolves(true);
      MockDate.set('2023-11-15T20:54:04+08:00');
      const ctx = {
        userInfo: {
          userId: 'testUserId',
          username: 'testUsername',
        },
      };
      const expInsertData = {
        name: 'test',
        operation: 'insert',
        operationByUserId: 'testUserId',
        operationByUser: 'testUsername',
        operationAt: '2023-11-15T20:54:04+08:00',
      };
      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(mockedknex);
      const result = await jianghuKnex('table', ctx).insert({ name: 'test' });
      MockDate.reset();
      assert.deepEqual(knexStub.insert.getCall(0).args[0], expInsertData);
      assert.equal(result, true);
    });
    it('should call knex.insert with jianghuKnex.jhInsert', async () => {
      const knexStub = sinon.stub();
      const mockedknex = function() {
        return knexStub;
      };
      knexStub.insert = sinon.stub().resolves(true);
      MockDate.set('2023-11-15T20:54:04+08:00');
      const ctx = {
        userInfo: {
          userId: 'testUserId',
          username: 'testUsername',
        },
      };
      const expInsertData = {
        name: 'test',
        operation: 'jhInsert',
        operationByUserId: 'testUserId',
        operationByUser: 'testUsername',
        operationAt: '2023-11-15T20:54:04+08:00',
      };
      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(mockedknex);
      const result = await jianghuKnex('table', ctx).jhInsert({ name: 'test' });
      MockDate.reset();
      assert.deepEqual(knexStub.insert.getCall(0).args[0], expInsertData);
      assert.equal(result, true);
    });
    it('should call knex.update with jianghuKnex.update', async () => {
      const knexStub = sinon.stub();
      const mockedknex = function() {
        return knexStub;
      };
      knexStub.update = sinon.stub().resolves(true);
      MockDate.set('2023-11-15T20:54:04+08:00');
      const ctx = {
        userInfo: {
          userId: 'testUserId',
          username: 'testUsername',
        },
      };
      const expInsertData = {
        name: 'test',
        operation: 'update',
        operationByUserId: 'testUserId',
        operationByUser: 'testUsername',
        operationAt: '2023-11-15T20:54:04+08:00',
      };
      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(mockedknex);
      const result = await jianghuKnex('table', ctx).update({ name: 'test' });
      MockDate.reset();
      assert.deepEqual(knexStub.update.getCall(0).args[0], expInsertData);
      assert.equal(result, true);
    });
    it('should call knex.update with jianghuKnex.jhUpdate', async () => {
      const expResultList = [
        {
          id: '1',
          name: 'test',
          operation: 'update',
          operationByUserId: 'testUserId',
          operationByUser: 'testUsername',
          operationAt: '2023-11-15T20:54:04+08:00',
        },
        {
          id: '2',
          name: 'test2',
          operation: 'insert',
          operationByUserId: 'testUserId',
          operationByUser: 'testUsername',
          operationAt: '2023-11-15T20:54:04+08:00',
        },
      ];
      const knexStub = sinon.stub();
      const mockedknex = function() {
        return knexStub;
      };
      knexStub.insert = sinon.stub().resolves('insert');
      knexStub.update = sinon.stub().resolves('update');
      knexStub.select = sinon.stub().resolves(expResultList);
      const whereInObj = {
        select: sinon.stub(),
        update: sinon.stub(),
      };
      knexStub.whereIn = () => {};
      sinon.stub(knexStub, 'whereIn').returns(whereInObj);
      whereInObj.select.resolves(expResultList);
      whereInObj.update.resolves('jhUpdate');

      MockDate.set('2023-11-15T20:54:04+08:00');
      const ctx = {
        userInfo: {
          userId: 'testUserId',
          username: 'testUsername',
        },
      };
      const expIds = [ '1', '2' ];
      const expInsertBeforeData = [
        {
          operation: 'update',
          operationAt: '2023-11-15T20:54:04+08:00',
          operationByUser: 'testUsername',
          operationByUserId: 'testUserId',
          packageContent: '{}',
          recordContent: '{"id":"1","name":"test","operation":"update","operationByUserId":"testUserId","operationByUser":"testUsername","operationAt":"2023-11-15T20:54:04+08:00"}',
          recordId: '1',
          table: 'table',
        },
        {
          operation: 'insert',
          operationAt: '2023-11-15T20:54:04+08:00',
          operationByUser: 'testUsername',
          operationByUserId: 'testUserId',
          packageContent: '{}',
          recordContent: '{"id":"2","name":"test2","operation":"insert","operationByUserId":"testUserId","operationByUser":"testUsername","operationAt":"2023-11-15T20:54:04+08:00"}',
          recordId: '2',
          table: 'table',
        },
      ];

      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(mockedknex);

      const result = await jianghuKnex('table', ctx).jhUpdate({ ids: expIds, name: 'test' });

      MockDate.reset();
      assert.deepEqual(knexStub.insert.callCount, 2);
      assert.deepEqual(knexStub.insert.getCall(0).args[0], expInsertBeforeData);
      assert.deepEqual(knexStub.whereIn.callCount, 3);
      assert.deepEqual(knexStub.whereIn.getCall(0).args[0], 'id');
      assert.deepEqual(knexStub.whereIn.getCall(0).args[1], expIds);
      assert.deepEqual(knexStub.whereIn.getCall(1).args[0], 'id');
      assert.deepEqual(knexStub.whereIn.getCall(1).args[1], expIds);
      assert.deepEqual(knexStub.whereIn.getCall(2).args[0], 'id');
      assert.deepEqual(knexStub.whereIn.getCall(2).args[1], expIds);
      assert.deepEqual(whereInObj.select.callCount, 2);
      assert.deepEqual(whereInObj.update.callCount, 1);
      assert.equal(result, 'jhUpdate');
    });
    it('should call knex.delete with jianghuKnex.jhDelete', async () => {
      const expResultList = [
        {
          id: '1',
          name: 'test',
          operation: 'update',
          operationByUserId: 'testUserId',
          operationByUser: 'testUsername',
          operationAt: '2023-11-15T20:54:04+08:00',
        },
        {
          id: '2',
          name: 'test2',
          operation: 'insert',
          operationByUserId: 'testUserId',
          operationByUser: 'testUsername',
          operationAt: '2023-11-15T20:54:04+08:00',
        },
      ];
      const knexStub = sinon.stub();
      const mockedknex = function() {
        return knexStub;
      };
      knexStub.insert = sinon.stub().resolves('insert');
      knexStub.delete = sinon.stub().resolves('jhDelete');
      knexStub.select = sinon.stub().resolves(expResultList);
      const whereInObj = {
        select: sinon.stub(),
        update: sinon.stub(),
      };
      knexStub.whereIn = () => {};
      sinon.stub(knexStub, 'whereIn').returns(whereInObj);
      whereInObj.select.resolves(expResultList);
      whereInObj.update.resolves('jhDelete');

      MockDate.set('2023-11-15T20:54:04+08:00');
      const ctx = {
        userInfo: {
          userId: 'testUserId',
          username: 'testUsername',
        },
      };
      const expIds = [ '1', '2' ];
      const expInsertBeforeData = [
        {
          operation: 'jhDelete',
          operationAt: '2023-11-15T20:54:04+08:00',
          operationByUser: 'testUsername',
          operationByUserId: 'testUserId',
          packageContent: '{}',
          recordContent: '{"id":"1","name":"test","operation":"jhDelete","operationByUserId":"testUserId","operationByUser":"testUsername","operationAt":"2023-11-15T20:54:04+08:00"}',
          recordId: '1',
          table: 'table',
        },
        {
          operation: 'jhDelete',
          operationAt: '2023-11-15T20:54:04+08:00',
          operationByUser: 'testUsername',
          operationByUserId: 'testUserId',
          packageContent: '{}',
          recordContent: '{"id":"2","name":"test2","operation":"jhDelete","operationByUserId":"testUserId","operationByUser":"testUsername","operationAt":"2023-11-15T20:54:04+08:00"}',
          recordId: '2',
          table: 'table',
        },
      ];

      const jianghuKnex = jianghuKnexUtil.createJianghuKnex(mockedknex);

      const result = await jianghuKnex('table', ctx).jhDelete({ ids: expIds });

      MockDate.reset();
      assert.deepEqual(knexStub.delete.callCount, 1);
      assert.deepEqual(knexStub.insert.callCount, 1);
      assert.deepEqual(knexStub.insert.getCall(0).args[0], expInsertBeforeData);
      assert.deepEqual(knexStub.whereIn.callCount, 1);
      assert.deepEqual(knexStub.whereIn.getCall(0).args[0], 'id');
      assert.deepEqual(knexStub.whereIn.getCall(0).args[1], expIds);
      assert.deepEqual(whereInObj.select.callCount, 1);
      assert.deepEqual(whereInObj.update.callCount, 0);
      assert.equal(result, 'jhDelete');
    });
  });
});
