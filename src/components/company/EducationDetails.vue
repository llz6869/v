<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="return-title">
                <router-link  :to="'/company/education'" class="btn">返回</router-link>
                <h3 v-html="edution.title"></h3>
                <div class="inform">
                    <div>发布时间：<span>{{edution.createDate| dateFormat('yyyy-MM-dd')}}</span></div>
                    <div>作者：<span v-html="edution.copyfrom"></span></div>
                </div>
            </div>
            <div class="content">
                <div class="details clearfix">　
                    <div v-html="datas"></div>
                </div>
            </div>

            <div class="neighbor">
                <router-link :to="'/company/education/details/'+ edution.previous.id" v-if="edution.previous">
                    上一篇&nbsp;<span v-html="edution.previous.title"></span>
                </router-link>
                <router-link :to="'/company/education/details/'+ edution.next.id" v-if="edution.next">
                    下一篇&nbsp;<span v-html="edution.next.title"></span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
    export default {
        name: 'educationdetails',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company',
                edution:'',
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
                        this.edution = res.data;
                        this.datas =this.edution.content;
                    }
                })
            }
        },
        metaInfo(){
            return {
                title: this.edution.title+'-金谷财行',
                meta: [{
                    name: 'keyWords',
                    content: this.edution.keywords
                }]
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
