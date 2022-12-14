'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const mm = require('egg-mock');
const sleep = require('mz-modules/sleep');
const Koa = require('koa');
const http = require('http');
const fixtures = path.join(__dirname, 'fixtures');
const eggPath = process.cwd();
const egg = require('..');
const request = require('supertest');
const readFile = util.promisify(fs.readFile);
const open = util.promisify(fs.open);
const read = util.promisify(fs.read);
const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
const lstat = util.promisify(fs.lstat);
const mime = require('mime');

exports.app = (name, options) => {
  options = formatOptions(name, options);
  const app = mm.app(options);
  return app;
};

/**
 * start app with single process mode
 *
 * @param {String} baseDir - base dir.
 * @param {Object} [options] - optional
 * @return {App} app - Application object.
 */
exports.singleProcessApp = async (baseDir, options = {}) => {
  if (!baseDir.startsWith('/')) baseDir = path.join(__dirname, 'fixtures', baseDir);
  options.env = options.env || 'unittest';
  options.baseDir = baseDir;
  options.framework = process.cwd();
  const app = await egg.start(options);
  app.httpRequest = () => request(app.callback());
  return app;
};

/**
 * start app with cluster mode
 *
 * @param {String} name - cluster name.
 * @param {Object} [options] - optional
 * @return {App} app - Application object.
 */
exports.cluster = (name, options) => {
  options = formatOptions(name, options);
  return mm.cluster(options);
};

let localServer;

exports.startLocalServer = () => {
  return new Promise((resolve, reject) => {
    if (localServer) {
      return resolve('http://127.0.0.1:' + localServer.address().port);
    }
    let retry = false;

    const app = new Koa();
    app.use(async ctx => {
      if (ctx.path === '/get_headers') {
        ctx.body = ctx.request.headers;
        return;
      }

      if (ctx.path === '/timeout') {
        await sleep(10000);
        ctx.body = `${ctx.method} ${ctx.path}`;
        return;
      }

      if (ctx.path === '/error') {
        ctx.status = 500;
        ctx.body = 'this is an error';
        return;
      }

      if (ctx.path === '/retry') {
        if (!retry) {
          retry = true;
          ctx.status = 500;
        } else {
          ctx.set('x-retry', '1');
          ctx.body = 'retry suc';
          retry = false;
        }
        return;
      }

      ctx.body = `${ctx.method} ${ctx.path}`;
    });
    localServer = http.createServer(app.callback());

    localServer.listen(0, err => {
      if (err) return reject(err);
      return resolve('http://127.0.0.1:' + localServer.address().port);
    });
  });
};
process.once('exit', () => localServer && localServer.close());

exports.getFilepath = name => {
  return path.join(fixtures, name);
};

exports.getJSON = name => {
  return JSON.parse(fs.readFileSync(exports.getFilepath(name)));
};

function formatOptions(name, options) {
  let baseDir;
  if (typeof name === 'string') {
    baseDir = name;
  } else {
    // name is options
    options = name;
  }
  return Object.assign({}, {
    baseDir,
    customEgg: eggPath,
    cache: false,
  }, options);
}

exports.sleep = async ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};


const atob = require('atob');
exports.base64ToBlob = base64 => {
  const base64Str = atob(base64);
  let n = base64Str.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = base64Str.charCodeAt(n);
  }
  return u8arr;
};

exports.readFileBase64 = async ({ filePath, index, chunkSize }) => {
  const buffer = await readFile(filePath);
  const currentBuffer = buffer.slice(
    index * chunkSize,
    (index + 1) * chunkSize
  );

  let fileBase64 = currentBuffer.toString('base64');
  const mimeType = mime.getType(filePath);
  fileBase64 = `data:${mimeType};base64,${fileBase64}`;
  return fileBase64;
};

exports.readBuffer = async ({ filePath, chunkSize, total, index, fileSize }) => {
  const fd = await open(filePath);
  let length = chunkSize;
  if ((index + 1) === total) {
    length = fileSize - index * chunkSize;
  }
  const currentBuffer = Buffer.alloc(length);
  await read(fd, currentBuffer, 0, length, index * chunkSize);

  return currentBuffer;
};

/**
   * Delete the file and dir by path with recursion
   * @param path
   * @return boolean
   */
exports.deleteFileAndDirByPath = async path => {
  try {
    const isPathExists = await exists(path);
    if (isPathExists) {
      const files = await readdir(path);
      for (let i = 0; i < files.length; i++) {
        const curPath = `${path}/${files[i]}`;
        const fileStats = await lstat(curPath);
        if (fileStats.isDirectory()) {
          // recurse
          await this.deleteFileAndDirByPath(curPath);
        } else {
          // delete file
          await unlink(curPath);
        }
      }
      await rmdir(path);
      return true;
    }
  } catch (err) {
    console.error(`Delete path: ${path} failed with ${err.message}`);
    return false;
  }
  return true;
};
