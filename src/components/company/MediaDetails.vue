<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="return-title">
                <router-link :to="'/company/media'" class="btn">返回</router-link>
                <h3 v-html="article.title" ></h3>
                <div class="inform">
                    <div>发布时间：<span>{{article.createDate | dateFormat('yyyy-MM-dd')}}</span></div>
                    <div>文章来源：<span v-html="article.copyfrom"></span></div>
                </div>
            </div>
            <div class="content">
                <div class="details clearfix">
                    <p v-html="datas"></p>
                </div>
            </div>
            <div class="neighbor">
                <router-link :to="'/company/education/details/'+ article.previous.id" v-if="article.previous">
                    上一篇&nbsp;<span v-html="article.previous.title"></span>
                </router-link>
                <router-link :to="'/company/education/details/'+ article.next.id" v-if="article.next">
                    下一篇&nbsp;<span v-html="article.next.title"></span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
    export default {
        name: 'mediaDetail',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company',
                article:'',
                datas :''
            }
        },
        watch:{
            '$route':'getInfo'
        },
        mounted(){
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$api.getArticleInfo({id:this.$route.params.id})
                .then(res => {
                    if (res.code == 100) {
                        this.article = res.data;
                        this.datas = this.article.content;
                    }
                })
            }
        },
        metaInfo(){
            return {
                title: this.article.title+'-金谷财行',
                meta: [{
                    name: 'keyWords',
                    content: this.article.keywords
                }]
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
