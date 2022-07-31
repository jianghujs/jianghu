'use strict';

const Controller = require('egg').Controller;
const { tableEnum } = require('../constant/constant');

class PageController extends Controller {
  async index() {
    const { ctx } = this;
    const { indexPage } = this.app.config;
    ctx.redirect(indexPage);
  }

  async page() {
    const { ctx } = this;
    const { packagePage } = ctx;
    const { jianghuKnex, logger } = this.app;
    const uiActionList = await jianghuKnex(tableEnum._ui).whereIn('pageId', [ packagePage.pageId, 'allPage' ]).select();
    // Tip: 为了避免 uiActionConfig json 异常, 这里 format一下
    uiActionList.forEach(item => {
      const { pageId, uiActionId, uiActionConfig} = item;
      try {
        item.uiActionConfig = JSON.parse(uiActionConfig || '{}');
      } catch (err) {
        item.uiActionConfig = { errorReason: 'uiActionConfig JSON.parse异常' }
        logger.error('[page.js] _ui.uiActionConfig JSON.parse异常', { pageId, uiActionId })
      }
    });
    await ctx.render(`page/${packagePage.pageId}.html`, {
      ...ctx.hookResult,
      uiActionList
    });
  }
}

module.exports = PageController;
