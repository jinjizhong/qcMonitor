<template>
  <div>
    <topHeader equType="2" anaType="DongHaun-SF6" @change="handleTopChange" @topInfoSelect="topInfoSelect"></topHeader>
    <div :class="{ flex_row: $isPc, flex_column: !$isPc }">
      <deviceInfo deviceName="SF6" runningStatus="0" communicateStatus="0" :deviceInfoList="equipAttr" @warnDataBtn="warnDataBtn"></deviceInfo>
      <div class="right_content">
        <tableList class="right-top" title="监测数据" :listContent="listContent" :btnData="btnData" @btnClick="btnClick" :status="tableStatus">
          <el-table-column prop="canShu" label="监测内容" />
          <el-table-column prop="value" label="监测值">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover" width="50">
                <span>{{ scope.row.refValue }}</span>
                <div slot="reference">
                  <p class="flex_row_yCenter" v-if="scope.row.alertType == 0">
                    <span style="color:#FF3636; margin-right: 10px;">{{
                      scope.row.value
                    }}</span>
                    <img width="10" height="16" src="../../../assets/image/admin/icon_ss.png" alt="img" />
                  </p>
                  <p class="flex_row_yCenter" v-else>
                    <span style="color:#3FB820; margin-right: 10px;">{{
                      scope.row.value
                    }}</span>
                    <img width="10" height="16" src="../../../assets/image/admin/icon_xj.png" alt="img" />
                  </p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="监测时间" />
        </tableList>
        <div class="right-bottom">
          <div class="flex title">
            <img class="title-logo" src="../../../assets/image/admin/icon_yxsj.png" /><span>运行数据</span>
          </div>
          <div class="line">
            <p class="title-line" />
          </div>
          <div class="flex bottom-mar">
            <div class="flex" style="width: 25%;">
              <p v-if="$isPc" class="p-title">测点分类：</p>
              <el-select v-model="fenlei" placeholder="请选择分类" @change="cedian">
                <el-option v-for="(item, index) in classList" :key="index" :label="item.CategoryName" :value="item.CategoryName" />
              </el-select>
            </div>
            <div class="flex" style="padding-left: 2%;width: 25%;">
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
              <el-date-picker class="time2" v-model="startTime" type="date" placeholder="选择日期" @change="handleDate" :clearable="false" />
              <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
                <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </div>
          </div>
          <!-- :yList="[{ min: 0, max: 1200, interval: 200 }]" -->
          <barCharts barWidth="100%" barHeight="300" :dataList="yunxingData.y" unit="" :xName="yunxingData.x" />
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
import topHeader from '../../../components/topHeader/index'
import deviceInfo from '../../../components/deviceInfo/index'
import tableList from '../../../components/deviceTableList/table_list'
import barCharts from '../../../components/barCharts/index'
import { getDate, formatTime } from '../../../assets/js/common.js'

export default {
  name: 'sf6',
  components: {
    topHeader,
    deviceInfo,
    tableList,
    barCharts
  },
  computed: mapState([
    'topInfo',
    'equipInfo',
    'jianceData',
    'jianceState',
    'dianliujc'
  ]),
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      pickerVisible: false,
      result: '',
      categoryAndDataDim: [],
      equipAttr: [],
      dialogVisible: false,
      policyTitle: '',
      classList: [],
      gridData: [],
      workAndCommState: [],
      selectDeviceValue: [],
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
      tableStatus: [
        {
          name: '动作',
          type: 0
        },
        {
          name: '复归',
          type: 2
        }
      ],
      timeType: 'hour',
      startTime: currentDate,
      listContent: this.jianceState,
      fenlei: '',
      leixing: 'avg',
      dateAll: '',
      typeList: [
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
      ],
      dateYearList: [],
      dateHoursList: [
        {
          id: '1',
          name: '15分钟',
          value: '15'
        },
        {
          id: '2',
          name: '1小时',
          value: 'hour'
        },
        {
          id: '3',
          name: '周',
          value: 'week_day'
        },
        {
          id: '4',
          name: '月',
          value: 'month_day'
        }
      ],
      yunxingData: {
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
    }
  },
  created () { },
  mounted () {
    this.listContent = this.jianceState
  },
  methods: {
    show () {
      this.pickerVisible = true
    },
    topInfoSelect (value) {
      this.selectDeviceValue = value
      this.getEquipInfo()
      this.getMonitorData()
      this.loadData()
    },
    /* 加载运行数据 */
    loadData () {
      /* 电容器的运行数据*/
      let self = this
      let [, siteFid, equFid] = self.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        anaType: 'DongHaun-SF6',
        startTime: self.startTime,
        endTime: '',
        isDim: this.leixing, //max,min,avg
        timeType: self.timeType,
        dataType: 0,
        categoryName: this.fenlei
      }
      // 初始化赋值空
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
      self.$store.dispatch('loadData', data).then(res => {
        //console.log('哈哈哈哈哈',JSON.stringify(res))
        if (res) {
          for (let it of res.colCell) {
            self.yunxingData.y[0].name = it
            for (let ii of res.data) {
              let time = self.formatDate(ii.showtime)
              self.yunxingData.y[0].data.push(ii[it])
              self.yunxingData.x.push(time)
            }
          }
        } else {
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
      })
    },
    // 获取设备基本信息
    getEquipInfo () {
      let [, siteFid, equipFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equipFid,
        anaType: 'DongHaun-SF6'
      }
      this.$store.dispatch('getEquipInfo', data).then(res => {
        let { categoryAndDataDim, equipAttr, workAndCommState } = this.equipInfo
        this.categoryAndDataDim = categoryAndDataDim
        this.equipAttr = equipAttr
        this.workAndCommState = workAndCommState

        this.classList = res.categoryAndDataDim
        this.fenlei = res.categoryAndDataDim[0].CategoryName
        // this.workAndCommState[0].Values[0][1]
        // this.workAndCommState[0].Values[0][2]
      })
    },
    // 获取监测数据
    getMonitorData () {
      let [, siteFid, equipFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equipFid
      }
      this.$store.dispatch('getMonitorData', data).then(() => { })
    },
    //tableBtn
    btnClick (item) {
      if (item.id == 2) {
        this.listContent = this.jianceData
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
        this.listContent = this.jianceState
        this.tableStatus = [
          {
            name: '动作',
            type: 0
          },
          {
            name: '复归',
            type: 2
          }
        ]
      }
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.getEquipInfo()
      this.getMonitorData()
      this.loadData()
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
      // 请求数据
      this.dialogVisible = true
      let level = null
      if (type == 'gj') {
        level = '1,2'
        this.policyTitle = '告警'
      } else if (type == 'yj') {
        level = '0'
        this.policyTitle = '预警'
      }
      let [, , equipFid] = this.selectDeviceValue
      let data = {
        equipFid,
        alertLevel: level
      }
      this.$store.dispatch('getPolicy', data).then(res => {
        if (res.alert.length > 0) {
          for (let it of res.alert) {
            let time = it.addtime.split('T')
            let val = {
              AlertInfo: it.AlertInfo,
              addtime: time[0] + ' ' + time[1],
              CanShuName: it.CanShuName
            }
            this.gridData.push(val)
          }
        }
      })
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
  height: 419px;
}

.right-bottom {
  height: 419px;
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

.bottom-mar {
  margin-top: 15px;
}

.p-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
</style>
