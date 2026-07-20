'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');
const validateUtil = require('../common/validateUtil');
const mfaUtil = require('../common/mfaUtil');
const idGenerateUtil = require('../common/idGenerateUtil');
const { BizError, errorInfoEnum } = require('../constant/error');

const actionDataScheme = Object.freeze({
  prepareMfaBind: {
    type: 'object',
    additionalProperties: true,
    required: [ 'deviceId', 'pendingLoginId' ],
    properties: {
      deviceId: { type: 'string' },
      pendingLoginId: { type: 'string' },
    },
  },
  bindMfa: {
    type: 'object',
    additionalProperties: true,
    required: [ 'deviceId', 'pendingLoginId', 'token' ],
    properties: {
      deviceId: { type: 'string' },
      pendingLoginId: { type: 'string' },
      token: { type: 'string' },
    },
  },
  confirmMfaBind: {
    type: 'object',
    additionalProperties: true,
    required: [ 'deviceId', 'pendingLoginId' ],
    properties: {
      deviceId: { type: 'string' },
      pendingLoginId: { type: 'string' },
    },
  },
  verifyMfaLogin: {
    type: 'object',
    additionalProperties: true,
    required: [ 'deviceId', 'pendingLoginId', 'token' ],
    properties: {
      deviceId: { type: 'string' },
      pendingLoginId: { type: 'string' },
      token: { type: 'string' },
    },
  },
  resetMfaByRecoveryCode: {
    type: 'object',
    additionalProperties: true,
    required: [ 'deviceId', 'pendingLoginId', 'recoveryCode' ],
    properties: {
      deviceId: { type: 'string' },
      pendingLoginId: { type: 'string' },
      recoveryCode: { type: 'string' },
    },
  },
});

