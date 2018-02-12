<template>
    <div id="check">
        <main>
            <div class="search">
                <ul class="clearfix">
                    <li><a href="javascript:;" @click="isSearch='personal'" :class="{searchActive:isSearch=='personal'}">个人信息查询</a></li>
                    <li><a href="javascript:;" @click="isSearch='company'" :class="{searchActive:isSearch=='company'}">企业信息查询</a></li>
                </ul>
                <component :is="isSearch"></component>
            </div>
        </main>
    </div>
</template>

<script type="text/ecmascript-6">
    import PersonalSearch from './Check/PersonalSearch.vue';
    import CompanySearch from './Check/CompanySearch.vue';
    export default{
        name:'check',
        data(){
          return{
              isSearch:'personal'
          }
        },
        components:{
            'personal':PersonalSearch,
            'company':CompanySearch
        }
    }
</script>

<style lang="less" type="text/less">
	@import url("./../less/common");
    #check{
        .w(100%);
        .h(100%);
        main{
            .w(100%);
            .h(100%);
            padding-top:12px;
            box-sizing:border-box;
            background: @lightGray;
            .search{
                .w(100%);
                .h(100%);
                background:#fff;
                .b-r(5px);
                .f-s(0);
                ul{
                    .h(30px);
                    &:nth-child(1){
                        margin-left:20px;
                    }
                    li{
                        .w(120px);
                        .h(30px);
                        .l-h(30px);
                        background:#8db7ca;
                        float:left;
                        margin:-13px 10px;
                        text-align:center;
                        a{
                            display:inline-block;
                            .w(100%);
                            .h(100%);
                            .f-s(16px);
                            color:#fff;
                        }
                    }
                }
            }
        }
    }
    .clearfix:after{
        content:"";
        display:block;
        height:0;
        visibility:hidden;
        clear:both;
    }
    .searchActive{
        background:#34b2c9;
    }
</style>