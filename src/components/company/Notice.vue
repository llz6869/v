<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">平台公告</div>
            <div class="content">
                <ul class="notice">
                    <li v-for="(item,index) in list" v-bind:key="item.id"><router-link :to="'/company/notice/details/'+item.id" v-html="item.title"></router-link><span>{{item.createDate | dateFormat('yyyy-MM-dd')}}</span></li>
                </ul>
            </div>

            <!--pagination-wrapper start-->
            <pages v-show="!noDataShow" :display="pagesObj.display" :total="pagesObj.total" :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
            <!--pagination-wrapper end-->

        </div>


    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
    import Pages from '../public/Pages'

    export default {
        name: 'notices',
        components:{
            'my-aside': ComponyAside, 'pages': Pages
        },
        data(){
            return {
                list: [],
                navType: 'company',
                module:'index.notice.id',
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
            setCurrentPage(index){
                this.pagesObj.currentPage=1
                this.getList();
            },
            getList(currentPage) {
                this.$api.queryCateGorys({pageNum: currentPage || this.pagesObj.currentPage , pageSize: this.pagesObj.display,module:this.module})
                    .then(res => {
                        if (res.code == 100) {
                            this.noDataShow=false
                            this.pagesObj.total = res.data.total
                            if(res.data.list && res.data.list[0]) {
                                this.list = res.data.list
                            }
                        }
                    })
            },
            pagechange(currentPage){
                this.getList(currentPage)
            }
        },
        metaInfo: {
            title: '平台公告-金谷财行',
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
