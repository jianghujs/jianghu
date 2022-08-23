'use strict';

const packageUtil = require('./middlewareUtil/packageUtil');

module.exports = async ctx => {
  const midTime = new Date().getTime();

  const { packageResource } = ctx;
  const { resourceId } = packageResource;
  const { jianghuKnex, config, logger } = ctx.app;
  const { jianghuConfig } = config;

  // 记录 request resource; 这里的错误不能影响主业务 所以 try catch一下
  try {
    // 2. 记录 request resource; 这里的错误不能影响主业务 所以 try catch一下
    await packageUtil.saveRequestLogForResource(ctx);

    // 3. 更新 _resource.requestDemo & _resource.responseDemo
    if (jianghuConfig.updateRequestDemoAndResponseDemo) {
      await packageUtil.updateRequestDemoAndResponseDemo(ctx);
    }
  } catch (err) {
    logger.error('[saveRequestLogForResource error]', err);
  }

  logger.info('[socketPackageRecord.js ' + resourceId + ' - cost]', {
    useTime: `${new Date().getTime() - midTime}/ms`,
  });

  // 返回 ctx
  return ctx;
};

