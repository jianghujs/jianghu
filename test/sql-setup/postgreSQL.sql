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
COMMENT ON COLUMN "public"."_cache"."userId" IS '??????Id';
COMMENT ON COLUMN "public"."_cache"."content" IS '????????????';
COMMENT ON COLUMN "public"."_cache"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_cache"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_cache"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_cache"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_cache" IS '?????????';

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
COMMENT ON COLUMN "public"."_constant"."constantType" IS '????????????; object, array';
COMMENT ON COLUMN "public"."_constant"."desc" IS '??????';
COMMENT ON COLUMN "public"."_constant"."constantValue" IS '????????????; object, array';
COMMENT ON COLUMN "public"."_constant"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_constant"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_constant"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_constant"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_constant" IS '?????????; ??????????????????;';

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
COMMENT ON COLUMN "public"."_file"."fileDirectory" IS '??????????????????;';
COMMENT ON COLUMN "public"."_file"."filename" IS '?????????;';
COMMENT ON COLUMN "public"."_file"."filenameStorage" IS '???????????????';
COMMENT ON COLUMN "public"."_file"."downloadPath" IS '??????????????????';
COMMENT ON COLUMN "public"."_file"."fileType" IS '????????????;(????????????)';
COMMENT ON COLUMN "public"."_file"."fileDesc" IS '????????????';
COMMENT ON COLUMN "public"."_file"."binarySize" IS '?????????????????????';
COMMENT ON COLUMN "public"."_file"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_file"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_file"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_file"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_file" IS '?????????; ??????????????????;';

-- ----------------------------
-- Records of _file
-- ----------------------------
BEGIN;
INSERT INTO "public"."_file" VALUES (1, '1658154809097_619728', '2022/7/18/', 'girl_beside_bridge.flac', '1658154809097_619728_girl_beside_bridge.flac', '/2022/7/18//1658154809097_619728_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:33:29+08:00');
INSERT INTO "public"."_file" VALUES (2, '1658155049841_775430', '2022/7/18/', 'girl_beside_bridge.flac', '1658155049841_775430_girl_beside_bridge.flac', '/2022/7/18//1658155049841_775430_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:37:30+08:00');
INSERT INTO "public"."_file" VALUES (3, '1658155085886_919958', '2022/7/18/', 'girl_beside_bridge.flac', '1658155085886_919958_girl_beside_bridge.flac', '/2022/7/18//1658155085886_919958_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:38:06+08:00');
INSERT INTO "public"."_file" VALUES (4, '1658155149335_767220', '2022/7/18/', 'girl_beside_bridge.flac', '1658155149335_767220_girl_beside_bridge.flac', '/2022/7/18//1658155149335_767220_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:39:09+08:00');
INSERT INTO "public"."_file" VALUES (5, '1658155585847_905258', 'test/', 'girl_beside_bridge.flac', '1658155585847_905258_girl_beside_bridge.flac', '/test//1658155585847_905258_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:46:26+08:00');
INSERT INTO "public"."_file" VALUES (6, '1658155628178_210170', 'test/', 'girl_beside_bridge.flac', '1658155628178_210170_girl_beside_bridge.flac', '/test//1658155628178_210170_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:47:08+08:00');
INSERT INTO "public"."_file" VALUES (7, '1658155774371_269076', 'test/', 'girl_beside_bridge.flac', '1658155774371_269076_girl_beside_bridge.flac', '/test//1658155774371_269076_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:49:34+08:00');
INSERT INTO "public"."_file" VALUES (8, '1658155816497_901481', 'test/', 'girl_beside_bridge.flac', '1658155816497_901481_girl_beside_bridge.flac', '/test//1658155816497_901481_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T22:50:16+08:00');
INSERT INTO "public"."_file" VALUES (9, '1658156806074_485604', 'test/', 'girl_beside_bridge.flac', '1658156806074_485604_girl_beside_bridge.flac', '/test//1658156806074_485604_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:06:46+08:00');
INSERT INTO "public"."_file" VALUES (10, '1658156949831_266793', 'test/', 'girl_beside_bridge.flac', '1658156949831_266793_girl_beside_bridge.flac', '/test//1658156949831_266793_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:09:10+08:00');
INSERT INTO "public"."_file" VALUES (11, '1658156995456_405279', 'test/', 'girl_beside_bridge.flac', '1658156995456_405279_girl_beside_bridge.flac', '/test//1658156995456_405279_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:09:55+08:00');
INSERT INTO "public"."_file" VALUES (12, '1658157035767_659758', 'test/', 'girl_beside_bridge.flac', '1658157035767_659758_girl_beside_bridge.flac', '/test//1658157035767_659758_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:10:35+08:00');
INSERT INTO "public"."_file" VALUES (13, '1658157220201_516323', 'test/', 'girl_beside_bridge.flac', '1658157220201_516323_girl_beside_bridge.flac', '/test//1658157220201_516323_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:13:40+08:00');
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
COMMENT ON COLUMN "public"."_group"."groupName" IS '?????????';
COMMENT ON COLUMN "public"."_group"."groupDesc" IS '????????????';
COMMENT ON COLUMN "public"."_group"."groupAvatar" IS '???logo';
COMMENT ON COLUMN "public"."_group"."groupExtend" IS '????????????; { groupNotice: ''xx'' }';
COMMENT ON COLUMN "public"."_group"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_group"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_group"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_group"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_group" IS '?????????; ??????????????????;';

