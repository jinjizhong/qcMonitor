<template>
  <!-- echarts标准图-->
  <div class="p-index">
    <div class="title">{{ title }}</div>
    <div class="charts-img" :id="uid" :style="{
        width: barWidth.indexOf('%') > 0 ? barWidth : `${barWidth}px`,
        height: `${barHeight}px`
      }"></div>
  </div>
</template>

<script>
import uuidv from 'uuid/v1'
export default {
  data () {
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
      default () {
        return null
      }
    },
    hoverDetails: {
      type: String,
      default () {
        return ''
      }
    },
    // y轴侧边显示
    yList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.uid = uuidv() //获取随机id
  },
  mounted () {
    this.getOptions()
    this.getCharts()
  },
  watch: {
    dataConfig: {
      handler () {
        this.getOptions()
        this.getCharts()
      },
      deep: true
    }
  },
  methods: {
    getOptions () {
      let self = this
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            let backParams = ''

            if (self.hoverDetails == '') {
              backParams =
                params[0].name +
                self.dataConfig.xUnit +
                '<br/>' +
                params[0].value +
                self.dataConfig.yUnit
            } else {
              backParams =
                self.dataConfig.xUnit +
                params[0].name +
                '<br/>' +
                self.hoverDetails +
                params[0].value +
                '%'
            }
            return backParams
          }
        },
        grid: {
          containLabel: true,
          y: 43,
          x2: 60,
          y2: 60 //距离下边的距离
        },
        legend: {
          bottom: 12,
          left: 'center',
          textStyle: { color: '#666666' },
          data: this.dataConfig.y.map(item => {
            return item.name
          })
        },
        xAxis: {
          name: this.dataConfig.xUnit,
          nameLocation: 'end',
          nameTextStyle: {
            //字体样式
            fontSize: 14, //字体大小
            color: '#666666',
            padding: 20, //距离坐标位置的距离
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
          min: this.yList.length > 0 ? this.yList[0].min : null,
          max: this.yList.length > 0 ? this.yList[0].max : null,
          interval: this.yList.length > 0 ? this.yList[0].interval : null,
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
            fontSize: 14, //字体大小
            color: '#666666',
            // / padding: -50, //距离坐标位置的距离
            align: 'top'
          }
        },
        color: [
          '#3299F5',
          '#35B271',
          '#F38051',
          '#88b0bb',
          '#1c7099',
          '#038cc4',
          '#75abd0',
          '#afd6dd'
        ],
        series: this.dataConfig.y
      }
    },
    getCharts () {
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
