'use strict';

const { createJianghuKnex } = require('./app/common/jianghuKnexUtil');
// const socketIOInit = require('./app/controller/socketResource');

/**
 * 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）
 * 配置文件加载完成（configDidLoad）
 * 文件加载完成（didLoad）
 * 插件启动完毕（willReady）
 * worker 准备就绪（didReady）
 * 应用启动完成（serverDidReady）
 * 应用即将关闭（beforeClose）
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
  }

  configDidLoad() {
    // 挂载jianghuKnex
    this.app.jianghuKnex = createJianghuKnex(this.app.knex);
  }

  async didLoad() {
  }

  async willReady() {
    if (this.app.config.jianghuConfig.enableSocket) {
      await this.app.socketIOInit(this.app);
    }
  }

  async didReady() {
  }

  async serverDidReady() {
  }

  async beforeClose() {
  }

}

module.exports = AppBootHook;

