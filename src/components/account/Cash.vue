<!-- 充值提现 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录  -->
        <div class="account cash">
            <ul class="account-tabs clearfix">
                <li v-for="(item,index) in myNav" @click="nowIndex = index;cashTabsIndex = 0;txAmount=null;" :key="index" :class="{active: index === nowIndex}">{{item.title}}<span class="bdbp"></span></li>
            </ul>
            <div v-show="isShowMe">
                <!-- 充值 start -->
                <div :class="{dn: nowIndex !== 0}">
                    <!-- cash-tabs start -->
                    <div class="cash-tabs">
                        <ul>
                            <li v-show="userType=='1'" :class="{active: 0 === cashTabsIndex}" @click="cashTabsIndex = 0;">快捷充值</li>
                            <li :class="{active: (1 === cashTabsIndex || userType !='1')}" @click="cashTabsIndex = 1;">网银支付</li>
                        </ul>
                        <div class="fr"><router-link class="cash-tabsrecord" to="/account/capitalflow">查看充值记录</router-link></div>
                    </div>
                    <!-- cash-tabs start -->
                    <!-- cash-recharge 快捷充值 start  -->
                    <ul class="cash-recharge" v-show="cashTabsIndex == 0 && userType == '1'">
                        <li><div class="fl">银行存管账户：</div><div class="fl"><span class="cash-account"></span><span class="cash-tc">{{accountId}}</span></div></li>
                        <li>
                            <div class="fl">绑定银行卡：</div>
                            <div class="fl">
                                <span class="binded-bank"><img v-show="bankUrl" :src="bankUrl" alt=""></span>
                                <span class="cash-tc">{{bankCardNo}}</span>
                            </div>
                        </li>
                        <li class="limit" v-show="bankUrl">
                            单笔限额：{{onceLimitAmount}}万元，单日限额：{{dailyLimitAmount}}万元
                            <span v-if="unionPay==1">
                                需开通银联在线支付功能，
                                <a href="https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay" target="_blank">立即开通</a>
                            </span>
                        </li>
                        <li>
                            <div class="fl">充值金额：</div>
                            <div class="fl">
                                <div class="account-form-group">
                                    <input type="text" v-model="txAmount" maxLength="11" v-on:blur="changeTxAmount(txAmount)" placeholder="请输入充值金额" /><span class="input-addon">元</span>
                                    <div class="error" v-show="amountError">{{amountError}}</div>
                                </div>
                            </div>
                        </li>
                        <li><div class="fl">预留手机号：</div><div class="fl">{{bankMobile}}</div></li>
                        <li>
                            <div class="fl">短信验证码：</div>
                            <div class="fl">
                                <div class="account-form-group"><input type="text" maxlength="6" v-model="smsCode" placeholder="请输入手机短信验证码" /></div>
                                <div class="error" v-show="smsCodeError">{{smsCodeError}}</div>
                            </div>
                            <div class="fl"><timer ref="timerBtn" class="cash-btn" @run="getPhoneCode" @callback="callback">获取验证码</timer></div>
                        </li>
                        <li class="li-tc"><button class="btn ml120" :disabled="rechargeDisabled" @click="recharge">充值</button></li>
                    </ul>
                    <!-- cash-recharge 网银充值 end  -->
                    <ul class="cash-recharge" v-show="cashTabsIndex == 1 || userType != '1'">
                        <!-- <li class="li-tc clearfix"><div class="fl">限额说明：</div><div class="fl w500">1.短信认证：2000元／笔，5000元／日；<br>2.工行e支付：5000元／笔，5000元／日；<br>3.电子密码：50万元／笔，100万元／日；<br>4.USBKey（U盾）客户：100万元／笔，100万元／日。</div></li> -->
                        <li><div class="fl">可用余额：</div><div class="fl">{{balance}}元</div></li>
                        <li>
                            <div class="fl">充值金额：</div>
                            <div class="fl">
                                <div class="account-form-group">
                                    <div class="input-group">
                                        <input type="text" v-model="txAmount2" maxLength="11" placeholder="请输入充值金额" />
                                        <span class="input-addon">元</span>
                                        <div class="error" v-show="amountError2">{{errorMsg}}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="li-tc"><button class="btn ml120" :disabled="gateWayDisabled" @click="gateWay">确认充值</button></li>
                    </ul>
                    <!-- cash-withdraw end  -->
                </div>
                <!-- 充值 end -->

                <!-- 提现 start -->
                <div :class="{dn: nowIndex !== 1}">
                    <!-- cash-recharge start  -->
                    <ul class="cash-recharge">
                        <li><div class="fl">银行存管账户：</div><div class="fl"><span class="cash-account"></span><span class="cash-tc">{{accountId}}</span></div></li>
                        <li>
                            <div class="fl">绑定银行卡：</div>
                            <div class="fl"><span class="binded-bank"><img v-show="bankUrl" :src="bankUrl" alt=""></span><span class="cash-tc">{{bankCardNo}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="fl">可提现金额：</div>
                            <div class="fl">{{brfaBalance | fmoney}}元</div>
                        </li>
                        <li>
                            <div class="fl">提现金额：</div>
                            <div class="fl">
                                <div class="account-form-group">
                                    <div class="input-group"><input type="text" v-model="txAmount3" maxLength="11" v-on:blur="changeBrfaBalance(txAmount3)" placeholder="请输入提现金额" /><span class="input-addon">元</span></div>
                                    <div class="error" v-show="withdrawAmountError">{{withdrawAmountError}}</div>
                                </div>
                            </div>
                        </li>
                        <li><div class="fl">预留手机号：</div><div class="fl">{{bankMobile}}</div></li>
                        <li>
                            <div class="fl">短信验证码：</div>
                            <div class="fl">
                                <div class="account-form-group"><input type="text" maxlength="6" v-model="smsCode" placeholder="请输入手机短信验证码" /></div>
                                <div class="error" v-show="withdrawError">{{withdrawError}}</div>
                            </div>
                            <div class="fl"><timer ref="timerBtn2" class="cash-btn" @run="getPhoneCode2" @callback="callback">获取验证码</timer></div>

                        </li>
                        <li class="li-tc"><button class="btn ml120" :disabled="withdrawDisabled" @click="withdraw">确认提现</button></li>
                    </ul>
                    <!-- cash-recharge end  -->
                </div>
                <!-- 提现 end -->

                <div class="cash-tips" v-show="nowIndex === 0">
                    <p>温馨提示</p>
                    <p>1.金谷财行已完成银行提供资金存管</p>
                    <p>2.当日充值资金，当日不能提现，需到第二个工作日12点后才可提现</p>
                    <p>3.充值过程如遇问题，请联系客服：400-770-6678</p>
                </div>

                <div class="cash-tips" v-show="nowIndex === 1">
                    <p>温馨提示</p>
                    <p>1.金谷财行已开启银行资金存管</p>
                    <p>2.提现到账时间：<br/>
                        （1）单笔提现金额小于5万（含），取决于银行发起时间，一般情况下为2小时内到账（不区分节假日）；<br/>
                        （2）单笔提现金额大于5万元且小于50万元（含），工作日8:30 - 16:30：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；工作日16:30之后：下一个工作日工作时间到账；非工作日：取决于银行发起时间，一般情况下为2小时内到账；<br/>
                        （3）单笔提现金额大于50万元，工作日8:30 - 16:30：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；工作日16:30之后：下一个工作日工作时间到账；非工作日：不支持提现，请分笔提现或下个工作日提现。
                    </p>
                    <p>3.当日充值资金，当日不能提现，需到第二个工作日12点后才可提现</p>
                    <p>4.提现过程如遇问题，请联系客服：400-770-6678</p>
                </div>

            </div>
            <div v-show="txShow">
                <div class="cash-result" v-show="isSuccess">
                    <p><span class="cash-succ-icon">恭喜您，成功提现了{{showMoney | fmoney}}元！</span></p>
                    <!--<p class="p30">恭喜获得20元现金抵用券，请到我的账户——<a href="/account/welfare">我的福利</a>中查看</p> -->
                    <p><router-link to="/account/capitalflow" class="btn btn-default">查看提现记录</router-link></p>
                </div>
                <!-- cash-result end -->
                <!-- 充值中 start -->
                <div class="cash-result" v-show="isIng">
                    <p><span class="cash-ing-icon">提现银行处理中</span></p>
                    <p><router-link to="/account/cash" class="btn btn-default">查看提现记录</router-link></p>
                </div>
                <!-- 充值中 end -->
                <!-- 充值失败 start -->
                <div class="cash-result" v-show="isFail">
                    <p><span class="cash-fail-icon">提现失败</span></p>
                    <p class="p30">{{failMessage}}</p>
                    <p><router-link to="/account/cash" class="btn btn-default">返回</router-link></p>
                </div>
                <!-- 充值失败 end -->
            </div>
            <div v-show="czShow">
                <div class="cash-result" v-show="isSuccess">
                    <p><span class="cash-succ-icon">恭喜您，成功充值了{{ showMoney | fmoney }}元！</span></p>
                    <!--<p class="p30">恭喜获得20元现金抵用券，请到我的账户——<a href="/account/welfare">我的福利</a>中查看</p> -->
                    <p><router-link to="/account/capitalflow" class="btn btn-default">充值记录</router-link><router-link to="/borrow" class="btn">我要出借</router-link></p>
                </div>
                <!-- cash-result end -->
                <!-- 充值失败 start -->
                <div class="cash-result" v-show="isFail">
                    <p><span class="cash-fail-icon">充值失败</span></p>
                    <p class="p30">{{failMessage}}</p>
                    <p><router-link href="/account/cash" class="btn btn-default">返回</router-link></p>
                </div>
                <!-- 充值失败 end -->
                <!-- 充值中 start -->
                <div class="cash-result" v-show="isIng">
                    <p><span class="cash-succing-icon">充值中</span></p>
                    <p class="p30">我们暂时还未收到银行给我们的反馈信息，<br>为避免重复充值，麻烦您在资金流水中查看充值最终结果</p>
                    <p><router-link href="/account/capitalflow" class="btn">查看充值记录</router-link></p>
                </div>
                <!-- 充值中 end -->
            </div>
        </div>
        <div class="dn" ref="bankForm"></div>

        <!-- 未绑卡 start -->
        <modal-box :show.sync="bindShow" :title="bindText" v-if="bindShow">
            <div slot="context">
                <p class="text">您尚未绑定银行卡，请先进行绑卡。</p>
            </div>
            <div slot="button">
                <router-link to="/account/securitysetting" class="btn ok">去绑卡</router-link>
            </div>
        </modal-box>
        <!-- 未绑卡 end -->

        <!-- 未开户 start -->
        <modal-box :show.sync="openShow" :title="openText" v-if="openShow">
            <div slot="context">
                <p class="text">{{openStr}}</p>
            </div>
            <div slot="button">
                <div v-if="webAccount == '3'"></div>
                <button v-else @click="openShow=false" class="btn ok">去开户</button>
            </div>
        </modal-box>
        <!-- 未开户 end -->
    </div>
</template>

<script>
    import AccountAside from '../public/Aside'
    import timerBtn from '../public/sendSmsCode.vue'
    import ModalBox from '../public/ModalBox'
    const sitConfig = require('../../../config/index.js').config

    export default {
        metaInfo: {
            title: '存值/提现-个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行存值提现'
            }]
        },
        name: 'borrowrecord',
        components:{
            'my-aside': AccountAside, 'timer': timerBtn, 'modal-box': ModalBox
        },
        data(){
            return {
                rechargeDisabled: false, // 充值按钮禁用状态
                withdrawDisabled: false, // 提现按钮禁用状态
                gateWayDisabled: false, // 确认充值按钮禁用状态
                webAccount: null, // 是否开户,1已开户、2未开户、3验证中
                openStr: '您尚未开户，请先开户', // 未开户的提示语
                openShow: false,
                openText: '未开户',
                bindShow: false, // 绑卡显示
                bindText: '未绑卡', // 绑卡提示
                navType: 'account',
                txAmount: null, // 充值金额
                txAmount2: null, // 网银充值金额
                txAmount3: null, // 提现金额
                amountError: null, // 金额提示
                amountError2: null, // 网银充值金额提示
                smsCodeError: null, // 短信提示错误
                smsCode: '', // 验证码
                mobile: '', // 手机号
                accountId: '', // 资金账户
                bankCardNo: '', // 绑定银行卡
                bankUrl:'',//银行图标
                bankMobile: '', // 绑定手机号
                balance: 0, // 可用余额
                onceLimitAmount:0,//单笔限额
                dailyLimitAmount:0,//单日限额
                brfaBalance:0,//可提现余额
                showMoney: 0, // 显示充值/提现成功后的金额
                myNav: [
                    { title: '充值' },
                    { title: '提现' }
                ],
                nowIndex: 0,
                cashTabs: [
                    { title: '快捷充值' },
                    { title: '网银支付' }
                ],
                cashTabsIndex: 0,
                error: false,
                errorMsg: '',
                isSuccess:false,
                isFail:false,
                isIng: false, // 充值中
                isShowMe:true,
                failMessage:'',
                txShow:false,
                czShow:true,
                bankCode:"100004",
                balance:"0",
                amountErrorMsg:"请输入正确金额",
                withdrawAmountError: null, // 提现错误提示
                withdrawError: null, // 提现验证码错误提示
                bankForm: '', // 网银充值返回表单
                userType:'1',
                unionPay:'0'
            }
        },
        mounted(){
            // 验证用户的绑卡/开户状态
            this.$api.validateUserStatus({type: null}).then(res => {
                if(res.code === 100){
                    // 未开户--webAccount是否开户,1已开户、2未开户、3验证中
                    if(res.data.webAccount == "2"){
                        this.openShow = true;
                        return;
                    }else if(res.data.webAccount == '3') {
                        this.openStr = '资金存管账户开户审核中，暂无法进行充值操作';
                        this.openText = '审核中';
                        this.openShow = true;
                        this.webAccount = res.data.webAccount;
                        return;
                    }else{
                        this.openShow = false;
                    }

                    // 未绑卡--checkBankCard是否绑卡1-绑卡0-未绑卡
                    if(res.data.checkBankCard == "0"){
                        this.bindShow = true;
                        return;
                    }else{
                        this.bindShow = false;
                    }
                }
            });

            // 为了先显示提现
            if(this.$route.params.tabs == 1){
                this.nowIndex = 1;
            }
            this.getUser();
        },
        methods: {
            // 网银充值
            gateWay () {
                if(!this.txAmount2){
                    this.amountError2 = true;
                    this.errorMsg = '金额不能为空';
                    return;
                }
                if(!this.validateTxAmount2()){
                    this.amountError2 = true;
                    this.errorMsg = this.amountErrorMsg;
                    return;
                }
                this.gateWayDisabled = true;
                this.$api.gateWayRecharge({txAmount: this.txAmount2,bankCode:this.bankCode}).then(res => {
                    this.error = false;
                    this.isShowMe = false;
                    this.txShow = false;
                    this.czShow = false;
                    if(res.code == 100){
                        this.showMoney = this.txAmount2
                        this.gateWayDisabled = false;
                        this.$refs.bankForm.innerHTML = res.msg;
                        document.forms[0].submit();
                    }else{
                        this.isFail = true;
                        this.isSuccess = false;
                        this.failMessage = res.msg;
                        this.gateWayDisabled = false;
                    }
                });
            },

            // 快捷充值
            recharge () {
                if(!this.txAmount){
                    this.amountError = '金额不能为空';
                    return;
                }
                if(!this.validateTxAmount()){
                    this.amountError = this.amountErrorMsg;
                    return;
                }
                if(!this.smsCode){
                    this.smsCodeError = '验证码不能为空';
                    return;
                }
                this.rechargeDisabled = true;
                this.$api.accountRecharge({txAmount: this.txAmount, smsCode: this.smsCode}).then(res => {
                    this.error = false;
                    this.isShowMe = false;
                    this.txShow = false;
                    this.czShow = true;
                    if(res.code == 100){
                        this.showMoney = this.txAmount
                        this.isSuccess = true;
                        this.isFail = false;
                        this.rechargeDisabled = false;
                    } else if(res.code == 610){
                        // 银行审核中
                        this.isFail = false;
                        this.isSuccess = false;
                        this.isIng = true;
                    }else{
                        this.isFail = true;
                        this.isSuccess = false;
                        this.failMessage = res.msg;
                        this.rechargeDisabled = false;
                    }
                });
            },

            // 用户信息
            getUser () {
                this.$api.getUserInfo({}).then(res => {
                    if(res.code == 100){
                        this.userType = res.data.type;
                        this.accountId = res.data.accountId;
                        this.bankCardName = res.data.bankCardName;
                        this.bankCardNo = res.data.bankCardNo.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2");
                        this.bankUrl = res.data.bankUrl;
                        this.bankMobile = res.data.bankMobile;
                        this.onceLimitAmount = res.data.onceLimitAmount;
                        this.dailyLimitAmount = res.data.dailyLimitAmount;
                        this.balance = res.data.balance;
                        this.brfaBalance = res.data.brfaBalance;
                        this.unionPay=res.data.unionPay;
                    }
                });
            },
            callback (data) {
                // this.error = true;
                // this.errorMsg = data.msg;
            },

            // 充值验证码
            getPhoneCode () {
                if(!this.txAmount){
                    this.error = true;
                    this.errorMsg = '金额不能为空';
                    return;
                }
                if(!this.validateTxAmount()){
                    this.error = true;
                    this.errorMsg = this.amountErrorMsg;
                    return;
                }
                let phoneCodeData = {
                    mobile: this.bankMobile,
                    type: sitConfig.SMSCODETYPE.common
                };
                this.$refs.timerBtn.sendSMSBankCode(phoneCodeData);
            },

            // 提现验证码
            getPhoneCode2 () {
                if(!this.txAmount3){
                    this.error = true;
                    this.errorMsg = '金额不能为空';
                    return;
                }
                if(!this.validateTxAmount3()){
                    this.error = true;
                    this.errorMsg = this.amountErrorMsg;
                    return;
                }
                let phoneCodeData = {
                    mobile: this.bankMobile,
                    type: sitConfig.SMSCODETYPE.common
                };
                this.$refs.timerBtn2.sendSMSBankCode(phoneCodeData);
            },

            // 确认提现
            withdraw(){
                if(!this.txAmount3){
                    this.withdrawAmountError = '金额不能为空';
                    return;
                }
                if(!this.validateTxAmount3()){
                    this.withdrawAmountError = this.amountErrorMsg;
                    return;
                }
                if(!this.smsCode){
                    this.withdrawError = '验证码不能为空';
                    return;
                }
                this.withdrawDisabled = true;
                this.$api.accountWithdraw({txAmount: this.txAmount3, smsCode: this.smsCode}).then(res => {
                    this.error = false;
                    this.isShowMe = false;
                    this.txShow = true;
                    this.czShow = false;
                    if(res.code == 100){
                        this.showMoney = this.txAmount3;
                        this.isSuccess = true;
                        this.isFail = false;
                        this.withdrawDisabled = false;
                    } else if(res.code == 610) {
                        this.isSuccess = false;
                        this.isIng = true;
                        this.isFail = false;
                        this.withdrawDisabled = false;
                    } else {
                        this.isFail = true;
                        this.isSuccess = false;
                        this.failMessage = res.msg;
                        this.withdrawDisabled = false;
                    }
                });
            },
            changeTxAmount(){
                if(this.onceLimitAmount*10000<this.txAmount){
                    this.txAmount=this.onceLimitAmount*10000;
                }
            },
            changeBrfaBalance(){
                if(this.brfaBalance < this.txAmount3){
                    this.txAmount3 = this.brfaBalance;
                }
            },
            validateTxAmount(){
                return (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.txAmount));
            },
            validateTxAmount2(){
                return (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.txAmount2));
            },
            validateTxAmount3(){
                return (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.txAmount3));
            }
        },
        watch: {
            bindShow: function (newVal) {
                // 必须去绑卡
                if(!newVal){
                    this.$router.push('/account/securitysetting');
                }
            },
            openShow: function(val){
                // 必须去开户
                if(!val){
                    if (this.userType == '1') { //个人开户页面
                        this.$router.push('/borrow/openaccount');
                    } else if (this.userType == '2') { //企业开户页面 1已开户、2未开户、3验证中
                        if(this.webAccount == '3'){
                          this.$router.push('/account');
                        }else{
                          this.$router.push('/lend/openenterprise');
                        }
                    }
                }
            },
            txAmount: function(newVal){
                if(newVal > 0)
                    this.txAmount = newVal.replace(/[^\d^\.]+/g, '');
            }
        }
    }
