'use strict';

const { createJianghuKnex } = require('./app/common/jianghuKnexUtil');
const socketIOInit = require('./app/controller/socketResource');

// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    this.app.jianghuKnex = createJianghuKnex(this.app.knex);
    if (this.app.config.jiangHuConfig.enableSocket) {
      await socketIOInit(this.app);
    }
  }

  // 所有配置已经加载完毕，用于自定义 Loader 挂载。
  async didLoad() {
  }

}

module.exports = AppBootHook;

