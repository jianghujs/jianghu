'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
const dayjs = require('dayjs');
// ========================================常用 require end=============================================

const crypto = require('crypto');
const QRCode = require('qrcode');
const { authenticator } = require('otplib');
authenticator.options = {
  step: 30,
  digits: 6,
  algorithm: 'sha1',
  window: [1, 0, 1], // 接受前后1个时间步
};

class MfaService extends Service {

  /**
   * 获取用户的secretKey，生成二维码
   * @param {string} userId - 用户ID
   * @returns {object} 包含challengeId、qrCodeUrl、qrCodeImage等信息
   */
  async getSecretKey() {
    const { ctx, app } = this;
    const { jianghuKnex, config } = app;
    const { userTableName } = config.jianghuConfig;
    const { actionData } = ctx.request.body.appData;
    const { userId } = actionData;
    
    try {
      // 检查用户是否已经绑定了MFA
      const existingUser = await jianghuKnex(userTableName)
        .where({ userId })
        .first();
      
      if (existingUser && existingUser.secretKey) {
        return {
          success: false,
          errorType: 'ALREADY_BOUND',
          message: '用户已经绑定了MFA，不需要再次绑定'
        };
      }

      // 生成新的secretKey
      const secretKey = authenticator.generateSecret();
      
      // 生成challengeId
      const challengeId = crypto.randomUUID();
      
      // 将userId, secretKey存入cacheStorage并设置5分钟过期时间
      const cacheData = {
        userId,
        secretKey,
        retryCount: 0,
        createdAt: Date.now()
      };
      
      const { cacheStorage } = app;
      await cacheStorage.set(`mfa_bind_${challengeId}`, JSON.stringify(cacheData));
      await cacheStorage.expire(`mfa_bind_${challengeId}`, 300);
      
      // 生成TOTP URL
      const issuer = config.jianghuConfig.mfaServiceIssuer;
      const otpUrl = authenticator.keyuri(userId, issuer, secretKey);
      
      // 生成二维码图片（base64格式）
      const qrCodeImage = await QRCode.toDataURL(otpUrl);
      
      return {
        success: true,
        challengeId,
        qrCodeUrl: otpUrl,
        qrCodeImage,
        secretKey,
        message: '请在Microsoft Authenticator或其他TOTP应用中扫描二维码进行绑定'
      };
      
    } catch (error) {
      ctx.logger.error('获取secretKey失败:', error);
      return {
        success: false,
        errorType: 'SYSTEM_ERROR',
        message: '系统错误，请稍后重试'
      };
    }
  }

  /**
   * 验证用户输入的MFA验证码
   * @param {string} challengeId - 挑战ID
   * @param {string} mfaCode - MFA验证码
   * @returns {object} 验证结果
   */
  async verifyMfaCode() {
    const { ctx, app } = this;
    const { jianghuKnex, config } = app;
    const { userTableName } = config.jianghuConfig;
    const { actionData } = ctx.request.body.appData;
    const { challengeId, mfaCode } = actionData;
    
    try {
      // 获取缓存数据
      const { cacheStorage } = app;
      const cacheDataStr = await cacheStorage.get(`mfa_bind_${challengeId}`);
      const cacheData = cacheDataStr ? JSON.parse(cacheDataStr) : null;
      
      // 调用mfaVerification函数进行验证
      const verificationResult = await this.mfaVerification(challengeId, mfaCode, cacheData);
      
      // 根据cacheAction更新缓存
      if (verificationResult.cacheAction === 'UPDATE_RETRY' && cacheData) {
        cacheData.retryCount = verificationResult.newRetryCount;
        await cacheStorage.set(`mfa_bind_${challengeId}`, JSON.stringify(cacheData));
        await cacheStorage.expire(`mfa_bind_${challengeId}`, 300);
      } else if (verificationResult.cacheAction === 'DELETE_CACHE') {
        await cacheStorage.del(`mfa_bind_${challengeId}`);
      }
      
      if (!verificationResult.isSuccess) {
        // 验证失败的情况
        return {
          success: false,
          errorType: verificationResult.errorType,
          message: verificationResult.errorReason
        };
      }
      
      // 验证成功，将secretKey更新到用户表
      const { userId, secretKey } = verificationResult;
      
      await jianghuKnex(userTableName, ctx)
        .where({ userId })
        .jhUpdate({ secretKey });
      
      return {
        success: true,
        message: 'MFA绑定成功'
      };
      
    } catch (error) {
      ctx.logger.error('验证MFA码失败:', error);
      return {
        success: false,
        errorType: 'SYSTEM_ERROR',
        message: '系统错误，请稍后重试'
      };
    }
  }

