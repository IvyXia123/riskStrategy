<template>
    <div id="middleChartsBox">
        <div class="middleCharts">
            <ul class="upperCharts">
                <!--========================================申请放款走势==================================-->
                <li class="charts">
                    <div class="box">
                        <h4 class="absolute">
                            <svg-icon class="icons" id="icon-zoushi"></svg-icon>
                            <span>{{modulesData.lineChart1.title}}</span>
                        </h4>
                        <aaa :params="modulesData.lineChart1"></aaa>
                    </div>
                </li>
                <!--========================================风控模型拒绝==================================-->
                <li class="charts">
                    <div class="box">
                        <h4 >
                            <svg-icon class="icons" id="icon-chengbenbili" ></svg-icon>
                            <span>{{modulesData.pieChartData.title}}</span>
                        </h4>
                        <div class="info chartBox">
                            <div class="circleBox">
                                <pie-chart></pie-chart>
                            </div>
                            <ul class="infoList">
                            	<li v-for="row in modulesData.pieChartData.values">
                            		<p class="count">{{row.count}}</p>
                                    <p class="ruleId">Rule-id:</p>
                                    <p class="idNo" @mouseover="overShow(row)" @mouseout="outHide(row)">{{row.ruleId}}</p>
                            	</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="bottomCharts">
                <!--========================================当前进度分布==================================-->
                <li class="charts">
                    <div class="box">
                        <h4>
                            <svg-icon class="icons" id="icon-icon-p_mrpjinduzhuizong"></svg-icon>
                            <span>{{modulesData.progressData.title}}</span>
                        </h4>
                        <ul class="progress">
                        	<li class="progressList" v-for="row in modulesData.progressData.values">
                        		<div class="progressName">
                                    <span class="name">{{row.name}}</span>
                                    <span class="val">{{row.val}}%</span>
                                </div>
                                <div class="outerProgress">
                                    <span class="innerProgress" ref="innerProgress"></span>
                                </div>
                        	</li>	
                        </ul>
                    </div>
                </li>
                <!--========================================通过拒绝==================================-->
                <li class="charts">
                    <div class="box">
                        <h4 class="absolute">
                            <svg-icon class="icons" id="icon-zhexiantu"></svg-icon>
                            <span>{{modulesData.lineChart2.title}}</span>
                        </h4>
                        <aaa :params="modulesData.lineChart2"></aaa>
                    </div>
                </li>
                <!--========================================用户属性分布==================================-->
                <li class="charts scattergram">
                    <div class="box">
                        <h4 class="absolute">
                            <svg-icon class="icons" id="icon-qipaotu"></svg-icon>
                            <span>{{modulesData.scattergramData.title}}</span>
                        </h4>
                        <scattergram ref="charts" :params="modulesData.scattergramData"></scattergram>
                    </div>
                </li>
                <!--========================================不良金额分布==================================-->
                <li class="charts">
                    <div class="box">
                        <h4 class="absolute">
                            <svg-icon class="icons" id="icon-zhuzhuangtu"></svg-icon>
                            <span>{{modulesData.histogramData.title}}</span>
                        </h4>
                        <histogram :params="modulesData.histogramData"></histogram>
                    </div>
                </li>
            </ul>
        </div>
        <span class="tooltip" v-show="tooltip" ></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'jquery'
    import pieChart from './MiddleCharts/pieChart.vue'
    import scattergram from './MiddleCharts/scattergram.vue'
    import histogram from './MiddleCharts/histogram.vue'
    import AAA from './MiddleCharts/lineChart1.vue'

    export default{
        name:'middleChartsBox',
        data(){
            return{
                tooltip:false,
                modulesData:{
                	lineChart1:{
                		'title':'申请放款走势',
                		'color':['#5793f3','#d14a61'],
	                    'legend':['申请','放款'],
	                    'xAxis':[
	                        {
	                            'values':["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
	                        },
	                        {
	                            'values':["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
	                        }
	                    ],
	                    'series':[
	                        {
	                            'name':'申请',
	                            'values':[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	                        },
	                        {
	                            'name':'放款',
	                            'values':[3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
	                        }
	                    ]
                	},
                	pieChartData:{
                		'title':'风控模型拒绝',
            			'values':[
            				{'count':1463 ,'ruleId':'SXSP-BD003'},
            				{'count':1463 ,'ruleId':'SXSP-BD003'},
            				{'count':1463 ,'ruleId':'SXSP-BD003'},
            				{'count':1463 ,'ruleId':'SXSP-BD003'},
            				{'count':1463 ,'ruleId':'SXSP-BD003'},
            				{'count':1463 ,'ruleId':'SXSP-BD003'}
            			]
                	},
                	progressData:{
                		'title':'当前进度分布',
                		'time':2000,  //当前进度分布显示完整进度条所用的时间
            			'values':[
            				{'name':'1.申请' ,'val':'70'},
            				{'name':'2.系统审批中','val':'90'},
            				{'name':'3.待签约' ,'val':'80'},
            				{'name':'4.待放款' ,'val':'85'},
            				{'name':'5.已放款' ,'val':'90'}
            			]
                	},
                	lineChart2:{
                		'title':'通过拒绝',
                		'color':['#5793f3','#d14a61'],
	                    'legend':['通过','拒绝'],
	                    'xAxis':[
	                        {
	                            'values':["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
	                        },
	                        {
	                            'values':["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
	                        }
	                    ],
	                    'series':[
	                        {
	                            'name':'通过',
	                            'values':[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	                        },
	                        {
	                            'name':'拒绝',
	                            'values':[3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
	                        }
	                    ]
                	},
                	scattergramData:{
                		'title':'用户属性分布',
                		'legend':['业主'],
	                    'series':[
	                        {
	                            'name':'业主',
	                            'values':[
	                                [440009956, 81.8, 2996800, 'Australia', 2015],
	                                [2329400000, 67.7, 2593992, 'Canada', 2015],
	                                [4218200000, 75.8, 3029420, 'Iceland', 2015],
	                                [5990000000, 66.8, 8105020, 'India', 2015],
	                                [3616200000, 83.5, 9673180, 'Japan', 2015],
	                                [1822500000, 81.4, 3471500, 'United Kingdom', 2015]
	                            ]
	                        }
	                    ]
                	},
                	histogramData:{
                		'title':'不良金额分布',
                		'title':'不良金额分布',
	                    'legend':['次级','可疑','损失'],
                        'xAxis':['进件月份(1)','进件月份(2)','进件月份(3)','进件月份(4)','进件月份(5)','进件月份(6)'],
	                    'series':[
	                        {
	                            'name':'次级',
	                            'values':[120,60,102,99,133],
	                            'color':[
	                                {offset: 1,	color: '#477397'},
	                                {offset: 0.2,color: '#9dc1de'},
	                                {offset: 0, color: '#fff'}
	                            ]
	                        },
	                        {
	                            'name':'可疑',
	                            'values':[80,123,76,128,96],
	                            'color':[
	                                {offset: 1, color: '#68a0c5'},
	                                {offset: 0.2,color: '#94bce3'},
	                                {offset: 0, color: '#fff'}
	                            ]
	                        },
	                        {
	                            'name':'损失',
	                            'values':[50, 80,117,115,118],
	                            'color':[
	                                {offset: 1, color: '#68a0c5'},
	                                {offset: 0.2,color: '#94bce3'},
	                                {offset: 0, color: '#fff'}
	                            ]
	                        }
	                    ]
                	}
                }
            }
        },
        components:{
            'pie-chart':pieChart,
            'scattergram':scattergram,
            'histogram':histogram,
            'aaa':AAA
        },
        methods:{
            overShow(val){
                if(!this.tooltip){
                    this.tooltip = true;
                    let dom = document.getElementsByClassName('tooltip')[0];
                    dom.textContent = val.ruleId;
                    let x = window.event.clientX+10;
                    let y = window.event.clientY+10;
                    dom.style.left = x+'px';
                    dom.style.top = y+'px';
                }
            },
            outHide(){
                this.tooltip = false;
            }
        },
        mounted(){
            //当前进度分布显示完整进度条走动的动画：
            var self=this;
            for(var i=0;i<this.$refs.innerProgress.length;i++){
                this.modulesData.progressData.time=this.modulesData.progressData.values[i].val*this.modulesData.progressData.time/100;
                $(self.$refs.innerProgress[i]).animate({
                    width:`${self.modulesData.progressData.values[i].val}%`
                },this.modulesData.progressData.time);
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../less/common");
    #middleChartsBox{
        .w(100%);
        height:calc(~"100% - 12vh");
        padding-top:10px;
        background:#f3f4f6;
        .icon{
        	font-size:1rem;
        }
        .tooltip{
            position: absolute;
            z-index: 9;
            padding:5px 8px;
            border-radius: 3px;
            color: #fff;
            font-size: 13px;
            background-color: rgba(0,0,0,.6);
            transition:all .1s;
        }
        .middleCharts {
            .w(100%);
            .h(100%);
            ul.upperCharts{
                padding-bottom:5px;
                background:#f3f4f6;
                li.charts{
                    float:left;
                    .w(50%);
                    &:nth-child(1){
                        padding-right:5px;
                    }
                    &:nth-child(2){
                        padding-left:5px;
                        overflow:hidden;
                    }
                    .box{
                        .w(100%);
                        .h(100%);
                        .info{
                            .w(100%);
                            .h(87%);
                            overflow:hidden;
                            .circleBox{
                                .w(50%);
                                .h(100%);
                                padding:30px 20px 20px 20px;
                                float:left;
                                .circle{
                                    position:relative;
                                    .w(100%);
                                    .h(100%);
                                    margin:0 auto;
                                }
                            }
                            ul.infoList{
                                .w(50%);
                                .h(100%);
                                float:left;
                                li{
                                    .w(50%);
                                    .h(calc(~"100% / 3"));
                                    padding:5px 6px;
                                    float:left;
                                    p{

                                    }
                                    p.count{
                                        .h(40%);
                                        font-size:18px;
                                        color:#2f2f2f;
                                    }
                                    p.ruleId,p.idNo{
                                        .h(30%);
                                        font-size:12px;
                                        color:#a8a7a8;
                                    }
                                    p.ruleId{
                                        font-weight:bold;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ul.bottomCharts{
                padding-top:5px;
                background:#f3f4f6;
                li.charts{
                    .w(25%);
                    padding:0 5px;
                    &:last-child{
                    	padding-right:0px;
                    }
                    &:first-child{
                    	padding-left:0px;
                    }
                    &.scattergram{
                    	.box,div{
                    		overflow: initial;
                    	}
                    }
                    ul.progress{
                        .h(87%);
                        .w(100%);
                        padding:0 20px 5px 20px;
                        li.progressList{
                            .h(20%);
                            padding:8px 0;
                            .progressName{
                                overflow:hidden;
                                span{
                                    font-size:12px;
                                    color:#a8a7a8;
                                    &.name{
                                        float:left;
                                    }
                                    &.val{
                                        float:right;
                                    }
                                }
                                padding-bottom:5px;
                            }
                            .outerProgress{
                                .w(100%);
                                .h(3px);
                                overflow:hidden;
                                border-radius:3px;
                                background:#eef3f9;
                                box-shadow: 0 0 5px #ddd inset;
                                .innerProgress{
                                    display:block;
                                    .h(3px);
                                    .w(0);
                                    border-top-right-radius: 2px;
                                    border-bottom-right-radius: 2px;;
                                    background:#46cfbd;
                                }
                            }

                        }
                    }
                }
            }
            ul{
                .w(100%);
                .h(50%);
                li.charts{
                	position: relative;
                    .h(100%);
                    .w(100%);
                    float:left;
                    .box{
                        .w(100%);
                        .h(100%);
                        padding:10px 8px 8px;
                        overflow:hidden;
                        border:1px solid #e6e6e6;
                        background:#fff;
                        h4{
                            display:flex;
							padding: 0 5px 5px;
                            height: 30px;
                            font-size:14px;
                            align-items:center;
                            font-weight: bolder;
                            .icons{
                                margin-right:5px;
                            }
                            &.absolute{
                            	position: absolute;
                            }
                        }
                        .chartBox{
                            .w(100%);
                            height:100%;
                        }
                    }
                }
            }
        }
    }
</style>