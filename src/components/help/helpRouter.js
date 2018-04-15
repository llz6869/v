/* 帮助中心 start */
import RegisterLand from './RegisterLand'
import OpenCard from './OpenCard'
import CashValue from './CashValue'
import LoanReturn from './LoanReturn'
var helpRouter = [
  {
    path: '/help/registerland',  // 注册与登陆
    name: 'registerland',
    component: RegisterLand,
    meta: {
      title: 'registerland'
    }
  },
  {
    path: '/help/opencard',  // 开户与绑卡
    name: 'opencard',
    component: OpenCard,
    meta: {
      title: 'opencard'
    }
  },
  {
    path: '/help/cashvalue',  // 充值与提现
    name: 'cashvalue',
    component: CashValue,
    meta: {
      title: 'cashvalue'
    }
  },
  {
    path: '/help/loanreturn',  // 出借与回款
    name: 'loanreturn',
    component: LoanReturn,
    meta: {
      title: 'loanreturn'
    }
  }
]
/* 帮助中心 end */

export default helpRouter
