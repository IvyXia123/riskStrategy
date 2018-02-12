<template>
    <div id="risk">
        <risk-header></risk-header>
        <middle-charts></middle-charts>
    </div>
</template>

<script type="text/ecmascript-6">
    import riskHeader from './RiskIndex/RiskIndexHeader.vue'
    import middleCharts from './RiskIndex/MiddleCharts.vue'

    export default{
        name:'risk',
        data(){
            return{
                a:''
            }
        },
        mounted(){
            this.a=this.$route.params.routerName;
        },
        components:{
            'risk-header':riskHeader,
            'middle-charts':middleCharts
        }
    }
</script>

<style lang="less" type="text/less">
    #risk{
        width:100%;
        height:100%;
        background:#fff;
    }
</style>