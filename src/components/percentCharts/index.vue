<template>
  <div class="charts_inset_shadow flex_row_center pos_relative"
       :style="{width: `${perWidth}px`, height: `${perHeight}px`}">
    <div class="title">
      <img style="width: 29px; height: 13px; margin-right: 8px;"
           src="../../assets/image/icon_bt.png"
           alt="image">
      <span>
        {{title}}
      </span>
    </div>
    <div :id="elId"
         :style="{width: `${perWidth}px`, height: `${perHeight}px`}">
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: "percentCharts",
  props: {
    title: {
      type: [String],
      default: ''
    },
    perWidth: {
      type: [String, Number],
      default: 1000
    },
    perHeight: {
      type: [String, Number],
      default: 1000
    },
    dataList: {
      type: Array,
      default () {
        return []
      }

    }
  },
  data () {
    return {
      elId: ''
    }
  },
  created () {
    this.elId = uuidv1() //获取随机id
  },
  mounted () {
    let pathSymbols = {
      people: 'path://M96.58,56.13c12.66,0,22.93-10.85,22.93-24.24S109.24,7.65,96.58,7.65,73.66,18.5,73.66,31.89,83.93,56.13,96.58,56.13ZM112,66.86H82.15A36.73,36.73,0,0,0,56.6,76.92v48.84H79l4.82,66.59h27.41l4.67-66.59h22.75V78.1A36.6,36.6,0,0,0,112,66.86Z',
      car: 'path://M190.13,85.08,155.27,48.62a8.14,8.14,0,0,0-5.91-2.54H118.57v-10a14.6,14.6,0,0,0-14.44-14.75H22A14.59,14.59,0,0,0,7.52,36.1V138.75a8.35,8.35,0,0,0,8.26,8.44h4.11c0,14.88,11.84,26.94,26.42,26.94s26.4-12.06,26.42-26.94h54.6c0,14.88,11.84,26.94,26.42,26.94s26.4-12.06,26.43-26.94h12.3V91A8.48,8.48,0,0,0,190.13,85.08ZM56.22,147.19a9.91,9.91,0,1,1-19.82,0v0a9.91,9.91,0,1,1,19.82,0Zm107.44,0a9.91,9.91,0,1,1-19.82,0v0a9.91,9.91,0,1,1,19.82,0ZM176,109.28H126.42V62.92h15.87a8.2,8.2,0,0,1,5.91,2.54L176,94.4Z'
    };

    let labelSetting = {
      normal: {
        show: true,
        position: 'right',
        formatter: '{c}%',
        offset: [5, 0],
        textStyle: {
          fontSize: 16,
          color: '#A0B5D4'
        }
      }
    };
    const option = { // 进行相关配置
      tooltip: {
        trigger: 'axis',
        formatter: "{a} <br/>{b} : {c}%",
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        containLabel: true,
        x: 25,
        y: 63,
        x2: 60,
        y2: 30 //距离下边的距离
      },
      yAxis: {
        data: ['车辆', '运维'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 16,
            color: '#A0B5D4'
          }
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [{
        name: '2019',
        type: 'pictorialBar',
        label: labelSetting,
        symbolRepeat: true,
        barCategoryGap: '5%',
        data: [{
          value: this.dataList[0].car,
          symbol: pathSymbols.car,
          symbolSize: [23, 19],
          itemStyle: {
            normal: {
              color: "#f38051",
              borderColor: "#f38051"
            }
          }
        }, {
          value: this.dataList[1].people,
          symbol: pathSymbols.people,
          symbolSize: [12, 27],
          itemStyle: {
            normal: {
              color: "#35b271",
              borderColor: "#35b271"
            }
          }
        }]
      }]
    }
    this.getCharts(option)
  },
  methods: {
    getCharts (option) {
      const myChart = this.$echarts.init(document.getElementById(this.elId));
      myChart.setOption(option)
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
</style>
