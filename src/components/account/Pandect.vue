<!-- 账户总览 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>

        <!--pandect-layer start-->
        <div class="pandect-layer">
            <!-- pandect start -->
            <div class="pandect clearfix">
                <div class="personal clearfix">
                    <div class="portrait fl">
                        <div class="avatar fl"><img src="/static/images/account/avatar-default.png" alt="头像"></div>
                        <div class="information">
                            <span class="phone">{{userAccount.mobile}}</span>
                            <div class="vali">
                                <router-link to="/account/securitysetting">
                                    <span class="icon phone check" title="手机认证"></span>
                                </router-link>
                                <router-link to="/account/securitysetting">
                                    <span class="icon idcard " title="银行存管" v-show="!checkAccount"></span>
                                    <span class="icon idcard check" title="银行存管" v-show="checkAccount"></span>
                                </router-link>
                                <router-link to="/account/appraisal">
                                    <span class="icon bankcard " title="风险测评" v-show="!judgeTypeName"></span>
                                    <span class="icon bankcard check" title="风险测评" v-show="judgeTypeName"></span>
                                </router-link>
                            </div>
                            <p class="vali">
                                现金抵用券：<span class="mr20"><router-link to="/account/welfare" class="cef6c2d">{{userAccount.dkCoupon}}</router-link> 张</span>
                            </p>
                        </div>
                    </div>
                    <div class="fl balance">
                        <p>可用余额：<span class="fz30 mr10">{{userAccount.balance | fmoney}}<em>元</em></span></p>
                        <p class="p20">
                            <span class="mr10">出借冻结：{{userAccount.investFronzenAmount | fmoney}}元</span>
                            <span class="mr10">提现冻结：{{userAccount.withdrawFronzenAmount | fmoney}}元</span>
                        </p>
                        <p>
                            <router-link to="/account/Cash" class="btn btn-small">充值</router-link>
                            <router-link :to="{name: 'cash', params: {tabs: 1}}" class="btn btn-default btn-small">提现</router-link>
                            <router-link to="/borrow" class="btn btn-default btn-small">出借</router-link>
                        </p>
                    </div>
                </div>

                <ul class="income clearfix">
                    <li><div>{{userAccount.totalAmount | fmoney}}<em>元</em><span class="db">总资产<i class="income-tips"></i></span></div></li>
                    <li class="bddf"><div>{{userAccount.totalProfit | fmoney}}<em>元</em><span>累计收益</span></div></li>
                    <li><div>{{userAccount.preAmountSum | fmoney}}<em>元</em><span>预期收益</span></div></li>
                </ul>

                <div class="received">
                    <span>近7日待收回款总额：{{userAccount.preAmountSevenDays | fmoney}}<em>元</em></span>
                    <span>待收回款本金：{{userAccount.prePrincipalSevenDays | fmoney}}<em>元</em></span>
                    <span>待回款利息：{{userAccount.preInterestSevenDays | fmoney}}<em>元</em></span>
                </div>
            </div>
            <!--pandect end-->

            <!--record-list start-->
            <div class="pandect">
                <h3>出借记录</h3>
                <table class="record-list">
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>借款利率</th>
                            <th>期限</th>
                            <th>还款方式</th>
                            <th>出借金额</th>
                            <th>出借日期</th>
                        </tr>
                    </thead>
                    <tbody v-if="borrowList && borrowList.length">
                        <tr v-for="(item,index) in borrowList" v-bind:key="item.id">
                            <td><span class="hide"><router-link target="_blank" :to="'/borrow/detail/'+item.productId">{{item.productName}}</router-link></span></td>
                            <td>{{item.annualYield | numberFormatter}}%</td>
                            <td>{{item.term}}{{item.termUnit}}</td>
                            <td>{{item.repayMode==0?'到期还本付息':item.repayMode==1?'按月付息，到期体验金收回':item.repayMode==2?'利息一次结清，体验金收回':item.repayMode==3?'一次性还本付息':item.repayMode==4?'按日计息，每日结算':item.repayMode==5?'按月付息，到期还本付息':item.repayMode==6?'等额本息':'等额本金'}}</td>
                            <td>{{item.investAmount | fmoney}}元</td>
                            <td>{{item.investMonth}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="no-data-show" colspan="6">暂无数据</td>
                        </tr>
                    </tbody>
                </table>
                <router-link to="/account/borrowrecord" class="a1">查看更多出借记录&gt;&gt;</router-link>
            </div>
            <!--record-list end-->


            <!--pandect start-->
            <div class="pandect mb40">
                <h3>项目推荐</h3>
                <table class="record-list">
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>借款利率</th>
                            <th>期限</th>
                            <th>项目规模</th>
                            <th>进度</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-if="chosenList && chosenList.length">
                        <tr v-for="(item,index) in chosenList" :key="item.id" >
                            <td>
                                <span class="hide"><router-link :to="'/borrow/detail/'+item.id">{{item.name}}</router-link></span>
                            </td>
                            <td>{{item.annualYield | numberFormatter}}%</td>
                            <td>{{item.term}}{{item.termUnit}}</td>
                            <td>{{item.amount | fmoney}}元</td>
                            <!-- <td>{{item.completedAmount}}元</td> -->
                            <td>
                                <div class="percent">
                                    <div class="bar fl">
                                        <div class="bar-orange" :style="'width:'+item.investSchedule+'%'"></div>
                                    </div>
                                    <div class="hundred fl">{{item.investSchedule | numberFormatter}}%</div>
                                </div>
                            </td>
                            <td><router-link to="/borrow" class="cef6c2d">立即出借</router-link></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr><td class="no-data-show" colspan="6">暂无数据</td></tr>
                    </tbody>
                </table>
            </div>
            <!--pandect end-->

            <!-- </div> -->
        </div>
        <!--pandect-layer end-->

    </div>
</template>

<script>
    import AccountAside from '../public/Aside'
    export default {
        metaInfo: {
            title: '个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行个人中心'
            }]
        },
      name: 'account',
      components: {
        'my-aside': AccountAside
      },
  data () {
        return {
          navType: 'account',
          userAccount: '',
          borrowList: [],
          chosenList: [],
          status: '1',
          count: '3',
          judgeTypeName: true,
          checkAccount: true
        }
  },
  mounted () {
        this.getUserAccounts()
    this.getUserBorrowList()
    this.getChosenList()
  },
  methods: {
        getUserAccounts () {
          this.$api.getUserAccount({isHomeShow: false})
          .then(res => {
            if (res.code == 100) {
			  this.userAccount = res.data
			  if (res.data.judgeTypeName == '0') {
        this.judgeTypeName = false
      }
              if (res.data.checkAccount == '0') {
                this.checkAccount = false
              }
            }
          })
        },
	  getUserBorrowList () {
        this.$api.borrowRecordList({isHomeShow: false, pageNum: 1, pageSize: 3})
          .then(res => {
            if (res.code == 100) {
              this.borrowList = res.data.list
            }
          })
      },
	  getChosenList () {
        this.$api.chosenList({isHomeShow: false, count: this.count})
          .then(res => {
            if (res.code == 100) {
              this.chosenList = res.data
            }
          })
      }
  }
}
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>

