<template>
  <div>
    <div class="top_header">
      <span v-if="$isPc" class="choose_label">厂站:</span>
      <el-select v-if="$isPc" v-model="siteId" placeholder="请选择厂站" @change="handleSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="flex_row_yCenter" style="margin-left: 10px;">
        <p v-if="$isPc" class="p-title" style="width: 90px;">时间选择：</p>
        <el-date-picker @change="handleYear" v-model="yearValue" type="year" placeholder="选择年" value-format="yyyy"
          :clearable="false">
        </el-date-picker>
        <el-select class="time3" v-model="monthType" placeholder="选择月" @change="handleMonth">
          <el-option v-for="(item, index) in dateMonthList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="common_info">
      <div ref="ydxw" style="flex:0.33;background-color: #ffffff;">
        <div class="policy_title">
          <span class="blue_line"></span>
          <span>报警趋势 </span>
        </div>
        <pieCharts pieWidth="100%" pieHeight="300" :dataList="policyPieData" />
      </div>
      <div ref="yhph" style="margin-left:12px; flex:0.67;background-color:#ffffff;position:relative;">
        <div class="policy_title">
          <span class="blue_line"></span>
          <span>报警分类统计</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="（次）" :dataList="policyGradeData" :xName="policyX" />
      </div>
    </div>
    <div class="common_info">
      <div style="flex:1;background-color:#ffffff;position:relative;">
        <div class="policy_title">
          <span class="blue_line"></span>
          <span>告警平均处理时间</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="（时）" unitR="" :dataList="gjAvgSeries" :xName="gjAvgX"
          :yList="gjYList" />
        <div class="shebei_type">
          <span>设备类型：</span>
          <el-select style="width:100px" v-model="shebeiId" placeholder="请选择" @change="shebeiType">
            <el-option v-for="(item, index) in equipTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
    <div class="common_info">
      <div style="flex:1;background-color:#ffffff;position:relative;">
        <div class="policy_title">
          <span class="blue_line"></span>
          <span>报警设备统计</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="（次）" :dataList="bjsbSeries" :xName="bjsbX" />
      </div>
      <div style="margin-left:12px;flex:1;background-color: #ffffff;">
        <div class="policy_title">
          <span class="blue_line"></span>
          <span>高频次报警统计 </span>
        </div>
        <el-table :data="highFreqAlert" stripe class="bjTable">
          <el-table-column prop="rank" label="排名" />
          <el-table-column prop="equipName" label="报警对象" />
          <el-table-column prop="total" label="报警频次" />
          <el-table-column prop="clientName" label="所属客户" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import barCharts from '../../../components/barCharts/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
