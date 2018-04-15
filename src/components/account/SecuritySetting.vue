<!-- 安全设置 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="account">
            <ul class="account-tabs">
                <li>安全设置</li>
            </ul>

            <ul class="setting">
                <li class="clearfix">
                    <div class="fl">您的账户安全等级</div>
                    <div class="progress">
                        <div class="progress-bar" v-bind:style="{width:percentage + '%'}"></div>
                    </div>
                    <div class="fr" v-if="percentage == 50">中</div>
                    <div class="fr" v-else-if="percentage == 100">高</div>
                </li>
                <li>
                    <span class="setting-phone"></span>
                    <span class="tcl">手机</span>
                    <span class="tcc mlp">{{mobile}}</span>
                </li>
                <li>
                    <span class="setting-bank"></span>
                    <span class="tcl">银行存管</span>
                    <span class="tcc">{{this.bindCard.bankCard}}</span>
                    <div v-if="bindingStatus === 1" class="fr cp" @click="showWin(1)">解绑</div>
                    <div v-else-if="bindingStatus === 2" class="fr cp" @click="showWin(2)">去开户</div>
                    <div v-else-if="bindingStatus === 3" class="fr">审核中</div>
                    <div v-else-if="bindingStatus === 4" class="fr cp" @click="showWin(3)">去绑卡</div>
                </li>
                <li>
                    <span class="setting-pwd"></span>
                    <span class="tcl">登录密码</span>
                    <span class="tcc">******</span>
                    <div class="fr cp" @click="modifyPassShow=true">修改</div>
                </li>
            </ul>

            <!-- 修改密码 start -->
            <modal-box :show.sync="modifyPassShow" :title="modifyPassShowText">
                <div slot="context" class="setting-form">
                    <div class="account-form-group">
                        <span>原登录密码</span><em>*</em><input v-model="modifyPass.password" type="password" placeholder="请输入原登录密码" maxlength="20"/>
                        <div class="error" v-show="oldPwdError">请输入正确的原密码</div>
                    </div>
                    <div class="account-form-group">
                        <span>新登录密码</span><em>*</em><input v-model="modifyPass.newPassword" type="password" placeholder="登录密码为6-20位字母、数字和字符的组合" maxlength="20"/>
                        <div class="error" v-show="pwdError">请输入6-20位字母、数字和字符的组合</div>
                    </div>
                    <div class="account-form-group">
                        <span>确认新密码</span><em>*</em><input v-model="modifyPass.comfirmPassword" type="password" placeholder="请再次输入新密码" maxlength="20" />
                        <div class="error" v-show="pwdErrorDouble">两次密码输入不一致</div>
                    </div>
                    <div class="error-group" v-show="error">{{errorMsg}}</div>
                </div>
                <div slot="button">
                    <button class="btn ok" @click="modifyPassword">提交</button>
                </div>
            </modal-box>
            <!-- 修改密码 end -->

            <!-- 解绑银行卡 start -->
            <modal-box :show.sync="unBindShow" :title="unBindText">
                <div slot="context" class="setting-form" v-show="unBindResult">
                    <div class="account-form-group noipt" v-if="userType=='1'">
                        <span class="tr">姓名</span><em>*</em><span>{{bindCard.name}}</span>
                    </div>
                    <div class="account-form-group noipt" v-else-if="userType=='2'">
                        <span class="tr">企业名称</span><em>*</em><span>{{bindCard.orgName}}</span>
                    </div>
                    <div class="account-form-group noipt" v-if="userType=='1'">
                        <span class="tr">身份证号</span><em>*</em><span>{{bindCard.idCardNum}}</span>
                    </div>
                    <div class="account-form-group noipt" v-else-if="userType=='2'">
                        <span class="tr">组织机构代码</span><em>*</em><span>{{bindCard.orgNo}}</span>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">开户银行</span><em>*</em><span>{{bindCard.bankName}}</span>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">开户卡号</span><em>*</em><span>{{bindCard.bankCard}}</span>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">手机号</span><em>*</em><span>{{unBindCardMobile}}</span>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">手机验证码</span><em>*</em>
                        <input v-model="bindCard.phoneCode" type="text" placeholder="请输入手机验证码" class="w150" maxlength="6"/>
                        <timer ref="timerBtn" class="phoneCode-btn" @run="getPhoneCode" @callback="callback" :disabled="codeDisabled"></timer>
                        <div class="error" v-show="unBindError">{{unBindErrorMsg}}</div>
                    </div>
                </div>
                <div slot="context" class="unbind-result" v-show="!unBindResult">
                    <img src="/static/images/account/setting-unbinding.jpg" alt="">{{unBindResultStr}}
                </div>
                <div slot="button">
                    <button v-show="unBindResult" class="btn ok" :disabled="unBindDisabled" @click="unBindCardFn()">提交</button>
                    <button v-show="!unBindResult" class="btn ok" @click="unBindShow=false">关闭</button>
                </div>
            </modal-box>
            <!-- 解绑银行卡 end -->

            <!-- 绑定银行卡 start -->
            <modal-box :show.sync="bindShow" :title="bindText">
                <div slot="context" class="setting-form" v-show="bindResult" >
                    <div v-if="userType=='1'">
                        <div class="account-form-group noipt">
                            <span class="tr">姓名</span><em>*</em><span>{{bindCard.name}}</span>
                            <div class="error" v-show="userNameError">姓名不允许为空</div>
                        </div>
                        <div class="account-form-group noipt">
                            <span class="tr">身份证号</span><em>*</em><span>{{bindCard.idCardNum}}</span>
                            <div class="error" v-show="idCardError">请输入正确的身份证号</div>
                        </div>
                    </div>

                    <div v-else-if="userType=='2'">
                        <div class="account-form-group noipt">
                            <span class="tr">企业名称</span><em>*</em><span>{{bindCard.orgName}}</span>
                         </div>
                        <div class="account-form-group noipt">
                            <span class="tr">组织机构代码</span><em>*</em><span>{{bindCard.orgNo}}</span>
                        </div>
                        <div class="account-form-group ">
                            <span class="tr">法定代表人</span><em>*</em><input type="text" v-model="bindCard.name" value="bindCard.name" placeholder="请输入法定代表人"  maxlength="18"/>
                            <div class="error" v-show="userNameError">请输入法定代表人</div>
                        </div>
                        <div class="account-form-group ">
                            <span class="tr">法人身份证</span><em>*</em><input type="text" v-model="bindCard.idCardNum" value="bindCard.idCardNum" placeholder="请输入法人身份证" maxlength="18"/>
                            <div class="error" v-show="idCardError">请输入正确的身份证号</div>
                        </div>

                    </div>

                    <div class="account-form-group">
                        <span class="tr">开户银行：</span><em>*</em>
                        <div class="bankinfo-box bind-bank">
                            <div @click="showSel">{{bankShowName}}</div>
                            <div class="arrow"></div>
                            <ul class="bankinfo-list" v-show="selShow">
                                <li v-for="item in bankinfoList" :key="item.id" @click="setSelect(item)">{{item.bankName}}</li>
                            </ul>
                        </div>
                    </div>

                    <!--<div class="account-form-group" v-if="userType=='2'">-->
                        <!--<span class="tr">账户名称</span><em>*</em><input type="text" v-model="bindCard.acctName"-->
                                                                     <!--placeholder="请输入账户名称"/>-->
                        <!--<div class="error" v-show="acctNameError">请输入账户名称</div>-->
                    <!--</div>-->
                    <div class="account-form-group" v-if="userType=='2'">
                        <span class="tr">开户卡号</span><em>*</em><input type="text" v-model="bindCard.acctNo"
                                                                    placeholder="请输入开户卡号"/>
                        <div class="error" v-show="acctNoError">请输入正确的开户银行卡号</div>
                    </div>
                    <div class="account-form-group" v-if="userType=='1'">
                        <span class="tr">开户卡号</span><em>*</em><input type="text" v-model="bindCard.bankCard"
                                                                     placeholder="请输入开户卡号"/>
                        <div class="error" v-show="bankCardError">请输入正确的开户银行卡号</div>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">预留手机号</span><em>*</em><input type="text" v-model="bindCard.bankMobile"
                                                                    placeholder="请输入预留手机号"/>
                        <div class="error" v-show="bankMobileError">请输入正确的手机号</div>
                    </div>
                    <div class="account-form-group">
                        <span class="tr">手机验证码</span><em>*</em>
                        <input type="text" v-model="bindCard.phoneCode" placeholder="请输入手机验证码" class="w150" maxlength="6" />

                        <div v-if="userType=='1'">
                        <timer ref="timerBtn" class="phoneCode-btn mt23" @run="bindCardApply"
                            @callback="bindCardApplyCallback" :disabled="bindCodeDisabled"></timer>
                        </div>
                        <div v-if="userType=='2'">
                            <timer ref="timerBtn" class="phoneCode-btn mt23" @run="getEntrpiseBindPhoneCode"
                                   @callback="entrpiseBindCallback" :disabled="entrpiseCodeDisabled"></timer>
                        </div>

                        <div class="error" v-show="phoneCodeError">请输入短信验证码</div>
                    </div>
                    <div class="error-group" v-show="bindError">{{bindErrorMsg}}</div>
                </div>
                <div slot="context" class="unbind-result" v-show="!bindResult">
                    <img src="/static/images/account/setting-unbinding.jpg" alt="">{{bindResultStr}}
                </div>
                <div slot="button">

                    <div v-if="userType=='1'">
                         <button v-show="bindResult" class="btn ok" @click="bindCardConf" :disabled="bindCardDisabled">提交</button>
                    </div>
                    <div v-if="userType=='2'">
                        <button v-show="bindResult" class="btn ok" @click="enterpriseBind" :disabled="enterpriseBindDisabled">提交</button>
                    </div>

                    <button v-show="!bindResult" class="btn ok" @click="bindShow=false">关闭</button>
                </div>
            </modal-box>
            <!-- 绑定银行卡 end -->


            <!-- 错误提示 start -->
            <modal-box :show.sync="errorShow">
                <div slot="context" class="error-group">{{errorMsg}}</div>
            </modal-box>
            <!-- 错误提示 end -->

        </div>
    </div>
