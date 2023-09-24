'use strict';

module.exports = {

  async saveRequestLogForResource(ctx) {
    const { app, body: responseBody, request, packageResource, userInfo } = ctx;
    const { ignoreListOfResourceLogRecord, enableResourceLogRecord } = app.config.jianghuConfig;
    const { resourceId } = packageResource;
    // Tip: 敏感resource不打日志
    if (ignoreListOfResourceLogRecord.indexOf(resourceId) > -1) {
      return;
    }

    const requestBody = Object.assign({}, request.body);
    const { userId, deviceId } = userInfo.user || {};
    const userIp = ctx.header['x-real-ip'] || ctx.request.ip || '';
    const { jianghuKnex } = app;
    const { packageId } = requestBody;
    const { status: responseStatus } = responseBody;
    let responseBodyString = JSON.stringify(responseBody);
    const userAgent = requestBody.appData.userAgent || '';
    let requestBodyString = JSON.stringify(requestBody);

    // 大文本
    if (requestBodyString.length > 8144) {
      requestBodyString = '请求文本太大!';
    }
    if (requestBodyString.length > 8144) {
      responseBodyString = '响应文本太大!';
    }
    const insertData = {
      packageId, resourceId, deviceId, userId,
      userIp, userAgent,
      requestBody: requestBodyString,
      responseBody: responseBodyString,
      responseStatus,
    };

    if (enableResourceLogRecord === true) {
      app.getLogger('resourceLogger').info(insertData);
    }
    // await jianghuKnex('_resource_request_log')
    //   .insert(insertData);
  },

  async updateRequestDemoAndResponseDemo(ctx) {
    const { body: responseBody, app, request } = ctx;
    const { jianghuKnex } = app;
    const requestBody = Object.assign({}, request.body);
    const { pageId, actionId } = requestBody.appData;

    // 如果 request.appData.param 数据比较大 ==> 剔除params
    const requestBodyTmp = JSON.parse(JSON.stringify(requestBody));
    if (requestBodyTmp.appData.actionData && JSON.stringify(requestBodyTmp.appData.actionData).length > 2048) {
      delete requestBodyTmp.appData.actionData;
    }
    const requestDemo = JSON.stringify(requestBodyTmp);

    // 如果 response data数据比较大 ==> 剔除data
    const responseBodyTmp = JSON.parse(JSON.stringify(responseBody));
    if (responseBodyTmp.appData && JSON.stringify(responseBodyTmp.appData).length > 2048) {
      delete responseBodyTmp.appData;
    }
    const responseDemo = JSON.stringify(responseBodyTmp);

    await jianghuKnex('_resource').where({ pageId, actionId }).update({ requestDemo, responseDemo });
  },
};

