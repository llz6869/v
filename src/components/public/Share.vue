<template>
  <div>
      <ul class="invite-share clearfix">
        <li>
            <div class="share-c3">
                <span class="share webchat"></span>微信
                <div class="invite-qrcode">
                    <qrcode-vue :value="qrCode.value" :size="qrCode.size" level="H"></qrcode-vue>
                    微信扫一扫
                </div>
            </div>
        </li>
        <li><a class="share-c3" :href="'https://service.weibo.com/share/share.php?appkey=&title=\''+title+'\'&url='+url+'&searchPic=\''+pics+'\'&style=simple'" target="_blank"><span class="share weibo"></span>微博</a></li>
        <li><a class="share-c3" :href="'https://connect.qq.com/widget/shareqq/index.html?url='+url+'&desc=\''+desc+'\'&title=\''+title+'\'&summary=\''+summary+'\'&pics=\''+pics+'\''" target="_blank"><span class="share qq"></span>QQ好友</a></li>
        <!-- <li><a class="share-c3" version="1.0" v-bind:href="qqZoneUrl" target="_blank"><span class="share qzone"></span>QQ空间</a></li> -->
        <li><a class="copy-that" href="javascript:;" @click="copyShow=true"><span class="share link"></span>复制链接给好友</a></li>
    </ul>
    <modal-box :show.sync="copyShow" :title="copyText">
        <div slot="context" class="copy-box">
            <span class="text-box">
                {{url}}
                <div v-show="copyResult">{{copyResult}}</div>
            </span>

        </div>
        <div slot="button">
            <button class="btn ok" @click="copyThat">点击复制</button>
        </div>
    </modal-box>
    <input type="text" style="height: 0;" ref="hdShare" v-model="url">
  </div>
</template>

<script>
import ModalBox from '../public/ModalBox'
const sitConfig = require('../../../config/index.js').config
import QRCodeVue from 'qrcode.vue';

export default {
  components: {
    'modal-box': ModalBox, 'qrcode-vue': QRCodeVue
  },
  data(){
    return {
        copyResult: '', //
        copyShow: false, //
        copyText: '分享链接给好友', //
        url: null,
        desc: null,
        summary: null,
        title: null,
        pics: null,
        qqZoneUrl : null,
        qrCode: {
            value: '',
            size: 150
        }
    }
  },
  mounted() {
    let user = JSON.parse(this.$cookie.getCookie("user"));
    let userId = user.inviteCode;
    this.url = sitConfig.SHARE_URL_PC + userId
    this.pics = '';// 'https://' + window.location.host + '/static/images/account/logo-02.png';
    this.desc = this.summary = this.title = '真情可“荐”，豪礼相赠！金谷财行注册即送618元大礼包，快来加入吧！'
    // this.qqZoneUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+this.url+'&to=pengyou&desc='+this.desc+'&summary='+this.summary+'&title='+this.title;
    this.qrCode.value = this.url;

  },
  watch:{
      copyShow: function (val) {
          if(val){
              this.copyResult = null;
          }
      }
  },
  methods: {
    copyThat(){
        this.$refs.hdShare.select();
        if(document.execCommand('copy', false, null)) {
            //success info  成功了放些提示
            this.copyResult = '复制成功'
        } else{
            //fail info   失败了放些提示
            this.copyResult = '复制失败，请手动复制'
        }
    },
  }
}
</script>
<style lang="scss">
    .share-c3{
        position: relative;color: #333;cursor: pointer;
        .invite-qrcode{display: none;position: absolute;top: -205px;left: 30px;width:150px;height: 170px;padding: 10px;text-align: center;font-size: $px14; z-index: 2;background-color: #fff;border: 1px solid $c9;border-radius: 10px; }
        &:hover .invite-qrcode{display: block;}
    }
</style>
