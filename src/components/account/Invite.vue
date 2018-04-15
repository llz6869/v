<!-- 我的邀请 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录  -->
        <div class="account">
            <!-- <ul class="account-tabs">
                <li>我的邀请</li>
            </ul> -->

            <div class="half-title">我的邀请码：{{inviteCode}}</div>

            <div class="img-tc"><img src="/static/images/account/invite-bg1.jpg" alt=""></div>
            <div class="img-tc"><img src="/static/images/account/invite-bg2.jpg" alt=""></div>
            <div class="invite-tabs">分享方式</div>

            <share></share>
            <div class="invite-tabs clearfix">
                <div class="fl">邀请列表</div>
                <span class="fl">已邀请{{userCount}}人，{{noInvestCount}}人未出借</span></div>

            <!--invite start-->

            <table class="invite-tb">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>被邀请人手机号</th>
                        <th>注册时间</th>
                        <th>出借状态</th>
                    </tr>
                </thead>
                <tbody v-if="list && list.length > 0">
                    <tr v-for="(item,index) in list" v-bind:key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.registerTime | dateFormat('yyyy-MM-dd')}}</td>
                        <td>{{item.firstInvestmentStatus==0?"未出借":"已出借"}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4" class="td-no-data">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!--invite end-->

            <!-- 分页 -->
            <pages v-show="!noDataShow" :display="pagesObj.display" :total="pagesObj.total"
                       :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
        </div>

    </div>
</template>

<script>
    
    import AccountAside from '../public/Aside'
    import Pages from '../public/Pages'
    import ModalBox from '../public/ModalBox'
    import Share from '../public/Share'

    export default {
        metaInfo: {
            title: '我的邀请-个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行我的邀请'
            }]
        },
        name: 'borrowrecord',
        components: {
            'my-aside': AccountAside, 'modal-box': ModalBox, 'pages': Pages, 'share': Share
        },
        data () {
            return {
                navType: 'account',
                list: [],
                noInvestCount: 0,
                userCount: 0,
                userId: '',
                inviteCode: '',
                noDataShow: false,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                }
            }
        },
        mounted () {
            let user = JSON.parse(this.$cookie.getCookie("user"));
            this.userId = user.inviteUserId;
            this.inviteCode = user.inviteCode;
            this.getList(this.pagesObj.currentPage);

        },
        methods: {
            // init: function () {
            //     var imgPath =  'https://' + window.location.host + '/static/images/account/logo-02.png';
            //     let scriptVar = document.createElement('script')
            //     scriptVar.innerHTML = 'var jiathis_config={url:"'+config.SHARE_URL_PC+this.userId+'",summary:" ",title:"真情可“荐”，豪礼相赠！金谷财行注册即送618元大礼包，快来加入吧！",pic:"'+imgPath+'",shortUrl:true,hideMore:true}'
            //     document.getElementsByTagName('head')[0].appendChild(scriptVar)
            //     let url = 'http://v3.jiathis.com/code/jia.js'
            //     let script = document.createElement('script')
            //     script.setAttribute('src', url)
            //     document.getElementsByTagName('head')[0].appendChild(script)
            // },
            getList (currentPage) {
                this.$api.getUserInviteList({pageNum: currentPage, pageSize: this.pagesObj.display})
                    .then(res => {
                        if (res.code == 100 && res.data != null) {
                            this.noDataShow = false;
                            this.list = res.data.pageInfo.list
                            this.userCount = res.data.userCount
//                            this.userId = res.data.userId
                            this.noInvestCount = res.data.noInvestCount
                            if (res.data.pageInfo.total != 0) {
                                this.pagesObj.total = res.data.pageInfo.total;
                                this.pagesObj.currentPage = res.data.pageInfo.nextPage;
                            } else {
                                this.noDataShow = true;
                            }

                        } else {
                            this.noDataShow = true;
                        }
                    })
            },
            
            pagechange (currentPage, type) {
                this.getList(currentPage);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>
