/*
 Navicat Premium Data Transfer

 Source Server         : pg
 Source Server Type    : PostgreSQL
 Source Server Version : 140004
 Source Host           : localhost:5432
 Source Catalog        : jianghu
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140004
 File Encoding         : 65001

 Date: 04/08/2022 15:39:58
*/


-- ----------------------------
-- Sequence structure for _cache_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_cache_id_seq";
CREATE SEQUENCE "public"."_cache_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_cache_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _constant_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_constant_id_seq";
CREATE SEQUENCE "public"."_constant_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_constant_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _file_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_file_id_seq";
CREATE SEQUENCE "public"."_file_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_file_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _group_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_group_id_seq";
CREATE SEQUENCE "public"."_group_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_group_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _page_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_page_id_seq";
CREATE SEQUENCE "public"."_page_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_page_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _record_history_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_record_history_id_seq";
CREATE SEQUENCE "public"."_record_history_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_record_history_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _resource_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_resource_id_seq";
CREATE SEQUENCE "public"."_resource_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_resource_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _resource_request_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_resource_request_log_id_seq";
CREATE SEQUENCE "public"."_resource_request_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_resource_request_log_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_role_id_seq";
CREATE SEQUENCE "public"."_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_role_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _ui_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_ui_id_seq";
CREATE SEQUENCE "public"."_ui_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_ui_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for access_control_student_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."access_control_student_id_seq";
CREATE SEQUENCE "public"."access_control_student_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."access_control_student_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for student_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."student_id_seq";
CREATE SEQUENCE "public"."student_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."student_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _user_session_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_user_session_id_seq";
CREATE SEQUENCE "public"."_user_session_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_user_session_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_user_id_seq";
CREATE SEQUENCE "public"."_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_user_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _user_group_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_user_group_role_id_seq";
CREATE SEQUENCE "public"."_user_group_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_user_group_role_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _user_group_role_page_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_user_group_role_page_id_seq";
CREATE SEQUENCE "public"."_user_group_role_page_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_user_group_role_page_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for _user_group_role_resource_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."_user_group_role_resource_id_seq";
CREATE SEQUENCE "public"."_user_group_role_resource_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."_user_group_role_resource_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for _cache
-- ----------------------------
DROP TABLE IF EXISTS "public"."_cache";
CREATE TABLE "public"."_cache" (
  "id" int4 NOT NULL DEFAULT nextval('_cache_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default",
  "recordStatus" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_cache" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_cache"."userId" IS '用户Id';
COMMENT ON COLUMN "public"."_cache"."content" IS '缓存数据';
COMMENT ON COLUMN "public"."_cache"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_cache"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_cache"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_cache"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_cache" IS '缓存表';

-- ----------------------------
-- Records of _cache
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _constant
-- ----------------------------
DROP TABLE IF EXISTS "public"."_constant";
CREATE TABLE "public"."_constant" (
  "id" int4 NOT NULL DEFAULT nextval('_constant_id_seq'::regclass),
  "constantKey" varchar(255) COLLATE "pg_catalog"."default",
  "constantType" varchar(255) COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "constantValue" text COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_constant" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_constant"."constantType" IS '常量类型; object, array';
COMMENT ON COLUMN "public"."_constant"."desc" IS '描述';
COMMENT ON COLUMN "public"."_constant"."constantValue" IS '常量内容; object, array';
COMMENT ON COLUMN "public"."_constant"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_constant"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_constant"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_constant"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_constant" IS '常量表; 软删除未启用;';

-- ----------------------------
-- Records of _constant
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _file
-- ----------------------------
DROP TABLE IF EXISTS "public"."_file";
CREATE TABLE "public"."_file" (
  "id" int4 NOT NULL DEFAULT nextval('_file_id_seq'::regclass),
  "fileId" varchar(255) COLLATE "pg_catalog"."default",
  "fileDirectory" varchar(255) COLLATE "pg_catalog"."default",
  "filename" varchar(255) COLLATE "pg_catalog"."default",
  "filenameStorage" varchar(255) COLLATE "pg_catalog"."default",
  "downloadPath" varchar(255) COLLATE "pg_catalog"."default",
  "fileType" varchar(255) COLLATE "pg_catalog"."default",
  "fileDesc" varchar(255) COLLATE "pg_catalog"."default",
  "binarySize" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_file" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_file"."fileId" IS 'fileId';
COMMENT ON COLUMN "public"."_file"."fileDirectory" IS '文件保存路径;';
COMMENT ON COLUMN "public"."_file"."filename" IS '文件名;';
COMMENT ON COLUMN "public"."_file"."filenameStorage" IS '文件保存名';
COMMENT ON COLUMN "public"."_file"."downloadPath" IS '文件下载路径';
COMMENT ON COLUMN "public"."_file"."fileType" IS '文件类型;(预留字段)';
COMMENT ON COLUMN "public"."_file"."fileDesc" IS '文件描述';
COMMENT ON COLUMN "public"."_file"."binarySize" IS '文件二进制大小';
COMMENT ON COLUMN "public"."_file"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_file"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_file"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_file"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_file" IS '文件表; 软删除未启用;';

-- ----------------------------
-- Records of _file
-- ----------------------------
BEGIN;
INSERT INTO "public"."_file" VALUES (1, '1658154809097_619728', '2022/7/18/', 'girl_beside_bridge.flac', '1658154809097_619728_girl_beside_bridge.flac', '/2022/7/18//1658154809097_619728_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:33:29+08:00');
INSERT INTO "public"."_file" VALUES (2, '1658155049841_775430', '2022/7/18/', 'girl_beside_bridge.flac', '1658155049841_775430_girl_beside_bridge.flac', '/2022/7/18//1658155049841_775430_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:37:30+08:00');
INSERT INTO "public"."_file" VALUES (3, '1658155085886_919958', '2022/7/18/', 'girl_beside_bridge.flac', '1658155085886_919958_girl_beside_bridge.flac', '/2022/7/18//1658155085886_919958_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:38:06+08:00');
INSERT INTO "public"."_file" VALUES (4, '1658155149335_767220', '2022/7/18/', 'girl_beside_bridge.flac', '1658155149335_767220_girl_beside_bridge.flac', '/2022/7/18//1658155149335_767220_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:39:09+08:00');
INSERT INTO "public"."_file" VALUES (5, '1658155585847_905258', 'test/', 'girl_beside_bridge.flac', '1658155585847_905258_girl_beside_bridge.flac', '/test//1658155585847_905258_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:46:26+08:00');
INSERT INTO "public"."_file" VALUES (6, '1658155628178_210170', 'test/', 'girl_beside_bridge.flac', '1658155628178_210170_girl_beside_bridge.flac', '/test//1658155628178_210170_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:47:08+08:00');
INSERT INTO "public"."_file" VALUES (7, '1658155774371_269076', 'test/', 'girl_beside_bridge.flac', '1658155774371_269076_girl_beside_bridge.flac', '/test//1658155774371_269076_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:49:34+08:00');
INSERT INTO "public"."_file" VALUES (8, '1658155816497_901481', 'test/', 'girl_beside_bridge.flac', '1658155816497_901481_girl_beside_bridge.flac', '/test//1658155816497_901481_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:50:16+08:00');
INSERT INTO "public"."_file" VALUES (9, '1658156806074_485604', 'test/', 'girl_beside_bridge.flac', '1658156806074_485604_girl_beside_bridge.flac', '/test//1658156806074_485604_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:06:46+08:00');
INSERT INTO "public"."_file" VALUES (10, '1658156949831_266793', 'test/', 'girl_beside_bridge.flac', '1658156949831_266793_girl_beside_bridge.flac', '/test//1658156949831_266793_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:10+08:00');
INSERT INTO "public"."_file" VALUES (11, '1658156995456_405279', 'test/', 'girl_beside_bridge.flac', '1658156995456_405279_girl_beside_bridge.flac', '/test//1658156995456_405279_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:55+08:00');
INSERT INTO "public"."_file" VALUES (12, '1658157035767_659758', 'test/', 'girl_beside_bridge.flac', '1658157035767_659758_girl_beside_bridge.flac', '/test//1658157035767_659758_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:10:35+08:00');
INSERT INTO "public"."_file" VALUES (13, '1658157220201_516323', 'test/', 'girl_beside_bridge.flac', '1658157220201_516323_girl_beside_bridge.flac', '/test//1658157220201_516323_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:40+08:00');
COMMIT;

-- ----------------------------
-- Table structure for _group
-- ----------------------------
DROP TABLE IF EXISTS "public"."_group";
CREATE TABLE "public"."_group" (
  "id" int4 NOT NULL DEFAULT nextval('_group_id_seq'::regclass),
  "groupId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "groupName" varchar(255) COLLATE "pg_catalog"."default",
  "groupDesc" varchar(255) COLLATE "pg_catalog"."default",
  "groupAvatar" varchar(255) COLLATE "pg_catalog"."default",
  "groupExtend" varchar(1024) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_group" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_group"."groupId" IS 'groupId';
COMMENT ON COLUMN "public"."_group"."groupName" IS '群组名';
COMMENT ON COLUMN "public"."_group"."groupDesc" IS '群组描述';
COMMENT ON COLUMN "public"."_group"."groupAvatar" IS '群logo';
COMMENT ON COLUMN "public"."_group"."groupExtend" IS '拓展字段; { groupNotice: ''xx'' }';
COMMENT ON COLUMN "public"."_group"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_group"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_group"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_group"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_group" IS '群组表; 软删除未启用;';

-- ----------------------------
-- Records of _group
-- ----------------------------
BEGIN;
INSERT INTO "public"."_group" VALUES (1, 'adminGroup', '管理组', '管理组', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (6, 'wudang', '武当', '武当', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (7, 'gaibang', '丐帮', '丐帮', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (8, 'huashan', '华山派', '华山派', NULL, '{}', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _page
-- ----------------------------
DROP TABLE IF EXISTS "public"."_page";
CREATE TABLE "public"."_page" (
  "id" int4 NOT NULL DEFAULT nextval('_page_id_seq'::regclass),
  "pageId" varchar(255) COLLATE "pg_catalog"."default",
  "pageName" varchar(255) COLLATE "pg_catalog"."default",
  "pageType" varchar(255) COLLATE "pg_catalog"."default",
  "sort" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_page" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_page"."pageId" IS 'pageId';
COMMENT ON COLUMN "public"."_page"."pageName" IS 'page name';
COMMENT ON COLUMN "public"."_page"."pageType" IS '页面类型; showInMenu, dynamicInMenu';
COMMENT ON COLUMN "public"."_page"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_page"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_page"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_page"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_page" IS '页面表; 软删除未启用;';

-- ----------------------------
-- Records of _page
-- ----------------------------
BEGIN;
INSERT INTO "public"."_page" VALUES (2, 'help', '帮助', 'dynamicInMenu', '11', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (3, 'login', '登陆', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (6, 'manual', '操作手册', 'showInMenu', '0', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (25, 'protocolDemo', '应用协议', 'showInMenu', '2', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (27, 'frontendDemo01', '前端对接', 'showInMenu', '3', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (28, 'frontendDemo02', '前端-jianghuAxios', 'showInMenu', '4', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (29, 'resourceHook', '前端-resouceHook', 'showInMenu', '6', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (31, 'backendSearchDemo', '服务端搜索', 'showInMenu', '7', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (32, 'dataAccessRight', '数据权限', 'showInMenu', '8', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (34, 'uiAction', 'uiAction', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (35, 'uiActionComponent', 'uiAction-组件通信', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _record_history
-- ----------------------------
DROP TABLE IF EXISTS "public"."_record_history";
CREATE TABLE "public"."_record_history" (
  "id" int4 NOT NULL DEFAULT nextval('_record_history_id_seq'::regclass),
  "table" varchar(255) COLLATE "pg_catalog"."default",
  "recordId" int4,
  "recordContent" text COLLATE "pg_catalog"."default" NOT NULL,
  "packageContent" text COLLATE "pg_catalog"."default" NOT NULL,
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_record_history" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_record_history"."table" IS '表';
COMMENT ON COLUMN "public"."_record_history"."recordId" IS '数据在table中的主键id; recordContent.id';
COMMENT ON COLUMN "public"."_record_history"."recordContent" IS '数据';
COMMENT ON COLUMN "public"."_record_history"."packageContent" IS '当时请求的 package JSON';
COMMENT ON COLUMN "public"."_record_history"."operation" IS '操作; jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_record_history"."operationByUserId" IS '操作者userId; recordContent.operationByUserId';
COMMENT ON COLUMN "public"."_record_history"."operationByUser" IS '操作者用户名; recordContent.operationByUser';
COMMENT ON COLUMN "public"."_record_history"."operationAt" IS '操作时间; recordContent.operationAt; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_record_history" IS '数据历史表';

-- ----------------------------
-- Records of _record_history
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _resource
-- ----------------------------
DROP TABLE IF EXISTS "public"."_resource";
CREATE TABLE "public"."_resource" (
  "id" int4 NOT NULL DEFAULT nextval('_resource_id_seq'::regclass),
  "accessControlTable" varchar(255) COLLATE "pg_catalog"."default",
  "resourceHook" text COLLATE "pg_catalog"."default",
  "pageId" varchar(255) COLLATE "pg_catalog"."default",
  "actionId" varchar(255) COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "resourceType" varchar(255) COLLATE "pg_catalog"."default",
  "appDataSchema" text COLLATE "pg_catalog"."default",
  "resourceData" text COLLATE "pg_catalog"."default",
  "requestDemo" text COLLATE "pg_catalog"."default",
  "responseDemo" text COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_resource" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_resource"."accessControlTable" IS '数据规则控制表';
COMMENT ON COLUMN "public"."_resource"."resourceHook" IS '[ "before": {"service": "xx", "serviceFunction": "xxx"}, "after": [] }';
COMMENT ON COLUMN "public"."_resource"."pageId" IS 'page id; E.g: index';
COMMENT ON COLUMN "public"."_resource"."actionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "public"."_resource"."desc" IS '描述';
COMMENT ON COLUMN "public"."_resource"."resourceType" IS 'resource 类型; E.g: auth service sql';
COMMENT ON COLUMN "public"."_resource"."appDataSchema" IS 'appData 参数校验';
COMMENT ON COLUMN "public"."_resource"."resourceData" IS 'resource 数据; { "service": "auth", "serviceFunction": "passwordLogin" } or  { "table": "${tableName}", "action": "select", "whereCondition": ".where(function() {this.whereNot( { recordStatus: \"active\" })})" }';
COMMENT ON COLUMN "public"."_resource"."requestDemo" IS '请求Demo';
COMMENT ON COLUMN "public"."_resource"."responseDemo" IS '响应Demo';
COMMENT ON COLUMN "public"."_resource"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_resource"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_resource"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_resource"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_resource" IS '请求资源表; 软删除未启用; resourceId=`${appId}.${pageId}.${actionId}`';

-- ----------------------------
-- Records of _resource
-- ----------------------------
BEGIN;
INSERT INTO "public"."_resource" VALUES (101, NULL, NULL, 'allPage', 'getChunkInfo', '✅ 文件分片下载-获取分片信息', 'service', '{}', '{ "service": "file", "serviceFunction": "getChunkInfo" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (102, NULL, NULL, 'allPage', 'uploadFileDone', '✅ 文件分片上传-所有分片上传完毕', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileDone" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (105, NULL, NULL, 'allPage', 'httpUploadByStream', '✅ 文件分片上传-http文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByStream" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (106, NULL, NULL, 'allPage', 'httpUploadByBase64', '✅ 文件分片上传-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (107, NULL, NULL, 'allPage', 'socketUploadByStream', '✅ 文件分片上传-socket 文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (108, NULL, NULL, 'allPage', 'socketUploadByBase64', '✅ 文件分片上传-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (112, NULL, NULL, 'allPage', 'httpDownloadByBase64', '✅ 文件分片下载-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (113, NULL, NULL, 'allPage', 'socketDownloadByStream', '✅ 文件分片下载-socket文件流', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (114, NULL, NULL, 'allPage', 'socketDownloadByBase64', '✅ 文件分片下载-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (231, NULL, NULL, 'login', 'passwordLogin', '✅登陆', 'service', '{}', '{"service": "user", "serviceFunction": "passwordLogin"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:32:57+08:00');
INSERT INTO "public"."_resource" VALUES (251, NULL, NULL, 'allPage', 'logout', '✅登出', 'service', '{}', '{"service": "user", "serviceFunction": "logout"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (253, NULL, NULL, 'allPage', 'userInfo', '✅获取用户信息', 'service', '{}', '{"service": "user", "serviceFunction": "userInfo"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "public"."_resource" VALUES (254, NULL, NULL, 'allPage', 'resetPassword', '✅修改用户密码', 'service', '{}', '{"service": "user", "serviceFunction": "resetPassword"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "public"."_resource" VALUES (258, NULL, NULL, 'allPage', 'getConstantList', '✅查询常量', 'sql', '{}', '{"table": "_constant", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (293, NULL, NULL, 'protocolDemo', 'selectItemList', '✅应用协议-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (294, NULL, NULL, 'protocolDemo', 'insertItem', '✅应用协议-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (295, NULL, NULL, 'protocolDemo', 'updateItem', '✅应用协议-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (296, NULL, NULL, 'protocolDemo', 'deleteItem', '✅应用协议-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (309, NULL, NULL, 'frontendDemo01', 'selectItemList', '✅前端对接-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (310, NULL, NULL, 'frontendDemo01', 'insertItem', '✅前端对接-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (311, NULL, NULL, 'frontendDemo01', 'updateItem', '✅前端对接-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (312, NULL, NULL, 'frontendDemo01', 'deleteItem', '✅前端对接-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (313, NULL, NULL, 'frontendDemo02', 'selectItemList', '✅前端优化-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (314, NULL, NULL, 'frontendDemo02', 'insertItem', '✅前端优化-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (315, NULL, NULL, 'frontendDemo02', 'updateItem', '✅前端优化-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (316, NULL, NULL, 'frontendDemo02', 'deleteItem', '✅前端优化-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (317, NULL, NULL, 'resourceHook', 'selectItemList', '✅前端对接-业务ID-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (318, NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "beforHookForGenerateStudentId"}]}', 'resourceHook', 'insertItem', '✅前端对接-业务ID-添加成员', 'sql', '{"type": "object", "required": ["actionData"], "properties": {"actionData": {"type": "object", "required": ["classId", "name", "level", "gender", "dateOfBirth"], "properties": {"name": {"type": "string"}, "level": {"anyOf": [{"type": "string"}, {"type": "number"}]}, "gender": {"type": "string"}, "classId": {"type": "string"}, "dateOfBirth": {"type": "string", "format": "date"}}, "additionalProperties": true}}, "additionalProperties": true}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (319, NULL, NULL, 'resourceHook', 'updateItem', '✅前端对接-业务ID-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (320, NULL, NULL, 'resourceHook', 'deleteItem', '✅前端对接-业务ID-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (325, NULL, NULL, 'uiAction', 'selectItemList', '✅前端规范-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (326, NULL, NULL, 'uiAction', 'createItem', '✅前端规范-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (327, NULL, NULL, 'uiAction', 'updateItem', '✅前端规范-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (328, NULL, NULL, 'uiAction', 'deleteItem', '✅前端规范-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (331, NULL, NULL, 'uiActionComponent', 'selectItemList', '✅前端规范-组件通信-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (332, NULL, NULL, 'uiActionComponent', 'insertItem', '✅前端规范-组件通信-添加成员', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (333, NULL, NULL, 'uiActionComponent', 'updateItem', '✅前端规范-组件通信-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (334, NULL, NULL, 'uiActionComponent', 'deleteItem', '✅前端规范-组件通信-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (341, 'access_control_student', NULL, 'backendSearchDemo', 'selectItemList', '✅服务端查询-查询列表', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (342, NULL, NULL, 'backendSearchDemo', 'insertItem', '✅服务端查询-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (343, NULL, NULL, 'backendSearchDemo', 'updateItem', '✅服务端查询-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (350, NULL, NULL, 'backendSearchDemo', 'deleteItem', '✅服务端查询-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (352, NULL, NULL, 'dataAccessRight', 'insertItem', '✅数据权限-添加成员', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (353, NULL, NULL, 'dataAccessRight', 'updateItem', '✅数据权限-更新成员', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (354, NULL, NULL, 'dataAccessRight', 'deleteItem', '✅数据权限-删除信息', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (355, NULL, NULL, 'dataAccessRight', 'selectItemListByService', '✅数据权限-查询列表', 'service', '{}', '{"service": "student", "serviceFunction": "selectStudentList"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (356, NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "appendStudentInfoToUserInfo"}]}', 'dataAccessRight', 'selectItemListByDynamicData', '✅数据权限-查询列表', 'sql', '{}', '{"table": "student", "where": {"classId": "ctx.userInfo.studentInfo.classId"}, "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (500, NULL, NULL, 'socket', 'disconnect', '✅ socket断开连接', 'service', '{}', '{"service":"socket", "serviceFunction": "disconnect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "public"."_resource" VALUES (501, NULL, NULL, 'socket', 'connect', '✅ socket 连接', 'service', '{}', '{"service":"socket", "serviceFunction": "connect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "public"."_resource" VALUES (502, NULL, NULL, 'socket', 'sendMsg', '✅ socket 发送消息', 'service', '{}', '{ "service": "socket", "serviceFunction": "sendMsg" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (503, NULL, NULL, 'requestLog', 'selectItemList', '✅请求记录', 'sql', '{}', '{"table": "_resource_request_log", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (504, NULL, NULL, 'recordHistory', 'selectItemList', '✅操作记录', 'sql', '{}', '{"table": "_record_history", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (505, NULL, NULL, 'group', 'insertItem', '✅创建群组', 'sql', '{}', '{"table": "_group", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (506, NULL, NULL, 'group', 'updateItem', '✅更新群组', 'sql', '{}', '{"table": "_group", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (507, NULL, NULL, 'group', 'selectItemList', '✅获取群组列表', 'sql', '{}', '{"table": "_group", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (508, NULL, NULL, 'group', 'deleteItem', '✅删除群组', 'sql', '{}', '{"table": "_group", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _resource_request_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."_resource_request_log";
CREATE TABLE "public"."_resource_request_log" (
  "id" int4 NOT NULL DEFAULT nextval('_resource_request_log_id_seq'::regclass),
  "resourceId" varchar(255) COLLATE "pg_catalog"."default",
  "packageId" varchar(255) COLLATE "pg_catalog"."default",
  "userIp" varchar(255) COLLATE "pg_catalog"."default",
  "userAgent" varchar(255) COLLATE "pg_catalog"."default",
  "deviceId" varchar(255) COLLATE "pg_catalog"."default",
  "userIpRegion" varchar(255) COLLATE "pg_catalog"."default",
  "executeSql" varchar(255) COLLATE "pg_catalog"."default",
  "requestBody" text COLLATE "pg_catalog"."default",
  "responseBody" text COLLATE "pg_catalog"."default",
  "responseStatus" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_resource_request_log" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_resource_request_log"."resourceId" IS 'resource id;';
COMMENT ON COLUMN "public"."_resource_request_log"."packageId" IS 'resource package id';
COMMENT ON COLUMN "public"."_resource_request_log"."userIp" IS '用户ip;';
COMMENT ON COLUMN "public"."_resource_request_log"."userAgent" IS '设备信息';
COMMENT ON COLUMN "public"."_resource_request_log"."deviceId" IS '设备id';
COMMENT ON COLUMN "public"."_resource_request_log"."userIpRegion" IS '用户Ip区域';
COMMENT ON COLUMN "public"."_resource_request_log"."executeSql" IS '执行的sql';
COMMENT ON COLUMN "public"."_resource_request_log"."requestBody" IS '请求body';
COMMENT ON COLUMN "public"."_resource_request_log"."responseBody" IS '响应body';
COMMENT ON COLUMN "public"."_resource_request_log"."responseStatus" IS '执行的结果;  success, fail';
COMMENT ON COLUMN "public"."_resource_request_log"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_resource_request_log"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_resource_request_log"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_resource_request_log"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_resource_request_log" IS '文件表; 软删除未启用;';

-- ----------------------------
-- Records of _resource_request_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _role
-- ----------------------------
DROP TABLE IF EXISTS "public"."_role";
CREATE TABLE "public"."_role" (
  "id" int4 NOT NULL DEFAULT nextval('_role_id_seq'::regclass),
  "roleId" varchar(255) COLLATE "pg_catalog"."default",
  "roleName" varchar(255) COLLATE "pg_catalog"."default",
  "roleDesc" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_role" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_role"."roleId" IS 'roleId';
COMMENT ON COLUMN "public"."_role"."roleName" IS 'role name';
COMMENT ON COLUMN "public"."_role"."roleDesc" IS 'role desc';
COMMENT ON COLUMN "public"."_role"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_role"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_role"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_role"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_role" IS '角色表; 软删除未启用;';

-- ----------------------------
-- Records of _role
-- ----------------------------
BEGIN;
INSERT INTO "public"."_role" VALUES (3, 'administrator', '系统管理员', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_role" VALUES (6, 'boss', '掌门', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_role" VALUES (7, 'disciple', '门徒', '', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _ui
-- ----------------------------
DROP TABLE IF EXISTS "public"."_ui";
CREATE TABLE "public"."_ui" (
  "id" int4 NOT NULL DEFAULT nextval('_ui_id_seq'::regclass),
  "pageId" varchar(255) COLLATE "pg_catalog"."default",
  "uiActionType" varchar(255) COLLATE "pg_catalog"."default",
  "uiActionId" varchar(255) COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "uiActionConfig" text COLLATE "pg_catalog"."default",
  "appDataSchema" text COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_ui" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_ui"."pageId" IS 'page id; E.g: index';
COMMENT ON COLUMN "public"."_ui"."uiActionType" IS 'ui 动作类型，如：fetchData, postData, changeUi';
COMMENT ON COLUMN "public"."_ui"."uiActionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "public"."_ui"."desc" IS '描述';
COMMENT ON COLUMN "public"."_ui"."uiActionConfig" IS 'ui 动作数据';
COMMENT ON COLUMN "public"."_ui"."appDataSchema" IS 'ui 校验数据';
COMMENT ON COLUMN "public"."_ui"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_ui"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_ui"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_ui"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_ui" IS 'ui 施工方案';

-- ----------------------------
-- Records of _ui
-- ----------------------------
BEGIN;
INSERT INTO "public"."_ui" VALUES (1, 'uiAction', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (3, 'uiAction', 'ui', 'startInsertItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearCreateForm"}, {"function": "openCreateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (4, 'uiAction', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "prepareCreateItem"}, {"function": "confirmCreateFormDialog"}], "main": [ {"function": "doCreateItem"}], "after": [{"function": "closeCreateDrawer"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (5, 'uiAction', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "fillUpdateForm"}, {"function": "openUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (6, 'uiAction', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (7, 'uiAction', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [ {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (11, 'uiActionComponent', 'ui', 'refreshTableData', '✅获取表格数据', '{ "before": [{"vueComponent": "classSelectDialog", "function": "selectItem", "functionParamObj": { "item": { "value": "2021-01级-01班" } }}], "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (13, 'uiActionComponent', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (14, 'uiActionComponent', 'ui', 'insertItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "新增", "content": "确定新增吗？" }}], "main": [{"function": "prepareCreateItem"}, {"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (15, 'uiActionComponent', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (16, 'uiActionComponent', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "修改", "content": "确定修改吗？" }}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (17, 'uiActionComponent', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "删除", "content": "确定删除吗？" }}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (30, 'resourceHook', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (31, 'resourceHook', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (32, 'resourceHook', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (33, 'resourceHook', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (34, 'resourceHook', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (35, 'resourceHook', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (40, 'backendSearchDemo', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (41, 'backendSearchDemo', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (42, 'backendSearchDemo', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (43, 'backendSearchDemo', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (44, 'backendSearchDemo', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (45, 'backendSearchDemo', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (50, 'dataAccessRight', 'ui', 'refreshTableData', '✅获取表格数据', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (51, 'dataAccessRight', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (52, 'dataAccessRight', 'ui', 'createItem', '✅创建数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (53, 'dataAccessRight', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (54, 'dataAccessRight', 'ui', 'updateItem', '✅更新数据', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (55, 'dataAccessRight', 'ui', 'deleteItem', '✅删除数据', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user
-- ----------------------------
DROP TABLE IF EXISTS "public"."_user";
CREATE TABLE "public"."_user" (
  "id" int4 NOT NULL DEFAULT nextval('_user_id_seq'::regclass),
  "idSequence" varchar(255) COLLATE "pg_catalog"."default",
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "clearTextPassword" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "md5Salt" varchar(255) COLLATE "pg_catalog"."default",
  "userStatus" varchar(255) COLLATE "pg_catalog"."default",
  "userType" varchar(255) COLLATE "pg_catalog"."default",
  "config" text COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_user" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_user"."idSequence" IS '自增id; 用于生成userId';
COMMENT ON COLUMN "public"."_user"."userId" IS '主键id';
COMMENT ON COLUMN "public"."_user"."username" IS '用户名(登陆)';
COMMENT ON COLUMN "public"."_user"."clearTextPassword" IS '明文密码';
COMMENT ON COLUMN "public"."_user"."password" IS '密码';
COMMENT ON COLUMN "public"."_user"."md5Salt" IS 'md5Salt';
COMMENT ON COLUMN "public"."_user"."userStatus" IS '用户账号状态：活跃或关闭';
COMMENT ON COLUMN "public"."_user"."userType" IS '用户类型; staff, student.';
COMMENT ON COLUMN "public"."_user"."config" IS '配置信息';
COMMENT ON COLUMN "public"."_user"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_user"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_user"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user" IS '用户表';

-- ----------------------------
-- Records of _user
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user" VALUES (42, NULL, 'admin', '系统管理员', '123456', 'a77042997567ca49eeda2226840e7ebe', 'bxgpY5H2Up0v', 'active', NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-07-18T23:12:36+08:00');
INSERT INTO "public"."_user" VALUES (43, NULL, 'W00001', '张三丰', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (44, NULL, 'W00002', '张无忌', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (45, NULL, 'G00001', '洪七公', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (46, NULL, 'G00002', '郭靖', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (47, NULL, 'H00001', '岳不群', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (48, NULL, 'H00002', '令狐冲', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."_user_group_role";
CREATE TABLE "public"."_user_group_role" (
  "id" int4 NOT NULL DEFAULT nextval('_user_group_role_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "groupId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "roleId" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_user_group_role" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_user_group_role"."userId" IS '用户id';
COMMENT ON COLUMN "public"."_user_group_role"."groupId" IS '群组Id';
COMMENT ON COLUMN "public"."_user_group_role"."roleId" IS '角色Id';
COMMENT ON COLUMN "public"."_user_group_role"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_user_group_role"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_user_group_role"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role" IS '用户群组角色关联表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_group_role" VALUES (568, 'admin', 'adminGroup', 'administrator', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (569, 'W00001', 'wudang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (570, 'W00002', 'wudang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (573, 'G00001', 'gaibang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (574, 'G00002', 'gaibang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (577, 'H00001', 'huashan', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role" VALUES (578, 'H00002', 'huashan', 'disciple', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_page
-- ----------------------------
DROP TABLE IF EXISTS "public"."_user_group_role_page";
CREATE TABLE "public"."_user_group_role_page" (
  "id" int4 NOT NULL DEFAULT nextval('_user_group_role_page_id_seq'::regclass),
  "user" varchar(255) COLLATE "pg_catalog"."default",
  "group" varchar(255) COLLATE "pg_catalog"."default",
  "role" varchar(255) COLLATE "pg_catalog"."default",
  "page" varchar(255) COLLATE "pg_catalog"."default",
  "allowOrDeny" varchar(255) COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_user_group_role_page" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_user_group_role_page"."user" IS 'userId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."group" IS 'groupId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."role" IS 'roleId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."page" IS 'pageId id';
COMMENT ON COLUMN "public"."_user_group_role_page"."allowOrDeny" IS '用户群组角色 匹配后 执行动作; allow、deny';
COMMENT ON COLUMN "public"."_user_group_role_page"."desc" IS '映射描述';
COMMENT ON COLUMN "public"."_user_group_role_page"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role_page" IS '用户群组角色 - 页面 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_page
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_group_role_page" VALUES (17, '*', 'public', '*', 'login', 'allow', '登陆页; 开放给所有用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (18, '*', 'login', '*', 'manual', 'allow', '操作手册页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (19, '*', 'login', '*', 'help', 'allow', '帮助页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (21, '*', 'adminGroup', 'administrator', '*', 'allow', '所有页面; 开放给应用管理者;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (27, '*', 'wudang', 'boss,disciple', 'protocolDemo', 'allow', 'studentManagement01; 开放给武当派派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (28, '*', 'gaibang', 'boss,disciple', 'frontendDemo01,frontendDemo02', 'allow', 'studentManagement02&studentManagement03; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (29, '*', 'huashan', 'boss,disciple', 'backendSearchDemo', 'allow', 'studentManagement04; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (30, '*', '*', 'boss,disciple', 'dataAccessRight', 'allow', '数据权限demo', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_resource
-- ----------------------------
DROP TABLE IF EXISTS "public"."_user_group_role_resource";
CREATE TABLE "public"."_user_group_role_resource" (
  "id" int4 NOT NULL DEFAULT nextval('_user_group_role_resource_id_seq'::regclass),
  "user" varchar(255) COLLATE "pg_catalog"."default",
  "group" varchar(255) COLLATE "pg_catalog"."default",
  "role" varchar(255) COLLATE "pg_catalog"."default",
  "resource" varchar(255) COLLATE "pg_catalog"."default",
  "allowOrDeny" varchar(255) COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_user_group_role_resource" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_user_group_role_resource"."user" IS 'userId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."group" IS 'groupId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."role" IS 'roleId 或者 通配符; 通配符: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."resource" IS 'resourceId 或者 通配符; 通配符: *, !resourceId';
COMMENT ON COLUMN "public"."_user_group_role_resource"."allowOrDeny" IS '用户群组角色 匹配后 执行动作; allow、deny';
COMMENT ON COLUMN "public"."_user_group_role_resource"."desc" IS '映射描述';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role_resource" IS '用户群组角色 - 请求资源 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_resource
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_group_role_resource" VALUES (1, '*', 'public', '*', 'login.passwordLogin', 'allow', '登陆resource, 开放给所有用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (11, '*', 'public', '*', 'allPage.getConstantList', 'allow', '查询常量resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (31, '*', 'login', '*', 'allPage.logout', 'allow', '登出resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (32, '*', 'login', '*', 'allPage.refreshToken', 'allow', '刷新authToken resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (33, '*', 'login', '*', 'allPage.userInfo', 'allow', '用户个人信息resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (34, '*', 'login', '*', 'allPage.uploadByBase64', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (35, '*', 'login', '*', 'allPage.uploadByStream', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (51, '*', 'adminGroup', 'administrator', '*', 'allow', '应用管理者, 赋予所有resource权限', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (117, '*', 'wudang', 'boss', 'protocolDemo.*', 'allow', 'page01 内的所有操作; 开放给武当派掌门;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (118, '*', 'wudang', 'disciple', 'protocolDemo.selectItemList', 'allow', 'page01 内的查询列表操作; 开放给武当派门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (125, '*', 'gaibang', 'boss', 'frontendDemo01.*,frontendDemo02.*', 'allow', 'page02&page03 内的所有操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (126, '*', 'gaibang', 'disciple', 'frontendDemo01.selectItemList,frontendDemo02.selectItemList', 'allow', 'page02&page03 内的查询列表操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (131, '*', 'huashan', 'boss', 'backendSearchDemo.*', 'allow', 'page04 内的所有操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (132, '*', 'huashan', 'disciple', 'backendSearchDemo.selectItemList', 'allow', 'page04 内的查询列表操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (133, '*', '*', 'boss', 'dataAccessRight.*', 'allow', 'page05 内的所有操作; 开放给所有掌门', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (134, '*', '*', 'disciple', 'dataAccessRight.selectItemList', 'allow', 'page05 内的查询列表操作; 开放给所有门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (135, '*', 'public', '*', 'socket.disconnect', 'allow', 'socket断开连接', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_session
-- ----------------------------
DROP TABLE IF EXISTS "public"."_user_session";
CREATE TABLE "public"."_user_session" (
  "id" int4 NOT NULL DEFAULT nextval('_user_session_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "userIp" varchar(255) COLLATE "pg_catalog"."default",
  "userIpRegion" varchar(255) COLLATE "pg_catalog"."default",
  "userAgent" text COLLATE "pg_catalog"."default",
  "deviceId" varchar(255) COLLATE "pg_catalog"."default",
  "deviceType" varchar(255) COLLATE "pg_catalog"."default",
  "socketStatus" varchar(255) COLLATE "pg_catalog"."default",
  "authToken" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."_user_session" OWNER TO "postgres";
COMMENT ON COLUMN "public"."_user_session"."userId" IS '用户id';
COMMENT ON COLUMN "public"."_user_session"."userIp" IS '用户ip';
COMMENT ON COLUMN "public"."_user_session"."userIpRegion" IS '用户Ip区域';
COMMENT ON COLUMN "public"."_user_session"."userAgent" IS '请求的 agent';
COMMENT ON COLUMN "public"."_user_session"."deviceId" IS '设备id';
COMMENT ON COLUMN "public"."_user_session"."deviceType" IS '设备类型; flutter, web, bot_databot, bot_chatbot, bot_xiaochengxu';
COMMENT ON COLUMN "public"."_user_session"."socketStatus" IS 'socket状态';
COMMENT ON COLUMN "public"."_user_session"."authToken" IS 'auth token';
COMMENT ON COLUMN "public"."_user_session"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_session"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."_user_session"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."_user_session"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_session" IS '用户session表; deviceId 维度;软删除未启用;';

-- ----------------------------
-- Records of _user_session
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_session" VALUES (2083, 'admin', '127.0.0.1', '', '', 'chrome_1658157217726', 'web', 'offline', 'bNHDMRUBfv3dd3Ix55J6b_HIpRJtjtz-zXbZ', 'jhInsert', NULL, NULL, '2022-07-18T23:13:37+08:00');
INSERT INTO "public"."_user_session" VALUES (2084, 'admin', '127.0.0.1', '', '', 'chrome_1658157218545', 'web', 'offline', 'ubaVk-PckXQsZyT9ZaJcusaW-nHveS3WZJiq', 'jhInsert', NULL, NULL, '2022-07-18T23:13:38+08:00');
INSERT INTO "public"."_user_session" VALUES (2085, 'admin', '127.0.0.1', '', '', 'chrome_1658157222591', 'web', 'offline', 'KO3nkam82x97ApK__duM29VToZrxVw4WGXn-', 'jhInsert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO "public"."_user_session" VALUES (2086, 'admin', '127.0.0.1', '', '', 'chrome_1658157223475', 'web', 'offline', 'mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz', 'jhInsert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO "public"."_user_session" VALUES (2087, 'admin', '127.0.0.1', '', '', 'chrome_1658157224929', 'web', 'offline', 'DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw', 'jhInsert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO "public"."_user_session" VALUES (2088, 'W00001', '127.0.0.1', '', '', 'chrome_1658157225065', 'web', 'offline', 'CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO "public"."_user_session" VALUES (2089, 'W00002', '127.0.0.1', '', '', 'chrome_1658157225121', 'web', 'offline', '_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO "public"."_user_session" VALUES (2086, 'admin', '127.0.0.1', '', '', 'chrome_1658157223475', 'web', 'offline', 'mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz', 'jhInsert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO "public"."_user_session" VALUES (2087, 'admin', '127.0.0.1', '', '', 'chrome_1658157224929', 'web', 'offline', 'DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw', 'jhInsert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO "public"."_user_session" VALUES (2088, 'W00001', '127.0.0.1', '', '', 'chrome_1658157225065', 'web', 'offline', 'CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO "public"."_user_session" VALUES (2089, 'W00002', '127.0.0.1', '', '', 'chrome_1658157225121', 'web', 'offline', '_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
COMMIT;

-- ----------------------------
-- Table structure for access_control_student
-- ----------------------------
DROP TABLE IF EXISTS "public"."access_control_student";
CREATE TABLE "public"."access_control_student" (
  "id" int4 NOT NULL DEFAULT nextval('access_control_student_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "resourceData" varchar(255) COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."access_control_student" OWNER TO "postgres";
COMMENT ON COLUMN "public"."access_control_student"."userId" IS '主键id';
COMMENT ON COLUMN "public"."access_control_student"."username" IS '用户名(登陆)';
COMMENT ON COLUMN "public"."access_control_student"."resourceData" IS '明文密码';
COMMENT ON COLUMN "public"."access_control_student"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."access_control_student"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."access_control_student"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."access_control_student"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."access_control_student" IS '学生表的 accessControl 表';

-- ----------------------------
-- Records of access_control_student
-- ----------------------------
BEGIN;
INSERT INTO "public"."access_control_student" VALUES (50, 'G00001', '洪七公', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."access_control_student" VALUES (51, 'H00001', '岳不群', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS "public"."student";
CREATE TABLE "public"."student" (
  "id" int4 NOT NULL DEFAULT nextval('student_id_seq'::regclass),
  "studentId" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "gender" varchar(255) COLLATE "pg_catalog"."default",
  "dateOfBirth" varchar(255) COLLATE "pg_catalog"."default",
  "classId" varchar(255) COLLATE "pg_catalog"."default",
  "level" varchar(255) COLLATE "pg_catalog"."default",
  "bodyHeight" varchar(255) COLLATE "pg_catalog"."default",
  "studentStatus" varchar(255) COLLATE "pg_catalog"."default",
  "remarks" text COLLATE "pg_catalog"."default",
  "operation" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUserId" varchar(255) COLLATE "pg_catalog"."default",
  "operationByUser" varchar(255) COLLATE "pg_catalog"."default",
  "operationAt" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."student" OWNER TO "postgres";
COMMENT ON COLUMN "public"."student"."studentId" IS '学生ID';
COMMENT ON COLUMN "public"."student"."name" IS '学生名字';
COMMENT ON COLUMN "public"."student"."gender" IS '性别';
COMMENT ON COLUMN "public"."student"."dateOfBirth" IS '出生日期';
COMMENT ON COLUMN "public"."student"."classId" IS '班级ID';
COMMENT ON COLUMN "public"."student"."level" IS '年级';
COMMENT ON COLUMN "public"."student"."bodyHeight" IS '身高';
COMMENT ON COLUMN "public"."student"."studentStatus" IS '学生状态';
COMMENT ON COLUMN "public"."student"."remarks" IS '备注';
COMMENT ON COLUMN "public"."student"."operation" IS '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."student"."operationByUserId" IS '操作者userId';
COMMENT ON COLUMN "public"."student"."operationByUser" IS '操作者用户名';
COMMENT ON COLUMN "public"."student"."operationAt" IS '操作时间; E.g: 2021-05-28T10:24:54+08:00 ';

-- ----------------------------
-- Records of student
-- ----------------------------
BEGIN;
INSERT INTO "public"."student" VALUES (161, 'G00003', '小虾米', 'male', '2022-01-25', '2021-01级-02班', '02', '180', '正常', '小虾米', 'jhUpdate', 'admin', '系统管理员', '2022-05-01T15:29:52+08:00');
INSERT INTO "public"."student" VALUES (168, '100067', '1111', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-01T23:38:23+08:00');
INSERT INTO "public"."student" VALUES (173, '121432', '21434', NULL, NULL, '2021-01级-01班', NULL, NULL, NULL, NULL, 'jhInsert', 'admin', '系统管理员', '2022-05-01T23:37:58+08:00');
INSERT INTO "public"."student" VALUES (174, 'admin', '系统管理员', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T21:17:52+08:00');
INSERT INTO "public"."student" VALUES (175, '1000221', '221', 'male', '2022-05-08', '2021-01级-02班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T20:50:51+08:00');
INSERT INTO "public"."student" VALUES (210, 'hook1001', 'student_name', 'male', '2022-07-13', '1234', '01', NULL, NULL, '备注', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:12:37+08:00');
COMMIT;

-- ----------------------------
-- View structure for _view01_user
-- ----------------------------
DROP VIEW IF EXISTS "public"."_view01_user";
CREATE VIEW "public"."_view01_user" AS  SELECT _user.id,
    _user."idSequence",
    _user."userId",
    _user.username,
    _user."clearTextPassword",
    _user.password,
    _user."md5Salt",
    _user."userStatus",
    _user."userType",
    _user.config,
    _user.operation,
    _user."operationByUserId",
    _user."operationByUser",
    _user."operationAt"
   FROM _user;
ALTER TABLE "public"."_view01_user" OWNER TO "postgres";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_cache_id_seq"
OWNED BY "public"."_cache"."id";
SELECT setval('"public"."_cache_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_constant_id_seq"
OWNED BY "public"."_constant"."id";
SELECT setval('"public"."_constant_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_file_id_seq"
OWNED BY "public"."_file"."id";
SELECT setval('"public"."_file_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_group_id_seq"
OWNED BY "public"."_group"."id";
SELECT setval('"public"."_group_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_page_id_seq"
OWNED BY "public"."_page"."id";
SELECT setval('"public"."_page_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_record_history_id_seq"
OWNED BY "public"."_record_history"."id";
SELECT setval('"public"."_record_history_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_resource_id_seq"
OWNED BY "public"."_resource"."id";
SELECT setval('"public"."_resource_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_resource_request_log_id_seq"
OWNED BY "public"."_resource_request_log"."id";
SELECT setval('"public"."_resource_request_log_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_role_id_seq"
OWNED BY "public"."_role"."id";
SELECT setval('"public"."_role_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_ui_id_seq"
OWNED BY "public"."_ui"."id";
SELECT setval('"public"."_ui_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."access_control_student_id_seq"
OWNED BY "public"."access_control_student"."id";
SELECT setval('"public"."access_control_student_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."student_id_seq"
OWNED BY "public"."student"."id";
SELECT setval('"public"."student_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_user_session_id_seq"
OWNED BY "public"."_user_session"."id";
SELECT setval('"public"."_user_session_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_user_group_role_id_seq"
OWNED BY "public"."_user_group_role"."id";
SELECT setval('"public"."_user_group_role_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_user_group_role_page_id_seq"
OWNED BY "public"."_user_group_role_page"."id";
SELECT setval('"public"."_user_group_role_page_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_user_group_role_resource_id_seq"
OWNED BY "public"."_user_group_role_resource"."id";
SELECT setval('"public"."_user_group_role_resource_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."_user_id_seq"
OWNED BY "public"."_user"."id";
SELECT setval('"public"."_user_id_seq"', 2, false);

-- ----------------------------
-- Indexes structure for table _user
-- ----------------------------
CREATE INDEX "userId_index" ON "public"."_user" USING btree (
  "userId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "username_index" ON "public"."_user" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table _user
-- ----------------------------
ALTER TABLE "public"."_user" ADD CONSTRAINT "_user_pkey" PRIMARY KEY ("id");
