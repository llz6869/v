/* 提交专题 start */
import Capital from './Capital'
import Cfca from './CFCA'
import Assets from './Assets'
import Safe from './Safe'
var specialRouter = [
  {
    path: '/special/capital',  // 资金存管
    name: 'capital',
    component: Capital,
    meta: {
      title: 'capital'
    }
  },
  {
    path: '/special/cfca',  // cfca
    name: 'cfca',
    component: Cfca,
    meta: {
      title: 'cfca'
    }
  },
  {
    path: '/special/assets',  // 优质资产
    name: 'assets',
    component: Assets,
    meta: {
      title: 'assets'
    }
  },
  {
    path: '/special/safe',  // 安全保障
    name: 'safe',
    component: Safe,
    meta: {
      title: 'safe'
    }
  }
]
/* 提交专题 end */

export { specialRouter }
