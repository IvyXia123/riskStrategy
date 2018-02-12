import RiskIndex 	from './components/RiskIndex.vue'
import Check 		from './components/Check.vue'
import RiskStrategy from './components/RiskStrategy.vue'
import Monitor 		from './components/Monitor.vue'
import Products 	from './components/RiskStragety/products.vue'
import RuleConfig 	from './components/RiskStragety/RuleConfig.vue'
import RuleSetConfig from './components/RiskStragety/RulesetConfig.vue'
import NameList 	from './components/RiskStragety/NameList.vue'
import Details 		from './components/RiskStragety/detail.vue'
import Add 			from './components/RiskStragety/Add.vue'

const routes=[
    {path:'/riskIndex', name:'riskIndex', component:RiskIndex},
    {path:'/check', name:'check', component:Check},
    {
        path:'/riskStrategy',
        name:'riskStrategy',
        component:RiskStrategy,
        children:[
         	{path:'products', 		name:'products',		component:Products},
            {path:'ruleConfig', 	name:'ruleConfig',		component:RuleConfig},
            {path:'ruleSetConfig',	name:'ruleSetConfig',	component:RuleSetConfig},
            {path:'nameList',		name:'nameList',		component:NameList},
            {path:'add',		    name:'add',			    component:Add},
            {path:'details',		name:'details',			component:Details},
            {path:'/riskStrategy',	redirect:'/riskStrategy/products'}
        ]
    },
    {path:'/monitor', name:'monitor', component:Monitor},
    {path:'*',redirect:'/riskIndex'}
];

export default{
    mode: 'history',
    base: __dirname,
    routes
}
