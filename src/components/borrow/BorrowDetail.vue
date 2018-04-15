<!-- 标的详情 -->
<template>
    <div class="container borrow-details">
        <!-- part start -->
        <div class="part">
            <h2 class="title">{{name}}
                <span  v-if="isNovice == 1" class="novice">新手专享</span>
                <span>银行存管</span><span>CFCA电子签章</span>
                <div class="tips-risk">*温馨提醒：市场有风险，决策需谨慎</div>
            </h2>
            <div class="info clearfix">
                <ul class="info-left">
                    <li>
                        <div class="fl rate">{{annualYield | numberFormatter}}%<span v-show="floatingRate">+{{floatingRate | numberFormatter}}%</span></div>
                        <div class="fl term">{{term}}<span>{{termUnit}}</span></div>
                        <div class="fl term">{{amount | fmoney}}<span>元</span></div>
                    </li>
                    <li class="p10 pb50">
                        <div class="fl c9">借款利率</div>
                        <div class="fl c9">项目期限</div>
                        <div class="fl c9">项目规模</div>
                    </li>
                    <li class="p10 pb50">
                        <div class="fl c9">最低金额：<span>{{minInvestmentAmount | fmoney}}元</span></div>
                        <div class="fl c9">起息日：
                            <span v-if="null !== interestStartTime">
                                {{interestStartTime|dateFormat("yyyy-MM-dd")}}
                            </span>
                            <span v-else>
                                <span v-if="interestStartMode == 0">出借当日计息</span>
                                <span v-if="interestStartMode == 1">出借次日计息</span>
                                <span v-if="interestStartMode == 2">满标当日计息</span>
                                <span v-if="interestStartMode == 3">满标次日计息</span>
                            </span>
                        </div>
                        <!--<div class="fl c9">保障方式：<span>{{repayGuarantee}}</span></div>-->
                        <div class="fl c9">安全等级：
                            <star ref="myStar" :level="starLevel"></star>
                        </div>
                    </li>
                    <li class="p10">
                        <div class="fl c9">募集期：<span>{{raiseDay}}天</span></div>
                        <div class="fl c9 w360">项目进度：<span class="progress"><span class="progress-bar" :style="'width:'+schedule+'%;'"></span></span>
                            <div class="fr">{{schedule | numberFormatter}}%</div>
                        </div>
                    </li>
                    <li class="mt30">
                        <div class="c9">注：出借成功后，暂时无法进行提前赎回。</div>
                    </li>
                </ul>
                <div class="info-right" v-if="isLogin">
                    <div class="logining">
                        <img src="/static/images/borrow/avatar-gray.png" alt="">
                    </div>
                    <div class="no-login">您还未登录，快去<a href="/login">登录</a>或<a href="/register">注册</a>吧</div>
                    <a href="/login" class="btn">登&nbsp;&nbsp;&nbsp;录</a>
                </div>
                <div class="info-right" v-else>
                    <div class="c9"><span>账户可用余额：</span>{{balance | fmoney}}元
                        <router-link class="fr recharge" to="/account/Cash">充值</router-link>
                    </div>
                    <div class="borrow-form-group"><input :disabled="productStatus" @keyup="setMoneyError($event)" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" id="investmentMoney" v-model="investmentMoney" :placeholder="'请输入'+minInvestmentAmount+'的整数倍'" />
                        <div class="money-error"
                            v-show="interestByInvestment"><span><em>预计收益：</em>{{interestByInvestment | fmoney}}元</span></div>
                        <div class="money-error" v-html="moneyError" :calss="{error: !!moneyError}" v-show="moneyError"></div>
                    </div>
                    <div class="fz12"><span>剩余金额：</span>{{surplusAmount | fmoney}}元</div>
                    <div class="info-coupon"><span>{{couponSeledText}}</span><span class="input-close" @click="setCouponToNull" v-show="couponSeledId"></span><span class="fr cp" @click="if(!productStatus && conponTypeECount>0){modalShow=true}">有<em>{{conponTypeECount}}</em>张可用&nbsp;&gt;</span></div>
                    <button :disabled="productStatus" class="btn" @click="showSubmitModal">{{productBtnStr}}</button>
                </div>
            </div>
        </div>
        <!-- 优惠券 start -->
        <modal-box :show.sync="modalShow" :title="couponShowText">
            <div slot="context">
                <ul class="wale-list clearfix">
                    <li :class="{'active': 0 === waleIndex}" >现金抵用券<span>{{conponTypeECount}}</span></li>
                    <!-- <li :class="{'active': 1 === waleIndex}" @click="setWaleList(1)">加息券<span>{{conponTypeRateCount}}</span></li> -->
                </ul>
                <my-webfare :list="couponList" @welfareCallback="welfareCallback" v-if="couponList.length"></my-webfare>
                <div class="only-one">只允许选择一张券</div>
            </div>
            <div slot="button">
                <button class="btn ok" @click="ok">确定</button><button class="btn" @click="cancel">取消</button>
            </div>
        </modal-box>
        <!-- 优惠券 end -->
        <div class="part nopdlr">
            <ul class="details-nav clearfix">
                <li :class="{active: index == detailsIndex}" v-for="(item, index) in attrList" @click="detailsIndex = index" :key="index">{{item}}</li>
            </ul>
            <no-data v-show="isLogin && detailsIndex < 4"></no-data>
            <!-- details-info start -->
            <ul class="details-info" v-show="detailsIndex==0">
            <template v-if="detailsBaseList && detailsBaseList.length">
              <li class="details-base-list" v-for="(item, index) in detailsBaseList" :key="index">
                <template v-if="item">
                    <div v-for="(x, y) in item" :key="y">
                        <span class="fl" >{{y}}</span>
                        <p class="fl" v-html="x"></p>
                    </div>
                </template>
              </li>
            </template>
              <li v-show="!isLogin">
                  <span class="fl">保障方式</span>
                  <p class="fl">{{repayGuarantee}}</p>
              </li>
              <li v-show="!isLogin">
                  <span class="fl">还款方式</span>
                  <p class="fl">{{repayModeVel}}</p>
              </li>
              <li v-show="!isLogin">
                  <span class="fl">还款时间</span>
                  <p class="fl">{{payoffTime | dateFormat('yyyy-MM-dd')}}</p>
              </li>
              <li v-show="!isLogin">
                  <span class="fl">风险评测</span>
                  <p class="fl">
                      本产品安全等级<span class="level-star" :class="levelStarClass"></span>，{{levelStarDesc}}
                  </p>
              </li>
              <li v-show="!isLogin">
                  <span class="fl">协议样本</span>
                  <p class="fl"><router-link class="protocol-sample" to="/protocol/borrow" target="_blank">点击查看</router-link></p>
              </li>
              <li v-if="imgList.length" v-show="!isLogin">
                  <span class="fl">项目资料</span>
                  <p class="fl"><big-img v-for="item in imgList" :key="item" :src="item" class="details-big-img"></big-img></p>
              </li>
            </ul>
            <!-- details-info end -->

            <!-- details-风控环节 start -->
            <ul class="details-info" v-show="!isLogin && detailsIndex==1">

                <li><span class="fl">风控措施</span><p class="fl">1.贷前业务资料审查、相关主体信用审查、反欺诈审查、偿还能力审查；2.贷中严谨有效的合同文件签定，落实第三方个人及公司无限连带保证措施；3.贷后专人定期、不定期业务检查，实时跟踪借款项目情况。</p></li>
                <!--<li><span class="fl">风控提示</span><p class="fl">由于债权标的项目受市场、政策、法律等各种因素的影响，我司作为网贷信息中介平台主要提供信息发布和交易撮合服务，不向投资人或对借贷项目提供任何形式的担保，不承诺保本付息，无论是明示或暗示的。我司提供的各种信息及资料仅供参考，不构成任何投资建议或引导，投资人应依其独立判断做出决策并承担由此带来的投资风险。<br>（一）市场风险<br>市场风险是指债权标的的预期收益因受经济因素、政治因素和交易制度等各种因素影响而引起的波动，导致收益水平变化而产生的风险。市场风险主要包括：政策风险、经济周期风险、利率风险和购买力风险。<br>（二）信息风险<br>信息风险是指在项目运作过程中，因信息中介方的知识、经验、判断等会影响其对获取的信息的判断。若信息中介方获取的信息不够全面、准确将可能导致投资人判断有误，从而影响最终的投资收益。<br>（三）违约风险<br>违约风险是指项目融资方因死亡、失踪、停业、解散、撤销、破产，或者被有关监管机构撤销相关业务许可等原因导致不能按时履行还款职责的风险。<br>（四）技术风险<br>技术风险是指因本项目通过互联网信息技术平台进行信息撮合成交，因此可能存在信息技术系统故障的风险。<br>（五）操作风险<br>操作风险是指相关人员在业务操作过程中，因操作失误或操作不规范而引起的风险。<br>（六）不可抗力因素导致的风险<br>不可抗力风险是指遭受无法预见、无法克服、无法避免等不可抗力的客观情况所导致的项目无法按时还款的风险，包括但不限于洪水、地震及其它自然灾害、战争、骚乱、火灾、突发性公共卫生事件、政府征用、没收、法律法规变化或其他突发事件、项目相关方非正常的暂停或终止业务等。"</p></li>-->
            </ul>
            <!-- details-风控环节 end -->

            <!-- 出借记录 start -->
            <table class="details-record-tb" v-show="!isLogin && detailsIndex==2">
                <thead>
                    <th>序号</th><th>出借人</th><th>出借金额(元)</th><th>出借时间</th><th>状态</th>
                </thead>
                <tbody v-if="investmentList.length">
                    <tr v-for="(item, index) in investmentList" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{item.name | stringEncrypt(1) }}</td>
                        <td>{{item.amount | fmoney}}</td>
                        <td>{{item.time}}</td>
                        <td>成功</td>
                        <!-- <td v-if="item.status == 0">
                            投资中
                        </td>
                        <td v-if="item.status == 1">
                            收款中
                        </td>
                        <td v-if="item.status == 2">
                            已收款
                        </td> -->
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" class="no-data-td">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!-- 出借记录 end -->

            <!-- 还款计划 start -->
            <table class="details-record-tb repayment-tb" v-show="!isLogin && detailsIndex==3">
                <thead>
                    <th>还款期数</th><th>应还本金</th><th>应还利息</th><th>应还金额</th><th>还款状态</th><th>还款时间</th>
                </thead>
                <tbody v-if="repaymentPlanList.length">
                    <tr v-for="(item, index) in repaymentPlanList" :key="index">
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
                        <td v-if="item.status == 2">
                            还款处理中
                        </td>
                        <td>{{item.repayTime}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" class="no-data-td">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!-- 还款计划 end -->

            <!-- details-question start -->
            <ul class="details-question" v-show="detailsIndex==4">
                <li>
                    <p>1、什么是债权转让及回购项目</p>
                    <p>答：债权转让及回购项目是金谷财行为了兼顾投资者收益和流动性的需求而特别推出的项目。</p>
                </li>
                <li>
                    <p>2、我出借1万元，如何预估我12个月后的收益？</p>
                    <p>答：以年化收益为8.0%的债权转让及回购项目为例，持有12个月到期后的收益为800元。</p>
                </li>
                <li>
                    <p>3、债权转让及回购项目的收益计算方式是怎样的？</p><p>答：以年化收益率为8.0%，出借期为12个月的项目为例：出借10万元，持有12个月满后的收益约为：100,000×8.0%=8,000元（具体金额以实际到账为准）。</p>
                </li>
                <li>
                    <p>4、我的钱出借给谁？我如何知道还款情况如何？</p><p>答：金谷财行坚持向投资者披露每一笔资金的去向和每一笔借款的还款情况。出借完成后，具体债权明细您可以登录金谷财行账户，在出借记录中查看对应债权明细。</p>
                    </li>
                <li>
                    <p>5、债权转让及回购项目的收益是怎么结算的？</p><p>答：项目满标后次日计息，到期一次性还本付息到您的银行存管账户中。</p>
                </li>
                <li>
                    <p>6、出借期限是指什么？</p><p>答：债权转让及回购项目的出借期限是指该项目最短持有期限，在出借期限内不可以申请退出，出借期后项目自动退出，并且金谷财行不收取您任何退出费用。</p>
                </li>
            </ul>
            <!-- details-question end -->
        </div>

        <!-- 未开卡 start -->
        <modal-box :show.sync="openShow" :title="openText">
            <div slot="context">
                <h3 class="h3">金谷财行开启银行资金存管</h3>
                <p class="text">交易资金由银行全程存管</p>
            </div>
            <div slot="button">
                <router-link to="/borrow/openaccount" class="btn ok">立即开启</router-link>
            </div>
        </modal-box>
        <!-- 未开卡 end -->

        <!-- 未评测 start -->
        <modal-box :show.sync="appraisalShow">
            <div slot="context">
                <p class="text">{{appraisalText}}</p>
            </div>
            <div slot="button">
                <router-link to="/account/appraisal" class="btn ok">去评测</router-link>
            </div>
        </modal-box>
        <!-- 未评测 end -->

        <!-- 确认弹框 start -->
        <modal-box :show.sync="submitShow" :title="submitText">
            <div slot="context" class="submit-box">
                <ul class="submit-info">
                    <li><span>项目名称：</span>{{name}}</li>
                    <li><span>借款利率：</span>{{annualYield | numberFormatter}}%<span v-show="floatingRate">+{{floatingRate | numberFormatter}}%</span></li>
                    <li><span>预期收益：</span>{{interestByInvestment}}元</li>
                    <li><span>项目期限：</span>{{term}}{{termUnit}}</li>
                    <li><span>出借金额：</span>{{investmentMoney | fmoney}}</li>
                    <li v-show="couponSeledText != '请选择优惠券'"><span>优&nbsp;&nbsp;惠&nbsp;&nbsp;券：</span>{{couponSeledText}}</li>
                    <li><span>应付金额：</span>{{ (investmentMoney-couponSeledMoney) | fmoney}}</li>
                </ul>
                
                <div class="error" >{{borrowError}}</div>
            </div>
            <div slot="button">
                <div class="submit-protocol clearfix">
                    <check-style class="s-mt3" :isChecked.sync="submitChecked" name="protocol"></check-style>
                    <label for="protocol">我已阅读并同意</label>
                    <span class="protocol-addon">
                      <router-link target="_blank" to="/protocol/borrow">《平台居间服务协议》</router-link>、
                      <router-link target="_blank" to="/protocol/risktip">《网络借款风险提示书》</router-link>及
                      <router-link target="_blank" to="/protocol/commitmentletter" >《出借资金来源合法承诺书》</router-link>
                    </span>
                </div>
                <button class="btn ok" @click="goBorrow" :disabled="submitDisabled">确认出借</button>
            </div>
            <div slot="tips" class="submit-tips">
                <p>温馨提示：</p>
                <p>1、出借成功后，暂时无法进行提前赎回操作；</p>
                <p>2、市场有风险，出借需谨慎。</p>
            </div>
        </modal-box>
        <!-- 确认弹框 end -->

        <!-- part end -->
    </div>
</template>

<script>
    import NoData from './BorrowNoData'
    import Star from '../public/Star'
    import BigImg from '../public/BigImg'
    import ModalBox from '../public/ModalBox'
    import MyWelfare from '../account/WelfareComponents'
    import CheckStyle from '../public/CheckStyle'
    const sitConfig = require('../../../config/index.js').config
    export default {
        // 注册组件
        components: {
            'no-data': NoData,
            'star': Star,
            'big-img': BigImg,
            'my-webfare': MyWelfare,
            'modal-box': ModalBox,
            'check-style': CheckStyle
        },
        // model属性
        data() {
            return {
                appraisalShow: false, // 是否评测弹框
                appraisalText: '您尚未进行风险测评，暂无法出借项目', // 是否评测弹框内容
                isAppraisal: false, // 是否评测
                isNovice: false, // 是否新手
                borrowError: '', // 出借时的错误提示
                lastTime: 0, // 延迟时间
                submitText: '确认出借', // 确认提示内容
                submitShow: false, // 确认提示显示
                submitChecked: true, // 确认提示框的复选框默认选中
                submitDisabled: false, // 是否可出借
                // isMaskShowClose: false, // 遮罩关闭按钮
                isMaskBlankClose: true, // 遮罩空白处是否点击
                detailsIndex: 0, // 标的基本属性索引
                modalShow: false, // 弹框显示
                waleIndex: -1, // 优惠券索引
                starLevel: 5, // 安全等级
                levelStarClass: '', // 安全等级样式
                levelStarDesc: '', // 安全等级文字
                isCapitalAccount: '', // 是否开通资金存管账户
                isLogin: false, // 是否显示登录框
                investmentMoney: null, // 输入的投资金额
                interestByInvestment: 0, // 根据金额的利息
                moneyError: '', // 错误提示
                balance: 0, // 账户余额
                surplusAmount: 0, // 标的剩余金额
                name: '', // 标的名称
                repayGuarantee: '', // 保障方式
                repayModeVel: '到期还本付息', // 保障方式???
                term: '', // 项目期限
                termUnit: '', // 项目期限单位
                amount: '', // 项目规模
                repayMode: '', // 还款方式
                annualYield: '', // 年化率
                minInvestmentAmount: 0, // 最低金额
                interestStartTime:'',//起息时间
                raiseStartTime: '', // 募集开始时间
                raiseEndTime: '', // 募集结束时间
                raiseDay: '', // 募集期
                interestStartMode: '', // 起息日
                floatingRate: '', // 浮动利率
                schedule: '', // 项目进度
                productStatus: true, // 项目状态
                productBtnStr: '立即出借', // 项目状态文字
                // 登录后显示内容
                payoffTime: null, // 还款时间
                imgList: [], // 项目图片列表
                rentImgList: [], // 出租物图片列表
                pledgeImgList: [], // 抵押物图片列表
                couponList: [], // 优惠券
                couponShowText: '请选择优惠券', // 优惠券弹框标题
                couponSeledText: '请选择优惠券', // 选中的优惠券名称
                couponSeledId: null, // 选中的优惠券id
                couponSeledMoney: 0, // 优惠券金额
                conponTypeRate: [], // 2: 加息券
                conponTypeE: [], // 3: 现金抵用券（e-conpon）
                conponTypeRateCount: 0, // 加息券数量
                conponTypeECount: 0, // 现金抵用券数量
                repaymentPlanList: [], // 还款计划
                investmentList: [], // 出借记录
                attrImgList: [], // 产品图片-标的详情切换
                attrList: ['项目详情', '风控环节', '出借记录', '还款计划'], // 产品属性-标的详情切换
                openShow: false, // 判断是否开户
                openText: '您还没有开户', // 开户标题
                detailsInfoIndex: 0, // 详情切换索引
                detailsBaseList: [], // 标的详情-基本信息
             }
        },
        mounted() {
            this.getDetails()
            let tokenId = this.$cookie.getCookie('tokenId')
            this.isLogin = !tokenId
            if (tokenId) { // 登录后
                this.getUserBalance()
                this.getDetailsOfBase()
            }
        },
        methods: {
            // 输入验证
            setMoneyError(e) {
                this.couponSeledText = '请选择优惠券'
                this.couponSeledId = null
                this.moneyError = null
                this.investmentMoney = this.investmentMoney.replace(/\D/g, '')
                if (this.investmentMoney >= this.surplusAmount) {
                    this.investmentMoney = this.surplusAmount
                    // this.interestByInvestment = 0;
                }
                if (this.minInvestmentAmount > 0) {
                    if (this.investmentMoney % this.minInvestmentAmount !== 0) {
                        this.moneyError = '请输入' + this.minInvestmentAmount + '的整数倍'
                        return;
                    } else {
                        this.moneyError = ''
                    }
                }
                this.lastTime = e.timeStamp
                let tempObj = {
                    productId: this.$route.params.id,
                    amount: this.investmentMoney
                }
                setTimeout(() => {
                    if (this.lastTime - e.timeStamp == 0) {
                        if (this.investmentMoney) {
                            // 获取优惠券
                            this.getCouponsById()
                        } else {
                            this.couponList = []
                            this.conponTypeE = []
                            this.conponTypeRate = []
                            this.conponTypeECount = 0
                            this.conponTypeRateCount = 0
                        }
                        // 获取利息
                        this.$api.getInterestByAmount(tempObj)
                            .then(res => {
                                this.interestByInvestment = res.data
                            })
                    }
                }, 500)
            },
            // 获取标的详情
            getDetails() {
                this.$api.borrowDetails({
                        id: this.$route.params.id
                    })
                    .then(res => {
                        if (res.code == 100) {
                            this.starLevel = parseInt(res.data.safetyRating || 5);
                            this.$refs.myStar.setLevel(this.starLevel);
                            this.name = res.data.name;
                            this.isNovice = res.data.type;
                            this.amount = res.data.amount;
                            this.repayModeVel = '到期还本付息';
                            this.term = res.data.term;
                            this.termUnit = res.data.termUnit;
                            this.repayMode = res.data.repayMode;
                            this.annualYield = res.data.annualYield;
                            this.minInvestmentAmount = res.data.minInvestmentAmount;
                            this.interestStartTime = res.data.interestStartTime;
                            this.raiseStartTime = res.data.raiseStartTime;
                            this.raiseEndTime = res.data.raiseEndTime;
                            this.schedule = res.data.schedule;
                            this.floatingRate = res.data.floatingRate;
                            this.surplusAmount = res.data.surplusAmount;
                            this.raiseDay = res.data.raiseDay;
                            this.interestStartMode = res.data.interestStartMode;
                            this.repayGuarantee = res.data.repayGuarantee;
                            this.productBtnStr = res.data.isPreheat == 1 ? '即将上线' : this.productBtnStr;
                            // 设置按钮状态
                            switch (res.data.status) {
                                case 6:
                                    this.productStatus = false;
                                    break;
                                case 7:
                                    this.productStatus = false;
                                    break;
                                case 8:
                                    this.productBtnStr = '募集完成';
                                    break;
                                case 9:
                                    this.productBtnStr = '募集完成';
                                    break;
                                case 10:
                                    this.productBtnStr = '还款中';
                                    break;
                                case 11:
                                    this.productBtnStr = '已结束';
                                    break;
                                default:
                                    break;
                            }

                            if(res.data.isPreheat == 1){
                              this.productStatus = true;
                            }

                            // 登录后显示内容
                            let tokenId = this.$cookie.getCookie('tokenId');
                            if (tokenId) {
                                this.investmentList = res.data.investmentList;
                                this.repaymentPlanList = res.data.repaymentPlanList;
                                this.attrImgList = res.data.attrImgList;
                            }
                            switch (this.starLevel) {
                              case 1:
                                this.levelStarClass = 'ls-one';
                                break;
                              case 2:
                                this.levelStarClass = 'ls-two';
                                break;
                              case 3:
                                this.levelStarClass = 'ls-three';
                                break;
                              case 4:
                                this.levelStarClass = 'ls-four';
                                break;
                              default:
                                break;
                            }
                            this.levelStarDesc = sitConfig.star[(this.starLevel-1)].desc;
                        }
                    })
            },
            // 获取用户信息
            getUserBalance() {
                this.$api.getUserInfo({})
                    .then(res => {
                        if (res.code == 100) {
                            this.balance = res.data.balance;
                            this.isCapitalAccount = res.data.openAccountStatus;
                            this.isAppraisal = parseInt(res.data.judgeScore);
                        }
                    })
            },

            // 设置评测弹框文字
            setAppraisalText() {
              this.appraisalText = '跟据您风险测评的结果，不允许出借该项目。若希望出借该项目，请重新进行风险评测。';
              this.appraisalShow = true;
            },

            // 确认出借弹框
            showSubmitModal() {
                this.borrowError = null;
                // 判断风险评测
                if(!this.isAppraisal){
                  this.appraisalShow = true;
                  return;
                } else {
                  // 根据评测结果提示是否可出借
                  if(this.isAppraisal >= 61 && this.isAppraisal <= 75 && this.starLevel <= 1){
                    this.setAppraisalText();
                    return;
                  }
                  if(this.isAppraisal >= 46 && this.isAppraisal <= 60 && this.starLevel <= 2){
                    this.setAppraisalText();
                    return;
                  }
                  if(this.isAppraisal >= 30 && this.isAppraisal <= 45 && this.starLevel <= 3){
                    this.setAppraisalText();
                    return;
                  }
                  if(this.isAppraisal <= 29 && this.starLevel !== 5){
                    this.setAppraisalText();
                    return;
                  }
                }
                if (this.moneyError) {
                    return
                }
                if (this.investmentMoney <= 0) {
                    this.moneyError = '请输入出借金额'
                    return;
                }
                if (this.isCapitalAccount != 1) {
                    // 弹框提示开通资金存管账户
                    this.openShow = true
                    return;
                }
                if (this.balance < this.investmentMoney) {
                    this.moneyError = '账户余额不足，请充值'
                    return;
                }
                this.submitShow = true
            },
            // 开始出借
            goBorrow() {
                this.borrowError = null;
                this.submitDisabled = true;
                this.$api.investDo({
                        productId: this.$route.params.id,
                        productName: this.name,
                        amount: this.investmentMoney,
                        bonusId: 0,
                        bonusAmount: 0,
                        fkCouponId: this.couponSeledId,
                        couponAmount: this.couponSeledMoney == 0 ? null : this.couponSeledMoney
                    })
                    .then(res => {
                        if (res.code == 100) {
                            this.$router.push({
                                name: 'borrowSuccess',
                                params: {
                                    desc: res.data
                                }
                            })
                        } else {
                            this.submitDisabled = false
                            this.borrowError = res.msg
                        }
                    })
            },
            // 获取全部优惠券
            getCouponsById() {
                let _this = this
                this.$api.getCoupons({
                    pageNum: 1,
                    pageSize: 999999,
                    userStatus: 1,
                    investMoney: this.investmentMoney,
                    moneyflowId: this.$route.params.id
                }).then(res => {
                    if (res.code == 100) {
                        _this.couponList = res.data.list
                        _this.conponTypeRate = []
                        _this.conponTypeE = []
                        for (let i = 0; i < _this.couponList.length; i++) {
                            if (_this.couponList[i].couponType == 2) {
                                _this.conponTypeRate.push(_this.couponList[i])
                            }
                            if (_this.couponList[i].couponType == 3) {
                                _this.conponTypeE.push(_this.couponList[i])
                            }
                        }
                        _this.conponTypeECount = _this.conponTypeE.length
                    }
                })
            },
            // 根据类型获取优惠券数量
            getCouponCountByType(couponType, investMoney) {
                this.$api.getCouponCountByType({
                    userStatus: 1,
                    couponType: couponType,
                    investMoney: (investMoney || this.investmentMoney),
                    moneyflowId: this.$route.params.id
                }).then(res => {
                    if (res.code == 100) {
                        if (couponType == 2) { // 优惠券
                            this.conponTypeRateCount = res.data.count
                        }
                        if (couponType == 3) { // 现金抵用券
                            this.conponTypeECount = res.data.count
                        }
                    }
                })
            },
            // 输入框的错误提示
            showError() {
                let moneyReg = /\D/g
                if (!moneyReg.test(this.investmentMoney)) {
                    this.investMoney = null
                }
            },
            // 选中优惠券后的回调
            welfareCallback(data) {
                this.couponSeledText = data.couponName
                this.couponSeledId = data.id
                this.couponSeledMoney = data.couponAmount
            },
            // 弹框方法们
            ok() {
                if (this.couponSeledId) {
                    this.modalShow = false
                }
            },
            cancel() {
                this.modalShow = false
                this.setCouponToNull()
            },
            modalClose() {
                this.modalShow = false
            },
            openClose() {
                this.openShow = false
            },
            // 弹框方法们 end
            // 取消优惠券
            setCouponToNull() {
                this.couponSeledText = '请选择优惠券'
                this.couponSeledId = null
                this.couponSeledMoney = 0
            },
            // 查看优惠券类型
            setWaleList(index) {
                this.waleIndex = index
                this.couponList = index == 0 ? this.conponTypeRate : this.conponTypeE
            },
            // 项目详情
            getDetailsOfBase() {
                this.$api.getDetailsOfBase({
                        id: this.$route.params.id
                    })
                    .then(res => {
                        if (res.code == 100 && res.data) {
                            if (res.data.productIntroduceList && res.data.productIntroduceList.length) {
                                this.detailsBaseList = res.data.productIntroduceList
                            }
                            if (res.data.payoffTime) {
                                this.payoffTime = res.data.payoffTime
                            }
                            if (res.data.enterpriseList && res.data.enterpriseList.length) {
                                this.imgList = this.imgList.concat(res.data.enterpriseList)
                            }
                            if (res.data.rentList && res.data.rentList.length) {
                                this.imgList = this.imgList.concat(res.data.rentList)
                            }
                            if (res.data.pledgeList && res.data.pledgeList.length) {
                                this.imgList = this.imgList.concat(res.data.pledgeList)
                            }
                        }
                    })
            }
        },
        watch: {
            submitChecked: function(newVal) {
                this.submitDisabled = !newVal
            }
        },
        metaInfo() {
            return {
                title: this.name + '-金谷财行',
                meta: [{
                    name: 'keyWords',
                    content: this.name + '-金谷财行'
                }]
            }
        }
    }
</script>

<style lang="scss">
/* 标的详情 start */
.borrow-details{
    margin:0 auto;

    .part{
        margin:20px auto;padding:30px 40px 35px;background-color: $cf;

        .title{
            padding:15px 0;font-size: 22px;color: $c3;border-bottom:1px solid #eee;
            
            span{display: $dib;margin-left: 20px;padding:5px 10px;font-size: $px14;color: $c9;border: 1px dashed $c9;border-radius: 15px;}
            // 新手标识
            .novice{color: $cef6c2d; border: 1px dashed $cef6c2d;}
            .tips-risk{float: right;font-size: $px16;color: #e84a55;}
        }
        .info{
            margin-top:30px;

            .info-left{
                float: left;width: 735px;
                li{
                    clear: both;

                    .fl{
                        width: 230px;

                        &.w360{width: 360px;}
                    }
                    &.p10{padding:10px 0;}
                    &.mt30{margin-top: 30px;}
                    &.pb50{padding-bottom: 50px;}
                    
                    .rate{
                        font-size: 36px;color: $cef6c2d;
                        
                        span{font-size: 20px;}
                    }
                    .term{
                        font-size: 36px;color: $c3;

                        span{font-size: 20px;}
                    }
                    .c9{
                        font-size: $px14;color: $c9;
                        
                        span{color: $c3;}
                    }
                    .progress{
                        display: $dib;width: 230px;height: 6px;background-color: #eee;

                        .progress-bar{display: $db;height: 6px;background-color: $cef6c2d;}
                    }
                }
            }

            .info-right{
                float: right;width: 339px;padding:0 0 30px 40px;border-left:1px solid #eee;
                
                .logining{padding-bottom:25px;text-align: center;}
                .no-login{
                    font-size: $px14;color: $c3;text-align: center; 
                
                    a{color: $cef6c2d; }
                }
                .c9{
                    padding: 5px 0;font-size: $px16;color: $c3;
                    
                    span{font-size: $px14;color: $c9;}
                    .recharge{font-size: $px14;color: $cef6c2d;}
                }
                .fz12{
                    padding: 15px 0;font-size: $px12;color: $c3;
                    span{color: $c9;}
                }
                .borrow-form-group{
                    position: relative;height: 40px;margin-top: 10px;border: 1px solid #eee;border-radius: 5px;

                    input{
                        height: 40px;padding-left: 20px;
                        &:disabled{background: none; }
                    }
                    .money-error{
                        position: absolute;top: 7px;right: 4px;padding:5px;font-size: $px12;background-color: #f7f4f2;border-radius: 5px;color: $cef6c2d;
                        em{color: $c9;}
                    }
                }
                .info-coupon{
                    padding:10px 20px;font-size: $px14; color: $c6;border: 1px solid #eee;background-color: #faf8f8; border-radius: 5px;clear: both;overflow: hidden;

                    span{
                        float: left;margin-right: 10px;
                    
                        &.fr{float: right;}
                        &.input-close{margin-top: 2px;}
                    }
                    em{padding:0 2px;color: $cef6c2d;}
                }
                .cp{cursor: pointer;}
            }
        }

        /* 详情-详细信息 start */
        .details-info{
            padding: 0 30px;

            li{
               padding:20px 80px;clear: both;overflow: hidden; 

               span.fl{display: $dib;width: 100px;text-align: center;font-size: $px16;color: $c6;}
               p.fl{width: 780px;margin-left: 75px;font-size: $px16;color: $c6;line-height: 1.6rem;}
               &:nth-child(even){background-color: #fafafa;}
               .details-tb td{padding: 10px;border: 1px solid #666;text-align: center;}
               .details-big-img{
                    float: left;display: block;width: 120px;height: 160px;margin-right: 30px;
                    img{width: 100%;}
                }
            }
        }
        /* 详情-详细信息 end */

        /* 详情-常见问题 start */
        .details-question{
            margin: 30px 0 0;padding: 0 30px;

            li{
                padding:20px 80px;font-size: $px16;color: #232c35;

                &:nth-child(odd){background-color: #fafafa;}
            }
        }
        /* 详情-常见问题 end */

        /* 详情-具体信息 start */
        &.nopdlr{
            padding:30px 0 35px;

            /* 详情-基本属性-导航 start */
            .details-nav{
                padding:0 50px;border-bottom: 1px solid #eee;background-color: #fff;
                
                li{
                    float: left;width: 100px;margin:0 60px;padding:35px 0 20px;text-align: center;border-bottom: 2px solid #fff;cursor: pointer;

                    &.active{border-color: $cef6c2d;color: $cef6c2d;}
                }
            }
            /* 详情-基本属性-导航 end */

            .details-base-list{

            }

            /* 详情-记录表格 start */
            .details-record-tb{
                width: 1120px;margin: 30px 40px;
                th{width: 20%;height: 64px;font-weight: normal;text-align: center;background-color: #fafafa;font-size: $px18;color: $c9;}
                tr:nth-child(even){background-color: #fafafa;}
                td{
                    height: 64px;font-size: $px18;color: #232c35;text-align: center;
                    &.no-data-td{padding:50px 0;color: $c9;}
                }
                &.repayment-tb{
                    th{width: 16%;}
                }
            }
            /* 详情-记录表格 end */
        }
        /* 详情-具体信息 end */
    }

    /* 确认提示框内容 start */
    .submit-box{
        padding: 35px 0;
        .submit-info{
            width: 100%;
            li{height: 45px; }
        }
        .error{height: 10px;padding: 10px 0;color: $cef6c2d;}
    }
    .submit-protocol{
        padding-bottom: 15px;font-size: $px14;color: $c6;
        .s-mt3{margin-top: 3px;}
        a{color: $cef6c2d;}
        label{float: left;margin-top: 2px;}
        .protocol-addon{
          float: left;margin-top: 2px;
          a{
            width: auto;margin: 0 auto;font-size: $px14;height: auto;line-height: inherit;border: 0;
            &:hover{background: none;color: #dd5919; }
          }
        }
    }
    /* 确认提示框内容 end */

    /* 无数据 start */
    .no-data{
        height: 138px;margin:100px auto;text-align:center;padding-top:170px;font-size: 22px;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACKCAMAAAANBCGGAAABO1BMVEUAAADxZQvwVQDwVgDwVQDwVwDybB3ybB3yax3yax3yaxzyax3yax3ybB3////ybB3ycCbyax3yaxzyahvwWwDybB3yaxryaxzybB3wWwDxYgPxax3ybB7/8OnybB3yahnyax3ybBzybB3xYQHxbB3ybB3ybB3ybB3ybB3ybB3wXwTybB3xZQzwVwDyax3ybB7////xbB3ybB7wXADwXQDxbB3////tTADuRgD2lGDuSwD85tv/////////6Nv/9/H4qoLzdS/ybB3xYwb/+PT5s4/8z7j7waTxbyP/6N3/9fD4q4P/69//+/fybyTwUwD/5dj0gEH4pnv/5NX7w6b8xaj/8+z3oXTzeDXxZhH818P7yrH1iU71hEfyciryahj+4dH2mGb//fv93Mz8xqv5rYj5u5r1jVfvWQC5L5uLAAAAPXRSTlMAR8641Lj77guEVbzbnFwfEEA5GNh8QzIHzokbAv6jbFwnFYTztK52TcufltbHwolX6eW07dDo1M2yjF1NvzJT3QAABWtJREFUeNrtnOlW2lAUhW8npmBFZstsFZy185ggJ2mVACKDSAFFnN//CZo5LYWSBmJya/aC5AA//NbOOfvmokukQSlwOJ3gXUCWlxs25hHyb4PlWSOQEwtiOYqsrRWvVCxBCllbjpxcvSOQpRVXvVx7h6yt1xtKlUTWlhtcYrEKfmRt+Zxen5gEWWR1RRwQWggnYTuOLK/AnBPAm0NYyDUfw8BSW7Zs2bKFoTLrSwgPxTZhM4Zw0NLibed00Yesr1jwlCIbp8EAsroCi6dHLMU2aotW79dAsEaxFEWxRzWL90AsyHta5Fkbt5sRZIDC64+f/ps+bD4fNVG1oxYliryhU2jmcr3pD272/1FXld1RE8WKoGVmH9zxkT8sN0WQxd+0O6QePf/TU460yJNWjn+8QCM1D2H9qC/PEqQ+PR+aqLLiaZN+icahLui//G9vSL3a/cXTrVpDJq00f7xEBqD6D8ukbj3/NaXEiSqKnhqB+qjAkPq1Kyf/BE8VuSBiAqrq61KwJuRpscj16TE9ZqKSTl6wzB8Jfah5chrtismf56+9kFJjPU3NcUrCCn8KmYFKfvV9VJK/yFyJno4XZKTCBNSEty14SvFXX+3T8WNlGipTODtSJuqKS37LorKHwK+m6kRNRA2blAD5NjT42R9eTa2Xq+wZSHd9RdHTiYpGXKY0QKsAjTx/8WVPNckMV9kCyBNVrFxVPyNtMsHVVuGgkZf7dP/uExqSdVCZAjSE2ec9bVZP3g/vCyyDyk2UsppW9qv1P++1kUV6lWnDOSs4SpV5T0fsCwxHZdh8nslLT/biL57Ks88Inupm1d8AtSqtqtoZn/wcqTRRkqfDrIajdrrfVXVbYzztU3lpokRPx7Ca3qss16eKpwqp8ayqq9pJ+2pKHQ+Rkq0vSJL5qBe9/rma/MOk5N4W0qpw1uEgPAY2wCV9XOEtFT09Gf64/gRpVBLW3G4CCJdhqDd9qvynp6qrWlE3IC1YC4RhDXBSSxSpouypbtRVSIuFHzwGoV606y3h6jNNzlP9qIRXqbYNQi3TVyx38RMX8mo6jPoMadLyily5HQahNg8vWwkmcX4tkOp31amg7hiFOuhdsJ1S7wd9TU6Fmn0lV2uEQQlQ630r9A9uu4kxn5c0NoAfQmLhgbAxrlL0XfukW1Fe6w+rEIRcCMXTkDQorC7rl4xY6XZVZX29suKFjXvZsepKAFWZDa836UemoaoNYP7tinZUC9yv/jeuKr1qOOr+9bdxqp9by9UefXjA6VB4iqX8xl3zX121eK/aqLihYpSrGKHOtgFKtqsPGxWjBihhlKv4uIrRalXCJ1cxWgIwagB7rB74anWPrvZocTclHpUdlvSGWh/clUxzVd2xalO9Q+LeqxihYrQEYJQANurDHiucNiz4oOLUq3au4uYqRqgYNQBjf7uC0EPuVWxRO93vetS9vP/blVqV1qPq7f26qv796m9iGPEkVkMP6cQy+IUVTmOFz631A3LVlYnj8v3qqsOHyz2AB3y49KqNakQD+MH0sArMByZARlNuTlnY4U8e01arMAEARPjvMeV18ALhmDTrK4scrKUX0muQ0xBWEDUzVz0QEs4h8GgYK5eJq1X81bZUEa/iFkqAEah+8KuVhVBH9KpHaT/X5A5Im7oErMK8VMVgdRJqZidq4i/ZAxCSqhAEkH6FjXcVzUFGdAzm0BSKwNFMUQfro8J9Oc234bLXNQ1qNHg9S9LEyMGJZvn/CwHZKJpKqf75DFEHi6NxIjtz7giaVutn3cqMQMuDtxlkpF7QvXqptLe3xz2Fo3gSK7lWy9Lvr0v8Y084DA62IshYLaxvPZ6F3qQ0j81PyUhxULY/05sAAAAASUVORK5CYII=) top center no-repeat;

        a{color: $cef6c2d;}
    }
    /* 无数据 end */

    /* 提交确认弹框下方tips start */
    .submit-tips{
        padding: 20px 0 30px 60px;
        p{font-size: $px14;color: $c9;}
    }
    /* 提交确认弹框下方tips end */
}
/* 标的详情 end */

/* 标的出借成功 start */
.borrow-success{
  margin: 30px auto;padding: 100px 0;text-align: center;background-color: $cf;
  
  .succ-icon{
      width: 53px;height: 53px;margin: 20px auto;background: $cf url(/static/images/borrow/borrow-success.png) center center no-repeat;
  }
  .h2{padding: 20px 0;}
  .btn{
    display: $dib;width: 164px; height: 38px; 

    &.btn-default{
      color: #747474;background-color: $cf;border: 1px solid #ddd;
      &:hover{background-color: #e6e6e6;border: 1px solid #ccc;}
    }
  }

  /* 出借成功 提示语 */
  .borrow-succ-desc{
    padding: 15px 0 25px;
  }
}
/* 标的出借成功 end */

/* 福利列表 start */
.wale-list{
    li{
        float: left;margin: 15px 15px 15px 0;border-right: 2px solid #eee;cursor: pointer;

        span{padding:10px;}
        &:last-child{border: 0;}
        &.active{color: $cef6c2d;}
    }
}
/* 福利列表 end */

.btn{
    display: $db;width: 100%;height: 38px;margin: 10px 0;padding: 0;text-align: center;line-height: 38px;background-color: $cef6c2d;color: $cf;font-size: $px14;border: 1px solid $cef6c2d;border-radius:4px;cursor: pointer;transition: all .35s;

    &:hover{background-color: #dd5919;border: 1px solid #dd5919;}
    &.disabled,&:disabled{background-color: #bbb;border-color: #bbb;cursor: not-allowed;}
}

/* 协议样本 */
.protocol-sample{
  color: $cef6c2d;
  &:hover{color: #dd5919;}
}

.only-one{padding-top: 20px;font-size: $px14;color: $cef6c2d;}

.level-star{
    display: $dib;
    width: 55px;
    height: 11px;
    margin-right: 3px;
    background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAMFBMVEUAAAD/kgD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kgAg/sriAAAAD3RSTlMAd6pEiO7MMxEi3buZZlXpLLixAAAAP0lEQVQI12NgYGBnAIM2CGXfAKb8DYCEjGO+opMBQ9P///8/ArlP/38rAFLcYA7D/KBfIEq04D5IqSYDswMDACMJEMu0wLSnAAAAAElFTkSuQmCC) left center repeat-x;

    &.ls-one{width: 11px;}
    &.ls-two{width: 22px;}
    &.ls-three{width: 33px;}
    &.ls-four{width: 44px;}
}
</style>
