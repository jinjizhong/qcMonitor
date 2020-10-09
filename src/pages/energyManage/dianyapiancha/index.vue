<template>
  <div>
    <topHeader thirdName="回路" equType="2" anaType="NengXiao-Dianyapiancha" @change="handleTopChange"
      @topInfoSelect="topInfoSelect">
      <div class="flex" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">选择时间：</p>
        <el-select class="time3" v-model="dateType" placeholder="请选择" @change="dateChange">
          <el-option v-for="(item, index) in dateList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期" @change="handleDate" :clearable="false" />
        <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
    </topHeader>
    <div style="background-color: #ffffff;">
      <!-- 电压偏差趋势 -->
      <div class="flex-bt pos_relative">
        <div class="pass_rate">
          <img style="margin-right: 8px;" src="../../../assets/image/energy/icon_hegelv.png" alt="img">
          <span>电压合格率：</span>
          <span style="color: #0086E3; margin-right: 9px;">{{passRate}}</span>
         
		  <el-tooltip style="z-index: 9;cursor: pointer;" effect="dark" content="电压偏差合格率=三相电压正常时长/运行时长" placement="bottom-end">
		        <!-- <el-button>下边</el-button> -->
				<img src="../../../assets/image/energy/icon_xtips.png" alt="img">
		  </el-tooltip>
        </div>
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>电压偏差</span>
          </div>
          <div>
            <p class="chartsTitle">A相电压偏差</p>
            <rCharts :yList="pcyList" barWidth="100%" barHeight="320" :dataConfig="Apiancha" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">B相电压偏差</p>
            <rCharts :yList="pcyList" barWidth="100%" barHeight="320" :dataConfig="Bpiancha" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">C相电压偏差</p>
            <rCharts :yList="pcyList" barWidth="100%" barHeight="320" :dataConfig="Cpiancha" />
          </div>
        </div>
      </div>
      <!-- 电压偏差占比 -->
      <div class="flex-bt">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>电压偏差时长占比</span>
          </div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">A相电压偏差时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="320" pieWidth="100%" :dataList="pieDataA" :pieRadius="pieRadius">
            </pieCharts>
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">B相电压偏差时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="320" pieWidth="100%" :dataList="pieDataB" :pieRadius="pieRadius">
            </pieCharts>
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">C相电压偏差时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="320" pieWidth="100%" :dataList="pieDataC" :pieRadius="pieRadius">
            </pieCharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../../components/topHeader/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import rCharts from '../../../components/pictorialCharts/row_index.vue'
