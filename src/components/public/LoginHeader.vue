<template>
  <div id="app">
    <!--h-login start-->
    <header class="h-login">
        <div class="container">
            <a class="logo fl" href="/"></a>
            <div class="hot-line">客服热线：400-770-6678</div>
        </div>
    </header>
    <!--h-login end-->
    <router-view></router-view>
    <!--f-login start-->
    <footer class="f-login">
        <div class="container">copyright@2017 北京金谷财行投资管理有限公司 京ICP备16007841号-5 市场有风险，决策需谨慎</div>
    </footer>
    <!--f-login end-->
  </div>
</template>

<style lang="scss">
  @import '../../assets/css/login.scss';
</style>


