<template>
    <!--index start-->
    <div class="index">
        <!--back-to-top start-->
        <back-to-top></back-to-top>
        <!--back-to-top end-->

        <!--slide-show start-->
        <slide-show :slides="slides"></slide-show>
        <!--slide-show end-->

        <!--notice start-->
        <div class="notice">
            <div class="container">
                <!--title start-->
                <div class="title">
                    <!--message-box  start-->
                    <div class="message-box">
                        <span class="fl">最新公告：</span>
                        <!--
                        <transition-group name="fade" mode="out-in">
                            <div v-for="notice in noticesList" :key="notice.title">
                                <a :href="'/company/notice/details/'+notice.id">
                                    <span class="m-content fl">{{text}}</span>
                                    <span class="m-time fl">{{notice.createDate|dateFormat("yyyy-MM-dd")}}</span>
                                </a>
                            </div>
                        </transition-group>
                        -->
                        <roll-notice :notices="noticesList"></roll-notice>
                    </div>
                    <!--message-box end-->
                    <router-link to="/company/notice" class="more fr">更多</router-link>
                </div>
                <!--title end-->
            </div>
        </div>
        <!--notice end-->

        <!-- superiority start -->
        <ul class="superiority">
            <div class="container">
                <div class="content">

                    <router-link to="/special/capital">
                        <li class="capital">
                            <span class="super-icon"></span>
                            <p class="item1">银行存管</p>
                            <p class="item2">为用户资金安全保驾护航</p>
                        </li>
                    </router-link>

                    <router-link to="/special/cfca">
                        <li class="cfca">
                            <span class="super-icon"></span>
                            <p class="item1">中国金融认证中心</p>
                            <p class="item2">确保电子合同真实完整性</p>
                        </li>
                    </router-link>

                    <router-link to="/special/assets">
                        <li class="assets">
                            <span class="super-icon"></span>
                            <p class="item1">资产优质</p>
                            <p class="item2">服务于云谷产业园入园企业</p>
                        </li>
                    </router-link>

                    <router-link to="/special/safe">
                        <li class="safe">
                            <span class="super-icon"></span>
                            <p class="item1">多重保障</p>
                            <p class="item2">多重权益保障与风控体系</p>
                        </li>
                    </router-link>

                </div>
            </div>
        </ul>
        <!-- superiority end -->

        <!--novice start-->
        <div class="novice clearfix" v-if="newProduct">
            <div class="container">

                <div class="m-title">新手专区<router-link to="/borrow" class="more fr">更多</router-link></div>

                <div class="content clearfix">

                    <!--n-activity start-->
                    <div  class="n-activity fl" v-if="novice.length > 0" :to="novice[0].eventUrl" >
                        <!-- <router-link to="/activities/activities618">
                        </router-link> -->
                        <a :href="novice[0].eventUrl">
                            <img :src="novice[0].img" >
                            <!-- <p>{{novice[0].bannerName}}</p> -->
                        </a>
                    </div>
                    <!--n-activity end-->

                    <!--n-product start-->
                    <div class="n-product fl" v-if="newProduct">
                        <div class="title">{{newProduct.name}}<span>在平台前3笔出借可投新手标，累计限额10万元</span></div>
                        <!--data start-->
                        <div class="data">
                            <div class="number-layer fl">
                                <!--number start-->
                                <div class="number">
                                    <!--<div class="profit fl">{{newProduct.annualYield | numberFormatter}}<span>%</span><span>+</span><span>{{newProduct.floatingRate | numberFormatter}}</span><span>%</span></div>-->
                                    <div class="profit fl">{{newProduct.annualYield | numberFormatter}}%<span v-show="floatingRate">+{{newProduct.floatingRate | numberFormatter}}%</span></div>
                                    <div class="day fl">{{newProduct.term}}<span>{{newProduct.termUnit}}</span></div>
                                    <div class="amount fl">{{newProduct.surplusAmount}}<span>元</span></div>
                                </div>
                                <!--number start-->
                                <!--attribute start-->
                                <div class="attribute">
                                    <span>借款利率</span>
                                    <span>项目期限</span>
                                    <span>剩余金额</span>
                                </div>
                                <!--attribute end-->
                            </div>
                            <router-link
                              v-if="(newProduct.status==6 || newProduct.status==7) && newProduct.isPreheat !='1'"
                              :to="'/borrow/detail/'+newProduct.id"
                              class="data-btn fl">立即出借</router-link>
                            <a
                              href="javascript:;"
                              v-else-if="newProduct.status==8 || newProduct.status==9"
                              class="data-btn fl disabled">募集完成</a>
                            <a
                              href="javascript:;"
                              v-else-if="newProduct.status==10"
                              class="data-btn fl disabled">还款中</a>
                            <a
                              href="javascript:;"
                              v-else-if="newProduct.status==11"
                              class="data-btn fl disabled">已结束</a>
                            <a
                              href="javascript:;"
                              v-else-if="newProduct.isPreheat=='1'"
                              class="data-btn fl disabled">即将上线</a>
                        </div>
                        <!--data end-->
                    </div>
                    <!--n-product end-->
                </div>
            </div>
        </div>
        <!--novice end-->

        <!--activity start-->
        <div class="novice clearfix" v-if="activityList.length">
            <div class="container">
                <div class="m-title">活动专区</div>
                <div class="content clearfix">
                    <!--n-activity start-->
                    <div class="n-activity n-padding fl" v-for="item in activityList" :to="item.eventUrl" :key="item.bannerName" >
                        <a :href="item.eventUrl">
                            <img :src="item.img" >
                            <!-- <p>{{item.bannerName}}</p> -->
                        </a>
                    </div>
                    <!--n-activity end-->
                </div>
            </div>
        </div>
        <!--activity end-->

        <!--list start-->
        <div class="product-list">
            <div class="container">
                <div class="m-title">
                    精选专区
                    <router-link to="/borrow" class="more fr">更多</router-link>
                </div>
                <!--ProductList start-->
                <product-list :list="productList"></product-list>
                <!--ProductList end-->
            </div>
        </div>
        <!--list end-->

        <!--media start-->
        <div class="media">
            <div class="container">
                <div class="content">
                    <!--report start-->
                    <div class="report fl">
                        <!--re_tab start-->
                        <ul id="re_tab">
                            <li v-for="(item,index) in tabConList" :key="item.title" :class="{fli: index === tabConIndex}" @click="tabConIndex=index" >{{item.title}}</li>
                        </ul>
                        <!--re_tab end-->

                        <!--tab_con start-->
                        <div id="tab_con">
                            <!--fdiv start-->
                            <index-tab-con v-for="(item,index) in tabConList" :key="index" :list="item.list" :linkTo="item.linkTo" v-show="(index === tabConIndex)"></index-tab-con>
                        </div>
                        <!--tab_con end-->
                    </div>
                    <!--report end-->


                    <!--ranking start-->
                    <div class="ranking fl">
                        <!--r-top start-->
                        <div class="r-top">
                            出借牛人榜
                            <ul>
                                <li :class="{current: rankIndex==0}" @click="rankIndex=0">本周</li>
                                <li :class="{current: rankIndex==1}" @click="rankIndex=1">本月</li>
                            </ul>
                        </div>
                        <!--r-top end-->

                        <!--r-content start-->
                        <div class="r-content">
                            <ul>
                                <li class="gray">
                                    <span class="ranking">排名</span>
                                    <span class="lender">出借人</span>
                                    <span class="number">出借金额（元）</span>
                                </li>
                            </ul>

                            <ul v-show="rankIndex==0">
                                <li v-for="(item,index) in sumAmount.weekSumAmount" :key="index">
                                    <span class="ranking"><span class="ranking-bg">{{index+1}}</span></span>
                                    <span class="lender">{{item.name}}</span>
                                    <span class="number orange">{{item.amount}}</span>
                                </li>
                            </ul>

                            <ul v-show="rankIndex==1">
                                <li v-for="(item,index) in sumAmount.monthSumAmount" :key="index">
                                    <span class="ranking"><span class="ranking-bg">{{index+1}}</span></span>
                                    <span class="lender">{{item.name}}</span>
                                    <span class="number orange">{{item.amount}}</span>
                                </li>

                            </ul>
                        </div>
                        <!--r-content end-->

                    </div>
                    <!--ranking end-->
                </div>
            </div>
        </div>
        <!--media end-->

        <!--honor start-->
        <div class="container">
            <div class="m-title">公司荣誉</div>

            <div class="honor">
                <big-img v-for="(item,index) in honor" :key="index" :src="item.src" class="honor-img"></big-img>
                <ul>
                    <li>2017互联网金融年度影响力企业</li>
                    <li>中国互联网金融最佳风控安全奖</li>
                    <li>中国最具创新价值金融科技企业</li>
                    <li>中国互联网金融创新奖</li>
                </ul>
            </div>

        </div>
        <!--honor end-->

        <!--scroll-top-down start-->
        <!-- <scroll-top-down></scroll-top-down> -->
        <!--scroll-top-down end-->

        <!--partner start-->
        <div class="partner">
            <div class="container">
                <div class="m-title">合作伙伴</div>
                <router-link to="/company/partners" class="content"></router-link>
            </div>
        </div>
        <!--partner end-->

        <!-- 第一次登陆判断是否留在新网站 start -->
        <modal-box :show.sync="openShow" :title="openText">
            <div slot="context">
                <p class="text-left">尊敬的用户：</p>
                <p class="text-left">您好！您已登录金谷财行新版网站，如需进入旧版本，可点击以下提示按钮进入。</p>
            </div>
            <div slot="button">
                <button class="btn ok" @click="closeOpenShow">留在新版本</button>
                <a href="http://vip.jingubank.com" @click="closeOpenShow" target="_blank" class="btn hollow">进入旧版本</a>
            </div>
        </modal-box>
        <!-- 第一次登陆判断是否留在新网站 end -->

        <!-- 判断是否开户 start -->
        <modal-box :show.sync="goStay" :title="openText">
            <div slot="context">
                <h3 class="h3">金谷财行开启银行资金存管</h3>
                <p class="text">交易资金由银行全程存管</p>
            </div>
            <div slot="button">
                <button class="btn ok" @click="openButton">立即开启</button>
            </div>
        </modal-box>
        <!-- 判断是否开户 end -->

    </div>
    <!--index end-->

