'use strict';

const Service = require('egg').Service;
const captchaUtil = require('../common/captchaUtil');

class CaptchaService extends Service {

  async getLoginCaptcha(actionData) {
    const { ctx } = this;
    const { cacheStorage } = ctx.app;
    const { config } = ctx.app;
    const { appId, jianghuConfig: { enableLoginCaptcha } } = config;
    const { deviceId } = actionData;
    console.log("[enableLoginCaptcha]#######: ", enableLoginCaptcha);

    if (!enableLoginCaptcha) {
      return '';
    }

    // 首次登陆不需要验证码
    const loginAttemptCount = parseInt(await cacheStorage.get(`${appId}_${deviceId}_loginAttemptCount`) || '0');
    if (!loginAttemptCount) {
      return '';
    }    

    // 生成验证码
    const mathProblem = captchaUtil.generateRandomMathExpression();
    const svg = captchaUtil.generateSVG(mathProblem.expression);

    // 存储验证码结果到缓存
    const cacheKey = `${appId}_${deviceId}_loginVerifyCode`;
    await cacheStorage.set(cacheKey, mathProblem.result.toLowerCase());
    await cacheStorage.expire(cacheKey, 300); // 5分钟过期

    return svg;
  }
}

module.exports = CaptchaService;
