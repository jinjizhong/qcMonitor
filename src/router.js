import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
// import Home from './pages/Home/index.vue'

// 登陆
// import Login from './pages/Home/login.vue'

// 设备监测
// import Dianrongqi from './pages/deviceMonitor/dianrongqi/index.vue'
// import Duanluqi from './pages/deviceMonitor/duanluqi/index.vue'
// import Bianyaqi from './pages/deviceMonitor/bianyaqi/index.vue'
// import Baohushebei from './pages/deviceMonitor/baohushebei/index.vue'
// import Dianlan from './pages/deviceMonitor/dianlan/index.vue'
// import Gis from './pages/deviceMonitor/gis/index.vue'
// import Zhiliuping from './pages/deviceMonitor/zhiliuping/index.vue'
// import Jueyuanzi from './pages/deviceMonitor/jueyuanzi/index.vue'
// import Bileiqi from './pages/deviceMonitor/bileiqi/index.vue'
// import Daoxianjinju from './pages/deviceMonitor/daoxianjinju/index.vue'
// import Kaiguangui from './pages/deviceMonitor/kaiguangui/index.vue'
// import Nibianqi from './pages/deviceMonitor/nibianqi/index.vue'
// import Huiliuxiang from './pages/deviceMonitor/huiliuxiang/index.vue'
// import Fangdian from './pages/deviceMonitor/fangdian/index.vue'
// import Fubing from './pages/deviceMonitor/fubing/index.vue'
// import Weiqixiang from './pages/deviceMonitor/weiqixiang/index.vue'
// import Fengpian from './pages/deviceMonitor/fengpian/index.vue'
// import Tongjidianliang from './pages/deviceMonitor/tongjidianliang/index.vue'
// import Fenggudianliang from './pages/deviceMonitor/fenggudianliang/index.vue'
// import Kaiguanbianwei from './pages/deviceMonitor/kaiguanbianwei/index.vue'
// import Yaoceyuexian from './pages/deviceMonitor/yaoceyuexian/index.vue'
// import Baohudongzuo from './pages/deviceMonitor/baohudongzuo/index.vue'
// import Yaoxinbianwei from './pages/deviceMonitor/yaoxinbianwei/index.vue'

// 电力监控组态图
// import Dianlijiankong from './pages/dianlijiankong/index.vue'

// 运行监测
// import Dianliujc from './pages/runningMonitor/dianliujc/index.vue'
// import Dianyajc from './pages/runningMonitor/dianyajc/index.vue'
// import Gonglvjc from './pages/runningMonitor/gonglvjc/index.vue'
// import Gonglvysjc from './pages/runningMonitor/gonglvysjc/index.vue'
// import Xuliangjc from './pages/runningMonitor/xuliangjc/index.vue'
// import Model from './pages/runningMonitor/model.vue'

// 导入能效管理界面
// import Mainkehu from './pages/energyManage/mainKehu/index.vue'
// import Mainyunwei from './pages/energyManage/mainYunwei/index.vue'
// import Dianyapiancha from './pages/energyManage/dianyapiancha/index.vue'
// import Sanxiang from './pages/energyManage/sanxiang/index.vue'
// import Xiebofenxi from './pages/energyManage/xiebofenxi/index.vue'
// import Sunhaofenxi from './pages/energyManage/sunhaofenxi/index.vue'
import ReportDetail from './pages/energyManage/report/reportDetail.vue'
// import Dianfeifenxi from './pages/energyManage/dianfei/index.vue'
// 智能运维-运维分析
// import healthAnalysis from './pages/operationManage/healthAnalysis/index.vue'
// import kehuPolicy from './pages/operationManage/kehuPolicy/index.vue'
// import orderAnalysis from './pages/operationManage/orderAnalysis/index.vue'
// import yunweiPolicy from './pages/operationManage/yunweiPolicy/index.vue'

// 动环监测
// import siteChoose from './pages/dongHuan/siteChoose/index.vue'
// import Upsjk from './pages/dongHuan/upsjk/index.vue'
// import XuDianChijk from './pages/dongHuan/xudianchijk/index.vue'
// import KongTiaojk from './pages/dongHuan/kongtiaojk/index.vue'
// import SF6jc from './pages/dongHuan/sf6jc/index.vue'
// import TongXunXianLanjk from './pages/dongHuan/tongxunxianlanjk/index.vue'
// import FengJijk from './pages/dongHuan/fengjijk/index.vue'
// import JiPaiShuijk from './pages/dongHuan/jipaishuijk/index.vue'
// import MenJinjk from './pages/dongHuan/menjinjk/index.vue'

// 监控安全
// import monitorTo from './pages/Security/monitorTo/index.vue'
// 智能巡检
// import znxunjian from './pages/Security/zhinengXunjian/index.vue'
// 个人中心
// import personalCenter from './pages/Security/personalCenter/index.vue'
// 设备资产管理
// import SecurityAnalyze from './pages/salaryManage/securityAnalyze.vue'

