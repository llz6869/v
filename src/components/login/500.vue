<template>
    <div class="erorr-layer">
        <div class="erorr500">
            <div class="container">
                <div class="content">
                    <h3>很抱歉，您指定的页面无法访问了~~</h3>
                    <router-link to="/">返回金谷财行首页</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        metaInfo: {
            title: '页面没有找到',
            meta: [{
                name: 'keyWords',
                content: ''
            }]
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/login.scss';
</style>
