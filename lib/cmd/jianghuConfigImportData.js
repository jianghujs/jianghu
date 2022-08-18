'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Use /config/jianghuConfigData/**.json data import to database table(_resource, _ui, _page, _constant)
 */
module.exports.run = async ({ knex, baseDir, jianghuConfigDataIgnoreIdList={} }) => {
    console.log('[jianghu] jianghuConfigImportData start');
    const startTime = new Date().getTime();
    // Tip: _constant_ui 不做数据导入
    for (const tableName of ['_constant', '_page', '_resource', '_test_case', '_ui']) {
        const filePath = path.join(baseDir, `./config/jianghuConfigData/${tableName}.json`);
        const ignoreIdList = jianghuConfigDataIgnoreIdList[tableName] || [];
        if (fs.existsSync(filePath)) {
          const tableData = require(filePath);
          const records = tableData.RECORDS.filter(record => ignoreIdList.indexOf(record.id) === -1);
          await knex(tableName).whereNotIn('id', ignoreIdList).delete();
          if (records.length > 0) {
            await knex(tableName).insert(records);
          }
          console.log('[jianghu] jianghuConfigImportData table data import', { tableName, count: records.length });
        }
    }
    const endTime = new Date().getTime();
    console.log('[jianghu] jianghuConfigImportData end', { useTime: `${endTime - startTime}/ms` });
}