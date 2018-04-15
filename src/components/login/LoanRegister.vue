<template>
    <div>
        <!--register-bg start-->
        <div class="register-bg" v-show="showRegister">
            <div class="container">
                <div class="login">
                    <div class="title">
                        用户注册
                        <span class="have fr">已有账号？<router-link to="/login">登录</router-link></span>
                    </div>
                    <div class="input-group">
                        <div class="fl" @click="setCheck('borrow')">
                            <span class="v-checkbox" :class="{active: borrowCheck}" name="borrow"  ></span>
                            <label for="borrow">我是个人</label>
                        </div>
                        <div class="fl" @click="setCheck('lend')">
                            <span class="v-checkbox" :class="{active: lendCheck}" name="lend" >
                            </span><label for="lend">我是企业</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-layer">
                            <input type="text" v-model="mobile" placeholder="请输入手机号" autocomplete="off" maxlength="11"/>
                            <p class="erorr" v-if="errorNum == 1">请输入11位手机号</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-layer">
                            <input type="password" v-model="passWord" placeholder="请输入密码" autocomplete="off"
                                   minlength="6" maxlength="20"/>
                            <p class="erorr" v-if="errorNum == 2">密码为6-20位数字和字母组合</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-layer">
                            <input type="text" v-model="imgCode" placeholder="请输入验证码" autocomplete="off" maxlength="6">
                            <div class="state" @click="getImgCode"><img :src="imgCodeSrc"/></div>
                            <p class="erorr" v-if="errorNum == 3">请输入正确图片验证码</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-layer">
                            <input type="text" v-model="phoneCode" placeholder="短信验证码" autocomplete="off" maxlength="6">
                            <div class="state">
                                <timerBtn ref="timerBtn" class="btn-small" @run="getPhoneCode"
                                          @callback="callback"></timerBtn>
                            </div>
                            <p class="erorr" v-if="errorNum == 4">请输入正确短信验证码</p>
                            <p class="erorr" v-if="errorNum == 6">{{errorNumMsg}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-layer">
                            <input type="text" v-model="inviterCode" placeholder="请输入邀请码（选填）" autocomplete="off"
                                   minlength="4" maxlength="20">
                            <p class="erorr" v-if="errorNum == 5">邀请码格式有误</p>
                        </div>
                    </div>

                    <div class="form-group01">
                        <span class="erorr" v-show="error">{{errorMsg}}</span>
                    </div>

                    <div class="agreement">
                        我已阅读并同意金谷财行
                        <router-link to="/protocol/login" target="_blank">《注册协议》</router-link>
                    </div>

                    <button class="btn" @keyup.enter="register()" @click="register()">注册</button>
                </div>
            </div>
        </div>
        <!--register-bg end-->
        <div class="container" v-show="registerSuccess">
            <div class="register-suc">
                <div class="register-icon fl"></div>
                <div class="register-con fl">
                    <h3>恭喜您注册成功！欢迎您加入金谷财行。</h3>
                    <!--<p v-show="borrowCheck">获得618大礼包，请到我的账户&#45;&#45;<a href="/account/welfare">我的福利</a>中查看。</p>-->
                    <p class="p-padding">立即开通银行存管账户，账户资金安全有保障!</p>
                    <p>
                        <div v-if="borrowCheck">
                            <router-link to="/borrow/openaccount" class="btn-a fl">立即开户</router-link>
                        </div>
                        <div v-else>
                            <router-link to="/lend/openenterprise" class="btn-a fl">立即开户</router-link>
                        </div>
                        <router-link to="/" class="btn-a fl">返回首页</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import timerBtn from '../public/sendSmsCode.vue';
    const sitConfig = require('../../../config/index.js').config

    const TIME_COUNT = 60;
    export default {
        data () {
            return {
                checked: true,
                borrowCheck: false,
                lendCheck: false,
                showRegister: true,
                registerSuccess: false,
                pageId: '',
                errorNum: 0,
                errorNumMsg: '',
                error: false,
                errorMsg: '',
                mobile: '',
                passWord: '',
                imgCode: '',
                imgCodeSrc: '',
                phoneCode: '',
                inviterCode: ''
            };
        },
        mounted () {
            this.borrowCheck = true;
            this.getImgCode();
        },
        methods: {
            setCheck (type) {
                if (type == 'borrow') {
                    this.borrowCheck = true;
                    this.lendCheck = false;
                } else {
                    this.borrowCheck = false;
                    this.lendCheck = true;
                }
            },
            getImgCode: function () {
                this.pageId = Math.floor(Math.random() * 1000000);
                this.imgCodeSrc = sitConfig.BASE_URL + '/api/web/member/imgCode?pageId=' + this.pageId;
            },
            getPhoneCode: function () {
                this.error = false;
                this.errorMsg = '';
                if (!this.validatePhonecode())
                    return;
                let phoneCodeData = {
                    imgCode: this.imgCode,
                    pageId: this.pageId,
                    mobile: this.mobile,
                    type: sitConfig.SMSCODETYPE.register
                };
                this.$refs.timerBtn.sendSMSCode(phoneCodeData);
                this.errorNum = 0;
            },
            callback: function (data) {
                // this.error = true;
                // this.errorMsg = data.msg;
                if (data.code != 100){
                    if (data.code == 908){
                        this.errorNum = 3;
                    }else {
                        this.errorNum = 6;
                        this.errorNumMsg = data.msg;
                        this.getImgCode();
                    }
                }

            },
            register: function () {
                this.error = false;
                this.errorMsg = '';
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                if (!this.validatePhonecode())
                    return;

                if (!this.phoneCode) {
                    this.errorNum = 4;
                    return;
                }
                if (!this.checked) {
                    this.error = true;
                    this.errorMsg = '请勾选《注册协议》';
                    return;
                }
                this.errorNum = 0;
                let regData = {
                    type: this.borrowCheck ? 1 : 2,
                    mobile: this.mobile,
                    password: this.passWord,
                    imgCode: this.imgCode,
                    pageId: this.pageId,
                    phoneCode: this.phoneCode,
                    accountType: 2,
                    inviterCode: this.inviterCode
                };
                this.$api.register(regData).then(res => {
                    if (res.code == 100) {
                        this.$cookie.setCookie('tokenId', res.data.tokenId, 60 * 30);
                        this.$cookie.setCookie('userName', res.data.nickName, 60 * 30);
                        this.$cookie.setCookie('user',JSON.stringify(res.data), 60 * 30);
                        this.registerSuccess = true;
                        this.showRegister = false;
                        this.error = false;
                        this.errorMsg = '';
                    } else {
                        this.getImgCode();
                        this.error = true;
                        this.errorMsg = res.msg;
                    }
                });
            },
            validatePhonecode: function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/,
                    pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/;
                if (!phoneReg.test(this.mobile)) {
                    this.errorNum = 1;
                    return;
                }
                if (!pwdReg.test(this.passWord)) {
                    this.errorNum = 2;
                    return;
                }
                if (!this.imgCode) {
                    this.errorNum = 3;
                    return;
                }
                return true;
            }
        },
        components: {
            timerBtn
        },
        metaInfo: {
            title: '用户注册-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '用户注册,注册入口'
            }]
        }
    };
</script>
<style lang="scss">
    @import '../../assets/css/login.scss';
</style>

