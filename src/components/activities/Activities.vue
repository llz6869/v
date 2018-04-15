<template>
    <!--activities start-->
    <div class="activities container">
        <!--weal start-->
        <div class="weal m-auto">
            <!--title start-->
            <div class="title">热门活动<span class="orange-title">当前有{{list1.length}}个可参与活动</span></div>
            <!--title end-->

            <!--content start-->
            <div class="content clearfix">
                <!--special start-->
                <a :href="item.eventUrl" class="special fl" v-for="(item,key,index) in list1" :key="index">
                    <h3>{{item.bannerName}}</h3>
                    <p>活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}} 至 {{item.endDate| dateFormat('yyyy-MM-dd')}}</p>
                    <div class="picture"><img :src="item.img" /> </div>
                </a>
                <!--special end-->
            </div>
            <!--content end-->


            <!--title start-->
            <div class="title">往期活动</div>
            <!--title end-->

            <!--content start-->
            <div class="content clearfix">
                <!--special start-->
                <a v-for="(item,index) in list2" href="javascript:;" :key="item.bannerName"  class="special fl">
                    <h3>{{item.bannerName}}</h3>
                    <p>活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}} 至 {{item.endDate | dateFormat('yyyy-MM-dd')}}</p>
                    <div class="picture"><img :src="item.img" /> </div>
                </a>
                <!--special end-->

            </div>
            <!--pagination-wrapper start-->
            <Pages v-show="!noDataShow" :display="pagesObj.display" :total="pagesObj.total" :currentPage="pagesObj.currentPage" @pagechange="pagechange"></Pages>
            <!--pagination-wrapper end-->

            <!--content end-->
        </div>

        <!--weal end-->
    </div>
    <!--activities start-->
</template>

<script>
    import api from '../../api/axios.js'
    import Pages from '../public/Pages'

    export default {
        name: 'borrowrecord',
        components:{
            Pages
        },
        data(){
            return {
                list1: [],
                list2: [],
                noDataShow: true,
                pagesObj: {
                total: 0,
                    currentPage: 1,
                    display: 4
                }
            }
        },
        mounted(){
            this.getList(1);
            this.getList(0);
        },
        methods: {
            getList(hotActivity,currentPage) {
                api.getActivityBannerList({pageNum:  currentPage || this.pagesObj.currentPage , pageSize: this.pagesObj.display, hotActivity: hotActivity})
                    .then(res => {
                        if(res.code == 100 && hotActivity == 1){
                            this.list1 = res.data.list
                        }else if(res.code == 100 && hotActivity == 0){
                            this.noDataShow=false
                            this.pagesObj.total = res.data.total
                            this.list2 = res.data.list
                        }else{

                        }
                    })
            },
            pagechange(currentPage){
                this.getList(0,currentPage)
            }

        },
        metaInfo: {
            title: '福利活动-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '福利活动'
            }]
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/activities.scss';
</style>
