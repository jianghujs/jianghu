// diff between list
// 用 id 做主 key，判断新旧两个 list 中的数据变化
'use strict';

function diff(oldList, newList) {
  const added = [];
  const removed = [];
  const changed = [];

  const oldMap = Object.fromEntries(oldList.map(record => [ record.id, JSON.stringify(record) ]));
  newList.forEach(record => {
    if (!oldMap[record.id]) {
      added.push(record);
      return;
    }
    const oldJson = oldMap[record.id];
    if (oldJson !== JSON.stringify(record)) {
      // 这边可以做进一步字段对比
      changed.push({ old: JSON.parse(oldJson), new: record });
    }
    // 删除
    delete oldMap[record.id];
  });

  // 剩下的 oldMap 就是删除的
  Object.entries(oldMap).forEach(([ id, recordJson ]) => {
    removed.push(JSON.parse(recordJson));
  });

  return { added, removed, changed };
}

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

module.exports = diff;
