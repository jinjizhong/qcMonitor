<template>
  <div>
    <topHeader equType="2" anaType="NengXiao-Xiebo" @change="handleTopChange" @topInfoSelect="topInfoSelect" thirdName="回路">
      <div class="flex" style="margin-left: 10px;">
        <p class="p-title" style="width: 90px;">选择时间:</p>
        <el-select class="time1" v-model="dateType" placeholder="请选择" @change="dateChange">
          <el-option v-for="(item, index) in dateList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
        <el-date-picker class="time2" v-model="startTime" type="date" placeholder="选择日期" :clearable="false" @change="handleDate" />
        <el-select class="time3" v-model="timeType" placeholder="请选择" @change="handleTime">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
        <p class="p-title">分析类型:</p>

        <el-cascader class="time3" expand-trigger="hover" :options="fenxiTypeList" v-model="fenxiType" @change="fenxiChange">
        </el-cascader>

        <p class="p-title">谐波次数:</p>
        <el-select class="time3" v-model="xieboNum" placeholder="请选择" @change="xieboChange">
          <el-option v-for="(item, index) in xieboNumList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
    </topHeader>
    <div style="background-color: #ffffff;">
      <!-- 电压谐波畸变率趋势 -->
      <div class="flex-bt">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>电压谐波畸变率</span>
          </div>
          <div>
            <p class="chartsTitle">{{ Apiancha.y[0].name }}</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="Apiancha" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">{{ Bpiancha.y[0].name }}</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="Bpiancha" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">{{ Cpiancha.y[0].name }}</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="Cpiancha" />
          </div>
        </div>
      </div>
      <!-- 电压谐波超限时长统计 -->
      <div class="flex-bt">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>电压谐波超限时长统计</span>
          </div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">A相电压谐波超限时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="300" pieWidth="100%" :dataList="pieDataA"></pieCharts>
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">B相电压谐波超限时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="300" pieWidth="100%" :dataList="pieDataB"></pieCharts>
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div style="padding-top: 20px;">
            <p class="chartsTitle">C相电压谐波超限时长占比</p>
            <pieCharts :hasTitle="hasTitle" pieHeight="300" pieWidth="100%" :dataList="pieDataC"></pieCharts>
          </div>
        </div>
      </div>
      <!-- 电压谐波畸变频谱图 -->
      <div class="flex-bt">
        <div class="right_side">
          <div class="flex title">
            <span class="blue_line"></span>
            <span>电压谐波畸变频谱图</span>
          </div>
          <div>
            <p class="chartsTitle">A相电压谐波畸变频谱图</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="xieboA" :hoverDetails="'畸变率 '" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">B相电压谐波畸变频谱图</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="xieboB" :hoverDetails="'畸变率 '" />
          </div>
        </div>
        <div class="right_side">
          <div class="flex title"></div>
          <div>
            <p class="chartsTitle">C相电压谐波畸变频谱图</p>
            <rCharts barWidth="100%" barHeight="320" :dataConfig="xieboC" :hoverDetails="'畸变率 '" />
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
      selectDeviceValue: [],
      dianliangSum: '',
      sunhaoliangSum: '',
      sunhaolvAvg: '',
      xieboNum: '总谐波',
      xieboNumList: [],
      fenxiType: ['电压', '畸变率'],
      sunhaoX: [],
      fenxiTypeList: [
        {
          value: '电压',
          label: '电压',
          children: [
            {
              value: '畸变率',
              label: '畸变率'
            }
          ]
        },
        {
          value: '电流',
          label: '电流',
          children: [
            {
              value: '畸变率',
              label: '畸变率'
            }
          ]
        }
      ],
      Apiancha: {
        xUnit: '',
        yUnit: '',
        y: [
          {
            name: '电压偏差',
            type: 'line',
            data: []
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
            data: []
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
            data: []
          }
        ],
        x: []
      },
      timeType: 'hour',
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
        {
          id: '1',
          name: '5分钟',
          value: '5'
        },
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
      xieboA: {
        xUnit: '谐波次数',
        yUnit: '电压畸变率（%）',
        y: [
          {
            name: '',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#36ADFF'
              }
            },
            data: []
          }
        ],
        x: []
      },
      xieboB: {
        xUnit: '谐波次数',
        yUnit: '电压畸变率（%）',
        y: [
          {
            name: '',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#36ADFF'
              }
            },
            data: []
          }
        ],
        x: []
      },
      xieboC: {
        xUnit: '谐波次数',
        yUnit: '电压畸变率（%）',
        y: [
          {
            name: '',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#36ADFF'
              }
            },
            data: []
          }
        ],
        x: []
      },
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
  created () {
    // 谐波选择
    this.xieboNumList = []
    this.xieboNumList = [{ name: '总谐波', value: '总谐波' }]
    for (let i = 2; i <= 63; i++) {
      let param = { name: i + '次谐波', value: i + '次谐波' }
      this.xieboNumList.push(param)
    }
  },
  mounted () {
    //谐波选择
    this.xieboNumList = []
    this.xieboNumList = [{ name: '总谐波', value: '总谐波' }]
    for (let i = 2; i <= 63; i++) {
      let param = { name: i + '次谐波', value: i + '次谐波' }
      this.xieboNumList.push(param)
    }
  },
  methods: {
    // 电压谐波数据
    getData () {
      let self = this
      let [, siteFid, equipFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equipFid,
        // time1: this.startTime,
        anaType: 'NengXiao-Xiebo',
        time: this.startTime,
        timeType: this.dateType,
        minute: this.timeType,
        elecType: this.fenxiType[0],
        jbPer: this.fenxiType[1],
        xiebo: this.xieboNum
      }

      self.$store.dispatch('xiebo', data).then(res => {
        // 电压偏差趋势数据
        //console.log(JSON.stringify(res))
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
          self.Apiancha.y.push(
            this.lineStyleItem(
              res.data[0].key1.Item1,
              '#13CF5A',
              res.data[0].key1.Item2
            )
          )
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

          self.Bpiancha.y.push(
            this.lineStyleItem(
              res.data[1].key1.Item1,
              '#13CF5A',
              res.data[1].key1.Item2
            )
          )
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

          self.Cpiancha.y.push(
            this.lineStyleItem(
              res.data[2].key1.Item1,
              '#13CF5A',
              res.data[2].key1.Item2
            )
          )
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
          self.pieDataA.push(self.formatPie(a.name, a.value, a.percent))
        }
        for (let b of res.pie.B) {
          self.pieDataB.push(self.formatPie(b.name, b.value, b.percent))
        }
        for (let c of res.pie.C) {
          self.pieDataC.push(self.formatPie(c.name, c.value, c.percent))
        }
      })
    },
    // 电压谐波畸变频谱图数据
    getXbData () {
      let self = this
      let [, siteFid, equipFid] = this.selectDeviceValue
      let data = {
        siteFid,
        equipFid,
        anaType: 'NengXiao-Xiebo',
        time: this.startTime,
        timeType: this.dateType,
        minute: this.timeType,
        elecType: this.fenxiType[0],
        jbPer: this.fenxiType[1]
      }
      self.$store.dispatch('xiebojb', data).then(res => {
        self.xieboA.y[0].data = res.A.yAxis
        self.xieboA.x = res.A.xAxis
        self.xieboB.y[0].data = res.B.yAxis
        self.xieboB.x = res.B.xAxis
        self.xieboC.y[0].data = res.C.yAxis
        self.xieboC.x = res.C.xAxis
      })
    },
    topInfoSelect (value) {
      this.selectDeviceValue = value
      this.getData()
      this.getXbData()
    },
    handleTopChange (value) {
      this.selectDeviceValue = value || []
      this.getData()
      this.getXbData()
    },
    // 选择日月年类型
    async dateChange (value) {
      this.dateType = value
      this.getData()
      this.getXbData()
    },
    // 选择日期
    async handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D')
      this.getData()
      this.getXbData()
    },
    // 选择时间
    async handleTime (value) {
      this.timeType = value
      this.getData()
      this.getXbData()
    },
    //分析类型：
    fenxiChange (value) {
      this.fenxiType = value
      this.getData()
      this.getXbData()
    },
    xieboChange () {
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
        yUnit: '',
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
  padding-left: 6px;
  width: 100px;
}

.blue_line {
  width: 4px;
  height: 22px;
  background: rgba(0, 111, 188, 1);
  margin-right: 8px;
}
</style>
