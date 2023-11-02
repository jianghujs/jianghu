'use strict';

const assert = require('assert');
const utils = require('../../../../utils');
const socketUtil = require('../../socketUtil');
const path = require('path');

describe('test/request/socketResource.test.js', () => {
  before(async () => {
    this.app = await utils.singleProcessApp('apps/jianghu-socket');
    this.app.socketIO.listen(8080);
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
  });
  after(async () => {
    this.authToken = null;
    this.app.socketIO.close();
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-socket/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-socket/logs'));
    this.app.close();
  });
  describe('Test socket socketResource', () => {
    it.skip('should success, socket connect and send msg', async () => {
      const socketId = `socket_connect_${Date.now()}`;
      const requestBody = {
        packageId: `${Date.now()}`,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'socket',
          actionId: 'connect',
          authToken: this.authToken,
          actionData: {
            socketId,
          },
        },
      };
      const socketClient = socketUtil.createClient('8080', {
        path: '/socket.io',
        auth: requestBody,
        closeOnBeforeunload: true,
        transports: [ 'websocket' ],
        forceNew: true,
        timeout: 5000,
        secure: false, // 是否支持SSL/TLS
        reconnection: false,
      });
      // test connect
      const isConnected = await socketUtil.connect(socketClient);
      assert(isConnected);

      const packageId = `${Date.now()}_resource_socket`;
      const msgBody = {
        packageId,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'socket',
          actionId: 'sendMsg',
          authToken: this.authToken,
          actionData: {
            key: 'value',
          },
        },
      };
      const response = await socketUtil.sendMsg(socketClient, msgBody);
      assert(msgBody.packageId === response.packageId);
      assert(msgBody.appData.actionData.key === response.appData.resultData.key);
    });
  });
  describe('Test socketResource resourceHook', () => {
    beforeEach(async () => {});
    afterEach(() => {});
    it.skip('should success, resourceHook add prefix for studentId', async () => {
      const socketId = `socket_222connect_${Date.now()}`;
      const requestBody = {
        packageId: `${Date.now()}`,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'socket',
          actionId: 'connect',
          authToken: this.authToken,
          actionData: {
            socketId,
          },
        },
      };
      const socketClient = socketUtil.createClient('8080', {
        path: '/socket.io',
        auth: requestBody,
        closeOnBeforeunload: true,
        transports: [ 'websocket' ],
        forceNew: true,
        timeout: 5000,
        secure: false, // 是否支持SSL/TLS
        reconnection: false,
      });
      // test connect
      const isConnected = await socketUtil.connect(socketClient);
      assert(isConnected);
      const studentInfo = {
        studentId: 'socket1001',
        classId: 'socket1234',
        level: 'socket01',
        dateOfBirth: '2022-07-14',
        name: 'student_name',
        gender: 'male',
        remarks: '备注',
      };
      // jhInsert
      const packageId = `${Date.now()}_resource_socket`;
      const insertBody = {
        packageId,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'resourceHook',
          actionId: 'insertItem',
          authToken: this.authToken,
          actionData: studentInfo,
        },
      };
      await socketUtil.sendMsg(socketClient, insertBody);

      // select
      const selectBody = {
        packageId: Date.now() + '',
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'frontendDemo02',
          actionId: 'selectItemList',
          authToken: this.authToken,
          where: {
            studentId: `hook${studentInfo.studentId}`,
          },
          actionData: {},
        },
      };
      const studentResult = await socketUtil.sendMsg(socketClient, selectBody);
      assert(studentResult.appData.resultData.rows.length !== 0);
      assert(studentResult.appData.resultData.rows[0].studentId === `hook${studentInfo.studentId}`);
      assert(studentResult.appData.resultData.rows[0].name === studentInfo.name);
      assert(studentResult.appData.resultData.rows[0].classId === studentInfo.classId);
      assert(studentResult.appData.resultData.rows[0].dateOfBirth === studentInfo.dateOfBirth);
      assert(studentResult.appData.resultData.rows[0].level === studentInfo.level);

      // delete
      const deleteBody = {
        packageId: Date.now() + '',
        packageType: 'socketRequest',
        appData: {
          appId: this.app.config.appId,
          pageId: 'frontendDemo02',
          actionId: 'deleteItem',
          authToken: this.authToken,
          where: {
            studentId: `hook${studentInfo.studentId}`,
          },
        },
      };
      await socketUtil.sendMsg(socketClient, deleteBody);
    });
  });
});
