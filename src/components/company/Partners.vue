<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">合作伙伴</div>
            <div class="partners clearfix">
                <div class="partners-img img-1 fl"></div>
                <div class="partners-words fl">
                    <h2>厦门国际银行</h2>
                    <p>厦门国际银行（全称厦门国际银行股份有限公司）成立于1985年，是中国首家中外合资银行。截止2013年一季度，厦门国际银行全面完成了股改工作，引入56家新投资者，股东数增加到62家，注册资本从2011年的10.6896亿元人民币增加到20.043亿元人民币，资本净额达到110亿元，形成了“多股东、小比例、多种所有制并存”的多元化、国际化股权结构。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-2 fl"></div>
                <div class="partners-words fl">
                    <h2>CFCA中国金融认证中心</h2>
                    <p>中金金融认证中心有限公司,是由中国人民银行于1998年牵头组建、经国家信息安全管理机构批准成立的国家级权威安全认证机构，是国家重要的金融信息安全基础设施之一。在《中华人民共和国电子签名法》颁布后，CFCA成为首批获得电子认证服务许可的电子认证服务机构。截至目前，超过2400家金融机构使用CFCA的电子认证服务，在使用数字证书的银行中占98%的份额。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-7 fl"></div>
                <div class="partners-words fl">
                    <h2>海大富林</h2>
                    <p>北京海大富林融资担保有限公司成立于2009年9月1日，是经北京市工商行政管理局注册，北京市金融工作局批准的融资担保专业化公司。注册号：110000012224665，注册地址为北京市朝阳区光华路8号B座5层502室，公司类型为有限责任公司（自然人投资或控股），注册资本40000万元人民币。经营许可项目：融资性担保业务、贷款担保、票据承兑担保、贸易融资担保、项目融资担保、信用证担保及其他融资性担保业务。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-5 fl"></div>
                <div class="partners-words fl">
                    <h2>鹏元征信</h2>
                    <p>鹏元征信有限公司（以下简称为“鹏元征信”）成立于2005年4月8日，以打造互联网征信生态圈为愿景，致力于为客户呈现专业化、个性化的征信服务。鹏元征信提供个人征信、企业征信、企业评分、个人评分、征信系统设计开发、软件设计开发和中小企业信用风险控制等征信业务，并且通过对数据的积累、理解、挖掘、分析和应用，不断完善现有的征信产品体系与服务模式。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-6 fl"></div>
                <div class="partners-words fl">
                    <h2>京都律师事务所</h2>
                    <p>北京市京都律师事务所成立于1995年，是国内较早设立的合伙制律师事务所之一。目前，京都已建设成为一家提供包括非诉业务、民商诉讼、刑事诉讼等全面法律服务的综合性律师事务所。其中，京都在刑事诉讼领域居于全国领先地位。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-3 fl"></div>
                <div class="partners-words fl">
                    <h2>e签宝</h2>
                    <p>e签宝是杭州天谷信息科技有限公司旗下的第三方电子签名SaaS与PaaS服务平台。作为可信互联网的重要基础设施之一，基于《中华人民共和国电子签名法》，e签宝可提供可靠电子签名与电子数据保全服务，包括电子合同签署、知识产权保护、电子票证、电子数据保全等一整套完善的服务体系，为用户提供数据资产确权和保全服务。</p>
                </div>
            </div>

            <div class="partners clearfix">
                <div class="partners-img img-4 fl"></div>
                <div class="partners-words fl">
                    <h2>易宝支付</h2>
                    <p>易宝支付（YeePay.com)是中国行业支付的开创者和领导者。易宝支付于2003年8月成立，总部位于北京，在上海、广东、江苏、福建、广西、天津、云南、四川、浙江、山东、陕西等设有30家分公司。自公司成立以来，易宝支付秉承成就客户、极致服务、实事求是、开放分享的核心价值观，以交易服务改变生活为使命，致力成为世界一流的交易服务平台，领跑电子支付、移动互联和互联网金融。</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
     export default {
        name: 'notices',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company'
            }
        },
         metaInfo: {
             title: '合作伙伴-金谷财行',
             meta: [{
                 name: 'keyWords',
                 content: '金谷财行平台公告'
             }]
         }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
