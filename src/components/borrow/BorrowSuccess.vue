<template>
  <!-- 出借成功 start -->
  <div class="container">
    <div class="borrow-success">
      <div class="succ-icon"></div>
      <h2 class="h2">恭喜您，出借成功！</h2>
        <!--<p class="borrow-succ-desc" v-show="msg" >{{msg}}，请到我的账户————<a href="/account/welfare">我的福利</a>中查看</p>-->
        <p class="borrow-succ-desc" v-show="msg" v-html="msg"></p>
      <router-link to="/account/borrowrecord" class="btn btn-default">查看出借记录</router-link>
      <router-link to="/borrow" class="btn">继续出借</router-link>
    </div>
  </div>
  <!-- 出借成功 end -->
</template>
<script>
export default {
    data(){
      return {
          msg: '',
          couponName:'',
          conponType: '',
          conpenCount: ''
      }
    },
    mounted(){
      if(this.$route.params.desc){
          this.msg = this.$route.params.desc.message;
          this.couponName = this.$route.params.desc.couponName;
          this.conponType = this.$route.params.desc.couponType;
          this.conpenCount = this.$route.params.desc.count;
      }
    },
    metaInfo: {
        title: '出借成功-金谷财行',
        meta: [{
            name: 'keyWords',
            content: '出借成功'
        }]
    }
}
</script>

<style lang="scss">
  @import '../../assets/css/borrow.scss';
</style>

