import request from './request.js'
const base_url = `${process.env.VUE_APP_BASEURL}/__sys/api/api/web`
const base_new_url = `${process.env.VUE_APP_BASEURL}/__sys/WebApiUser/api`
// const base_new_url = `https://e.intellqc.com/__sys/WebApiUser/api`

/* --------------登录权限基本信息接口---------------*/

// 登录
export const userLogin = (data) => request.axiosHttp(`${base_new_url}/Login`, data)

// 登出
export const userloginOut = (data) => request.axiosHttp(`${base_new_url}/LoginOut`, data, 'GET')

// 是否需要踢出
export const userLoginKick = (data) => request.axiosHttp(`${base_new_url}/KickOut`, data, 'GET')

// 是否已经登录
export const isLogin = (data) => request.axiosHttp(`${base_new_url}/IsLogin`, data, 'GET')

// 当前登录用户信息 
export const userInfo = (data) => request.axiosHttp(`${base_new_url}/UserInfo`, data, 'GET')

// 当前登录用户ID
export const userId = (data) => request.axiosHttp(`${base_new_url}/UserId`, data, 'GET')

// 获取快捷入口
export const quickEntry = (data) => request.axiosHttp(`${base_new_url}/QuickEntry`, data)

// 设置快捷入口
export const quickMenu = (data) => request.axiosHttp(`${base_new_url}/QuickMenu`, data)

// 修改我的密码
export const modifyPassword = (data) => request.axiosHttp(`${base_new_url}/ModifyPassword`, data)

// 站点登录获取相关信息
export const siteLoginInfo = (data) => request.axiosHttp(`${base_new_url}/SiteLoginInfo`, data, 'GET')

// 个人中心数据
export const personalCenter = (data) => request.axiosHttp(`${base_new_url}/PersonalCenter`, data)

// 获取头部通知栏
export const getHeaderMessage = (data) => request.axiosHttp(`${base_new_url}/Msg`, data)

// 获取地图的请求数据
export const getMaps = () => request.axiosHttp(`${base_url}/Map`)





/* --------------智能运维数据接口---------------*/

// 客户运维首页右上角部分
export const getClientYwHome = (data) => request.axiosHttp(`${base_url}/HomeClientYW_Factor`, data)

// 客户运维首页数据
export const getClientYw = (data) => request.axiosHttp(`${base_url}/HomeClientYW`, data)

// 获取头部信息
export const getTopInfo = (data) => request.axiosHttp(`${base_url}/Top`, data)

// 获取设备基本信息
export const getEquipInfo = (data) => request.axiosHttp(`${base_url}/EquipInfo`, data)

// 获取监测数据
export const getMonitorData = (data) => request.axiosHttp(`${base_url}/MonitorData`, data)

// 获取运行监测数据
export const loadData = (data) => request.axiosHttp(`${base_url}/LoadData`, data)

// 获取需量监测数据
export const getXuliang = (data) => request.axiosHttp(`${base_url}/XliangJc`, data)

// 获取预警告警数据
export const getPolicy = (data) => request.axiosHttp(`${base_url}/AlertResult`, data)

// 获取告警监测数据列表
export const getPolicyList = (data) => request.axiosHttp(`${base_url}/AlertInfoList`, data)

// 获取客户
export const getClient = (data) => request.axiosHttp(`${base_url}/GetClient`, data)

// 获取站点
export const getSite = (data) => request.axiosHttp(`${base_url}/GetSite`, data)

// 获取设备
export const getEquip = (data) => request.axiosHttp(`${base_url}/GetEquip`, data)

// 获取接线图
export const getSiteSvg = (data) => request.axiosHttp(`${base_url}/SiteSvg`, data)

// 获取班组
export const getYwTeam = (data) => request.axiosHttp(`${base_url}/Team`, data)

// 获取变压器损耗
export const transformerLossMan = (data) => request.axiosHttp(`${base_url}/TransformerLossMan`, data)

// 获取报告列表
export const getReport = (data) => request.axiosHttp(`${base_url}/Report`, data)

// 获取报告详情
export const getReportDetail = (data) => request.axiosHttp(`${base_url}/GetReportData`, data)

// 实时视频
export const realtimeVideo = (data) => request.axiosHttp(`${base_url}/RealtimeVideo`, data)

// 工单分析
export const workOrderAnalysis = (data) => request.axiosHttp(`${base_url}/WorkOrderAnalysis`, data)

