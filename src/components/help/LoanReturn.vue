<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!--help start-->
        <div class="help">
            <div class="half-title">出借与回款</div>
            <div class="content">
                <ul class="help-list">
                    <li>
                        <div class="qa" @click="qa1=!qa1"><span class="help-arrow" :class="{'down': qa1}"></span>出借后什么时候开始计息？</div>
                        <div class="answer" v-show="qa1">
                            <span>出借完成后，标的满标后次日（自然日）计息。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa2=!qa2"><span class="help-arrow" :class="{'down': qa2}"></span>出借为什么会失败？</div>
                        <div class="answer" v-show="qa2">
                            <span>（1）流标：项目发标后若未在规定募集期内完成所需募集资金，用户投资金额将返还至账户余额；</span>
                            <span>（2）同一时间段内多位投资人同时投标，最早用户投资完成后，如其他用户投资金额超出项目筹款金额，所有投资资金将返还至账户余额。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa3=!qa3"><span class="help-arrow" :class="{'down': qa3}"></span>投资后可以撤回吗？</div>
                        <div class="answer" v-show="qa3">
                            <span>投资完成后不允许撤回，满标复审后，您投资资金将自动转入标的账户；若此标流标，将原路返回到您的投资账户。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa4=!qa4"><span class="help-arrow" :class="{'down': qa4}"></span>投资后如何查看投资项目？</div>
                        <div class="answer" v-show="qa4">
                            <span>（1）电脑登录金谷财行，进入“我的账户”—“出借记录”即可查询；</span>
                            <span>（2）APP登录金谷财行，进入“我的”—“出借记录”即可查询。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa5=!qa5"><span class="help-arrow" :class="{'down': qa5}"></span>如何下载电子合同？</div>
                        <div class="answer" v-show="qa5">
                            <span>完成投资后，电脑登录金谷财行，进入“我的账户”—“出借记录”点击“出借协议”后可选择下载“电子合同”。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa6=!qa6"><span class="help-arrow" :class="{'down': qa6}"></span>项目还款方式？</div>
                        <div class="answer" v-show="qa6">
                            <span>项目分按月还款、一次性返本付息。</span>
                        </div>
                    </li>
                    <li>
                        <div class="qa" @click="qa7=!qa7"><span class="help-arrow" :class="{'down': qa7}"></span>如何查看回款的具体时间？</div>
                        <div class="answer" v-show="qa7">
                            <span>（1）登录电脑端金谷财行，选择“我的账户”—“出借记录”点击“回款计划”可查看具体回款时间；</span>
                            <span>（2）登录金谷财行APP，选择“我的”—“出借记录”可查看具体回款时间。</span>
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
                qa7: false
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
