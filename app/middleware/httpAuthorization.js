'use strict';

const { BizError, errorInfoEnum } = require('../constant/error');
const { userStatusObj } = require('../constant/constant');

module.exports = option => {
  return async (ctx, next) => {

    const { packageResource, userInfo } = ctx;
    const { user, userAppList, allowResourceList } = userInfo;
    const { resourceId } = packageResource;
    const { config } = ctx.app;
    const { appType, appId } = config;

    // 对于 public 的 resource ====》不需要做 用户状态的校验
    // public: { user: "*", group: "public", role: "*" }
    const isPublic = allowResourceList.find(resource => resource.resourceId === resourceId)?.isPublic || false;
    if (isPublic) {
      await next();
      return;
    }

    // 1. 判断用户是否登录
    const isLoginUser = user && user.userId;
    if (!isLoginUser) {
      throw new BizError(errorInfoEnum.request_token_invalid);
    }

    // 2. 判断用户状态
    const { userStatus } = user;
    if (userStatus === userStatusObj.banned) {
      throw new BizError(errorInfoEnum.user_banned);
    }
    if (userStatus !== userStatusObj.active) {
      throw new BizError(errorInfoEnum.user_status_error);
    }

    // 3. 判断用户是否有当前app的权限
    if (appType === 'multiApp') {
      const targetUserApp = userAppList && userAppList.find(x => x.appId === appId);
      if (!targetUserApp) {
        throw new BizError(errorInfoEnum.request_app_forbidden);
      }
    }

    // 4. 判断用户是否有 当前 packageResource 的权限
    const isNotAllow = !allowResourceList.some(resource => resource.resourceId === resourceId);
    if (isNotAllow) {
      throw new BizError(errorInfoEnum.resource_forbidden);
    }

    await next();
  };
};

