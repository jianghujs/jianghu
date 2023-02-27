'use strict';

const assert = require('assert');
const path = require('path');
const crypto = require('crypto');
const utils = require('../utils');
const socketUtil = require('../socketUtil');

describe('test/request/file.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-file');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/upload/test'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/multipartTmp'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/logs'));
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
  describe('Test reource httpUploadByStream', () => {
    it('should success, httpUploadByStream', async () => {
      const hash = '798c9d27b6be3f2b6e7e9e04360ff247';
      const fileSize = 20727669;
      const chunkSize = 3145728;
      const total = 7;
      const filename = 'girl_beside_bridge.flac';
      const filePath = path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/upload/girl_beside_bridge.flac');
      for (let i = 0; i < total; i++) {
        const chunkFile = await utils.readBuffer({ fileSize, total, filePath, chunkSize, index: i });
        await this.app.httpRequest()
          .post('/jianghu/resource')
          .attach('files', chunkFile, filename)
          .field('body', JSON.stringify({
            packageId: Date.now() + '',
            packageType: 'httpRequest',
            appData: {
              appId: this.app.config.appId,
              pageId: 'allPage',
              actionId: 'httpUploadByStream',
              authToken: this.authToken,
              actionData: { chunkSize, indexString: i, hash, total, filename },
            },
          }));
      }
      await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'uploadFileDone',
            authToken: this.authToken,
            actionData: { hash, total, chunkSize, filename, fileDirectory: 'test/' },
          },
        })
        .expect(200);
    });
  });
  describe('Test reource httpDownloadByBase64', () => {
    it('should success, httpDownloadByBase64', async () => {
      const chunkInfoResult = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'getChunkInfo',
            authToken: this.authToken,
            actionData: { downloadPath: 'girl_beside_bridge.flac' },
          },
        });
      const data = chunkInfoResult.body.appData.resultData;
      const fsHash = crypto.createHash('md5');
      for (let i = 0; i < data.total; i++) {
        const fileResult = await this.app.httpRequest()
          .post('/jianghu/resource')
          .send({
            packageId: Date.now() + '',
            packageType: 'httpRequest',
            appData: {
              appId: this.app.config.appId,
              pageId: 'allPage',
              actionId: 'httpDownloadByBase64',
              authToken: this.authToken,
              actionData: { downloadPath: 'girl_beside_bridge.flac', index: i, chunkSize: data.chunkSize },
            },
          });
        const resultData = fileResult.body.appData.resultData;
        let fileBase64 = resultData.fileBase64;
        if (i === 0) {
          const arr = fileBase64.split(',');
          fileBase64 = arr[1];
        }
        fsHash.update(utils.base64ToBlob(fileBase64));
      }
      const fileHash = fsHash.digest('hex');
      assert(fileHash === data.hash);
    });
  });
  describe('Test reource socketUploadByBase64, socketDownloadByBase64, socketDownloadByStream', () => {
    beforeEach(async () => {
      if (!this.socketClient) {
        this.app.socketIO.listen(8080);
        const socketId = `file_socket_connect_${Date.now()}`;
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
        this.socketClient = socketUtil.createClient('8080', {
          path: '/socket.io',
          auth: requestBody,
          closeOnBeforeunload: true,
          transports: [ 'websocket' ],
          forceNew: true,
          timeout: 5000,
          secure: false, // 是否支持SSL/TLS
          reconnection: false,
        });
        await socketUtil.connect(this.socketClient);
      }
    });
    afterEach(() => {});
    it.skip('should success, socketUploadByBase64', async () => {
      const hash = '798c9d27b6be3f2b6e7e9e04360ff247';
      const chunkSize = 414600;
      const total = 50;
      const filename = 'girl_beside_bridge.flac';
      const filePath = path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/upload/girl_beside_bridge.flac');
      const promiseArr = [];
      for (let i = 0; i < total; i++) {
        const fileBase64 = await utils.readFileBase64({ filePath, chunkSize, index: i });

        const fileRequestBody = {
          packageId: Date.now() + '',
          packageType: 'socketRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'socketUploadByBase64',
            authToken: this.authToken,
            actionData: { hash, indexString: i, filename, fileBase64 },
          },
        };
        promiseArr.push(socketUtil.sendMsg(this.socketClient, fileRequestBody));
      }
      await Promise.all(promiseArr);
      const fileUploadDoneBody = {
        packageId: Date.now() + '',
        packageType: 'socketRequest',
        appData: {
          appId: this.app.config.appId,
          pageId: 'allPage',
          actionId: 'uploadFileDone',
          authToken: this.authToken,
          actionData: { hash, total, chunkSize, filename, fileDirectory: 'test' },
        },
      };
      await socketUtil.sendMsg(this.socketClient, fileUploadDoneBody);
    });

    it.skip('should success, socketDownloadByBase64', async () => {
      const packageId = `${Date.now()}_resource_socket`;
      const msgBody = {
        packageId,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'allPage',
          actionId: 'getChunkInfo',
          authToken: this.authToken,
          actionData: { downloadPath: 'girl_beside_bridge.flac' },
        },
      };
      const chunkInfoResult = await socketUtil.sendMsg(this.socketClient, msgBody);

      const data = chunkInfoResult.appData.resultData;
      const fsHash = crypto.createHash('md5');
      for (let i = 0; i < data.total; i++) {
        const fileRequestBody = {
          packageId: Date.now() + '',
          packageType: 'socketRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'socketDownloadByBase64',
            authToken: this.authToken,
            actionData: { downloadPath: 'girl_beside_bridge.flac', index: i, chunkSize: data.chunkSize },
          },
        };
        const fileResult = await socketUtil.sendMsg(this.socketClient, fileRequestBody);
        const resultData = fileResult.appData.resultData;
        let fileBase64 = resultData.fileBase64;
        if (i === 0) {
          const arr = fileBase64.split(',');
          fileBase64 = arr[1];
        }
        fsHash.update(utils.base64ToBlob(fileBase64));
      }
      const fileHash = fsHash.digest('hex');
      assert(fileHash === data.hash);
    });
    it.skip('should success, socketDownloadByStream', async () => {
      const packageId = `${Date.now()}_resource_socket`;
      const msgBody = {
        packageId,
        packageType: 'socketRequest',
        deviceId: `${Date.now()}_chrome`,
        status: null,
        timestamp: new Date().toISOString(),
        appData: {
          appId: this.app.config.appId,
          pageId: 'allPage',
          actionId: 'getChunkInfo',
          authToken: this.authToken,
          actionData: { downloadPath: 'girl_beside_bridge.flac' },
        },
      };
      const chunkInfoResult = await socketUtil.sendMsg(this.socketClient, msgBody);

      const data = chunkInfoResult.appData.resultData;
      const fsHash = crypto.createHash('md5');
      for (let i = 0; i < data.total; i++) {
        const fileRequestBody = {
          packageId: Date.now() + '',
          packageType: 'socketRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'allPage',
            actionId: 'socketDownloadByStream',
            authToken: this.authToken,
            actionData: { downloadPath: 'girl_beside_bridge.flac', index: i, chunkSize: data.chunkSize, fileSize: data.fileSize, total: data.total },
          },
        };
        const fileResult = await socketUtil.sendMsg(this.socketClient, fileRequestBody);
        const resultData = fileResult.appData.resultData;
        const fileBuffer = resultData.fileBuffer;
        fsHash.update(fileBuffer);
      }
      const fileHash = fsHash.digest('hex');
      assert(fileHash === data.hash);
    });
  });
});
