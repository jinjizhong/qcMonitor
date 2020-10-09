import {
    getReportYWInsiderList,
    findAllReports,
    findReportDetail,
    saveReport,
    sendReport,
    findReportById,
    deleteReportById
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
    // 获取运维内部报告列表
    async getReportYWInsiderList (...rest) {
        const result = await getReportYWInsiderList(rest[1])
        return result
    },
    // 获取运维内部报告列表
    async findAllReports (...rest) {
        const result = await findAllReports(rest[1])
        return result
    },
    // 查询的运维或能效报告详情
    async findReportDetail (...rest) {
        const result = await findReportDetail(rest[1])
        return result
    },
    // 根据Id查询运维或能效报告
    async findReportById (...rest) {
        const result = await findReportById(rest[1])
        return result
    },
    // 添加能效或者运维报告
    async saveReport (...rest) {
        const result = await saveReport(rest[1])
        return result
    },
    // 发送能效或者运维报告
    async sendReport (...rest) {
        const result = await sendReport(rest[1])
        return result
    },
    // 删除能效或者运维报告
    async deleteReportById (...rest) {
        const result = await deleteReportById(rest[1])
        return result
    }
}

export default {
    namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
    state,
    actions,
    mutations
}