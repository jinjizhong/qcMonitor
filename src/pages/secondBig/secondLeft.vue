<template>
  <div class="left_screen flex_row">
    <!-- ---------------- left part --------------------- -->
    <div class="left_box">
      <div class="l_top flex_row">
        <p class="title">平台安全运行</p>
        <span class="day_num">{{dayNum}}</span>
        <p class="title_tian">天</p>
      </div>
      <BigScreenBox class="l_middle" width="332" height="550" title="总用电量">
        <barCharts barWidth="332" barHeight="225" unit="(万kWh)" unitL="(日)" :dataList="totalElecUsed.y"
          :xName="totalElecUsed.x" :gridPos="totalElecUsed.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
          :isBorder="false" :returnRes="totalElecUsed.returnRes" isRow />
        <div class="header">
          <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
          <p class="h_title">总发电量</p>
        </div>
        <barCharts unit="(万kWh)" unitL="(月)" barWidth="332" barHeight="225" :dataList="totalElecCreat.y"
          :xName="totalElecCreat.x" :gridPos="totalElecCreat.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
          :isBorder="false" :returnRes="totalElecCreat.returnRes" isRow />
      </BigScreenBox>
      <BigScreenBox class="l_bottom" width="332" height="330" title="发电量与上网电量">
        <barCharts unitL="(万kWh)" unit="(月)" barWidth="334" barHeight="283" :dataList="creatAndOnLine.y"
          :xName="creatAndOnLine.x" :gridPos="creatAndOnLine.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
          :isBorder="false" :returnRes="creatAndOnLine.returnRes" />
      </BigScreenBox>
    </div>
    <!-- ---------------- middle part ------------------- -->
    <div class="middle_box">
      <BigScreenBox class="m_top" width="810" height="686" title="客户厂站">
        <div class="search_box">
          <input type="text" class="search_style" placeholder="请输入搜索厂站" />
          <img class="square_small" src="../../assets/image/secondBig/square_small.png" alt="img">
          <img class="icon_sousuo" src="../../assets/image/secondBig/icon_sousuo.png" alt="img">
        </div>
        <div class="flex_column">
          <div class="top_part flex_row">
            <div class="site_bg">
              <p class="site_name">裕安大厦</p>
              <img @click="siteChange" class="site_change" src="../../assets/image/secondBig/icon_qiehuan.png"
                alt="img" />
              <img v-if="middleType" class="site_img" width="433" height="299" :src="imghref" alt="img" />
              <!-- 组态图 -->
              <iframe v-else width="433" height="299" frameborder="no" border="0" marginwidth="0" marginheight="0"
                scrolling="yes" allowtransparency="yes" class="site_img" :src="graph"></iframe>
              <img class="site_kuoda" @click="kuoda()" src="../../assets/image/bigscreen/kuoda.png" />
              <img v-if="middleType" class="site_video" src="../../assets/image/bigscreen/firstVideo.png" alt="img" />
            </div>
            <img class="bgz_img" width="51" height="205" src="../../assets/image/secondBig/square_bgz.png" alt="img">
            <div class="title_box">
              <div class="title_item" v-for="(item, key) in electInfo" :key="key">
                <p class="t_p">
                  {{item.label}}<span
                    :class="{ 't_value': true, 't_color1': item.type==1 ? true : false, 't_color2': item.type==0 ? true : false }">{{item.value}}</span>{{item.unit}}
                </p>
                <div class="t_line"></div>
              </div>
            </div>
            <div class="liquid_box flex_row_center">
              <div style="margin-right: 35px;">
                <p class="water_p">故障率</p>
                <WarterCharts warterWidth="85" warterHeight="85" bgcolor="#04061d" :font="font1" shadowBlur="0"
                  :dataConfig="warterData1" :outLine="outLine1" :opacity="waterOpacity" />
              </div>
              <div>
                <p class="water_p">主变健康度</p>
                <WarterCharts warterWidth="85" warterHeight="85" bgcolor="#04061d" :font="font2" shadowBlur="0"
                  :dataConfig="warterData2" :outLine="outLine2" :opacity="waterOpacity" />
              </div>

            </div>
          </div>
          <div class="bottom_part">
            <div class="header_twice">
              <div class="left">
                <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
                <p class="h_title">当月用电量</p>
              </div>
              <div class="right">
                <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
                <p class="h_title">工单执行量</p>
              </div>
            </div>
            <div class="flex_row">
              <barCharts unitL="(kW)" unit="(日)" barWidth="405" barHeight="200" :dataList="monthData.y"
                :xName="monthData.x" :gridPos="monthData.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
                :isBorder="false" :returnRes="monthData.returnRes" boundaryGap />
              <barCharts unitL="(个)" unit="(月)" barWidth="405" barHeight="200" :dataList="orderQuantity.y"
                :xName="orderQuantity.x" :gridPos="orderQuantity.grid" fontChartsColor="#9ACBEA"
                lineChartsColor="#0D3B6D" :isBorder="false" :returnRes="orderQuantity.returnRes" />
            </div>
          </div>
        </div>
      </BigScreenBox>
      <BigScreenBox class="m_bottom" width="810" height="330" title="发电功率" secTitle="当月负荷" needSecondTitle>
        <div class="flex_row">
          <barCharts unitL="(MW)" unit="(日)" barWidth="403" barHeight="280" :dataList="createElecPower.y"
            :xName="createElecPower.x" :gridPos="createElecPower.grid" fontChartsColor="#9ACBEA"
            lineChartsColor="#0D3B6D" :isBorder="false" :returnRes="createElecPower.returnRes" boundaryGap />
          <barCharts barWidth="403" barHeight="280" :dataList="todayElectLoad.y" :xName="todayElectLoad.x.data"
            unitL="(MW)" unit="(日)" :gridPos="todayElectLoad.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
            :isBorder="false" :returnRes="todayElectLoad.returnRes" boundaryGap />
        </div>
      </BigScreenBox>
    </div>

    <div class="popWindow" v-if="popShow">
      <img class="right_sx" @click="suoxiao()" src="../../assets/image/bigscreen/suoxiao.png" />
      <img v-if="middleType" style="width:100%;height: 100%;" :src="imghref" alt="img" />
      <iframe v-else width="433" height="299" frameborder="no" border="0" marginwidth="0" marginheight="0"
        scrolling="yes" allowtransparency="yes" class="iframeStyle" :src="graph"></iframe>
    </div>

    <!------------------ right part ---------------------->
    <div class="right_box">
      <BigScreenBox class="r_top" width="680" height="327" title="实时告警" secTitle="告警处理" needSecondTitle>
        <div class="flex_row">
          <div class="gj_box flex_row">
            <div class="row_line"></div>
            <div class="column_line"></div>
            <div class="flex_row item_gj" v-for="(item,key) in gjList" :key="key">
              <img style="margin:5px 8px 0 0 ;" width="43" height="43" :src="item.img" alt="img">
              <div>
                <p class="gj_title">{{item.name}}</p>
                <!-- <p v-if="item.type==1" class="gj_word">{{item.value}}</p> -->
                <p class="gj_word2">{{item.value}}</p>
              </div>
            </div>
          </div>
          <barCharts barWidth="337" barHeight="280" unitL="(个)" unit="(日)" :dataList="policySolve.y"
            :xName="policySolve.x" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :gridPos="policySolve.grid"
            :isBorder="false" :returnRes="policySolve.returnRes" boundaryGap />
        </div>
      </BigScreenBox>
      <BigScreenBox class="r_middle" width="680" height="327" title="最新工单" secTitle="工单处理" needSecondTitle>
        <div class="flex_row">
          <div class="gd_box flex_row">
            <div class="row_line"></div>
            <div class="column_line"></div>
            <div class="column_line2"></div>
            <div class="flex_row item_gd" v-for="(item,key) in gdList" :key="key">
              <img style="margin:5px 3px 0 0 ;" width="43" height="43" :src="item.img" alt="img">
              <div>
                <p class="gd_title">{{item.name}}</p>
                <p v-if="item.type==1" class="gd_word">{{item.value}}</p>
                <p v-if="item.type==2" class="gd_word2">{{item.value}}</p>
                <p v-if="item.type==3" class="gd_word3">{{item.value}}</p>
              </div>
            </div>
          </div>
          <barCharts barWidth="337" barHeight="280" unitL="(个)" unit="(日)" :dataList="orderSolve.y"
            :xName="orderSolve.x" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :gridPos="orderSolve.grid"
            :isBorder="false" :returnRes="orderSolve.returnRes" boundaryGap />
        </div>
      </BigScreenBox>
      <BigScreenBox class="r_bottom" width="680" height="330" title="智能巡检" secTitle="终端状态" needSecondTitle>
        <div class="flex_row">
          <barCharts unitL="(个)" unit="(日)" :dataList="policyElected.y" :xName="policyElected.x" barWidth="339"
            barHeight="283" :gridPos="policyElected.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
            :returnRes="policyElected.returnRes" :isBorder="false" />
          <PieCharts :pieRadius="pieRadius" pieHeight="283" pieWidth="339" fontColor="#FFFFFF" :showLable="false"
            :dataList="teminalState" :piePosition="commonPiePosition" :chartColorList="colorListZD" />
          <!-- <CateCharts width="339" height="283" :chartData="areaCustomer" :grid="cateGrid" :color="cateColor" /> -->
        </div>
      </BigScreenBox>
    </div>
  </div>