</template>

<script>
    import AccountAside from '../public/Aside'
    import timerBtn from '../public/sendSmsCode.vue'
    import ModalBox from '../public/ModalBox'
    const sitConfig = require('../../../config/index.js').config

    export default {
        metaInfo: {
            title: '安全设置-个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行安全设置'
            }]
        },
        name: 'account',
        mounted () {
            this.$api.getUserInfo({}).then(res => {
                if(res.code == 100){
                    this.userType = res.data.type;
                }
            });
            this.securitySetting()
            this.getBankList()
        },
        watch:{
            showWinType: function(val) { //此处不要使用箭头函数
                this.error = false
                this.errorMsg = ''
            },
            bindShow: function(val){
                if(!val){
                    this.$router.go(0);
                }
            },
            unBindShow: function(val) {
                if(!val){
                    this.$router.go(0);
                }
            }
        },
        data () {
            return {
                userType: null, // 用户类型1：个人，2：企业
                modifyPassShowText: '修改密码', // 修改密码弹框
                modifyPassShow: false, // 修改密码
                unBindShow: false, // 解绑银行卡
                unBindText: '解绑银行卡', // 解绑银行卡
                bindShow: false, // 绑银行卡
                bindText: '绑定银行卡', // 绑银行卡
                openShow: false, // 开户
                openText: '开户', // 开户
                errorShow: false, // 错误弹框
                navType: 'account',
                percentage: 50,
                bankShowId: -1, // 选中的银行编号
                bankShowName: '', // 选中银行名称
                bankinfoList: '', // 银行列表
                selShow: false, // 显示银行列表
                userNameError:false,
                idCardError:false,
                bankCardError:false,
                acctNameError:false,
                acctNoError:false,
                bankMobileError:false,
                phoneCodeError:false,
                oldPwdError: false, // 旧密码错误提示
                pwdError: false, // 密码错误提示
                pwdErrorDouble: false, // 二次密码错误提示
                unBindError: false, // 解除绑定错误文字
                unBindErrorMsg: null, // 解除绑定错误文字
                unBindResult: true, // 解绑结果
                unBindResultStr: '恭喜您解绑成功！', // 解绑结果
                bindResult: true, // 绑定结果
                bindResultStr: '恭喜您绑定成功！', // 绑定错误文字
                error: false,
                errorMsg:'',
                bindError:false,
                bindErrorMsg:null,
                codeDisabled:false, //解绑验证码，防重复
                unBindDisabled:false,//解绑提交，防重复
                bindCodeDisabled:false, //个人绑卡验证码，防重复
                bindCardDisabled:false, //个人绑卡提交，防重复
                entrpiseCodeDisabled:false, //企业验证码，防重复
                enterpriseBindDisabled:false, //企业提交，防重复


                //绑卡obj
                bindCard: {
                    acctName:'',
                    acctNo:'',
                    orgName:'',
                    orgNo:'',
                    type:'2',
                    name: '',
                    idCardNum: '',
                    idCard:'',
                    bankName: '',
                    bankCard: '',
                    bankCode: '',
                    bankMobile: '',
                    orginOrderNo: '',
                    phoneCode: null,
                    mobile:'',
                    bankId:'',
                    cardNo:''

                },
                //修改密码obj
                modifyPass: {
                    password: '',
                    newPassword: '',
                    comfirmPassword: ''
                },
                mobile: '',
                unBindCardMobile: '',
                bankInfoList: [],
                showWinType: 0,
                bindingStatus: 1,
                showResultStatus: false

            };
        },
        methods: {
            getBankList(){
                this.$api.getBankInfo({}).then(res => {
                    if(res.code == 100){
                        if(res.data){
                            this.bankinfoList = res.data;
                            this.bankShowId = res.data[0].bankId;
                            this.bankShowName = res.data[0].bankName;
                        }
                    }
                });
            },
            setSelect(item){
                this.bankShowId = item.bankId; // 开户行编码（本平台ID）
                this.bankShowName = item.bankName; // 开户行名称
                this.selShow = false;
            },
            showSel(){
                this.selShow = true;
            },
            securitySetting: function () {
                this.$api.securitySetting({}).then(res => {
                    if (res.code == 100) {
                        this.mobile = res.data.mobile;
                        if (res.data.checkAccount == 1) { //已开户
                            this.bindCard.name = res.data.name;
                            this.bindCard.idCardNum = res.data.idCardNum;
                            this.bindCard.idCard = res.data.idCardNum;
                            this.bindCard.orgNo = res.data.orgNo;
                            this.bindCard.orgName = res.data.orgName;
                            this.bindCard.acctName=res.data.acctName;
                            if (res.data.checkBankCard == 1) { //已绑卡
                                this.percentage = 100;
                                this.bindingStatus = 1;
                                this.unBindCardMobile = res.data.unBindCardMobile;
                                this.bindCard.bankCard = res.data.bankCard;
                                this.bindCard.bankMobile = res.data.bankMobile;
                                this.bindCard.bankName = res.data.bankName;
                            } else {
                                if (res.data.openAccountStatus == 3) {
                                    this.bindingStatus = 3; //审核中
                                }else{
                                    this.bindingStatus = 4; //未绑卡
                                }
                            }
                        }else{
                            if(res.data.openAccountStatus==3){
                                this.bindingStatus = 3; //审核中
                            }else{
                                this.bindingStatus = 2; // 未开户
                            }
                        }

                    } else {
                        this.error = true;
                        this.errorMsg = res.msg;
                    }
                });
            },
            showWin: function (type) {
                this.showWinType = type;
                if (type === 1) { // 解绑
                    this.$api.checkCardIsNoUnBind({}).then(res => {
                        if (res.code == 100) {
                            if (res.data.code == 100) {
                                this.error = false;
                                this.errorMsg = '';
                                this.unBindShow = true;
                            } else {
                                this.errorMsg = res.data.msg;
                                this.errorShow = true;
                            }
                        }
                    });
                } else if (type === 2) {// 开户 跳转
                    this.$api.getUserInfo({})
                        .then(res => {
                            if (res.code == 100) {
                                if (res.data.type == '1') { //个人开户页面
                                    this.$router.push('/borrow/openaccount');
                                } else if (res.data.type == '2') { //企业开户页面
                                    this.$router.push('/lend/openenterprise');
                                }
                            }
                        });
                } else if (type === 3) {//去绑卡
                    this.$api.getBankInfo({}).then(res => {
                        if (res.code == 100) {
                            this.bankInfoList = res.data;
                            this.bindShow = true;
                        }
                    });
                }
            },

            //企业绑卡获取验证码
            getEntrpiseBindPhoneCode: function () {
                let phoneCodeData = {
                    mobile: this.bindCard.bankMobile,
                    type: sitConfig.SMSCODETYPE.common
                };
                 if(!phoneCodeData.mobile){
                    this.bankMobileError=true;
                    return;
                }else{
                     this.entrpiseCodeDisabled=true;
                     this.bankMobileError=false;
                    this.$refs.timerBtn.sendSMSCode(phoneCodeData);
                }
            },

            entrpiseBindCallback: function (data) {
                this.entrpiseCodeDisabled=false;
                if (data.code == 100) {
                    this.bindError=true;
                    this.bindErrorMsg = "验证码发送成功";
                    this.phoneCodeError = false;
                 }else{
                    this.bindError=true;
                    this.bindErrorMsg = data.msg;
                }

            },
            //企业绑卡确认
            enterpriseBind: function () {
                this.bindCard.bankId=this.bankShowId;

                if(!this.bindCard.name){
                    this.userNameError=true;
                    return;
                }else{
                    this.userNameError=false;
                }
                if(!this.bindCard.idCardNum){
                    this.idCardError=true;
                    return;
                }else if (!this.validateIdCard(this.bindCard.idCardNum)){
                    this.idCardError = true;
                    return;
                }else{
                    this.idCardError=false;
                }

                if (!this.bindCard.acctNo) {
                    this.acctNoError=true;
                    return;
                }else{
                    this.acctNoError=false;
                }
                if (!this.bindCard.bankMobile) {
                    this.bankMobileError=true;
                    return;
                }else{
                    this.bindCard.mobile=this.bindCard.bankMobile;
                    this.bankMobileError=false;
                }
                if (!this.validateMobile()) {
                    this.bankMobileError=true;
                    return;
                }else{
                    this.bankMobileError=false;
                }
                if (!this.bindCard.phoneCode) {
                    this.phoneCodeError = true;
                    return;
                }else{
                    this.phoneCodeError = false;
                }
                this.enterpriseBindDisabled=true;
                this.bindError = true;
                this.bindErrorMsg = "处理中，请稍后...";
                this.$api.enterpriseBind(this.bindCard).then(res => {
                    this.enterpriseBindDisabled=false;
                    if (res.code == 100) {
                        this.bindResult = false;
                        this.bindResultStr=res.msg;
                    } else {
                        this.bindError = true;
                        this.bindErrorMsg = res.msg;
                        this.acctNameError=false;
                        this.acctNoError=false;
                        this.bankMobileError=false;
                        this.phoneCodeError=false;
                    }
                })
            },

            //解绑获取验证码
            getPhoneCode: function () {
                let phoneCodeData = {
                    type: sitConfig.SMSCODETYPE.unBindCard
                };
                this.codeDisabled=true;
                this.$refs.timerBtn.sendSMSCodeByLogin(phoneCodeData);
            },
            //解绑发送验证码回调
            callback: function (data) {
                this.codeDisabled=false;
                if(data.code == 100){
                    this.unBindError = true;
                    this.unBindErrorMsg ="发送成功！";
                }else{
                    this.unBindError = true;
                    this.unBindErrorMsg =data.msg;
                }
            },
            //解绑
            unBindCardFn: function () {
                if(this.bindCard.phoneCode == null) {
                    this.unBindError=true;
                    this.unBindErrorMsg = '请输入短信验证码';
                    return;
                }
                let unBindCardData = {
                    phoneCode: this.bindCard.phoneCode,
                    type: sitConfig.SMSCODETYPE.unBindCard
                };

                this.unBindDisabled=true; //防重复
                this.unBindError=true;
                this.unBindErrorMsg="处理中，请稍后...";
                this.$api.unBindCard(unBindCardData).then(res => {
                     if (res.code == 100) {
                         this.unBindResult = false;
                    } else {
                        this.unBindDisabled=false;
                        this.unBindError=true;
                        this.unBindErrorMsg= res.msg;
                    }
                });
            },

            //个人绑卡申请-发送验证码
            bindCardApply: function () {
                 this.error = false;
                 this.bindCodeDisabled=true; //防重复
                if (!this.validateData()){
                    return;
                }

                this.bindCard.bankCode=this.bankShowId;
                this.$refs.timerBtn.bindCardApply(this.bindCard);
            },

            //个人绑卡发送绑卡验证码回调
            bindCardApplyCallback: function (data) {
                this.phoneCodeError = false;
                this.bankCardError=false;
                this.bankMobileError=false;
                this.bindCodeDisabled=false; //防重复
                if (data.code == 100) {
                    this.bindError=true;
                    this.bindErrorMsg = "验证码发送成功";
                    this.bindCard.orginOrderNo = data.data.orderNo;
                 }else{
                    this.bindError=true;
                    this.bindErrorMsg = data.msg;
                }
            },
            //个人绑卡确认
            bindCardConf: function () {
                this.bindError = false;
                this.bindErrorMsg = null;
                if (!this.validateData())
                    return;
                if (!this.bindCard.phoneCode) {
                    this.phoneCodeError = true;
                    return;
                }
                this.bindCardDisabled=true;
                this.bindError = true;
                this.bindErrorMsg ="处理中，请稍后...";
                this.$api.validData(this.bindCard).then(res1 =>{
                    if (res1.code == 100) {
                        this.$api.bindCardConf(this.bindCard).then(res2 => {
                             this.phoneCodeError = false;
                            this.bankCardError=false;
                            this.bankMobileError=false;
                            if (res2.code == 100) {
                                this.bindResult = false;
                            } else {
                                this.bindCardDisabled=false;
                                this.bindError = true;
                                this.bindErrorMsg = res2.msg;
                            }
                        })
                    }else{
                        this.bindCardDisabled=false;
                        this.phoneCodeError = false;
                        this.bindError = true;
                        this.bindErrorMsg = res1.msg;
                    }

                })
            },

            validateData: function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                if (!this.bindCard.name) {
                    this.userNameError=true;
                    return;
                }else{
                    this.userNameError=false;
                }

                if(!this.bindCard.idCardNum){
                    this.idCardError=true;
                    return;
                }else if (!this.validateIdCard(this.bindCard.idCardNum)){
                    this.idCardError = true;
                    return;
                }else{
                    this.idCardError=false;
                }


               /* if (!this.bindCard.bankCode) {
                    this.error = true;
                    this.errorMsg = '请选择开户行';
                    return;
                }*/
                if (!this.bindCard.bankCard) {
                    this.bankCardError=true;
                    return;
                }else{
                    this.bankCardError=false;
                }
                if (!this.bindCard.bankMobile) {
                    this.bankMobileError=true;
                    return;
                }else{
                    this.bankMobileError=false;
                }

                if (!this.validateMobile()) {
                    this.bankMobileError=true;
                    return;
                }else{
                    this.bankMobileError=false;
                }
                return true;
            },
            modifyPassword: function () {
                let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/;
                if (!pwdReg.test(this.modifyPass.password)) {
                    this.oldPwdError = true;
                    return;
                }else{
                    this.oldPwdError = false;
                }
                if (!pwdReg.test(this.modifyPass.newPassword)) {
                    this.pwdError = true;
                    return;
                }else{
                    this.pwdError = false;
                }
                if (this.modifyPass.newPassword != this.modifyPass.comfirmPassword) {
                    this.pwdErrorDouble = true;
                    return;
                }else{
                    this.pwdErrorDouble = false;
                }
                let modifyPassData = {
                    password: this.modifyPass.password,
                    newPassword: this.modifyPass.newPassword,
                    comfirmPassword: this.modifyPass.comfirmPassword
                };
                this.$api.modifyPass(modifyPassData).then(res => {
                    if (res.code == 100) {
                        this.modifyPassShow = false;
                    } else {
                        this.error = true;
                        this.errorMsg = res.msg;
                    }
                });
            },
            // 身份证号验证
            validateIdCard:function () {
                let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
                if (!reg.test(this.bindCard.idCardNum)) {
                    this.idCardError=true;
                    return ;
                }
                return true;
            },
            validateMobile:function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/,
                    pwdReg = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,20}/;
                if (!phoneReg.test(this.bindCard.bankMobile)) {
                    this.bankMobileError=true;
                    return;
                }
                return true;
            }

        },
        components: {
            'my-aside': AccountAside,
            'timer': timerBtn,
            'modal-box': ModalBox
        }
    };
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>

