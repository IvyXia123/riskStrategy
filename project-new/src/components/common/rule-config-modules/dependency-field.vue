<template>
	<div id="dependency-field">
		<div class="config-wrap">
			<section class="config-main">
				<h6 class="config-title config-bar">{{pageData.title}}</h6>
				<div class="config-content" v-show="show">
					<ol v-for="item in pageData.values">
			            <my-tree :data="item" :text="select_text" @upup="toggle"></my-tree>
					</ol>
					<p class="config-closing">没有数据了...</p>
				</div>
				<div class="sub" v-show="sub_show" @click="sub">确定</div>
			</section>
		</div>
	</div>
</template>

<script>
	import MyTree from './Tree.vue'
	
	export default{
		name:'dependency-field',
		data(){
			return{
				show:false,
				sub_show:false,
				select_text:"",
				pageData:{
					title:"计算依赖字段列表",
					values:[],
					sub_field:{}// 提交字段
				}
			}
		},
		mounted(){
		},
		components: {
	        MyTree
	    },
		methods:{
			sub(){
				let count = 0;
				if(!this.pageData.sub_field.key || this.pageData.sub_field.val == '{' || this.pageData.sub_field.val == '}' ){
					count = -1;
				}else{
					// 选择数组自身，获取长度
					if(this.pageData.sub_field.val == '[' || this.pageData.sub_field.val == ']' ){
						count = 1;
					}
					// 选择的是数组
					if(this.pageData.sub_field.key.indexOf('[') > -1 && this.pageData.sub_field.key.indexOf(']') > -1 ){
						// 数组中的object 数据
						if(this.pageData.sub_field.key.split(']')[1].length > 0){
							count = 2;
							this.sub_show = false;
						}else{
							count = 1;
						}
					}
				}
				this.pageData.sub_field.count = count;
				this.$emit('upup',this.pageData.sub_field);
			},
			toggle(msg){
				this.sub_show = true;
				this.pageData.sub_field = JSON.parse(JSON.stringify(msg));
				this.select_text = msg.key+msg.val;
				this.$emit('upup','state');
			}
		}
	}
</script>
<style lang="less" type="text/less">
	#dependency-field{
		.config-main{
			width: 100%;
			height: 100%;
			border-radius: 0;
			padding-bottom:0;
			.config-content{
				height: calc(~"100% - 60px");
			}
			.items{
				margin-left: 0;
				padding-left: 15px;
				.item{
					list-style: none;
				}
			}
		}
	}
</style>