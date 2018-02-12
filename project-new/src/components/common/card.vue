<template>
	<!-- 产品卡片 -->
	<div class="card" id="card" v-if="ready()">
		<div class="card-tooltip">
			{{cardParams.values[cardParams.detailsPageName+'_name']}}
		</div>
		<section class="card-box">
			<router-link  tag="a" class="card-main" @click.native="routerToDetailsPage()" 
				:to="{name:cardParams.click == 'no' ? false:'details',params:{id:cardParams.click == 'no'? false : params.values.id, pageName:cardParams.click == 'no' ? false : this.$route.name,type:cardParams.click == 'no' ? false:(params.detailsPageName=='group'?cardParams.values.isCloud:false)}}" >
				<div class="card-choose" v-if="$route.name!='add'">
					<svg-icon class="icons" id="icon-2xuanzhong"
						:class="[card_state(cardParams.values.enabled || cardParams.values.status)]">
					</svg-icon>
				</div>
				<div class="cloudAmount" v-if="params.detailsPageName!='product'">
					<svg-icon class="icons" id="icon-afsshujufengkong" v-if="params.values.isCloud==0"></svg-icon>
					<svg-icon class="icons" id="icon-shenhe" v-if="params.values.isCloud==1" :class="{amountColor:true}"></svg-icon>
				</div>
				<h3 class="card-title" @mouseover="tooltip($event,'over')" @mouseout="tooltip($event)">
					{{cardParams.values[cardParams.detailsPageName+'_name']}}
				</h3>
				<ul class="card-items">
					<div v-for="(name,key) in basicInformation[cardParams.detailsPageName].values">
						<li class="card-item"><i>{{name}}&nbsp; : &nbsp;</i>{{cardParams.values[key]}}</li>
					</div>
					<li style="font-weight: 100;font-size:12px;">* 统计窗口30天</li>
				</ul>
			</router-link>
		</section>
		<template v-if="cardParams.filter_associated">
			<div class="add-ruleset" v-show="!correlation_id ? false : !isRepetitionVal(correlation_id,cardParams.values.id)">
			<!--<div class="add-ruleset">-->
				<span class="add-text" v-show="isAddRuleset" @click="emitRulesetParams({'action':'add','id':cardParams.values.id,val:cardParams.values})">
					添加
				</span>
				<span class="add-text cancellationAddRuleset" v-show="!isAddRuleset" @click="emitRulesetParams({'action':'remove','id':cardParams.values.id})">
					取消添加
				</span>
			</div>
		</template>
	</div>
</template>

