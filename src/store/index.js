import Vue from 'vue'
import Vuex from 'vuex'
import bigScreen from './modules/bigScreen'
import websocket from './modules/websocket'
import znyw from './modules/znyw'
import {
    getEquipInfo,
    getMonitorData,
    loadData,
    getXuliang,
    getPolicy,
    getClient,
    getSite,
    getEquip,
    transformerLossMan,
    dianyapiancha,
    getReportDetail,
    sanxiang,
    xiebo,
    xiebojb,
    nxKehuHeader,
    nxKehuElecUsed,
    nxWenTai,
    equipTop10,
    nxHomeYunWei,
    nxHomeRank,
    equipType,
    electricityTariff,
    electricityTariff2,
    workOrderAnalysis,
    getTeamList,
    getSiteSvg,
    getHealth,
    getYwPolicy,
    getCity,
    alertAvgHandleTimeYunWei,
    getKhPolicy,
    alertAvgHandleTime,
    getArea,
    loadAreaEquip,
    getNexiaoOption,
    getAdminData,
    siteLoginInfo,
    isLogin,
    userLogin,
    userLoginKick,
    userloginOut,
    userInfo,
    userId,
    getSiteAreaData,
    quickEntry,
    getMaps,
    personalCenter,
    realtimeVideo,
    quickMenu,
    getReport,
    modifyPassword,
    getClientYwHome,
    getClientYw,
    getHeaderMessage,
    workOrderList,
    teamManager,
    getPolicyList,
    getYwTeam,
    getAlertDetail,
    getAlertInfoListByEquip,
    getAlertSaveData,
    alertUpdateState,
    workOrderDelete,
    workOrderSubmit,
    workOrderCancel,
    getTickets,
    getEquiplist,
    submitOrder,
    orderUpload,
    getEquipAndType,
    getOrderDetail,
    getOrderEdit
} from '../http/apiUrl'
import {
    GET_TOP_INFO, GET_EQUIP_INFO, CHOOSE_TOP_INFO, GET_MONITOR_DATA, LOAD_DATA, GET_CLIENT, GET_SITE, GET_EQUIP, EQUIP_TYPE, GET_SITE_SVG, GET_CITY,
    CURUSER_ID, GET_NENG_XIAO_OPTION, PROPS_ROUTE_DATA, ROUTE_OBJ_SAVE, PROPS_NEED_REFRESH, GET_MAPS, REALTIME_VIDEO, SAVE_USER_CLIENTS, CHANGE_MY_CLIENT, QUICK_ENTRY, GET_YW_TEAM, RESET_ROUTE_DATA
} from './mutationTypes'

