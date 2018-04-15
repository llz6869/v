//登录未登录状态
<template>

    <div class="container">
        <!--r-account start-->
        <div class="r-account" v-show="!loginBoxShow">
            <span class="name">平均借款利率</span>
            <span class="rate">8.66%</span>
            <span class="deposit">用户资金由银行存管</span>
            <router-link to="/register" class="voucher">注册领618现金券</router-link>
            <span class="land">已有账户？<router-link to="/login">登录</router-link></span>
        </div>
        <!--r-account end-->

        <!--r-land start-->
        <div class="r-land" v-show="loginBoxShow">
            <div class="hand"></div>
            <span class="phone">{{userName}}</span>
            <span class="welcome">欢迎来到金谷财行</span>
            <router-link to="/account" class="voucher">我的账户</router-link>
        </div>
        <!--r-land end-->
    </div>

</template>

<script>
    export default {
        data () {
            return {
              loginBoxShow: false,
              userName: ''
            }
        },
        mounted () {
            this.loginBoxShow = !!this.$cookie.getCookie('tokenId');
            this.userName = this.$cookie.getCookie('userName');
        }
}
</script>

<style scoped>
    /*首页 滚动模块中未登陆账户 start*/
    .r-account{z-index:5;position:relative;left:900px; bottom:0; width:250px; height: 360px; padding:0 25px; text-align:center;font-size: 14px;color: #fff;background:rgba(0,0,0,.3);}
    .r-account span{display:block;}
    .r-account .name{padding: 40px 0 32px 0; color:#fff;}
    .r-account .rate{font-size: 60px;}
    .r-account .deposit{padding: 30px 0 18px 0;}
    .r-account .voucher{display: block;width: 248px;height: 50px;color: #fff; border: 1px solid #fff;line-height: 50px;font-size:24px;}
    .r-account .land{padding-top: 16px; color:#fff; text-align: right;}
    .r-account .land a{color: #ef6c2d;}
    /*首页 滚动模块中未登陆账户 end*/

    /*首页 滚动模块中登陆账户 start*/
    .r-land{display:block;z-index:5;position:relative;left:900px; bottom:0; width:250px; height: 360px; padding:0 25px; text-align:center;font-size: 14px;color: #fff;background:rgba(0,0,0,.3);}
    .r-land span{display:block;}
    .r-land .hand{width: 110px;height: 110px;padding: 25px 70px;background:url("/static/images/public/hand.png") no-repeat 70px 25px;}
    .r-land .phone{font-size: 14px;}
    .r-land .welcome{font-size:18px; padding: 16px 0 26px 0;}
    .r-land .voucher{display: block;width: 248px;height: 50px;border: 1px solid #fff;line-height: 50px;font-size:24px;color:#fff;}
    /* .r-land .voucher:hover{color: #ef6c2d;border: 1px solid #ef6c2d;} */
    /*首页 滚动模块中登陆账户 end*/
</style>
