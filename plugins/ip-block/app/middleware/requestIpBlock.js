'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');
const fs = require('fs');

module.exports = options => {
  return async (ctx, next) => {
    const { config } = ctx.app;
    const { jianghuConfig = {} } = config;

    if (!jianghuConfig.enableIpBlock) {
      return await next();
    }

    const ip = ctx.ip;
    if (!ip) {
      return await next();
    }

    // 黑名单判断
    if (jianghuConfig.rateLimiterBlacklist.includes(ip)) {
      throw new BizError(errorInfoEnum.request_rate_limit_exceeded);
    }

    // 黑名单文件配置
    if (jianghuConfig.rateLimiterBlacklistFilePath) {
      const content = fs.readFileSync(jianghuConfig.rateLimiterBlacklistFilePath);
      const ipList = content.split(/\r?\n/);
      if (ipList.includes(ip)) {
        throw new BizError(errorInfoEnum.request_rate_limit_exceeded);
      }
    }

    return await next();
  };
};

