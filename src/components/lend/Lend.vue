<template>
    <!--lend start-->
    <div class="lend">
        <div class="top"></div>
        <!--merit-layer start-->
        <div class="merit-layer">
            <div class="container">
                <div class="merit"></div>
                <p>
                    <span>额度高</span>
                    <span>放款快</span>
                    <span>手续简</span>
                    <span>费用少</span>
                </p>
            </div>
        </div>
        <!--merit-layer end-->

        <!--lend-product start-->
        <div class="container">
            <div class="lend-product">
                <three-bar :title="CustodyProduct"></three-bar>
                <router-link to="/lend/enterprilend" class="content">
                    <div class="l-img m-auto"></div>
                    <h3>企业贷</h3>
                    <p>企业实际经营时间须满一年以上</p>
                </router-link>
            </div>
        </div>
        <!--lend-product end-->

        <!--lend-flow start-->
        <div class="lend-flow">
            <div class="container">
                <three-bar :title="CustodyFlow"></three-bar>
                <div class="content">
                    <div class="flow-content"></div>
                    <p>
                        <span>发送借款资料</span>
                        <span>业务员与您联系</span>
                        <span>风控审核</span>
                        <span>审核通过，放款</span>
                    </p>
                </div>
            </div>
        </div>
        <!--lend-flow end-->

        <!--lend-problem start-->
        <div class="container">
            <div class="lend-problem">
                <three-bar :title="CustodyProblem"></three-bar>
                <div class="p-content clearfix">
                    <div class="words-layer clearfix">
                        <div class="words fl">
                            <h3>借款审核一般需要多长时间？</h3>
                            <p>借款人在成功提交资料后，工作人员会在24小时内进行审核，审核结果将会以电话形式通知，请务必保持手机畅通。</p>
                        </div>
                        <div class="words fr">
                            <h3>借款需要支付哪些费用？</h3>
                            <p>借款人需要支付利息费用，并向金谷财行平台支付一定的服务费用，具体以您的申请情况而定。</p>
                        </div>
                    </div>

                    <div class="words-layer clearfix">
                        <div class="words fl">
                            <h3>借款额度是多少？</h3>
                            <p>不同的借款产品额度范围有一定差别，具体额度根据借款人的收入、信用、负债等综合评估，以您最终的借款额度为准。</p>
                        </div>
                        <div class="words fr">
                            <h3>还款方式有哪些？</h3>
                            <p>根据不同的借款产品，还款方式分别有等额本息、先息后本、到期一次性还本付息等多种还款方式。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--lend-problem end-->

    </div>
    <!--lend end-->
</template>

<script>
import ThreeBar from '../public/ThreeBar'
export default {
  components: {
            'three-bar': ThreeBar
        },
        data() {
            return {
                CustodyProduct: '借款产品',
                CustodyFlow: '借款流程',
                CustodyProblem: '常见问题',
            }
        },
        metaInfo: {
            title: '我要借款_网络贷款_互联网金融贷款-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '我要借款,网络贷款,互联网金融贷款'
            }]
        }
}
</script>

<style lang="scss">
    @import '../../assets/css/lend.scss'
</style>
