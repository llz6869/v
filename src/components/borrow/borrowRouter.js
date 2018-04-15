/* 我要出借 start */
import Borrow from './Borrow'
import BorrowDetail from './BorrowDetail'
import OpenAccount from './OpenAccount'
import BorrowSucc from './BorrowSuccess'
var borrowRouter = [
  {
    path: '/borrow',  // 出借
    name: 'borrow',
    component: Borrow
  },
  {
    path: '/borrow/detail/:id',  // 标的详情
    name: 'borrowDetail',
    component: BorrowDetail
  },
  {
    path: '/borrow/openaccount',  // 个人开户
    name: 'openaccount',
    component: OpenAccount,
    meta: {
      title: 'openaccount'
    }
  },
  {
    path: '/borrow/success',  // 标的详情
    name: 'borrowSuccess',
    component: BorrowSucc
  }
]
/* 我要出借 end */

export { borrowRouter }
