'use strict';

const Controller = require('egg').Controller;

class PageDocController extends Controller {

  async index() {
    const { ctx } = this;
    await ctx.render('pageDoc/index.html');
  }

}

module.exports = PageDocController;
