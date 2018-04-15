import Vue from 'vue'
import Router from 'vue-router'
/* 首页路由 start */
import Index from '../components/Index'
import Aside from '../components/public/Aside'
import LoginHeader from '../components/public/LoginHeader'
import PublicHeader from '../components/public/PublicHeader'
import accountRouter from '../components/account/accountRouter'
import helpRouter from '../components/help/helpRouter'
import companyRouter from '../components/company/companyRouter'
import loginRouter from '../components/login/loginRouter'
import cookie from '../assets/js/cookie.js'

import { ActivitiesRouter } from '../components/activities/ActivitiesRouter'
import { borrowRouter } from '../components/borrow/borrowRouter'
import { guideRouter } from '../components/guide/guideRouter'
import { lendRouter } from '../components/lend/lendRouter'
import { specialRouter } from '../components/special/specialRouter'
import { protocolRouter } from '../components/Protocol/protocolRouter'
import { channelRouter } from '../components/channel/channelRouter'

let tempRouter = [
  { path: '/', name: 'index', component: Index },
  { path: '/account', component: Aside, children: accountRouter.concat(helpRouter, companyRouter) }
]
tempRouter = tempRouter.concat(ActivitiesRouter, borrowRouter, guideRouter, lendRouter, specialRouter, protocolRouter, channelRouter)
let routes = [
  {
    path: '/',
    component: PublicHeader,
    meta: {
      title: 'home'
    },
    children: tempRouter
  },
  {
    path: '/login',
    component: LoginHeader,
    children: loginRouter
  },
  {
    path: '*',
    redirect: '/404'
  }
]
/* 首页路由 end */

Vue.use(Router)

let router = new Router({
    hashbang: false,
    mode: 'history',
    history: true,
    routes,
    scrollBehavior: function (to, from, savePosition) {
        return {x: 0, y: 0}
    }
})

//登录拦截
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (cookie.getCookie('tokenId')) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;
