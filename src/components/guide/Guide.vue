<template>
    <div class="guide">
        <div class="top"></div>
        <div class="understand">
            <div class="container clearfix">
                <div class="title">
                    <span></span>
                    <span>了解金谷财行</span>
                    <span></span>
                </div>
                <p>作为中国云谷科技集团（以下简称“中国云谷”）协作金融板块中专注于产业链金融的互联网金融平台，北京金谷财行投资管理有限公司注册资本2亿元，以中国云谷产业园区相关产业链上下游客户为中心，主要服务于三方资产端和财富端市场。金谷财行响应国家产业政策，为中国云谷旗下数十个特色产业园区的入园企业及其上下游供应商、分销商提供金融信息服务，旨在为其破解融资难、融资贵的问题，造福当地经济。</p>
                <p>中国云谷是特色产业小镇运营的领跑者，也是国内唯一以“特色产业”理念规划、开发、投资、建设、运营产业园区和产业小镇的集团公司。2016年获得中国小镇经济创新奖。其与洪泰基金共建的“洪泰云谷创新空间”享誉业内。各地云谷产业园区主要采取与政府合作运营模式，园区入园企业多为当地政府重点扶持企业。这些入园企业生产运营赖以维系的固定资产多集中于云谷产业园区，金谷财行正是为它们提供金融信息服务。企业正规、政策支持，为金谷财行打造了优质安全的资产基础。</p>
            </div>
        </div>

        <div class="advantage">
            <div class="container clearfix">
                <div class="title">
                    <span></span>
                    <span>金谷财行优势</span>
                    <span></span>
                </div>
                <div class="content"></div>
                <p>
                    <span>政府支持，项目可靠</span>
                    <span>客源稳定，市场广阔</span>
                    <span>园区保障，资产优质</span>
                    <span>多重保障，数据安全</span>
                </p>
            </div>
        </div>

        <div class="security">
            <div class="container clearfix">
                <div class="title">
                    <span></span>
                    <span>金谷财行为什么安全</span>
                    <span></span>
                </div>
                <p class="m-auto">金谷财行以“资金安全”为核心，坚持平台自律与合规发展。在具备ICP经营许可证的基础上，金谷财行已完成了银行资金存管系统建设，从而实现了用户资金安全的全方位保障。</p>
                <div class="content"></div>
            </div>
        </div>

        <div class="g-lend">
            <div class="container clearfix">

                <div class="title">
                    <span></span>
                    <span>如何出借</span>
                    <span></span>
                </div>
                <!-- content start -->
                <div class="content">
                    <div class="top"></div>
                    <div class="register" :class="{active: nowIndex==0}"></div>
                    <div class="open" :class="{active: nowIndex==1}"></div>
                    <div class="recharge" :class="{active: nowIndex==2}"></div>
                    <div class="lend" :class="{active: nowIndex==3}"></div>
                    <div class="payment" :class="{active: nowIndex==4}"></div>
                    <div class="carry" :class="{active: nowIndex==5}"></div>

                    <p class="p-title">
                        <span>注册</span>
                        <span>开户</span>
                        <span>充值</span>
                        <span>出借</span>
                        <span>回款</span>
                        <span>提现</span>
                    </p>

                    <div class="switch">
                        <button @click="prev" class="prev"></button>
                        <p class="s-title" v-for="(item, index) in wordsList" v-show="index == nowIndex" :key="index" :src="item.title" alt="">{{item.title}}</p>
                        <transition-group name="fade" mode="out-in" tag="div" class="content-hide">
                            <img class="s-img" v-for="(item, index) in imgList" v-show="index == nowIndex" :key="index" :src="item.src" alt="">
                        </transition-group>
                        <button @click="next" class="next"></button>
                    </div>
                </div>
                <!-- content end -->
            </div>
        </div>

        <div class="bottom">
            <h2>立即开启您在金谷财行的出借之旅</h2>
            <router-link to="register" class="btn m-auto">立即注册领抵现券</router-link>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            nowIndex: 0,
            imgList: [
                {src: '/static/images/guide/s-img1.png'},
                {src: '/static/images/guide/s-img2.png'},
                {src: '/static/images/guide/s-img3.png'},
                {src: '/static/images/guide/s-img4.png'},
                {src: '/static/images/guide/s-img5.png'},
                {src: '/static/images/guide/s-img6.png'}
            ],
            wordsList: [
                {title: "Step1：注册账号"},
                {title: "Step2：开立存管账户"},
                {title: "Step3：账户充值"},
                {title: "Step4：出借标的"},
                {title: "Step5：标的回款"},
                {title: "Step6：账户提现"}
            ]
        }
    },
    methods:{
        prev(){
            this.nowIndex--;
            if(this.nowIndex === -1){
                this.nowIndex = 5;
            }
        },
        next(){
            this.nowIndex++;
            if(this.nowIndex === 6){
                this.nowIndex = 0;
            }
        }
    },
    metaInfo: {
        title: '新手指南-金谷财行',
        meta: [{
            name: 'keyWords',
            content: '新手指南'
        }]
    }
}
</script>

<style lang="scss">
    @import '../../assets/css/guide.scss';
    @import '../../assets/css/guide-transition';
</style>
