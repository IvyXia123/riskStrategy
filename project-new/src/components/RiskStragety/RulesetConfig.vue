<template>
    <div id="ruleset" v-if="action">
        <div class="addRuleSetBtnBox">
        	<back v-if="pageData.state" :params="{name:pageData.state}"></back>
        	<add-button  v-if="!pageData.state" :params="{val:'新增规则集+',cRouter:'ruleset'}"></add-button>
            <router-link  v-if="pageData.state"  tag="a" class="addEntry-ruleset"
            	:to="{name:pageData.state == 'add-ruleset' ? 'details' : 'add',query:{cRouter:'product',pageName:pageData.state == 'add-ruleset' ? 'details' : 'add',action:'addCorrelation_group'}}" @click.native="addEntryRuleset()">
            	保存
            </router-link>
        </div>
        <div class="ruleSetsBox">
        	<section class="ruleSet-cardSet">
        			<div class="ruleSet-card" v-for="(row,index) in pageData.values">
        				<!-- 产品卡片 -->
	        			<ruleset-card v-on:associated-data="changeAssociatedData" 
	        				:params="{detailsPageName:'group',values:row,filter_associated:pageData.state}" 
	        				v-show="!$route.query.actionName?true:row.status == null">
	        			</ruleset-card>
        			</div>	
        	</section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default{
        name: 'ruleset',
        data(){
            return{
            	action: false,
            	responseStatus:false, // 响应状态
            	pageData:{ // 当前页面所有数据
            		state: false,// 当前页面行为状态（默认|详情|新增）
            		values: [],	// 所有规则集数据
            		rulesetDataToBeAdded:[]// 添加规则集时的暂存数据，点击"保存"时暂存数据会添加到指定的对象中
            	},
            }
        },
        mounted(){
        	this.ready();
        },
        watch:{
        	responseStatus(currentVal,oldVal){
        		if(currentVal.code == '1'){
        			this.pageData.values = currentVal.message;
        			// 由其他页面跳转进来添加规则集的，并且关联规则集长度 > 0
        			if(this.$route.query.actionName && this.pageData.rulesetDataToBeAdded.length > 0){
        				for(let i = 0;i < this.pageData.rulesetDataToBeAdded.length; i++){
        					// 删除当前产品中已存在的规则集
        					this.pageData.values.map((item,index) => {
        						if(this.pageData.rulesetDataToBeAdded[i].id == item.id){
        							this.pageData.values.splice(index,1);
        						}
	        				})
        				}
        			}
                    this.action = true;
				}
        	},
            $route(val){
        	    if(val.fullPath=='/riskStrategy/ruleSetConfig'){
                    this.pageData.state=false;
                }
            }
        },
        methods:{
        	ready(){
                this.detailData.allowedReturn = false; // 初始化详情页的全局数据状态
                // 有传参进来，说明是由其他页面跳转进来添加规则集的
                if(this.$route.query.actionName){
                	this.added = true;
                    this.pageData.state = this.$route.query.actionName;
                    // 暂存当前产品已存在的关联规则集数据
                    if(this.pageData.state == 'create'){// 创建页面跳转进来
                        this.pageData.rulesetDataToBeAdded = JSON.parse(JSON.stringify(this.createData.rawData.values));
                    }else{// 详情页面跳转进来
                        this.pageData.rulesetDataToBeAdded = JSON.parse(JSON.stringify(this.detailData.variableData.values));
                    }
                }
                this.sendRequest(this,'/ruleset/rulesetGoodsCatagory?select_rows={}','responseStatus'); // 全部规则集数据
            },
        	changeAssociatedData(emitVal){ // "增加"|"取消增加"规则集，点击之后的返回整条规则集参数。
        		if(emitVal.action == "add"){// 将"当前规则集参数"暂存
               		var row = JSON.parse(JSON.stringify(emitVal.val));
                    this.pageData.rulesetDataToBeAdded.push(row);
                }else{// 从暂存数据中删除"当前规则集参数"
               		for(var i = 0; i < this.pageData.rulesetDataToBeAdded.length; i++){
        				if(this.pageData.rulesetDataToBeAdded[i].id == emitVal.id){
        					this.pageData.rulesetDataToBeAdded.splice(i,1);
        					break;
        				}
        			}
        		}
        	},
        	addEntryRuleset(){// 提交
        		if(this.pageData.state == 'create'){
        			this.createData.action = 'back';
        			this.createData.rawData.values = JSON.parse(JSON.stringify(this.pageData.rulesetDataToBeAdded));
                }else{
        			this.detailData.variableData.values = JSON.parse(JSON.stringify(this.pageData.rulesetDataToBeAdded));
                    this.removeSameVal(this.resetsId.useInProducts);
                    for(var i=0;i<this.detailData.variableData.values.length;i++){
                        if(!this.isRepetitionVal(this.resetsId.useInProducts,this.detailData.variableData.values[i].id)){
                            this.resetsId.useInProducts.push(this.detailData.variableData.values[i].id);
						}
                    }
                }
        		this.pageData.rulesetDataToBeAdded = [];
        	}
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    #ruleset{
        position:relative;
        width:100%;
        height:100%;
        border-radius:5px;
        background:#fff;
		.noRulesets{
			padding-top:30%;
			width:100%;
        	height:30px;
        	line-height:30px;
			font-size:18px;
			text-align:center;
			a{
				color:#00bcd4;
				font-weight:bold;
			}
		}
        .addRuleSetBtnBox{
        	position: absolute;
        	z-index: 2;
        	top: 0;
        	left: 0;
        	width:100%;
            background-color: white;
			padding:25px ;
			padding-bottom: 15px;
            .addRulesBtn{
            	width:100px;
            	height: 30px;
            	line-height: 30px;
                text-align:center;
                border-radius:3px;
                background:#eeeff0;
                cursor:pointer;
				&:hover{
					color: #00bcd4;
					box-shadow: 0 0 8px 0px #bdbaba;
				}
            }
            .addEntry-ruleset{
            	position: absolute;
            	top: 9px;
            	right: 10px;
            	width: 80px;
            	height: 30px;
            	line-height: 30px;
            	text-align: center;
            	color: #fff;
            	border-radius: 5px;
				background-color: #009688;
            }
        }
        .ruleSetsBox{
            width:100%;
        	height:100%;
            overflow: hidden;
            .ruleSet-cardSet{
        		padding: 70px 20px 20px;
            	width: calc(~"100% + 17px");
            	height:100%;
            	overflow-y: auto;
            	.ruleSet-card{
            		position: relative;
            		display: inline-block;
            	}
            }
        }
    }
</style>