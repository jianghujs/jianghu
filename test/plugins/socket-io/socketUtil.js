'use strict';

const { io } = require('socket.io-client');

function createClient(port, opts = {}) {
  return io(`ws://0.0.0.0:${port}`, opts);
}

function connect(socketClient) {
  return new Promise(resolve => {
    socketClient.on('connect', () => {
      resolve(true);
    });
    socketClient.on('connect_timeout', () => {
      resolve(false);
    });
    socketClient.on('connect_error', message => {
      console.log('connect_error:', message);
      resolve(false);
    });
    socketClient.connect();
  });
}

function success(
  done,
  socketIO,
  ...clients
) {
  socketIO.close();
  clients.forEach(client => client.disconnect());
  done();
}

function successFn(
  done,
  socketIO,
  ...clientSockets
) {
  return () => success(done, socketIO, ...clientSockets);
}

function waitFor(emitter, event) {
  return new Promise(resolve => {
    emitter.once(event, resolve);
  });
}

async function sendMsg(socketClient, msgBody) {
  return new Promise(resolve => {
    socketClient.on('resource', message => {
      resolve(message);
    });
    socketClient.emit('resource', msgBody);
  });
}

module.exports = {
  sendMsg,
  createClient,
  successFn,
  success,
  waitFor,
  connect,
};
