<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="return-title">
                <router-link :to="'/company/notice'" class="btn">返回</router-link>
                <h3 v-html="notice.title" ></h3>
                <div class="inform">
                    <div>发布时间：<span>{{notice.createDate | dateFormat('yyyy-MM-dd')}}</span></div>
                    <div>文章来源：<span v-html="notice.copyfrom"></span></div>
                </div>
            </div>
            <div class="content">
                <div class="details clearfix">
                    <p v-html="notice.content"></p>
                    <p class="fr">金谷财行运营中心</p>
                    <p class="fr">{{notice.createDate | dateFormat('yyyy年MM月dd日')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'

    export default {
        name: 'noticeDetail',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                notice:'',
                navType: 'company'
            }
        },
        mounted(){
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$api.getArticleInfo({id:this.$route.params.id})
                    .then(res => {
                        if (res.code == 100) {
                            this.notice = res.data
                        } else {

                        }
                    })
            }
        },
        metaInfo(){
          return {
              title: this.notice.title+'-金谷财行',
              meta: [{
                  name: 'keyWords',
                  content: this.notice.keywords
              }]
          }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
