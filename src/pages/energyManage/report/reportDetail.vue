<template>
  <div class="report">
    <!-- 报告正文头部 -->
    <div class="header_box">
      <div :style="{ backgroundImage: bgbj }" class="title_box flex_row_center">
        <p class="title_h1">{{ titleData.name }}</p>
        <div class="title_h2 flex_row">
          <div style="margin-right: 20px;">
            <img style="margin-right: 8px;" src="../../../assets/image/energy/report/icon_bg_cz.png" alt="img" />
            <span>{{ titleData.company }}</span>
          </div>
          <div>
            <img style="margin-right: 8px;" src="../../../assets/image/energy/report/icon_bg_dz.png" alt="img" />
            <span>{{ titleData.address }}</span>
          </div>
        </div>
        <div class="totalRound">{{textCell.jiezhishijian}}</div>
      </div>
      <div v-if="isNengXiao">
        <div class="title_num">
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zrl.png" alt="img" />
            <span class="label">总容量</span>
            <span class="value">{{ titleData.zrl }}kVA</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_dydj.png" alt="img" />
            <span class="label">电压等级</span>
            <span class="value">{{ titleData.dydj }}kV</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zbts.png" alt="img" />
            <span class="label">主变台数</span>
            <span class="value">{{ titleData.zbts }}台</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_jcds.png" alt="img" />
            <span class="label">监测点数</span>
            <span class="value">{{ titleData.jcds }}个</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="title_num">
          <div class="title_item_yw flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zrl.png" alt="img" />
            <span class="label">总容量</span>
            <span class="value">{{ titleData.zrl }}kVA</span>
          </div>
          <div class="title_item_yw flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_dydj.png" alt="img" />
            <span class="label">电压等级</span>
            <span class="value">{{ titleData.dydj }}kV</span>
          </div>
          <div class="title_item_yw flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zbts.png" alt="img" />
            <span class="label">主变台数</span>
            <span class="value">{{ titleData.zbts }}台</span>
          </div>
          <div class="title_item_yw flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_jcds.png" alt="img" />
            <span class="label">监测点数</span>
            <span class="value">{{ titleData.jcds }}个</span>
          </div>
        </div>
      </div>
      <img class="to_top" @click="toTop(step)" src="../../../assets/image/admin/icon_bg_fhdb.png" alt="img">
    </div>
    <!-- 能效报告内容 -->
    <template v-if="isNengXiao">
      <!-- 报告正文内容 -->
      <div class="content_box">
        <!-- 能效报告摘要 -->
        <div class="common_part">
          <p class="part_title">一、 能效报告摘要</p>
          <p class="common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt1 }}</p>
        </div>
        <!-- 电费分析 -->
        <div class="common_part">
          <p class="part_title">二、电费分析</p>
          <!-- 电度电费 -->
          <p class="h2_title">2.1 电度电费</p>
          <div>
            <div style="text-align:center;">分时段电度与电费</div>
            <barCharts barWidth="100%" barHeight="300" unitL="用电量/kWh" unitR="电费 (元)" :dataList="fsdData" :xName="fsdX"
              :returnRes="returnResFsd" :chartColorList="chartColorListFSD" needSecondUnit />
          </div>
          <div class="sec_info">
            <div style="flex:1;background-color:#ffffff; padding-top:20px;position:relative;">
              <div style="text-align:center;">{{titleTextPie1}}</div>
              <pieCharts :centerText="allDiangliang" pieHeight="330" pieWidth="100%" :dataList="rdlPieData"
                :piePosition="commonPiePosition" :chartColorList="chartColorListDL" centerTextColor="#333" />
              <div v-if="upOrDownFdl!=='false'" class="rdl_percent">
                环比：
                <img v-if="upOrDownFdl=='up'" src="../../../assets/image/admin/icon_ss.png" alt="img">
                <img v-else-if="upOrDownFdl=='down'" src="../../../assets/image/admin/icon_xj.png" alt="img">
                <span :style="{color: upOrDownFdl=='up' ? '#FF0101' : '#13CF5A'}">{{fdlPercent}}</span>
              </div>
            </div>
            <div style="flex:1;background-color: #ffffff;padding-top:20px;position:relative;">
              <div style="text-align:center;">{{titleTextPie2}}</div>
              <pieCharts :centerText="allMoney" pieHeight="330" pieWidth="100%" :dataList="rdfPieData"
                :piePosition="commonPiePosition" :chartColorList="chartColorListDL" centerTextColor="#333" />
              <div v-if="upOrDownFdl!=='false'" class="rdl_percent">
                环比：
                <img v-if="upOrDownFdf=='up'" src="../../../assets/image/admin/icon_ss.png" alt="img">
                <img v-else-if="upOrDownFdf=='down'" src="../../../assets/image/admin/icon_xj.png" alt="img">
                <span :style="{color: upOrDownFdl=='up' ? '#FF0101' : '#13CF5A'}">{{fdfPercent}}</span>
              </div>
            </div>

          </div>
        </div>
        <!-- 损耗分析 -->
        <div class="common_part">
          <p class="part_title">三、 损耗分析</p>
          <!-- 损耗量与损耗率 -->
          <p class="h2_title">3.1总线损与总线损率</p>
          <div class="flex_column_yCenter" style="height:420px;margin-bottom: 5px;">
            <div style="margin-bottom: 5px;">总线损占比</div>
            <img v-if="zxsOver" src="../../../assets/image/admin/img_tips_zxscx.png" alt="img">
            <pieCharts :centerText="allDianliangXs" pieHeight="330" pieWidth="570" :dataList="zxsPieData"
              :chartColorList="chartColorListZXS" centerTextColor="#333" />
          </div>
          <!-- 经济运行区间 -->
          <p class="h2_title2">3.2 经济运行区间</p>
          <div class="ele_runing_box">
            <div class="ele_item" v-for="(item, key) in eleRunningArea" :key="key">
              <div class="ele_name">{{item.byqName}}</div>
              <pieCharts pieHeight="330" pieWidth="100%" :pieRadius="pieRadiusRun" :dataList="item.data"
                centerTextColor="#333" :chartColorList="item.arrColor" hideTitle isLoopPie />
            </div>
          </div>
          <div class="sign_box">
            <div class="common_sign flex_row_center">
              <span class="sign_kong"></span>
              <span>空载（负载率=0%）</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_qin"></span>
              <span>轻载（负载率＜30%）</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_jin"></span>
              <span>经济（30%≤负载率≤70%）</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_zhong"></span>
              <span>重载（70%＜负载率≤100%）</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_chao"></span>
              <span>超载（负载率＞100%）</span>
            </div>
          </div>
        </div>
        <!-- 电能质量 -->
        <div class="common_part">
          <p class="part_title">四、电能质量</p>
          <!-- 电压偏差 -->
          <p class="h2_title">4.1 电压偏差</p>
          <div style="display:flex;margin-bottom: 20px;">
            <div class="water_item">
              <div class="water_title">{{waterName1}}</div>
              <warterCharts warterWidth="230" warterHeight="230" :dataConfig="warterData1" />
            </div>
            <div class="water_item">
              <div class="water_title">{{waterName2}}</div>
              <warterCharts warterWidth="230" warterHeight="230" :dataConfig="warterData2" />
            </div>
          </div>
          <!-- 三相电压不平衡 -->
          <p class="h2_title">4.2 三相电压不平衡</p>
          <div style="display:flex;margin-bottom: 20px;">
            <div class="water_item">
              <div class="water_title">{{waterName3}}</div>
              <pieCharts :centerText="threeBalance1" centerSize="50" pieHeight="330" pieWidth="100%"
                :dataList="tbPieData1" :chartColorList="chartColorTb1" :centerTextColor="chartColorTb1[0]"
                :hoverAnimation="hoverAnimation" :pieRadius="tbRadius" noDetail hideTitle />
            </div>
            <div class="water_item">
              <div class="water_title">{{waterName4}}</div>
              <pieCharts :centerText="threeBalance2" centerSize="50" pieHeight="330" pieWidth="100%"
                :dataList="tbPieData2" :chartColorList="chartColorTb2" :centerTextColor="chartColorTb2[0]"
                :hoverAnimation="hoverAnimation" :pieRadius="tbRadius" noDetail hideTitle />
            </div>
          </div>
        </div>
      </div>
      <!-- 报告底部内容 -->
      <div class="bottom_box">
        <div class="text_bottom">{{ textCell.txt_bottom1 }}</div>
        <div class="text_bottom">{{ textCell.txt_bottom2 }}</div>
        <div class="text_bottom">{{ textCell.txt_bottom3 }}</div>
      </div>
    </template>
    <!-- 运维报告内容 -->
    <template v-else>
      <div class="content_box">
        <div class="common_part">
          <p class="part_title">一、系统运行情况</p>
          <p class="h3_title">1.1电量</p>
          <div class="dianliang_content">
            <div class="flex_column dianliang_box">
              <div class="word1">{{thisDianliang}}</div>
              <div class="blue_line"></div>
              <div class="word2">本月用电总量</div>
            </div>
            <div class="flex_column dianliang_box">
              <div class="word1">{{lastDinaliang}}</div>
              <div class="blue_line"></div>
              <div class="word2">上月用电总量</div>
            </div>
            <div class="flex_column dianliang_box">
              <div class="flex_flex">
                <img v-if="upOrDown=='up'" src="../../../assets/image/admin/icon_ss.png" alt="img">
                <img v-else-if="upOrDown=='down'" src="../../../assets/image/admin/icon_xj.png" alt="img">
                <span class="word1">{{bizhi1}}%</span>
                <span class="word3"> {{bizhi2}}</span>
              </div>
              <div class="blue_line"></div>
              <div class="word2">用电量环比</div>
            </div>
          </div>
          <p class="common_part_yw">
            <b>用电量：</b>
            {{text1_1}}
          </p>
          <p class="common_part_yw">
            <b>分时电量：</b>
            {{text1_2}}
          </p>
          <p class="h3_title">1.2设备运行</p>
          <div>
            <div v-for="(item,key) in data1_2" :key="key" class="device_run_box flex_row">
              <img width="280" height="210" :src="item.imgHref" alt="img">
              <div class="device_word">
                <div class="d_name">{{item.equipName}}</div>
                <div class="d_info">
                  <b>负荷：</b>
                  {{item.fuhe}}
                </div>
                <div class="d_info">
                  <b>负载率：</b>
                  {{item.fuzai}}
                </div>
                <div class="d_info">
                  <b>温度：</b>
                  {{item.wendu}}
                </div>
                <div class="d_content">
                  <p class="word">{{item.text1}}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="h3_title">1.3故障情况</p>
          <div>
            <el-table :data="data1_3" :header-cell-style="{background:'#4E5965',color:'#FFFFFF', fontWeight: 400}"
              stripe style="width: 100%">
              <el-table-column prop="dataText1" label="故障设备名称">
              </el-table-column>
              <el-table-column prop="dataText2" label="故障内容">
              </el-table-column>
              <el-table-column prop="dataText3" label="更换备件">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 现场运维 -->
        <div class="common_part">
          <p class="part_title">二、现场运维</p>
          <p class="h3_title">2.1站点巡检</p>
          <div style="margin-left: 20px;">
            <p class="d_name">{{text2_1_1}}</p>
            <p class="d_name">全站巡检</p>
            <p>
              {{text2_1_2}}
            </p>
          </div>
          <p class="h3_title">2.2计划消缺</p>
          <p style="text-align: center" v-if="data2_2tb.length==0">本月无计划消缺</p>
          <p v-if="data2_3tb.length!==0" style="margin-bottom: 5px;">本月共发现<span
              class="spe_red">{{text2_2_1[0]}}</span>项缺陷内容，生成<span>{{text2_2_1[1]}}</span>条工单；目前已完成工单<span>{{text2_2_1[2]}}</span>条，待完成工单<span
              class="spe_red">{{text2_2_1[3]}}</span>条。</p>
          <div v-if="data2_3tb.length!==0">
            <el-table :data="data2_2tb" :header-cell-style="{background:'#4E5965',color:'#FFFFFF', fontWeight: 400}"
              stripe style="width: 100%">
              <el-table-column prop="dataText1" label="缺陷名称">
              </el-table-column>
              <el-table-column prop="dataText2" label="关联设备">
              </el-table-column>
              <el-table-column prop="dataText3" label="缺陷等级">
              </el-table-column>
              <el-table-column prop="dataText4" label="计划检修日期">
              </el-table-column>
              <el-table-column prop="dataText5" label="完成状态">
              </el-table-column>
              <el-table-column prop="dataText6" label="执行情况">
              </el-table-column>
            </el-table>
          </div>
          <p class="h3_title">2.3故障抢修</p>
          <p style="text-align: center" v-if="data2_3tb.length==0">本月无故障抢修</p>
          <p v-if="data2_3tb.length!==0" style="margin-bottom: 5px;">本月共发生故障<span
              class="spe_red">{{text2_3_1[0]}}</span>次，生成<span
              class="spe_red">{{text2_3_1[1]}}</span>条抢修工单，平均到场时间<span>{{text2_3_1[2]}}</span>分钟.</p>
          <div v-if="data2_3tb.length!==0">
            <el-table :data="data2_3tb" :header-cell-style="{background:'#4E5965',color:'#FFFFFF', fontWeight: 400}"
              stripe style="width: 100%">
              <el-table-column prop="dataText1" label="故障事件">
              </el-table-column>
              <el-table-column prop="dataText2" label="关联设备">
              </el-table-column>
              <el-table-column prop="dataText3" label="故障时间">
              </el-table-column>
              <el-table-column prop="dataText4" label="到场时间">
              </el-table-column>
              <el-table-column prop="dataText5" label="故障恢复时间">
              </el-table-column>
              <el-table-column prop="dataText6" label="完成情况">
              </el-table-column>
              <el-table-column prop="dataText7" label="事故分析">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import barCharts from '../../../components/barCharts/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import warterCharts from '../../../components/warterCharts/index.vue'
