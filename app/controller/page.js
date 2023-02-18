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
    const { jianghuKnex, logger } = this.app;
    const { userId, username, deviceId, deviceType } = userInfo.user || {};
    const uiActionList = await jianghuKnex('_ui').whereIn('pageId', [ packagePage.pageId, 'allPage' ]).select();
    // Tip: 为了避免 uiActionConfig json 异常, 这里 format一下
    uiActionList.forEach(item => {
      const { pageId, uiActionId, uiActionConfig} = item;
      try {
        item.uiActionConfig = JSON.parse(uiActionConfig || '{}');
      } catch (err) {
        item.uiActionConfig = { errorReason: 'uiActionConfig JSON.parse异常' }
        logger.error('[page.js] _ui.uiActionConfig JSON.parse异常', { pageId, uiActionId, err })
      }
    });
    const targetHtml = packagePage.pageFile || `${packagePage.pageId}.html`;
    await ctx.render(`page/${targetHtml}`, {
      ...ctx.hookResult,
      uiActionList,
      page: { passcode: packagePage.passcode }
    });
    this.app.getLogger('pageLogger').info({ pageId: packagePage.pageId, pageName: packagePage.pageName, userId, username, deviceId, deviceType });
  }
}

module.exports = PageController;
