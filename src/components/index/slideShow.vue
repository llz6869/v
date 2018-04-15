//首页轮播图
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
      <LoginRrNot></LoginRrNot>
      <div class="slide-img" v-if="slides.length">
          <a :href="slides[nowIndex].eventUrl">
              <transition name="slide-trans"><img v-if="isShow" :src="slides[nowIndex].img"/></transition>
              <transition name="slide-trans-old"><img v-if="!isShow" :src="slides[nowIndex].img"/></transition>
          </a>
      </div>
      <ul class="slide-pages">
          <li v-for="(item, index) in slides" :key="item.id" @click="goto(index)"><a :class="{on: index === nowIndex}"></a></li>
      </ul>
  </div>
</template>

<script>
    import LoginRrNot from './LoginRrNot'
    export default {
        components: {
            LoginRrNot
        },
        props: {
            slides: {
              type: Array,
              default: []
            },
            inv: {
              type: Number,
              default: 2000
            }
        },
        data () {
            return {
              nowIndex: 0,
              isShow: true,
              loginBoxShow: false
            }
        },
        computed: {
            prevIndex () {
                if (this.nowIndex === 0) {
                    return this.slides.length - 1
                }
                else {
                    return this.nowIndex - 1
                }
            },
            nextIndex () {
                if (this.nowIndex === this.slides.length - 1) {
                    return 0
                }
                else {
                    return this.nowIndex + 1
                }
            }
        },
        methods: {
            goto (index) {
                this.isShow = false
                setTimeout(() => {
                    this.isShow = true
                    this.nowIndex = index
                }, 10)
            },
            runInv () {
                this.invId = setInterval(() => {
                    this.goto(this.nextIndex)
                }, this.inv)
            },
            clearInv () {
                clearInterval(this.invId)
            }
        }
    }
</script>

<style >
    .slide-show{position:relative;width:100%;height:360px;overflow:hidden;}
    .slide-img img {position: absolute;top: 0;width: 100%;height: 100%;}
    /*分页 start*/
    .slide-pages {z-index:999;width: 200px;position: absolute;left:50%; margin-left:-100px;bottom:20px;}
    .slide-pages li{
        float: left;}
    .slide-pages li a{display: inline-block;margin:0 10px;width:16px;height: 16px; border-radius: 16px;
        background: #a9a9ad;cursor: pointer;}
    .slide-pages li a.on {display: inline-block; color: deeppink;text-decoration: underline; width: 26px;height: 16px;border-radius: 10px;background: #fff;}
    /*分页end*/
</style>
