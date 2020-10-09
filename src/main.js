import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import hls from 'videojs-contrib-hls'
Vue.use(hls)

import VueAliplayerV2 from 'vue-aliplayer-v2'

Vue.use(VueAliplayerV2)
Vue.use(ElementUI)
//highcharts
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highcharts)

Vue.prototype.$echarts = echarts

const isPc = window.innerWidth > 717

Vue.prototype.$isPc = isPc

Vue.config.productionTip = false

const clearArr = []

// 获取报警信息
const getAlert = () => {
  let params = {
    clientFid: '',
    siteFid: '',
    teamFid: ''
  }
  store.dispatch('BigScreen/getAlert', params).then(res => {
    const audio = new Audio()
    if (res && res.alert.state == 1) {

      audio.src = res.alert.data[0].soundSrc
      audio.loop = true;
      let audioPlay = audio.play()
      audioPlay.then(() => {
        // eslint-disable-next-line no-console
        // console.warn('可以自动播放');
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.error("Error: %s", "无任何交互操作下，音频不允许自动播放！");
        //音频元素只在用户交互后调用.play(),
        // ...
      })
    } else {
      audio.pause()
    }
  })
}
// 是否已经登录
const isLogin = () => {
  // store.dispatch('isLogin', {}).then(res => {
  //   if (res && !res.result) {
  //     clearIntervals(clearArr)
  //     window.localStorage.removeItem('userInfo')
  //     window.localStorage.removeItem('changeClientId')
  //     ElementUI.Message.error('登录超时已过期！')
  //     router.replace({
  //       path: '/login'
  //     })
  //   }
  // })
}

//登录kick
const userLoginKick = () => {
  store.dispatch('userLoginKick', {}).then(res => {
    if (res && res.result.kickOut && typeof (res.result.kickOut) !== "string") {
      window.localStorage.removeItem('userInfo')
      clearIntervals(clearArr)
      ElementUI.MessageBox.alert('该账号在其他地方登录，被迫下线', '消息提示', {
        confirmButtonText: '确定',
        callback: () => {
          router.replace({
            path: '/login'
          })
        }
      })
    } else if (typeof (res.result.kickOut) == "string") {
      ElementUI.Message({
        message: res.result.kickOut,
        type: 'error',
        duration: '0',
        showClose: true
      })
    } else if (!res.result.isLogin) {
      // window.localStorage.removeItem('userInfo')
      // clearIntervals(clearArr)
      // ElementUI.MessageBox.alert('登录超时已过期！', '消息提示', {
      //   confirmButtonText: '确定',
      //   callback: () => {
      //     router.replace({
      //       path: '/login'
      //     })
      //   }
      // })
    }
  })
}

//原理 用一个数组来保存所有定时器的id
const clearIntervals = (array) => {
  for (var i = array.length - 1; i >= 0; i--) {
    if (typeof array[i] !== 'undefined') {
      clearInterval(array[i])
    }
  }
}

router.beforeEach((to, from, next) => {
  clearIntervals(clearArr)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  switch (to.name) {
    // 后台管理首页，子系统选择页使用kick轮询
    case 'home': case 'LoginChoose':
      isLogin()
      clearArr.push(setInterval(() => {
        userLoginKick()
      }, 5000))
      break;
    // 大屏中屏，车载首页，大屏地图页使用alert轮询；背景颜色调整
    case 'bigIndex': case 'qcMap': case 'carIndex':
      isLogin()
      window.document.documentElement.setAttribute('data-theme', 'bigScreen')
      clearArr.push(setInterval(() => {
        getAlert()
      }, 5000))
      break;
    // 背景颜色调整
    case 'rightScreen': case 'leftScreen': case 'Middle': case 'Left': case 'Right': case 'secondRight': case 'secondLeft': case 'secondMiddle':
      isLogin()
      window.document.documentElement.setAttribute('data-theme', 'bigScreen')
      break;
    default:
      window.document.documentElement.setAttribute('data-theme', 'default')
      // window.location.href = item.route
      break;
  }
  next()
})

/* 后端的url地址 */
Vue.prototype.BaseUrl = process.env.VUE_APP_BASEURL
// 天气地址
Vue.prototype.WeatherUrl = "https://i.tianqi.com/index.php?c=code&id=10&color=%239ACBEA&icon=1&py=pudong&site=17"
// 3D模型图
Vue.prototype.BannerUrl = 'https://www.hightopo.com/demo/intelligent-park/'
// 组态图
// Vue.prototype.zuTaiUrl = 'https://e.intellqc.com/svg/0b526dfa_1012_43d9_b01d_aaf400dd5cdc/yads.aspx'
// http://121.196.18.126
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})