<script>
	export default{
		name:"card",
		props:['params'],
	    data(){
	    	return{
	    		isAddRuleset	: true, 	// "增加" && "取消增加" 状态切换
	    		cardParams		: {}, 		// 当前卡片的所有参数
                currentIndex	: -1, 		// 当前点击卡片的id
                correlation_id	: [],		// 关联id去重
	    		basicInformation: {
	    			"product":{
	    				"values":{
	    					"passed_qty"				: "进件数量",
		                	"According_unique_number"	: "拒绝数量",
		                	"number_manual_audits"		: "人工拒绝",
		                	"details_hit_rule"			: "通过率    "
	    				}
	    			},
	    			"group":{
	    				"values":{
	    					"passed_qty"				: "进件数量",
		                	"According_unique_number"	: "拒绝数量",
		                	"details_hit_rule"			: "通过率"
	    				}
	    			}
	    		}
	    	}
	    },
	    methods:{
	    	ready() {
                if(this.params){
	        		/*  this.params 当前要显示的卡片包含的所有数据
	        		 * 	{	datailsPageName : 卡片要显示的状态（规则集 | 产品）
	        		 * 		values			： 当前卡片具体显示内容的所有值（一整条产品的数据 | 一整条规则集的数据）
	        		 *  	filter_associated: 当前卡片为“可增加”状态时增加到哪里（新建产品的关联规则集卡片  "add"| 产品详情的规则集卡片 "details"）
	        		 * 		action			: 当前卡片为可操作状态（删除 | 切换状态）*主要用在产品详情
	        		 * 		click			: 当前卡片是否为可点击状态，点击跳到详情页。*主要用在规则集首页
	        		 * }
	        		 * */
                    if(this.params.filter_associated){
	        			if(this.params.filter_associated == 'create'||this.params.filter_associated == 'copyCreate'){
	        				this.correlation_id = this.createData.rawData.correlation_id;
	        				// this.params.filter_associated=false;
	        			}else{
	        				this.correlation_id = this.detailData.variableData.correlation_id;
                            this.params.filter_associated = true;
	        			}

	        		}
                    return this.cardParams = this.params;

                }
	        },
	        tooltip(ev,action){
	        	if(ev.target.className == 'card-title'){
	        		ev.target.parentNode.parentNode.parentNode.childNodes[0].style.opacity = (action == 'over'? 1 : 0);
	        	}
	        },
	    	card_state(val){ // 当前卡片显示状态
	    		var className = '';
	    		switch(val){
	    			case 1	:// 启用
	    				className = 'icon-execution';
	    				break;
	    			case 2:  // 测试
	    				className = 'icon-test';
	    				break;
	    			default :// 禁用
	    				className = 'icon-non-execution';
	    		}
	    		return className;
	    	},
	    	routerToDetailsPage(){//点击当前卡片 跳转到详情页面，详情页面数据存储在 VUE实例中
	    		let pagePointing = 'product';
	    		// 根据当前卡片类型（ '产品:product' || '规则集:ruleset'）格式化不同状态。
	    		if(this.cardParams.detailsPageName == 'product'){
	    			this.detailData.rawData.state = (this.cardParams.values.enabled == '0' ? '未上架' : '上架中');
	    			this.detailData.rawData.ruleset_count = this.cardParams.values.ruleset_count;
	    		}else{
	    			pagePointing = 'ruleset';
	    			this.detailData.rawData.state = (this.cardParams.values.status == null?null : (this.cardParams.values.status == '0'?'未执行':(this.cardParams.values.status == 1?'执行中' : '并行测试')))
	    			this.detailData.rawData.rule_count = this.cardParams.values.rule_count;
	    			//this.detailData.rawData.state = (this.cardParams.values.status == '0' ? '未执行' : (this.cardParams.values.status == 1 ? '执行中' : '并行测试'))
	    		}
	    		// 如果当前点击的卡片是 产品详情中的"包含规则集"，可以有返回操作
	    		if(this.cardParams.allowedReturn){
	    			pagePointing = 'product_ruleset';
	    			this.detailData.historyData.modify 		= this.detailData.modify;
	    			this.detailData.historyData.detailName 	= this.detailData.detailName;
	    			this.detailData.historyData.rawData 	= JSON.parse(JSON.stringify(this.detailData.rawData));
	    			this.detailData.historyData.variableData= JSON.parse(JSON.stringify(this.detailData.variableData));
	    			this.detailData.rawData.rule_count = this.cardParams.values.rule_count;
	    			this.detailData.modify = false;// 改为不可修改状态
	    		}
	    		// 初始化详情页面数据（不包含规则集列表&规则列表）
	    		this.detailData.pagePointing	= pagePointing;// 详情页面数据指向 （'产品详情'|'规则集详情'|'产品关联规则集详情'）
    			this.detailData.detailName 		= this.cardParams.detailsPageName;
	    		this.detailData.rawData.id		= this.cardParams.values.id;
	    		this.detailData.rawData.name	= this.cardParams.values[this.cardParams.detailsPageName+'_name'];
	    		this.detailData.rawData.desc	= this.cardParams.values.desc;
	    		this.detailData.rawData.pass	= this.cardParams.values.passed_qty;
	    		this.detailData.rawData.reject	= this.cardParams.values.According_unique_number;
	    		this.detailData.rawData.audit	= this.cardParams.values.number_manual_audits;
	    		this.detailData.rawData.hit		= this.cardParams.values.details_hit_rule;
            },
         	emitRulesetParams(currentParams){// 点击当前卡片"增加"|"取消增加"
	 			this.isAddRuleset = !this.isAddRuleset;		// 切换显示状态 
	 			this.$emit('associated-data',currentParams);// 返回对应状态&id
	 		}
	    },
		mounted(){

        }
	}
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
	.card{
		.card-tooltip{
        	position: absolute;
        	z-index:1;
        	padding: 5px ;
        	font-size: 13px;
        	margin-top: -11px;
        	margin-left:15px;
        	border-radius: 3px;
        	background-color: rgba(0,0,0,.6);
        	color: #fff;
        	opacity:0;
        	transition:opacity 1s;  
			&:after{
	        	position: absolute;
	        	top: 27px;
	        	left: 5px;
	        	content: "";
	        	border: 8px solid transparent;
	        	border-top-color: rgba(0,0,0,.6);
	        }
        }
    	.card-box{
	    	width: 200px;
	    	height: 230px;
	    	padding:13px;
	    	background-color:transparent;
	    	
	    	.card-main{
				position:relative;
				display: flex;
	    		flex-flow: column;
		    	/*overflow: hidden;*/
		    	padding:10px;
		    	width:100%;
		    	height:100%;
		    	border-radius: 5px;
		    	background-color: #fff;
				border:1px solid #eee;
				box-shadow:2px 2px 10px 3px #ddd;
				-moz-box-shadow:2px 2px 10px 3px #ddd;
				-webkit-box-shadow:2px 2px 10px 3px #ddd;
				.card-choose,.delete{
					position:absolute;
					.w(20px);
					top:8px;
					right:8px;
					min-height:20px;
					border-radius:20px;
					.icons{
						.w(20px);
						.h(20px);
						&.icon-execution{
							color: #4caf50;
						}
						&.icon-test{
							color: #ffc107;
						}
						&.icon-non-execution{
							color: #f2f2f2;
						}
					}
					&.notSelect{
						background:#fff;
						box-shadow:0 5px 5px #ddd;
						-moz-box-shadow:0 5px 5px #ddd;
						-webkit-box-shadow:0 5px 5px #ddd;
					}
					&.selected{
						box-shadow:0 5px 5px #ddd;
						-moz-box-shadow:0 5px 5px #ddd;
						-webkit-box-shadow:0 5px 5px #ddd;
					}
				}
				.cloudAmount{
					position: absolute;
					.w(30px);
					.h(20px);
					text-align:center;
					.l-h(20px);
					.f-s(25px);
					top:8px;
					left:6px;
					border-radius:3px;
					color:#fff;
					.amountColor{
						color:red;
					};
				}
				.delete{
					right:30px;
					.icons{
						color:red;
					}
				}
		    	.card-title{
		            .w(100%);
		            min-height: 28px;
		            max-height: 28px;
					font-size:14px;
					font-weight:bold;
		            text-align:center;
		            color: #000;
		            overflow: hidden;
		            text-overflow: ellipsis;
		            white-space: nowrap;
		            border-bottom:1px solid #ddd;
					&.titleActive{
						color:#34b2c9;
					}
		        }
		        .card-items{
		        	display: block;
		        	overflow: hidden;
		        	padding: 5px 10px;
		        	width: 100%;
		        	height: 100%;
		        	background-color: white;
		        	.card-item{
		        		margin:10px 0;
		        		font-size: 12px;
		        		color: #666;
						word-break: break-all;
						word-wrap:break-word;
						&:last-child{
							.l-h(17px);
						}
		        		i{
		        			font-weight: 600;
		        			color: #333;
		        		}
		        	}
		        }
			}
    	}
    	.add-ruleset{
			position: absolute;
			top:13px;
			left:13px;
			width: calc(~"100% - 26px");
			height: calc(~"100% - 26px");
			z-index: 10;
			background-color: rgba(0,0,0,.5);
			border-radius: 6px;
			.add-text{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 50px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				font-size: 13px;
				color: #fff;
				border-radius: 50%;
				background-color: #3BA9A9;
				transform: scale(1);
				opacity: .7;
				transition:all .3s;
				cursor:pointer;
				&:hover{
					transform: scale(1.2);
					opacity: 1;
				}
				&.cancellationAddRuleset{
					font-size: 12px;
					line-height: 120%;
				    padding: 11px 8px 0;
					background-color: red;
				}
			}
		}
    }
</style>