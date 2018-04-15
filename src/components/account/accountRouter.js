/* 我的帐号 start */
import Appraisal from './Appraisal'
import BorrowRecord from './BorrowRecord'
import CapitalFlow from './CapitalFlow'
import Cash from './Cash'
import Invite from './Invite'
import LendRecord from './LendRecord'
import Message from './Message'
import Pandect from './Pandect'
import SecuritySetting from './SecuritySetting'
import Welfare from './Welfare'

var accountRouter = [
    {
        path: '/',  // 个人中心-账户总览
        name: 'account',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Pandect
    },
    {
        path: '/account/appraisal',  // 风险评测
        name: 'appraisal',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Appraisal
    },
    {
        path: '/account/borrowrecord',  // 出借记录
        name: 'borrowrecord',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: BorrowRecord
    },
    {
        path: '/account/capitalflow',  // 资金流水
        name: 'capitalflow',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: CapitalFlow
    },
    {
        path: '/account/cash',  // 充值/提现
        name: 'cash',
        component: Cash
    },
    {
        path: '/account/invite',  // 我的邀请
        name: 'invite',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Invite
    },
    {
        path: '/account/lendrecord',  // 借款记录
        name: 'lendrecord',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: LendRecord
    },
    {
        path: '/account/message',  // 我的消息
        name: 'message',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Message
    },
    {
        path: '/account/securitysetting',  // 安全设置
        name: 'securitysetting',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SecuritySetting
    },
    {
        path: '/account/welfare',  // 我的福利
        name: 'welfare',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Welfare
    }
]

/* 我的帐号 end */

export default accountRouter
