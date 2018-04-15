<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!--help start-->
        <div class="help">
            <div class="half-title">注册与登录</div>
            <div class="content">
                <ul class="help-list">
                    <li>
                        <div class="qa" @click="qa1=!qa1"><span class="help-arrow" :class="{'down': qa1}"></span>注册金谷财行需要满足哪些条件？</div>
                        <div class="answer" v-show="qa1">
                            <span>1）注册金谷财行需年满18周岁，具有完全民事行为能力；</span>
                            <span>2）拥有个人名下借记卡（储蓄卡），且属于全国商业银行或股份制商业银行。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa2=!qa2"><span class="help-arrow" :class="{'down': qa2}"></span>登录金谷财行的方式有哪些？</div>
                        <div class="answer" v-show="qa2">
                            <span>1）官网登录：输入网址www.jingubank.com，即可登录；</span>
                            <span>2）APP登录：下载金谷财行APP，直接登录；</span>
                            <span>注：官网、APP登录，均可完成充值、出借、提现。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa3=!qa3"><span class="help-arrow" :class="{'down': qa3}"></span>如何下载最新版金谷财行APP？</div>
                        <div class="answer" v-show="qa3">
                            <span>1）进入APP Store或各大应用市场，搜索“金谷财行”进行下载；</span>
                            <span>2）扫描下方二维码，即可直接下载。</span>
                            <span><img src="/static/images/account/app-download.jpg" alt="APP客户端下载"></span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa4=!qa4"><span class="help-arrow" :class="{'down': qa4}"></span>收不到验证码怎么办？</div>
                        <div class="answer" v-show="qa4">
                            <span>手机无法接收验证码，可能是由于以下原因导致：</span>
                            <span>1）目前仅支持中国大陆手机号注册，非中国大陆手机号，请更换其他手机；</span>
                            <span>2）手机安全软件拦截（针对已安装安全软件的智能手机用户），请打开手机安全软件，暂时关闭拦截功能，然后再次尝试获取验证码；</span>
                            <span>3）手机欠费停机或短信网关拥堵或出现异常，短信网关拥堵或出现异常时会导致已发的短信出现延时或丢失的情况，建议联系手机运营商核实或过段时间再次尝试获取；</span>
                            <span>4）周围的人可以正常使用，但自己始终收不到，建议交换机卡测试，将自己手机卡换到别人的手机上接收短信，再次进行尝试；</span>
                            <span>5）发送短信验证频率过快导致，建议您隔一段时间后再重新尝试操作即可。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa5=!qa5"><span class="help-arrow" :class="{'down': qa5}"></span>注册后账户可以注销吗？</div>
                        <div class="answer" v-show="qa5">
                            <span>账号一经注册，不可申请注销。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa6=!qa6"><span class="help-arrow" :class="{'down': qa6}"></span>注册手机号可以修改吗？</div>
                        <div class="answer" v-show="qa6">
                            <span>注册成功后，无法修改注册手机号。</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--help end-->
    </div>
</template>
<script>
    import HelpAside from '../public/Aside'
    export default {
        components:{
            'my-aside': HelpAside
        },
        data(){
            return {
                navType: 'help',
                qa1: false,
                qa2: false,
                qa3: false,
                qa4: false,
                qa5: false,
                qa6: false
            }
        },
        metaInfo: {
            title: '帮助中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '帮助中心'
            }]
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/help.scss';
</style>
