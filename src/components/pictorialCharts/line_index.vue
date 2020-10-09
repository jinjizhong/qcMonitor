<template>
  <!-- echarts 平滑线条图形 -->
  <div class="colum-index">
    <!-- <div class="header-title" v-if="normal"><img src="../../assets/image/icon_bt.png"/><span>{{title}}</span></div> -->
    <div v-if="normal"></div>
    <div class="title colum-index" v-else>{{title}}</div>
    <div class="charts-img" :id="uid" :style="{width: `${barWidth}px`, height: `${barHeight}px`}"></div>
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
      options: {},
      myChart: null
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
    /* 判断颜色 */
    bool: {
      type: Boolean,
      default: false
    },
    /* 判断是否平滑 */
    smooth: {
      type: Boolean,
      default: true
    },
    /* 判断是否有图标的标题 */
    normal: {
      type: Boolean,
      default: false
    },
    /* 数据 */
    dataConfig: {
      type: Object,
      default: null
    },
    hasShadow: {
      type: Boolean,
      default: false
    }

  },
  created () {
    this.uid = uuidv() //获取随机id
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
      this.myChart = this.$echarts.init(document.getElementById(this.uid));
      this.myChart.clear();
      this.myChart.setOption(this.options);
    },
    getOptions () {
      var self = this;
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              type: 'dashed'
            }
          },
          formatter: function (params) {

            if (params[0].value) {
              return params[0].name + self.dataConfig.x.unit + "\n" + params[0].value + self.dataConfig.y.unit;
            }
          }

        },
        grid: {
          containLabel: true,
          x: 10,
          y: 40,
          x2: 50,
          y2: 50 //距离下边的距离
        },
        xAxis: {
          type: 'category',
          name: self.dataConfig.x.unit,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            //interval:0,
            textStyle: {
              color: '#9ACBEA'
            }
          },
          nameGap: 20,
          nameTextStyle: {
            fontSize: 14, //字体大小
            color: '#9ACBEA',
            align: 'right'
          },
          data: self.dataConfig.x.data
        },
        yAxis: {
          type: 'value',
          name: self.dataConfig.y.unit,
          nameLocation: "end",
          nameGap: 30,
          nameTextStyle: { //字体样式
            fontSize: 14, //字体大小
            color: '#9ACBEA',
            //padding: 2, //距离坐标位置的距离
            verticalAlign: 'top'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: '#9ACBEA'
            }
          }
        },
        series: [{
          data: self.dataConfig.y.data,
          type: 'line',
          symbol: 'none', //取消折点圆圈
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: self.hasShadow ? '#00a8f6' : '#040b27',
                },
                {
                  offset: 1,
                  color: self.hasShadow ? '#00a8f6' : '#040b27',
                }
                ],
                globaCoord: false,
              }
            }
          }, //填充区域样式
          smooth: self.smooth,
          lineStyle: {
            color: self.bool ? '#00a8f6' : '#00C986'
          },
        }]
      }
    }
  }
}
</script>

<style scoped>
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

.charts-img {
}
</style>
