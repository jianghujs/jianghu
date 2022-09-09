'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
const validateUtil = require('@jianghujs/jianghu/app/common/validateUtil');
// ========================================常用 require end=============================================
const actionDataScheme = Object.freeze({
  htmlErrorLogRecord: {
    type: 'object',
    additionalProperties: true,
    required: [ 'errorLogList' ],
    properties: {
      errorLogList: {
        type: 'array',
        items: {
          type:'object',
          additionalProperties: true,
          required: [ 'errorTime', 'errorMessage' ],
          properties: {
            userId: { anyOf: [{ type: 'null' }, { type: 'string' }, { type: 'number' }] },
            deviceId: { anyOf: [{ type: 'null' }, { type: 'string' }, { type: 'number' }] },
            errorTime: { anyOf: [{ type: 'string' }] },
            errorMessage: { anyOf: [{ type: 'string' }, { type: 'number' }] },
          },
        }
      },
    },
  },
});

class HtmlErrorService extends Service {
  async htmlErrorLogRecord() {
   const htmlLogger = this.app.getLogger("htmlLogger");
   const { actionData } = this.ctx.request.body.appData;
   validateUtil.validate(actionDataScheme.htmlErrorLogRecord, actionData);
   const { errorLogList } = actionData;
   errorLogList.forEach(errorLog => {
    htmlLogger.error("htmlErrorLogRecord", errorLog);
   });
  }
}

module.exports = HtmlErrorService;
