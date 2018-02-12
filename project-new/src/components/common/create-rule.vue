<template>
	<div id="create-rule" v-if="action">
		<!--  新增规则form  -->
		<section class="modal">
			<p class="bar toolbar" style="text-align: center;line-height: 250%;">
				{{this.$route.query.action=="create"?"新建规则":"修改规则"}}
				<span class="toolbar-but">
					<back :params="{name:'ruleConfig'}"></back>
				</span>
				<span class="toolbar-but reset icon-hover" @click="reset()">
					<svg-icon class="icons" id="icon-zhongzhi1"></svg-icon>
				</span>
			</p>
			<section class="rule-config-main">
				<ul class="select-items">
					<li class="select-itme">
						<label class="select-itme-label">规则名称  :</label>
						<div class="select-itme-inputbox">
							<input type="text" placeholder="请输入规则名" v-model="pageData.modifyData.rule_name" style="text-align: center;" />
						</div>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">规则描述 :</label>
						<select class="select-itme-inputbox" v-model="pageData.modifyData.desc">
							<option value="命中匹配字段" selected="selected">命中匹配字段</option>
							<option value="未命中匹配字段">未命中匹配字段</option>
						</select>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">命中动作 :</label>
						<select class="select-itme-inputbox" v-model="pageData.modifyData.approve_action">
							<option value="通过" selected="selected">通过</option>
							<option value="拒绝">拒绝</option>
							<option value="人工审核">人工审核</option>
						</select>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">提交字段 :</label>
						<select class="select-itme-inputbox" v-model="pageData.modifyData.submit_field">
							<option value="手机号" selected="selected">手机号</option>
							<option value="身份证">身份证</option>
						</select>
					</li>
					<li class="select-itme">
						<label class="select-itme-label ">计算字段 :</label>
						<div class="select-itme-inputbox select-itme-countField">
							<input type="text" placeholder="点击右侧按钮输入" id="query-rule" readonly
								v-model="pageData.modifyData.calculate_field" :data-key="pageData.modifyData.calculate_field_key" />
							<div class="searchBox calculate_field_search" @click="interfaceSelection('request')">
								<svg-icon class="query-rule queryIcon" id="icon-xingtaiduICON_sousuo--"></svg-icon>
							</div>
						</div>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">计算依赖字段类型 :</label>
						<div class="select-itme-inputbox" style="background-color: #f2f2f2;">
							<input type="text"  id="depend-field-type" style="text-align: center;background-color: #f2f2f2;" readonly
								v-model="pageData.modifyData.cal_depend_field_type"/>
						</div>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">计算依赖字段 :</label>
						<div class="select-itme-inputbox  select-itme-countField">
							<input type="text" placeholder="点击右侧按钮输入" id="selection-rule" readonly
								v-model="pageData.modifyData.cal_depend_field" :data-key="pageData.modifyData.cal_depend_field_key"/>
							<div class="selection-rule query-button" @click="dependFieldConfig('request')"></div>
						</div>
					</li>
					<li class="select-itme">
						<label class="select-itme-label">匹配模式 :</label>
						<select class="select-itme-inputbox" v-model="pageData.modifyData.match_mode && pageData.defaultMatchingMode">
							<option value="布尔函数" selected="selected">布尔函数</option>
							<option value="加权计算">加权计算</option>
						</select>
					</li>
					<li class="select-itme"  v-show="pageData.defaultMatchingMode == '加权计算'">
						<label class="select-itme-label">比较 :</label>
						<select class="select-itme-inputbox" style="text-align: center;  text-align-last: center;"
							v-model="pageData.modifyData.calculate_type">
							<option value=">" selected="selected">></option>
							<option value=">=">>=</option>
							<option value="<"> < </option>
							<option value="<="><=</option>
							<option value="=">=</option>
							<option value="!=">!=</option>
							<option value="===">===</option>
						</select>
					</li>
					<li class="select-itme" v-show="pageData.defaultMatchingMode == '加权计算'">
						<label class="select-itme-label">阈值:</label>
						<div class="select-itme-inputbox">
							<input type="text" placeholder="请输入..." v-model="pageData.modifyData.threshold"/>
						</div>
					</li>
					<li class="select-itme"  v-show="pageData.defaultMatchingMode == '加权计算'">
						<label class="select-itme-label">权重:</label>
						<div class="select-itme-inputbox select-itme-weight">
							<input type="text" placeholder="请输入..." v-model="pageData.modifyData.base_weight"/> 
							+
							<input type="text" placeholder="请输入..." v-model="pageData.modifyData.cfit_weight"/> 
							x<i>  返回值</i>
						</div>
					</li>
					<li class="select-itme">
						<div class="select-itme-inputbox save marginTop">
							<input type="button" id="rule-submit" @click="subData()" value="保存" />
						</div>
					</li>
				</ul>
			</section>
		</section>
		<!-- 接口列表 -->
		<interface-list v-show="module_display.interfaces" @upup="interfaceSelection"></interface-list>
		<!-- 计算字段配置 -->
		<calculated-fields v-show="module_display.calculated_field" :param="moudule_data.calculated_field"  @upup="calculatedFieldConfig"></calculated-fields>
		<!-- 计算依赖字段配置 -->
		<depend-fields v-show="module_display.depend_field"  @upup="dependFieldConfig" ref="dependencyField"></depend-fields>
		<!-- 计算依赖字段筛选-->
		<depend-fields-filter v-show="module_display.depend_field_filter"  @upup="filterFieldConfig" ref="dependencyFilter"></depend-fields-filter>
	</div>