Vue.use(Vuex)
/* 用vuex管理vue状态 */
const state = {
    curuserId: '', //登录权限验证 be68583b_620a_43a7_9df8_ab200106fca8
    propsData: {}, //路由传值参数
    routeObjSave: {}, //路由传值参数转对象存储
    userClients: [], //存储用户已有权限的公司
    myCompanyId: '', //快捷入口切换获得的公司ID
    needRefresh: false, //是否刷新组件
    refreshAnatype: '', //刷新组件anatype
    mapData: [],
    mapDataCopy: [],
    equipInfo: {}, //设备信息
    selectDeviceValue: [], //选中头部值
    jianceState: [], //监测数据state
    jianceData: [], //监测数据data
    dianliujc: [],  //电流监测
    headerClient: [], //头部获取客户
    headerSite: [], //头部获取客户
    headerEquip: [], //头部获取客户
    headerVideo: [], //获取视频名称
    equipTypeList: [],//设备类型
    siteSvgList: [], // 接线图
    cityList: [],
    nxOption: [], //能效获取测点
    quickEntryList: [], //快捷入口列表
    ywTeamList: [] // 获取运维班组
}
const mutations = {
    [CURUSER_ID] (state, { result }) {
        state.curuserId = result
    },
    [GET_MAPS] (state, { result }) {
        state.mapData = result.mapData
        state.mapDataCopy = result.mapData
    },
    [PROPS_ROUTE_DATA] (state, { result }) {
        state.propsData = result
    },
    [RESET_ROUTE_DATA] (state, { result }) {
        state.propsData = result
    },
    [PROPS_NEED_REFRESH] (state, { result }) {
        state.needRefresh = result.needRefresh
        state.refreshAnatype = result.refreshAnatype
    },
    [CHANGE_MY_CLIENT] (state, { result }) {
        state.myCompanyId = result
    },
    [SAVE_USER_CLIENTS] (state, { result }) {
        state.userClients = result.clients
    },
    [ROUTE_OBJ_SAVE] (state, { result }) {
        state.routeObjSave = result
    },
    [GET_TOP_INFO] (state, { result }) {
        state.topInfo = result.options
    },
    [GET_EQUIP_INFO] (state, { result }) {
        state.equipInfo = result
    },
    [CHOOSE_TOP_INFO] (state, { result }) {
        state.selectDeviceValue = result
    },
    [GET_MONITOR_DATA] (state, { result }) {
        state.jianceState = result.state || []
        state.jianceData = result.data || []
    },
    [LOAD_DATA] (state, { result }) {
        state.dianliujc = result
    },
    [GET_CLIENT] (state, { result }) {
        state.headerClient = result.options
    },
    [GET_SITE] (state, { result }) {
        state.headerSite = result.options
    },
    [GET_EQUIP] (state, { result }) {
        state.headerEquip = result.options
    },
    [EQUIP_TYPE] (state, { result }) {
        state.equipTypeList = result.options
    },
    [GET_SITE_SVG] (state, { result }) {
        state.siteSvgList = result.svgUrl
    },
    [GET_YW_TEAM] (state, { result }) {
        state.ywTeamList = result.options
    },
    [GET_CITY] (state, { result }) {
        state.cityList = result.options
    },
    [GET_NENG_XIAO_OPTION] (state, { result }) {
        state.nxOption = result.option
    },
    [REALTIME_VIDEO] (state, { result }) {
        state.headerVideo = result.VideoEquip
    },
    [QUICK_ENTRY] (state, { result }) {
        state.quickEntryList = result.result.quickEntry
    }
}
const actions = {
    // 登陆权限验证
    async getCuruserId ({ commit }) {
        // getCookie('userId') || 
        let result = getUserId()
        if (result) {
            commit(CURUSER_ID, { result })
        }

        // const result = await getCuruserId()
        // if (result) {
        //   commit(CURUSER_ID, { result })
        // }
    },
    async getMaps ({ commit }, data) {
        // 发送异步请求
        const result = await getMaps(data)
        // 提交一个mutation
        if (result) {
            commit(GET_MAPS, { result })
        }
        return result
    },
    // 路由传值参数
    propsRouteData ({ commit }, data) {
        const result = data
        commit(PROPS_ROUTE_DATA, { result })
    },
    // 重置路由传值参数
    resetRouteData ({ commit }, data) {
        const result = data
        commit(RESET_ROUTE_DATA, { result })
    },
    // 路由传值参数转对象存储
    routeObjSave ({ commit }, data) {
        const result = data
        commit(ROUTE_OBJ_SAVE, { result })
    },
    // 存储用户已有权限的公司
    saveUserClients ({ commit }) {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {}
        const result = userInfo
        commit(SAVE_USER_CLIENTS, { result })
    },
    // 更改我的公司ID
    changeMyClient ({ commit }, data) {
        const result = data
        window.localStorage.setItem('changeClientId', result)
        commit(CHANGE_MY_CLIENT, { result })
    },
    // 组件是否需要刷新
    propsNeedRefresh ({ commit }, data) {
        const result = data
        commit(PROPS_NEED_REFRESH, { result })
    },
    // 登录
    async userLogin (...rest) {
        const result = await userLogin(rest[1])
        return result
    },
    // 登录kick
    async userLoginKick (...rest) {
        const result = await userLoginKick(rest[1])
        return result
    },
    // 登出
    async userloginOut (...rest) {
        const result = await userloginOut(rest[1])
        return result
    },
    // 当前登录用户信息
    async userInfo (...rest) {
        const result = await userInfo(rest[1])
        return result
    },
    // 当前登录用户ID
    async userId (...rest) {
        const result = await userId(rest[1])
        return result
    },
    // 修改我的密码
    async modifyPassword (...rest) {
        const result = await modifyPassword(rest[1])
        return result
    },
    // 是否已经登录
    async isLogin ({ ...rest }) {
        const result = await isLogin(rest[1])
        return result
    },
    // 站点登录获取相关信息
    async siteLoginInfo ({ ...rest }) {
        const result = await siteLoginInfo(rest[1])
        return result
    },
    // 获取快捷入口
    async quickEntry ({ commit }, data) {
        const result = await quickEntry(data)
        if (result) {
            commit(QUICK_ENTRY, { result })
        }
        return result
    },
    // 设置快捷入口
    async quickMenu (...rest) {
        const result = await quickMenu(rest[1])
        return result
    },
    // 获取头部信息
    async getHeaderMessage (...rest) {
        const result = await getHeaderMessage(rest[1])
        return result
    },
    // 获取设备基本信息
    async getEquipInfo ({ commit }, data) {
        const result = await getEquipInfo(data)
        if (result) {
            commit(GET_EQUIP_INFO, { result })
        }
        return result
    },
    // 选中头部的值
    async chooseTopInfo ({ commit }, data) {
        let result = data.selectDeviceValue
        commit(CHOOSE_TOP_INFO, { result })
    },
    // 获取监测数据
    async getMonitorData ({ commit }, data) {
        const result = await getMonitorData(data)
        if (result) {
            commit(GET_MONITOR_DATA, { result })
        }
        return result;
    },
    // 获取运行监测数据
    async loadData ({ commit }, data) {
        const result = await loadData(data)
        if (result) {
            commit(LOAD_DATA, { result })
        }
        return result
    },
    // 获取运行监测数据
    async getXuliang (...rest) {
        const result = await getXuliang(rest[1])
        return result
    },
    // 获取告警预警
    async getPolicy (...rest) {
        const result = await getPolicy(rest[1])
        return result
    },
    // 获取告警监测数据列表
    async getPolicyList (...rest) {
        const result = await getPolicyList(rest[1])
        return result
    },
    // 获取客户
    async getClient ({ commit }, data) {
        const result = await getClient(data)
        if (result) {
            commit(GET_CLIENT, { result })
        }
        return result
    },
    // 获取站点
    async getSite ({ commit }, data) {
        const result = await getSite(data)
        if (result) {
            commit(GET_SITE, { result })
        }
        return result
    },
    // 获取设备
    async getEquip ({ commit }, data) {
        const result = await getEquip(data)
        if (result) {
            commit(GET_EQUIP, { result })
        }
        return result
    },
    // 获取接线图
    async getSiteSvg ({ commit }, data) {
        const result = await getSiteSvg(data)
        if (result) {
            commit(GET_SITE_SVG, { result })
        }
        return result
    },
    // 获取运维班组
    async getYwTeam ({ commit }, data) {
        const result = await getYwTeam(data)
        if (result) {
            commit(GET_YW_TEAM, { result })
        }
        return result
    },
    // 获取变压器损耗
    async transformerLossMan (...rest) {
        const result = await transformerLossMan(rest[1])
        return result
    },
    // 获取报告列表
    async getReport (...rest) {
        const result = await getReport(rest[1])
        return result
    },
    // 获取报告详情
    async getReportDetail (...rest) {
        const result = await getReportDetail(rest[1])
        return result
    },
    // 电压偏差分析
    async dianyapiancha (...rest) {
        const result = await dianyapiancha(rest[1])
        return result
    },
    // 三相电压不平衡
    async sanxiang (...rest) {
        const result = await sanxiang(rest[1])
        return result
    },
    // 谐波分析
    async xiebo (...rest) {
        const result = await xiebo(rest[1])
        return result
    },
    // 谐波畸变
    async xiebojb (...rest) {
        const result = await xiebojb(rest[1])
        return result
    },
    // 能效客户首页头部数据
    async nxKehuHeader (...rest) {
        const result = await nxKehuHeader(rest[1])
        return result
    },
    // 能效客户首页电能使用
    async nxKehuElecUsed (...rest) {
        const result = await nxKehuElecUsed(rest[1])
        return result
    },
    // 能效客户首页稳态电能
    async nxWenTai (...rest) {
        const result = await nxWenTai(rest[1])
        return result
    },
    // 能效客户首页前十项排序
    async equipTop10 (...rest) {
        const result = await equipTop10(rest[1])
        return result
    },
    // 能效运维首页主要数据
    async nxHomeYunWei (...rest) {
        const result = await nxHomeYunWei(rest[1])
        return result
    },
    // 能效运维首页排行数据
    async nxHomeRank (...rest) {
        const result = await nxHomeRank(rest[1])
        return result
    },
    // 电费分析主要数据
    async electricityTariff (...rest) {
        const result = await electricityTariff(rest[1])
        return result
    },
    // 电费分析力率
    async electricityTariff2 (...rest) {
        const result = await electricityTariff2(rest[1])
        return result
    },
    // 设备类型
    async equipType ({ commit }, data) {
        const result = await equipType(data)
        if (result) {
            commit(EQUIP_TYPE, { result })
        }
        return result
    },
    // 请求工单分析数据
    async workOrderAnalysis (...rest) {
        const result = await workOrderAnalysis(rest[1])
        return result
    },
    // 请求运维班组
    async getTeamList (...rest) {
        const result = await getTeamList(rest[1])
        return result
    },
    // 请求健康度数据接口
    async getHealth (...rest) {
        const result = await getHealth(rest[1])
        return result
    },
    // 报警分析运维
    async getYwPolicy (...rest) {
        const result = await getYwPolicy(rest[1])
        return result
    },
    // 报警分析客户
    async getKhPolicy (...rest) {
        const result = await getKhPolicy(rest[1])
        return result
    },
    // 报警分析运维
    async getCity ({ commit }, data) {
        const result = await getCity(data)
        if (result) {
            commit(GET_CITY, { result })
        }
    },
    // 运维告警平均处理时间
    async alertAvgHandleTimeYunWei (...rest) {
        const result = await alertAvgHandleTimeYunWei(rest[1])
        return result
    },
    // 客户告警平均处理时间
    async alertAvgHandleTime (...rest) {
        const result = await alertAvgHandleTime(rest[1])
        return result
    },
    // 获取区域的接口
    async getArea (...rest) {
        const result = await getArea(rest[1])
        return result
    },
    // 站内监测
    async loadAreaEquip (...rest) {
        const result = await loadAreaEquip(rest[1])
        return result
    },
    // 获取测点名和测点Id
    async getNexiaoOption ({ commit }, data) {
        const result = await getNexiaoOption(data)
        if (result) {
            commit(GET_NENG_XIAO_OPTION, { result })
        }
        return result
    },
    // 获取后台管理首页数据
    async getAdminData (...rest) {
        const result = await getAdminData(rest[1])

        return result
    },
    // 获取站点区域检测数据
    async getSiteAreaData (...rest) {
        const result = await getSiteAreaData(rest[1])

        return result
    },
    // 获取个人中心数据
    async personalCenter (...rest) {
        const result = await personalCenter(rest[1])
        return result
    },
    // 获取视频名称
    async realtimeVideo ({ commit }, data) {
        const result = await realtimeVideo(data)
        if (result) {
            commit(REALTIME_VIDEO, { result })
        }
        return result
    },
    // 获取客户运维首页数据右上角
    async getClientYwHome (...rest) {
        const result = await getClientYwHome(rest[1])
        return result
    },
    // 获取客户运维首页数据
    async getClientYw (...rest) {
        const result = await getClientYw(rest[1])
        return result
    },

    // 获取工单负责人
    async teamManager (...rest) {
        const result = await teamManager(rest[1])
        return result
    },
    // 获取工单list
    async workOrderList (...rest) {
        const result = await workOrderList(rest[1])
        return result
    },
    // 获取告警详情
    async getAlertDetail (...rest) {
        const result = await getAlertDetail(rest[1])
        return result
    },
    // 获取告警设备列表
    async getAlertInfoListByEquip (...rest) {
        const result = await getAlertInfoListByEquip(rest[1])
        return result
    },
    // 告警列表处理
    async getAlertSaveData (...rest) {
        const result = await getAlertSaveData(rest[1])
        return result
    },
    // 告警列表处理查看状态
    async alertUpdateState (...rest) {
        const result = await alertUpdateState(rest[1])
        return result
    },
    // 删除工单
    async workOrderDelete (...rest) {
        const result = await workOrderDelete(rest[1])
        return result
    },
    // 提交审核工单
    async workOrderSubmit (...rest) {
        const result = await workOrderSubmit(rest[1])
        return result
    },
    // 取消审批
    async workOrderCancel (...rest) {
        const result = await workOrderCancel(rest[1])
        return result
    },
    // 获取操作票
    async getTickets (...rest) {
        const result = await getTickets(rest[1])
        return result
    },
    // 新建工单提交
    async submitOrder (...rest) {
        const result = await submitOrder(rest[1])
        return result
    },
    // 工单附件上传
    async orderUpload (...rest) {
        const result = await orderUpload(rest[1])
        return result
    },
    // 获取设备
    async getEquiplist (...rest) {
        const result = await getEquiplist(rest[1])
        return result
    },
    // 获取设备和类型
    async getEquipAndType (...rest) {
        const result = await getEquipAndType(rest[1])
        return result
    },
    //获取工单详情
    async getOrderDetail (...rest) {
        const result = await getOrderDetail(rest[1])
        return result
    },
    // 工单编辑详情
    async getOrderEdit (...rest) {
        const result = await getOrderEdit(rest[1])
        return result
    }
}

// function getCookie (name) {
//     let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
//     let arr = document.cookie.match(reg)
//     if (arr) {
//         return unescape(arr[2]);
//     } else {
//         return null;
//     }
// }
function getUserId () {
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {}
    return userInfo.userId
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        BigScreen: bigScreen,
        WS: websocket,
        ZNYW: znyw
    }
})

