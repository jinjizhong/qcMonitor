<template>
  <div>
    <topHeader :equType="this.dmData.equType" :anaType="this.dmData.anaType" :chooseMyId="chooseMyId"
      @change="handleTopChange" @topInfoSelect="topInfoSelect"></topHeader>
    <div :class="{ flex_row: $isPc, flex_column: !$isPc }">
      <deviceInfo :deviceName="deviceName" :runningStatus="runningStatus" :communicateStatus="communicateStatus"
        :equipImage="equipImage" :deviceInfoList="equipAttr" @warnDataBtn="warnDataBtn" :warnData="warnData"
        :isOpenStatus="isOpenStatus" :txShow="txShow"></deviceInfo>
      <div class="right_content">
        <tableList class="right-top" title="监测数据" :listContent="listContent" :btnData="btnData" @btnClick="btnClick"
          :status="tableStatus" :tLoad="tLoad">
          <el-table-column prop="No" label="序号" />
          <el-table-column prop="canShu" label="监测内容" />
          <el-table-column v-if="this.lxType == 2" prop="value" label="监测值">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.refValue" effect="dark" :content="scope.row.refValue" placement="top-start"
                trigger="hover" width="50">
                <!-- <span>{{ scope.row.refValue }}</span> -->
                <div slot="reference">
                  <p class="flex_row_yCenter" v-if="scope.row.alertType == 0">
                    <span style="color:#FF3636; margin-right: 10px;">{{
                      scope.row.value
                    }}</span>
                    <img width="10" height="16" src="../../assets/image/admin/icon_ss.png" alt="img" />
                  </p>
                  <p v-else-if="!scope.row.isAlert">
                    <span style="color:#333333; margin-right: 10px;">{{
                      scope.row.value
                    }}</span>
                  </p>
                  <p class="flex_row_yCenter" v-else>
                    <span style="color:#3FB820; margin-right: 10px;">{{
                      scope.row.value
                    }}</span>
                    <img width="10" height="16" src="../../assets/image/admin/icon_xj.png" alt="img" />
                  </p>
                </div>
              </el-popover>
              <span v-else>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="this.lxType == 1 || this.lxType == 0" prop="value" label="状态">
            <template slot-scope="scope">
              <div :class="{
                  color_dz: scope.row.value == 1,
                  color_fg: scope.row.value == 0
                }"></div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="监测时间" />
        </tableList>
        <div class="right-bottom">
          <div class="flex title">
            <img class="title-logo" src="../../assets/image/admin/icon_yxsj.png" /><span>运行数据</span>
          </div>
          <div class="line">
            <p class="title-line" />
          </div>
          <div class="flex bottom_mar">
            <div class="flex" style="width: 25%;">
              <p v-if="$isPc" class="p-title">测点分类：</p>
              <el-select v-model="fenlei" placeholder="请选择分类" @change="cedian">
                <el-option v-for="(item, index) in classList" :key="index" :label="item.CategoryName"
                  :value="item.CategoryName" />
              </el-select>
            </div>
            <div v-if="dataDim" class="flex" style="padding-left: 2%;width: 25%;">
              <p v-if="$isPc" class="p-title">数值类型：</p>
              <el-select v-model="leixing" placeholder="请选择数据类型" @change="handleShuzhi">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </div>
            <div v-if="$isPc" class="flex" style="padding-left: 2%;width: 45%;">
              <p class="p-title">时间选择：</p>
              <!-- <el-select class="time1" v-model="dateAll" placeholder="请选择">
								<el-option v-for="(item, index) in dateAllList" :key="index" :label="item.name" :value="item.value" />
							</el-select> -->
              <el-date-picker v-model="startTime" type="date" placeholder="选择日期" @change="handleDate"
                :clearable="false" />
              <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
                <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </div>
          </div>
          <!-- :yList="[{ min: 0, max: 1200, interval: 200 }]" -->
          <div style="position: relative;">
            <barCharts v-if="!isTable" barWidth="100%" barHeight="300" :unitL="unitL" :dataList="yunxingData.y"
              :xName="yunxingData.x" :gridPos="gridPos" :axisXInterval="axisXInterval" needToolBox />
            <div class="item-list-content" v-else>
              <el-table height="300" :data="loadDataTable" stripe style="width: 100%;">
                <template v-for="(item, key) in tableFields">
                  <el-table-column :key="key" :prop="item" :label="item"></el-table-column>
                </template>
              </el-table>

            </div>
            <JsonExcel class="download_icon" :data="loadDataTable" :name="exportName">
              <img src="../../assets/image/admin/icon_xiazai.png" alt="img">
              <!-- <img src="download_icon.png" /> -->
            </JsonExcel>
            <img class="table_icon" @click="exchangeTable" :src="iconExchange" alt="img">
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="policyTitle" :visible.sync="dialogVisible">
      <el-table :data="gridData" height="600">
        <el-table-column property="CanShuName" label="参数名" />
        <el-table-column property="addtime" label="时间" />
        <el-table-column property="AlertInfo" label="报警信息" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JsonExcel from 'vue-json-excel'
