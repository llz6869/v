<!-- 我是项目列表页 -->
<template>
  <div class="container">
    <div class="box-bgc">
      <choose :chooseArray="projectDeadline" :chooseTitle="chooseDeadline" :status.sync="deadlineStatus" ></choose>
      <choose :chooseArray="projectStatusList" :chooseTitle="chooseStatus" :status.sync="proStatus" ></choose>
      <!-- <choose :chooseArray="projectTypeList" :chooseTitle="chooseType" :status.sync="proTypeStatus" ></choose> -->
    </div>
    <div class="product-list">
      <!--ProductList start-->
      <product-list :list="list"></product-list>
      <p class="list-nodata" v-show="!list.length">暂无数据</p>
      <!--ProductList end-->
    </div>
    <!--pagination-wrapper start-->
    <pages v-show="list.length" :display="pagesObj.display" :total="pagesObj.total" :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
    <!--pagination-wrapper end-->
  </div>
</template>
<script>
  import ProductList from '../public/ProductList'
  import Choose from '../public/Choose'
  import Pages from '../public/Pages'
  const sitConfig = require('../../../config/index.js').config

  export default {
    name: 'borrow',
    components:{
      'choose': Choose, 'product-list': ProductList, 'pages': Pages
    },
    data(){
      return {
        projectStatusList: sitConfig.projectStatusList,
        projectTypeList: sitConfig.projectTypeList,
        projectDeadline: sitConfig.projectDeadline,
        chooseDeadline: '项目期限',
        deadlineStatus: -1, // 项目期限状态
        chooseStatus: '项目状态',
        proStatus: -1, // 项目状态
        chooseType: '项目类型',
        proTypeStatus: -1, // 项目状态
        list: [],
        pagesObj: {
          total: 0,
          currentPage: 1,
          display: 10
        }
      }
    },
    mounted(){
        this.getList(1);
    },
    methods: {
      getList(currentPage, stauts, typeStatus) {
        this.$api.borrowList({isHomeShow: false, pageNum: currentPage, pageSize: this.pagesObj.display, status: stauts || this.proStatus, productType: typeStatus || this.deadlineStatus})
          .then(res => {
            if(res.code == 100){
              if(res.data.list && res.data.list.length){
                this.list = res.data.list;
                this.pagesObj.total = res.data.total;
              }else{
                this.list = []
              }
            }
        })
      },
      pagechange(currentPage){
        this.getList(currentPage, this.proStatus, this.deadlineStatus);
      }
    },
    watch: {
      // deadlineStatus: function(newVal){
      //   this.pagesObj.currentPage = 1
      //   this.getList(this.pagesObj.currentPage, newVal)
      // },
      proStatus: function(newVal){
        this.pagesObj.currentPage = 1
        this.getList(this.pagesObj.currentPage, newVal, this.deadlineStatus)
      },
      deadlineStatus: function(newVal){
        this.pagesObj.currentPage = 1
        this.getList(this.pagesObj.currentPage, this.proStatus, newVal)
      }
    },
    metaInfo: {
        title: '我要出借_互联网理财_投资理财-金谷财行',
        meta: [{
            name: 'keyWords',
            content: '我要出借,互联网理财,投资理财'
        }]
    }
  }
</script>

