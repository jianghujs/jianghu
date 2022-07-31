'use strict';
const Importer = require('mysql-import');
const fs = require('fs');
const path = require('path');

async function initMysql(configPath) {
  const config = getConfig(configPath);
  console.log(`start init mysql with config: ${configPath}`);
  const importer = new Importer(config);
  await importer.import(__dirname + '/init.sql');
  console.log('init mysql success');
}


function getConfig(configPath) {
  const configData = fs.readFileSync(`${configPath}`).toString();
  const setting = {};
  [ 'host', 'port', 'user', 'password', 'database' ].forEach(key => {
    const regStr = `${key}: (.*)`;
    const reg = new RegExp(regStr);
    const matchResult = configData.match(reg);
    setting[key] = matchResult[1].replace(/'/g, '').replace(/,/g, '').replace(/"/g, '');
  });
  return setting;
}


initMysql(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config', '/config/config.unittest.js'));
