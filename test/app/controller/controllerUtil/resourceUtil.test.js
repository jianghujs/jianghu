'use strict';
const sinon = require('sinon');
const assert = require('assert');
const { errorInfoEnum } = require('../../../../app/constant/error');
const resourceUtil = require('../../../../app/controller/controllerUtil/resourceUtil');

describe('test/app/controller/controllerUtil/resourceUtil.test.js', () => {
  describe('sqlResource', () => {
    let jianghuKnexStub;
    let knexStub;
    let selectObj;
    let ctx;

    beforeEach(() => {
      // Create a stub for jianghuKnex
      knexStub = sinon.stub();

      jianghuKnexStub = function() {
        return knexStub;
      };
      jianghuKnexStub.raw = sinon.stub();
      jianghuKnexStub.transaction = sinon.stub();
      jianghuKnexStub.count = sinon.stub();
      knexStub.returns(jianghuKnexStub);
      knexStub.count = sinon.stub();
      selectObj = {
        select: sinon.stub(),
      };
      // selectStub = sinon.stub();
      knexStub.limit = sinon.stub();
      knexStub.limit.returns(selectObj);

      // Create a mock ctx object
      ctx = {
        request: {
          body: {
            appData: {
              actionData: {},
            },
          },
        },
        packageResource: {
          resourceData: {
            table: 'testTable',
            operation: 'select',
            excludedFieldList: [],
            rawSql: null,
          },
        },
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return rows and count when rawSql is provided', async () => {
      // Set up the test case
      const rawSqlResult = [{ id: 1, name: 'John' }];
      jianghuKnexStub.raw.resolves([ rawSqlResult ]);

      ctx.packageResource.resourceData.rawSql = 'SELECT * FROM testTable';

      // Call the function under test
      const result = await resourceUtil.sqlResource({ jianghuKnex: jianghuKnexStub, ctx });

      // Verify the result
      assert.deepStrictEqual(result.rows, rawSqlResult);
      assert.strictEqual(result.count, rawSqlResult.length);

      // Verify the stub was called
      sinon.assert.calledOnce(jianghuKnexStub.raw);
      sinon.assert.calledWith(jianghuKnexStub.raw, 'SELECT * FROM testTable');
    });

    it('should throw an error when operation is update or delete and whereCondition is not provided', async () => {
      // Set up the test case
      ctx.packageResource.resourceData.operation = 'delete';

      // Call the function under test and assert the error
      await assert.rejects(async () => {
        await resourceUtil.sqlResource({ jianghuKnex: jianghuKnexStub, ctx });
      }, error => {
        assert.strictEqual(error.errorCode, 'resource_sql_need_condition');
        return true;
      });

      // Verify the stub was not called
      sinon.assert.notCalled(jianghuKnexStub.transaction);
    });

    it('should return rows and count when limit is provided', async () => {
      // Set up the test case
      const countResult = [{ count: 5 }];
      const rowsResult = [{ id: 1, name: 'John' }];
      const expFieldResult = [[{ Field: 'id' }, { Field: 'name' }]];

      jianghuKnexStub.transaction.callsFake(async callback => {
        const trx = () => knexStub;
        await callback(trx);
      });
      jianghuKnexStub.raw.onCall(0).resolves(expFieldResult);
      jianghuKnexStub.limit = sinon.stub().resolves(jianghuKnexStub);
      jianghuKnexStub.select = sinon.stub().resolves(rowsResult);
      selectObj.select.resolves(rowsResult);
      knexStub.count = sinon.stub().resolves(countResult);

      ctx.request.body.appData.limit = 10;

      // Call the function under test
      const result = await resourceUtil.sqlResource({ jianghuKnex: jianghuKnexStub, ctx });
      // Verify the result
      assert.deepStrictEqual(result.rows, rowsResult);
      assert.strictEqual(result.count, countResult[0].count);

      // Verify the stubs were called
      sinon.assert.calledOnce(jianghuKnexStub.transaction);
      sinon.assert.calledOnce(knexStub.count);
      sinon.assert.calledOnce(knexStub.limit);
      sinon.assert.calledOnce(selectObj.select);
    });
  });
  describe('serviceResource', () => {
    it('should call the service function with the correct arguments', async () => {
      const ctx = {
        packageResource: {
          resourceData: {
            service: 'testService',
            serviceFunction: 'testServiceFunction',
          },
          appDataSchema: {
            // appDataSchema properties
          },
        },
        request: {
          body: {
            appData: {
              actionData: {
                // actionData properties
              },
            },
          },
        },
        service: {
          testService: {
            testServiceFunction: sinon.stub().resolves('result'),
          },
        },
      };

      const actionData = ctx.request.body.appData.actionData;

      const result = await resourceUtil.serviceResource({ ctx });

      assert.strictEqual(result, 'result');
      sinon.assert.calledWithExactly(ctx.service.testService.testServiceFunction, actionData, ctx);
    });

    it('should throw an error if the service is not found', async () => {
      const ctx = {
        packageResource: {
          resourceData: {
            service: 'testService',
            serviceFunction: 'testServiceFunction',
          },
          appDataSchema: {
            // appDataSchema properties
          },
        },
        request: {
          body: {
            appData: {
              actionData: {
                // actionData properties
              },
            },
          },
        },
        service: {
        },
      };

      await assert.rejects(async () => {
        await resourceUtil.serviceResource({ ctx });
      }, errorInfoEnum.resource_service_not_found);
    });

    it('should throw an error if the service function is not found', async () => {
      const ctx = {
        packageResource: {
          resourceData: {
            service: 'testService',
            serviceFunction: 'testServiceFunction',
          },
          appDataSchema: {
            // appDataSchema properties
          },
        },
        request: {
          body: {
            appData: {
              actionData: {
                // actionData properties
              },
            },
          },
        },
        service: {
          testService: {
          },
        },
      };

      await assert.rejects(async () => {
        await resourceUtil.serviceResource({ ctx });
      }, {
        ...errorInfoEnum.resource_service_method_not_found,
        errorReasonSupplement: {
          service: 'testService',
          serviceFunction: 'testServiceFunction',
        },
      });
    });
  });
});
