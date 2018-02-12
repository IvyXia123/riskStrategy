<template>
    <div id="personalSearch">
        <form>
            <div class="left">
                <div class="inputBox">
                    <input type="text" placeholder="姓名"/>
                </div>
                <div class="inputBox">
                    <input type="text" ref="cardNum" placeholder="证件号码"/>
                </div>
                <div class="inputBox">
                    <input type="text" placeholder="手机号码"/>
                </div>
                <div class="btns">
                    <input type="button" id="submit" ref="submit" value="查询"/>
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
        <div class="personalPdf">
            <personal-pdf></personal-pdf>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import PersonalPdf from './PersonalPdf.vue'
    import $ from 'jquery'
    import html2canvas from '../../js/html2canvas.js'
    import jsPDF from '../../js/jsPdf.debug.js'

    export default{
        name: 'personalSearch',
        data(){
            return {}
        },
        components: {
            PersonalPdf
        },
        mounted(){
            var cardNum = this.$refs.cardNum;
            /**
             * 点击查询按钮下载pdf：
             */
            this.$refs.submit.onclick = function () {

                $('.personalPdf').css('display','block');

                html2canvas($('.personalPdf'), {
                    onrendered:function(canvas) {

                        var contentWidth = canvas.width;
                        var contentHeight = canvas.height;

                        //一页pdf显示html页面生成的canvas高度;
                        var pageHeight = contentWidth / 592.28 * 841.89;
                        //未生成pdf的html页面高度
                        var leftHeight = contentHeight;
                        //pdf页面偏移
                        var position = 0;
                        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                        var imgWidth = 595.28;
                        var imgHeight = 592.28/contentWidth * contentHeight;

                        var pageData = canvas.toDataURL('image/jpeg', 1.0);

                        var pdf = new jsPDF('', 'pt', 'a4');

                        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                        //当内容未超过pdf一页显示的范围，无需分页
                        if (leftHeight < pageHeight) {
                            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                        } else {
                            while(leftHeight > 0) {
                                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                                leftHeight -= pageHeight;
                                position -= 841.89;
                                //避免添加空白页
                                if(leftHeight > 0) {
                                    pdf.addPage();
                                }
                            }
                        }

                        pdf.save('个人征信报告.pdf');
                        $('.personalPdf').css('display','none');
                    }
                })
            };
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #personalSearch {
        .w(100%);
        .h(95%);
        padding: 50px 70px;
        box-sizing: border-box;
        form {
            .w(100%);
            .f-s(14px);
            overflow: hidden;
            .left {
                float: left;
                .w(40%);
                .inputBox {
                    .w(100%);
                    .h(40px);
                    input {
                        .w(100%);
                        .h(25px);
                        .p(3px);
                        .b-r(3px);
                        outline: none;
                        border: 1px solid @lightGray;
                        box-sizing: border-box;
                    }
                }
                .btns {
                    .w(250px);
                    .h(40px);
                    margin-top: 20px;
                    input {
                        .w(55px;);
                        .h(25px);
                        .p(3px);
                        .b-r(3px);
                        outline: none;
                        box-sizing: border-box;
                        color: #fff;
                        border: none;
                    }
                    #submit {
                        margin-right: 20px;
                        background: #a6a6a6;
                        box-shadow: 1px 1px 1px #8d8d8d;
                        cursor: pointer;
                    }
                    #reset {
                        background: #d9d9d9;
                        box-shadow: 1px 1px 1px #8d8d8d;
                        cursor: pointer;
                    }
                }
            }
            .right {
                float: left;
                .w(60%);
                background: #fff;
                .p(5px 20px);
                box-sizing: border-box;
                svg {
                    display: inline-block;
                    .w(25px);
                    .h(25px);
                    margin-left: 47px;
                    margin-bottom: 10px;
                    color: #0f6698;
                }
                div {
                    position: relative;
                    .w(120px);
                    .p(7px);
                    box-sizing: border-box;
                    border: 1px solid #0f6698;
                    border-radius: 3px;
                    .f-s(12px);
                    text-align: center;
                    .square {
                        position: absolute;
                        display: inline-block;
                        .w(8px);
                        .h(8px);
                        top: -5px;
                        left: 56px;
                        background: #fff;
                        transform: rotate(45deg);
                        border-top: 1px solid #0f6698;
                        border-left: 1px solid #0f6698;
                    }
                }
            }
        }
        .personalPdf {
            position: relative;
            .w(100%);
            min-width:910px;
            background: #fff;
            z-index: -1;
            overflow: auto;
            display:none;
        }
    }
</style>