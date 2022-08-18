'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Knex = require('knex');
const yargs = require('yargs');
const jianghuConfigImportData = require('./cmd/jianghuConfigImportData');

const commandTypes = [{
  value: 'jianghuConfigImportData',
  name: 'Use /config/jianghuConfigData/**.json data import to database table(_resource, _ui, _page, _constant)',
},{
  value: 'jianghuConfigDumpData',
  name: 'Dump table(_resource, _ui, _page, _constant) data to /config/jianghuConfigData/**.json',
}];

const envTypes = [{
  value: 'local',
  name: 'Use /config/config.local.js',
},{
  value: 'prod',
  name: 'Use /config/config.prod.js',
}];

/**
 * 命令入口
 */
module.exports = class Entry {

  async run() {

    let command = process.argv[2];
    const params = yargs.parse(process.argv)
    let { env } = params;
    // baseDir
    const baseDir = process.cwd();
    
    // command 选择
    if (commandTypes.findIndex(item => item.value === command) === -1) {
      const answer = await inquirer.prompt({
        name: 'command',
        type: 'list',
        message: 'Please select a commad',
        choices: commandTypes,
        pageSize: commandTypes.length,
      });
      command = answer.command;
    }

    // 若只有一个 config file 则直接选中
    const localFilePath = './config/config.local.js';
    const prodFilePath = './config/config.prod.js';
    const localFileExists = fs.existsSync(localFilePath);
    const prodFileExists = fs.existsSync(prodFilePath);
    if (localFileExists && !prodFileExists) {
      env = 'local';
    }
    if (!localFileExists && prodFileExists) {
      env = 'prod';
    }

    // env 选择
    if (envTypes.findIndex(item => item.value === env) === -1) {
      const answer = await inquirer.prompt({
        name: 'env',
        type: 'list',
        message: 'Please select a env',
        choices: envTypes,
        pageSize: envTypes.length,
      });
      env = answer.env;
    }
    
    console.log("[jianghu]", { command, env });

    // knex构建
    const dbSetting = this.readDbConfigFromFile({ configFilePath: `./config/config.${env}.js` });
    // const appConfig = require('/Users/colin/work/jianghujs/jianghujs-jianghu-config/config/config.local.js')({ baseDir });
    // const dbSetting = appConfig.knex.client.connection;
    const knex = Knex({
      client: 'mysql',
      connection: dbSetting,
    });

    // 执行脚本
    switch (command) {
        case 'jianghuConfigImportData':
            await jianghuConfigImportData.run({ knex, baseDir });
            break;
        default:
            throw new Error("[jianghu] unsupport command, command:" + command)
    }

    // 退出进程
    process.exit();
  }


  readDbConfigFromFile({ configFilePath }) {
    const configData = fs.readFileSync(configFilePath).toString();
    const setting = {};
    [ 'host', 'port', 'user', 'password', 'database' ].forEach(key => {
      const regStr = `${key}: (.*)`;
      const reg = new RegExp(regStr);
      const matchResult = configData.match(reg);
      setting[key] = matchResult[1].replace(/'/g, '').replace(/,/g, '').replace(/"/g, '');
    });
    return setting;
  }

};
