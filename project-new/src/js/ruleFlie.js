function ruleConfiguration(params){
	this.data					= params.data; 										// 初始数据;
	this.dataInitName           = params.dataName 				|| ""; 				// 初始数据对象名（防止污染）
	this.queryBut				= params.queryBut;									// 搜索按钮
	this.queryIpt				= params.queryIpt;									// 搜索输入框（对应规则列表）
	this.selectBut				= params.selectBut									// 下拉列表
	this.selectIpt				= params.selectIpt;									// 下拉列表输入框（对应规则片段）
	this.submit					= params.submit;									// 提交
	this.fieldFilterKeywords 	= "";												// 用来筛选字段的关键字（搜索时使用）
	this.currentValueKey		= params.dataName 				|| ""; 				// 当前值对应的索引（递归时使用）
	this.currentDataType		= null; 											// 当前数据类型 （递归时使用）
	this.tagDataType 			= false; 											// 标记整个规则列表中是否存在数组格式，默认不存在
	this.ruleListModuleBox		= params.ruleListModuleBox 		|| "body";			// 显示规则列表模块的dom
	this.ruleListWrap			= params.ruleListModule 		|| "#ruleModule";   // 规则名列表模块id
	this.ruleListData 			= [];												// 规则列表数据(数据重组后的值,以数组形式存在) 
	this.ruleListhtml 			= "";												// 规则列表的dom结构
	//this.ruleFragmentModuleBox 	= params.ruleFragmentModuleBox 	|| 'body';		// 显示规则片段模块的dom
	this.ruleFragmentModuleBox 	= params.ruleListModuleBox 	|| 'body';				// 显示规则片段模块的dom
	this.ruleFragmentWrap		= params.ruleFragmentModule 	|| "#JSONoutput";	// 规则片段模块id 
	this.ruleFragmenthtml 		= "";												// 规则片段的dom结构
	this.ruleFragmentStartSign	= false; 											// 规则片段的dom结构开始标签的符号 [] || {} 
	this.VM						= params.VM;										// VUE实例
	// this重定向
	var self = this; 
	// 解析当前数据类型
	this.resolvedType = function(currentData){
		if(typeof currentData == 'object') {
			if(currentData.length) {
				self.currentDataType = "array";
			} else {
				self.currentDataType = "object";
			}
		} else {
			self.currentDataType = "string";
		}
	};
	// 创建模块
	this.MB = {
		"RLM" : { // 创建规则列模块
			// 重组数据
			set : function(data,dataName){
				self.resolvedType(data);
				if(self.currentDataType == "array"){
					self.tagDataType = "array"; // 存在数组
					for(var i = 0; i < data.length; i++){
						self.currentValueKey = dataName + '[' + i + ']';
						self.MB.RLM.set(data[i], self.currentValueKey);
					}
				}else
				if(self.currentDataType == "object"){
					for(var k in data){
						self.currentValueKey = dataName + '.' + k;
						self.MB.RLM.set(data[k], self.currentValueKey);
					}
				}else
				if(self.currentDataType == "string"){
					self.ruleListData.push(self.currentValueKey + ':' + data);
				};
			},
			// 生成dom结构
			get : function(data,dataName){
				self.MB.RLM.set(data,dataName);
				if(!self.ruleListData)return;
				for(var i = 0; i < self.ruleListData.length; i++){
					var k = self.ruleListData[i].substr(0,self.ruleListData[i].indexOf(":")),
						v = self.ruleListData[i].substr(self.ruleListData[i].indexOf(":")+1,self.ruleListData[i].length);
					// 过滤掉不能作为规则类名的字段	
					if(!isNaN(Number(v))){continue};
					// 长度>20 & 不存在中文
					if(v.length > 20 && v.match(/[^\x00-\xff]/ig) == null){continue};
					self.ruleListhtml += '<tr><th>'+k+'</th><td class="rule-item" data-key="'+k+'">'+v+'</td></tr>';
				};
				self.ruleListhtml =  '<div id="'+self.ruleListWrap.split('#')[1]+'" class="ruleModule" data-type="'+self.tagDataType+'" data-show="'+ self.queryIpt +'")>'
									+'<table border="" class="ruleModule-items"><tr class="tr-head"><th>key <i>（点击这里关闭）</i></th><th>计算字段名</th></tr>'
									+self.ruleListhtml+ '</table></div>';
				$(self.ruleListModuleBox).append(self.ruleListhtml);
			}
		},
		"RFM" :{ //  创建规则片段模块
			// 递归循环数据生成 不完整dom
			set : function(data,dataName,key){
				self.resolvedType(data);
				if(self.currentDataType === "array") {
					if(!self.ruleFragmentStartSign){ // 首次加载？不生成 '<ul><p>[</p>'
						self.ruleFragmentStartSign = ["[","]"];
					}else{
						if(!key){
							self.ruleFragmenthtml += '<ul data-type="'+ self.currentDataType +'" data-key="'+ dataName +'"><p>[</p>';
						}else{
							self.ruleFragmenthtml += '<ul data-type="'+ self.currentDataType +'" data-key="'+ dataName +'"><p>"'+key+'" :[</p>';
						}
					}
					// 递归循环
					for(var i = 0; i < data.length; i++) {
						self.currentValueKey = dataName + '[' + i + ']';
						self.MB.RFM.set(data[i], currentValueKey);
					}
					self.ruleFragmenthtml += '<p>]</p></ul>';
				}else
				if(self.currentDataType === "object") {
					if(!self.ruleFragmentStartSign){  // 首次加载？不生成 '<ul><p>{</p>'
						self.ruleFragmentStartSign = ["{","}"];
					}else{
						if(!key){
							self.ruleFragmenthtml += '<ul data-type="'+ self.currentDataType +'" data-key="'+ dataName +'"><p>{</p>';
						}else{
							self.ruleFragmenthtml += '<ul data-type="'+ self.currentDataType +'" data-key="'+ dataName +'"><p>"'+key+'" :{</p>';
						}
					}
					for(var k in data) {
						self.currentValueKey = dataName + '.' + k;
						self.MB.RFM.set(data[k], self.currentValueKey,k);
					}
					self.ruleFragmenthtml += '<p>}</p></ul>';
				}else
				if(self.currentDataType == "string"){
					self.ruleFragmenthtml += '<li>';
					if(!dataName || dataName == undefined){
						dataName == "";
					}else{
						self.ruleFragmenthtml += '<i data-key="'+ dataName +'">"'+key+'" :</i>';
					};
					self.ruleFragmenthtml += '<a href="javascript:;"data-key="'+ dataName +'"  class="rule-item">"'+data+'"</a></li>';
				}
			},
			// 生成完整dom结构
			get : function(data,dataName){
				self.MB.RFM.set(data,dataName);
				self.ruleFragmenthtml = '<ul id="'+self.ruleFragmentWrap.split('#')[1]+'" class="ruleModule" data-show="'+ self.selectIpt +'">'
										+'<p>'+self.ruleFragmentStartSign[0]+'</p>'
										+ self.ruleFragmenthtml
										+'</ul>';
				$(self.ruleFragmentModuleBox).append(self.ruleFragmenthtml);
			}
		}
	};
	// 功能模块
	this.behaviorControl = {
		"errorRule":function(val,RFW){ // 行为规则设定
			var tipText = false;
			if(!isNaN(Number(val)) && val.length > 0){
				tipText = "非法字段，不可以用 纯数字 做规则名！";
			}else 
			if(String(val) == "true" || String(val) == "false"){
				tipText = "非法字段，不可以用 “true” 或  “false” 做规则名！";
			}else
			if(val.length < 1 && $(self.ruleListWrap).attr('data-type') == "array"){// 规则列存在数组，必须选一个规则类名
				tipText = "规则类名存在数组，请先选择规则名！";
			}else 
			if(typeof val == "object" && val.parents('ul[data-type = "array"]').length > 0){ // 规则片段中数组不可选
				val = val.parents('ul[data-type = "array"]').attr("data-key");
				val = val.split("[")[0];
				val = val.substr(val.lastIndexOf(".")+1,val.length);
				tipText =  "请以 '"+val+"' 上层的信息作为规则名！";
			}else
			if(RFW && val.length > 1 && !$(self.queryIpt).attr("data-key")){
				tipText =  "非法字段，当前字段不是一个有效的规则名！";
			};
			if(tipText){
				self.VM.computedFieldlistModuleShow = false; // 计算字段列表模块隐藏
			}
			return tipText;
		},
		"stateInit" : function(){ // 状态初始化
			$(self.ruleListWrap).find('tr').show(); // 规则列模块全显示 
			$(self.ruleFragmentWrap).remove(); 		// 规则片段模块每次都删除重建
			self.ruleFragmenthtml 		= "";		// 规则片段的dom结构 
			self.ruleFragmentStartSign	= false;    // 规则片段的dom结构开始标签的符号 [] || {}
		},
		"search" : function(){// 规则列表搜索
			self.behaviorControl.stateInit();
			var val = $(self.queryIpt).val();
			if(val.length < 1){
				$(self.queryIpt).attr("data-key","");
				return;
			}; // 规则类可以可以为空，
			var tip = self.behaviorControl.errorRule(val);
			if(tip){// 不为空时判断所选规则类名是否合法
				return alert(tip);
			} 
			self.behaviorControl.matchingInformation(val);
		},
		"pulldown": function(){// 规则片段展示
			self.behaviorControl.stateInit();
			var ruleSegment = $(self.queryIpt).attr("data-key"); // 根据选择的规则类名 展示所属的规则片段
			var tip = self.behaviorControl.errorRule($(self.queryIpt).val(),true);
			if(tip){// 判断所选规则类名是否合法
				return alert(tip);
			};
			// 规则类名对应的KEY不存在，或者KEY就是数据顶层对象
			if(!ruleSegment || ruleSegment == undefined || String(ruleSegment) == self.dataInitName){
				ruleSegment = self.data;
			}else{
				ruleSegment = eval("self.data"+ruleSegment.split(self.dataInitName)[1]);
			};
			self.behaviorControl.matchingInformation(ruleSegment,true);
		},
		"matchingInformation":function(keyword,fragment){ // 匹配到的数据
			if(!fragment){// 匹配规则列
				$(ruleListWrap).find(".rule-item").each(function(){
					if($(this).text().indexOf(keyword) < 0){ // 当前内容不包含关键字？
						$(this).parent().hide();
					};
				})
			}else{// 匹配规则片段
				self.MB.RFM.get(keyword,self.dataInitName);// 解析数据，生成规则片段dom
				// 点击json片段中规则名，判断是否合法
				$(self.ruleFragmentWrap).find(".rule-item").click(function(){
					self.behaviorControl.changeVal(this,true);
					self.behaviorControl.stateInit();
				});
			}
		},
		"changeVal":function(event,specificRules){// 选择规则名，改变input值
			var val	= $(event).text(),
				k 	= $(event).attr("data-key"),
				ipt = $(event).parents('.ruleModule').attr('data-show'); // 当前规则列表对应的input
			var tip = self.behaviorControl.errorRule(val); 
			if(tip){// 判断所选规则类名是否合法
				return alert(tip);
			};	
			if(specificRules){ // 规则名
				tip = self.behaviorControl.errorRule(val);
				if(tip){// 当前选择的规则存在数组结构，不合法
					return alert(tip);
				};	
				k = k.substr(k.indexOf(".")+1 , k.length);
			}else{// 规则类
				k = k.substr(0,k.lastIndexOf("."));
			}
			var $obj = eval("self.VM."+$(ipt).attr("data-model"));// 改变vue实例中的data数据
				if($(ipt).attr("placeholder").indexOf('禁止输入') > -1){ // 计算依赖字段
					$obj.cal_sub_fields 		= val;
					$obj.cal_sub_fields_key 	= k;
				}else{// 计算字段
					$obj.calculate_fields 		= val;
					$obj.calculate_fields_key 	= k;
				}
			self.behaviorControl.stateInit();
		},
		// 监听规则类input，发生变化时 规则名input清空 key&val;
		"ruleListInputOncellchange" : {
			set:function(val){ //  规则类改变前的值，监听input1值
				$(self.queryIpt).attr('valueBeforeRuleChanges',val);
			},
			get:function(val){
				if($(self.queryIpt).attr('valueBeforeRuleChanges') != val){// 失去焦点时值有被改动过
					var queryIptObj  = eval("self.VM."+$(self.queryIpt).attr("data-model")), //  改变vue实例中的data数据
						selectIptObj = eval("self.VM."+$(self.selectIpt).attr("data-model"));
						queryIptObj.key	= "";
						selectIptObj.val= "";
						selectIptObj.key= "";
					$(self.queryIpt).attr("valueBeforeRuleChanges",val); // 格式化自定义属性
					self.behaviorControl.stateInit();
					self.behaviorControl.matchingInformation(val); // 匹配对应字段
				}
			}
		},
		// 提交正确规则
		"submitData":function(){
			// 用于提交的完整KEY
			var submit_key = "";
			k = $(self.queryIpt).val()+'_'+$(self.queryIpt).attr("data-key")+'.'+$(self.selectIpt).attr("data-key");
			k = k.replace(/\[.*?\]/g,'[]');
			k = k.replace(/\"/g,"");
			//console.log(k); // 发送到后台数据  
		}
	}
	// 运行
	this.startup = function(){
		self.MB.RLM.get(self.data,self.currentValueKey);// 生成规则列
		// 规则点击监听
		$(self.queryBut).click(self.behaviorControl.search);
		$(self.selectBut).click(self.behaviorControl.pulldown);
		$(self.ruleListWrap).find(".rule-item").click(function(event){
			//event.preventDefault()
			self.behaviorControl.changeVal(this);
		});
		// 监听 规则类input
		$(self.queryIpt).focus(function(){
			self.behaviorControl.ruleListInputOncellchange.set($(this).val());
		});
		$(self.queryIpt).blur(function(){
			self.behaviorControl.ruleListInputOncellchange.get($(this).val());
		});
		// submit
		$(self.submit).click(self.behaviorControl.submitData);
		$(document).click(function(event){
			// 点击对象为弹出规则模块 || 弹出规则模块为显示状态
			if($(event.target).parents(self.ruleListModuleBox).length > 0 || !$(self.ruleListModuleBox).is(":hidden")){
				if($(self.ruleFragmentWrap).is(":hidden").length > 0){ // 规则片段模块存在？
					$(self.ruleFragmentWrap).remove();
				}
				self.VM.computedFieldlistModuleShow = false;// 计算字段列表模块隐藏
			}
		})
	};
	this.startup();
};
module.exports = ruleConfiguration;
