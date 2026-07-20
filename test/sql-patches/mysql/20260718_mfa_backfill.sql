-- MFA backfill patch for legacy deployments
-- Safe to run multiple times.
-- This MySQL patch backfills the MFA table/view and public MFA page/resource permissions.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `_user_mfa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `mfaEnabled` int(11) DEFAULT '0' COMMENT '是否启用MFA; 0: false; 1: true',
  `encryptedSecret` text COMMENT '加密后的TOTP secret',
  `recoveryCodeHash` varchar(255) DEFAULT NULL COMMENT '恢复码hash',
  `bindAt` varchar(255) DEFAULT NULL COMMENT '绑定时间',
  `verifyAt` varchar(255) DEFAULT NULL COMMENT '验证时间',
  `resetAt` varchar(255) DEFAULT NULL COMMENT '重置时间',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户MFA表;';

DROP VIEW IF EXISTS `_view01_user_mfa`;
CREATE VIEW `_view01_user_mfa` AS
SELECT
  `_user_mfa`.`id`,
  `_user_mfa`.`userId`,
  `_user_mfa`.`mfaEnabled`,
  `_user_mfa`.`encryptedSecret`,
  `_user_mfa`.`recoveryCodeHash`,
  `_user_mfa`.`bindAt`,
  `_user_mfa`.`verifyAt`,
  `_user_mfa`.`resetAt`,
  `_user_mfa`.`operation`,
  `_user_mfa`.`operationByUserId`,
  `_user_mfa`.`operationByUser`,
  `_user_mfa`.`operationAt`
FROM `_user_mfa`;

INSERT INTO `_page` (`pageId`, `pageName`, `pageType`, `sort`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT 'mfaBind', 'MFA绑定', '', '', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_page` WHERE `pageId` = 'mfaBind');

INSERT INTO `_page` (`pageId`, `pageName`, `pageType`, `sort`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT 'mfaVerify', 'MFA验证', '', '', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_page` WHERE `pageId` = 'mfaVerify');

INSERT INTO `_resource` (`accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT NULL, NULL, 'mfaBind', 'prepareMfaBind', '✅ MFA绑定-生成密钥', 'service', '{}', '{"service":"mfa","serviceFunction":"prepareMfaBind"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_resource` WHERE `pageId` = 'mfaBind' AND `actionId` = 'prepareMfaBind');

INSERT INTO `_resource` (`accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT NULL, NULL, 'mfaBind', 'bindMfa', 'MFA绑定', 'service', '{}', '{"service":"mfa","serviceFunction":"bindMfa"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_resource` WHERE `pageId` = 'mfaBind' AND `actionId` = 'bindMfa');

INSERT INTO `_resource` (`accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT NULL, NULL, 'mfaBind', 'confirmMfaBind', '✅ MFA绑定-确认保存后登录', 'service', '{}', '{"service":"mfa","serviceFunction":"confirmMfaBind"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_resource` WHERE `pageId` = 'mfaBind' AND `actionId` = 'confirmMfaBind');

INSERT INTO `_resource` (`accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT NULL, NULL, 'mfaVerify', 'verifyMfaLogin', '✅ MFA验证-完成登录', 'service', '{}', '{"service":"mfa","serviceFunction":"verifyMfaLogin"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_resource` WHERE `pageId` = 'mfaVerify' AND `actionId` = 'verifyMfaLogin');

INSERT INTO `_resource` (`accessControlTable`, `resourceHook`, `pageId`, `actionId`, `desc`, `resourceType`, `appDataSchema`, `resourceData`, `requestDemo`, `responseDemo`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT NULL, NULL, 'mfaVerify', 'resetMfaByRecoveryCode', '✅ MFA验证-恢复码重置', 'service', '{}', '{"service":"mfa","serviceFunction":"resetMfaByRecoveryCode"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_resource` WHERE `pageId` = 'mfaVerify' AND `actionId` = 'resetMfaByRecoveryCode');

INSERT INTO `_user_group_role_page` (`user`, `group`, `role`, `page`, `allowOrDeny`, `desc`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT '*', 'public', '*', 'mfaBind,mfaVerify', 'allow', 'MFA登录页; 开放给待验证用户;', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_user_group_role_page` WHERE `user` = '*' AND `group` = 'public' AND `role` = '*' AND `page` = 'mfaBind,mfaVerify');

INSERT INTO `_user_group_role_resource` (`user`, `group`, `role`, `resource`, `allowOrDeny`, `desc`, `operation`, `operationByUserId`, `operationByUser`, `operationAt`)
SELECT '*', 'public', '*', 'mfaBind.*,mfaVerify.*', 'allow', 'MFA登录resource, 开放给待验证用户', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM `_user_group_role_resource` WHERE `user` = '*' AND `group` = 'public' AND `role` = '*' AND `resource` = 'mfaBind.*,mfaVerify.*');
