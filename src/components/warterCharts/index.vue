<template>
  <!-- echarts的水球图 -->
  <div :id="elId" :style="{width: warterWidth.indexOf('%') > 0 ? warterWidth : `${warterWidth}px`,
					height: warterHeight.indexOf('%') > 0 ? warterHeight : `${warterHeight}px`}"></div>
</template>

<script>
import '../../../node_modules/echarts-liquidfill/src/liquidFill.js'
import uuid from 'uuid/v1'
export default {
  props: {
    warterWidth: {
      type: [String, Number],
      default: "100%"
    },
    warterHeight: {
      type: [String, Number],
      default: "100%"
    },
    bgcolor: {
      type: String,
      default: "#FFFFFF"
    },
    font: {
      type: Array,
      default () {
        return ['#FFFFFF', 50]
      }
    },
    outLine: {
      type: Object,
      default () {
        return { show: false }
      }
    },
    dataConfig: {
      type: Array,
      default () {
        return []
      }
    },
    shadowBlur: {
      type: [String, Number],
      default: "35"
    },
    opacity: {
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {
      elId: '',
      options: {},
      myChart: null
    }
  },
  created () {
    this.elId = uuid();
  },
  watch: {
    dataConfig: {
      handler () {
        this.myChart.dispose()
        this.getOptions()
        this.getCharts()
      },
      deep: true
    }
  },
  mounted () {
    this.getOptions();
    this.getCharts();
  },
  methods: {
    getCharts () {
      this.myChart = this.$echarts.init(document.getElementById(this.elId));
      this.myChart.clear()
      this.myChart.setOption(this.options)
    },
    getOptions () {
      this.options = {
        // title: {
        //   text: (this.dataConfig[0] * 100).toFixed(0) + '{a|%}',
        //   textStyle: {
        //     fontSize: 50,
        //     fontFamily: 'Microsoft Yahei',
        //     fontWeight: 'normal',
        //     color: '#bcb8fb',
        //     rich: {
        //       a: {
        //         fontSize: 28,
        //       }
        //     }
        //   },
        //   x: 'center',
        //   y: '35%'
        // },
        series: [{
          type: 'liquidFill',
          radius: '92%',  //水球的半径
          data: [this.dataConfig[0]],
          itemStyle: {
            color: this.dataConfig[1],
            opacity: this.opacity,//波浪的透明度
            shadowBlur: this.shadowBlur,//波浪的阴影范围
            shadowColor: '#999'//阴影颜色
          },
          backgroundStyle: {
            borderColor: this.dataConfig[1],
            borderWidth: 1.5,
            color: this.bgcolor
          },
          outline: this.outLine,
          /* 
             {
                  show: true,
                  borderDistance: 8, //边框距离
                  itemStyle: {
                    borderWidth: 1,
                    borderColor: this.dataConfig[1],
                    shadowBlur: 10,
                    shadowColor: '#FFFFFF'
                  }
                }
          */
          label: {
            formatter: this.dataConfig[3] == '' ? '{a|' + this.dataConfig[2] + '}' : ['{a|' + this.dataConfig[2] + '}', '{b|' + this.dataConfig[3] + '}'].join('\n'),
            position: ["50%", "50%"],
            rich: {
              a: {
                color: this.font[0],
                fontSize: this.font[1],
                fontFamily: 'DIN',
                fontWeight: 400
              },
              b: {
                fontSize: 14,
                fontFamily: 'Microsoft YaHei',
                fontWeight: 400,
                color: this.font[0],
                lineHeight: 30
              }
            }
          }
        }]
      }
    }
  }
}
</script>

<style>
</style>
