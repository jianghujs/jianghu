'use strict';

// ========================================常用 require start===========================================
const Service = require(process.cwd()).Service;

class StudentService extends Service {
  async beforHookForGenerateStudentId() {
    const { actionData } = this.ctx.request.body.appData;
    actionData.studentId = 'hook' + actionData.studentId;
    return actionData;
  }
}

module.exports = StudentService;
