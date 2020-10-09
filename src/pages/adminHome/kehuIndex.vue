<template>
  <div class="kehu_home_box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="top_content">
      <div class="top_left_content common_item_bg">
        <div class="tl_left">
          <img :src="imghref" alt="img">
          <transition name="on" mode="out-in">
            <div v-if="companySite" key="buff1" class="company_name">{{clientName}}</div>
            <div v-else key="buff2" class="site_name">
              <el-select class="select_site" v-model="siteId" placeholder="请选择厂站" @change="handleSite">
                <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </transition>
          <div v-if="isChange" class="btn_change" @click="btnChange">
            <img width="15" height="15" src="../../assets/image/admin/icon_sy_qh.png" style="margin-right:5px;"
              alt="img">
            <span>{{btnChangeWord}}</span>
          </div>
        </div>
        <div class="tl_right">
          <div class="tl_title">安全运行天数：<span
              style="font-size:30px; font-weight:350; margin-right: 5px;">{{runDays}}</span>天</div>
          <div class="line2"></div>
          <div style="margin-left:25px;">
            <div class="tl_item">电压等级：{{voltageGrade}}</div>
            <div class="tl_item">变电总容量： {{bianyaqi.capacity/1000}}MVA</div>
            <div class="tl_item">变压器：{{bianyaqi.count}}个<span class="tl_item_span">投运{{bianyaqi.touyun}}年</span></div>
            <div class="tl_item">断路器： {{duanluqi.count}}个 <span class="tl_item_span">投运{{duanluqi.touyun}}年</span></div>
            <div class="tl_item">电容器： {{dianrongqi.count}}个 <span class="tl_item_span">投运{{dianrongqi.touyun}}年</span>
            </div>
            <div class="tl_item">采集设备： {{caijishebei.count}}个 <span
                class="tl_item_span">在线率{{caijishebei.online}}%</span></div>
            <!-- <div class="tl_item">高压回路： {{gaoyahuilu}}个</div>
            <div class="tl_item">低压回路： {{diyahuilu}}个</div> -->
          </div>
          <div class="line2"></div>
          <div class="flex_row_xCenter">
            <div class="flex_colunm_center" style="margin-right:28px;">
              <warterCharts warterWidth="105" warterHeight="105" :font="waterFont" bgcolor="#0A2547" shadowBlur="0"
                :dataConfig="warterData1" />
              <div class="tl_item">负载率：{{zhubian.fuzailv}}%</div>
              <div class="tl_item">温度：{{zhubian.temperature}}℃</div>
            </div>
            <div class="flex_colunm_center" style="margin-left:28px;">
              <warterCharts warterWidth="105" warterHeight="105" :font="waterFont" bgcolor="#0A2547" shadowBlur="0"
                :dataConfig="warterData2" />
              <div class="tl_item">故障抢修：{{guzhang.count}}个</div>
            </div>
          </div>
          <div class="line2"></div>
          <div class="flex_row_xCenter" style="margin-left:25px;">
            <div class="jump_btn" style="margin-right:10px;" @click="jumpTo('Dianlijiance')">
              <img src="../../assets/image/admin/icon_sy_dljc.png" style="margin-right:5px;" alt="img">
              <span>全站监测</span>
            </div>
            <div class="jump_btn" style="margin-left:10px;" @click="jumpTo('Shishishipin')">
              <img src="../../assets/image/admin/icon_sy_spjk.png" style="margin-right:5px;" alt="img">
              <span>视频监控</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top_right_content">
        <div class="tr_top" style="margin-bottom:6px">
          <div class="tr_top_item common_item_bg">
            <commonTitle titleName="本月最高负荷" noIcon />
            <!-- <span class="label">本月最高负荷</span> -->
            <span class="value">{{nowMonthFh}} <span style="font-size:14px;">kW</span></span>
            <div class="line"></div>
            <span class="bottom_label">上月最高负荷{{lastMonthFh}}kW</span>
          </div>
          <div style="margin: 0 9px" class="tr_top_item common_item_bg">
            <commonTitle titleName="今日用电量" noIcon />
            <span class="value">{{nowDayDl}} <span style="font-size:14px;">kWh</span></span>
            <div class="line"></div>
            <span class="bottom_label">昨日用电量{{lastDayDl}}kWh</span>
            <div class="percent_box">
              <div class="name">环比</div>
              <div style="font-size:14px;"
                :class="{value_up: dayHb && dayHb.indexOf('+')> -1, value_down: dayHb&& dayHb.indexOf('-') > -1}">
                {{dayHb}}</div>
            </div>
          </div>
          <div class="tr_top_item common_item_bg">
            <commonTitle titleName="本月用电量" noIcon />
            <span class="value">{{nowMonthDl}} <span style="font-size:14px;">万kWh</span></span>
            <div class="line"></div>
            <span class="bottom_label">上月用电量{{lastMonthDl}}万kWh</span>
            <div class="percent_box">
              <div class="name">环比</div>
              <div style="font-size:14px;"
                :class="{value_up: monthHb && monthHb.indexOf('+')> -1, value_down: monthHb && monthHb.indexOf('-') > -1}">
                {{monthHb}}</div>
            </div>
          </div>
        </div>
        <div class="tr_top">
          <div class="tr_top_item common_item_bg">
            <commonTitle titleName="功率因数" noIcon />
            <span class="value">{{gonglvysh}} </span>
          </div>
          <div style="margin: 0 9px" class="tr_top_item common_item_bg">
            <commonTitle titleName="频率" noIcon />
            <span class="value">{{pinlv}} <span style="font-size:14px;">Hz</span></span>
          </div>
          <div class="tr_top_item common_item_bg">
            <commonTitle titleName="电压合格率" noIcon />
            <span class="value">{{dianya_hegelv}} <span style="font-size:14px;">%</span></span>
          </div>
        </div>
        <div class="tr_bottom common_item_bg">
          <commonTitle titleName="负荷监测" />
          <barCharts barWidth="100%" barHeight="235" :dataList="fhData" :xName="fhDataX" unitL="(kW)"
            :gridPos="gridPosDl" :chartColorList="chartColorListDl" :returnRes="returnResBj" fontChartsColor="#CFE9FC"
            lineChartsColor="#0D3B6D" :axisXInterval="axisXInterval" />
        </div>
      </div>
    </div>
    <div class="bottom_content">
      <div class="bottom_first common_item_bg flex_column_xCenter">
        <commonTitle titleName="报警统计" />
        <barCharts barWidth="100%" barHeight="250" :dataList="bjData" :xName="bjDataX" unitL="(个)" :gridPos="gridPosBj"
          :chartColorList="chartColorListBj" :returnRes="returnResBj" fontChartsColor="#CFE9FC"
          lineChartsColor="#0D3B6D" />
      </div>
      <div class="bottom_second common_item_bg">
        <commonTitle titleName="当月工作计划" />
        <pieCharts :pieRadius="pieRadiusGzjh" pieWidth="100%" pieHeight="250" :dataList="gzjhPieData"
          fontColor="#CFE9FC" />
      </div>
      <div class="bottom_third common_item_bg">
        <commonTitle titleName="未消除缺陷" />
        <pieCharts pieWidth="100%" pieHeight="250" :dataList="wxcPieData" :chartColorList="chartColorListQx"
          fontColor="#CFE9FC" isLoopPie />
      </div>
      <div class="bottom_forth common_item_bg flex_column_xCenter">
        <commonTitle titleName="电量监测" />
        <barCharts barWidth="100%" barHeight="260" :dataList="dlData" :xName="dlDataX" unitL="(kWh)"
          :gridPos="gridPosDl" :chartColorList="chartColorListDl" :returnRes="returnResBj" fontChartsColor="#CFE9FC"
          lineChartsColor="#0D3B6D" :axisXInterval="axisXIntervalDl" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pieCharts from '../../components/pictorialCharts/pie_index.vue'
