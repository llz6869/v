<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">公司荣誉</div>

            <div class="content">
                <div class="homor clearfix">
                    <ul class="clearfix">
                        <li>
                            <div class="l1-img"></div>
                            <p>2017互联网金融年度影响力企业</p>
                        </li>

                        <li>
                            <div class="r1-img"></div>
                            <p>中国互联网金融最佳风控安全奖</p>
                        </li>
                    </ul>

                    <ul class="clearfix">
                        <li>
                            <div class="l2-img"></div>
                            <p>中国最具创新价值金融科技企业</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside'
     export default {
        name: 'notices',
        components:{
            'my-aside': ComponyAside
        },
        data(){
            return {
                navType: 'company'
            }
        },
         metaInfo: {
             title: '公益荣誉-金谷财行',
             meta: [{
                 name: 'keyWords',
                 content: '金谷财行公司荣誉'
             }]
         }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>
