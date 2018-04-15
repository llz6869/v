<template>
    <div>
        <!--modify start-->
        <div class="container" v-if="stepOne">
            <!--modify start-->
            <div class="modify">
                <!--step start-->
                <div class="step">
                    <!--enter start-->
                    <div class="enter">
                        <div class="finished fl"></div>
                        <div class="strip fl"></div>
                        <div class="unfinished fl">2</div>
                        <div class="strip fl"></div>
                        <div class="unfinished fl">3</div>
                    </div>
                    <!--enter end-->
                    <!--words start-->
                    <div class="words">
                        <span class="state fl current">验证身份</span>
                        <span class="state state-padding">重置密码</span>
                        <span class="state fr">重置成功</span>
                    </div>
                    <!--words end-->
                </div>
                <!--step end-->

                <!--content start-->
                <div class="content">
                    <div class="input-box">
                        <span>手机号码</span>
                        <em>*</em>
                        <input type="text" v-model="mobile" placeholder="请输入您的手机号" autocomplete="off">
                    </div>
                    <span class="phone" v-if="errorNum == 1">请输入正确手机号</span>
                    <div class="input-box">
                        <span>图形验证</span>
                        <em>*</em>
                        <input type="text" v-model="imgCode" placeholder="请输入图形验证码" autocomplete="off">
                        <div class="state" @click="getImgCode"><img :src="imgCodeSrc"/></div>
                    </div>
                    <span class="validate" v-if="errorNum == 2">请输入正确图形验证码</span>
                    <div class="input-box">
                        <span>手机验证</span>
                        <em>*</em>
                        <input type="text" v-model="phoneCode" placeholder="请输入验证码" autocomplete="off">
                        <timerBtn ref="timerBtn" class="state orange" @run="getPhoneCode" @callback="callback"></timerBtn>
                    </div>
                    <span class="validate-phone" v-if="errorNum == 3">请输入正确手机验证码</span>
                    <span class="validate-phone" v-if="errorNum == 4">{{errorNumMsg}}</span>
                    <button class="btn" @click="nextTwo">下一步</button>
                </div>
                <!--content end-->
            </div>
            <!--modify end-->
        </div>
        <!--modify end-->

        <!--modify start-->
        <div class="container" v-if="stepTwo">
            <!--modify start-->
            <div class="modify">
                <!--step start-->
                <div class="step">
                    <!--enter start-->
                    <div class="enter">
                        <div class="hook fl"></div>
                        <div class="strip strip-orange fl"></div>
                        <div class="finished fl"></div>
                        <div class="strip fl"></div>
                        <div class="unfinished fl">3</div>
                    </div>
                    <!--enter end-->
                    <!--words start-->
                    <div class="words">
                        <span class="state fl current">验证身份</span>
                        <span class="state state-padding current">重置密码</span>
                        <span class="state fr">重置成功</span>
                    </div>
                    <!--words end-->
                </div>
                <!--step end-->

                <!--content start-->
                <div class="content">
                    <div class="input-box">
                        <span>新密码&nbsp;&nbsp;&nbsp;</span>
                        <em>*</em>
                        <input type="password" v-model="password" placeholder="请输入您的新密码" minlength="6" maxlength="20" autocomplete="off">
                    </div>

                    <div class="input-box">
                        <span>确认密码</span>
                        <em>*</em>
                        <input type="password" v-model="comfirmPassword" placeholder="请输入确认密码" minlength="6" maxlength="20" autocomplete="off">
                    </div>
                    <span class="validate" v-show="errorTwo">{{errorMsgTwo}}</span>
                    <button class="btn" @click="nextThree">提交</button>
                </div>
                <!--content end-->
            </div>
            <!--modify end-->
        </div>
        <!--modify end-->

        <!--modify start-->
        <div class="container" v-if="stepThree">
            <!--modify start-->
            <div class="modify">
                <!--step start-->
                <div class="step">
                    <!--enter start-->
                    <div class="enter">
                        <div class="hook fl"></div>
                        <div class="strip strip-orange fl"></div>
                        <div class="hook fl"></div>
                        <div class="strip strip-orange fl"></div>
                        <div class="hook fl"></div>
                    </div>
                    <!--enter end-->
                    <!--words start-->
                    <div class="words">
                        <span class="state fl current">验证身份</span>
                        <span class="state state-padding current">重置密码</span>
                        <span class="state current fr">重置成功</span>
                    </div>
                    <!--words end-->
                </div>
                <!--step end-->

                <!--register-com start-->
                <div class="register-com">
                    <div class="icon fl"></div>
                    <div class="r-content fl">
                        <h3>恭喜您密码重置成功!</h3>
                        <router-link to="/login" class="btn">重新登录</router-link>
                    </div>
                </div>
                <!--register-com end-->

            </div>
            <!--modify end-->
        </div>
        <!--modify end-->

    </div>
