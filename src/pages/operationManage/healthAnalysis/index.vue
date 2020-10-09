<template>
  <div>
    <div class="top-header flex_row_yCenter">
      <p class="p-title">选择厂站：</p>
      <el-select v-model="siteId" placeholder="请选择厂站" @change="headerSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <p class="p-title">选择变压器：</p>
      <el-select class="time3" style="width: 160px;" v-model="teamItem" placeholder="请选择" @change="chooseTeam">
        <el-option v-for="(item, index) in nxOption" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <p class="p-title">时间选择：</p>
      <el-date-picker class="time2" type="month" v-model="startTime" placeholder="选择日期" @change="handleDate"
        :clearable="false" :picker-options="pickerOptions" />
    </div>
    <div class="third_info">
      <div style="margin-left: 20px;">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>变压器健康指数</span>
        </div>
        <div class="bottom-banner">
          <div class="b-left flex_column_yCenter fc">
            <warterCharts warterWidth="250" warterHeight="250" :dataConfig="warterData" />
            <radarCharts raderWidth="500" raderHeight="500" :dataConfig="dataConfig" />
          </div>
          <!-- 右侧的经济、安全、可靠 -->
          <div class="b-right">
            <span class="title">经济性</span>
            <div class="right-area">
              <div class="flex_column_yCenter fc" v-for="(item1, index1) in jingji" :key="index1">
                <img v-if="index1 == 0" :src="icon10" />
                <img v-if="index1 == 1" :src="icon11" />
                <img v-if="index1 == 2" :src="icon12" />
                <p class="name">{{ item1.name }}</p>
                <p class="values c1">{{ item1.value }}</p>
              </div>
            </div>

            <span class="title">安全性</span>
            <div class="right-area">
              <div class="flex_column_yCenter fc" v-for="(item2, index2) in anquan" :key="index2">
                <img v-if="index2 == 0" :src="icon20" />
                <img v-if="index2 == 1" :src="icon21" />
                <img v-if="index2 == 2" :src="icon22" />
                <img v-if="index2 == 3" :src="icon23" />
                <img v-if="index2 == 4" :src="icon24" />
                <p class="name">{{ item2.name }}</p>
                <p class="values c2">{{ item2.value }}</p>
              </div>
            </div>

            <span class="title">可靠性</span>
            <div class="right-area">
              <div class="flex_column_yCenter fc" v-for="(item3, index3) in kekao" :key="index3">
                <img v-if="index3 == 0" :src="icon30" />
                <p class="name">{{ item3.name }}</p>
                <p class="values c3">{{ item3.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import warterCharts from '../../../components/warterCharts/index.vue'
import radarCharts from '../../../components/pictorialCharts/radar_index.vue'
import { getDate, formatTime } from '../../../assets/js/common.js'
export default {
  name: 'healthAnalys',
  computed: mapState(['nxOption', 'headerSite', 'userClients', 'myCompanyId', 'curuserId']),
  components: {
    warterCharts,
    radarCharts
  },
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      icon10: require('../../../assets/image/analysis/icon_fzl.png'),
      icon11: require('../../../assets/image/analysis/icon_shl.png'),
      icon12: require('../../../assets/image/analysis/icon_dypcd.png'),
      icon20: require('../../../assets/image/analysis/icon_tynx.png'),
      icon21: require('../../../assets/image/analysis/icon_byqwd.png'),
      icon22: require('../../../assets/image/analysis/icon_hjsd.png'),
      icon23: require('../../../assets/image/analysis/icon_dlbhl.png'),
      icon24: require('../../../assets/image/analysis/icon_dypcd_yellow.png'),
      icon30: require('../../../assets/image/analysis/icon_fzljz.png'),
      companyId: '',
      companyList: [],
      selectedOptions: '',
      dataConfig: {
        indicator: [],
        range: [],
        name: '健康度',
        value: []
      },
      anaType: 'TranHealth',
      siteFid: '',
      placeCenter: [],
      teamItem: '',
      anquan: [],
      kekao: [],
      jingji: [],
      startTime: currentDate,
      warterData: [],
      hasTitle: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created () {
    this.getSite()
  },
  mounted () { },
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getSite()
      }
    }
  },
  methods: {
    async getSite () {
      await this.$store.dispatch('getCuruserId')
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
      this.getNexiaoOption()
    },
    // 变压器list
    getNexiaoOption () {
      let nxData = {
        siteFid: this.siteFid,
        anaType: this.anaType
      }
      this.$store.dispatch('getNexiaoOption', nxData).then(res => {
        if (res) {
          this.teamItem = this.nxOption[0].value
          this.getHealth()
        }
      })
    },
    // 获取健康度分析数据
    getHealth () {
      let params = {
        time1: this.startTime,
        zichanFid: this.teamItem
      }
      // 清空雷达图
      this.dataConfig.value = []
      this.dataConfig.indicator = []
      this.dataConfig.range = []
      this.$store.dispatch('getHealth', params).then(res => {
        if (res) {
          this.jingji = res.ReturnData.jingji
          this.anquan = res.ReturnData.anquan
          this.kekao = res.ReturnData.kekao

          for (let it of res.ReturnData.theEcharts) {
            this.dataConfig.value.push(it.num)
            this.dataConfig.indicator.push({ text: `${it.name}${it.num}%` })
            this.dataConfig.range.push({ name: it.name, max: it.max })
          }
          let warnColor = res.ReturnData.warterData < 60 ? '#FF1B1B' : '#13CF5A'
          this.warterData = [res.ReturnData.warterData / 100, warnColor, res.ReturnData.warterData + '分', '主变健康度']
        }
      })
    },
    // 选择日期
    handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y-M-D h:m:s')
      this.getHealth()
    },
    // 选择变压器
    chooseTeam () {

      this.getHealth()

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top-header {
  height: 60px;
  padding-left: 10px;
  background-color: #ffffff;
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
.bottom-banner {
  display: flex;
  //justify-content: space-between;
  width: 100%;
  .b-left {
    flex: 4;
  }
  .b-right {
    flex: 5;
    .title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: "#333333";
    }
    .right-area {
      display: flex;
      padding: 20px 0px 60px 50px;
      .fc {
        padding-right: 30px;
        width: 124px;
      }
      .name {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 15px 0px 10px 0px;
      }
      .values {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
      .c1 {
        color: #2b8aff;
      }
      .c2 {
        color: #ff9400;
      }
      .c3 {
        color: #1cd263;
      }
    }
  }
}
.p-title {
  margin-left: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
</style>