</template>

<script>
	import interface_response_data	from "./../../json/v3-1-12.json" // 接口响应的 初始规则配置数据
	import format_calculated_fields from "./../../js/format-interface-data" // 格式化 接口计算字段列表
	import format_depend_fields 	from "./../../js/format-dependency-field-data" // 格式化 接口计算依赖字段列表
	// 组件
	import InterfaceList			from "./rule-config-modules/interface.vue" // 接口列表组件
	import CalculatedFields			from "./rule-config-modules/interface-fields.vue" // 接口计算字段列表
	import DependFields				from "./rule-config-modules/interface-dependency-field.vue" // 接口计算依赖字段列表
	import DependFieldsFilter		from "./rule-config-modules/dependency-filter.vue" // 接口计算依赖字段 --> 字段筛选
	
	export default{
		name:'create-rule',
		data(){
			return{
				action:false,// 视图层渲染开关
				response:false,// Ajax响应状态
				initData:interface_response_data,// 选中接口的初始数据
				module_display:{// 控制组件显示状态
					interfaces:false,
					calculated_field:false,
					depend_field:false,
					depend_field_filter:false
				},
				moudule_data:{
					interfaces:false,
					calculated_field:false,
					depend_field:false,
					depend_field_filter:false
				},
				pageData:{
					defaultMatchingMode:'布尔函数',// 默认匹配模式 (布尔函数 | 加权计算)
					rawData : { // 原始数据
						'rule_name': '', // 规则名
						'rule_id': '', // 规则id
						'interface_id':-1,
						'desc': '命中匹配字段', // 描述
						'create_author': '', // 创建人
						'modify_author': '', // 修改人
						'approve_action': '通过', // 命中动作
						'submit_field': '手机号', // 提交字段
						'calculate_field': '', // 计算字段
						'calculate_field_key':'',// 计算字段值对应 数据链key
						'cal_depend_field': '', // 计算依赖字段
						'cal_depend_field_type': '', // 计算依赖字段类型
						'cal_depend_field_key': '',// 计算字段值对应 数据链key
						'cal_type_2_cal_field': '', // 计算依赖字段类型2
						'cal_type_3_cal_field': '', // 计算依赖字段类型3
						'cal_type_3_cal_dep_field': '', // 计算依赖字段类型3
						'match_mode': '布尔函数', // 匹配模式
						"calculate_type": '>', // 比较
						"threshold": '', // 阈值
						"base_weight": '', // 第一个权重值
						"cfit_weight": '', // 第二个权重值
						"enabled":0,//当前规则执行状态 (执行中：1 || 未执行：0)
						'state': '' // 状态
					},
					modifyData:{}// 修改数据
				}
			}
		},
		watch:{
			response(curVal,oldval){ 
				if(curVal.code == 1){
					if(curVal.message == '修改成功' || curVal.message == '新增成功'){
						alert(curVal.message);
						this.$router.push("/riskStrategy/ruleConfig");		
					}else{// 当前规则数据请求成功
						this.modifyRuleFormat(curVal.message[0]);
					}
				}else{
					this.$router.push("/riskStrategy/ruleConfig");
					return alert('请求失败，请稍后重试 ...');
				}
			},
		},
		components:{
			"interface-list":InterfaceList,
			"calculated-fields":CalculatedFields,
			"depend-fields":DependFields,
			"depend-fields-filter":DependFieldsFilter
		},
		mounted(){
			this.ready();
		},
		methods:{
			ready(){// 初始化
				this.pageData.modifyData = JSON.parse(JSON.stringify(this.pageData.rawData));
				this.calculatedFieldDataFormat(interface_response_data);
				if(this.$route.query.action == 'modify'){// 修改规则
					this.sendRequest(this,'/rule/ruleGoodsCatagory?select_rows={"rule_id":'+this.$route.query.id+'}','response');// 全部关联表数据
				}
				this.action = true;
			},
			interfaceSelection(msg){// 点击“计算字段”按钮，显示接口模块
				if(msg == 'request'){// 发出请求
					this.module_display.interfaces = true;
				}else{// 子组件返回值
					this.module_display.interfaces = false;
					if(msg.id > -1){
						this.module_display.calculated_field = true;
						this.pageData.modifyData.interface_id = msg.id;
					}
				}
			},
			calculatedFieldConfig(msg){// 点击“接口”，显示对应"计算字段"模块。进行配置
				if(msg == 'request'){// 发出请求
					this.module_display.calculated_field = true;
				}else{// 子组件返回值
					this.module_display.calculated_field = false;
					if(msg.val.length > 0){
						// 计算字段发生变化
						this.pageData.modifyData.calculate_field_key = msg.key;
						this.pageData.modifyData.calculate_field = msg.val;
						// 清空计算依赖字段内容
						this.pageData.modifyData.cal_depend_field_key = "";
						this.pageData.modifyData.cal_depend_field = "";
						this.pageData.modifyData.cal_depend_field_type= "";
						// 获取选中的计算字段的数据片段，并进行格式化
						let obj = this.pageData.modifyData.calculate_field_key.replace('json','this.initData');
							obj = obj.substring(0,obj.lastIndexOf('.'));
						// 格式化 依赖字段
						this.dependFieldDataFormat(eval(obj));
						// 将格式化好的数据渲染成dom结构，之后显示出来
						this.$refs.dependencyField.interfaceData.htmlText = '';
						this.$refs.dependencyField.each_fieldList(this.moudule_data.depend_field);
						this.module_display.depend_field = true;
					}
				}
			},
			dependFieldConfig(msg){// 点击“计算依赖字段”按钮，显示对应模块。进行配置
				if(msg == 'request'){// 发出请求
					if(this.pageData.modifyData.calculate_field_key.length < 1){
						return alert('请先选择计算字段');
					}
					// 首次加载 依赖字段模块
					if(this.$refs.dependencyField.interfaceData.htmlText.length < 1){
						// 获取选中的计算字段的数据片段，并进行格式化
						let obj = this.pageData.modifyData.calculate_field_key.replace('json','this.initData');
							obj = obj.substring(0,obj.lastIndexOf('.'));
						// 格式化 依赖字段
						this.dependFieldDataFormat(eval(obj));
						this.$refs.dependencyField.interfaceData.htmlText = '';
						this.$refs.dependencyField.each_fieldList(this.moudule_data.depend_field);
					}
					this.module_display.depend_field = true;
				}else{// 子组件返回值
					this.module_display.depend_field = false;
					// 退出选择
					if(msg.type == undefined)return;
					let $val,$key,$type,
						str = this.pageData.modifyData.calculate_field_key.replace('json','this.initData'),
						arr = eval(str.substring(0,str.lastIndexOf('.'))+msg['key'].split('json')[1]);// 获取选中的数组包含的数据
					if(msg.type == 0){// 显示对应接口数据
						$type= 0;
						$val = msg.val;
						$key = msg['key'];
					}else
					if(msg.type == 1){// 显示数组长度
						$type= 1;
						$val = 'list='+arr.length;
						$key = msg['key'];
					}else
					if(msg.type == 2){// 显示  依赖字段筛选模块
						this.$refs.dependencyFilter.str = msg['key'];
						this.$refs.dependencyFilter.formatData(arr);
						this.module_display.depend_field_filter = true;// 依赖字段筛选模块
						return;
					}
					// 改变 依赖字段相关参数
					this.pageData.modifyData.cal_depend_field_type 	= $type;
					this.pageData.modifyData.cal_depend_field 		= $val;
					this.pageData.modifyData.cal_depend_field_key 	= $key;
				}
			},
			filterFieldConfig(msg){// 点击“计算依赖数组中内容”，显示对应模块。进行配置
				this.module_display.depend_field_filter = false;
				if(msg.val){// 获取对应接口的数据
					let $val,$key,$type;
					this.pageData.modifyData.cal_type_2_cal_field = "";
					this.pageData.modifyData.cal_type_3_cal_field = "";
					this.pageData.modifyData.cal_type_3_cal_dep_field =	"";
					if(msg.val instanceof Object){
						$type= 3;
						$val = msg.val.name.split('=')[0]+'=>'+msg.val.val.split('=')[0];
						$key = msg.val.name.split('=')[1];
						this.pageData.modifyData.cal_type_3_cal_field = msg.val.name.split('=')[0];
						this.pageData.modifyData.cal_type_3_cal_dep_field =	msg.val.val.split('=')[0];
					}else{
						$type= 2;
						$val = msg.val.split('=')[0];
						$key = msg.val.split('=')[1];
						this.pageData.modifyData.cal_type_2_cal_field = $val;
					}
					this.pageData.modifyData.cal_depend_field_type 	= $type;
					this.pageData.modifyData.cal_depend_field 		= $val;
					this.pageData.modifyData.cal_depend_field_key 	= $key
				}
			},
			modifyRuleFormat(msg){// 当前操作是“修改规则”进行格式化 
				for(let k in this.pageData.rawData){
					if(msg[k]){
						this.pageData.modifyData[k] = msg[k];
						if(k == "match_mode"){
							this.pageData.defaultMatchingMode = (msg[k] == 1?"加权计算":"布尔函数");
							continue;
						}
						if(k == 'calculate_field'||k == 'cal_depend_field'){
							continue;
						}
					}
				}
				// 计算字段
				if(msg.calculate_field){
					let $key = msg.calculate_field.split('=')[0].split('[]')[0],
						$val = msg.calculate_field.split('=')[1],
						obj	 = null;
					this.pageData.modifyData['calculate_field']  = $val;
					obj = eval($key.replace('json','this.initData'));
					// 错误字段
					if(!obj)return;
					innerloop:
					for(let i = 0; i < obj.length; i++){
	           			let $rows = obj[i];
           				for(let j in $rows){
	           				if($rows[j] == $val){
	           					$key = $key+'['+i+'].'+j;
								break innerloop;
	           				}
	           			}
	           		}
					this.pageData.modifyData.calculate_field	= $val || ''; // 计算字段输入框的值
	                this.pageData.modifyData.calculate_field_key= $key; // 计算字段输入框值 对应的  数据链key
				}
				// 计算依赖字段
				if(msg.cal_depend_field){
					let depend_field = msg.cal_depend_field;
					if(msg.cal_depend_field_type == 2){
	                	depend_field = msg.cal_type_2_cal_field;
	                }else if(msg.cal_depend_field_type == 3){
	                	depend_field = msg.cal_type_3_cal_field+'=>'+msg.cal_type_3_cal_dep_field;
	                }
	                this.pageData.modifyData.cal_depend_field = depend_field;
	                this.pageData.modifyData.cal_depend_field_key	= msg.cal_depend_field;
				}
			},
			calculatedFieldDataFormat(msg){// “计算字段”数据格式化
				if(!msg)return;
				this.moudule_data.calculated_field = format_calculated_fields(msg);
			},
			dependFieldDataFormat(msg){// “依赖字段”数据格式化
				if(!msg)return;
				this.moudule_data.depend_field = format_depend_fields(msg);
			},
			filterFieldsDataFormat(msg){// “依赖字段筛选”数据格式化
				if(!msg)return;
			},
			reset(){// 页面重置
				this.pageData.modifyData = JSON.parse(JSON.stringify(this.pageData.rawData));
			},
			subData(){
				var $keyArr = ['rule_name','interface_id','desc','enabled','approve_action','cal_depend_field_type','cal_type_2_cal_field','cal_type_3_cal_field','cal_type_3_cal_dep_field','submit_field','modify_author'],
					modifyData = this.pageData.modifyData,
					submitData = {};// 提交字段
				// 提交字段效验
				if(modifyData.rule_name.length < 1){
					return '请输入"规则名称"!';
				}
				if(this.pageData.defaultMatchingMode == '加权计算'){
					if(modifyData.calculate_type.length < 1){
						return '"加权计算"模式下 "比较"选项必选！';
					}else if(modifyData.threshold.length < 1){
						return '"加权计算"模式下 "阈值"选项必填！';
					}else if(modifyData.base_weight.length < 1 || modifyData.cfit_weight.length < 1){
						return '"加权计算"模式下 "权重"选项必填！';
					}else{
						submitData.match_mode = '1';
						submitData.calculate_type	= modifyData.calculate_type;
						submitData.threshold		= modifyData.threshold;
						submitData.base_weight	 	= modifyData.base_weight;
						submitData.cfit_weight	 	= modifyData.cfit_weight;
					}
				}else{
					if(modifyData.calculate_field.length < 1){
						return '"布尔函数"模式下 "计算字段"选项必选！';
					}else if(modifyData.cal_depend_field.length < 1){
						return '"布尔函数"模式下 "计算依赖字段"选项必选！';
					}else{
						var cf_key = this.pageData.modifyData.calculate_field_key; // 计算字段值对应的key
							cf_key = cf_key.replace(/\[.*?\]/g,'[]').replace(/\"/g,"");
							cf_key = cf_key +'='+ modifyData.calculate_field;
						submitData.match_mode = '0';
						submitData.calculate_field = cf_key;// 计算字段
						submitData.cal_depend_field	= modifyData.cal_depend_field_key;// 计算依赖字段
						submitData.calculate_type	= "";
						submitData.threshold		= "";
						submitData.base_weight	 	= "";
						submitData.cfit_weight 		= "";
					}
				}
				// 其他字段
				for(var i = 0; i < $keyArr.length; i++){
					submitData[$keyArr[i]] = modifyData[$keyArr[i]];
				}
				
				if(this.$route.query.action == "create"){ // 新增规则
					this.sendRequest(this,'/rule/ruleGoodsCatagory?insert_rows='+JSON.stringify(submitData),'response');
				}else{ // 修改规则
					submitData['rule_id'] = modifyData['rule_id'];
					this.sendRequest(this,'/rule/ruleGoodsCatagory?update_rows='+JSON.stringify(submitData),'response');
				}
			}
		}
	}
</script>

<style type="text/less" lang="less">
	#create-rule{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		.modal{ 
			position:relative;
			width: 100%;
			height: 100%; 
			border-radius: 5px;
			background:#fff;
			overflow: hidden;
			.rule-config-main{ 
				height: 100%;
				padding: 30px;
				padding-top: 90px;
				padding-right: 15px;
				margin: 0 auto;
				max-width: 600px;
				overflow-y: auto;
				.select-items{ 
					.select-itme{
						display: block;
						padding:10px 0; 
						.select-itme-label,
						.select-itme-inputbox{
							display: inline-block;
							width: 48%;
							height: 30px;
							line-height: 30px;
						}
						.select-itme-label{ 
							width: 43%;
							padding-right:10%;
							min-width: 120px;
							text-align:right;
						}
						.select-itme-inputbox{
							position: relative;
							cursor: pointer;
							overflow: hidden;
							vertical-align: bottom;
							min-width: 240px;
							border:1px solid #c3c3c3; 
							border-radius: 3px;
							input{ 
								position: relative;
								top: -2px;
								height:100%;
								width: 100%;
								text-align:center; 
								border: none;
							}
							&.save{ 
								width:35%; 
								transform: translateX(57%);
								border-radius:3px;
								border:none;
								input{ 
									top: -1.5px;
									color:#fff;
									background:#34b2c9;
									cursor:pointer;
									border:1px solid #eee;
								}
							} 
							&.marginTop{ 
								margin-top:40px; 
							}  
							&.select-itme-countField{/* 计算字段& 计算依赖字段 */
								input[type='text']{
									min-width: auto;
									width:calc(~"100% - 27px");
									height: 100%;
									border:none;
								}
								input[readonly="readonly"]{
									min-width: auto;
									background-color: #F2F2F2;
								}
								.searchBox{
									position:absolute;
									padding:0 8px;
									width:30px;
									height:30px;
									top:0px;
									right:0px;
									&.calculate_field_search:hover{
                            			background-color: #ffe084;
									}
								}
								.query-button{
									position: absolute;
									top: 0;
									right: 0;
									margin: 0;
									padding: 15px;
									&:hover{
										cursor: pointer;
										&:before{
											border: 14px solid #ffe084;
										}
									}
									&:before{
										position: absolute;
										content: "";
										top: 0px;
										right: 0px;
									}
									&.query-rule{
										&:after{
											position: absolute;
											content: "\2705";
											top: 0px;
											right: 7px;
											text-align: center;
											color: green;
										}
									}
									&.selection-rule{
										&:after{
											position: absolute;
											content: "";
											top: 11px;
											right: 10px;
											border: 3px solid transparent;
											border-top-width: 7px;
											border-top-color: #000;
										}
									}
								}
							}
							&.select-itme-weight{/*权重*/
								border:none;
								input{
									top: -1px;
									min-width: 50px;
									height:28px;
									width: 25%;
									border:1px solid #C3C3C3;
									border-radius: 3px;
									text-align: center;
									margin-right: 4%;
								}
								input:nth-of-type(2){
									margin-left: 4%;
								}
								i{
									display: inline-block;
									padding-left: 5%;
									font-size: .9em;
								}
								
							}
						}
					}
				} 
			} 
		} 
	}
</style>