'use strict';

const _ = require('lodash');
const dayjs = require('dayjs');
const { BizError, errorInfoEnum } = require('../../constant/error');

async function getUserFromJwtAuthToken(authToken, jianghuKnex, xiaochengxuUserId, authTokenKey, appId) {
  let user = {};
  if (!authToken) {
    return user;
  }

  let userSession;
  // 如果是小程序用户，则不从 userSession 查数据，而是 mock 一个 userUession
  if (xiaochengxuUserId) {
    userSession = {
      userId: xiaochengxuUserId,
      deviceId: 'from_xiaochengxu',
      operationAt: dayjs().format(),
    };
  } else {
    if (authTokenKey == appId) {
      userSession = await jianghuKnex('_user_session')
        .where({ authToken })
        .first();
    }  
    if (authTokenKey != appId) {
      userSession = await jianghuKnex(`_${authTokenKey}_user_session`)
        .where({ authToken })
        .first();
    }

  }
  if (userSession && userSession.userId) {
    const userResult = await jianghuKnex('_view01_user')
      .where({ userId: userSession.userId })
      .first();
    if (userResult) {
      const userTmp = _.omit(userResult, [ 'clearTextPassword', 'password', 'md5Salt' ]);
      user = userTmp;
      user.deviceId = userSession.deviceId;
      user.deviceType = userSession.deviceType;
      user.loginTime = userSession.operationAt;
    }
  }
  return user;
}

