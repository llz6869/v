<template>
    <footer>
        <!--f-list start-->
        <div class="f-list">
            <div class="container">
                <!--aboutUs start-->
                <ul>
                    <li>
                        <strong>关于我们</strong>
                        <router-link to="/company/information">公司信息</router-link>
                        <router-link to="/company/notice">平台公告</router-link>
                        <router-link to="/company/honor">公司荣誉</router-link>
                        <router-link to="/company/contactus">联系我们</router-link>
                    </li>
                    <li>
                        <strong>帮助中心</strong>
                        <router-link to="/guide">新手指南</router-link>
                        <router-link to="/help/registerland">常见问题</router-link>
                    </li>
                    <li>
                        <strong>信息披露</strong>
                        <router-link to="/company/media">媒体报道</router-link>
                        <!-- <a href="javascript:;" class="curd">公司动态</a> -->
                        <router-link to="/company/education">风险教育</router-link>
                    </li>
                    <li>
                        <strong>客服热线</strong>
                        <span class="span22">400-770-6678</span>
                        <span class="span12">(9：00-21：00)</span>
                        <span class="span16">QQ客服：3461949153</span>
                        <span class="span12">(工作日9：00-18：00)</span>
                        <span class="span12">在线客服：工作日9:00 - 18:00</span>
                    </li>
                </ul>
                <!--aboutUs end-->

                <!--qr-code start-->
                <div class="qr-code">
                    <span>APP客户端下载</span>
                    <span>关注订阅号</span>
                    <span class="no-margins">关注服务号</span>
                    <div class="app"></div>
                    <div class="subscribe"></div>
                    <div class="service"></div>
                </div>
                <!--qr-code end-->
            </div>
        </div>
        <!--f-list end-->

        <!--f-copyright start-->
        <div class="f-copyright">
            <div class="container">
                <!-- <div class="join">
                    <a class="title">友情链接：</a>
                    <router-link to="">cfca</router-link>
                    <router-link to="">金谷专享</router-link>
                    <router-link to="">北京京交所</router-link>
                    <router-link to="">天金所</router-link>
                    <router-link to="">山东交易所</router-link>
                    <router-link to="">更多</router-link>
                </div> -->
                <p>copyright@2017 北京金谷财行投资管理有限公司 京ICP备16007841号-5 市场有风险，决策需谨慎</p>
            </div>
            <div class="copyright">
                <a href="https://credit.szfw.org/CX20170428033786111696.html" target="_blank" class="sincerity"></a>
                <a href="https://ss.knet.cn/verifyseal.dll?sn=e17050411010167673spmd000000&ct=df&a=1&pa=0.7867264130264997
" target="_blank" class="icp"></a>
                <a href="http://si.trustutn.org/info?sn=808170503000578307600&certType=4
" target="_blank" class="norton"></a>
                <a href="http://www.itrust.org.cn/Home/Index/itrust_certifi?wm=1A0020GMX7" target="_blank" class="letter"></a>
            </div>
        </div>
        <!--f-copyright end-->

    </footer>
</template>

<style lang="scss">
/* 页尾 start*/
footer{
    color:$c9;background:$cf;
    /*链接列表start*/
    /*关于我们等连接start*/
    .f-list{
        height:252px;padding:24px 0;border-bottom:1px solid #eee;
        ul li{
            float: left;padding-right:76px;font-size:$px16;line-height: 42px;color: $c3;text-align:$ta-l;
            strong{font-weight:500;font-size:$px18;color: $c3;}
            a{display: inherit;font-size:$px16;color: $c9;}
            a:hover{color: $c0;}
            span{display: inherit;color:$c9;}
                .span22{font-size:22px;color:$c3;}
                .span12{font-size:$px12;}
                .span16{font-size:$px16;color: $c3;}
                .span14{font-size:$px14;}
        }
        /*关于我们等连接end*/
        /*二维码start*/
        .qr-code{
            float: left; width: 448px; height: 100%; margin-left:60px;font-size:$px16;line-height: 42px;color: $c3;text-align:$ta-c;
            span{
                display: inline-block;
                padding:0 25px;}
            .no-margins{ padding-left: 25px;padding-right:0;}
            /*app下载start*/
            .app{float: left; width:96px;height:96px; margin:10px 50px 0 58px;background:url("/static/images/public/qr-code.png") no-repeat 0 0;}
            /*app下载end*/
            /*订阅号下载start*/
            .subscribe{float: left; width:96px;height:96px; margin:10px 0;background:url("/static/images/public/qr-code.png") no-repeat -96px 0;}
            /*订阅号下载end*/
            /*服务号下载start*/
            .service{float: left; width:96px;height:96px; margin-top: 10px; margin-left: 38px;background:url("/static/images/public/qr-code.png") no-repeat -196px 0;
            }
            /*服务号下载end*/
        }
        /*二维码start*/
    }
    /*链接列表end*/
    /*版权列表start*/
    .f-copyright{background: #fff;
        /*友情链接start*/
        .join{
            margin:auto 0;text-align:$ta-c;line-height: 58px;color:$c9;
            a{display:inline-block;height: 58px;padding: 0 9px;font-size:$px14;color:$c9;line-height:58px;}
            a:hover{color: $c0;}
            .title{font-size:$px18; color: $c0;}
        }
        /*友情链接end*/
        /*声明start*/
        p{ padding-top: 22px; text-align:$ta-c; color: $c6;font-size:$px12;}
        /*声明end*/
        /*版权链接start*/
        .copyright{
            height: 50px; padding:22px 0 62px 0;text-align:$ta-c;
            a{display:inline-block; width:125px; height: 50px; margin: 0 23px;}
            .sincerity{width: 125px;height: 50px;background:url("/static/images/public/copyright.png") no-repeat 0 0;}
            .icp{width: 125px;height: 50px;background:url("/static/images/public/copyright.png") no-repeat -130px 0;}
            .norton{width: 125px;height: 50px;background:url("/static/images/public/copyright.png") no-repeat -260px 0;}
            .letter{width: 125px;height: 50px;background:url("/static/images/public/copyright.png") no-repeat -390px 0;}
        }
        /*版权链接end*/
    }
    /*版权列表end*/
}
</style>
