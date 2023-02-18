# socketIO-v3

本项目是 `eggjs` 的 `v3.x` 版本的 `socket.io` 插件


## 使用

```js
// {app_root}/config/plugin.js
exports.socketIO = {
  enable: true,
  package: 'socketIO',
};
```

## 配置

```js
// {app_root}/config/config.default.js
exports.socketIO = {
  path: '/socket.io',
  serveClient: true,
  connectTimeout: 45000,
};
```

这里的配置是 [Server API](https://socket.io/docs/v3/server-api/#new-Server-httpServer-options) 的 options 参数

```js
// {app_root}/app/socketIO/main.js
'use strict';

module.exports = socketIO => {
  socketIO.on('connection', socket => {
    //...
  });
};
```

添加一个 socket.io 的入口文件，这里可以执行初始化等操作

```js
// {app_root}/app.js
'use strict';

// 定义 io 入口文件
const socketIOMain = require('./app/socketIO/main');

module.exports = app => {
  const { socketIO } = app;
  socketIOMain(socketIO);
};
```
