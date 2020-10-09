<template>
	<!-- 不规则的饼图 -->
  <div class="pos_relative" :style="{width: `${pieWidth}px`, height: `${pieHeight}px`}">
    <div class="title" v-if="hasTitle">
      <img style="width: 29px; height: 13px; margin-right: 8px;"
           src="../../assets/image/icon_bt.png"
           alt="image">
      <span>
        {{title}}
      </span>
    </div>
    <div :id="elId" :style="{width: `${pieWidth}px`, height: `${pieHeight}px`}" :class="hasTitle?'mr-top':''">
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
export default {
  name: "pieCharts",
  props: {
    title: {
      type: [String],
      default: ''
    },
	hasTitle:{
      type: Boolean,
      default: true
    },
    pieWidth: {
      type: [String, Number],
      default: 1000
    },
    pieHeight: {
      type: [String, Number],
      default: 1000
    },
    isLoopPie: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
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
    const option = {
    tooltip: {
            show:false,//防止鼠标移到不需要的数据上弹出label
            trigger: 'item',
            formatter: "{a} : {c} ({d}%)"
        },
        color:['#00C986','#FC7635','#D9424D'],
         legend: {
            orient: 'vertical',
            x: '16%',
            top:'13%',
            //backgroundColor:'#04061d',
            itemHeight: 14,//图例的高度
			itemWidth: 14,
			textStyle:{
				fontSize: 13,//字体大小
				color: '#9ACBEA'//字体颜色
			},
            itemGap:6,//图例之间的间距 
            data:[this.dataList[0].name+'：'+this.dataList[0].percent+'%',
					this.dataList[1].name+'：'+this.dataList[1].percent+'%',
					this.dataList[2].name+'：'+this.dataList[2].percent+'%']//图例的名字需要和饼图的name一致，才会显示图例
        },
        series: [
            {
                name:this.dataList[2].name+'：'+this.dataList[2].percent+'%',
                type:'pie',
                radius: ['40%', '29%'],//环的位置

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:'100', //需要显示的数据
                    itemStyle: {
                                normal: {
                                 color: '#00C986'
                                }
                     }},
                   {value:''+(100-parseInt(this.dataList[2].percent)), //不需要显示的数据，颜色设置成和背景一样
                    itemStyle: {
                                normal: {
                                 color: 'transparent'
                                }
                     }}
                ]
            },
            {
                name:this.dataList[1].name+'：'+this.dataList[1].percent+'%',
                type:'pie',
                radius: ['44%', '55%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:'100', 
                    itemStyle: {
                                normal: {
                                 color: '#FC7635'
                                }
                     }},
                   {value:this.dataList[1].percent, 
                    itemStyle: {
                                normal: {
                                 color: 'transparent'
                                }
                     },
                   }
                ]
            },
            {
                name:this.dataList[0].name+'：'+this.dataList[0].percent+'%',
                type:'pie',
                radius: ['72%', '59%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:'100', 
                    itemStyle: {
                                normal: {
                                 color: '#D9424D'
                                }
                     }},
                   {value:''+(parseInt(this.dataList[0].percent)+100), 
                    itemStyle: {
                                normal: {
                                 color: 'transparent'
                                }
                     }}
                ]
            },
        ]
    }
    this.getPieCharts(option)
  },
  methods: {
    getPieCharts (option) {
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
.mr-top{
	margin-top: 26px;
}
</style>
