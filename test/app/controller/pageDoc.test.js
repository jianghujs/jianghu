'use strict';

const utils = require('../../utils');
const path = require('path');

describe('test/app/controller/pageDoc.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    await this.app.knex.context.destroy();
    this.app.close();
  });

  // it('Test index() get /${appId}/pageDoc, should return pageDoc/index.html', async () => {
  //   // await this.app.httpRequest()
  //   //   .get('/jianghu/pageDoc').expect(302);
  // });
  // it('Test sideBar() get /${appId}/pageDoc/_sidebar.md, should return menuList', async () => {
  //   const allowPageList = [{ pageType: 'showInMenu', pageName: 'testPage', pageId: 'test', sort: 1 }, { pageType: 'showInMenu', pageName: 'testPage2', pageId: 'test', sort: 2 }];
  //   this.app.mockContext({
  //     userInfo: {
  //       allowPageList,
  //     },
  //   });
  //   const result = await this.app.httpRequest()
  //     .get('/jianghu/pageDoc/_sidebar.md');

  //   // assert(ctx.body === targetBody);
  // });
  // it('Test page() get /${appId}/page/:pageName , should redirect', async () => {
  //   await this.app.httpRequest()
  //     .get('/jianghu/page/test').expect(302);
  // });
  // it('Test page() get /${appId}/page/:pageName/* , should redirect', async () => {
  //   await this.app.httpRequest()
  //     .get('/jianghu/page/test/index').expect(302);
  // });
});
