import Vue 			from 'vue'
import App 			from './App.vue'
import VueRouter 	from 'vue-router'
import VueResource 	from 'vue-resource'
import Axios 		from 'axios'
import routerConfig from './router.config.js'
// less 初始化
require('!style-loader!css-loader!less-loader!./less/common.less');
require('!style-loader!css-loader!less-loader!./less/interface.less');// 规则页面接口组件通用样式
require('!style-loader!css-loader!less-loader!./less/table.less');
// iconfont svg style
import './static/risk-iconfont/iconfont.css';
import './static/risk-iconfont/iconfont.js';

// 功能组件
import RulesetCard 	from './components/common/card.vue';			// card 
import Back			from './components/common/back.vue';			// back
import AddButton	from './components/common/add-button.vue';		// add-button 
import SvgIcon 		from './components/common/svg-icon.vue';		// svg-icon-font

// 挂载功能组件
Vue.component('SvgIcon',SvgIcon)
Vue.component('RulesetCard',RulesetCard)
Vue.component('back',Back)
Vue.component('AddButton',AddButton)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.prototype.axios = Axios;

Vue.prototype.sendRequest= function($this,$url,$response,$name){
	$this.axios.get("http://localhost:8091"+$url)
  	.then(function (response) {
  		$this[$response] = response.data;
  		if($name){
  			$this[$response]['name'] = $name;
  		}
  	})
  	.catch(function (response) {
		$this[$response] = response.data;
		if($name){
			$this[$response]['name'] = $name;
		}
  	});
}
//控制弹框的显示隐藏：
Vue.prototype.alertParams={    //弹框参数
    showAlert:false,   //是否显示弹框
    alertTxt:false,    //弹框内容
    isConfirm:false,   //是否点击弹框的确认按钮
    showCancel:false   //是否显示弹框的取消按钮
};

Vue.prototype.msgtxt 	= {//用于在header上显示当前页面路径名称
	val:''
};
Vue.prototype.showState = false;// 新建规则集->添加规则 ->控制当前规则可操作行为的状态
Vue.prototype.editable 	= { // 控制详情页面显示为"修改状态"
	edit:false
};
Vue.prototype.DetailsParams = {// 详情页数据 
	'detailsPageName'	:'',
	'associatedDataID'	:[],
	'values'			:{},
	'arr'			    :[],
	"deleteGroup"		:[],
	"deleteRules"		:[],
    'configArr'			:[]
};

Vue.prototype.resetsId={
	useInProducts:[],   //产品中用到的所有规则集Id
	allResetsId:[],    //所有规则集Id
    notUseArr:[]    //未使用过的规则集数据
};

Vue.prototype.allData={
	productsData:[],    //产品的所有数据
	rulesetsData:[],    //规则集的所有数据
    productsNameArr:[],  //所有产品名称的数据
    rulesetsNameArr:[]   //所有规则集名称的数据
};

Vue.prototype.getName=function(allArr,nameArr,name){
    //获取所有产品数据里面的所有产品名称：
    allArr.map((item,i)=>{
        nameArr.push(item[name]);
    });
};

// 详情页所有数据
Vue.prototype.detailData = {
	modify		: false, // 修改状态下使用 variableData 数据
    historyData:{},// 上次操作历史数据
	detailName 	: 'product',      // 当前详情数据类型,默认为产品（产品 | 规则集） 
	rawData : {
		id		: false,
		name	: false,
		state	: false,
		desc	: false,
		pass	: false,
		reject	: false,		
		audit	: false,		
		hit		: false,		
		correlation_id	: [],	// 所有相关数据id
		values			: []	// 所有相关数据
	},
	variableData:{ // 此数据复制于 rawData，为可变数据
		id		: false,
		name	: false,
		state	: false,
		desc	: false,
		pass	: false,
		reject	: false,
		audit	: false,
		hit		: false,
		correlation_id	: [],
		values			: []
	}
}
// 新增页所有数据
Vue.prototype.createData = {
	pageName	: 'product',// 当前详情数据类型,默认为产品（产品 | 规则集） 
	action		: 'create', // 进入当前页面的动作（新增 | copy | 添加后返回）
	rawData 	: {
		id		: false,
		name	: '',
		state	: false,
		desc	: '',
		pass	: false,
		reject	: false,		
		audit	: false,		
		hit		: false,		
		correlation_id	: [],	// 所有相关数据id
		values			: []	// 所有相关数据
	}
}

Vue.prototype.DetailsParamsTmp = {  // 详情页临时数据
    'detailsPageName'	:'',
    'associatedDataID'	:[],
    'values'			:{}
};


Vue.prototype.chooseData = {// 创建产品 添加规则集
    'name'		: '',
    'desc'		: '',
    'cardIds'	: []
    // 'ruleTmpData'	: [],
};
// 删除数组中的指定值 
Vue.prototype.removeByValue = function(arr, val) {
  	for(var i=0; i<arr.length; i++) {
    	if(arr[i] == val) {
      	arr.splice(i, 1);
      	break;
    	}
  	}
};
// 判断数组中是否存在指定值 
Vue.prototype.isHave = function(arr, val) {
	if(arr){
		// 这里拿到的数组可能是一串以 “,”分割的字符串，所以要转一下
		if(arr && arr.indexOf(",")> -1){
			arr = arr.split(',');
		}
	  	for(var i=0; i<arr.length; i++) {
	    	if(arr[i] == val) {
	     		return false;
	    	}else if(i == arr.length-1){
	    		return true;
	    	}
	  	}
	}
};
// 判断数组中是否存在指定值
Vue.prototype.isRepetitionVal = function(arr, val) {
	if(arr == null || !arr || arr == undefined)return false;
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == val){
			return true;
		}else if(i == arr.length-1){
			return false;
		}
	}
};

//数组中去掉重复的值：
Vue.prototype.removeSameVal=function(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]==arr[j]){
				arr.splice(j,1);
				j--;
			}
		}
	}
	return arr;
};

//把数组中没有出现重复的值过滤出来：
Vue.prototype.filterNotSame=function(arr){
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                arr.splice(j-1,2);
                j--;
            }
        }
    }
    return arr;
};

const router= new VueRouter(routerConfig);

let vue = new Vue({
    router,
  	el: '#app',
  	render: h => h(App)
})
