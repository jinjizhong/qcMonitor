<template>
  <div :id="elId" :dataList="dataList" :style="{width: `${width}px`, height: `${height}px`}"></div>
</template>

<script>
import uuid from 'uuid/v1'
import HighCharts from 'highcharts'
export default {
  name: 'highCharts3D饼图',
  props: {
    width: {
      type: [Number, String],
      default: 500,
    },
    height: {
      type: [Number, String],
      default: 500,
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
      elId: '',
      options: {},
      myChart: null
    }
  },
  created () {
    this.elId = uuid() //获取随机id
  },
  mounted () {
    this.getOptions();
    this.getCharts()
  },
  methods: {
    getOptions () {
      this.options = {
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0,0,0,0)',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: ''
        },
        colors: ['#64a4ff', '#f58e33', '#43e3ff', '#FF0000', '#FFFF00', '#FF00FF'],
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              distance: 0, //设置引导线的长度
              color: '#FFFFFF', //全局设置字体颜色
              enabled: true,
              //format: '{point.name}'
              formatter: function () {
                switch (this.point.name) {
                  case '商业楼宇':
                    return '<span style="color:#64a4ff">' + this.point.name
                      + '</span><br/><span style="color:#64a4ff">'
                      + HighCharts.numberFormat(this.percentage, 2) + '%</span>';
                  case '公共设施':
                    return '<span style="color:#f58e33">' + this.point.name
                      + '</span><br/><span style="color:#f58e33">'
                      + HighCharts.numberFormat(this.percentage, 2) + '%</span>';
                  case '制造':
                    return '<div style="color:#43e3ff">' + this.point.name
                      + '</span><br/><span style="color:#43e3ff">'
                      + HighCharts.numberFormat(this.percentage, 2) + '%</span>';
                  default:
                    break
                }
              }
            }
          }
        },
        series: [{
          type: 'pie',
          data: this.dataList
        }]
      }
    },
    getCharts () {
      HighCharts.chart(this.elId, this.options)
    }
  }
}
</script>

<style scoped>
</style>
