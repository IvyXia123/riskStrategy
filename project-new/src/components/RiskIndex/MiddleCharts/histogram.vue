<template>
    <div id="histogram" class="chartBox">
        <div id="riskForecastChart" :style="{width:'100%',height:'100%'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    export default{
        name:'histogram',
        props:['params'],
        data(){
        	return{

        	}
        },
        methods:{
        	formatData(){// 格式化 series数据
        		let seriesData = []; // series 数据
            	for(var i = 0; i < this.params.series.length; i++){
        			seriesData.push({
                        name: this.params.series[i].name,
                        type: 'bar',
                        data: this.params.series[i].values,
                        itemStyle:{
                            normal:{
                                color:  new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,this.params.series[i].color
                                )
                            }
                        }
        			})
            	}
            	return seriesData;
        	},
            riskForecastChart(){
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend:{
                        orient: 'vertical',
                        borderWidth:1,
                        right:0,
                        data: this.params.legend
                    },
                    barCategoryGap:'30%',
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        axisLabel:{
                            show:false
                        },
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        type: 'category',
                        data:this.params.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    series:this.formatData()
                };
                // 使用刚指定的配置项和数据显示图表。
                echarts.init(document.getElementById('riskForecastChart')).setOption(option);
            }
        },
        mounted(){
            this.riskForecastChart();
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../../less/common");
    #riskForecast{
        .w(100%);
        .h(100%);
        #riskForecastChart{
            margin:0 auto;
        }
    }

</style>