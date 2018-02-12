<template>
    <div class="details-wrap" id="detailInfo" v-if="action">
        <header class="details-head details-wrap-moudel">
            <back :params="{name:details.detailName}"></back>
            <ul class="details-head-toolbar"><!-- 工具栏 -->
            	<!-- 只有'未上架'的产品 || ('未执行'|'未使用') 的规则集  才可以修改 -->
            	<template v-if="details.pagePointing == 'product'||(detailData.pagePointing == 'ruleset' && (details.rawData.state == '未执行'||details.rawData.state == null))">
            		<li v-show="!details.modify" v-if="details.pagePointing == 'product'||(detailData.pagePointing == 'ruleset' && (details.rawData.state == '未执行'||details.rawData.state == null))"
            			class="details-head-toolbar-item details-head-toolbar-Modify"@click="details.modify = !details.modify;">
	                    <svg-icon id="icon-xiugaimima"></svg-icon>
	                </li>
	                <li v-show="details.modify" class="details-head-toolbar-item details-head-toolbar-Modify modifyStyle"@click="cancelChanges()">
	                   		 取消修改
	                </li>
	                <!-- 只有'未上架'的产品 || ('未使用') 的规则集  才可以删除  -->
	                <router-link tag="li" :to="{}"
	                	v-if="details.pagePointing == 'product'&&details.rawData.state == '未上架'||(detailData.pagePointing == 'ruleset' && details.rawData.state == null)"
	                	 v-show="!details.modify" @click.native="deleteProduct(detailData.rawData.id)"class="details-head-toolbar-item details-head-toolbar-delete">
                    	<svg-icon id="icon-shanchu"></svg-icon>
	                </router-link>
            	</template>
            	<!-- 非当前产品关联的规则集 都可以拥有 复制功能 -->
            	<router-link tag="li" :to="{name:'add',query:{cRouter:this.details.detailName =='product'?'product':'ruleset',action:'copy',type:$route.params.type}}" v-show="!details.modify" @click.native="copy()"
                    class="details-head-toolbar-item details-head-toolbar-copy" v-if="detailData.pagePointing !='product_ruleset'">
	                <svg-icon id="icon-fuzhi"></svg-icon>
	            </router-link>
            </ul>
            <p class="details-wrap-bar details-head-title">
                <svg-icon class="icons" id="icon-afsshujufengkong" v-if="detailData.pagePointing == 'ruleset'" v-show="$route.params.type==0"></svg-icon>
                <svg-icon class="icons" id="icon-shenhe" v-if="detailData.pagePointing == 'ruleset'" :class="{amountColor:true}" v-show="$route.params.type==1"></svg-icon>
                <span v-show="details.rawData.state == '上架中'&&details.modify||!details.modify">{{details.modify? details.variableData.name: details.rawData.name}}</span>
                <input class="titleEdit" type="text" v-show="details.modify&&details.rawData.state != '上架中'" v-model="details.variableData.name"/>
                <i class="detail-title-status" :class="[details.stateStyle]" v-show="!details.modify">
                	（{{details.modify?details.variableData.state: details.rawData.state||"未使用"}}）</i>
                <!--<i class="ruleset-type" v-if="detailData.pagePointing == 'ruleset'" v-text="$route.params.type==0?'（风控）':'（核额）'"></i>-->
                <select name="" class="executing-state-select"
                        v-if="details.detailName == 'product'"
                        v-show="details.modify" v-model="details.variableData.state">
                    <option value="未上架" selected>未上架</option>
                    <option value="上架中">上架中</option>
                </select>
            </p>
            <div class="details-head-content">
                <ul class="details-head-content-items">
                    <li class="details-head-content-item" :class="{'ruleset':(details.detailName == 'product' ? false:true)}">
                        <p class="details-head-content-item-top">{{details.detailName == 'product'? "命中规则详情":
                            "通过数量"}}</p>
                        <p class="details-head-content-item-bottom">+{{details.detailName == 'product'?
                            details.rawData.pass: details.rawData.pass}}</p>
                    </li>
                    <li class="details-head-content-item":class="{'ruleset':(details.detailName == 'product' ? false:true)}">
                        <p class="details-head-content-item-top">{{details.detailName == 'product'? "命中规则详情":
                            "拒绝数量"}}</p>
                        <p class="details-head-content-item-bottom">+{{details.detailName == 'product'?
                            details.rawData.reject: details.rawData.reject}}</p>
                    </li>
                    <li class="details-head-content-item" v-if="details.detailName == 'product'">
                        <p class="details-head-content-item-top">{{details.detailName == 'product'? "命中规则详情":
                            "人工审核"}}</p>
                        <p class="details-head-content-item-bottom">+{{details.detailName == 'product'?
                            details.rawData.audit: details.rawData.audit}}</p>
                    </li>
                    <li class="details-head-content-item":class="{'ruleset':(details.detailName == 'product' ? false:true)}">
                        <p class="details-head-content-item-top">{{details.detailName == 'product'? "命中规则详情":
                            "命中规则详情"}}</p>
                        <p class="details-head-content-item-bottom">{{details.detailName == 'product'?
                            details.rawData.hit: details.rawData.hit}}</p>
                    </li>
                </ul>
            </div>
        </header>
        <div class="details-explain details-wrap-moudel"><!-- 描述 -->
            <p class="details-wrap-bar details-explain-title">
                {{details.detailName == 'product'? "产品说明":"规则集说明"}}
            </p>
            <div class="details-explain-text" v-show="!details.modify">
                {{details.rawData.desc}}
            </div>
            <textarea rows="3" cols="100%" class="change-description" v-show="details.modify"
                      v-model="details.variableData.desc"></textarea>
        </div>
        <section class="details-main details-wrap-moudel">
            <p class="details-wrap-bar details-main-title">
                {{details.detailName == 'product'? "当前产品所包含规则集列表":"当前规则集所包含规则列表"}}
                <router-link
                        :to="{name:''+(details.detailName == 'product'? 'ruleSetConfig' : 'ruleConfig'), query:{actionName:'add-ruleset',type:$route.params.type}}"
                        v-show="details.modify &&(details.rawData.state != '已上架'|| details.rawData.state != '执行中'||details.rawData.state != '并行测试')" tag="a" class="details-main-title-added">
                    {{details.detailName == 'product'? "+添加规则集":"+添加规则"}}
                </router-link>
            </p>
            <div class="details-main-tabBox">
                <!-- 显示规则集模块 -->
                <template v-if="details.detailName == 'product'">
                    <div class="ruleSet-card"
                         v-for="row in (details.modify? details.variableData.values: details.rawData.values)"
                         ref="cardRemove">
                        <ruleset-card
                                :params="{detailsPageName:'group',action:details.modify,values:row,'allowedReturn':true}"></ruleset-card>
                        <div class="card-toolber" v-show="details.modify&&details.rawData.state != '上架中'">
                            <p class="card-tool card-tool-remove"
                               @click="productInclusiveRuleset_action({'action':'remove','val':row})">
                                <svg-icon class="icons" id="icon-shanchu"></svg-icon>
                            </p>
                            <p class="card-tool card-tool-middle card-tool-handover" v-if="row.isCloud==0"
                               @click="productInclusiveRuleset_action({'action':'handover',state:'state1','val':row})">
                                <svg-icon class="icons"
                                          :class="[row.action_state1 > -1? cardStatusStyle[row.action_state1] : false]"
                                          id="icon-2xuanzhong"></svg-icon>
                            </p>
                            <p class="card-tool card-tool-middle card-tool-handover" v-if="row.isCloud==1"
                               @click="productInclusiveRuleset_action({'action':'handover',state:'state1','val':row})">
                                <svg-icon class="icons"
                                          :class="{noDrop:true}"
                                          id="icon-2xuanzhong"></svg-icon>
                            </p>
                            <p class="card-tool card-tool-last card-tool-handover"
                               @click="productInclusiveRuleset_action({'action':'handover',state:'state2','val':row})">
                                <svg-icon class="icons"
                                          :class="[row.action_state2 > -1? cardStatusStyle[row.action_state2] : false]"
                                          id="icon-2xuanzhong"></svg-icon>
                            </p>
                        </div>
                    </div>
                </template>
                <!-- 显示规则模块 -->
                <template v-if="details.detailName == 'group'">
                    <table border="1" cellspacing="0" cellpadding="0" v-if="details.modify? details.variableData.values.length>0: details.rawData.values.length>0">
                        <tr>
                            <th v-show="details.modify">设置</th>
                            <th v-show="details.modify">是否禁用</th>
                            <th v-for="item in rulesTab">{{item}}</th>
                        </tr>
                        <template v-for="row in (details.modify? details.variableData.values: details.rawData.values)">
                            <tr ref="deleteTr" :class="{noDrop:(row.enabled == 0? true:false)}">
                                <td v-if="details.modify">
                                	<a href="javascript:;" class="tr-delete" @click="deleteRule(row.id)">删除</a>
                                </td>
                                <td v-if="details.modify" style="position: relative;">
                                    <span class="switchBox">
                                    	<switch-btn class="swith-btn"  :params="{switch:row}"></switch-btn>
                                    </span>
                                </td>
                                <td v-for="(item,key) in rulesTab">{{ row[key] }}</td>
                            </tr>
                        </template>
                    </table>
                </template>
            </div>
        </section>
        <footer class="details-foot details-wrap-moudel" v-show="details.modify" @click="saveChanges()">
            <div class="details-save-changes">保存</div>
        </footer>

        <div class="alertBox" v-show="giveData.showAlert">
            <alert-box @confirmVal="confirmVal"></alert-box>
        </div>
    </div>
