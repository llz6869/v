<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">公司信息</div>
            <div class="content">
                <!--information start-->
                <div class="information clearfix">
                    <!--basic start-->
                    <h2 class="content-title ">基本信息</h2>
                    <div class="basic clearfix">
                        <p class="basic-p">
                            <span class="span-l">公司全称</span>
                            <span class="span-r">北京金谷财行投资管理有限公司</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">简称</span>
                            <span class="span-r">金谷财行</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">注册资本</span>
                            <span class="span-r">20000万人民币</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">实缴资本</span>
                            <span class="span-r">8000万人民币</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">注册地址</span>
                            <span class="span-r">北京市东城区南竹杆胡同2号银河搜候中心5层20616-A0710</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">成立时间</span>
                            <span class="span-r">2013年</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">法定代表人</span>
                            <span class="span-r">马颖</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">经营范围</span>
                            <span class="span-r">资产管理；投资咨询；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出   具相应的审计报告、验资报告、查账报告、评估报告等文字材料）；经济贸易咨询；会议及展览服务；广告设计；组织文化艺术交流活动（不含演出）；技术开发；技术转让；技术咨询；技术服务；计算机技术培训（不得面向全国招生）。（“1、未经有关部门批准，不得以公开方式募集资金；2、不得公开开展证券类产品和金融衍生品交易活动；3、不得发放贷款；4、不得对所投资企业以外的其他企业提供担保；5、不得向投资者承诺投资本金不受损失或者承诺最低收益”；企业依法自主选择经营项目，开展经营活动；依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营活动。）</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">从业机构经营场所</span>
                            <span class="span-r">北京朝阳区光华路甲8号和乔大厦B座503-508</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">分支机构经营场所</span>
                            <span class="span-r">暂无分支机构</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">注册协议范本</span>
                            <span class="span-r"><router-link class="orange" target="_blank" to="/protocol/login">点击查看</router-link></span>
                        </p>
                    </div>
                    <!--basic end-->

                    <!--basic start-->
                    <h2 class="content-title ">网站信息</h2>
                    <div class="basic website clearfix">
                        <p class="basic-p">
                            <span class="span-l">平台地址</span>
                            <span class="span-r">https://www.jingubank.com/</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">平台名称</span>
                            <span class="span-r">金谷财行</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">平台上线时间</span>
                            <span class="span-r">2016年7月</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">电信业务许可证</span>
                            <span class="span-r">京B2-20170901</span>
                        </p>
                        <p class="basic-p">
                            <span class="span-l">ICP备案号</span>
                            <span class="span-r">京ICP备16007841号-5</span>
                        </p>
                        <!-- <p class="basic-p">
                            <span class="span-l">资金存管</span>
                            <span class="span-r">厦门国际银行</span>
                        </p> -->
                        <p class="basic-p">
                            <span class="span-l">联系方式</span>
                            <span class="span-r">客服热线    400-770-6678（9:00-21:00） <br/>QQ客服     3461949153（9:00-18:00）</span>
                        </p>

                        <div class="w-client">
                            <div class="layer-img fl"><img src="/static/images/company/app.png"/></div>
                            <div class="layer-img fl"><img src="/static/images/company/subscribe.png"/></div>
                            <div class="layer-img fl"><img src="/static/images/company/service.png"/></div>
                            <div>
                                <div class="w-words fl">APP客户端下载</div>
                                <div class="w-words fl">关注订阅号</div>
                                <div class="w-words fl">关注服务号</div>
                            </div>
                        </div>

                    </div>
                    <!--basic end-->

                    <!--basic start-->
                    <h2 class="content-title ">重大事项信息</h2>
                    <p class="li-pt38">合并、分立、解散或者申请破产：无</p>
                    <p class="li-pt38">从业机构受到刑事处罚、重大行政处罚 ：无</p>
                    <p class="li-pt38">从业机构受到重大诉讼或者重大仲裁事项：无</p>
                    <p class="li-pt38">董事长、总经理因犯罪被判处刑事处罚：无</p>
                    <p class="li-pt38">实际控制人与持股 5%以上的股东、董事、监事、高级管理人员的变更信息：无</p>
                    <p class="li-pt38">实际控制人与持股 5%以上的股东、董事、监事、高级管理人员涉及的重大诉讼或者仲裁事项： 无</p>
                    <!--basic end-->

                    <!--framework start-->
                    <h2 class="content-title ">组织架构</h2>
                    <div class="framework"></div>
                    <!--framework end-->

                    <!--structure start-->
                    <h2 class="content-title ">股东结构</h2>
                    <table class="structure fl">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>股东名称</th>
                                <th>股东类型</th>
                                <th>认缴额</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>马颖</td>
                                <td>自然人股东</td>
                                <td>6000万</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>北京金谷兴业科技有限公司</td>
                                <td>法人股东</td>
                                <td>14000万</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--structure end-->

                    <!--team start-->
                    <!--
                    <h2 class="content-title ">团队介绍</h2>

                    <div class="team">
                        <div class="team-img fl"></div>
                        <div class="words fr">
                            <div class="words-h">张卫昌<span>董事长兼CEO</span></div>
                            <p class="words-p">董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO</p>
                        </div>
                    </div>

                    <div class="team">
                        <div class="team-img fl"></div>
                        <div class="words fr">
                            <div class="words-h">张卫昌<span>董事长兼CEO</span></div>
                            <p class="words-p">董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO</p>
                        </div>
                    </div>

                    <div class="team">
                        <div class="team-img fl"></div>
                        <div class="words fr">
                            <div class="words-h">张卫昌<span>董事长兼CEO</span></div>
                            <p class="words-p">董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO董事长兼CEO</p>
                        </div>
                    </div>
                    -->
                    <!--team end-->

                    <h2 class="content-title ">公司证照</h2>
                    <div class="licence">
                        <div class="licence-l fl"></div>
                        <div class="licence-r fl">
                            <div class="licence-rt"></div>
                            <div class="licence-rb"></div>
                        </div>
                    </div>

                </div>
                <!--information end-->
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'

    export default {
        name: 'borrowrecord',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company'
            }
        },
        metaInfo: {
            title: '公司介绍-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行公司介绍'
            }]
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/company.scss';
</style>
