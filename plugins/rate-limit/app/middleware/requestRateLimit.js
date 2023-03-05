'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');

// todo 这个记录应该是进程间共享的
// 每个 ip 请求统计，记录在内存
const ipStatMap = new Map();

// 获取 ip 的统计情况
const getStat = (ip, rateLimiterDuration, rateLimiterMax) => {
  const entry = ipStatMap.get(ip);
  const now = new Date().getTime();
  const reset = now + rateLimiterDuration;
  const expired = entry !== undefined && entry.reset < now;
  const hasKey = ipStatMap.has(ip);
  const shouldReInit = !hasKey || expired;

  if (shouldReInit) {
    const initState = {
      reset,
      remaining: rateLimiterMax,
      total: rateLimiterMax,
    };
    ipStatMap.set(ip, initState);

    return initState;
  }
  entry.remaining = entry.remaining > 0 ? entry.remaining - 1 : 0;

  return entry;
};

const checkPathPrefixMatch = (path, pathPrefixList, appId) => {
  for (let pathPrefix of pathPrefixList) {
    if (pathPrefix.includes('${appId}')) {
      pathPrefix = pathPrefix.replace('${appId}', appId);
    }
    if (path.toLowerCase().startsWith(pathPrefix.toLowerCase())) {
      return true;
    }
  }
};

module.exports = options => {
  return async (ctx, next) => {
    const { logger, config } = ctx.app;
    const { jianghuConfig = {}, appId } = config;

    if (!jianghuConfig.enableRateLimiter) {
      return await next();
    }

    // 忽略路径
    if (jianghuConfig.rateLimiterIgnorePathPrefix
        && checkPathPrefixMatch(ctx.request.path, jianghuConfig.rateLimiterIgnorePathPrefix, appId)) {
      return await next();
    }

    const ip = ctx.ip;

    // ip 白名单
    if (jianghuConfig.rateLimiterWhitelist.includes(ip)) {
      return await next();
    }

    const limit = getStat(ip, jianghuConfig.rateLimiterDuration, jianghuConfig.rateLimiterMax);

    const currentRemaining = limit.remaining > 0 ? limit.remaining - 1 : 0;
    const headers = {
      'X-RateLimit-Remaining': currentRemaining,
      'X-RateLimit-Reset': limit.reset,
      'X-RateLimit-Limit': limit.total,
    };
    ctx.set(headers);

    logger.info('requestRateLimit', limit);

    // 放行
    if (limit.remaining > 0) return await next();

    // 限制
    const after = limit.reset - (Date.now());
    ctx.set('Retry-After', after);
    throw new BizError(errorInfoEnum.request_rate_limit_exceeded);
  };
};

