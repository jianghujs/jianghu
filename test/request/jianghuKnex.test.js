'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../utils');
const path = require('path');

describe('test/request/jianghuKnex.test.js', () => {
  before(async () => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    this.authToken = null;
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
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
  describe('Test resource sql jianghuKnex', () => {
    it('should success, use jhInsert select jhUpdate, jhDelete', async () => {
      const studentInfo = {
        studentId: '1001',
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
            pageId: 'frontendDemo02',
            actionId: 'insertItem',
            authToken: this.authToken,
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
            authToken: this.authToken,
            where: {
              studentId: studentInfo.studentId,
              name: studentInfo.name,
            },
            actionData: {
            },
          },
        });
      assert(studentResult.body.appData.resultData.rows.length !== 0);
      assert(studentResult.body.appData.resultData.rows[0].studentId === studentInfo.studentId);
      assert(studentResult.body.appData.resultData.rows[0].name === studentInfo.name);
      assert(studentResult.body.appData.resultData.rows[0].gender === studentInfo.gender);
      assert(studentResult.body.appData.resultData.rows[0].remarks === studentInfo.remarks);

      const newStudentName = 'new name';
      // jhUpdate
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'updateItem',
            authToken: this.authToken,
            where: {
              studentId: studentInfo.studentId,
            },
            actionData: {
              name: newStudentName,
            },
          },
        })
        .expect(200);
      // check update result
      const newStudentResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              studentId: studentInfo.studentId,
            },
            actionData: {
            },
          },
        });
      assert(newStudentResult.body.appData.resultData.rows.length !== 0);
      assert(newStudentResult.body.appData.resultData.rows[0].name === newStudentName);
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
            authToken: this.authToken,
            where: {
              studentId: studentInfo.studentId,
            },
          },
        })
        .expect(200);

      // check jhDelete result
      const afterDeleteStudentResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              studentId: studentInfo.studentId,
            },
            actionData: {
            },
          },
        });
      assert(afterDeleteStudentResult.body.appData.resultData.rows.length === 0);
    });

    it('should success, jianghuKnex where', async () => {
      // where
      const whereResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            where: {
              studentId: 'G00003',
            },
          },
        });
      assert(whereResult.body.appData.resultData.rows.length !== 0);
      assert(whereResult.body.appData.resultData.rows[0].studentId === 'G00003');
      assert(whereResult.body.appData.resultData.rows[0].id === 161);
    });
    it('should success, jianghuKnex whereIn', async () => {
      // whereIn
      const whereInResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            whereIn: {
              studentId: [ 'G00003' ],
            },
          },
        });
      assert(whereInResult.body.appData.resultData.rows.length !== 0);
      assert(whereInResult.body.appData.resultData.rows[0].studentId === 'G00003');
      assert(whereInResult.body.appData.resultData.rows[0].id === 161);
    });
    it('should success, jianghuKnex whereLike', async () => {
      // whereLike
      const whereLikeResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            whereLike: {
              studentId: 'G0000',
            },
          },
        });
      assert(whereLikeResult.body.appData.resultData.rows.length !== 0);
      assert(whereLikeResult.body.appData.resultData.rows[0].studentId === 'G00003');
      assert(whereLikeResult.body.appData.resultData.rows[0].id === 161);
    });
    it('should success, jianghuKnex whereOptions', async () => {
      // whereOptions
      const whereOptionsResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            whereOptions: [[ 'studentId', 'G00003' ], [ 'id', '>', 1 ]],
          },
        });

      assert(whereOptionsResult.body.appData.resultData.rows.length !== 0);
      assert(whereOptionsResult.body.appData.resultData.rows[0].studentId === 'G00003');
      assert(whereOptionsResult.body.appData.resultData.rows[0].id === 161);
    });
    it('should success, jianghuKnex whereOrOptions, orderBy', async () => {
      // whereOrOptions
      const whereOrOptionsResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            whereOrOptions: [[ 'studentId', 'G00003' ], [ 'name', '1111' ]],
            orderBy: [{ column: 'id', order: 'asc' }],
          },
        });
      assert(whereOrOptionsResult.body.appData.resultData.rows.length === 2);
      assert(whereOrOptionsResult.body.appData.resultData.rows[0].studentId === 'G00003');
      assert(whereOrOptionsResult.body.appData.resultData.rows[0].id === 161);
      assert(whereOrOptionsResult.body.appData.resultData.rows[1].studentId === '100067');
      assert(whereOrOptionsResult.body.appData.resultData.rows[1].id === 168);
    });
    it('should success, jianghuKnex whereOrOptions, limit, offset, orderBy', async () => {
      // whereOrOptions
      const whereOrOptionsResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'frontendDemo02',
            actionId: 'selectItemList',
            authToken: this.authToken,
            whereOrOptions: [[ 'studentId', 'G00003' ], [ 'name', '1111' ]],
            orderBy: [{ column: 'id', order: 'asc' }],
            offset: 1,
            limit: 1,
          },
        });
      assert(whereOrOptionsResult.body.appData.resultData.rows.length === 1);
      assert(whereOrOptionsResult.body.appData.resultData.rows[0].studentId === '100067');
      assert(whereOrOptionsResult.body.appData.resultData.rows[0].id === 168);
    });
  });
});
