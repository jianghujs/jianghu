'use strict';

const fs = require('fs');
const path = require('path');

module.exports.run = async ({ knex, baseDir }) => {
    console.log('[jianghu] jianghuConfigDumpData start');
    console.log('[jianghu] jianghuConfigDumpData: Dump table(_resource, _ui, _page, _constant) data to /config/jianghuConfigData/xxx.json');
    const startTime = new Date().getTime();

    const jianghuConfigDumpDataPath = path.join(baseDir, './config/jianghuConfigData');
    if (!fs.existsSync(jianghuConfigDumpDataPath)) {
        fs.mkdirSync(jianghuConfigDumpDataPath);
    }

    // Tip: _constant_ui 不做数据导出
    for (const tableName of ['_constant', '_page', '_resource', '_test_case', '_ui']) {
        const filePath = path.join(baseDir, `./config/jianghuConfigData/${tableName}.json`);
        const records = await knex(tableName).select();
        const jsonString = JSON.stringify({ "RECORDS": records }, undefined, 2);
        fs.writeFileSync(filePath, jsonString);
        console.log('[jianghu] jianghuConfigDumpData table data dump', { tableName, count: records.length });
    }
    const endTime = new Date().getTime();
    console.log('[jianghu] jianghuConfigDumpData end', { useTime: `${endTime - startTime}/ms` });
}