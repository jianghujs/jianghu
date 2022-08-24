'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');

class AppWorkerLoader extends egg.AppWorkerLoader {

  loadConfig() {
    super.loadConfig();
    // Tip: 兼容代码, jianghuConfig, jiangHuConfig 合并
    const { jianghuConfig = {}, jiangHuConfig = {} } = this.app.config;
    this.app.config.jianghuConfig = Object.assign(jianghuConfig, jiangHuConfig);
    delete this.app.config.jiangHuConfig;
  }

  loadRouter() {
    // super.loadRouter();
    this.initJianghuRouter();
  }

  // 之前加载的 controller 不算数了，重新加载项目+框架的 app/controller 目录
  initJianghuRouter() {
    this.loadController({
      directory: this.getLoadUnits().map(unit => path.join(unit.path, 'app/controller')),
      // 让 controller 也支持 override
      override: true,
    });
    this.getLoadUnits().reverse().forEach(unit =>
      this.loadFile(path.join(unit.path, 'app/router.js'))
    );
  }

  // 让 service 也支持 override
  loadService(opt) {
    opt = Object.assign({
      override: true,
    }, opt);
    super.loadService(opt);
  }

}

class Application extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }

  // 覆盖 Egg 的 Loader，启动时使用这个 Loader
  get [EGG_LOADER]() {
    return AppWorkerLoader;
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
}

module.exports = Object.assign(egg, {
  AppWorkerLoader,
  Application,
  Agent,
});
