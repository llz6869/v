/* 登录注册 start */
import Login from './Login'
import Forget from './Modify'
import Register from './Register'
import LoanRegister from './LoanRegister'
import Erorr404 from './404'
import Erorr500 from './500'
var loginRouter = [
  {
    path: '/',  // 登录
    name: 'login',
    component: Login,
    meta: {
      title: 'login'
    }
  },
  // {
  //   path: '/login',  // 登录
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     title: 'login'
  //   }
  // },
  {
    path: '/forget',  // 忘记密码
    name: 'forget',
    component: Forget,
    meta: {
      title: 'forget'
    }
  },
  {
    path: '/register',  // 投资账户注册
    name: 'register',
    component: Register,
    meta: {
      title: 'lend'
    }
  },
  {
    path: '/loanRegister',  // 融资账户注册
    name: 'loanRegister',
    component: LoanRegister,
    meta: {
      title: 'loanRegister'
    }
  },
  {
    path: '/404',  // 404
    name: '404',
    component: Erorr404,
    meta: {
      title: '404'
    }
  },
  {
    path: '/500',  // 404
    name: '500',
    component: Erorr500,
    meta: {
      title: '500'
    }
  }
]
/* 登录注册 end */

export default loginRouter
