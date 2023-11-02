'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async index() {
    const { ctx } = this;
    const { indexPage } = this.app.config;
    ctx.redirect(indexPage);
  }

  async page() {
    const { ctx } = this;
    const { packagePage, userInfo } = ctx;
    const { userId, username, deviceId, deviceType } = userInfo.user || {};
    const targetHtml = packagePage.pageFile || `${packagePage.pageId}.html`;
    await ctx.render(`page/${targetHtml}`, {
      ...ctx.hookResult,
      page: { passcode: packagePage.passcode }
    });
    this.app.getLogger('pageLogger').info({ pageId: packagePage.pageId, pageName: packagePage.pageName, userId, username, deviceId, deviceType });
  }
}

module.exports = PageController;