  /**
   * MFA验证的核心函数
   * @param {string} challengeId - 挑战ID
   * @param {string} mfaCode - MFA验证码
   * @param {object} cacheData - 缓存数据（可选，如果不提供则从mfaCache中获取）
   * @returns {object} 验证结果，包含cacheAction指令
   */
  async mfaVerification(challengeId, mfaCode, cacheData = null) {
    try {
      // 如果没有传入cacheData，则从cacheStorage中获取
      if (!cacheData) {
        const { cacheStorage } = this.app;
        const cacheDataStr = await cacheStorage.get(`mfa_bind_${challengeId}`);
        cacheData = cacheDataStr ? JSON.parse(cacheDataStr) : null;
      }
      
      if (!cacheData) {
        return {
          isSuccess: false,
          errorType: 'CHALLENGE_EXPIRED',
          errorReason: 'challengeId已过期，请刷新二维码重新绑定',
          userId: null,
          secretKey: null,
          cacheAction: 'NO_ACTION'
        };
      }
      
      const { userId, secretKey, retryCount } = cacheData;
      
      // 验证MFA码是否正确
      const isValid = authenticator.verify({
        token: mfaCode,
        secret: secretKey,
        window: 2 // 允许时间窗口误差
      });
      
      if (isValid) {
        return {
          isSuccess: true,
          errorType: null,
          errorReason: null,
          userId,
          secretKey,
          cacheAction: 'DELETE_CACHE'
        };
      } else {
        // MFA码不正确，增加重试次数
        const newRetryCount = retryCount + 1;
        
        if (newRetryCount >= 5) {
          return {
            isSuccess: false,
            errorType: 'MAX_RETRY_EXCEEDED',
            errorReason: '验证码输错超过5次，请刷新二维码重新绑定',
            userId,
            secretKey,
            cacheAction: 'DELETE_CACHE'
          };
        } else {
          return {
            isSuccess: false,
            errorType: 'INVALID_CODE',
            errorReason: `验证码错误，请重新输入（剩余尝试次数：${5 - newRetryCount}）`,
            userId,
            secretKey,
            cacheAction: 'UPDATE_RETRY',
            newRetryCount
          };
        }
      }
      
    } catch (error) {
      this.ctx.logger.error('MFA验证失败:', error);
      return {
        isSuccess: false,
        errorType: 'SYSTEM_ERROR',
        errorReason: '系统错误，请稍后重试',
        userId: null,
        secretKey: null,
        cacheAction: 'NO_ACTION'
      };
    }
  }

  /**
   * 验证MFA登录（用于登录时的MFA验证）
   * @param {string} challengeId - 挑战ID
   * @param {string} mfaCode - MFA验证码
   * @param {object} cacheData - 登录缓存数据
   * @returns {object} 验证结果，包含cacheAction指令
   */
  async verifyMfaLogin(challengeId, mfaCode, cacheData) {
    const { ctx } = this;
    
    try {
      if (!cacheData) {
        return {
          success: false,
          errorType: 'CHALLENGE_EXPIRED',
          message: '验证码已过期，请重新登录',
          cacheAction: 'NO_ACTION'
        };
      }

      // 从登录缓存中获取用户信息和secretKey
      const { user } = cacheData;
      const secretKey = user.secretKey;
      const retryCount = cacheData.retryCount || 0;

      if (!secretKey) {
        return {
          success: false,
          errorType: 'NO_MFA_KEY',
          message: '用户未绑定MFA密钥',
          cacheAction: 'DELETE_CACHE'
        };
      }

      // 验证MFA码是否正确
      const isValid = authenticator.verify({
        token: mfaCode,
        secret: secretKey,
        window: 2 // 允许时间窗口误差
      });

      if (isValid) {
        return {
          success: true,
          user: user,
          deviceId: cacheData.deviceId,
          deviceType: cacheData.deviceType,
          cacheAction: 'DELETE_CACHE'
        };
      } else {
        // MFA码不正确，增加重试次数
        const newRetryCount = retryCount + 1;
        
        if (newRetryCount >= 5) {
          return {
            success: false,
            errorType: 'MAX_RETRY_EXCEEDED',
            message: '验证码输错次数过多，请重新登录',
            cacheAction: 'DELETE_CACHE'
          };
        } else {
          return {
            success: false,
            errorType: 'INVALID_CODE',
            message: `验证码错误，请重新输入（剩余尝试次数：${5 - newRetryCount}）`,
            cacheAction: 'UPDATE_RETRY',
            newRetryCount
          };
        }
      }
      
    } catch (error) {
      ctx.logger.error('MFA登录验证失败:', error);
      return {
        success: false,
        errorType: 'SYSTEM_ERROR',
        message: '系统错误，请稍后重试',
        cacheAction: 'NO_ACTION'
      };
    }
  }
}

module.exports = MfaService;