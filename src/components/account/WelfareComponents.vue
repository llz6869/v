<template>
  <ul class="welfare-list-bd useing clearfix">
      <li v-for="(item,index) in list" v-bind:key="item.id" @click="setData(item, index)">
            <div class="welfare-top">
               <div class="tcl" v-if="item.couponType == 3">￥<span>{{item.couponAmount}}</span></div>
               <div class="tcl" v-else-if="item.couponType == 2"><span>{{item.couponAmount}}</span>%</div>
               <div class="tcc">{{item.couponType == 3 ? '现金抵用券' : '加息券'}}<div class="tcct" v-show="item.couponFrom"><span>{{item.couponFrom}}</span></div></div>
               <div class="tcr">未使用</div>
            </div>
            <div class="welfare-bottom">
                <div class="wb-h30">{{item.useRange}}</div>
                <div>{{item.useCondition}}</div>
                <div>{{item.beginTime | dateFormat('yyyy年MM月dd日') }}-{{item.endTime | dateFormat('yyyy年MM月dd日')}}</div>
            </div>
            <div class="welfare-checked" v-show="checkIndex == index"></div>
      </li>
  </ul>
</template>

<script>
export default {
  props: ['list'],
  data(){
    return {
      checkIndex: null // 选中的对象
    }
  },
  methods:{
    setData(data, index){
      this.checkIndex = index;
      this.$emit('welfareCallback', data);
    }
  }
}
</script>

<style lang="scss">
  .welfare-list-bd{
      height: 420px;overflow-y: auto;
    .welfare-top{
        @extend .m-auto;padding:19px;background-color:#bbb;color:$cf;clear:both;overflow:hidden;
        
        .tcl{
            float:left;font-size:20px;
            
            span{
                font-size:42px;
            }
        }
        .tcc{
            float:left;margin-left:20px;font-size:$px18;

            .tcct span{
                padding:0 5px;font-size:$px12;border:1px solid $cf;border-radius:5px;
            }
        }
        .tcr{float:right;}
    }
    .welfare-bottom{
        padding:13px 0;background:$cf url(/static/images/account/welfare-bg1.png) top left repeat-x;border:1px solid #eee;border-top:none;border-radius:0 0 10px 10px;
        
        div{padding:5px 19px;font-size:12px;line-height: 12px;color:$c6;}
        .wb-h30{min-height: 30px; }
    }
    li{
        position: relative;float:left;width:290px;margin:10px 0;border-radius:10px;overflow:hidden;
        
        .welfare-checked{position: absolute;bottom: 30px;right: 20px;width: 36px;height: 36px;background: #7fe188 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMA3kMU4sy+sDUnIQP68O/pjYFtZVpSEfHW09Kkn4V1cU4rCQgibs6LAAAAhUlEQVQY022QWQ6DMAxECYGEpWxtofvK3P+MDCBAxPHX85NGHjnwzf9RHX2+N0Dh8V0M4Cx9dqVvpf8poAylT0rgkkgfHoAonTB/v/LVt/S3bOYTYLpgZcR6CW/Lh2i2+JerGuMNwe4OFtPBmv7pVKyYsfS1WzKNME4j6+s7vfeh2irnbQP3XAroVtwfQQAAAABJRU5ErkJggg==) center center no-repeat;border-radius: 50%;}
        &:nth-child(2n){margin:10px 23px;}
    }
    &.useing{
        .welfare-top{background-color:#ff874e;}
        .welfare-bottom{background-image:url(/static/images/account/welfare-bg2.png);}
    }
}

@media only screen and (max-height: 768px) {
    .welfare-list-bd{
        height: auto;overflow-y: auto;
    }
}
</style>
