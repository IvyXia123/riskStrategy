<template>
	<div id="back" v-if="ready()">
		<section class="back icon-hover" @click="back">
			<svg-icon class="icons" id="icon-fanhui"></svg-icon>
		</section>
	</div>
</template>

<script>
	export default{
		name:"back",
		props:['params'],
		data(){
            return{
                ruleConfig:'',
                transfersIn :{}
			}
		},
		methods:{
			ready(){
                for(var i=0;i<this.createData.rawData.values.length;i++){
                    this.removeByValue(this.resetsId.useInProducts,this.createData.rawData.values[i].id);
				}
                return (this.params.name == 'add-ruleset' ||this.params.name == "create" ||this.params.name == 'product'||this.params.name == 'group'||this.params.name=='add' || this.params.name=='ruleConfig'? true : false);
			},
			back(){
				if(this.detailData.pagePointing == 'product_ruleset'){ // 从规则集详情返回到产品详情
					this.detailData.modify 		= this.detailData.historyData.modify;
	    			this.detailData.detailName 	= this.detailData.historyData.detailName;
	    			this.detailData.rawData 	= JSON.parse(JSON.stringify(this.detailData.historyData.rawData));
	    			this.detailData.variableData= JSON.parse(JSON.stringify(this.detailData.historyData.variableData));
	    			this.detailData.historyData = {};
					this.detailData.pagePointing	= 'product';
					return;
				}
                if(this.ruleConfig=='ruleConfig'&& this.params.name=='ruleConfig'){
                    this.params.modalShow=false;
				}else{
					if(this.params.name == "add-ruleset"){
						this.detailData.modify = 'back'; // 告诉详情页面我是通过返回按钮回去的
					}
					if(this.params.name == "create"){
						this.createData.action = 'back';
                    }
					if(this.params.name == 'product'){
                    	this.$router.push("/riskStrategy/products");
                    	this.params.modalShow=false;
                    }else if(this.params.name == 'ruleset'){
                    	this.$router.push("/riskStrategy/ruleSetConfig");
                    	this.params.modalShow=false;
                    }else{
                    	window.history.go(-1);
                    }
				}
                for(var i=0;i<this.createData.rawData.values.length;i++){
                    this.removeByValue(this.resetsId.useInProducts,this.createData.rawData.values[i].id);
                }
            }
		},
		mounted(){
            this.ruleConfig=this.$route.path.substring(this.$route.path.lastIndexOf("/")+1);
		}
	}
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
	#back{
		.back{
		    left:10px;
		    .icon{
		    	padding: 5px;
		    }
		}
	}
</style>