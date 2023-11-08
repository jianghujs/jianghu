'use strict';
const assert = require('assert');
const sinon = require('sinon');
const idGenerateUtil = require('../../../app/common/idGenerateUtil');

describe('test/app/common/idGenerateUtil.test.js', () => {
  before(() => {
  });
  after(async () => {
  });

  describe('Test app/common/idGenerateUtil.js, idPlus', () => {
    beforeEach(() => {
      this.obj = {
        knex: ()=>{},
        tableName: 'table1',
        columnName: 'column1',
        startValue: 1
      }
      const knexResult = {
        max: ()=>{}
      }
      const maxResult = {
        first: ()=>{}
      }
      this.knexStub = sinon.stub(this.obj, 'knex')
      this.knexStub.returns(knexResult)
      this.maxStub = sinon.stub(knexResult, 'max')
      this.maxStub.returns(maxResult)
      this.firstStub = sinon.stub(maxResult, 'first')
    })
    afterEach(() => {
      this.knexStub.restore()
      this.maxStub.restore()
      this.firstStub.restore()
    })
    it('has maxBizId, should success', async () => {
      const maxOptions = {
        as: "maxBizId",
      }
      this.firstStub.returns({ maxBizId: 10 })
      let result = null
      try {
        result = await idGenerateUtil.idPlus(this.obj)
      } catch (error) {
        
      }
      assert.equal(this.knexStub.callCount, 1)
      assert.equal(this.knexStub.getCall(0).args[0], this.obj.tableName)
      assert.equal(this.maxStub.callCount, 1)
      assert.equal(this.maxStub.getCall(0).args[0], this.obj.columnName)
      assert.deepEqual(this.maxStub.getCall(0).args[1], maxOptions)
      assert.equal(this.firstStub.callCount, 1)
      assert.equal(result, 11)
    });
    it('no maxBizId, should success', async () => {
      const maxOptions = {
        as: "maxBizId",
      }
      this.firstStub.returns({ maxBizId: 0 })
      let result = null
      try {
        result = await idGenerateUtil.idPlus(this.obj)
      } catch (error) {
        
      }
      assert.equal(this.knexStub.callCount, 1)
      assert.equal(this.knexStub.getCall(0).args[0], this.obj.tableName)
      assert.equal(this.maxStub.callCount, 1)
      assert.equal(this.maxStub.getCall(0).args[0], this.obj.columnName)
      assert.deepEqual(this.maxStub.getCall(0).args[1], maxOptions)
      assert.equal(this.firstStub.callCount, 1)
      assert.equal(result, 1)
    });
    it('no tableName, should failed', async () => {
      this.firstStub.returns({ maxBizId: 0 })
      let result = null
      try {
        result = await idGenerateUtil.idPlus({...this.obj, tableName: null})
      } catch (error) {
        assert.equal(error.message, 'idPlus, 数据异常')
      }
      assert.equal(this.knexStub.callCount, 0)
      assert.equal(this.maxStub.callCount, 0)
      assert.equal(this.firstStub.callCount, 0)
    });
  });
  describe('Test app/common/idGenerateUtil.js, randomString', () => {
    beforeEach(() => {
    })
    afterEach(() => {
    })
    it('should success', async () => {
      const result = idGenerateUtil.randomString(8)
      assert.equal(result.length, 8)
    });
  });

  describe('Test app/common/idGenerateUtil.js, uuid', () => {
    beforeEach(() => {
    })
    afterEach(() => {
    })
    it('should success', async () => {
      const result = idGenerateUtil.uuid(16)
      assert.equal(result.length, 16)
    });
  });
  describe('Test app/common/idGenerateUtil.js, timestamp_6number', () => {
    beforeEach(() => {
      this.nowStub = sinon.stub(Date, 'now')
    })
    afterEach(() => {
      this.nowStub.restore()
    })
    it('should success', async () => {
      const now = '12356789'
      this.nowStub.returns(now)
      const result = idGenerateUtil.timestamp_6number()
      const arr = result.split('_')
      assert.equal(arr[0], now)
      assert.equal(arr[1].length, 6)
    });
  });
});
