// echart 1
function KPI(obj) {
	var kpiGraph = echarts.init(obj.id);
	var placeHolderStyle = {
		normal: {
			color: 'rgba(0,0,0,0)',
			label: {
				show: false
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	var option = {
		title: {
			text: obj['val'].value + '%',
			subtext: obj['val'].comp,
			x: 'center',
			y: 'center',
			itemGap: 5,
			textStyle: {
				color: 'hsla(184,100%,49%,1)',
				fontFamily: '微软雅黑',
				fontSize: 30,
				fontWeight: 'bolder'
			}
		},

		legend: {
			orient: 'vertical',
			x: document.getElementById('main').offsetWidth / 2,
			y: 123,
			itemGap: 12,
			data: [obj['val'].value + '%']
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: false,
					readOnly: false
				},
				magicType: {
					show: false,
					type: ['line', 'bar']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: false
				}
			}
		},
		series: [{
			name: '1',
			type: 'pie',
			clockWise: false,
			radius: [75, 60],
			data: [{
					value: obj['val'].value,
					name: obj['val'].value + '%',
					itemStyle: {
						normal: {
							label: {
								show: false
							},
							labelLine: {
								show: false
							}
						}
					}
				},
				{
					value: (100 - Number(obj['val'].value)),
					name: 'invisible',
					itemStyle: placeHolderStyle
				}
			]
		}]
	};
	kpiGraph.setOption(option);
}
// echart 2
function registerUserGraph(obj) {
	var registerUserGraph = echarts.init(obj.id);
	var option = {
		title: {
			text: '单位：万',
			x: 'left',
			y: '30',
			itemGap: 5,
			textStyle: {
				color: '#7E8790',
				fontFamily: '微软雅黑',
				fontSize: 12,
				fontWeight: 'bolder'
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: '{b0}<br />{a1}: {c1}<br />{a0}: {c0}'
		},
		legend: {
			y: '5%',
			textStyle: {
				color: '#7E8790',
				fontSize: 12
			},
        	data:['注册用户数','交易用户数']
    	},
		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: false,
					readOnly: false
				},
				magicType: {
					show: false,
					type: ['line', 'bar']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: false
				}
			}
		},
		calculable: true,
		xAxis: [{
			show: true,
			type: 'category',
			data: obj.val3,
			axisLine: {
				show: true, //控制坐标轴轴线是否显示
				lineStyle: {
					color: "#7E8790" //改变坐标值的颜色
				}
			}
		}],
		yAxis: [{
			type: 'value',
			show: true,
			splitLine: {
				show: false
			},
			axisLine: {
				show: true, //控制坐标轴轴线是否显示
				lineStyle: {
					color: "#7E8790" //改变坐标值的颜色
				}
			}
		}],
		series: [{
				name: '注册用户数',
				type: 'bar',
				data: obj['val1'],
				itemStyle: {
					normal: {
						color: "#1CDFF1"
					}
				}
			},
			{
				name: '交易用户数',
				type: 'bar',
				data: obj['val2'],
				itemStyle: {
					normal: {
						color: "#0C6577"
					}
				}
			},
			// 折线
			{
		        name: '注册用户数',
		        type: 'line',
		        symbolSize:10,
           		symbol:'circle',
           		itemStyle: {
					normal: {
						color: "#1CDFF1"
					}
				},
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top',
	                }
	            },
		        lineStyle: {
		                normal: {
		                	color:'#1CDFF1',
		                    width: 3,
		                    shadowColor: 'rgba(0,0,0,1)',
		                    shadowBlur: 10,
		                    shadowOffsetY: 10
		                }
		            },
		        data: obj['val1']
		    },
			{
		        name: '交易用户数',
		        type: 'line',
		        symbolSize:10,
           		symbol:'circle',
           		itemStyle: {
					normal: {
						color: "red"
					}
				},
	            label: {
	                normal: {
	                	color:'red',
	                    show: true,
	                    position: 'top',
	                }
	            },
		        lineStyle: {
		                normal: {
		                    width: 3,
		                    shadowColor: 'rgba(0,0,0,0.4)',
		                    shadowBlur: 10,
		                    shadowOffsetY: 10
		                }
		            },
		        data: obj['val2']
		  	}
		]
	};
	registerUserGraph.setOption(option);
};
// echart 3
function tradeAmountGraph(obj) {
	var tradeAmountGraph = echarts.init(obj.id);
	var label = {
			normal: {
				show: false,
				formatter: '{d}%',
				position: "center",
				textStyle: {
					color: '#7E8790',
					fontSize: 16
				}
			}
		},
		option = {
			legend: {
				x: 'right',
				y: 'bottom',
				itemGap: 10,
				data: obj["val1"],
				textStyle: {
					color: '#7E8790',
					fontSize: 12
				}
			},
			series: [{
				type: 'pie',
				center: ['50%', "43%"],
				radius: ['25%', '40%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: true,
						position: 'left center',
						textStyle: {
							fontSize: '16',
							color: "#7E8790"
						},
						formatter: '{d}%'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '16',
							fontWeight: 'bold',
							color: "#7E8790"
						}
					}
				},
				labelLine: {
					normal: {
						show: true
					}
				},
				data: [{
						value: obj["val2"][0]["value"],
						name: obj["val2"][0]["name"]
					},
					{
						value: obj["val2"][1]["value"],
						name: obj["val2"][1]["name"]
					},
					{
						value: obj["val2"][2]["value"],
						name: obj["val2"][2]["name"]
					},
					{
						value: obj["val2"][3]["value"],
						name: obj["val2"][3]["name"]
					}
				]
			}],
			color: ["#c23531", "#EA2503", "#0c6577", "#11DDFF"]
		};
	tradeAmountGraph.setOption(option);
};
// echart 4
function monthlyTradeGraph(obj) {
	var monthlyTradeGraph = echarts.init(obj.id);
	var option = {
		title: {
			text: '单位：亿',
			x: 'left',
			y: '30',
			itemGap: 5,
			textStyle: {
				color: '#7E8790',
				fontFamily: '微软雅黑',
				fontSize: 12,
				fontWeight: 'bolder'
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			data: obj['val1'],
			axisLine: {
				show: true, //控制坐标轴轴线是否显示
				lineStyle: {
					color: "#7E8790" //改变坐标值的颜色
				}
			}
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				show: true, //控制坐标轴轴线是否显示
				lineStyle: {
					color: "#7E8790" //改变坐标值的颜色
				}
			},
			axisLabel: { //调整y轴的lable
				textStyle: {
					fontSize: 12 //改变坐标值字体大小
				}
			},
			/*axisTick: { //去除坐标轴上的刻度线
				show: true
			},*/
			splitLine: { //控制网格线是否显示
				show: false
			}
		}],
		series: [{
			name: '预购',
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					},
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //设置渐变色
						offset: 0,
						color: 'rgb(10,121,233)'
					}, {
						offset: 0.8,
						color: '#01083F'
					}, {
						offset: 1,
						color: 'rgb(0, 0, 0)'
					}])
				}
			},
			label: {
	                normal: {
	                	color:'#7E8790',
	                    show: true,
	                    position: 'top',
	                }
	           },
			data: obj['val2']
		}]
	};
	monthlyTradeGraph.setOption(option);
};
// echart 6
function dataMonitorGraph(obj) {
	var dataMonitorGraph = echarts.init(obj.id);
	var dataValues = {
		'name1': {
			'center': ['25%', '25%'],
			'radius': ['24%', '35%'],
			'value' : obj['val2'][0]['value'],
			'name'	: obj['val2'][0]['name'],
			'itemColor': ['#5EECFF', '#437AB0'],
			'labelColor': '#7E8790'
		},
		'name2': {
			'center': ['25%', '25%'],
			'radius': ['26%', '33%'],
			'itemColor': ['#fff', '#404968', '#181736'],
		},
		'name3': {
			'center': ['77%', '25%'],
			'radius': ['24%', '35%'],
			'value' : obj['val2'][1]['value'],
			'name'  : obj['val2'][1]['name'],
			'itemColor': ['#E51B67', '#9A1435'],
			'labelColor': '#7E8790'
		},
		'name4': {
			'center': ['77%', '25%'],
			'radius': ['26%', '33%'],
			'itemColor': ['#fff', '#502C36', '#9A1435'],
		},
		'name5': {
			'center': ['25%', '65%'],
			'radius': ['24%', '35%'],
			'value' : obj['val2'][2]['value'],
			'name'  : obj['val2'][2]['name'],
			'itemColor': ['#F3F685', '#D7F928'],
			'labelColor': '#7E8790'
		},
		'name6': {
			'center': ['25%', '65%'],
			'radius': ['26%', '33%'],
			'itemColor': ['#fff', '#7F8C70', '#D7F928'],
		}
	};
	var dataStyle = {
		normal: {
			label: {
				show: true
			},
			labelLine: {
				show: false
			}
		}
	};
	var placeHolderStyle = {
		normal: {
			color: 'rgba(0,0,0,0)',
			label: {
				show: true
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	var option = {
		title: [{
			text: obj['val1'][0],
			left: '15%',
			top: '42%',
			textStyle: {
				color: '#7E8790',
				fontSize: 12
			}
		}, {
			text: obj['val1'][1],
			left: '75%',
			top: '42%',
			textAlign: 'center',
			textStyle: {
				color: '#7E8790',
				fontSize: 12
			}
		}, {
			text: obj['val1'][2],
			left: '23%',
			top: '82%',
			textAlign: 'center',
			textStyle: {
				color: '#7E8790',
				fontSize: 12
			}
		}],
		legend: {
			orient: 'vertical',
			x: 'right',
			y: '60%',
			itemGap: 8,
			data: obj['val1'],
			textStyle: {
				fontSize: 12,
				color: '#7E8790'
			}
		},
		series: [{
				name: '1',
				type: 'pie',
				clockWise: true,
				startAngle: 90,
				hoverAnimation: false,
				center: dataValues['name1']['center'],
				radius: dataValues['name1']['radius'],
				data: [{
						value: dataValues['name1']['value'],
						name: dataValues['name1']['name'],
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: dataValues['name1']['itemColor'][0]
								}, {
									offset: 1,
									color: dataValues['name1']['itemColor'][1]
								}]),
							}
						},
						label: {
							normal: {
								formatter: '{c} bps',
								position: "center",
								textStyle: {
									color: dataValues['name1']['labelColor'],
									fontSize: 12
								}
							}
						}
					},
					{
						value: 200,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]

			},
			{
				name: '2',
				type: 'pie',
				clockWise: false,
				startAngle: 180,
				hoverAnimation: false,
				center: dataValues['name2']['center'],
				radius: dataValues['name2']['radius'],
				itemStyle: dataStyle,
				data: [{
						value: 100,
						name: '',
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: dataValues['name2']['itemColor'][0]
									}, {
										offset: 0.3,
										color: dataValues['name2']['itemColor'][1]
									},
									{
										offset: 1,
										color: dataValues['name2']['itemColor'][2]
									}
								]),
							}
						}
					},
					{
						value: 100,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]
			},
			{
				name: '3',
				type: 'pie',
				clockWise: true,
				startAngle: 90,
				hoverAnimation: false,
				center: dataValues['name3']['center'],
				radius: dataValues['name3']['radius'],
				itemStyle: dataStyle,
				data: [{
						value: dataValues['name3']['value'],
						name: dataValues['name3']['name'],
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: dataValues['name3']['itemColor'][0]
								}, {
									offset: 1,
									color: dataValues['name3']['itemColor'][1]
								}]),
							}
						},
						label: {
							normal: {
								formatter: '{c} bps',
								position: "center",
								textStyle: {
									color: dataValues['name3']['labelColor'],
									fontSize: 12
								}
							}
						}
					},
					{
						value: 200,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]

			},
			{
				name: '4',
				type: 'pie',
				clockWise: false,
				startAngle: 180,
				hoverAnimation: false,
				center: dataValues['name4']['center'],
				radius: dataValues['name4']['radius'],
				itemStyle: dataStyle,
				data: [{
						value: 100,
						name: '',
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: dataValues['name4']['itemColor'][0]
									}, {
										offset: 0.3,
										color: dataValues['name4']['itemColor'][1]
									},
									{
										offset: 1,
										color: dataValues['name4']['itemColor'][2]
									}
								]),
							}
						}
					},
					{
						value: 100,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]
			},
			{
				name: '5',
				type: 'pie',
				clockWise: true,
				startAngle: 90,
				hoverAnimation: false,
				center: dataValues['name5']['center'],
				radius: dataValues['name5']['radius'],
				itemStyle: dataStyle,
				data: [{
						value: dataValues['name5']['value'],
						name: dataValues['name5']['name'],
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: dataValues['name5']['itemColor'][0]
								}, {
									offset: 1,
									color: dataValues['name5']['itemColor'][1]
								}]),
							}
						},
						label: {
							normal: {
								formatter: '{c} bps',
								position: "center",
								textStyle: {
									color: dataValues['name5']['labelColor'],
									fontSize: 12
								}
							}
						}
					},
					{
						value: 200,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]

			},
			{
				name: '6',
				type: 'pie',
				clockWise: false,
				startAngle: 180,
				hoverAnimation: false,
				center: dataValues['name6']['center'],
				radius: dataValues['name6']['radius'],
				itemStyle: dataStyle,
				data: [{
						value: 100,
						name: '',
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: dataValues['name6']['itemColor'][0]
									}, {
										offset: 0.3,
										color: dataValues['name6']['itemColor'][1]
									},
									{
										offset: 1,
										color: dataValues['name6']['itemColor'][2]
									}
								]),
							}
						}
					},
					{
						value: 100,
						name: 'invisible',
						itemStyle: placeHolderStyle
					}
				]
			}
		]
	};
	dataMonitorGraph.setOption(option);
}