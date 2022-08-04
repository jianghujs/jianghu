/*
 Navicat Premium Data Transfer

 Source Server         : oracle-local
 Source Server Type    : Oracle
 Source Server Version : 110200
 Source Host           : localhost:1521
 Source Schema         : ROOT

 Target Server Type    : Oracle
 Target Server Version : 110200
 File Encoding         : 65001

 Date: 04/08/2022 22:59:14
*/


-- ----------------------------
-- Table structure for _cache
-- ----------------------------
DROP TABLE "ROOT"."_cache";
CREATE TABLE "ROOT"."_cache" (
  "id" NUMBER(11,0) NOT NULL,
  "userId" NVARCHAR2(255) NOT NULL,
  "content" NCLOB,
  "recordStatus" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_cache"."userId" IS '用户Id';
COMMENT ON COLUMN "ROOT"."_cache"."content" IS '缓存数据';
COMMENT ON COLUMN "ROOT"."_cache"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_cache"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_cache"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_cache"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_cache" IS '缓存表';

-- ----------------------------
-- Records of _cache
-- ----------------------------
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _constant
-- ----------------------------
DROP TABLE "ROOT"."_constant";
CREATE TABLE "ROOT"."_constant" (
  "id" NUMBER(11,0) NOT NULL,
  "constantKey" NVARCHAR2(255),
  "constantType" NVARCHAR2(255),
  "desc" NVARCHAR2(255),
  "constantValue" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_constant"."constantType" IS '常量类型; object, array';
COMMENT ON COLUMN "ROOT"."_constant"."desc" IS '描述';
COMMENT ON COLUMN "ROOT"."_constant"."constantValue" IS '常量内容; object, array';
COMMENT ON COLUMN "ROOT"."_constant"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_constant"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_constant"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_constant"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_constant" IS '常量表; 软删除未启用;';

-- ----------------------------
-- Records of _constant
-- ----------------------------
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _file
-- ----------------------------
DROP TABLE "ROOT"."_file";
CREATE TABLE "ROOT"."_file" (
  "id" NUMBER(11,0) NOT NULL,
  "fileId" NVARCHAR2(255),
  "fileDirectory" NVARCHAR2(255),
  "filename" NVARCHAR2(255),
  "filenameStorage" NVARCHAR2(255),
  "downloadPath" NVARCHAR2(255),
  "fileType" NVARCHAR2(255),
  "fileDesc" NVARCHAR2(255),
  "binarySize" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_file"."fileId" IS 'fileId';
COMMENT ON COLUMN "ROOT"."_file"."fileDirectory" IS '文件保存路径;';
COMMENT ON COLUMN "ROOT"."_file"."filename" IS '文件名;';
COMMENT ON COLUMN "ROOT"."_file"."filenameStorage" IS '文件保存名';
COMMENT ON COLUMN "ROOT"."_file"."downloadPath" IS '文件下载路径';
COMMENT ON COLUMN "ROOT"."_file"."fileType" IS '文件类型;(预留字段)';
COMMENT ON COLUMN "ROOT"."_file"."fileDesc" IS '文件描述';
COMMENT ON COLUMN "ROOT"."_file"."binarySize" IS '文件二进制大小';
COMMENT ON COLUMN "ROOT"."_file"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_file"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_file"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_file"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_file" IS '文件表; 软删除未启用;';

-- ----------------------------
-- Records of _file
-- ----------------------------
INSERT INTO "ROOT"."_file" VALUES ('1', '1658154809097_619728', '2022/7/18/', 'girl_beside_bridge.flac', '1658154809097_619728_girl_beside_bridge.flac', '/2022/7/18//1658154809097_619728_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:33:29+08:00');
INSERT INTO "ROOT"."_file" VALUES ('2', '1658155049841_775430', '2022/7/18/', 'girl_beside_bridge.flac', '1658155049841_775430_girl_beside_bridge.flac', '/2022/7/18//1658155049841_775430_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:37:30+08:00');
INSERT INTO "ROOT"."_file" VALUES ('3', '1658155085886_919958', '2022/7/18/', 'girl_beside_bridge.flac', '1658155085886_919958_girl_beside_bridge.flac', '/2022/7/18//1658155085886_919958_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:38:06+08:00');
INSERT INTO "ROOT"."_file" VALUES ('4', '1658155149335_767220', '2022/7/18/', 'girl_beside_bridge.flac', '1658155149335_767220_girl_beside_bridge.flac', '/2022/7/18//1658155149335_767220_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:39:09+08:00');
INSERT INTO "ROOT"."_file" VALUES ('5', '1658155585847_905258', 'test/', 'girl_beside_bridge.flac', '1658155585847_905258_girl_beside_bridge.flac', '/test//1658155585847_905258_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:46:26+08:00');
INSERT INTO "ROOT"."_file" VALUES ('6', '1658155628178_210170', 'test/', 'girl_beside_bridge.flac', '1658155628178_210170_girl_beside_bridge.flac', '/test//1658155628178_210170_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:47:08+08:00');
INSERT INTO "ROOT"."_file" VALUES ('7', '1658155774371_269076', 'test/', 'girl_beside_bridge.flac', '1658155774371_269076_girl_beside_bridge.flac', '/test//1658155774371_269076_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:49:34+08:00');
INSERT INTO "ROOT"."_file" VALUES ('8', '1658155816497_901481', 'test/', 'girl_beside_bridge.flac', '1658155816497_901481_girl_beside_bridge.flac', '/test//1658155816497_901481_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:50:16+08:00');
INSERT INTO "ROOT"."_file" VALUES ('9', '1658156806074_485604', 'test/', 'girl_beside_bridge.flac', '1658156806074_485604_girl_beside_bridge.flac', '/test//1658156806074_485604_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:06:46+08:00');
INSERT INTO "ROOT"."_file" VALUES ('10', '1658156949831_266793', 'test/', 'girl_beside_bridge.flac', '1658156949831_266793_girl_beside_bridge.flac', '/test//1658156949831_266793_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:10+08:00');
INSERT INTO "ROOT"."_file" VALUES ('11', '1658156995456_405279', 'test/', 'girl_beside_bridge.flac', '1658156995456_405279_girl_beside_bridge.flac', '/test//1658156995456_405279_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:55+08:00');
INSERT INTO "ROOT"."_file" VALUES ('12', '1658157035767_659758', 'test/', 'girl_beside_bridge.flac', '1658157035767_659758_girl_beside_bridge.flac', '/test//1658157035767_659758_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:10:35+08:00');
INSERT INTO "ROOT"."_file" VALUES ('13', '1658157220201_516323', 'test/', 'girl_beside_bridge.flac', '1658157220201_516323_girl_beside_bridge.flac', '/test//1658157220201_516323_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:40+08:00');
INSERT INTO "ROOT"."_file" VALUES ('14', '1659534051399_758675', 'test/', 'girl_beside_bridge.flac', '1659534051399_758675_girl_beside_bridge.flac', '/test//1659534051399_758675_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-08-03T21:40:51+08:00');
INSERT INTO "ROOT"."_file" VALUES ('15', '1659534101067_721997', 'test/', 'girl_beside_bridge.flac', '1659534101067_721997_girl_beside_bridge.flac', '/test//1659534101067_721997_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-08-03T21:41:41+08:00');
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _group
-- ----------------------------
DROP TABLE "ROOT"."_group";
CREATE TABLE "ROOT"."_group" (
  "id" NUMBER(11,0) NOT NULL,
  "groupId" NVARCHAR2(255) NOT NULL,
  "groupName" NVARCHAR2(255),
  "groupDesc" NVARCHAR2(255),
  "groupAvatar" NVARCHAR2(255),
  "groupExtend" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_group"."groupId" IS 'groupId';
COMMENT ON COLUMN "ROOT"."_group"."groupName" IS '群组名';
COMMENT ON COLUMN "ROOT"."_group"."groupDesc" IS '群组描述';
COMMENT ON COLUMN "ROOT"."_group"."groupAvatar" IS '群logo';
COMMENT ON COLUMN "ROOT"."_group"."groupExtend" IS '拓展字段; { groupNotice: ''xx'' }';
COMMENT ON COLUMN "ROOT"."_group"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_group"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_group"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_group"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_group" IS '群组表; 软删除未启用;';

-- ----------------------------
-- Records of _group
-- ----------------------------
INSERT INTO "ROOT"."_group" VALUES ('1', 'adminGroup', '管理组', '管理组', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_group" VALUES ('6', 'wudang', '武当', '武当', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_group" VALUES ('7', 'gaibang', '丐帮', '丐帮', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_group" VALUES ('8', 'huashan', '华山派', '华山派', NULL, '{}', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _page
-- ----------------------------
DROP TABLE "ROOT"."_page";
CREATE TABLE "ROOT"."_page" (
  "id" NUMBER(11,0) NOT NULL,
  "pageId" NVARCHAR2(255),
  "pageName" NVARCHAR2(255),
  "pageType" NVARCHAR2(255),
  "sort" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_page"."pageId" IS 'pageId';
COMMENT ON COLUMN "ROOT"."_page"."pageName" IS 'page name';
COMMENT ON COLUMN "ROOT"."_page"."pageType" IS '页面类型; showInMenu, dynamicInMenu';
COMMENT ON COLUMN "ROOT"."_page"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_page"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_page"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_page"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_page" IS '页面表; 软删除未启用;';

-- ----------------------------
-- Records of _page
-- ----------------------------
INSERT INTO "ROOT"."_page" VALUES ('2', 'help', '帮助', 'dynamicInMenu', '11', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('3', 'login', '登陆', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('6', 'manual', '操作手册', 'showInMenu', '0', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('25', 'protocolDemo', '应用协议', 'showInMenu', '2', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('27', 'frontendDemo01', '前端对接', 'showInMenu', '3', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('28', 'frontendDemo02', '前端-jianghuAxios', 'showInMenu', '4', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('29', 'resourceHook', '前端-resouceHook', 'showInMenu', '6', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('31', 'backendSearchDemo', '服务端搜索', 'showInMenu', '7', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('32', 'dataAccessRight', '数据权限', 'showInMenu', '8', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('34', 'uiAction', 'uiAction', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_page" VALUES ('35', 'uiActionComponent', 'uiAction-组件通信', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _record_history
-- ----------------------------
DROP TABLE "ROOT"."_record_history";
CREATE TABLE "ROOT"."_record_history" (
  "id" NUMBER(11,0) NOT NULL,
  "table" NVARCHAR2(255),
  "recordId" NUMBER(11,0),
  "recordContent" NCLOB NOT NULL,
  "packageContent" NCLOB NOT NULL,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_record_history"."table" IS '表';
COMMENT ON COLUMN "ROOT"."_record_history"."recordId" IS '数据在table中的主键id; recordContent.id';
COMMENT ON COLUMN "ROOT"."_record_history"."recordContent" IS '数据';
COMMENT ON COLUMN "ROOT"."_record_history"."packageContent" IS '当时请求的 package JSON';
COMMENT ON COLUMN "ROOT"."_record_history"."operation" IS '操作; jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_record_history"."operationByUserId" IS '操作者userId; recordContent.operationByUserId';
COMMENT ON COLUMN "ROOT"."_record_history"."operationByUser" IS '操作者用户名; recordContent.operationByUser';
COMMENT ON COLUMN "ROOT"."_record_history"."operationAt" IS '操作时间; recordContent.operationAt; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_record_history" IS '数据历史表';

-- ----------------------------
-- Records of _record_history
-- ----------------------------
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _resource
-- ----------------------------
DROP TABLE "ROOT"."_resource";
CREATE TABLE "ROOT"."_resource" (
  "id" NUMBER(11,0) NOT NULL,
  "accessControlTable" NVARCHAR2(255),
  "resourceHook" NCLOB,
  "pageId" NVARCHAR2(255),
  "actionId" NVARCHAR2(255),
  "desc" NVARCHAR2(255),
  "resourceType" NVARCHAR2(255),
  "appDataSchema" NCLOB,
  "resourceData" NCLOB,
  "requestDemo" NCLOB,
  "responseDemo" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_resource"."accessControlTable" IS '数据规则控制表';
COMMENT ON COLUMN "ROOT"."_resource"."resourceHook" IS '[ "before": {"service": "xx", "serviceFunction": "xxx"}, "after": [] }';
COMMENT ON COLUMN "ROOT"."_resource"."pageId" IS 'page id; E.g: index';
COMMENT ON COLUMN "ROOT"."_resource"."actionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "ROOT"."_resource"."desc" IS '描述';
COMMENT ON COLUMN "ROOT"."_resource"."resourceType" IS 'resource 类型; E.g: auth service sql';
COMMENT ON COLUMN "ROOT"."_resource"."appDataSchema" IS 'appData 参数校验';
COMMENT ON COLUMN "ROOT"."_resource"."resourceData" IS 'resource 数据; { "service": "auth", "serviceFunction": "passwordLogin" } or  { "table": "${tableName}", "action": "select", "whereCondition": ".where(function() {this.whereNot( { recordStatus: \"active\" })})" }';
COMMENT ON COLUMN "ROOT"."_resource"."requestDemo" IS '请求Demo';
COMMENT ON COLUMN "ROOT"."_resource"."responseDemo" IS '响应Demo';
COMMENT ON COLUMN "ROOT"."_resource"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_resource"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_resource"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_resource"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_resource" IS '请求资源表; 软删除未启用; resourceId=`${appId}.${pageId}.${actionId}`';

-- ----------------------------
-- Records of _resource
-- ----------------------------
INSERT INTO "ROOT"."_resource" VALUES ('101', NULL, NULL, 'allPage', 'getChunkInfo', '✅ 文件分片下载-获取分片信息', 'service', '{}', '{ "service": "file", "serviceFunction": "getChunkInfo" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('102', NULL, NULL, 'allPage', 'uploadFileDone', '✅ 文件分片上传-所有分片上传完毕', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileDone" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('105', NULL, NULL, 'allPage', 'httpUploadByStream', '✅ 文件分片上传-http文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByStream" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('106', NULL, NULL, 'allPage', 'httpUploadByBase64', '✅ 文件分片上传-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('107', NULL, NULL, 'allPage', 'socketUploadByStream', '✅ 文件分片上传-socket 文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('108', NULL, NULL, 'allPage', 'socketUploadByBase64', '✅ 文件分片上传-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('112', NULL, NULL, 'allPage', 'httpDownloadByBase64', '✅ 文件分片下载-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('113', NULL, NULL, 'allPage', 'socketDownloadByStream', '✅ 文件分片下载-socket文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('114', NULL, NULL, 'allPage', 'socketDownloadByBase64', '✅ 文件分片下载-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('231', NULL, NULL, 'login', 'passwordLogin', '✅登陆', 'service', '{}', '{"service": "user", "serviceFunction": "passwordLogin"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:32:57+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('251', NULL, NULL, 'allPage', 'logout', '✅登出', 'service', '{}', '{"service": "user", "serviceFunction": "logout"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('253', NULL, NULL, 'allPage', 'userInfo', '✅获取用户信息', 'service', '{}', '{"service": "user", "serviceFunction": "userInfo"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('254', NULL, NULL, 'allPage', 'resetPassword', '✅修改用户密码', 'service', '{}', '{"service": "user", "serviceFunction": "resetPassword"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('258', NULL, NULL, 'allPage', 'getConstantList', '✅查询常量', 'sql', '{}', '{"table": "_constant", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('293', NULL, NULL, 'protocolDemo', 'selectItemList', '✅应用协议-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('294', NULL, NULL, 'protocolDemo', 'insertItem', '✅应用协议-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('295', NULL, NULL, 'protocolDemo', 'updateItem', '✅应用协议-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('296', NULL, NULL, 'protocolDemo', 'deleteItem', '✅应用协议-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('309', NULL, NULL, 'frontendDemo01', 'selectItemList', '✅前端对接-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('310', NULL, NULL, 'frontendDemo01', 'insertItem', '✅前端对接-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('311', NULL, NULL, 'frontendDemo01', 'updateItem', '✅前端对接-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('312', NULL, NULL, 'frontendDemo01', 'deleteItem', '✅前端对接-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('313', NULL, NULL, 'frontendDemo02', 'selectItemList', '✅前端优化-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('314', NULL, NULL, 'frontendDemo02', 'insertItem', '✅前端优化-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('315', NULL, NULL, 'frontendDemo02', 'updateItem', '✅前端优化-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('316', NULL, NULL, 'frontendDemo02', 'deleteItem', '✅前端优化-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('317', NULL, NULL, 'resourceHook', 'selectItemList', '✅前端对接-业务ID-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('318', NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "beforHookForGenerateStudentId"}]}', 'resourceHook', 'insertItem', '✅前端对接-业务ID-添加成员', 'sql', '{"type": "object", "required": ["actionData"], "properties": {"actionData": {"type": "object", "required": ["classId", "name", "level", "gender", "dateOfBirth"], "properties": {"name": {"type": "string"}, "level": {"anyOf": [{"type": "string"}, {"type": "number"}]}, "gender": {"type": "string"}, "classId": {"type": "string"}, "dateOfBirth": {"type": "string", "format": "date"}}, "additionalProperties": true}}, "additionalProperties": true}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('319', NULL, NULL, 'resourceHook', 'updateItem', '✅前端对接-业务ID-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('320', NULL, NULL, 'resourceHook', 'deleteItem', '✅前端对接-业务ID-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('325', NULL, NULL, 'uiAction', 'selectItemList', '✅前端规范-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('326', NULL, NULL, 'uiAction', 'createItem', '✅前端规范-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('327', NULL, NULL, 'uiAction', 'updateItem', '✅前端规范-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('328', NULL, NULL, 'uiAction', 'deleteItem', '✅前端规范-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('331', NULL, NULL, 'uiActionComponent', 'selectItemList', '✅前端规范-组件通信-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('332', NULL, NULL, 'uiActionComponent', 'insertItem', '✅前端规范-组件通信-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('333', NULL, NULL, 'uiActionComponent', 'updateItem', '✅前端规范-组件通信-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('334', NULL, NULL, 'uiActionComponent', 'deleteItem', '✅前端规范-组件通信-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('341', 'access_control_student', NULL, 'backendSearchDemo', 'selectItemList', '✅服务端查询-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('342', NULL, NULL, 'backendSearchDemo', 'insertItem', '✅服务端查询-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('343', NULL, NULL, 'backendSearchDemo', 'updateItem', '✅服务端查询-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('350', NULL, NULL, 'backendSearchDemo', 'deleteItem', '✅服务端查询-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('352', NULL, NULL, 'dataAccessRight', 'insertItem', '✅数据权限-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('353', NULL, NULL, 'dataAccessRight', 'updateItem', '✅数据权限-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('354', NULL, NULL, 'dataAccessRight', 'deleteItem', '✅数据权限-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('355', NULL, NULL, 'dataAccessRight', 'selectItemListByService', '✅数据权限-查询列表', 'service', '{}', '{"service": "student", "serviceFunction": "selectStudentList"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('356', NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "appendStudentInfoToUserInfo"}]}', 'dataAccessRight', 'selectItemListByDynamicData', '✅数据权限-查询列表', 'sql', '{}', '{"table": "student", "where": {"classId": "ctx.userInfo.studentInfo.classId"}, "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('500', NULL, NULL, 'socket', 'disconnect', '✅ socket断开连接', 'service', '{}', '{"service":"socket", "serviceFunction": "disconnect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('501', NULL, NULL, 'socket', 'connect', '✅ socket 连接', 'service', '{}', '{"service":"socket", "serviceFunction": "connect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "ROOT"."_resource" VALUES ('502', NULL, NULL, 'socket', 'sendMsg', '✅ socket 发送消息', 'service', '{}', '{ "service": "socket", "serviceFunction": "sendMsg" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('503', NULL, NULL, 'requestLog', 'selectItemList', '✅请求记录', 'sql', '{}', '{"table": "_resource_request_log", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('504', NULL, NULL, 'recordHistory', 'selectItemList', '✅操作记录', 'sql', '{}', '{"table": "_record_history", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('505', NULL, NULL, 'group', 'insertItem', '✅创建群组', 'sql', '{}', '{"table": "_group", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('506', NULL, NULL, 'group', 'updateItem', '✅更新群组', 'sql', '{}', '{"table": "_group", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('507', NULL, NULL, 'group', 'selectItemList', '✅获取群组列表', 'sql', '{}', '{"table": "_group", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_resource" VALUES ('508', NULL, NULL, 'group', 'deleteItem', '✅删除群组', 'sql', '{}', '{"table": "_group", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _resource_request_log
-- ----------------------------
DROP TABLE "ROOT"."_resource_request_log";
CREATE TABLE "ROOT"."_resource_request_log" (
  "id" NUMBER(11,0) NOT NULL,
  "resourceId" NVARCHAR2(255),
  "packageId" NVARCHAR2(255),
  "userIp" NVARCHAR2(255),
  "userAgent" NVARCHAR2(255),
  "deviceId" NVARCHAR2(255),
  "userIpRegion" NVARCHAR2(255),
  "executeSql" NVARCHAR2(255),
  "requestBody" NCLOB,
  "responseBody" NCLOB,
  "responseStatus" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_resource_request_log"."resourceId" IS 'resource id;';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."packageId" IS 'resource package id';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."userIp" IS '用户ip;';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."userAgent" IS '设备信息';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."deviceId" IS '设备id';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."userIpRegion" IS '用户Ip区域';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."executeSql" IS '执行的sql';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."requestBody" IS '请求body';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."responseBody" IS '响应body';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."responseStatus" IS '执行的结果;  success, fail';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_resource_request_log"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_resource_request_log" IS '文件表; 软删除未启用;';

-- ----------------------------
-- Records of _resource_request_log
-- ----------------------------
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _role
-- ----------------------------
DROP TABLE "ROOT"."_role";
CREATE TABLE "ROOT"."_role" (
  "id" NUMBER(11,0) NOT NULL,
  "roleId" NVARCHAR2(255),
  "roleName" NVARCHAR2(255),
  "roleDesc" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_role"."roleId" IS 'roleId';
COMMENT ON COLUMN "ROOT"."_role"."roleName" IS 'role name';
COMMENT ON COLUMN "ROOT"."_role"."roleDesc" IS 'role desc';
COMMENT ON COLUMN "ROOT"."_role"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_role"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_role"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_role"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_role" IS '角色表; 软删除未启用;';

-- ----------------------------
-- Records of _role
-- ----------------------------
INSERT INTO "ROOT"."_role" VALUES ('3', 'administrator', '系统管理员', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_role" VALUES ('6', 'boss', '掌门', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_role" VALUES ('7', 'disciple', '门徒', NULL, 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _ui
-- ----------------------------
DROP TABLE "ROOT"."_ui";
CREATE TABLE "ROOT"."_ui" (
  "id" NUMBER(11,0) NOT NULL,
  "pageId" NVARCHAR2(255),
  "uiActionType" NVARCHAR2(255),
  "uiActionId" NVARCHAR2(255),
  "desc" NVARCHAR2(255),
  "uiActionConfig" NCLOB,
  "appDataSchema" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_ui"."pageId" IS 'page id; E.g: index';
COMMENT ON COLUMN "ROOT"."_ui"."uiActionType" IS 'ui 动作类型，如：fetchData, postData, changeUi';
COMMENT ON COLUMN "ROOT"."_ui"."uiActionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "ROOT"."_ui"."desc" IS '描述';
COMMENT ON COLUMN "ROOT"."_ui"."uiActionConfig" IS 'ui 动作数据';
COMMENT ON COLUMN "ROOT"."_ui"."appDataSchema" IS 'ui 校验数据';
COMMENT ON COLUMN "ROOT"."_ui"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_ui"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_ui"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_ui"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_ui" IS 'ui 施工方案';

-- ----------------------------
-- Records of _ui
-- ----------------------------
INSERT INTO "ROOT"."_ui" VALUES ('1', 'uiAction', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('3', 'uiAction', 'ui', 'startInsertItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearCreateForm"}, {"function": "openCreateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('4', 'uiAction', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "prepareCreateItem"}, {"function": "confirmCreateFormDialog"}], "main": [ {"function": "doCreateItem"}], "after": [{"function": "closeCreateDrawer"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('5', 'uiAction', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "fillUpdateForm"}, {"function": "openUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('6', 'uiAction', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('7', 'uiAction', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [ {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('11', 'uiActionComponent', 'ui', 'refreshTableData', '✅获取表格数据', '{ "before": [{"vueComponent": "classSelectDialog", "function": "selectItem", "functionParamObj": { "item": { "value": "2021-01级-01班" } }}], "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('13', 'uiActionComponent', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('14', 'uiActionComponent', 'ui', 'insertItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "新增", "content": "确定新增吗？" }}], "main": [{"function": "prepareCreateItem"}, {"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('15', 'uiActionComponent', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('16', 'uiActionComponent', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "修改", "content": "确定修改吗？" }}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('17', 'uiActionComponent', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "删除", "content": "确定删除吗？" }}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('30', 'resourceHook', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('31', 'resourceHook', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('32', 'resourceHook', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('33', 'resourceHook', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('34', 'resourceHook', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('35', 'resourceHook', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('40', 'backendSearchDemo', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('41', 'backendSearchDemo', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('42', 'backendSearchDemo', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('43', 'backendSearchDemo', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('44', 'backendSearchDemo', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('45', 'backendSearchDemo', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('50', 'dataAccessRight', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('51', 'dataAccessRight', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('52', 'dataAccessRight', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('53', 'dataAccessRight', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('54', 'dataAccessRight', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_ui" VALUES ('55', 'dataAccessRight', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _user
-- ----------------------------
DROP TABLE "ROOT"."_user";
CREATE TABLE "ROOT"."_user" (
  "id" NUMBER(11,0) NOT NULL,
  "idSequence" NVARCHAR2(255),
  "userId" NVARCHAR2(255),
  "username" NVARCHAR2(255),
  "clearTextPassword" NVARCHAR2(255),
  "password" NVARCHAR2(255),
  "md5Salt" NVARCHAR2(255),
  "userStatus" NVARCHAR2(255),
  "userType" NVARCHAR2(255),
  "config" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_user"."idSequence" IS '自增id; 用于生成userId';
COMMENT ON COLUMN "ROOT"."_user"."userId" IS '主键id';
COMMENT ON COLUMN "ROOT"."_user"."username" IS '用户名(登陆)';
COMMENT ON COLUMN "ROOT"."_user"."clearTextPassword" IS '明文密码';
COMMENT ON COLUMN "ROOT"."_user"."password" IS '密码';
COMMENT ON COLUMN "ROOT"."_user"."md5Salt" IS 'md5Salt';
COMMENT ON COLUMN "ROOT"."_user"."userStatus" IS '用户账号状态：活跃或关闭';
COMMENT ON COLUMN "ROOT"."_user"."userType" IS '用户类型; staff, student.';
COMMENT ON COLUMN "ROOT"."_user"."config" IS '配置信息';
COMMENT ON COLUMN "ROOT"."_user"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_user"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_user"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_user"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_user" IS '用户表';

-- ----------------------------
-- Records of _user
-- ----------------------------
INSERT INTO "ROOT"."_user" VALUES ('42', NULL, 'admin', '系统管理员', '123456', '3b5ee39d479b593589e7fae533380702', '0MiTjDDk-QTJ', 'active', NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user" VALUES ('43', NULL, 'W00001', '张三丰', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user" VALUES ('44', NULL, 'W00002', '张无忌', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user" VALUES ('45', NULL, 'G00001', '洪七公', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user" VALUES ('46', NULL, 'G00002', '郭靖', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user" VALUES ('47', NULL, 'H00001', '岳不群', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user" VALUES ('48', NULL, 'H00002', '令狐冲', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role
-- ----------------------------
DROP TABLE "ROOT"."_user_group_role";
CREATE TABLE "ROOT"."_user_group_role" (
  "id" NUMBER(11,0) NOT NULL,
  "userId" NVARCHAR2(255) NOT NULL,
  "groupId" NVARCHAR2(255) NOT NULL,
  "roleId" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_user_group_role"."userId" IS '用户id';
COMMENT ON COLUMN "ROOT"."_user_group_role"."groupId" IS '群组Id';
COMMENT ON COLUMN "ROOT"."_user_group_role"."roleId" IS '角色Id';
COMMENT ON COLUMN "ROOT"."_user_group_role"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_user_group_role"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_user_group_role"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_user_group_role"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_user_group_role" IS '用户群组角色关联表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role
-- ----------------------------
INSERT INTO "ROOT"."_user_group_role" VALUES ('568', 'admin', 'adminGroup', 'administrator', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('569', 'W00001', 'wudang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('570', 'W00002', 'wudang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('573', 'G00001', 'gaibang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('574', 'G00002', 'gaibang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('577', 'H00001', 'huashan', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role" VALUES ('578', 'H00002', 'huashan', 'disciple', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_page
-- ----------------------------
DROP TABLE "ROOT"."_user_group_role_page";
CREATE TABLE "ROOT"."_user_group_role_page" (
  "id" NUMBER(11,0) NOT NULL,
  "user" NVARCHAR2(255),
  "group" NVARCHAR2(255),
  "role" NVARCHAR2(255),
  "page" NVARCHAR2(255),
  "allowOrDeny" NVARCHAR2(255),
  "desc" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."user" IS 'userId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."group" IS 'groupId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."role" IS 'roleId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."page" IS 'pageId id';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."allowOrDeny" IS '用户群组角色 匹配后 执行动作; allow、deny';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."desc" IS '映射描述';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_user_group_role_page"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_user_group_role_page" IS '用户群组角色 - 页面 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_page
-- ----------------------------
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('17', '*', 'public', '*', 'login', 'allow', '登陆页; 开放给所有用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('18', '*', 'login', '*', 'manual', 'allow', '操作手册页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('19', '*', 'login', '*', 'help', 'allow', '帮助页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('21', '*', 'adminGroup', 'administrator', '*', 'allow', '所有页面; 开放给应用管理者;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('27', '*', 'wudang', 'boss,disciple', 'protocolDemo', 'allow', 'studentManagement01; 开放给武当派派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('28', '*', 'gaibang', 'boss,disciple', 'frontendDemo01,frontendDemo02', 'allow', 'studentManagement02&studentManagement03; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('29', '*', 'huashan', 'boss,disciple', 'backendSearchDemo', 'allow', 'studentManagement04; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_page" VALUES ('30', '*', '*', 'boss,disciple', 'dataAccessRight', 'allow', '数据权限demo', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_resource
-- ----------------------------
DROP TABLE "ROOT"."_user_group_role_resource";
CREATE TABLE "ROOT"."_user_group_role_resource" (
  "id" NUMBER(11,0) NOT NULL,
  "user" NVARCHAR2(255),
  "group" NVARCHAR2(255),
  "role" NVARCHAR2(255),
  "resource" NVARCHAR2(255),
  "allowOrDeny" NVARCHAR2(255),
  "desc" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."user" IS 'userId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."group" IS 'groupId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."role" IS 'roleId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."resource" IS 'resourceId 或者 通配符; 通配符: *, !resourceId';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."allowOrDeny" IS '用户群组角色 匹配后 执行动作; allow、deny';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."desc" IS '映射描述';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_user_group_role_resource"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_user_group_role_resource" IS '用户群组角色 - 请求资源 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_resource
-- ----------------------------
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('1', '*', 'public', '*', 'login.passwordLogin', 'allow', '登陆resource, 开放给所有用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('11', '*', 'public', '*', 'allPage.getConstantList', 'allow', '查询常量resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('31', '*', 'login', '*', 'allPage.logout', 'allow', '登出resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('32', '*', 'login', '*', 'allPage.refreshToken', 'allow', '刷新authToken resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('33', '*', 'login', '*', 'allPage.userInfo', 'allow', '用户个人信息resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('34', '*', 'login', '*', 'allPage.uploadByBase64', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('35', '*', 'login', '*', 'allPage.uploadByStream', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('51', '*', 'adminGroup', 'administrator', '*', 'allow', '应用管理者, 赋予所有resource权限', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('117', '*', 'wudang', 'boss', 'protocolDemo.*', 'allow', 'page01 内的所有操作; 开放给武当派掌门;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('118', '*', 'wudang', 'disciple', 'protocolDemo.selectItemList', 'allow', 'page01 内的查询列表操作; 开放给武当派门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('125', '*', 'gaibang', 'boss', 'frontendDemo01.*,frontendDemo02.*', 'allow', 'page02&page03 内的所有操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('126', '*', 'gaibang', 'disciple', 'frontendDemo01.selectItemList,frontendDemo02.selectItemList', 'allow', 'page02&page03 内的查询列表操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('131', '*', 'huashan', 'boss', 'backendSearchDemo.*', 'allow', 'page04 内的所有操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('132', '*', 'huashan', 'disciple', 'backendSearchDemo.selectItemList', 'allow', 'page04 内的查询列表操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('133', '*', '*', 'boss', 'dataAccessRight.*', 'allow', 'page05 内的所有操作; 开放给所有掌门', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('134', '*', '*', 'disciple', 'dataAccessRight.selectItemList', 'allow', 'page05 内的查询列表操作; 开放给所有门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."_user_group_role_resource" VALUES ('135', '*', 'public', '*', 'socket.disconnect', 'allow', 'socket断开连接', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for _user_session
-- ----------------------------
DROP TABLE "ROOT"."_user_session";
CREATE TABLE "ROOT"."_user_session" (
  "id" NUMBER(11,0) NOT NULL,
  "userId" NVARCHAR2(255),
  "userIp" NVARCHAR2(255),
  "userIpRegion" NVARCHAR2(255),
  "userAgent" NCLOB,
  "deviceId" NVARCHAR2(255),
  "deviceType" NVARCHAR2(255),
  "socketStatus" NVARCHAR2(255),
  "authToken" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."_user_session"."userId" IS '用户id';
COMMENT ON COLUMN "ROOT"."_user_session"."userIp" IS '用户ip';
COMMENT ON COLUMN "ROOT"."_user_session"."userIpRegion" IS '用户Ip区域';
COMMENT ON COLUMN "ROOT"."_user_session"."userAgent" IS '请求的 agent';
COMMENT ON COLUMN "ROOT"."_user_session"."deviceId" IS '设备id';
COMMENT ON COLUMN "ROOT"."_user_session"."deviceType" IS '设备类型; flutter, web, bot_databot, bot_chatbot, bot_xiaochengxu';
COMMENT ON COLUMN "ROOT"."_user_session"."socketStatus" IS 'socket状态';
COMMENT ON COLUMN "ROOT"."_user_session"."authToken" IS 'auth token';
COMMENT ON COLUMN "ROOT"."_user_session"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."_user_session"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."_user_session"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."_user_session"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."_user_session" IS '用户session表; deviceId 维度;软删除未启用;';

-- ----------------------------
-- Records of _user_session
-- ----------------------------
INSERT INTO "ROOT"."_user_session" VALUES ('2083', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1658157217726', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2084', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1658157218545', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2085', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1658157222591', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2086', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1658157223475', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2087', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1658157224929', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2088', 'W00001', '127.0.0.1', NULL, NULL, 'chrome_1658157225065', 'web', 'offline', 'CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2089', 'W00002', '127.0.0.1', NULL, NULL, 'chrome_1658157225121', 'web', 'offline', '_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2090', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534044748', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2091', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534044890', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2092', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045015', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2093', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045111', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2094', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045197', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2095', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045239', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2096', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045359', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2097', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045433', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2098', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045501', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2099', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045575', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2100', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534045861', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2101', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534050802', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2102', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534052870', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2103', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534053235', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2104', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534053855', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2105', 'W00001', '127.0.0.1', NULL, NULL, 'chrome_1659534053912', 'web', 'offline', 'yxTRPRvQMgPM8HNgu24sR0wpRK7UcUZCW84T', 'jhInsert', NULL, NULL, '2022-08-03T21:40:53+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2106', 'W00002', '127.0.0.1', NULL, NULL, 'chrome_1659534053946', 'web', 'offline', 'oUuv5qPSfN83Hqci_gb_ddK6LTpqx5OGAF1r', 'jhInsert', NULL, NULL, '2022-08-03T21:40:53+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2107', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534093865', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2108', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094028', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2109', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094193', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2110', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094407', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2111', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094526', 'web', 'offline', 'v-tPrDxNqz35pgShEmQquGsf5on2UaPRtTXe', 'jhInsert', NULL, NULL, '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2112', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094563', 'web', 'offline', NULL, 'jhUpdate', 'admin', '系统管理员', '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2113', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094700', 'web', 'offline', '3YqoTRAqiXaZINLaz_m_njHOQtyKptyUBeYB', 'jhInsert', NULL, NULL, '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2114', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094786', 'web', 'offline', 'STaj0-qK1ZnIagkSy0PJ5i4Nuspo-eTX-Vy9', 'jhInsert', NULL, NULL, '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2115', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094868', 'web', 'offline', 'VijShCmXrA08otWhL0Z1lN0KBLDPGFN_BDLk', 'jhInsert', NULL, NULL, '2022-08-03T21:41:34+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2116', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534094969', 'web', 'offline', 'baYNp7UCYIuIMIUO1b8BSt_LGxIZIGTp7OMZ', 'jhInsert', NULL, NULL, '2022-08-03T21:41:35+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2117', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534095504', 'web', 'offline', 'fHzbcXdU7CEfvrtzBT90t0xDlh-eT7ZuiCWx', 'jhInsert', NULL, NULL, '2022-08-03T21:41:35+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2118', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534100575', 'web', 'offline', 'KV4N3x-if0Vw3stE1VJOGmgDrZ2LrKAdLCK4', 'jhInsert', NULL, NULL, '2022-08-03T21:41:40+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2119', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534102671', 'web', 'offline', 'SfQlznVNwwvWVTQEdgyFjSCIg8QVQuukmyfI', 'jhInsert', NULL, NULL, '2022-08-03T21:41:42+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2120', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534103020', 'web', 'offline', 'kl-rQcAC3elADMUYNKArwikPIl5UBllUMEEj', 'jhInsert', NULL, NULL, '2022-08-03T21:41:43+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2121', 'admin', '127.0.0.1', NULL, NULL, 'chrome_1659534103779', 'web', 'offline', 'AFLzBJQPjHd1QQayhZp9QDG5zf9eJ9zCZz0S', 'jhInsert', NULL, NULL, '2022-08-03T21:41:43+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2122', 'W00001', '127.0.0.1', NULL, NULL, 'chrome_1659534103833', 'web', 'offline', 'TxY_Rb14ulSfmzBKKlaS82JwoB6-OcUhHZyK', 'jhInsert', NULL, NULL, '2022-08-03T21:41:43+08:00');
INSERT INTO "ROOT"."_user_session" VALUES ('2123', 'W00002', '127.0.0.1', NULL, NULL, 'chrome_1659534103869', 'web', 'offline', 'lQzNbV8XjZQNNBCLbVDDlRIVeS0FTkmzTE7W', 'jhInsert', NULL, NULL, '2022-08-03T21:41:43+08:00');
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for access_control_student
-- ----------------------------
DROP TABLE "ROOT"."access_control_student";
CREATE TABLE "ROOT"."access_control_student" (
  "id" NUMBER(11,0) NOT NULL,
  "userId" NVARCHAR2(255),
  "username" NVARCHAR2(255),
  "resourceData" NVARCHAR2(255),
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."access_control_student"."userId" IS '主键id';
COMMENT ON COLUMN "ROOT"."access_control_student"."username" IS '用户名(登陆)';
COMMENT ON COLUMN "ROOT"."access_control_student"."resourceData" IS '明文密码';
COMMENT ON COLUMN "ROOT"."access_control_student"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."access_control_student"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."access_control_student"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."access_control_student"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "ROOT"."access_control_student" IS '学生表的 accessControl 表';

-- ----------------------------
-- Records of access_control_student
-- ----------------------------
INSERT INTO "ROOT"."access_control_student" VALUES ('50', 'G00001', '洪七公', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
INSERT INTO "ROOT"."access_control_student" VALUES ('51', 'H00001', '岳不群', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
COMMIT;
COMMIT;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE "ROOT"."student";
CREATE TABLE "ROOT"."student" (
  "id" NUMBER(11,0) NOT NULL,
  "studentId" NVARCHAR2(255),
  "name" NVARCHAR2(255),
  "gender" NVARCHAR2(255),
  "dateOfBirth" NVARCHAR2(255),
  "classId" NVARCHAR2(255),
  "level" NVARCHAR2(255),
  "bodyHeight" NVARCHAR2(255),
  "studentStatus" NVARCHAR2(255),
  "remarks" NCLOB,
  "operation" NVARCHAR2(255),
  "operationByUserId" NVARCHAR2(255),
  "operationByUser" NVARCHAR2(255),
  "operationAt" NVARCHAR2(255)
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "ROOT"."student"."studentId" IS '学生ID';
COMMENT ON COLUMN "ROOT"."student"."name" IS '学生名字';
COMMENT ON COLUMN "ROOT"."student"."gender" IS '性别';
COMMENT ON COLUMN "ROOT"."student"."dateOfBirth" IS '出生日期';
COMMENT ON COLUMN "ROOT"."student"."classId" IS '班级ID';
COMMENT ON COLUMN "ROOT"."student"."level" IS '年级';
COMMENT ON COLUMN "ROOT"."student"."bodyHeight" IS '身高';
COMMENT ON COLUMN "ROOT"."student"."studentStatus" IS '学生状态';
COMMENT ON COLUMN "ROOT"."student"."remarks" IS '备注';
COMMENT ON COLUMN "ROOT"."student"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "ROOT"."student"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "ROOT"."student"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "ROOT"."student"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO "ROOT"."student" VALUES ('161', 'G00003', '小虾米', 'male', '2022-01-25', '2021-01级-02班', '02', '180', '正常', '小虾米', 'jhUpdate', 'admin', '系统管理员', '2022-05-01T15:29:52+08:00');
INSERT INTO "ROOT"."student" VALUES ('168', '100067', '1111', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-01T23:38:23+08:00');
INSERT INTO "ROOT"."student" VALUES ('173', '121432', '21434', NULL, NULL, '2021-01级-01班', NULL, NULL, NULL, NULL, 'jhInsert', 'admin', '系统管理员', '2022-05-01T23:37:58+08:00');
INSERT INTO "ROOT"."student" VALUES ('174', 'admin', '系统管理员', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T21:17:52+08:00');
INSERT INTO "ROOT"."student" VALUES ('175', '1000221', '221', 'male', '2022-05-08', '2021-01级-02班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T20:50:51+08:00');
COMMIT;
COMMIT;

-- ----------------------------
-- View structure for _view01_user
-- ----------------------------
CREATE OR REPLACE VIEW "ROOT"."_view01_user" AS SELECT
	"_user"."id", 
	"_user"."idSequence", 
	"_user"."userId", 
	"_user"."username", 
	"_user"."clearTextPassword", 
	"_user"."password", 
	"_user"."md5Salt", 
	"_user"."userStatus", 
	"_user"."userType", 
	"_user"."config", 
	"_user"."operation", 
	"_user"."operationByUserId", 
	"_user"."operationByUser", 
	"_user"."operationAt"
FROM
	"_user";

-- ----------------------------
-- Primary Key structure for table _cache
-- ----------------------------
ALTER TABLE "ROOT"."_cache" ADD CONSTRAINT "SYS_C007010" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _cache
-- ----------------------------
ALTER TABLE "ROOT"."_cache" ADD CONSTRAINT "SYS_C007004" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_cache" ADD CONSTRAINT "SYS_C007005" CHECK ("userId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _constant
-- ----------------------------
ALTER TABLE "ROOT"."_constant" ADD CONSTRAINT "SYS_C007011" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _constant
-- ----------------------------
ALTER TABLE "ROOT"."_constant" ADD CONSTRAINT "SYS_C006987" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _file
-- ----------------------------
ALTER TABLE "ROOT"."_file" ADD CONSTRAINT "SYS_C007013" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _file
-- ----------------------------
ALTER TABLE "ROOT"."_file" ADD CONSTRAINT "SYS_C006990" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table _file
-- ----------------------------
CREATE INDEX "ROOT"."fileId_index"
  ON "ROOT"."_file" ("fileId" ASC) LOCAL
  LOGGING
  ONLINE
  NOSORT
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);

-- ----------------------------
-- Primary Key structure for table _group
-- ----------------------------
ALTER TABLE "ROOT"."_group" ADD CONSTRAINT "SYS_C007012" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _group
-- ----------------------------
ALTER TABLE "ROOT"."_group" ADD CONSTRAINT "SYS_C006988" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_group" ADD CONSTRAINT "SYS_C006989" CHECK ("groupId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table _group
-- ----------------------------
CREATE INDEX "ROOT"."groupId_index"
  ON "ROOT"."_group" ("groupId" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);

-- ----------------------------
-- Primary Key structure for table _page
-- ----------------------------
ALTER TABLE "ROOT"."_page" ADD CONSTRAINT "SYS_C007014" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _page
-- ----------------------------
ALTER TABLE "ROOT"."_page" ADD CONSTRAINT "SYS_C006991" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _record_history
-- ----------------------------
ALTER TABLE "ROOT"."_record_history" ADD CONSTRAINT "SYS_C007015" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _record_history
-- ----------------------------
ALTER TABLE "ROOT"."_record_history" ADD CONSTRAINT "SYS_C006992" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_record_history" ADD CONSTRAINT "SYS_C006993" CHECK ("recordContent" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_record_history" ADD CONSTRAINT "SYS_C006994" CHECK ("packageContent" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table _record_history
-- ----------------------------
CREATE INDEX "ROOT"."index_record_id"
  ON "ROOT"."_record_history" ("recordId" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);
CREATE INDEX "ROOT"."index_table_action"
  ON "ROOT"."_record_history" ("table" ASC, "operation" ASC) LOCAL
  LOGGING
  ONLINE
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);

-- ----------------------------
-- Primary Key structure for table _resource
-- ----------------------------
ALTER TABLE "ROOT"."_resource" ADD CONSTRAINT "SYS_C007016" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _resource
-- ----------------------------
ALTER TABLE "ROOT"."_resource" ADD CONSTRAINT "SYS_C007007" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _resource_request_log
-- ----------------------------
ALTER TABLE "ROOT"."_resource_request_log" ADD CONSTRAINT "SYS_C007017" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _resource_request_log
-- ----------------------------
ALTER TABLE "ROOT"."_resource_request_log" ADD CONSTRAINT "SYS_C006995" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table _resource_request_log
-- ----------------------------
CREATE INDEX "ROOT"."packageId_index"
  ON "ROOT"."_resource_request_log" ("packageId" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);
CREATE INDEX "ROOT"."resourceId_index"
  ON "ROOT"."_resource_request_log" ("resourceId" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);

-- ----------------------------
-- Primary Key structure for table _role
-- ----------------------------
ALTER TABLE "ROOT"."_role" ADD CONSTRAINT "SYS_C007018" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _role
-- ----------------------------
ALTER TABLE "ROOT"."_role" ADD CONSTRAINT "SYS_C006996" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _ui
-- ----------------------------
ALTER TABLE "ROOT"."_ui" ADD CONSTRAINT "SYS_C007019" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _ui
-- ----------------------------
ALTER TABLE "ROOT"."_ui" ADD CONSTRAINT "SYS_C006997" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table _user
-- ----------------------------
ALTER TABLE "ROOT"."_user" ADD CONSTRAINT "SYS_C007020" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _user
-- ----------------------------
ALTER TABLE "ROOT"."_user" ADD CONSTRAINT "SYS_C006998" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table _user
-- ----------------------------
CREATE UNIQUE INDEX "ROOT"."userId_index"
  ON "ROOT"."_user" ("userId" ASC) LOCAL
  LOGGING
  ONLINE
  NOSORT
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);
CREATE UNIQUE INDEX "ROOT"."username_index"
  ON "ROOT"."_user" ("username" ASC)
  LOGGING
  ONLINE
  NOSORT
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  FREELISTS 1
  FREELIST GROUPS 1
  BUFFER_POOL DEFAULT
);

-- ----------------------------
-- Primary Key structure for table _user_group_role
-- ----------------------------
ALTER TABLE "ROOT"."_user_group_role" ADD CONSTRAINT "SYS_C007021" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table _user_group_role
-- ----------------------------
ALTER TABLE "ROOT"."_user_group_role" ADD CONSTRAINT "SYS_C006999" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_user_group_role" ADD CONSTRAINT "SYS_C007000" CHECK ("userId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "ROOT"."_user_group_role" ADD CONSTRAINT "SYS_C007001" CHECK ("groupId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table _user_group_role_page
-- ----------------------------
ALTER TABLE "ROOT"."_user_group_role_page" ADD CONSTRAINT "SYS_C007002" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table _user_group_role_resource
-- ----------------------------
ALTER TABLE "ROOT"."_user_group_role_resource" ADD CONSTRAINT "SYS_C007003" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table _user_session
-- ----------------------------
ALTER TABLE "ROOT"."_user_session" ADD CONSTRAINT "SYS_C007006" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table access_control_student
-- ----------------------------
ALTER TABLE "ROOT"."access_control_student" ADD CONSTRAINT "SYS_C007008" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table student
-- ----------------------------
ALTER TABLE "ROOT"."student" ADD CONSTRAINT "SYS_C007009" CHECK ("id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
