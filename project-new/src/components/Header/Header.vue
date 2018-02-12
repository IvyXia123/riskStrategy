<template>
    <div id="headerBar">
        <div class="sysNameBox">
            <img src="./../../static/logo/logo.png"/>
        </div>
        <div class="headerInfo">
        	<div class="routerName headerInfo-item">
                <span>
					<svg-icon class="icons" id="icon-23" style="color: #009688;margin-right: 5px;"></svg-icon>{{titleName.val}}
                </span>
            </div>
            <div class="nav headerInfo-item">
                <ul>
                    <li>
                        <svg-icon class="icons" id="icon-xinxinxi"></svg-icon>
                        <span class="msgCount">2</span>
                    </li>
                    <li>
                        <svg-icon class="icons" id="icon-xinxinxi"></svg-icon>
                        <span class="msgCount">1</span>
                    </li>
                </ul>
            </div>
            <div class="exitBox headerInfo-item">
                <div class="user">
                    <svg-icon class="icons" id="icon-user-outline"></svg-icon>
                    <span class="userName">张前</span>
                </div>
                <div class="exit">
                    <svg-icon class="icons" id="icon-tuichu"></svg-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'headerBar',
        data(){
            return{
                titleName : {}
            }
        },
        mounted(){
            this.titleName = this.msgtxt;
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../less/common");
    #headerBar{
        display:flex;
        text-align:center;
        overflow:hidden;
        .sysNameBox{
            display:flex;
            justify-content:center;
            align-items:center;
            height: 100%;
            width:175px;
            min-width:175px;
            float:left;
            padding:10px 16px;
            background:#2dc8b5;
            img{
                height:110%;
            }
        }
        .headerInfo{
        	width:calc(~"100% - 175px");
        	height:100%;
            min-width:570px;
            font-size:0px;
            float:left;
            background:#fff;
            border-bottom:1px solid #e5e5e7;
            .headerInfo-item{
            	position:relative;
            	display: inline-block;
            	height: 100%;
            	line-height: 46px;
            	font-size: 12px;
            	overflow: hidden;
            	&.routerName{
            		float: left;
            		padding-left: 10px;
            		width: 250px;
					font-size: 14px;
	                text-align: left;
                    font-weight:bold;
	            }
	            &.nav{
	                width:calc(~"100% - 410px");
	                ul{
	                	width: 100%;
	                	height: 100%;
	                	text-align: right;
	                    li{
                            position:relative;
	                        display: inline-block;
	                        width: 55px;
	                        text-align: center;
	                        overflow: hidden;
	                        .icon {
	                        	width: 20px;
	                        	height: 20px;
                                margin-top:13px;
                                color:#aaa;
	                        }
	                        .msgCount{
                                position: absolute;
                                display:inline-block;
                                .w(14px);
                                .h(14px);
                                left:30px;
                                top:9px;
                                color:#fff;
                                line-height:14px;
                                border-radius: 50%;
                                text-align:center;
                                background:#2ac7c3;
	                        }
	                    }
	                }
	            }
	            &.exitBox{
					display: flex;
					float: right;
	                max-width: 150px;
	                .user{
	                	padding-right: 10px;
	                    text-align:right;
	                    color:#607d8b;
	                    .userName{
	                        display:inline-block;
	                    }
	                }
	                .exit{
	                	width: 40px;
	                    .icon{
	                    	color: red;
	                    }
	                }
	                .icon{
	                	font-size: 1.1rem;
	                	vertical-align: -.2em;
	                }
	            }
            }
        }
    }
</style>