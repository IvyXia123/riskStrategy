<template>
    <div id="switchBtn" v-if="ready()">
        <div class="switchBox">
            <div class="outer" :class="{'outerSwitch':isSwitch}">
                <div class="inner pointer" :class="{innerSwitch:!isSwitch}" @click="stateSwitching()"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'switchBtn',
        props: ['params'],
        data() {
            return {
            	isSwitch:false
            }
        },
        methods:{
        	ready(){// 模块加载进行初始化，初始化完成才渲染 视图层
        		if(this.params.switch.enabled > -1){
        			this.isSwitch = (this.params.switch.enabled == 1?true:false);
        			return true;
        		}
        	},
        	stateSwitching(){
        		this.isSwitch = !this.isSwitch;
        		// 修改传入参数的值，不需要再传回父组件
        		this.params.switch.enabled = (this.isSwitch? 1 :0);
        	}
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #switchBtn {
        .w(34px);
        .h(18px);
        min-height: 18px;
        .switchBox {
            .w(100%);
            .h(100%);
            .outer {
                position: relative;
                .w(100%);
                .h(100%);
                background: #b7bbbc;
                border-radius: 15px;
                box-shadow: 0 -2px 1px #978f8d;
                transition: background .6s;
                .inner {
                    position: absolute;
                    .w(16px);
                    .h(16px);
                    left: 1px;
                    border-radius: 14px;
                    box-shadow: 1px 1px 1px #000;
                    background: #fff;
                    transition: left .5s;
                    &.innerSwitch {
                        left: 17px;
                    }
                }
                &.outerSwitch {
                    background-color: #31ad64;
                }
            }
        }
    }
</style>