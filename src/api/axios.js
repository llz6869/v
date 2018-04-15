require('es6-promise').polyfill()
import axios from 'axios'
import qs from 'qs'
import md5 from '../assets/js/md5.js'
import cookie from '../assets/js/cookie.js'

const myConfig = require('../../config/index').config

// import Router from 'vue-router'
// import Login from '../components/login/Login'
// axios 配置
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 测试地址
axios.defaults.baseURL = myConfig.BASE_URL

// POST传参序列化
axios.interceptors.request.use((config) => {
  config.data.clientType = '1'
  config.data.timestampApp = Date.parse(new Date())
  config.data.version = '1.0'
  config.data.tokenId = cookie.getCookie('tokenId')
  config.data.sign = md5(config.data.clientType + '&' + myConfig.SIGN + '&' + config.data.version + '&' + config.data.timestampApp)
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  // 丢失tokenId,跳转登录
  if (error && error.response && error.response.status === 401) {
      cookie.delCookie('tokenId')
    location.href = '/login'
  }
  // if (error && error.response) {
  //   switch (error.response.status) {
  //     case 400:
  //       location.href = '/404'
  //       error.message = '请求错误'
  //       break
  //
  //     case 401:
  //       location.href = '/login'
  //       error.message = '未授权，请登录'
  //       break
  //
  //     case 403:
  //       location.href = '/login'
  //       error.message = '拒绝访问'
  //       break
  //
  //     case 404:
  //       location.href = '/404'
  //       error.message = `请求地址出错: ${error.response.config.url}`
  //       break
  //
  //     case 408:
  //       location.href = '/404'
  //       error.message = '请求超时'
  //       break
  //
  //     case 500:
  //       location.href = '/500'
  //       error.message = '服务器内部错误'
  //       break
  //
  //     case 501:
  //       location.href = '/500'
  //       error.message = '服务未实现'
  //       break
  //
  //     case 502:
  //       location.href = '/500'
  //       error.message = '网关错误'
  //       break
  //
  //     case 503:
  //       location.href = '/500'
  //       error.message = '服务不可用'
  //       break
  //
  //     case 504:
  //       location.href = '/500'
  //       error.message = '网关超时'
  //       break
  //
  //     case 505:
  //       location.href = '/500'
  //       error.message = 'HTTP版本不受支持'
  //       break
  //
  //     default:
  //   }
  // }
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  // 首页
  index (params) {
    return fetch('/api/web/index', params)
  },
  // 登录
  login (params) {
    return fetch('/api/web/member/userLogin', params)
  },

  // 产品列表
  borrowList (params) {
    return fetch('/api/web/product/list', params)
  },

  // 获取用户的资金记录
  getFoundRecords (params) {
    return fetch('/api/web/member/getFundRecords', params)
  },

  // 获取用户资金信息
  getUserAccount (params) {
    return fetch('/api/web/account/getMyAccountData', params)
  },

  // 修改密码
  modifyPass (params) {
    return fetch('/api/web/member/modifyPass', params)
  },

  // 用户提现
  accountWithdraw (params) {
    return fetch('/api/web/account/accountWithdraw', params)
  },

  // 网关充值
  gateWayRecharge (params) {
    return fetch('/api/web/account/gateWayRecharge', params)
  },

  // 用户充值
  accountRecharge (params) {
    return fetch('/api/web/account/accountRecharge', params)
  },

  // 安全设置
  securitySetting (params) {
    return fetch('/api/web/member/securitySetting', params)
  },

  // 解绑前校验银行卡是否可以解绑
  checkCardIsNoUnBind (params) {
    return fetch('/api/web/account/checkCardIsNoUnBind', params)
  },

  // 我的消息列表
  getMyLetter (params) {
    return fetch('/api/web/letter/list', params)
  },
  // 我的消息列表
  readLetters (params) {
    return fetch('/api/web/letter/readLetters', params)
  },

  // 个人开户
  cardapply (params) {
    return fetch('/api/web/member/cardapply', params)
  },

  // 出借记录
  borrowRecordList (params) {
    return fetch('/api/web/account/listInvestmentRecord', params)
  },

  // 出借人持有标的还款记录
  receiptPlanList (params) {
    return fetch('/api/web/account/receiptPlanData', params)
  },

  // 借款记录
  lendRecordList (params) {
    return fetch('/api/web/repayment/list', params)
  },

  // 借款人待还款详情
  repayDetail (params) {
      return fetch('/api/web/repayment/repayDetail', params)
  },

  // 借款人还款
  repay (params) {
    return fetch('/api/web/repayment/repay', params)
  },
  /**
   * 获取银行发送短信验证码
   */
  smsBankApply (params) {
    return fetch('/api/web/account/smsBankApply', params)
  },
  /**
   * 获取验证码
   */
  getPhoneCode (params) {
    return fetch('/api/web/member/getPhoneCode', params)
  },
  /**
   * 获取验证码
   */
  getPhoneCodeByLogin (params) {
    return fetch('/api/web/member/getPhoneCodeByLogin', params)
  },

  // 用户注册
  register (params) {
    return fetch('/api/web/member/userRegister', params)
  },
    // 检查手机号是否已注册
  isRegister (params) {
    return fetch('/api/web/member/isRegister', params)
  },

  // 验证验证码
  validateCode (params) {
    return fetch('/api/web/member/validatePhonecode', params)
  },

  // 重置密码
  resetPass (params) {
    return fetch('/api/web/member/resetPass', params)
  },

  // 获取平台公告详情
  getNoticeInfo (params) {
    return fetch('/api/web/notice/getNoticeById', params)
  },

  // 精品专区列表信息
  chosenList (params) {
    return fetch('/api/web/product/chosenList', params)
  },

  // 标的详情
  borrowDetails (params) {
    return fetch('/api/web/product/details', params)
  },

  // 获取用户余额
  getUserInfo (params) {
    return fetch('/api/web/account/getUserInfo', params)
  },

  // 平台公告
  queryNotices (params) {
    return fetch('/api/web/notice/queryNotices', params)
  },

  // 风险教育列表
  safeEducationList (params) {
    return fetch('/api/web/category/queryCategorys', params)
  },

  // 获取新闻列表
  queryCateGorys (params) {
    return fetch('/api/web/category/queryCategorys', params)
  },

  // 获取新闻详情
  getArticleInfo (params) {
    return fetch('/api/web/category/getArticleById', params)
  },

  // 企业开户
  enterpriseApply (params) {
    return fetch('/api/web/member/enterpriseApply', params)
  },

  // 企业绑卡
  enterpriseBind (params) {
    return fetch('/api/web/member/enterpriseBind', params)
  },

  // 获取银行列表
  getBankInfo (params) {
    return fetch('/api/web/member/getBankInfo', params)
  },

  // 个人绑卡申请
  bindCardApply (params) {
    return fetch('/api/web/member/bindCardApply', params)
  },

  // 个人绑卡确认
  bindCardConf (params) {
    return fetch('/api/web/member/bindCardConf', params)
  },

  // 解绑银行卡
  unBindCard (params) {
    return fetch('/api/web/account/unBindCard', params)
  },

  // 获取抵用券
  getCoupons (params) {
    return fetch('/api/web/jlbContract/getCoupons', params)
  },

  // 我的福利
  welfare (params) {
    return fetch('/api/web/jlbContract/getCoupons', params)
  },

  // 获取抵用券数量
  getCouponCountByType (params) {
    return fetch('/api/web/jlbContract/selectCouponsCount', params)
  },

  // 个人开户申请(由银行发验证码)
  accountApply (params) {
    return fetch('/api/web/member/cardapply', params)
  },

  // 个人开户确认
  openAccount (params) {
    return fetch('/api/web/member/cardconf', params)
  },
    // 个人开户及绑卡确认时防篡改校验
   validData (params) {
    return fetch('/api/web/member/validData', params)
    },
  // 出借
  investDo (params) {
    return fetch('/api/web/product/investDo', params)
  },

  // 我的邀请
  getUserInviteList (params) {
    return fetch('/api/web/member/getUserInviteList', params)
  },

  // 福利活动
  getActivityBannerList (params) {
    return fetch('/api/web/statictis/getActivityBannerResource', params)
  },

  // 风险测评--评测结果
  getMyAppraisal (params) {
    return fetch('/api/web/riskAppraisal/myAppraisal', params)
  },

  // 风险测评--问题列表
  getRaisalList (params) {
    return fetch('/api/web/riskAppraisal/riskAppraisalList', params)
  },

  // 风险测评--保存评测结果
  getSaveRaisaled (params) {
    return fetch('/api/web/riskAppraisal/saveAppraisalRecord', params)
  },

  // 产品详细信息-基本信息
  getDetailsOfBase (params) {
    return fetch('/api/web/product/productDetail', params)
  },

  // 产品详细信息-出借记录/还款计划
  getProductDetails (params) {
    return fetch('/api/web/product/details', params)
  },

  // 根据投标金额获取利息
  getInterestByAmount (params) {
    return fetch('/api/web/product/getInterest', params)
  },

  // 判断用户状态，参数名称为type：1-是否开户，2-是否绑卡，3-是否设置手势密码
  validateUserStatus (params) {
    return fetch('/api/web/member/validateUserStatus', params)
  },
  // 借款申请
  loanApply (params) {
    return fetch('/api/web/member/loanApply', params)
  },
  // 获取借款申请详情
    getLoanApply (params) {
    return fetch('/api/web/member/getLoanApply', params)
  },
    // 注册送618大礼包
    activeReg (params) {
    return fetch('/api/web/product/active618', params)
  },
    // 渠道码
    getCpsListByChannel (params) {
    return fetch('/api/web/cps/getCpsListByChannel', params)
  }
}
