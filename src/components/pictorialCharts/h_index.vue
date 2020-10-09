<template>
  <!-- echarts 竖直重叠柱状图 -->
  <div class="p-index">
    <!-- <div class="title">{{title}}</div> -->
    <div
      class="charts-img"
      :id="uid"
      :style="{ width: `${barWidth}px`, height: `${barHeight}px` }"
    ></div>
  </div>
</template>

<script>
import uuidv from 'uuid/v1'
export default {
  data() {
    return {
      uid: '',
      options: {}
    }
  },
  props: {
    title: {
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
    dataConfig: {
      type: Object,
      default() {
        return null
      }
    },
    popParams: {
      type: String,
      default: ''
    }
  },
  created() {
    this.uid = uuidv() //获取随机id
  },
  watch: {
    dataConfig: {
      handler() {
        this.getOptions()
        this.getCharts()
      },
      deep: true
    }
  },
  mounted() {
    this.getOptions()
    this.getCharts()
  },
  methods: {
    getOptions() {
      var self = this
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return self.popParams === ''
              ? params[0].name + '执行' + '<br/>' + params[0].value + '个'
              : self.popParams + '：' + params[0].value
          }
        },
        grid: {
          containLabel: true,
          x: 10,
          y: 32,
          x2: 30,
          y2: 32 //距离下边的距离
        },
        legend: {
          bottom: 0,
          left: 'center',
          textStyle: { color: '#A0B5D4' },
          data: this.dataConfig.y.map(item => {
            return item.name
          })
        },
        xAxis: {
          name: this.dataConfig.xUnit,
          nameLocation: 'end',
          nameTextStyle: {
            //字体样式
            fontSize: 16, //字体大小
            color: '#9ACBEA',
            //padding: -20 //距离坐标位置的距离
            align: 'center',
            verticalAlign: 'top'
          },
          data: this.dataConfig.x,
          axisTick: { show: true },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#666666'
            }
          }
        },
        yAxis: {
          name: this.dataConfig.yUnit,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(144,155,176,0.1)'
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#666666'
            }
          },
          offset: 10,
          nameGap: 20,
          nameTextStyle: {
            fontSize: 16, //字体大小
            color: '#9ACBEA',
            //padding: -20 //距离坐标位置的距离
            align: 'right'
          }
        },
        color: ['#FF1B1B', '#FF8E29', '#36ADFF'],
        series: this.dataConfig.y
      }
    },
    getCharts() {
      const myChart = this.$echarts.init(document.getElementById(this.uid))
      myChart.clear()
      myChart.setOption(this.options)
    }
  }
}
</script>

<style scoped>
.p-index {
  margin-left: 10px;
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
.charts-img {
}
</style>