</template>

<script>
import BigScreenBox from '../../components/bigScreenBox/index'
import BarCharts from '../../components/barCharts/index'
import WarterCharts from '../../components/warterCharts/index.vue'
// import CateCharts from '../../components/pictorialCharts/category_index.vue'
import PieCharts from '../../components/pictorialCharts/pie_index.vue'
export default {
  name: 'secondLeft',
  computed: {
  },
  components: {
    BigScreenBox,
    BarCharts,
    WarterCharts,
    PieCharts
    // CateCharts
  },

  data () {
    return {
      popShow: false,
      dayNum: '',   // 平台运行天数
      imghref: '',
      graph: '',
      middleType: false,
      electInfo: [
        { type: 1, 'value': 0, 'label': '站点安全运行', 'unit': '天' },
        { type: 0, 'value': 0, 'label': '电压等级', 'unit': 'KV' },
        { type: 0, 'value': 0, 'label': '变电容量', 'unit': 'MVA' },
        { type: 0, 'value': 0, 'label': '主变数量', 'unit': '台' },

      ],
      totalElecUsed: {
        x: ['1', '2', '3', '4', '5', '6'],
        y: [{
          name: '',
          type: 'bar',
          barWidth: '39%',
          unit: '(万kWh)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              1, 0, 0, 0, // 0, 0, 1, 0可以从左到右渐变. 设置为0,0,0,1可以从上到下渐变
              [
                { offset: 0, color: 'rgba(1,138,244,1)' },
                { offset: 1, color: 'rgba(77,105,231,0.02)' }
              ]
            )
          },
          data: []
        }],
        grid: [15, 45, 75, 15],
        returnRes: ['', '日']
      }, // 总用电量
      totalElecCreat: {
        y: [{
          name: '',
          type: 'bar',
          barWidth: '35%',
          unit: '(万kWh)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              1, 0, 0, 0, // 0, 0, 1, 0可以从左到右渐变. 设置为0,0,0,1可以从上到下渐变
              [
                { offset: 0, color: 'rgba(40,226,255,1)' },
                { offset: 1, color: 'rgba(40,226,255,0)' }
              ]
            )
          },
          data: []
        }],
        x: ['1', '2', '3', '4', '5', '6'],
        grid: [15, 45, 75, 15],
        returnRes: ['', '月']
      }, // 总发电量
      creatAndOnLine: {
        y: [{
          name: '发电量',
          type: 'bar',
          data: [],
          unit: '(万kWh)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(1,138,244,1)' },
                { offset: 1, color: 'rgba(77,105,231,0.02)' }
              ]
            )
          }
        },
        {
          name: '上网电量',
          type: 'bar',
          data: [],
          unit: '(万kWh)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(40,226,255,1)' },
                { offset: 1, color: 'rgba(40,226,255,0)' }
              ]
            )
          }
        }],
        x: [],
        grid: [20, 45, 50, 35],
        returnRes: ['', '月']
      }, // 发电量与上网电量
      createElecPower: {
        y: [{
          name: '',
          type: 'line',
          smooth: true, //曲线图平滑
          symbol: 'none', //去掉点
          color: '#018AF4',
          unit: '(MW)',
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(1,138,244,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(7,23,85,0.36)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#018AF4"
              }
            },
            // emphasis: {
            //   color: '#4fd6d2',
            //   lineStyle: {        // 系列级个性化折线样式  
            //     width: 2,
            //     type: 'dotted',
            //     color: "#018AF4" //折线的颜色
            //   }
            // }
          },//线条样式  
          symbolSize: 5, //折线点的大小
          areaStyle: { normal: {} },
          data: []
        }],
        x: [],
        grid: [25, 45, 50, 20],
        returnRes: ['', '日']
      }, // 发电功率
      todayElectLoad: {
        y: [{
          name: '',
          type: 'line',
          smooth: true,
          // smooth: 0.6, //曲线图平滑
          symbol: 'none', //去掉点
          unit: '(MW)',
          color: '#C34151',
          data: [],
          areaStyle: { normal: {} },
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(195,65,81,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(7,23,85,0.36)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#C34151"
              }
            },
          }
        }],
        x: {
          unit: '(时)',
          data: []
        },
        grid: [25, 45, 50, 20],
        returnRes: ['', '日']
      },  // 当日负荷
      policySolve: {
        y: [{
          name: '',
          type: 'line',
          unit: '(个)',
          smooth: true, //曲线图平滑
          symbol: 'none', //去掉点
          color: '#C34151',
          areaStyle: { normal: {} },
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(195,65,81,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(7,23,85,0.36)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#C34151"
              }
            },
            // emphasis: {
            //   color: '#4fd6d2',
            //   lineStyle: {        // 系列级个性化折线样式  
            //     width: 2,
            //     type: 'dotted',
            //     color: "#018AF4" //折线的颜色
            //   }
            // }
          },//线条样式  
          data: []
        }],
        x: [],
        grid: [15, 39, 39, 20],
        returnRes: ['', '日']
      },// 告警处理 
      policyElected: {
        y: [{
          name: '正常',
          type: 'bar',
          unit: '(个)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(0,201,134,1)' },
                { offset: 1, color: 'rgba(0,226,179,0.2)' }
              ]
            )
          },
          data: []
        },
        {
          name: '异常',
          type: 'bar',
          unit: '(个)',
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(247,159,0,1)' },
                { offset: 1, color: 'rgba(247,159,0,0.2)' }
              ]
            )
          },
          data: []
        }],
        x: [],
        grid: [20, 45, 50, 35],
        returnRes: ['', '日']
      }, // 智能巡检数据
      orderSolve: {
        y: [{
          name: '',
          type: 'line',
          unit: '(个)',
          smooth: true,//曲线图平滑
          symbol: 'none', //去掉点
          color: '#00E2B3',
          areaStyle: { normal: {} },
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(0,226,179,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(7,23,85,0.36)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#00E2B3"
              }
            }
          },//线条样式  
          data: []
        }],
        x: [],
        grid: [15, 39, 39, 20],
        returnRes: ['', '日']
      }, // 工单处理
      gjList: [
        {
          name: '开关变位',
          value: '30',
          img: require("../../assets/image/secondBig/icon_kaiguanbianwei.png"),
          type: 1
        }, {
          name: '遥信变位',
          value: '0',
          img: require("../../assets/image/secondBig/icon_yaoxinbianwei.png"),
          type: 1
        }, {
          name: '遥测越限',
          value: '502',
          img: require("../../assets/image/secondBig/icon_yaoceyuexian.png"),
          type: 0
        }, {
          name: '保护信号',
          value: '0',
          img: require("../../assets/image/secondBig/icon_baohuxinhao.png"),
          type: 0
        }
      ],
      gdList: [
        {
          name: '异常',
          value: '10',
          img: require("../../assets/image/secondBig/icon_yichang.png"),
          type: 1
        }, {
          name: '待接收',
          value: '22',
          img: require("../../assets/image/secondBig/icon_daiqianshou.png"),
          type: 2
        }, {
          name: '待到场',
          value: '29',
          img: require("../../assets/image/secondBig/icon_daidaochang.png"),
          type: 2
        }, {
          name: '待反馈',
          value: '30',
          img: require("../../assets/image/secondBig/icon_daifankui.png"),
          type: 2
        }, {
          name: '已完成',
          value: '60',
          img: require("../../assets/image/secondBig/icon_yiwancheng.png"),
          type: 3
        }, {
          name: '已验收',
          value: '35',
          img: require("../../assets/image/secondBig/icon_yiyanshou.png"),
          type: 3
        }
      ],
      monthData: {
        x: [],
        y: [{
          name: '',
          unit: '(kW)',
          type: 'line',
          barWidth: '60%',
          data: [],
          smooth: true,
          symbol: 'none', //去掉点
          areaStyle: { normal: {} },
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(195,65,81,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(7,23,85,0.36)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#C34151"
              }
            },
          }
        }],
        grid: [10, 40, 50, 10],
        returnRes: ['', '日']
      }, //当月用电量
      orderQuantity: {
        x: [],
        y: [{
          name: '',
          unit: '(个)',
          type: 'bar',
          barWidth: '30%',
          data: [],
          smooth: true,
          symbol: 'none', //去掉点
          areaStyle: { normal: {} },
          itemStyle: {
            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(1,138,244,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(77,105,231,0.02)' // 100% 处的颜色
              }]
              ),  //背景渐变色 
              lineStyle: {        // 系列级个性化折线样式  
                width: 1,
                type: 'solid',
                color: "#C34151"
              }
            },
          }
        }],
        grid: [10, 40, 50, 10],
        returnRes: ['', '月']
      }, //工单执行量
      warterData1: [0, '', '', ''],
      warterData2: [0, '', '', ''],
      waterOpacity: 0.26,
      font1: ['#C34151', 18],
      font2: ['#00F5FF', 18],
      outLine1: {
        itemStyle: {
          borderWidth: 1,
          borderColor: '#C34151',
          borderType: 'dashed',
        }
      },
      outLine2: {
        itemStyle: {
          borderWidth: 1,
          borderColor: '#00F5FF',
          borderType: 'dashed',
        }
      },
      cateGrid: {
        top: '25%',
        bottom: '50%',
        left: "40%"
      },
      cateColor: ['#00E2B3', '#F79F00', '#C34151'],
      areaCustomer: [], //终端状态
      /* 终端状态 */
      teminalState: [],
      pieRadius: ['50%', '65%'],
      commonPiePosition: ['vertical', 'center', 'center'],
      colorListZD: ['rgba(0,226,179,0.77)', 'rgba(247,159,0,0.77)', 'rgba(195,65,81,0.77)'],
      daySplites: []
    }
  },
  created () {
    this.getChartsFormatDate()
    this.getLeftScreenData()
    this.getLeftMidData()
    this.getLeftRightBottom()
  },
  methods: {
    getChartsFormatDate () {
      let date = new Date()
      this.totalElecUsed.returnRes[0] = date.getMonth() + 1 + '月'
      this.policyElected.returnRes[0] = date.getMonth() + 1 + '月'
      this.orderSolve.returnRes[0] = date.getMonth() + 1 + '月'
      this.policySolve.returnRes[0] = date.getMonth() + 1 + '月'
      this.monthData.returnRes[0] = date.getMonth() + 1 + '月'
    },
    // 获取左屏数据
    getLeftScreenData () {
      this.$store.dispatch('BigScreen/testLeftData').then((res) => {
        this.dayNum = res.platformWorkTime;
        // 当月负荷
        this.todayElectLoad.y[0].data = res.thisMonthFuhe.fuhe
        this.todayElectLoad.x.data = res.thisMonthFuhe.day
        // 总用电量
        this.totalElecUsed.x = res.totalDianliang.day
        this.totalElecUsed.y[0].data = res.totalDianliang.dianliang
        // 发电量与上网电量
        this.creatAndOnLine.x = res.faAndShangwangDianliang.month
        this.creatAndOnLine.y[0].data = res.faAndShangwangDianliang.fadianliang
        this.creatAndOnLine.y[1].data = res.faAndShangwangDianliang.shangwangdianliang
        // 发电功率
        this.createElecPower.x = res.faDianGongLv.month
        this.createElecPower.y[0].data = res.faDianGongLv.fadianliang
        // 总发电量
        this.totalElecCreat.x = res.totalFadianliang.month
        this.totalElecCreat.y[0].data = res.totalFadianliang.fadianliang
        // 告警处理
        // this.gjList = res.alertRealTime
        // for (let j of this.gjList) {
        //   switch (j.name) {
        //     case '开关变位':
        //       j.type = 1
        //       j.img = require("../../assets/image/secondBig/icon_kaiguanbianwei.png")
        //       break;
        //     case '遥信变位':
        //       j.type = 1
        //       j.img = require("../../assets/image/secondBig/icon_yaoxinbianwei.png")
        //       break;
        //     case '遥测越限':
        //       j.type = 0
        //       j.img = require("../../assets/image/secondBig/icon_yaoceyuexian.png")
        //       break;
        //     case '保护信号':
        //       j.type = 0
        //       j.img = require("../../assets/image/secondBig/icon_baohuxinhao.png")
        //       break;
        //     default:
        //       break;
        //   }
        // }

        this.policySolve.x = res.AlertDealWith.x;
        this.policySolve.y[0].data = res.AlertDealWith.y;
        // 工单处理
        // this.gdList = res.latestWorkOrder
        // for (let j of this.gdList) {
        //   switch (j.name) {
        //     case '异常':
        //       j.type = 1
        //       j.img = require("../../assets/image/secondBig/icon_yichang.png")
        //       break;
        //     case '待接收':
        //       j.type = 2
        //       j.img = require("../../assets/image/secondBig/icon_daiqianshou.png")
        //       break;
        //     case '待到场':
        //       j.type = 2
        //       j.img = require("../../assets/image/secondBig/icon_daidaochang.png")
        //       break;
        //     case '待反馈':
        //       j.type = 2
        //       j.img = require("../../assets/image/secondBig/icon_daifankui.png")
        //       break;
        //     case '已完成':
        //       j.type = 3
        //       j.img = require("../../assets/image/secondBig/icon_yiwancheng.png")
        //       break;
        //     case '已验收':
        //       j.type = 3
        //       j.img = require("../../assets/image/secondBig/icon_yiyanshou.png")
        //       break;
        //     default:
        //       break;
        //   }
        // }
        this.orderSolve.x = res.workOrderDealWith.x;
        this.orderSolve.y[0].data = res.workOrderDealWith.y;
        // 智能巡检
        this.policyElected.x = res.zhinengxunjian.xAxis;
        this.policyElected.y[0].data = res.zhinengxunjian.yAxis1.data;
        this.policyElected.y[1].data = res.zhinengxunjian.yAxis2.data;
      });
    },
    // 获取左屏中间厂站数据
    getLeftMidData () {
      let params = {
        siteFid: "0b526dfa_1012_43d9_b01d_aaf400dd5cdc"
      };
      this.$store.dispatch('BigScreen/testLeftBySite', params).then((res) => {
        // this.changeto.bannerUrl = res.graph
        this.graph = res.graph
        this.imghref = res.imghref

        this.electInfo[0].value = res.siteWorkTime == null ? 0 : res.siteWorkTime
        this.electInfo[1].value = res.voltageGrade
        this.electInfo[3].value = res.zhubianCount
        this.electInfo[2].value = parseInt(res.biandianCapacity) / 1000

        this.monthData.y[0].data = res.thisMonthDianliang.dianliang
        this.monthData.x = res.thisMonthDianliang.day
        this.orderQuantity.x = res.woExecCount.month
        this.orderQuantity.y[0].data = res.woExecCount.count
        // let score = 65 //  res.zhubianHealthDegree
        // let waterColor1 = this.getWaterColor(score / 100)
        //res.alertCount
        this.warterData1 = [0.1, '#C34151', '10%', '']
        this.warterData2 = [0.98, '#00F5FF', '98%', '']
      })
    },
    // 获取左屏右下角数据
    getLeftRightBottom () {
      this.$store.dispatch('BigScreen/testLeftClient').then((res) => {
        // this.areaCustomer = res.clientCommState
        // 终端状态 res.clientCommState
        let arr1 = [];
        let arr2 = [];
        let total = 0;
        for (let it of res.clientCommState) {
          arr1.push(it.name + "：" + it.value);
          total += it.value;
        }
        for (let it of res.clientCommState) {
          arr2.push({ value: (it.value / total * 100).toFixed(1), name: it.name + "：" + it.value })
        }
        // this.teminalState = {
        //   dataLegend: arr1,
        //   dataSeries: arr2
        // }
        this.teminalState = arr2;
      })
    },
    // 切换
    siteChange () {
      this.middleType = !this.middleType
    },
    suoxiao () {
      this.popShow = false
    },
    kuoda () {
      this.popShow = true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.left_screen {
  width: 100%;
  font-family: Microsoft YaHei;
  position: relative;
  .left_box {
    margin-left: 24px;
    .l_top {
      width: 334px;
      height: 116px;
      background-image: url("../../assets/image/secondBig/pingtaiyunxing.png");
      background-repeat: no-repeat;
      margin: 23px 0;
      position: relative;
      .title {
        font-size: 20px;
        font-weight: 400;
        color: rgba(154, 203, 234, 1);
        margin: 45px 0 0 22px;
      }
      .title_tian {
        font-size: 20px;
        font-weight: 400;
        color: rgba(154, 203, 234, 1);
        position: absolute;
        top: 45px;
        right: 23px;
      }
      .day_num {
        position: absolute;
        top: 31px;
        left: 160px;
        font-size: 42px;
        font-family: Acens;
        font-weight: 400;
        color: rgba(0, 226, 179, 1);
        letter-spacing: 20px;
      }
    }
    .l_middle {
      margin-bottom: 23px;
    }
  }
  .middle_box {
    margin-left: 25px;
    .m_top {
      margin: 26px 0 25px 0;
      position: relative;
      .search_box {
        width: 260px;
        height: 43px;
        position: absolute;
        background-image: url("../../assets/image/secondBig/square_search.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        top: 5px;
        right: 15px;
        .square_small {
          position: absolute;
          top: 0px;
          right: 0px;
        }
        .icon_sousuo {
          position: absolute;
          top: 13px;
          right: 16px;
        }
        .search_style {
          background: none;
          outline: none;
          border: none;
          width: 75%;
          height: 100%;
          margin-left: 22px;
          color: #9acbea;
        }
        .search_style::-webkit-input-placeholder {
          color: rgba(154, 203, 234, 0.5);
        }
        .search_style::-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: rgba(154, 203, 234, 0.5);
        }
        .search_style::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: rgba(154, 203, 234, 0.5);
        }
        .search_style::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: rgba(154, 203, 234, 0.5);
        }
      }
      .top_part {
        width: 100%;
        height: 389px;
        position: relative;
        .site_bg {
          margin: 36px 0 0 23px;
          width: 465px;
          height: 336px;
          background-image: url("../../assets/image/secondBig/square_big.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          .site_name {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(236, 236, 236, 1);
            position: absolute;
            left: 50%;
            top: -20px;
            transform: translateX(-50%);
          }
          .site_video {
            position: absolute;
            right: 11px;
            bottom: 10px;
          }
          .site_img {
            margin: 27px 0 0 20px;
          }
          .site_change {
            position: absolute;
            top: 5px;
            right: 33px;
          }
          .site_change:hover {
            cursor: pointer;
            transition: all ease 0.3s;
            opacity: 0.8;
          }
          .site_kuoda {
            position: absolute;
            top: 32px;
            right: 15px;
            cursor: pointer;
          }
        }
        .bgz_img {
          margin-top: 20px;
        }
        .title_box {
          width: 262px;
          height: 225px;
          margin-left: 11px;
          .title_item {
            margin-top: 15px;
            width: 180px;
            text-align: center;
            .t_value {
              font-size: 24px;
              font-family: DIN;
              font-weight: 400;
              margin: 0 5px;
            }
            .t_color1 {
              color: rgba(0, 226, 179, 1);
            }
            .t_color2 {
              color: rgba(0, 168, 246, 1);
            }
            .t_p {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              margin-bottom: 7px;
              color: rgba(154, 203, 234, 1);
            }
            .t_line {
              width: 180px;
              height: 3px;
              background: linear-gradient(
                90deg,
                rgba(133, 239, 255, 0.01),
                rgba(53, 213, 247, 0.93),
                rgba(78, 121, 204, 0.28),
                rgba(134, 251, 255, 0)
              );
            }
          }
        }
        .liquid_box {
          width: 323px;
          height: 165px;
          position: absolute;
          right: 0px;
          bottom: 0px;
          .water_p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(154, 203, 234, 1);
            text-align: center;
            margin-bottom: 5px;
          }
        }
      }
      .bottom_part {
        width: 100%;
        height: 250px;
      }
    }
  }
  .right_box {
    margin-left: 24px;
    .r_top {
      margin: 26px 0 28px 0;
      .gj_box {
        width: 298px;
        padding: 0 21px;
        margin: 56px 0 0 0px;
        font-family: Microsoft YaHei;
        flex-wrap: wrap;
        position: relative;
        .column_line {
          width: 1px;
          height: 167px;
          background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(70, 226, 255, 0.97) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.5;
          position: absolute;
          left: 150px;
        }
        .row_line {
          width: 300px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(70, 226, 255, 0.97) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.5;
          position: absolute;
          top: 81px;
        }
        .item_gj {
          width: 50%;
          height: 83px;
        }
        .item_gj:hover {
          transition: all ease 0.3s;
          opacity: 0.8;
          cursor: pointer;
        }
        .gj_title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(154, 203, 234, 1);
        }
        .gj_word {
          font-size: 26px;
          font-family: DIN;
          font-weight: 400;
          color: rgba(247, 159, 0, 1);
        }
        .gj_word2 {
          font-size: 26px;
          font-family: DIN;
          font-weight: bold;
          color: rgba(154, 203, 234, 1);
        }
      }
    }
    .r_middle {
      margin-bottom: 28px;
      .gd_box {
        width: 316px;
        padding: 0 12px;
        margin: 56px 0 0 0px;
        font-family: Microsoft YaHei;
        flex-wrap: wrap;
        position: relative;
        .column_line {
          width: 1px;
          height: 167px;
          background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(70, 226, 255, 0.97) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.5;
          position: absolute;
          left: 106px;
        }
        .column_line2 {
          width: 1px;
          height: 167px;
          background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(70, 226, 255, 0.97) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.5;
          position: absolute;
          left: 213px;
        }
        .row_line {
          width: 300px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(70, 226, 255, 0.97) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.5;
          position: absolute;
          top: 81px;
        }
        .item_gd {
          width: 33.33%;
          height: 83px;
        }
        .item_gd:hover {
          transition: all ease 0.3s;
          opacity: 0.8;
          cursor: pointer;
        }
        .gd_title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(154, 203, 234, 1);
        }
        .gd_word {
          font-size: 26px;
          font-family: DIN;
          font-weight: 400;
          color: #dd4356;
        }
        .gd_word2 {
          font-size: 26px;
          font-family: DIN;
          font-weight: bold;
          color: #f79f00;
        }
        .gd_word3 {
          font-size: 26px;
          font-family: DIN;
          font-weight: bold;
          color: #00c986;
        }
      }
    }
  }
}
.header_twice {
  display: flex;
  align-items: center;
  // width: 331px;
  height: 47px;
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    height: 47px;
    background: linear-gradient(
      90deg,
      rgba(3, 86, 138, 1) 0%,
      rgba(3, 86, 138, 0) 100%
    );
  }
  .right {
    display: flex;
    align-items: center;
    flex: 1;
    height: 47px;
    background: linear-gradient(
      90deg,
      rgba(3, 86, 138, 1) 0%,
      rgba(3, 86, 138, 0) 100%
    );
  }
  .h_icon {
    margin-left: 15px;
    margin-right: 15px;
  }
  .h_title {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(67, 220, 255, 1);
  }
}
.popWindow {
  position: absolute;
  width: 1280px;
  height: 880px;
  background-color: #000000;
  left: 220px;
  top: 110px;
  z-index: 9999;
  /* border: 1px solid #F1F7FF; */
}
.popWindow .right_sx {
  position: absolute;
  z-index: 99999;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.iframeStyle {
  width: 100%;
  height: 100%;
  border: none;
}
.iframeStyle::-webkit-scrollbar {
  display: none;
}
</style>