export default {
  name: 'reportDetail',
  components: {
    barCharts,
    pieCharts,
    warterCharts
  },
  props: {
    step: { //此数据是控制动画快慢的
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      titleData: {
        name: '',
        company: '',
        address: '',
        czmj: '',
        zbts: '',
        dydj: '',
        zrl: '',
        jcds: '',
        cjsb: ''
      },
      fsdData: [
        {
          name: '峰时段电量',
          type: 'bar',
          barWidth: '30%', //柱图宽度
          stack: 'two',
          unit: 'kWh',
          data: []
        },
        {
          name: '平时段电量',
          type: 'bar',
          barWidth: '30%', //柱图宽度
          unit: 'kWh',
          stack: 'two',
          data: []
        },
        {
          name: '谷时段电量',
          type: 'bar',
          barWidth: '30%', //柱图宽度
          unit: 'kWh',
          stack: 'two',
          data: []
        },
        {
          name: '电费',
          type: 'line',
          unit: '元',
          yAxisIndex: 1,
          data: []
        }
      ],
      fsdX: [],
      returnResFsd: ['', '日'],
      nianyue: [],
      zxsOver: false,
      allDiangliang: '1303.5',
      allMoney: '685.46',
      titleTextPie1: '月分时段电量占比',
      titleTextPie2: '月分时段电度电费占比',
      chartColorListDL: ['#FF9239', '#36ADFF', '#13CF5A'],
      chartColorListZXS: ['#FF9239', '#36ADFF', '#13CF5A'],
      chartColorListFSD: ['#FF9239', '#36ADFF', '#13CF5A'],
      chartColorTb1: ['#13CF5A', '#d0f5de'],
      chartColorTb2: ['#FF1B1B', '#ffd1d1'],
      chartColorListRunning: ['#0086E3', '#36ADFF', '#13CF5A', '#FF9239', '#FF1B1B'],
      commonPiePosition: ['vertical', 'right', 'center'],
      tbPieData1: [{ value: null }, { value: null }],
      tbPieData2: [{ value: null }, { value: null }],
      rdlPieData: [],
      rdfPieData: [],
      zxsPieData: [],
      eleRunningArea: [],
      allDianliangXs: '10000',
      fdlPercent: '',
      fdfPercent: '',
      upOrDownFdl: '',
      upOrDownFdf: '',
      upOrDown: '',
      pieRadiusRun: ['70%', '80%'],
      warterData1: [],
      warterData2: [],
      waterName1: '',
      waterName2: '',
      waterName3: '',
      waterName4: '',
      threeBalance1: '',
      threeBalance2: '',
      hoverAnimation: false,
      tbRadius: ['60%', '70%'],
      lvData: [
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          markLine: {
            symbol: 'none',
            data: []
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        }
      ],
      lvX: [],
      sunhaoData: [], //损耗量与损耗率
      elecData: [], //经济运行区间
      sangxiangX: [],
      sangxiangPos: [55, 32, 75, 50],
      sunhaoPos: [20, 32, 75, 30],
      reportFid: '',
      textCell: {},
      bgbj: `url(${require('../../../assets/image/energy/report/img_bgbj.png')})`,
      isNengXiao: true,
      lastDinaliang: '',
      thisDianliang: '',
      bizhi1: '',
      bizhi2: '',
      text1_1: '',
      text1_2: '',
      data1_2: [],
      data1_3: [],
      text2_1_1: '',
      text2_1_2: '',
      data2_2tb: [],
      data2_3tb: [],
      text2_2_1: [],
      text2_3_1: []
    }
  },
  created () {
    this.reportFid = this.$route.query.id || ''
    this.getReportDetail()
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    getReportDetail () {
      const data = {
        reportFid: this.reportFid
      }
      this.$store.dispatch('getReportDetail', data).then(res => {
        // reportType 0能效 1运维
        if (res.reportData && res.reportData.reportType == 0) {
          this.isNengXiao = true
          const [name, company, address] = res.reportData.textTopArr || []
          const [zrl, dydj, zbts, jcds] = res.reportData.theTopNum || []
          this.titleData = {
            name,
            company,
            address,
            zbts,
            dydj,
            zrl,
            jcds
          }
          this.textCell = res.reportData.textCell || {}
          this.nianyue = this.titleData.name.split('月') || []
          this.returnResFsd[0] = this.nianyue[0] + '月'
          // 2.1 电度电费
          this.fsdData[0].data = res.reportData.dataCell.dataCell2_1.feng
          this.fsdData[1].data = res.reportData.dataCell.dataCell2_1.ping
          this.fsdData[2].data = res.reportData.dataCell.dataCell2_1.gu
          this.fsdData[3].data = res.reportData.dataCell.dataCell2_1.dianfei
          this.fsdX = res.reportData.dataCell.dataCell2_1.time

          this.rdlPieData = []
          this.rdfPieData = []

          let pieChartsData1 = res.reportData.dataCell.data2_1_piecharts1.pieChartsData
          let pieChartsData2 = res.reportData.dataCell.data2_1_piecharts2.pieChartsData
          let dianliangSum = res.reportData.dataCell.data2_1_piecharts1.pieText.dianliangSum
          let dianfeiSum = res.reportData.dataCell.data2_1_piecharts2.pieText.dianfeiSum

          this.fdlPercent = res.reportData.dataCell.data2_1_piecharts1.pieText.huanbi + '%'
          this.fdfPercent = res.reportData.dataCell.data2_1_piecharts2.pieText.huanbi + '%'
          this.upOrDownFdl = res.reportData.dataCell.data2_1_piecharts1.pieText.upOrDown
          this.upOrDownFdf = res.reportData.dataCell.data2_1_piecharts2.pieText.upOrDown

          for (let a of pieChartsData1) {
            let percent = ((a.value / dianliangSum) * 100).toFixed(2)
            this.rdlPieData.push(this.formatPie(a.name, a.value, percent, 'kWh'))
          }
          for (let a of pieChartsData2) {
            let percent = ((a.value / dianfeiSum) * 100).toFixed(2)
            this.rdfPieData.push(this.formatPie(a.name, a.value, percent, '元'))
          }
          this.allDiangliang = `总电量\n${dianliangSum}kWh`
          this.allMoney = `总电费\n${dianfeiSum}元`

          // 3.1总线损
          this.zxsPieData = []
          let pieChartsData3 = res.reportData.dataCell.data3_1_piecharts.pieChartsData
          let allDianliangXs = res.reportData.dataCell.data3_1_piecharts.pieText

          let zxsPercent = pieChartsData3[0].value / allDianliangXs * 100
          if (zxsPercent > 3.5) {
            this.zxsOver = true
            this.chartColorListZXS = ['#FF1B1B', '#36ADFF', '#FF9239', '#13CF5A', '#666666']
          } else {
            this.zxsOver = false
            this.chartColorListZXS = ['#FF9239', '#36ADFF', '#13CF5A']
          }

          for (let a of pieChartsData3) {
            let percent = ((a.value / allDianliangXs) * 100).toFixed(2)
            this.zxsPieData.push(this.formatPie(a.name, a.value, percent, 'kWh'))
          }
          this.allDianliangXs = `总用电量\n${allDianliangXs}kWh`

          // 3.2 经济运行区间
          this.eleRunningArea = res.reportData.dataCell.data3_2 || []
          for (let a of this.eleRunningArea) {
            let newArr = []
            for (let b of a.data3_2piecharts) {
              let percent = ((b.value / a.timeLong) * 100).toFixed(2)
              newArr.push(this.formatPie(b.name, b.value, percent, 'h'))
            }
            a.data = newArr
          }
          // 4.1 电压偏差
          let water1 = res.reportData.dataCell.data4_1[0].value
          this.waterName1 = res.reportData.dataCell.data4_1[0].name
          let water2 = res.reportData.dataCell.data4_1[1].value
          this.waterName2 = res.reportData.dataCell.data4_1[1].name
          this.warterData1 = [water1, this.getWaterColor(water1)[0], `${water1 * 100}%`, '']
          this.warterData2 = [water2, this.getWaterColor(water2)[0], `${water2 * 100}%`, '']

          // 4.2 三相电压不平衡
          this.waterName3 = res.reportData.dataCell.data4_2[0].name
          this.tbPieData1[0].value = res.reportData.dataCell.data4_2[0].value * 100
          this.tbPieData1[1].value = 100 - this.tbPieData1[0].value
          this.threeBalance1 = this.tbPieData1[0].value + '%'
          this.chartColorTb1 = this.getWaterColor(res.reportData.dataCell.data4_2[0].value)
          // 不合格 chartColorTb2: ['#FF1B1B', '#ffd1d1']

          this.waterName4 = res.reportData.dataCell.data4_2[1].name
          this.tbPieData2[0].value = res.reportData.dataCell.data4_2[1].value * 100
          this.tbPieData2[1].value = 100 - this.tbPieData2[0].value
          this.threeBalance2 = this.tbPieData2[0].value + '%'
          this.chartColorTb2 = this.getWaterColor(res.reportData.dataCell.data4_2[1].value)

        } else if (res.reportData && res.reportData.reportType == 1) {
          this.isNengXiao = false
          const [name, company, address] = res.reportData.textTopArr || []
          const [zrl, dydj, zbts, jcds] = res.reportData.topNum || []
          this.titleData = {
            name,
            company,
            address,
            zbts,
            dydj,
            zrl,
            jcds
          }
          this.lastDinaliang = res.reportData.data1_1.lastDinaliang
          this.thisDianliang = res.reportData.data1_1.thisDianliang
          this.textCell = res.reportData.textCell || {}
          let bizhi = res.reportData.data1_1.bizhi ? res.reportData.data1_1.bizhi.split('%') : ''
          this.bizhi1 = bizhi[0]
          this.bizhi2 = bizhi[1]
          this.upOrDown = res.reportData.data1_1.upOrDown
          this.text1_1 = res.reportData.data1_1.text1
          this.text1_2 = res.reportData.data1_1.text2
          this.data1_2 = res.reportData.data1_2 || []
          this.data1_3 = res.reportData.data1_3 || []
          this.text2_1_1 = res.reportData.data2_1.text1
          this.text2_1_2 = res.reportData.data2_1.text2

          this.text2_2_1 = res.reportData.data2_2.text1
          this.text2_3_1 = res.reportData.data2_3.text1

          this.data2_2tb = res.reportData.data2_2.data2_2tb || []
          this.data2_3tb = res.reportData.data2_3.data2_3tb || []
          // console.log(res, '详情')
        } else {
          // eslint-disable-next-line no-console
          console.error("Error: %s", "数据获取失败");
        }
      })
    },
    // 格式化饼图数据
    formatPie (name, value, percent, unit) {
      let item = {
        name: value == 0 ? '' : name,
        value: percent,
        label: {
          normal: {
            formatter: value == 0 ? null : ['{b}: {c}%', value + unit].join('\n')
          }
        }
      }
      return item
    },
    getWaterColor (value) {
      let color = value < 0.6 ? ['#FF1B1B', '#ffd1d1'] : ['#13CF5A', '#d0f5de']
      return color
    },
    toTop (i) {
      //参数i表示间隔的幅度大小，以此来控制速度
      document.documentElement.scrollTop -= i;
      if (document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.toTop(i), 16);
      } else {
        clearTimeout(c);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.report {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header_box {
    width: 1200px;
    background-color: #ffffff;
    border-top: 1px solid rgba(219, 219, 219, 1);
    border-left: 1px solid rgba(219, 219, 219, 1);
    border-right: 1px solid rgba(219, 219, 219, 1);
    position: relative;
    .to_top {
      position: fixed;
      top: 0;
      right: 14.3vw;
      width: 35px;
      height: 35px;
      background-color: #333333;
      z-index: 999;
    }
    .to_top:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: all ease 0.3s;
    }
    .title_box {
      height: 180px;
      position: relative;
      color: #ffffff;
      .title_h1 {
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
      .title_h2 {
        position: absolute;
        bottom: 30px;
      }
      .totalRound {
        position: absolute;
        bottom: 0px;
        right: 5px;
        font-size: 12px;
      }
    }
    .title_num {
      display: flex;
      justify-content: space-around;
      .title_item {
        width: 16.67%;
        min-height: 120px;
        margin: 50px 0 0 0;
        .label {
          font-size: 16px;
          margin: 8px 0 0 0;
        }
        .value {
          font-size: 24px;
        }
      }
      .title_item_yw {
        width: 25%;
        min-height: 120px;
        margin: 50px 0 0 0;
        .label {
          font-size: 16px;
          margin: 8px 0 0 0;
        }
        .value {
          font-size: 24px;
        }
      }
    }
  }
  .content_box {
    width: 1200px;
    padding-top: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(219, 219, 219, 1);
    border-left: 1px solid rgba(219, 219, 219, 1);
    border-right: 1px solid rgba(219, 219, 219, 1);
  }
}
.part_title {
  color: #1a1a1a;
  font-size: 24px;
  margin-bottom: 25px;
}
.h2_title {
  margin-bottom: 35px;
}
.h3_title {
  font-size: 20px;
  margin: 25px 0;
}
.h2_title2 {
  margin-bottom: 20px;
}
.common_part {
  margin: 0 30px 50px 30px;
}
.common_bg {
  padding: 15px 30px;
  background-color: #f7f7f7;
  margin-bottom: 26px;
}
.common_content {
  // text-indent: 2em;
  white-space: pre-line;
  color: #333333;
  font-size: 16px;
}
.text_bottom {
  font-size: 15px;
  color: #666666;
}
.bottom_box {
  width: 1200px;
  margin-top: 20px;
}
.sunhao_chart1 {
  width: 100%;
  height: 100%;
}
.sunhao_chart2 {
  width: 50%;
  height: 100%;
}
.sunhao_chart3 {
  width: 50%;
  height: 50%;
}
.dianliang_content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .dianliang_box {
    width: 33.3%;
    // height: 66px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 9px 0px rgba(134, 181, 214, 0.3);
    border-radius: 2px;
    margin-left: 20px;
    padding: 30px 50px;
    .word1 {
      color: #0086e3;
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .word2 {
      color: #1a1a1a;
      font-size: 16px;
    }
    .word3 {
      color: #0086e3;
      font-size: 18px;
    }
    .blue_line {
      width: 35px;
      height: 2px;
      margin-bottom: 22px;
      background: rgba(0, 134, 227, 1);
    }
  }
}
.common_part_yw {
  margin-left: 20px;
  margin-top: 20px;
}
.device_run_box {
  margin-bottom: 19px;
}
.device_word {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 25px;
}
.d_name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.d_info {
  margin-bottom: 5px;
  font-size: 14px;
}
.d_content {
  width: 100%;
  height: 80px;
  background-color: #f7f7f7;
  .word {
    color: #666666;
    font-size: 14px;
    margin: 15px;
  }
}
.spe_red {
  color: #dc143c;
}
.sec_info {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 12px;
}
.rdl_percent {
  position: absolute;
  left: 0;
  right: 0;
  top: 61%;
  display: flex;
  justify-content: center;
  font-size: 15px;
}
.ele_runing_box {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .ele_item {
    flex: 1;
    position: relative;
    .ele_name {
      position: absolute;
      left: 50%;
      top: 25px;
      transform: translateX(-50%);
      font-size: 13px;
    }
  }
}
.sign_box {
  display: flex;
  justify-content: center;
  bottom: 12px;
  left: 33%;
  .common_sign {
    color: #333333;
    font-size: 13px;
    margin-right: 10px;
    .sign_kong {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #0086e3;
      margin-right: 5px;
    }
    .sign_qin {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #36adff;
      margin-right: 5px;
    }
    .sign_jin {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #13cf5a;
      margin-right: 5px;
    }
    .sign_zhong {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #ff9239;
      margin-right: 5px;
    }
    .sign_chao {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: #ff1b1b;
      margin-right: 5px;
    }
  }
}
.water_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.water_title {
  color: #333333;
  margin-bottom: 20px;
}
</style>
