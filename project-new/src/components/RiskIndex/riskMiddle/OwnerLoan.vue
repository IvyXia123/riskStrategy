<template>
    <div id="owner-loan" class="items-wrap">
    	<ul class="items">
			<li class="item" v-for="row in ownerLoanArr">
				<div class="item-icon iconBox">
	                <svg-icon class="icons" :id="row.iconId"></svg-icon>
	            </div>
				<section class="item-content detailInfo">
					<h6 class="item-title title">{{row.title}}</h6>
					<span class="item-num num">{{row.num}}</span>
				</section>
			</li>
		</ul>
    </div>
</template>

<script>
    export default {
        name: "owner-loan",
        data(){
            return{
                ownerLoanArr:[
                    {title:'申请总额',iconId:'icon-tubiaolunkuo_huaban',num:996,increaseRatio:'+0.02%'},
                    {title:'放款余额',iconId:'icon-yue',num:396,increaseRatio:'+0.02%'},
                    {title:'逾期总额',iconId:'icon-yuqi',num:79,increaseRatio:'+0.02%'},
                    {title:'逾期率',iconId:'icon-yuqidelicai',num:'13.16%',increaseRatio:'+0.02%'}
                ]
            }
        }
    }
</script>
