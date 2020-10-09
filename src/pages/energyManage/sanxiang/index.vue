<template>
  <div>
    <topHeader equType="2" anaType="NengXiao-Sanxiang" @change="handleTopChange" @topInfoSelect="topInfoSelect"
      thirdName="回路">
      <div class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">选择时间：</p>
        <el-select class="time3" v-model="dateType" placeholder="请选择" @change="dateChange">
          <el-option v-for="(item, index) in dateList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
        <el-date-picker class="time2" v-model="startTime" type="date" placeholder="选择日期" @change="handleDate"
          :clearable="false" />
        <!-- <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select> -->
      </div>
    </topHeader>
    <div style="background-color: #ffffff;">
      <!-- 三相电压不平衡趋势 -->
      <div class="flex-bt pos_relative">
        <div class="pass_rate">
          <img style="margin-right: 8px;" src="../../../assets/image/energy/icon_hegelv.png" alt="img">
          <span>三相电压不平衡度合格率：</span>
          <span style="color: #0086E3; margin-right: 9px;">{{passRate}}</span>
          <el-tooltip style="z-index: 9;cursor: pointer;" effect="dark" content="三相电压不平衡度合格率=三相电压平衡时长/运行时长"
            placement="bottom-end">
            <img src="../../../assets/image/energy/icon_xtips.png" alt="img">
          </el-tooltip>
        </div>
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>三相电压不平衡度</span>
          </div>
          <div>
            <p class="chartsTitle">三相电压不平衡度</p>
            <!-- <rCharts barWidth="100%" barHeight="320" :dataConfig="sanxiangLine" /> -->
            <barCharts barWidth="100%" barHeight="320" unitL="三相不平衡度%" :chartColorList="chartColorList"
              :dataList="sanxiangLineY" :xName="sanxiangLineX" :axisXInterval="axisXInterval"
              :returnRes="returnResSan" />
          </div>
        </div>
      </div>
      <!-- 三相电压不平衡时长统计 -->
      <div class="flex-bt">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>三相电压不平衡时长统计</span>
          </div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">三相电压不平衡时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="350" pieWidth="100%" :dataList="pieData"></pieCharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../../components/topHeader/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import barCharts from '../../../components/barCharts/index'
