const proxy = require('koa-proxy');

module.exports = options => {
    return async (ctx, next) => {
        const { httpProxyConfigList=[] } = ctx.app.config.jianghuConfig;
        for (const proxyConfig of httpProxyConfigList) {
            const { sourcePath, query={}, targetHost } = proxyConfig;
            if (!ctx.url.startsWith(sourcePath)) { continue; }
            let queryIsMatch = true;
            for (const queryKey in query) {
                const queryValue = query[queryKey];
                if (!new RegExp(`^${queryValue}$`).test(ctx.query[queryKey])) {
                    queryIsMatch = false;
                }
            }
            if (!queryIsMatch) { continue; }
            return proxy({ host: targetHost, yieldNext: false })(ctx, next)
        }
        // 用完 authToken 后不再需要保留在 actionData 中
        if (ctx.request && ctx.request.body && ctx.request.body.appData) {
            delete ctx.request.body.appData.authToken;
        }
        await next();
    };
};