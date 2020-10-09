<template>
  <div>
    <topHeader :thirdName="this.rmData.thirdName" :equType="this.rmData.equType" :anaType="this.rmData.anaType"
      :chooseMyId="chooseMyId" @change="handleTopChange" @topInfoSelect="topInfoSelect">
      <div class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">时间选择：</p>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期" @change="handleDate" :clearable="false" />
        <el-select v-if="$isPc" class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div v-if="timeType == 'week_day' || timeType == 'month_day'" class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title">数值类型：</p>
        <el-select @change="handleShuzhi" v-model="leixing" placeholder="请选择数据类型">
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
    </topHeader>
    <div style="background-color: #ffffff;">
      <div class="top_content" ref="topContent">
        <div class="flex title">
          <img class="title-logo" src="../../assets/image/admin/icon_yxsj.png" /><span>{{this.rmData.name}}</span>
        </div>
        <div class="line">
          <p class="title-line" />
        </div>
        <barCharts :barWidth="barWidth" barHeight="300" :dataList="dianliujcLineY" :unitL="unitL"
          :xName="dianliujcLineX" :chartColorList="chartColorList" :axisXInterval="axisXInterval" />
      </div>
      <tableList class="bottom_content" :exportName="exportName" :listContent="dianliujc"
        :jsonFields="this.rmData.jsonFields" tableHeight="355" :isExport="this.dianliujc && this.dianliujc.length > 0">
        <template v-for="(item, key) in this.rmData.tableFields">
          <el-table-column :key="key" :prop="item.name"
            :label="`${item.name}${item.name=='时间'||unitL==''?'':`/${unitL}`}`">
          </el-table-column>
        </template>
        <!-- <el-table-column prop="showtime" label="时间" />
        <el-table-column prop="A相电流" label="A相电流/A" />
        <el-table-column prop="B相电流" label="B相电流/A" />
        <el-table-column prop="C相电流" label="C相电流/A" /> -->
      </tableList>
    </div>
  </div>
</template>

<script>
// import Home from '../Home/index'
import { mapState } from 'vuex'
import topHeader from '../../components/topHeader/index'
import tableList from '../../components/deviceTableList/table_list'
import barCharts from '../../components/barCharts/index'
import { getDate, formatTime } from '../../assets/js/common.js'
// import { deviceInfoList } from '../../assets/js/config.js'
export default {
  name: '',
  // 运行监测页面配置参数
  props: {
    rmData: {
      type: Object,
      default () {
        return {
          thirdName: '', // 设备or回路选项
          equType: '', // loopOrEquip配置
          anaType: '',
          name: '',
          // unitL: '',
          tableFields: [], // 表格配置
          jsonFields: {}, // excel表格配置
        }
      }
    },
  },
  components: {
    // Home,
    topHeader,
    tableList,
    barCharts
  },
  computed: mapState(['routeObjSave']),
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      axisXInterval: 3,
      chooseMyId: '',
      categoryAndDataDim: [],
      equipAttr: [],
      workAndCommState: [],
      selectDeviceValue: [],
      listContent: this.jianceState,
      timeType: '15',
      startTime: currentDate,
      fenlei: '',
      leixing: 'avg',
      dateAll: '',
      dateHours: '',
      dianliujc: [],
      unitL: '',
      exportName: '',
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
      dianliujcLineX: [],
      dianliujcLineY: [],
      chartColorList: ['#FF9239', '#18D671', '#FF3636', '#36ADFF', '#006FBC'],
      barWidth: '100%'
    }
  },
  created () {
    const that = this
    that.paramsDefault()
    // that.$nextTick(() => {
    //   that.barWidth = String(that.$refs.topContent.offsetWidth)
    // })
  },
  mounted () { },
  watch: {
    routeObjSave: {
      handler () {
        this.paramsDefault()
      },
      deep: true
    },
  },
  methods: {
    // 路由传参默认
    paramsDefault () {
      const that = this
      that.chooseMyId = that.routeObjSave.id || ''
      that.timeType = that.routeObjSave.timeType || '15'
      if (that.timeType == 'week_day' || that.timeType == 'month_day') {
        this.leixing = 'avg'
        this.axisXInterval = null
      } else {
        this.leixing = ''
        this.axisXInterval = 3
      }
      that.dianliujcLineY = []
      that.dianliujcLineX = []
      that.loadData()
    },
    topInfoSelect (value) {
      this.selectDeviceValue = value
      this.barWidth = String(this.$refs.topContent.offsetWidth)

      this.loadData()
    },
    // 获取运行监测数据
    loadData () {
      let [, siteFid, equFid, equName] = this.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        anaType: this.rmData.anaType,
        startTime: this.startTime,
        endTime: '',
        isDim: this.leixing,
        timeType: this.timeType,
        dataType: 0,
        categoryName: ''
      }
      this.timeName = this.dateHoursList.filter(item => item.value == this.timeType)
      this.exportName = `${this.rmData.name}-${equName}(${this.timeName[0].name}).xls` // 输出excel名
      this.dianliujcLineY = []
      this.dianliujc = []
      this.$store.dispatch('loadData', data).then(res => {
        // for (let item of Object.keys(res.data[0])) {
        //   let series = {
        //     name: item,
        //     type: 'line',
        //     data: []
        //   }
        //   if (item == 'showtime') {
        //     for (let j of res.data) {
        //       let showTime =
        //         this.timeType == 'hour' || this.timeType == '15'
        //           ? j.showtime.split('T')[1]
        //           : j.showtime.split('T')[0]
        //       this.dianliujcLineX.push(showTime)
        //       j.showtime = `${j.showtime.split('T')[0]} ${
        //         j.showtime.split('T')[1]
        //       }`
        //     }
        //   } else {
        //     for (let j of res.data) {
        //       series.data.push(j[item])
        //     }
        //     this.dianliujcLineY.push(series)
        //   }
        // }
        this.unitL = res.danwei || ''
        if (res && res.dataChart) {
          this.dianliujcLineX = res.dataChart[0].data
          let arr = res.dataChart.filter(i => i.name !== 'showtime')
          for (let i = 0; i < arr.length; i++) {
            arr[i].type = 'line'
            arr[i].connectNulls = true //将断点连接
            this.dianliujcLineY.push(arr[i])
          }
        }
        this.dianliujc = res.dataTable || []
        // 数据值大小自动调整数据颗粒度
      })
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
    },
    // 选择数组类型
    async handleShuzhi (value) {
      this.leixing = value
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
    },
    // 选择日期
    async handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D h:m:s')
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
    },
    // 选择时间
    handleTime (value) {
      if (value == 'week_day' || value == 'month_day') {
        this.leixing = 'avg'
        this.axisXInterval = null
      } else {
        this.leixing = ''
        this.axisXInterval = 3
      }
      this.timeType = value
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
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

.bottom_content {
  min-height: 385px;
}

.top_content {
  min-height: 385px;
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
  margin-bottom: 15px;
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
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
</style>
