<template>
    <div id="personalPdf">
        <h2 v-text="creditData.configName"></h2>
        <section class="basicSection">
            <div class="basicInfo">基本查询信息</div>
            <div class="classBox">
                <!--姓名-->
                <table class="basicTable1">
                    <tr v-for="item in basicTable1">
                        <th v-text="item.name?item.name:'-'"></th>
                        <td v-text="item.info?item.info:'-'"></td>
                    </tr>

                </table>
                <!--教育信息-->
                <table class="basicTable2">
                    <tr>
                        <th>教育信息</th>
                        <th>婚姻状况</th>
                        <th>子女数量</th>
                        <th>房产归属</th>
                        <th>申请日期</th>
                    </tr>
                    <tr v-for="item in tableList">
                        <td v-text="item.eduExperienceType?item.eduExperienceType:'-'"></td>
                        <td v-text="item.marriage?item.marriage:'-'"></td>
                        <td v-text="item.childrenCount?item.childrenCount:'-'"></td>
                        <td v-text="item.houseObligee?item.houseObligee:'-'"></td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
        </section>
        <section class="companySection">
            <div class="companyInfo">征信公司信息</div>
            <!--百融-->
            <div class="classBox">
                <div class="title">百融</div>
                <!--百融评分-->
                <table class="baiRongRating">
                    <caption>百融评分</caption>
                    <tr>
                        <th>百融是否通过</th>
                        <th>百融信用评分</th>
                        <th>卡片使用状态评分</th>
                        <th>卡片套现评分</th>
                    </tr>
                    <tr v-for="item in tableList">
                        <td v-text="item.br_issuccess?item.br_issuccess:'-'"></td>
                        <td v-text="item.br_creditpoint?item.br_creditpoint:'-'"></td>
                        <td v-text="item.br_cst_score?item.br_cst_score:'-'"></td>
                        <td v-text="item.br_cot_score?item.br_cot_score:'-'"></td>
                    </tr>
                </table>
                <!--多投申请-->
                <table class="moreApply-idCard" ref="moreApply-idCard">
                    <caption>多投申请</caption>
                    <tr v-for="(item,index) in moreApply_idCard_data">
                        <th v-for=" data in item.th" v-text="data?data:'-'"></th>
                        <td v-for=" data in item.td" v-text="data?data:'-'"></td>
                    </tr>

                </table>
                <table class="moreApply-mobile" ref="moreApply-mobile">
                    <tr v-for="item in moreApply_mobile_data">
                        <th v-for="data in item.th" v-text="data?data:'-'"></th>
                        <td v-for="data in item.td" v-text="data?data:'-'"></td>
                    </tr>
                </table>

                <!--近6个月申请信息-->
                <table class="moreApply-sixApply">
                    <tr>
                        <th>近6个月申请信息</th>
                        <th>申请月份数</th>
                        <th>每月平均申请数</th>
                        <th>月最大申请次数</th>
                        <th>月最小申请次数</th>
                        <th>申请最大间隔天数</th>
                        <th>申请最小间隔天数</th>
                    </tr>
                    <tr v-for="item in moreApply_sixApply">
                        <th v-text="item.name?item.name:'-'"></th>
                        <td v-for="data in item.arrList" v-text="data.num?data.num:'-'"></td>
                    </tr>

                </table>

                <!--近6个月消费次数-->
                <table class="moreApply-sixConsume" border="0">
                    <tr v-for="item in moreApply_sixConsume">
                        <th v-text="item.name" class="tHeader"></th>
                        <td v-text="item.num?item.num:'-'" class="tTd"></td>
                    </tr>
                </table>
            </div>

            <!--卫诚-->
            <div class="classBox">
                <div class="title">卫诚</div>
                <table class="weiCheng">
                    <tr>
                        <th>查询项</th>
                        <th>返回结果</th>
                        <th>是否通过</th>
                    </tr>
                    <tr v-for="item in weiCheng">
                        <th v-text="item.name"></th>
                        <td v-for="data in item.arrList" v-text="data.num?data.num:'-'"></td>
                    </tr>
                </table>
            </div>

            <!--同盾-->
            <div class="classBox">
                <div class="title">同盾</div>
                <!--同盾规则返回结果-->
                <table class="tongDun-result">
                    <tr v-for="item in tongDun_result">
                        <th v-text="item.name?item.name:'-'" class="tHeader"></th>
                        <td v-text="item.result?item.result:'-'" class="tTd"></td>
                    </tr>
                </table>
                <!--命中规则-->
                <table class="tongDun-rule">
                    <tr>
                        <th>命中规则</th>
                        <th>匹配字段</th>
                        <th>预警等级</th>
                        <th>详细描述</th>
                    </tr>
                    <tr>
                        <td>授信审批规则</td>
                        <td>身份证</td>
                        <td>黄色规则</td>
                        <td>客户身份证对比数据库进行唯一性及正确性校验</td>
                    </tr>
                </table>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import $ from 'jquery'

    export default{
        name: 'personalPdf',
        data(){
            return {
                creditData: {},
                tableList: [],
                basicTable1: [      /*基本信息查询：《姓名表》的数据*/
                    {name: '姓名'},
                    {name: '证件号'},
                    {name: '手机号'}
                ],
                moreApply_key:{   /*多投申请《身份证表》和《手机号表》的公共值*/
                    dayLeft:['7天', '15天', '30天', '90天', '距最早', '距最近'],
                    jigouType:['银行机构', '非银机构', '本机构']
                },
                moreApply_idCard_data: [    /*多投申请《身份证表》的私有值*/
                    {
                        'th':['身份证', '机构类型', '距申请日天数', '申请次数', '申请机构', '申请间隔天数', '申请持续天数'],
                        "td":[]
                    }
                ],
                moreApply_mobile_data: [    /*多投申请《手机号表》的私有值*/
                    {
                        'th':['手机号', '机构类型', '距申请日天数', '申请次数', '申请机构', '申请间隔天数', '申请持续天数'],
                        "td":[]
                    }
                ],
                moreApply_sixApply: [    /*多投申请《近6个月申请信息表》的数据*/
                    {name: '身份证', arrList: []},
                    {name: '手机号', arrList: []}
                ],
                moreApply_sixConsume: [     /*多投申请《近6个月消费次数表》的数据*/
                    {name: '近6个月消费次数', num: 0},
                    {name: '犯罪信息记录', num: 0}
                ],
                weiCheng: [      /*《卫诚表》的数据*/
                    {name: '黑名单', arrList: []},
                    {name: '逾期', arrList: []}
                ],
                tongDun_result: [     /*同盾《同盾规则返回结果表》的数据*/
                    {name: '同盾规则返回结果', result: ''}
                ]
            }
        },
        mounted(){
            var dayLeft=this.moreApply_key.dayLeft;
            var jigouType=this.moreApply_key.jigouType;
            var idCard_table=this.$refs['moreApply-idCard'];   //多投申请的身份证表
            var mobile_table=this.$refs['moreApply-mobile'];   //多投申请的手机号表

            axios.get("./src/json/aaa.json").then((res) => {
                this.creditData = res.data;
                let that = this;
                let tmp = {
                    /**
                     * 各表字段的暂存变量：
                     * 步骤：
                     *     1.将请求回来的字段值存放在暂存表里的数组里，
                     *     2.然后再把暂存变量里的值拼接到data数据中，
                     *     3.页面渲染data里面拼接好的数据
                     */
                    basicTable1: [],
                    moreApply_sixApply: [],
                    moreApply_sixConsume: [],
                    weiCheng: [],
                    moreApply_idCard:[],
                    moreApply_mobile:[],
                    tongDun_result: ''
                };
                this.tableList = res.data.details.list.values;
                this.tableList.forEach(function (value, index) {
                    /**
                     * tmp.basicTable1:
                     * 基本信息查询《姓名表》字段值：
                     */
                    tmp.basicTable1.push(value.member_name, value.certificate_number, value.mobilePhone);

                    /**
                     * tmp.moreApply_idCard:
                     * 多投申请《身份证表》的字段值：
                     */
                    tmp.moreApply_idCard.push(
                        [value.br_als_d7_id_bank_allnum,value.br_als_d7_id_bank_orgnum,null,null],
                        [value.br_als_d15_id_bank_allnum,value.br_als_d15_id_bank_orgnum,null,null],
                        [value.br_als_m1_id_bank_allnum,value.br_als_m1_id_bank_orgnum,null,null],
                        [value.br_als_m3_id_bank_allnum,value.br_als_m3_id_bank_orgnum,null,null],
                        [null,null,value.br_als_fst_id_bank_inteday,null],
                        [value.br_als_lst_id_bank_consnum,null,value.br_als_lst_id_bank_inteday,value.br_als_lst_id_bank_csinteday ],
                        [value.br_als_d7_id_nbank_allnum,value.br_als_d7_id_nbank_orgnum,null,null],
                        [value.br_als_d15_id_nbank_allnum,value.br_als_d15_id_nbank_orgnum,null,null],
                        [value.br_als_m1_id_nbank_allnum,value.br_als_m1_id_nbank_orgnum,null,null],
                        [value.br_als_m3_id_nbank_allnum,value.br_als_m3_id_nbank_orgnum,null,null],
                        [null,null,value.br_als_fst_id_nbank_inteday,null],
                        [value.br_als_lst_id_nbank_consnum,null,value.br_als_lst_id_nbank_inteday,value.br_als_lst_id_nbank_csinteday ],
                        [value.br_als_d7_id_bank_selfnum,null,null,null],
                        [value.br_als_d15_id_nbank_selfnum,null,null,null],
                        [value.br_als_m1_id_nbank_selfnum,null,null,null],
                        [value.br_als_m3_id_nbank_selfnum,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null],
                    );

                    /**
                     * tmp.moreApply_mobile:
                     * 多投申请《手机号表》的字段值：
                     */
                    tmp.moreApply_mobile.push(
                        [value.br_als_d7_cell_bank_allnum,value.br_als_d7_cell_bank_orgnum,null,null],
                        [value.br_als_d15_cell_bank_allnum,value.br_als_d15_cell_bank_orgnum,null,null],
                        [value.br_als_m1_cell_bank_allnum,value.br_als_m1_cell_bank_orgnum,null,null],
                        [value.br_als_m3_cell_bank_allnum,value.br_als_m3_cell_bank_orgnum,null,null],
                        [null,value.br_als_fst_cell_bank_inteday,null,null],
                        [value.br_als_lst_cell_bank_consnum,null,value.br_als_lst_cell_bank_inteday,value.br_als_lst_cell_bank_csinteday ],
                        [value.br_als_d7_cell_nbank_allnum,value.br_als_d7_cell_nbank_orgnum,null,null],
                        [value.br_als_d15_cell_nbank_allnum,value.br_als_d15_cell_nbank_orgnum,null,null],
                        [value.br_als_m1_cell_nbank_allnum,value.br_als_m1_cell_nbank_orgnum,null,null],
                        [value.br_als_m3_cell_nbank_allnum,value.br_als_m3_cell_nbank_orgnum,null,null],
                        [null,null,value.br_als_fst_cell_nbank_inteday,null],
                        [value.br_als_lst_cell_nbank_consnum,null,value.br_als_lst_cell_nbank_inteday,value.br_als_lst_cell_nbank_csinteday],
                        [value.br_als_d7_cell_nbank_selfnum,null,null,null],
                        [value.br_als_d15_cell_nbank_selfnum,null,null,null],
                        [value.br_als_m1_cell_nbank_selfnum,null,null,null],
                        [value.br_als_m3_cell_nbank_selfnum,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null]
                    );

                    /**
                     * tmp.moreApply_sixApply:
                     * 多投申请《近6个月申请信息表》的字段值：
                     */
                    /**
                     * 《身份证行》
                     */
                    tmp.moreApply_sixApply.push([value.br_als_m6_id_tot_mons, value.br_als_m6_id_avg_monnum, value.br_als_m6_id_max_monnum,
                        value.br_als_m6_id_min_monnum, value.br_als_m6_id_max_inteday, value.br_als_m6_id_min_inteday]);

                    /**
                     * 《手机号行》
                     */
                    tmp.moreApply_sixApply.push([value.br_als_m6_cell_tot_mons, value.br_als_m6_cell_avg_monnum, value.br_als_m6_cell_max_monnum, value.br_als_m6_cell_min_monnum,
                        value.br_als_m6_cell_max_inteday, value.br_als_m6_cell_min_inteday]);

                    /**
                     * tmp.moreApply_sixConsume:
                     * 多投申请《近6个月消费次数表》的字段值：
                     */
                    tmp.moreApply_sixConsume.push(value.br_rfm_6_var2, value.br_crimeinfo_STATUS);


                    /**
                     * tmp.weiCheng:
                     * 《卫诚表》的字段值：
                     */
                    /**
                     * 《黑名单行》
                     */
                    tmp.weiCheng.push([value.wc_blacklist_issuccess, value.wc_blacklist_result]);
                    /**
                     * 《逾期行》
                     */
                    tmp.weiCheng.push([value.wc_overduelist_issuccess, value.wc_overlist_result]);


                    /**
                     * tmp.tongDun_result:
                     * 同盾《同盾规则返回结果表》的字段值：
                     */
                    tmp.tongDun_result = value.td_rule;
                });


                /**
                 * basicTable1:
                 * 拼接基本查询信息《姓名表》的数据
                 */
                tmp.basicTable1.forEach(function (value, index) {
                    that.basicTable1[index].info = value;
                });

                /**
                 * moreApply_idCard_data:
                 * 拼接多投申请《身份证表》的数据
                 */
                tmp.moreApply_idCard.forEach(function(value,index){
                    that.moreApply_idCard_data.push({
                        "th":[],
                        "td":value
                    })
                });
                dealData(this.moreApply_idCard_data,idCard_table);   /*《身份证表》数据拼接好后调用合并函数*/

                /**
                 * moreApply_mobile_data:
                 * 拼接多投申请《手机号表》的数据
                 */
                tmp.moreApply_mobile.forEach(function(value,index){
                    that.moreApply_mobile_data.push({
                        "th":[],
                        "td":value
                    })
                });
                dealData(this.moreApply_mobile_data,mobile_table);  /*《手机号表》数据拼接好后调用合并函数*/

                /**
                 * moreApply_sixApply:
                 * 拼接多投申请《近6个月申请信息表》的数据
                 */
                this.moreApply_sixApply.forEach(function (value1, index1) {
                    tmp.moreApply_sixApply[index1].forEach(function (value, index) {
                        value1.arrList.push({num: value})
                    })
                });

                /**
                 * moreApply-sixConsume:
                 * 拼接多投申请《近6个月消费次数表》的数据
                 */
                tmp.moreApply_sixConsume.forEach(function (value, index) {
                    that.moreApply_sixConsume[index].num = value;
                });

                /**
                 * weiCheng:
                 * 拼接《卫诚表》的数据
                 */
                this.weiCheng.forEach(function (value1, index1) {
                    tmp.weiCheng[index1].forEach(function (value, index) {
                        value1.arrList.push({num: value});
                    });
                });

                /**
                 * tongDun_result:
                 * 拼接同盾《同盾规则返回结果表》的数据
                 */
                this.tongDun_result.forEach(function (value, index) {
                    value.result = tmp.tongDun_result;
                });
            });


            /**
             *多投申请《身份证表》和《手机号表》的合并函数封装
             */
            function dealData(moreApply_data,table){
                moreApply_data.forEach(function(value,index){
                    /**
                     * 当index为0时为第一行th，不合并
                     */
                    if(index==0){
                        return;
                    }
                    /**
                     * 当index为1~6之间时插入并合并银行机构
                     */
                    if(index>0&&index<=dayLeft.length){
                        if(index==1){
                            //添加银行机构
                            value.th.push(jigouType[Math.floor((index-1)/dayLeft.length)]);

                            //合并银行机构
                            setTimeout(function(){
                                $(table).find('tr').eq(index).find('th:first').attr('rowspan',dayLeft.length);
                            },10)
                        }

                        //添加距申请日天数
                        value.th.push(dayLeft[index-1]);
                    }

                    /**
                     * 当index为7~12之间时插入并合并非银机构
                     */
                    if(index>dayLeft.length&&index<=dayLeft.length*2){
                        if(index==dayLeft.length+1){
                            //添加非银机构
                            value.th.push(jigouType[Math.floor((index-1)/dayLeft.length)]);

                            //合并非银机构
                            setTimeout(function(){
                                $(table).find('tr').eq(index).find('th:first').attr('rowspan',dayLeft.length);
                            },10)
                        }

                        //添加距申请日天数
                        value.th.push(dayLeft[(index-1)%dayLeft.length]);
                    }

                    /**
                     * 当index为13~18之间时插入并合并本机构
                     */
                    if(index>dayLeft.length*2&&index<=dayLeft.length*3){
                        if(index==dayLeft.length*2+1){
                            //添加本机构
                            value.th.push(jigouType[Math.floor((index-1)/dayLeft.length)]);

                            //合并本机构
                            setTimeout(function(){
                                $(table).find('tr').eq(index).find('th:first').attr('rowspan',dayLeft.length);
                            },10)
                        }

                        //添加距申请日天数
                        value.th.push(dayLeft[(index-1)%dayLeft.length]);
                    }
                });

                /**
                 * 合并身份证
                 */
                var idNum = moreApply_data.length;    //身份证要合并的行数
                $(table).find('tr').eq(0).find(':first').attr('rowspan', idNum);
            }
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #personalPdf {
        .w(96%);
        font-size: 14px;
        .p(12px 8px);
        margin: 20px auto;
        box-sizing: border-box;
        text-align: center;
        border: 1px solid #d9d9d9;
        background:#fff;
        h2 {
            font-size:30px;
            font-weight: 300;
            font-family: '微软雅黑';
            margin:10px 0;
        }
        .basicSection, .companySection {
            .basicInfo, .companyInfo {
                .w(120px);
                .h(35px);
                .l-h(35px);
                font-size: 16px;
                background: #5182bb;
                color: #fff;
                border-radius: 5px;
                margin-bottom: 20px;
            }
        }
        .basicSection, .companySection {
            .basicTable1, .basicTable2, .baiRongRating, .moreApply-idCard, .moreApply-mobile,
            .moreApply-sixApply, .moreApply-sixConsume, .weiCheng, .tongDun-result, .tongDun-rule {
                margin-bottom: 20px;
                border-collapse:collapse;
                tr {
                    /*display:flex;*/
                    .w(100%);
                    .h(25px);
                    .l-h(25px);
                    th, td {
                        .p(5px);
                        box-sizing: border-box;
                        border: 1px solid #d9d9d9;
                    }
                    th {
                        flex: 0 0 40%;
                        background: #f2f2f2;
                    }
                    td {
                        /*flex:1;*/
                    }
                }
            }
            .moreApply-mobile,.moreApply-sixApply,.moreApply-sixConsume,.weiCheng,.tongDun-result,.tongDun-rule{
                .h(20px);
                .l-h(20px);
                tr,td{
                    .l-h(20px);
                }
            }
            .basicTable2, .baiRongRating, .moreApply-idCard, .moreApply-mobile, .moreApply-sixApply,
            .moreApply-sixConsume, .weiCheng, .tongDun-result, .tongDun-rule {
                tr {
                    th {
                        /*flex:1;*/
                    }
                }
            }
            .basicTable1 {
                .w(50%);
                /*border:1px solid #d9d9d9;*/
            }
            .basicTable2 {
                .w(80%);
            }
            .baiRongRating {
                .w(70%);
            }
            .moreApply-idCard, .moreApply-mobile, .moreApply-sixApply, .weiCheng, .tongDun-rule {
                .w(100%);
            }
            .moreApply-sixConsume, .tongDun-result {
                .w(30%);
                tr {
                    display: flex !important;
                    th, td {
                        flex: 1 !important;
                    }
                }
            }
            .moreApply-sixConsume,.tongDun-result {
                border-collapse:collapse;
                tr{
                    .h(31px);
                    .tHeader,.tTd {
                        display: inline-block;
                        .w(215px);
                        .h(100%);
                        align-items:center;
                        text-align: center;
                    }
                }
            }
            .baiRongRating, .moreApply-idCard, .moreApply-mobile {
                caption {
                    margin-bottom: 3px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500;
                }
            }
            .classBox {
                padding-left: 10px;
                .title {
                    .w(100%);
                    .h(30px);
                    .l-h(30px);
                    font-size: 18px;
                    margin-bottom: 20px;
                    background: #5182bb;
                    color: #fff;
                }
            }
        }
    }
</style>