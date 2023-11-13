'use strict';
const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs');
// const util = require('util');

describe('test/app/common/fileUtil.test.js', () => {
  before(() => {
  });
  after(async () => {
  });

  describe('formatByteSize', () => {

    it('should return correct file size message for byte sizes less than 1MB', () => {
      const byteSize = 1024;
      const expected = '1.00KB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });

    it('should return "1MB" for byte size of 1MB', () => {
      const byteSize = 1048576;
      const expected = '1MB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });

    it('should return correct file size message for byte sizes between 1MB and 1GB', () => {
      const byteSize = 52428800;
      const expected = '50.00MB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });

    it('should return "1GB" for byte size of 1GB', () => {
      const byteSize = 1073741824;
      const expected = '1GB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });

    it('should return correct file size message for byte sizes between 1GB and 1TB', () => {
      const byteSize = 53687091200;
      const expected = '50.00GB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });

    it('should return "文件超过1TB" for byte sizes greater than 1TB', () => {
      const byteSize = 1099511627776;
      const expected = '文件超过1TB';
      const fileUtil = require('../../../app/common/fileUtil');
      const actual = fileUtil.formatByteSize(byteSize);
      assert.strictEqual(actual, expected);
    });
  });

  describe('mkdirByBasePathAndDirectory', () => {

    beforeEach(() => {
      this.existsSyncStub = sinon.stub(fs, 'existsSync');
      this.mkdirSyncStub = sinon.stub(fs, 'mkdirSync');
    });

    afterEach(() => {
      this.existsSyncStub.restore();
      this.mkdirSyncStub.restore();
    });

    it('should create directories correctly', () => {
      this.existsSyncStub.returns(false);

      const fileUtil = require('../../../app/common/fileUtil');
      fileUtil.mkdirByBasePathAndDirectory('/path/to/base', 'directory/subdirectory');

      assert.strictEqual(this.existsSyncStub.callCount, 3);
      assert.strictEqual(this.mkdirSyncStub.callCount, 3);

      assert.strictEqual(this.existsSyncStub.getCall(0).args[0], '/path/to/base');
      assert.strictEqual(this.mkdirSyncStub.getCall(0).args[0], '/path/to/base');

      assert.strictEqual(this.existsSyncStub.getCall(1).args[0], '/path/to/base/directory');
      assert.strictEqual(this.mkdirSyncStub.getCall(1).args[0], '/path/to/base/directory');

      assert.strictEqual(this.existsSyncStub.getCall(2).args[0], '/path/to/base/directory/subdirectory');
      assert.strictEqual(this.mkdirSyncStub.getCall(2).args[0], '/path/to/base/directory/subdirectory');
    });

    it('should skip existing directories', () => {
      this.existsSyncStub.returns(true);

      const fileUtil = require('../../../app/common/fileUtil');
      fileUtil.mkdirByBasePathAndDirectory('/path/to/base', 'directory/subdirectory');

      assert.strictEqual(this.existsSyncStub.callCount, 3);
      assert.strictEqual(this.mkdirSyncStub.callCount, 0);
    });
  });

  describe('base64ToBlob', () => {
    it('should convert base64 to Blob', () => {
      const base64 = 'data:image/png;base64,SGVsbG8gV29ybGQ=';
      const expectedBlob = new Uint8Array([ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100 ]);
      const fileUtil = require('../../../app/common/fileUtil');
      const result = fileUtil.base64ToBlob(base64);

      assert.deepStrictEqual(result, expectedBlob);
    });
  });

  // describe('Test app/common/fileUtil.js, deleteFileAndDirByPath', () => {
  //   beforeEach(() => {
  //     const fakeFun = fun => { return fun; };
  //     sinon.replace(util, 'promisify', fakeFun);
  //     this.existsStub = sinon.stub(fs, 'exists');
  //     this.readdirStub = sinon.stub(fs, 'readdir');
  //     this.lstatStub = sinon.stub(fs, 'lstat');
  //     this.unlinkStub = sinon.stub(fs, 'unlink');
  //     this.rmdirStub = sinon.stub(fs, 'rmdir');
  //   });

  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it('deleteFileAndDirByPath, should success', async () => {
  //     // TODO: not ready
  //     // const filePath = '/path/to/delete';
  //     // this.existsStub.returns(true);
  //     // this.readdirStub.returns([ 'file1.txt', 'file2.txt' ]);
  //     // this.lstatStub.returns({ isDirectory: () => false });
  //     // this.unlinkStub.resolves();
  //     // this.rmdirStub.resolves();

  //     // const fileUtil = require('../../../app/common/fileUtil');
  //     // const result = await fileUtil.deleteFileAndDirByPath(filePath);

  //     // assert.equal(result, true);
  //     // assert.equal(this.existsStub.callCount, 1);
  //     // assert.equal(this.readdirStub.callCount, 1);
  //     // assert.equal(this.lstatStub.callCount, 2);
  //     // assert.equal(this.unlinkStub.callCount, 2);
  //     // assert.equal(this.rmdirStub.callCount, 1);
  //   });
  // });
  describe('Test app/common/fileUtil.js, streamToBuffer', () => {
    beforeEach(() => {
    });
    afterEach(() => {
    });
    it('streamToBuffer, should success', async () => {
      const stream = {
        on: sinon.stub(),
      };
      const dataChunks = [ Buffer.from('Hello'), Buffer.from(' '), Buffer.from('World') ];
      stream.on.withArgs('data').callsFake((event, callback) => {
        dataChunks.forEach(chunk => callback(chunk));
      });
      stream.on.withArgs('end').callsFake((event, callback) => {
        callback();
      });
      const fileUtil = require('../../../app/common/fileUtil');
      const result = await fileUtil.streamToBuffer(stream);
      assert.equal(result.toString(), 'Hello World');
    });
    it('streamToBuffer, should reject', async () => {
      const stream = {
        on: sinon.stub(),
      };

      stream.on.withArgs('error').callsFake((event, callback) => {
        callback(new Error('Stream error'));
      });

      let error;
      try {
        const fileUtil = require('../../../app/common/fileUtil');
        await fileUtil.streamToBuffer(stream);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, 'Stream error');
    });
  });
});
