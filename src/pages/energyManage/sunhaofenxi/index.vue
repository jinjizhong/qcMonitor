<template>
  <div>
    <topHeader equType="2" isCedian="1" thirdName="设备" anaType="NengXiao-Byqsh" @change="handleTopChange" @topInfoSelect="topInfoSelect">
      <div class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">时间选择：</p>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期" @change="handleDate" :clearable="false" />
        <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
    </topHeader>
    <div style="background-color: #ffffff;">
      <div class="flex_row">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>损耗量与损耗率</span>
          </div>
          <barCharts barWidth="100%" barHeight="350" unitL="(耗损量/kWh)" unitR="(损耗率/%)" :dataList="sunhaoSeries" :xName="sunhaoX" needSecondUnit />
          <div class="flex_row sh_box">
            <div class="flex_column">
              <span class="sh_value">{{ dianliangSum }}kWh</span>
              <span class="sh_label">总用电量</span>
            </div>
            <div style="margin: 0 50px" class="flex_column">
              <span class="sh_value">{{ sunhaoliangSum }}kWh</span>
              <span class="sh_label">总损耗量</span>
            </div>
            <div class="flex_column">
              <span class="sh_value">{{ sunhaolvAvg }}%</span>
              <span class="sh_label">平均损耗率</span>
            </div>
          </div>
        </div>
        <div style="position: relative;">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>能源利用率</span>
          </div>
          <!-- <p class="chartsTitle"><span v-show="this.sunhaoType=='0'"></span><span
              v-show="this.sunhaoType=='1'">耗损率</span>与各影响因素相关性排名</p> -->
          <pieCharts :hasTitle="hasTitle" titleText="" :centerText="centerText" pieHeight="350" pieWidth="500" :dataList="rankDataList" />
          <!-- <div class="sunhao_type">
            <p class="p-title">因变量：</p>
            <el-select style="width:96px;" @change="handleSunhaoType" v-model="sunhaoType" placeholder="请选择数据类型">
              <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.value" />
            </el-select>
          </div> -->
        </div>
      </div>
      <div class="flex_row">
        <div style="position: relative;" class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>变压器负载率与损耗率</span>
          </div>
          <barCharts barWidth="100%" barHeight="350" unit="(负载率/%)" unitL="(时长/h)" :dataList="elecSeries" :xName="elecX" needSecondUnit :gridPos="gridPosSunhao" />
          <div class="sign_box">
            <div class="common_sign flex_row_center">
              <span class="sign_feng"></span>
              <span>非经济运行</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_ping"></span>
              <span>较经济运行</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_gu"></span>
              <span>经济运行</span>
            </div>
          </div>
          <!-- unitR="(损耗率/%)" -->
        </div>
        <div>
          <pieCharts titleText="" :centerText="centerText" pieHeight="350" pieWidth="500" :dataList="pieData">
          </pieCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Home from '../../Home/index'
