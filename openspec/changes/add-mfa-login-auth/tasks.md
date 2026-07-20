## 1. 后端 MFA 登录流程
- [x] 在 `app/service/user.js` 中实现或对齐 MFA 登录分支，使密码登录根据 `jianghuConfig.enableMfaVerification` 和用户 MFA 记录状态返回 `needMfaBind`、`needMfaVerify` 或直接 auth token。
- [x] 将当前半成品 MFA 假设替换为约定的 pending 登录缓存契约和独立 MFA 存储模型。
- [x] 确保 MFA 开启时，只有 MFA 成功才会创建正式 session。

## 2. MFA Service 和存储
- [x] 将 `app/service/mfaService.js` 对齐到 `_user_mfa` / `_view01_user_mfa` 存储模型。
- [x] 基于加密 secret 存储和恢复码 hash，实现 TOTP 绑定、验证、恢复码生成和恢复码校验。
- [x] 为绑定和验证流程补齐短生命周期 pending 登录缓存的读、写、删除辅助逻辑。

## 3. 配置和数据库结构
- [x] 新增或确认 `jianghuConfig` 中的 `enableMfaVerification`、`mfaServiceIssuer`、`mfaTableName`、`mfaSecretEncryptKey` 字段。
- [x] 如果 `_user_mfa` 和 `_view01_user_mfa` 不存在，或结构与方案不一致，补充数据库迁移或建表建视图支持。
- [x] 确认 MFA 存储结构包含绑定时间、验证时间、重置时间和操作审计字段。

## 4. 前端登录流程
- [x] 更新 `app/view/page/loginV4.html`，正确处理 `needMfaBind` 和 `needMfaVerify` 返回并跳转。
- [x] 新增 `mfaBind.html` 和 `mfaVerify.html`，或将已有页面对齐到本方案流程。
- [x] 确保恢复码只展示一次，并且验证页支持进入恢复码重置流程。

## 5. 验证
- [x] 增加测试覆盖 MFA 关闭登录、需要绑定登录、需要验证登录、恢复码重置和 pending 登录缓存过期。
- [x] 验证功能关闭时，现有非 MFA 登录行为保持不变。
