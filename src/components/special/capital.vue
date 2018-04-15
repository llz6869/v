<template>
    <div class="special">
        <!--capital start-->
        <div class="capital">
            <div class="top"></div>
            <!--pattern start-->
            <div class="pattern">
                <div class="container">
                    <three-bar :title="CustodyPattern"></three-bar>
                    <div class="content"></div>
                </div>
            </div>
            <!--pattern end-->

            <!--advantage start-->
            <div class="container">
                <div class="advantage">
                    <three-bar :title="Custodyadvantage"></three-bar>
                    <div class="a-content">

                        <div class="box">
                            <div class="box-top supervise"></div>
                            <h3>符合监管要求</h3>
                            <p>《网络借贷信息中介机构业务活动管理暂行办法》明确规定：网络借贷信息中介机构应当实行自身资金与借款人和出借人资金的隔离管理，并选择符合条件的银行业金融机构作为出借人与借款人的资金存管机构。</p>
                        </div>

                        <div class="box">
                            <div class="box-top safe"></div>
                            <h3>资金安全</h3>
                            <p>用户在平台完成实名绑卡后，将在线上开立个人存管账户，用于存放用户交易资金。出借、还款时，出借人与借款人的交易资金都在自己的银行存管账户内由银行完成划拨。平台与用户资金完全隔离，彻底杜绝资金池。</p>
                        </div>

                        <div class="box">
                            <div class="box-top user"></div>
                            <h3>用户体验更优</h3>
                            <p>平台与银行双方进行多次的方案接洽与技术对接，专业研发团队集中时间封闭开发，尽可能地简化了繁杂流程，保障了用户体验与资金安全性、业务合规性。用户操作简单、高效。</p>
                        </div>

                        <div class="box">
                            <div class="box-top time"></div>
                            <h3>提现时间短</h3>
                            <p>由于用户交易资金存放在自己的银行存管账户内，从自己的存管账户转账至自己绑定的银行卡，属于跨行转账。当天16:30前提现，当天到账。无银行存管的平台提现最快也要T+1个工作日。</p>
                        </div>

                    </div>
                </div>
            </div>
            <!--advantage end-->

            <!--agreement start-->
            <!-- <div class="agreement">
                <div class="container clearfix">
                    <three-bar :title="CustodyAgreement"></three-bar>
                    <div class="agreement-bg"></div>
                </div>
            </div> -->
            <!--agreement end-->

            <!--sc-account start-->
            <div class="sc-account">
                <div class="container clearfix">
                    <three-bar :title="CustodyAccount"></three-bar>
                    <div class="user clearfix">
                        <!--old-user start-->
                        <div class="old-user user-mr">
                            <div class="head-old m-auto"></div>
                            <h3>老用户</h3>
                            <p>如果您是老朋友，登录后即可开通银行存管账户，资金受银行监管更安全。</p>
                            <router-link class="btn" to="/login">立即登录</router-link>
                        </div>
                        <!--old-user end-->

                        <!--new-user start-->
                        <div class="old-user">
                            <div class="head-new m-auto"></div>
                            <h3>新用户</h3>
                            <p>如果您是新用户，请点击立即注册，注册时即可按照页面提示开通银行存管账户。</p>
                            <router-link class="btn" to="/register">立即注册</router-link>
                        </div>
                        <!--new-user end-->
                    </div>
                </div>
            </div>
            <!--sc-account end-->

            <!--problem start-->
            <div class="problem">
                <div class="container">
                    <three-bar :title="CustodyProblem"></three-bar>
                    <h3><span>1</span> 银行存管上线后，用户需要做什么操作？</h3>
                    <p>新用户注册时，可按照页面提示开通银行存管账户。老用户需激活银行存管账户，重新绑卡后进行充值、出借、提现等操作。</p>
                    <h3><span>2</span> 银行存管上线后，用户资金有什么变化？</h3>
                    <p>用户的交易资金将由银行进行监管，只有用户本人才能操作账户上的资金，从根本上避免了被平台任意挪用的风险。</p>
                    <h3><span>3</span> 银行存管上线后，充值、出借、提现会有什么影响？</h3>
                    <p>（1）单笔提现金额≤5万，取决于银行发起时间，一般情况下2小时内到账；
                    <br><br>（2）单笔金额＞5万且≤50万，工作日8:30-16:30：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；工作日16:30以后：下一工作日工作时间到账；非工作日：取决于银行发起时间，一般情况下为2小时内到账；
                    <br><br>（3）单笔金额＞50万，工作日8:30-16:30：取决于收款行入账时间，一般情况下为实时到账，最长不超过2小时；工作日16:30以后：下一工作日工作时间到账；非工作日：需客户分笔提现或下个工作日提现。</p>
                </div>
            </div>
            <!--problem end-->
        </div>
        <!--capital end-->
    </div>
</template>
<script>
import ThreeBar from '../public/ThreeBar'
export default {
  components: {
            'three-bar': ThreeBar
        },
        data() {
            return {
                CustodyPattern: '银行存管模式',
                Custodyadvantage: '银行存管优势',
                // CustodyAgreement: '金谷财行-银行存管协议',
                CustodyAccount: '开通存管账户',
                CustodyProblem: '常见问题'
            }
        }
}
</script>
<style lang="scss">
    @import '../../assets/css/special.scss';
</style>
