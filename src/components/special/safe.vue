<template>
    <div class="special">
        <!--safe start-->
        <div class="safe">
            <div class="top"></div>
            <!--depository start-->
            <div class="depository">
                <div class="container">
                    <three-bar :title="CustodyDepository"></three-bar>
                    <div class="content"></div>
                </div>
            </div>
            <!--depository end-->

            <!--risk start-->
            <div class="risk">
                <div class="container">
                    <three-bar :title="CustodyRisk"></three-bar>
                    <p>如何筛选借款人、控制还款风险？</p>
                    <p>金谷财行通过44道工序多重审核、全程监控、严格的项目审查，确保项目优质、安全</p>
                    <div class="content"></div>
                </div>
            </div>
            <!--risk end-->

            <!--contract start-->
            <div class="contract">
                <div class="container">
                    <three-bar :title="CustodyElectronics"></three-bar>
                    <div class="content clearfix">

                        <div class="features">
                            <div class="portrait m-auto"></div>
                            <p>CFCA为金谷财行提供安全电子签章，使我们的签章服务安全性全面升级；</p>
                        </div>

                        <div class="features features-p">
                            <div class="portrait-m m-auto"></div>
                            <p>CFCA电子签章具有法律效力，适用于我国传统签章的相关法律法规，也适用于我国电子签名法；</p>
                        </div>

                        <div class="features">
                            <div class="portrait-r m-auto"></div>
                            <p>CFCA安全电子签章系统是一个公正、权威、第三方提供的具有可靠性、保密性、不可抵赖性、可防篡改、可校验等特点的公共安全电子签章服务平台。 </p>
                        </div>

                    </div>
                </div>
            </div>
            <!--contract end-->

            <!--skill start-->
            <div class="skill">
                <div class="container clearfix">
                    <three-bar :title="CustodySkill"></three-bar>

                    <div class="content m-auto clearfix">
                        <div class="module fl">
                            <div class="secure fl"></div>
                            <p class="fl">自主研发银行级安全</p>
                        </div>

                        <div class="module fr">
                            <div class="encrypt fl"></div>
                            <p class="fl">技术加密</p>
                        </div>
                    </div>

                    <div class="content m-auto clearfix">
                        <div class="module fl">
                            <div class="privacy fl"></div>
                            <p class="fl">用户信息隐私保护</p>
                        </div>

                        <div class="module fr">
                            <div class="time fl"></div>
                            <p class="fl">全年无休，24小时在线</p>
                        </div>
                    </div>

                </div>
            </div>
            <!--skill end-->

            <!--brand start-->
            <div class="brand clearfix">
                <div class="container">
                    <three-bar :title="CustodyBrand"></three-bar>
                    <div class="content m-auto">
                        <div class="portrait fl"></div>
                        <p class="fl">金谷财行主要服务于中国云谷与政府合作共建的各地云谷产业园区内的入园企业。这些企业大多属于政策支持性企业，得到了政府的大力支持。在长期的产业园区合作中，入园企业与中国云谷之间建立起了全方位的合作关系与互信。来自云谷产业园区的诸多企业，选择金谷财行平台解决其中小额借款需求。作为金谷财行的借款客户，这些企业生产和运营赖以维系的固定资产都集中在云谷产业园区内。借款客户经营稳定，还款保障强。</p>
                    </div>
                </div>
            </div>
            <!--brand end-->

            <!--backups start-->
            <div class="backups">
                <div class="container">
                    <three-bar :title="CustodyBackups"></three-bar>
                    <div class="content clearfix">
                        <div class="txt fl">
                            <p>金谷财行机房管理采取“两地三中心”方案，即在同一城市内，提供多个数据中心用于部署“同城生产中心”与“同城容灾中心”。</p>
                            <p>两中心通过城域网链路实现高速互联，城域网链路全部具备异路由环路保护，并通过长途传输网实现三地城域网。在济南部署的“异地容灾中心”，数据通过传输网同步，可实现“三中心”私网互联，既避免了通过公网同步会遇到的网络不稳定与数据传输的不安全。</p>
                        </div>
                        <div class="picture fl"></div>
                    </div>
                </div>
            </div>
            <!--backups end-->

            <!--certificate start-->
            <div class="certificate">
                <three-bar :title="CustodyCertificate"></three-bar>
                <div class="content m-auto"></div>
            </div>
            <!--certificate end-->

        </div>
        <!--safe end-->
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
                CustodyDepository: '银行资金存管',
                CustodyRisk: '全方位安全风控体系',
                CustodyElectronics: 'CFCA电子合同认证',
                CustodySkill: '专业信息安全技术保障',
                CustodyBrand: '品牌实力保障',
                CustodyBackups: '数据安全异地容灾备份',
                CustodyCertificate: '四重专业认证证书',
            }
        }
}
</script>

<style lang="scss">
    @import '../../assets/css/special.scss';
</style>
