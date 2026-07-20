'use strict';

const crypto = require('crypto');
const speakeasy = require('speakeasy');

function getPendingLoginCacheKey(appId, deviceId) {
  return `${appId}_${deviceId}_mfaPendingLogin`;
}

function verifyTotpToken(secret, token) {
  return speakeasy.totp.verify({
    secret: String(secret || ''),
    encoding: 'base32',
    token: String(token || ''),
    window: 1,
  });
}

function encryptSecret({ encryptKey, secret }) {
  const key = crypto.createHash('sha256').update(encryptKey).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([ cipher.update(secret, 'utf8'), cipher.final() ]);
  const authTag = cipher.getAuthTag();
  return [ iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64') ].join(':');
}

function decryptSecret({ encryptKey, encryptedSecret }) {
  const [ ivText, authTagText, encryptedText ] = String(encryptedSecret || '').split(':');
  const key = crypto.createHash('sha256').update(encryptKey).digest();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivText, 'base64'));
  decipher.setAuthTag(Buffer.from(authTagText, 'base64'));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'base64')),
    decipher.final(),
  ]).toString('utf8');
}

function generateRecoveryCode(seed) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = seed
    ? crypto.createHash('sha256').update(String(seed)).digest()
    : crypto.randomBytes(16);
  let raw = '';
  for (const byte of bytes.subarray(0, 16)) {
    raw += alphabet[byte % alphabet.length];
  }
  return String(raw).match(/.{1,4}/g).join('-');
}

function hashRecoveryCode(recoveryCode) {
  const normalizedRecoveryCode = String(recoveryCode || '').replace(/[^0-9A-Z]/gi, '').toUpperCase();
  return crypto.createHash('sha256').update(normalizedRecoveryCode).digest('hex');
}

module.exports = {
  getPendingLoginCacheKey,
  verifyTotpToken,
  encryptSecret,
  decryptSecret,
  generateRecoveryCode,
  hashRecoveryCode,
};