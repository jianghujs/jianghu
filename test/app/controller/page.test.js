'use strict';
const utils = require('../../utils');
const path = require('path');

describe('test/app/controller/page.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  it('Test index() get / , should redirect', async () => {
    await this.app.httpRequest()
      .get('/').expect(302);
  });
  it('Test index() get /${appId}/ , should redirect', async () => {
    await this.app.httpRequest()
      .get('/jianghu/').expect(302);
  });
  it('Test index() get /${appId}/page/ , should redirect', async () => {
    await this.app.httpRequest()
      .get('/jianghu/page/').expect(302);
  });
  // it('Test page() get /${appId}/page/:pageName , should redirect', async () => {
  //   await this.app.httpRequest()
  //     .get('/jianghu/page/test').expect(302);
  // });
  // it('Test page() get /${appId}/page/:pageName/* , should redirect', async () => {
  //   await this.app.httpRequest()
  //     .get('/jianghu/page/test/index').expect(302);
  // });
});