</template>
<script>
    import api from '../../api/axios.js';
    import timerBtn from '../public/sendSmsCode.vue';
    const sitConfig = require('../../../config/index.js').config

    export default {
        data () {
            return {
                resetTokenId: '',
                stepOne: true,
                stepTwo: false,
                stepThree: false,
                mobile: '',
                password: '',
                comfirmPassword: '',
                imgCode: '',
                imgCodeSrc: '',
                pageId: '',
                phoneCode: '',
                type: 'findPassword',
                error: false,
                errorNum: 0,
                errorNumMsg: '',
                errorTwo: false,
                errorMsgTwo: ''
            };
        },
        mounted(){
            this.getImgCode();
        },
        methods: {
            getImgCode: function () {
                this.pageId = Math.floor(Math.random()*1000000);
                this.imgCodeSrc = sitConfig.BASE_URL + '/api/web/member/imgCode?pageId='+ this.pageId;
            },
            callback:function (data) {
                if (data.code != 100){
                    this.errorNum = 4;
                    this.errorNumMsg = data.msg;
                    this.getImgCode();
                }
            },
            getPhoneCode: function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                if (!phoneReg.test(this.mobile)) {
                    this.errorNum = 1;
                    return;
                }
                if (!this.imgCode) {
                    this.errorNum = 2;
                    return;
                }
                this.errorNum = 0;
                let phoneCodeData = {
                    imgCode: this.imgCode,
                    pageId: this.pageId,
                    mobile: this.mobile,
                    type: this.type
                };
                this.$refs.timerBtn.sendSMSCode(phoneCodeData);
            },
            nextTwo: function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                if (!phoneReg.test(this.mobile)) {
                    this.errorNum = 1;
                    return;
                }
                if (!this.imgCode) {
                    this.errorNum = 2;
                    return;
                }
                if (!this.phoneCode) {
                    this.errorNum = 3;
                    return;
                }
                let validateCode = {
                    type: this.type,
                    mobile: this.mobile,
                    imgCode: this.imgCode,
                    pageId: this.pageId,
                    phoneCode: this.phoneCode
                };
                this.errorNum = 0;
                api.validateCode(validateCode).then(res => {
                    if (res.code == 100) {
                        this.$cookie.setCookie('resetTokenId', res.data.resetTokenId, 1000 * 30);
                        this.resetTokenId = res.data.resetTokenId;
                        this.stepOne = false;
                        this.stepTwo = true;
                    } else {
                        this.errorNum = 4;
                        this.errorNumMsg = res.msg;
                        this.getImgCode();
                    }
                });

            },
            nextThree: function () {
                let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/;
                if (!pwdReg.test(this.password)) {
                    this.errorTwo = true;
                    this.errorMsgTwo = '密码为6-20位数字和字母组合';
                    return;
                }
                if (this.password != this.comfirmPassword) {
                    this.errorTwo = true;
                    this.errorMsgTwo = '两次密码输入不一致';
                    return;
                }
                let resetPassData = {
                    resetTokenId: this.resetTokenId,
                    newPassword: this.password,
                    comfirmPassword: this.comfirmPassword
                };
                api.resetPass(resetPassData).then(res => {
                    if (res.code == 100) {
                        this.stepThree = true;
                        this.stepTwo = false;
                        this.$cookie.delCookie('resetTokenId');
                    } else {
                        this.errorMsgTwo = res.msg;
                        this.errorTwo = true;
                    }
                });
            }
        },
        components: {
            timerBtn
        },
        metaInfo: {
            title: '找回密码-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '找回密码'
            }]
        }
    };
</script>

