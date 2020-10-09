<template>
  <!-- <div id="main" :style="{'width': width+'px','height': height+'px'}"></div> -->
  <div id="main" :style="{ width: `${mapWidth}px`, height: `${mapHeight}px` }"></div>
  <!-- style="width: 990px;height: 780px;"> -->
</template>

<script>
import 'echarts-gl'

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
    },
  },
  data () {
    return {
      geoCoordMap: {
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
      chinaDatas: [{
        name: '黑龙江',
        center: [127.9688, 45.368],
        value: 0
      },
      {
        name: '内蒙古',
        center: [110.3467, 41.4899],
        value: 0
      },
      {
        name: '北京',
        center: [116.4551, 40.2539],
        value: 1
      },
      {
        name: '吉林',
        center: [125.8154, 44.2584],
        value: 0
      },
      {
        name: '辽宁',
        center: [123.1238, 42.1216],
        value: 0
      },
      {
        name: '河北',
        center: [114.4995, 38.1006],
        value: 0
      },
      {
        name: '天津',
        center: [117.4219, 39.4189],
        value: 0
      },
      {
        name: '山西',
        center: [112.3352, 37.9413],
        value: 0
      },
      {
        name: '陕西',
        center: [109.1162, 34.2004],
        value: 0
      },
      {
        name: '甘肃',
        center: [103.5901, 36.3043],
        value: 0
      },
      {
        name: '宁夏',
        center: [106.3586, 38.1775],
        value: 0
      },
      {
        name: '青海',
        center: [101.4038, 36.8207],
        value: 0
      },
      {
        name: '新疆',
        center: [87.9236, 43.5883],
        value: 0
      },
      {
        name: '西藏',
        center: [91.11, 29.97],
        value: 0
      },
      {
        name: '四川',
        center: [103.9526, 30.7617],
        value: 0
      },
      {
        name: '重庆',
        center: [108.384366, 30.439702],
        value: 0
      },
      {
        name: '山东',
        center: [117.1582, 36.8701],
        value: 0
      },
      {
        name: '河南',
        center: [113.4668, 34.6234],
        value: 0
      },
      {
        name: '江苏',
        center: [118.8062, 31.9208],
        value: 0
      },
      {
        name: '安徽',
        center: [117.29, 32.0581],
        value: 1
      },
      {
        name: '湖北',
        center: [114.3896, 30.6628],
        value: 0
      },
      {
        name: '浙江',
        center: [119.5313, 29.8773],
        value: 0
      },
      {
        name: '福建',
        center: [119.4543, 25.9222],
        value: 0
      },
      {
        name: '江西',
        center: [116.0046, 28.6633],
        value: 0
      },
      {
        name: '湖南',
        center: [113.0823, 28.2568],
        value: 0
      },
      {
        name: '贵州',
        center: [106.6992, 26.7682],
        value: 0
      },
      {
        name: '广西',
        center: [108.479, 23.1152],
        value: 0
      },
      {
        name: '海南',
        center: [110.3893, 19.8516],
        value: 0
      },
      {
        name: '上海',
        center: [121.5246784687, 31.2286100760],
        value: 1
      }
      ],
      nowOption: {}
    }
  },
  mounted: function () {
    let self = this
    // 基于准备好的dom，初始化echarts实例
    let myChart = self.$echarts.init(document.getElementById('main'))

    // 绘制图表
    this.getOption();
    myChart.setOption(self.nowOption);
    myChart.on('click', function (params) {
      let paramObj = {
        name: params.name,
        center: self.geoCoordMap[params.name]
      };
      self.$emit("mapClick", paramObj);
    });
  },
  methods: {
    getOption () {
      let self = this
      self.nowOption = {
        geo3D: {
          map: 'china',
          roam: true,
          viewControl: {
            distance: 80, //地图视角 控制初始大小
            // rotateSensitivity:0,//禁止旋转
            //  zoomSensitivity:0,//禁止缩放
          },
          //regionHeight: 2, //3d地图的厚度
          itemStyle: {
            areaColor: 'rgb(5,101,123)',
            opacity: 1,
            borderWidth: 0.8,
            borderColor: '#7993c0',
          },
          label: {
            show: true,
            textStyle: {
              color: '#1EC7FF', //地图初始化区域字体颜色
              fontSize: 16,
              opacity: 1,
              backgroundColor: '',
            },
          },
          emphasis: {
            //当鼠标放上去  地区区域是否显示名称
            label: {
              show: false,
              textStyle: {
                color: '#fff',
                fontSize: 16,
                backgroundColor: 'rgba(0,23,11,0)',
              },
            },
          },
          //shading: 'lambert',
          light: {
            //光照阴影
            main: {
              //color: 'rgb(44, 180, 260)', //光照颜色
              intensity: 0, //光照强度
              //shadowQuality: 'high', //阴影亮度
              shadow: false, //是否显示阴影
              alpha: 55,
              beta: 10,
            },
            ambient: {
              color: 'rgb(5,22,59)',
              intensity: 1,
            },
          },
        },
        series: [
          //画线
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: {
              show: true,
              period: 5, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 8, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#19D1FF',
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
              }
            },
            data: self.convertData(self.chinaDatas)
          },
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            label: {
              normal: {
                show: true,
                position: 'top', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function () { //圆环显示文字
                  let res = ''

                  return res;
                },
                fontSize: 13,
                rich: {
                  img1: {
                    backgroundColor: {
                      image: '../../assets/image/secondBig/icon_baojing.png'
                    }
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                show: false,
                color: '#f00'
              },
            },
            data: self.chinaDatas.map(function (dataItem) {
              if (dataItem.value == 1) {
                return {}
              } else {
                return {
                  name: dataItem.name,
                  // self.geoCoordMap[dataItem.name].concat([dataItem.value])
                  value: dataItem.center.concat([-1])
                };
              }
            })
          },
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            label: {
              normal: {
                show: true,
                position: 'top', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function () { //圆环显示文字
                  let res = ''
                  //console.log(JSON.stringify(params))
                  return res;
                },
                fontSize: 13
              },
              emphasis: {
                show: true
              }
            },
            symbol: 'pin',
            symbolSize: 45,
            itemStyle: {
              normal: {
                color: '#f00'
              },
            },
            data: self.chinaDatas.map(function (dataItem) {
              if (dataItem.value == 1) {
                return {
                  name: dataItem.name,
                  value: dataItem.center.concat([10])
                };
              }
            })
          }
        ]
      }
    },
    convertData (arrData) {
      var res = []
      let fromCoord = [121.4648, 31.2891]; //初始化的位置
      for (let it of arrData) {
        let itemData = [fromCoord, it.center]
        res.push(itemData)
      }
      return res
    }
  },
}
</script>

<style scoped></style>
