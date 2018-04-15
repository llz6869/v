<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!--company start-->
        <div class="company">
            <div class="half-title">关于我们</div>
            <div class="content">
                <h2 class="content-title ">企业概况</h2>
                <p class="li-pt38">作为中国云谷科技集团（以下简称“中国云谷”）协作金融板块中专注于产业链金融的互联网金融平台，北京金谷财行投资管理有限公司注册资本2亿元，以中国云谷产业园区相关产业链上下游客户为中心，主要服务于三方资产端和财富端市场。金谷财行响应国家产业政策，为中国云谷旗下数十个特色产业园区的入园企业及其上下游供应商、分销商提供金融信息服务，旨在为其破解融资难、融资贵的问题，造福当地经济。</p>
                <p class="li-pt38">中国云谷是特色产业小镇运营的领跑者，也是国内唯一以“特色产业”理念规划、开发、投资、建设、运营产业园区和产业小镇的集团公司。2016年获得中国小镇经济创新奖。其与洪泰基金共建的“洪泰云谷创新空间”享誉业内。各地云谷产业园区主要采取与政府合作运营模式，园区入园企业多为当地政府重点扶持企业。这些入园企业生产运营赖以维系的固定资产多集中于云谷产业园区，金谷财行正是为它们提供金融信息服务。企业正规、政策支持，为金谷财行打造了优质安全的资产基础。</p>

                <h2 class="content-title">经营理念</h2>
                <p class="li-pt38"><span class="hollow-circle">1</span>稳健：不追求高速度，只追求高品质，脚踏实地是我们每个人都必须恪守的准则。</p>
                <p><span class="hollow-circle">2</span>安全：对金谷财行而言，风控是我们的核心，合规是我们的生命。</p>
                <p><span class="hollow-circle">3</span>专业： 掌握专业技能，恪守职业精神，精益求精、追求极致。</p>
                <p><span class="hollow-circle">4</span>高效：说到做到，效率第一，不让客户等待，按时兑现承诺。</p>

                <h2 class="content-title">我们的优势</h2>
                <p class="li-pt38"><span class="square"></span>多重保障，数据安全</p>
                    <p><span class="circular"></span>已与银行签约资金存管协议；</p>
                    <p><span class="circular"></span>44道工序多重审查、全程监控，确保项目安全优质；</p>
                    <p><span class="circular"></span>三层防火墙确保及时发现非正常情况；</p>
                    <p><span class="circular"></span>由中国金融认证中心认证电子合同；</p>
                    <p><span class="circular"></span>大型企业集团或有担保能力的个人为融资方履约提供担保；</p>
                    <p><span class="circular"></span>“两地三中心”机房管理模式、济南异地容灾中心建设，确保了网络稳定与数据传输安全。</p>
                <p><span class="square"></span>政府支持，项目可靠</p>
                <p>金谷财行主要服务于中国云谷与政府合作共建的各地云谷产业园区内的入园企业。这些企业大多属于政策支持性企业，得到了政府的大力支持。</p>
                <p><span class="square"></span>客源稳定，市场广阔</p>
                <p>在长期的产业园区合作中，入园企业与中国云谷之间建立起了全方位的合作关系与互信。来自云谷产业园区的诸多企业，选择金谷财行平台解决其中小额借款需求。</p>
                <p><span class="square"></span>园区保障，资产优质</p>
                <p>作为金谷财行的借款客户，这些企业生产和运营赖以维系的固定资产都集中在云谷产业园区内。借款客户经营稳定，还款保障强。</p>

                <h2 class="content-title">平台背景</h2>
                <p class="li-pt38">目前，中国云谷开发运营的玫瑰小镇、森林小镇、渔业小镇、钢铁小镇几乎全部获得省市重点项目扶持，项目所构建的产业集群年产值数千亿元。旗下拥有产业运营公司、私募基金、金融交易中心、商品交易中心、村镇银行、互联网金融、电商平台、房地产公司等全产业链协作公司，已与全国200余个市县政府达成意向。中国云谷率先提出并与20余个地方政府合作践行产业园5.0运营服务模式、产业小镇IFPO模式（特色产业+金融+平台+运营），获得住建部、发改委、文化部、商务部下属协会特色小镇专项研究小组认可。</p>

                <p class="li-pt38">未来，中国云谷将继续与地方政府深度合作，开发运营大农业、大健康、大文化、高新科技、轻工智造五大产业，为国人提供宜业宜居宜养的生态新城与智慧城市的美好生活。作为中国云谷协作金融板块的互联网金融平台，今后，金谷财行将全程为集团各大项目提供金融信息服务，助力云谷梦想实现与地方经济升级！</p>
                <h2 class="content-title">办公环境</h2>
                <div class="ambient">
                    <div class="left fl">
                        <div class="left-top"></div>
                        <div class="left-bottom">
                            <div class="left-bottom-r fl"></div>
                            <div class="left-bottom-l fr"></div>
                        </div>
                    </div>
                    <div class="middle fl"></div>
                    <div class="right fl">
                        <div class="top-right"></div>
                        <div class="bottom-right"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--company end-->
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
    export default {
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company'
            }
        },
        metaInfo: {
            title: '关于我们-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行关于我们'
            }]
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
