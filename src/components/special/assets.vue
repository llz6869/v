<template>
    <div class="special">
        <!--assets start-->
        <div class="assets">
            <div class="top"></div>
            <!--policy start-->
            <div class="policy policy-cf">
                <div class="container">
                    <three-bar :title="CustodyPolicy"></three-bar>
                    <div class="content m-auto">
                        <div class="policy-head"></div>
                        <p class="pl">金谷财行主要服务于中国云谷与政府合作共建的各地云谷产业园区内的入园企业。这些企业大多属于政策支持性企业，得到了政府的大力支持。</p>
                    </div>
                </div>
            </div>
            <!--policy end-->

            <!--policy start-->
            <div class="policy">
                <div class="container">
                    <three-bar :title="CustodyMarket"></three-bar>
                    <div class="content m-auto">
                        <p class="pr">在长期的产业园区合作中，入园企业与中国云谷之间建立起了全方位的合作关系与互信。来自云谷产业园区的诸多企业，选择金谷财行平台解决其中小额借款需求。</p>
                        <div class="market-head"></div>
                    </div>
                </div>
            </div>
            <!--policy end-->

            <!--policy start-->
            <div class="policy policy-cf">
                <div class="container">
                    <three-bar :title="CustodyGuarantee"></three-bar>
                    <div class="content m-auto">
                        <div class="guarantee-head"></div>
                        <p class="pl">作为金谷财行的借款客户，这些企业生产和运营赖以维系的固定资产都集中在云谷产业园区内。借款客户经营稳定，还款保障强。</p>
                    </div>
                </div>
            </div>
            <!--policy end-->

            <!--introduce start-->
            <div class="introduce">
                <div class="container">
                    <three-bar :title="CustodyIntroduce"></three-bar>
                    <p>中国云谷开发运营的玫瑰小镇、森林小镇、渔业小镇、钢铁小镇几乎全部获得省市重点项目扶持，项目所构建的产业集群年产值数千亿元。集团旗下拥有产业运营公司、私募基金、金融交易中心、商品交易中心、互联网金融、电商平台、房地产公司等全产业链协作公司，已与全国200余个市县政府达成合作意向，为地方提供产业集聚、资本集聚、资源集聚、人才集聚、地产开发、金融服务、技术创新、服务升级、渠道整合、营销策划为一体的特色产业运营方案。</p>
                </div>
            </div>
            <!--introduce end-->

        </div>
        <!--assets end-->
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
                CustodyPolicy: '政策支持',
                CustodyMarket: '市场信赖',
                CustodyGuarantee: '经营保障',
                CustodyIntroduce: '背景介绍',
            }
        }
}
</script>

<style lang="scss">
    @import '../../assets/css/special.scss';
</style>
