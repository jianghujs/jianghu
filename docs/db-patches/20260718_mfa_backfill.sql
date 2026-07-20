-- MFA backfill patch for legacy deployments
-- Safe to run multiple times.
-- This SQLite-oriented patch backfills the MFA table/view and public MFA page/resource permissions.

BEGIN;

CREATE TABLE IF NOT EXISTS _user_mfa (
  id integer NOT NULL,
  userId text(255),
  mfaEnabled integer DEFAULT 0,
  encryptedSecret text,
  recoveryCodeHash text(255),
  bindAt text(255),
  verifyAt text(255),
  resetAt text(255),
  operation text(255),
  operationByUserId text(255),
  operationByUser text(255),
  operationAt text(255),
  PRIMARY KEY (id)
);

DROP VIEW IF EXISTS _view01_user_mfa;
CREATE VIEW _view01_user_mfa AS SELECT
  _user_mfa.id,
  _user_mfa.userId,
  _user_mfa.mfaEnabled,
  _user_mfa.encryptedSecret,
  _user_mfa.recoveryCodeHash,
  _user_mfa.bindAt,
  _user_mfa.verifyAt,
  _user_mfa.resetAt,
  _user_mfa.operation,
  _user_mfa.operationByUserId,
  _user_mfa.operationByUser,
  _user_mfa.operationAt
FROM _user_mfa;

INSERT INTO _page (pageId, pageName, pageType, sort, operation, operationByUserId, operationByUser, operationAt)
SELECT 'mfaBind', 'MFA Bind', '', '', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _page WHERE pageId = 'mfaBind');

INSERT INTO _page (pageId, pageName, pageType, sort, operation, operationByUserId, operationByUser, operationAt)
SELECT 'mfaVerify', 'MFA Verify', '', '', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _page WHERE pageId = 'mfaVerify');

INSERT INTO _resource (accessControlTable, resourceHook, pageId, actionId, desc, resourceType, appDataSchema, resourceData, requestDemo, responseDemo, operation, operationByUserId, operationByUser, operationAt)
SELECT NULL, NULL, 'mfaBind', 'prepareMfaBind', 'MFA bind prepare secret', 'service', '{}', '{"service":"mfa","serviceFunction":"prepareMfaBind"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _resource WHERE pageId = 'mfaBind' AND actionId = 'prepareMfaBind');

INSERT INTO _resource (accessControlTable, resourceHook, pageId, actionId, desc, resourceType, appDataSchema, resourceData, requestDemo, responseDemo, operation, operationByUserId, operationByUser, operationAt)
SELECT NULL, NULL, 'mfaBind', 'bindMfa', 'MFA bind recovery code', 'service', '{}', '{"service":"mfa","serviceFunction":"bindMfa"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _resource WHERE pageId = 'mfaBind' AND actionId = 'bindMfa');

INSERT INTO _resource (accessControlTable, resourceHook, pageId, actionId, desc, resourceType, appDataSchema, resourceData, requestDemo, responseDemo, operation, operationByUserId, operationByUser, operationAt)
SELECT NULL, NULL, 'mfaBind', 'confirmMfaBind', 'MFA bind confirm login', 'service', '{}', '{"service":"mfa","serviceFunction":"confirmMfaBind"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _resource WHERE pageId = 'mfaBind' AND actionId = 'confirmMfaBind');

INSERT INTO _resource (accessControlTable, resourceHook, pageId, actionId, desc, resourceType, appDataSchema, resourceData, requestDemo, responseDemo, operation, operationByUserId, operationByUser, operationAt)
SELECT NULL, NULL, 'mfaVerify', 'verifyMfaLogin', 'MFA verify login', 'service', '{}', '{"service":"mfa","serviceFunction":"verifyMfaLogin"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _resource WHERE pageId = 'mfaVerify' AND actionId = 'verifyMfaLogin');

INSERT INTO _resource (accessControlTable, resourceHook, pageId, actionId, desc, resourceType, appDataSchema, resourceData, requestDemo, responseDemo, operation, operationByUserId, operationByUser, operationAt)
SELECT NULL, NULL, 'mfaVerify', 'resetMfaByRecoveryCode', 'MFA reset by recovery code', 'service', '{}', '{"service":"mfa","serviceFunction":"resetMfaByRecoveryCode"}', NULL, NULL, 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _resource WHERE pageId = 'mfaVerify' AND actionId = 'resetMfaByRecoveryCode');

INSERT INTO _user_group_role_page (user, "group", role, page, allowOrDeny, desc, operation, operationByUserId, operationByUser, operationAt)
SELECT '*', 'public', '*', 'mfaBind,mfaVerify', 'allow', 'MFA login pages for pending users', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _user_group_role_page WHERE user = '*' AND "group" = 'public' AND role = '*' AND page = 'mfaBind,mfaVerify');

INSERT INTO _user_group_role_resource (user, "group", role, resource, allowOrDeny, desc, operation, operationByUserId, operationByUser, operationAt)
SELECT '*', 'public', '*', 'mfaBind.*,mfaVerify.*', 'allow', 'MFA login resources for pending users', 'insert', NULL, NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM _user_group_role_resource WHERE user = '*' AND "group" = 'public' AND role = '*' AND resource = 'mfaBind.*,mfaVerify.*');

COMMIT;