import barCharts from '../../components/barCharts/index'
import warterCharts from '../../components/warterCharts/index.vue'
import commonTitle from './commonTitle'

export default {
  name: 'kehuIndex',
  components: {
    commonTitle,
    pieCharts,
    barCharts,
    warterCharts
  },
  filters: {
  },
  computed: mapState([
    'headerSite',
    'curuserId',
    'userClients',
    'myCompanyId'
  ]),
  watch: {
  },
  data () {
    return {
      loading: false,
      companyId: '',
      flag: 0,
      chooseId: '',
      clientName: '',
      companySite: true,
      isChange: false,
      imghref: '',
      nowMonthFh: '',
      lastMonthFh: '',
      nowDayDl: '',
      lastDayDl: '',
      nowMonthDl: '',
      lastMonthDl: '',
      gonglvysh: '',
      pinlv: '',
      dianya_hegelv: '',
      dayHb: '',
      monthHb: '',
      runDays: '',
      voltageGrade: '',
      bianyaqi: {},
      duanluqi: {},
      dianrongqi: {},
      caijishebei: {},
      gaoyahuilu: '',
      diyahuilu: '',
      zhubian: {},
      guzhang: {},
      btnChangeWord: '厂站信息',
      bjData: [{
        name: '',
        type: 'bar',
        barWidth: '35%',
        unit: '个',
        data: []
      }],
      bjDataX: [],
      chartColorListBj: ['#FF8E29'],
      gridPosBj: [20, 43, 20, 10],
      gridPosDl: [20, 43, 20, 30],
      chartColorListDl: ['#36ADFF', '#FF8E29'],
      returnResBj: ['', ''],
      gzjhPieData: [],
      pieRadiusGzjh: ['43%', '52%'],
      wxcPieData: [],
      chartColorListQx: ['#FF9239', '#18D671', '#36ADFF'],
      dlData: [{
        name: '今日',
        type: 'bar',
        unit: 'kWh',
        data: []
      }, {
        name: '昨日',
        type: 'bar',
        unit: 'kWh',
        data: []
      }],
      dlDataX: [],
      fhData: [{
        name: '今日',
        type: 'line',
        unit: 'kW',
        symbol: 'none',
        data: []
      }, {
        name: '昨日',
        type: 'line',
        unit: 'kW',
        symbol: 'none',
        data: []
      }],
      fhDataX: [],
      axisXInterval: 7,
      axisXIntervalDl: 1,
      waterFont: ['#FFFFFF', 18],
      warterData1: [0, '#FF1B1B', '分', '主变健康度'],
      warterData2: [0, '#FF1B1B', '率', '完成率'],
      siteId: '1'
    }
  },
  created () {
    const that = this
    that.loading = true
    that.getBaseInfo()
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    // 获取公司厂站信息
    async getBaseInfo () {
      await this.$store.dispatch('getCuruserId')
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      this.chooseId = this.userClients[0].clientId
      this.clientName = this.userClients[0].clientName || ''
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
      if (this.headerSite.length < 2) {
        this.isChange = false
      } else if (this.headerSite.length > 1) {
        this.headerSite = true
      }
      this.getData()
      this.getDataRightTop()
    },
    // 获取首页数据
    getData () {
      let data = {
        userId: this.curuserId,
        flag: this.flag, // 0为公司，1为厂站
        id: this.chooseId
      }
      this.$store.dispatch('getClientYw', data).then(res => {
        this.imghref = res.imghref
        this.runDays = res.runDays
        this.voltageGrade = res.voltageGrade
        this.bianyaqi = res.bianyaqi
        this.duanluqi = res.duanluqi
        this.dianrongqi = res.dianrongqi
        this.caijishebei = res.caijishebei
        this.gaoyahuilu = res.gaoyahuilu
        this.diyahuilu = res.diyahuilu
        this.zhubian = res.zhubian
        this.guzhang = res.guzhang
        let waterColor1 = this.getWaterColor(res.zhubian.score / 100)
        let waterColor2 = this.getWaterColor(res.guzhang.completeRate / 100)
        this.warterData1 = [res.zhubian.score / 100, waterColor1[0], `${res.zhubian.score}分`, '主变健康度']
        this.warterData2 = [res.guzhang.completeRate / 100, waterColor2[0], `${res.guzhang.completeRate}%`, '完成率']
        this.fhData[0].data = res.fuhe.today
        this.fhData[1].data = res.fuhe.yesterday
        this.fhDataX = res.fuhe.time

        this.dlData[0].data = res.dianliang.today
        this.dlData[1].data = res.dianliang.yesterday
        this.dlDataX = res.dianliang.time

        this.gzjhPieData = []
        for (let a of res.plannedWO) {
          this.gzjhPieData.push(this.formatPie(a.name, a.value, a.percent, '个'))
        }

        this.wxcPieData = []
        for (let a of res.quexian) {
          this.wxcPieData.push(this.formatPie(a.name, a.value, a.percent, '个'))
        }

        this.bjData[0].data = []
        this.bjDataX = []
        for (let a of res.alert) {
          this.bjDataX.push(a.name)
          this.bjData[0].data.push(a.value)
        }

        this.loading = false
      })
    },
    // 获取首页数据右上角
    getDataRightTop () {
      let data = {
        userId: this.curuserId,
        flag: this.flag, // 0为公司，1为厂站
        id: this.chooseId
      }
      this.$store.dispatch('getClientYwHome', data).then(res => {
        this.nowMonthFh = res.fuhe.thisMonth
        this.lastMonthFh = res.fuhe.lastMonth
        this.nowDayDl = res.dianlaing_day.today
        this.lastDayDl = res.dianlaing_day.yesterday
        this.nowMonthDl = res.dianlaing_mon.thisMonth
        this.lastMonthDl = res.dianlaing_mon.lastMonth
        this.gonglvysh = res.gonglvysh
        this.pinlv = res.pinlv
        this.dianya_hegelv = res.dianya_hegelv
        this.monthHb = res.dianlaing_mon.huanbi || ''
        this.dayHb = res.dianlaing_day.huanbi || ''
      })
    },
    // 切换企业厂站
    btnChange () {
      this.companySite = !this.companySite
      if (this.companySite) {
        this.btnChangeWord = '厂站信息'
        this.chooseId = this.headerSite[0].value
        this.flag = 1
        this.loading = true
        this.getData()
        this.getDataRightTop()
      } else {
        this.btnChangeWord = '企业环境'
        this.chooseId = this.userClients[0].clientId
        this.flag = 0
        this.loading = true
        this.getData()
        this.getDataRightTop()
      }
    },
    handleSite (value) {
      this.chooseId = value
      this.flag = 1
      this.loading = true
      this.getData()
      this.getDataRightTop()
    },
    // 跳转路由
    jumpTo (value) {
      if (value) {
        let propsData = {
          name: value,
          params: null
        }
        this.$store.dispatch('propsRouteData', propsData)
      }
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
    getWaterColor (value) {
      let color = value < 0.6 ? ['#FF1B1B', '#ffd1d1'] : ['#13CF5A', '#d0f5de']
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.kehu_home_box {
  width: 100%;
}
.common_item_bg {
  background-color: #0a2547;
}
.common_text {
  color: #36adff;
}
.line {
  width: 9.3vw;
  height: 1px;
  background: rgba(42, 83, 126, 1);
  margin: 12px 0px 7px 23px;
}
.line2 {
  width: 19.2vw;
  height: 1px;
  background: rgba(42, 83, 126, 1);
  margin: 15px 0px 12px 25px;
}
.jump_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 39px;
  background: rgba(0, 126, 213, 1);
  border: 1px solid rgba(0, 126, 213, 1);
  border-radius: 3px;
  color: #ffffff;
}
.jump_btn:hover {
  cursor: pointer;
  transition: all ease 0.5s;
  opacity: 0.8;
}
.top_content {
  width: 100%;
  height: 512px;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 12px;
  .top_left_content {
    flex: 0.623;
    margin-right: 16px;
    display: flex;
    .tl_left {
      width: 680px;
      height: 100%;
      background-color: rgba(0, 126, 213, 0.3);
      position: relative;
      .company_name {
        width: 220px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        background: rgba(0, 126, 213, 1);
        color: #ffffff;
        font-size: 16px;
        position: absolute;
        top: 15px;
        left: 0;
      }
      .site_name {
        width: 280px;
        height: 36px;
        opacity: 0.8;
        font-size: 16px;
        position: absolute;
        top: 15px;
        left: 30px;
        .select_site {
          width: 100% !important;
          height: 100% !important;
        }
      }
      .btn_change {
        width: 110px;
        height: 28px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.75;
        border-radius: 14px;
        color: #cbe5f8;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 15px;
        right: 5px;
      }
      .btn_change:hover {
        cursor: pointer;
        transition: all ease 0.5s;
      }
    }
    .tl_right {
      .tl_title {
        font-size: 18px;
        font-weight: bold;
        color: #cfe9fc;
        margin-left: 25px;
        margin-top: 13px;
      }
    }
    .tl_item {
      color: #cfe9fc;
      font-family: Microsoft YaHei;
      font-size: 16px;
      margin-bottom: 7px;
    }
    .tl_item_span {
      color: #13cf5a;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .top_right_content {
    flex: 0.377;
    display: flex;
    flex-direction: column;
    .tr_top {
      display: flex;
      margin-bottom: 19px;
      justify-content: space-around;
      .tr_top_item {
        font-family: Microsoft YaHei;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 110px;
        // margin-right: 9px;
        flex: 1;
        position: relative;
        .percent_box {
          position: absolute;
          right: 12px;
          top: 17px;
          color: #cfe9fc;
          text-align: right;
          .name {
            font-size: 14px;
            color: #36adff;
          }
          .value_up {
            font-size: 14px;
            color: #ff1b1b;
          }
          .value_down {
            font-size: 14px;
            color: #13cf5a;
          }
        }
        .label {
          margin-left: 23px;
          margin-bottom: 3px;
          font-size: 16px;
          font-weight: 400;
          color: #36adff;
        }
        .value {
          font-size: 22px;
          margin-left: 23px;
          font-weight: 500;
          color: #cfe9fc;
        }
        .bottom_label {
          font-size: 14px;
          color: #afdbfa;
          margin-left: 23px;
          opacity: 0.8;
        }
      }
    }
    .tr_bottom {
      height: 268px;
    }
  }
}
.bottom_content {
  width: 100%;
  height: 293px;
  display: flex;
  flex-wrap: nowrap;
  .bottom_first {
    flex: 1;
    margin-right: 16px;
  }
  .bottom_second {
    flex: 1;
    margin-right: 16px;
  }
  .bottom_third {
    flex: 1;
    margin-right: 16px;
  }
  .bottom_forth {
    flex: 1.8652;
  }
}
.on-enter-active,
.off-enter-active {
  transition: 0.2s ease;
}
.on-leave-active,
.off-leave-active {
  transition: 0.3s ease;
}
.on-enter,
.on-leave-to,
.off-enter,
.off-leave-to {
  opacity: 0;
}
</style>
