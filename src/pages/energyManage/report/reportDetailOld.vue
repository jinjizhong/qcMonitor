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
      </div>
      <div v-if="isNengXiao">
        <div class="title_num">
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_czmj.png" alt="img" />
            <span class="label">厂站面积</span>
            <span class="value">{{ titleData.czmj }}㎡</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zbts.png" alt="img" />
            <span class="label">主变台数</span>
            <span class="value">{{ titleData.zbts }}台</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_dydj.png" alt="img" />
            <span class="label">电压等级</span>
            <span class="value">{{ titleData.dydj }}kV</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zrl.png" alt="img" />
            <span class="label">总容量</span>
            <span class="value">{{ titleData.zrl }}kVa</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_jcds.png" alt="img" />
            <span class="label">监测点数</span>
            <span class="value">{{ titleData.jcds }}个</span>
          </div>
          <div class="title_item flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_cjsb.png" alt="img" />
            <span class="label">采集设备</span>
            <span class="value">{{ titleData.cjsb }}个</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="title_num">
          <div class="title_item_yw flex_column_center">
            <img src="../../../assets/image/energy/report/icon_bg_zrl.png" alt="img" />
            <span class="label">总容量</span>
            <span class="value">{{ titleData.zrl }}kVa</span>
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
              :returnRes="returnResFsd" needSecondUnit />
          </div>
          <p class="common_bg common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt2_1 }}</p>
          <!-- 力率电费 -->
          <!-- <p class="h2_title">2.2 力率电费</p>
          <div>
            <div style="text-align:center;">功率因数趋势</div>
            <barCharts barWidth="100%" barHeight="300" unitL="功率因数" unitR="力率增减比 (%）" :dataList="lvData" :xName="lvX"
              needSecondUnit />
          </div>
          <p class="common_bg common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt2_2 }}</p> -->
          <!-- 电费分析小结 -->
          <p class="h2_title2">2.2 电费分析小结</p>
          <p class="common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt2_3 }}</p>
        </div>
        <!-- 变压器损耗分析 -->
        <div class="common_part">
          <p class="part_title">三、 变压器损耗分析</p>
          <!-- 损耗量与损耗率 -->
          <p class="h2_title">3.1 损耗量与损耗率</p>
          <div style="height:450px;display:flex;flex-wrap:wrap;margin-bottom: 40px;">
            <div v-for="(sunhao, key) in sunhaoData" :key="key" :class="{
              sunhao_chart1: sunhaoData.length == 1,
              sunhao_chart2: sunhaoData.length == 2,
              sunhao_chart3: sunhaoData.length > 3
            }" style="margin-bottom: 20px;">
              <div style="text-align:center;">{{ sunhao.name }}</div>
              <barCharts barWidth="100%" barHeight="225" unitL="(耗损量/kWh)" unitR="(损耗率/%)" :dataList="sunhao.series"
                :xName="sunhao.cell3" needSecondUnit :gridPos="sunhaoPos" />
            </div>
          </div>
          <p class="common_bg common_content">{{ textCell.txt3_1 }}</p>
          <!-- 经济运行区间 -->
          <p class="h2_title">3.2 经济运行区间</p>
          <img style="width: 100%;" src="../../../assets/image/jinjiyunxingqujian.png" alt="img">
          <!-- <p class="h2_title">3.2 经济运行区间</p>
          <div style="height:450px;display:flex;flex-wrap:wrap;margin-bottom: 35px;">
            <div v-for="(elec, key) in elecData" :key="key" :class="{
              sunhao_chart1: elecData.length == 1,
              sunhao_chart2: elecData.length == 2,
              sunhao_chart3: elecData.length > 3
            }" style="margin-bottom: 20px;">
              <div style="text-align:center;">{{ elec.name }}</div>
              <barCharts barWidth="100%" barHeight="225" unitL="(耗损量/kWh)" :dataList="elec.series" :xName="elec.cell2"
                needSecondUnit :gridPos="sunhaoPos" />
            </div>
          </div>
          <div class="sign_box">
            <div class="common_sign flex_row_center">
              <span class="sign_fei"></span>
              <span>非经济运行区间</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_jiao"></span>
              <span>较经济运行区间</span>
            </div>
            <div class="common_sign flex_row_center">
              <span class="sign_jin"></span>
              <span>经济运行区间</span>
            </div>
          </div>
          <p class="common_bg common_content">{{ textCell.txt3_2 }}</p> -->
          <!-- 电费分析小结 -->
          <p class="h2_title2">3.3 损耗分析小结</p>
          <p class="common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt3_3 }}</p>
        </div>
        <!-- 电能质量 -->
        <div class="common_part">
          <p class="part_title">四、电能质量</p>
          <!-- 电压总畸变率 -->
          <!-- <p class="h2_title">4.1 电压总畸变率</p>
          <div style="display:flex;">
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">A相电压谐波畸变率趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="xieboSeriesA" :xName="xieboA" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">B相电压谐波畸变率趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="xieboSeriesB" :xName="xieboB" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">C相电压谐波畸变率趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="xieboSeriesC" :xName="xieboC" />
            </div>
          </div>
          <p class="common_bg common_content">{{ textCell.txt4_1 }}</p> -->
          <!-- 频谱图 -->
          <!-- <p class="h2_title">4.2 频谱图</p>
          <div style="display:flex;">
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">A相电压谐波畸变频谱图</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="pinpuSeriesA" :xName="pinpuA" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">B相电压谐波畸变频谱图</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="pinpuSeriesB" :xName="pinpuB" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">C相电压谐波畸变频谱图</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压畸变率(%)" :dataList="pinpuSeriesC" :xName="pinpuC" />
            </div>
          </div>
          <p class="common_bg common_content">{{ textCell.txt4_2 }}</p> -->
          <!-- 电压偏差 -->
          <p class="h2_title">4.1 电压偏差</p>
          <div style="display:flex;">
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">A相电压偏差趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压偏差(%)" :dataList="pianchaSeriesA" :xName="pianchaA" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">B相电压偏差趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压偏差(%)" :dataList="pianchaSeriesB" :xName="pianchaB" />
            </div>
            <div class="flex_column" style="flex: 0.33">
              <div style="text-align:center;">C相电压偏差趋势</div>
              <barCharts barWidth="100%" barHeight="300" unitL="电压偏差(%)" :dataList="pianchaSeriesC" :xName="pianchaC" />
            </div>
          </div>
          <p class="common_bg common_content">{{ textCell.txt4_3 }}</p>
          <!-- 三相电压不平衡 -->
          <p class="h2_title">4.2 三相电压不平衡</p>
          <div>
            <barCharts barWidth="100%" barHeight="350" unitL="三相电压不平衡度（%）" :dataList="sanxiangSeries"
              :xName="sangxiangX" :gridPos="sangxiangPos" />
          </div>
          <p class="common_bg common_content">&nbsp;&nbsp;&nbsp;&nbsp;{{ textCell.txt4_4 }}</p>
          <!-- 电能质量小结 -->
          <p class="h2_title2">4.3 电能质量小结</p>
          <p class="common_content">{{ textCell.txt4_5 }}</p>
        </div>
      </div>
      <!-- 报告底部内容 -->
      <div class="bottom_box">
        <div class="text_bottom">{{ textCell.txt_bottom1 }}</div>
        <div class="text_bottom">{{ textCell.txt_bottom2 }}</div>
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
export default {
  name: 'reportDetail',
  components: {
    barCharts
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
          name: '峰电量',
          type: 'bar',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '平电量',
          type: 'bar',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '谷电量',
          type: 'bar',
          barWidth: 25, //柱图宽度
          stack: 'two',
          data: []
        },
        {
          name: '电费',
          type: 'line',
          barWidth: 25, //柱图宽度
          data: []
        }
      ],
      fsdX: [],
      returnResFsd: ['', '日'],
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
      xieboSeriesA: [
        {
          name: 'A相电压畸变率置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              {
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: {
                  color: '#FF1B1B'
                },
                yAxis: ''
              }
            ]
          }
        },
        {
          name: 'A相电压畸变率中位数',
          type: 'line',
          data: []
        },
        {
          name: 'A相电压畸变率置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      xieboA: [],
      xieboSeriesB: [
        {
          name: 'B相电压畸变率置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              {
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: {
                  color: '#FF1B1B'
                },
                yAxis: ''
              }
            ]
          }
        },
        {
          name: 'B相电压畸变率中位数',
          type: 'line',
          data: []
        },
        {
          name: 'B相电压畸变率置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      xieboB: [],
      xieboSeriesC: [
        {
          name: 'C相电压畸变率置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              {
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: {
                  color: '#FF1B1B'
                },
                yAxis: ''
              }
            ]
          }
        },
        {
          name: 'C相电压畸变率中位数',
          type: 'line',
          data: []
        },
        {
          name: 'C相电压畸变率置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      xieboC: [],
      pinpuSeriesA: [
        {
          name: 'A相电压谐波畸变频谱图',
          type: 'bar',
          data: []
        }
      ],
      pinpuA: [],
      pinpuSeriesB: [
        {
          name: 'B相电压谐波畸变频谱图',
          type: 'bar',
          data: []
        }
      ],
      pinpuB: [],
      pinpuSeriesC: [
        {
          name: 'C相电压谐波畸变频谱图',
          type: 'bar',
          data: []
        }
      ],
      pinpuC: [],
      pianchaSeriesA: [
        {
          name: 'A相电压偏差置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // }
            ]
          }
        },
        {
          name: 'A相电压偏中位数',
          type: 'line',
          data: []
        },
        {
          name: 'A相电压偏差置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      pianchaA: [],
      pianchaSeriesB: [
        {
          name: 'B相电压偏差置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // }
            ]
          }
        },
        {
          name: 'B相电压偏中位数',
          type: 'line',
          data: []
        },
        {
          name: 'B相电压偏差置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      pianchaB: [],
      pianchaSeriesC: [
        {
          name: 'C相电压偏差置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // },
              // {
              //   silent: false,
              //   lineStyle: {
              //     color: '#FF1B1B'
              //   },
              //   yAxis: ''
              // }
            ]
          }
        },
        {
          name: 'C相电压偏中位数',
          type: 'line',
          data: []
        },
        {
          name: 'C相电压偏差置信区间最小值',
          type: 'line',
          data: []
        }
      ],
      pianchaC: [],
      sanxiangSeries: [
        {
          name: '置信区间最大值',
          type: 'line',
          data: [],
          markLine: {
            symbol: 'none',
            data: [
              {
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: {
                  color: '#FF1B1B'
                },
                yAxis: ''
              }
            ]
          }
        },
        {
          name: '中位数',
          type: 'line',
          data: []
        },
        {
          name: '置信区间最小值',
          type: 'line',
          data: []
        }
      ],
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
      text2_3_1: [],
      upOrDown: ''
    }
  },
  created () {
    this.reportFid = this.$route.query.id || ''
    this.getReportDetail()
  },
  mounted () { },
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
          const [czmj, zbts, dydj, zrl, jcds, cjsb] =
            res.reportData.theTopNum || []
          this.titleData = {
            name,
            company,
            address,
            czmj,
            zbts,
            dydj,
            zrl,
            jcds,
            cjsb
          }
          this.textCell = res.reportData.textCell || {}
          // 2.1 电度电费
          this.fsdData[0].data = res.reportData.dataCell.dataCell2_1.cell1
          this.fsdData[1].data = res.reportData.dataCell.dataCell2_1.cell2
          this.fsdData[2].data = res.reportData.dataCell.dataCell2_1.cell3
          this.fsdData[3].data = res.reportData.dataCell.dataCell2_1.cell4
          this.fsdX = res.reportData.dataCell.dataCell2_1.cell5
          // 2.2 力率电费
          this.lvData[0].data = res.reportData.dataCell.dataCell2_2.cell1
          this.lvData[1].data = res.reportData.dataCell.dataCell2_2.cell2
          this.lvData[2].data = res.reportData.dataCell.dataCell2_2.cell3
          this.lvX = res.reportData.dataCell.dataCell2_2.cell4
          this.lvData[0].name = '置信区间最大值'
          this.lvData[1].name = '中位数'
          this.lvData[2].name = '置信区间最小值'
          let lineData = [
            {
              silent: false, //鼠标悬停事件  true没有，false有
              lineStyle: {
                color: '#FF1B1B'
              },
              yAxis: res.reportData.dataCell.dataCell2_2.guideLine
            }
          ]
          this.lvData[1].markLine.data = lineData

          //3.1 损耗量与损耗率
          this.sunhaoData = res.reportData.dataCell.dataCell3_1
          for (let item of this.sunhaoData) {
            let series = [
              {
                name: '耗损量',
                type: 'bar',
                data: item.cell1
              },
              {
                name: '耗损率',
                type: 'line',
                yAxisIndex: 1,
                data: item.cell2
              }
            ]
            item.series = series
          }

          // 3.2 经济运行区间
          this.elecData = res.reportData.dataCell.dataCell3_2
          for (let elec of this.elecData) {
            let series = [
              {
                name: '时长',
                type: 'line',
                data: elec.cell1,
                areaStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(54,173,255,0.3)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(54,173,255,0.3)'
                        }
                      ],
                      globaCoord: false
                    }
                  }
                }, //填充区域样式
                markArea: {
                  data: [
                    [
                      {
                        name: '',
                        itemStyle: {
                          color: 'rgba(255,27,27,0.3)'
                        }
                      },
                      {
                        xAxis: String(elec.B.B21)
                      }
                    ],
                    [
                      {
                        name: '',
                        xAxis: String(elec.B.B21),
                        itemStyle: {
                          color: 'rgba(255,142,41,0.3)'
                        }
                      },
                      {
                        xAxis: String(elec.B.B11)
                      }
                    ],
                    [
                      {
                        name: '',
                        xAxis: String(elec.B.B11),
                        itemStyle: {
                          color: 'rgba(19,207,90,.3)'
                        }
                      },
                      {
                        xAxis: String(elec.B.B12)
                      }
                    ],
                    [
                      {
                        name: '',
                        xAxis: String(elec.B.B12),
                        itemStyle: {
                          color: 'rgba(255,142,41,.3)'
                        }
                      },
                      {
                        xAxis: String(elec.B.B22)
                      }
                    ],
                    [
                      {
                        name: '',
                        xAxis: String(elec.B.B22),
                        itemStyle: {
                          color: 'rgba(255,27,27,0.3)'
                        }
                      },
                      {}
                    ]
                  ]
                }
              }
            ]
            elec.series = series
          }

          //4.1 电压总畸变率
          this.xieboSeriesA[0].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_1.cell1
          this.xieboSeriesA[0].markLine.data[0].yAxis =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_1.guideLine
          this.xieboSeriesA[1].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_1.cell2
          this.xieboSeriesA[2].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_1.cell3
          this.xieboA = res.reportData.dataCell.dataCell4_1.dataCell4_1_1.cell4

          this.xieboSeriesB[0].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_2.cell1
          this.xieboSeriesB[0].markLine.data[0].yAxis =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_2.guideLine
          this.xieboSeriesB[1].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_2.cell2
          this.xieboSeriesB[2].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_2.cell3
          this.xieboB = res.reportData.dataCell.dataCell4_1.dataCell4_1_2.cell4

          this.xieboSeriesC[0].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_3.cell1
          this.xieboSeriesC[0].markLine.data[0].yAxis =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_3.guideLine
          this.xieboSeriesC[1].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_3.cell2
          this.xieboSeriesC[2].data =
            res.reportData.dataCell.dataCell4_1.dataCell4_1_3.cell3
          this.xieboC = res.reportData.dataCell.dataCell4_1.dataCell4_1_3.cell4

          //4.2 频谱图
          this.pinpuSeriesA[0].data =
            res.reportData.dataCell.dataCell4_2.dataCell4_2_1.cell1
          this.pinpuA = res.reportData.dataCell.dataCell4_2.dataCell4_2_1.cell2

          this.pinpuSeriesB[0].data =
            res.reportData.dataCell.dataCell4_2.dataCell4_2_2.cell1
          this.pinpuB = res.reportData.dataCell.dataCell4_2.dataCell4_2_2.cell2

          this.pinpuSeriesC[0].data =
            res.reportData.dataCell.dataCell4_2.dataCell4_2_3.cell1
          this.pinpuC = res.reportData.dataCell.dataCell4_2.dataCell4_2_3.cell2

          // 4.3 电压偏差
          this.pianchaSeriesA[0].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_1.cell1
          this.pianchaSeriesA[1].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_1.cell2
          this.pianchaSeriesA[2].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_1.cell3
          this.pianchaA = res.reportData.dataCell.dataCell4_3.dataCell4_3_1.cell4
          // this.pianchaSeriesA[0].markLine.data[0].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_1.guideLine1
          // this.pianchaSeriesA[0].markLine.data[1].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_1.guideLine2
          // this.pianchaSeriesA[0].markLine.data[2].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_1.guideLine3

          this.pianchaSeriesB[0].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_2.cell1
          this.pianchaSeriesB[1].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_2.cell2
          this.pianchaSeriesB[2].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_2.cell3
          this.pianchaB = res.reportData.dataCell.dataCell4_3.dataCell4_3_2.cell4
          // this.pianchaSeriesB[0].markLine.data[0].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_2.guideLine1
          // this.pianchaSeriesB[0].markLine.data[1].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_2.guideLine2
          // this.pianchaSeriesB[0].markLine.data[2].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_2.guideLine3

          this.pianchaSeriesC[0].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_3.cell1
          this.pianchaSeriesC[1].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_3.cell2
          this.pianchaSeriesC[2].data =
            res.reportData.dataCell.dataCell4_3.dataCell4_3_3.cell3
          this.pianchaC = res.reportData.dataCell.dataCell4_3.dataCell4_3_3.cell4
          // this.pianchaSeriesC[0].markLine.data[0].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_3.guideLine1
          // this.pianchaSeriesC[0].markLine.data[1].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_3.guideLine2
          // this.pianchaSeriesC[0].markLine.data[2].yAxis =
          //   res.reportData.dataCell.dataCell4_3.dataCell4_3_3.guideLine3

          // 三相电压不平衡
          this.sanxiangSeries[0].data = res.reportData.dataCell.dataCell4_4.cell1
          this.sanxiangSeries[1].data = res.reportData.dataCell.dataCell4_4.cell2
          this.sanxiangSeries[2].data = res.reportData.dataCell.dataCell4_4.cell3
          this.sangxiangX = res.reportData.dataCell.dataCell4_4.cell4
          this.sanxiangSeries[0].markLine.data[0].yAxis =
            res.reportData.dataCell.dataCell4_4.guideLine
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
.sign_box {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  .common_sign {
    color: #333333;
    font-size: 13px;
    margin-right: 10px;
    .sign_fei {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(255, 27, 27, 0.3);
      margin-right: 5px;
    }
    .sign_jiao {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(255, 142, 41, 0.3);
      margin-right: 5px;
    }
    .sign_jin {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: rgba(19, 207, 90, 0.3);
      margin-right: 5px;
    }
  }
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
</style>