import { getDate, formatTime } from '../../../assets/js/common.js'
// import { deviceInfoList } from '../../assets/js/config.js'
export default {
  name: 'dianyapiancha',
  components: {
    topHeader,
    pieCharts,
    rCharts
  },
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      pcyList: [{ max: null, min: null, interval: null }],
      pieRadius: ['35%', '50%'],
      passRate: 0,
      // piePosition: ['vertical', 'right', 'center'],
      selectDeviceValue: [],
      dianliangSum: '',
      sunhaoliangSum: '',
      sunhaolvAvg: '',
      sunhaoX: [],
      Apiancha: {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF8E29'
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      },
      Bpiancha: {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#13CF5A'
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      },
      Cpiancha: {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            lineWidth: 10,
            itemStyle: {
              normal: {
                color: '#FF1B1B'
                // lineStyle:{
                // 	width:5,  // 设置线宽
                // 	type:'dotted'  //'dotted'虚线 'solid'实线
                // }
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      },
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
      pieDataA: [],
      pieDataB: [],
      pieDataC: [],
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
      let self = this
      let [, siteFid, equFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equFid,
        // time1: this.startTime,
        anaType: 'NengXiao-Dianyapiancha',
        time: this.startTime,
        timeType: this.dateType,
        minute: this.timeType
      }
      this.$store.dispatch('dianyapiancha', data).then(res => {
        // 电压偏差趋势数据
        // console.log(JSON.stringify(res))
		if(res.FPY){
			this.passRate = res.FPY.FPY
		}
        
        if (self.dateType == 'day') {
          self.Apiancha = self.lineItem(
            res.data[0].Item1,
            '#FF8E29',
            res.data[0].Item2
          )
          self.Bpiancha = self.lineItem(
            res.data[1].Item1,
            '#13CF5A',
            res.data[1].Item2
          )
          self.Cpiancha = self.lineItem(
            res.data[2].Item1,
            '#FF1B1B',
            res.data[2].Item2
          )
        } else {
          self.Apiancha.y = []
          self.Bpiancha.y = []
          self.Cpiancha.y = []
          let itemApiancha = {
            name: res.data[0].key1.Item1,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#13CF5A'
              }
            },
            data: res.data[0].key1.Item2,
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    // console.log(param, 'nihaonihao')
                    return param != null ? Math.floor(param.value * 100) / 100 : ''
                  }
                }
              },
              data: [
                {
                  value: res.line[2].max,
                  xAxis: res.line[2].timeOfMax,
                  yAxis: res.line[2].max,
                  itemStyle: {
                    color: 'rgba(255,27,27,0.5)',
                  }
                },
                {
                  value: res.line[2].min,
                  xAxis: res.line[2].timeOfMin,
                  yAxis: res.line[2].min,
                  itemStyle: {
                    color: 'rgba(0,134,227,0.5)'
                  }
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: this.markPointLine('markLine')
          }
          self.Apiancha.y.push(itemApiancha)
          self.Apiancha.y.push(
            this.lineStyleItem(
              res.data[0].key2.Item1,
              '#FF8E29',
              res.data[0].key2.Item2
            )
          )
          self.Apiancha.y.push(
            this.lineStyleItem(
              res.data[0].key3.Item1,
              '#36ADFF',
              res.data[0].key3.Item2
            )
          )
          let itemBpiancha = {
            name: res.data[1].key1.Item1,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#13CF5A'
              }
            },
            data: res.data[1].key1.Item2,
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    // console.log(param, 'nihaonihao')
                    return param != null ? Math.floor(param.value * 100) / 100 : ''
                  }
                }
              },
              data: [
                {
                  value: res.line[2].max,
                  xAxis: res.line[2].timeOfMax,
                  yAxis: res.line[2].max,
                  itemStyle: {
                    color: 'rgba(255,27,27,0.5)',
                  }
                },
                {
                  value: res.line[2].min,
                  xAxis: res.line[2].timeOfMin,
                  yAxis: res.line[2].min,
                  itemStyle: {
                    color: 'rgba(0,134,227,0.5)'
                  }
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: this.markPointLine('markLine')
          }
          self.Bpiancha.y.push(itemBpiancha)
          self.Bpiancha.y.push(
            this.lineStyleItem(
              res.data[1].key2.Item1,
              '#FF8E29',
              res.data[1].key2.Item2
            )
          )
          self.Bpiancha.y.push(
            this.lineStyleItem(
              res.data[1].key3.Item1,
              '#36ADFF',
              res.data[1].key3.Item2
            )
          )

          let itemCpiancha = {
            name: res.data[2].key1.Item1,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#13CF5A'
              }
            },
            data: res.data[2].key1.Item2,
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    // console.log(param, 'nihaonihao')
                    return param != null ? Math.floor(param.value * 100) / 100 : ''
                  }
                }
              },
              data: [
                {
                  value: res.line[2].max,
                  xAxis: res.line[2].timeOfMax,
                  yAxis: res.line[2].max,
                  itemStyle: {
                    color: 'rgba(255,27,27,0.5)',
                  }
                },
                {
                  value: res.line[2].min,
                  xAxis: res.line[2].timeOfMin,
                  yAxis: res.line[2].min,
                  itemStyle: {
                    color: 'rgba(0,134,227,0.5)'
                  }
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: this.markPointLine('markLine')
          }
          self.Cpiancha.y.push(itemCpiancha)
          self.Cpiancha.y.push(
            this.lineStyleItem(
              res.data[2].key2.Item1,
              '#FF8E29',
              res.data[2].key2.Item2
            )
          )
          self.Cpiancha.y.push(
            this.lineStyleItem(
              res.data[2].key3.Item1,
              '#36ADFF',
              res.data[2].key3.Item2
            )
          )
        }
        self.Apiancha.x = res.time
        self.Bpiancha.x = res.time
        self.Cpiancha.x = res.time
        // 电压偏差时长占比数据
        self.pieDataA = []
        self.pieDataB = []
        self.pieDataC = []
        for (let a of res.pie.A) {
          self.pieDataA.push(self.formatPie(a.name, a.value, a.percent, a.label))
        }
        for (let b of res.pie.B) {
          self.pieDataB.push(self.formatPie(b.name, b.value, b.percent, b.label))
        }
        for (let c of res.pie.C) {
          self.pieDataC.push(self.formatPie(c.name, c.value, c.percent, c.label))
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
      this.Apiancha = {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF8E29'
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      }
      this.Bpiancha = {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#13CF5A'
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      }
      this.Cpiancha = {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            lineWidth: 10,
            itemStyle: {
              normal: {
                color: '#FF1B1B'
                // lineStyle:{
                // 	width:5,  // 设置线宽
                // 	type:'dotted'  //'dotted'虚线 'solid'实线
                // }
              }
            },
            data: [],
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
          }
        ],
        x: []
      }
      this.pieDataA = []
      this.pieDataB = []
      this.pieDataC = []
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
    formatPie (name, value, percent, label) {
      let item = {
        name: `${label}`,
        value: percent.split('%')[0],
        label: {
          normal: {
            formatter: [`${name}`, value + '小时'].join('\n')
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
          symbol: 'none',
          data: [
            {
              name: '',
              silent: false, //鼠标悬停事件  true没有，false有
              lineStyle: {
                color: '#FF1B1B'
              },
              label: {
                position: "middle", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                formatter: "" //电压偏差上限线（+7%）
              },
              yAxis: 7
            },
            {
              name: '',
              lineStyle: {
                color: '#FF1B1B'
              },
              label: {
                position: "middle", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                formatter: "" //电压偏差上限线（+7%）
              },
              yAxis: -7
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
        data: data,
        // markPoint: this.markPointLine('markPoint'),
        markLine: this.markPointLine('markLine')
      }
      return item
    },
    // line的item结构
    lineItem (name, color, data) {
      let item = {
        xUnit: '',
        yUnit: '电压偏差（%）',
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
            markPoint: this.markPointLine('markPoint'),
            markLine: this.markPointLine('markLine')
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
  height: 419px;
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