// 运维班组
export const getTeamList = (data) => request.axiosHttp(`${base_url}/GetTeamList`, data)

// 健康度
export const getHealth = (data) => request.axiosHttp(`${base_url}/TransformerHealth`, data)

// 运维分析报警
export const getYwPolicy = (data) => request.axiosHttp(`${base_url}/AlertAnalysisYunWei`, data)

// 客户分析报警
export const getKhPolicy = (data) => request.axiosHttp(`${base_url}/AlertAnalysis`, data)

// 告警平均处理时间
export const alertAvgHandleTimeYunWei = (data) => request.axiosHttp(`${base_url}/AlertAvgHandleTimeYunWei`, data)

// 告警平均处理时间
export const alertAvgHandleTime = (data) => request.axiosHttp(`${base_url}/AlertAvgHandleTime`, data)

// 城市
export const getCity = (data) => request.axiosHttp(`${base_url}/GetCity`, data)

// 获取区域的接口
export const getArea = (data) => request.axiosHttp(`${base_url}/GetArea`, data)

// 站内监测
export const loadAreaEquip = (data) => request.axiosHttp(`${base_url}/LoadAreaEquip`, data)

// 获取测点名和测点Id
export const getNexiaoOption = (data) => request.axiosHttp(`${base_url}/GetNexiaoOption`, data)

// 获取后台管理客户首页数据
export const getAdminData = (data) => request.axiosHttp(`${base_url}/UserHome`, data)

// 获取站点区域检测数据
export const getSiteAreaData = (data) => request.axiosHttp(`${base_url}/LoadAreaXiaofang`, data)

// 获取告警详情
export const getAlertDetail = (data) => request.axiosHttp(`${base_url}/AlertDetail`, data)

// 获取告警设备列表
export const getAlertInfoListByEquip = (data) => request.axiosHttp(`${base_url}/AlertInfoListByEquip`, data)

// 告警列表处理
export const getAlertSaveData = (data) => request.axiosHttp(`${base_url}/AlertSaveData`, data)

// 告警列表处理查看状态
export const alertUpdateState = (data) => request.axiosHttp(`${base_url}/AlertUpdateState`, data)

// 获取运维内部报告列表
export const getReportYWInsiderList = (data) => request.axiosHttp(`${base_url}/ReportYW_GetDataList`, data)

// 获取运维内部报告列表
export const findAllReports = (data) => request.axiosHttp(`${base_url}/FindAllReports`, data)

// 获取内部运维或能效报告详情
export const findReportDetail = (data) => request.axiosHttp(`${base_url}/FindReportDetail`, data)

// 根据Id查询运维或能效报告
export const findReportById = (data) => request.axiosHttp(`${base_url}/FindReportById`, data)

// 逻辑删除内部运维或者能效报告
export const deleteReportById = (data) => request.axiosHttp(`${base_url}/DeleteReportById`, data)

// 保存添加内部运维或者能效报告
export const saveReport = (data) => request.axiosHttp(`${base_url}/SaveReport`, data)

// 发送内部运维或者能效报告
export const sendReport = (data) => request.axiosHttp(`${base_url}/SendReport`, data)

// 生成报告内容（reportId）
export const createReportDataAndContent = (data) => request.axiosHttp(`${base_url}/CreateRpoertDataAndContent`, data)




/* -------------------能效管理数据接口---------------------*/

// 能效客户首页头部数据
export const nxKehuHeader = (data) => request.axiosHttp(`${base_url}/NengXiaoHomeHeader`, data)

// 能效客户首页电能使用
export const nxKehuElecUsed = (data) => request.axiosHttp(`${base_url}/NengXiaoHomeElectricUsed`, data)

// 能效客户首页稳态电能
export const nxWenTai = (data) => request.axiosHttp(`${base_url}/NengXiaoHomeWenTaiDianNeng`, data)

// 能效客户首页前十项排序
export const equipTop10 = (data) => request.axiosHttp(`${base_url}/NengXiaoHomeEquipTop10`, data)

// 设备类型
export const equipType = (data) => request.axiosHttp(`${base_url}/EquipType`, data)

// 主要数据
export const nxHomeYunWei = () => request.axiosHttp(`${base_url}/NengXiaoHomeYunWei`)

// 用户排行数据
export const nxHomeRank = (data) => request.axiosHttp(`${base_url}/NengXiaoHomeYunWeiUserRanking`, data)

// 电费分析主要数据
export const electricityTariff = (data) => request.axiosHttp(`${base_url}/ElectricityTariff`, data)

