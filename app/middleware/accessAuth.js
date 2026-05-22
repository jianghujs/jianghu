'use strict';

const crypto = require('crypto');

function createHmacSign(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function reject(ctx, msg) {
  ctx.status = 403;
  ctx.body = msg;
}

module.exports = () => {
  return async function accessAuth(ctx, next) {
    const { logger } = ctx;
    const { href, ip } = ctx;
    const { jianghuConfig = {} } = ctx.app.config;
    const { enableAccessAuth, accessAuthSecret, accessAuthTimestampWindow = 300, accessAppName = '指定应用' } = jianghuConfig;

    if (!enableAccessAuth) {
      await next();
      return;
    }

    const authed = ctx.cookies.get('access_auth', { signed: true });
    if (authed === '1') {
      await next();
      return;
    }

    const nonce = ctx.get('nonce') || ctx.query.nonce;
    const sign = ctx.get('sign') || ctx.query.sign;
    const timestamp = ctx.get('timestamp') || ctx.query.timestamp;

    if (!nonce || !sign || !timestamp) {
      logger.warn('[accessAuth] 缺少鉴权参数 url=%s ip=%s', href, ip);
      reject(ctx, `请从${accessAppName}打开`);
      return;
    }

    if (!/^[a-zA-Z0-9_-]{6,64}$/.test(nonce)) {
      logger.warn('[accessAuth] 无效nonce url=%s ip=%s nonce=%s', href, ip, nonce);
      reject(ctx, `请从${accessAppName}打开`);
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const ts = parseInt(timestamp, 10);

    if (!ts || Math.abs(now - ts) > accessAuthTimestampWindow) {
      logger.warn('[accessAuth] 时间戳过期 url=%s ip=%s ts=%s now=%s window=%d', href, ip, timestamp, now, accessAuthTimestampWindow);
      reject(ctx, `请从${accessAppName}打开`);
      return;
    }

    const expectedSign = createHmacSign(`${nonce}${timestamp}`, accessAuthSecret);

    if (sign !== expectedSign) {
      logger.warn('[accessAuth] 签名无效 url=%s ip=%s nonce=%s ts=%s', href, ip, nonce, timestamp);
      reject(ctx, `请从${accessAppName}打开`);
      return;
    }

    ctx.cookies.set('access_auth', '1', {
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
      secure: ctx.app.config.env === 'prod',
    });

    await next();
  };
};
