'use strict';

// ========================================常用 require start===========================================
const Service = require(process.cwd()).Service;

class SocketService extends Service {
  async connect() {
    const { actionData } = this.ctx.request.body.appData;
    return actionData;
  }
  async disconnect() {
    const { actionData } = this.ctx.request.body.appData;
    return actionData;
  }
  async sendMsg() {
    const { actionData } = this.ctx.request.body.appData;
    return actionData;
  }
}

module.exports = SocketService;
