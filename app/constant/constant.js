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
      packageType: 'socketResponse',
      status: this.bodyStatusObj.success,
      appData,
    }),
  fail: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: 'socketResponse',
      status: this.bodyStatusObj.fail,
      appData,
    }),
});

module.exports.socketRequest = {
  bodyBuild: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: 'socketRequest',
      appData,
    }),
};

module.exports.socketForward = {
  bodyBuild: ({ packageId, appData }) =>
    resourcePackageBuild({
      packageId,
      packageType: 'socketForward',
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

module.exports.userStatusObj = Object.freeze({
  active: 'active',
  banned: 'banned',
});
