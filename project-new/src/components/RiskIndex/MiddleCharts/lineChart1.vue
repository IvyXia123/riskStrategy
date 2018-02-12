<template>
    <div id="lineChart1" class="chartBox">
        <div ref="AAA" :style="{width:'100%',height:'100%'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    export default{
        name: 'lineChart1',
        data(){
        	return{}
        },
        props:['params'],
        methods: {
        	formatData(){// 格式化图标数据 xAxis & series
    			let xAxisData = []; // series 数据
            	for(let i = 0; i < this.params.xAxis.length; i++){
        			xAxisData.push({
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: (i == 1?this.params.color[0]:this.params.color[1])
                            }
                        },
                        axisLabel:{
                          color:'#a8a8a8'
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                   let name = (i == 1?this.params.legend[0]:this.params.legend[i+1]);
                                    return name + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }.bind(this)
                            }
                        },
                        data: this.params.xAxis[i].values
                    })
            	}
            	
    			let seriesData = []; // series 数据
            	for(var i = 0; i < this.params.series.length; i++){
        			seriesData.push({
                        name:this.params.series[i].name,
                        type:'line',
                        xAxisIndex: (i == 0? 1:0),
                        smooth: true,
                        data: this.params.series[i].values
                    })
            	}
            	return {
            		xAxisData,
            		seriesData
            	};
        	},
            clientRuleChart() {
                var option = {
                    color: this.params.color,
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        borderWidth:1,
                        right:0,
                        data:this.params.legend
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: this.formatData().xAxisData,
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel:{
                                color:'#a8a8a8'
                            },
                        }
                    ],
                    series:this.formatData().seriesData
                };
                // 使用刚指定的配置项和数据显示图表。
                echarts.init(this.$refs.AAA).setOption(option);
            }
        },
        mounted(){
            this.clientRuleChart();
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../../less/common");
    #clientRule{
        .w(100%);
        .h(100%);
        #AAA{
            margin:0 auto;
            padding-left:10px;
        }
    }
</style>