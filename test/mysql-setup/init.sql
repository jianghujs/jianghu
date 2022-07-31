

/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : jianghu

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 18/07/2022 23:14:16
*/

create database if not exists jianghu;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _cache
-- ----------------------------
DROP TABLE IF EXISTS `_cache`;
CREATE TABLE `_cache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL COMMENT '用户Id',
  `content` longtext COMMENT '缓存数据',
  `recordStatus` varchar(255) DEFAULT 'active',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='缓存表';

-- ----------------------------
-- Records of _cache
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _constant
-- ----------------------------
DROP TABLE IF EXISTS `_constant`;
CREATE TABLE `_constant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `constantKey` varchar(255) DEFAULT NULL,
  `constantType` varchar(255) DEFAULT NULL COMMENT '常量类型; object, array',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `constantValue` text COMMENT '常量内容; object, array',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='常量表; 软删除未启用;';

-- ----------------------------
-- Records of _constant
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for _file
-- ----------------------------
DROP TABLE IF EXISTS `_file`;
CREATE TABLE `_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fileId` varchar(255) DEFAULT NULL COMMENT 'fileId',
  `fileDirectory` varchar(255) DEFAULT NULL COMMENT '文件保存路径;',
  `filename` varchar(255) DEFAULT NULL COMMENT '文件名;',
  `filenameStorage` varchar(255) DEFAULT NULL COMMENT '文件保存名',
  `downloadPath` varchar(255) DEFAULT NULL COMMENT '文件下载路径',
  `fileType` varchar(255) DEFAULT NULL COMMENT '文件类型;(预留字段)',
  `fileDesc` varchar(255) DEFAULT NULL COMMENT '文件描述',
  `binarySize` varchar(255) DEFAULT NULL COMMENT '文件二进制大小',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `fileId_index` (`fileId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='文件表; 软删除未启用;';

-- ----------------------------
-- Records of _file
-- ----------------------------
BEGIN;
INSERT INTO `_file` VALUES (1, '1658154809097_619728', '2022/7/18/', 'girl_beside_bridge.flac', '1658154809097_619728_girl_beside_bridge.flac', '/2022/7/18//1658154809097_619728_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:33:29+08:00');
INSERT INTO `_file` VALUES (2, '1658155049841_775430', '2022/7/18/', 'girl_beside_bridge.flac', '1658155049841_775430_girl_beside_bridge.flac', '/2022/7/18//1658155049841_775430_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:37:30+08:00');
INSERT INTO `_file` VALUES (3, '1658155085886_919958', '2022/7/18/', 'girl_beside_bridge.flac', '1658155085886_919958_girl_beside_bridge.flac', '/2022/7/18//1658155085886_919958_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:38:06+08:00');
INSERT INTO `_file` VALUES (4, '1658155149335_767220', '2022/7/18/', 'girl_beside_bridge.flac', '1658155149335_767220_girl_beside_bridge.flac', '/2022/7/18//1658155149335_767220_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:39:09+08:00');
INSERT INTO `_file` VALUES (5, '1658155585847_905258', 'test/', 'girl_beside_bridge.flac', '1658155585847_905258_girl_beside_bridge.flac', '/test//1658155585847_905258_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:46:26+08:00');
INSERT INTO `_file` VALUES (6, '1658155628178_210170', 'test/', 'girl_beside_bridge.flac', '1658155628178_210170_girl_beside_bridge.flac', '/test//1658155628178_210170_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:47:08+08:00');
INSERT INTO `_file` VALUES (7, '1658155774371_269076', 'test/', 'girl_beside_bridge.flac', '1658155774371_269076_girl_beside_bridge.flac', '/test//1658155774371_269076_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:49:34+08:00');
INSERT INTO `_file` VALUES (8, '1658155816497_901481', 'test/', 'girl_beside_bridge.flac', '1658155816497_901481_girl_beside_bridge.flac', '/test//1658155816497_901481_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T22:50:16+08:00');
INSERT INTO `_file` VALUES (9, '1658156806074_485604', 'test/', 'girl_beside_bridge.flac', '1658156806074_485604_girl_beside_bridge.flac', '/test//1658156806074_485604_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:06:46+08:00');
INSERT INTO `_file` VALUES (10, '1658156949831_266793', 'test/', 'girl_beside_bridge.flac', '1658156949831_266793_girl_beside_bridge.flac', '/test//1658156949831_266793_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:10+08:00');
INSERT INTO `_file` VALUES (11, '1658156995456_405279', 'test/', 'girl_beside_bridge.flac', '1658156995456_405279_girl_beside_bridge.flac', '/test//1658156995456_405279_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:09:55+08:00');
INSERT INTO `_file` VALUES (12, '1658157035767_659758', 'test/', 'girl_beside_bridge.flac', '1658157035767_659758_girl_beside_bridge.flac', '/test//1658157035767_659758_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:10:35+08:00');
INSERT INTO `_file` VALUES (13, '1658157220201_516323', 'test/', 'girl_beside_bridge.flac', '1658157220201_516323_girl_beside_bridge.flac', '/test//1658157220201_516323_girl_beside_bridge.flac', NULL, NULL, '19.77MB', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:40+08:00');
COMMIT;

-- ----------------------------
-- Table structure for _group
-- ----------------------------
DROP TABLE IF EXISTS `_group`;
CREATE TABLE `_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` varchar(255) NOT NULL COMMENT 'groupId',
  `groupName` varchar(255) DEFAULT NULL COMMENT '群组名',
  `groupDesc` varchar(255) DEFAULT NULL COMMENT '群组描述',
  `groupAvatar` varchar(255) DEFAULT NULL COMMENT '群logo',
  `groupExtend` varchar(1024) DEFAULT '{}' COMMENT '拓展字段; { groupNotice: ''xx'' }',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `groupId_index` (`groupId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COMMENT='群组表; 软删除未启用;';

-- ----------------------------
-- Records of _group
-- ----------------------------
BEGIN;
INSERT INTO `_group` VALUES (1, 'adminGroup', '管理组', '管理组', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO `_group` VALUES (6, 'wudang', '武当', '武当', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO `_group` VALUES (7, 'gaibang', '丐帮', '丐帮', NULL, '{}', 'insert', NULL, NULL, NULL);
INSERT INTO `_group` VALUES (8, 'huashan', '华山派', '华山派', NULL, '{}', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _page
-- ----------------------------
DROP TABLE IF EXISTS `_page`;
CREATE TABLE `_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageId` varchar(255) DEFAULT NULL COMMENT 'pageId',
  `pageName` varchar(255) DEFAULT NULL COMMENT 'page name',
  `pageType` varchar(255) DEFAULT NULL COMMENT '页面类型; showInMenu, dynamicInMenu',
  `sort` varchar(255) DEFAULT NULL,
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COMMENT='页面表; 软删除未启用;';

-- ----------------------------
-- Records of _page
-- ----------------------------
BEGIN;
INSERT INTO `_page` VALUES (2, 'help', '帮助', 'dynamicInMenu', '11', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (3, 'login', '登陆', '', '', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (6, 'manual', '操作手册', 'showInMenu', '0', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (25, 'protocolDemo', '应用协议', 'showInMenu', '2', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (27, 'frontendDemo01', '前端对接', 'showInMenu', '3', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (28, 'frontendDemo02', '前端-jianghuAxios', 'showInMenu', '4', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (29, 'resourceHook', '前端-resouceHook', 'showInMenu', '6', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (31, 'backendSearchDemo', '服务端搜索', 'showInMenu', '7', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (32, 'dataAccessRight', '数据权限', 'showInMenu', '8', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (34, 'uiAction', 'uiAction', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
INSERT INTO `_page` VALUES (35, 'uiActionComponent', 'uiAction-组件通信', 'showInMenu', '5', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _record_history
-- ----------------------------
DROP TABLE IF EXISTS `_record_history`;
CREATE TABLE `_record_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table` varchar(255) DEFAULT NULL COMMENT '表',
  `recordId` int(11) DEFAULT NULL COMMENT '数据在table中的主键id; recordContent.id',
  `recordContent` text NOT NULL COMMENT '数据',
  `packageContent` text NOT NULL COMMENT '当时请求的 package JSON',
  `operation` varchar(255) DEFAULT NULL COMMENT '操作; jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId; recordContent.operationByUserId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名; recordContent.operationByUser',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; recordContent.operationAt; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `index_record_id` (`recordId`),
  KEY `index_table_action` (`table`,`operation`)
) ENGINE=InnoDB AUTO_INCREMENT=127906 DEFAULT CHARSET=utf8mb4 COMMENT='数据历史表';

-- ----------------------------
-- Records of _record_history
-- ----------------------------
BEGIN;
INSERT INTO `_record_history` VALUES (127892, '_user_session', 2083, '{\"id\":2083,\"userId\":\"admin\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157217726\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"bNHDMRUBfv3dd3Ix55J6b_HIpRJtjtz-zXbZ\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:37+08:00\"}', '{\"packageId\":\"1658157217726\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157217726\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:37+08:00');
INSERT INTO `_record_history` VALUES (127893, '_user_session', 2084, '{\"id\":2084,\"userId\":\"admin\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157218545\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"ubaVk-PckXQsZyT9ZaJcusaW-nHveS3WZJiq\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:38+08:00\"}', '{\"packageId\":\"1658157218545\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157218545\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:38+08:00');
INSERT INTO `_record_history` VALUES (127894, '_file', 13, '{\"id\":13,\"fileId\":\"1658157220201_516323\",\"fileDirectory\":\"test/\",\"filename\":\"girl_beside_bridge.flac\",\"filenameStorage\":\"1658157220201_516323_girl_beside_bridge.flac\",\"downloadPath\":\"/test//1658157220201_516323_girl_beside_bridge.flac\",\"fileType\":null,\"fileDesc\":null,\"binarySize\":\"19.77MB\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:40+08:00\"}', '{\"packageId\":\"1658157220153\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"allPage\",\"actionId\":\"uploadFileDone\",\"actionData\":{\"hash\":\"798c9d27b6be3f2b6e7e9e04360ff247\",\"total\":7,\"chunkSize\":3145728,\"filename\":\"girl_beside_bridge.flac\",\"fileDirectory\":\"test/\"}}}', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:40+08:00');
INSERT INTO `_record_history` VALUES (127895, '_user_session', 2085, '{\"id\":2085,\"userId\":\"admin\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157222591\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"KO3nkam82x97ApK__duM29VToZrxVw4WGXn-\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:42+08:00\"}', '{\"packageId\":\"1658157222591\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157222591\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_record_history` VALUES (127896, '_group', 26, '{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"test_group_name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}', '{\"packageId\":\"1658157222685\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"insertItem\",\"actionData\":{\"groupId\":\"test_group\",\"groupName\":\"test_group_name\",\"groupDesc\":\"test group desc\"}}}', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:42+08:00');
INSERT INTO `_record_history` VALUES (127897, '_group', 26, '{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"new name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}', '{\"packageId\":\"1658157222889\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"updateItem\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{\"groupName\":\"new name\"}}}', 'jhUpdate', 'admin', '系统管理员', '2022-07-18T23:13:42+08:00');
INSERT INTO `_record_history` VALUES (127898, '_group', 26, '{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"new name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhDelete\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}', '{\"packageId\":\"1658157223028\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"deleteItem\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{}}}', 'jhDelete', 'admin', '系统管理员', '2022-07-18T23:13:43+08:00');
INSERT INTO `_record_history` VALUES (127899, '_user_session', 2086, '{\"id\":2086,\"userId\":\"admin\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157223475\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:43+08:00\"}', '{\"packageId\":\"1658157223475\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157223475\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_record_history` VALUES (127900, 'student', 211, '{\"id\":211,\"studentId\":\"1001\",\"name\":\"student_name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}', '{\"packageId\":\"1658157223579\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"insertItem\",\"actionData\":{\"studentId\":\"1001\",\"name\":\"student_name\",\"gender\":\"male\",\"remarks\":\"备注\"}}}', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:13:43+08:00');
INSERT INTO `_record_history` VALUES (127901, 'student', 211, '{\"id\":211,\"studentId\":\"1001\",\"name\":\"new name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}', '{\"packageId\":\"1658157223771\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"updateItem\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{\"name\":\"new name\"}}}', 'jhUpdate', 'admin', '系统管理员', '2022-07-18T23:13:43+08:00');
INSERT INTO `_record_history` VALUES (127902, 'student', 211, '{\"id\":211,\"studentId\":\"1001\",\"name\":\"new name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhDelete\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:44+08:00\"}', '{\"packageId\":\"1658157223902\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"deleteItem\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{}}}', 'jhDelete', 'admin', '系统管理员', '2022-07-18T23:13:44+08:00');
INSERT INTO `_record_history` VALUES (127903, '_user_session', 2087, '{\"id\":2087,\"userId\":\"admin\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157224929\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:44+08:00\"}', '{\"packageId\":\"1658157224929\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157224929\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_record_history` VALUES (127904, '_user_session', 2088, '{\"id\":2088,\"userId\":\"W00001\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157225065\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:45+08:00\"}', '{\"packageId\":\"1658157225065_login\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"W00001\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157225065\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO `_record_history` VALUES (127905, '_user_session', 2089, '{\"id\":2089,\"userId\":\"W00002\",\"userIp\":\"127.0.0.1\",\"userIpRegion\":\"\",\"userAgent\":\"\",\"deviceId\":\"chrome_1658157225121\",\"deviceType\":\"web\",\"socketStatus\":\"offline\",\"authToken\":\"_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3\",\"operation\":\"jhInsert\",\"operationByUserId\":null,\"operationByUser\":null,\"operationAt\":\"2022-07-18T23:13:45+08:00\"}', '{\"packageId\":\"1658157225121_login\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"W00002\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157225121\"}}}', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
COMMIT;

-- ----------------------------
-- Table structure for _resource
-- ----------------------------
DROP TABLE IF EXISTS `_resource`;
CREATE TABLE `_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessControlTable` varchar(255) DEFAULT NULL COMMENT '数据规则控制表',
  `resourceHook` text COMMENT '[ "before": {"service": "xx", "serviceFunction": "xxx"}, "after": [] }',
  `pageId` varchar(255) DEFAULT NULL COMMENT 'page id; E.g: index',
  `actionId` varchar(255) DEFAULT NULL COMMENT 'action id; E.g: selectXXXByXXX',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `resourceType` varchar(255) DEFAULT NULL COMMENT 'resource 类型; E.g: auth service sql',
  `appDataSchema` text COMMENT 'appData 参数校验',
  `resourceData` text COMMENT 'resource 数据; { "service": "auth", "serviceFunction": "passwordLogin" } or  { "table": "${tableName}", "action": "select", "whereCondition": ".where(function() {this.whereNot( { recordStatus: \\"active\\" })})" }',
  `requestDemo` text COMMENT '请求Demo',
  `responseDemo` text COMMENT '响应Demo',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=509 DEFAULT CHARSET=utf8mb4 COMMENT='请求资源表; 软删除未启用; resourceId=`${appId}.${pageId}.${actionId}`';

-- ----------------------------
-- Records of _resource
-- ----------------------------
BEGIN;
INSERT INTO `_resource` VALUES (101, NULL, NULL, 'allPage', 'getChunkInfo', '✅ 文件分片下载-获取分片信息', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"getChunkInfo\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (102, NULL, NULL, 'allPage', 'uploadFileDone', '✅ 文件分片上传-所有分片上传完毕', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"uploadFileDone\" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (105, NULL, NULL, 'allPage', 'httpUploadByStream', '✅ 文件分片上传-http文件流', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"uploadFileChunkByStream\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (106, NULL, NULL, 'allPage', 'httpUploadByBase64', '✅ 文件分片上传-http base64', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"uploadFileChunkByBase64\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (107, NULL, NULL, 'allPage', 'socketUploadByStream', '✅ 文件分片上传-socket 文件流', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"uploadFileChunkByBuffer\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (108, NULL, NULL, 'allPage', 'socketUploadByBase64', '✅ 文件分片上传-socket base64', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"uploadFileChunkByBase64\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (112, NULL, NULL, 'allPage', 'httpDownloadByBase64', '✅ 文件分片下载-http base64', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"downloadFileChunkByBase64\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (113, NULL, NULL, 'allPage', 'socketDownloadByStream', '✅ 文件分片下载-socket文件流', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"downloadFileChunkByBuffer\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (114, NULL, NULL, 'allPage', 'socketDownloadByBase64', '✅ 文件分片下载-socket base64', 'service', '{}', '{ \"service\": \"file\", \"serviceFunction\": \"downloadFileChunkByBase64\" }', NULL, NULL, 'update', NULL, NULL, '2022-03-10T22:27:32+08:00');
INSERT INTO `_resource` VALUES (231, NULL, NULL, 'login', 'passwordLogin', '✅登陆', 'service', '{}', '{\"service\": \"user\", \"serviceFunction\": \"passwordLogin\"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:32:57+08:00');
INSERT INTO `_resource` VALUES (251, NULL, NULL, 'allPage', 'logout', '✅登出', 'service', '{}', '{\"service\": \"user\", \"serviceFunction\": \"logout\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (253, NULL, NULL, 'allPage', 'userInfo', '✅获取用户信息', 'service', '{}', '{\"service\": \"user\", \"serviceFunction\": \"userInfo\"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO `_resource` VALUES (254, NULL, NULL, 'allPage', 'resetPassword', '✅修改用户密码', 'service', '{}', '{\"service\": \"user\", \"serviceFunction\": \"resetPassword\"}', NULL, NULL, 'update', NULL, NULL, '2022-04-27T15:37:21+08:00');
INSERT INTO `_resource` VALUES (258, NULL, NULL, 'allPage', 'getConstantList', '✅查询常量', 'sql', '{}', '{\"table\": \"_constant\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (293, NULL, NULL, 'protocolDemo', 'selectItemList', '✅应用协议-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (294, NULL, NULL, 'protocolDemo', 'insertItem', '✅应用协议-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"insert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (295, NULL, NULL, 'protocolDemo', 'updateItem', '✅应用协议-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (296, NULL, NULL, 'protocolDemo', 'deleteItem', '✅应用协议-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (309, NULL, NULL, 'frontendDemo01', 'selectItemList', '✅前端对接-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (310, NULL, NULL, 'frontendDemo01', 'insertItem', '✅前端对接-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"insert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (311, NULL, NULL, 'frontendDemo01', 'updateItem', '✅前端对接-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (312, NULL, NULL, 'frontendDemo01', 'deleteItem', '✅前端对接-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (313, NULL, NULL, 'frontendDemo02', 'selectItemList', '✅前端优化-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (314, NULL, NULL, 'frontendDemo02', 'insertItem', '✅前端优化-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhInsert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (315, NULL, NULL, 'frontendDemo02', 'updateItem', '✅前端优化-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (316, NULL, NULL, 'frontendDemo02', 'deleteItem', '✅前端优化-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (317, NULL, NULL, 'resourceHook', 'selectItemList', '✅前端对接-业务ID-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (318, NULL, '{\"after\": [], \"before\": [{\"service\": \"student\", \"serviceFunction\": \"beforHookForGenerateStudentId\"}]}', 'resourceHook', 'insertItem', '✅前端对接-业务ID-添加成员', 'sql', '{\"type\": \"object\", \"required\": [\"actionData\"], \"properties\": {\"actionData\": {\"type\": \"object\", \"required\": [\"classId\", \"name\", \"level\", \"gender\", \"dateOfBirth\"], \"properties\": {\"name\": {\"type\": \"string\"}, \"level\": {\"anyOf\": [{\"type\": \"string\"}, {\"type\": \"number\"}]}, \"gender\": {\"type\": \"string\"}, \"classId\": {\"type\": \"string\"}, \"dateOfBirth\": {\"type\": \"string\", \"format\": \"date\"}}, \"additionalProperties\": true}}, \"additionalProperties\": true}', '{\"table\": \"student\", \"operation\": \"jhInsert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (319, NULL, NULL, 'resourceHook', 'updateItem', '✅前端对接-业务ID-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (320, NULL, NULL, 'resourceHook', 'deleteItem', '✅前端对接-业务ID-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (325, NULL, NULL, 'uiAction', 'selectItemList', '✅前端规范-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (326, NULL, NULL, 'uiAction', 'createItem', '✅前端规范-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhInsert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (327, NULL, NULL, 'uiAction', 'updateItem', '✅前端规范-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (328, NULL, NULL, 'uiAction', 'deleteItem', '✅前端规范-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (331, NULL, NULL, 'uiActionComponent', 'selectItemList', '✅前端规范-组件通信-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (332, NULL, NULL, 'uiActionComponent', 'insertItem', '✅前端规范-组件通信-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhInsert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (333, NULL, NULL, 'uiActionComponent', 'updateItem', '✅前端规范-组件通信-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (334, NULL, NULL, 'uiActionComponent', 'deleteItem', '✅前端规范-组件通信-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (341, 'access_control_student', NULL, 'backendSearchDemo', 'selectItemList', '✅服务端查询-查询列表', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (342, NULL, NULL, 'backendSearchDemo', 'insertItem', '✅服务端查询-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"insert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (343, NULL, NULL, 'backendSearchDemo', 'updateItem', '✅服务端查询-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (350, NULL, NULL, 'backendSearchDemo', 'deleteItem', '✅服务端查询-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (352, NULL, NULL, 'dataAccessRight', 'insertItem', '✅数据权限-添加成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"insert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (353, NULL, NULL, 'dataAccessRight', 'updateItem', '✅数据权限-更新成员', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (354, NULL, NULL, 'dataAccessRight', 'deleteItem', '✅数据权限-删除信息', 'sql', '{}', '{\"table\": \"student\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (355, NULL, NULL, 'dataAccessRight', 'selectItemListByService', '✅数据权限-查询列表', 'service', '{}', '{\"service\": \"student\", \"serviceFunction\": \"selectStudentList\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (356, NULL, '{\"after\": [], \"before\": [{\"service\": \"student\", \"serviceFunction\": \"appendStudentInfoToUserInfo\"}]}', 'dataAccessRight', 'selectItemListByDynamicData', '✅数据权限-查询列表', 'sql', '{}', '{\"table\": \"student\", \"where\": {\"classId\": \"ctx.userInfo.studentInfo.classId\"}, \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (500, NULL, NULL, 'socket', 'disconnect', '✅ socket断开连接', 'service', '{}', '{\"service\":\"socket\", \"serviceFunction\": \"disconnect\"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO `_resource` VALUES (501, NULL, NULL, 'socket', 'connect', '✅ socket 连接', 'service', '{}', '{\"service\":\"socket\", \"serviceFunction\": \"connect\"}', NULL, NULL, 'update', NULL, NULL, '2022-03-12T21:35:05+08:00');
INSERT INTO `_resource` VALUES (502, NULL, NULL, 'socket', 'sendMsg', '✅ socket 发送消息', 'service', '{}', '{ \"service\": \"socket\", \"serviceFunction\": \"sendMsg\" }', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (503, NULL, NULL, 'requestLog', 'selectItemList', '✅请求记录', 'sql', '{}', '{\"table\": \"_resource_request_log\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (504, NULL, NULL, 'recordHistory', 'selectItemList', '✅操作记录', 'sql', '{}', '{\"table\": \"_record_history\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (505, NULL, NULL, 'group', 'insertItem', '✅创建群组', 'sql', '{}', '{\"table\": \"_group\", \"operation\": \"jhInsert\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (506, NULL, NULL, 'group', 'updateItem', '✅更新群组', 'sql', '{}', '{\"table\": \"_group\", \"operation\": \"jhUpdate\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (507, NULL, NULL, 'group', 'selectItemList', '✅获取群组列表', 'sql', '{}', '{\"table\": \"_group\", \"operation\": \"select\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_resource` VALUES (508, NULL, NULL, 'group', 'deleteItem', '✅删除群组', 'sql', '{}', '{\"table\": \"_group\", \"operation\": \"jhDelete\"}', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _resource_request_log
-- ----------------------------
DROP TABLE IF EXISTS `_resource_request_log`;
CREATE TABLE `_resource_request_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resourceId` varchar(255) DEFAULT NULL COMMENT 'resource id;',
  `packageId` varchar(255) DEFAULT NULL COMMENT 'resource package id',
  `userIp` varchar(255) DEFAULT NULL COMMENT '用户ip;',
  `userAgent` varchar(255) DEFAULT NULL COMMENT '设备信息',
  `deviceId` varchar(255) DEFAULT NULL COMMENT '设备id',
  `userIpRegion` varchar(255) DEFAULT NULL COMMENT '用户Ip区域',
  `executeSql` varchar(255) DEFAULT NULL COMMENT '执行的sql',
  `requestBody` text COMMENT '请求body',
  `responseBody` text COMMENT '响应body',
  `responseStatus` varchar(255) DEFAULT NULL COMMENT '执行的结果;  success, fail',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `resourceId_index` (`resourceId`),
  KEY `packageId_index` (`packageId`)
) ENGINE=InnoDB AUTO_INCREMENT=9096 DEFAULT CHARSET=utf8mb4 COMMENT='文件表; 软删除未启用;';

-- ----------------------------
-- Records of _resource_request_log
-- ----------------------------
BEGIN;
INSERT INTO `_resource_request_log` VALUES (9069, 'login.passwordLogin', '1658157217726', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157217726\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157217726\"}}}', '{\"packageId\":\"1658157217726\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:37+08:00\",\"appData\":{\"authToken\":\"bNHDMRUBfv3dd3Ix55J6b_HIpRJtjtz-zXbZ\",\"deviceId\":\"chrome_1658157217726\",\"userId\":\"admin\",\"resultData\":{\"authToken\":\"bNHDMRUBfv3dd3Ix55J6b_HIpRJtjtz-zXbZ\",\"deviceId\":\"chrome_1658157217726\",\"userId\":\"admin\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:37+08:00');
INSERT INTO `_resource_request_log` VALUES (9070, 'login.passwordLogin', '1658157218545', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157218545\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157218545\"}}}', '{\"packageId\":\"1658157218545\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:38+08:00\",\"appData\":{\"authToken\":\"ubaVk-PckXQsZyT9ZaJcusaW-nHveS3WZJiq\",\"deviceId\":\"chrome_1658157218545\",\"userId\":\"admin\",\"resultData\":{\"authToken\":\"ubaVk-PckXQsZyT9ZaJcusaW-nHveS3WZJiq\",\"deviceId\":\"chrome_1658157218545\",\"userId\":\"admin\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:38+08:00');
INSERT INTO `_resource_request_log` VALUES (9071, 'allPage.uploadFileDone', '1658157220153', '127.0.0.1', '', 'chrome_1658157218545', '', NULL, '{\"packageId\":\"1658157220153\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"allPage\",\"actionId\":\"uploadFileDone\",\"actionData\":{\"hash\":\"798c9d27b6be3f2b6e7e9e04360ff247\",\"total\":7,\"chunkSize\":3145728,\"filename\":\"girl_beside_bridge.flac\",\"fileDirectory\":\"test/\"}}}', '{\"packageId\":\"1658157220153\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:40+08:00\",\"appData\":{\"fileId\":\"1658157220201_516323\",\"fileDirectory\":\"test/\",\"filename\":\"girl_beside_bridge.flac\",\"filenameStorage\":\"1658157220201_516323_girl_beside_bridge.flac\",\"downloadPath\":\"/test//1658157220201_516323_girl_beside_bridge.flac\",\"binarySize\":\"19.77MB\",\"downloadBasePath\":\"/jianghu/upload\",\"downloadTip\":\"https://xxx.xxx.xxx/${downloadBasePath}${downloadPath}\",\"resultData\":{\"fileId\":\"1658157220201_516323\",\"fileDirectory\":\"test/\",\"filename\":\"girl_beside_bridge.flac\",\"filenameStorage\":\"1658157220201_516323_girl_beside_bridge.flac\",\"downloadPath\":\"/test//1658157220201_516323_girl_beside_bridge.flac\",\"binarySize\":\"19.77MB\",\"downloadBasePath\":\"/jianghu/upload\",\"downloadTip\":\"https://xxx.xxx.xxx/${downloadBasePath}${downloadPath}\"},\"appId\":\"jianghu\",\"pageId\":\"allPage\",\"actionId\":\"uploadFileDone\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:40+08:00');
INSERT INTO `_resource_request_log` VALUES (9072, 'allPage.getChunkInfo', '1658157220462', '127.0.0.1', '', 'chrome_1658157218545', '', NULL, '{\"packageId\":\"1658157220462\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"allPage\",\"actionId\":\"getChunkInfo\",\"actionData\":{\"downloadPath\":\"girl_beside_bridge.flac\"}}}', '{\"packageId\":\"1658157220462\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:40+08:00\",\"appData\":{\"hash\":\"798c9d27b6be3f2b6e7e9e04360ff247\",\"total\":7,\"chunkSize\":3145728,\"fileSize\":20727669,\"resultData\":{\"hash\":\"798c9d27b6be3f2b6e7e9e04360ff247\",\"total\":7,\"chunkSize\":3145728,\"fileSize\":20727669},\"appId\":\"jianghu\",\"pageId\":\"allPage\",\"actionId\":\"getChunkInfo\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:40+08:00');
INSERT INTO `_resource_request_log` VALUES (9073, 'login.passwordLogin', '1658157222591', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157222591\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157222591\"}}}', '{\"packageId\":\"1658157222591\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:42+08:00\",\"appData\":{\"authToken\":\"KO3nkam82x97ApK__duM29VToZrxVw4WGXn-\",\"deviceId\":\"chrome_1658157222591\",\"userId\":\"admin\",\"resultData\":{\"authToken\":\"KO3nkam82x97ApK__duM29VToZrxVw4WGXn-\",\"deviceId\":\"chrome_1658157222591\",\"userId\":\"admin\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_resource_request_log` VALUES (9074, 'group.insertItem', '1658157222685', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157222685\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"insertItem\",\"actionData\":{\"groupId\":\"test_group\",\"groupName\":\"test_group_name\",\"groupDesc\":\"test group desc\"}}}', '{\"packageId\":\"1658157222685\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:42+08:00\",\"appData\":{\"rows\":[26],\"resultData\":{\"rows\":[26]},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"insertItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_resource_request_log` VALUES (9075, 'group.selectItemList', '1658157222820', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157222820\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{}}}', '{\"packageId\":\"1658157222820\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:42+08:00\",\"appData\":{\"rows\":[{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"test_group_name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}],\"resultData\":{\"rows\":[{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"test_group_name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_resource_request_log` VALUES (9076, 'group.updateItem', '1658157222889', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157222889\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"updateItem\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{\"groupName\":\"new name\"}}}', '{\"packageId\":\"1658157222889\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:42+08:00\",\"appData\":{\"rows\":1,\"resultData\":{\"rows\":1},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"updateItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_resource_request_log` VALUES (9077, 'group.selectItemList', '1658157222971', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157222971\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{}}}', '{\"packageId\":\"1658157222971\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":[{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"new name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}],\"resultData\":{\"rows\":[{\"id\":26,\"groupId\":\"test_group\",\"groupName\":\"new name\",\"groupDesc\":\"test group desc\",\"groupAvatar\":null,\"groupExtend\":\"{}\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:42+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9078, 'group.deleteItem', '1658157223028', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157223028\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"deleteItem\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{}}}', '{\"packageId\":\"1658157223028\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":1,\"resultData\":{\"rows\":1},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"deleteItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9079, 'group.selectItemList', '1658157223101', '127.0.0.1', '', 'chrome_1658157222591', '', NULL, '{\"packageId\":\"1658157223101\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\",\"where\":{\"groupId\":\"test_group\"},\"actionData\":{}}}', '{\"packageId\":\"1658157223101\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":[],\"resultData\":{\"rows\":[]},\"appId\":\"jianghu\",\"pageId\":\"group\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9080, 'login.passwordLogin', '1658157223475', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157223475\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157223475\"}}}', '{\"packageId\":\"1658157223475\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"authToken\":\"mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz\",\"deviceId\":\"chrome_1658157223475\",\"userId\":\"admin\",\"resultData\":{\"authToken\":\"mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz\",\"deviceId\":\"chrome_1658157223475\",\"userId\":\"admin\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9081, 'frontendDemo02.insertItem', '1658157223579', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157223579\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"insertItem\",\"actionData\":{\"studentId\":\"1001\",\"name\":\"student_name\",\"gender\":\"male\",\"remarks\":\"备注\"}}}', '{\"packageId\":\"1658157223579\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":[211],\"resultData\":{\"rows\":[211]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"insertItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9082, 'frontendDemo02.selectItemList', '1658157223689', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157223689\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"where\":{\"studentId\":\"1001\",\"name\":\"student_name\"},\"actionData\":{}}}', '{\"packageId\":\"1658157223689\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":[{\"id\":211,\"studentId\":\"1001\",\"name\":\"student_name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}],\"resultData\":{\"rows\":[{\"id\":211,\"studentId\":\"1001\",\"name\":\"student_name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhInsert\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9083, 'frontendDemo02.updateItem', '1658157223771', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157223771\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"updateItem\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{\"name\":\"new name\"}}}', '{\"packageId\":\"1658157223771\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":1,\"resultData\":{\"rows\":1},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"updateItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9084, 'frontendDemo02.selectItemList', '1658157223830', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157223830\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{}}}', '{\"packageId\":\"1658157223830\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:43+08:00\",\"appData\":{\"rows\":[{\"id\":211,\"studentId\":\"1001\",\"name\":\"new name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}],\"resultData\":{\"rows\":[{\"id\":211,\"studentId\":\"1001\",\"name\":\"new name\",\"gender\":\"male\",\"dateOfBirth\":null,\"classId\":null,\"level\":null,\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":\"备注\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-07-18T23:13:43+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_resource_request_log` VALUES (9085, 'frontendDemo02.deleteItem', '1658157223902', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157223902\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"deleteItem\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{}}}', '{\"packageId\":\"1658157223902\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":1,\"resultData\":{\"rows\":1},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"deleteItem\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9086, 'frontendDemo02.selectItemList', '1658157224099', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224099\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"where\":{\"studentId\":\"1001\"},\"actionData\":{}}}', '{\"packageId\":\"1658157224099\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[],\"resultData\":{\"rows\":[]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9087, 'frontendDemo02.selectItemList', '1658157224261', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224261\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"where\":{\"studentId\":\"G00003\"},\"actionData\":{}}}', '{\"packageId\":\"1658157224261\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}],\"resultData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9088, 'frontendDemo02.selectItemList', '1658157224345', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224345\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"whereIn\":{\"studentId\":[\"G00003\"]},\"actionData\":{}}}', '{\"packageId\":\"1658157224345\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}],\"resultData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9089, 'frontendDemo02.selectItemList', '1658157224429', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224429\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"whereLike\":{\"studentId\":\"G0000\"},\"actionData\":{}}}', '{\"packageId\":\"1658157224429\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}],\"resultData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9090, 'frontendDemo02.selectItemList', '1658157224514', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224514\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"whereOptions\":[[\"studentId\",\"G00003\"],[\"id\",\">\",1]],\"actionData\":{}}}', '{\"packageId\":\"1658157224514\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}],\"resultData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9091, 'frontendDemo02.selectItemList', '1658157224598', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224598\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"whereOrOptions\":[[\"studentId\",\"G00003\"],[\"name\",\"1111\"]],\"orderBy\":[{\"column\":\"id\",\"order\":\"asc\"}],\"actionData\":{}}}', '{\"packageId\":\"1658157224598\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"},{\"id\":168,\"studentId\":\"100067\",\"name\":\"1111\",\"gender\":\"male\",\"dateOfBirth\":\"2022-05-02\",\"classId\":\"2021-01级-01班\",\"level\":\"01\",\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":null,\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T23:38:23+08:00\"}],\"resultData\":{\"rows\":[{\"id\":161,\"studentId\":\"G00003\",\"name\":\"小虾米\",\"gender\":\"male\",\"dateOfBirth\":\"2022-01-25\",\"classId\":\"2021-01级-02班\",\"level\":\"02\",\"bodyHeight\":\"180\",\"studentStatus\":\"正常\",\"remarks\":\"小虾米\",\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T15:29:52+08:00\"},{\"id\":168,\"studentId\":\"100067\",\"name\":\"1111\",\"gender\":\"male\",\"dateOfBirth\":\"2022-05-02\",\"classId\":\"2021-01级-01班\",\"level\":\"01\",\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":null,\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T23:38:23+08:00\"}]},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9092, 'frontendDemo02.selectItemList', '1658157224691', '127.0.0.1', '', 'chrome_1658157223475', '', NULL, '{\"packageId\":\"1658157224691\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\",\"whereOrOptions\":[[\"studentId\",\"G00003\"],[\"name\",\"1111\"]],\"orderBy\":[{\"column\":\"id\",\"order\":\"asc\"}],\"offset\":1,\"limit\":1,\"actionData\":{}}}', '{\"packageId\":\"1658157224691\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:44+08:00\",\"appData\":{\"rows\":[{\"id\":168,\"studentId\":\"100067\",\"name\":\"1111\",\"gender\":\"male\",\"dateOfBirth\":\"2022-05-02\",\"classId\":\"2021-01级-01班\",\"level\":\"01\",\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":null,\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T23:38:23+08:00\"}],\"count\":2,\"resultData\":{\"rows\":[{\"id\":168,\"studentId\":\"100067\",\"name\":\"1111\",\"gender\":\"male\",\"dateOfBirth\":\"2022-05-02\",\"classId\":\"2021-01级-01班\",\"level\":\"01\",\"bodyHeight\":null,\"studentStatus\":null,\"remarks\":null,\"operation\":\"jhUpdate\",\"operationByUserId\":\"admin\",\"operationByUser\":\"系统管理员\",\"operationAt\":\"2022-05-01T23:38:23+08:00\"}],\"count\":2},\"appId\":\"jianghu\",\"pageId\":\"frontendDemo02\",\"actionId\":\"selectItemList\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_resource_request_log` VALUES (9093, 'login.passwordLogin', '1658157224929', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157224929\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"admin\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157224929\"}}}', '{\"packageId\":\"1658157224929\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:45+08:00\",\"appData\":{\"authToken\":\"DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw\",\"deviceId\":\"chrome_1658157224929\",\"userId\":\"admin\",\"resultData\":{\"authToken\":\"DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw\",\"deviceId\":\"chrome_1658157224929\",\"userId\":\"admin\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO `_resource_request_log` VALUES (9094, 'login.passwordLogin', '1658157225065_login', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157225065_login\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"W00001\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157225065\"}}}', '{\"packageId\":\"1658157225065_login\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:45+08:00\",\"appData\":{\"authToken\":\"CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG\",\"deviceId\":\"chrome_1658157225065\",\"userId\":\"W00001\",\"resultData\":{\"authToken\":\"CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG\",\"deviceId\":\"chrome_1658157225065\",\"userId\":\"W00001\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO `_resource_request_log` VALUES (9095, 'login.passwordLogin', '1658157225121_login', '127.0.0.1', '', NULL, '', NULL, '{\"packageId\":\"1658157225121_login\",\"packageType\":\"httpRequest\",\"appData\":{\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\",\"actionData\":{\"userId\":\"W00002\",\"password\":\"123456\",\"deviceId\":\"chrome_1658157225121\"}}}', '{\"packageId\":\"1658157225121_login\",\"packageType\":\"httpResponse\",\"status\":\"success\",\"timestamp\":\"2022-07-18T23:13:45+08:00\",\"appData\":{\"authToken\":\"_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3\",\"deviceId\":\"chrome_1658157225121\",\"userId\":\"W00002\",\"resultData\":{\"authToken\":\"_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3\",\"deviceId\":\"chrome_1658157225121\",\"userId\":\"W00002\"},\"appId\":\"jianghu\",\"pageId\":\"login\",\"actionId\":\"passwordLogin\"}}', 'success', 'insert', NULL, NULL, '2022-07-18T23:13:45+08:00');
COMMIT;

-- ----------------------------
-- Table structure for _role
-- ----------------------------
DROP TABLE IF EXISTS `_role`;
CREATE TABLE `_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(255) DEFAULT NULL COMMENT 'roleId',
  `roleName` varchar(255) DEFAULT NULL COMMENT 'role name',
  `roleDesc` varchar(255) DEFAULT NULL COMMENT 'role desc',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='角色表; 软删除未启用;';

-- ----------------------------
-- Records of _role
-- ----------------------------
BEGIN;
INSERT INTO `_role` VALUES (3, 'administrator', '系统管理员', '', 'insert', NULL, NULL, NULL);
INSERT INTO `_role` VALUES (6, 'boss', '掌门', '', 'insert', NULL, NULL, NULL);
INSERT INTO `_role` VALUES (7, 'disciple', '门徒', '', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _ui
-- ----------------------------
DROP TABLE IF EXISTS `_ui`;
CREATE TABLE `_ui` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageId` varchar(255) DEFAULT NULL COMMENT 'page id; E.g: index',
  `uiActionType` varchar(255) DEFAULT NULL COMMENT 'ui 动作类型，如：fetchData, postData, changeUi',
  `uiActionId` varchar(255) DEFAULT NULL COMMENT 'action id; E.g: selectXXXByXXX',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `uiActionConfig` text COMMENT 'ui 动作数据',
  `appDataSchema` text COMMENT 'ui 校验数据',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COMMENT='ui 施工方案';

-- ----------------------------
-- Records of _ui
-- ----------------------------
BEGIN;
INSERT INTO `_ui` VALUES (1, 'uiAction', 'ui', 'refreshTableData', '✅获取表格数据', '{ \"main\": [{\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (3, 'uiAction', 'ui', 'startInsertItem', '✅打开创建数据抽屉', '{ \"main\": [{\"function\": \"clearCreateForm\"}, {\"function\": \"openCreateDrawer\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (4, 'uiAction', 'ui', 'createItem', '✅创建数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"prepareCreateItem\"}, {\"function\": \"confirmCreateFormDialog\"}], \"main\": [ {\"function\": \"doCreateItem\"}], \"after\": [{\"function\": \"closeCreateDrawer\"}, {\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (5, 'uiAction', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ \"main\": [{\"function\": \"fillUpdateForm\"}, {\"function\": \"openUpdateDrawer\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (6, 'uiAction', 'ui', 'updateItem', '✅更新数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmUpdateItemDialog\"}], \"main\": [{\"function\": \"doUpdateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeUpdateDrawer\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (7, 'uiAction', 'ui', 'deleteItem', '✅删除数据', '{ \"before\": [{\"function\": \"confirmDeleteItemDialog\"}], \"main\": [ {\"function\": \"doDeleteItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (11, 'uiActionComponent', 'ui', 'refreshTableData', '✅获取表格数据', '{ \"before\": [{\"vueComponent\": \"classSelectDialog\", \"function\": \"selectItem\", \"functionParamObj\": { \"item\": { \"value\": \"2021-01级-01班\" } }}], \"main\": [{\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (13, 'uiActionComponent', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ \"main\": [{\"function\": \"clearItemData\"}, {\"function\": \"openCreateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (14, 'uiActionComponent', 'ui', 'insertItem', '✅创建数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"vueComponent\": \"jhConfirmDialog\", \"function\": \"confirmDialog\", \"functionParamObj\": { \"title\": \"新增\", \"content\": \"确定新增吗？\" }}], \"main\": [{\"function\": \"prepareCreateItem\"}, {\"function\": \"doCreateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (15, 'uiActionComponent', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"openUpdateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (16, 'uiActionComponent', 'ui', 'updateItem', '✅更新数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"vueComponent\": \"jhConfirmDialog\", \"function\": \"confirmDialog\", \"functionParamObj\": { \"title\": \"修改\", \"content\": \"确定修改吗？\" }}], \"main\": [{\"function\": \"doUpdateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (17, 'uiActionComponent', 'ui', 'deleteItem', '✅删除数据', '{ \"before\": [{\"vueComponent\": \"jhConfirmDialog\", \"function\": \"confirmDialog\", \"functionParamObj\": { \"title\": \"删除\", \"content\": \"确定删除吗？\" }}], \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"doDeleteItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (30, 'resourceHook', 'ui', 'refreshTableData', '✅获取表格数据', '{ \"main\": [{\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (31, 'resourceHook', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ \"main\": [{\"function\": \"clearItemData\"}, {\"function\": \"openCreateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (32, 'resourceHook', 'ui', 'createItem', '✅创建数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmCreateItemDialog\"}], \"main\": [{\"function\": \"doCreateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (33, 'resourceHook', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"openUpdateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (34, 'resourceHook', 'ui', 'updateItem', '✅更新数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmUpdateItemDialog\"}], \"main\": [{\"function\": \"doUpdateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (35, 'resourceHook', 'ui', 'deleteItem', '✅删除数据', '{ \"before\": [{\"function\": \"confirmDeleteItemDialog\"}], \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"doDeleteItem\"}, {\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (40, 'backendSearchDemo', 'ui', 'refreshTableData', '✅获取表格数据', '{ \"main\": [{\"function\": \"refreshTableData\"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (41, 'backendSearchDemo', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ \"main\": [{\"function\": \"clearItemData\"}, {\"function\": \"openCreateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (42, 'backendSearchDemo', 'ui', 'createItem', '✅创建数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmCreateItemDialog\"}], \"main\": [{\"function\": \"doCreateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (43, 'backendSearchDemo', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"openUpdateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (44, 'backendSearchDemo', 'ui', 'updateItem', '✅更新数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmUpdateItemDialog\"}], \"main\": [{\"function\": \"doUpdateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (45, 'backendSearchDemo', 'ui', 'deleteItem', '✅删除数据', '{ \"before\": [{\"function\": \"confirmDeleteItemDialog\"}], \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"doDeleteItem\"}, {\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (50, 'dataAccessRight', 'ui', 'refreshTableData', '✅获取表格数据', '{ \"main\": [{\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (51, 'dataAccessRight', 'ui', 'startCreateItem', '✅打开创建数据抽屉', '{ \"main\": [{\"function\": \"clearItemData\"}, {\"function\": \"openCreateDialog\"}]}', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (52, 'dataAccessRight', 'ui', 'createItem', '✅创建数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmCreateItemDialog\"}], \"main\": [{\"function\": \"doCreateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (53, 'dataAccessRight', 'ui', 'startUpdateItem', '✅打开更新数据抽屉', '{ \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"openUpdateDialog\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (54, 'dataAccessRight', 'ui', 'updateItem', '✅更新数据', '{ \"before\": [{\"function\": \"prepareValidate\"}, {\"function\": \"confirmUpdateItemDialog\"}], \"main\": [{\"function\": \"doUpdateItem\"}, {\"function\": \"refreshTableData\"}], \"after\": [{\"function\": \"closeDrawerShow\"}] }', NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_ui` VALUES (55, 'dataAccessRight', 'ui', 'deleteItem', '✅删除数据', '{ \"before\": [{\"function\": \"confirmDeleteItemDialog\"}], \"main\": [{\"function\": \"prepareItemData\"}, {\"function\": \"doDeleteItem\"}, {\"function\": \"refreshTableData\"}] }', NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user
-- ----------------------------
DROP TABLE IF EXISTS `_user`;
CREATE TABLE `_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSequence` varchar(255) DEFAULT NULL COMMENT '自增id; 用于生成userId',
  `userId` varchar(255) DEFAULT NULL COMMENT '主键id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名(登陆)',
  `clearTextPassword` varchar(255) DEFAULT NULL COMMENT '明文密码',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `md5Salt` varchar(255) DEFAULT NULL COMMENT 'md5Salt',
  `userStatus` varchar(255) DEFAULT 'active' COMMENT '用户账号状态：活跃或关闭',
  `userType` varchar(255) DEFAULT NULL COMMENT '用户类型; staff, student.',
  `config` mediumtext COMMENT '配置信息',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_index` (`username`),
  UNIQUE KEY `userId_index` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------
-- Records of _user
-- ----------------------------
BEGIN;
INSERT INTO `_user` VALUES (42, NULL, 'admin', '系统管理员', '123456', 'a77042997567ca49eeda2226840e7ebe', 'bxgpY5H2Up0v', 'active', NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-07-18T23:12:36+08:00');
INSERT INTO `_user` VALUES (43, NULL, 'W00001', '张三丰', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_user` VALUES (44, NULL, 'W00002', '张无忌', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_user` VALUES (45, NULL, 'G00001', '洪七公', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_user` VALUES (46, NULL, 'G00002', '郭靖', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_user` VALUES (47, NULL, 'H00001', '岳不群', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
INSERT INTO `_user` VALUES (48, NULL, 'H00002', '令狐冲', '123456', '38d61d315e62546fe7f1013e31d42f57', 'Xs4JSZnhiwsR', 'active', NULL, NULL, 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role
-- ----------------------------
DROP TABLE IF EXISTS `_user_group_role`;
CREATE TABLE `_user_group_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL COMMENT '用户id',
  `groupId` varchar(255) NOT NULL COMMENT '群组Id',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色Id',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `groupId_index` (`groupId`),
  KEY `userId_index` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=579 DEFAULT CHARSET=utf8mb4 COMMENT='用户群组角色关联表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role
-- ----------------------------
BEGIN;
INSERT INTO `_user_group_role` VALUES (568, 'admin', 'adminGroup', 'administrator', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (569, 'W00001', 'wudang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (570, 'W00002', 'wudang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (573, 'G00001', 'gaibang', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (574, 'G00002', 'gaibang', 'disciple', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (577, 'H00001', 'huashan', 'boss', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role` VALUES (578, 'H00002', 'huashan', 'disciple', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_page
-- ----------------------------
DROP TABLE IF EXISTS `_user_group_role_page`;
CREATE TABLE `_user_group_role_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL COMMENT 'userId 或者 通配符; 通配符: *',
  `group` varchar(255) DEFAULT NULL COMMENT 'groupId 或者 通配符; 通配符: *',
  `role` varchar(255) DEFAULT NULL COMMENT 'roleId 或者 通配符; 通配符: *',
  `page` varchar(255) DEFAULT NULL COMMENT 'pageId id',
  `allowOrDeny` varchar(255) DEFAULT NULL COMMENT '用户群组角色 匹配后 执行动作; allow、deny',
  `desc` varchar(255) DEFAULT NULL COMMENT '映射描述',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COMMENT='用户群组角色 - 页面 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_page
-- ----------------------------
BEGIN;
INSERT INTO `_user_group_role_page` VALUES (17, '*', 'public', '*', 'login', 'allow', '登陆页; 开放给所有用户;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (18, '*', 'login', '*', 'manual', 'allow', '操作手册页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (19, '*', 'login', '*', 'help', 'allow', '帮助页; 开放给登陆用户;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (21, '*', 'adminGroup', 'administrator', '*', 'allow', '所有页面; 开放给应用管理者;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (27, '*', 'wudang', 'boss,disciple', 'protocolDemo', 'allow', 'studentManagement01; 开放给武当派派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (28, '*', 'gaibang', 'boss,disciple', 'frontendDemo01,frontendDemo02', 'allow', 'studentManagement02&studentManagement03; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (29, '*', 'huashan', 'boss,disciple', 'backendSearchDemo', 'allow', 'studentManagement04; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_page` VALUES (30, '*', '*', 'boss,disciple', 'dataAccessRight', 'allow', '数据权限demo', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_group_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `_user_group_role_resource`;
CREATE TABLE `_user_group_role_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL COMMENT 'userId 或者 通配符; 通配符: *',
  `group` varchar(255) DEFAULT NULL COMMENT 'groupId 或者 通配符; 通配符: *',
  `role` varchar(255) DEFAULT NULL COMMENT 'roleId 或者 通配符; 通配符: *',
  `resource` varchar(255) DEFAULT NULL COMMENT 'resourceId 或者 通配符; 通配符: *, !resourceId',
  `allowOrDeny` varchar(255) DEFAULT NULL COMMENT '用户群组角色 匹配后 执行动作; allow、deny',
  `desc` varchar(255) DEFAULT NULL COMMENT '映射描述',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COMMENT='用户群组角色 - 请求资源 映射表; 软删除未启用;';

-- ----------------------------
-- Records of _user_group_role_resource
-- ----------------------------
BEGIN;
INSERT INTO `_user_group_role_resource` VALUES (1, '*', 'public', '*', 'login.passwordLogin', 'allow', '登陆resource, 开放给所有用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (11, '*', 'public', '*', 'allPage.getConstantList', 'allow', '查询常量resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (31, '*', 'login', '*', 'allPage.logout', 'allow', '登出resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (32, '*', 'login', '*', 'allPage.refreshToken', 'allow', '刷新authToken resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (33, '*', 'login', '*', 'allPage.userInfo', 'allow', '用户个人信息resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (34, '*', 'login', '*', 'allPage.uploadByBase64', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (35, '*', 'login', '*', 'allPage.uploadByStream', 'allow', '上传文件resource, 开放给所有登陆成功的用户', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (51, '*', 'adminGroup', 'administrator', '*', 'allow', '应用管理者, 赋予所有resource权限', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (117, '*', 'wudang', 'boss', 'protocolDemo.*', 'allow', 'page01 内的所有操作; 开放给武当派掌门;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (118, '*', 'wudang', 'disciple', 'protocolDemo.selectItemList', 'allow', 'page01 内的查询列表操作; 开放给武当派门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (125, '*', 'gaibang', 'boss', 'frontendDemo01.*,frontendDemo02.*', 'allow', 'page02&page03 内的所有操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (126, '*', 'gaibang', 'disciple', 'frontendDemo01.selectItemList,frontendDemo02.selectItemList', 'allow', 'page02&page03 内的查询列表操作; 开放给丐帮掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (131, '*', 'huashan', 'boss', 'backendSearchDemo.*', 'allow', 'page04 内的所有操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (132, '*', 'huashan', 'disciple', 'backendSearchDemo.selectItemList', 'allow', 'page04 内的查询列表操作; 开放给华山派掌门&门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (133, '*', '*', 'boss', 'dataAccessRight.*', 'allow', 'page05 内的所有操作; 开放给所有掌门', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (134, '*', '*', 'disciple', 'dataAccessRight.selectItemList', 'allow', 'page05 内的查询列表操作; 开放给所有门徒;', 'insert', NULL, NULL, NULL);
INSERT INTO `_user_group_role_resource` VALUES (135, '*', 'public', '*', 'socket.disconnect', 'allow', 'socket断开连接', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for _user_session
-- ----------------------------
DROP TABLE IF EXISTS `_user_session`;
CREATE TABLE `_user_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL COMMENT '用户id',
  `userIp` varchar(255) DEFAULT NULL COMMENT '用户ip',
  `userIpRegion` varchar(255) DEFAULT NULL COMMENT '用户Ip区域',
  `userAgent` text COMMENT '请求的 agent',
  `deviceId` varchar(255) DEFAULT NULL COMMENT '设备id',
  `deviceType` varchar(255) DEFAULT 'web' COMMENT '设备类型; flutter, web, bot_databot, bot_chatbot, bot_xiaochengxu',
  `socketStatus` varchar(255) DEFAULT 'offline' COMMENT 'socket状态',
  `authToken` varchar(255) DEFAULT NULL COMMENT 'auth token',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  KEY `userId_index` (`userId`),
  KEY `userId_deviceId_index` (`userId`,`deviceId`) USING BTREE,
  KEY `authToken_index` (`authToken`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2090 DEFAULT CHARSET=utf8mb4 COMMENT='用户session表; deviceId 维度;软删除未启用;';

-- ----------------------------
-- Records of _user_session
-- ----------------------------
BEGIN;
INSERT INTO `_user_session` VALUES (2083, 'admin', '127.0.0.1', '', '', 'chrome_1658157217726', 'web', 'offline', 'bNHDMRUBfv3dd3Ix55J6b_HIpRJtjtz-zXbZ', 'jhInsert', NULL, NULL, '2022-07-18T23:13:37+08:00');
INSERT INTO `_user_session` VALUES (2084, 'admin', '127.0.0.1', '', '', 'chrome_1658157218545', 'web', 'offline', 'ubaVk-PckXQsZyT9ZaJcusaW-nHveS3WZJiq', 'jhInsert', NULL, NULL, '2022-07-18T23:13:38+08:00');
INSERT INTO `_user_session` VALUES (2085, 'admin', '127.0.0.1', '', '', 'chrome_1658157222591', 'web', 'offline', 'KO3nkam82x97ApK__duM29VToZrxVw4WGXn-', 'jhInsert', NULL, NULL, '2022-07-18T23:13:42+08:00');
INSERT INTO `_user_session` VALUES (2086, 'admin', '127.0.0.1', '', '', 'chrome_1658157223475', 'web', 'offline', 'mmxTEIFl2dPMXLrJbHHeEXlbnNJUPjH4SVIz', 'jhInsert', NULL, NULL, '2022-07-18T23:13:43+08:00');
INSERT INTO `_user_session` VALUES (2087, 'admin', '127.0.0.1', '', '', 'chrome_1658157224929', 'web', 'offline', 'DyR-54j_p79cBCZXB6JKwxPyIg5mq7QjKeVw', 'jhInsert', NULL, NULL, '2022-07-18T23:13:44+08:00');
INSERT INTO `_user_session` VALUES (2088, 'W00001', '127.0.0.1', '', '', 'chrome_1658157225065', 'web', 'offline', 'CNbtnQwpj_ljYvMMI76FNIIJftx2bJb4w8bG', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
INSERT INTO `_user_session` VALUES (2089, 'W00002', '127.0.0.1', '', '', 'chrome_1658157225121', 'web', 'offline', '_GeluTzrnnClVa1bWmqCh8qTq1polde_CJf3', 'jhInsert', NULL, NULL, '2022-07-18T23:13:45+08:00');
COMMIT;

-- ----------------------------
-- Table structure for access_control_student
-- ----------------------------
DROP TABLE IF EXISTS `access_control_student`;
CREATE TABLE `access_control_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL COMMENT '主键id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名(登陆)',
  `resourceData` varchar(255) DEFAULT NULL COMMENT '明文密码',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_index` (`username`),
  UNIQUE KEY `userId_index` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COMMENT='学生表的 accessControl 表';

-- ----------------------------
-- Records of access_control_student
-- ----------------------------
BEGIN;
INSERT INTO `access_control_student` VALUES (50, 'G00001', '洪七公', '{ \"where\":{\"level\": \"02\"} }', 'insert', NULL, NULL, NULL);
INSERT INTO `access_control_student` VALUES (51, 'H00001', '岳不群', '{ \"where\":{\"level\": \"02\"} }', 'insert', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(255) DEFAULT NULL COMMENT '学生ID',
  `name` varchar(255) DEFAULT NULL COMMENT '学生名字',
  `gender` varchar(255) DEFAULT NULL COMMENT '性别',
  `dateOfBirth` varchar(255) DEFAULT NULL COMMENT '出生日期',
  `classId` varchar(255) DEFAULT NULL COMMENT '班级ID',
  `level` varchar(255) DEFAULT NULL COMMENT '年级',
  `bodyHeight` varchar(255) DEFAULT NULL COMMENT '身高',
  `studentStatus` varchar(255) DEFAULT NULL COMMENT '学生状态',
  `remarks` mediumtext COMMENT '备注',
  `operation` varchar(255) DEFAULT 'insert' COMMENT '操作; insert, update, jhInsert, jhUpdate, jhDelete jhRestore',
  `operationByUserId` varchar(255) DEFAULT NULL COMMENT '操作者userId',
  `operationByUser` varchar(255) DEFAULT NULL COMMENT '操作者用户名',
  `operationAt` varchar(255) DEFAULT NULL COMMENT '操作时间; E.g: 2021-05-28T10:24:54+08:00 ',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `studentId` (`studentId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of student
-- ----------------------------
BEGIN;
INSERT INTO `student` VALUES (161, 'G00003', '小虾米', 'male', '2022-01-25', '2021-01级-02班', '02', '180', '正常', '小虾米', 'jhUpdate', 'admin', '系统管理员', '2022-05-01T15:29:52+08:00');
INSERT INTO `student` VALUES (168, '100067', '1111', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-01T23:38:23+08:00');
INSERT INTO `student` VALUES (173, '121432', '21434', NULL, NULL, '2021-01级-01班', NULL, NULL, NULL, NULL, 'jhInsert', 'admin', '系统管理员', '2022-05-01T23:37:58+08:00');
INSERT INTO `student` VALUES (174, 'admin', '系统管理员', 'male', '2022-05-02', '2021-01级-01班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T21:17:52+08:00');
INSERT INTO `student` VALUES (175, '1000221', '221', 'male', '2022-05-08', '2021-01级-02班', '01', NULL, NULL, NULL, 'jhUpdate', 'admin', '系统管理员', '2022-05-03T20:50:51+08:00');
INSERT INTO `student` VALUES (210, 'hook1001', 'student_name', 'male', '2022-07-13', '1234', '01', NULL, NULL, '备注', 'jhInsert', 'admin', '系统管理员', '2022-07-18T23:12:37+08:00');
COMMIT;

-- ----------------------------
-- View structure for _view01_user
-- ----------------------------
DROP VIEW IF EXISTS `_view01_user`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `_view01_user` AS select `_user`.`id` AS `id`,`_user`.`idSequence` AS `idSequence`,`_user`.`userId` AS `userId`,`_user`.`username` AS `username`,`_user`.`clearTextPassword` AS `clearTextPassword`,`_user`.`password` AS `password`,`_user`.`md5Salt` AS `md5Salt`,`_user`.`userStatus` AS `userStatus`,`_user`.`userType` AS `userType`,`_user`.`config` AS `config`,`_user`.`operation` AS `operation`,`_user`.`operationByUserId` AS `operationByUserId`,`_user`.`operationByUser` AS `operationByUser`,`_user`.`operationAt` AS `operationAt` from `_user`;

SET FOREIGN_KEY_CHECKS = 1;
