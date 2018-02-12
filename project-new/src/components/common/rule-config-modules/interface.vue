<template>
	<div id="interface">
		<div class="config-wrap" @click="close($event)">
			<section class="config-main">
				<span class="config-close">X</span>
				<h6 class="config-title">{{interfaceData.title}}</h6>
				<div class="config-content">
					<ol class="items">
						<li class="item" v-for="row in interfaceData.values" :data-id="row.id">{{row.name}}</li>
					</ol>
					<p class="config-closing">没有数据了...</p>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	export default{
		name:'interface',
		data(){
			return{
				action:false,
				responseStatus:false,
				interfaceData:{
					title:"接口列表",
					values:[]
				}
			}
		},
		watch:{
			responseStatus(curVal,oldVal){
				if(curVal.code == 1){
//					console.log(curVal.message)
					this.interfaceData.values = curVal.message; 
				}
			}
		},
		mounted(){
			this.ready();
		},
		methods:{
			ready(){
				this.sendRequest(this,'/interface/interfaceGoodsCatagory?select_rows={}','responseStatus');
			},
			close(e){
				let $className = e.target.className; 
				if($className.indexOf('config-wrap') > -1 || $className.indexOf('config-close') > -1){
					this.$emit('upup',{'id':'-1' ,'state':false});
				}else if($className.indexOf('item') > -1){
					for(let i = 0;i < this.interfaceData.values.length; i++){
						if(this.interfaceData.values[i].id == e.target.getAttribute('data-id')){
							this.$emit('upup',{'id':e.target.getAttribute('data-id'),'interface_json':this.interfaceData.values[i].interface_json,'state':false});
							break;
						}
					}
				}
			}
		}
	}
</script>

<style lang="less" type="text/less">
	#interface{
		.config-main{
			width: 45%;
			height: 50%;
			.config-title{
				padding-bottom: 8px;
				line-height: 25px;
				font-size: 16px;
				border-bottom: 1px solid #ccc;
			}
		}
	}
</style>