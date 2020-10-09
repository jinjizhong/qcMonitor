<template>
  <div :class="{ charts_inset_shadow: isBorder, pos_relative: true }" :style="{
      width: barWidth.indexOf('%') > 0 ? barWidth : `${barWidth}px`,
      height: barHeight.indexOf('%') > 0 ? barHeight : `${barHeight}px`
    }">
    <div class="title" v-if="title !== ''">
      <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/icon_bt.png" alt="image" />
      <span>
        {{ title }}
      </span>
    </div>
    <div class="flex">
      <div :id="elId" :style="{
          width: barWidth.indexOf('%') > 0 ? barWidth : `${barWidth}px`,
          height: barHeight.indexOf('%') > 0 ? barHeight : `${barHeight}px`
        }"></div>
      <img v-if="hasSwich" class="swichImg" src="../../assets/image/energy/icon_paixu.png" @click="swich" alt="" />
    </div>
    <!-- <div :id="elId" :style="{
        width: barWidth.indexOf('%') > 0 ? barWidth : `${barWidth}px`,
        height: barHeight.indexOf('%') > 0 ? barHeight : `${barHeight}px`
      }"></div> -->
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: 'barCharts',
  props: {
    isBorder: {
      type: Boolean,
      default: false
    },
    // 标题名称
    title: {
      type: [String],
      default: ''
    },
    // 图表宽
    barWidth: {
      type: [String, Number],
      default: '100%'
    },
    // 图表高
    barHeight: {
      type: [String, Number],
      default: '100%'
    },
    // 是否横向排列柱状图
    isRow: {
      type: Boolean,
      default: false
    },
    // 是否需要Y轴右侧单位（unitR参数受其控制）
    needSecondUnit: {
      type: Boolean,
      default: false
    },
    // x轴单位
    unit: {
      type: String,
      default: ''
    },
    // Y轴左单位
    unitL: {
      type: String,
      default: ''
    },
    // Y轴右单位
    unitR: {
      type: String,
      default: ''
    },
    // X轴名称
    xName: {
      type: Array,
      default () {
        return []
      }
    },
    // y轴名称
    yName: {
      type: Array,
      default () {
        return []
      }
    },
    // y轴侧边显示
    yList: {
      type: Array,
      default () {
        return []
      }
    },
    // 图表所需数据
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    //返回值的hover值
    returnRes: {
      type: Array,
      default () {
        return []
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
          '#3ED381',
          '#00A8F6',
          '#FF9239',
          '#18D671',
          '#FF3636',
          '#36ADFF',
          '#006FBC',
          '#1c7099',
          '#038cc4',
          '#75abd0',
          '#afd6dd'
        ]
      }
    },
    // 是否需要工具栏
    needToolBox: {
      type: Boolean,
      default: false
    },
    // X轴显示间隔
    axisXInterval: {
      type: [Object, Number],
      default: null
    },
    // 是否需要排序按钮
    hasSwich: {
      type: Boolean,
      default: false
    },
    // 图标轴线颜色
    fontChartsColor: {
      type: String,
      default: '#666666'
    },
    //x,y轴边线的颜色
    lineChartsColor: {
      type: String,
      default: '#666666'
    },
    // y轴最小值间距
    yMin: {
      type: Number,
      default: 0
    },
    // x轴是否从0刻度开始
    boundaryGap: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      elId: '',
      options: {},
      myChart: null
    }
  },
  watch: {
    dataList: {
      handler () {
        this.myChart.dispose()
        this.getOptions()
        this.getCharts()
      },
      deep: true
    },
    barWidth () {
      this.myChart.dispose()
      this.getOptions()
      this.getCharts()
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
    swich () {
      this.$emit('swich')
    },
    getOptions () {
      let series = this.dataList
      let myToolBox = this.needToolBox
        ? {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['bar', 'line'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        }
        : null
      let self = this
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          // 悬浮显示格式
          formatter: function (a) {
            let listItem = '<div><p>' + a[0].name + '</p></div>'
            for (let i = 0; i < a.length; i++) {
              let unitValue = a[i].value ? a[i].value : ''
              listItem += `<p>${a[i].marker}${a[i].seriesName}:${unitValue}</p>`
            }
            if (self.returnRes.length == 0 && self.returnRes[0] !== 'format') {
              return listItem;
            } else if (self.returnRes[0] == 'format') {
              let formatItem = '<div><p>' + a[0].name + '</p></div>'
              for (let i = 0; i < a.length; i++) {
                let seriesName = a[i].seriesName == '' ? self.returnRes[1] : a[i].seriesName
                formatItem += '<p>' + a[i].marker + seriesName + ':' + a[i].value + self.dataList[i].unit + '</p>'
              }
              return formatItem;
            } else {
              let it = `<div><p>${self.returnRes[0]}${a[0].name}${self.returnRes[1]}</p></div>`
              for (let i = 0; i < a.length; i++) {
                let unitValue = a[i].data ? `${a[i].data}${self.dataList[i].unit}` : ''
                it += `<p>${a[i].marker}${a[i].seriesName}:${unitValue}</p>`
              }
              return it;
            }

          }
        },
        // 工具栏
        toolbox: myToolBox,
        grid: {
          containLabel: true,
          x: this.gridPos[0],
          y: this.gridPos[1],
          x2: this.gridPos[2],
          y2: this.gridPos[3] //距离下边的距离
        },
        legend: {
          bottom: 8,
          left: 'center',
          textStyle: { color: '#A0B5D4' },
          data: this.dataList.map(item => {
            return item.name
          })
        },
        color: this.chartColorList,
        xAxis: {
          type: this.isRow ? 'value' : 'category',
          boundaryGap: !this.boundaryGap, //刻度从0开始
          name: this.unit,
          nameTextStyle: {
            color: this.fontChartsColor,
          },
          data: this.yName.length > 0 ? [] : this.xName,
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: this.lineChartsColor //左边线的颜色
              // width: '2'//坐标线的宽度
            }
          },
          axisLabel: {
            interval: this.axisXInterval,
            textStyle: {
              color: this.fontChartsColor //坐标值得具体的颜色
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: this.isRow ? 'category' : 'value',
            data: this.yName.length > 0 ? [] : this.xName,
            name: this.unitL,
            nameLocation: 'end',
            nameGap: 30,
            nameTextStyle: {
              //字体样式
              fontSize: 14, //字体大小
              color: this.fontChartsColor,
              //padding: 2, //距离坐标位置的距离
              verticalAlign: 'top'
            },
            min: this.yList.length > 0 ? this.yList[0].min : null,
            max: this.yList.length > 0 ? this.yList[0].max : null,
            minInterval: this.yMin,
            interval: this.yList.length > 0 ? this.yList[0].interval : null,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: this.lineChartsColor //左边线的颜色
              }
            },
            axisLabel: {
              // formatter: 'value',
              textStyle: {
                color: this.fontChartsColor //坐标值得具体的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(144,155,176,0.1)'
              }
            }
          },
          this.needSecondUnit
            ? {
              type: this.isRow ? 'category' : 'value',
              data: this.xName.length > 0 ? [] : this.yName,
              name: this.unitR,
              min: this.yList.length > 1 ? this.yList[1].min : null,
              max: this.yList.length > 1 ? this.yList[1].max : null,

              interval: this.yList.length > 1 ? this.yList[1].interval : null,
              // axisLine: {
              //   lineStyle: {
              //     type: 'solid',
              //     color: '#0D3B6D' //左边线的颜色
              //     // width: '2'//坐标线的宽度
              //   }
              // },
              axisLabel: {
                // formatter: '{value}%',
                textStyle: {
                  color: this.fontChartsColor//坐标值得具体的颜色
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(144,155,176,0.1)'
                }
              }
            }
            : null
        ],
        series: series
      }
    },
    getCharts () {
      this.myChart = this.$echarts.init(document.getElementById(this.elId))
      this.myChart.clear()
      this.myChart.setOption(this.options)
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
.none-title {
  color: #9acbea;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 16px;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
.top-to {
  padding-top: 20px;
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
