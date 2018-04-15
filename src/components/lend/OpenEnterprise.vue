<template>
    <!--open-account start-->
    <div class="container">
        <div class="open-account">
            <div class="form-group">
                <span>企业名称</span>
                <input type="text" v-model="orgName" placeholder="请输入企业名称" autocomplete="off" maxlength="30">
                <div class="error" v-show="orgNameError">企业名称不允许为空</div>
            </div>

            <div class="form-group">
                <span>社会信用代码</span>
                <input type="text" v-model="bankLicense" placeholder="请输入企业的社会信用代码" autocomplete="off" maxlength="18">
                <div class="error" v-show="bankLicenseError">{{bankLicenseMsg}}</div>
            </div>

            <div class="form-group">
                <span>营业执照</span>
                <input type="text" v-model="businessLicense" placeholder="请输入营业执照" autocomplete="off" maxlength="18">
                <div class="error" v-show="businessLicenseError">{{businessLicenseMsg}}</div>
            </div>

            <div class="form-group">
                <span>组织机构代码</span>
                <input type="text" v-model="orgNo" placeholder="请输入组织机构代码" autocomplete="off" maxlength="18">
                <div class="error" v-show="orgNoError">组织机构代码应为18位</div>
            </div>
            <div class="form-group">
                <span>法定代表人</span>
                <input type="text" v-model="name" placeholder="请输入法定代表人" autocomplete="off" maxlength="18">
                <div class="error" v-show="nameError">请输入法定代表人</div>
            </div>
            <div class="form-group">
                <span>法人身份证</span>
                <input type="text" v-model="idCard" placeholder="请输入法人身份证" autocomplete="off" maxlength="18">
                <div class="error" v-show="idCardError">请输入法人身份证</div>
            </div>
            <div class="form-group">
                <span>公章防伪码</span>
                <input type="text" v-model="antiCounterfeitCode" placeholder="请输入公章防伪码(非必填)" autocomplete="off" maxlength="18">
                <div class="error" v-show="antiCounterfeitCodeError">公章防伪码应为18位数字</div>
             </div>

            <div class="form-group un-overflow">
                <span>开户银行</span>
                <div class="bankinfo-box">
                    <div @click="showSel">{{bankShowName}}</div>
                    <div class="arrow"></div>
                    <ul class="bankinfo-list" v-show="selShow">
                        <li v-for="(item,index) in bankinfoList" :key="item.id" @click="setSelect(item)">{{item.bankName}}</li>
                    </ul>
                </div>
            </div>
            <!--<div class="form-group">-->
                <!--<span>账户名称：</span>-->
                <!--<input type="text" v-model="acctName" placeholder="请输入企业账户名称" autocomplete="off">-->
                <!--<div class="error" v-show="acctNameError">请输入企业账户名称</div>-->
            <!--</div>-->

            <div class="form-group">
                <span>对公账户号</span>
                <input type="text" value="" v-model="acctNo" placeholder="请输入对公账户号" autocomplete="off">
                <div class="error" v-show="acctNoError">请输入对公账户号</div>
            </div>

            <div class="form-group">
                <span>手机号</span>
                <input type="text" v-model="mobile" placeholder="请输入预留手机号" maxlength="11" autocomplete="off">
                <div class="error" v-show="mobileError">请输入预留手机号</div>
            </div>

            <div class="form-group">
                <span>短信验证码</span>
                <input type="text" v-model="phoneCode" placeholder="短信验证码" maxlength="6" autocomplete="off">
                <div class="error" v-show="phoneCodeError">请输入短信验证码</div>

                <div class="state">
                    <timerBtn ref="timerBtn" class="btn-small" @run="getPhoneCode" @callback="callback" :disabled="codeDisabled"></timerBtn>
                </div>
                <div>
                <span class="error-error invitation error" v-show="error">{{errorMsg}}</span>
                </div>
            </div>

            <!-- <timerBtn ref="timerBtn" class="btn-small" @run="getPhoneCode" @callback="callback"></timerBtn> -->


                <button class="btn fr" @click="openAccount()" :disabled="submitDisabled">立即开通</button>

        </div>
    </div>
    <!--open-account end-->
</template>

