// 使用数据库 checksum 和二分做 diff
'use strict';

const Knex = require('knex');
const diff = require('./diffUtil');

// 数据段
class TableSegment {

  constructor({ knex, databaseConnectionConfig, table, minId, maxId, ignoreColumns, releventColumns = [] }) {
    if (knex) {
      this.knex = knex;
    } else {
      this.knex = Knex({
        client: 'mysql',
        connection: databaseConnectionConfig,
      });
    }
    this.databaseConnectionConfig = databaseConnectionConfig;
    this.table = table;
    this.maxId = maxId;
    this.minId = minId;
    this.ignoreColumns = ignoreColumns;
    this.releventColumns = releventColumns;
  }

  async init() {
    await this.prepareMinMaxId();
    await this.prepareColumns();
  }

  // 计算最大最小 key
  async prepareMinMaxId() {
    if (this.minId || this.maxId) {
      return;
    }
    const [{ maxId, minId }] = await this.knex(this.table).select(this.knex.raw('max(id) as maxId, min(id) as minId'));
    console.log('获取最大最小值：', { maxId, minId });
    this.minId = minId;
    this.maxId = maxId;
  }

  // 获取要用于计算 checksum 的字段
  async prepareColumns() {
    const columnList = await this.knex('INFORMATION_SCHEMA.COLUMNS')
      .where({
        TABLE_SCHEMA: this.databaseConnectionConfig.database,
        TABLE_NAME: this.table,
      })
      .select('COLUMN_NAME as columnName', 'DATA_TYPE as dataType');
    this.releventColumns = columnList.filter(column =>
      column.columnName !== 'id' && !this.ignoreColumns.includes(column.columnName)
    ).map(column => {
      if (column.dataType === 'varchar' || column.dataType.includes('text')) {
        return {
          name: column.columnName,
          // 处理 null 字段
          sql: `coalesce(${column.columnName},'<null>')`,
        };
      }
      return {
        name: column.columnName,
        // 处理 null 字段
        // 处理非 char 字段
        sql: `coalesce(cast(${column.columnName} as char),'<null>')`,
      };
    });
  }

  // 将数据段切为指定长度的分段
  splitSegment(count) {
    const dist = (this.maxId - this.minId);
    const stepSize = Math.ceil(dist / count);
    const segments = [];
    for (let i = 0; i < count; i++) {
      const currentMinId = this.minId + i * stepSize;
      segments.push(new TableSegment({
        databaseConnectionConfig: this.databaseConnectionConfig,
        knex: this.knex,
        table: this.table,
        minId: currentMinId,
        maxId: i === count - 1 ? this.maxId : currentMinId + stepSize - 1,
        ignoreColumns: this.ignoreColumns,
        releventColumns: this.releventColumns,
      }));
    }
    return segments;
  }

  // 手动切成两段
  cutSegment(startId, endId) {
    return new TableSegment({
      databaseConnectionConfig: this.databaseConnectionConfig,
      knex: this.knex,
      table: this.table,
      minId: startId,
      maxId: endId,
      ignoreColumns: this.ignoreColumns,
      releventColumns: this.releventColumns,
    });
  }

  async getCountAndChecksum() {
    console.log('count(*) as count, sum(cast(conv(substring(md5(concat('
        + this.releventColumns.map(o => o.sql).join(',') +
        ')), 18), 16, 10) as unsigned)) as checksum');
    const [{ count, checksum }] = await this.knex(this.table)
      .where('id', '>=', this.minId)
      .where('id', '<=', this.maxId)
      .select(this.knex.raw('count(*) as count, sum(cast(conv(substring(md5(concat('
        + this.releventColumns.map(o => o.sql).join(',') +
        ')), 18), 16, 10) as unsigned)) as checksum'));
    console.log('计算 count, checksum', { count, checksum, maxId: this.maxId, minId: this.minId, table: this.table });
    this.count = count;
    this.checksum = checksum;
  }

  async fetchData() {
    this.rows = await this.knex(this.table)
      .where('id', '>=', this.minId)
      .where('id', '<=', this.maxId)
      .select([ 'id', ...this.releventColumns.map(o => o.name) ]);
  }

}

// TableDiffer
class TableDiffer {
  constructor({
    oldTableSegment,
    newTableSegment,
    splitCount = 2,
    stopThreshold = 100 }) {
    this.oldTableSegment = oldTableSegment;
    this.newTableSegment = newTableSegment;
    this.splitCount = splitCount;
    this.stopThreshold = stopThreshold;
  }

