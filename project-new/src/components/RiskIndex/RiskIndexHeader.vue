<template>
    <div id="RiskHeader">
        <ul class="chooseBtns">
            <li>
                <a href="javascript:;" @click="isCom='owner-loan'" :class="{active:isCom=='owner-loan'}">业主贷</a>
            </li>
            <li><a href="javascript:;" @click="isCom='staff-loan'" :class="{active:isCom=='staff-loan'}">员工贷</a></li>
        </ul>
        <component :is="isCom"></component>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import $ from 'jquery'
    import echarts from 'echarts';
    import OwnerLoan from './riskMiddle/OwnerLoan.vue'
    import StaffLoan from './riskMiddle/StaffLoan.vue'
    export default{
        name: 'RiskHeader',
        data(){
            return {
                btnName:["业主贷","员工贷"],
                isCom:'owner-loan'
            }
        },
        components:{
            'owner-loan':OwnerLoan,
            'staff-loan':StaffLoan
        },
        method:{
        },
        mounted(){
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #RiskHeader {
        position: relative;
        .w(100%);
        height:12vh;
        min-height:95px;
        ul.chooseBtns{
            margin-top:3px;
            .h(30px);
            .l-h(40px);
            background:#fff;
            li{
                float:left;
                .w(100px);
                .h(30px);
                .l-h(30px);
                text-align:center;
                a{
                    display:inline-block;
                    .w(100%);
                    .h(100%);
                    color:#fff;
                }
                &:nth-child(1),&:nth-child(2){
                    background:rgba(0,0,0,0.2);
                }
                .active{
                    background:#2ac7c3;
                }
            }
        }
        /* 业主贷样式 */
        .items-wrap{
	    	height:calc(~"100% - 30px");
	    	.items{
	    		position: relative;
				width: 100%;
                padding-top: calc(~"12vh/2 - 55px");
				.item{
					display: flex;
					flex-direction: unset;
					float: left;
					width: 25%;
					overflow: hidden;
					text-align:center;
					.item-icon{
						position:relative;
						min-width: 50px;
						width: 40%;
						color: #5ea6ec;
						font-weight: 600;
						.icon{
							position: absolute;
							top: 0;
							right: 10px;
							bottom: 0;
							margin: auto;
							font-size: 1.4rem;
						}
					}
					.item-content{
						position: relative;
						.item-title{
							padding-top: 3px;
							color: #a8a8a8;
							text-align: center;
						}
						.item-num{
							font-size: 1.5rem;
						}
					}
					&:nth-of-type(3){
						.icon{
							font-size: 1.6rem;
						}
					}
				}
	    	}
	    }
    }
</style>