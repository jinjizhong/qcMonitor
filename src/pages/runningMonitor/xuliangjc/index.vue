<template>
  <div>
    <topHeader thirdName="回路" equType="1" anaType="Xuliangjiance" @change="handleTopChange"
      @topInfoSelect="topInfoSelect">
      <div class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">时间选择：</p>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期" @change="handleDate" :clearable="false" />
        <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
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
      <div class="top_content">
        <div class="flex title">
          <img class="title-logo" src="../../../assets/image/admin/icon_yxsj.png" /><span>需量监测</span>
        </div>
        <div class="line">
          <p class="title-line" />
        </div>
        <barCharts barWidth="100%" barHeight="300" :dataList="dianliujcLineY" unit="A" :xName="dianliujcLineX"
          :axisXInterval="axisXInterval" />
      </div>
      <div :class="{ flex_row: $isPc, flex_column: !$isPc }">
        <tableList class="bottom_content" :listContent="dtData" tableHeight="355">
          <el-table-column prop="showtime" label="时间" />
          <el-table-column prop="需量" label="需量" />
        </tableList>
        <pieCharts titleText="当日需量数据概览" :hasTitle="hasTitle" pieHeight="419" pieWidth="500" :dataList="pieData">
        </pieCharts>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import topHeader from '../../../components/topHeader/index'
import tableList from '../../../components/deviceTableList/table_list'
import barCharts from '../../../components/barCharts/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import { getDate, formatTime } from '../../../assets/js/common.js'
// import { deviceInfoList } from '../../assets/js/config.js'
export default {
  name: 'xuliangjc',
  components: {
    topHeader,
    tableList,
    barCharts,
    pieCharts
  },
  // computed: mapState(['topInfo']),
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      categoryAndDataDim: [],
      equipAttr: [],
      workAndCommState: [],
      selectDeviceValue: [],
      listContent: this.jianceState,
      timeType: '15',
      axisXInterval: 3,
      startTime: currentDate,
      fenlei: '',
      leixing: '',
      dateAll: '',
      dateHours: '',
      pieData: [],
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
        //   name: '1小时',
        //   value: 'hour'
        // },
        // {
        //   id: '3',
        //   name: '周',
        //   value: 'week_day'
        // },
        {
          id: '2',
          name: '月',
          value: 'month_day'
        }
        // {
        //   id: '5',
        //   name: '年',
        //   value: 'year'
        // }
      ],
      dianliujcLineX: [],
      dianliujcLineY: [],
      dtData: [],
      hasTitle: false
    }
  },
  created () { },
  mounted () { },
  methods: {
    // 获取头部信息
    topInfoSelect (value) {
      this.selectDeviceValue = value
      this.loadData()
    },
    // 获取需量监测数据
    loadData () {
      let [, siteFid, equFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        anaType: 'Xuliangjiance',
        startTime: this.startTime,
        endTime: '',
        timeType: this.timeType
      }
      this.$store.dispatch('getXuliang', data).then(res => {
        let { timeCell, xulaingCell, dtData } = res
        let series = {
          name: '需量',
          type: 'line',
          connectNulls: true, //将断点连接
          data: xulaingCell
        }
        this.dianliujcLineX = timeCell
        this.dianliujcLineY.push(series)
        this.dtData = dtData
        this.pieData = res.pieCharts
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
        //     }
        //   } else {
        //     for (let j of res.data) {
        //       series.data.push(j[item])
        //     }
        //     this.dianliujcLineY.push(series)
        //   }
        // }
      })
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.loadData()
    },
    // 选择日期
    handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D h:m:s')
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
    },
    // 选择数组类型
    handleShuzhi (value) {
      this.leixing = value
      this.dianliujcLineY = []
      this.dianliujcLineX = []
      this.loadData()
    },
    // 选择时间
    handleTime (value) {
      if (value == 'week_day' || value == 'month_day') {
        this.axisXInterval = null
      } else {
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
  flex: 1;
  height: 419px;
}

.top_content {
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
