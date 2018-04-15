<template>
    <div class="physical-pc">
        <div><img src="/static/images/activities/physicalExamination/banner.jpg" alt=""></div>
        <div><img src="/static/images/activities/physicalExamination/content2.jpg" alt=""></div>
        <div class="phy-context">
            <img class="phy-img" src="/static/images/activities/physicalExamination/content.jpg" alt="">
            <router-link class="phy-btnpc-reg w381" to="/register">立即注册</router-link>
        </div>
        <div class="physical-city">
          <button class="phy-btnpc-reg" @click="showCity">体检套餐覆盖城市详情</button>
        </div>
        <div class="wrod">
            <div class="content">
                <p>
                    注意事项：<br>
                    1、此活动为金谷财行与善诊共同举办，父母关爱系列体检人年龄为50周岁以上，年轻人套餐也可享受抵扣优惠；<br>
                    2、体检套餐覆盖全国101个城市，爱康国宾、美年大健康等专业体检机构及三甲医院300多家；<br>
                    3、成功注册后，一个工作日内由专人与您联系沟通预约体检套餐事宜，请保持手机畅通；<br>
                    4、完成注册用户预约截止日期为2018年1月31日，体检截止日期为2018年2月28日；<br>
                    5、每个手机号限领两份关爱父母孝心体检套餐；<br>
                    6、善诊客服：400-6762-960（7:30-20:00）；<br>
                    7、健康体检套餐使用规则归善诊所有。
                </p>
                <p class="cdcd3bc">
                    合作机构介绍：<br>
                    善诊—中国领先的互联网健康服务平台。总部位于上海，目前服务覆盖全国 200 多个城市、1500 多家三甲医院及品牌体检中心；与公立三甲医院、各科室 3000 多名主治医生长期合作，在线解答健康问题。专业提供企业团检、个人体检；致力于为父母预约就近体检，提供「似子女在侧」的健康医养服务。
                </p>
            </div>
        </div>
        <modal-box :show.sync="modalShow" :title="modalText">
          <div slot="context" class="submit-box">
            <div class="city-box">
              <table class="city-list" cellpadding="0" cellspacing="0" >
                <caption>孝心套餐所覆盖城市机构</caption>
                <thead>
                  <tr>
                    <th>省份</th><th>城市</th><th>省份</th>
                    <th>城市</th><th>省份</th><th>城市</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>北京市</td><td>北京（6区26家机构）</td>
                    <td rowspan="3">河北</td><td>石家庄市</td>
                    <td rowspan="2">江西</td><td>赣州市</td>
                  </tr>
                  <tr>
                    <td>上海市</td><td>上海（9区23家机构）</td>
                    <td>唐山市</td>
                    <td>南昌市</td>
                  </tr>
                  <tr>
                    <td>重庆市</td><td>重庆（5区7家机构）</td>
                    <td>邢台市</td>
                    <td rowspan="7">辽宁</td><td>鞍山市</td>
                  </tr>
                  <tr>
                    <td>天津市</td><td>天津（6区11家机构）</td>
                    <td rowspan="10">河南</td><td>安阳市</td>
                    <td>朝阳市</td>
                  </tr>
                  <tr>
                    <td rowspan="5">安徽</td><td>蚌埠市</td>
                    <td>济源市</td>
                    <td>大连市</td>
                  </tr>
                  <tr>
                    <td>亳州市</td>
                    <td>开封市</td>
                    <td>丹东市</td>
                  </tr>
                  <tr>
                    <td>合肥市</td>
                    <td>洛阳市</td>
                    <td>锦州市</td>
                  </tr>
                  <tr>
                    <td>六安市</td>
                    <td>南阳市</td>
                    <td>沈阳市</td>
                  </tr>
                  <tr>
                    <td>芜湖市</td>
                    <td>平顶山市</td>
                    <td>营口市</td>
                  </tr>
                  <tr>
                    <td rowspan="2">福建</td><td>福州市</td>
                    <td>濮阳市</td>
                    <td rowspan="11">山东</td><td>菏泽市</td>
                  </tr>
                  <tr>
                    <td>厦门市</td>
                    <td>许昌市</td>
                    <td>济南市</td>
                  </tr>
                  <tr>
                    <td>甘肃</td><td>兰州市</td>
                    <td>郑州市</td>
                    <td>济宁市</td>
                  </tr>
                  <tr>
                    <td rowspan="5">广州</td><td>东莞市</td>
                    <td>周口市</td>
                    <td>临沂市</td>
                  </tr>
                  <tr>
                    <td>佛山市</td>
                    <td>黑龙江</td><td>哈尔滨市</td>
                    <td>青岛市</td>
                  </tr>
                  <tr>
                    <td>广州市</td>
                    <td rowspan="3">湖北</td><td>黄石市</td>
                    <td>日照市</td>
                  </tr>
                  <tr>
                    <td>深圳市</td>
                    <td>武汉市</td>
                    <td>泰安市</td>
                  </tr>
                  <tr>
                    <td>珠海市</td>
                    <td>襄阳市</td>
                    <td>威海市</td>
                  </tr>
                  <tr>
                    <td rowspan="4">广西</td><td>桂林市</td>
                    <td rowspan="11">江苏</td><td>常熟市</td>
                    <td>潍坊市</td>
                  </tr>
                  <tr>
                    <td>柳州市</td>
                    <td>江阴市</td>
                    <td>烟台市</td>
                  </tr>
                  <tr>
                    <td>南宁市</td>
                    <td>昆山市</td>
                    <td>枣庄市</td>
                  </tr>
                  <tr>
                    <td>北海市</td>
                    <td>常州市</td>
                    <td rowspan="4">山西</td><td>晋城市</td>
                  </tr>
                  <tr>
                    <td>贵州</td><td>贵阳市</td>
                    <td>南京市</td>
                    <td>吕梁市</td>
                  </tr>
                  <tr>
                    <td rowspan="2">内蒙古</td><td>包头市</td>
                    <td>南通市</td>
                    <td>太原市</td>
                  </tr>
                  <tr>
                    <td>呼和浩特市</td>
                    <td>苏州市</td>
                    <td>运城市</td>
                  </tr>
                  <tr>
                    <td>宁夏</td><td>银川市</td>
                    <td>泰州市</td>
                    <td rowspan="3">陕西</td><td>西安市</td>
                  </tr>
                  <tr>
                    <td rowspan="2">新疆</td><td>哈密市</td>
                    <td>无锡市</td>
                    <td>咸阳市</td>
                  </tr>
                  <tr>
                    <td>乌鲁木齐市</td>
                    <td>徐州市</td>
                    <td>榆林市</td>
                  </tr>
                  <tr>
                    <td rowspan="4">吉林</td><td>吉林市</td>
                    <td>扬州市</td>
                    <td rowspan="2">四川</td><td>成都市</td>
                  </tr>
                  <tr>
                    <td>松原市</td>
                    <td rowspan="5">浙江</td><td>杭州市</td>
                    <td>乐山市</td>
                  </tr>
                  <tr>
                    <td>延边朝鲜自治州</td>
                    <td>宁波市</td>
                    <td rowspan="2">海南</td><td>澄迈县</td>
                  </tr>
                  <tr>
                    <td>长春市</td>
                    <td>嘉兴市</td>
                    <td>海口市</td>
                  </tr>
                  <tr>
                    <td rowspan="2">云南</td><td>昆明市</td>
                    <td>金华市</td>
                    <td rowspan="2">湖南</td><td>长沙市</td>
                  </tr>
                  <tr>
                    <td>大理白族自治州</td>
                    <td>衢州市</td>
                    <td>湘潭市</td>
                  </tr>
                  <tr><td colspan="6">—— 注：具体城市以预约系统为准 ——</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div slot="button"></div>
        </modal-box>
        <div class="physical-qrcode">
          <div class="phy-qrcode" v-if="isLogin">
            <qrcode-vue :value="qrCode.value" :size="qrCode.size" level="H"></qrcode-vue>
            <div>扫码分享活动</div>
          </div>
          <router-link class="phy-qrcode phy-login" to="/login" v-else>立即登录<br>分享好友</router-link>
        </div>
    </div>