  // 执行对比算法
  async run() {
    this.diffResult = {
      added: [],
      removed: [],
      changed: [],
    };
    // 需要处理 min max 不对齐的情况
    // 获取两段数据重合部分的 min max
    const midMinId = Math.max(this.oldTableSegment.minId, this.newTableSegment.minId);
    const midMaxId = Math.min(this.oldTableSegment.maxId, this.newTableSegment.maxId);
    // 左段
    if (this.oldTableSegment.minId !== this.newTableSegment.minId) {
      const realMinId = Math.min(this.oldTableSegment.minId, this.newTableSegment.minId);
      console.log('计算左段', { left: realMinId, right: midMinId - 1 });
      await this.fetchAndDiff(this.oldTableSegment.cutSegment(realMinId, midMinId - 1), this.newTableSegment.cutSegment(realMinId, midMinId - 1));
    }
    // 中间重复段，递归
    await this.recursiveDiff(this.oldTableSegment.cutSegment(midMinId, midMaxId), this.newTableSegment.cutSegment(midMinId, midMaxId));
    // 右段
    if (this.oldTableSegment.maxId !== this.newTableSegment.maxId) {
      const realMaxId = Math.max(this.oldTableSegment.maxId, this.newTableSegment.maxId);
      console.log('计算右段', { left: midMaxId + 1, right: realMaxId });
      await this.fetchAndDiff(this.oldTableSegment.cutSegment(midMaxId + 1, realMaxId), this.newTableSegment.cutSegment(midMaxId + 1, realMaxId));
    }
    return this.diffResult;
  }

  // 直接获取数据并做对比
  async fetchAndDiff(ts1, ts2) {
    await Promise.all([ ts1.fetchData(), ts2.fetchData() ]);
    const { added, removed, changed } = diff(ts1.rows, ts2.rows);
    this.diffResult.added.push(...added);
    this.diffResult.removed.push(...removed);
    this.diffResult.changed.push(...changed);
  }

  async recursiveDiff(ts1, ts2) {
    if (ts1.maxId - ts1.minId <= this.stopThreshold) {
      // 如果大小 id 间距小于 stopThreshold，则直接获取数据进行对比
      console.log('直接获取数据进行对比', ts1.minId, ts1.maxId);
      await this.fetchAndDiff(ts1, ts2);
      return;
    }
    // 获取 count 和 checksum
    await Promise.all([ ts1.getCountAndChecksum(), ts2.getCountAndChecksum() ]);
    if (ts1.count === ts2.count && ts1.checksum === ts2.checksum) {
      // 如果对比一样，就退出
      console.log('对比一样，退出', ts1.minId, ts1.maxId);
      return;
    }
    const ts1split = ts1.splitSegment(this.splitCount);
    const ts2split = ts2.splitSegment(this.splitCount);
    console.log('继续二分', ts1.minId, ts1.maxId, '->', ts1split[0].minId, ts1split[0].maxId, ',', ts1split[1].minId, ts1split[1].maxId);
    const recursiveList = [];
    for (let i = 0; i < ts1split.length; i++) {
      recursiveList.push(this.recursiveDiff(ts1split[i], ts2split[i]));
    }
    await Promise.all(recursiveList);
  }
}

async function hyperDiff({
  oldDatabaseConnectionConfig,
  oldTable,
  newDatabaseConnectionConfig,
  newTable,
  ignoreColumns,
  splitCount = 2,
  stopThreshold = 100,
}) {

  const oldTableSegment = new TableSegment({
    databaseConnectionConfig: oldDatabaseConnectionConfig,
    table: oldTable,
    ignoreColumns,
  });
  const newTableSegment = new TableSegment({
    databaseConnectionConfig: newDatabaseConnectionConfig,
    table: newTable,
    ignoreColumns,
  });

  await Promise.all([
    oldTableSegment.init(),
    newTableSegment.init(),
  ]);

  const differ = new TableDiffer({ oldTableSegment, newTableSegment, splitCount, stopThreshold });
  const result = await differ.run();
  return result;
}

// async function test() {

//   const result = await hyperDiff({
//     oldDatabaseConnectionConfig: {
//       host: '127.0.0.1',
//       port: 3306,
//       user: 'root',
//       password: '123456',
//       database: 'aa',
//     },
//     oldTable: 'student',
//     newDatabaseConnectionConfig: {
//       host: '127.0.0.1',
//       port: 3306,
//       user: 'root',
//       password: '123456',
//       database: 'aa',
//     },
//     newTable: 'student_copy1',
//     splitCount: 2,
//     stopThreshold: 10,
//     ignoreColumns: [
//       'operation',
//       'operationByUserId',
//       'operationByUser',
//       'operationAt',
//     ],
//   });

//   console.log('result', JSON.stringify(result, null, ' '));
// }
// test();
// result {
//  "added": [],
//  "removed": [
//   { "id": 11, "studentId": "W00001", "name": "张三丰", "gender": "male", "dateOfBirth": "2022-01-25", "bodyHeight": "155", "studentStatus": "正常", "remarks": "张三丰" },
//  ],
//  "changed": [
//   {
//    "old": { "id": 52, "studentId": "G00005", "name": "庄聚贤", "gender": "male", "dateOfBirth": "2022-01-26", "bodyHeight": "169", "studentStatus": "正常", "remarks": "111" },
//    "new": { "id": 52, "studentId": "G00005", "name": "庄聚贤", "gender": "male", "dateOfBirth": "2022-01-26", "bodyHeight": "169", "studentStatus": "正常", "remarks": "" }
//   },
//  ]
// }

module.exports = hyperDiff;
