<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">风险教育</div>
            <div class="content">
                <div class="media-coverage clearfix"  v-for="(item,index) in list" v-bind:key="item.id">
                    <router-link :to="'/company/education/details/'+ item.id" class="media-img fl"><img :src="item.image"></router-link>
                    <div class="media-words fl" >
                        <router-link :to="'/company/education/details/'+ item.id" v-html="item.title"></router-link>
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
        name: 'eudcation',
        components:{
            'my-aside': ComponyAside, 'pages': Pages
        },
        data(){
            return {
                list: [],
                navType: 'company',
                module:'index.risk.education.id',
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
                this.$api.queryCateGorys({pageNum: currentPage || this.pagesObj.currentPage, pageSize: this.pagesObj.display,module:this.module})
                    .then(res => {
                        if (res.code == 100) {
                            this.noDataShow=false

                            if(res.data.list && res.data.list&& res.data.list[0]) {
                                this.pagesObj.total = res.data.total

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
            title: '投资理财基础知识_高收益投资理财知识_投资理财小窍门-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '投资理财基础知识,高收益投资理财知识,投资理财小窍门'
            }]
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