-- ----------------------------
-- Records of _group
-- ----------------------------
BEGIN;
INSERT INTO "public"."_group" VALUES (1, 'adminGroup', '?????????', '?????????', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (6, 'wudang', '??????', '??????', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (7, 'gaibang', '??????', '??????', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_group" VALUES (8, 'huashan', '?????????', '?????????', NULL, '{}', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_page"."pageType" IS '????????????; showInMenu, dynamicInMenu';
COMMENT ON COLUMN "public"."_page"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_page"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_page"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_page"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_page" IS '?????????; ??????????????????;';

-- ----------------------------
-- Records of _page
-- ----------------------------
BEGIN;
INSERT INTO "public"."_page" VALUES (2, 'help', '??????', 'dynamicInMenu', '11', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (3, 'login', '??????', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (6, 'manual', '????????????', 'showInMenu', '0', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (25, 'protocolDemo', '????????????', 'showInMenu', '2', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (27, 'frontendDemo01', '????????????', 'showInMenu', '3', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (28, 'frontendDemo02', '??????-jianghuAxios', 'showInMenu', '4', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (29, 'resourceHook', '??????-resouceHook', 'showInMenu', '6', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (31, 'backendSearchDemo', '???????????????', 'showInMenu', '7', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (32, 'dataAccessRight', '????????????', 'showInMenu', '8', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (34, 'uiAction', 'uiAction', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_page" VALUES (35, 'uiActionComponent', 'uiAction-????????????', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_record_history"."table" IS '???';
COMMENT ON COLUMN "public"."_record_history"."recordId" IS '?????????table????????????id; recordContent.id';
COMMENT ON COLUMN "public"."_record_history"."recordContent" IS '??????';
COMMENT ON COLUMN "public"."_record_history"."packageContent" IS '??????????????? package JSON';
COMMENT ON COLUMN "public"."_record_history"."operation" IS '??????; jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_record_history"."operationByUserId" IS '?????????userId; recordContent.operationByUserId';
COMMENT ON COLUMN "public"."_record_history"."operationByUser" IS '??????????????????; recordContent.operationByUser';
COMMENT ON COLUMN "public"."_record_history"."operationAt" IS '????????????; recordContent.operationAt; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_record_history" IS '???????????????';

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
COMMENT ON COLUMN "public"."_resource"."accessControlTable" IS '?????????????????????';
COMMENT ON COLUMN "public"."_resource"."resourceHook" IS '[ "before": {"service": "xx", "serviceFunction": "xxx"}, "after": [] }';
COMMENT ON COLUMN "public"."_resource"."pageId" IS 'page id; E.g: index';
COMMENT ON COLUMN "public"."_resource"."actionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "public"."_resource"."desc" IS '??????';
COMMENT ON COLUMN "public"."_resource"."resourceType" IS 'resource ??????; E.g: auth service sql';
COMMENT ON COLUMN "public"."_resource"."appDataSchema" IS 'appData ????????????';
COMMENT ON COLUMN "public"."_resource"."resourceData" IS 'resource ??????; { "service": "auth", "serviceFunction": "passwordLogin" } or  { "table": "${tableName}", "action": "select", "whereCondition": ".where(function() {this.whereNot( { recordStatus: \"active\" })})" }';
COMMENT ON COLUMN "public"."_resource"."requestDemo" IS '??????Demo';
COMMENT ON COLUMN "public"."_resource"."responseDemo" IS '??????Demo';
COMMENT ON COLUMN "public"."_resource"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_resource"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_resource"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_resource"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_resource" IS '???????????????; ??????????????????; resourceId=`${appId}.${pageId}.${actionId}`';

-- ----------------------------
-- Records of _resource
-- ----------------------------
BEGIN;
INSERT INTO "public"."_resource" VALUES (101, NULL, NULL, 'allPage', 'getChunkInfo', '??? ??????????????????-??????????????????', 'service', '{}', '{ "service": "file", "serviceFunction": "getChunkInfo" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (102, NULL, NULL, 'allPage', 'uploadFileDone', '??? ??????????????????-????????????????????????', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileDone" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (105, NULL, NULL, 'allPage', 'httpUploadByStream', '??? ??????????????????-http?????????', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByStream" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (106, NULL, NULL, 'allPage', 'httpUploadByBase64', '??? ??????????????????-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (107, NULL, NULL, 'allPage', 'socketUploadByStream', '??? ??????????????????-socket ?????????', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (108, NULL, NULL, 'allPage', 'socketUploadByBase64', '??? ??????????????????-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "uploadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (112, NULL, NULL, 'allPage', 'httpDownloadByBase64', '??? ??????????????????-http base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (113, NULL, NULL, 'allPage', 'socketDownloadByStream', '??? ??????????????????-socket?????????', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBuffer" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (114, NULL, NULL, 'allPage', 'socketDownloadByBase64', '??? ??????????????????-socket base64', 'service', '{}', '{ "service": "file", "serviceFunction": "downloadFileChunkByBase64" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO "public"."_resource" VALUES (231, NULL, NULL, 'login', 'passwordLogin', '?????????', 'service', '{}', '{"service": "user", "serviceFunction": "passwordLogin"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:32:57+08:00');
INSERT INTO "public"."_resource" VALUES (251, NULL, NULL, 'allPage', 'logout', '?????????', 'service', '{}', '{"service": "user", "serviceFunction": "logout"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (253, NULL, NULL, 'allPage', 'userInfo', '?????????????????????', 'service', '{}', '{"service": "user", "serviceFunction": "userInfo"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "public"."_resource" VALUES (254, NULL, NULL, 'allPage', 'resetPassword', '?????????????????????', 'service', '{}', '{"service": "user", "serviceFunction": "resetPassword"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO "public"."_resource" VALUES (258, NULL, NULL, 'allPage', 'getConstantList', '???????????????', 'sql', '{}', '{"table": "_constant", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (293, NULL, NULL, 'protocolDemo', 'selectItemList', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (294, NULL, NULL, 'protocolDemo', 'insertItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (295, NULL, NULL, 'protocolDemo', 'updateItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (296, NULL, NULL, 'protocolDemo', 'deleteItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (309, NULL, NULL, 'frontendDemo01', 'selectItemList', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (310, NULL, NULL, 'frontendDemo01', 'insertItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (311, NULL, NULL, 'frontendDemo01', 'updateItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (312, NULL, NULL, 'frontendDemo01', 'deleteItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (313, NULL, NULL, 'frontendDemo02', 'selectItemList', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (314, NULL, NULL, 'frontendDemo02', 'insertItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (315, NULL, NULL, 'frontendDemo02', 'updateItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (316, NULL, NULL, 'frontendDemo02', 'deleteItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (317, NULL, NULL, 'resourceHook', 'selectItemList', '???????????????-??????ID-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (318, NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "beforHookForGenerateStudentId"}]}', 'resourceHook', 'insertItem', '???????????????-??????ID-????????????', 'sql', '{"type": "object", "required": ["actionData"], "properties": {"actionData": {"type": "object", "required": ["classId", "name", "level", "gender", "dateOfBirth"], "properties": {"name": {"type": "string"}, "level": {"anyOf": [{"type": "string"}, {"type": "number"}]}, "gender": {"type": "string"}, "classId": {"type": "string"}, "dateOfBirth": {"type": "string", "format": "date"}}, "additionalProperties": true}}, "additionalProperties": true}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (319, NULL, NULL, 'resourceHook', 'updateItem', '???????????????-??????ID-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (320, NULL, NULL, 'resourceHook', 'deleteItem', '???????????????-??????ID-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (325, NULL, NULL, 'uiAction', 'selectItemList', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (326, NULL, NULL, 'uiAction', 'createItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (327, NULL, NULL, 'uiAction', 'updateItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (328, NULL, NULL, 'uiAction', 'deleteItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (331, NULL, NULL, 'uiActionComponent', 'selectItemList', '???????????????-????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (332, NULL, NULL, 'uiActionComponent', 'insertItem', '???????????????-????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (333, NULL, NULL, 'uiActionComponent', 'updateItem', '???????????????-????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (334, NULL, NULL, 'uiActionComponent', 'deleteItem', '???????????????-????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (341, 'access_control_student', NULL, 'backendSearchDemo', 'selectItemList', '??????????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (342, NULL, NULL, 'backendSearchDemo', 'insertItem', '??????????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (343, NULL, NULL, 'backendSearchDemo', 'updateItem', '??????????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (350, NULL, NULL, 'backendSearchDemo', 'deleteItem', '??????????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (352, NULL, NULL, 'dataAccessRight', 'insertItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "insert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (353, NULL, NULL, 'dataAccessRight', 'updateItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (354, NULL, NULL, 'dataAccessRight', 'deleteItem', '???????????????-????????????', 'sql', '{}', '{"table": "student", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (355, NULL, NULL, 'dataAccessRight', 'selectItemListByService', '???????????????-????????????', 'service', '{}', '{"service": "student", "serviceFunction": "selectStudentList"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (356, NULL, '{"after": [], "before": [{"service": "student", "serviceFunction": "appendStudentInfoToUserInfo"}]}', 'dataAccessRight', 'selectItemListByDynamicData', '???????????????-????????????', 'sql', '{}', '{"table": "student", "where": {"classId": "ctx.userInfo.studentInfo.classId"}, "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (500, NULL, NULL, 'socket', 'disconnect', '??? socket????????????', 'service', '{}', '{"service":"socket", "serviceFunction": "disconnect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "public"."_resource" VALUES (501, NULL, NULL, 'socket', 'connect', '??? socket ??????', 'service', '{}', '{"service":"socket", "serviceFunction": "connect"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO "public"."_resource" VALUES (502, NULL, NULL, 'socket', 'sendMsg', '??? socket ????????????', 'service', '{}', '{ "service": "socket", "serviceFunction": "sendMsg" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (503, NULL, NULL, 'requestLog', 'selectItemList', '???????????????', 'sql', '{}', '{"table": "_resource_request_log", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (504, NULL, NULL, 'recordHistory', 'selectItemList', '???????????????', 'sql', '{}', '{"table": "_record_history", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (505, NULL, NULL, 'group', 'insertItem', '???????????????', 'sql', '{}', '{"table": "_group", "operation": "jhInsert"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (506, NULL, NULL, 'group', 'updateItem', '???????????????', 'sql', '{}', '{"table": "_group", "operation": "jhUpdate"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (507, NULL, NULL, 'group', 'selectItemList', '?????????????????????', 'sql', '{}', '{"table": "_group", "operation": "select"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_resource" VALUES (508, NULL, NULL, 'group', 'deleteItem', '???????????????', 'sql', '{}', '{"table": "_group", "operation": "jhDelete"}', NULL, NULL, 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_resource_request_log"."userIp" IS '??????ip;';
COMMENT ON COLUMN "public"."_resource_request_log"."userAgent" IS '????????????';
COMMENT ON COLUMN "public"."_resource_request_log"."deviceId" IS '??????id';
COMMENT ON COLUMN "public"."_resource_request_log"."userIpRegion" IS '??????Ip??????';
COMMENT ON COLUMN "public"."_resource_request_log"."executeSql" IS '?????????sql';
COMMENT ON COLUMN "public"."_resource_request_log"."requestBody" IS '??????body';
COMMENT ON COLUMN "public"."_resource_request_log"."responseBody" IS '??????body';
COMMENT ON COLUMN "public"."_resource_request_log"."responseStatus" IS '???????????????;  success, fail';
COMMENT ON COLUMN "public"."_resource_request_log"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_resource_request_log"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_resource_request_log"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_resource_request_log"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_resource_request_log" IS '?????????; ??????????????????;';

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
COMMENT ON COLUMN "public"."_role"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_role"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_role"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_role"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_role" IS '?????????; ??????????????????;';

-- ----------------------------
-- Records of _role
-- ----------------------------
BEGIN;
INSERT INTO "public"."_role" VALUES (3, 'administrator', '???????????????', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_role" VALUES (6, 'boss', '??????', '', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_role" VALUES (7, 'disciple', '??????', '', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_ui"."uiActionType" IS 'ui ?????????????????????fetchData, postData, changeUi';
COMMENT ON COLUMN "public"."_ui"."uiActionId" IS 'action id; E.g: selectXXXByXXX';
COMMENT ON COLUMN "public"."_ui"."desc" IS '??????';
COMMENT ON COLUMN "public"."_ui"."uiActionConfig" IS 'ui ????????????';
COMMENT ON COLUMN "public"."_ui"."appDataSchema" IS 'ui ????????????';
COMMENT ON COLUMN "public"."_ui"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_ui"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_ui"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_ui"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_ui" IS 'ui ????????????';

-- ----------------------------
-- Records of _ui
-- ----------------------------
BEGIN;
INSERT INTO "public"."_ui" VALUES (1, 'uiAction', 'ui', 'refreshTableData', '?????????????????????', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (3, 'uiAction', 'ui', 'startInsertItem', '???????????????????????????', '{ "main": [{"function": "clearCreateForm"}, {"function": "openCreateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (4, 'uiAction', 'ui', 'createItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "prepareCreateItem"}, {"function": "confirmCreateFormDialog"}], "main": [ {"function": "doCreateItem"}], "after": [{"function": "closeCreateDrawer"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (5, 'uiAction', 'ui', 'startUpdateItem', '???????????????????????????', '{ "main": [{"function": "fillUpdateForm"}, {"function": "openUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (6, 'uiAction', 'ui', 'updateItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeUpdateDrawer"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (7, 'uiAction', 'ui', 'deleteItem', '???????????????', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [ {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (11, 'uiActionComponent', 'ui', 'refreshTableData', '?????????????????????', '{ "before": [{"vueComponent": "classSelectDialog", "function": "selectItem", "functionParamObj": { "item": { "value": "2021-01???-01???" } }}], "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (13, 'uiActionComponent', 'ui', 'startCreateItem', '???????????????????????????', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (14, 'uiActionComponent', 'ui', 'insertItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "??????", "content": "??????????????????" }}], "main": [{"function": "prepareCreateItem"}, {"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (15, 'uiActionComponent', 'ui', 'startUpdateItem', '???????????????????????????', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (16, 'uiActionComponent', 'ui', 'updateItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "??????", "content": "??????????????????" }}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (17, 'uiActionComponent', 'ui', 'deleteItem', '???????????????', '{ "before": [{"vueComponent": "jhConfirmDialog", "function": "confirmDialog", "functionParamObj": { "title": "??????", "content": "??????????????????" }}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}], "after": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (30, 'resourceHook', 'ui', 'refreshTableData', '?????????????????????', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (31, 'resourceHook', 'ui', 'startCreateItem', '???????????????????????????', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (32, 'resourceHook', 'ui', 'createItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (33, 'resourceHook', 'ui', 'startUpdateItem', '???????????????????????????', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (34, 'resourceHook', 'ui', 'updateItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (35, 'resourceHook', 'ui', 'deleteItem', '???????????????', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (40, 'backendSearchDemo', 'ui', 'refreshTableData', '?????????????????????', '{ "main": [{"function": "refreshTableData"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (41, 'backendSearchDemo', 'ui', 'startCreateItem', '???????????????????????????', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (42, 'backendSearchDemo', 'ui', 'createItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (43, 'backendSearchDemo', 'ui', 'startUpdateItem', '???????????????????????????', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (44, 'backendSearchDemo', 'ui', 'updateItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (45, 'backendSearchDemo', 'ui', 'deleteItem', '???????????????', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (50, 'dataAccessRight', 'ui', 'refreshTableData', '?????????????????????', '{ "main": [{"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (51, 'dataAccessRight', 'ui', 'startCreateItem', '???????????????????????????', '{ "main": [{"function": "clearItemData"}, {"function": "openCreateDialog"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (52, 'dataAccessRight', 'ui', 'createItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmCreateItemDialog"}], "main": [{"function": "doCreateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (53, 'dataAccessRight', 'ui', 'startUpdateItem', '???????????????????????????', '{ "main": [{"function": "prepareItemData"}, {"function": "openUpdateDialog"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (54, 'dataAccessRight', 'ui', 'updateItem', '???????????????', '{ "before": [{"function": "prepareValidate"}, {"function": "confirmUpdateItemDialog"}], "main": [{"function": "doUpdateItem"}, {"function": "refreshTableData"}], "after": [{"function": "closeDrawerShow"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_ui" VALUES (55, 'dataAccessRight', 'ui', 'deleteItem', '???????????????', '{ "before": [{"function": "confirmDeleteItemDialog"}], "main": [{"function": "prepareItemData"}, {"function": "doDeleteItem"}, {"function": "refreshTableData"}] }', NULL, 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_user"."idSequence" IS '??????id; ????????????userId';
COMMENT ON COLUMN "public"."_user"."userId" IS '??????id';
COMMENT ON COLUMN "public"."_user"."username" IS '?????????(??????)';
COMMENT ON COLUMN "public"."_user"."clearTextPassword" IS '????????????';
COMMENT ON COLUMN "public"."_user"."password" IS '??????';
COMMENT ON COLUMN "public"."_user"."md5Salt" IS 'md5Salt';
COMMENT ON COLUMN "public"."_user"."userStatus" IS '????????????????????????????????????';
COMMENT ON COLUMN "public"."_user"."userType" IS '????????????; staff, student.';
COMMENT ON COLUMN "public"."_user"."config" IS '????????????';
COMMENT ON COLUMN "public"."_user"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_user"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_user"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user" IS '?????????';

-- ----------------------------
-- Records of _user
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user" VALUES (42, NULL, 'admin', '???????????????', '123456', 'a77042997567ca49eeda2226840e7ebe', 'bxgpY5H2Up0v', 'active', NULL, NULL, 'jhUpdate', 'admin', '???????????????', '2022-07-18T23:12:36+08:00');
INSERT INTO "public"."_user" VALUES (43, NULL, 'W00001', '?????????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (44, NULL, 'W00002', '?????????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (45, NULL, 'G00001', '?????????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (46, NULL, 'G00002', '??????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (47, NULL, 'H00001', '?????????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user" VALUES (48, NULL, 'H00002', '?????????', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_user_group_role"."userId" IS '??????id';
COMMENT ON COLUMN "public"."_user_group_role"."groupId" IS '??????Id';
COMMENT ON COLUMN "public"."_user_group_role"."roleId" IS '??????Id';
COMMENT ON COLUMN "public"."_user_group_role"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_user_group_role"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_user_group_role"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role" IS '???????????????????????????; ??????????????????;';

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
COMMENT ON COLUMN "public"."_user_group_role_page"."user" IS 'userId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."group" IS 'groupId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."role" IS 'roleId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_page"."page" IS 'pageId id';
COMMENT ON COLUMN "public"."_user_group_role_page"."allowOrDeny" IS '?????????????????? ????????? ????????????; allow???deny';
COMMENT ON COLUMN "public"."_user_group_role_page"."desc" IS '????????????';
COMMENT ON COLUMN "public"."_user_group_role_page"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_user_group_role_page"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role_page" IS '?????????????????? - ?????? ?????????; ??????????????????;';

-- ----------------------------
-- Records of _user_group_role_page
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_group_role_page" VALUES (17, '*', 'public', '*', 'login', 'allow', '?????????; ?????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (18, '*', 'login', '*', 'manual', 'allow', '???????????????; ?????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (19, '*', 'login', '*', 'help', 'allow', '?????????; ?????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (21, '*', 'adminGroup', 'administrator', '*', 'allow', '????????????; ????????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (27, '*', 'wudang', 'boss,disciple', 'protocolDemo', 'allow', 'studentManagement01; ???????????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (28, '*', 'gaibang', 'boss,disciple', 'frontendDemo01,frontendDemo02', 'allow', 'studentManagement02&studentManagement03; ?????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (29, '*', 'huashan', 'boss,disciple', 'backendSearchDemo', 'allow', 'studentManagement04; ????????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_page" VALUES (30, '*', '*', 'boss,disciple', 'dataAccessRight', 'allow', '????????????demo', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_user_group_role_resource"."user" IS 'userId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."group" IS 'groupId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."role" IS 'roleId ?????? ?????????; ?????????: *';
COMMENT ON COLUMN "public"."_user_group_role_resource"."resource" IS 'resourceId ?????? ?????????; ?????????: *, !resourceId';
COMMENT ON COLUMN "public"."_user_group_role_resource"."allowOrDeny" IS '?????????????????? ????????? ????????????; allow???deny';
COMMENT ON COLUMN "public"."_user_group_role_resource"."desc" IS '????????????';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_user_group_role_resource"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_group_role_resource" IS '?????????????????? - ???????????? ?????????; ??????????????????;';

-- ----------------------------
-- Records of _user_group_role_resource
-- ----------------------------
BEGIN;
INSERT INTO "public"."_user_group_role_resource" VALUES (1, '*', 'public', '*', 'login.passwordLogin', 'allow', '??????resource, ?????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (11, '*', 'public', '*', 'allPage.getConstantList', 'allow', '????????????resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (31, '*', 'login', '*', 'allPage.logout', 'allow', '??????resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (32, '*', 'login', '*', 'allPage.refreshToken', 'allow', '??????authToken resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (33, '*', 'login', '*', 'allPage.userInfo', 'allow', '??????????????????resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (34, '*', 'login', '*', 'allPage.uploadByBase64', 'allow', '????????????resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (35, '*', 'login', '*', 'allPage.uploadByStream', 'allow', '????????????resource, ????????????????????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (51, '*', 'adminGroup', 'administrator', '*', 'allow', '???????????????, ????????????resource??????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (117, '*', 'wudang', 'boss', 'protocolDemo.*', 'allow', 'page01 ??????????????????; ????????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (118, '*', 'wudang', 'disciple', 'protocolDemo.selectItemList', 'allow', 'page01 ????????????????????????; ????????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (125, '*', 'gaibang', 'boss', 'frontendDemo01.*,frontendDemo02.*', 'allow', 'page02&page03 ??????????????????; ?????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (126, '*', 'gaibang', 'disciple', 'frontendDemo01.selectItemList,frontendDemo02.selectItemList', 'allow', 'page02&page03 ????????????????????????; ?????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (131, '*', 'huashan', 'boss', 'backendSearchDemo.*', 'allow', 'page04 ??????????????????; ????????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (132, '*', 'huashan', 'disciple', 'backendSearchDemo.selectItemList', 'allow', 'page04 ????????????????????????; ????????????????????????&??????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (133, '*', '*', 'boss', 'dataAccessRight.*', 'allow', 'page05 ??????????????????; ?????????????????????', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (134, '*', '*', 'disciple', 'dataAccessRight.selectItemList', 'allow', 'page05 ????????????????????????; ?????????????????????;', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."_user_group_role_resource" VALUES (135, '*', 'public', '*', 'socket.disconnect', 'allow', 'socket????????????', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."_user_session"."userId" IS '??????id';
COMMENT ON COLUMN "public"."_user_session"."userIp" IS '??????ip';
COMMENT ON COLUMN "public"."_user_session"."userIpRegion" IS '??????Ip??????';
COMMENT ON COLUMN "public"."_user_session"."userAgent" IS '????????? agent';
COMMENT ON COLUMN "public"."_user_session"."deviceId" IS '??????id';
COMMENT ON COLUMN "public"."_user_session"."deviceType" IS '????????????; flutter, web, bot_databot, bot_chatbot, bot_xiaochengxu';
COMMENT ON COLUMN "public"."_user_session"."socketStatus" IS 'socket??????';
COMMENT ON COLUMN "public"."_user_session"."authToken" IS 'auth token';
COMMENT ON COLUMN "public"."_user_session"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."_user_session"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."_user_session"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."_user_session"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."_user_session" IS '??????session???; deviceId ??????;??????????????????;';

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
COMMENT ON COLUMN "public"."access_control_student"."userId" IS '??????id';
COMMENT ON COLUMN "public"."access_control_student"."username" IS '?????????(??????)';
COMMENT ON COLUMN "public"."access_control_student"."resourceData" IS '????????????';
COMMENT ON COLUMN "public"."access_control_student"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."access_control_student"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."access_control_student"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."access_control_student"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';
COMMENT ON TABLE "public"."access_control_student" IS '???????????? accessControl ???';

-- ----------------------------
-- Records of access_control_student
-- ----------------------------
BEGIN;
INSERT INTO "public"."access_control_student" VALUES (50, 'G00001', '?????????', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
INSERT INTO "public"."access_control_student" VALUES (51, 'H00001', '?????????', '{ "where":{"level": "02"} }', 'insert', NULL, NULL, NULL);
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
COMMENT ON COLUMN "public"."student"."studentId" IS '??????ID';
COMMENT ON COLUMN "public"."student"."name" IS '????????????';
COMMENT ON COLUMN "public"."student"."gender" IS '??????';
COMMENT ON COLUMN "public"."student"."dateOfBirth" IS '????????????';
COMMENT ON COLUMN "public"."student"."classId" IS '??????ID';
COMMENT ON COLUMN "public"."student"."level" IS '??????';
COMMENT ON COLUMN "public"."student"."bodyHeight" IS '??????';
COMMENT ON COLUMN "public"."student"."studentStatus" IS '????????????';
COMMENT ON COLUMN "public"."student"."remarks" IS '??????';
COMMENT ON COLUMN "public"."student"."operation" IS '??????; insert, update, jhInsert, jhUpdate, jhDelete jhRestore';
COMMENT ON COLUMN "public"."student"."operationByUserId" IS '?????????userId';
COMMENT ON COLUMN "public"."student"."operationByUser" IS '??????????????????';
COMMENT ON COLUMN "public"."student"."operationAt" IS '????????????; E.g: 2021-05-28T10:24:54+08:00 ';

-- ----------------------------
-- Records of student
-- ----------------------------
BEGIN;
INSERT INTO "public"."student" VALUES (161, 'G00003', '?????????', 'male', '2022-01-25', '2021-01???-02???', '02', '180', '??????', '?????????', 'jhUpdate', 'admin', '???????????????', '2022-05-01T15:29:52+08:00');
INSERT INTO "public"."student" VALUES (168, '100067', '1111', 'male', '2022-05-02', '2021-01???-01???', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '???????????????', '2022-05-01T23:38:23+08:00');
INSERT INTO "public"."student" VALUES (173, '121432', '21434', NULL, NULL, '2021-01???-01???', NULL, NULL, NULL, NULL, 'jhInsert', 'admin', '???????????????', '2022-05-01T23:37:58+08:00');
INSERT INTO "public"."student" VALUES (174, 'admin', '???????????????', 'male', '2022-05-02', '2021-01???-01???', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '???????????????', '2022-05-03T21:17:52+08:00');
INSERT INTO "public"."student" VALUES (175, '1000221', '221', 'male', '2022-05-08', '2021-01???-02???', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '???????????????', '2022-05-03T20:50:51+08:00');
INSERT INTO "public"."student" VALUES (210, 'hook1001', 'student_name', 'male', '2022-07-13', '1234', '01', NULL, NULL, '??????', 'jhInsert', 'admin', '???????????????', '2022-07-18T23:12:37+08:00');
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
