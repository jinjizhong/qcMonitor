<template>
  <!-- echarts 多环形带注解图 -->
  <div :id="uid" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>

<script>
import uuidv from 'uuid/v1'
export default {
  data () {
    return {
      uid: '',
      options: {},
      arrName: [],
      arrValue: [],
      sum: 0,
      pieSeries: [],
      lineYAxis: []
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: 1000
    },
    height: {
      type: [String, Number],
      default: 1000
    },
    // 数据
    chartData: {
      type: Array,
      default () {
        return []
      }
    },
    // 颜色
    color: {
      type: Array,
      default () {
        return ['#3361F5', '#65FFFF', '#F58E33', '#FF659B']
      }
    },
    grid: {
      type: Object,
      default () {
        return {
          top: '25%',
          bottom: '50%',
          left: "40%"
        }
      }
    }
  },
  created () {
    this.uid = uuidv() //获取随机id
  },
  watch: {
    chartData: {
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
      var self = this
      self.sortChartsData()
      self.options = {
        color: self.color,
        grid: self.grid,
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (params) {
              let item = self.chartData[params];
              //console.log(item)
              return '{line|}{circle|●}{textColor|' + item.name + '} {textColor|' + item.percent + '}'
            },
            interval: 0,
            inside: true,
            textStyle: {
              color: "#333",
              fontSize: 14,
              rich: {
                line: {
                  width: 50,
                  height: 0.5,
                  backgroundColor: '#B4D1F9'
                },
                textColor: {
                  color: 'rgba(154, 203, 234, 1)',
                  fontSize: 14,
                }
              }
            },
            show: true
          },
          data: self.lineYAxis
        }],
        xAxis: [{
          show: false
        }],
        series: self.pieSeries
      }
    },
    getCharts () {
      const myChart = this.$echarts.init(document.getElementById(this.uid))
      myChart.clear()
      myChart.setOption(this.options)
    },
    // 处理数据和图表整理
    sortChartsData () {
      // 数据处理
      let self = this
      self.pieSeries = []
      self.arrName = []
      self.arrValue = []
      self.chartData.forEach(v => {
        self.arrName.push(v.name);
        self.arrValue.push(v.value);
        self.sum = self.sum + v.value;
      })
      // 图表option整理
      self.chartData.forEach((v, i) => {
        self.pieSeries.push({
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
          center: ["40%", "60%"],
          label: {
            show: false
          },
          data: [{
            value: v.value,
            name: v.name
          }, {
            value: self.sum - v.value,
            name: '',
            itemStyle: {
              color: "rgba(0,0,0,0)"
            }
          }]
        });
        self.pieSeries.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
          center: ["40%", "60%"],
          label: {
            show: false
          },
          data: [{
            value: 7.5,
            itemStyle: {
              color: "#04061d"
            }
          }, {
            value: 2.5,
            name: '',
            itemStyle: {
              color: "rgba(0,0,0,0)"
            }
          }]
        });
        v.percent = (v.value / self.sum * 100).toFixed(1) + "%";
        self.lineYAxis.push({
          value: i,
          textStyle: {
            rich: {
              circle: {
                color: self.color[i],
                padding: [0, 5]
              }
            }
          }
        });
      })
    }
  }
}
</script>

<style scoped>
</style>
