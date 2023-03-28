'use strict';

const { userStatusObj } = require('../constant/constant');
const { errorInfoEnum } = require('../constant/error');

module.exports = option => {
  return async (ctx, next) => {
    const { packagePage, userInfo } = ctx;
    const { user, userAppList, allowPageList } = userInfo;
    const { pageId } = packagePage;
    const isLoginUser = user && user.userId;
    const { config, jianghuKnex } = ctx.app;
    const { appType, appId } = config;
    // 对于 public page ====》不需要做 用户状态的校验
    // public: { user: "*", group: "public", role: "*" }
    const isNotAllow = !allowPageList.some((page) => page.pageId === pageId);
    const { originalUrl } = ctx.request;
    const originalUrlEncode = encodeURIComponent(originalUrl);

    const goToErrorPage = ({ isLoginUser, error }) => {
      if (!isLoginUser) {
        ctx.redirect(
          ctx.app.config.loginPage + `?redirectUrl=${originalUrlEncode}`
        );
      } else {
        const { errorCode, errorReason } = error;
        ctx.redirect(
          `${ctx.app.config.helpPage}?errorCode=${errorCode}&errorReason=${errorReason}`
        );
      }
    };

    // 1. 判断用户是否有当前app的权限
    if (appType === "multiApp") {
      const targetUserApp =
        userAppList && userAppList.find((x) => x.appId === appId);
      if (isNotAllow && !targetUserApp) {
        const { errorCode, errorReason } = errorInfoEnum.request_app_forbidden;
        ctx.redirect(
          `${ctx.app.config.loginPage}?errorCode=${errorCode}&errorReason=${errorReason}`
        );
        return;
      }
    }

    // 2 判断用户状态
    if (isNotAllow && isLoginUser) {
      const { userStatus } = user;
      if (userStatus === userStatusObj.banned) {
        goToErrorPage({ isLoginUser, error: errorInfoEnum.user_banned });
        return;
      }
      if (userStatus !== userStatusObj.active) {
        goToErrorPage({ isLoginUser, error: errorInfoEnum.user_status_error });
        return;
      }
    }

    // 3. 判断用户是否有 当前 packagePage 的权限
    if (isNotAllow) {
      goToErrorPage({ isLoginUser, error: errorInfoEnum.page_forbidden });
      return;
    }

    // 4. 已登录 则重定向到首页
    if (pageId === "login" && isLoginUser && !ctx.request.query.errorCode) {
      ctx.redirect(ctx.app.config.indexPage);
  }
    await next();
  };
};

