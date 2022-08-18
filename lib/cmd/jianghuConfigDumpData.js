'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Dump table(_resource, _ui, _page, _constant) data to /config/jianghuConfigData/xxx.json
 */
module.exports.run = async ({ knex, baseDir }) => {
    console.log('[jianghu] jianghuConfigDumpData start');
    const startTime = new Date().getTime();
    // Tip: _constant_ui 不做数据导出
    for (const tableName of ['_constant', '_page', '_resource', '_test_case', '_ui']) {
        const filePath = path.join(baseDir, `./config/jianghuConfigData/${tableName}.json`);
        // const ignoreIdList = jianghuConfigDataIgnoreIdList[tableName] || [];
        // if (fs.existsSync(filePath)) {
        //   const tableData = require(filePath);
        //   const records = tableData.RECORDS.filter(record => ignoreIdList.indexOf(record.id) === -1);
        //   await knex(tableName).whereNotIn('id', ignoreIdList).delete();
        //   await knex(tableName).insert(records);
        //   console.log('[jianghu] jianghuConfigDumpData table data import', { tableName });
        // }

        const records = await knex(tableName).select();
        const jsonString = JSON.stringify({ "RECORDS": records }, undefined, 2);
        fs.writeFileSync(filePath, jsonString);
        console.log('[jianghu] jianghuConfigDumpData table data dump', { tableName, count: records.length });
    }
    const endTime = new Date().getTime();
    console.log('[jianghu] jianghuConfigDumpData end', { useTime: `${endTime - startTime}/ms` });
}