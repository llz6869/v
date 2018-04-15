<template>
    <div class="activities clearfix">
        <!--welfare start-->
        <div class="activities618 ">
           <div class="top"></div>
            <div class="content clearfix">
                <div class="container layer clearfix">
                    <!--novice start-->
                    <div class="novice clearfix">
                        <div class="title"></div>
                        <h3>注册有礼 618元现金抵用券来就送;</h3>
                        <h3>新用户注册即可获得618元礼包：8元、60元、150元、400元面额现金抵用券各1张，现金抵用券使用规则如下:</h3>
                        <table class="activities-table">
                            <tr>
                                <td class="table-l">现金抵用券</td>
                                <td class="table-r">现金抵用券使用规则</td>
                            </tr>
                            <tr>
                                <td>8元</td>
                                <td>单笔投资满1000元起抵用，所有项目均可使用，有效期30天</td>
                            </tr>
                            <tr>
                                <td>60元</td>
                                <td>单笔投资满20000元起抵用，所有项目均可使用，有效期30天</td>
                            </tr>
                            <tr>
                                <td>150元</td>
                                <td>单笔投资满60000元起抵用，所有项目均可使用，有效期30天</td>
                            </tr>
                            <tr>
                                <td>400元</td>
                                <td>单笔投资满200000元起抵用，所有项目均可使用，有效期30天</td>
                            </tr>
                        </table>
                        <p class="p-top">*温馨提示：</p>
                        <p>1、本活动自2017年8月29日20：00开始，活动长期有效，若有更改平台另行通知。</p>
                        <p>2、参与此活动的客户不能再同时参与金谷财行平台的其他活动。</p>
                        <p>3、现金抵用券将实时发放到金谷财行用户账户中，仅限钱包余额支付时抵用，使用时必须勾选现金抵用券方可生效。</p>
                        <router-link to="/register" class="btn">注册领红包</router-link>
                    </div>
                    <!--novice end-->

                    <!--subject start-->
                    <div class="subject clearfix">

                        <!--content start-->
                        <div class="content" v-for="(item,index) in produtList" :key="index" :class="{'content-m': index === 1}">
                            <div class="title">
                                <span class="title-word ">{{ item.name }}</span>
                            </div>
                            <h3>{{ item.annualYield | numberFormatter }}<span>%</span></h3>
                            <h4>年化利率</h4>
                            <div class="data clearfix">
                                <div class="data-l fl">期限:<span>{{ item.term }}{{ item.termUnit }}</span></div>
                                <div class="data-r fl">起投金额:<span>{{ item.minInvestmentAmount | fmoney }}元</span></div>
                            </div>
                            <div v-if="!isLogin">
                                <router-link  to="/register" class="btn m-auto">立即注册领取</router-link>
                            </div>
                            <div v-else>
                                <router-link
                                    v-if="(item.status==6 || item.status==7) && item.isPreheat !='1'"
                                    :to="'/borrow/detail/'+item.id"
                                    class="btn m-auto">立即出借</router-link>
                                <a
                                    href="javascript:;"
                                    v-else-if="item.status==8 || item.status==9"
                                    class="btn m-auto disabled">募集完成</a>
                                <a
                                    href="javascript:;"
                                    v-else-if="item.status==10"
                                    class="btn m-auto disabled">还款中</a>
                                <a
                                    href="javascript:;"
                                    v-else-if="item.status==11"
                                    class="btn m-auto disabled">已结束</a>
                                <a
                                    href="javascript:;"
                                    v-else-if="item.isPreheat=='1'"
                                    class="btn m-auto disabled">即将上线</a>
                            </div>
                            <!--<router-link v-show="!isLogin" to="/register" class="btn m-auto">立即注册领取</router-link>-->

                        </div>
                        <!--content end-->
                    </div>

                    <div class="subject-bottom"></div>
                    <!--subject end-->
                </div>
            </div>
        </div>
        <!--welfare end-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                produtList: [],
                isLogin:this.$cookie.getCookie('tokenId') ? true :false
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                this.$api.activeReg({}).then(res => {
                    if(res.code === 100){
                        this.produtList = res.data;
                    }
                });
            }
        },
        metaInfo: {
            title: '新手注册活动礼包-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '新手注册活动礼包,注册礼包,金谷财行活动'
            }]
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/activities.scss';
</style>
