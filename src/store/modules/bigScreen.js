import {
  getRightScreen, getCenterScreen, getAlert, alertScanned, getLeftScreen, getLeftMidData,
  getCarHomeLeftList, getCarHomeLeftDetails, getCarHomeRightList, getCarHomeRightDetails, getTeamMember, getLeftRightBottom, getTeamCar,
  testLeftData, testLeftClient, testLeftBySite
} from '../../http/apiUrl'
import { GET_RIGHT_SCREEN, GET_POLICY, CURUSER_ID } from '../mutationTypes'

/* 用vuex管理vue状态 */
const state = {
  currentId: '',//357b59aa_172f_4a27_9aa9_ab1000b398fa
  tokenStr: '',
  mapData: [],
  mapDataCopy: [],
  alertInfo: '',
  alertSounds: '',
  alertType: 0
}
const mutations = {
  [CURUSER_ID] (state, { result }) {
    state.currentId = result
  },
  // [GET_MAPS] (state, { result }) {
  //   // console.log(result, 'result')
  //   state.mapData = result.mapData
  //   state.mapDataCopy = result.mapData
  // },
  [GET_RIGHT_SCREEN] () {
  },
  [GET_POLICY] (state, { result }) {
    if (result.alert.data.length > 0) {
      state.alertType = result.alert.state
      state.alertInfo = result.alert.data[0].alertTime + result.alert.data[0].alertInfo
      state.alertSounds = result.alert.data[0].soundSrc
    } else {
      state.alertType = ''
      state.alertInfo = ''
      state.alertSounds = null
      // console.log("暂无告警")
    }
    // state.alertType = result.alert.state
    // state.alertInfo = result.alert.data[0].alertTime + result.alert.data[0].alertInfo
    // state.alertSounds = result.alert.data[0].soundSrc
  }
}
const actions = {
  // 获取右屏数据
  async getRightScreen ({ commit }, data) {
    const result = await getRightScreen(data)
    if (result) {
      commit(GET_RIGHT_SCREEN, { result })
    }
    return result
  },
  // 获取中屏数据
  async getCenterScreen (...rest) {
    const result = await getCenterScreen(rest[1])
    // if (result) {
    //   commit(GET_RIGHT_SCREEN, { result })
    // }
    return result
  },
  // 中屏报警信息
  async getAlert ({ commit }, data) {
    const result = await getAlert(data)
    if (result) {
      commit(GET_POLICY, { result })
    }
    return result
  },
  // 取消报警接口
  async alertScanned (...rest) {
    const result = await alertScanned(rest[1])
    return result
  },
  // 获取左屏数据
  async getLeftScreen (...rest) {
    const result = await getLeftScreen(rest[1])

    return result
  },
  // 获取左屏中间的厂站数据
  async getLeftMidData (...rest) {
    const result = await getLeftMidData(rest[1])

    return result
  },
  // 获取左屏右下角数据
  async getLeftRightBottom (...rest) {
    const result = await getLeftRightBottom(rest[1])
    return result
  },
  // 获取车载左侧实时报警列表数据
  async getCarHomeLeftList (...rest) {
    const result = await getCarHomeLeftList(rest[1])

    return result
  },
  // 获取车载左侧实时报警详情数据
  async getCarHomeLeftDetails (...rest) {
    const result = await getCarHomeLeftDetails(rest[1])

    return result
  },
  // 获取车载右侧实时工单数据
  async getCarHomeRightList (...rest) {
    const result = await getCarHomeRightList(rest[1])

    return result
  },
  // 获取车载右侧工单详情数据
  async getCarHomeRightDetails (...rest) {
    const result = await getCarHomeRightDetails(rest[1])

    return result
  },
  // 获取车载右侧班组成员
  async getTeamMember (...rest) {
    const result = await getTeamMember(rest[1])

    return result
  },
  // 获取车辆
  async getTeamCar (...rest) {
    const result = await getTeamCar(rest[1])

    return result
  },
  // 测试大屏左屏数据接口1
  async testLeftData (...rest) {
    const result = await testLeftData(rest[1])

    return result
  },
  // 测试大屏左屏数据接口2
  async testLeftClient (...rest) {
    const result = await testLeftClient(rest[1])

    return result
  },
  // 测试大屏左屏数据接口3
  async testLeftBySite (...rest) {
    const result = await testLeftBySite(rest[1])

    return result
  }
}

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  actions,
  mutations
}