</template>

<script>
import ModalBox from '../public/ModalBox'
import QRCodeVue from 'qrcode.vue';
export default {
  components: {
      'modal-box': ModalBox, 'qrcode-vue': QRCodeVue
  },
  data () {
    return {
      modalShow: false,
      modalText: '城市机构',
      isLogin: false,
      qrCode: {
        value: ''
        // size: 131
      }
    }
  },
  mounted () {
    this.isLogin = !!this.$cookie.getCookie('tokenId');
    if(this.isLogin){
      let inviteCode = JSON.parse(this.$cookie.getCookie("user")).inviteCode;
      this.qrCode.value = window.location.protocol + '//' + window.location.host + '/static/H5/physicalexamination.html?v=1&referrerId=' + inviteCode;
    }
  },
  methods: {
    showCity() {
      this.modalShow = true;
    }
  },
  metaInfo: {
    title: '免费领470元父母体检套餐',
    meta: [{
        name: 'description',
        content: '限量1000份，先到先抢'
      }
    ]
  }
}
</script>

<style lang="scss">
    .physical-pc{
      min-width: 1200px;background-color: #fff;
      div{
        // width:  100%;
        img{display: block;width: 100%;height: 100%;}
      }
      .phy-context{
        width: 970px;margin: 70px auto;padding: 60px 65px 70px;text-align: center;border-radius: 10px;box-shadow: 0 0 40px 10px #f1f1f1;
        .phy-img{margin:0 auto;width: 969px;height: 432px;}
      }
      .phy-btnpc-reg{display: block;height: 77px;margin: 60px auto 0;padding: 0 130px;font-size: 30px;text-align: center;color: #fff;line-height: 77px;background-color: #b8a678;border-radius: 10px;box-shadow: 5px 5px 0px 1px #94855d;
        &.w381{width: 120px;}
      }
      .wrod{
          background-color: #b8a678;
          .content{ 
              position: relative;
              width: 1100px; padding: 50px 0 100px; margin: 0 auto; font-size: 18px; line-height: 36px; color: #fff; text-align: left;
              .cdcd3bc{ color: #dcd3bc; padding-top: 50px;}
          }
      }

      /* 漂浮二维码 */
      .physical-qrcode{
        position: fixed;top: 20%;right: 10%;width: 131px;height: 149px;padding: 1px;border: 1px solid #b8a678;background-color: #fff;border-radius: 10px;z-index: 5;
        .phy-qrcode{
          display: block;padding: 12px 13px;text-align: center;background-color: #b8a678;border-radius: 10px;color: #fff;font-size: inherit;
          img{display: block;width: 100%;margin-bottom: 3px; }
          &.phy-login{height: 100px;padding: 39px 13px 10px;font-size: 24px;}
        }
      }

      /* 城市按钮 */
      .physical-city{margin-bottom: 80px;}

      /* 城市列表 */
      .city-box{margin: 30px 0;max-height: 340px;overflow-y: auto;}
      .city-list{
        width: 100%;border-radius: 10px;
        caption{padding: 12px 0 14px;background-color: #b8a678;color: #fff;font-size: 30px;}
        thead{background-color: #dbd2bb;}
        thead th{padding: 12px 0 14px;text-align: center;color: #745849;font-weight: normal;border: 1px solid #b8a678;}
        tbody{color: #745849;}
        tbody td{padding: 12px 0 14px;border: 1px solid #b8a678;text-align: center;font-size: 20px; }
        tbody tr:last-child{background-color: #dbd2bb;}
        tbody tr:last-child td{border: 1px solid #dbd2bb;}
      }
      .modal-box{width: 975px;margin: -400px 0 0 -487.5px;}
      @media only screen and (max-height: 768px) {
        .modal-container{max-height: 400px !important;overflow-y: auto;}
      }
    }
</style>
