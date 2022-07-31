'use strict';

const { tableEnum } = require('../../constant/constant');
const geoip = require('geoip-lite');

module.exports = {

  async saveRequestLogForResource(ctx) {
    const { app, body: responseBody, request, packageResource, userInfo } = ctx;
    const { ignoreListOfResourceRequestLog = [] } = app.config.jiangHuConfig;
    const { resourceRequestLogRecordUserId } = app.config.jiangHuConfig.compatibleConfig;
    const { resourceId } = packageResource;
    if (ignoreListOfResourceRequestLog.indexOf(resourceId) > -1) {
      return;
    }

    const requestBody = Object.assign({}, request.body);
    const { userId, deviceId } = userInfo.user || {};
    const userIp = ctx.header['x-real-ip'] || ctx.request.ip || '';
    const { jianghuKnex } = app;
    const { packageId } = requestBody;
    const { status: responseStatus } = responseBody;
    const responseBodyString = JSON.stringify(responseBody);
    const userAgent = requestBody.appData.userAgent || '';
    const geo = geoip.lookup(userIp);
    let userIpRegion = '';
    if (geo) { userIpRegion = `${geo.country}|${geo.region}|${geo.timezone}|${geo.city}|${geo.ll}|${geo.range}`; }
    const requestBodyString = JSON.stringify(requestBody);

    const insertData = {
      packageId, resourceId, deviceId,
      userIp, userAgent, userIpRegion,
      requestBody: requestBodyString,
      responseBody: responseBodyString,
      responseStatus,
    };

    // 适配代码: 3.0 版本删除
    if (resourceRequestLogRecordUserId === true) {
      insertData.userId = userId;
    }

    await jianghuKnex(tableEnum._resource_request_log)
      .insert(insertData);
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

    await jianghuKnex(tableEnum._resource).where({ pageId, actionId }).update({ requestDemo, responseDemo });
  },
};

