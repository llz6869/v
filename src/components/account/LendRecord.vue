<!-- 我的借款 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录 -->
        <div class="account lendrecord">
            <!-- <ul class="account-tabs">
                <li class="active">出借记录</li>
            </ul> -->

            <div class="half-title">借款记录</div>

            <div class="choose-layer">
                <choose :chooseArray="repaymentPlanStatusList" :chooseTitle="chooseTitle" @pagechange="pagechange" :status.sync="typeStatus"></choose>
            </div>

            <!--borrow start-->
            <table class="lend">
                <thead>
                    <tr>
                        <th>项目</th>
                        <th>借款利率</th>
                        <th>期限</th>
                        <th>借款金额</th>
                        <th>发布日期</th>
                        <th>还款日期</th>
                        <th>利息</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-if="list && list.length">
                    <tr v-for="(item,index) in list" v-bind:key="item.id">
                        <td><span class="hide"><router-link target="_blank" :to="'/borrow/detail/'+item.productId">{{item.productName}}</router-link></span></td>
                        <td>{{item.annualYield | numberFormatter}}%</td>
                        <td>{{item.term}}{{item.termUnit}}</td>
                        <td>{{item.productAmount | fmoney}}</td>
                        <td>{{item.publishedTime}}</td>
                        <td>{{item.preRepayTime}}</td>
                        <td>{{item.preInterest}}</td>
                        <td>{{item.status == 0 ? '还款中' : (item.status == 1 ? '已结束' : '筹款中')}}</td>
                        <td v-if="item.repayTimeCount <= 15 && item.status == 0">
                            <button class="btn btn-small" @click="paymentOK(item)">立即还款</button>
                        </td>
                        <td v-else></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7" class="no-data-show">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!--borrow end-->

            <!-- 分页 -->
            <!--Pages start-->
            <pages v-show="!lendNoDataShow" :total="pagesObj.total" :currentPage="pagesObj.currentPage" :display="pagesObj.display" @pagechange="pagechange"></pages>
            <!--Pages end-->
        </div>
        <modal-box :show.sync="paymentShow" :title="paymentText">
            <ul slot="context" class="payment-box-ul">
                <li><span>应还本金：</span><span>{{repayData.principal | fmoney}}元</span></li>
                <li><span>还款利息：</span><span>{{repayData.interest | fmoney}}元</span></li>
                <li><span>应还总额：</span><span>{{repayData.amount | fmoney}}元</span></li>
                <li><span>账户可用余额：</span><span>{{repayData.companyBalance | fmoney}}元<span class="cash-tips">{{repayData.companyBalance < repayData.amount ? '余额不足,' : ''}}<router-link to="/account/cash">立即充值</router-link></span></span></li>
            </ul>
            <div slot="button" class="payment-box-btn">
                <div class="payment-error">{{paymentErrorStr}}</div>
                <button class="btn ok" :disabled="btnDisabled" @click="repaymentSub(repayData)" v-show="!repaymentStatus">立即还款</button><button class="btn ok" @click="paymentShow=false" v-show="repaymentStatus">返回借款列表</button>
            </div>
        </modal-box>
    </div>
</template>
<script>
    import AccountAside from '../public/Aside'
    import Choose from '../public/Choose.vue'
    import Pages from '../public/Pages'
    import ModalBox from '../public/ModalBox'
    const sitConfig = require('../../../config/index.js').config

    export default {
        metaInfo: {
            title: '借款记录-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行借款记录'
            }]
        },
        name: 'lendrecord',
        components:{
            'my-aside': AccountAside, 'choose': Choose, 'pages': Pages, 'modal-box': ModalBox
        },
        data(){
            return {
                paymentText: '立即还款', // 立即还款
                paymentShow: false, // 显示立即还款
                activePro: null, // 还款的标的
                paymentErrorStr: '', // 立即还款错误信息
                btnDisabled: false, // 按钮是否可用
                repaymentStatus: false, // 返回列表可见
                repaymentPlanStatusList: sitConfig.repaymentPlanStatusList,
                navType: 'account',
                chooseTitle: '还款状态',
                list: [],
                repayData: '',
                lendNoDataShow: false,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                },
                typeStatus: 3 // 筛选条件
            }
        },
        mounted(){
            this.getList();
        },
        methods: {
            getList(currentPage, status) {
                this.$api.lendRecordList({isHomeShow: false, pageNum: currentPage, pageSize: this.pagesObj.pagegroup, status: status })
                .then(res => {
                    if(res.code == 100){
                        if(!res.data.list.length){
                            this.list=[]
                            this.lendNoDataShow = true;
                        }else{
                            this.lendNoDataShow = false;
                            this.list = res.data.list
                            this.pagesObj.total = res.data.total;
                            this.pagesObj.currentPage = res.data.pageNum;
                        }
                    }else{
                        this.lendNoDataShow = true;
                    }
                })
            },
            pagechange(currentPage){
                this.getList(currentPage, this.typeStatus);
            },
            paymentOK(item){
                this.paymentShow = true;
                this.activePro = item;
                this.getRepayDetail(item.id);
            },
            repaymentSub(repayData){
                if(!this.activePro){return;}
                this.btnDisabled = true;
                this.$api.repay({id : repayData.id})
                .then(res => {
                    this.btnDisabled = false;
                    if(res.code == 100){
                        this.activePro.status = 1;//页面还款状态改为已结束
                        //成功
                        this.repaymentStatus = true;
                    }else{
                        //失败
                        this.paymentErrorStr = res.msg;
                        this.repaymentStatus = false;
                    }
                })
            },
            getRepayDetail(id){
                this.$api.repayDetail({id: id})
                    .then(res => {
                        if(res.code == 100 && res.data){
                            this.repayData = res.data;
                        }
                    })
            }
        },
        watch: {
            typeStatus: function(newVal) {
                this.pagesObj.currentPage = 1
                this.getList(this.pagesObj.currentPage, newVal)
            },
            paymentShow: function(newVal){
                if(!newVal){
                    this.paymentErrorStr = '';
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>
