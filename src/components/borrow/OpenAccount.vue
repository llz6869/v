<template>
    <!--open-account start-->
    <div class="container">
        <div class="open-account">
            <div class="form-group">
                <span>姓名：</span>
                <input type="text" name="keyword" v-model="userName" placeholder="请输入正确姓名" maxlength="5" autocomplete="off">
                <div class="error" v-show="userNameError">姓名不允许为空</div>
            </div>
            <div class="form-group">
                <span>身份证号：</span>
                <input type="text" name="keyword" v-model="idCard" placeholder="请输入正确的身份证号" maxlength="18" autocomplete="off">
                <div class="error" v-show="idCardError">请输入正确的身份证号</div>
            </div>
            <div class="form-group un-overflow">
                <span>开户银行：</span>
                <div class="bankinfo-box">
                    <div @click="showSel">{{bankShowName}}</div>
                    <div class="arrow"></div>
                    <ul class="bankinfo-list" v-show="selShow">
                        <li v-for="item in bankinfoList" :key="item.id" @click="setSelect(item)">{{item.bankName}}</li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <span>开户卡号：</span>
                <input type="text" name="keyword" v-model="bankCard" placeholder="请输入开户卡号" autocomplete="off">
                <div class="error" v-show="bankCardError">请输入正确的开户银行卡号</div>
            </div>
            <div class="form-group">
                <span>预留手机号：</span>
                <input type="text" name="keyword" v-model="mobile" placeholder="请输入预留手机号" maxlength="11"  autocomplete="off">
                <div class="error" v-show="mobileError">请输入正确的预留手机号</div>
            </div>
            <div class="form-group">
                <span>短信验证码：</span>
                <input type="text" name="keyword" v-model="phoneCode" placeholder="请输入验证码" maxlength="6"  autocomplete="off">
                <div class="state">
                    <!-- <button class="btn-small" @click="accountApply">获取验证码</button> -->
                    <timer-btn ref="timerBtn" class="btn-small" @run="accountApply" @callback="callback" :disabled="codeDisabled"></timer-btn>
                </div>
                 <div class="error" v-show="phoneCodeError">请输入短信验证码</div>
                 <div class="error" v-show="error">{{errorMsg}}</div>
            </div>

            <div class="form-group">
                <button class="btn fr" @click="openAccount" :disabled="submitDisabled">立即开通</button>
            </div>
        </div>
    </div>
    <!--open-account end-->
</template>
<script>
    import timerBtn from '../public/sendSmsCode.vue';

    export default {
        components: {
            'timer-btn': timerBtn
        },
        data () {
            return {
                userName: '', // 姓名
                idCard: '', // 身份证
                bankCard: '', // 开户卡号
                mobile: '', // 手机号
                imgCode: '' , // 图形验证码
                bankShowId: -1, // 选中的银行编号
                bankShowName: '', // 选中银行名称
                bankinfoList: '', // 银行列表
                selShow: false, // 显示银行列表
                orderNo:'', //订单号
                orginOrderNo:'',
                phoneCode:'',
                userNameError:false,
                idCardError:false,
                bankCardError:false,
                mobileError:false,
                phoneCodeError:false,
                submitDisabled:false,
                codeDisabled:false,
                error: false,
                errorMsg:''
            }
        },
        mounted(){
            this.getBankList();
        },
        methods:{
            callback(res) {
                this.phoneCodeError = false;
                this.codeDisabled=false;
                if (res.code == 100) {
                    this.orginOrderNo = res.data.orderNo;
                    this.error = true;
                    this.errorMsg = "验证码发送成功";
                }else{
                    this.error=true;
                    this.errorMsg = res.msg;
                }
            },
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
            accountApply(){
                this.error=false;
                this.codeDisabled=true;
                let obj={
                    memberId:'',//用户ID
                    name:this.userName,//开户姓名
                    idCardNum:this.idCard,//开户身份证号
                    bankCode:this.bankShowId ,//开户行编码（本平台ID）
                    bankCard:this.bankCard,//绑定银行卡号
                    bankMobile:this.mobile,//银行预留手机号
                    phoneCode:this.phoneCode//短信验证码
                };

                if(!this.userName){
                    this.userNameError=true;
                    return;
                }else{
                    this.userNameError=false;
                }

                if(!this.idCard){
                    this.idCardError=true;
                    return;
                }else{
                    this.idCardError=false;
                }

                if(!this.bankCard){
                    this.bankCardError=true;
                    return;
                }else{
                    this.bankCardError=false;
                }

                if(!this.mobile){
                    this.mobileError=true;
                    return;
                }else{
                    this.mobileError=false;
                }

                if (!this.validateMobile()) {
                    this.mobileError=true;
                    return;
                }else{
                    this.mobileError=false;
                }
                this.$refs.timerBtn.accountApply(obj);

            },
            openAccount(){
                let obj={
                    memberId:'',//用户ID
                    name:this.userName,//开户姓名
                    idCardNum:this.idCard,//开户身份证号
                    bankCode:this.bankShowId ,//开户行编码（本平台ID）
                    bankCard:this.bankCard,//绑定银行卡号
                    bankMobile:this.mobile,//银行预留手机号
                    phoneCode:this.phoneCode,//短信验证码
                    orginOrderNo:this.orginOrderNo,//原订单号
                    type:'1'
                };

                if(!this.userName){
                    this.userNameError=true;
                    this.error = false;
                    return;
                }else{
                    this.userNameError=false;
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

                if(!this.bankCard){
                    this.bankCardError=true;
                    this.error = false;
                    return;
                }else{
                    this.bankCardError=false;
                }

                if(!this.mobile){
                    this.mobileError=true;
                    this.error = false;
                    return;
                }else{
                    this.mobileError=false;
                }

                if (!this.validateMobile()) {
                    this.mobileError=true;
                    this.error = false;
                    return;
                }else{
                    this.mobileError=false;
                }

                if(!this.phoneCode){
                    this.phoneCodeError=true;
                    this.error = false;
                    return;
                }else{
                    this.phoneCodeError=false;
                }
                this.submitDisabled=true;
                this.error=true;
                this.errorMsg = "处理中，请稍后...";
                this.$api.validData(obj).then(res1 =>{
                     if (res1.code == 100) {
                        this.$api.openAccount(obj).then(res =>{
                            if (res.code == 100) {
                                this.$router.push({name: 'successfailure',  params:{accountId:res.data.accountId,name:res.data.name,msg: res.msg,accountType:res.data.accountType}});
                            }else{
                                this.submitDisabled=false;
                                this.$router.push({name: 'successfailure',  params:{msg: res.msg}});
                            }
                        })
                    }else{
                        this.submitDisabled=false;
                        this.error=true;
                        this.errorMsg = res1.msg;
                    }
                })
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
                }
                return true;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/lend.scss';
</style>
