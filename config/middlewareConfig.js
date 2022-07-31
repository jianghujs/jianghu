'use strict';

module.exports.middleware = [
  // /upload/*
  'downloadUserInfo',
  // /page/*
  'pagePackage', 'pageUserInfo', 'pageAuthorization', 'pageHook',
  // /pageDoc/*
  'pageDocPackage', 'pageDocUserInfo', 'pageDocAuthorization',
  // /resource/*
  'httpPackage', 'httpUserInfo', 'httpAuthorization', 'httpResourceHook' ];

module.exports.middlewareMatch = {
  pagePackage: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/page/`);
    },
  },
  pageUserInfo: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/page/`);
    },
  },
  pageAuthorization: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/page/`);
    },
  },
  pageHook: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/page/`);
    },
  },
  pageDocPackage: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId 或 /appId/pageDoc/pageId.md
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/pageDoc/`);
    },
  },
  pageDocUserInfo: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId 或 /appId/pageDoc/pageId.md
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/pageDoc/`);
    },
  },
  pageDocAuthorization: {
    match(ctx) {
      // url 格式符合 /appId/page/pageId 或 /appId/pageDoc/pageId.md
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/pageDoc/`);
    },
  },
  downloadUserInfo: {
    match(ctx) {
      // url 格式符合 /appId/upload
      return (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')
        && ctx.request.path.startsWith(`/${ctx.app.config.appId}/upload/`);
    },
  },
  httpPackage: {
    match(ctx) {
      return ctx.request.path === `/${ctx.app.config.appId}/resource`;
    },
  },
  httpUserInfo: {
    match(ctx) {
      return ctx.request.path === `/${ctx.app.config.appId}/resource`;
    },
  },
  httpAuthorization: {
    match(ctx) {
      return ctx.request.path === `/${ctx.app.config.appId}/resource`;
    },
  },
  httpResourceHook: {
    match(ctx) {
      return ctx.request.path === `/${ctx.app.config.appId}/resource`;
    },
  },
};
