'use strict';
const assert = require('assert');
const validateUtil = require('../../../app/common/validateUtil');

describe('test/app/common/validateUtil.test.js', () => {
  before(() => {
  });
  after(async () => {
  });

  describe('Test app/common/validateUtil.js, validate', () => {
    it('valid parameters, should success', async () => {
      const schema = {
        type: 'object',
        additionalProperties: true,
        required: [ 'userId', 'password', 'deviceId' ],
        properties: {
          userId: { type: 'string', minLength: 3 },
          password: { type: 'string' },
          deviceId: { type: 'string' },
          deviceType: { type: 'string' },
          needSetCookies: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
        },
      }
      const parameters = {
        userId: "userid1",
        password: "password1",
        deviceId: "deviceId1",
        deviceType: "deviceType1",
        needSetCookies: true,
      }
      let err = null
      try {
        validateUtil.validate(schema, parameters)
      } catch (error) {
        err = error
      }
      assert.equal(err, null)
    });
    it('invalid parameters, should failed', async () => {
      const schema = {
        type: 'object',
        additionalProperties: true,
        required: [ 'userId', 'password', 'deviceId' ],
        properties: {
          userId: { type: 'string', minLength: 3 },
          password: { type: 'string' },
          deviceId: { type: 'string' },
          deviceType: { type: 'string' },
          needSetCookies: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
        },
      }
      const parameters = {
        userId: "us",
        password: "password1",
        deviceId: "deviceId1",
        deviceType: "deviceType1",
        needSetCookies: true,
      }
      let err = null
      try {
        validateUtil.validate(schema, parameters)
      } catch (error) {
        err = error
      }
      assert.equal(err.errorCode, 'request_body_invalid')
      assert.equal(err.errorReason, '请求数据不符合规范')
    });
  });
});
