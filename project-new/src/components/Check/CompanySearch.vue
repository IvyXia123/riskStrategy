<template>
    <div id="companySearch">
        <form>
            <div class="left">
                <div class="inputBox">
                    <input type="text" placeholder="企业名称"/>
                </div>
                <div class="inputBox">
                    <input type="text" placeholder="营业执照号码"/>
                </div>
                <div class="inputBox">
                    <input type="text" placeholder="法人代表"/>
                </div>
                <div class="btns">
                    <input type="submit" id="submit" value="查询"/>
                    <input type="reset" id="reset" value="清空"/>
                </div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jilu"></use>
                </svg>
                <div>
                    <span class="square"></span>
                    <span>查看近期查询记录</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'companySearch'
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #companySearch{
        .w(100%);
        .h(95%);
        padding:50px 70px;
        box-sizing:border-box;
        form{
            .w(100%);
            .f-s(14px);
            .left{
                float:left;
                .w(40%);
                .inputBox{
                    .w(100%);
                    .h(40px);
                    input{
                        .w(100%);
                        .h(25px);
                        .p(3px);
                        .b-r(3px);
                        outline:none;
                        border:1px solid @lightGray;
                        box-sizing:border-box;
                    }
                }
                .btns{
                    .w(250px);
                    .h(40px);
                    margin-top:20px;
                    input{
                        .w(55px;);
                        .h(25px);
                        .p(3px);
                        .b-r(3px);
                        outline:none;
                        box-sizing:border-box;
                        color:#fff;
                        border:none;
                    }
                    #submit{
                        margin-right:20px;
                        background:#a6a6a6;
                        box-shadow:1px 1px 1px #8d8d8d;
                    }
                    #reset{
                        background:#d9d9d9;
                        box-shadow:1px 1px 1px #8d8d8d;
                    }
                }
            }
            .right{
                float:left;
                .w(60%);
                background:#fff;
                .p(5px 20px);
                box-sizing:border-box;
                svg{
                    display:inline-block;
                    .w(25px);
                    .h(25px);
                    margin-left:47px;
                    margin-bottom:10px;
                    color:#0f6698;
                }
                div{
                    position:relative;
                    .w(120px);
                    .p(7px);
                    box-sizing:border-box;
                    border:1px solid #0f6698;
                    border-radius:3px;
                    .f-s(12px);
                    text-align:center;
                    .square{
                        position:absolute;
                        display:inline-block;
                        .w(8px);
                        .h(8px);
                        top:-5px;
                        left:56px;
                        background:#fff;
                        transform:rotate(45deg);
                        border-top:1px solid #0f6698;
                        border-left:1px solid #0f6698;
                    }
                }
            }
        }
    }
</style>