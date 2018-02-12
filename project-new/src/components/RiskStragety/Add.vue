<template>
    <div id="add" v-if="action">
        <!--================================form=====================================-->
        <div class="formInfo" :style="{height:addData.pageName == 'product'?'180px':'220px'}">
            <back :params="{name:'add'}"></back>
            <div class="reset icon-hover" style="right:10px;" @click="resetData()">
                <svg-icon class="icons" id="icon-zhongzhi1"></svg-icon>
            </div>
            <h3>{{addData.pageName == 'product'? '新增产品' : '新增规则集'}}</h3>
            <div class="formBox">
                <div class="name" :style="{height:addData.pageName == 'product'?'40%':'30%'}">
                    <label>{{addData.pageName == 'product'? '产品名称：' : '规则集名称：'}}</label>
                    <input type="text" value="" v-model="addData.rawData.name" :placeholder="addData.pageName == 'product' ?'请输入产品名称' : '请输入规则集名称'"/>
                </div>
                <div class="isCloud" v-if="addData.pageName != 'product'" :style="{height:'30%'}">
                    <label>规则集类型：</label>
                    <select v-model="selectVal">
                        <option value="0" selected="selected">风控</option>
                        <option value="1">核额</option>
                    </select>
                </div>
                <div class="desc" :style="{height:addData.pageName == 'product'?'60%':'40%'}">
                    <label>{{addData.pageName == 'product'? '产品描述：' : '规则集描述：'}}</label>
                    <textarea rows="3" cols="100%" v-model="addData.rawData.desc" :placeholder="addData.pageName == 'product' ?'请输入产品描述' : '请输入规则集描述'"></textarea>
                </div>
            </div>
        </div>
        <!--================================规则集／规则=====================================-->
        <div class="detailsBox">
            <div class="details">
                <router-link tag="div" class="add icon-hover" style="right:10px;" :to="{name:(addData.pageName == 'product'? 'ruleSetConfig' : 'ruleConfig'), query:{actionName:'create',type:addData.pageName != 'product'?Number(selectVal):false}}">
                    <svg-icon class="icons" id="icon-add"></svg-icon>
                </router-link>
                <h4>{{addData.pageName == 'product'? '当前产品所包含规则集列表' : '当前规则集所包含规则列表'}}</h4>
                <div class="tableBox" ref="tableBox">
                    <!-----------------------------card------------------------------>
                    <div v-if="addData.pageName == 'product'" class="ruleSet-card" v-for="(row,index) in addData.rawData.values">
                    	<ruleset-card :params="{detailsPageName:'group',values:row,'click':'no'}"></ruleset-card>
                        <div class="card-toolber">
                            <p class="card-tool card-tool-remove" @click="deleteData(row.id)">
                                <svg-icon id="icon-shanchu"></svg-icon>
                            </p>
                        </div>
                    </div>
                    <!-----------------------------table------------------------------>
                    <table v-if="addData.pageName == 'ruleset' && addData.rawData.values.length > 0" class="ruleTable" border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <th>设置</th>
                            <th v-for="item in tableHeader">{{item}}</th>
                        </tr>
                        <tr v-for="(row, index) in addData.rawData.values" >
                            <td class="delete" :style="{color:'red'}" @click="deleteData(row.id)">删除</td>
                            <td v-for="(item,key) in tableHeader">{{ row[key] }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="save">
            <input type="button" value="提交" @click="saveData"/>
        </div>
        <div class="alertBox" v-show="giveData.showAlert">
            <alert-box @confirmVal="confirmVal"></alert-box>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import AlertBox from './../common/Alert.vue'
    export default {
        name: 'add',
        data() {
            return {
            	addData		: {}, // 新增页面的所有数据
            	action 		: false, // view启动指令
            	responseStatus:false,
                tableHeader	: {
                    "rule_id": "ID",
                    "rule_name": "规则编号",
                    "desc": "规则内容",
                    "approve_action": "执行动作",
                    "threshold": "参数"
                },
                giveData:{},
                selectVal:this.createData.action=='back'?this.createData.rawData.isCloud:0  // 规则集类型
            }
        },
        components:{
            AlertBox
        },
        watch:{
        	responseStatus(curVal,oldVal){
        		if (curVal.code == '1') {
                   	this.giveData.showAlert = true;
                   	this.giveData.showCancel = false;
                   	this.giveData.alertTxt = '创建成功';
                   	this.resetData();
                   	if(curVal.name){
                   		if(curVal.name == 'createRulest'){
                   			this.$router.push("/riskStrategy/ruleSetConfig");
                   		}else{
                   			this.$router.push("/riskStrategy/products");
                   		}
                   	}
                   	this.alertParams.showAlert = false;
                   	this.alertParams.alertTxt = false;
               } else {
                   this.giveData.alertTxt = '哎呀！ 创建失败了....';
               }
        	},
            selectVal:function(newVal,oldVal){
        	    if(oldVal!=newVal){
                    this.createData.rawData.isCloud=Number(newVal);
                }
            }
        },
        mounted() {
        	this.ready();
            this.addData.pageName = this.$route.query.cRouter;
            if(this.$route.query.cRouter=='product'){
                this.getName(this.allData.productsData,this.allData.productsNameArr,'product_name');
            }else if(this.$route.query.cRouter=='ruleset'){
                this.getName(this.allData.rulesetsData,this.allData.rulesetsNameArr,'group_name');
            }
        },
        methods: {
        	ready(){
                this.giveData = this.alertParams;
                this.addData  = this.createData;
                this.giveData.showAlert = false;   //是否显示弹框
				this.giveData.alertTxt = false;    //弹框内容
			    this.giveData.isConfirm = false;   //是否点击弹框的确认按钮
			    this.giveData.showCancel = false;   //是否显示弹框的取消按钮
			    this.giveData.isSave = false;
        		if(this.addData.action == 'back'){ // 添加完规则集或规则之后再次回到当前页面
					for(var i = 0; i < this.addData.rawData.values.length; i++){
						this.addData.rawData.correlation_id[i] = this.addData.rawData.values[i].id;// 关联id
					}
                    this.addData.rawData.correlation_id.sort((a,b)=>{return a-b});
					this.addData.action == 'back';
        		}else{
        			if(this.$route.query.action == 'copy'){// copy跳转过来的？  深度复制！

        				if(this.detailData.rawData.name == false){
        					this.addData.pageName = this.$route.query.cRouter;
        				}else{
        					this.addData.pageName 		= JSON.parse(JSON.stringify(this.detailData.detailName));
                            this.addData.rawData 		= JSON.parse(JSON.stringify(this.detailData.rawData));
                            this.addData.rawData.values=[];
                            this.addData.rawData.id		= null;
                            this.selectVal		= this.$route.query.type;
                            this.addData.rawData.isCloud		= this.selectVal;

		        			this.addData.rawData.name 	= "复制  "+JSON.parse(JSON.stringify(this.addData.rawData.name));
        				}
	        		}else{ // 直接点击进来的
	        			this.addData.rawData.values.length = 0;
	        			this.addData.rawData.values.isCloud = this.selectVal;
	        			this.resetData();
	        			this.addData.pageName = this.$route.query.cRouter;

                    }
        		}
        		this.action = true;
        	},
        	resetData(){
				this.createData.action			= 'create';
				this.createData.rawData.id		= false;
				this.createData.rawData.name	= '';
				this.createData.rawData.state	= false;
				this.createData.rawData.isCloud	= 0;
				this.selectVal                  = 0;
				this.createData.rawData.desc	= '';
				this.createData.rawData.pass	= false;
				this.createData.rawData.reject	= false;
				this.createData.rawData.audit	= false;
				this.createData.rawData.hit		= false;
				this.createData.rawData.correlation_id	= [];
				this.createData.rawData.values			= [];
        	},
        	deleteData(id){
                for(var i = 0; i < this.addData.rawData.values.length; i++){
    				if(this.addData.rawData.values[i].id == id){
    					this.addData.rawData.values.splice(i,1);
    					break;
    				}
    			}
                this.removeByValue(this.resetsId.useInProducts,id);    //删除产品中使用的规则集
				this.removeByValue(this.addData.rawData.correlation_id,id);
        	},
        	saveData() { // 提交 创建
                var saveName = (this.addData.pageName == 'product' ? '产品' : '规则集');
                this.giveData.showAlert = true;  //点击保存弹框出现
                this.giveData.isSave = true;
                if (this.addData.rawData.name.length < 1) {
                    this.giveData.alertTxt = saveName + '名称不能为空！';
                    this.alertParams.isSave=false;
                }else if(this.$route.query.cRouter=='product'&&this.isRepetitionVal(this.allData.productsNameArr,this.addData.rawData.name)){
                    this.giveData.alertTxt='产品名称已存在，请重新编辑';
                    this.alertParams.isSave=false;
                }else if(this.$route.query.cRouter=='ruleset'&&this.isRepetitionVal(this.allData.rulesetsNameArr,this.addData.rawData.name)){
                    this.giveData.alertTxt='规则集名称已存在，请重新编辑';
                    this.alertParams.isSave=false;
                }else if (this.addData.rawData.desc.length < 1) {
                    this.giveData.alertTxt = saveName + '描述不能为空！';
                    this.alertParams.isSave=false;
                }else{
                    this.giveData.showCancel = true;
                    this.giveData.alertTxt = '确认要新增'+saveName+'?';
                }
            },
            confirmVal(val){
                this.giveData.isConfirm=val;
                this.saveDataFn(this.giveData.isConfirm);
            },
            saveDataFn(isConfirm){// 提交创建数据
                if (isConfirm) {
                    let associatedData = [];// 添加的关联数据（规则集|规则）
                    let createData = {
                        "desc": this.addData.rawData.desc,
                        "create_author": "小张",
                        "associatedData": associatedData
                    }
                    if(this.addData.pageName == 'product'){
                        if(this.addData.rawData.values.length > 0){
                            this.addData.rawData.values.map((item) => {
                                associatedData.push({
                                    "id": item.id,
                                    "state": 0 // 默认为“未使用”状态
                                });
                            })
                        }
                    	if(associatedData.length == 1){return alert('请至少添加 "两条规则集"， 或者不添加');}
                    	createData["product_name"] = this.addData.rawData.name;
                    	createData["enabled"] = "0";
                    	createData["status"] = "0";
                        createData['isCloud'] = this.selectVal;
                        createData['ruleset_count'] = associatedData.length;
                    	this.sendRequest(this,'/product/productGoodsCatagory?insert_rows='+JSON.stringify(createData),'responseStatus','createProduct');
                    }else{
                        if(this.addData.rawData.values.length > 0){
                            this.addData.rawData.values.map((item) => {
                                associatedData.push({
                                    "id": item.id,
                                    "enabled": 0 // 默认为“未使用”状态
                                });
                            })
                        }
                    	createData["group_name"] = this.addData.rawData.name;
                        createData['rule_count'] = associatedData.length;
                        createData['isCloud'] = this.selectVal;
                        this.sendRequest(this,'/ruleset/rulesetGoodsCatagory?insert_rows='+JSON.stringify(createData),'responseStatus','createRulest');
                    }
                }
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    #add {
        width:100%;
        height:100%;
        .formInfo {
            position: relative;
            padding:10px 15px;
            width:100%;
            height:180px;
            border-radius: 5px;
            background: #fff;
            h3 {
                width:100%;
            	height:40px;
				line-height:30px;
                text-align: center;
                border-bottom: 1px solid #eee;
            }
            .formBox {
            	margin: 0 auto;
                padding-top: 10px;
            	width:60%;
            	height:calc(~"100% - 40px");
                .name,
                .isCloud,
                .desc {
                	padding: 5px 10px;
                    width:100%;
                    overflow: hidden;
                    label {
                    	display: flex;
                    	float: left;
                        justify-content: left;
                        align-items: center;
                    	width:30%;
            			height:100%;
                    }
                    input,
                    select,
                    textarea {
                    	padding:5px;
                    	width:70%;
            			height:100%;
                        float: left;
                        outline: none;
                        border: 1px solid #eee;
                    }
                }
                .name {
                	height:40%;
                }
                .desc {
                	height: 60%;
                }
            }
        }
        .detailsBox {
        	width: 100%;
            height:calc(~"100% - 280px");
            padding-top: 15px;
            .details {
                position: relative;
                padding:0 15px 15px ;
                width: 100%;
        		height: 100%;
                border-radius: 5px;
                background: #fff;
                .add {
                    .icon{
                        padding:6px;
                    }
                }
                h4 {
                	width: 100%;
        			height: 40px;
        			line-height: 40px;
                }
                .tableBox {
                	width: 100%;
        			height: calc(~"100% - 40px");
                    overflow: auto;
                    .ruleTable {
                    	width: 100%;
                        border-color: #f2f2f2;
                        text-align: center;
                        .ruleTable tr {
                        	width: 100%;
                            height: 40px !important;
                        }
                        th,
                        td {
                            padding: 5px 10px;
                            font-size: 12px;
                            color: #333;
                        }
                        th {
                            color: #000;
                            font-size: 13px;
                        }
                        .delete {
                            cursor: pointer;
                        }
                    }
                    .ruleSet-card {
                        display: inline-block;
                    }
                    .card-toolber {
                        position: relative;
                        top: -15px;
                        padding: 0 14px;
                        width: 100%;
                        height: 25px;
                        .card-tool {
                            float: left;
                            width: 100%;
                            height: 100%;
                            line-height: 25px;
                            text-align: center;
                            font-size: 13px;
                            background-color: #fff;
                            cursor: pointer;
                            &.card-tool-remove {
                                color: #ccc;
                                border-bottom-left-radius: 5px;
                                border-bottom-right-radius: 5px;
                                box-shadow: 0px 3px 10px 3px #ddd;
                                -moz-box-shadow: 0px 3px 10px 3px #ddd;
                                -webkit-box-shadow: 0px 3px 10px 3px #ddd;
                            }
                            &.card-tool-remove:hover {
                                color: red;
                            }
                            .icon {
                                width: 1.3em;
                                height: 1.3em;
                                vertical-align: sub;
                            }
                        }
                    }
                }
                .ruleSet-card {
                    display: inline-block;
                }
            }
        }
        .save {
        	padding-top: 15px;
        	width: 100%;
        	height: 60px;
            input {
            	width: 100%;
        		height: 100%;
        		font-size: 16px;
                color: #000;
                outline: none;
                cursor: pointer;
                border-radius: 5px;
                text-align: center;
                border: 1px solid #eee;
                background: #fff;
                &:hover {
                    color: #fff;
                    background: #2ab2ca;
                }
            }
        }
        .alertBox{
            position:absolute;
            top:0;
            left:0;
            z-index:999;
            width: 100%;
        	height: 100%;
            background:rgba(0,0,0,0.5);
        }
    }
</style>