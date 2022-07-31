'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const open = util.promisify(fs.open);
const read = util.promisify(fs.read);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const Promise = require('bluebird');
const stream = require('readable-stream');
const atob = require('atob');

const splitByParts = (file, parts) => {
  const self = this;

  // Validate parameters.
  if (parts < 1) {
    return Promise.reject(
      new Error("Parameter 'parts' is invalid, must contain an integer value.")
    );
  }

  return util
    .promisify(fs.stat)(file)
    .then(function(stat) {
      if (!stat.isFile) {
        return Promise.reject(new Error('Given file is not valid'));
      }
      if (!stat.size) {
        return Promise.reject(new Error('File is empty'));
      }

      const totalSize = stat.size;
      const splitSize = Math.floor(totalSize / parts);

      // If size of the parts is 0 then you have more parts than bytes.
      if (splitSize < 1) {
        return Promise.reject(new Error('Too many parts, or file too small!'));
      }

      // Get last split size, this is different from the others because it uses scrap value.
      const lastSplitSize = splitSize + (totalSize % parts);

      // Capture the partinfo in here:
      const partInfo = [];

      // Iterate the parts
      for (let i = 0; i < parts; i++) {
        partInfo[i] = {
          number: i,

          // Set buffer read start position
          start: i * splitSize,

          // Set total ending position
          end: i * splitSize + splitSize,
        };

        if (i === parts - 1) {
          partInfo[i].end = i * splitSize + lastSplitSize;
        }
      }

      return splitFile(file, partInfo);
    });
};

/**
 * Split file into multiple parts based on max part size given
 * @param {string} file
 * @param {int} maxSize max part size in BYTES!
 * @return {Promise}
 */
const splitBySizes = (file, maxSize) => {
  return util
    .promisify(fs.stat)(file)
    .then(function(stat) {
      if (!stat.isFile) {
        return Promise.reject(new Error('Given file is not valid'));
      }
      if (!stat.size) {
        return Promise.reject(new Error('File is empty'));
      }

      const totalSize = stat.size;

      // Number of parts (exclusive last part!)
      const parts = Math.ceil(totalSize / maxSize);
      const splitSize = Math.round(maxSize);

      // If size of the parts is 0 then you have more parts than bytes.
      if (splitSize < 1) {
        return Promise.reject(new Error('Too many parts, or file too small!'));
      }

      // Capture the partinfo in here:
      const partInfo = [];

      // Iterate the parts
      for (let i = 0; i < parts; i++) {
        partInfo[i] = {
          number: i,

          // Set buffer read start position
          start: i * splitSize,

          // Set total ending position
          end: i * splitSize + splitSize,
        };
      }

      // recalculate the size of the last chunk
      partInfo[partInfo.length - 1].end = totalSize;

      return splitFile(file, partInfo);
    });
};

/**
 * Split the file, given by partinfos and filepath
 * @access private
 * @param {string} file
 * @param {object} partInfo
 *
 * @return {Promise}
 */
const splitFile = (file, partInfo) => {
  // Now the magic. Read buffers with length..
  const partFiles = [];

  return Promise.mapSeries(partInfo, function(info) {
    return new Promise(function(resolve, reject) {
      // Open up a reader
      const reader = fs.createReadStream(file, {
        encoding: null,
        start: info.start,
        end: info.end - 1,
      });

      // Part name (file name of part)
      // get the max number of digits to generate for part number
      // ex. if original file is split into 4 files, then it will be 1
      // ex. if original file is split into 14 files, then it will be 2
      // etc.
      const maxPaddingCount = String(partInfo.length).length;
      // initial part number
      // ex. '0', '00', '000', etc.
      let currentPad = '';
      for (let i = 0; i < maxPaddingCount; i++) {
        currentPad += '0';
      }
      // construct part number for current file part
      // <file>-chunk-1
      // ...
      // <file>-chunk-5
      const unpaddedPartNumber = '' + info.number;
      const partNumber =
        currentPad.substring(0, currentPad.length - unpaddedPartNumber.length) +
        unpaddedPartNumber;
      const partName = file + '-chunk-' + partNumber;

      partFiles.push(partName);

      // Open up writer
      const writer = fs.createWriteStream(partName);

      // Pipe reader to writer
      const pipe = reader.pipe(writer);

      pipe.on('error', reject);
      pipe.on('finish', resolve);
    });
  }).then(function() {
    return Promise.resolve(partFiles);
  });
};

/**
 * Merge all input files by fs.appendFileSync()
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 *
 * @return {Promise}
 */
const fsMerge = (inputPathList, outputPath) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  return Promise.mapSeries(inputPathList, function(item) {
    fs.appendFileSync(outputPath, fs.readFileSync(item));
  }).then(function() {
    return Promise.resolve(outputPath);
  });
};

