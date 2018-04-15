<template>
    <div class="erorr-layer">
        <div class="erorr404">
            <div class="container">
                <div class="content">
                    <h3>很抱歉，您访问的页面不小心迷路了~~</h3>
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
