'use strict';
const path = require('path');
const assert = require('assert');
const diff = require('../../../app/common/diffUtil');

describe('test/app/common/diffUtil.test.js', () => {
  before(() => {
  });
  after(async () => {
  });

  describe('Test app/common/diffUtil.js', () => {
    it('diff by id, should success', async () => {
      const oldList = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
        { id: 4, name: 'd' },
        { id: 5, name: 'e' },
      ]
      const newList = [
        { id: 1, name: 'a' },
        { id: 2, name: 'x' },
        { id: 7, name: 'e' },
      ]
      const expResult = {
        "added": [
          { "id": 7, "name": "e" }
        ],
        "removed": [
          { "id": 3, "name": "c" },
          { "id": 4, "name": "d" },
          { "id": 5, "name": "e" }
        ],
        "changed": [
          {
            "old": { "id": 2, "name": "b" },
            "new": { "id": 2, "name": "x" }
          }
        ]
      }
      const result = diff(oldList, newList)
      assert.deepEqual(result, expResult)
    });
    it('diff by dataId, should success', async () => {
      const oldList = [
        { id: 1, dataId: 'I', name: 'a' },
        { id: 2, dataId: 'II', name: 'b' },
        { id: 3, dataId: 'III', name: 'c' },
        { id: 4, dataId: 'IV', name: 'd' },
        { id: 5, dataId: 'V', name: 'e' },
      ]
      const newList = [
        { dataId: 'I', name: 'a' },
        { dataId: 'II', name: 'x' },
        { dataId: 'VII', name: 'e' },
      ]
      const expResult = {
        "added": [
          { "dataId": "VII", "name": "e" }
        ],
        "removed": [
          { "id": 3, "dataId": "III", "name": "c" },
          { "id": 4, "dataId": "IV", "name": "d" },
          { "id": 5, "dataId": "V", "name": "e" }
        ],
        "changed": [
          {
            "old": { "id": 2, "dataId": "II", "name": "b" },
            "new": { "dataId": "II", "name": "x" }
          }
        ]
      }
      const result = diff(oldList, newList, 'dataId')
      assert.deepEqual(result, expResult)
    });
  });
});