/**
 * Merge all input files by Buffer.concat()
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 *
 * @return {Promise}
 */
const bufferMerge = (inputPathList, outputPath) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  const buffers = [];

  return Promise.mapSeries(inputPathList, function(item) {
    buffers.push(fs.readFileSync(item));
  }).then(function() {
    // Buffer.concat() merge all buffers
    const concatBuffer = Buffer.concat(buffers);

    // write the merged buffer to the output file
    fs.writeFileSync(outputPath, concatBuffer);
    return Promise.resolve(outputPath);
  });
};

/**
 * Merge all input files by pipeline stream
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 * @param {int} chunkSize[optional]
 * @param chunkSize
 *
 * @return {Promise}
 */
const streamMerge = (
  inputPathList,
  outputPath,
  chunkSize = 2 * 1024 * 1024
) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  // create writable stream for output
  const output = fs.createWriteStream(outputPath, {
    encoding: null,
  });

  inputPathList = _.sortBy(inputPathList);
  return Promise.mapSeries(inputPathList, function(item) {
    return new Promise(function(resolve, reject) {
      const input = fs.createReadStream(item, {
        encoding: null,
      });

      const inputStream = new stream.Readable({
        // equivalent to controlling the size of a bucket
        highWaterMark: chunkSize, // the size of each on data of the control flow, the default is 16kb
      }).wrap(input);

      // pipeline data flow
      inputStream.pipe(output, {
        end: false,
      });
      inputStream.on('error', reject);
      inputStream.on('end', resolve);
    });
  }).then(function() {
    // close the stream to prevent memory leaks
    output.close();
    return Promise.resolve(outputPath);
  });
};

/**
 * Delete the file and dir by path with recursion
 * @param path
 * @param dir
 * @param filePath
 * @return boolean
 */
const deleteFileAndDirByPath = async filePath => {
  try {
    const isPathExists = await exists(filePath);
    if (isPathExists) {
      const files = await readdir(filePath);
      for (let i = 0; i < files.length; i++) {
        const curPath = `${filePath}/${files[i]}`;
        const fileStats = await lstat(curPath);
        if (fileStats.isDirectory()) {
          // recurse
          await this.deleteFileAndDirByPath(curPath);
        } else {
          // delete file
          await unlink(curPath);
        }
      }
      await rmdir(filePath);
      return true;
    }
  } catch (err) {
    console.error(`Delete path: ${path} failed with ${err.message}`);
    return false;
  }
  return true;
};

const formatByteSize = byteSize => {
  let fileSizeMsg = '';
  if (byteSize < 1048576) {
    fileSizeMsg = (byteSize / 1024).toFixed(2) + 'KB';
  } else if (byteSize === 1048576) {
    fileSizeMsg = '1MB';
  } else if (byteSize > 1048576 && byteSize < 1073741824) {
    fileSizeMsg = (byteSize / (1024 * 1024)).toFixed(2) + 'MB';
  } else if (byteSize > 1048576 && byteSize === 1073741824) {
    fileSizeMsg = '1GB';
  } else if (byteSize > 1073741824 && byteSize < 1099511627776) {
    fileSizeMsg = (byteSize / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  } else {
    fileSizeMsg = '文件超过1TB';
  }
  return fileSizeMsg;
};

const mkdirByBasePathAndDirectory = (basePath, directory) => {
  const arr = directory.split('/');
  let baseDir = basePath;
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      continue;
    }
    baseDir = baseDir + '/' + arr[i];
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
  }
};

const base64ToBlob = base64 => {
  const arr = base64.split(',');
  // const mime = arr[0].match(/:(.*?);/)[1];
  const base64Str = atob(arr[1]);
  let n = base64Str.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = base64Str.charCodeAt(n);
  }
  return u8arr;
};
/**
 * Prepare the file path
 * @param  {String} filePath  The file path
 * @return {Boolean} result
 */
const checkAndPrepareFilePath = async filePath => {
  const isPathExists = await exists(filePath);
  if (isPathExists) {
    return true;
  }
  const isPrepared = await checkAndPrepareFilePath(path.dirname(filePath));
  if (isPrepared) {
    try {
      await mkdir(filePath);
      return true;
    } catch (err) {
      console.error(`The path: ${filePath} prepare failed with ${err.message}`);
    }
  }
  return false;
};
const streamToBuffer = stream => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('error', reject);
    stream.on('data', data => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
};


module.exports = {
  splitByParts,
  splitBySizes,
  splitFile,
  fsMerge,
  bufferMerge,
  streamMerge,
  deleteFileAndDirByPath,
  formatByteSize,
  mkdirByBasePathAndDirectory,
  base64ToBlob,
  checkAndPrepareFilePath,
  streamToBuffer,
  exists,
  stat,
  read,
  readFile,
  readdir,
  writeFile,
  copyFile,
  unlink,
  open,
};
