'use strict';

const validateUtil = require('../common/validateUtil');
const userInfoUtil = require("./middlewareUtil/userInfoUtil");

module.exports = async (ctx) => {
  const { body } = ctx.request;
  const { jianghuKnex, logger, config } = ctx.app;
  const { appType } = config;
  const { isGroupIdRequired } = ctx.packageResource.resourceData;

  // 捕获 userInfo: { user, userGroupRoleList, allowPageList, allowUiLevelList, userAppList } 到 ctx.userInfo
  ctx.userInfo = await userInfoUtil.getUserInfo({
    config,
    body,
    jianghuKnex,
    logger,
    isGroupIdRequired,
    appType,
  });

  // 返回 ctx
  return ctx;
};

