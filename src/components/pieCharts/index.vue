<template>
  <div :class="{ charts_inset_shadow: isBorder, pos_relative: true }" :style="{
        width: pieWidth.indexOf('%') > 0 ? pieWidth : `${pieWidth}px`,
        height: pieHeight.indexOf('%') > 0 ? pieHeight : `${pieHeight}px`
    }">
    <div class="title" v-if="hasTitle">
      <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/icon_bt.png" alt="image" />
      <span>
        {{ title }}
      </span>
    </div>
    <div :id="elId" :style="{
        width: pieWidth.indexOf('%') > 0 ? pieWidth : `${pieWidth}px`,
        height: pieHeight.indexOf('%') > 0 ? pieHeight : `${pieHeight}px`
      }"></div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: 'pieCharts',
  props: {
    isBorder: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String],
      default: ''
    },
    hasTitle: {
      type: Boolean,
      default: false
    },
    pieWidth: {
      type: [String, Number],
      default: '100%'
    },
    pieHeight: {
      type: [String, Number],
      default: '100%'
    },
    isLoopPie: {
      type: Boolean,
      default: false
    },
    // 饼图标题位置
    piePosition: {
      type: Array,
      default () {
        return ['horizontal', 'center', 'bottom']
      }
    },
    // 图表定位
    gridPos: {
      type: Array,
      default () {
        return [30, 32, 30, 50]
      }
    },
    //自定义图标颜色列表
    chartColorList: {
      type: Array,
      default () {
        return [
          '#00A8F6',
          '#F38051',
          '#3ED381',
          '#FFFF00',
          '#367BF8',
          '#D9424D',
          '#038cc4',
          '#75abd0',
          '#afd6dd'
        ]
      }
    },
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    pieBottom: {
      type: [String, Number],
      default: 15
    }
  },
  data () {
    return {
      elId: '',
      options: {},
      num: ''
    }
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
  created () {
    this.elId = uuidv1() //获取随机id
  },
  mounted () {
    this.getOptions()
    this.getCharts()
  },
  methods: {
    getOptions () {
      // this.num = this.dataList.sort(function(a, b) {
      //   return a.value - b.value
      // })
      let colorList = this.chartColorList
      this.options = {
        // 进行相关配置
        // backgroundColor: '#04061E',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: this.pieBottom,
          textStyle: { color: '#A0B5D4' },
          data: this.dataList.map(item => {
            return item.name
          })
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: this.isLoopPie ? ['35%', '45%'] : '45%',
            center: ['50%', '50%'],
            data: this.dataList,
            roseType: this.isLoopPie ? '' : 'radius',
            label: {
              normal: {
                textStyle: {
                  color: '#A0B5D4'
                },
                formatter: '{d}%' //百分比显示
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#A0B5D4'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function (params) {
                  //自定义颜色
                  return colorList[params.dataIndex]
                }
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
              return Math.random() * 200
            }
          }
        ]
      }
    },
    getCharts () {
      const myChart = this.$echarts.init(document.getElementById(this.elId))
      myChart.setOption(this.options)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: #9acbea;
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 16px;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
