'use strict';

const { BizError, errorInfoEnum } = require('../constant/error');
const { userStatusObj } = require('../constant/constant');

module.exports = option => {
  return async (ctx, next) => {

    const { packageResource, userInfo } = ctx;
    const { user, userAppList, userGroupRoleList, allowResourceList } = userInfo;
    const { resourceId } = packageResource;
    const isLoginUser = user && user.userId;
    const { config, jianghuKnex } = ctx.app;
    const { appType, appId } = config;
    const { groupId } = ctx.request.body.appData.actionData;
    const { isGroupIdRequired } = ctx.packageResource.resourceData;
    // 对于 public 的 resource ====》不需要做 用户状态的校验
    // public: { user: "*", group: "public", role: "*" }
    const allUserGroupRoleResourceList = await jianghuKnex('_user_group_role_resource').select();
    const isNotPublic = !allUserGroupRoleResourceList.find(rule => rule.group === 'public'
        && rule.role === '*' && rule.resource === resourceId);

    // 1. 判断用户是否有当前app的权限
    if (isNotPublic && appType === 'multiApp') {
      const targetUserApp = userAppList && userAppList.find(x => x.appId === appId);
      if (!targetUserApp) {
        throw new BizError(errorInfoEnum.request_app_forbidden);
      }
    }

    // 2 判断用户状态
    if (isNotPublic && isLoginUser) {
      const { userStatus } = user;
      if (userStatus === userStatusObj.banned) {
        throw new BizError(errorInfoEnum.user_banned);
      }
      if (userStatus !== userStatusObj.active) {
        throw new BizError(errorInfoEnum.user_status_error);
      }
    }

    // 3 判断当前请求groupId 是否在用户 group列表中
    if (isGroupIdRequired === true) {
      if (!groupId) {
        throw new BizError({ ...errorInfoEnum.request_data_invalid, errorReason: 'groupId is required' });
      }
      const currentUserGroupRole = userGroupRoleList.find(userGroupRole => userGroupRole.groupId === groupId);
      if (!currentUserGroupRole) {
        throw new BizError(errorInfoEnum.request_group_forbidden);
      }
    }

    // 4. 判断用户是否有 当前 packageResource 的权限
    if (allowResourceList.findIndex(x => x.resourceId === resourceId) === -1) {
      // 3.1 若未登陆 则 提示用户登陆后再来 请求这个 resource
      if (!isLoginUser) {
        throw new BizError(errorInfoEnum.request_token_invalid);
      } else {
        throw new BizError(errorInfoEnum.resource_forbidden);
      }
    }

    await next();
  };
};

