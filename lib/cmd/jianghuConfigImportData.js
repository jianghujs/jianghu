'use strict';

const fs = require('fs');
const path = require('path');

module.exports.run = async ({ knex, baseDir, jianghuConfigDataIgnoreIdList={} }) => {
    console.log('[jianghu] jianghuConfigImportData start');
    console.log('[jianghu] jianghuConfigImportData: Use /config/jianghuConfigData/**.json data import to database table(_resource, _ui, _page, _constant)');
    const startTime = new Date().getTime();
    // Tip: _constant_ui, _constant 不做数据导入
    for (const tableName of ['_page', '_resource', '_test_case', '_ui']) {
        const filePath = path.join(baseDir, `./config/jianghuConfigData/${tableName}.json`);
        if (fs.existsSync(filePath)) {
          const tableData = require(filePath);
          const records = tableData.RECORDS;
          await knex(tableName).delete();
          if (records.length > 0) {
            await knex(tableName).insert(records);
          }
          console.log('[jianghu] jianghuConfigImportData table data import', { tableName, count: records.length });
        }
    }
    const endTime = new Date().getTime();
    console.log('[jianghu] jianghuConfigImportData end', { useTime: `${endTime - startTime}/ms` });
}