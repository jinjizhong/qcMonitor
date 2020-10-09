<template>
  <!-- 环饼图 -->
  <div class="pos_relative" :style="{
        width: pieWidth.indexOf('%') > 0 ? pieWidth : `${pieWidth}px`,
        height: `${pieHeight}px`
      }">
    <div class="title" v-if="hasTitle">
      <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/icon_bt.png" alt="image" />
      <span>
        {{ title }}
      </span>
    </div>
    <div :id="elId" :style="{
        width: pieWidth.indexOf('%') > 0 ? pieWidth : `${pieWidth}px`,
        height: `${pieHeight}px`
      }" :class="hasTitle ? 'mr-top' : ''"></div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: 'pieCharts',
  props: {
    dataList: {
      type: Array,
      default () {
        return []
      }
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
      default: 1000
    },
    pieHeight: {
      type: [String, Number],
      default: 1000
    },
    // 是否为环饼图
    isLoopPie: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    },
    fontColor: {
      type: String,
      default: '#333333'
    },
    showLable: {
      type: Boolean,
      default: true
    },
    // 标题名字
    titleText: {
      type: [String],
      default: ''
    },
    // 环饼中间文字
    centerText: {
      type: [String],
      default: ''
    },
    // 环饼中间文字
    centerSize: {
      type: [Number, String],
      default: 18
    },
    // 环饼中间文字颜色
    centerTextColor: {
      type: [String],
      default: '#13CF5A'
    },
    // 环饼中间次要文字
    centerSubtext: {
      type: [String],
      default: ''
    },
    // 环饼标题位置
    piePosition: {
      type: Array,
      default () {
        return ['horizontal', 'center', 'bottom']
      }
    },
    // 环饼直径大小
    pieRadius: {
      type: Array,
      default () {
        return ['50%', '70%']
      }
    },
    //自定义图标颜色列表
    chartColorList: {
      type: Array,
      default () {
        return [
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
    //隐藏选项标题
    hideTitle: {
      type: Boolean,
      default: false
    },
    //鼠标经过的特效
    hoverAnimation: {
      type: Boolean,
      default: true
    },
    // 禁止显示详情
    noDetail: {
      type: Boolean,
      default: false
    },
    // 是否为玫瑰图
    roseType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      elId: '',
      options: {},
      mychart: null
    }
  },
  created () {
    this.elId = uuidv1() //获取随机id
  },
  mounted () {
    this.getOptions()
    this.getCharts()
  },
  watch: {
    dataList: {
      handler () {
        this.myChart.dispose()
        this.getOptions()
        this.getCharts()
      },
      deep: true
    }
  },
  methods: {
    getOptions () {
      let lenData = []
      this.dataList.map(item => {
        lenData.push(item.name)
      })

      this.options = {
        title: {
          text: this.titleText,
          left: 'center'
        },
        tooltip: this.noDetail ? null : {
          show: true, //防止鼠标移到不需要的数据上弹出label
          trigger: 'item',
          formatter: value => {
            return `${value.data.name}: ${value.data.value}%`
          }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: this.centerText,
            textAlign: 'center',
            fontSize: this.centerSize,
            fill: this.centerTextColor
          }
        },
        color: this.chartColorList,
        legend: {
          orient: this.piePosition[0],
          x: this.piePosition[1],
          y: this.piePosition[2],
          align: 'left',
          //backgroundColor:'#04061d',
          itemHeight: 15, //图例的高度
          itemWidth: 15,
          textStyle: {
            fontSize: 14, //字体大小
            color: this.fontColor //字体颜色
          },
          itemGap: 6, //图例之间的间距
          data: this.hideTitle ? [] : lenData //图例的名字需要和饼图的name一致，才会显示图例
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: this.isLoopPie ? '50%' : this.pieRadius,
            roseType: this.isLoopPie && this.roseType ? 'radius' : '',
            hoverAnimation: this.hoverAnimation, //鼠标经过的特效
            label: {
              normal: {
                show: this.showLable
              }
            },
            itemStyle: {
              normal: {
                labelLine: {
                  show: true
                },
                label: {
                  show: true
                }
              }
            },
            data: this.dataList
          }
        ]
      }
    },
    //数据为零时隐藏线段  
    lineHide (opt) {
      // for (let item of opt.data) {
      //   if (item.value == 0 || this.noDetail) {
      //     opt.itemStyle.normal.labelLine.show = false
      //     opt.itemStyle.normal.label.show = false
      //   }
      // }
      if (this.noDetail) {
        opt.itemStyle.normal.labelLine.show = false
        opt.itemStyle.normal.label.show = false
      }
    },
    getCharts () {
      this.myChart = this.$echarts.init(document.getElementById(this.elId))
      this.myChart.clear()
      let opt = this.options.series[0]
      this.lineHide(opt)
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
  top: 26px;
  left: 16px;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
.mr-top {
  margin-top: 26px;
}
</style>