import topHeader from '../../components/topHeader/index'
import deviceInfo from '../../components/deviceInfo/index'
import tableList from '../../components/deviceTableList/table_list'
import barCharts from '../../components/barCharts/index'
import { getDate, formatTime } from '../../assets/js/common.js'
import { deviceInfoList } from '../../assets/js/config.js' // unitData

export default {
  name: '',
  // 设备监测页面配置参数
  props: {
    dmData: {
      type: Object,
      default () {
        return {
          name: '', // 页面名称
          equType: '', // loopOrEquip配置
          anaType: '',
          isOpenStatus: false, // 开关or运行状态
          txShow: false, // 是否展示通讯状态
          tableStatus: [], // 监测数据中状态数据显示
          typeList: [], // 数值类型选项
          leixing: '', // 初始类型值
          tLoad: false
        }
      }
    },
  },
  components: {
    topHeader,
    deviceInfo,
    tableList,
    barCharts,
    JsonExcel
  },
  computed: mapState(['topInfo', 'equipInfo', 'dianliujc', 'headerEquip', 'routeObjSave']),
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      unitL: '',
      deviceName: '', //设备名称
      chooseMyId: '',
      timer: null,
      axisXInterval: 3,
      lxType: 0,
      communicateStatus: null,
      runningStatus: null,
      pickerVisible: false,
      result: '',
      categoryAndDataDim: [],
      equipAttr: [],
      dialogVisible: false,
      isOpenStatus: this.dmData.isOpenStatus,
      txShow: this.dmData.txShow,
      policyTitle: '',
      exportName: '', //输出execl名
      iconExchange: require('../../assets/image/admin/icon_liebiao.png'),
      classList: [],
      gridData: [],
      equipImage: '',
      workAndCommState: [],
      selectDeviceValue: [],
      timeType: '15',
      startTime: currentDate,
      listContent: [],
      loadDataTable: [],
      jianceData: [],
      jianceState: [],
      fenlei: '',
      leixing: this.dmData.leixing,
      dateAll: '',
      btnData: [
        {
          id: 1,
          name: '状态',
          type: 1
        },
        {
          id: 2,
          name: '数据',
          type: 0
        }
      ],
      tableStatus: this.dmData.tableStatus,
      typeList: this.dmData.typeList,
      dateYearList: [],
      dateHoursList: [
        {
          id: '1',
          name: '日',
          value: '15'
        },
        // {
        //   id: '2',
        //   name: '周',
        //   value: 'week_day'
        // },
        {
          id: '2',
          name: '月',
          value: 'month_day'
        }
      ],
      yunxingData: {
        y: [
          {
            name: '',
            type: '',
            // yAxisIndex: 1, Y轴
            data: []
          }
        ],
        x: []
      },
      gridPos: [30, 50, 30, 50],
      dataDim: null,
      warnData: [],
      isTable: false,
      tableFields: []
    }
  },
  created () {
    this.chooseMyId = this.routeObjSave.id || ''
  },
  mounted () {
  },
  beforeDestory () {
    clearInterval(this.timer)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  watch: {
    routeObjSave: {
      handler () {
        // console.log(e, 'lpllplp')
      },
      deep: true
    },
  },
  methods: {
    show () {
      this.pickerVisible = true
    },
    topInfoSelect (value) {
      clearInterval(this.timer)
      this.selectDeviceValue = value
      let deviceData = this.headerEquip.length > 0 ? this.headerEquip.filter(item => item.value == value[2]) : null
      if (deviceData) {
        this.deviceName = deviceData[0].label
        this.getEquipInfo()
        this.getMonitorData()
        this.timer = setInterval(this.getMonitorData, 5000)
      } else {
        // 置空处理
        this.deviceName = ''
        this.equipImage = ''
        this.equipAttr = []
        // this.warnData = []
        this.listContent = []
        this.yunxingData = {
          y: [
            {
              name: '',
              type: 'line',
              data: []
            }
          ],
          x: []
        }
      }
      // this.loadData()
    },
    /* 加载运行数据 */
    loadData () {
      /* 电容器的运行数据*/
      const that = this
      let [, siteFid, equFid, equName] = that.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        anaType: that.dmData.anaType,
        startTime: that.startTime,
        endTime: '',
        isDim: that.dataDim ? that.leixing : '', //max,min,avg
        timeType: that.timeType,
        dataType: 0,
        categoryName: that.fenlei
      }
      // 初始化赋值空
      that.yunxingData = {
        y: [],
        x: []
      }
      that.timeName = that.dateHoursList.filter(item => item.value == that.timeType)
      that.exportName = `${that.dmData.name}-${equName}(${that.timeName[0].name}).xls` // 输出excel名
      that.$store.dispatch('loadData', data).then(res => {
        if (res) {
          that.loadDataTable = res.dataTable
          that.tableFields = []
          that.unitL = res.danwei || ''
          for (let key in res.dataTable[0]) {
            that.tableFields.push(key)
          }
          that.yunxingData.x = res.data[0].data
          let arr = res.data.filter(i => i.name !== 'showtime')
          for (let i = 0; i < arr.length; i++) {
            arr[i].type = that.fenlei == '有功电量' || that.fenlei == '无功电量' ? 'bar' : 'line'
            arr[i].connectNulls = true //将断点连接
            that.yunxingData.y.push(arr[i])
          }
          that.yunxingData.x = res.data[0].data
        } else {
          that.yunxingData = {
            y: [],
            x: []
          }
        }
      })
    },
    // 获取设备基本信息
    getEquipInfo () {
      const that = this
      let [, siteFid, equipFid] = that.selectDeviceValue
      let data = {
        siteFid,
        equipFid,
        anaType: that.dmData.anaType
      }
      that.$store.dispatch('getEquipInfo', data).then(res => {
        let {
          categoryAndDataDim,
          equipAttr,
          workAndCommState,
          equipImage,
          alertCount
        } = that.equipInfo
        that.categoryAndDataDim = categoryAndDataDim
        that.equipAttr = equipAttr.length > 0 ? equipAttr : deviceInfoList
        that.workAndCommState = workAndCommState

        that.classList = res.categoryAndDataDim
        that.fenlei = res.categoryAndDataDim[0].CategoryName
        // that.unitL = unitData[that.fenlei] //初始化测点单位
        that.dataDim = res.categoryAndDataDim[0].DataDim || null

        that.runningStatus = workAndCommState[0].Values[0][1]
        that.communicateStatus = workAndCommState[0].Values[0][2]

        that.equipImage = equipImage
        that.warnData = alertCount
        that.loadData()
      })
      // .catch(error => {
      //         console.log('ll', error)
      //       })
    },
    // 获取监测数据
    getMonitorData () {
      let [, siteFid, equipFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equipFid
      }
      this.$store.dispatch('getMonitorData', data).then(res => {
        this.jianceData = res.data
        this.jianceState = res.state
        if (this.lxType == 1) {
          this.listContent = this.jianceState
        } else if (this.lxType == 2) {
          this.listContent = this.jianceData
        } else {
          this.listContent = this.jianceState
        }
        this.tLoad = false
      })
    },
    //tableBtn
    btnClick (item) {
      clearInterval(this.timer)
      this.tLoad = true
      this.lxType = item.id
      for (let i of this.listContent) {
        i.value = ''
      }
      if (item.id == 2) {
        this.tableStatus = [
          {
            name: '正常',
            type: 0
          },
          {
            name: '预警',
            type: 1
          },
          {
            name: '告警',
            type: 2
          }
        ]
      } else if (item.id == 1) {
        this.tableStatus = this.dmData.tableStatus
      }
      this.getMonitorData()
      this.timer = setInterval(this.getMonitorData, 5000)
    },
    handleTopChange (value) {
      if (value && value.length == 0) {
        // 做清空
        this.yunxingData = {
          y: [
            {
              name: '',
              type: 'line',
              // yAxisIndex: 1, Y轴
              data: []
            }
          ],
          x: []
        }
        this.categoryAndDataDim = []
        this.equipAttr = []
        this.workAndCommState = []
        this.classList = []
        this.fenlei = ''
        this.listContent = []
        this.deviceName = ''
        clearInterval(this.timer)
      } else {
        clearInterval(this.timer)
        this.selectDeviceValue = value || []
        let deviceData = this.headerEquip.filter(item => item.value == value[2])
        this.deviceName = deviceData[0].label
        this.getEquipInfo()
        this.getMonitorData()
        this.timer = setInterval(this.getMonitorData, 5000)
        // this.loadData()
      }
    },
    // 选择数值类型
    handleShuzhi () {
      this.yunxingData = {
        y: [
          {
            name: '',
            type: 'line',
            data: []
          }
        ],
        x: []
      }
      this.loadData()
    },
    //测点分类
    cedian () {
      // if (value == '有功电量') {
      //   // this.unitL = unitData[value]
      // }
      this.loadData()
    },
    //日期选择
    handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D h:m:s')
      this.yunxingData = {
        y: [
          {
            name: '',
            type: 'line',
            data: []
          }
        ],
        x: []
      }
      this.loadData()
    },
    //时间 选择
    handleTime (value) {
      this.timeType = value
      if (value == 'week_day' || value == 'month_day') {
        this.typeList = [
          {
            id: '1',
            name: '最小值',
            value: 'min'
          },
          {
            id: '2',
            name: '平均值',
            value: 'avg'
          },
          {
            id: '3',
            name: '最大值',
            value: 'max'
          }
        ]
        this.leixing = 'avg'
        this.axisXInterval = null
      } else {
        this.typeList = [
          {
            id: '1',
            name: '采样值',
            value: ''
          }
        ]
        this.leixing = ''
        this.axisXInterval = 3
      }
      this.yunxingData = {
        y: [
          {
            name: '',
            type: 'line',
            data: []
          }
        ],
        x: []
      }
      this.loadData()
    },
    /* 格式化时间 */
    formatDate (timeInfo) {
      let dates1 = timeInfo.split('T')
      let time1 = dates1[1]
      let dates2 = time1.split(':')
      return dates2[0] + ':' + dates2[1]
    },
    // 报警预警按钮
    warnDataBtn (type) {
      let [, , equipFid] = this.selectDeviceValue
      // let anaType = this.dmData.anaType
      // let level = null
      if (type == 'gj') {
        // level = '1,2'
        // let scanState = this.warnData[0] == 0 ? '' : 0
        this.policyTitle = '告警'
        // let propsData = {
        //   name: 'Gaojingjc',
        //   params: `?anaType=${anaType}&equipFid=${equipFid}&alertLevel=${level}&scanState=${scanState}`
        // }
        // this.$store.dispatch('propsRouteData', propsData)
        let bjLevel = '2'
        let propsData = {
          name: 'Gaojingjc',
          params: `?bjLevel=${bjLevel}&equipFid=${equipFid}`,
          isReload: null
        }
        this.$store.dispatch('propsRouteData', propsData)
      } else if (type == 'yj') {
        // level = '0'
        // let scanState = this.warnData[1] == 0 ? '' : 0
        this.policyTitle = '预警'

        let bjLevel = '0'
        let propsData = {
          name: 'Gaojingjc',
          params: `?bjLevel=${bjLevel}&equipFid=${equipFid}`,
          isReload: null
        }
        this.$store.dispatch('propsRouteData', propsData)
        //parent.addTab('告警监测', `/bukong/hisdata.aspx?anaType=${anaType}&equipFid=${equipFid}&alertLevel=${level}&scanState=${scanState}`)
      }
    },
    // 数据视图切换
    exchangeTable () {
      this.isTable = !this.isTable
      if (this.isTable) {
        this.iconExchange = require('../../assets/image/admin/icon_zhexiantu.png')
      } else {
        this.iconExchange = require('../../assets/image/admin/icon_liebiao.png')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media screen and (max-width: 700px) {
  .title-line {
    width: 90px !important;
  }

  .title {
    font-size: 14px !important;
  }

  .title-logo {
    height: 12px !important;
    width: 10px !important;
  }
}

.right-top {
  min-height: 360px;
}

.right-bottom {
  min-height: 410px;
  margin-left: 2%;
  margin-right: 2%;
  position: relative;
}

/* 右边底部的title */
.flex {
  display: flex;
  align-items: center;
}

.line {
  position: relative;
  height: 1px;
  background-color: #cccccc;
}

.title-line {
  position: absolute;
  height: 2px;
  width: 110px;
  background-color: #1277d2;
}

.title {
  height: 45px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}

.title-logo {
  width: 21px;
  height: 16px;
  padding-left: 6px;
  margin-right: 6px;
}

.bottom_mar {
  margin-top: 15px;
}

.p-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.color_dz {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ff3636;
}
.color_fg {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #3fb820;
}
.item-list-content {
  width: 100%;
  height: 300px;
  margin-bottom: 5px;
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: scroll;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;

  .list-item {
    display: flex;
    align-items: center;
    height: 39px;

    .l1 {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
    }
  }

  .list-line {
    height: 1px;
    background: #eeeeee;
  }
}

.item-list-content::-webkit-scrollbar {
  display: none;
}
.download_icon {
  position: absolute;
  width: 16px;
  height: 16px;
  top: 6px;
  right: 60px;
  cursor: pointer;
}
.table_icon {
  position: absolute;
  width: 16px;
  height: 16px;
  top: 7px;
  right: 87px;
  cursor: pointer;
}
</style>
