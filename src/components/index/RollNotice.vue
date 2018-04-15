<template>
  <div class="show-notice">
    <div class="notice-list" :style="{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}">
      <a v-for="notice in notices" :href="'/company/notice/details/'+notice.id" :key="notice.createDate">
          <span class="m-content fl">{{notice.title}}</span>
          <span class="m-time fl">{{notice.createDate|dateFormat("yyyy-MM-dd")}}</span>
      </a>
    </div>
  </div>
</template>

<script>
import rAF from '../../../src/assets/js/rAF.js'
export default {
  name: 'RollNotice',
  props: [
    'notices'
  ],
  data () {
    return {
      noticePosition: 0 // 列表位置
    }
  },
  mounted () {
    let destination = 50
    setInterval(() => {
      if (destination / 50 < this.notices.length) {
        this.move(destination, 500)
        destination += 50
      } else { // 列表到底
        this.noticePosition = 0 // 设置列表为开始位置
        destination = 50
        this.move(destination, 500)
        destination += 50
      }
    }, 2500)
  },
  methods: {
    move (destination, duration) { // 实现滚动动画
      let speed = ((destination - this.noticePosition) * 1000) / (duration * 60)
      let count = 0
      let step = () => {
        this.noticePosition += speed
        count++
        rAF(() => {
          if (this.noticePosition < destination) {
            step()
          } else {
            this.noticePosition = destination
          }
        })
      }
      step()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $notice-height: 50px;
  .show-notice{
    height: $notice-height;
    overflow: hidden;
    vertical-align: middle;
    .notice-list p{
      margin: 0;
      height: $notice-height;
      line-height: $notice-height;
    }
  }
</style>
