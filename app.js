'use strict';

const { createJianghuKnex } = require('./app/common/jianghuKnexUtil');
const { createCacheStorage } = require('./app/common/cacheStorage');

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
    this.app.jianghuKnex = createJianghuKnex(this.app.knex, this.app.config.jianghuConfig.jhIdConfig);
    
    // 挂载cacheStorage
    this.app.cacheStorage = createCacheStorage(this.app);
    
    if (!this.app.config.authTokenKey) {
      this.app.config.authTokenKey = this.app.config.appId;
    }

    if (this.app.config.jianghuConfig.enableUploadStaticFileAuthorization) {
      const uploadDir = `/${this.app.config.appId}/upload/`;
      const existIndex = this.app.config.static.dir.findIndex(item => item.prefix === uploadDir);
      if (existIndex !== -1) {
        // 删除
        this.app.config.static.dir.splice(existIndex, 1);
      }
    }
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