/* 大屏和车载 */
import bigIndex from './pages/bigScreen/index.vue'
import LeftScreen from './pages/bigScreen/leftScreen.vue'
import RightScreen from './pages/bigScreen/rightScreen.vue'
import QcMap from './pages/bigScreen/map.vue'
import CarIndex from './pages/bigScreen/carIndex.vue'

//客户参观版
import Middle from './pages/customerBig/index.vue'
import IndexMap from './pages/customerBig/indexMap.vue'
import Left from './pages/customerBig/leftScreen.vue'
import Right from './pages/customerBig/rightScreen.vue'

//客户参观版2
import SecMiddle from './pages/secondBig/index.vue'
import SecMap from './pages/secondBig/secondMap.vue'
import SecLeft from './pages/secondBig/secondLeft.vue'
import SecRight from './pages/secondBig/secondRight.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/login',
    meta: {
      title: '全程智慧能源管理平台'
    }
  },
  {
    path: '/login',
    name: 'Login',
    // component: Login,
    component: () => import('./pages/Home/login.vue'), //Login,
    meta: {
      title: '全程智慧能源管理平台'
    }
  },
  {
    path: '/loginChoose',
    name: 'LoginChoose',
    // component: Login,
    component: () => import('./pages/Home/loginChoose.vue'), //LoginChoose,
    meta: {
      title: '全程智慧能源管理平台'
    }
  },
  {
    path: '/index',
    name: 'home',
    // component: Home,
    component: () => import('./pages/Home/index.vue'), //Home,
    meta: {
      title: '全程智慧能源管理平台'
    }
  },
  {
    path: '/bigIndex',
    name: 'bigIndex',
    component: Middle,
    meta: {
      title: '调度中心-中屏'
    }
  },
  {
    path: '/leftScreen',
    name: 'leftScreen',
    component: LeftScreen,
    meta: {
      title: '调度中心-左屏'
    }
  },
  {
    path: '/rightScreen',
    name: 'rightScreen',
    component: RightScreen,
    meta: {
      title: '调度中心-右屏'
    }
  },
  {
    path: '/middle',
    name: 'Middle',
    component: bigIndex,
    meta: {
      title: '调度中心-中屏'
    }
  },
  {
    path: '/indexMap',
    name: 'indexMap',
    component: IndexMap,
    meta: {
      title: '调度中心-中屏'
    }
  },
  {
    path: '/left',
    name: 'Left',
    component: Left,
    meta: {
      title: '调度中心-左屏'
    }
  },
  {
    path: '/right',
    name: 'Right',
    component: Right,
    meta: {
      title: '调度中心-右屏'
    }
  },
  {
    path: '/map',
    name: 'qcMap',
    component: QcMap,
    meta: {
      title: '调度中心-地图'
    }
  },

  // {
  //   path: '/mapTest',
  //   name: 'mapTest',
  //   component: () => import('./pages/bigScreen/mapTest.vue'),
  //   meta: {
  //     title: '地图Test'
  //   }
  // },
  {
    path: '/carIndex',
    name: 'carIndex',
    component: CarIndex,
    meta: {
      title: '调度中心-车载系统'
    }
  },
  {
    path: '/reportDetail',
    name: 'reportDetail',
    component: ReportDetail,
    meta: {
      title: '报告详情'
    }
  },
  // {
  //   path: '/dianrongqi',
  //   name: 'dianrongqi',
  //   component: Dianrongqi,
  //   meta: {
  //     title: '电容器'
  //   }
  // },
  // {
  //   path: '/bianyaqi',
  //   name: 'bianyaqi',
  //   component: Bianyaqi,
  //   meta: {
  //     title: '变压器'
  //   }
  // },
  // {
  //   path: '/baohushebei',
  //   name: 'baohushebei',
  //   component: Baohushebei,
  //   meta: {
  //     title: '保护设备'
  //   }
  // },
  // {
  //   path: '/dianlan',
  //   name: 'dianlan',
  //   component: Dianlan,
  //   meta: {
  //     title: '电缆'
  //   }
  // },
  // {
  //   path: '/gis',
  //   name: 'gis',
  //   component: Gis,
  //   meta: {
  //     title: 'GIS柜'
  //   }
  // },
  // {
  //   path: '/zhiliuping',
  //   name: 'zhiliuping',
  //   component: Zhiliuping,
  //   meta: {
  //     title: '直流屏'
  //   }
  // },
  // {
  //   path: '/dianliujc',
  //   name: 'dianliujc',
  //   component: Dianliujc,
  //   meta: {
  //     title: '电流监测'
  //   }
  // },
  // {
  //   path: '/dianyajc',
  //   name: 'dianyajc',
  //   component: Dianyajc,
  //   meta: {
  //     title: '电压监测'
  //   }
  // },
  // {
  //   path: '/gonglvjc',
  //   name: 'gonglvjc',
  //   component: Gonglvjc,
  //   meta: {
  //     title: '功率监测'
  //   }
  // },
  // {
  //   path: '/gonglvysjc',
  //   name: 'gonglvysjc',
  //   component: Gonglvysjc,
  //   meta: {
  //     title: '功率因数监测'
  //   }
  // },
  // {
  //   path: '/xuliangjc',
  //   name: 'xuliangjc',
  //   component: Xuliangjc,
  //   meta: {
  //     title: '需量监测'
  //   }
  // },
  // {
  //   path: '/jueyuanzi',
  //   name: 'jueyuanzi',
  //   component: Jueyuanzi,
  //   meta: {
  //     title: '绝缘子'
  //   }
  // },
  // {
  //   path: '/bileiqi',
  //   name: 'bileiqi',
  //   component: Bileiqi,
  //   meta: {
  //     title: '避雷器'
  //   }
  // },
  // {
  //   path: '/daoxianjinju',
  //   name: 'daoxianjinju',
  //   component: Daoxianjinju,
  //   meta: {
  //     title: '导线金具'
  //   }
  // },
  // {
  //   path: '/kaiguangui',
  //   name: 'kaiguangui',
  //   component: Kaiguangui,
  //   meta: {
  //     title: '开关柜'
  //   }
  // },
  // {
  //   path: '/duanluqi',
  //   name: 'duanluqi',
  //   component: Duanluqi,
  //   meta: {
  //     title: '断路器'
  //   }
  // },
  // {
  //   path: '/nibianqi',
  //   name: 'nibianqi',
  //   component: Nibianqi,
  //   meta: {
  //     title: '逆变器'
  //   }
  // },
  // {
  //   path: '/huiliuxiang',
  //   name: 'huiliuxiang',
  //   component: Huiliuxiang,
  //   meta: {
  //     title: '汇流箱'
  //   }
  // },
  // {
  //   path: '/fangdian',
  //   name: 'fangdian',
  //   component: Fangdian,
  //   meta: {
  //     title: '放电'
  //   }
  // },
  // {
  //   path: '/fubing',
  //   name: 'fubing',
  //   component: Fubing,
  //   meta: {
  //     title: '覆冰'
  //   }
  // },
  // {
  //   path: '/weiqixiang',
  //   name: 'weiqixiang',
  //   component: Weiqixiang,
  //   meta: {
  //     title: '微气象'
  //   }
  // },
  // {
  //   path: '/fengpian',
  //   name: 'fengpian',
  //   component: Fengpian,
  //   meta: {
  //     title: '风偏'
  //   }
  // },
  // {
  //   path: '/tongjidianliang',
  //   name: 'tongjidianliang',
  //   component: Tongjidianliang,
  //   meta: {
  //     title: '统计电量'
  //   }
  // },
  // {
  //   path: '/fenggudianliang',
  //   name: 'fenggudianliang',
  //   component: Fenggudianliang,
  //   meta: {
  //     title: '峰谷电量'
  //   }
  // },
  // {
  //   path: '/kaiguanbianwei',
  //   name: 'kaiguanbianwei',
  //   component: Kaiguanbianwei,
  //   meta: {
  //     title: '开关变位'
  //   }
  // },
  // {
  //   path: '/yaoceyuexian',
  //   name: 'yaoceyuexian',
  //   component: Yaoceyuexian,
  //   meta: {
  //     title: '遥测越限'
  //   }
  // },
  // {
  //   path: '/baohudongzuo',
  //   name: 'baohudongzuo',
  //   component: Baohudongzuo,
  //   meta: {
  //     title: '保护动作'
  //   }
  // },
  // {
  //   path: '/yaoxinbianwei',
  //   name: 'yaoxinbianwei',
  //   component: Yaoxinbianwei,
  //   meta: {
  //     title: '遥信变位'
  //   }
  // },
  // {
  //   path: '/mainkehu',
  //   name: 'mainkehu',
  //   component: () => import('./pages/energyManage/mainKehu/index.vue'), //Mainkehu,
  //   meta: {
  //     title: '客户首页'
  //   }
  // },
  // {
  //   path: '/mainyunwei',
  //   name: 'mainyunwei',
  //   component: Mainyunwei,
  //   meta: {
  //     title: '运维首页'
  //   }
  // },
  // {
  //   path: '/dianyapiancha',
  //   name: 'dianyapiancha',
  //   component: () => import('./pages/energyManage/dianyapiancha/index.vue'), //Dianyapiancha,
  //   meta: {
  //     title: '电压偏差分析'
  //   }
  // },
  // {
  //   path: '/sanxiang',
  //   name: 'sanxiang',
  //   component: Sanxiang,
  //   meta: {
  //     title: '三项不平衡监测'
  //   }
  // },
  // {
  //   path: '/xiebo',
  //   name: 'xiebo',
  //   component: Xiebofenxi,
  //   meta: {
  //     title: '谐波分析'
  //   }
  // },
  // {
  //   path: '/sunhao',
  //   name: 'sunhao',
  //   component: Sunhaofenxi,
  //   meta: {
  //     title: '损耗分析'
  //   }
  // },
  // {
  //   path: '/dianfei',
  //   name: 'dianfei',
  //   component: Dianfeifenxi,
  //   meta: {
  //     title: '电费分析'
  //   }
  // },
  // {
  //   path: '/healthAnalys',
  //   name: 'healthAnalys',
  //   component: healthAnalysis,
  //   meta: {
  //     title: '健康度分析'
  //   }
  // },
  // {
  //   path: '/orderAnalys',
  //   name: 'orderAnalys',
  //   component: orderAnalysis,
  //   meta: {
  //     title: '工单分析'
  //   }
  // },
  // {
  //   path: '/yunweiPolicy',
  //   name: 'yunweiPolicy',
  //   component: yunweiPolicy,
  //   meta: {
  //     title: '运维报警分析'
  //   }
  // },
  // {
  //   path: '/kehuPolicy',
  //   name: 'kehuPolicy',
  //   component: kehuPolicy,
  //   meta: {
  //     title: '客户报警分析'
  //   }
  // },
  // {
  //   path: '/dianlijiankong',
  //   name: 'dianlijiankong',
  //   component: Dianlijiankong,
  //   meta: {
  //     title: '电力监控'
  //   }
  // },
  // {
  //   path: '/upsjk',
  //   name: 'upsjk',
  //   component: Upsjk,
  //   meta: {
  //     title: 'UPS监控'
  //   }
  // },
  // {
  //   path: '/xudianchijk',
  //   name: 'xudianchijk',
  //   component: XuDianChijk,
  //   meta: {
  //     title: '蓄电池监控'
  //   }
  // },
  // {
  //   path: '/kongtiaojk',
  //   name: 'kongtiaojk',
  //   component: KongTiaojk,
  //   meta: {
  //     title: '空调监控'
  //   }
  // },
  // {
  //   path: '/sf6jc',
  //   name: 'sf6jc',
  //   component: SF6jc,
  //   meta: {
  //     title: '空调监控'
  //   }
  // },
  // {
  //   path: '/tongxunxianlanjk',
  //   name: 'tongxunxianlanjk',
  //   component: TongXunXianLanjk,
  //   meta: {
  //     title: '通讯线缆监控'
  //   }
  // },
  // {
  //   path: '/fengjijk',
  //   name: 'fengjijk',
  //   component: FengJijk,
  //   meta: {
  //     title: '风机监控'
  //   }
  // },
  // {
  //   path: '/jipaishuijk',
  //   name: 'jipaishuijk',
  //   component: JiPaiShuijk,
  //   meta: {
  //     title: '给排水监控'
  //   }
  // },
  // {
  //   path: '/menjinjk',
  //   name: 'menjinjk',
  //   component: MenJinjk,
  //   meta: {
  //     title: '门禁监控'
  //   }
  // },
  // {
  //   path: '/siteChoose',
  //   name: 'siteChoose',
  //   component: siteChoose,
  //   meta: {
  //     title: '站点监测'
  //   }
  // },
  // {
  //   path: '/monitorTo',
  //   name: 'monitorTo',
  //   component: monitorTo,
  //   meta: {
  //     title: '视频监控'
  //   }
  // },
  // {
  //   path: '/znxunjian',
  //   name: 'znxunjian',
  //   component: znxunjian,
  //   meta: {
  //     title: '智能巡检'
  //   }
  // },
  // {
  //   path: '/personalCenter',
  //   name: 'personalCenter',
  //   component: personalCenter,
  //   meta: {
  //     title: '个人中心'
  //   }
  // },
  // {
  //   path: '/securityAnalyze',
  //   name: 'securityAnalyze',
  //   component: SecurityAnalyze,
  //   meta: {
  //     title: '安全分析'
  //   }
  // },
  {
    path: '/secMiddle',
    name: 'secondMiddle',
    component: SecMiddle,
    meta: {
      title: '调度中心-中屏'
    }
  },
  {
    path: '/secLeft',
    name: 'secondLeft',
    component: SecLeft,
    meta: {
      title: '调度中心-左屏'
    }
  },
  {
    path: '/secRight',
    name: 'secondRight',
    component: SecRight,
    meta: {
      title: '调度中心-右屏'
    }
  },
  {
    path: '/secMap',
    name: 'secondMap',
    component: SecMap,
    meta: {
      title: '调度中心-地图'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})
export default router
