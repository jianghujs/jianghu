'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
const { BizError, errorInfoEnum } = require('../constant/error');
const { userStatusObj } = require('../constant/constant');
const validateUtil = require('../common/validateUtil');
const idGenerateUtil = require('../common/idGenerateUtil');
// ========================================常用 require end=============================================
const md5 = require('md5-node');
const actionDataaScheme = Object.freeze({
  passwordLogin: {
    type: 'object',
    additionalProperties: true,
    required: [ 'userId', 'password', 'deviceId' ],
    properties: {
      userId: { type: 'string', minLength: 3 },
      password: { type: 'string' },
      deviceId: { type: 'string' },
      deviceType: { type: 'string' },
      needSetCookies: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
    },
  },
  logout: {
    type: 'object',
    additionalProperties: true,
    required: [],
    properties: {
      needSetCookies: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
    },
  },
  resetPassword: {
    type: 'object',
    additionalProperties: true,
    required: [ 'oldPassword', 'newPassword' ],
    properties: {
      oldPassword: { type: 'string' },
      newPassword: { type: 'string' },
    },
  },
});

class UserService extends Service {
  async passwordLogin() {
    const app = this.app;
    const { jianghuKnex } = app;
    const config = app.config;

    const { actionData } = this.ctx.request.body.appData;
    validateUtil.validate(actionDataaScheme.passwordLogin, actionData);

    const {
      userId,
      password,
      deviceType,
      deviceId,
      needSetCookies = true,
    } = actionData;
    const user = await jianghuKnex('_view01_user')
      .where({ userId })
      .first();
    if (!user || !user.userId || user.userId !== userId) {
      throw new BizError(errorInfoEnum.user_not_exist);
    }
    const { userStatus } = user;
    if (userStatus !== userStatusObj.active) {
      if (userStatus === userStatusObj.banned) {
        throw new BizError(errorInfoEnum.user_banned);
      }
      throw new BizError(errorInfoEnum.user_status_error);
    }
    const passwordMd5 = md5(`${password}_${user.md5Salt}`);
    if (passwordMd5 !== user.password) {
      throw new BizError(errorInfoEnum.user_password_error);
    }

    const authToken = idGenerateUtil.uuid(36);
    // 存session 的目的是为了
    //   1. 系统可以根据这个判断是否是自己生成的token
    //   2. 有时候系统升级需要 用户重新登陆/重新登陆，这时候可以通过清理旧session达到目的
    const userSession = await jianghuKnex('_user_session')
      .where({ userId, deviceId })
      .first();

    const userAgent = this.ctx.request.body.appData.userAgent || '';
    const userIp = this.ctx.header['x-real-ip'] || this.ctx.request.ip || '';

    if (userSession && userSession.id) {
      await jianghuKnex('_user_session', this.ctx)
        .where({ id: userSession.id })
        .jhUpdate({ authToken, deviceType, userAgent, userIp });
    } else {
      await jianghuKnex('_user_session', this.ctx).jhInsert({
        userId,
        deviceId,
        userAgent,
        userIp,
        deviceType,
        authToken,
      });
    }

    // 设置 cookies，用于 page 鉴权
    if (needSetCookies) {
      this.ctx.cookies.set(`${config.loginAppId||config.appId}_authToken`, authToken, {
        httpOnly: false,
        signed: false,
        maxAge: 1000 * 60 * 60 * 24 * 1080,
      }); // 1080天
    }

    return { authToken, deviceId, userId };
  }

  async logout() {
    const { config, jianghuKnex } = this.app;
    const { userInfo } = this.ctx;

    const { actionData } = this.ctx.request.body.appData;
    validateUtil.validate(actionDataaScheme.logout, actionData);
    const { needSetCookies = true } = actionData;
    const { userId, deviceId } = userInfo.user;
    if (needSetCookies) {
      this.ctx.cookies.set(`${config.loginAppId||config.appId}_authToken`, null);
    }
    const user = await jianghuKnex('_view01_user')
      .where({ userId })
      .first();
    if (!user || !userId) {
      throw new BizError({ ...errorInfoEnum.user_not_exist });
    }
    const userSession = await jianghuKnex('_user_session')
      .where({ userId, deviceId })
      .first();
    if (!userSession) {
      throw new BizError({ ...errorInfoEnum.request_token_invalid });
    }
    await jianghuKnex('_user_session', this.ctx)
      .where({ id: userSession.id })
      .jhUpdate({ authToken: '' });
    if (needSetCookies) {
      this.ctx.cookies.set(`${config.loginAppId||config.appId}_authToken`, null);
    }

    return {};
  }

  async userInfo() {
    const { userInfo } = this.ctx;
    const { user } = userInfo;
    const { userId } = user;
    const { jianghuKnex } = this.app;
    if (userId) {
      userInfo.socketList = await jianghuKnex('_user_session')
        .where({ userId, socketStatus: 'online' })
        .select('userId', 'deviceId', 'socketStatus');
    }
    return userInfo;
  }

  async resetPassword() {
    const { actionData } = this.ctx.request.body.appData;
    validateUtil.validate(actionDataaScheme.resetPassword, actionData);
    const app = this.app;
    const { jianghuKnex } = app;
    const { oldPassword, newPassword } = actionData;
    const {
      userInfo: {
        user: { userId },
      },
    } = this.ctx;
    const user = await jianghuKnex('_user').where({ userId }).first();
    // 旧密码检查
    const passwordMd5 = md5(`${oldPassword}_${user.md5Salt}`);
    if (passwordMd5 !== user.password) {
      throw new BizError(errorInfoEnum.user_password_reset_old_error);
    }
    // 密码一致检查
    if (oldPassword === newPassword) {
      throw new BizError(errorInfoEnum.user_password_reset_same_error);
    }

    // 修改数据库中密码
    const newMd5Salt = idGenerateUtil.uuid(12);
    const newPasswordMd5 = md5(`${newPassword}_${newMd5Salt}`);
    await jianghuKnex('_user', this.ctx).where({ userId }).jhUpdate({
      password: newPasswordMd5,
      clearTextPassword: newPassword,
      md5Salt: newMd5Salt,
    });
    await jianghuKnex('_user_session', this.ctx).where({ userId }).jhUpdate({ authToken: '' });
    return {};
  }
}

module.exports = UserService;
