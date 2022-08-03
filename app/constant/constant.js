'use strict';

const dayjs = require('dayjs');
const _ = require('lodash');

module.exports.resourcePath = 'resource';

module.exports.bodyStatusObj = Object.freeze({
  success: 'success', fail: 'fail',
});

module.exports.resourceTypeObj = Object.freeze({
  service: 'service', auth: 'auth', sql: 'sql',
  socketService: 'socketService', socketSql: 'socketSql',
});

module.exports.sqlActionObj = Object.freeze({
  insert: 'insert', delete: 'delete', update: 'update', select: 'select',
});

module.exports.httpResponse = Object.freeze({
  success: ({ packageId, appData }) => resourcePackageBuild({
    packageId,
    packageType: 'httpResponse',
    status: this.bodyStatusObj.success,
    appData,
  }),
  fail: ({ packageId, appData }) => resourcePackageBuild({
    packageId,
    packageType: 'httpResponse',
    status: this.bodyStatusObj.fail,
    appData,
  }),
});

module.exports.socketResponse = Object.freeze({
  success: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: "socketResponse",
      status: this.bodyStatusObj.success,
      appData,
    }),
  fail: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: "socketResponse",
      status: this.bodyStatusObj.fail,
      appData,
    }),
});

module.exports.socketRequest = {
  bodyBuild: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: "socketRequest",
      appData,
    }),
};

module.exports.socketForward = {
  bodyBuild: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: "socketForward",
      appData,
    }),
};

function resourcePackageBuild({ packageId, packageType, status, appData }) {
  return {
    packageId: packageId || `${Date.now()}_${_.random(1000000, 9999999)}`,
    packageType,
    status,
    timestamp: dayjs().format(),
    appData,
  };
}

module.exports.duoxingSocketStatusObj = Object.freeze({
  online: 'online',
  offline: 'offline',
});

module.exports.noticeTypeObj = Object.freeze({
  // group
  createGroup: 'createGroup',
  destroyGroup: 'destroyGroup',
  addGroupUser: 'addGroupUser',
  delGroupUser: 'delGroupUser',
  setGroupUserRole: 'setGroupUserRole',
  transferGroup: 'transferGroup',
  quitGroup: 'quitGroup',
  // user
  addUserFriend: 'addUserFriend',
  delUserFriend: 'delUserFriend',
  acceptUserFriend: 'acceptUserFriend',
  rejectUserFriend: 'rejectUserFriend',
  // 非聊天记录类型
  onlineNotice: 'onlineNotice',
  offlineNotice: 'offlineNotice',
  errorNotice: 'errorNotice',
});

module.exports.socketToClient = {
  bodyBuild: ({ packageId, appData }) => resourcePackageBuild({
    packageId,
    packageType: 'socketToClient',
    appData,
  }),
  userNoticeBodyBuild: ({ packageId, appData: { appId, actionData } }) => resourcePackageBuild({
    packageId,
    packageType: 'socketToClient',
    appData: { appId, pageId: 'socket', actionId: 'userNotice', actionData },
  }),
  groupNoticeBodyBuild: ({ packageId, appData: { appId, actionData } }) => resourcePackageBuild({
    packageId,
    packageType: 'socketToClient',
    appData: { appId, pageId: 'socket', actionId: 'groupNotice', actionData },
  }),
};

module.exports.tableObj = Object.freeze({
  // ========================江湖表============================
  _cache: '_cache',
  _constant: '_constant',
  _app: '_app',
  _file: '_file',
  _group: '_group',
  _page: '_page',
  _ui: '_ui',
  _resource: '_resource',
  _resource_request_log: '_resource_request_log',
  _record_history: '_record_history',
  _role: '_role',
  _user: '_user',
  _user_app: '_user_app',
  _view_user_app: '_view02_user_app',
  _user_group_role: '_user_group_role',
  _user_group_role_page: '_user_group_role_page',
  _user_group_role_resource: '_user_group_role_resource',
  _user_group_role_ui_level: '_user_group_role_ui_level',
  _user_session: '_user_session',
  // ========================基础 View============================
  _view01_user: '_view01_user',
  // ========================高级 View============================
});

module.exports.userStatusObj = Object.freeze({
  active: 'active',
  banned: 'banned',
});

module.exports.cacheKey = Object.freeze({
  allUserList: 'allUserList',
  allGroupList: 'allGroupList',
  allResourceList: 'allResourceList',
  allPageList: 'allPageList',
  allUserGroupRolePageList: 'allUserGroupRolePageList',
  allUserGroupRoleResourceList: 'allUserGroupRoleResourceList',
});

