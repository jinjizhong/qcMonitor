<template>
  <!-- echarts不规则的山峰形状图 -->
  <div class="p-index">
    <div class="title">{{title}}</div>
    <div class="charts-img" :id="uid" :style="{width: `${barWidth}px`, height: `${barHeight}px`}"></div>
  </div>
</template>

<script>
import uuidv from 'uuid/v1'
export default {
  data () {
    return {
      uid: '',
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
    dataConfig: {
      type: Object,
      default: null
    }

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
  created () {
    this.uid = uuidv() //获取随机id
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
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + '月执行工单  ' + params[0].value + '个';
          }
        },
        // grid: {
        // 	left: 10,
        // 	right: 10,
        // 	top: "30%",
        // 	bottom: "6%",
        // 	containLabel: true
        // },
        xAxis: {
          name: '(月)',
          nameLocation: "end",
          nameTextStyle: {//字体样式
            fontSize: 16,//字体大小
            color: '#9ACBEA',
            //padding: -20 //距离坐标位置的距离
            align: 'center',
            verticalAlign: 'top'

          },
          data: this.dataConfig.x,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#9ACBEA'
            }
          }
        },
        yAxis: {
          name: '(个)',
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#9ACBEA'
            }
          },
          offset: 10,
          nameGap: 20,
          nameTextStyle: {
            fontSize: 16,//字体大小
            color: '#9ACBEA',
            //padding: -20 //距离坐标位置的距离
            align: 'right'
          }
        },
        color: ['#00A8F6'],
        series: [{
          type: 'pictorialBar',
          barCategoryGap: '-30%',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              opacity: 0.5
            },
            emphasis: {
              opacity: 1
            }
          },
          data: this.dataConfig.y
        }]
      }
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