class MfaService extends Service {
  // 生成 MFA 绑定二维码和密钥。
  async prepareMfaBind(actionData) {
    validateUtil.validate(actionDataScheme.prepareMfaBind, actionData);
    const { deviceId, pendingLoginId } = actionData;
    const pendingLogin = await this._getPendingLogin({ deviceId, pendingLoginId });
    const { issuer } = this._getMfaConfig();
    let secretBase32 = pendingLogin.mfaSecret;
    if (!secretBase32) {
      const secret = speakeasy.generateSecret({
        length: 20,
        name: `${issuer}:${pendingLogin.userId}`,
        issuer,
      });
      secretBase32 = secret.base32;
      pendingLogin.mfaSecret = secretBase32;
      await this._savePendingLogin(pendingLogin);
    }
    const otpauthUrl = speakeasy.otpauthURL({
      secret: secretBase32,
      label: `${issuer}:${pendingLogin.userId}`,
      issuer,
      encoding: 'base32',
    });
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 220,
    });
    return { secret: secretBase32, otpauthUrl, qrCodeDataUrl };
  }
  // 校验验证码后完成 MFA 绑定，并写入恢复码。
  async bindMfa(actionData) {
    validateUtil.validate(actionDataScheme.bindMfa, actionData);
    const { deviceId, pendingLoginId, token } = actionData;
    const pendingLogin = await this._getPendingLogin({ deviceId, pendingLoginId });
    if (!pendingLogin.mfaSecret) {
      throw new BizError(errorInfoEnum.mfa_not_setup);
    }
    if (!mfaUtil.verifyTotpToken(pendingLogin.mfaSecret, token)) {
      throw new BizError(errorInfoEnum.mfa_verification_failed);
    }

    const { jianghuKnex } = this.app;
    const { tableName, encryptKey, enableRecoveryCode } = this._getMfaConfig();
    const exist = await jianghuKnex(tableName).where({ userId: pendingLogin.userId }).first();
    let recoveryCode = pendingLogin.recoveryCode;
    if (enableRecoveryCode && !recoveryCode) {
      recoveryCode = mfaUtil.generateRecoveryCode();
      pendingLogin.recoveryCode = recoveryCode;
      await this._savePendingLogin(pendingLogin);
    }
    const recoveryCodeHash = enableRecoveryCode ? mfaUtil.hashRecoveryCode(recoveryCode) : null;
    if (enableRecoveryCode && exist && exist.recoveryCodeHash === recoveryCodeHash) {
      return {
        recoveryCode,
        pendingLoginId,
        userId: pendingLogin.userId,
        deviceId,
      };
    }
    const record = {
      userId: pendingLogin.userId,
      mfaEnabled: 1,
      encryptedSecret: mfaUtil.encryptSecret({ encryptKey, secret: pendingLogin.mfaSecret }),
      recoveryCodeHash,
      bindAt: dayjs().format(),
      verifyAt: dayjs().format(),
      resetAt: null,
    };
    if (exist) {
      await jianghuKnex(tableName)
        .where({ userId: pendingLogin.userId })
        .jhUpdate(record);
    } else {
      await jianghuKnex(tableName).jhInsert(record);
    }
    return {
      recoveryCode,
      pendingLoginId,
      userId: pendingLogin.userId,
      deviceId,
    };
  }

  // 绑定完成后继续原登录流程。
  async confirmMfaBind(actionData) {
    validateUtil.validate(actionDataScheme.confirmMfaBind, actionData);
    const { deviceId, pendingLoginId } = actionData;
    const pendingLogin = await this._getPendingLogin({ deviceId, pendingLoginId });
    const mfaRecord = await this._getEnabledMfaRecord(pendingLogin.userId);
    if (!this._isEnabledMfaRecord(mfaRecord)) {
      throw new BizError(errorInfoEnum.mfa_not_enabled);
    }
    return await this._completePendingLogin(pendingLogin);
  }

  // 已开启 MFA 的账号，在登录时走验证码校验。
  async verifyMfaLogin(actionData) {
    validateUtil.validate(actionDataScheme.verifyMfaLogin, actionData);
    const { deviceId, pendingLoginId, token } = actionData;
    const pendingLogin = await this._getPendingLogin({ deviceId, pendingLoginId });
    const mfaRecord = await this._getEnabledMfaRecord(pendingLogin.userId);
    if (!this._isEnabledMfaRecord(mfaRecord)) {
      throw new BizError(errorInfoEnum.mfa_not_enabled);
    }
    const { jianghuKnex } = this.app;
    const { encryptKey, tableName } = this._getMfaConfig();
    const secret = mfaUtil.decryptSecret({ encryptKey, encryptedSecret: mfaRecord.encryptedSecret });
    if (!mfaUtil.verifyTotpToken(secret, token)) {
      throw new BizError(errorInfoEnum.mfa_verification_failed);
    }
    await jianghuKnex(tableName, this.ctx)
      .where({ userId: pendingLogin.userId })
      .jhUpdate({ verifyAt: dayjs().format() });
    return await this._completePendingLogin(pendingLogin);
  }

  // 使用恢复码重置 MFA，并返回重新绑定状态。
  async resetMfaByRecoveryCode(actionData) {
    validateUtil.validate(actionDataScheme.resetMfaByRecoveryCode, actionData);
    const { deviceId, pendingLoginId, recoveryCode } = actionData;
    const { enableRecoveryCode } = this._getMfaConfig();
    if (!enableRecoveryCode) {
      throw new BizError(errorInfoEnum.mfa_recovery_code_not_enabled);
    }
    const pendingLogin = await this._getPendingLogin({ deviceId, pendingLoginId });
    const mfaRecord = await this._getEnabledMfaRecord(pendingLogin.userId);
    if (!this._isEnabledMfaRecord(mfaRecord) || !mfaRecord.recoveryCodeHash) {
      throw new BizError(errorInfoEnum.mfa_not_enabled);
    }
    if (mfaRecord.recoveryCodeHash !== mfaUtil.hashRecoveryCode(recoveryCode)) {
      throw new BizError(errorInfoEnum.mfa_recovery_code_error);
    }
    const { jianghuKnex } = this.app;
    const { tableName } = this._getMfaConfig();
    await jianghuKnex(tableName, this.ctx)
      .where({ userId: pendingLogin.userId })
      .jhUpdate({
        mfaEnabled: 0,
        encryptedSecret: null,
        recoveryCodeHash: null,
        resetAt: dayjs().format(),
      });
    delete pendingLogin.mfaSecret;
    await this._savePendingLogin(pendingLogin);
    return { needMfaBind: true, pendingLoginId, userId: pendingLogin.userId, deviceId };
  }

  // 根据当前登录状态，生成 MFA 相关的登录结果。
  async _buildLoginMfaResult({ user, deviceId, deviceType, needSetCookies }) {
    const { jianghuKnex } = this.app;
    const mfaConfig = this._getMfaConfig();
    const mfaRecord = await jianghuKnex(mfaConfig.viewName)
      .where({ userId: user.userId })
      .first();
    const pendingLoginId = idGenerateUtil.uuid(36);
    const pendingLogin = {
      pendingLoginId,
      userId: user.userId,
      deviceId,
      deviceType,
      needSetCookies,
      createdAt: dayjs().format(),
    };
    const cacheKey = mfaUtil.getPendingLoginCacheKey(this.app.config.appId, deviceId);
    await this.app.cacheStorage.set(cacheKey, JSON.stringify(pendingLogin));
    await this.app.cacheStorage.expire(cacheKey, mfaConfig.pendingExpireSeconds);

    if (this._isEnabledMfaRecord(mfaRecord)) {
      return { needMfaVerify: true, pendingLoginId, userId: user.userId, deviceId };
    }
    return { needMfaBind: true, pendingLoginId, userId: user.userId, deviceId };
  }

  // 读取 pending login，验证是否匹配当前 pendingLoginId。
  async _getPendingLogin({ deviceId, pendingLoginId }) {
    const cacheKey = mfaUtil.getPendingLoginCacheKey(this.app.config.appId, deviceId);
    const pendingLoginText = await this.app.cacheStorage.get(cacheKey);
    if (!pendingLoginText) {
      throw new BizError(errorInfoEnum.mfa_pending_login_expired);
    }
    const pendingLogin = JSON.parse(pendingLoginText);
    if (pendingLogin.pendingLoginId !== pendingLoginId) {
      throw new BizError(errorInfoEnum.mfa_pending_login_invalid);
    }
    return pendingLogin;
  }

  // 写回 pending login，继续使用设备维度缓存。
  async _savePendingLogin(pendingLogin) {
    const mfaConfig = this._getMfaConfig();
    const cacheKey = mfaUtil.getPendingLoginCacheKey(this.app.config.appId, pendingLogin.deviceId);
    await this.app.cacheStorage.set(cacheKey, JSON.stringify(pendingLogin));
    await this.app.cacheStorage.expire(cacheKey, mfaConfig.pendingExpireSeconds);
  }

  // 清理 pending login，登录完成后调用。
  async _clearPendingLogin(deviceId) {
    await this.app.cacheStorage.del(mfaUtil.getPendingLoginCacheKey(this.app.config.appId, deviceId));
  }

  _getMfaConfig() {
    const { appId, jianghuConfig = {} } = this.app.config;
    const { mfaServiceIssuer, mfaTableName, mfaSecretEncryptKey, enableMfaRecoveryCode, mfaPendingLoginExpireSeconds } = jianghuConfig;
    return {
      tableName: mfaTableName || '_user_mfa',
      viewName: '_view01_user_mfa',
      issuer: mfaServiceIssuer || appId,
      encryptKey: mfaSecretEncryptKey || `${appId}_mfa_secret_key`,
      enableRecoveryCode: enableMfaRecoveryCode !== false,
      pendingExpireSeconds: mfaPendingLoginExpireSeconds || 300,
    };
  }

  // 读取用户当前 MFA 记录。
  async _getEnabledMfaRecord(userId) {
    const { jianghuKnex } = this.app;
    const { viewName } = this._getMfaConfig();
    return await jianghuKnex(viewName)
      .where({ userId })
      .orderBy('id', 'desc')
      .first();
  }

  // 判断 MFA 记录是否处于可用状态。
  _isEnabledMfaRecord(mfaRecord) {
    return !!(mfaRecord && Number(mfaRecord.mfaEnabled) === 1 && mfaRecord.encryptedSecret);
  }

  // 完成 pending login，走 user service 的成功登录流程。
  async _completePendingLogin(pendingLogin) {
    const { jianghuKnex } = this.app;
    const user = await jianghuKnex('_view01_user')
      .where({ userId: pendingLogin.userId })
      .first();
    const loginResult = await this.ctx.service.user.handleLoginSuccess(
      user,
      pendingLogin.deviceId,
      pendingLogin.deviceType,
      pendingLogin.needSetCookies
    );
    await this._clearPendingLogin(pendingLogin.deviceId);
    return loginResult;
  }
}

module.exports = MfaService;