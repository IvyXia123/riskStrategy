/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : wind_cloud

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2018-02-02 15:47:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `group`
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` bigint(16) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(300) NOT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `rule_count` varchar(96) NOT NULL,
  `last_execute_time` varchar(96) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_author` varchar(96) NOT NULL,
  `modify_author` varchar(96) DEFAULT NULL,
  `passed_qty` varchar(96) DEFAULT NULL,
  `According_unique_number` varchar(96) DEFAULT NULL,
  `number_manual_audits` varchar(96) DEFAULT NULL,
  `details_hit_rule` varchar(96) DEFAULT NULL,
  `addition` varchar(96) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COMMENT='规则集表';

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('84', '助学贷_欠费', '新增测试', '1', null, '2018-01-24 16:40:21', '2018-01-24 16:40:21', '小张', '小明', null, null, null, null, null);
INSERT INTO `group` VALUES ('86', '助学贷_02', '助学贷', '0', null, '2018-01-25 17:30:47', '2018-01-25 17:30:47', '小张', null, null, null, null, null, null);
INSERT INTO `group` VALUES ('87', '助学贷_03', '助学贷', '0', null, '2018-01-25 17:35:44', '2018-01-25 17:35:44', '小张', null, null, null, null, null, null);
INSERT INTO `group` VALUES ('88', '助学贷_04', 'test', '1', null, '2018-01-31 18:49:24', '2018-01-31 18:49:24', '小张', '小明', null, null, null, null, null);

-- ----------------------------
-- Table structure for `group_product`
-- ----------------------------
DROP TABLE IF EXISTS `group_product`;
CREATE TABLE `group_product` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) DEFAULT NULL,
  `group_id` bigint(11) DEFAULT NULL COMMENT '规则集 id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(4) DEFAULT NULL COMMENT '是否启用(一个产品下只能有一个开启的规则集)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='规则 - 规则集映射表';

-- ----------------------------
-- Records of group_product
-- ----------------------------
INSERT INTO `group_product` VALUES ('2', '75', '84', '2018-01-31 18:50:27', '2018-01-31 18:50:27', '0');
INSERT INTO `group_product` VALUES ('3', '75', '88', '2018-01-31 18:50:27', '2018-01-31 18:50:27', '1');

