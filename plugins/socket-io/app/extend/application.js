'use strict';

const socketIO = require('../../lib/socketIO');

let loadedIO;

module.exports = {
  get socketIO() {
    if (loadedIO) return loadedIO;
    loadedIO = socketIO(this);
    return loadedIO;
  },
};
