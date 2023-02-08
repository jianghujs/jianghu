'use strict';

const {
  resourceTypeObj,
  socketResponse,
  resourcePath,
  socketRequest: socketRequestBodyBuild,
} = require('../constant/constant');
const { BizError, errorInfoEnum } = require('../constant/error');
const {
  sqlResource,
  serviceResource,
} = require('./controllerUtil/resourceUtil');
const socketPackage = require('../middleware/socketPackage');
const socketPackageRecord = require('../middleware/socketPackageRecord');
const socketUserInfo = require('../middleware/socketUserInfo');
const socketAuthorization = require('../middleware/socketAuthorization');
const socketResourceBeforeHook = require('../middleware/socketResourceBeforeHook');
const socketResourceAfterHook = require('../middleware/socketResourceAfterHook');

async function socketRequest({ socket, app, body }, next) {
  const { packageId, packageType, appData } = body;
  const { jianghuKnex, config } = app;
  const { appId } = config;

  const ctx = app.createAnonymousContext();
  ctx.jianghuSocket = socket;
  ctx.request.body = body;
  ctx.body = body;
  await socketPackage(ctx);
  await socketResourceBeforeHook(ctx);
  await socketUserInfo(ctx);
  await socketAuthorization(ctx);

  const { packageResource } = ctx;
  const { resourceType, resourceId, pageId, actionId } = packageResource;

  // TODO: base64场景 appData太大了
  app.logger.debug('[socketResource.js socketRequest body]', {
    packageId,
    resourceId,
    appData,
  });

  let resultData;
  switch (resourceType) {
    case resourceTypeObj.socketSql:
    case resourceTypeObj.sql:
      resultData = await sqlResource({ jianghuKnex, ctx });
      break;
    case resourceTypeObj.service:
    case resourceTypeObj.socketService:
      resultData = await serviceResource({ ctx });
      break;
    default:
      throw new BizError(errorInfoEnum.resource_not_support);
  }

  // 记录socket请求
  await socketPackageRecord(ctx);

  // Tip：socket connect 场景; 必须先next() 让链接建立成功;
  next();

  if (packageType === 'socketRequest') {
    const responseBody = socketResponse.success({
      packageId,
      appData: { resultData, appId, pageId, actionId },
    });
    socket.emit(resourcePath, responseBody);
  }

  await socketResourceAfterHook(ctx);
}

async function socketIOInit(app) {
  const {
    socketIO,
    logger,
    config: { appId },
  } = app;

  const socketIOConnectEventBuild = socketIO => {
    socketIO.use(async function(socket, next) {
      try {
        const body = socket.handshake.auth;
        await socketRequest({ socket, app, body }, next);
      } catch (error) {
        logger.error('[第一次建立连接失败]', error);
        next(error);
      }
    });
  };

  const socketIOOtherEventBuild = socketIO => {
    socketIO.on('connection', socket => {
      const { id: socketId } = socket;
      logger.info('[socket connection success]', { socketId });

      // 业务入口
      socket.on(resourcePath, async function(body) {
        const { packageId, appData } = body;
        const { appId, pageId, actionId } = appData;
        try {
          await socketRequest({ socket, app, body }, () => {});
        } catch (err) {
          logger.error('[resource.js socketIOOtherEventBuild]', err);
          const errorCode =
            err.errorCode || err.code || errorInfoEnum.server_error.errorCode;
          const errorReason =
            err.errorReason ||
            err.sqlMessage ||
            err.message ||
            errorInfoEnum.server_error.errorReason;
          const errorReasonSupplement = err.errorReasonSupplement || null;
          const socketBody = socketResponse.fail({
            packageId,
            appData: {
              errorCode,
              errorReason,
              errorReasonSupplement,
              appId,
              pageId,
              actionId,
            },
          });
          socket.emit(resourcePath, socketBody);
        }
      });

      // 断线
      socket.on('disconnect', async function(message) {
        const { id: socketId } = socket;
        logger.warn('[socket disconnect]', { socketId, message });

        // 切换网络时，可能出现异常的 disconnect，其实 socket 已经重连了
        // 所以多检查一下在线 socket 列表
        const allSockets = await socketIO.fetchSockets();
        // logger.info('[socket disconnect, allSockets]', allSockets);
        if (allSockets.find(s => s.id === socketId)) {
          logger.info('[socket ignore disconnect]', { socketId, message });
          return;
        }

        // 调用应用层的 disconnect 方法
        const body = socketRequestBodyBuild.bodyBuild({
          appData: {
            appId,
            pageId: 'socket',
            actionId: 'disconnect',
            authToken: null,
            actionData: { message },
          },
        });
        await socketRequest({ socket, app, body }, () => {});
      });
    });
  };

  socketIOConnectEventBuild(socketIO);
  socketIOOtherEventBuild(socketIO);
}

module.exports = socketIOInit;
