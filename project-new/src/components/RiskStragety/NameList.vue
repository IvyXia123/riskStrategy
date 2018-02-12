<template>
    <div id="nameList">
        <div class="tableBox">
            <table border="">
                <tr>
                    <th>名单名称</th>
                    <th>名单说明</th>
                    <th>上传者</th>
                    <th>更多</th>
                </tr>
                <tr>
                    <td>1111</td>
                    <td>2222</td>
                    <td>3333</td>
                    <td>4444</td>
                </tr>
            </table>
        </div>
        <div class="formBox">
            <form>
                <div>
                    <label>名单名称：</label>
                    <input type="text" value="未命名名单003"/>
                </div>
                <div>
                    <label>名单类型：</label>
                    <select>
                        <option value="0">黑名单</option>
                        <option value="1">白名单</option>
                    </select>
                </div>
                <div>
                    <label>名单说明：</label>
                    <input type="text" value=""/>
                </div>
                <div class="btns">
                    <input type="button" class="upLoade" value="浏览上传"/>
                    <input type="button" class="save" value="新增保存"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'nameList'
    }
</script>

<style lang="less" type="text/less">
    #nameList{
    	padding:30px 40px;
    	width:100%;
    	height:100%;
        border-radius:5px;
        background:#fff;
        .tableBox{
        	width:100%;
    		height:40%;
            overflow:auto;
            table{
                width:100%;
                color:#fff;
                text-align:center;
                border-spacing: 0;
                border-collapse: collapse;
                border: 1px solid #ccc;
                tr{
                    th,td{
                        padding:5px;
                        box-sizing:border-box;
                    }
                    th{
                        background:#b5c7e4;
                    }
                    td{
                        background:#cfd5ea;
                    }
                }
            }
        }
        .formBox{
        	padding:40px 0;
            width:100%;
    		height:60%;
            box-sizing:border-box;
            form{
                div{
                    margin:10px 0;
                    label{
                        display:inline-block;
                        width:25%;
    					height:30px;
    					line-height: 30px;
                    }
                    input,select{
                    	padding: 5px;
                    	width:30%;
    					height:30px;
                        text-align:center;
                        outline:none;
                        background:#f2f2f2;
                        border:1px solid #c3c3c3;
                        option{
                            text-align:center;
                        }
                    }
                    &.btns{
                        margin:40px 0 0 25%;
                        input{
                            width: 20%;
                            border-radius:3px;
                            cursor:pointer;
                            &.upLoade{
                                margin-right:20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>