</template>

<script>
    import SlideShow from './index/SlideShow'
    import BackToTop from './index/BackToTop'
    import IndexTabCon from './index/IndexTabCon'
    import RollNotice from './index/RollNotice'
    import ProductList from './public/ProductList'
    import BigImg from './public/BigImg'
    import ModalBox from './public/ModalBox'

    export default {
        metaInfo: {
            title: '金谷财行-专业的产业链金融平台_金谷财行官网',
            meta: [{
                name: 'keyWords',
                content: '金谷财行官网,产业链金融,互联网理财,资产管理业务平台'
            }]
        },
        components: {
            'slide-show': SlideShow,
            'back-to-top': BackToTop,
            'product-list': ProductList,
            'index-tab-con': IndexTabCon,
            'big-img': BigImg,
            'modal-box': ModalBox,
            'roll-notice': RollNotice
        },

        data () {
            return {
                isRollNotice: true,
                isbackToTop: true,
                isMaskShowClose: true,
                isMaskBlankClose: true,
                slides: [],
                honor: [{src: '/static/images/index/h-internet.png'}, {src: '/static/images/index/h-finance.jpg'}, {src: '/static/images/index/h-pwc.jpg'}, {src: '/static/images/index/h-icp.jpg'}], // 公司荣誉
                rankIndex: 0,  // 排行榜下标
                productList:[], //普通标
                newProduct:{}, //新手标
                novice:[],//新手专区图片
                activityList:[], //活动专区图片
                noticesList:[], //公告列表
                categoryQuerys:[],
                linkTo:"/company/media",
                tabConIndex: 0,
                floatingRate: '', // 浮动利率
                tabConList: [
                    {title: '媒体报道', list: [], linkTo: '/company/media'},
                    {title: '风险教育', list: [], linkTo: '/company/education'}
                ],
                sumAmount:{
                    weekSumAmount:[],
                    monthSumAmount:[]
                },
                text:'',
                scrollId:'',
                addtime:'',
                userType: null,
                openShow: false, // 判断是否留在新版本
                goStay: false,  // 判断是否开户
                openText: '提示信息', // 开户标题
                checkAccount: null //未开户--checkAccount是否开户1-开户0-未开户
            }
        },

        mounted(){
            let tempDate = new Date();
            if(!this.$cookie.getCookie('today')) {
                this.$cookie.setCookie('today', tempDate.format('yyyy-MM-dd'), 60*60*24);
                this.$cookie.setCookie('todayShow', 1, 60*60*24);
            }
            // this.init();
            this.getIndex();

            // 登录后相关
            if(this.$cookie.getCookie("user")){
                this.congratulateShow = false; // 登录后不显示热烈庆祝

                let user = JSON.parse(this.$cookie.getCookie("user"));

                // 判断用户类型 判断个人还是企业
                this.$api.getUserInfo({}).then(res => {
                    if(res.code == 100){
                        this.userType = res.data.type;
                    }
                });

                //  判断新老用户是否留在新版本
                if(!user.isNewUser){
                    let temp2 = new Date();
                    let todayCookie = this.$cookie.getCookie('today');
                    let todayShow = parseInt(this.$cookie.getCookie('todayShow'));
                    if(this.compareDay(todayCookie, temp2.format('yyyy-MM-dd')) == 0 && todayShow > 1){
                        this.openShow = false;
                    } else {
                        this.openShow = true;
                        this.$cookie.setCookie('todayShow', 2);
                        return
                    }
                }

                //  判断是否开户// 未开户--webAccount是否开户,1已开户、2未开户、3验证中
                this.$api.validateUserStatus({type: null}).then(res => {
                    if(res.code === 100){
                        if(res.data.webAccount == "2"){
                            this.checkAccount = res.data.webAccount
                            this.goStay = true;
                        }
                    }
                });
            }
        },
        methods:{
            compareDay(a,b){//a , b 格式为 yyyy-MM-dd
                var a1 = a.split("-");
                var b1 = b.split("-");
                var d1 = new Date(a1[0],a1[1],a1[2]);
                var d2 = new Date(b1[0],b1[1],b1[2]);
                if (Date.parse(d1) - Date.parse(d2) > 0) {
                    // 开始日期大于结束日期
                    return -1;
                }
                if (Date.parse(d1) - Date.parse(d2) == 0) {
                    // 开始日期等于结束日期
                    return 0;
                }
                if (Date.parse(d1) - Date.parse(d2) > 0) {
                    // 开始日期小于结束日期
                    return 1;
                }
            },
            closeOpenShow(){
                this.openShow = false;
            },
            openButton(){
                if (this.userType == '1') { //个人开户页面
                    this.$router.push('/borrow/openaccount');
                } else if (this.userType == '2') { //企业开户页面
                    this.$router.push('/lend/openenterprise');
                }
            },
            init: function () { // 在线客服
                // let script = document.createElement('script')
                // script.setAttribute('type', 'text/javascript')
                // script.setAttribute('src', '//www.sobot.com/chat/frame/js/entrance.js?sysNum=bc476ec3aac745dea021b987a535b4e7')
                // script.setAttribute('class', 'service')
                // script.setAttribute('id', 'zhichiScript')
                // script.setAttribute('data-args', 'uname=小智&age=2&partnerId=')
                // script.setAttribute('charset', 'utf-8')
                // document.getElementsByClassName('service')[0].appendChild(script)
            },
            getIndex(callback){
                this.$api.index({}).then(res => {
                    if (res.code == 100) {
                        if(res.data.banners && res.data.banners.length){
                            this.slides = res.data.banners;
                        }
                        this.newProduct = res.data.newProduct;
                        if(this.newProduct){
                            this.floatingRate = res.data.newProduct.floatingRate
                        }
                        this.productList = res.data.products;
                        if(res.data.notices && res.data.notices.length){
                            this.noticesList = res.data.notices;
                        }
                        if(res.data.activitys && res.data.activitys.length){
                            this.activityList = res.data.activitys;
                        }
                        if(res.data.novice && res.data.novice.length){
                            this.novice=res.data.novice;
                        }
                        if(res.data.newsList && res.data.newsList.length){
                            this.tabConList[0].list = res.data.newsList
                        }
                        if(res.data.eduCationList && res.data.eduCationList.length){
                            this.tabConList[1].list = res.data.eduCationList
                        }
                        this.sumAmount.weekSumAmount = res.data.weekSumAmount;
                        this.sumAmount.monthSumAmount = res.data.monthSumAmount;
                    }
                });
            },
            getTabConList(){
                // 风险教育列表
                this.$api.queryCateGorys({pageNum: 1, pageSize: 6,module: 'index.risk.education.id'})
                    .then(res => {
                        if (res.code == 100) {
                            if(res.data.list && res.data.list[0] && res.data.list[0].articleList) {
                                this.tabConList[0].list = res.data.list[0].articleList
                            }
                        }
                    })
            },

            backToTop(){ // 返回顶部
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            }
        },

        //  监听未开户时是否弹框
        watch:{
            openShow: function(val){
                if(!val && this.checkAccount == "0"){
                    this.goStay = true;
                }
            },
            checkAccount: function(val){
                if(val == "0" && !this.openShow){
                    this.goStay = true;
                }
            }
        }


        //消息公告
        // watch: {
        //     noticesList: function(newVal) {
        //         if (this.scrollId) {
        //             clearInterval(this.scrollId);
        //         }
        //         let index = 0;

        //         if (newVal && newVal.length) {
        //             this.text = newVal[index].title;
        //             this.addtime = newVal[index].addtime;
        //             index++;
        //             const length = newVal.length;
        //             this.scrollId = setInterval(() => {
        //                 let currentIndex = (index++) % length;
        //                 this.text = newVal[currentIndex].title;
        //                 this.addtime = newVal[currentIndex].addtime;
        //             }, 3000);
        //         }
        //         else {
        //             this.text = '';
        //             this.addtime = '';
        //         }
        //     }
        // }
    }
</script>
<style lang="scss">
    @import '../assets/css/index.scss';
</style>
