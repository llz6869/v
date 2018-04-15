<template>
  <div class="three-bar">
      <span></span>
      <span>{{title}}</span>
      <span></span>
  </div>
</template>
<style lang="scss">
    .three-bar{
        width: 100%;height: 42px; margin: 0 auto; padding: 60px 0;text-align: $ta-c;
        span:nth-of-type(1){display: $dib;width: 162px;height: 21px; background:url("/static/images/public/three-bar-left.png") no-repeat; }
        span:nth-of-type(2){padding: 0 34px; font-size: 42px; line-height: 42px; text-align: $ta-c;color: #f7b564;}
        span:nth-of-type(3){display: $dib;width: 162px;height: 21px; background:url("/static/images/public/three-bar-right.png") no-repeat;}
    }
</style>
<script>
    export default {
        props:[
            'title'
        ]
    }
</script>
