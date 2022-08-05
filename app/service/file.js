'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
const stream = require('stream');
const { BizError, errorInfoEnum } = require('../constant/error');
const validateUtil = require('../common/validateUtil');
const _ = require('lodash');
const mime = require('mime');
// ========================================常用 require end=============================================
const path = require('path');
const crypto = require('crypto');
const {
  tableObj,
} = require('../constant/constant');
const fileUtil = require('../common/fileUtil');
const actionDataScheme = Object.freeze({
  getChunkInfo: {
    type: 'object',
    additionalProperties: true,
    required: [ 'downloadPath' ],
    properties: {
      downloadPath: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    },
  },
  uploadFileDone: {
    type: 'object',
    additionalProperties: true,
    required: [ 'hash', 'total', 'chunkSize', 'filename', 'fileDirectory' ],
    properties: {
      hash: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      total: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      chunkSize: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      filename: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      fileDirectory: { type: 'string' },
      fileDesc: { anyOf: [{ type: 'string' }, { type: 'null' }] },
      fileType: { anyOf: [{ type: 'string' }, { type: 'null' }] },
    },
  },
  uploadFileChunkByStream: {
    type: 'object',
    additionalProperties: true,
    required: [ 'hash', 'indexString', 'filename' ],
    properties: {
      hash: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      indexString: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      total: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      filename: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      chunkSize: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    },
  },
  uploadFileChunkByBase64: {
    type: 'object',
    additionalProperties: true,
    required: [ 'hash', 'indexString', 'filename', 'fileBase64' ],
    properties: {
      hash: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      indexString: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      total: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      filename: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      chunkSize: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      fileBase64: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    },
  },
  uploadFileChunkByBuffer: {
    type: 'object',
    additionalProperties: true,
    required: [ 'hash', 'indexString', 'filename', 'fileBuffer' ],
    properties: {
      hash: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      indexString: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      total: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      filename: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      chunkSize: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      fileBuffer: { anyOf: [{ type: 'object' }] },
    },
  },
  downloadFileChunkByBase64: {
    type: 'object',
    additionalProperties: true,
    required: [ 'downloadPath', 'index' ],
    properties: {
      downloadPath: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      index: { type: 'number' },
    },
  },
  downloadFileChunkByBuffer: {
    type: 'object',
    additionalProperties: true,
    required: [ 'downloadPath', 'index' ],
    properties: {
      downloadPath: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      index: { type: 'number' },
    },
  },
});

class FileService extends Service {
  async getChunkInfo() {
    const app = this.app;
    const { config } = app;
    const { uploadDir } = config;
    const { appData } = this.ctx.request.body;
    const { actionData } = appData;
    validateUtil.validate(actionDataScheme.getChunkInfo, actionData);
    const { downloadPath } = actionData;
    const filePath = path.join(uploadDir, downloadPath);
    const isFileExists = await fileUtil.exists(filePath);
    if (!isFileExists) {
      throw new BizError(errorInfoEnum.file_not_found);
    }

    const KB = 1024;
    const MB = 1024 * KB;
    const fileStates = await fileUtil.stat(filePath);
    const fileSize = fileStates.size;
    let chunkSize = 3 * MB;
    if (fileSize > 100 * MB) {
      chunkSize = 5 * MB;
    } else if (fileSize > 500 * MB) {
      chunkSize = 8 * MB;
    }
    const total = Math.ceil(fileSize / chunkSize);
    const buffer = await fileUtil.readFile(filePath);
    const fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    const hash = fsHash.digest('hex');

    return { hash, total, chunkSize, fileSize };
  }

  async uploadFileDone() {
    const app = this.app;
    const { userId } = this.ctx.userInfo;
    const { jianghuKnex, config } = app;
    const { uploadDir, downloadBasePath } = config;
    const { tmpdir } = config.multipart;
    const actionData = this.ctx.request.body.appData.actionData;
    validateUtil.validate(actionDataScheme.uploadFileDone, actionData);
    const {
      hash,
      filename,
      total,
      chunkSize,
      fileDirectory,
      fileDesc,
      fileType,
    } = actionData;
    let filenameStorage = actionData.filenameStorage;
    const fileId = `${Date.now()}_${_.random(100000, 999999)}`;
    if (!filenameStorage) { filenameStorage = `${fileId}_${filename}`; }
    filenameStorage = filenameStorage.replace(/%/g, '');

    const fileUploadPath = path.join(uploadDir, fileDirectory);
    const filePath = path.join(fileUploadPath, filenameStorage);
    const isFileExists = await fileUtil.exists(fileUploadPath);
    if (!isFileExists) {
      await fileUtil.checkAndPrepareFilePath(fileUploadPath);
    }

    // 读取所有分片文件
    const chunksPath = path.join(tmpdir, userId, hash);
    const chunks = await fileUtil.readdir(chunksPath);
    const chunksPathList = [];
    if (chunks.length !== total || chunks.length === 0) {
      await fileUtil.deleteFileAndDirByPath(chunksPath);
      throw new BizError(errorInfoEnum.file_is_incomplete);
    }
    chunks.forEach(item => {
      chunksPathList.push(path.join(chunksPath, item));
    });

    // 将分片文件 merge 成一个文件
    await fileUtil.streamMerge(chunksPathList, filePath, chunkSize);
    await fileUtil.deleteFileAndDirByPath(chunksPath);
    // check md5是否一致
    const buffer = await fileUtil.readFile(filePath);
    const fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    const fileHash = fsHash.digest('hex');
    if (hash !== fileHash) {
      throw new BizError(errorInfoEnum.file_damaged);
    }

    const downloadPath = `/${fileDirectory}/${filenameStorage}`;
    const fileStates = await fileUtil.stat(filePath);
    const binarySize = fileUtil.formatByteSize(fileStates.size);
    const file = {
      fileId,
      fileDirectory,
      filename,
      fileDesc,
      filenameStorage,
      downloadPath,
      binarySize,
      fileType,
    };
    await jianghuKnex(tableObj._file, this.ctx).jhInsert(file);
    file.downloadBasePath = downloadBasePath;
    file.downloadTip = 'https://xxx.xxx.xxx/${downloadBasePath}${downloadPath}';
    return file;
  }

