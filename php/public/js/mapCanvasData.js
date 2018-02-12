// 地图页面canvas数据
function mapCanvasData(dom,obj){
	var MCD = {
			initW : document.getElementById(dom).offsetWidth,
			initH : document.getElementById(dom).offsetHeight,
			idArr : ["transactionAmount","transactionAmount","transactionNumber","transactionNumber","registering","registering","canvasBox"],
			idSuffix: ["Before","After","Before","After","Before","After","After"],
			splashesData : {
				"d":[],
				"p":[],
				"w":[],
				"c":[],
				"r":[]
			}
	};
	for(var i =0; i < 200; i++ ){
		var random1 = Math.random();
		var random2 = Math.random();
		var random3 = Math.random();
		var random4 = Math.random();
		MCD.splashesData.d.push(MCD.initW * random1+","+MCD.initH * random2);
		MCD.splashesData.p.push("0,2");
		MCD.splashesData.w.push("1");
		MCD.splashesData.r.push(3*random3+","+1);
		MCD.splashesData.c.push("hsla(184,100%,49%,"+(random4-0.1)+"),hsla(184,100%,49%,.1)");
	}
	
	var arr = ["transactionAmount","transactionNumber","registering"];
	var completeness = [];
	for(var i = 0;i < arr.length;i++){
		for(var n = 0;n < obj.idArr.length; n++){
			if(arr[i] == obj.idArr[n]){
				var val = obj.data[n].completeness[0].substring(0,obj.data[n].completeness[0].length-1) > 0 ? obj.data[n].completeness[0].substring(0,obj.data[n].completeness[0].length-1):0;
				completeness.push(val);
			}
		}
	};
//	if(completeness.length < 1){
//		$.toast('请重新刷新页面！')
//		//console.log(obj)
//	}
	MCD.data = {
		"canvasBoxAfter":[
			{
				"type":"border",
				"path":[
					"Sw/7,2       Ew/6*1.5,2",
					"S2,2 Ew-102,2 w-2,102 w-2,h-2 102,h-2 2,h-102 2,2",
					"Sw/2+100,2   Ew-102,2 w-2,102 w-2,200",
					"Sw-2,h-102   Ew-2,h-2 w/7*5,h-2",
					"Sw/7*2,h-2   Ew/2+100,h-2",
					"S150,h-2     E102,h-2",
					"Sw-2,h-102   Ew-2,h-200"
				],
				"width":["4","2"],
				"color":[
					"hsla(184,100%,49%,1)",
					"hsla(184,100%,49%,.3)"
				],
				"shadow":{
					"offsetX"	: "0",
					"offsetY"	: "0",
					"blur"		: "10",
					"color"		: "#9ff4ff"
				}
			},{
				"centerDot" : MCD.splashesData.d,
				"radii"		: MCD.splashesData.r,
				"path"		: MCD.splashesData.p,
				"width"		: MCD.splashesData.w,
				"color"		: MCD.splashesData.c,
				"type": "circle"
			}
		],
		"transactionAmountBefore":[
			{
				"path"		: ["0,"+completeness[0]+"/50"],
				"width"		: ["4"],
				"radii"		: ["w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"animate"	: ["1"],
				"type"		: "arc"
			},{
				"texts" 	: [completeness[0]+"%"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"font" 		: ["normal 600 18px arial black"],
				"type" 		: "Test"
			}
		],
		"transactionAmountAfter":[
			{
				"path"		: ["0,2","0,2"],
				"width"		: ["8","2"],
				"radii"		: ["w/2-16","w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(199, 98%, 68%,.4)","hsla(199, 98%, 48%,.3)"],
				//"animate"	: ["1"],
				"type"		: "arc"
			}
		],
		"transactionNumberBefore":[
			{
				"path"		: ["0,"+completeness[1]+"/50"],
				"width"		: ["4"],
				"radii"		: ["w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"animate"	: ["1"],
				"type"		: "arc"
			},{
				"texts" 	: [completeness[1]+"%"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"font" 		: ["normal 600 18px arial black"],
				"type" 		: "Test"
			}
		],
		"transactionNumberAfter":[
			{
				"path"		: ["0,2","0,2"],
				"width"		: ["8","2"],
				"radii"		: ["w/2-16","w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(199, 98%, 68%,.4)","hsla(199, 98%, 48%,.3)"],
				//"animate"	: ["1"],
				"type"		: "arc"
			}
		],
		"registeringBefore":[
			{
				"path"		: ["0,"+completeness[2]+"/50"],
				"width"		: ["4"],
				"radii"		: ["w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"animate"	: ["1"],
				"type"		: "arc"
			},{
				"texts" 	: [completeness[2]+"%"],
				"color"		: ["hsla(184,100%,49%,1)"],
				"font" 		: ["normal 600 18px arial black"],
				"type" 		: "Test"
			}
		],
		"registeringAfter":[
			{
				"path"		: ["0,2","0,2"],
				"width"		: ["8","2"],
				"radii"		: ["w/2-16","w/2-25"],
				"speed"		: ["1"],
				"color"		: ["hsla(199, 98%, 68%,.4)","hsla(199, 98%, 48%,.3)"],
				//"animate"	: ["1"],
				"type"		: "arc"
			}
		]
	};
	
	/* 备份数据格式，用来绘制新的数据 */
	MCD.values = {};
	return MCD;
}
