<template>
    <!--enterpri-lend start-->
    <div class="enterpri-lend">
        <div class="top"></div>
        <!--enterpri-how start-->
        <div class="enterpri-how">
            <div class="t-layer">
                <div class="container">
                    <three-bar :title="CustodyHow"></three-bar>
                    <div class="content">
                        <div class="enterpr-content"></div>
                        <p>
                            <span>提交资料</span>
                            <span>开立账户</span>
                            <span>平台审核</span>
                            <span>签订协议</span>
                            <span>项目发布</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="container">
                <three-bar :title="CustodyMaterial"></three-bar>
                <p>温馨提示：请将借款申请资料发送至yangweida@jinguxingye.com邮箱</p>
                <p>1、借款申请书：包括公司简介、公司发展历程及最近经营情况介绍、借款原因、用途、金额、期限、担保方式、还款来源、企业及法人名下资产情况，如：房、车产或其他资产等；</p>
                <p>2、企业营业执照、税务登记证、组织机构代码证正副本复印件、贷款卡及密码；</p>
                <p>3、法定代表人及配偶的身份证复印件、户口本、婚姻证明；</p>
                <p>4、企业法人或实际控制人名下征信和企业征信；</p>
                <p>5、最近三年的年度财务报告（包括资产负债表、损益表、现金流量表及会计报表附注）和申请前三个月的财务月报表、以及纳税申报表及增殖税发票复印件、最近一年的银行账户流水；</p>
                <p>6、公司章程、最新版验资报告、股东名单、主要经营管理者的简历等；</p>
                <p>7、近1年的业务合同（如购销合同等）；</p>
                <p>8、股东会决议或董事会决议（当面签名）；</p>
                <p>9、抵（质）押品清单、产权证复印件和所有权人同意抵（质）押的书面证明；</p>
                <p class="p-bottom">10、实际办公场地证明材料，如：租赁合同、房产证等。</p>
                <!-- <button class="btn" @click="openEnterprise">立即申请</button> -->
            </div>
        </div>
        <!--enterpri-how end-->

        <!-- 借款弹框 start -->
        <modal-box :show.sync="showModal" :title="modalText">
            <div slot="context" class="enterprise-form-group">
                <div class="ep-form-group">
                    <span>企业名称：</span>
                    <input type="text" v-model="jgLoanRecord.enterpriseName">
                    <div class="error" v-show="errorNum==1">请输入企业名称</div>
                </div>
                <div class="ep-form-group">
                    <span>法人代表：</span>
                    <input type="text" v-model="jgLoanRecord.corporate">
                    <div class="error" v-show="errorNum==2">请输入法人代表</div>
                </div>
                <div class="ep-form-group">
                    <span>联系电话：</span>
                    <input type="text" v-model="jgLoanRecord.tel" maxlength="11">
                    <div class="error" v-show="errorNum==3">请输入正确格式的联系电话</div>
                </div>
                <div class="ep-form-group">
                    <span>联系邮箱：</span>
                    <input type="text" v-model="jgLoanRecord.email">
                    <div class="error" v-show="errorNum==4">请输入联系邮箱</div>
                </div>
                <div class="ep-form-group">
                    <span>借款额度：</span>
                    <input type="text" v-model="jgLoanRecord.loanAmount" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                    <div class="error" v-show="errorNum==5">请输入借款额度</div>
                </div>
                <div class="ep-form-group">
                    <span>借款期限：</span>
                    <div class="bankinfo-box enterprise">
                        <div @click="showSel">{{loanText}}</div>
                        <div class="arrow"></div>
                        <ul class="bankinfo-list" v-show="selShow" >
                            <li v-for="item in lendDate" :key="item.key" @click="setSelect(item)">{{item.value}}</li>
                        </ul>
                    </div>
                    <div class="error" v-show="errorNum==6">请选择借款期限</div>
                </div>
                <div class="ep-form-group">
                    <span>借款用途：</span>
                    <input type="text" v-model="jgLoanRecord.loanPurpose">
                    <div class="error" v-show="errorNum==7">请输入借款用途</div>
                </div>
            </div>
            <div slot="button">
                <button class="btn ok" @click="goLend">提交信息</button>
            </div>
        </modal-box>
        <!-- 借款弹框 end -->
    </div>
    <!--enterpri-lend end-->
</template>

<script>
import {getCookie} from '../../assets/js/cookie'
import ModalBox from '../public/ModalBox'
import ThreeBar from '../public/ThreeBar'
export default {
  components: {
      'modal-box': ModalBox,
      'three-bar': ThreeBar
  },
  data(){
    return {
        isOpen: false,
          showModal: false,
          errorNum: 0,
          modalText: '企业基本信息',
          jgLoanRecord:{
              enterpriseName: '', // 企业名称
              corporate: '', // 法人代表
              tel: '', // 联系电话
              email: '', // 邮箱
              loanAmount: null, // 借款额度
              loanTerm: -1 , // 借款期限
              loanPurpose: ''  // 借款用途
          },
          lendDate: [{key:1,value:"1个月"},{key:3,value:"3个月"},{key:6,value:"6个月"},{key:12,value:"12个月"}] , // 借款期限列表
          CustodyHow: '如何借款',
          CustodyMaterial: '借款需要提供材料',
        loanText:'请选择期限', // 选中期限
        selShow: false, // 显示期限列表
    }

  },
  methods:{
    openEnterprise() {
        if(!this.$cookie.getCookie('tokenId')) {
          this.$router.push('/login')
        }
        this.$api.validateUserStatus({type: 1})
        .then(res => {
            if(res.code == 100){
              if(res.data.webAccount == '2'){
                  this.$router.push('/lend/openenterprise')
              }else{
                  this.showModal = true;
              }
            }
        });
    },
    setSelect(item){
        this.jgLoanRecord.loanTerm = item.key;
        this.loanText = item.value;
        this.selShow = false;
    },
    goLend() {
        let mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(!this.jgLoanRecord.enterpriseName){
            this.errorNum = 1;
            return;
        }
        if (!this.jgLoanRecord.corporate) {
            this.errorNum = 2;
            return;
        }
        if (!/^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/.test(this.jgLoanRecord.tel)) {
            this.errorNum = 3;
            return;
        }
        if (!mail.test(this.jgLoanRecord.email)) {
            this.errorNum = 4;
            return;
        }
        if (!this.jgLoanRecord.loanAmount || this.jgLoanRecord.loanAmount <= 0) {
            this.errorNum = 5;
            return;
        }
        if (this.jgLoanRecord.loanTerm == -1) {
            this.errorNum = 6;
            return;
        }
        if (!this.jgLoanRecord.loanPurpose) {
            this.errorNum = 7;
            return;
        }
        this.$api.loanApply(jgLoanRecord).then(res => {
            if(res.code == 100){
            }else{
            }
        });
    },
    showSel(){
        this.selShow = true;
    }
  }
}
</script>


<style lang="scss">
    @import '../../assets/css/lend.scss'
</style>

