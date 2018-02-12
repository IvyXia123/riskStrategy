p.url = {
    "u1": {
        "ul": "/query/kv?"
    },
    "u2": {
        "ul": "/query/mv?"
    },
    "u3": {
        "ul": "/query/kp?"
    }
}

function getData (ul, callback, useData){
	//数据格式
	var objData = {
		"map": {
			"tooltipData": {
			},
			"canvasData":{
				"idArr"		:[],			// 要改变值的canvas 的 id
				"idSuffix"	:[],			// 要改变值的canvas id的后缀
				"data"	  	:[]
			},
			"salesAmounts":{}
		},
		"canvas": {
			"values":{
				"idArr"	  :[],			// 要改变值的canvas 的 id
				"idSuffix":[],			// 要改变值的canvas id的后缀
				"data"	  :[]
			}
		},
		"chart": {
			"values": {
				"kpiGraph":{
					"data":{
					}
				} ,
				"注册交易用户统计": {
					"data1": {
						"name": "上午注册人数",
						"val": []
					},
					"data2": {
						"name": "下午注册人数",
						"val": []
					},
					"data3": []
				},
				"交易金额": {
					"data1": ['直接访问', '邮件营销', '联盟广告', '视频广告'],
					"data2": []
				},
				"交易额走势": {
					"data1": [],
					"data2": []
				},
				"关键指标": {
	
				},
				"费比监控": {
					"data1": [],
					"data2": []
				}
	
			}
		}
	}

	if(arguments.length === 0){
        return objData;
	}

	if(useData){
        objData = useData;
	}


	p.startTime = "2017-07-18 00:01";
	p.endTime = "2017-07-18 00:02";

	// idName : dom 的id值，
	// showTitles : 是否获取金额对应的头部信息，
	// dataType : 当前数据类型，如果值一致即为数组，不一致则只读取需要的，
	// pageName : 当前数据所属的页面；
	var idCorrespondenceDom = {
			"0":{
				"idName": "mapTitle",
				"pageName": "map",
				"dataType": "title",
				"showTitles": true
			},
			"1":{
				"idName": "transactionAmount .arcData",
				"pageName": "map",
				"dataType": "salesAmounts",
				"showTitles": true
			},
			"2":{
				"idName": "transactionAmount",
				"dataType": "targetedValue",
				"pageName": "map"
			},
			"3":{
				"idName": "transactionNumber .arcData",
				"pageName": "map",
				"dataType": "salesAmounts",
				"showTitles": true
			},
			"4":{
				"idName": "transactionNumber",
				"dataType": "targetedValue",
				"pageName": "map"
			},
			"5":{
				"idName": "registering .arcData",
				"pageName": "map",
				"dataType": "salesAmounts",
				"showTitles": true
			},
			"6":{
				"idName": "registering",
				"dataType": "targetedValue",
				"pageName": "map"
			},
			"7":{
				"idName": "kpiGraph",
				"dataType": "KPI",
				"sequence":"1",
				"pageName": "chart",
				"showTitles": true
			},
			"8":{
				"idName": "kpiGraph",
				"dataType": "KPI",
				"sequence":"2",
				"pageName": "chart",
				"showTitles": true
			},
			"9":{
				"idName": "dataMonitorGraph",
				"dataType": "费比监控",
				"pageName": "chart",
				"showTitles": true
			},
			"10":{
				"idName": "dataMonitorGraph",
				"dataType": "费比监控",
				"pageName": "chart",
				"showTitles": true
			},
			"11":{
				"idName": "dataMonitorGraph",
				"dataType": "费比监控",
				"pageName": "chart",
				"showTitles": true
			},
			"12":{
				"idName": "tradeAmountGraph",
				"dataType": "交易金额",
				"pageName": "chart",
				"showTitles": true
			},
			"13":{
				"idName": "tradeAmountGraph",
				"dataType": "交易金额",
				"pageName": "chart",
				"showTitles": true
			},
			"14":{
				"idName": "tradeAmountGraph",
				"dataType": "交易金额",
				"pageName": "chart",
				"showTitles": true
			},
			"15":{
				"idName": "tradeAmountGraph",
				"dataType": "交易金额",
				"pageName": "chart",
				"showTitles": true
			},
			"16":{
				"idName": "item1-1",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"17":{
				"idName": "item1-1",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"18":{
				"idName": "item1-2",
				"dataType": "amountCompleteness",
				"pageName": "canvas",
				"showTitles": true
			},
			"19":{
				"idName": "lastItem-1",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"20":{
				"idName": "lastItem-1",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"21":{
				"idName": "lastItem-2",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"22":{
				"idName": "lastItem-2",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"23":{
				"idName": "lastItem-3",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"24":{
				"idName": "lastItem-3",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"25":{
				"idName": "item1-4",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"26":{
				"idName": "item1-4",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"27":{
				"idName": "item2",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"28":{
				"idName": "item2",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"29":{
				"idName": "lastItem-4",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"30":{
				"idName": "lastItem-4",
				"dataType": "completeness",
				"pageName": "canvas"
			},
			"31":{
				"idName": "item1-3",
				"dataType": "amount",
				"pageName": "canvas",
				"showTitles": true
			},
			"32":{
				"idName": "item1-3",
				"dataType": "completeness",
				"pageName": "canvas"
			}
		};
	
	// 请求数据
	p.dataConversion = function(str, key) {
		this.url = '';
		this.key = key;
		this.deliveryAjax = function() {
			var self = this;
			// 拼接URL
			if(!str['data']) {
				self.url = str['ul'];
			} else {
				self.url = str['ul'] + str['data'];
			};

			$.ajax({
				type: "get",
				url: self.url,
				async: true,
				success: function(req) {
					try{
						var reqData = JSON.parse(req);
						reqData = reqData.message;
						if(self.key === "u1"){
							// 遍历当前请求到的数据，并将当前数据与 idCorrespondenceDom 组合起来，拼接成一个更加完整的数据
							for(var i = 0; i < reqData.length; i++) {
								var objSupplementing = idCorrespondenceDom[reqData[i].id];
								if(reqData[i]['id'] == 0) { // 首页标题,执行完当前判断后跳出当次循环
									objSupplementing['TextName'] = reqData[i]['key'];
									var ti = reqData[i]['val'].split(",");
                                    objSupplementing['TextVal']  = ti[0] + "<span style='font-size:29px;display:inline-block;'>亿</span>" + ti[1] + "<span style='font-size:29px'>万</span>" + ti[2] + "<span style='font-size:29px'>元</span>";
									continue;
								};
								if(objSupplementing.showTitles){// showTitles 存在表示：当前数据的（属性KE & 属性values）的值都需要
									objSupplementing['Key'] = reqData[i]['key'];
									objSupplementing['Val'] = reqData[i]['val'];
								}else{// showTitles 不存在表示：只需要当前数据的属性values的值
									objSupplementing['Val'] = reqData[i]['val'];
								};
							};
							// 各项金额指标数据
							self.canvasAmountIndicatorsDataCompile(idCorrespondenceDom);
						};
						if(self.key == "u2"){
							for(var i in reqData){
								objData['chart']['values']['注册交易用户统计']['data1']['val'].push(parseFloat(reqData[i]['register_users']/10000).toFixed(2));
								objData['chart']['values']['注册交易用户统计']['data2']['val'].push(parseFloat(reqData[i]['trans_users']/10000).toFixed(2));
								objData['chart']['values']['注册交易用户统计']['data3'].push(reqData[i]['display_time']);
								objData['chart']['values']['交易额走势']['data2'].push(reqData[i]['trans_amounts']);
								objData['chart']['values']['交易额走势']['data1'].push(reqData[i]['display_time']);
							}
						};
						if(self.key == "u3"){
							objData['chart']['values']['关键指标'] = reqData;
						};
						// 未知
						self.unknown(reqData);
						if(callback){
							callback(objData);
						}
					}catch(e){
						console.error(e);
					}

					}
				});
		};
		// 地图提示框数据编译
		this.mapTooltipDataCompile = function(data) {
		};
		// 各项金额指标数据
		this.canvasAmountIndicatorsDataCompile = function(data) {
			// 遍历数据 idCorrespondenceDom ,格式化为最终需要的数据结构
			// salesAmounts
			// targetedValue
			for(var i in data){
				if(data[i]['pageName'] == "map"){
					if(data[i]['dataType'] == "title" ){// 标题栏
						objData[data[i]['pageName']]['mapTitle'] = {
							"titleName" : data[i]['TextName'],
							"titleData" : data[i]['TextVal']
						};
						// 结构：obj.map.mapTitle:{"titleName" : "当天恒存金销售额", "titleDat" : "8,000"};
					};
					if(data[i]['dataType'] == "salesAmounts"){// map page right sales amounts
						objData[data[i]['pageName']]['salesAmounts'][data[i]['idName']] = data[i]['Key']+"<br/>"+ data[i]['Val']
						// 结构：obj.map.salesAmounts:{"registering .arcData" : "当天恒存金销售额<br/>8000万"};
					};
					if(data[i]['dataType'] == "targetedValue"){// map page right canvas targeted value
						objData[data[i]['pageName']]['canvasData']['idArr'].push(data[i]['idName']);
						objData[data[i]['pageName']]['canvasData']['idSuffix'].push('Before');
						objData[data[i]['pageName']]['canvasData']['data'].push({
							'completeness' :[data[i]['Val']]
						});
					};
				}
				if(data[i]['pageName'] == "canvas"){// page 2
					if(objData[data[i]['pageName']]['values']['idArr'].length < 1){// 没有已存在需要绘制的ID
						PutCvanvasCorrespondingData(i);
					}else{
						var size = contrastRepetition(objData[data[i]['pageName']]['values']['idArr'] ,data[i]['idName']);
						if(size < 0){// 不存在重复ID
							PutCvanvasCorrespondingData(i);
						}else{
							PutCvanvasCorrespondingData(i,size);
						}
					}
				};
				if(data[i]['pageName'] == "chart"){// page 3
					// kpi
					if(data[i]['idName'] == "kpiGraph"){
						if(data[i]['sequence'] == 1){
							objData[data[i]['pageName']]['values'][data[i]['idName']]['data']['comp']  = data[i]['Val'];
							objData[data[i]['pageName']]['values'][data[i]['idName']]['data']['title'] = data[i]['Key'];
						}else{
							objData[data[i]['pageName']]['values'][data[i]['idName']]['data']['value'] = data[i]['Val'].substring(0,data[i]['Val'].length-1);
							objData[data[i]['pageName']]['values'][data[i]['idName']]['data']['name']  = data[i]['Key'];
						}
					}
					// 费比数据监控
					if(data[i]['idName'] == "dataMonitorGraph"){
						objData[data[i]['pageName']]['values'][data[i]['dataType']]['data1'].push(data[i]['Key'])
						objData[data[i]['pageName']]['values'][data[i]['dataType']]['data2'].push({
							"name" :data[i]['Key'],
							"value":data[i]['Val'].substring(0,data[i]['Val'].length-3)
						});
					}
					// 交易金额
					if(data[i]['idName'] == "tradeAmountGraph"){
						objData[data[i]['pageName']]['values'][data[i]['dataType']]['data1'].push(data[i]['Key'])
						objData[data[i]['pageName']]['values'][data[i]['dataType']]['data2'].push({
							"name" :data[i]['Key'],
							"value":data[i]['Val'].substring(0,data[i]['Val'].length-1)
						});
					}
				}
				
			};
			function PutCvanvasCorrespondingData(i,size){ //将数据放入canvasData 中
				if(size > -1){
					if(data[i]['dataType'] == "amountCompleteness"){ // Key = 名称，Val = 占比
						dataPush({
							"c":objData[data[i]['pageName']]['values']['data'][size]
						},data[i]['idName'],{
							"completeness": [data[i]['Val']],
							"amount"	  : [data[i]['Key']]
						})
					};
					if(data[i]['dataType'] == "amount"){ // Key = 名称，Val = 占比
						dataPush({
							"c":objData[data[i]['pageName']]['values']['data'][size]
						},data[i]['idName'],{
							"amount": [data[i]['Val']],
							"amount": [data[i]['Key']]
						})
					};
					if(data[i]['dataType'] == "completeness"){ // Key = 名称，Val = 占比
						dataPush({
							"c":objData[data[i]['pageName']]['values']['data'][size]
						},data[i]['idName'],{
							"completeness": [data[i]['Val']]
						})
					};
				}else{
					if(data[i]['dataType'] == "amountCompleteness"){ // Key = 名称，Val = 占比
						dataPush({
							"a":objData[data[i]['pageName']]['values']['idArr'],
							"b":objData[data[i]['pageName']]['values']['idSuffix'],
							"c":objData[data[i]['pageName']]['values']['data']
						},data[i]['idName'],{
							"completeness": [data[i]['Val']],
							"amount"	  : [data[i]['Key']]
						})
					};
					if(data[i]['dataType'] == "amount"){ // Key = 名称，Val = 占比
						dataPush({
							"a":objData[data[i]['pageName']]['values']['idArr'],
							"b":objData[data[i]['pageName']]['values']['idSuffix'],
							"c":objData[data[i]['pageName']]['values']['data']
						},data[i]['idName'],{
							"amount": [data[i]['Key'],data[i]['Val']]
						})
					};
					if(data[i]['dataType'] == "completeness"){ // Key = 名称，Val = 占比
						dataPush({
							"a":objData[data[i]['pageName']]['values']['idArr'],
							"b":objData[data[i]['pageName']]['values']['idSuffix'],
							"c":objData[data[i]['pageName']]['values']['data']
						},data[i]['idName'],{
							"completeness": [data[i]['Val']]
						})
					};
				}
			}
			
			function contrastRepetition(arr,val){
				var count = -1;
				for(var i = 0;i < arr.length; i++){
					if(arr[i].indexOf(val) > -1){// 存在重复
						count = i;
					}
				}
				return count;
			};
			
			function dataPush(oldAarr,id,val){// 将对应值放入objData中
				if(id && oldAarr.a){
					oldAarr.a.push(id);
				}
				if(oldAarr.b){
					oldAarr.b.push('Before');
				}
				if(!oldAarr.a && !oldAarr.b){
					for(var i in val){
						if(!oldAarr.c[i]){
							oldAarr.c[i]= val[i];
						}else{
							oldAarr.c[i].push(val[i][0]);
						}
					}
				}else{
					var obj = {};
					for(var i in val){
						obj[i] = val[i];
					}
					oldAarr.c.push(obj);
				}
			}
		};
		// page3页面表格数据
		this.tableDataCompile = function(data) {
			
		};
		// 未知
		this.unknown = function(data) {
	
		};
		return this.deliveryAjax();
	};
    new p.dataConversion(p.url[ul], ul);
};

p.objDatas = {};
p.dataMergence = function(reverseData,initData, canvasData){
    try{
        for(var i = 0;i < reverseData['idArr'].length; i++){
            var Key 		= reverseData['idArr'][i]+reverseData['idSuffix'][i],
                amount  	= reverseData['data'][i]['amount'],
                completeness= reverseData['data'][i]['completeness'];
            // 与当前 key 对应的原始数据
            var aSingleData = initData[Key];
            // 修改原始值，并添加新的值;
            for(var n = 0;n < aSingleData.length; n++){
                if(aSingleData[n]['type'] == 'arc'){
                    aSingleData[n]['path'] = ["0,"+completeness[0].substring(0,completeness[0].length-1)+"/50"];   //完成率百分比
                    aSingleData[n]['animate'] = ['1'];
                };
                if(aSingleData[n]['type'] == 'Test'){
                    aSingleData[n]['texts'] = completeness; //完成率百分比
                };
                if(aSingleData[n]['type'] == 'line'){
                    aSingleData[n]['texts'] = amount;		// 完成金额
                };
            }
        };
        // 如果原始数据没有值？
        if(canvasData['idArr'].length == 0){
            canvasData['idArr']	 = reverseData['idArr'];
            canvasData['idSuffix'] = reverseData['idSuffix'];
            // 将重写后的json赋给需要执行的data
            canvasData['data'] = JSON.parse(JSON.stringify(canvasData['values']));
        }
    }catch(e){
        //TODO handle the exception
    }
}

p.intervals = {};
