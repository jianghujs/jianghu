'use strict';

const socketIO = require('../../lib/socketIO');
const socketIOInit = require('../controller/socketResource');

let loadedIO;

module.exports = {
  get socketIO() {
    if (loadedIO) return loadedIO;
    loadedIO = socketIO(this);
    return loadedIO;
  },
  socketIOInit(app) {
    socketIOInit(app);
  },
};
