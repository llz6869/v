<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">媒体报道</div>
            <div class="content">
                <div class="media-coverage clearfix"  v-for="(item,index) in list" v-bind:key="item.id">
                    <router-link :to="'/company/media/details/'+ item.id" class="media-img fl"><img :src="item.image"></router-link>
                    <div class="media-words fl" >
                        <router-link :to="'/company/media/details/'+ item.id" v-html="item.title"></router-link>
                        <p v-html="item.description"></p>
                        <span v-html="item.copyfrom"></span>&nbsp;<span>{{item.createDate | dateFormat('yyyy.MM.dd')}}</span>
                    </div>
                </div>
                <!--Pages start-->
                <pages v-show="!noDataShow" :display="pagesObj.display" :total="pagesObj.total" :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
                <!--Pages end-->
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
    import Pages from '../public/Pages'
    export default {
        name: 'mediaCoverage',
        components:{
            'my-aside': ComponyAside, 'pages': Pages
        },
        data(){
            return {
                list: [],
                navType: 'company',
                module:'index.news.id',
                noDataShow: true,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                }
            }
        },
        mounted(){
            this.getList();
        },
        methods: {

            getList(currentPage) {
                this.$api.queryCateGorys({pageNum: currentPage || this.pagesObj.currentPage , pageSize: this.pagesObj.display, module:this.module})
                    .then(res => {
                        if (res.code == 100) {
                            this.noDataShow=false
                            this.pagesObj.total = res.data.total
                            if(res.data.list && res.data.list && res.data.list[0]) {
                                this.list = res.data.list
                            }
                        } else {

                        }
                    })
            },
            pagechange(currentPage){
                this.getList(currentPage)
            }
        },
        metaInfo: {
            title: '家庭理财规划方案_家庭理财小窍门_家庭理财怎么做-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '家庭理财规划方案,家庭理财小窍门,家庭理财怎么做'
            }]
        }


    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
