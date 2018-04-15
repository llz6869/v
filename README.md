# jg_wap

> A Vue.js project

## Build Setup

``` bash
# install dependencies

npm install


# serve with hot reload at localhost:8090

npm run dev

```

修改本地启动端口号，修改` config/index.js的dev:{port: 8090} `即可


## 目录说明

1. build                         ————vue启动服务目录(请参考vue-cli官方说明)
2. config                        ————vue配置目录(请参考vue-cli官方说明)
3. doc                           ————文档目录
4. src                           ————开发目录
    1. assets                    ————资源目录
        - css                    ————css
        - js                     ————js
    2. components                ————组件目录
        - aboutUs                ————信息披露
        - accout                 ————个人中心
        - activiey               ————福利活动
        - borrow                 ————我要借款
        - guide                  ————新手指南
        - helper                 ————帮助中心
        - lend                   ————我要出借
        - login                  ————登录/注册
        - public                 ————公共组件
    3. router                    ————路由目录

5. static                        ————静态资源目录
    1. html                      ————纯静态html页面
        - 子目录                 ————对应的网站模块
    2. js                        ————引用的js目录
    3. imagas                    ————引用的图片目录
6. 其他文件                      ————其他vue需要文件


## 枚举说明
#### config/index.js config.json的说明

"SMSCODETYPE": {
    "common": "common", // 通用发验证码
    "register": "register", // 注册
    "findPassword": "findPassword", // 找回密码
    "editPassword": "editPassword",
    "withdraw": "withdraw", // 提现
    "repayment": "repayment", // 还款
    "changeMobile": "changeMobile", // 变更手机号(旧)
    "changeNewMobile": "changeNewMobile", // 变更手机号(新)
    "unBindCard": "unBindCard", // 解绑
    "findPayPassword": "findPayPassword", // 找回支付密码
    "inviter": "inviter", // 邀请
    "recharge": "recharge" // 充值成功
}

