<template>
    <div id="alert">
        <h3>{{alertParams.alertTxt}}</h3>
        <hr/>
        <div class="btnBox">
            <div class="cancelBtn" @click="cancel" v-show="alertParams.showCancel">取消</div>
            <div class="confirmBtn" @click="confirm" :class="[alertParams.showCancel?'center':'middle']">确定</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'alert',
        data() {
            return {}
        },
        methods: {
            confirm() {
                this.alertParams.showAlert = false;
                if (this.alertParams.isSave || this.alertParams.isDelete || this.alertParams.isChangeStatus) {
                    this.alertParams.isConfirm = true;
                    this.$emit("confirmVal", this.alertParams.isConfirm);
                }
            },
            cancel() {
                this.alertParams.showAlert = false;
                this.alertParams.isConfirm = false;
                this.$emit("confirmVal", this.alertParams.isConfirm);
            }
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../../less/common");
    #alert {
        .w(350px);
        .p(40px);
        margin: 150px auto;
        min-height: 220px;
        border-radius: 8px;
        background: #eee;
        h3 {
            min-height: 30px;
            text-indent: 20px;
            line-height: 30px;
        }
        hr {
            margin-top: 20px;
            margin-bottom: 30px;
            border-color: gray;
        }
        .btnBox {
            min-height: 50px;
            .confirmBtn, .cancelBtn {
                .w(100px);
                .h(50px);
                line-height: 50px;
                border-radius: 5px;
                text-align: center;
                background: green;
                cursor: pointer;
                font-size: 22px;
            }
            .cancelBtn {
                float: left;
                background: #fff;
                &:hover {
                    background: rgba(0, 0, 0, 0.08);
                    color: #fff;
                }
            }
            .confirmBtn {
                color: #fff;
                background: #60bfd7;
                &:hover {
                    background: #3ab0d3;
                }
                &.center {
                    float: right;
                }
                &.middle {
                    margin: 0 auto;
                }
            }
        }
    }
</style>