-- ----------------------------
-- Table structure for `interface_info`
-- ----------------------------
DROP TABLE IF EXISTS `interface_info`;
CREATE TABLE `interface_info` (
  `id` bigint(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(600) NOT NULL COMMENT '接口名称',
  `req_url` varchar(900) NOT NULL COMMENT '接口访问地址',
  `http_type` varchar(10) DEFAULT NULL,
  `desc` varchar(600) DEFAULT NULL COMMENT '接口描述',
  `next` int(9) DEFAULT NULL COMMENT '下一跳',
  `query_result_inveral` int(11) NOT NULL COMMENT '取结果轮询间隔时间，毫秒',
  `supplier` varchar(150) NOT NULL COMMENT '接口供应商',
  `rsp_demo` varchar(3000) NOT NULL COMMENT '接口返回数据样例',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `level` int(11) DEFAULT NULL COMMENT '调用级别',
  `interface_json` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='征信接口描述信息表';

-- ----------------------------
-- Records of interface_info
-- ----------------------------
INSERT INTO `interface_info` VALUES ('1', '同盾提交取报告接口', 'https://apitest.tongdun.cn/preloan/apply/v5', null, null, '2', '1500', '同盾', '', '2017-11-10 17:19:10', '2017-11-10 17:19:10', '1', null);
INSERT INTO `interface_info` VALUES ('2', '同盾取报告接口', 'https://apitest.tongdun.cn/preloan/report/v9', null, null, null, '1500', '同盾', '', '2017-11-10 17:19:13', '2017-11-10 17:19:13', '1', null);
INSERT INTO `interface_info` VALUES ('3', '同盾 v3接口', 'https://apitest.tongdun.cn/bodyguard/apply/v3', null, null, null, '1000', '同盾', '', '2018-01-23 17:47:56', '2018-01-23 17:47:56', '1', '{\r\n	\"success\": true,\r\n	\"id\": \"WF2018011213125418114520\",\r\n	\"result_desc\": {\r\n		\"ANTIFRAUD\": {\r\n			\"score\": 1463,\r\n			\"risk_items\": [{\r\n				\"rule_id\": \"2666769\",\r\n				\"score\": 10.0,\r\n				\"rule_uuid\": \"13db170a323944fea16948b28970a4d2\",\r\n				\"risk_id\": 1,\r\n				\"risk_name\": \"身份证归属地位于高风险较为集中地区\",\r\n				\"risk_detail\": {\r\n					\"description\": \"是否命中自定义名单\",\r\n					\"type\": \"custom_list\",\r\n					\"list\": [\"370404\"]\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666771\",\r\n				\"score\": 80.0,\r\n				\"rule_uuid\": \"a6a1dd8d685a4705b29e7bb80d6fc7d3\",\r\n				\"risk_id\": 2,\r\n				\"risk_name\": \"身份证命中法院失信名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中法院失信名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000027584631\",\r\n						\"fraudType\": \"court\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}, {\r\n						\"hitUuid\": \"1000007869938\",\r\n						\"executeCourt\": \"厦门市思明区人民法院\",\r\n						\"caseDate\": \"2014年07月16日\",\r\n						\"carryOut\": \"全部未履行\",\r\n						\"fraudType\": \"court\",\r\n						\"specificCircumstances\": \"其他有履行能力而拒不履行生效法律文书确定义务\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}, {\r\n						\"hitUuid\": \"1000014031648\",\r\n						\"executeCourt\": \"厦门市思明区人民法院\",\r\n						\"caseDate\": \"2014年07月16日\",\r\n						\"carryOut\": \"全部未履行\",\r\n						\"fraudType\": \"court\",\r\n						\"specificCircumstances\": \"其他有履行能力而拒不履行生效法律文书确定义务\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}, {\r\n						\"hitUuid\": \"1000022641475\",\r\n						\"fraudType\": \"court\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}, {\r\n						\"hitUuid\": \"1000027584629\",\r\n						\"fraudType\": \"court\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}, {\r\n						\"hitUuid\": \"1000027584627\",\r\n						\"fraudType\": \"court\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666773\",\r\n				\"score\": 80.0,\r\n				\"rule_uuid\": \"018f728039d84fc6b330a7e3c8e7f2e1\",\r\n				\"risk_id\": 3,\r\n				\"risk_name\": \"身份证命中犯罪通缉名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中犯罪通缉名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000027584625\",\r\n						\"fraudType\": \"crime\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"刑事犯罪\"\r\n					}, {\r\n						\"hitUuid\": \"1000014031656\",\r\n						\"fraudType\": \"crime\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"刑事犯罪\"\r\n					}, {\r\n						\"hitUuid\": \"1000007869936\",\r\n						\"fraudType\": \"crime\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"刑事犯罪\"\r\n					}, {\r\n						\"hitUuid\": \"1000008947854\",\r\n						\"fraudType\": \"crime\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"刑事犯罪\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666775\",\r\n				\"score\": 80.0,\r\n				\"rule_uuid\": \"00293ceb0baa4d54876894c909a9ab0d\",\r\n				\"risk_id\": 4,\r\n				\"risk_name\": \"身份证命中法院执行名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中法院执行名单\",\r\n					\"black_list_details\": [{\r\n						\"caseCode\": \"(2010)榆执字第0121233号\",\r\n						\"hitUuid\": \"1000007869940\",\r\n						\"executeCourt\": \"晋中市榆次区人民法院\",\r\n						\"caseDate\": \"2010年1月4日\",\r\n						\"fraudType\": \"courtZhixing\",\r\n						\"executedName\": \"11234\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院执行\"\r\n					}, {\r\n						\"hitUuid\": \"133247651713192937\",\r\n						\"fraudType\": \"courtZhixing\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院执行\"\r\n					}, {\r\n						\"caseCode\": \"(2010)榆执字第0121253号\",\r\n						\"hitUuid\": \"1000022913461\",\r\n						\"executeCourt\": \"晋中市榆次区人民法院\",\r\n						\"caseDate\": \"2010年1月4日\",\r\n						\"fraudType\": \"courtZhixing\",\r\n						\"executedName\": \"11234\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院执行\"\r\n					}, {\r\n						\"caseCode\": \"(2010)榆执字第0121233号\",\r\n						\"hitUuid\": \"1000014031650\",\r\n						\"executeCourt\": \"晋中市榆次区人民法院\",\r\n						\"caseDate\": \"2010年1月4日\",\r\n						\"fraudType\": \"courtZhixing\",\r\n						\"executedName\": \"11234\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院执行\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666777\",\r\n				\"score\": 60.0,\r\n				\"rule_uuid\": \"1c2c8f9efb934c5cb939cd042e008281\",\r\n				\"risk_id\": 5,\r\n				\"risk_name\": \"身份证对应人存在助学贷款欠费历史\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证对应人存在助学贷款欠费历史\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000007869942\",\r\n						\"fraudType\": \"studentDefault\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"助学贷款欠费\"\r\n					}, {\r\n						\"hitUuid\": \"1000022913463\",\r\n						\"fraudType\": \"studentDefault\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"助学贷款欠费\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666779\",\r\n				\"score\": 95.0,\r\n				\"rule_uuid\": \"d46b76f9b83d48a1aa839c0e2ac37b39\",\r\n				\"risk_id\": 6,\r\n				\"risk_name\": \"身份证命中信贷逾期名单\",\r\n				\"risk_detail\": {\r\n					\"discredit_times\": 4,\r\n					\"overdue_details\": [{\r\n						\"overdue_time\": \"2017-02\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(90, 180]\",\r\n						\"overdue_count\": 4\r\n					}, {\r\n						\"overdue_time\": \"2017-06\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(0, 30]\",\r\n						\"overdue_count\": 1\r\n					}, {\r\n						\"overdue_time\": \"2017-02\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(90, 180]\",\r\n						\"overdue_count\": 4\r\n					}, {\r\n						\"overdue_time\": \"2017-09\"\r\n					}],\r\n					\"type\": \"discredit_count\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666781\",\r\n				\"score\": 40.0,\r\n				\"rule_uuid\": \"26647d8c64364e7986619789f0157d4b\",\r\n				\"risk_id\": 7,\r\n				\"risk_name\": \"身份证命中高风险关注名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"grey_list_details\": [{\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常交易\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"恶意爬取\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"游戏消费欠费\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常支付\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"风险激活\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"欠款公司法人代表\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"作弊行为\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院执行\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常登录\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常充值\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"信贷逾期后还款\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常接单\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"欠税\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"刑事犯罪\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"电商风险名单\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"垃圾注册\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"盗卡\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"车贷风险名单\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"信贷逾期名单\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"机构代办\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常叫车\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"欠税公司法人代表\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"信用炒作\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常退款\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1497143325000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院失信\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常租赁\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常提现\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"刷单\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"垃圾消息\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常转账\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常审核\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"伪冒风险\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常行为\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"电信欺诈\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院结案\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"助学贷款欠费\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"异常注册\",\r\n						\"value\": \"370404199006301915\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"故意违章乘车\",\r\n						\"value\": \"370404199006301915\"\r\n					}],\r\n					\"description\": \"身份证命中高风险关注名单\",\r\n					\"type\": \"grey_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666783\",\r\n				\"score\": 70.0,\r\n				\"rule_uuid\": \"fd9fa9afa95145f1a90e80bc2986f585\",\r\n				\"risk_id\": 8,\r\n				\"risk_name\": \"身份证命中车辆租赁违约名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中车辆租赁违约名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000008947890\",\r\n						\"fraudType\": \"carRental\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"汽车租赁违约\"\r\n					}, {\r\n						\"hitUuid\": \"1000007869946\",\r\n						\"fraudType\": \"carRental\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"汽车租赁违约\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666785\",\r\n				\"score\": 40.0,\r\n				\"rule_uuid\": \"542777816b884ef0a794e9e44edd849a\",\r\n				\"risk_id\": 9,\r\n				\"risk_name\": \"身份证命中法院结案名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中法院结案名单\",\r\n					\"black_list_details\": [{\r\n						\"caseCode\": \"(2010)榆执字第0121234号\",\r\n						\"executeCourt\": \"运城市人民法院\",\r\n						\"caseDate\": \"2010年1月4日\",\r\n						\"gender\": \"男\",\r\n						\"termDuty\": \"被告于本判决生效后10日内偿还原告借款10000元并支付相应利息\",\r\n						\"carryOut\": \"全部未履行\",\r\n						\"fraudType\": \"courtClose\",\r\n						\"specificCircumstances\": \"其他有履行能力而拒不履行生效法律文书确定义务\",\r\n						\"executedName\": \"皮晴晴\",\r\n						\"evidenceCourt\": \"运城市人民法院\",\r\n						\"hitUuid\": \"93087653121442793\",\r\n						\"province\": \"山西\",\r\n						\"executeCode\": \"(2017)榆民二初字第112号民事判决书\",\r\n						\"value\": \"370404199006301915\",\r\n						\"age\": \"27\",\r\n						\"fraudTypeDisplayName\": \"法院结案\"\r\n					}, {\r\n						\"caseCode\": \"(2010)榆执字第0121233号\",\r\n						\"executeCourt\": \"晋中市榆次区人民法院\",\r\n						\"caseDate\": \"2010年1月4日\",\r\n						\"gender\": \"男\",\r\n						\"termDuty\": \"被告于本判决生效后10日内偿还原告借款10000元并支付相应利息\",\r\n						\"carryOut\": \"全部未履行\",\r\n						\"fraudType\": \"courtClose\",\r\n						\"specificCircumstances\": \"其他有履行能力而拒不履行生效法律文书确定义务\",\r\n						\"executedName\": \"皮晴晴\",\r\n						\"evidenceCourt\": \"晋中市榆次区人民法院\",\r\n						\"hitUuid\": \"93087652576187369\",\r\n						\"province\": \"山西\",\r\n						\"executeCode\": \"(2017)榆民二初字第112号民事判决书\",\r\n						\"value\": \"370404199006301915\",\r\n						\"age\": \"27\",\r\n						\"fraudTypeDisplayName\": \"法院结案\"\r\n					}, {\r\n						\"hitUuid\": \"1000012540956\",\r\n						\"fraudType\": \"courtClose\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院结案\"\r\n					}, {\r\n						\"hitUuid\": \"1000026399361\",\r\n						\"fraudType\": \"courtClose\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"法院结案\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666787\",\r\n				\"score\": 40.0,\r\n				\"rule_uuid\": \"fc889d6c113d47659a6f838171194414\",\r\n				\"risk_id\": 10,\r\n				\"risk_name\": \"身份证_姓名命中信贷逾期模糊名单\",\r\n				\"risk_detail\": {\r\n					\"fuzzy_black_list_details\": [{\r\n						\"fuzzyIdNumber\": \"3704041990****1915\",\r\n						\"fuzzyName\": \"皮晴晴\",\r\n						\"fraudType\": \"creditCrack\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期名单\"\r\n					}],\r\n					\"description\": \"身份证_姓名命中信贷逾期模糊名单\",\r\n					\"type\": \"fuzzy_black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666789\",\r\n				\"score\": 40.0,\r\n				\"rule_uuid\": \"a6c8ee4e1828499c9ca9073e96835ed7\",\r\n				\"risk_id\": 11,\r\n				\"risk_name\": \"身份证_姓名命中法院失信模糊名单\",\r\n				\"risk_detail\": {\r\n					\"fuzzy_black_list_details\": [{\r\n						\"fuzzyIdNumber\": \"3704041990****1915\",\r\n						\"fuzzyName\": \"皮晴晴\",\r\n						\"fraudType\": \"court\",\r\n						\"fraudTypeDisplayName\": \"法院失信\"\r\n					}],\r\n					\"description\": \"身份证_姓名命中法院失信模糊名单\",\r\n					\"type\": \"fuzzy_black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666791\",\r\n				\"score\": 40.0,\r\n				\"rule_uuid\": \"0b58b74eb14d49ffb36131e6b77a18be\",\r\n				\"risk_id\": 12,\r\n				\"risk_name\": \"身份证_姓名命中法院执行模糊名单\",\r\n				\"risk_detail\": {\r\n					\"fuzzy_black_list_details\": [{\r\n						\"fuzzyIdNumber\": \"3704041990****1915\",\r\n						\"fuzzyName\": \"皮晴晴\",\r\n						\"fraudType\": \"courtZhixing\",\r\n						\"fraudTypeDisplayName\": \"法院执行\"\r\n					}],\r\n					\"description\": \"身份证_姓名命中法院执行模糊名单\",\r\n					\"type\": \"fuzzy_black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666793\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"399054b9570a49bba45be2784d5cc9a2\",\r\n				\"risk_id\": 13,\r\n				\"risk_name\": \"身份证_姓名命中法院结案模糊名单\",\r\n				\"risk_detail\": {\r\n					\"fuzzy_black_list_details\": [{\r\n						\"fuzzyIdNumber\": \"3704041990****1915\",\r\n						\"fuzzyName\": \"皮晴晴\",\r\n						\"fraudType\": \"courtClose\",\r\n						\"fraudTypeDisplayName\": \"法院结案\"\r\n					}],\r\n					\"description\": \"身份证_姓名命中法院结案模糊名单\",\r\n					\"type\": \"fuzzy_black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666795\",\r\n				\"score\": 80.0,\r\n				\"rule_uuid\": \"71d694c88be94da4a90c686ec5b681a6\",\r\n				\"risk_id\": 14,\r\n				\"risk_name\": \"身份证命中欠款公司法人代表名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中欠款公司法人代表名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000027584641\",\r\n						\"fraudType\": \"companyCreditCrack\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠款公司法人代表\"\r\n					}, {\r\n						\"hitUuid\": \"1000008947896\",\r\n						\"fraudType\": \"companyCreditCrack\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠款公司法人代表\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666797\",\r\n				\"score\": 20.0,\r\n				\"rule_uuid\": \"44b44ac4d53541cc8094a5b3a4dcc770\",\r\n				\"risk_id\": 15,\r\n				\"risk_name\": \"身份证命中故意违章乘车名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中故意违章乘车名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000027584635\",\r\n						\"fraudType\": \"travelCreditCrack\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"故意违章乘车\"\r\n					}, {\r\n						\"hitUuid\": \"1000007869958\",\r\n						\"fraudType\": \"travelCreditCrack\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"故意违章乘车\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666799\",\r\n				\"score\": 60.0,\r\n				\"rule_uuid\": \"d55f7693c06d4c6ca36ece04b83b4d88\",\r\n				\"risk_id\": 16,\r\n				\"risk_name\": \"身份证命中欠税名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中欠税名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"107514423153062889\",\r\n						\"fraudType\": \"taxOwing\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠税\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666801\",\r\n				\"score\": 60.0,\r\n				\"rule_uuid\": \"6eb068f0d98d4ab39d9d3f6178e2341f\",\r\n				\"risk_id\": 17,\r\n				\"risk_name\": \"身份证命中欠税公司法人代表名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中欠税公司法人代表名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000007869960\",\r\n						\"fraudType\": \"companyTaxOwing\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠税公司法人代表\"\r\n					}, {\r\n						\"hitUuid\": \"1000027584633\",\r\n						\"fraudType\": \"companyTaxOwing\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠税公司法人代表\"\r\n					}, {\r\n						\"hitUuid\": \"1000027584639\",\r\n						\"fraudType\": \"companyTaxOwing\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"欠税公司法人代表\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666803\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"198bf6ef05414a1ead4683fb21a7a55e\",\r\n				\"risk_id\": 18,\r\n				\"risk_name\": \"身份证命中信贷逾期后还款名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人身份证\",\r\n					\"description\": \"身份证命中信贷逾期后还款名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000014031654\",\r\n						\"fraudType\": \"discreditRepay\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期后还款\"\r\n					}, {\r\n						\"hitUuid\": \"1000008951044\",\r\n						\"fraudType\": \"discreditRepay\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期后还款\"\r\n					}, {\r\n						\"hitUuid\": \"1000022641479\",\r\n						\"fraudType\": \"discreditRepay\",\r\n						\"value\": \"370404199006301915\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期后还款\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666813\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"1012a166d26a4857b29563de8eea649b\",\r\n				\"risk_id\": 19,\r\n				\"risk_name\": \"手机号命中虚假号码库\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中虚假号码库\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000008947868\",\r\n						\"fraudType\": \"fakeMobile\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"虚假号码\"\r\n					}, {\r\n						\"hitUuid\": \"113228622290293737\",\r\n						\"fraudType\": \"fakeMobile\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"虚假号码\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666815\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"0676c8b9267d4f6a805f90d91aa26b0f\",\r\n				\"risk_id\": 20,\r\n				\"risk_name\": \"手机号命中通信小号库\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中通信小号库\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"135691885238096873\",\r\n						\"fraudType\": \"aliMobile\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"通信小号\"\r\n					}, {\r\n						\"hitUuid\": \"113227752278397929\",\r\n						\"fraudType\": \"aliMobile\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"通信小号\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666817\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"53913d799a3a410aa8256cb3388b2a46\",\r\n				\"risk_id\": 21,\r\n				\"risk_name\": \"手机号命中诈骗骚扰库\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中诈骗骚扰库\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000008947860\",\r\n						\"fraudType\": \"FraudHarass\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"举报欺诈\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666819\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"52e758447bc94ce59aa0b92e913d91ab\",\r\n				\"risk_id\": 22,\r\n				\"risk_name\": \"手机号命中高风险关注名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"grey_list_details\": [{\r\n						\"evidence_time\": \"1430740200000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院执行\",\r\n						\"value\": \"13333333333\"\r\n					}, {\r\n						\"evidence_time\": \"1422892800000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院失信\",\r\n						\"value\": \"13333333333\"\r\n					}, {\r\n						\"evidence_time\": \"1450633523000\",\r\n						\"risk_level\": \"高\",\r\n						\"fraud_type\": \"法院结案\",\r\n						\"value\": \"13333333333\"\r\n					}],\r\n					\"description\": \"手机号命中低风险关注名单\",\r\n					\"type\": \"grey_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666821\",\r\n				\"score\": 75.0,\r\n				\"rule_uuid\": \"782f7503739f40c8928f0c476c5e25aa\",\r\n				\"risk_id\": 23,\r\n				\"risk_name\": \"手机号命中信贷逾期名单\",\r\n				\"risk_detail\": {\r\n					\"discredit_times\": 4,\r\n					\"overdue_details\": [{\r\n						\"overdue_time\": \"2017-02\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(90, 180]\",\r\n						\"overdue_count\": 4\r\n					}, {\r\n						\"overdue_time\": \"2017-06\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(0, 30]\",\r\n						\"overdue_count\": 1\r\n					}, {\r\n						\"overdue_time\": \"2016-03\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(90, 180]\",\r\n						\"overdue_count\": 4\r\n					}, {\r\n						\"overdue_time\": \"2017-02\",\r\n						\"overdue_amount_range\": \"(10000, 50000]\",\r\n						\"overdue_day_range\": \"(90, 180]\",\r\n						\"overdue_count\": 4\r\n					}],\r\n					\"type\": \"discredit_count\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666823\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"45092f9efe1547fc94b1d618d3c0ebf2\",\r\n				\"risk_id\": 24,\r\n				\"risk_name\": \"手机号命中车辆租赁违约名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中车辆租赁违约名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000026399359\",\r\n						\"fraudType\": \"carRental\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"汽车租赁违约\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666825\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"d3cdaf8d0a96414aabdd91956dfcfa26\",\r\n				\"risk_id\": 25,\r\n				\"risk_name\": \"手机号疑似乱填\"\r\n			}, {\r\n				\"rule_id\": \"2666827\",\r\n				\"score\": 80.0,\r\n				\"rule_uuid\": \"6294764de8f442f3840b3d07cf148a3c\",\r\n				\"risk_id\": 26,\r\n				\"risk_name\": \"手机号命中欠款公司法人代表名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中欠款公司法人代表名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000027584643\",\r\n						\"fraudType\": \"companyCreditCrack\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"欠款公司法人代表\"\r\n					}, {\r\n						\"hitUuid\": \"1000008947898\",\r\n						\"fraudType\": \"companyCreditCrack\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"欠款公司法人代表\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666829\",\r\n				\"score\": 20.0,\r\n				\"rule_uuid\": \"4e486a2446f8440c9391c4c1161f367d\",\r\n				\"risk_id\": 27,\r\n				\"risk_name\": \"手机号命中信贷逾期后还款名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"description\": \"手机号命中信贷逾期后还款名单\",\r\n					\"black_list_details\": [{\r\n						\"hitUuid\": \"1000013215344\",\r\n						\"fraudType\": \"discreditRepay\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期后还款\"\r\n					}, {\r\n						\"hitUuid\": \"1000014031658\",\r\n						\"fraudType\": \"discreditRepay\",\r\n						\"value\": \"13333333333\",\r\n						\"fraudTypeDisplayName\": \"信贷逾期后还款\"\r\n					}],\r\n					\"type\": \"black_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666897\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"22c39b6dca1d4eed9799229a19455388\",\r\n				\"risk_id\": 28,\r\n				\"risk_name\": \"3个月内身份证关联多个申请信息\",\r\n				\"risk_detail\": {\r\n					\"frequency_distinct_details\": [{\r\n						\"result\": 14.0,\r\n						\"data\": [\"13333333333\", \"159※※※※8173\", \"130※※※※0000\", \"138※※※※8298\", \"138※※※※8888\", \"159※※※※8711\", \"131※※※※6688\", \"136※※※※3497\", \"131※※※※0001\", \"133※※※※3334\", \"1※※※3\", \"185※※※※3157\", \"147※※※※9001\", \"130※※※※0001\"],\r\n						\"description\": \"3个月身份证关联手机号数\"\r\n					}, {\r\n						\"result\": 5.0,\r\n						\"data\": [\"lan※※168@126.com\", \"244※※※239@126.com\", \"893※※※741@qq.com\", \"1※@qq.com\", \"2※2@qq.com\"],\r\n						\"description\": \"3个月身份证关联邮箱数\"\r\n					}],\r\n					\"type\": \"frequency_distinct\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666903\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"1176fd41db994abf903ebc782c560fa9\",\r\n				\"risk_id\": 29,\r\n				\"risk_name\": \"3个月内申请信息关联多个身份证\",\r\n				\"risk_detail\": {\r\n					\"frequency_distinct_details\": [{\r\n						\"result\": 12.0,\r\n						\"data\": [\"370404199006301915\", \"3704※※※※※※※※※※1000\", \"3301※※※※※※※※※※1414\", \"3704※※※※※※※※※※1917\", \"3801※※※※※※※※※※9996\", \"3301※※※※※※※※※※9996\", \"3203※※※※※※※※※※9147\", \"1304※※※※※※※※※※6519\", \"370※※※※※※※※915\", \"3303※※※※※※※※※※512x\", \"3309※※※※※※※※※※0020\", \"3303※※※※※※※※※※0311\"],\r\n						\"description\": \"3个月手机号关联身份证数\"\r\n					}],\r\n					\"type\": \"frequency_distinct\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666907\",\r\n				\"score\": 10.0,\r\n				\"rule_uuid\": \"7363733a5c6a489fa368965ad64d69e9\",\r\n				\"risk_id\": 30,\r\n				\"risk_name\": \"3个月内申请人身份证作为联系人身份证出现的次数过多\"\r\n			}, {\r\n				\"rule_id\": \"2666909\",\r\n				\"score\": 10.0,\r\n				\"rule_uuid\": \"38b83ab209d94f0ea8de62fcad03ccb2\",\r\n				\"risk_id\": 31,\r\n				\"risk_name\": \"3个月内申请人手机号作为联系人手机号出现的次数过多\"\r\n			}, {\r\n				\"rule_id\": \"2666921\",\r\n				\"score\": 5.0,\r\n				\"rule_uuid\": \"4c801eb32f6f44c49a3d748f1877d684\",\r\n				\"risk_id\": 32,\r\n				\"risk_name\": \"7天内设备或身份证或手机号申请次数过多\",\r\n				\"risk_detail\": {\r\n					\"result\": 3.0,\r\n					\"type\": \"frequency_one_dim\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666931\",\r\n				\"score\": 25.0,\r\n				\"rule_uuid\": \"9216b87a7e30442aa09a0d57b7f6a3ab\",\r\n				\"risk_id\": 33,\r\n				\"risk_name\": \"7天内身份证使用过多设备进行申请\",\r\n				\"risk_detail\": {\r\n					\"frequency_distinct_details\": [{\r\n						\"result\": 8.0,\r\n						\"data\": [\"abdd※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※9fd3\", \"f0a2※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※8274\", \"915c※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※0130\", \"4c78※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※543c\", \"e1a3※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※91a2\", \"8baa※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※c07e\", \"0c1a※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※ed73\", \"60e6※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※3fbc\"],\r\n						\"description\": \"7天内身份证关联设备数\"\r\n					}, {\r\n						\"result\": 2.0,\r\n						\"data\": [\"0c1a※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※ed73\", \"60e6※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※3fbc\"],\r\n						\"description\": \"1天内身份证关联设备数\"\r\n					}],\r\n					\"type\": \"frequency_distinct\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666959\",\r\n				\"score\": 30.0,\r\n				\"rule_uuid\": \"25bb4a93324d4cc4a458018b39caeb05\",\r\n				\"risk_id\": 34,\r\n				\"risk_name\": \"7天内申请人在多个平台申请借款\",\r\n				\"risk_detail\": {\r\n					\"association_partner_details\": [{\r\n						\"industryDisplayName\": \"厂商汽车金融\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"一般消费分期平台\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"互联网金融门户\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"融资租赁\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"银行消费金融公司\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"小额贷款公司\",\r\n						\"count\": 22\r\n					}, {\r\n						\"industryDisplayName\": \"综合类电商平台\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大型消费金融公司\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"信用卡中心\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"网上银行\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"P2P网贷\",\r\n						\"count\": 15\r\n					}, {\r\n						\"industryDisplayName\": \"银行小微贷款\",\r\n						\"count\": 4\r\n					}, {\r\n						\"industryDisplayName\": \"银行个人业务\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"财产保险\",\r\n						\"count\": 2\r\n					}, {\r\n						\"industryDisplayName\": \"O2O\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"汽车租赁\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大数据金融\",\r\n						\"count\": 1\r\n					}],\r\n					\"association_partner_count\": 84,\r\n					\"type\": \"association_partner\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666961\",\r\n				\"score\": 0.0,\r\n				\"rule_uuid\": \"20700fa5a4c24f17a3386959e37856b5\",\r\n				\"risk_id\": 35,\r\n				\"risk_name\": \"1个月内申请人在多个平台申请借款\",\r\n				\"risk_detail\": {\r\n					\"association_partner_details\": [{\r\n						\"industryDisplayName\": \"厂商汽车金融\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"一般消费分期平台\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"互联网金融门户\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"融资租赁\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"银行消费金融公司\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"小额贷款公司\",\r\n						\"count\": 22\r\n					}, {\r\n						\"industryDisplayName\": \"综合类电商平台\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大型消费金融公司\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"信用卡中心\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"网上银行\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"P2P网贷\",\r\n						\"count\": 15\r\n					}, {\r\n						\"industryDisplayName\": \"银行小微贷款\",\r\n						\"count\": 4\r\n					}, {\r\n						\"industryDisplayName\": \"银行个人业务\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"财产保险\",\r\n						\"count\": 2\r\n					}, {\r\n						\"industryDisplayName\": \"O2O\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"汽车租赁\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大数据金融\",\r\n						\"count\": 1\r\n					}],\r\n					\"association_partner_count\": 84,\r\n					\"type\": \"association_partner\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666963\",\r\n				\"score\": 0.0,\r\n				\"rule_uuid\": \"b2828c17cb3d47fd8bc22afb8b963a5a\",\r\n				\"risk_id\": 36,\r\n				\"risk_name\": \"3个月内申请人在多个平台申请借款\",\r\n				\"risk_detail\": {\r\n					\"association_partner_details\": [{\r\n						\"industryDisplayName\": \"厂商汽车金融\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"一般消费分期平台\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"互联网金融门户\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"融资租赁\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"银行消费金融公司\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"小额贷款公司\",\r\n						\"count\": 22\r\n					}, {\r\n						\"industryDisplayName\": \"综合类电商平台\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大型消费金融公司\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"信用卡中心\",\r\n						\"count\": 5\r\n					}, {\r\n						\"industryDisplayName\": \"网上银行\",\r\n						\"count\": 7\r\n					}, {\r\n						\"industryDisplayName\": \"P2P网贷\",\r\n						\"count\": 15\r\n					}, {\r\n						\"industryDisplayName\": \"银行小微贷款\",\r\n						\"count\": 4\r\n					}, {\r\n						\"industryDisplayName\": \"银行个人业务\",\r\n						\"count\": 3\r\n					}, {\r\n						\"industryDisplayName\": \"财产保险\",\r\n						\"count\": 2\r\n					}, {\r\n						\"industryDisplayName\": \"O2O\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"汽车租赁\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"大数据金融\",\r\n						\"count\": 1\r\n					}],\r\n					\"association_partner_count\": 84,\r\n					\"type\": \"association_partner\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666965\",\r\n				\"score\": 6.0,\r\n				\"rule_uuid\": \"36e78d72dbcd489da3670024fc3f2416\",\r\n				\"risk_id\": 37,\r\n				\"risk_name\": \"3个月内申请人在多个平台被放款_不包含本合作方\",\r\n				\"risk_detail\": {\r\n					\"association_partner_details\": [{\r\n						\"industryDisplayName\": \"直销银行\",\r\n						\"count\": 1\r\n					}, {\r\n						\"industryDisplayName\": \"P2P网贷\",\r\n						\"count\": 2\r\n					}],\r\n					\"association_partner_count\": 3,\r\n					\"type\": \"association_partner\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2667089\",\r\n				\"score\": 5.0,\r\n				\"rule_uuid\": \"09a24974d59a408587ca4b67fbc22ecc\",\r\n				\"risk_id\": 38,\r\n				\"risk_name\": \"申请人信息命中中风险关注名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"grey_list_details\": [{\r\n						\"evidence_time\": \"1505964241000\",\r\n						\"risk_level\": \"中\",\r\n						\"fraud_type\": \"信用异常\",\r\n						\"value\": \"13333333333\"\r\n					}],\r\n					\"description\": \"邮箱命中中风险关注名单\",\r\n					\"type\": \"grey_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2667091\",\r\n				\"score\": 2.0,\r\n				\"rule_uuid\": \"58e3319d176f4344a3ebe94e9b704a65\",\r\n				\"risk_id\": 39,\r\n				\"risk_name\": \"申请人信息命中低风险关注名单\",\r\n				\"risk_detail\": {\r\n					\"hit_type_displayname\": \"借款人手机\",\r\n					\"grey_list_details\": [{\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"低\",\r\n						\"fraud_type\": \"机构代办\",\r\n						\"value\": \"13333333333\"\r\n					}, {\r\n						\"evidence_time\": \"1434961040000\",\r\n						\"risk_level\": \"低\",\r\n						\"fraud_type\": \"异常借款\",\r\n						\"value\": \"13333333333\"\r\n					}],\r\n					\"description\": \"邮箱命中低风险关注名单\",\r\n					\"type\": \"grey_list\"\r\n				}\r\n			}, {\r\n				\"rule_id\": \"2666899\",\r\n				\"score\": 50.0,\r\n				\"rule_uuid\": \"2db0efa756014937a740b1896c95f53d\",\r\n				\"risk_id\": 40,\r\n				\"risk_name\": \"1个月内同一个手机号码申请被拒次数大于等于4\"\r\n			}],\r\n			\"decision\": \"REJECT\"\r\n		}\r\n	}\r\n}');

-- ----------------------------
-- Table structure for `interface_req_history`
-- ----------------------------
DROP TABLE IF EXISTS `interface_req_history`;
CREATE TABLE `interface_req_history` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `trans_id` int(11) DEFAULT NULL,
  `interface_id` int(9) NOT NULL COMMENT '接口id',
  `status_id` int(9) DEFAULT NULL,
  `local_ip` varchar(300) NOT NULL COMMENT '本地ip地址',
  `result` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='征信接口访问历史表';

-- ----------------------------
-- Records of interface_req_history
-- ----------------------------

-- ----------------------------
-- Table structure for `interface_req_params`
-- ----------------------------
DROP TABLE IF EXISTS `interface_req_params`;
CREATE TABLE `interface_req_params` (
  `id` bigint(9) unsigned NOT NULL AUTO_INCREMENT,
  `interface_id` bigint(9) NOT NULL COMMENT '对应接口 id',
  `kv_name` varchar(300) NOT NULL COMMENT '参数名字',
  `kv_value` varchar(300) DEFAULT NULL COMMENT '参数默认值',
  `field_type` varchar(150) DEFAULT NULL COMMENT '参数类型',
  `cn` varchar(300) DEFAULT NULL COMMENT '参数中文含义',
  `desc` varchar(600) DEFAULT NULL COMMENT '参数备注',
  `req_type` varchar(150) DEFAULT NULL COMMENT 'post, get',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `from` bigint(9) DEFAULT NULL COMMENT '来源(从哪个接口返回的数据中)',
  `from_key` varchar(100) DEFAULT NULL COMMENT '从来源获取的方式（key）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='征信接口请求参数表';

-- ----------------------------
-- Records of interface_req_params
-- ----------------------------
INSERT INTO `interface_req_params` VALUES ('1', '1', 'partner_code', 'evergrande', 'string', '合作方标识', null, 'post', '2017-11-09 11:30:59', '2017-11-09 11:30:59', null, null);
INSERT INTO `interface_req_params` VALUES ('2', '1', 'partner_key', '4b6933e8965b4a24a4d488668e698d17', 'string', '合作方密钥', null, 'post', '2017-11-09 11:32:06', '2017-11-09 11:32:06', null, null);
INSERT INTO `interface_req_params` VALUES ('3', '1', 'secret_key', 'd6d7b1f8246e419ca2e4e2106fb13958', 'string', '应用密钥', null, 'post', '2017-11-09 11:35:02', '2017-11-09 11:35:02', null, null);
INSERT INTO `interface_req_params` VALUES ('4', '1', 'event_id', 'loan_professional_web', 'string', '事件标识', null, 'post', '2017-11-09 11:35:16', '2017-11-09 11:35:16', null, null);
INSERT INTO `interface_req_params` VALUES ('5', '1', 'app_name', 'evergrande_web', 'string', '应用名称', null, 'post', '2017-11-09 11:35:55', '2017-11-09 11:35:55', null, null);
INSERT INTO `interface_req_params` VALUES ('6', '1', 'name', null, 'string', '姓名', null, 'post', '2017-11-09 11:38:18', '2017-11-09 11:38:18', null, null);
INSERT INTO `interface_req_params` VALUES ('7', '1', 'id_number', null, 'string', '身份证号', null, 'post', '2017-11-09 11:38:58', '2017-11-09 11:38:58', null, null);
INSERT INTO `interface_req_params` VALUES ('8', '1', 'mobile', null, 'string', '手机号', null, 'post', '2017-11-09 11:39:49', '2017-11-09 11:39:49', null, null);
INSERT INTO `interface_req_params` VALUES ('9', '2', 'partner_code', 'evergrande', 'string', '合作方标识', null, 'get', '2017-11-09 11:40:43', '2017-11-09 11:40:43', null, null);
INSERT INTO `interface_req_params` VALUES ('10', '2', 'partner_key', '4b6933e8965b4a24a4d488668e698d17', 'string', '合作方密钥', null, 'get', '2017-11-09 11:41:20', '2017-11-09 11:41:20', null, null);
INSERT INTO `interface_req_params` VALUES ('11', '2', 'report_id', null, 'string', '报告 id', null, 'get', '2017-11-12 22:01:08', '2017-11-12 22:01:08', '1', 'json.report_id');
INSERT INTO `interface_req_params` VALUES ('12', '3', 'partner_code', 'evergrande', 'string', '合作方标识', null, 'get', '2017-11-13 15:12:55', '2017-11-13 15:12:55', null, null);
INSERT INTO `interface_req_params` VALUES ('13', '3', 'partner_key', '4b6933e8965b4a24a4d488668e698d17', 'strig', '合作方密钥', null, 'get', '2017-11-13 15:12:56', '2017-11-13 15:12:56', null, null);
INSERT INTO `interface_req_params` VALUES ('14', '3', 'app_name', 'evergrande_b_web', 'string', '应用名称', null, 'get', '2017-11-13 15:20:02', '2017-11-13 15:20:02', null, null);
INSERT INTO `interface_req_params` VALUES ('15', '3', 'account_mobile', null, 'string', '手机号', null, 'post', '2017-11-13 15:13:01', '2017-11-13 15:13:01', null, null);
INSERT INTO `interface_req_params` VALUES ('16', '3', 'account_name', null, 'string', '姓名', null, 'post', '2017-11-13 15:13:03', '2017-11-13 15:13:03', null, null);
INSERT INTO `interface_req_params` VALUES ('17', '3', 'id_number', null, 'string', '身份证号', null, 'post', '2017-11-13 15:13:06', '2017-11-13 15:13:06', null, null);

-- ----------------------------
-- Table structure for `personal_credit_detail_history`
-- ----------------------------
DROP TABLE IF EXISTS `personal_credit_detail_history`;
CREATE TABLE `personal_credit_detail_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `trans_id` int(11) DEFAULT NULL,
  `pcsi_id` int(11) DEFAULT NULL,
  `rule_id` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of personal_credit_detail_history
-- ----------------------------

-- ----------------------------
-- Table structure for `personal_credit_submit_info`
-- ----------------------------
DROP TABLE IF EXISTS `personal_credit_submit_info`;
CREATE TABLE `personal_credit_submit_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `kv_name` varchar(300) NOT NULL COMMENT '个人征信信息 kv name',
  `kv_desc` varchar(300) DEFAULT NULL COMMENT '个人征信信息 kv 描述',
  `kv_index` varchar(300) DEFAULT NULL COMMENT '个人征信信息 kv 索引',
  `kv_source` varchar(150) DEFAULT NULL COMMENT '个人征信信息 kv 来源',
  `allow_null` int(11) DEFAULT NULL COMMENT '个人征信信息 kv 是否为空',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of personal_credit_submit_info
-- ----------------------------
INSERT INTO `personal_credit_submit_info` VALUES ('1', 'name', '姓名', 'name', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('2', 'id_no', '身份证号码', 'id_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('3', 'mobile_no', '手机号', 'mobile_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('4', 'bank_card_no', '银行卡号', 'bank_card_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('5', 'ip', 'IP地址', 'ip', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('6', 'regis_residence_addr', '户籍地址', 'regis_residence_addr', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('7', 'residence_addr', '住宅地址', 'residence_addr', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('8', 'work_corp', '单位名称', 'work_corp', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('9', 'corp_phone', '单位电话', 'corp_phone', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('10', 'email', '邮箱地址', 'email', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('11', 'education', '学历', 'education', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('12', 'device_no', '设备号', 'device_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('13', 'spouse_phone_no', '配偶手机号码', 'spouse_phone_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('14', 'spouse_id_no', '配偶身份证号码', 'spouse_id_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('15', 'spouse_name', '配偶姓名', 'spouse_name', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('16', 'spouse_regis_residence_addr', '配偶户籍地址', 'spouse_regis_residence_addr', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('17', 'spouse_residence_addr', '配偶住宅地址', 'spouse_residence_addr', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('18', 'contact_person_phone', '联系人手机号码', 'contact_person_phone', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('19', 'contact_person_id_no', '联系人身份证号码', 'contact_person_id_no', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('20', 'contact_person_name', '联系人姓名', 'contact_person_name', 'front_submit', null);
INSERT INTO `personal_credit_submit_info` VALUES ('21', '', null, null, null, '0');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(16) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(300) NOT NULL COMMENT '产品名称',
  `desc` varchar(96) NOT NULL COMMENT '描述',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_author` varchar(96) NOT NULL,
  `modify_author` varchar(96) DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '状态，1：启用，2：禁用',
  `executing_state` varchar(96) DEFAULT NULL,
  `details_hit_rule` varchar(96) DEFAULT NULL,
  `number_manual_audits` varchar(96) DEFAULT NULL,
  `According_unique_number` varchar(96) DEFAULT NULL,
  `passed_qty` varchar(96) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL COMMENT '状态，1：启用，0：禁用',
  `ruleset_count` varchar(100) DEFAULT NULL COMMENT '包含规则集数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8 COMMENT='规则集表';

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('75', 'test1', ' 产品-测试', '2018-01-31 18:50:27', '2018-01-31 18:50:27', '小张', '小明', '0', null, null, null, null, null, '0', '2');
INSERT INTO `product` VALUES ('77', '助学贷_02', '助学贷_02', '2018-01-25 17:23:14', '2018-01-25 17:23:14', '小张', null, '0', null, null, null, null, null, '0', '0');
INSERT INTO `product` VALUES ('79', '助学贷_03', 'test', '2018-01-25 17:31:25', '2018-01-25 17:31:25', '小张', null, '0', null, null, null, null, null, '0', '0');

-- ----------------------------
-- Table structure for `rule`
-- ----------------------------
DROP TABLE IF EXISTS `rule`;
CREATE TABLE `rule` (
  `id` bigint(16) NOT NULL AUTO_INCREMENT COMMENT '规则ID，通常为6位数字',
  `interface_id` bigint(11) DEFAULT NULL COMMENT '所在接口 id',
  `rule_name` varchar(300) NOT NULL COMMENT '规则命名，辅助理解',
  `match_mode` tinyint(4) NOT NULL COMMENT '匹配模式，布尔函数或者加权计算\r\n1: 布尔运算\r\n2：加权运算',
  `approve_action` varchar(50) NOT NULL COMMENT '规则判定结果，通过/拒绝/返回权重',
  `submit_field` varchar(200) NOT NULL DEFAULT '' COMMENT '提交字段，证件ID或者手机号码等',
  `calculate_field` varchar(200) DEFAULT NULL COMMENT '计算字段，例如接口返回的一级目录字段',
  `cal_depend_field` varchar(200) DEFAULT NULL COMMENT '计算依赖字段，记录用于计算的变量数值',
  `cal_depend_field_type` int(11) DEFAULT NULL COMMENT '计算依赖字段的类型；NULL/0：数字，1：数组 count，2：数组内元素 sum，3：数组内某个元素的某个属性',
  `cal_type_2_cal_field` varchar(50) DEFAULT NULL COMMENT '计算依赖字段类型为2时的计算字段',
  `cal_type_3_cal_field` varchar(50) DEFAULT NULL COMMENT '计算依赖字段类型为3时的计算字段',
  `cal_type_3_cal_dep_field` varchar(50) DEFAULT '' COMMENT '计算依赖字段类型为3时的计算依赖字段',
  `calculate_type` varchar(4) DEFAULT NULL COMMENT '权重计算前的阈值筛选，例如大于阈值，小于等于阈值等',
  `threshold` int(11) DEFAULT NULL COMMENT '阈值',
  `formula` varchar(96) DEFAULT NULL COMMENT '权重计算公式',
  `base_weight` int(8) DEFAULT NULL COMMENT '基本权重',
  `cfit_weight` float DEFAULT NULL COMMENT '权重系数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_author` varchar(96) DEFAULT NULL,
  `modify_author` varchar(96) DEFAULT NULL,
  `enabled` smallint(6) DEFAULT NULL COMMENT '规则生效/禁用状态',
  `rule_id` bigint(15) DEFAULT NULL,
  `desc` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='规则表';

-- ----------------------------
-- Records of rule
-- ----------------------------
INSERT INTO `rule` VALUES ('19', '3', '新增规则-1-sum', '0', '通过', '手机号', 'json.result_desc.ANTIFRAUD.risk_items[].risk_name=身份证对应人存在助学贷款欠费历史', 'json.risk_detail.black_list_details', '2', 'hitUuid', null, null, null, null, null, null, null, '2018-01-25 15:34:01', '2018-01-25 15:34:01', '小张', null, '1', '19', '命中匹配字段');
INSERT INTO `rule` VALUES ('21', '3', '身份证命中法院执行名单', '1', '拒绝', '身份证', 'json.result_desc.ANTIFRAUD.risk_items[].risk_name=身份证命中法院执行名单', 'json.risk_detail.black_list_details[0].caseCode', '3', 'value', '(2010)榆执字第0121233号', 'hitUuid', '>', '12', null, '12', '3', '2018-01-31 10:36:46', '2018-01-31 10:36:46', null, null, '0', '21', '命中匹配字段');

-- ----------------------------
-- Table structure for `rule_group`
-- ----------------------------
DROP TABLE IF EXISTS `rule_group`;
CREATE TABLE `rule_group` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` bigint(11) DEFAULT NULL COMMENT '规则集 id',
  `rule_id` bigint(11) DEFAULT NULL COMMENT '规则 id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` tinyint(4) NOT NULL COMMENT '是否启用',
  `rule_level` tinyint(4) DEFAULT NULL COMMENT '优先级（规则对应接口的优先级）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=434 DEFAULT CHARSET=utf8 COMMENT='规则 - 规则集映射表';

-- ----------------------------
-- Records of rule_group
-- ----------------------------
INSERT INTO `rule_group` VALUES ('427', '84', '19', '2018-01-24 16:40:21', '2018-01-24 16:40:21', '0', null);
INSERT INTO `rule_group` VALUES ('433', '88', '19', '2018-01-31 18:50:07', '2018-01-31 18:50:07', '1', null);

-- ----------------------------
-- Table structure for `service_invoked_history`
-- ----------------------------
DROP TABLE IF EXISTS `service_invoked_history`;
CREATE TABLE `service_invoked_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `trans_id` varchar(50) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='自身服务被调用历史表';

-- ----------------------------
-- Records of service_invoked_history
-- ----------------------------

-- ----------------------------
-- Table structure for `z_personal_credit_info`
-- ----------------------------
DROP TABLE IF EXISTS `z_personal_credit_info`;
CREATE TABLE `z_personal_credit_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL COMMENT '姓名',
  `id_no` varchar(54) DEFAULT NULL COMMENT '身份证号码',
  `mobile_no` varchar(33) DEFAULT NULL COMMENT '手机号',
  `bank_cart_no` varchar(90) DEFAULT NULL COMMENT '银行卡号',
  `ip` varchar(45) DEFAULT NULL COMMENT 'IP地址',
  `regis_residence_addr` varchar(300) DEFAULT NULL COMMENT '户籍地址',
  `residence_addr` varchar(300) DEFAULT NULL COMMENT '住宅地址',
  `work_corp` varchar(300) DEFAULT NULL COMMENT '单位名称',
  `corp_phone` varchar(60) DEFAULT NULL COMMENT '单位电话',
  `email` varchar(150) DEFAULT NULL COMMENT '邮箱地址',
  `education` varchar(60) DEFAULT NULL COMMENT '学历',
  `device_no` varchar(150) DEFAULT NULL COMMENT '设备号',
  `spouse_phone_no` varchar(33) DEFAULT NULL COMMENT '配偶手机号码',
  `spouse_id_no` varchar(54) DEFAULT NULL COMMENT '配偶身份证号码',
  `spouse_name` varchar(150) DEFAULT NULL COMMENT '配偶姓名',
  `spouse_regis_residence_addr` varchar(300) DEFAULT NULL COMMENT '配偶户籍地址',
  `spouse_residence_addr` varchar(300) DEFAULT NULL COMMENT '配偶住宅地址',
  `contact_person_phone` varchar(33) DEFAULT NULL COMMENT '联系人手机号码',
  `contact_person_id_no` varchar(54) DEFAULT NULL COMMENT '联系人身份证号码',
  `contact_person_name` varchar(150) DEFAULT NULL COMMENT '联系人姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of z_personal_credit_info
-- ----------------------------
