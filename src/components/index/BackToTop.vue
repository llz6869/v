// 返回顶部
<template>
    <div class="back-to-top" v-show="showReturnToTop" @mouseenter="show" @mouseleave="hide">
        <div class="block-level app">
            APP下载
            <div class="app-left"></div>
            <p>扫描二维码下载APP</p>
        </div>
        <!-- <div class="block-level service">在线客服</div> -->
        <div class="block-level phone">
            客服电话
            <div class="phone-left"></div>
            <p>400-770-6678</p>
        </div>
        <div class="block-level upward" @click="backToTop">回到顶部</div>
    </div>
</template>
 
<script>
    import { scrollIt } from '../../assets/js/scrollIt'; // 引入动画过渡的实现
    export default {
        name: 'back-to-top',
            props: {
            pageY: { // 默认在哪个视图显示返回按钮
                type: Number,
                default: 400
            },
            transitionName: { // 过渡动画名称
                type: String,
                default: 'linear'
            }
        },
        data: function () {
            return {
                showTooltips: false,
                showReturnToTop: false
            }
        },
        methods: {
            show () { // 显示隐藏提示文字
                return this.showTooltips = true;
            },
            hide () {
                return this.showTooltips = false;
            },
            currentPageYOffset () {
            // 判断滚动区域大于多少的时候显示返回顶部的按钮
            window.pageYOffset > this.pageY ? this.showReturnToTop = true : this.showReturnToTop = false;

            },
            backToTop () {
                scrollIt(0, 400, this.transitionName, this.currentPageYOffset);
            }
        },
        created () {
            window.addEventListener('scroll', this.currentPageYOffset);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.currentPageYOffset)
        }
    }
</script>
 
<style lang="scss">
    .back-to-top {
        position:fixed;z-index: 100; top: 50%;left: 50%;width: 70px;/*height: 280px;*/margin-top: -140px;margin-left: 605px; background: #fff;
        .left {right: 0;top: 50%;margin-right: 50px;transform: translateY(-50%);}
        .bottom {bottom: 0;margin-top: 50px;}
        .top {top: 0;margin-bottom: 50px;}

        .block-level{ 
            display: $db; width: 68px; height: 18px;padding-top: 50px;border: 1px solid #eee;color: #ff6b00; cursor: pointer;font-size: 12px;text-align: center;
            &:hover{ border:1px solid #ff6b00; color: #fff;}
        }
        .app{
            position: relative;background:$cf url("/static/images/index/fixedtool.png") no-repeat 0 0;
            p{display: $dn;}
            &:hover{
                background:#ff6b00 url("/static/images/index/fixedtool.png") no-repeat -70px 0;
                .app-left{ position: absolute; top:-20px; left:-145px; width: 137px;height: 148px;background: url("/static/images/index/fixed-app.png") no-repeat;}
                p{ display: $db; z-index: 2; position: absolute; top:100px; left:-132px; color: $c9; font-size: $px12;}
            }
        }
        .service{
            background:$cf url("/static/images/index/fixedtool.png") no-repeat 0 -70px;
            &:hover{ background:#ff6b00 url("/static/images/index/fixedtool.png") no-repeat -70px -70px;}
        }
        .phone{
            background:$cf url("/static/images/index/fixedtool.png") no-repeat 0 -140px;
            p{display: $dn;}
            &:hover{ 
                position: relative; background:#ff6b00 url("/static/images/index/fixedtool.png") no-repeat -70px -140px;
                .phone-left{ z-index: 1; position: absolute; top:10px; left:-190px; width: 182px;height: 50px; background: url("/static/images/index/fixed-phone.png") no-repeat;}
                p{ display: $db; z-index: 2; position: absolute; top:10px; left:-158px; color: $c9; font-size: $px16; line-height: 50px;}
            }
        }
        .upward{
            background:$cf url("/static/images/index/fixedtool.png") no-repeat 0 -210px;
            &:hover{ background:#ff6b00 url("/static/images/index/fixedtool.png") no-repeat -70px -210px;}
        }
    }
</style>

