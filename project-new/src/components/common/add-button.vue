<template>
	<div id="add-button" v-if="ready()">
		<section class="add-button" v-if="params.route">{{params.val}}</section>
		<router-link v-else tag="a" class="add-button" :to="{name:'add' ,query:{'cRouter':params.cRouter,actionName:'create'}}">{{params.val}}</router-link>
	</div>
</template>

<script>
	export default{
		name:"add-button",
		props:['params'],
		mounted(){
			// 格式化新增页面的状态
			// 初始化时所有dom元素都被vue实例接管，事件会失效
			this.createData.action = 'create';
		},
		methods:{
			ready(){
                return (this.params.val ? true : false);
			}
		}
	}
</script>

<style lang="less" type="text/less" >
	@import url("./../../less/common");
	#add-button{
		.add-button{
			position: absolute;
		    top: 15px;
		    left: 15px;
		    padding: 4px 8px;
		    width:100px;
			font-size: 14px;
			text-align:center; 
			border-radius:3px; 
			background:@lightGray; 
			cursor:pointer;
			&:hover{
				color: #00bcd4;
				box-shadow: 0 0 8px 0px #bdbaba;
			}
		}
	}
</style>