'use strict';

const { userStatusObj } = require('../constant/constant');
const { errorInfoEnum } = require('../constant/error');

module.exports = option => {
  return async (ctx, next) => {
    const { packagePage, userInfo } = ctx;
    const { user, userAppList, allowPageList } = userInfo;
    const { pageId } = packagePage;
    const { config } = ctx.app;
    const { appType, appId } = config;

    const goToErrorPage = ({ error }) => {
      const { errorCode, errorReason } = error;
      ctx.redirect(
        `${ctx.app.config.helpPage}?errorCode=${errorCode}&errorReason=${errorReason}`
      );
    };

    const goToErrorLoginPage = ({ error }) => {
      const { errorCode, errorReason } = error;
      ctx.redirect(
        `${ctx.app.config.loginPage}?errorCode=${errorCode}&errorReason=${errorReason}`
      );
    };

    // 对于 public page ====》不需要做 用户状态的校验
    // public: { user: "*", group: "public", role: "*" }
    const isPublic = allowPageList.find(page => page.pageId === pageId)?.isPublic || false;
    if (isPublic) {
      await next();
      return;
    }

    // 1. 判断用户是否登录
    const isLoginUser = user && user.userId;
    if (!isLoginUser) {
      const { originalUrl } = ctx.request;
      const originalUrlEncode = encodeURIComponent(originalUrl);
      ctx.redirect(
        ctx.app.config.loginPage + `?redirectUrl=${originalUrlEncode}`
      );
      return;
    }

    // 2 判断用户状态
    const { userStatus } = user;
    if (userStatus === userStatusObj.banned) {
      goToErrorLoginPage({ error: errorInfoEnum.user_banned });
      return;
    }
    if (userStatus !== userStatusObj.active) {
      goToErrorLoginPage({ error: errorInfoEnum.user_status_error });
      return;
    }

    // 3. 判断用户是否有当前app的权限
    if (appType === 'multiApp') {
      const targetUserApp = userAppList && userAppList.find(x => x.appId === appId);
      if (!targetUserApp) {
        goToErrorLoginPage({ error: errorInfoEnum.request_app_forbidden });
        return;
      }
    }

    // 4. 判断用户是否有 当前 packagePage 的权限
    const isNotAllow = !allowPageList.some(page => page.pageId === pageId);
    if (isNotAllow) {
      goToErrorPage({ error: errorInfoEnum.page_forbidden });
      return;
    }

    // 5. 已登录 从登录页自动则重定向到首页
    if (pageId === 'login' && isLoginUser && !ctx.request.query.errorCode) {
      ctx.redirect(ctx.app.config.indexPage);
    }
    await next();
  };
};