<script>
    import timerBtn from '../public/sendSmsCode.vue';

    const TIME_COUNT = 60;
    export default {
        data () {
            return {
                checked : true,
                bankShowId: -1, // 选中的银行编号
                bankShowName:'', // 选中银行名称
                bankinfoList:'', // 银行列表
                selShow: false, // 显示银行列表
                phoneCode:'',
                error: false,
                errorMsg:'',
                phoneCodeError:false,
                submitDisabled:false, //重复提交
                codeDisabled:false, //验证码重复提交

                orgName:'',
                orgNameError:false,

                bankLicense:'',//企业社会信用代码证
                bankLicenseMsg:'',
                bankLicenseError:false,

                businessLicense:'',//营业执照
                businessLicenseMsg:'',
                businessLicenseError:false,

                orgNo:'',//组织机构代码
                orgNoError:false,

                acctName:'',//账户名称
//                acctNameError:false,

                acctNo:'',//账户号
                acctNoError:false,

                bankId:'',//开户银行
                mobile:'',//手机号
                mobileError:false,

                name:'',
                nameError:false,

                idCard:'',
                idCardError:false,
                antiCounterfeitCode:'',
                antiCounterfeitCodeError:false


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
                this.bankShowId = item.bankId;//开户行编码（本平台ID）
                this.bankShowName = item.bankName;//开户行名称
                this.selShow = false;
            },
            showSel(){
                this.selShow = true;
            },

            getPhoneCode: function () {
                this.codeDisabled=true;
                this.error = false;
                if (!this.validateMobile()){
                    this.codeDisabled=false;
                    return ;
                }

                let phoneCodeData = {
                    mobile: this.mobile,
                    type: 'common'
                };
                this.$refs.timerBtn.sendSMSCode(phoneCodeData);

            },
            callback:function (data) {
                this.codeDisabled=false;
                this.error = true;
                this.errorMsg = data.msg;
            },
            openAccount: function () {
                let regData = {
                    orgName:this.orgName,
                    bankLicense:this.bankLicense,
                    businessLicense:this.businessLicense,
                    orgNo:this.orgNo,
                    acctName:this.orgName, //企业账户等同于企业名称
                    acctNo:this.acctNo,
                    bankId:this.bankShowId,
                    mobile:this.mobile,
                    phoneCode:this.phoneCode,
                    name:this.name,
                    idCard:this.idCard,
                    antiCounterfeitCode:this.antiCounterfeitCode
                };
                 if(!this.orgName){
                    this.orgNameError=true;
                    return;
                }else{
                    this.orgNameError=false;
                }

                if(!this.validateLicense()){
                    return ;
                }else{
                    this.bankLicenseError=false;
                    this.businessLicenseError=false;
                    this.bankLicenseMsg="";
                    this.businessLicenseMsg="";
                }
                 if(this.orgNo.length!=18){
                    this.orgNoError=true;
                    return;
                }else{
                    this.orgNoError=false;
                }
                 if(!this.name){
                    this.nameError=true;
                    return;
                }else{
                    this.nameError=false;
                }
                 if(!this.idCard){
                    this.idCardError=true;
                    this.error = false;
                    return;
                }else if (!this.validateIdCard(this.idCard)){
                    this.idCardError = true;
                    this.error = false;
                    return;
                }else{
                    this.idCardError=false;
                }

                if(this.antiCounterfeitCode){
                    if(!this.validateAntiCounterfeitCode()){
                        this.antiCounterfeitCodeError=true;
                        return;
                    }else{
                        this.antiCounterfeitCodeError=false;
                    }
                }

                 if(!this.acctNo){
                    this.acctNoError=true;
                    return;
                }else{
                    this.acctNoError=false;
                }
                 if (!this.validateMobile()) {
                     this.mobileError=true;
                    return;
                }else{
                     this.mobileError=false;
                }

//                if (!this.mobile) {
//                    this.mobileError=true;
//                    return;
//                }else{
//                    this.mobileError=false;
//                }
                 if(!this.phoneCode){
                    this.phoneCodeError=true;
                    return;
                }else{
                    this.phoneCodeError=false;
                }

                // if (!this.checked) {
                //     this.error = true;
                //     this.errorMsg = '请勾选《注册协议》';
                //     return;
                // }


                this.error = true;
                this.errorMsg = "处理中，请稍后...";
                this.submitDisabled=true;
                this.$api.enterpriseApply(regData).then(res => {
                    if (res.code == 100) {
                         this.$api.enterpriseBind(regData).then(res => {
                            if (res.code == 100) {
                                this.$router.push({name: 'successfailure',  params:{accountId:res.data.accountId,orgName:res.data.orgName,msg: res.msg,accountType:res.data.accountType}});
                            }else{
                                this.submitDisabled=false;
                                this.$router.push({name: 'successfailure',  params:{msg: res.msg}});
                            }
                        });
                    } else {
                         this.submitDisabled=false;
                         this.$router.push({name: 'successfailure',  params:{msg: res.msg}});
                    }
                });
            },

            validateLicense:function(){
                this.bankLicenseError=false;
                this.bankLicenseMsg="";
                this.businessLicenseError=false;
                this.businessLicenseMsg="";

                if(!this.bankLicense && !this.businessLicense ){
                    this.bankLicenseMsg="企业社会信用代码与营业执照，请二选一";
                    this.businessLicenseMsg="企业社会信用代码与营业执照，请二选一";
                    this.bankLicenseError=true;
                    this.businessLicenseError=true;
                    return;
                }else if(!this.bankLicense && this.businessLicense ){
                    if(this.businessLicense.length!=18){
                        this.businessLicenseError=true;
                        this.businessLicenseMsg="营业执照编号应为18位";
                        return;
                    }else{
                        return true;
                    }
                }else if(this.bankLicense && !this.businessLicense ){
                    if(this.bankLicense.length!=18){
                        this.bankLicenseError=true;
                        this.bankLicenseMsg="统一社会信用代码应为18位";
                        return;
                    }else{
                        return true;
                    }
                }else if(this.bankLicense && this.businessLicense ){
                    if(this.bankLicense.length!=18){
                        this.bankLicenseError=true;
                        this.bankLicenseMsg="统一社会信用代码应为18位";
                        return;
                    }
                    if(this.businessLicense.length!=18){
                        this.businessLicenseError=true;
                        this.businessLicenseMsg="营业执照编号应为18位";
                        return;
                    }
                    return true;
                }
            },

            validateAntiCounterfeitCode:function () {
                let reg = /^\d{13}$/;
                if (!reg.test(this.antiCounterfeitCode)) {
                    this.antiCounterfeitCodeError=true;
                    return;
                }else{
                    this.antiCounterfeitCodeError=false;
                    return true;
                }
            },

            // 身份证号验证
            validateIdCard(val, callback){
                let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
                if (!reg.test(val)) {
                    if(callback){
                        callback();
                    }
                    return false;
                }
                return true;
            },
            validateMobile:function () {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                if (!phoneReg.test(this.mobile)) {
                    this.mobileError=true;
                    return;
                }else{
                    this.mobileError=false;
                    return true;
                }

            }
        },
        components: {
            timerBtn
        },
        mounted(){
            this.getBankList();
        }
    };
</script>

<style lang="scss">
    @import '../../assets/css/lend.scss';
</style>