  async uploadFileChunkByStream() {
    const { userId } = this.ctx.userInfo;
    const { config } = this.app;
    const { tmpdir } = config.multipart;
    const actionData = this.ctx.request.body.appData.actionData;
    validateUtil.validate(actionDataScheme.uploadFileChunkByStream, actionData);
    const { hash, indexString } = actionData;
    const chunksPath = path.join(tmpdir, userId, hash);
    const filepath = path.join(chunksPath, hash + '_' + indexString);
    const isFileExists = await fileUtil.exists(chunksPath);
    if (!isFileExists) {
      await fileUtil.checkAndPrepareFilePath(chunksPath);
    }

    if (!this.ctx.request.files || !this.ctx.request.files[0]) {
      throw new BizError(errorInfoEnum.request_data_invalid);
    }

    const file = this.ctx.request.files[0];
    await fileUtil.copyFile(file.filepath, filepath);
    fileUtil.unlink(file.filepath);
  }

  async uploadFileChunkByBase64() {
    const { userId } = this.ctx.userInfo;
    const { config } = this.app;
    const { tmpdir } = config.multipart;
    const actionData = this.ctx.request.body.appData.actionData;
    validateUtil.validate(actionDataScheme.uploadFileChunkByBase64, actionData);
    const { hash, indexString, fileBase64 } = actionData;
    const chunksPath = path.join(tmpdir, userId, hash);
    const filepath = path.join(chunksPath, hash + '_' + indexString);
    const isFileExists = await fileUtil.exists(chunksPath);
    if (!isFileExists) {
      await fileUtil.checkAndPrepareFilePath(chunksPath);
    }

    if (!fileBase64) {
      throw new BizError(errorInfoEnum.request_data_invalid);
    }
    if (_.isEmpty(fileBase64)) {
      throw new BizError(errorInfoEnum.file_buffer_is_null);
    }
    const buffer = fileUtil.base64ToBlob(fileBase64);
    await fileUtil.writeFile(filepath, buffer);
    this.ctx.request.body.appData.actionData.fileBase64 = null;
  }

  async uploadFileChunkByBuffer() {
    const { userId } = this.ctx.userInfo;
    const { config } = this.app;
    const { tmpdir } = config.multipart;
    const actionData = this.ctx.request.body.appData.actionData;
    validateUtil.validate(actionDataScheme.uploadFileChunkByBuffer, actionData);
    const { hash, indexString, fileBuffer } = actionData;
    const chunksPath = path.join(tmpdir, userId, hash);
    const filepath = path.join(chunksPath, hash + '_' + indexString);

    const isFileExists = await fileUtil.exists(chunksPath);
    if (!isFileExists) {
      await fileUtil.checkAndPrepareFilePath(chunksPath);
    }

    if (!fileBuffer) {
      throw new BizError(errorInfoEnum.request_data_invalid);
    }
    if (_.isEmpty(fileBuffer)) {
      throw new BizError(errorInfoEnum.file_buffer_is_null);
    }
    // 创建一个bufferstream
    const bufferStream = new stream.PassThrough();
    // 将Buffer写入
    bufferStream.end(fileBuffer);
    // 进一步使用
    bufferStream.pipe(process.stdout);
    await fileUtil.writeFile(filepath, fileBuffer, 'binary');
    this.ctx.request.body.appData.actionData.fileBuffer = null;
  }

  async downloadFileChunkByBase64() {
    const app = this.app;
    const { config } = app;
    const { uploadDir } = config;
    const { actionData } = this.ctx.request.body.appData;
    validateUtil.validate(
      actionDataScheme.downloadFileChunkByBase64,
      actionData
    );
    const { total, index, chunkSize, hash, downloadPath } = actionData;
    const filePath = path.join(uploadDir, downloadPath);
    const isFileExists = await fileUtil.exists(filePath);
    if (!isFileExists) {
      throw new BizError(errorInfoEnum.file_not_found);
    }

    const buffer = await fileUtil.readFile(filePath);
    const currentBuffer = buffer.slice(
      index * chunkSize,
      (index + 1) * chunkSize
    );

    let fileBase64 = currentBuffer.toString('base64');
    if (index === 0) {
      const mimeType = mime.getType(filePath);
      fileBase64 = `data:${mimeType};base64,${fileBase64}`;
    }

    return { fileBase64 };
  }

  async downloadFileChunkByBuffer() {
    const app = this.app;
    const { config } = app;
    const { uploadDir } = config;
    const { actionData } = this.ctx.request.body.appData;
    validateUtil.validate(
      actionDataScheme.downloadFileChunkByBuffer,
      actionData
    );
    const { fileSize, total, index, chunkSize, hash, downloadPath } = actionData;
    const filePath = path.join(uploadDir, downloadPath);
    const isFileExists = await fileUtil.exists(filePath);
    if (!isFileExists) {
      throw new BizError(errorInfoEnum.file_not_found);
    }

    const fd = await fileUtil.open(filePath);
    let length = chunkSize;
    if ((index + 1) === total) {
      length = fileSize - index * chunkSize;
    }
    const currentBuffer = Buffer.alloc(length);
    await fileUtil.read(fd, currentBuffer, 0, length, index * chunkSize);

    return { fileBuffer: currentBuffer, index };
  }
}

module.exports = FileService;
