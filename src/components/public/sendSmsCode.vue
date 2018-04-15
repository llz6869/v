<template>
    <button type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>
<script>
    export default{
        props: {
            second: {
                type: Number,
                default: 60
            }
        },
        data:function () {
            return {
                time: 0,
                smsError:false,
                smsErrorMsg:'',
                disabled:false
            }
        },
        methods: {
            run: function () {
                this.$emit('run');
            },
            start: function(){
                this.time = this.second;
                this.timer();
            },
            stop: function(){
                this.time = 0;
                this.disabled = false;
            },
            setDisabled: function(val){
                this.disabled = val;
            },
            timer: function () {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }else{
                    this.disabled = false;
                }
            },
            sendSMSBankCode: function (phoneCodeData) {
                this.disabled = true; //设置按钮不可用
                this.$api.smsBankApply(phoneCodeData).then(res => {
                    if (res.code == 100) {
                        this.start(); //启动倒计时
                    } else {
                        this.stop(); //停止倒计时
                    }
                    this.$emit('callback',res);
                });
            },
            sendSMSCode: function (phoneCodeData) {
                this.disabled = true; //设置按钮不可用
                this.$api.getPhoneCode(phoneCodeData).then(res => {
                    if (res.code == 100) {
                        this.start(); //启动倒计时
                    } else {
                        this.stop(); //停止倒计时
                    }
                    this.$emit('callback',res);
                });
            },
            sendSMSCodeByLogin: function (phoneCodeData) {
                this.disabled = true; //设置按钮不可用
                this.$api.getPhoneCodeByLogin(phoneCodeData).then(res => {
                    if (res.code == 100) {
                        this.start(); //启动倒计时
                    } else {
                        this.stop(); //停止倒计时
                    }
                    this.$emit('callback',res);
                });
            },
            bindCardApply: function (bindCardData) {
                this.disabled = true; //设置按钮不可用
                this.$api.bindCardApply(bindCardData).then(res => {
                    if (res.code == 100) {
                        this.start(); //启动倒计时
                    } else {
                        this.stop(); //停止倒计时
                    }
                    this.$emit('callback',res);
                });
            },
            accountApply:function(obj){
                this.disabled = true; //设置按钮不可用
                this.$api.accountApply(obj).then(res =>{
                    if (res.code == 100) {
                        this.start(); //启动倒计时
                    } else {
                        this.stop(); //停止倒计时
                    }
                    this.$emit('callback',res);
                })
            }


        },
        computed: {
            text: function () {
                return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
            }
        }
    }
</script>