import { dateMonthList } from '../../../assets/js/config.js'
export default {
  name: 'kehuPolicy',
  components: {
    barCharts,
    pieCharts
  },
  computed: mapState([
    'equipTypeList',
    'headerClient',
    'headerSite',
    'curuserId',
    'userClients',
    'myCompanyId'
  ]),
  data () {
    return {
      companyId: '',
      siteId: '',
      yearValue: '2020',
      monthType: 'all',
      dateMonthList: dateMonthList,
      policyPieData: [],
      policyGradeData: [],
      policyX: [],
      xysdSeries: [
        {
          name: '秒',
          type: 'line',
          data: []
        }
      ],
      xysdX: [],
      bjsbSeries: [
        {
          name: '',
          type: 'bar',
          barWidth: '20%',
          data: []
        }
      ],
      bjsbX: [],
      highFreqAlert: [],
      shebeiId: '',
      gjAvgSeries: [
        {
          name: '时',
          type: 'line',
          data: []
        }
      ],
      gjAvgX: [],
      gjYList: [{}, { interval: 20, min: 0, max: 100 }]
    }
  },
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getTopInfo()
      }
    }
  },
  async created () {
    await this.getTopInfo()
    await this.$store.dispatch('equipType')
    this.shebeiId = this.equipTypeList[0].value
    this.getPolicy()
    this.alertAvgHandleTime()
  },
  mounted () { },
  methods: {
    async getTopInfo () {
      await this.$store.dispatch('getCuruserId')
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: 'YunWei-AlertAnalysis'
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
    },
    alertAvgHandleTime () {
      let data = {
        anaType: 'YunWei-AlertAnalysis',
        siteFid: this.siteId,
        year: this.yearValue,
        month: this.monthType,
        equipType: this.shebeiId
      }
      this.$store.dispatch('alertAvgHandleTime', data).then(res => {
        this.gjAvgSeries[0].data = res.AlertAvgHandleTime.yAxis
        this.gjAvgX = res.AlertAvgHandleTime.xAxis
      })
    },
    getPolicy () {
      let data = {
        anaType: 'YunWei-AlertAnalysis',
        siteFid: this.siteId,
        year: this.yearValue,
        month: this.monthType
      }
      this.$store.dispatch('getKhPolicy', data).then(res => {
        this.policyPieData = []
        for (let a of res.alertType) {
          let percent = ((a.value / res.alertTimeSum) * 100).toFixed(2)
          this.policyPieData.push(
            this.formatPie(a.name, a.value, percent, '次')
          )
        }
        this.policyGradeData = res.AlertGradeStatistics.yAxis
        for (let a of this.policyGradeData) {
          a.type = 'bar'
          a.barWidth = 25
          a.stack = 'two'
        }
        this.policyX = res.AlertGradeStatistics.xAxis
        this.bjsbSeries[0].data = res.AlertEquipStatistics.yAxis
        this.bjsbX = res.AlertEquipStatistics.xAxis
        this.highFreqAlert = res.highFreqAlert
      })
    },
    // 格式化饼图数据
    formatPie (name, value, percent, unit) {
      let item = {
        name: name,
        value: percent,
        label: {
          normal: {
            formatter: ['{b}: {c}%', value + unit].join('\n')
          }
        }
      }
      return item
    },
    //选择站点
    handleSite (value) {
      this.companyId = value || ''
      this.getPolicy()
      this.alertAvgHandleTime()
    },
    // 选择年份
    handleYear (value) {
      this.yearValue = value
      this.getPolicy()
      this.alertAvgHandleTime()
    },
    // 选择时间
    handleMonth (value) {
      this.monthType = value
      this.getPolicy()
      this.alertAvgHandleTime()
    },
    // 选择设备
    shebeiType (value) {
      this.shebeiId = value
      this.alertAvgHandleTime()
    },
    // 详情
    handleDetail (index, item) {
      // console.log(item)
      // let anaType = 'YunWei-AlertAnalysis2'
      // let { equipFid, startTime, endTime, siteFid } = item
      // parent.addTab('报警监测', `/bukong/hisdata.aspx?anaType=${anaType}&equipFid=${equipFid}&startTime=${startTime}&endTime=${endTime}&siteFid=${siteFid}`)

      let { equipFid } = item
      // let bjLevel = '2'
      let propsData = {
        name: 'Gaojingjc',
        params: `?&equipFid=${equipFid}`,
        isReload: null
      }
      this.$store.dispatch('propsRouteData', propsData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top_header {
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #ffffff;
  align-items: center;
  margin-bottom: 12px;
  .choose_label {
    margin-right: 10px;
    margin-left: 10px;
  }
}
.second_info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .all {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    width: 16.2%;
    height: 136px;
    border-radius: 5px;
    .logo {
      width: 42px;
      height: 42px;
      margin-right: 6px;
      margin-left: 0.7vw;
    }
    .p1 {
      color: #333333;
      font-size: 13px;
      margin-bottom: 5px;
    }
    .p2 {
      font-size: 24px;
      font-family: Arial;
      color: #1a1a1a;
    }
    .percent_info {
      margin-left: 0.8vw;
      margin-right: 0.7vw;
    }
    .p3 {
      font-size: 13px;
      color: #333333;
      margin-bottom: 5px;
    }
    .p4 {
      font-size: 13px;
      color: #333333;
    }
  }
}
.color_red {
  color: #ff1b1b;
}
.color_green {
  color: #14d15c;
}
.third_info {
  width: 100%;
  margin-top: 12px;
  display: flex;
  .third_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
  }
}
.common_info {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 12px;
  .policy_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
    margin-left: 20px;
  }
}
.shebei_type {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
}

.p-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.bjTable {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
}
.bjTable::-webkit-scrollbar {
  display: none;
}
</style>
