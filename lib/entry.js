'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Knex = require('knex');
const yargs = require('yargs');
const jianghuConfigImportData = require('./cmd/jianghuConfigImportData');
const jianghuConfigDumpData = require('./cmd/jianghuConfigDumpData');

const commandTypes = [{
  value: 'jianghuConfigImportData',
  name: 'Use /config/jianghuConfigData/xxx.json data import to database table(_resource, _ui, _page, _constant)',
},{
  value: 'jianghuConfigDumpData',
  name: 'Dump table(_resource, _ui, _page, _constant) data to /config/jianghuConfigData/xxx.json',
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

    const command = await this.promptCommand();
    const env = await this.promptEnv();
    const baseDir = process.cwd();
    console.log("[jianghu]", { baseDir, command, env });

    const appConfig = require(path.join(baseDir, `./config/config.${env}.js`))({ baseDir });
    const dbSetting = appConfig.knex.client.connection;
    const { jiangHuConfig } = appConfig;
    const { jianghuConfigDataIgnoreIdList={} } = jiangHuConfig;
    const knex = Knex({
      client: 'mysql',
      connection: dbSetting,
    });

    // 执行脚本
    switch (command) {
        case 'jianghuConfigImportData':
            await jianghuConfigImportData.run({ knex, baseDir, jianghuConfigDataIgnoreIdList });
            break;
        case 'jianghuConfigDumpData':
          await jianghuConfigDumpData.run({ knex, baseDir });
          break;    
        default:
            throw new Error("[jianghu] unsupport command, command:" + command)
    }

    // 退出进程
    process.exit();
  }



  async promptCommand () {
    let command = process.argv[2];
    if (commandTypes.findIndex(item => item.value === command) === -1) {
      const answer = await inquirer.prompt({
        name: 'command',
        type: 'list',
        message: 'Please select a commad',
        choices: commandTypes,
        pageSize: commandTypes.length + 1,
      });
      command = answer.command;
    }
    return command;
  }

  async promptEnv () {
    const params = yargs.parse(process.argv)
    let { env } = params;
    
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
    
    if (envTypes.findIndex(item => item.value === env) === -1) {
      const answer = await inquirer.prompt({
        name: 'env',
        type: 'list',
        message: 'Please select an env',
        choices: envTypes,
        pageSize: envTypes.length + 1,
      });
      env = answer.env;
    }
    return env;
  }

};
