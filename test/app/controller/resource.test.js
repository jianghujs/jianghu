'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../../utils');
const path = require('path');

describe('test/controller/reource.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(() => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });
  afterEach(mock.restore);
  describe('Test reource POST /${appId}/resource', () => {
    it('should success, resourceType is service', async () => {
      await this.app.httpRequest()
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
        })
        .expect(200);
    });
    it('should success, resourceType is sql, getConstantList', async () => {
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'getConstantList',
            actionData: { },
          },
        })
        .expect(200);
    });
    it('should failed, no appId', async () => {
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            actionData: { userId: 'admin', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        })
        .expect(500);
    });
    it('should success, has authToken', async () => {
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
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'uiAction',
            actionId: 'selectItemList',
            actionData: {
            },
            authToken: result.body.appData.resultData.authToken,
          },
        })
        .expect(200);
    });
  });

  describe('Test resource user', () => {
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
    it('should success, resetPassword', async () => {
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'resetPassword',
            authToken: this.authToken,
            actionData: {
              oldPassword: '123456',
              newPassword: '654321',
            },
          },
        })
        .expect(200);
      const newLoginResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'admin', password: '654321', deviceId: 'chrome_' + Date.now() },
          },
        })
        .expect(200);
      const authToken = newLoginResult.body.appData.resultData.authToken;
      // revert password
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'resetPassword',
            authToken,
            actionData: {
              oldPassword: '654321',
              newPassword: '123456',
            },
          },
        })
        .expect(200);
      await this.app.httpRequest()
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
        })
        .expect(200);

      this.authToken = null;
    });
    it('should failed, login with incorrect password', async () => {
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: '12312234', password: '123456', deviceId: 'chrome_' + Date.now() },
          },
        })
        .expect(500);
    });
    it('should success, user logout', async () => {
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'logout',
            authToken: this.authToken,
          },
        })
        .expect(200);
    });
  });
  describe('Test resource requestLog', () => {
    beforeEach(async () => {});
    afterEach(() => {});
    it('should success, select request log', async () => {
      const packageId = Date.now() + '_login';
      const result = await this.app.httpRequest()
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
        });

      const authToken = result.body.appData.resultData.authToken;
      const requestLogResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'requestLog',
            actionId: 'selectItemList',
            authToken,
            where: {
              packageId,
            },
            actionData: {},
          },
        });
      assert(requestLogResult.body.appData.resultData.rows.length);
    });
  });
  describe('Test resource requestLog', () => {
    beforeEach(async () => {});
    afterEach(() => {});
    it('should success, select request log', async () => {
      const packageId = Date.now() + '_login';
      const result = await this.app.httpRequest()
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
        });

      const authToken = result.body.appData.resultData.authToken;
      const requestLogResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'requestLog',
            actionId: 'selectItemList',
            authToken,
            where: {
              packageId,
            },
            actionData: {},
          },
        });
      assert(requestLogResult.body.appData.resultData.rows.length);
    });
  });
  describe('Test resource record_history', () => {
    beforeEach(async () => {});
    afterEach(() => {});
    it('should success, select record history', async () => {
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

      const authToken = result.body.appData.resultData.authToken;
      const recordHistoryResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'recordHistory',
            actionId: 'selectItemList',
            authToken,
            actionData: {},
            orderBy: [{ column: 'id', order: 'desc' }],
            offset: 0,
            limit: 1,
          },
        });
      assert(recordHistoryResult.body.appData.resultData.rows.length);
      const latestRecord = recordHistoryResult.body.appData.resultData.rows[0];
      const packageContent = JSON.parse(latestRecord.packageContent);
      assert(packageContent.appData.appId === this.app.config.appId);
      assert(packageContent.appData.pageId === 'login');
      assert(packageContent.appData.actionId === 'passwordLogin');
      assert(packageContent.appData.actionData.userId === 'admin');
      const recordContent = JSON.parse(latestRecord.recordContent);
      assert(recordContent.authToken === authToken);
    });
  });
  describe('Test resource resourceHook', () => {
    beforeEach(async () => {});
    afterEach(() => {});
    it('should success, resourceHook add prefix for studentId', async () => {
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

      const authToken = result.body.appData.resultData.authToken;
      const studentInfo = {
        studentId: '1001',
        classId: '1234',
        level: '01',
        dateOfBirth: '2022-07-13',
        name: 'student_name',
        gender: 'male',
        remarks: '备注',
      };
      // jhInsert
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'resourceHook',
            actionId: 'insertItem',
            authToken,
            actionData: studentInfo,
          },
        })
        .expect(200);

      // select
      const studentResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken,
            where: {
              studentId: `hook${studentInfo.studentId}`,
            },
            actionData: {
            },
          },
        });
      assert(studentResult.body.appData.resultData.rows.length !== 0);
      assert(studentResult.body.appData.resultData.rows[0].studentId === `hook${studentInfo.studentId}`);
      assert(studentResult.body.appData.resultData.rows[0].name === studentInfo.name);
      assert(studentResult.body.appData.resultData.rows[0].classId === studentInfo.classId);
      assert(studentResult.body.appData.resultData.rows[0].dateOfBirth === studentInfo.dateOfBirth);
      assert(studentResult.body.appData.resultData.rows[0].level === studentInfo.level);

      // jhDelete
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'deleteItem',
            authToken,
            where: {
              studentId: `hook${studentInfo.studentId}`,
            },
          },
        })
        .expect(200);
    });
  });
});
