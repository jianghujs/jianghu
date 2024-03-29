'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller, config } = app;
  const { appId } = config;

  router.get('/', controller.page.index);
  router.get(`/${appId}/`, controller.page.index);
  router.get(`/${appId}/page/`, controller.page.index);

  router.get(`/${appId}/page/:pageName`, controller.page.page);
  router.get(`/${appId}/page/:pageName/*`, controller.page.page);

  router.get(`/${appId}/pageDoc`, controller.pageDoc.index);
  
  router.post(`/${appId}/resource`, controller.resource.httpRequest);
};

