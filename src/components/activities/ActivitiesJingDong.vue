<template>
    <div>
        <div class="project-header"></div>
        <div class="project-detail">
            <div class="a-container clearfix">
                <div class="pd-p">
                    在活动期间<span>新注册的用户</span>，在金谷财行平台出借<span>28天及以上期限标</span>，单笔出借金额达标，即可兑换相应档位礼品，此次活动礼品只能领取一个
                </div>
                <div class="pd-list">
                    <ul>
                        <li>
                            <span><strong>出借金额</strong></span>
                            <span><strong>出借形式</strong></span>
                            <span><strong>礼品</strong></span>
                        </li>

                        <li>
                            <span>>=1000元</span>
                            <span>单笔出借</span>
                            <span>10元现金红包</span>
                        </li>

                        <li>
                            <span>>=6000元</span>
                            <span>单笔出借</span>
                            <span>50元京东卡</span>
                        </li>

                        <li>
                            <span>>=12000元</span>
                            <span>单笔出借</span>
                            <span>100元京东卡</span>
                        </li>

                        <li>
                            <span>>=25000元</span>
                            <span>单笔出借</span>
                            <span>200元京东卡</span>
                        </li>

                    </ul>
                </div>
                <router-link class="pd-btn" to="/borrow"></router-link>
            </div>
        </div>

        <div class="project-rule">
            <div class="a-container clearfix">
                <p class="pr-p p-top">1. 在活动期间，新注册用户且投资28天及以上期限标的用户，单笔投资金额达标，可兑换实物礼品；若用户多笔投资均符合活动要求，用户只能按最高档礼品领取1个，不可重复领取；（例如新注册用户A，在活动期间内第一笔投资6000元，第二笔投资12000元，第三笔投资12000元，用户A此次活动最终获得礼品为100元京东卡1张；）</p>
                <p class="pr-p">2. 新手抵用券可使用参与此次活动；</p>
                <p class="pr-p">3. 本次活动产生的奖品将于活动结束后的16个工作日之内进行发放（10元现金红包，会直接发送至用户平台账号中）；金谷财行工作人员将与用户联系以确认获奖信息，请保持手机畅通；</p>
                <p class="pr-p">4. 本活动如有任何疑问请通过客服热线400-770-6678进行咨询。</p>
            </div>
        </div>
    </div>
</template>

<style>
    .a-container{ margin: 0 auto; width: 880px;}
    .project-header{ width: 100%; height: 451px; margin: 0 auto; background: url("/static/images/activities/project-header.jpg") top center no-repeat;}
    .project-detail{ width: 100%; height: 819px; margin: 0 auto; background: url("/static/images/activities/project-detail.jpg") top center no-repeat;}
    .project-detail .pd-p{padding-top:200px; color: #666; font-size: 18px;}
    .project-detail .pd-p span{ color: #ee631f; font-size: 22px; padding: 0 7px;}
    .project-detail .pd-list{width: 880px;height: 292px;margin: 30px 0 60px; background: #ffcb7c url("/static/images/activities/pd-list.png") center center no-repeat; border-radius: 10px;}
    .project-detail .pd-list li{ text-align: center; color: #8f512f; line-height: 58px; font-size: 16px;}
    .project-detail .pd-list li span{ display: block; float: left; width: 293px;}
    .project-detail .pd-list li span strong{ font-size: 20px; font-weight: bolder;}
    .project-detail .pd-btn{ display: block; width: 420px; height: 90px; margin: 0 auto; background: url("/static/images/activities/pd-btn.png") center center no-repeat; }
    .project-rule{ width: 100%; height: 647px; margin:-30px auto 0; background: url("/static/images/activities/project-rule.jpg") center center no-repeat;}
    .project-rule .pr-p{font-size: 16px; color: #8f512f; line-height: 30px; padding: 10px 0; }
    .project-rule .p-top{ padding-top: 230px;}
</style>
<script>
    export default {
        metaInfo: {
            title: '京东卡大礼免费送-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '投资送好礼,金谷财行新手专享,金谷财行跨年优惠活动,京东卡大礼免费送'
            }]
        }
    }
</script>
