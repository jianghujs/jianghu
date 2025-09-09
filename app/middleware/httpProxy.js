const proxy = require('koa-proxy');

module.exports = options => {
    return async (ctx, next) => {
        const { logger, config } = ctx.app;
        const { appId } = config;
        const { httpProxyConfigList=[] } = ctx.app.config.jianghuConfig;
        for (const proxyConfig of httpProxyConfigList) {
            const { sourcePath, query={}, targetHost } = proxyConfig;
            if (!ctx.url.startsWith(sourcePath)) { continue; }
            // Tip: 自己转发自己, 只支持一次转发; 避免死循环调用
            if (ctx.query && ctx.query.appId == appId) { continue; }
            let queryIsMatch = true;
            for (const queryKey in query) {
                const queryValue = query[queryKey];
                if (!new RegExp(`^${queryValue}$`).test(ctx.query[queryKey])) {
                    queryIsMatch = false;
                }
            }
            if (!queryIsMatch) { continue; }
            ctx.url = ctx.url.includes('?') ? `${ctx.url}&appId=${appId}` : `${ctx.url}?appId=${appId}`;
            logger.debug('[httpProxy]', { url: ctx.url, targetHost });
            return proxy({ host: targetHost, yieldNext: false })(ctx, next)
        }
        // 用完 authToken 后不再需要保留在 actionData 中
        if (ctx.request && ctx.request.body && ctx.request.body.appData) {
            delete ctx.request.body.appData.authToken;
        }
        await next();
    };
};