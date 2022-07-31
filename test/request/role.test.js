'use strict';

const utils = require('../utils');
const path = require('path');

describe('test/request/role.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
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
  afterEach(() => {});
  describe('Test page role', () => {
    // it('should success, page=login, group=public, role=*', async () => {
    //   await this.app.httpRequest()
    //     .get('/jianghu/page/login').expect(200);
    // });
    it('should failed, not login, page=manual, group=login, role=*', async () => {
      await this.app.httpRequest()
        .get('/jianghu/page/manual').expect(302);
    });
  });
  describe('Test resource role and group role', () => {
    it('should success, group=public, role=*, resource=login.passwordLogin', async () => {
      const packageId = Date.now() + '_login';
      this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'admin', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        })
        .expect(200);
    });
    it('should failed, not login with group=login, role=*, resource=allPage.logout', async () => {
      const packageId = Date.now() + '_logout';
      this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'logout',
            actionData: {},
          },
        })
        .expect(500);
    });
    it('should success, user: role=boss and group=wudang for group=wudang, role=boss, resource=protocolDemo.*', async () => {
      const packageId = Date.now() + '_login';
      const loginResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'W00001', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        });

      const authToken = loginResult.body.appData.resultData.authToken;
      this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            authToken,
            appId: this.app.config.appId,
            pageId: 'protocolDemo',
            actionId: 'selectItemList',
            limit: 1,
            offset: 0,
            actionData: { },
          },
        })
        .expect(200);
    });
    it('should success, user: role=disciple and group=wudang for group=wudang, role=boss, resource=protocolDemo.*', async () => {
      const packageId = Date.now() + '_login';
      const loginResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'W00002', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        });

      const authToken = loginResult.body.appData.resultData.authToken;
      this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId,
          packageType: 'httpRequest',
          appData: {
            authToken,
            appId: this.app.config.appId,
            pageId: 'protocolDemo',
            actionId: 'selectItemList',
            limit: 1,
            offset: 0,
            actionData: { },
          },
        })
        .expect(500);
    });
  });
});
