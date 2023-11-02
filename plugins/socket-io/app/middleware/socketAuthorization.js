'use strict';

const { BizError, errorInfoEnum } = require('../../../../app/constant/error');
const { userStatusObj } = require('../../../../app/constant/constant');

module.exports = async ctx => {

  const { packageResource, userInfo } = ctx;
  const { user, userAppList, userGroupRoleList, allowResourceList } = userInfo;
  const { resourceId } = packageResource;
  const { config, jianghuKnex } = ctx.app;
  const { appType, appId } = config;
  const { groupId } = ctx.request.body.appData.actionData;
  const { isGroupIdRequired } = ctx.packageResource.resourceData;
  // 对于 public 的 resource ====》不需要做 用户状态的校验
  // public: { user: "*", group: "public", role: "*" }
  const allUserGroupRoleResourceList = await jianghuKnex('_user_group_role_resource').select();
  const isPublic = allUserGroupRoleResourceList.find(
    rule =>
      rule.group === 'public' &&
      rule.role === '*' &&
      rule.resource === resourceId
  );
  if (isPublic) {
    return ctx;
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
    const targetUserApp =
      userAppList && userAppList.find(x => x.appId === appId);
    if (!targetUserApp) {
      throw new BizError(errorInfoEnum.request_app_forbidden);
    }
  }

  // 4. 判断当前请求groupId 是否在用户 group列表中
  if (isGroupIdRequired === true) {
    if (!groupId) {
      throw new BizError({
        ...errorInfoEnum.request_data_invalid,
        errorReason: 'groupId is required',
      });
    }
    const currentUserGroupRole = userGroupRoleList.find(
      userGroupRole => userGroupRole.groupId === groupId
    );
    if (!currentUserGroupRole) {
      throw new BizError(errorInfoEnum.request_group_forbidden);
    }
  }

  // 5. 判断用户是否有 当前 packageResource 的权限
  const isNotAllow = !allowResourceList.some(resource => resource.resourceId === resourceId);
  if (isNotAllow) {
    throw new BizError(errorInfoEnum.resource_forbidden);
  }

  // 返回 ctx
  return ctx;
};

