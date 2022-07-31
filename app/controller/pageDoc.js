'use strict';

const send = require('koa-send');
const _ = require('lodash');
const Controller = require('egg').Controller;

class PageDocController extends Controller {

  async index() {
    const { ctx } = this;
    await ctx.render('pageDoc/index.html');
  }

  async sidebar() {
    const { allowPageList } = this.ctx.userInfo;
    // 生成 sidebar 目录内容
    const menuList = [];
    menuList.push('* [Home](/)');
    allowPageList && _.sortBy(allowPageList, [ 'sort' ]).forEach(page => {
      if (page.pageId === 'manual' || page.pageType !== 'showInMenu') {
        return;
      }
      menuList.push(`* [${page.pageName}(${page.pageId})](${page.pageId})`);
    });
    this.ctx.body = menuList.join('\n');
  }

  async page() {
    const { ctx } = this;
    const pageDocFileName = ctx.params.pageDocFileName.replace(/\.md$/, '');
    try {
      await send(ctx, pageDocFileName + '.md', { root: ctx.app.config.baseDir + '/app/view/pageDoc' });
    } catch (e) {
      this.ctx.body = '*(Please add markdown file in /app/view/pageDoc)*';
    }
  }


}

module.exports = PageDocController;
