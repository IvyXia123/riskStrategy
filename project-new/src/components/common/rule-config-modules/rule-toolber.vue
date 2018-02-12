<template>
	<div id="rule-toolber">
		<ul class="rule-toolber">
			<!-- 详情和添加页跳转过来 -->
			<li class="rule-toolber-item" v-if="params.name == 'add-ruleset' || params.name == 'create'">
				<div class="rule-tool rule-tool-add prohibit" v-if="params.values.added == false">添加</div><!--不可添加状态-->
				<template v-else>
					<!--<div>添加</div>-->
					<div class="rule-tool rule-tool-add" v-show="!addRuleToggle" @click="rule_action('添加')">添加</div>
					<!--<div>取消添加</div>-->
					<div class="rule-tool rule-tool-cancelAdd" v-show="addRuleToggle"@click="rule_action('取消')">取消添加</div>
				</template>
			</li>
			<li class="rule-toolber-item" v-else>
				<div class="rule-tool rule-tool-add"   @click="rule_action('列表')">添加</div>
				<div class="rule-tool rule-tool-change"@click="rule_action('修改')" :class="[!params.values.removeBtn? 'prohibit' :'']">修改</div>
				<div class="rule-tool rule-tool-remove"@click="rule_action('删除')" :class="[!params.values.removeBtn? 'prohibit' :'']">删除</div>
			</li>
			
		</ul>
	</div>
</template>

<script>
	export default{
		name:"rule-toolber",
		props:['params'],
		data(){
			return{
				addRuleToggle:false	// 点击添加后未跳转页面可以“取消”已添加规则
			}
		},
		methods:{
			rule_action(name){
				var obj = {'action':'','id':this.params.values.id,'val':this.params.values};
				switch(name){
					case '列表':  // 直接由规则导航进入的添加按钮走打开规则集列表的逻辑
						obj.action = 'list';
						break;
					case '添加': // 由其他页面进入的添加按钮直接添加
						this.addRuleToggle = true;
                        obj.action = 'add';
						break;
					case '取消': // 由其他页面进入存在“取消添加”按钮
						obj.action = 'cancel';
						this.addRuleToggle = false; 
						break;
					case '修改':
						obj.action = 'modify';
						break;
					case '删除':
						obj.action = 'remove';
						break;
				}
				this.$emit('rule-action',obj);
			}
		}
	}
</script>

<style lang="less" type="text/less">
	#rule-toolber{
		display:inline-block;
		.rule-toolber{
			display:inline-block;
			.rule-toolber-item{
				position: relative;
				overflow: hidden;
				width: 138px;
				font-size: 0;
				color: #333;
				.rule-tool{
					display: inline-block;
					padding:0 2px;
					width: 35px;
					font-size: 12px;
					border-radius: 3px;
					cursor: pointer;
					transition:border .2s;
					border: 1px solid transparent;
					&.rule-tool-add{
						color: green;
					}
					&.rule-tool-change{
						color: goldenrod;
						margin: 0 5px;
					}
					&.rule-tool-remove{
						color: red;
					}
					&.rule-tool-cancelAdd{
						width: 60px;
						color: red;
					}
					&.prohibit{
						color: #ccc;
						border-color:transparent !important;
						cursor: no-drop;
					}
					&:hover{
						border-color:#ccc;
					}
				}
			}
		}
	}
</style>