'use strict';

class CacheStorage {
  constructor(app) {
    this.app = app;
    this.responseCallbacks = new Map();
    
    // 在构造函数中设置全局监听器
    this.app.messenger.on('storage:get:response', ({ key, value }) => {
      const callback = this.responseCallbacks.get(key);
      if (callback) {
        callback(value);
        this.responseCallbacks.delete(key);
      } 
    });
  }

  // 获取键值
  async get(key) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.responseCallbacks.delete(key);
        this.app.logger.warn('[storage] Get timeout:', { key });
        reject(new Error('Get storage timeout'));
      }, 5000);

      this.responseCallbacks.set(key, (value) => {
        clearTimeout(timeout);
        resolve(value);
      });

      this.app.messenger.sendToAgent('storage:get', {
        key,
        from: process.pid,
      });
    });
  }

  // 设置键值
  async set(key, value) {
    this.app.messenger.sendToAgent('storage:set', { key, value });
  }

  // 设置键值过期时间
  async expire(key, seconds) {
    this.app.messenger.sendToAgent('storage:expire', { key, seconds });
  }

  // 删除键值
  async del(key) {
    this.app.messenger.sendToAgent('storage:del', { key });
  }
}

module.exports.createCacheStorage = (app) => {
  const cacheStorage = new CacheStorage(app);
  return cacheStorage;
};
