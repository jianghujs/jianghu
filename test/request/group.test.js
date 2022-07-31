'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../utils');
const path = require('path');

describe('test/request/group.test.js', () => {
  before(async () => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.authToken = null;
    this.app.close();
  });
  beforeEach(async () => {
    if (!this.authToken) {
      const result = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'admin', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        });

      this.authToken = result.body.appData.resultData.authToken;
    }
  });
  afterEach(() => {
    mock.restore();
  });
  describe('Test resource _group', () => {
    it('should success, group with jhInsert select jhUpdate, jhDelete', async () => {
      const groupInfo = {
        groupId: 'test_group',
        groupName: 'test_group_name',
        groupDesc: 'test group desc',
      };
      // jhInsert
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'insertItem',
            authToken: this.authToken,
            actionData: groupInfo,
          },
        })
        .expect(200);

      // select
      const groupResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              groupId: groupInfo.groupId,
            },
            actionData: {
            },
          },
        });
      assert(groupResult.body.appData.resultData.rows.length !== 0);
      assert(groupResult.body.appData.resultData.rows[0].groupId === groupInfo.groupId);
      assert(groupResult.body.appData.resultData.rows[0].groupName === groupInfo.groupName);

      const newGroupName = 'new name';
      // jhUpdate
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'updateItem',
            authToken: this.authToken,
            where: {
              groupId: groupInfo.groupId,
            },
            actionData: {
              groupName: newGroupName,
            },
          },
        })
        .expect(200);
      // check update result
      const newGroupResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              groupId: groupInfo.groupId,
            },
            actionData: {
            },
          },
        });
      assert(newGroupResult.body.appData.resultData.rows.length !== 0);
      assert(newGroupResult.body.appData.resultData.rows[0].groupName === newGroupName);
      // jhDelete
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'deleteItem',
            authToken: this.authToken,
            where: {
              groupId: groupInfo.groupId,
            },
          },
        })
        .expect(200);

      // check jhDelete result
      const afterDeleteGroupResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'group',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              groupId: groupInfo.groupId,
            },
            actionData: {
            },
          },
        });
      assert(afterDeleteGroupResult.body.appData.resultData.rows.length === 0);
    });
  });
});
