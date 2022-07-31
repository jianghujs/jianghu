'use strict';

const { ValidateError, errorInfoEnum } = require('../constant/error');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
addFormats(ajv);

/**
 * [ajv 使用](https://github.com/ajv-validator/ajv)
 * [ajv 文档](https://ajv.js.org/api.html) [validation 文档](https://chinabigpan.github.io/ajv-docs-zh-cn/routes/basic/validation.html)
 * [ajv 使用002](https://www.cnblogs.com/qiyc/p/15200477.html)
 * @param rule
 * @param schema
 * @param data
 * @param checkColumnName
 */
module.exports.validate = (schema, data, checkColumnName = "数据") => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const errorReasonSupplement = validate.errors
      .map(
        (x) =>
          `${x.instancePath} ${x.message} ${JSON.stringify(x.params || {})}`
      )
      .join("; ");
    let { errorCode, errorReason } = errorInfoEnum.request_body_invalid;
    if (checkColumnName) {
      errorReason = `请求${checkColumnName}不符合规范`;
    }
    throw new ValidateError({ errorCode, errorReason, errorReasonSupplement });
  }
};

