<template>
  <div class="content">
    <ul>
      <li class="subject">
        <span>项目名称</span>
        <span>借款利率</span>
        <span>项目期限</span>
        <span>项目规模</span>
        <span>进度</span>
        <span>操作</span>
      </li>
    </ul>
    <ul v-if="list && list.length" class="project-list">
      <li
        v-for="(item, id) in list"
        :key="id"
        class="clearfix">
        <div class="name fl"><router-link :to="'/borrow/detail/'+item.id">{{ item.name }}</router-link><span v-if="item.type == 1 " class="novice">新手</span></div>
        <div class="rate fl">
          <!--<div class="l-rate">{{ item.annualYield | numberFormatter }}<span>%</span></div>-->
            <div class="l-rate">{{item.annualYield | numberFormatter}}%<span v-if="item.floatingRate != 0 ">+{{item.floatingRate | numberFormatter}}%</span></div>
        </div>
        <div class="term fl">{{ item.term }}{{ item.termUnit }}</div>
        <div class="scale fl">{{ item.amount | fmoney }}元</div>
        <div class="schedule fl">
          <div class="strip">
            <div class="percent">
              <div class="bar fl">
                <div class="bar-orange" :style="'width: '+item.investSchedule+'%'"></div>
              </div>{{ item.investSchedule | numberFormatter }}%
            </div>
            <div class="surplus">剩余{{ item.surplusAmount | fmoney }}元</div>
          </div>
        </div>
        <div class="operate fl">
          <router-link
            v-if="(item.status==6 || item.status==7) && item.isPreheat !='1'"
            :to="'/borrow/detail/'+item.id"
            class="operate-btn">立即出借</router-link>
          <a
            href="javascript:;"
            v-else-if="item.status==8 || item.status==9"
            class="operate-btn disabled">募集完成</a>
          <a
            href="javascript:;"
            v-else-if="item.status==10"
            class="operate-btn disabled">还款中</a>
          <a
            href="javascript:;"
            v-else-if="item.status==11"
            class="operate-btn disabled">已结束</a>
          <a
            href="javascript:;"
            v-else-if="item.isPreheat=='1'"
            class="operate-btn disabled">即将上线</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: [
    'list'
  ]
}
</script>
