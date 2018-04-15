<!-- 我的出借 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录  -->
        <div class="account">
            <!-- <ul class="account-tabs">
                <li>出借记录</li>
            </ul> -->

            <div class="half-title mlr6">出借记录</div>

            <div class="choose-layer">
                <choose :chooseArray="typeArray" :chooseTitle="typeArrayTitle" :status.sync="typeStatus" ></choose>
                <choose :chooseArray="statusArray" :chooseTitle="statusArrayTitle" :status.sync="statusStatus" ></choose>
            </div>

            <!--borrow start-->
            <table class="borrow">
                <thead>
                    <tr>
                        <th>项目</th>
                        <th>借款利率</th>
                        <th>期限</th>
                        <th>出借金额</th>
                        <th>出借日期</th>
                        <th>状态</th>
                        <th>起息时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-if="list && list.length">
                    <tr v-for="(item,index) in list" :key="index" v-show="!noDataShow">
                        <td><span class="hide"><router-link target="_blank" :to="'/borrow/detail/'+item.productId" >{{item.productName}}</router-link></span></td>
                        <td>{{item.annualYield | numberFormatter}}%</td>
                        <td>{{item.term}}{{item.termUnit}}</td>
                        <td>{{item.investAmount | fmoney}}</td>
                        <td>{{item.investMonth}}</td>
                        <td>{{item.status == 0 ? '募集中' : (item.status == 1 ? '还款中' : '已结束')}}</td>
                        <td>{{item.interestStartTime}}</td>
                        <td class="cef6c2d" v-if="item.status != 0">
                            <a href="javascript:;" class="cef6c2d" @click="getReceiptPlanList(1, item.investmentId)">还款计划</a>
                            /
                            <a :href="item.couponUrl" target="_blank" class="cef6c2d">出借协议</a>
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
            <pages v-show="!noDataShow" :total="pagesObj.total" :currentPage="pagesObj.currentPage" :display="pagesObj.display" @pagechange="pagechange"></pages>
            <!--Pages end-->

            <!-- 确认弹框 start -->
            <modal-box :show.sync="submitShow" :title="submitText">
                <div slot="context">
                    <table class="payment-tb">
                        <thead>
                            <tr>
                                <th>还款期数</th>
                                <th>应还本金</th>
                                <th>应还利息</th>
                                <th>应还总额</th>
                                <th>还款状态</th>
                                <th>还款时间</th>
                            </tr>
                        </thead>
                        <tbody v-if="receiptList.length">
                            <tr v-for="(item,index) in receiptList" :key="item.id" v-show="!noDataShow">
                                <td>{{item.period}}</td>
                                <td>{{item.principal | fmoney}}</td>
                                <td>{{item.interest | fmoney}}</td>
                                <td>{{item.amount | fmoney}}</td>
                                <td v-if="item.status == 0">
                                    未还
                                </td>
                                <td v-if="item.status == 1">
                                    已还
                                </td>
                                <td>{{item.date}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr><td colspan="6" class="no-data-show">暂时数据</td></tr>
                        </tbody>
                    </table>
                    <!--Pages start-->
                    <pages v-show="!modalPageShow" :total="pagesReceiptPlanObj.total" :currentPage="pagesReceiptPlanObj.currentPage" :display="pagesReceiptPlanObj.display" @receiptpagechange="receiptpagechange"></pages>
                    <!--Pages end-->
                </div>
            </modal-box>
            <!-- 确认弹框 end -->

        </div>

    </div>
</template>
<script>
    import AccountAside from '../public/Aside'
    import myChoose from '../public/Choose'
    import Pages from '../public/Pages'
    import ModalBox from '../public/ModalBox'
    const sitConfig = require('../../../config/index.js').config

    export default {
        metaInfo: {
            title: '出借记录-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行出借记录'
            }]
        },
        name: 'borrowrecord',
        components:{
            'my-aside': AccountAside, 'choose': myChoose, 'pages': Pages, 'modal-box': ModalBox
        },
        data(){
            return {
                navType: 'account',
                typeClass: false,
                statusClass: false,
                typeArrayTitle: '项目类型',
                typeStatus: -1, // 项目类型
                typeArray: sitConfig.projectTypeList,
                statusArrayTitle: '项目状态',
                statusStatus: -1, // 项目状态
                statusArray: sitConfig.userProjectStatusList,
                list: [],
                receiptList: [],
                noDataShow: false,
                submitText: '还款计划', // 确认提示内容
                investmentId : '',
                submitShow: false, // 确认提示显示
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                },
                pagesReceiptPlanObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                },
                modalPageShow: false,
            }
        },
        mounted(){
            this.getList();
//
        },
        methods: {
            getList(currentPage, status, typeStatus) {
                this.$api.borrowRecordList({isHomeShow: false, pageNum: currentPage, pageSize: this.pagesObj.display, status: status,productType: typeStatus})
                .then(res => {
                    if(res.code == 100){
                        if(res.data.list && res.data.list.length){
                            this.noDataShow = false;
                            this.list = res.data.list
                            this.pagesObj.total = res.data.total;
                        }else{
                            this.list = []
                            this.noDataShow = true;
                        }
                    }else{
                        this.noDataShow = true;
                    }
                })
            },
            pagechange(currentPage){
                this.getList(currentPage, this.statusStatus, this.typeStatus);
            },

            //还款计划列表
            getReceiptPlanList(currentPage, investmentId) {
                this.submitShow = true;
                this.$api.receiptPlanList({isHomeShow: false, pageNum: currentPage, pageSize: this.pagesReceiptPlanObj.display, investmentId: investmentId})
                    .then(res => {
                        if(res.code == 100){
                            if(res.data.list && res.data.list.length){
                                this.noDataShow = false;
                                this.receiptList = res.data.list
                                this.pagesReceiptPlanObj.total = res.data.total;
                            }else{
                                this.receiptList = []
                                this.noDataShow = true;
                            }
                        }else{
                            this.noDataShow = true;
                        }
                    })
            },
            receiptpagechange(currentPage){
                this.getReceiptPlanList(currentPage, this.investmentId);
            }

        },
        watch: {
            typeStatus: function(newVal) {
                this.pagesObj.currentPage = 1
                this.getList(this.pagesObj.currentPage, this.statusStatus, newVal)
            },
            statusStatus: function(newVal) {
                this.pagesObj.currentPage = 1
                this.getList(this.pagesObj.currentPage, newVal, this.typeStatus)
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>
