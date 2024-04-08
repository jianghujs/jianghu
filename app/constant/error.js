'use strict';

class ValidateError extends Error {
  constructor({ errorCode, errorReason, errorReasonSupplement }) {
    super(JSON.stringify({ errorCode, errorReason, errorReasonSupplement }));
    this.name = 'ValidateError';
    this.errorCode = errorCode;
    this.errorReason = errorReason;
    this.errorReasonSupplement = errorReasonSupplement;
  }
}

class BizError extends Error {
  constructor({ errorCode, errorReason, errorReasonSupplement }) {
    super(JSON.stringify({ errorCode, errorReason, errorReasonSupplement }));
    this.name = 'BizError';
    this.errorCode = errorCode;
    this.errorReason = errorReason;
    this.errorReasonSupplement = errorReasonSupplement;
  }
}

const errorInfoEnum = Object.freeze({
  // =============================request error: 请求错误===========================================
  request_body_invalid: {
    errorCode: 'request_body_invalid',
    errorReason: '请求body不符合规范',
  },
  request_data_invalid: {
    errorCode: 'request_data_invalid',
    errorReason: '请求data不符合规范',
  },
  request_repeated: {
    errorCode: 'request_repeated',
    errorReason: '重复的请求',
  },
  request_token_expired: {
    errorCode: 'request_token_expired',
    errorReason: 'token失效',
  },
  request_token_invalid: {
    errorCode: 'request_token_invalid',
    errorReason: '无效token',
  },
  request_app_forbidden: {
    errorCode: 'request_app_forbidden',
    errorReason: '你没有这个应用的访问权限',
  },
  request_group_forbidden: {
    errorCode: 'request_group_forbidden',
    errorReason: '你不在当前群内',
  },
  request_rate_limit_exceeded: {
    errorCode: 'request_rate_limit_exceeded',
    errorReason: '请求过于频繁，请稍后再试',
  },

  // =============================server error: 服务器内部错误===========================================
  server_error: { errorCode: 'server_error', errorReason: '服务器开小差了' },

  // =============================resource error: resource请求错误===========================================
  resource_sql_operation_invalid: {
    errorCode: 'resource_sql_operation_invalid',
    errorReason: '无效的operation !',
  },
  resource_forbidden: {
    errorCode: 'resource_forbidden',
    errorReason: '无执行权限',
  },
  resource_not_found: {
    errorCode: 'resource_not_found',
    errorReason: '协议不存在',
  },
  resource_not_support: {
    errorCode: 'resource_not_support',
    errorReason: '协议不支持',
  },
  resource_sql_missing_params: {
    errorCode: 'resource_sql_missing_params',
    errorReason: '缺少必填参数',
  },
  resource_sql_where_options_invalid: {
    errorCode: 'resource_sql_where_options_invalid',
    errorReason: '无效的 whereOptions 参数',
  },
  resource_sql_need_condition: {
    errorCode: 'resource_sql_need_condition',
    errorReason: '更新或删除数据需要提供数据条件',
  },
  resource_sql_unique_check_fail: {
    errorCode: 'resource_sql_unique_check_fail',
    errorReason: '数据已存在! 请勿重复操作。',
  },
  resource_sql_exception_of_update_and_delete: {
    errorCode: 'resource_sql_exception_of_update_and_delete',
    errorReason: 'Sql操作异常! 请追加where条件。',
  },
  resource_service_not_found: {
    errorCode: 'resource_service_not_found',
    errorReason: '接口不存在',
  },
  resource_service_method_not_found: {
    errorCode: 'resource_service_method_not_found',
    errorReason: '接口(方法)不存在',
  },

  // =============================page error: 数据错误===========================================
  page_forbidden: { errorCode: 'page_forbidden', errorReason: '无访问权限' },
  page_not_found: { errorCode: 'page_not_found', errorReason: '页面不存在' },

  // =============================data error: 数据错误===========================================
  data_not_found: { errorCode: 'data_not_found', errorReason: '数据不存在' },

  // =============================user error: 用户错误===========================================
  user_not_exist: {
    errorCode: 'request_user_not_exist',
    errorReason: '用户不存在',
  },
  user_password_error: {
    errorCode: 'user_password_error',
    errorReason: '用户名 或 密码错误, 请重新输入!',
  },
  user_banned: {
    errorCode: 'user_banned',
    errorReason: '账号被封禁! 请联系管理员。',
  },
  user_status_error: {
    errorCode: 'user_status_error',
    errorReason: '用户状态异常! ',
  },
  user_password_reset_old_error: {
    errorCode: 'user_password_reset_old_error',
    errorReason: '旧密码错误, 请重新输入!',
  },
  user_password_reset_same_error: {
    errorCode: 'user_password_reset_same_error',
    errorReason: '新旧密码不能一样, 请重新输入!',
  },
  wx_login_config_error: {
    errorCode: 'wx_login_config_error',
    errorReason: '微信登录配置异常',
  },
  wx_login_error: {
    errorCode: 'wx_login_error',
    errorReason: '微信登录异常',
  },

  // =============================file: 文件错误===========================================
  file_directory: { errorCode: 'file_directory', errorReason: '文件目录异常' },
  file_please_select_file: {
    errorCode: 'file_please_upload_file',
    errorReason: '请选择文件',
  },
  file_damaged: {
    errorCode: 'file_damaged',
    errorReason: '上传失败! 文件损坏!',
  },
  file_is_incomplete: {
    errorCode: 'file_is_incomplete',
    errorReason: '文件不完整, 请重新上传!',
  },
  file_buffer_is_null: {
    errorCode: 'file_buffer_is_null',
    errorReason: '文件是空的!',
  },
  file_base64_is_null: {
    errorCode: 'file_base64_is_null',
    errorReason: '文件是空的!',
  },
  file_not_found: {
    errorCode: 'file_not_found',
    errorReason: '文件不存在!',
  },
});

module.exports = {
  ValidateError,
  BizError,
  errorInfoEnum,
};
