<template>
	<div id="rules-details">
		<div class="config-wrap" @click="close($event)">
			<section class="config-main">
				<span class="config-close">X</span>
				<h6 class="config-title">{{pageData.title}}</h6>
				<div class="config-content details-content">
					<ol class="items">
						<li class="item" v-for="row in pageData.values" :data-id="row.id">
							<div class="item-name item-text">{{row.name}}</div>
							<div class="item-val item-text">{{row.val}}</div>
						</li>
					</ol>
				</div>
				<h6 class="config-title correlation-title">{{pageData.correlation.title}}</h6>
				<div class="config-content tab-main" v-if="pageData.correlation.values.length > 0">
					<div class="tab-head tab">
						<table border="" cellspacing="0" cellpadding="0">
							<colgroup>
								<col v-for="val in Object.getOwnPropertyNames(pageData.correlation.values[0]).length-2"/>
							</colgroup>
							<tr>
								<th>规则集名称</th>
								<th>规则集状态</th>
								<th>当前规则状态</th>
							</tr>
						</table>
					</div>
					<div class="tab-body tab">
						<table border="" cellspacing="0" cellpadding="0">
							<colgroup>
								<col v-for="val in Object.getOwnPropertyNames(pageData.correlation.values[0]).length-2"/>
							</colgroup>
							<tr v-for="row in pageData.correlation.values">
								<td>{{row.group_name}}</td>
								<td :class="row.ruleset_state.indexOf('执行中') > -1 ?'execution':(row.ruleset_state == '并行测试'?'test':'non-execution')">{{row.ruleset_state}}</td>
								<td :class="row.current_rules_state.indexOf('执行中') > -1 ?'execution':'non-execution'">{{row.current_rules_state}}</td>
							</tr>
						</table>
					</div>
					<p class="config-closing">没有数据了...</p>
				</div>
				<p class="config-closing correlationList-closing" v-else>当前规则未被使用</p>
			</section>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		name:'rules-details',
		data(){
			return{
				pageData:{
					title:'规则详情',
					values:[
						{'name':'规则ID','field':'id','val':''},
						{'name':'规则名称','field':'rule_name','val':''},
						{'name':'创建人','field':'create_author','val':''},
						{'name':'最后修改人','field':'modify_author','val':''},
						{'name':'规则描述','field':'desc','val':''},
						{'name':'命中动作','field':'approve_action','val':''},
						{'name':'提交字段','field':'submit_field','val':''},
						{'name':'计算字段','field':'calculate_field','val':''},
						{'name':'计算依赖字段类型','field':'cal_depend_field_type','val':''},
						{'name':'计算依赖字段','field':'cal_depend_field','val':''},
						{'name':'计算模式','field':'match_mode','val':''},
						{'name':'匹配值','field':'match_value','val':''},
						{'name':'加/减','field':'equation','val':''},
						{'name':'额度','field':'limit','val':''},
						{'name':'比较','field':'calculate_type','val':''},
						{'name':'阈值','field':'threshold','val':''},
						{'name':'权重值 1','field':'base_weight','val':''},
						{'name':'权重值 2','field':'cfit_weight','val':''}
					],
					correlation:{
						title:'包含当前规则的规则集',
						values:[]
					}
				}
			}
		},
		mounted(){
		},
		methods:{
			close(e){// 点击关闭，页面回到初始化
				let $className = e.target.className; 
				if($className.indexOf('config-wrap') > -1 || $className.indexOf('config-close') > -1){
					this.pageData.correlation.values.length = 0;
					for(let i = 0; i < this.pageData.values.length; i++){
						this.pageData.values[i].val = '';
					}
					this.$parent.rules_details_show = false;
				}
			}
		}
	}
</script>

<style type="text/less" lang="less">
#rules-details{
	.config-main{
		height: 80%;
		max-width:600px;
		.config-title{
			padding-bottom: 10px;
			font-size: 16px;
			text-align: center;
			border-bottom: 1px solid #ccc;
		}
		.correlation-title{
			padding: 7px 0 4px;
		    font-size: 15px;
		    text-align: left;
		    border: none;
		    border-top: 1px solid #ccc;
		    color: #00BCD4;
		}
		.correlationList-closing{
			padding-top: 40px;
			font-size: 16px;
		}
		.config-content{
			width: calc(~"100% + 22px");
			height: calc(~"50% - 35px");
			overflow-y: auto;
			&.details-content{
				padding-top:15px;
				max-height: 315px;
				.item{
					display:flex;
					padding-top:0;
					.item-text{
						padding-top: 4px;
						padding-bottom: 4px;			
						&.item-name{
							padding-right: 10px;
							width: 26%;
							min-width: 130px;
							min-width: 100px;
							text-align: right;
							border-right: 1px solid #ccc;
						}
						&.item-val{
							width: 72%;
							padding-left: 10px;
							overflow: hidden;
							text-indent: 0;
							word-break: break-all;
						}
					}
					
				}
			}
			&.tab-main{
			    display: flex;
			    flex-direction: column;
			    padding-top: 5px;
			    width: 100%;
			    overflow-y: auto;
			    overflow-x: hidden;
		    }
		}
	}
}
</style>