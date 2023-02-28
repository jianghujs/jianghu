'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');

module.exports = options => {
  return async (ctx, next) => {
    const { config } = ctx.app;
    const { jianghuConfig = {} } = config;

    if (!jianghuConfig.enableIpBlock) {
      return await next();
    }

    const ip = ctx.ip;
    // 黑名单判断
    if (jianghuConfig.rateLimiterBlacklist.includes(ip)) {
      throw new BizError(errorInfoEnum.request_rate_limit_exceeded);
    }

    return await next();
  };
};