module.exports = {
  async getUserInfo({
    ctx,
    config,
    body,
    jianghuKnex,
    isGroupIdRequired,
    appType,
    xiaochengxuUserId = null,
    mockBody = false,
  }) {
    if (mockBody) {
      // 由于 userInfoUtil 针对的是 post 请求，所以需要构造一个结构一致的 body
      body = {
        appData: {
          authToken: ctx.cookies.get(`${config.authTokenKey}_authToken`, {
            httpOnly: false,
            signed: false,
          }),
        },
      };
    }
    const { authToken, actionData = {} } = body.appData;
    // 取到 authToken 后不再需要保留在 actionData 中
    delete body.appData.authToken;

    // 获取用户信息
    const { authTokenKey, appId } = config
    const user = await getUserFromJwtAuthToken(authToken, jianghuKnex, xiaochengxuUserId, authTokenKey, appId);
    const { userId, username } = user;
    const groupId = isGroupIdRequired ? actionData.groupId : '';

    // 如果有缓存，则直接返回缓存
    if (userId && config.jianghuConfig.enableUserInfoCache && !isGroupIdRequired) {
      const otherUserRuleData = await this.getUserRuleDataFromCache(
        jianghuKnex,
        userId
      );
      if (otherUserRuleData) {
        return { userId, username, user, ...otherUserRuleData };
      }
    }

    return {
      userId,
      username,
      user,
      ...(await this.captureUserRuleData({
        jianghuKnex,
        appType,
        userId,
        groupId,
      })),
    };
  },

  async getUserRuleDataFromCache(jianghuKnex, userId) {
    // const cache = await jianghuKnex('_cache').where({ userId: userId || 'visitor' }).first();
    const cache = await jianghuKnex('_cache').where({ userId }).first();
    if (cache && cache.content) {
      return JSON.parse(cache.content);
    }
    return null;
  },

  /**
   * 获取用户的 userGroupRoleList, allowResourceList, allowPageList, userAppList
   * @param params
   * @param params.jianghuKnex
   * @param params.appType
   * @param params.userId
   * @param params.groupId
   */
  async captureUserRuleData({ jianghuKnex, appType, userId, groupId = null }) {
    let userGroupRoleList = [];
    if (userId) {
      // Tip: resource指定groupId后 ===> 只能取当前的groupId ===> params: { groupId }
      userGroupRoleList = groupId
        ? await jianghuKnex('_user_group_role')
          .where({ userId, groupId })
          .select() :
        await jianghuKnex('_user_group_role')
          .where({ userId })
          .select();
    }

    const { userIdList, groupIdList, roleIdList } = this.getRuleIdList(
      groupId,
      userId,
      userGroupRoleList
    );
    const allowResourceList = await this.captureAllowResourceList({
      jianghuKnex,
      userIdList,
      groupIdList,
      roleIdList,
    });
    const allowPageList = await this.captureAllowPageList({
      jianghuKnex,
      userIdList,
      groupIdList,
      roleIdList,
    });
    const userAppList =
      appType === 'multiApp'
        ? await this.captureAppList({ jianghuKnex, userId })
        : [];
    return { userGroupRoleList, allowResourceList, allowPageList, userAppList };
  },

  async captureAppList({ jianghuKnex, userId }) {
    if (!userId) {
      return [];
    }
    return await jianghuKnex('_view02_user_app')
      .where({ userId })
      .select();
  },

  getRuleIdList(groupId, userId, userGroupRoleList) {
    const getGroupIdList = (groupId, userId, userGroupRoleList) => {
      const groupIdList = userGroupRoleList.map(
        userGroupRole => userGroupRole.groupId
      );
      groupIdList.push('*');
      if (groupId) {
        return groupIdList;
      }
      groupIdList.push('public');
      if (userId) {
        groupIdList.push('login');
      }
      return groupIdList;
    };
    const getRoleIdList = (userId, userGroupRoleList) => {
      const roleIdList = userGroupRoleList.map(
        userGroupRole => userGroupRole.roleId
      );
      roleIdList.push('*');
      return roleIdList;
    };
    const getUserIdList = userId => {
      const userIdList = [];
      if (userId) {
        userIdList.push(userId);
      }
      userIdList.push('*');
      return userIdList;
    };

    const userIdList = getUserIdList(userId);
    const groupIdList = getGroupIdList(groupId, userId, userGroupRoleList);
    const roleIdList = getRoleIdList(userId, userGroupRoleList);
    return { userIdList, groupIdList, roleIdList };
  },

  async captureAllowResourceList({
    jianghuKnex,
    userIdList,
    groupIdList,
    roleIdList,
  }) {
    const allResourceList = await jianghuKnex('_resource').select();
    allResourceList.forEach(resource => {
      const { pageId, actionId } = resource;
      resource.resourceId = `${pageId}.${actionId}`;
    });
    const allUserGroupRoleResourceList = await jianghuKnex('_user_group_role_resource').select();
    const allowResourceList = this.computeAllowList(
      'resource',
      allResourceList,
      allUserGroupRoleResourceList,
      userIdList,
      groupIdList,
      roleIdList
    );
    return allowResourceList.map(resource => {
      return {
        resourceId: resource.resourceId,
        pageId: resource.pageId,
        actionId: resource.actionId,
        resourceType: resource.resourceType,
        isPublic: resource.isPublic,
      };
    });
  },

  async captureAllowPageList({
    jianghuKnex,
    userIdList,
    groupIdList,
    roleIdList,
  }) {
    const allPageList = await jianghuKnex('_page').select();
    const allUserGroupRolePageList = await jianghuKnex('_user_group_role_page').select();
    const allowPageList = this.computeAllowList(
      'page',
      allPageList,
      allUserGroupRolePageList,
      userIdList,
      groupIdList,
      roleIdList
    );
    return allowPageList;
  },
  /**
   * 计算用户有权限的数据项
   *
   * @param fieldKey 数据类型字段，如 'resource', 'page', 'uiLevel'
   * @param allItemList 所有的数据列表，如 allResourceList, allPageList, allUiLevelList
   * @param allRuleList 所有的规则列表，如 allUserGroupRoleResourceList， allUserGroupRolePageList， allUserGroupRoleUiLevelList
   * @param userIdList
   * @param groupIdList 用户有权限的 groupId 列表
   * @param roleIdList 用户所属的 roleId 列表
   */
  computeAllowList(
    fieldKey,
    allItemList,
    allRuleList,
    userIdList,
    groupIdList,
    roleIdList
  ) {
    const idFieldKey = `${fieldKey}Id`;
    const allowItemList = [];
    const allItemMap = Object.fromEntries(
      allItemList.map(obj => [ obj[idFieldKey], obj ])
    );

    if (!allItemList || !allRuleList) {
      return allowItemList;
    }

    // 检查每个数据项有没有权限
    allItemList.forEach(item => {
      let resultAllowOrDeny = '';
      let isPublic = false;
      // 遍历并检查规则
      allRuleList.forEach(rule => {
        // deny 的优先级高于全部，一旦有 deny 则不再需要判断
        if (resultAllowOrDeny === 'deny') {
          return;
        }

        // 判断这条规则是否和当前用户匹配
        if (
          !this.checkRule(userIdList, rule.user) ||
          !this.checkRule(groupIdList, rule.group) ||
          !this.checkRule(roleIdList, rule.role)
        ) {
          return;
        }
        // 判断这条规则的资源是否和当前资源匹配
        if (!this.checkResource(item[idFieldKey], rule[fieldKey])) {
          return;
        }
        if (rule.group === 'public') {
          isPublic = true;
        }
        resultAllowOrDeny = rule.allowOrDeny;
      });

      if (resultAllowOrDeny === 'allow') {
        const allItem = allItemMap[item[idFieldKey]];
        allowItemList.push({ ...allItem, isPublic });
      }
    });
    return allowItemList;
  },
  /**
   * 判断具体字段是否符合规则
   * 如果 checkValueList 中的数据有一条在 ruleFieldValue 中，则返回 true
   *
   * @param checkValueList 待检查的数据列表，如 ['*', '10001']
   * @param ruleFieldValue 规则字段值，支持逗号，如 '*,10001,10002'
   */
  checkRule(checkValueList, ruleFieldValue) {
    const ruleParts = ruleFieldValue.split(',');
    if (ruleParts.includes('*')) {
      return true;
    }
    return !!checkValueList.find(checkValue =>
      ruleParts.includes(checkValue)
    );
  },

  /**
   * @description 判断资源是否符合规则，支持逗号及后缀通配符
   * @return {Boolean} 检查结果
   * @param {String} checkResource 待检查资源名，如 app1.student.res1
   * @param {String} ruleResource 规则中的资源名，如 app1.normal.*,app1.student.res1
   */
  checkResource(checkResource, ruleResource) {
    const ruleParts = ruleResource.split(',');
    return !!ruleParts.find(ruleValue => {
      // 将后缀通配符转成正常正则
      const ruleReg =
        '^' + ruleValue.replace(/\./g, '\\.').replace('*', '.*') + '$';
      const regExp = new RegExp(ruleReg);
      return regExp.test(checkResource);
    });
  },
};