import { getDate, formatTime } from '../../../assets/js/common.js'
// import { deviceInfoList } from '../../assets/js/config.js'
export default {
  name: 'sanxiang',
  components: {
    topHeader,
    pieCharts,
    barCharts
  },
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      selectDeviceValue: [],
      axisXInterval: 3,
      dianliangSum: '',
      sunhaoliangSum: '',
      sunhaolvAvg: '',
      sunhaoX: [],
      passRate: 0,
      sanxiangLineY: [{
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }, {
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }, {
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }],
      returnResSan: ['', ''],
      sanxiangLineX: [],
      chartColorList: ['#FF8E29', '#18D671', '#36ADFF', '#006FBC', '#FF3636'],
      timeType: '15',
      startTime: currentDate,
      leixing: '',
      dateType: 'day',
      dateHours: '',
      dateList: [
        {
          id: '1',
          name: '日',
          value: 'day'
        },
        // {
        //   id: '2',
        //   name: '周',
        //   value: 'week'
        // },
        {
          id: '3',
          name: '月',
          value: 'month'
        },
        {
          id: '4',
          name: '年',
          value: 'year'
        }
      ],
      dateHoursList: [
        // {
        //   id: '1',
        //   name: '5分钟',
        //   value: '5'
        // },
        {
          id: '2',
          name: '15分钟',
          value: '15'
        },
        {
          id: '3',
          name: '60分钟',
          value: 'hour'
        }
      ],
      pieData: [],
      hasTitle: false
    }
  },
  filters: {
    formatTime (value) {
      if (value) {
        let timeList = value.split('T')
        return `${timeList[0]} ${timeList[1]}`
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    getData () {
      const that = this
      let [, siteFid, equipFid] = that.selectDeviceValue
      let data = {
        siteFid,
        equipFid,
        // time1: this.startTime,
        anaType: 'NengXiao-Sanxiang',
        time: that.startTime,
        timeType: that.dateType,
        minute: that.timeType
      }
      that.$store.dispatch('sanxiang', data).then(res => {
        // 趋势数据
        that.passRate = res.FPY.FPY
        if (that.dateType == 'day') {
          that.sanxiangLineY[0].name = res.data[0].Item1
          that.sanxiangLineY[0].data = res.data[0].Item2
        } else {
          that.sanxiangLineY[0].name = res.data[0].key1.Item1
          that.sanxiangLineY[0].data = res.data[0].key1.Item2
          that.sanxiangLineY[1].name = res.data[0].key2.Item1
          that.sanxiangLineY[1].data = res.data[0].key2.Item2
          that.sanxiangLineY[2].name = res.data[0].key3.Item1
          that.sanxiangLineY[2].data = res.data[0].key3.Item2
        }
        that.sanxiangLineX = res.time
        // 占比数据
        that.pieData = []
        for (let a of res.pie.A) {
          that.pieData.push(that.formatPie(a.name, a.value, a.percent))
        }
      })
    },
    topInfoSelect (value) {
      this.selectDeviceValue = value
      this.clearData()
      this.getData()
    },
    // 所有数据置空
    clearData () {
      this.sanxiangLineY = [{
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }, {
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }, {
        name: '',
        type: 'line',
        data: [],
        unit: '%'
      }]
      this.sanxiangLineX = []
      this.pieData = []
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.getData()
    },
    // 选择日月年类型
    async dateChange (value) {
      this.dateType = value
      this.getData()
    },
    // 选择日期
    async handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D')
      this.getData()
    },
    // 选择时间
    async handleTime (value) {
      this.timeType = value
      this.getData()
    },
    // 格式化饼图数据
    formatPie (name, value, percent) {
      let item = {
        name: name,
        value: percent.split('%')[0],
        label: {
          normal: {
            formatter: ['{b}: {c}%', value + '小时'].join('\n')
          }
        }
      }
      return item
    },
    // 线条最大最小横线和标点
    markPointLine (params) {
      let lineStyle = null
      if (params == 'markPoint') {
        lineStyle = {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : ''
              }
            }
          },
          data: [
            {
              type: 'max'
            },
            {
              type: 'min'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '')
            }
          }
        }
      } else if (params == 'markLine') {
        lineStyle = {
          data: [
            {
              type: 'min'
            },
            {
              type: 'average'
            },
            {
              type: 'max'
            }
          ]
        }
      }

      return lineStyle
    },
    // line图形的结构
    lineStyleItem (name, color, data) {
      let item = {
        name: name,
        type: 'line',
        itemStyle: {
          normal: {
            color: color
          }
        },
        data: data
      }
      return item
    },
    // line的item结构
    lineItem (name, color, data) {
      let item = {
        xUnit: '',
        yUnit: '(三相电压不平衡度%)',
        y: [
          {
            name: name,
            type: 'line',
            itemStyle: {
              normal: {
                color: color
              }
            },
            data: data,
            // markPoint: this.markPointLine('markPoint'),
            // markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      }
      return item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sh_box {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  .sh_value {
    font-size: 18px;
    font-weight: bold;
    color: rgba(0, 134, 227, 1);
  }
  .sh_label {
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.right_side {
  height: 469px;
  flex: 1;
  margin-left: 20px;
  position: relative;
}
/* 右边底部的title */
.flex {
  display: flex;
  align-items: center;
}
.chartsTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  //padding-top: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.flex-bt {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.p-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}

.blue_line {
  width: 4px;
  height: 22px;
  background: rgba(0, 111, 188, 1);
  margin-right: 8px;
}
.pass_rate {
  display: flex;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 20px;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
</style>
