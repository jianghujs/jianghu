'use strict';
const assert = require('assert');
const commonUtil = require('../../../app/common/commonUtil');

describe('test/app/common/commonUtil.test.js', () => {
  before(() => {
  });
  after(async () => {
  });

  describe('Test app/common/commonUtil.js', () => {
    it('have eval value, should success', async () => {
      const expEvalResult = 7
      const evalString = `3+4`
      const result = commonUtil.eval({evalString})
      assert.deepEqual(result, expEvalResult)
    });
    it('no eval value, should success', async () => {
      const evalString = 'eval string'
      const result = commonUtil.eval({evalString})
      assert.deepEqual(result, evalString)
    });
  });
});
