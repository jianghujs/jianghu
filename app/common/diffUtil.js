// diff between list
// 用 id 做主 key，判断新旧两个 list 中的数据变化
'use strict';

function diff(oldList, newList, primaryKey = 'id') {
  const added = [];
  const removed = [];
  const changed = [];

  // 旧数据 primaryKey -> json
  const oldMap = {};
  oldList.forEach(record => {
    const { id, ...compareBody } = record;
    oldMap[record[primaryKey]] = JSON.stringify(compareBody);
  });

  newList.forEach(record => {
    const primaryId = record[primaryKey];
    if (!oldMap[primaryId]) {
      added.push(record);
      return;
    }
    const oldJson = oldMap[primaryId];
    const { id, ...newCompareBody } = record;
    if (oldJson !== JSON.stringify(newCompareBody)) {
      const oldItem = oldList.find(o => o[primaryKey] === primaryId);
      changed.push({ old: oldItem, new: record });
    }
    // 删除
    delete oldMap[primaryId];
  });

  // 剩下的 oldMap 就是删除的
  Object.keys(oldMap).forEach(primaryId => {
    const oldItem = oldList.find(o => String(o[primaryKey]) === String(primaryId));
    removed.push(oldItem);
  });

  return { added, removed, changed };
}

// 使用场景1：对比时以 id 做主键 key

// const res = diff(
//   [
//     { id: 1, name: 'a' },
//     { id: 2, name: 'b' },
//     { id: 3, name: 'c' },
//     { id: 4, name: 'd' },
//     { id: 5, name: 'e' },
//   ],
//   [
//     { id: 1, name: 'a' },
//     { id: 2, name: 'x' },
//     { id: 7, name: 'e' },
//   ]
// );
// console.log(JSON.stringify(res, null, '  '));
// 输出
// {
//   "added": [
//     { "id": 7, "name": "e" }
//   ],
//   "removed": [
//     { "id": 3, "name": "c" },
//     { "id": 4, "name": "d" },
//     { "id": 5, "name": "e" }
//   ],
//   "changed": [
//     {
//       "old": { "id": 2, "name": "b" },
//       "new": { "id": 2, "name": "x" }
//     }
//   ]
// }

// 使用场景2：对比时指定主键 key

// const res = diff(
//   [
//     { id: 1, dataId: 'I', name: 'a' },
//     { id: 2, dataId: 'II', name: 'b' },
//     { id: 3, dataId: 'III', name: 'c' },
//     { id: 4, dataId: 'IV', name: 'd' },
//     { id: 5, dataId: 'V', name: 'e' },
//   ],
//   [
//     { dataId: 'I', name: 'a' },
//     { dataId: 'II', name: 'x' },
//     { dataId: 'VII', name: 'e' },
//   ],
//   'dataId'
// );
// console.log(JSON.stringify(res, null, '  '));
// 输出
// {
//   "added": [
//     { "dataId": "VII", "name": "e" }
//   ],
//   "removed": [
//     { "id": 3, "dataId": "III", "name": "c" },
//     { "id": 4, "dataId": "IV", "name": "d" },
//     { "id": 5, "dataId": "V", "name": "e" }
//   ],
//   "changed": [
//     {
//       "old": { "id": 2, "dataId": "II", "name": "b" },
//       "new": { "dataId": "II", "name": "x" }
//     }
//   ]
// }


module.exports = diff;
