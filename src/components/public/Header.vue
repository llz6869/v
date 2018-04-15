<template>
    <header>
        <!--top-bar start-->
        <div class="top-bar">
            <div class="container clearfix">
                <!--hot-line start-->
                <div class="hot-line">
                    全国热线：<span>400-770-6678</span>
                </div>
                <!--hot-line end-->

                <!--bar-extend start-->
                <div class="bar-extend">
                    <a href="http://weibo.com/jingucaihang" target="_blank" class="micro-blog"></a>
                    <a class="wechat"></a>
                </div>
                <!--bar-extend end-->

                <!--bar-nav start-->
                <div class="bar-nav">
                    <!-- <router-link to="" class="bar-old">进入旧版首页</router-link> -->
                    <router-link to="/login" v-show="!loginStatus">登录</router-link>
                    <router-link to="/register" v-show="!loginStatus">注册</router-link>
                    <router-link to="/account" class="user" v-show="loginStatus">欢迎您，<span>{{userName}}</span></router-link>
                    <a href="javascript:;" @click="quitFn()" v-show="loginStatus">退出</a>
                    <router-link to="/protocol/risktip">网络借贷风险提示书</router-link>
                    <router-link to="/help/registerland">帮助中心</router-link>
                    <router-link to="" class="phone">手机版</router-link>
                </div>
                <!--bar-nav end-->

            </div>
        </div>
        <!--top-bar end-->

        <!--top-nav start-->
        <div class="top-nav">
            <div class="container clearfix">
                <!--logo start-->
                <router-link to="/" class="logo"></router-link>
                <!--logo end-->

                <!--nav start-->
                <div class="nav">
                    <router-link to="/" exact>首页</router-link>
                    <router-link to="/borrow">我要出借</router-link>
                    <router-link to="/lend">我要借款</router-link>
                    <router-link to="/guide">新手指南</router-link>
                    <router-link to="/activities">福利活动</router-link>
                    <router-link to="/company/aboutus">信息披露</router-link>
                    <router-link to="/account" class="account-nav">我的账户</router-link>
                </div>
                <!--nav end-->
            </div>
        </div>
        <!--top-nav end-->
    </header>
</template>

<script>
    /*引入公共方法*/
    export default{
        data () {
            return {
                loginStatus: false,
                userName: this.$cookie.getCookie('userName') || ''
            };
        },
        methods:{
            quitFn(){
                let flag = this.$cookie.cleanAllCookie();
                if (flag) {
                    this.userName = '';
                    this.loginStatus = false;
                    this.$router.go(0);
//                    window.location.reload();
                }
            }
        },
        mounted(){
            /*如果cookie不存在，则跳转到登录页*/
            if(this.userName){
                this.loginStatus = true; // 显示登录名
                //this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss">
/* 页首start */
header{
    width:100%;transition:all .35s;
    /*顶部副导航start*/
    .top-bar{
        height: 32px;font-size:$px12;line-height: 32px;
        /*全国热线start*/
        .hot-line{
            float:left;width:166px;color:$c3;
            span{color:$cef6c2d;font-size:$px14;}
        }
        /*全国热线end*/

        /*导航 start*/
        .bar-nav{
            position:relative;float:right;height:32px;
            /*进入旧版首页start*/
            .bar-old{padding-right:20px; border-right: 0;}
            /*进入旧版首页end*/

            /*用户账号 start*/
            .user{
                color:$c9;
                &:hover{color:$c9;}
                span{
                    font-size:$px14;color:$cef6c2d;
                    &:hover{text-decoration: underline;}
                }
            }
            /*用户账号 end*/
            a{
                padding: 0 10px;color:$c9; border-right: 1px solid #e5e5e5;
                &:hover{color:$cef6c2d;}
            }
            .phone:hover:before{content:'';z-index: 999; position:absolute; top:38px; right:-22px;width: 111px;height: 127px;background:url("/static/images/public/micro-blog-h.png") no-repeat;}
        }
        /*导航end*/

        /*微信微博推广start*/
        .bar-extend{
            position:relative;float:right;width:60px;height:32px;padding:0 12px;padding-right:18px;
            /*微博start*/
            .micro-blog{display:$db;float:left;width:24px;height:24px;margin:4px 0;cursor:pointer;background: url("/static/images/public/micro-blog.png") no-repeat center bottom;}
            /*微博end*/
            /*微信start*/
            .wechat{
                display:$db;float:left;width:24px;height:24px;margin:4px 0 4px 12px;cursor:pointer;background: url("/static/images/public/wechat.png") no-repeat center bottom;
                &:hover:before{ content:'';z-index: 999; position:absolute; top:38px; right:-24px;width: 111px;height: 234px;background:url("/static/images/public/wechat-h.png") no-repeat;}
            }
            /*微信end*/
        }
        /*微信微博推广end*/
    }
    /*顶部副导航end*/

    /*顶部主导航start*/
    .top-nav{
        height: 46px;padding:13px 0;font-size:$px16;/*line-height:46px;*/background: $cf;
        .logo{float: left; /*width: 364px;*/ width: 170px;height:46px;padding-right: 194px;background:url("/static/images/public/logo.png")no-repeat;}
        .nav{
            float: right;height: 40px;line-height: 40px;padding:3px 20px 3px 0;
            a{height: 38px;padding:0 20px;color:$c0;}
            a:hover{color:$cef6c2d;}
            a.router-link-active{color:$cef6c2d;}
            /*我的账户 start*/
            .account-nav{
                display: $dib;color:$c0; background:url("/static/images/public/nav-account.png") no-repeat 12px 12px;text-indent:15px;border:1px solid #eee;border-radius: 8px;}
            .account-nav:hover{text-decoration: none;color:$cef6c2d;}
            /*我的账户 end*/
        }
        
    }
    /*顶部主导航end*/
}
/* 页首end */
</style>
