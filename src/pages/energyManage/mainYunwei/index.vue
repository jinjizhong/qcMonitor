<template>
  <div>
    <!-- <div class="top_header">
      <span v-if="$isPc" class="choose_label">选择公司:</span>
      <el-select
        v-if="$isPc"
        v-model="companyId"
        placeholder="请选择"
        @change="handleClient"
      >
        <el-option
          v-for="item in headerClient"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span v-if="$isPc" class="choose_label">选择厂站:</span>
      <el-select
        v-if="$isPc"
        v-model="siteId"
        placeholder="请选择"
        @change="handleSite"
      >
        <el-option
          v-for="item in headerSite"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
    <div class="second_info">
      <div class="all">
        <img class="logo" :src="zdzl" />
        <div>
          <p class="p1">站点总量(个)</p>
          <p class="p2">{{siteAmount}}</p>
        </div>
      </div>
      <div class="all">
        <img class="logo" :src="byyd" />
        <div>
          <p class="p1">今年用电量(kWh)</p>
          <p class="p2">{{thisYearUsed}}</p>
        </div>
      </div>
      <div class="all">
        <img class="logo" :src="jryd" />
        <div>
          <p class="p1">本月用电量(kWh)</p>
          <p class="p2">{{thisMonthUsed.value}}</p>
        </div>
        <div class="percent_info">
          <p class="p3">同比 <span
              :class="{color_red: thisMonthUsed.tongbi && thisMonthUsed.tongbi.indexOf('+')> -1, color_green: thisMonthUsed.tongbi && thisMonthUsed.tongbi.indexOf('-') > -1}">{{thisMonthUsed.tongbi}}%</span>
          </p>
          <p class="p4">环比 <span
              :class="{color_red: thisMonthUsed.huanbi && thisMonthUsed.huanbi.indexOf('+')> -1, color_green: thisMonthUsed.huanbi && thisMonthUsed.huanbi.indexOf('-') > -1}">{{thisMonthUsed.huanbi}}%</span>
          </p>
        </div>
      </div>
      <div class="all">
        <img class="logo" :src="jrydl" />
        <div>
          <p class="p1">当日用电量(kWh)</p>
          <p class="p2">{{todayUsed.value}}</p>
        </div>
        <div class="percent_info">
          <p class="p3">同比 <span
              :class="{color_red: todayUsed.tongbi && todayUsed.tongbi.indexOf('+')> -1, color_green: todayUsed.tongbi && todayUsed.tongbi.indexOf('-') > -1}">{{todayUsed.tongbi}}%</span>
          </p>
          <p class="p4">环比 <span
              :class="{color_red: todayUsed.huanbi && todayUsed.huanbi.indexOf('+')> -1, color_green: todayUsed.huanbi && todayUsed.huanbi.indexOf('-') > -1}">{{todayUsed.huanbi}}%</span>
          </p>
        </div>
      </div>
      <div class="all">
        <img class="logo" :src="byzhjn" />
        <div>
          <p class="p1">全年综合节能(千吨标准煤)</p>
          <p class="p2">{{thisYearSaving}}</p>
        </div>
      </div>
      <div class="all">
        <img class="logo" :src="ljjstpl" />
        <div>
          <p class="p1">累计减少碳排放量(吨)</p>
          <p class="p2">{{carbonSaving}}</p>
        </div>
      </div>
    </div>
    <div class="third_info">
      <div style="margin-left: 20px;">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>主要用户行业用电趋势</span>
        </div>
        <barCharts barHeight="300" unitL="(用电量/kWh)" unit="日" :dataList="ydqsSeries" :xName="ydqsX" :gridPos="gridPos"
          :returnRes="returnResQs" />
      </div>
    </div>
    <div class="forth_info">
      <div ref="yhph" style="flex:1;background-color:#ffffff;position:relative;">
        <div class="forth_title">
          <span class="blue_line"></span>
          <span>站点排行</span>
        </div>
        <barCharts :dataList="userRankList" :xName="userRankX" :unit="unitRank" barWidth="100%" barHeight="300"
          @swich="switchCharts" :gridPos="gridPosRank" :returnRes="returnResPh" isRow hasSwich />
        <div class="rank_type">
          <p class="p-title">排序因素：</p>
          <el-select style="width:120px;" @change="handleRankType" v-model="rankType" placeholder="请选择排序因素">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div ref="ydxw" style="margin-left:12px;flex:1;background-color: #ffffff;">
        <div class="forth_title">
          <span class="blue_line"></span>
          <span>用户用电行为特性 </span>
        </div>
        <pieCharts pieWidth="100%" pieHeight="300" :dataList="ydxwData" :piePosition="nxPiePosition" isLoopPie />
      </div>
    </div>
    <div class="forth_info">
      <div style="flex:1;background-color:#ffffff;position:relative;">
        <div class="forth_title">
          <span class="blue_line"></span>
          <span>能效服务地区分布</span>
        </div>
        <pieCharts pieHeight="300" pieWidth="100%" :dataList="nxPieData" :piePosition="nxPiePosition" />
      </div>
      <div style="margin-left:12px;flex:1;background-color: #ffffff;">
        <div class="forth_title">
          <span class="blue_line"></span>
          <span>用户行业分布 </span>
        </div>
        <pieCharts pieHeight="300" pieWidth="100%" :dataList="yhPieData" :piePosition="yhPiePosition" />
      </div>
    </div>
  </div>
