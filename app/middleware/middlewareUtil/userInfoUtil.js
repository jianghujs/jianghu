'use strict';

const _ = require('lodash');
const dayjs = require('dayjs');

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
    if (authTokenKey === appId) {
      userSession = await jianghuKnex('_user_session')
        .where({ authToken })
        .first();
    }
    if (authTokenKey !== appId) {
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
    const { authTokenKey, appId } = config;
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
    userGroupRoleList.push({ userId, groupId: 'public', roleId: '--' });
    if (userId) {
      userGroupRoleList.push({ userId, groupId: 'login', roleId: '--' });
    }
    const allowResourceList = await this.captureAllowResourceList({
      jianghuKnex,
      userGroupRoleList,
    });
    const allowPageList = await this.captureAllowPageList({
      jianghuKnex,
      userGroupRoleList,
    });
    const userAppList =
      appType === 'multiApp'
        ? await this.captureAppList({ jianghuKnex, userId })
        : [];
    // Tip: 需要把 groupName 和 roleName 带出来, 而且public和login不需要带出来
    let userGroupRoleListForShow = [];
    if (userId) {
      const rawResult = await jianghuKnex.raw(`SELECT _user_group_role.userId AS userId,_user_group_role.groupId AS groupId,
                              _group.groupName AS groupName, _user_group_role.roleId AS roleId, _role.roleName AS roleName 
        FROM _user_group_role 
          LEFT JOIN _role ON _user_group_role.roleId = _role.roleId 
          LEFT JOIN _group ON _user_group_role.groupId = _group.groupId
          where userId = "${userId}";`);
      userGroupRoleListForShow = rawResult[0];
    }
    return { userGroupRoleList: userGroupRoleListForShow, allowResourceList, allowPageList, userAppList };
  },

  async captureAppList({ jianghuKnex, userId }) {
    if (!userId) {
      return [];
    }
    return await jianghuKnex('_view02_user_app')
      .where({ userId })
      .select();
  },

  async captureAllowResourceList({
    jianghuKnex,
    userGroupRoleList,
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
      userGroupRoleList
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
    userGroupRoleList,
  }) {
    const allPageList = await jianghuKnex('_page').select();
    const allUserGroupRolePageList = await jianghuKnex('_user_group_role_page').select();
    const allowPageList = this.computeAllowList(
      'page',
      allPageList,
      allUserGroupRolePageList,
      userGroupRoleList
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
   * @param userGroupRoleList
   */
  computeAllowList(
    fieldKey,
    allItemList,
    allRuleList,
    userGroupRoleList
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
        if (!this.checkResource(item[idFieldKey], rule[fieldKey])) {
          return;
        }

        // 判断这条规则是否和当前用户匹配
        if (!this.checkRule({ userGroupRoleList, rule })) {
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
   * userGroupRoleList 是否和当前 rule匹配
   * @param userGroupRoleList.userGroupRoleList
   * @param userGroupRoleList  [{ userId, groupId, roleId }]
   * @param rule  {user:'*', group: 'login', role:'*'}
   * @param userGroupRoleList.rule
   */
  checkRule({ userGroupRoleList, rule }) {
    const userGroupRoleListRule = userGroupRoleList
      .filter(userGroupRole => this.checkResource(userGroupRole.userId, rule.user))
      .filter(userGroupRole => this.checkResource(userGroupRole.groupId, rule.group))
      .filter(userGroupRole => this.checkResource(userGroupRole.roleId, rule.role));
    if (userGroupRoleListRule.length === 0) {
      return false;
    }
    if (userGroupRoleListRule.length > 0) {
      return true;
    }
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
        '^' + ruleValue.replace(/\./g, '\\.').replace(/\|/g, '\\\\|').replace('*', '.*') + '$';
      const regExp = new RegExp(ruleReg);
      return regExp.test(checkResource);
    });
  },
};

