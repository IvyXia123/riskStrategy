<template>
    <div id="scattergram" class="chartBox">
        <div id="clientTypeChart" :style="{width:'100%',height:'100%'}"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';

    export default{
        name: 'scattergram',
        props:['params'],
        data(){
            return {

            }
        },
        methods: {
        	formatData(){// 格式化 serirs数据
        		let seriesData = []; // series 数据 。 series是个数组，数据循环出来比较方便
            	for(var i = 0; i < this.params.series.length; i++){
        			seriesData.push({
                        name:this.params.series[i].name,
                        data: this.params.series[i].values,
                        type: 'scatter',
                        hoverAnimation: false,   //避免鼠标悬浮在区块时区块放大
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 1e2;
                        },
                        label: {
                            emphasis: {
                                show: true,
                                formatter: function (param) {
                                    return param.data[3];
                                },
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: '#7496c7',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(250, 250, 250)'
                                }, {
                                    offset: 1,
                                    color: '#7496c7'
                                }])
                            }
                        }
                    })
            	}
            	return seriesData;
        	},
            clientTypeChart(){
                var option = {
                    title: {
                        text: ''
                    },
                    legend: {
                        right: 0,
                        borderWidth:1,
                        data: this.params.legend
                    },
                    tooltip: {     //鼠标hover出现的tooltip框
                        show: true
                    },
                    xAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {     //坐标轴的轴线
                            show: false
                        },
                        axisTick: {    //坐标轴的刻度
                            show: false
                        },
                        axisLabel: {   //坐标轴的刻度值
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid'   //图表网格线
                            }
                        },
                        scale: true
                    },
                    series: this.formatData()
                };
                // 使用刚指定的配置项和数据显示图表。
                echarts.init(document.getElementById('clientTypeChart')).setOption(option);
            }
        },
        mounted(){
            this.clientTypeChart();
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../../less/common");
    #clientType{
        .w(100%);
        .h(100%);
        #clientTypeChart{
            margin:0 auto;
        }
    }
</style>