import topHeader from '../../../components/topHeader/index'
import barCharts from '../../../components/barCharts/index'
// import columnCharts from '../../../components/pictorialCharts/colum_index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import { getDate, formatTime } from '../../../assets/js/common.js'
// import { deviceInfoList } from '../../assets/js/config.js'
export default {
  name: 'sunhao',
  components: {
    // Home,
    topHeader,
    barCharts,
    pieCharts
  },
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      selectDeviceValue: [],
      dianliangSum: 0,
      sunhaoliangSum: 0,
      sunhaolvAvg: 0,
      sunhaoType: '0', //因变量选择
      sunhaoX: [], // 损耗率
      elecX: [], // 经济运行
      sunhaoSeries: [
        {
          name: '损耗量',
          type: 'bar',
          barWidth: '25%', //柱图宽度
          data: []
        },
        {
          name: '损耗率',
          type: 'line',
          yAxisIndex: 1,
          data: []
        }
      ],
      elecSeries: [
        {
          name: '',
          type: 'line',
          data: [],
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(54,173,255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(54,173,255,1)'
                  }
                ],
                globaCoord: false
              }
            }
          }, //填充区域样式
          markArea: {}
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          data: []
        }
      ],
      typeList: [
        {
          id: '1',
          name: '损耗量',
          value: '0'
        },
        {
          id: '2',
          name: '损耗率',
          value: '1'
        }
      ],
      rankDataList: [],
      timeType: 'hour',
      startTime: currentDate,
      leixing: '',
      dateHours: '',
      dateHoursList: [
        // {
        //   id: '0',
        //   name: '5分钟',
        //   value: '5'
        // },
        // {
        //   id: '1',
        //   name: '15分钟',
        //   value: '15'
        // },
        {
          id: '2',
          name: '日',
          value: 'hour'
        },
        // {
        //   id: '3',
        //   name: '周',
        //   value: 'week_day'
        // },
        {
          id: '4',
          name: '月',
          value: 'month_day'
        },
        {
          id: '5',
          name: '年',
          value: 'year'
        }
      ],
      pieData: [],
      hasTitle: false,
      centerText: '',
      gridPosSunhao: [30, 32, 75, 50]
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
      let [, siteFid, equFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        time1: this.startTime,
        timeType: this.timeType,
        relevance: this.sunhaoType
      }
      this.$store.dispatch('transformerLossMan', data).then(res => {
        this.dianliangSum = res.dianliangSum || 0
        this.sunhaoliangSum = res.sunhaoliangSum || 0
        this.sunhaolvAvg = res.sunhaolvAvg || 0
        this.sunhaoX = res.returnDt.timeCell
        this.sunhaoSeries[0].data = res.returnDt.sunhaoliangCell
        this.sunhaoSeries[1].data = res.returnDt.sunhaolvCell
        this.rankDataList = res.returnDt.nengyuanPie

        this.pieData = []
        for (let a of res.pieCharts) {
          let percent = ((a.value / res.pieChartsSum) * 100).toFixed(2)
          this.pieData.push(this.formatPie(a.name, a.value, percent, '小时'))
        }
        this.centerText = res.pieChartsText

        this.elecX = []
        this.elecSeries[0].data = []
        this.elecSeries[0].markArea = {}
        let fAndsCell = res.returnDt.fAndsCell
        for (let i of fAndsCell) {
          this.elecX.push(i.fuzai)
          this.elecSeries[0].data.push(i.timeNum)
        }
        let eleArea = res.returnDt.B
        this.elecSeries[0].markArea = {
          data: [
            [
              {
                name: '',
                itemStyle: {
                  color: 'rgba(255,27,27,0.3)'
                }
              },
              {
                xAxis: String(eleArea.B21[0])
              }
            ],
            [
              {
                name: '',
                xAxis: String(eleArea.B21[0]),
                itemStyle: {
                  color: 'rgba(255,142,41,0.3)'
                }
              },
              {
                xAxis: String(eleArea.B11[0])
              }
            ],
            [
              {
                name: '',
                xAxis: String(eleArea.B11[0]),
                itemStyle: {
                  color: 'rgba(19,207,90,.3)'
                }
              },
              {
                xAxis: String(eleArea.B12[0])
              }
            ],
            [
              {
                name: '',
                xAxis: String(eleArea.B12[0]),
                itemStyle: {
                  color: 'rgba(255,142,41,.3)'
                }
              },
              {
                xAxis: String(eleArea.B22[0])
              }
            ],
            [
              {
                name: '',
                xAxis: String(eleArea.B22[0]),
                itemStyle: {
                  color: 'rgba(255,27,27,0.3)'
                }
              },
              {}
            ]
          ]
        }
      })
    },
    topInfoSelect (value) {
      this.selectDeviceValue = value || []
      this.getData()
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.getData()
    },
    // 格式化饼图数据
    formatPie (name, value, percent, unit) {
      let item = {
        name: name,
        value: percent,
        label: {
          normal: {
            formatter: ['{b}: {c}%', value + unit].join('\n')
          }
        }
      }
      return item
    },
    // 选择数组类型
    async handleSunhaoType (value) {
      this.sunhaoType = value
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
      this.elecX = []
      this.elecSeries[0].data = []
      this.elecSeries[1].data = []
      this.timeType = value
      this.getData()
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
.sunhao_type {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
}
.bottom_content {
  height: 393px;
}

.right_side {
  height: 393px;
  flex: 1;
  margin-left: 20px;
  position: relative;
}

/* 右边底部的title */
.flex {
  display: flex;
  align-items: center;
}

.title-line {
  position: absolute;
  height: 2px;
  width: 110px;
  background-color: #1277d2;
}

.title {
  height: 43px;
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
.sign_box {
  display: flex;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  .common_sign {
    color: #333333;
    font-size: 13px;
    margin-right: 10px;
    .sign_feng {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(255, 27, 27, 0.3);
      margin-right: 5px;
    }
    .sign_ping {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(255, 142, 41, 0.3);
      margin-right: 5px;
    }
    .sign_gu {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(19, 207, 90, 0.3);
      margin-right: 5px;
    }
  }
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
  margin-top: 7px;
}
</style>
