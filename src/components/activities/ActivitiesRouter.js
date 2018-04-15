/* 福利活动 start */
import Activities from './Activities'
import Activities618 from './Activities618'
import ActivitiesJingDong from './ActivitiesJingDong'
import PhysicalExamination from './PhysicalExamination'
var ActivitiesRouter = [
  {
    path: '/activities',  // 福利活动
    name: 'activities',
    component: Activities,
    meta: {
      title: 'activities'
    }
  },
  {
    path: '/activities/activities618',  // 618活动
    name: 'activities618',
    component: Activities618,
    meta: {
      title: 'activities618'
    }
  },
  {
    path: '/activities/activitiesjingdong',  // 送京东卡活动
    name: 'activitiesjingdong',
    component: ActivitiesJingDong,
    meta: {
      title: 'activitiesjingdong'
    }
  },
  {
    path: '/activities/physicalexamination',  // 体检卡活动 2018-01-16
    name: 'physicalExamination',
    component: PhysicalExamination,
    meta: {
      title: 'physicalExamination'
    }
  }
]
/* 福利活动 end */

export { ActivitiesRouter }
