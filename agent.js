'use strict';

class AppAgent {
  constructor(agent) {
    this.agent = agent;
    this.storage = new Map();
    this.expireTimers = new Map();

    // 监听来自app worker的storage:get消息
    agent.messenger.on('storage:get', ({ key, from }) => {
      console.log('[Agent] Getting key:', { key, from });
      const value = this.storage.get(key);
      agent.messenger.sendTo(from, 'storage:get:response', { key, value });
    });

    // 监听来自app worker的storage:get消息
    agent.messenger.on('storage:set', ({ key, value }) => {
      console.log('[Agent] Setting key:', { key, value });
      this.storage.set(key, value);
    });

    // 监听来自app worker的storage:expire消息
    agent.messenger.on('storage:expire', ({ key, seconds }) => {
      console.log('[Agent] Setting expire:', { key, seconds });
      // 清除旧的定时器
      if (this.expireTimers.has(key)) {
        clearTimeout(this.expireTimers.get(key));
      }

      // 设置新的定时器
      const timer = setTimeout(() => {
        console.log('[Agent] Key expired:', key);
        this.storage.delete(key);
        this.expireTimers.delete(key);
      }, seconds * 1000);

      this.expireTimers.set(key, timer);
    });

    // 监听来自app worker的storage:del消息
    agent.messenger.on('storage:del', ({ key }) => {
      console.log('[Agent] Deleting key:', key);
      this.storage.delete(key);
      if (this.expireTimers.has(key)) {
        clearTimeout(this.expireTimers.get(key));
        this.expireTimers.delete(key);
      }
    });
  }
}

module.exports = agent => {
  return new AppAgent(agent);
};