// 电费分析力率
export const electricityTariff2 = (data) => request.axiosHttp(`${base_url}/ElectricityTariff2`, data)

// 获取电压偏差分析数据
export const dianyapiancha = (data) => request.axiosHttp(`${base_url}/Dianyapiancha`, data)

// 获取三相电压不平衡数据
export const sanxiang = (data) => request.axiosHttp(`${base_url}/Sanxiang`, data)

// 获取谐波分析数据
export const xiebo = (data) => request.axiosHttp(`${base_url}/Xiebo`, data)

//获取谐波畸变数据
export const xiebojb = (data) => request.axiosHttp(`${base_url}/XieboMax95`, data)

// 工单管理所有接口
export const workOrderList = (data) => request.axiosHttp(`${base_url}/WO_GetDataList`, data)//工单列表
export const teamManager = (data) => request.axiosHttp(`${base_url}/TeamManager`, data)//项目组负责人
export const workOrderDelete = (data) => request.axiosHttp(`${base_url}/WO_Delete`, data)//删除工单
export const workOrderSubmit = (data) => request.axiosHttp(`${base_url}/WO_Submit`, data)//提交审批
export const workOrderCancel = (data) => request.axiosHttp(`${base_url}/WO_CancleApproval`, data)//取消审批
export const getTickets = () => request.axiosHttp(`${base_url}/GetTicketTemplate`)//操作票
export const submitOrder = (data) => request.axiosHttp(`${base_url}/WO_SaveData`, data)//工单新增提交
export const getEquiplist = (data) => request.axiosHttp(`${base_url}/Get1Equip`, data)//根据设备类型获取设备
export const orderUpload = (data) => request.axiosHttp(`${base_url}/WO_Attachment`, data)//工单附件上传
export const getEquipAndType = (data) => request.axiosHttp(`${base_url}/Get1EquipAndType`, data)//获取类型和设备
export const getOrderDetail = (data) => request.axiosHttp(`${base_url}/WO_GetDataDetail`, data)//获取工单详情
export const getOrderEdit = (data) => request.axiosHttp(`${base_url}/WO_Edit`, data)//工单编辑获取详情
/* ------------------大屏数据接口-----------------*/

// 获取右屏数据
export const getRightScreen = () => request.axiosHttp(`${base_url}/RightScreen`)
// 获取中屏数据
export const getCenterScreen = () => request.axiosHttp(`${base_url}/BigScreenCenter`)
// 中屏报警信息
export const getAlert = (data) => request.axiosHttp(`${base_url}/Alert`, data)
// 中屏取消报警接口
export const alertScanned = (data) => request.axiosHttp(`${base_url}/AlertScanned`, data)
// 获取左屏数据
export const getLeftScreen = () => request.axiosHttp(`${base_url}/LeftScreen`)
// 获取左屏中间的数据
export const getLeftMidData = (data) => request.axiosHttp(`${base_url}/LeftScreenBySite`, data)
// 获取左屏右下角的数据
export const getLeftRightBottom = (data) => request.axiosHttp(`${base_url}/ClientCommState`, data)
// 获取车载左侧实时报警列表数据
export const getCarHomeLeftList = (data) => request.axiosHttp(`${base_url}/CarHomeLeftScriptList`, data)
// 获取车载左侧实时报警详情数据
export const getCarHomeLeftDetails = (data) => request.axiosHttp(`${base_url}/CarHomeLeftScriptInfo`, data)
// 获取车载右侧实时工单数据
export const getCarHomeRightList = (data) => request.axiosHttp(`${base_url}/CarHomeRightScriptList`, data)
// 获取车载右侧工单详情数据
export const getCarHomeRightDetails = (data) => request.axiosHttp(`${base_url}/CarHomeRigthScriptInfo`, data)
// 获取车载右侧班组成员
export const getTeamMember = (data) => request.axiosHttp(`${base_url}/TeamMember`, data)
// 地图车辆获取
export const getTeamCar = (data) => request.axiosHttp(`${base_url}/TeamCar`, data)

// 大屏测试接口（左屏）
export const testLeftData = () => request.axiosHttp(`${base_url}/LeftScreenData_Yanshi`)
export const testLeftClient = () => request.axiosHttp(`${base_url}/ClientCommState_Yanshi `)
export const testLeftBySite = (data) => request.axiosHttp(`${base_url}/LeftScreenDataBySite_Yanshi`, data)