</template>

<script>
    import AlertBox from './../common/Alert.vue'
    import SwitchBtn from './../common/Switch.vue'

    export default {
        name: "detailInfo",
        msgTxt: "产品",
        data() {
            return {
            	pagePointing:false,// 记录详情页面上一次操作的数据指向
                rulesetsAllData: '', // 包含的所有规则集数据
                rulesAllData: '', // 包含的所有规则数据
                action: false,// view层启动指令
                details: {},	// 详情页面所有数据
                cardStatusStyle: ["notExcute", "excute", "test", "noDrop"], // 规则集切换状态的样式
                responseStatus: false, // AXIOS 返回状态
                rulesTab: {		// 规则table展示字段
                    "rule_id": "ID",
                    "rule_name": "规则编号",
                    "desc": "规则内容",
                    "approve_action": "执行动作",
                    "threshold": "参数"
                },
                giveData: {},
                confirmStatus: {
                    isSave: false,
                    isDelete: false
                },
                changeStatusParams: '',   //当状态切换未未执行时保存未切换时的数据
                switchState:{
                    switch:false
                },
                isCloudArr:[],   //产品详情中风控的规则集集合
                isAmountArr:[]   //产品详情中核额的规则集集合
            }
        },
        components: {
            AlertBox,
            SwitchBtn
        },
        mounted() {
            this.ready();
            var newArr=this.resetsId.allResetsId.concat(this.resetsId.useInProducts);
            newArr.sort();
            this.resetsId.notUseArr=this.filterNotSame(newArr);
            //获取所有产品数据里面的所有产品名称：
            this.getName(this.allData.productsData,this.allData.productsNameArr,'product_name');
            //获取所有规则集数据里面的所有规则集名称：
            this.getName(this.allData.rulesetsData,this.allData.rulesetsNameArr,'group_name');
        },
        watch: {// 监听 axios 请求是否返回数据
            rulesetsAllData: 'formatGroupData',
            rulesAllData: 'formatRuleData',
            details:{// 监听详情页面数据指向，指向发生变化时请求数据
            	handler(val){
            		if(val.pagePointing != this.pagePointing){
            			this.pagePointing = val.pagePointing;
            			if(!this.$route.query.action && this.details.modify != 'back'){
							this.getAssociatedData();            				
							this.details.modify = false;
                    		this.detailData.allowedReturn = false;
            			}else{
            				 this.details.modify = true;
            			}
            		}
            		if(JSON.stringify(val.variableData.values)==JSON.stringify(val.rawData.values)){
                        this.isCloudArr=val.rawData.values.filter(item=>item.isCloud==0);
                        this.isAmountArr=val.rawData.values.filter(item=>item.isCloud==1);
                    }else{
                        this.isCloudArr=val.variableData.values.filter(item=>item.isCloud==0);
                        this.isAmountArr=val.variableData.values.filter(item=>item.isCloud==1);
                    }
                },
                deep:true
            },
            responseStatus(val, newVal) {
            	console.log(val)
            	
               	if (val.code == '1') {
	       			this.giveData.showAlert = true;
                   	this.giveData.showCancel = false;
                   	this.giveData.alertTxt = val.message;
                   	if(String(val.message).indexOf('删除成功') > -1){
		       			this.$router.push('/riskStrategy/products');
		       			return;
		       		}
                   	if(val.message.indexOf("修改成功") > -1){
                   		this.details.rawData = JSON.parse(JSON.stringify(this.details.variableData));// 已修改的数据覆盖原始数据
                        switch (this.details.rawData.state) {
                            case "上架中":
                                this.details.stateStyle = "execution";
                                break;
                            default :
                                this.details.stateStyle = "non-execution";
                        }
                        this.setstate(this.details.rawData);
                   	}
               } else {
                   this.giveData.alertTxt = '哎呀！ '+val.message+'....';
               }
            },
            switchState:{
                handler(val){
                    this.switchState=val;
                },
                deep:true
            }
        },
        methods: {
            ready() {
                this.giveData = this.alertParams;
                this.switchParams =this.switchGlobalParams;
                this.giveData.showAlert = false;   //是否显示弹框
				this.giveData.alertTxt = false;    //弹框内容
			    this.giveData.isConfirm = false;   //是否点击弹框的确认按钮
			    this.giveData.showCancel = false;   //是否显示弹框的取消按钮
			    this.giveData.isSave = false;
			    this.giveData.isDelete = false;
                if (!this.detailData.rawData.id) { // 刷新之后没有数据
                    this.$router.push('/riskStrategy/products');
                }
                this.details = this.detailData;
                if (!this.$route.query.action && this.details.modify != 'back') { // 当前动作不是在修改数据。(进入详情页面有两种动作  查看详细数据 & 修改详细数据)
                	//1.直接进入详情页：
                    this.details.modify = false;
                    this.detailData.allowedReturn = false;
                      this.getAssociatedData();
                } else {
                    //2.修改选择规则集／规则后进入详情页：
                    this.setstate(this.details.variableData);
                    this.action = true;
                }
            },
            getAssociatedData(){
            	if (this.details.pagePointing == 'product') {
                	this.sendRequest(this,'/ruleset/rulesetGoodsCatagory?select_rows={"product_id":'+this.details.rawData.id+'}','rulesetsAllData');// 全部关联表数据
                } else {
                	this.sendRequest(this,'/rule/ruleGoodsCatagory?select_rows={"ruleset_id":'+this.details.rawData.id+'}','rulesAllData');// 全部关联表数据
                }
            },
            cancelChanges() {// 取消修改，状态复原
                this.details.modify = !this.details.modify;
                this.details.variableData = JSON.parse(JSON.stringify(this.details.rawData));
            },
            saveChanges() {// 保存修改，覆盖原始数据。发送请求
                var self=this;
                this.details.modify = true;
                this.giveData.showCancel = false;
                let tip = (this.details.detailName == 'product'?'产品':'规则集');
                //判断名称是否为空：
                if(this.details.variableData.name.length<=0){
                        this.giveData.showAlert = true;
                        this.giveData.alertTxt= tip+'名称不能为空';
                        return;
                }
                //判断数据库中是否存在相同的名称：
                if(this.detailData.rawData.name!=this.details.variableData.name){
                    if(this.isRepetitionVal(this.allData.productsNameArr,this.details.variableData.name)){
                        this.giveData.showAlert = true;
                        this.giveData.alertTxt= tip+'名称已存在，请重新编辑';
                        return;
                    }
                }

                if(this.details.variableData.state=='上架中'){
                    console.log(this.isCloudArr, this.isAmountArr);
                    if(this.isCloudArr.length!=1||this.isAmountArr.length!=1){
                        this.giveData.showAlert = true;
                        this.giveData.alertTxt= '上架中的产品只能包含一个执行中的风控规则集和一个执行中的核额规则集';
                        this.alertParams.isSave=false;
                        return;
                    }else if((this.isCloudArr.length==1&&this.isCloudArr[0]['status']!=1)||(this.isAmountArr.length==1&&this.isAmountArr[0]['status']!=1)){
                        this.giveData.showAlert = true;
                        this.giveData.alertTxt= '上架中的产品只能包含一个执行中的风控规则集合一个执行中的核额规则集';
                        this.alertParams.isSave=false;
                        return;
                    }
                }

                this.giveData.showAlert = true;
                this.giveData.showCancel = true;
                this.giveData.alertTxt = '确认要保存当前修改？';
                this.giveData.isSave = true;
            },
            saveChangesFn(isConfirm) {// 提交当前修改
                if(isConfirm){
                    let $url = '';
                    let updateData = {
                    	"desc": this.details.variableData.desc,
                        "modify_author": "小明",
                        "associatedData" : [] // 关联数据（规则集|规则）
                    };
                    let execution = false;// 执行了关联规则集
                	this.details.variableData.values.map((item) => {
                    	let state = (this.details.detailName == 'product'?item.status:item.enabled)
                    	if(state == 1){
                    		execution = true;
                    	}
                    	if (this.details.detailName == 'product'){
                    		updateData.associatedData.push({
	                            "id": item.id,
	                            "state": state || 0 // 状态不存在就设为 默认状态
	                        });
                    	}else{
                    		updateData.associatedData.push({
	                            "id": item.id,
	                            "enabled": state || 0 // 状态不存在就设为 默认状态
	                        });
                    	}
                	})
                	
                    this.details.modify = false; // 当前详情页面状态,正在修改？(true|false)
                    this.giveData.isSave = false;// ?
                    
                    // 格式化提交数据
                    if (this.details.detailName == 'product') {
                    	if(updateData.associatedData.length == 1){
                    		this.cancelChanges();
                    		return alert('请至少有 "两条规则集"， 或者一个都没有');
                    	}
                    	if(this.details.variableData.state == '上架中'){
                    		if(updateData.associatedData.length == 0){
                    			this.cancelChanges();
                    			return alert('上架产品 至少有 "两条规则集"');
                    		}
                    		if(!execution){
                    			this.cancelChanges();
                                this.giveData.showAlert = true;
                                this.giveData.alertTxt= '上架产品 至少有 一条规则集处于"执行中"';
//                    			return alert('上架产品 至少有 一条规则集处于"执行中"');
                    		}
                    	}
                    	updateData["product_id"] = this.details.variableData.id;
                    	updateData["product_name"] = this.details.variableData.name;
                    	updateData["ruleset_count"] = updateData.associatedData.length;
                    	updateData["enabled"] = (this.details.variableData.state == "上架中"? 1 : 0);
                    	updateData["status"] = (this.details.variableData.state == "上架中"? 1 : 0);
                        $url = '/product/productGoodsCatagory?update_rows='+JSON.stringify(updateData);
                    } else {
                    	updateData["ruleset_id"] = this.details.variableData.id;
                    	updateData["group_name"] = this.details.variableData.name;
                    	updateData["rule_count"] = updateData.associatedData.length;
                        $url = '/ruleset/rulesetGoodsCatagory?update_rows='+JSON.stringify(updateData);
                    }
                    this.sendRequest(this,$url,'responseStatus'); // 提交修改
                }
            },
            confirmVal(val){ // 弹窗状态
                this.giveData.isConfirm = val;
                if (this.giveData.isSave) { // 提交
                    this.saveChangesFn(this.giveData.isConfirm);
                } else if (this.giveData.isDelete) {// 删除
                	if(this.giveData.isConfirm){
                        this.giveData.isDelete = false;// ?
	            		if(this.details.detailName=='product'){
                            this.sendRequest(this,'/product/productGoodsCatagory?delete_rows={"product_id":'+ this.details.rawData.id+'}','responseStatus');
                             //删除产品后让该产品内的所有规则集状态都变为"未执行"状态：
                            for(let i = 0;i < this.details.rawData.values.length; i++){
                                this.sendRequest(this,'/ruleset/rulesetGoodsCatagory?update_rows={"ruleset_id":'+ this.details.rawData.values[i].id +',"enabled":"0"}',"responseStatus");
                            }
                            //删除产品后重新获取所有产品中存在的规则集id：
                            var rulesetId=[];
                            this.details.rawData.values.map((item,i)=>{
                                rulesetId.push(item.id);
                            });
                            var newArr=this.resetsId.useInProducts.concat(rulesetId);
                            newArr.sort();
                            this.resetsId.useInProducts=JSON.parse(JSON.stringify(this.filterNotSame(newArr)));
                            //删除完产品后跳回产品页面：
                            this.$router.push("products");
                        }else if(this.details.detailName=='ruleset'){
                            this.sendRequest(this,'/ruleset/rulesetGoodsCatagory?delete_rows={"group_id":'+ this.details.rawData.id+'}','responseStatus');
                            //删除完产品后跳回规则集页面：
                            this.$router.push("ruleSetConfig");
	            		}
                	}
                } else if (this.giveData.isChangeStatus) {// 包含规则集中 正在执行规则集切换提示
                    this.changeExcutingState(this.giveData.isConfirm);
                }
            },
            copy() { // 复制按钮
                this.createData.action = 'create';
                this.chooseData.name = this.details.rawData.name;
                this.chooseData.desc = '';
                this.chooseData.cardIds = this.details.rawData.correlation_id;
            },
            deleteProduct() {// 删除产品或规则集
                this.giveData.showAlert = true;
                this.giveData.showCancel = true;
                if(this.details.detailName=='product'){
                    this.giveData.alertTxt = '确定要删除当前产品？';
                }else if(this.details.detailName=='ruleset'){
                    this.giveData.alertTxt = '确定要删除当前规则集？';
                }
                this.giveData.isDelete = true;
            },
            deleteRule(id) { // 删除规则
                for (var i = 0; i < this.details.variableData.values.length; i++) {
                    if (this.details.variableData.values[i].id == id) {
                        this.details.variableData.values.splice(i, 1);
                        break;
                    }
                }
                this.removeByValue(this.details.variableData.correlation_id, id);
            },
            productInclusiveRuleset_action(msg) { // 产品 -> 规则集（操作
                // 判断在没有保存修改之前，当前要删除的规则集是否原先就存在。不是可以删除
                switch (msg.action) {
                    case 'remove':
                        if (msg.val.status == null || msg.val.status == '0') {
                            this.removeSameVal(this.resetsId.useInProducts);
                            this.removeByValue(this.resetsId.useInProducts,msg.val.id);
                            this.removeByValue(this.details.variableData.correlation_id, msg.val.id);
                            for (var i = 0; i < this.details.variableData.values.length; i++) {
                                if (this.details.variableData.values[i].id == msg.val.id && msg.val.id) {
                                    this.details.variableData.values.splice(i, 1);
                                }
                            }
                        } else {
                            this.giveData.showCancel = false;
                            this.giveData.alertTxt = '只能删除 "未执行" 状态的规则集';
                        }
                        break;
                    case 'handover':// 切换规则集卡片状态
                        // 当前规则集状态为 "执行中"？ 不可以取消执行，至少要保证有一个规则集在执行
                        if(msg.val.rule_count < 1){
                        	return alert('当前规则集中没有添加"规则"，不可以执行或测试');
                        }
                        if (msg.val.status == 1) return;
                        // 第一个切换按钮？（当前按钮只能是 0:未执行 || 2:并行测试）

                        if (msg.state == "state1") {
                            var index = msg.val.status||0;
                            msg.val.status = msg.val.action_state1;
                            msg.val.action_state1 = index;
                        } else {// 第二个切换按钮 （此按钮可点击状态下值只能为 1：执行中）;
                            this.giveData.showAlert = true;
                            this.giveData.showCancel = true;
                            this.giveData.isChangeStatus = true;
                            this.giveData.alertTxt = '确定要切换执行的规则吗？';
                            this.changeStatusParams = msg;
                        }
                        // 将当前变量重新赋值，目的是为了监听数据变化改变页面显示状态
                        this.cardStatusStyle.lenght = 0;
                        this.cardStatusStyle = ["notExcute","excute","test","noDrop"];
                }
            },
            changeExcutingState(isConfirm) {// “执行中”规则集切换
                if (isConfirm) {
                    // 将其他正在执行的规则集切换为"未执行"；
                    for (var j = 0; j < this.details.variableData.values.length; j++) {
                        if(this.changeStatusParams.val.isCloud==0){   // 所有风控规则集
                            if (this.details.variableData.values[j].isCloud==0&&this.details.variableData.values[j].status == 1) {
                                this.details.variableData.values[j].status = '0';
                                this.details.variableData.values[j].action_state1 = 2;
                                this.details.variableData.values[j].action_state2 = 1;
                                break;
                            }
                        }else{   // 所有核额规则集
                            if (this.details.variableData.values[j].isCloud==1&&this.details.variableData.values[j].status == 1) {
                                this.details.variableData.values[j].status = '0';
                                this.details.variableData.values[j].action_state1 = 2;
                                this.details.variableData.values[j].action_state2 = 1;
                                break;
                            }
                        }
                    }

                    // 将当前规则集切换为“执行中”,并且其他两个状态按钮都是不可点击的
                    this.changeStatusParams.val.status = 1;
                    this.changeStatusParams.val.action_state1 = 3; // 3 代表不可点击状态
                    this.changeStatusParams.val.action_state2 = 3;
					this.giveData.isChangeStatus = false;
                }
            },
            formatGroupData(currentVal,oldval) {// 格式化规则集数据
                if (currentVal.code == '1') {
                    this.details.rawData.values = currentVal.message;
                    this.details.rawData.values.sort((a, b) => a.id - b.id);
                    // 当前产品 |规则集 执行状态对应的样式
                    switch (this.details.rawData.state) {
                        case "上架中":
                            this.details.stateStyle = "execution";
                            break;
                        case "执行中":
                            this.details.stateStyle = "execution";
                            break;
                        case "并行测试":
                            this.details.stateStyle = "parallel-testing";
                            break;
                        default :
                            this.details.stateStyle = "non-execution";
                    }
                    this.setstate(this.details.rawData);
                }else{ // 当前状态为不存在关联数据
                	this.details.rawData.values = [];
                    this.details.rawData.correlation_id = [];
                }
                // 复制一份原始数据，用于修改操作时使用
                this.details.variableData = JSON.parse(JSON.stringify(this.details.rawData));
                this.action = true;
            },
            formatRuleData(currentVal,oldval) {// 格式化规则数据
            	this.details.rawData.correlation_id = [];
                if (currentVal.code == '1') {
                    this.details.rawData.values = currentVal.message;
                    this.details.rawData.values.sort((a, b) => a.id - b.id);
                    // 当前规则执行状态对应的样式
                    switch (this.details.rawData.state) {
                        case "执行中" || "上架中":
                            this.details.stateStyle = "execution";
                            break
                        case "并行测试":
                            this.details.stateStyle = "parallel-testing";
                            break
                        default :
                            this.details.stateStyle = "non-execution";
                    }
                    for (var i = 0; i < this.details.rawData.values.length; i++) {
                        this.details.rawData.correlation_id[i] = this.details.rawData.values[i].id;// 关联id
                    }
                    this.details.rawData.correlation_id.sort((a, b) => a - b);
                }else{// 当前状态为不存在关联数据
                    this.details.rawData.values = [];
                }
                // 复制一份原始数据，用于修改操作时使用
                this.details.variableData = JSON.parse(JSON.stringify(this.details.rawData));
                this.action = true;
            },
            setstate(data) {// 给包含的所有规则集各添加三组状态。( 执行中 = 1、 并行测试 = 2、 未执行 = 0)
            	data.correlation_id = [];
                for (var i = 0; i < data.values.length; i++) {
                    data.correlation_id[i] = data.values[i].id;// 关联id status
                    // 判断当前规则集的状态
                    if (data.values[i].status == 1) {
                        data.values[i].action_state1 = 3;
                        data.values[i].action_state2 = 3;
                    }else
                    if (data.values[i].status == 2) {
                        data.values[i].action_state1 = 0;
                        data.values[i].action_state2 = 1;
                    }else{
                        data.values[i].action_state1 = 2;
                        data.values[i].action_state2 = 1;
                    }
                }
                data.correlation_id.sort((a, b) => a - b);
            }
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    .details-wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .details-wrap-moudel {
            padding: 15px;
            border-radius: 5px;
            background-color: #fff;
            &.details-head {
                position: relative;
                height: 160px;
                min-height: 160px;
                overflow: hidden;
                .details-head-toolbar {
                    position: absolute;
                    display: block;
                    z-index: 10;
                    top: 0px;
                    right: 0px;
                    width: 200px;
                    height: 49px;
                    font-size: 0;
                    .details-head-toolbar-item {
                        display: inline-block;
                        float: right;
                        width: 33.3%;
                        height: 100%;
                        line-height: 49px;
                        font-size: 12px;
                        text-align: center;
                        cursor: pointer;
                        transition: background-color .4s;
                        overflow: hidden;
                        &:hover {
                            color: #fff;
                            font-size: 15px;
                            background-color: #38d6ea;
                        }
                        &.modifyStyle {
                            color: #fff;
                            background-color: #38d6ea;
                        }
                        &.details-head-toolbar-copy{
                        	.icon{
                        		width: 1.5em;
	                            height: 1.5em;
	                            vertical-align: middle;
                        	}
                        }
                        &.details-head-toolbar-delete{
                        	.icon{
                        		width: 1.6em;
	                            height: 1.6em;
	                            vertical-align: middle;
                        	}
                        }
                        &.details-head-toolbar-Modify{
                        	.icon{
                        		width: 1.7em;
	                            height: 1.7em;
	                            vertical-align: middle;
                        	}
                        }
                    }
                }
                .details-head-content {
                    position: relative;
                    .details-head-content-items {
                        width: 100%;
                        height: 100%;
                        padding: 25px 10px 10px;
                        font-size: 0px; /*解决 inline-block*/
                        overflow: hidden;
                        .details-head-content-item {
                            display: inline-block;
                            width: 25%;
                            height: 100%;
                            font-size: 13px;
                            border-right: 1px solid #f2f2f2;
                            overflow: hidden;
                            &.ruleset{
                            	width: 33%;
                            }
                            .details-head-content-item-top,
                            .details-head-content-item-bottom {
                                width: 100%;
                                padding: 7px;
                                text-align: center;
                            }
                            .details-head-content-item-bottom {
                                color: green;
                                font-size: 20px;
                            }
                            &:last-child {
                                border: none;
                            }
                        }
                    }
                }
            }
            &.details-explain {
                display: flex;
                flex-direction: column;
                height: 120px;
                min-height: 120px;
                margin: 12px 0;
                .details-explain-text {
                    padding-left: 20px;
                    font-size: 12px;
                    color: #666;
                    overflow: auto;
                }
                .change-description {
                    padding: 5px 10px;
                    resize: none; /* 禁止拖动 */
                    border: none;
                    border-radius: 5px;
                    box-shadow: 0 0 5px 0px #2196F3;
                }
            }
            &.details-main {
                flex-grow: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .details-main-tabBox {
                    padding-left: 20px;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    .ruleSet-card {
                        display: inline-block;
                        .card-toolber {
                            position: relative;
                            top: -15px;
                            padding: 0 14px;
                            width: 100%;
                            height: 25px;
                            .card-tool {
                                float: left;
                                width: 33%;
                                height: 100%;
                                line-height: 25px;
                                text-align: center;
                                font-size: 13px;
                                background-color: #fff;
                                cursor: pointer;
                                .excute {
                                    color: #4DB129;
                                }
                                .test {
                                    color: #ffc107;
                                }
                                .notExcute {
                                    color: #f2f2f2;
                                }
                                .noDrop {
                                    color: #FAFAFA;
                                    cursor: no-drop;
                                }
                                &.card-tool-remove {
                                    color: #ccc;
                                    border-bottom-left-radius: 5px;
                                    box-shadow: 0px 3px 10px 3px #ddd;
                                    -moz-box-shadow: 0px 3px 10px 3px #ddd;
                                    -webkit-box-shadow: 0px 3px 10px 3px #ddd;
                                }
                                &.card-tool-handover {
                                    color: #666;
                                    border-bottom-right-radius: 5px;
                                    box-shadow: 4px 3px 10px 3px #ddd;
                                    -moz-box-shadow: 4px 3px 10px 3px #ddd;
                                    -webkit-box-shadow: 4px 3px 10px 3px #ddd;
                                }
                                &.card-tool-remove:hover {
                                    color: red;
                                }
                                &.card-tool-handover:hover {
                                    color: #fff;
                                    background-color: #4DB129;
                                    .excute {
                                        color: #fff;
                                    }
                                    .test {
                                        color: #fff;
                                    }
                                    .notExcute {
                                        color: #fff;
                                    }
                                    .noDrop {
                                        color: transparent;
                                    }
                                }
                                .icon {
                                    width: 1.3em;
                                    height: 1.3em;
                                    vertical-align: sub;
                                }
                            }
                            .card-tool-middle {
                                width: 34%;
                                &.card-tool-handover:after {
                                    position: absolute;
                                    content: "";
                                    left: calc(~"33% - 5px");
                                    width: 5px;
                                    height: 100%;
                                    background-color: #fff;
                                }
                            }
                            .card-tool-last {
                                &.card-tool-handover:after {
                                    position: absolute;
                                    content: "";
                                    left: calc(~"33% - 5px");
                                    width: 5px;
                                    height: 100%;
                                    background-color: #fff;
                                }
                            }
                        }
                    }
                    table {
                        width: 100%;
                        border-color: #f2f2f2;
                        text-align: center;
                        tr{
                        	&.noDrop{
                        		background-color: #fafafa;
                        		th, td {
	                            	color: #9e9e9e;
	                        	}
                        	}
                        	th, td {
	                            padding: 5px 10px;
	                            font-size: 12px;
	                            color: #333;
	                        }
	                        th {
	                            font-size: 13px;
	                        }
	                        .tr-delete {
	                            color: red;
	                        }
	                        .switchBox{
	                        	position: absolute;
	                        	display: inline-block;
	                        	top: 2px;
	                        	left: 0;
	                        	bottom: 0;
	                        	right: 0;
	                        	margin: auto;
	                        	width: 35px;
	                        	height: 18px;
	                        	.swith-btn {
		                            margin: 0 auto;
		                        }
	                        }
                        }
                    }
                }
            }
            &.details-foot {
                margin-top: 10px;
                height: 50px;
                min-height: 50px;
                color: #000;
                background-color: #fff;
                &:hover {
                    color: #fff;
                    background-color: #009688;
                }
                .details-save-changes {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    letter-spacing: 2px;
                    cursor: pointer;
                }
            }
            .details-wrap-bar {
                position: relative;
                height: 35px;
                min-height: 35px;
                line-height: 19px;
                font-weight: 600;
                color: #333;
                font-size: 14px;
                text-align: left;
                &.details-head-title {
                    font-size: 15px;
                    text-align: center;
                    border-bottom: 1px solid #f2f2f2;
                    .titleEdit{
                        font-size:16px;
                        padding: 3px 5px 4px;
                        color: #666;
                        text-align: center;
                        font-size: 14px;
                        border-radius: 3px;
                        border: 1px solid #03a9f4;
                        box-shadow: 0px 0px 5px 0px #a9e4ff;
                    }
                    .icons{
                        font-size:25px;
                        &.amountColor{
                            color:red;
                        }
                    }
                    .detail-title-status {
                        font-size: 12px;
                        vertical-align: sub;
                        &.execution {
                            color: #4caf50;
                            cursor: no-drop;
                        }
                        &.parallel-testing {
                            color: #ff9800;
                            cursor: no-drop;
                        }
                        &.non-execution {
                            color: #c1c0c0;
                            cursor: pointer;
                        }
                    }
                    .executing-state-select {
                        vertical-align: sub;
                        border-radius: 5px;
                        border-color: #e4dada;
                        color: #9E9E9E;
                        padding-bottom: 3px;
                        cursor: pointer;
                        outline: none;
                        option {
                            border: none;
                            outline: none;
                        }
                    }
                }
                &.details-main-title {
                    .details-main-title-added {
                        position: absolute;
                        display: block;
                        top: -5px;
                        right: 0;
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        background-color: #009688;
                        border-radius: 5px;
                        transition: background-color .2s;
                        &:hover {
                            background-color: #00bcd4;
                        }
                    }
                }
            }
        }
        .alertBox {
            position: absolute;
            .w(100%);
            .h(100%);
            top: 0;
            left: 0;
            z-index: 999;
            background: rgba(0, 0, 0, 0.5);
        }
    }
</style>