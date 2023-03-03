'use strict';

const validateUtil = require('../../../../app/common/validateUtil');
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

const actionDataScheme = Object.freeze({
  selectItemListFromLogFile: {
    type: 'object',
    additionalProperties: true,
    required: [ 'logFile' ],
    properties: {
      // ${appId}.page.json.log 校验
      logFile: { type: 'string', pattern: '(.)page(.)json(.)log' },
    },
  },
});

class PageLogService extends Service {

  async selectLogFileList() {
    const { config } = this.ctx.app;
    const { baseDir, appId } = config;
    const targetLogDirPath = path.join(baseDir, '/logs');
    const fileList = fs.readdirSync(targetLogDirPath);
    const pageLogFileList = fileList.filter(filename => filename.includes(`${appId}.page.json.log`));
    const rows = pageLogFileList.map(filename => {
      return { filename };
    });
    return { rows };
  }


  async selectItemListFromLogFile() {
    const actionData = this.ctx.request.body.appData.actionData;
    validateUtil.validate(actionDataScheme.selectItemListFromLogFile, actionData);
    const { config } = this.ctx.app;
    const { baseDir, appId } = config;
    const { logFile } = actionData;
    const targetLogFilePath = path.join(baseDir, `/logs/${logFile}`);
    let strData = fs.readFileSync(targetLogFilePath, 'UTF-8').toString();
    strData = strData.replace(/"}\n/g, '"},');
    const rows = eval('[' + strData + ']');
    const newRows = rows.map(row => {
      const { message, ...other } = row;
      const messageObj = eval('(' + message + ')');
      const newRow = { ...other, ...messageObj };
      return newRow;
    });
    return { rows: newRows };
  }

}
module.exports = PageLogService;
