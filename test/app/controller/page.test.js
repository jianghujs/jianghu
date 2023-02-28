'use strict';
const utils = require('../../utils');
const path = require('path');
const assert = require('assert');

describe('test/app/controller/page.test.js', () => {
  before(() => {
    this.app = utils.app('apps/jianghu-config');
    return this.app.ready();
  });
  after(async () => {
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/run'));
    await utils.deleteFileAndDirByPath(path.join(process.cwd(), 'test/fixtures/apps/jianghu-config/logs'));
    this.app.close();
  });

  it('Test index() get / , should redirect', async () => {
    await this.app.httpRequest()
      .get('/').expect(302);
  });
  it('Test index() get /${appId}/ , should redirect', async () => {
    await this.app.httpRequest()
      .get(`/${this.app.config.appId}/`).expect(302);
  });
  it('Test index() get /${appId}/page/ , should redirect', async () => {
    await this.app.httpRequest()
      .get(`/${this.app.config.appId}/page/`).expect(302);
  });

  describe('Test /${appId}/page/, authenticated user', () => {
    before(async () => {
      const result = await this.app.httpRequest()
        .post('/jianghu/resource')
        .send({
          packageId: Date.now() + '',
          packageType: 'httpRequest',
          appData: {
            appId: this.app.config.appId,
            pageId: 'login',
            actionId: 'passwordLogin',
            actionData: { userId: 'admin', password: '123456', deviceId: 'chrome_' + Date.now() },
          }
        })
        .expect(200);
      this.authToken = result.body.appData.resultData.authToken;
    });

    it('Test index() get /, should redirect', async () => {
      await this.app.httpRequest()
        .get('/')
        .set('Cookie', [`${this.app.config.appId}_authToken=${this.authToken}`])
        .expect(302)
        .then(response => {
          assert.equal(response.res.headers.location, `${this.app.config.indexPage}`)
        });
    });

    it('Test index() get /${appId}/ , should redirect', async () => {
      await this.app.httpRequest()
        .get(`/${this.app.config.appId}`)
        .set('Cookie', [`${this.app.config.appId}_authToken=${this.authToken}`])
        .expect(302)
        .then(response => {
          assert.equal(response.res.headers.location, `${this.app.config.indexPage}`)
        });
    });

    it('Test index() get /${appId}/page/ , should redirect', async () => {
      await this.app.httpRequest()
        .get(`/${this.app.config.appId}/page`)
        .set('Cookie', [`${this.app.config.appId}_authToken=${this.authToken}`])
        .expect(302)
        .then(response => {
          assert.equal(response.res.headers.location, `${this.app.config.indexPage}`)
        });
    });

    describe('Test /${appId}/page/:pageName/, authenticated user', () => {
      it('Test index() get /${appId}/page/:pageName/, should success', async () => {
        await this.app.httpRequest()
          .get(`/${this.app.config.appId}/page/manual`)
          .set('Cookie', [`${this.app.config.appId}_authToken=${this.authToken}`])
          .expect(200);
      });

      it('Test index() get /${appId}/page/:invalidPageName/, should redirect', async () => {
        await this.app.httpRequest()
          .get(`/${this.app.config.appId}/page/unknown`)
          .set('Cookie', [`${this.app.config.appId}_authToken=${this.authToken}`])
          .expect(302)
          .then(response => {
            assert.equal(response.res.headers.location, `${this.app.config.helpPage}`)
          });
      });
    });
  });
});
