
// import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import '../src/assets/css/base.scss'
import axios from './api/axios'
import cookie from './assets/js/cookie'
import promise from 'es6-promise'
import filters from './filters/filters'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
promise.polyfill()


Vue.config.productionTip = false
Vue.prototype.$api = axios
Vue.prototype.$cookie = cookie


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  router,
  history: true, // html5模式 去掉锚点
  saveScrollPosition: false, // 记住页面的滚动位置 html5模式适用
  template: '<App/>',
  components: { App }
}).$mount('#app')
