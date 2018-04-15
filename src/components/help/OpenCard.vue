<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!--help start-->
        <div class="help">
            <div class="half-title">开户与绑卡</div>
            <div class="content">
                <ul class="help-list">
                    <li>
                        <div class="qa" @click="qa1=!qa1"><span class="help-arrow" :class="{'down': qa1}"></span>什么是银行电子账户？</div>
                        <div class="answer" v-show="qa1">
                            <span>银行电子交易账户是金谷财行为每位用户在银行免费开通的第三方银行资金存管账户，用户的每一笔资金记录都可以在银行系统中查询，真正实现了用户资金存管，提高了用户资金的安全性。</span>
                            <span>注：开通资金存管账户后，一个账户同一时间段只可绑定一张银行卡，遵循同卡进出原则。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa2=!qa2"><span class="help-arrow" :class="{'down': qa2}"></span>开通银行资金存管账户失败怎么办？</div>
                        <div class="answer" v-show="qa2">
                            <span>（1）检查您的姓名、身份证号码、银行卡号、银行预留手机号是否输入正确；</span>
                            <span>（2）检查您的身份证号是否已在其他用户名上做过实名认证；</span>
                            <span>（3）部分投资人的身份证由于移民、拆迁、户口转移，或属于军人、台胞、港澳等情况会导致认证失败，当前暂时无法实名；</span>
                            <span>检查您的银行卡是否属于全国商业银行或股份制商业银行（信用卡、二类账户银行卡不支持绑卡开户）；</span>
                            <span>检查您的银行卡是否已开通网上银行业务，可联系发卡行确认。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa3=!qa3"><span class="help-arrow" :class="{'down': qa3}"></span>从哪里查看我的银行存管/电子账户？</div>
                        <div class="answer" v-show="qa3">
                            <span>（1）电脑登录金谷财行，完成账户开户流程后，可在开户成功页面可查看。即银行电子交易账户；</span>
                            <span>（2）电脑登录金谷财行，在“充值”（快捷充值）、“提现”页面，可查看银行电子交易账户。</span>
                            <span>（3）移动端登录成功后，在“我的页面”“银行卡”页面可查看银行电子交易账户。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa4=!qa4"><span class="help-arrow" :class="{'down': qa4}"></span>银行电子账户可以办理实体卡吗？</div>
                        <div class="answer" v-show="qa4">
                            <span>银行存管账户属于电子交易账户，暂时不能办理实体卡。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa5=!qa5"><span class="help-arrow" :class="{'down': qa5}"></span>如何更换绑定的银行卡？</div>
                        <div class="answer" v-show="qa5">
                            <span>账户余额、待收总额均为0时，电脑登录金谷财行进入“我的账户”-“安全中心”-“存管银行”-“解绑”解除绑定银行卡，进行重新绑定即可；APP登录金谷财行进入“我的账户”-“银行卡”-“解绑”解除绑定银行卡，进行重新绑定即可。</span>
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
                qa5: false
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
<style lang="scss">
    @import '../../assets/css/help.scss';
</style>
