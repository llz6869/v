<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!--help start-->
        <div class="help">
            <div class="half-title">充值与提现</div>
            <div class="content">
                <ul class="help-list">
                    <li>
                        <div class="qa" @click="qa1=!qa1"><span class="help-arrow" :class="{'down': qa1}"></span>我可以通过哪些方式进行充值？</div>
                        <div class="answer" v-show="qa1">
                            <span>（1）电脑端可以使用快捷充值、网银充值；</span>
                            <span>（2）APP可以使用快捷充值。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa2=!qa2"><span class="help-arrow" :class="{'down': qa2}"></span>快捷充值支持银行及限额</div>
                        <div class="answer" v-show="qa2">
                            <span>
                                <table class="answer-tb" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr><td rowspan="2" >银行名称</td><td colspan="4">限额</td></tr>
                                        <tr>
                                            <td>单笔限额</td>
                                            <td>单日限额</td>
                                            <td>单月限额</td>
                                            <td>单笔最低金额</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>广发银行</td>
                                            <td>500万元</td>
                                            <td>500万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>建设银行</td>
                                            <td>20万元</td>
                                            <td>20万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>工商银行</td>
                                            <td>5万元</td>
                                            <td>5万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>光大银行</td>
                                            <td>5万元</td>
                                            <td>5万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>兴业银行</td>
                                            <td>20万元</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>中国银行</td>
                                            <td>5万元</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>平安银行</td>
                                            <td>5万元</td>
                                            <td>5万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>邮储银行</td>
                                            <td>0.5万元</td>
                                            <td>0.5万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>上海银行</td>
                                            <td>5万元</td>
                                            <td>20万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>交通银行</td>
                                            <td>0.99万元</td>
                                            <td>0.99万元</td>
                                            <td>--</td>
                                            <td>0.1元</td>
                                        </tr>
                                        <tr>
                                            <td>中信银行</td>
                                            <td>0.1万元</td>
                                            <td>0.1万元</td>
                                            <td>0.2万元</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>农业银行</td>
                                            <td>2万元</td>
                                            <td>2万元</td>
                                            <td>--</td>
                                            <td>0.1元</td>
                                        </tr>
                                        <tr>
                                            <td>浦发银行</td>
                                            <td>5万元</td>
                                            <td>5万元</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>招商银行</td>
                                            <td>0.1万元</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>0元</td>
                                        </tr>
                                        <tr>
                                            <td>北京银行</td>
                                            <td colspan="4">维护中</td>
                                        </tr>
                                        <tr>
                                            <td>华夏银行</td>
                                            <td colspan="4">维护中</td>
                                        </tr>
                                        <tr>
                                            <td>民生银行</td>
                                            <td colspan="4">维护中</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                            <span>温馨提示：浦发银行、邮储银行需开通银联无卡支付。“--”标示无限额</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa3=!qa3"><span class="help-arrow" :class="{'down': qa3}"></span>网关充值支持银行</div>
                        <div class="answer" v-show="qa3">
                            <table class="answer-tb gateway-tb" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <td rowspan="2">银行名称</td>
                                        <td colspan="3">个人客户限额(单位：万)</td>
                                        <td colspan="3">公司客户限额(单位：万)</td>
                                    </tr>
                                    <tr>
                                        <td>单笔</td>
                                        <td>单日</td>
                                        <td>单月</td>
                                        <td>单笔</td>
                                        <td>单日</td>
                                        <td>单月</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>北京银行</td>
                                        <td>100</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>工商银行</td>
                                        <td>100</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>农业银行</td>
                                        <td>100</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>900</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>中国银行</td>
                                        <td>50</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>建设银行</td>
                                        <td>50</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>交通银行</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>招商银行</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>中信银行</td>
                                        <td>100</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>兴业银行</td>
                                        <td>100</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>民生银行</td>
                                        <td>50</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>邮政银行</td>
                                        <td>200</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>华夏银行</td>
                                        <td>5</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>广发银行</td>
                                        <td>5</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>光大银行</td>
                                        <td>50</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>浦发银行</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                    <tr>
                                        <td>平安银行</td>
                                        <td>5</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                        <td>无</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa4=!qa4"><span class="help-arrow" :class="{'down': qa4}"></span>充值收费吗？</div>
                        <div class="answer" v-show="qa4">
                            <span>用户在金谷财行充值不收费，充值手续费已由平台为您垫付。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa5=!qa5"><span class="help-arrow" :class="{'down': qa5}"></span>充值到账时间？</div>
                        <div class="answer" v-show="qa5">
                            <span>充值资金实时到账。注：当日充值资金，次日（12:00后）方可提现。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa6=!qa6"><span class="help-arrow" :class="{'down': qa6}"></span>充值未到账怎么办？</div>
                        <div class="answer" v-show="qa6">
                            <span>充值后若显示“处理中”状态，则建议耐心等待，若长时间未到账可联系客服处理。客服中心400-770-6678</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa7=!qa7"><span class="help-arrow" :class="{'down': qa7}"></span>如何查看充值记录？</div>
                        <div class="answer" v-show="qa7">
                            <span>（1）电脑登录金谷财行，进入“我的账户”—“资金记录”，即可查看；</span>
                            <span>（2）手机登录金谷财行，进入“我的”—“资金记录”，即可查看。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa8=!qa8"><span class="help-arrow" :class="{'down': qa8}"></span>什么是同卡进出？</div>
                        <div class="answer" v-show="qa8">
                            <span>同卡进出是指用户在使用快捷充值与提现时，只能通过绑定的银行卡操作。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa9=!qa9"><span class="help-arrow" :class="{'down': qa9}"></span>提现收费吗？</div>
                        <div class="answer" v-show="qa9">
                            <span>平台不收取手续费。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa10=!qa10"><span class="help-arrow" :class="{'down': qa10}"></span>提现到账时间？</div>
                        <div class="answer" v-show="qa10">
                            <span>（1）单笔提现金额≤5万，取决于银行发起时间，一般情况下2小时内到账；</span>
                            <span>（2）单笔金额＞5万且≤50万，工作日<strong>8:30-16:30</strong>：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；<strong>工作日16:30以后</strong>：下一工作日工作时间到账；非工作日：取决于银行发起时间，一般情况下为2小时内到账；</span>
                            <span>（3）单笔金额＞50万，工作日<strong>8:30-16:30</strong>：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；<strong>工作日16:30以后</strong>：下一工作日工作时间到账；<strong>非工作日</strong>：需客户分笔提现或下个工作日提现。</span>
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
                qa6: false,
                qa7: false,
                qa8: false,
                qa9: false,
                qa10: false
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
