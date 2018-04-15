/* 登录注册 start */
import LoginProtocol from './LoginProtocol'
import BorrowProtocol from './BorrowProtocol'
import RiskTipProtocol from './RiskTipProtocol'
import CommitmentLetter from './CommitmentLetter'
var protocolRouter = [
  {
    path: '/protocol/login',  // 登录协议
    name: 'protocol',
    component: LoginProtocol,
    meta: {
      title: '注册协议'
    }
  },
  {
    path: '/protocol/borrow',  // 平台居间服务协议
    name: 'protocolborrow',
    component: BorrowProtocol,
    meta: {
      title: '平台居间服务协议'
    }
  },
  {
    path: '/protocol/risktip',  // 网络借贷风险提示书
    name: 'protocolrisktip',
    component: RiskTipProtocol,
    meta: {
      title: '网络借贷风险提示书'
    }
  },
  {
    path: '/protocol/commitmentletter',  // 出借资金来源合法承诺书
    name: 'protocolcommitmentletter',
    component: CommitmentLetter,
    meta: {
      title: '出借资金来源合法承诺书'
    }
  }
]
/* 登录注册 end */

export { protocolRouter }
