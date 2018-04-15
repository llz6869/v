/* 信息披露 start */
import AboutUs from './AboutUs'
import Information from './Information'
import Notice from './Notice'
import NoticeDetails from './NoticeDetails'
import Honor from './Honor'
import MediaCoverage from './MediaCoverage'
import MediaDetails from './MediaDetails'
import Education from './Education'
import EducationDetails from './EducationDetails'
import Partners from './Partners'
import ContactUs from './ContactUs'
var companyRouter = [
  {
    path: '/company/aboutus',  // 关于我们
    name: 'aboutus',
    component: AboutUs,
    meta: {
      title: 'aboutus'
    }
  },
  {
    path: '/company/information',  // 公司信息
    name: 'information',
    component: Information,
    meta: {
      title: 'information'
    }
  },
  {
    path: '/company/notice',  // 平台公告
    name: 'notice',
    component: Notice,
    meta: {
      title: 'notice'
    }
  },
  {
    path: '/company/notice/details/:id',  // 平台公告详情
    name: 'noticedetails',
    component: NoticeDetails,
    meta: {
      title: 'noticedetails'
    }
  },
  {
    path: '/company/honor',  // 公司荣誉
    name: 'honor',
    component: Honor,
    meta: {
      title: 'Honor'
    }
  },
  {
    path: '/company/media',  // 媒体报道
    name: 'mediacoverage',
    component: MediaCoverage,
    meta: {
      title: 'mediacoverage'
    }
  },
  {
    path: '/company/media/details/:id',  // 媒体报道详情
    name: 'mediadetails',
    component: MediaDetails,
    meta: {
      title: 'mediadetails'
    }
  },
  {
    path: '/company/education',  // 风险教育
    name: 'education',
    component: Education,
    meta: {
      title: 'education'
    }
  },
  {
    path: '/company/education/details/:id',  // 风险教育详情
    name: 'educationdetails',
    component: EducationDetails,
    meta: {
      title: 'educationdetails'
    }
  },
  {
    path: '/company/partners',  // 合作伙伴
    name: 'partners',
    component: Partners,
    meta: {
      title: 'partners'
    }
  },
  {
    path: '/company/contactus',  // 联系我们
    name: 'contactus',
    component: ContactUs,
    meta: {
      title: 'contactus'
    }
  }
]
/* 信息披露 end */

export default companyRouter
