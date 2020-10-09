<template>
  <!-- <div id="main" :style="{'width': width+'px','height': height+'px'}"></div> -->
  <div id="main" :style="{width: `${mapWidth}px`, height: `${mapHeight}px`}"></div>
  <!-- style="width: 990px;height: 780px;"> -->
</template>

<script>
import '../../../node_modules/echarts/map/js/china.js'
export default {
  name: '',
  props: {
    mapWidth: {
      type: [Number, String],
      default: 1000,
    },
    mapHeight: {
      type: [Number, String],
      default: 1000,
    }
  },
  data () {
    return {
      chinaGeoCoordMap: {
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.5246784687, 31.2286100760],
        '香港': [114.165460, 22.275340],
        '澳门': [113.549130, 22.198750],
        '台湾': [121.30, 25.03]
      },
      chinaDatas: [[{
        name: '黑龙江',
        center: [127.9688, 45.368],
        value: 0
      }], [{
        name: '内蒙古',
        center: [110.3467, 41.4899],
        value: 0
      }], [{
        name: '北京',
        center: [116.4551, 40.2539],
        value: 1
      }], [{
        name: '吉林',
        center: [125.8154, 44.2584],
        value: 0
      }], [{
        name: '辽宁',
        center: [123.1238, 42.1216],
        value: 0
      }], [{
        name: '河北',
        center: [114.4995, 38.1006],
        value: 0
      }], [{
        name: '天津',
        center: [117.4219, 39.4189],
        value: 0
      }], [{
        name: '山西',
        center: [112.3352, 37.9413],
        value: 0
      }], [{
        name: '陕西',
        center: [109.1162, 34.2004],
        value: 0
      }], [{
        name: '甘肃',
        center: [103.5901, 36.3043],
        value: 0
      }], [{
        name: '宁夏',
        center: [106.3586, 38.1775],
        value: 0
      }], [{
        name: '青海',
        center: [101.4038, 36.8207],
        value: 0
      }], [{
        name: '新疆',
        center: [87.9236, 43.5883],
        value: 0
      }], [{
        name: '西藏',
        center: [91.11, 29.97],
        value: 0
      }], [{
        name: '四川',
        center: [103.9526, 30.7617],
        value: 0
      }], [{
        name: '重庆',
        center: [108.384366, 30.439702],
        value: 0
      }], [{
        name: '山东',
        center: [117.1582, 36.8701],
        value: 0
      }], [{
        name: '河南',
        center: [113.4668, 34.6234],
        value: 0
      }], [{
        name: '江苏',
        center: [118.8062, 31.9208],
        value: 0
      }], [{
        name: '安徽',
        center: [117.29, 32.0581],
        value: 1
      }], [{
        name: '湖北',
        center: [114.3896, 30.6628],
        value: 0
      }], [{
        name: '浙江',
        center: [119.5313, 29.8773],
        value: 0
      }], [{
        name: '福建',
        center: [119.4543, 25.9222],
        value: 0
      }], [{
        name: '江西',
        center: [116.0046, 28.6633],
        value: 0
      }], [{
        name: '湖南',
        center: [113.0823, 28.2568],
        value: 0
      }], [{
        name: '贵州',
        center: [106.6992, 26.7682],
        value: 0
      }], [{
        name: '广西',
        center: [108.479, 23.1152],
        value: 0
      }], [{
        name: '海南',
        center: [110.3893, 19.8516],
        value: 0
      }], [{
        name: '上海',
        center: [121.5246784687, 31.2286100760],
        value: 1
      }]]
    }
  },
  mounted: function () {
    let echarts = require('echarts');
    const self = this;
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));

    let series = [];
    [['上海', this.chinaDatas]].forEach(function (item, i) {
      //alert(JSON.stringify(self.convertData(item[1])))
      series.push({
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 5, //图标大小
        },
        lineStyle: {
          normal: {
            width: 0.5, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: .3 //尾迹线条曲直度
          }
        },
        data: self.convertData(item[1])
      }, {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: 'right', //显示位置
            offset: [5, 0], //偏移设置
            formatter: function (params) {//圆环显示文字
              if (params.data.name === "上海") {
                return '';
              }
              return params.data.name;
            },
            fontSize: 13
          },
          emphasis: {
            show: true
          }
        },
        symbol: 'circle',
        symbolSize: function (val) {
          return 5 + val[2] * 5; //圆环大小
        },
        itemStyle: {
          normal: {
            show: false,
            color: '#f00'
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: self.chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
          };
        }),
      },
        //被攻击点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              //offset:[5, 0],
              color: '#0f0',
              formatter: '{b}',
              textStyle: {
                color: "#0f0"
              }
            },
            emphasis: {
              show: true,
              color: "#f60"
            }
          },
          symbol: 'pin',
          symbolSize: 50,
          data: [{
            name: item[0],
            value: self.chinaGeoCoordMap[item[0]].concat([10]),
          }],
        }
      );
    });

    // 绘制图表
    myChart.setOption({

      visualMap: { //图例值控制
        min: 0,
        max: 1,
        calculable: true,
        show: false,
        color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        textStyle: {
          color: '#fff'
        }
      },


      geo: {
        map: 'china',
        zoom: 1.2,
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true, //是否允许缩放
        itemStyle: {
          normal: {
            color: '#172b42', //地图背景色
            borderColor: '#0a7fab', //省市边界线00fcff 0a7fab
            borderWidth: 1
          },
          emphasis: {
            color: 'rgba(37, 43, 61, .5)' //悬浮背景
          }
        }
      },
      series: series

    });

    myChart.on('click', function (params) {
      let paramObj = {
        name: params.name,
        center: self.chinaGeoCoordMap[params.name]
      };
      self.$emit("mapClick", paramObj);
    });

  },
  methods: {
    convertData (data) {

      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        /* 箭头指向方向*/
        let fromCoord = [121.4648, 31.2891];//初始化位置
        let toCoord = this.chinaGeoCoordMap[dataItem[0].name];//终点位置
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord,
            value: dataItem[0].value
          }, {
            coord: toCoord,
          }]);
        }
      }
      return res;

    }
  }

}
</script>

<style scoped>
</style>
