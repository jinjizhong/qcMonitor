<template>
  <div>
    <topHeader isCedian="1" equType="1" thirdName="进线" anaType="NengXiao-Dianfei" @change="handleTopChange"
      @topInfoSelect="topInfoSelect">
      <div class="flex_row_yCenter" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">时间选择：</p>
        <el-date-picker class="time2" v-model="startTime" type="date" placeholder="选择日期" @change="handleDate"
          :clearable="false" />
        <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
        <!-- <el-select class="time3" v-model="minuteType" placeholder="请选择" @change="handleMinute">
          <el-option v-for="(item, index) in dateMinuteList" :key="index" :label="item.name" :value="item.value" />
        </el-select> -->
      </div>
    </topHeader>
    <div class="third_info">
      <div style="margin-left: 20px;">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>分时段电度电费</span>
          <div v-show="type == 0" class="sign_box">
            <div class="common_sign flex_row_center">
              <span class="sign_feng"></span>
              <span>峰电量</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_ping"></span>
              <span>平电量</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_gu"></span>
              <span>谷电量</span>
            </div>
          </div>
        </div>
        <div v-show="type == 0">
          <barCharts :returnRes="returnRes" barWidth="100%" barHeight="300" unitL="用电量/kWh" unitR="电费 (元)"
            :dataList="fsdData" :xName="fsdX" needSecondUnit />
        </div>
        <div v-show="type == 1">
          <barCharts barWidth="100%" barHeight="300" unitL="用电量/kWh" unitR="电费 (元)" :returnRes="returnRes2"
            :dataList="fsdData2" :xName="fsdX2" :chartColorList="chartColorListYdl" needSecondUnit />
        </div>
      </div>
    </div>
    <div class="sec_info">
      <div style="flex:1;background-color:#ffffff; padding-top:20px;">
        <!-- <div class="sec_title">
          <span class="blue_line"></span>
          <span>日分时段电量占比</span>
        </div> -->
        <pieCircleCharts :titleText="titleTextPie1" :centerText="allDiangliang" pieHeight="330" pieWidth="100%"
          :dataList="rdlPieData" :piePosition="commonPiePosition" :chartColorList="chartColorListDL"
          centerTextColor="#333" />
      </div>
      <div style="flex:1;background-color: #ffffff;padding-top:20px;">
        <pieCircleCharts :titleText="titleTextPie2" :centerText="allMoney" pieHeight="330" pieWidth="100%"
          :dataList="rdfPieData" :piePosition="commonPiePosition" :chartColorList="chartColorListDL"
          centerTextColor="#333" />
      </div>
    </div>
    <div class="sec_info">
      <div style="flex:0.67;background-color:#ffffff;">
        <div style="margin-left: 20px; position: relative;">
          <div class="sec_title">
            <span class="blue_line"></span>
            <span>功率因数</span>
          </div>
          <barCharts barWidth="100%" barHeight="300" unitL="功率因数" :unitR="lilvUnit" :dataList="lvData" :xName="lvX"
            :gridPos="lvGridPos" :axisXInterval="axisXInterval" needSecondUnit />
          <!-- <div class="lv_type">
            <p class="p-title">对比项：</p>
            <el-select style="width:156px;" @change="handleLvType" v-model="lvType" placeholder="请选择数据类型">
              <el-option v-for="(item, index) in lvTypeList" :key="index" :label="item.name" :value="item.value" />
            </el-select>
          </div> -->
        </div>
      </div>
      <div style="flex:0.33;background-color: #ffffff;padding-top:20px;">
        <!-- :chartColorList="chartColorListGLYS" -->
        <pieCircleCharts :pieRadius="pieRadius" titleText="功率因数补偿状态时长占比" :centerText="pieEcharts3ContentValue"
          pieHeight="330" pieWidth="100%" :dataList="glysPieData" :piePosition="commonPiePosition"
          :chartColorList="chartColorListGLYS" centerTextColor="#13CF5A" />
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../../components/topHeader/index'
import barCharts from '../../../components/barCharts/index'
import pieCircleCharts from '../../../components/pictorialCharts/pie_index.vue'
import { getDate, formatTime } from '../../../assets/js/common.js'
export default {
  name: 'dianfei',
  components: {
    barCharts,
    pieCircleCharts,
    topHeader
  },
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      axisXInterval: 3,
      lvGridPos: [30, 32, 52, 50],
      pieRadius: ['35%', '50%'],
      returnRes: ['format', '用电量'],
      returnRes2: ['', '日'],
      companyId: '',
      siteId: '',
      selectDeviceValue: [],
      timeType: 'day',
      minuteType: 'hour',
      startTime: currentDate,
      type: 0,
      allDiangliang: '',
      allMoney: '',
      pieEcharts3ContentValue: '',
      titleTextPie1: '日分时段电量占比',
      titleTextPie2: '日分时段电度电费占比',
      // dateMinuteList: [
      //   {
      //     id: '1',
      //     name: '5分钟',
      //     value: '5'
      //   },
      //   {
      //     id: '2',
      //     name: '10分钟',
      //     value: '10'
      //   },
      //   {
      //     id: '3',
      //     name: '15分钟',
      //     value: '15'
      //   },
      //   {
      //     id: '4',
      //     name: '60分钟',
      //     value: 'hour'
      //   }
      // ],
      dateHoursList: [
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
      lilvUnit: '力率电费增减比 %',
      lvTypeList: [
        {
          id: '1',
          name: '力率电费增减比',
          value: '0'
        },
        // {
        //   id: '2',
        //   name: '力率电费',
        //   value: '1'
        // }
      ],
      fsdData: [
        {
          name: '',
          type: 'bar',
          color: 'none',
          barWidth: 25, //柱图宽度
          unit: 'kWh',
          data: [],
          markLine: {
            // 非直线设置
            symbol: 'none', //去掉箭头
            itemStyle: {
              normal: {
                borderWidth: 1,
                lineStyle: {
                  type: 'dash',
                  color: '#333 ',
                  width: 2
                },
                label: {
                  position: 'end'
                }
              }
            },
            data: []
          }
        },
        {
          name: '电费',
          type: 'line',
          unit: '元',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#FF1B1B'
            }
          },
          barWidth: 25, //柱图宽度
          data: []
        }
      ], //分时段电度电费
      fsdData2: [
        {
          name: '峰电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '平电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '谷电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '电费',
          type: 'line',
          unit: '元',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#FF1B1B'
            }
          },
          barWidth: 25, //柱图宽度
          data: []
        }
      ],
      fsdX: [],
      fsdX2: [],
      lvData: [
        {
          name: '',
          type: 'line',
          markLine: {
            symbol: 'none',
            data: []
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          // markLine: {
          //   symbol: 'none',
          //   data: []
          // },
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        }
      ],
      lvX: [],
      lvType: '0',
      rdlPieData: [],
      rdfPieData: [],
      glysPieData: [],
      commonPiePosition: ['vertical', 'right', 'center'],
      hasTitle: false,
      chartColorListYdl: ['#FF9239', '#36ADFF', '#13CF5A'],
      chartColorListDL: ['#FF9239', '#36ADFF', '#13CF5A'],
      chartColorListGLYS: ['#13CF5A', '#FF8E29']
    }
  },
  created () { },
  mounted () { },
  methods: {
    async topInfoSelect (value) {
      this.selectDeviceValue = value || []
      this.clearData()
      await this.getDfData()
      await this.getLvData()
    },
    async handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.clearData()
      await this.getDfData()
      await this.getLvData()
    },
    // 所有数据置空
    clearData () {
      this.fsdData = [
        {
          name: '',
          type: 'bar',
          color: 'none',
          barWidth: 25, //柱图宽度
          unit: 'kWh',
          data: [],
          markLine: {
            // 非直线设置
            symbol: 'none', //去掉箭头
            itemStyle: {
              normal: {
                borderWidth: 1,
                lineStyle: {
                  type: 'dash',
                  color: '#333 ',
                  width: 2
                },
                label: {
                  position: 'end'
                }
              }
            },
            data: []
          }
        },
        {
          name: '电费',
          type: 'line',
          unit: '元',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#FF1B1B'
            }
          },
          barWidth: 25, //柱图宽度
          data: []
        }
      ] //分时段电度电费
      this.fsdData2 = [
        {
          name: '峰电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '平电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '谷电量',
          type: 'bar',
          unit: 'kWh',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '电费',
          type: 'line',
          unit: '元',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#FF1B1B'
            }
          },
          barWidth: 25, //柱图宽度
          data: []
        }
      ]
      this.fsdX = []
      this.fsdX2 = []
      this.lvData = [
        {
          name: '',
          type: 'line',
          markLine: {
            symbol: 'none',
            data: []
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          // markLine: {
          //   symbol: 'none',
          //   data: []
          // },
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        }
      ]
      this.lvX = []
      this.rdlPieData = []
      this.rdfPieData = []
      this.glysPieData = []
    },
    getDfData () {
      let [, siteFid, shebeiFid] = this.selectDeviceValue
      let data = {
        siteFid,
        shebeiFid,
        startTime: this.startTime,
        timeType: this.timeType,
        minute: this.minuteType
      }
      this.$store.dispatch('electricityTariff', data).then(res => {
        //根据是否又markline判定是选择的哪个时间维度
        if (res.markLine) {
          this.type = 0
          this.fsdX = res.timecell
          for (let i of res.returnData) {
            if (i.type == '谷') {
              let colorData = {
                color: '#13CF5A'
              }
              i.itemStyle = colorData
            } else if (i.type == '平') {
              let colorData = {
                color: '#36ADFF'
              }
              i.itemStyle = colorData
            } else if (i.type == '峰') {
              let colorData = {
                color: '#FF8E29'
              }
              i.itemStyle = colorData
            }
          }
          this.fsdData[0].data = res.returnData
          // console.log(this.fsdData[0].data, 'this.fsdData[0].data')
          // this.fsdData[0].markLine.data = res.markLine
          this.fsdData[1].data = res.dianfeiCell
        } else {
          this.type = 1
          this.fsdData2[0].data = res.returnData.fengData
          this.fsdData2[1].data = res.returnData.pingData
          this.fsdData2[2].data = res.returnData.guData
          this.fsdData2[3].data = res.dianfeiCell
          this.fsdX2 = res.timecell
        }
        this.rdlPieData = []
        this.rdfPieData = []
        for (let a of res.pieEcharts1) {
          let percent = ((a.value / res.allDiangliang) * 100).toFixed(2)
          this.rdlPieData.push(this.formatPie(a.name, a.value, percent, 'kWh'))
        }
        for (let a of res.pieEcharts2) {
          let percent = ((a.value / res.allMoney) * 100).toFixed(2)
          this.rdfPieData.push(this.formatPie(a.name, a.value, percent, '元'))
        }
        this.allDiangliang = `总电量\n${res.allDiangliang}kWh`
        this.allMoney = `总电费\n${res.allMoney}元`
      })
    },
    getLvData () {
      let [, siteFid, shebeiFid] = this.selectDeviceValue
      let data = {
        siteFid,
        shebeiFid,
        startTime: this.startTime,
        timeType: this.timeType,
        minute: this.minuteType,
        contrast: this.lvType
      }
      this.$store.dispatch('electricityTariff2', data).then(res => {
        // console.log(this.timeType, res, 'returnData')
        if (this.timeType == 'day') {
          this.lvX = res.returnData.bottomData.timecell
          this.lvData[0].data = res.returnData.bottomData.glysCell
          this.lvData[1].data = res.returnData.bottomData.zengzhangbi
          this.lvData[2].data = []
          this.lvData[3].data = []
          this.lvData[4].data = []
          this.lvData[0].name = '功率因数'
          this.lvData[1].name = this.lvType == '0' ? '力率电费增减比' : '力率电费'
          this.lvData[2].name = ''
          this.lvData[3].name = ''
          this.lvData[4].name = ''
          let lineData = [
            {
              silent: false, //鼠标悬停事件  true没有，false有
              lineStyle: {
                color: '#FF1B1B'
              },
              label: {
                position: "end" //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                // formatter: "功率因数限值"
              },
              yAxis: res.returnData.bottomData.line1.value
            },
            {
              lineStyle: {
                color: '#FF1B1B'
              },
              label: {
                position: "end" //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                // formatter: "平均值"
              },
              type: 'average',
              name: '功率因数平均值'
            }
          ]
          this.lvData[0].markLine.data = lineData
        } else {
          this.lvX = res.returnData.bottomData.timecell
          this.lvData[0].data = res.returnData.bottomData.zhixinMaxCell
          this.lvData[1].data = res.returnData.bottomData.zhixinAvgCell
          this.lvData[2].data = res.returnData.bottomData.zhixinMinCell
          this.lvData[3].data = res.returnData.bottomData.glysCell
          this.lvData[4].data = res.returnData.bottomData.zengzhangbi
          this.lvData[0].name = '置信区间最大值'
          this.lvData[1].name = '中位数'
          this.lvData[2].name = '置信区间最小值'
          this.lvData[3].name = '功率因数'
          this.lvData[4].name = '力率电费增减比'
          let lineData = [
            {
              silent: false, //鼠标悬停事件  true没有，false有
              lineStyle: {
                color: '#FF1B1B'
              },
              yAxis: res.returnData.bottomData.line1.value
            }
          ]
          this.lvData[1].markLine.data = lineData
        }

        this.glysPieData = []
        for (let a of res.returnData.bottomPie) {
          let percent = (
            (a.value / res.returnData.pieEcharts3Sum) *
            100
          ).toFixed(2)
          this.glysPieData.push(
            this.formatPie(a.name, a.value, percent, '小时')
          )
        }
        this.pieEcharts3ContentValue = `${res.returnData.pieEcharts3ContentValue.split(':')[0]}\n${res.returnData.pieEcharts3ContentValue.split(':')[1]}`
      })
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
    // 选择日期
    handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D')
      if (this.timeType == 'day') {
        this.titleTextPie1 = '日分时段电量占比'
        this.titleTextPie2 = '日分时段电度电费占比'
      } else if (this.timeType == 'month') {
        let timeData = this.startTime.split('-')
        let returnValue = `${timeData[0]}年${timeData[1]}月`
        this.titleTextPie1 = '月分时段电量占比'
        this.titleTextPie2 = '月分时段电度电费占比'
        this.returnRes2 = [returnValue, '日']
      } else if (this.timeType == 'year') {
        let timeData = this.startTime.split('-')
        let returnValue = `${timeData[0]}年`
        this.titleTextPie1 = '年分时段电量占比'
        this.titleTextPie2 = '年分时段电度电费占比'
        this.returnRes2 = [returnValue, '月']
      }
      this.getDfData()
      this.getLvData()
    },
    // 选择时间
    handleTime (value) {
      if (value == 'day') {
        this.titleTextPie1 = '日分时段电量占比'
        this.titleTextPie2 = '日分时段电度电费占比'
      } else if (value == 'month') {
        let timeData = this.startTime.split('-')
        let returnValue = `${timeData[0]}年${timeData[1]}月`
        this.titleTextPie1 = '月分时段电量占比'
        this.titleTextPie2 = '月分时段电度电费占比'
        this.returnRes2 = [returnValue, '日']
      } else if (value == 'year') {
        let timeData = this.startTime.split('-')
        let returnValue = `${timeData[0]}年`
        this.titleTextPie1 = '年分时段电量占比'
        this.titleTextPie2 = '年分时段电度电费占比'
        this.returnRes2 = [returnValue, '月']
      }
      this.timeType = value
      this.getDfData()
      this.getLvData()
    },
    // 选择分钟维度
    handleMinute (value) {
      this.minuteType = value
      this.getDfData()
      this.getLvData()
    },
    handleLvType (value) {
      this.lvType = value
      if (value == 0) {
        this.lilvUnit = '力率电费增减比 %'
      } else {
        this.lilvUnit = '力率电费 %'
      }
      this.getLvData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top_header {
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #ffffff;
  align-items: center;
  margin-bottom: 12px;
  .choose_label {
    margin-right: 10px;
    margin-left: 10px;
  }
}

.color_red {
  color: #ff1b1b;
}
.color_green {
  color: #14d15c;
}
.third_info {
  background-color: #ffffff;
  margin-top: 12px;
  position: relative;
  .third_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
  }
}
.sec_info {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 12px;
  .sec_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
  }
}
.rank_type {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
}

.p-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.lv_type {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
}
.sign_box {
  display: flex;
  position: absolute;
  bottom: 12px;
  left: 33%;
  .common_sign {
    color: #333333;
    font-size: 13px;
    margin-right: 10px;
    .sign_feng {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #ff8e29;
      margin-right: 5px;
    }
    .sign_ping {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #36adff;
      margin-right: 5px;
    }
    .sign_gu {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #13cf5a;
      margin-right: 5px;
    }
  }
}
</style>
