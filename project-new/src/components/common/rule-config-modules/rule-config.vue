<template>
	<div id="rule-config">
		<div class="config-wrap" @click="close($event)">
			<section class="config-main" style="padding: 0;">
				<span class="config-close">X</span>
				<aside class="main-left">
					<calculated-field ref="calculated" @upup="calculatedField"></calculated-field>
				</aside>
				<div class="main-right main-right-top">
					<depend-field ref="DependField" @upup="dependField"></depend-field>
				</div>
				<div class="main-right main-right-footer">
					<depend-filter ref="DependFilter" @upup="dependFilter"></depend-filter>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import format_interface_data 		from "./../../../js/format-interface-data" // 格式化 接口计算字段列表
	import format_dependency_field_data from "./../../../js/format-dependency-field-data" // 格式化 接口计算依赖字段列表
	import CalculatedField	from "./calculated-field.vue" // 接口计算字段列表
	import DependField	from "./dependency-field.vue" // 接口计算依赖字段列表
	import DependFilter	from "./dependency-filter.vue" // 接口计算依赖字段 --> 字段筛选
	
	export default{
		name:'interface',
		data(){
			return{
				action:false,
				'click_depend':false,
				responseStatus:false,
				initData:{},
				constData:{
					calculate_v: '',
					calculate_k:'',
					depend_v: '',
					depend_k: '',
					depend_type: '',
					type_1_v: '',
					type_1_k: '',
					type_2_v: '',
					type_2_k: '',
					type_3_v: '',
					type_3_k: ''
				}
			}
		},
		components:{
			"calculated-field":CalculatedField,
			"depend-field":DependField,
			"depend-filter":DependFilter
		},
		watch:{
			initData(curVal,oldVal){
				if(curVal){
					this.$refs.calculated.pageData.values = format_interface_data(curVal);
				}
			},
			click_depend(curVal,oldVal){
				if(curVal){
					this.$refs.DependFilter.show = false;
				}
			}
		},
		mounted(){
		},
		methods:{
			close(e){
				let $className = e.target.className;
				if($className.indexOf('config-wrap') > -1 || $className.indexOf('config-close') > -1){
					this.$emit('upup',false);
					return;
				}
			},
			formatStyle(msg){
				if(!msg){// 初始化
					this.$refs.DependFilter.show = false;
					this.constData = {
						calculate_v: '',
						calculate_k:'',
						depend_v: '',
						depend_k: '',
						depend_type: '',
						type_1_v: '',
						type_1_k: '',
						type_2_v: '',
						type_2_k: '',
						type_3_v: '',
						type_3_k: ''
					};
				}
				// 格式化选中状态
				this.$refs.calculated.select_field = this.constData.calculate_k+this.constData.calculate_v;
				this.$refs.DependField.select_text 	    = this.constData.depend_k+this.constData.depend_v;
				// 计算依赖筛选字段 显示状态(默认值)
				if(this.constData.depend_type == 2){
					this.$refs.DependFilter.show = true;
					this.$refs.DependFilter.enable = true;
				}
				// 计算依赖筛选字段 显示状态(选中值)
				if(this.constData.depend_type == 3){
					this.$refs.DependFilter.show = true;
					this.$refs.DependFilter.enable = false;
					this.$refs.DependFilter.dependencyData.single.selectFields.name = this.constData.type_3_v.split('=>')[0];
					this.$refs.DependFilter.dependencyData.single.selectFields.val  = this.constData.type_3_v.split('=>')[1];
				}
			},
			submitData(){
				this.$emit('upup',this.constData);
			},
			calculatedField(msg){// 对应接口的 计算字段
				msg.val = msg.val.replace(/^(\s|\u00A0)+/,'');  // 	去除空格
			    for(var i=msg.val.length-1; i>=0; i--){   
			        if(/\S/.test(msg.val.charAt(i))){   
			            msg.val = msg.val.substring(0, i+1);   
			            break;   
			        }   
			    }   
				if(msg.val.length > 0){// 获取对应接口的数据
					this.constData.calculate_v = msg.val;
					this.constData.calculate_k = msg.key;
					// 获取选中的计算字段的数据片段，并进行格式化
					let str = msg.key.replace('json','this.initData');
						str = str.substring(0,str.lastIndexOf('.'));
					// 将格式化好的数据渲染成dom结构，之后显示出来
					this.$refs.DependField.show = true;
					this.$refs.DependField.sub_show = true;
					this.$refs.DependField.select_text="";
					this.$refs.DependField.pageData.sub_field= {};
					this.$refs.DependField.pageData.htmlText = '';
					this.$refs.DependField.pageData.values = format_dependency_field_data(JSON.parse(JSON.stringify(eval(str))));
				}
			},
			dependField(msg){// 对应接口的 计算依赖字段
				this.$refs.DependFilter.show = false;
				if(msg == 'state')return; // 点击其他依赖字段，并不提交
				// 记录当前选择的 依赖字段
				if(msg.count > -1){
					this.constData.depend_type = msg.count;
					this.constData.depend_v = msg.val;
					this.constData.depend_k = msg.key;
				}
				if(msg.count == -1){// 未选择依赖字段
					if(confirm('"计算依赖字段" 没有选择！ 仍然要提交吗？')){
						this.submitData();
					}
				}else
				if(msg.count > 0){// 选择的"计算依赖字段" 为数组
					let	str = this.constData.calculate_k.replace('json','this.initData');
					let arr = eval(str.substring(0,str.lastIndexOf('.'))+(msg['key'].split('json')[1]).split('[')[0]);// 获取选中的数组包含的数据
					if(msg.count == 1){// 选择的"计算依赖字段" 为数组中的非object格式值，或者数组自身
						this.constData.type_1_v = 'list='+arr.length;
						this.constData.type_1_k = msg.key;
					}
					if(msg.count == 2){// 选择的"计算依赖字段" 为数组中的object 格式数据
						this.$refs.DependFilter.show = true;
						this.$refs.DependFilter.str = msg['key'];
						this.$refs.DependFilter.formatData(arr);
						return;
					}
				}
				// 提交
				this.submitData();
			},
			dependFilter(msg){//对应接口的 计算依赖字段 --> 字段筛选
				if(msg.val){// 获取对应接口的数据
					this.constData.depend_type = msg.type;
					if(msg.type == 3){
						this.constData.type_3_v = msg.val.name.split('=')[0]+'=>'+msg.val.val.split('=')[0];
						this.constData.type_3_k = msg.val.name.split('=')[1];
					}else{
						this.constData.type_2_v = msg.val.split('=')[0];
						this.constData.type_2_k = msg.val.split('=')[1];
					}
					this.submitData();
				}
			}
		}
	}
</script>

<style lang="less" type="text/less">
	#rule-config{
		.config-main{
			overflow:hidden;
			.main-left{
				position: relative;
				overflow: hidden;
				float: left;
				width: calc(~"50%");
				height: 100%;
				border-right: 1px solid #ccc;
			}
			.main-right-top{
				position: relative;
				overflow: hidden;
				float: right;
				width: 50%;
				height: calc(~"100% - 240px");
			}
			.main-right-footer{
				position: relative;
				overflow: hidden;
				clear: right;
				float: left;
				width: 50%;
				height: 240px;
			}
			.config-title{
				padding-bottom: 8px;
				line-height: 25px;
				border-bottom: 1px solid #ccc;
			}
			.config-close,
			.config-sub{
				z-index: 100000;
			}
		}
	}
</style>