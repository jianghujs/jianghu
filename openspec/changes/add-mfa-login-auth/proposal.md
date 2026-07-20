## Why

当前登录流程在用户名和密码校验通过后就会创建正式 session，这让需要更高安全等级的部署环境缺少可选的二次认证能力。本变更在保持现有应用默认行为不变的前提下，新增可配置的 MFA 登录认证能力。

## What Changes

- 新增 `jianghuConfig` 配置项，用于开启 MFA、配置 MFA 颁发者名称、选择 MFA 表名、配置 secret 加密密钥。
- 扩展密码登录流程：MFA 关闭时继续直接返回 auth token；MFA 开启时先返回待绑定或待验证状态，MFA 完成后再创建正式 session。
- 新增或补齐服务端 MFA 能力，包括 pending 登录态、TOTP 绑定、TOTP 验证、恢复码验证和 MFA 重置。
- 通过 `_user_mfa` 写入、`_view01_user_mfa` 读取来持久化 MFA 状态，只保存加密后的 TOTP secret 和恢复码 hash。
- 新增面向用户的 MFA 绑定页和验证页，并在登录页处理 `needMfaBind`、`needMfaVerify` 返回分支。
- 默认保持 `enableMfaVerification=false`，不影响现有登录行为。

## Capabilities

### New Capabilities
- `mfa-login-auth`：覆盖登录过程中的可配置 MFA 强制校验、MFA 绑定、MFA 验证、恢复码重置、pending 登录态和 MFA 持久化。

### Modified Capabilities
- 无。

## Impact

- 后端影响范围：`app/service/user.js`、新增或调整后的 MFA service 逻辑、登录 session/auth-token 创建、`cacheStorage`、MFA 数据库表和视图迁移脚本。
- 前端影响范围：`app/view/page/loginV4.html`、新增 `mfaBind.html`、新增 `mfaVerify.html`。
- 配置影响范围：`jianghuConfig.enableMfaVerification`、`jianghuConfig.mfaServiceIssuer`、`jianghuConfig.mfaTableName`、`jianghuConfig.mfaSecretEncryptKey`。
- 安全影响范围：TOTP secret 必须加密存储，恢复码必须以 hash 存储；当 MFA 开启时，只有 MFA 成功后才能创建正式 session。
