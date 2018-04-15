/* 我要借款 start */
import Lend from './Lend'
import EnterpriLend from './EnterpriLend'
import OpenEnterprise from './OpenEnterprise'
import SuccessFailure from './SuccessFailure'
var lendRouter = [
  {
    path: '/lend',  // 借款
    name: 'lend',
    component: Lend,
    meta: {
      title: 'lend'
    }
  },
  {
    path: '/lend/enterprilend',  // 企业借款
    name: 'enterprilend',
    component: EnterpriLend,
    meta: {
      title: 'enterprilend'
    }
  },
  {
    path: '/lend/openenterprise',  // 企业开户
    name: 'openenterprise',
    component: OpenEnterprise,
    meta: {
      title: 'openenterprise'
    }
  },
  {
    path: '/lend/successfailure',  // 企业开户成功或失败
    name: 'successfailure',
    component: SuccessFailure,
    meta: {
      title: 'successfailure'
    }
  }
]
/* 我要借款 end */

export {lendRouter}
