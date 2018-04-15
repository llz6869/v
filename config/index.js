// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    config: {
      BASE_URL: 'https://api.jingubank.com/'
      // BASE_URL: 'http://172.16.67.11:8081/'
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8180,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  config: {
    "projectTypeList": [
      {
        "id": -1,
        "title": "全部"
      },
      {
        "id": 10,
        "title": "新手专享"
      },
      {
        "id": 6,
        "title": "金普惠1月"
      },
      {
        "id": 7,
        "title": "金普惠3月"
      },
      {
        "id": 8,
        "title": "金普惠6月"
      },
      {
        "id": 9,
        "title": "金普惠12月"
      }
    ],
    "projectStatusList": [
      {
        "id": -1,
        "title": "全部"
      },
      {
        "id": 1,
        "title": "投标中"
      },
      {
        "id": 2,
        "title": "已售罄"
      },
      {
        "id": 3,
        "title": "还款中"
      },
      {
        "id": 4,
        "title": "已结束"
      },
      {
        "id": 5,
        "title": "即将上线"
      }
    ],
    "userProjectStatusList": [
      {
        "id": -1,
        "title": "全部"
      },
      {
        "id": 0,
        "title": "募集中"
      },
      {
        "id": 1,
        "title": "还款中"
      },
      {
        "id": 2,
        "title": "已结束"
      }
    ],
    "repaymentPlanStatusList": [
      {
        "id": 3,
        "title": "筹款中"
      },
      {
        "id": 0,
        "title": "还款中"
      },
      {
        "id": 1,
        "title": "已结束"
      }
    ],
    "capitalTypeList": [
      {
        "id": -1,
        "title": "全部"
      },
      {
        "id": 1,
        "title": "充值"
      },
      {
        "id": 2,
        "title": "提现"
      },
      {
        "id": 3,
        "title": "出借"
      },
      {
        "id": 4,
        "title": "回款"
      },
      {
        "id": 5,
        "title": "奖励"
      },
      {
        "id": 10,
        "title": "还款"
      },
      {
        "id": 12,
        "title": "融资收入"
      }
    ],
    "star": [
      {
        "level": 1,
        "desc": "表示属高风险资产，适合进取型投资者"
      },
      {
        "level": 2,
        "desc": "表示属中高风险资产，适合成长型投资者"
      },
      {
        "level": 3,
        "desc": "表示属中风险资产，适合平衡型投资者"
      },
      {
        "level": 4,
        "desc": "表示属中低风险资产，适合稳健型投资者"
      },
      {
        "level": 5,
        "desc": "表示属低风险资产，适合谨慎型投资者"
      }
    ],
    "asideList": [
      {
        "code": "account",
        "title": "我的账户",
        "list": [
          {
            "url": "/account",
            "title": "账户总览",
            "code": "account"
          },
          {
            "url": "/account/borrowrecord",
            "title": "出借记录",
            "code": "borrowrecord"
          },
          {
            "url": "/account/lendrecord",
            "title": "借款记录",
            "code": "lendrecord"
          },
          {
            "url": "/account/capitalflow",
            "title": "资金记录",
            "code": "capitalflow"
          },
          {
            "url": "/account/cash",
            "title": "充值/提现",
            "code": "cash"
          },
          {
            "url": "/account/welfare",
            "title": "我的福利",
            "code": "welfare"
          },
          {
            "url": "/account/invite",
            "title": "我的邀请",
            "code": "invite"
          },
          {
            "url": "/account/message",
            "title": "我的消息",
            "code": "message"
          },
          {
            "url": "/account/securitysetting",
            "title": "安全设置",
            "code": "securitysetting"
          },
          {
            "url": "/account/appraisal",
            "title": "风险评测",
            "code": "appraisal"
          }
        ]
      },
      {
        "code": "company",
        "title": "信息披露",
        "list": [
          {
            "url": "/company/aboutus",
            "title": "关于我们",
            "code": "information"
          },
          {
            "url": "/company/information",
            "title": "公司信息",
            "code": "company"
          },
          {
            "url": "/company/notice",
            "title": "平台公告",
            "code": "notice"
          },
          {
            "url": "/company/honor",
            "title": "公司荣誉",
            "code": "honor"
          },
          {
            "url": "/company/media",
            "title": "媒体报道",
            "code": "mediacoverage"
          },
          {
            "url": "/company/education",
            "title": "风险教育",
            "code": "education"
          },
          {
            "url": "/company/partners",
            "title": "合作伙伴",
            "code": "partners"
          },
          {
            "url": "/company/contactus",
            "title": "联系我们",
            "code": "contactus"
          }
        ]
      },
      {
        "code": "help",
        "title": "帮助中心",
        "list": [
          {
            "url": "/help/registerland",
            "title": "注册与登录",
            "code": "registerland"
          },
          {
            "url": "/help/opencard",
            "title": "开户与绑卡",
            "code": "opencard"
          },
          {
            "url": "/help/cashvalue",
            "title": "充值与提现",
            "code": "cashvalue"
          },
          {
            "url": "/help/loanreturn",
            "title": "出借与回款",
            "code": "loanreturn"
          }
        ]
      }
    ],
    "projectDeadline": [
      {
        "id": -1,
        "title": "全部",
        "complete": true
      },
      {
        "id": 6,
        "title": "1-30天"
      },
      {
        "id": 7,
        "title": "31-90天"
      },
      {
        "id": 8,
        "title": "91-180天"
      },
      {
        "id": 9,
        "title": "180-365天"
      }
    ],
    "SIGN": "amluZ3ViYW5i",
    "BASE_URL": "http://localhost:8080/jg_api",
    "SHARE_URL": "https://www.jingubank.com/static/H5/invite.html?referrerId=",
    "SHARE_URL_PC": "https://www.jingubank.com/static/H5/invitereginster.html?referrerId=",
    "SMSCODETYPE": {
      "common": "common",
      "register": "register",
      "findPassword": "findPassword",
      "editPassword": "editPassword",
      "withdraw": "withdraw",
      "repayment": "repayment",
      "changeMobile": "changeMobile",
      "changeNewMobile": "changeNewMobile",
      "unBindCard": "unBindCard",
      "findPayPassword": "findPayPassword",
      "inviter": "inviter",
      "recharge": "recharge"
    }
  }

}