</template>

<script>
import barCharts from '../../../components/barCharts/index'
import pieCharts from '../../../components/pictorialCharts/pie_index.vue'
export default {
  name: 'mainyunwei',
  components: {
    barCharts,
    pieCharts
  },
  data () {
    return {
      companyId: '',
      siteId: '',
      ydqsSeries: [],
      ydqsX: [],
      siteAmount: '',
      thisYearUsed: '',
      thisMonthUsed: {},
      todayUsed: {},
      carbonSaving: '',
      thisYearSaving: '',
      zdzl: require('../../../assets/image/energy/icon_top_zdzl.png'),
      byyd: require('../../../assets/image/energy/icon_top_byyd.png'),
      byzhjn: require('../../../assets/image/energy/icon_top_byzhjn.png'),
      jryd: require('../../../assets/image/energy/icon_top_jryd.png'),
      ljjstpl: require('../../../assets/image/energy/icon_top_ljjstpl.png'),
      jrydl: require('../../../assets/image/energy/icon_top_jrydl.png'),
      userRankList: [],
      userRankX: [],
      unitRank: 'kWh',
      rankType: '0',
      rank: '0',
      returnResQs: ['', '日'],
      returnResPh: ['', '-用电量'],
      typeList: [
        {
          id: '1',
          name: '用电量',
          value: '0'
        },
        {
          id: '2',
          name: '电费',
          value: '1'
        },
        // {
        //   id: '3',
        //   name: '可调配电量',
        //   value: '2'
        // },
        {
          id: '4',
          name: '功率因数',
          value: '3'
        },
        {
          id: '5',
          name: '电压畸变率',
          value: '4'
        },
        {
          id: '6',
          name: '电流畸变率',
          value: '5'
        }
      ],
      ydxwData: [], //用户用电行为
      nxPieData: [],
      yhPieData: [],
      nxPiePosition: ['vertical', 'right', 'center'],
      yhPiePosition: ['vertical', 'right', 'center'],
      gridPosRank: [30, 32, 100, 35],
      gridPos: [30, 32, 50, 50]
    }
  },
  created () {
    this.getMainInfo()
    this.getRankInfo()
    this.getChartsFormatDate()
  },
  mounted () { },
  methods: {
    getChartsFormatDate () {
      let date = new Date()
      this.returnResQs[0] = date.getMonth() + 1 + '月'
    },
    getMainInfo () {
      this.$store.dispatch('nxHomeYunWei').then(res => {
        this.ydqsX = res.time
        for (let i of res.hangyequshi) {
          i.type = 'bar'
          i.unit = 'kWh'
        }
        this.ydqsSeries = res.hangyequshi
        this.ydxwData = []
        this.yhPieData = []
        this.nxPieData = []
        for (let a of res.yongdianxingwei) {
          this.ydxwData.push(this.formatPie(a.name, a.value, a.percent))
        }
        for (let a of res.hangyefenbu) {
          this.yhPieData.push(this.formatPie(a.name, a.value, a.percent))
        }
        for (let a of res.diqufenbu) {
          this.nxPieData.push(this.formatPie(a.name, a.value, a.percent))
        }
        this.siteAmount = res.siteAmount.value
        this.thisYearUsed = res.thisYearUsed.value
        this.thisMonthUsed = res.thisMonthUsed
        this.todayUsed = res.todayUsed
        this.carbonSaving = res.carbonSaving.value
        this.thisYearSaving = res.thisYearSaving.value
      })
    },
    getRankInfo () {
      let data = {
        factor: this.rankType,
        rankType: this.rank
      }
      this.$store.dispatch('nxHomeRank', data).then(res => {
        this.userRankList = [
          {
            name: '',
            type: 'bar',
            barWidth: '35%',
            data: [],
            unit: this.unitRank
          }
        ]
        this.userRankX = []
        for (let i of res.userTop10) {
          this.userRankList[0].data.push(i.value)
          this.userRankX.push(i.name)
        }
      })
    },
    // 格式化饼图数据
    formatPie (name, value, percent) {
      let item = {
        name: name,
        value: percent ? percent.split('%')[0] : '',
        label: {
          normal: {
            formatter: ['{b}: {c}%', value].join('\n')
          }
        }
      }
      return item
    },
    // 排名图表切换
    switchCharts () {
      if (this.rank == '0') {
        this.rank = '1'
      } else {
        this.rank = '0'
      }
      this.getRankInfo()
    },
    // 排序因素选择
    handleRankType (value) {
      if (value == '0') {
        this.unitRank = 'kWh'
        this.returnResPh = ['', '-用电量']
      } else if (value == '1') {
        this.unitRank = '元'
        this.returnResPh = ['', '-电费']
      } else if (value == '2') {
        this.unitRank = ''
        this.returnResPh = ['', '-可调配电量']
      } else if (value == '3') {
        this.unitRank = ''
        this.returnResPh = ['', '-功率因数']
      } else if (value == '4') {
        this.unitRank = '%'
        this.returnResPh = ['', '-电压畸变率']
      } else if (value == '5') {
        this.unitRank = '%'
        this.returnResPh = ['', '-电流畸变率']
      }
      // 切换条件
      this.rankType = value || ''
      this.getRankInfo()
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
  background-color: #ffffff;
  margin-top: 12px;
  .third_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
  }
}
.forth_info {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 12px;
  .forth_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
    margin-left: 20px;
  }
}
.rank_type {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
