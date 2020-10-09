<template>
  <!-- echarts雷达图 -->
  <div :id="uid" :style="{
          width: raderWidth.indexOf('%') > 0 ? raderWidth : `${raderWidth}px`,
          height: `${raderHeight}px`}"></div>
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
    radius: {
      type: Number,
      default: 120
    },
    raderWidth: {
      type: [String, Number],
      default: 1000
    },
    raderHeight: {
      type: [String, Number],
      default: 1000
    },
    dataConfig: {
      type: [Array, Object],
      default () {
        return {
          indicator: [],
          range: [],
          name: '',
          value: []
        }
      }
    }

  },
  created () {
    this.uid = uuidv() //获取随机id
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
  mounted () { },
  methods: {
    getOptions () {
      this.options = {

        legend: {
          left: 'center',
          bottom: 80,
        },
        grid: {
          position: 'center',
        },
        radar: [
          {
            indicator: this.dataConfig.indicator,
            center: ['50%', '50%'],
            radius: this.radius,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
              formatter: '{value}',
              textStyle: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei',
                color: '#666666'
              }
            }
          }
        ],
        indicator: this.dataConfig.range,
        series: [
          {
            name: '',
            type: 'radar',
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 8, // 拐点的大小
            areaStyle: {
              normal: {
                width: 1,
                color: '#36ADFF'
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: '#0789E4'
              }
            },
            data: [
              {
                value: this.dataConfig.value,
                name: this.dataConfig.name,
                symbol: 'circle',
                symbolSize: 5,

                lineStyle: {
                  normal: {
                    color: '#36ADFF'
                  }
                }
              }
            ]
          }
        ]
      };
    },
    getCharts () {
      const myChart = this.$echarts.init(document.getElementById(this.uid));
      myChart.clear()
      myChart.setOption(this.options)
    }
  }
}
</script>

<style>
</style>
