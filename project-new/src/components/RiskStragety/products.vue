<template>
    <div id="products" v-if="action">
        <div class="addRuleSetBtnBox">
        	<add-button :params="{val:'新增产品+',cRouter:'product'}"></add-button>
        </div>
        <div class="ruleSetsBox">
        	<section class="ruleSet-cardSet">
        		<div class="ruleSet-card" v-for="(row,index) in productsAllData">
        			<!-- 产品卡片 -->
	        		<ruleset-card :params="{detailsPageName:'product',values:row}"></ruleset-card>
	        	</div>
        	</section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'products',
        data(){
            return{
            	action:false,
                productsAllData:{},
                groupProductArr:[]
            }
        },
        watch:{
        	productsAllData(currentVal,oldval){ 
				if(currentVal.code == '1'){// 请求成功,计数器+1
					this.productsAllData = currentVal.message;
					this.allData.productsData=currentVal.message;
                    this.action = true;
				}
			},
            groupProductArr(currentVal,oldVal){
                if(currentVal.code==1){
                    this.groupProductArr=currentVal.message;
                    for(var i=0;i<this.groupProductArr.length;i++){   //获取规则集_产品关联表中所有规则集Id
                        this.resetsId.useInProducts.push(this.groupProductArr[i].group_id);
                    }
                    this.removeSameVal(this.resetsId.useInProducts);
                }
            },
        },
        mounted(){
			this.ready();
            this.sendRequest(this,'/product/productGoodsCatagory?select_rows={"product_id":"group_product"}','groupProductArr');   //group_product关联表中的所有数据
        },
        methods:{
        	ready(){
        		this.sendRequest(this,'/product/productGoodsCatagory?select_rows={}','productsAllData'); // 全部产品数据
        	}
        }
    }
</script>

<style lang="less" type="text/less">
	@lightGray:#eeeff0;
    #products{
        position:relative;
        width: 100%;
    	height: 100%;
    	border-radius:5px;
        background:#fff;
        overflow:hidden;
        .addRuleSetBtnBox{
        	position: absolute;
        	z-index: 2;
        	top: 0;
        	left: 0;
        	padding:25px ;
			padding-bottom: 15px;
        	width: 100%;
            background-color: white;
            .addRulesBtn{
            	width: 100px;
    			height: 30px;
				line-height: 30px;
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
        .ruleSetsBox{
            width: 100%;
    		height: 100%;
            overflow: hidden;
            .ruleSet-cardSet{
        		padding: 70px 20px 20px;
            	width: calc(~"100% + 17px");
            	height:100%;
            	overflow-y: auto;
            	.ruleSet-card{
            		display: inline-block;
            	}
            }
        }
    }
</style>