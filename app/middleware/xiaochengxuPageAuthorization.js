"use strict";

const { userStatusEnum, tableEnum } = require("../constant/constant");
const { BizError, errorInfoEnum } = require("../constant/error");

module.exports = (option) => {
  return async (ctx, next) => {
    const { packagePage, userInfo } = ctx;
    const { user, userAppList, allowPageList } = userInfo;
    const { pageId } = packagePage;
    const isLoginUser = user && user.userId;
    const { config, jianghuKnex } = ctx.app;
    const { appType, appId } = config;
    // 对于 public page ====》不需要做 用户状态的校验
    // public: { user: "*", group: "public", role: "*" }
    const allUserGroupRolePageList = await jianghuKnex(
      tableEnum._user_group_role_page
    ).select();
    const isNotPublic = !allUserGroupRolePageList.find(
      (rule) =>
        rule.group === "public" && rule.role === "*" && rule.page === pageId
    );
    const { originalUrl } = ctx.request;
    const originalUrlEncode = encodeURIComponent(originalUrl);

    // 2 判断用户状态
    if (isNotPublic && isLoginUser) {
      const { userStatus } = user;
      if (userStatus === userStatusEnum.banned) {
        throw new BizError(errorInfoEnum.user_banned);
      }
      if (userStatus !== userStatusEnum.active) {
        throw new BizError(errorInfoEnum.user_status_error);
      }
    }

    // 3. 判断用户是否有 当前 packagePage 的权限
    if (allowPageList.findIndex((x) => x.pageId === pageId) === -1) {
      throw new BizError(errorInfoEnum.page_forbidden);
    }
  };
};
