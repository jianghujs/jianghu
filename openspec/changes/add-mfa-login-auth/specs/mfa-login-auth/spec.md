## ADDED Requirements

### Requirement: MFA 登录默认关闭且可选
系统 MUST 在 MFA 认证关闭时保持现有用户名密码登录流程不变。系统 MUST 仅在 `jianghuConfig` 中启用 `enableMfaVerification` 后，才在密码校验通过后要求 MFA。

#### Scenario: MFA 关闭时正常登录成功
- **WHEN** 用户提交有效的用户名和密码，且 `enableMfaVerification` 为 `false`
- **THEN** 系统 MUST 立即创建正式 session 和 auth token
- **AND** 系统 MUST NOT 要求进入 MFA 绑定页或 MFA 验证页

#### Scenario: MFA 开启时登录需要第二步
- **WHEN** 用户提交有效的用户名和密码，且 `enableMfaVerification` 为 `true`
- **THEN** 系统 MUST 返回绑定或验证状态，而不是立即创建正式 session

### Requirement: 系统 MUST 支持未绑定用户的 MFA 绑定
当 MFA 认证开启，且用户还没有启用中的 MFA 记录时，系统 MUST 启动绑定流程。绑定流程 MUST 生成 TOTP 设置信息，接收 6 位验证码，并把最终 MFA secret 持久化到独立 MFA 存储中。

#### Scenario: 未绑定 MFA 的用户进入绑定流程
- **WHEN** 密码校验成功，且用户没有启用中的 MFA 记录
- **THEN** 系统 MUST 返回需要绑定的状态，并在 cache 中写入短生命周期 pending 登录记录

#### Scenario: 用户完成 MFA 绑定
- **WHEN** 用户在绑定流程中提交有效的 6 位 TOTP 验证码
- **THEN** 系统 MUST 将该用户 MFA 标记为已启用
- **AND** 系统 MUST 在 MFA 存储中保存加密后的 secret 和恢复码 hash
- **AND** 系统 MUST 只展示一次恢复码

### Requirement: 系统 MUST 支持已绑定用户的 MFA 验证
当 MFA 认证开启，且用户已有启用中的 MFA 记录时，系统 MUST 启动验证流程。验证流程 MUST 接收 6 位 TOTP 验证码，并且只能在验证成功后创建正式 session。

#### Scenario: 已绑定 MFA 的用户进入验证流程
- **WHEN** 密码校验成功，且用户已有启用中的 MFA 记录
- **THEN** 系统 MUST 返回需要验证的状态，并在 cache 中写入短生命周期 pending 登录记录

#### Scenario: 用户完成 MFA 验证
- **WHEN** 用户在验证流程中提交有效的 6 位 TOTP 验证码
- **THEN** 系统 MUST 创建正式 session 和 auth token
- **AND** 系统 MUST 从 cache 中删除 pending 登录记录

### Requirement: 系统 MUST 支持基于恢复码的 MFA 重置
系统 MUST 在 MFA 绑定成功时生成恢复码。系统 MUST 只保存恢复码 hash。系统 MUST 允许用户使用有效恢复码使当前 MFA secret 失效，并重新进入绑定流程。

#### Scenario: 用户绑定后收到恢复码
- **WHEN** MFA 绑定成功
- **THEN** 系统 MUST 生成恢复码
- **AND** 系统 MUST 只向用户展示一次恢复码
- **AND** 系统 MUST 只保存恢复码 hash

#### Scenario: 用户使用恢复码重置 MFA
- **WHEN** 用户提交有效恢复码
- **THEN** 系统 MUST 清空现有 MFA secret 和恢复码 hash
- **AND** 系统 MUST 要求用户重新绑定 MFA

### Requirement: 系统 MUST 使用独立存储持久化 MFA 状态
系统 MUST 使用独立 MFA 表持久化 MFA 状态，并且 MUST 通过业务视图读取。存储模型 MUST 包含启用标记、加密 secret、恢复码 hash、绑定时间、验证时间和重置时间。

#### Scenario: MFA 状态独立于用户记录存储
- **WHEN** 系统绑定、验证或重置 MFA
- **THEN** 系统 MUST 更新 MFA 存储记录，而不是更新基础用户记录

#### Scenario: MFA 读取使用业务视图
- **WHEN** 系统需要检查用户是否启用 MFA
- **THEN** 系统 MUST 通过 MFA 读取视图查询

### Requirement: 系统 MUST 支持可配置的 MFA 设置
系统 MUST 提供配置项，用于开启 MFA 认证、设置 MFA issuer 展示名称、选择 MFA 表名，以及配置 MFA secret 加密密钥。

#### Scenario: 部署使用默认 MFA 设置
- **WHEN** 未提供任何 MFA 专用配置
- **THEN** 系统 MUST 默认关闭 MFA 认证
- **AND** 系统 MUST 使用默认 MFA 表名和 issuer fallback 值