</script>

<style lang="scss">
/* 公共按钮 start */
.btn{
    display: $dib;width: 166px;height: 38px;margin: 10px;padding: 0;text-align: center;line-height: 38px;background-color: $cef6c2d;color: $cf;font-size: $px14;border: 1px solid $cef6c2d;border-radius:4px;cursor: pointer;transition: all .35s;

    &:hover{background-color: $cef6c2d;}
    &.btn-default{
        color: #747474;background-color: $cf;border: 1px solid #ddd;
        &:hover{background-color: #e6e6e6;border: 1px solid #ccc;}
    }
    &.btn-small{width: 75px;}
}
/* 公共按钮 end */
/* 主体 start */
.account{
    float:left;width:928px;margin:40px 0 40px 8px;padding:0 24px;background-color:$cf;
    .cef6c2d{color:$cef6c2d;}
    .mr20{margin-right:20px;}

    /* 头部切换 start */
    .account-tabs{
        padding:25px 0 15px;border-bottom:2px solid $cf2;clear: both;overflow: hidden;
        li{
            float:left;width:86px;color:$c3;font-size:$px18;line-height:$px18;cursor: pointer;
            &.active{border-color:$cef6c2d;}
        }
        &.welfare{border:0;}
    }
    &.cash{
        padding-bottom:80px;

        .error{ margin-top: 6px;font-size:$px14;color: $cef6c2d; }
        .account-tabs{
            padding:25px 0 0;border-bottom:2px solid $cf2;overflow:visible;
    
            li{
                position: relative;float:left;width:86px;margin-bottom:-2px;padding-bottom:15px;color:$c3;font-size:$px18;line-height:$px18;text-align: center;;
    
                .bdbp{position: absolute;left:0;bottom:0;width:86px;z-index:2;border-bottom:2px solid $cf2;}
                &.active{
                    .bdbp{border-color:$cef6c2d;}
                    
                }

            }
    
            &.welfare{border:0;}
        }

        /*快捷充值 网银支付 table切换 start*/
        .cash-tabs{
            margin:30px 0 0 105px;clear:both;overflow:hidden;

            ul{width:380px;}
            li{
                float:left;width:185px;height:37px;color:$c6;font-size:$px14;text-align:center;line-height:37px;border:1px solid #ddd;cursor: pointer;
                
                &.active{
                    background-color:$cef6c2d;color:$cf;border-color:$cef6c2d;
                }
            }
            .cash-tabsrecord{height:37px;margin-right:70px;color:$cef6c2d;font-size:$px14;line-height:37px;}
        }
        /*快捷充值 网银支付 table切换 end*/

        /*快捷充值 网银支付 table切换内容 start*/ 
        .cash-recharge{
            width:660px;margin-left:105px;color:#747474;font-size:16px;
            li{
                height:26px;margin:30px 0;line-height:24px;
                .fl{
                    font-size:$px16;

                    &:first-child{width:120px;font-weight:600;}
                    &.w500{width:500px;}
                }
                .cash-tc{display:$dib;margin:0 0 17px 10px;vertical-align:middle;}
                .account-form-group{
                    position:relative;width:158px;height:24px;padding:0 10px;border:1px solid #ddd;

                    input{width: 100%;}
                    .input-addon{position: absolute;right:10px;top:0;}
                }
                &.limit{
                    height:18px;line-height:18px;margin:-10px 0 0 120px;font-size:12px;
                    span{
                        padding-left: 20px;
                        a{ color: $cef6c2d;}
                    }
                }
                &.li-tc{margin:0 auto;height:auto;}
                .cash-btn{height:26px;padding:0 10px;background-color:$cef6c2d;color:$cf;font-size:$px12;cursor: pointer;}
                // .cash-submit{width:203px;padding:10px 0;text-align:center;color:$cf;background-color:$cef6c2d;cursor: pointer;}
                .ml120{ width: 166px; margin-left:120px;}
                .cash-account{display:$dib;width:21px;height:26px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAaCAYAAABYQRdDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDI0Q0I5MUI5NTAxMUU3QkFBRTk1RUE4MDM3RjQzMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRDI0Q0I5MkI5NTAxMUU3QkFBRTk1RUE4MDM3RjQzMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZEMjRDQjhGQjk1MDExRTdCQUFFOTVFQTgwMzdGNDMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZEMjRDQjkwQjk1MDExRTdCQUFFOTVFQTgwMzdGNDMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4IBJCgAAAXRJREFUeNqslE0oBVEYhs+9yE2u/yUlSeQnayvJT2QpsVGKhb/CRoqVLG0otjaiUFaSjbK7KXWVUHYWukVIQhHPV+eW5s49d86Yt56m5sx55syc832hp8lGZUgDDEIH1MI9nMI+HMkDRWsXKZOyDcJZWHHci0INjMCOfmFKwhZCZwbg0Ku03oMwme7nqaYhL9JlZZdVxDkmaRa0WEoLodkkLYFSZZ8qk/QDPn1Iv0zSV7jzIY1n2qhdS2GMArj1svsPFtJhL0fqHVqd/ylNxlnlldeKugRpCsdpxq+hDzbcBk21LxO7IA9GdaU96pqPm5ZvktZBO1RCmUbO8YSWx+DAbWLIpfVVwJyenCk3sMR/3TJJpfNsQq7lsZJu1Yv8x7lRY7DtQyjpgXMaS+SvtA3W1f8iTeUk+fkFXBMQUcFkOqy7fFBCyaJI+1WwKRZpecDSN5G+BCyNinQmYOmZlOkedMI8VEM+fFtIwrqjJXQRLPwKMADK5UxM+E3N+gAAAABJRU5ErkJggg==);}
                .binded-bank{
                    float:left;display:$dib;width:25px;height:25px;border-radius:50%;overflow: hidden;
                    img{width: 100%;height: 100%;}
                }
            }
        }
        /*快捷充值 网银支付 table切换内容 end*/

        .cash-withdraw{
            margin-left:105px;

            li{
                position:relative;float:left;width:167px;height:64px;margin:13px 15px 13px 0;

                
                .cash-banklist{
                    display:$db;width:167px;height:64px;background:$cf url(/static/images/account/cash-bankicon.png) center center no-repeat;background-position:0 0;

                    &.icbc{background-position:0 0;}
                    &.abc{background-position: -183px 0;}
                    &.poc{background-position:-366px 0;}
                    &.ccb{background-position:-549px 0;}
                    &.bcm{background-position:0 -78px;}
                    &.ecitic{background-position:-183px -78px;}
                    &.bbj{background-position:-366px -78px;}
                    &.cmb{background-position:-549px -78px;}
                    &.cmbc{background-position:0 -156px}
                    &.gdb{background-position:-183px -156px;}
                    &.spdb{background-position:-366px -156px;}
                    &.hxb{background-position:-549px -156px;}
                    &.ceb{background-position:0 -235px;}
                    &.cib{background-position:-183px -235px;}
                    &.psbc{background-position:-366px -235px;}
                    &.pab{background-position:-549px -235px;}
                }

                &.active{
                    .cash-banklist::before{
                        position:absolute;content:' ';top:5px;left:5px;width:14px;height:14px;color:$cf;background:$cef6c2d url(/static/images/public/right-icon.png) center center no-repeat;text-align:center;border-radius:50%;
                    }
                }
            }
        }

        .cash-tips{
            margin:0 70px;padding:35px;background-color:#fcfcfc;
            
            p{font-size:$px14;color:$c9;line-height:2em;}
        }

        .cash-result{
            padding:50px 0;background-color:$cf;
            p{
                height:44px;line-height:44px;text-align: center;
                
                &.p30{padding:30px 0;}
            }
            .cash-succ-icon{display:$dib;height:44px;padding-left:54px;background:$cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAgVBMVEUAAADvbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC0+ohmRAAAAKnRSTlMAd/gG8m3shkapIte4ElVP0C0dgQvJ4eWSZVIXsD+ym4pLN6RxvVkMCZA4Qi2UAAAB7klEQVQ4y51V2YKiMBAMSTgDCMiNcqg7M1v//4G7ExIENYs79aJpitCdrlSTB+SeexIOpY44uV5O/gXvSrECvXpG6iEBUIxxGjEWpfFYAEgOL6lBCFRWtg5lVgWEwTM35nBs9hhltgMeP0aPgB+RF4h84LgN1YBNDLCBersvPRBz4XS9dwxIrgkTxZJ3wHUO5ky4PpMQPtmBj1ClBKfbI0eOSjSBTXbRIJF6QMn2yayEJ9OxyBuwvgvLKbQegkFU4bQ637AUQ6B1ApoTD4VanjmAVW9dueQXtSzg/Q258+KrhJ9mN4qzehf0lqUnXZEk9oj1w2Tu/G8lF/kNJnDRbe6JQKrVKP/kt0wlaX99/6SN2jmFIA4i8hYiOISCvUdmoP9H1mnElhGtTmMpMIERxVJgj/nFXzBBqbNFvzSlhhGjbsrS7hZGeLrdi5Byjhl8mDpCummgKlAxLaS7REeV4HJrshAStpboSvydI7lsdbKy6IRp8a+vVQwAwcb+ANCLvlbbC+sCgmwggEZf2PbBCmrwjzX3g9NmsYInk2k4ErtTUUugPN9N5tm+Ah+AOA3XsAL4+KmdBfFLYwzcWSW8b7TQJ46j0XI/0/MlYHejo6h/bOb7Y+L9AWQebW47j7bWVaPNBM/fDk3fODT3x/EfPd5JTmhjl4YAAAAASUVORK5CYII=) left center no-repeat;}
            .cash-succing-icon{display:$dib;height:44px;padding-left:54px;background:$cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAgVBMVEUAAADvbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC0+ohmRAAAAKnRSTlMA+kZs7AdP9lQdEs8rq4aBCrh6IvHXsaeIVwWR4cov5cecZDkW2+6+dBAx6EscAAAB4ElEQVQ4y6VV2babMAy0zWJ2AoEAN4GwZOv8/weWNl5CgNDeOw9wLOvYsjQakTfsWHTITUrN/BCxHfkEVnC8gBds1dX2AdSl03iW5TVOWQPw7UXXfQKcU/fV5KZnINnPfZ0MpmG9Wy3DROa8W2MgvJAFeCEQT01HUIOswKA4Ts/lNlmFzV/PdkDtjxmlqFQeMhjkIwxkMicJQrKBEIkICeZly9kz8QzUF0FsBOL/jR6nr23nrxPY+CuQkn9AimLkJIfmQzB4k2IHjbrUBd8RhlquqxNAddGtIwduD7mswUiEUqx64OxTXCXlD4B/BSKxLBGNJkf0yA2P8bYcscpoM34p3csyH0iOQARF72TEQDuZrP5JMSbeg5yY8OQTLPGTLBBmWReYhEJsbsEC/S9nFcY6dBjygdsIkOvUrUOnLkKkkrEMVxeFoX3eQosVBomWasEUkS58OXjvhkESSVP0iHaJ1x0SRVFNfu+Ecu5bgQea/LqtBop4lgIqNnv404atKMJfk16KgUg37FQKHA7T2CnX6gqkSgpmIhO0QBY+2NCwvjOBK5uJDKm0fDl3KPhSgm2KalkY3b5Lav/eGc2yMG5L7lzMvVUx//aY2B5A66Mt+DPaAqdsxWj78dDcHse/AXKuMpsTd4WbAAAAAElFTkSuQmCC) left center no-repeat;}
            .cash-fail-icon{display:$dib;height:44px;padding-left:54px;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAgVBMVEUAAADvbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC0+ohmRAAAAKnRSTlMA+gZPh2xG7PcSLAriyapTIvHXuKeCVc99HrB56LORSg7dPxaZYjQcwFcH2jvEAAABqUlEQVQ4y51V13LDMAwjJQ95xyOJm73T4v8/sK1bS5Yz7ARv4uF0JAiS1EPkOYvCZ/aLheNF9AxepdCBqryHVDkHkDhZGAgRhJmTAJjLu9RJCcT1Rzf0sYyBcnLLneXwXdGPCtdHPutHp0B6pDsIUmBqhzZglx7AZWzsf5Wkh5Cq+/cMLOkJtgyd9ySHS0/hIm81KZHSAFKU/ynBPw6RgxX+Ep3rJJ4mMm/8gFgMk0WMX59UWNIILFERRQraDzs56flF7rRPoCLykOgqYrDX03ev2Qk8cuCY3gCVLRjQdqshLpC1z5CBukuuAQ7bR4Y1FQhJv9e1sCSYLowNQhTkI6BRCOATQ4wjC/BL5JfS0AVqHN10r3j16Vx0SBfYSGdwPTFaJIcmZKRrtDbY+uD1OdxF1+1mBZxMPQ3RtPsHX4xSZxXVCmvDTuBZRjqw3cHLCifLSB2L7mI4vaJyZMailvlrJH3Nz9gLbX5rrPY43HSiwEGPlTWw8kw3uNSRGdjxq+CNJTO8viRjNnYxbhWm76xcs8yDh8v87TNhDtBy4AANnrb3j+b4c/wNZ7guGH7UGlwAAAAASUVORK5CYII=) left center no-repeat;}
            .cash-ing-icon{display:$dib;height:44px;padding-left:54px;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAe1BMVEUAAADvbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC3vbC0n+NQiAAAAKHRSTlMAlQ9G9tX68k8iz+3r26iiCreuiIWBd0uQQx/q6JhYJMevfDgXb1axL3X4HwAAAZtJREFUOMullemOgzAMhE0SbkoppdD7bnfe/wk3KkudEmiQdiT+mA8rjs2YeipkdfFTpVL/UsmCvknmCoZULkfRKIFW4JfecumVfgCtJBpE4wWAcN6ILiCaeQhgEdvsUb/I6o7s+DoDwmefrQB4jDLuAVh9xtbATo4UvQPWZmAJzLbEugmzmNlH7qNm78R6YEaG7po+vj8NsT+Zbz2ATJ0yhN2dLABJ32BqgMVfLwCPLNiKtN1JsBcuWGRIXlcD1OSCqW6PmiMs3LBQyPVMKszJDdMcqiAJNFPgCNhQhUBMgUWg2/ijy3TDWj5K/eTT4At8SrGeBntIKUA1DV4iGIPlIMzHMONAdthYxxgsMD4DzHOB7dVZ2j5afne4GVfHTRnjb9wUbvcQX58R3LjdPEgjfGwM0mtEBTkldE4efoeugOTfypE4RcI/rEMHILKsgGVZAZvM7vSNZZNh+7Jl25dWpel4NK9mrxMtt0nRH8zVmJkf8M7Leg6uiWsGpM/RBRTxAoraBbT952pzL01bxWZV+nul9n652vQN8xcZwDNU10mIHwAAAABJRU5ErkJggg==) left center no-repeat;}
        }

    }
}
</style>
