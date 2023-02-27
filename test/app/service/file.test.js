'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const utils = require('../../utils');
const path = require('path');
const fileUtil = require('../../../app/common/fileUtil');
const sinon = require('sinon');
const crypto = require('crypto');
const mime = require('mime');

describe('test/app/service/file.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-file');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-file/logs'));
    this.app.close();
  });
  afterEach(mock.restore);
  describe('Test service file, getChunkInfo', () => {
    beforeEach(() => {

      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };

      this.ctx = this.app.mockContext({});
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');
    });
    afterEach(() => {
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expDownloadPath = 'test.jpg';
      const expHashString = 'hash string';
      const expFileBuffer = 'file buffer';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expFileStates = {
        size: expFileSize,
      };
      const expResult = {
        hash: expHashString,
        chunkSize: expChunkSize,
        fileSize: expFileStates.size,
        total: expTotal,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            downloadPath: expDownloadPath,
          },
        },
      };

      this.existsStub.returns(true);
      this.readFileStub.returns(expFileBuffer);
      this.statStub.returns(expFileStates);
      this.digestStub.returns(expHashString);

      const result = await this.ctx.service.file.getChunkInfo();

      assert.deepEqual(result, expResult);
    });

  });
  describe('Test service file, uploadFileDone', () => {
    beforeEach(() => {

      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expDownloadPath = 'test.jpg';
      const expHashString = 'hash string';
      const expFileBuffer = 'file buffer';
      const expChunkFileNames = [
        'file_1',
        'file_2',
      ];
      const expFileDirectory = 'directory';
      const expFileName = 'file_name';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expFileStates = {
        size: expFileSize,
      };

      this.ctx.userInfo = {
        userId: 'test',
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            filename: expFileName,
            downloadPath: expDownloadPath,
            fileDirectory: expFileDirectory,
          },
        },
      };

      this.existsStub.returns(true);
      this.readdirStub.returns(expChunkFileNames);
      this.readFileStub.returns(expFileBuffer);
      this.statStub.returns(expFileStates);
      this.digestStub.returns(expHashString);

      await this.ctx.service.file.uploadFileDone();

      assert.equal(this.streamMergeStub.callCount, 1);
      // assert.equal(this.jhInsertStub.callCount, 1);
    });

  });
  describe('Test service file, uploadFileChunkByStream', () => {
    beforeEach(() => {

      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.unlinkStub = sinon.stub(fileUtil, 'unlink');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.unlinkStub.restore();
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expHashString = 'hash string';
      const expFilePath = 'filepath';
      const expIndexString = '1';
      const expFiles = [
        {
          filepath: expFilePath,
        },
      ];
      const expFileName = 'file_name';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const chunkPath = path.join(this.app.config.multipart.tmpdir, expUserId, expHashString);
      const expTargetPath = path.join(chunkPath, expHashString + '_' + expIndexString);

      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            filename: expFileName,
            indexString: expIndexString,
          },
        },
      };
      this.ctx.request.files = expFiles;

      this.existsStub.returns(true);

      await this.ctx.service.file.uploadFileChunkByStream();

      assert.equal(this.copyFileStub.callCount, 1);
      assert.equal(this.copyFileStub.getCall(0).args[0], expFilePath);
      assert.equal(this.copyFileStub.getCall(0).args[1], expTargetPath);
      assert.equal(this.unlinkStub.callCount, 1);
    });
  });
  describe('Test service file, uploadFileChunkByBase64', () => {
    beforeEach(() => {

      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.unlinkStub = sinon.stub(fileUtil, 'unlink');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.base64ToBlobStub = sinon.stub(fileUtil, 'base64ToBlob');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.base64ToBlobStub.restore();
      this.unlinkStub.restore();
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expHashString = 'hash string';
      const expIndexString = '1';
      const expFileName = 'file_name';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const chunkPath = path.join(this.app.config.multipart.tmpdir, expUserId, expHashString);
      const expTargetPath = path.join(chunkPath, expHashString + '_' + expIndexString);
      const expBuffer = Buffer.from('buffer string');
      const expFileBase64 = expBuffer.toString('base64');

      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            filename: expFileName,
            indexString: expIndexString,
            fileBase64: expFileBase64,
          },
        },
      };

      this.existsStub.returns(true);
      this.base64ToBlobStub.returns(expBuffer);

      await this.ctx.service.file.uploadFileChunkByBase64();

      assert.equal(this.base64ToBlobStub.callCount, 1);
      assert.equal(this.base64ToBlobStub.getCall(0).args[0], expFileBase64);
      assert.equal(this.writeFileStub.callCount, 1);
      assert.equal(this.writeFileStub.getCall(0).args[0], expTargetPath);
      assert.equal(this.writeFileStub.getCall(0).args[1], expBuffer);
    });
    it('should failed, fileBase64 is empty', async () => {
      const expHashString = 'hash string';
      const expIndexString = '1';
      const expFileName = 'file_name';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const expBuffer = Buffer.from('');
      const expFileBase64 = expBuffer.toString('base64');

      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            filename: expFileName,
            indexString: expIndexString,
            fileBase64: expFileBase64,
          },
        },
      };

      this.existsStub.returns(true);
      this.base64ToBlobStub.returns(expBuffer);

      let error;
      try {
        await this.ctx.service.file.uploadFileChunkByBase64();
      } catch (err) {
        error = err;
      }

      assert.equal(this.base64ToBlobStub.callCount, 0);
      assert.equal(this.writeFileStub.callCount, 0);
      assert.equal(error.errorCode, 'request_data_invalid');
    });
  });
  describe('Test service file, uploadFileChunkByBuffer', () => {
    beforeEach(() => {

      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.checkAndPrepareFilePathStub = sinon.stub(fileUtil, 'checkAndPrepareFilePath');
      this.unlinkStub = sinon.stub(fileUtil, 'unlink');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.base64ToBlobStub = sinon.stub(fileUtil, 'base64ToBlob');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.checkAndPrepareFilePathStub.restore();
      this.base64ToBlobStub.restore();
      this.unlinkStub.restore();
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expHashString = 'hash string';
      const expIndexString = '1';
      const expFileName = 'file_name';
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const chunkPath = path.join(this.app.config.multipart.tmpdir, expUserId, expHashString);
      const expTargetPath = path.join(chunkPath, expHashString + '_' + expIndexString);
      const expBuffer = Buffer.from('buffer string');

      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            filename: expFileName,
            indexString: expIndexString,
            fileBuffer: expBuffer,
          },
        },
      };

      this.existsStub.returns(false);

      await this.ctx.service.file.uploadFileChunkByBuffer();

      assert.equal(this.writeFileStub.callCount, 1);
      assert.equal(this.writeFileStub.getCall(0).args[0], expTargetPath);
      assert.equal(this.writeFileStub.getCall(0).args[1], expBuffer);
    });
  });
  describe('Test service file, downloadFileChunkByBase64', () => {
    beforeEach(() => {
      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.checkAndPrepareFilePathStub = sinon.stub(fileUtil, 'checkAndPrepareFilePath');
      this.unlinkStub = sinon.stub(fileUtil, 'unlink');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.base64ToBlobStub = sinon.stub(fileUtil, 'base64ToBlob');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.checkAndPrepareFilePathStub.restore();
      this.base64ToBlobStub.restore();
      this.unlinkStub.restore();
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expDownloadPath = 'test.jpg';
      const expHashString = 'hash string';
      const expIndex = 0;
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const expFilePath = path.join(this.app.config.uploadDir, expDownloadPath);
      const expBuffer = Buffer.from('buffer string');
      const mimeType = mime.getType(expFilePath);
      const expFileBase64 = `data:${mimeType};base64,${expBuffer.toString('base64')}`;

      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            index: expIndex,
            downloadPath: expDownloadPath,
          },
        },
      };

      this.existsStub.returns(true);
      this.readFileStub.returns(expBuffer);

      const result = await this.ctx.service.file.downloadFileChunkByBase64();

      assert.deepEqual(result, { fileBase64: expFileBase64 });
    });
  });
  describe('Test service file, downloadFileChunkByBuffer', () => {
    beforeEach(() => {
      this.existsSpy = sinon.stub();
      this.readFileSpy = sinon.stub();
      this.statSpy = sinon.stub();
      this.copyFileSpy = sinon.stub();
      this.writeFileSpy = sinon.stub();
      this.openSpy = sinon.stub();
      this.readSpy = sinon.stub();
      this.digestSpy = sinon.stub();
      const createHashResult = {
        update: () => {},
        digest: () => {},
      };
      const jianghuKnexResult = {
        jhInsert: () => {},
        where: () => {},
      };

      this.ctx = this.app.mockContext({});
      mock(this.app, 'jianghuKnex', () => {
        return jianghuKnexResult;
      });

      this.jhInsertStub = sinon.stub(jianghuKnexResult, 'jhInsert');
      this.existsStub = sinon.stub(fileUtil, 'exists');
      this.readFileStub = sinon.stub(fileUtil, 'readFile');
      this.statStub = sinon.stub(fileUtil, 'stat');
      this.copyFileStub = sinon.stub(fileUtil, 'copyFile');
      this.writeFileStub = sinon.stub(fileUtil, 'writeFile');
      this.openStub = sinon.stub(fileUtil, 'open');
      this.readStub = sinon.stub(fileUtil, 'read');
      this.readdirStub = sinon.stub(fileUtil, 'readdir');
      this.streamMergeStub = sinon.stub(fileUtil, 'streamMerge');
      this.checkAndPrepareFilePathStub = sinon.stub(fileUtil, 'checkAndPrepareFilePath');
      this.unlinkStub = sinon.stub(fileUtil, 'unlink');
      this.deleteFileAndDirByPathStub = sinon.stub(fileUtil, 'deleteFileAndDirByPath');
      this.formatByteSizeStub = sinon.stub(fileUtil, 'formatByteSize');
      this.base64ToBlobStub = sinon.stub(fileUtil, 'base64ToBlob');
      this.createHashStub = sinon.stub(crypto, 'createHash').returns(createHashResult);
      this.hashUpdateStub = sinon.stub(createHashResult, 'update');
      this.digestStub = sinon.stub(createHashResult, 'digest');

    });
    afterEach(() => {
      this.checkAndPrepareFilePathStub.restore();
      this.base64ToBlobStub.restore();
      this.unlinkStub.restore();
      this.jhInsertStub.restore();
      this.formatByteSizeStub.restore();
      this.createHashStub.restore();
      this.hashUpdateStub.restore();
      this.digestStub.restore();
      this.streamMergeStub.restore();
      this.deleteFileAndDirByPathStub.restore();
      this.readdirStub.restore();
      this.existsStub.restore();
      this.readFileStub.restore();
      this.statStub.restore();
      this.copyFileStub.restore();
      this.writeFileStub.restore();
      this.openStub.restore();
      this.readStub.restore();
    });
    it('should success', async () => {
      const expDownloadPath = 'test.jpg';
      const expHashString = 'hash string';
      const expIndex = 0;
      const expChunkSize = 3 * 1024 * 1024;
      const expFileSize = 6 * 1024 * 1024;
      const expTotal = Math.ceil(expFileSize / expChunkSize);
      const expUserId = 'test';
      const expFilePath = path.join(this.app.config.uploadDir, expDownloadPath);
      const expFileFd = 'fd';
      const expBuffer = Buffer.alloc(expChunkSize);


      this.ctx.userInfo = {
        userId: expUserId,
      };
      this.ctx.request.body = {
        appData: {
          actionData: {
            fileSize: expFileSize,
            hash: expHashString,
            total: expTotal,
            chunkSize: expChunkSize,
            index: expIndex,
            downloadPath: expDownloadPath,
          },
        },
      };

      this.existsStub.returns(true);
      this.openStub.returns(expFileFd);

      const result = await this.ctx.service.file.downloadFileChunkByBuffer();

      assert.deepEqual(this.existsStub.callCount, 1);
      assert.deepEqual(this.openStub.callCount, 1);
      assert.deepEqual(this.openStub.getCall(0).args[0], expFilePath);
      assert.deepEqual(this.readStub.callCount, 1);
      assert.deepEqual(result, { fileBuffer: expBuffer, index: expIndex });
    });
  });
});
