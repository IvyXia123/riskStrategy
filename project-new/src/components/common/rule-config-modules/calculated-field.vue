<template>
	<div id="calculated-field">
		<div class="config-wrap" @click="close($event)">{{aaa}}
			<section class="config-main">
				<h6 class="config-title config-bar">{{pageData.title}}</h6>
				<ul class="config-bar toolbar">
					<li class="bar-item" :class="{'select':filterText == '只显示中文'}">只显示中文</li>
					<li class="bar-item" :class="{'select':filterText == '不显示中文'}">不显示中文</li>
				</ul>
				<div class="config-content">
					<ol class="items">
						<li class="item select-itme" v-for="row in pageData.values"
							v-if="row.val !=null && row.val.length > 1" v-show="regular.test(row.val)" 
							@click="selectField(row)" :class="{'select-item':(row.key+row.val) == select_field}">
							{{row.val}}
						</li>
					</ol>
					<p class="config-closing">没有数据了...</p>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	export default{
		name:'calculated-field',
		data(){
			return{
				regular:/^/,
				filterText:false,
				select_field:false,
				aaa:[],
				pageData:{
					title:"计算字段列表",
					values:[]
				}
			}
		},
		mounted(){
		},
		methods:{
			selectField(msg){
				this.select_field = msg.key+msg.val;
				this.$emit('upup',{
					'key':msg.key,
					'val':msg.val,
					'state':false
				});
			},
			close(e){
				let $className = e.target.className;
				if($className.indexOf('bar-item') > -1){ // 过滤字段
					this.fieldFilter(e.target.innerText);
					return;
				}
				if($className.indexOf('config-wrap') > -1){
					this.$emit('upup',{
						'key':'',
						'val':'',
						'state':false
					});
					return;
				}
			},
			fieldFilter(msg){
				// 取消过滤
				if(this.filterText && this.filterText == msg){
					this.regular = /^/;
					this.filterText = false;
				}else{// 指定过滤字段
					this.filterText = msg;
					if(msg == '只显示中文'){
						this.regular = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
					}else{
						this.regular = /^[a-zA-Z0-9]+$/;
					}
				}
			}
		}
	}
</script>

<style lang="less" type="text/less" scoped>
	#calculated-field{
		.config-main{
			width: 100%;
			height: 100%;
			border-radius: 0;
			.config-bar.toolbar{
				position: absolute;
				top: 4px;
				right: 5px;
				.bar-item{
					display: inline-block;
					margin-right: 5px;
					padding:0 10px;
					height: 90%;
					line-height: 27px;
					color:#666;
					font-size: 13px;
					border-radius: 5px;
					background-color: #F3F3f3;
					cursor: pointer;
					transition: all .2s;
					&:hover{
						color: #fff;
						background-color: #009688;
					}
					&.select{
						color: #fff;
						background-color: #009688;
					}
				}
			}
		}
	}
</style>