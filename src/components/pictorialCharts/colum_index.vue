<template>
  <!-- echarts 横向堆叠柱状图 -->
  <div class="colum-index">
    <div class="header-title" v-if="title !== ''">
      <img src="../../assets/image/icon_bt.png" /><span>{{ title }}</span>
    </div>
    <div class="flex">
      <div class="charts-img" :id="uid" :style="{
          width: barWidth.indexOf('%') > 0 ? barWidth : `${barWidth}px`,
          height: barHeight.indexOf('%') > 0 ? barHeight : `${barHeight}px`
        }"></div>
      <img v-if="hasSwich" class="swichImg" src="../../assets/image/energy/icon_paixu.png" @click="swich" alt="" />
    </div>
  </div>
</template>

<script>
import uuidv from 'uuid/v1'
export default {
  data () {
    return {
      uid: '',
      color1: ['#3299F5', '#35B271'],
      color2: ['#FC7635', '#B9A80A'],
      options: {}
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    // X轴单位名
    xName: {
      type: String,
      default: ''
    },
    // y轴单位名
    yName: {
      type: String,
      default: ''
    },
    barWidth: {
      type: [String, Number],
      default: 1000
    },
    barHeight: {
      type: [String, Number],
      default: 1000
    },
    normal: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Object,
      default () {
        return {}
      }
    },
    hasSwich: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.uid = uuidv() //获取随机id
  },
  watch: {
    dataList: {
      handler () {
        this.getOptions()
        this.getCharts()
      },
      deep: true
    }
  },
  mounted () {
    this.getOptions()
    this.getCharts()
  },
  methods: {
    getOptions () {
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          bottom: 5,
          left: 'center',
          textStyle: { color: '#A0B5D4' },
          data: this.dataList.nameList || []
        },
        grid: {
          containLabel: true,
          x: 30,
          y: 26,
          x2: 65,
          y2: 35 //距离下边的距离
        },
        color: this.normal ? this.color1 : this.color2,
        xAxis: {
          type: 'value',
          name: this.xName,
          nameLocation: 'end',
          nameTextStyle: {
            //字体样式
            fontSize: 12, //字体大小
            color: '#4D4D4D',
            padding: 5, //距离坐标位置的距离
            verticalAlign: 'top'
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#909BB0',
              opacity: 0.1
            }
          },
          axisLine: { show: true },
          axisLabel: {
            textStyle: {
              color: '#4D4D4D'
            }
          }
        },
        yAxis: {
          type: 'category',
          name: this.yName,
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: '#4D4D4D'
            }
          },
          nameGap: 5,
          nameTextStyle: {
            fontSize: 12, //字体大小
            color: '#4D4D4D',
            align: 'right'
          },
          data: this.dataList.y
        },
        series: this.dataList.x
      }
    },
    getCharts () {
      const myChart = this.$echarts.init(document.getElementById(this.uid))
      myChart.clear()
      myChart.setOption(this.options)
    },
    swich () {
      this.$emit('swich')
    }
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
}
.colum-index {
  margin-left: 10px;
}
.header-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  margin-top: 10px;
}
.header-title span {
  padding-left: 8px;
}
.title {
  color: #9acbea;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 20px;
  padding: 0;
}
.flex {
  display: flex;
  position: relative;
}
.swichImg {
  width: 16px;
  height: 18px;
  position: absolute;
  right: 20px;
  top: 0;
}
</style>
