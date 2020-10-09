<template>
  <div class="home-all">
    <div class="seven-item flex">
      <div class="max-bg">
        <!-- 首页大图 -->
        <div class="bg-map">
          <div class="bg-map-title flex jbt">
            <div class="left flex ac jc">
              <span class="left-title">{{ siteName }}</span>
            </div>
            <div class="flex ac jc" style="padding-right: 41px;">
              <p class="day">安全运行</p>
              <div v-for="(item, index) in daySplites" :key="index" class="num-bg flex ac jc">
                {{ item }}
              </div>
              <p class="day">天</p>
            </div>
          </div>
          <!-- 加入地图组件 -->
          <!-- http://www.hightopo.com/demo/intelligent-park/ -->
          <!-- <adminMap></adminMap> -->
          <img style="width: 100%;height: 618px;border: none;" :src="ifUrl" />
          <!-- <iframe style="width: 100%;height: 618px;border: none;" :src="ifUrl"></iframe> -->
        </div>

        <!-- 下面三个item -->
        <div class="left-bt flex">
          <div class="l-item1 bg-img flex_row_center">
            <div class="normal-title">
              <img src="../../assets/image/icon_bt.png" /><span>今日执行工单</span>
            </div>
            <pieCharts pieWidth="280" pieHeight="255" isLoopPie :dataList="todayWorkOrder" :isBorder="false" />
          </div>
          <div class="l-item2 bg-img">
            <div class="normal-title">
              <img src="../../assets/image/icon_bt.png" /><span>待消除缺陷</span>
            </div>
            <barCharts style="margin-top: 39px;" barWidth="100%" barHeight="275" unitL="(个)" unit="(月)"
              :dataList="quexian.y" :xName="quexian.x.data" :gridPos="quexian.grid" :isBorder="false" />
          </div>
          <div class="l-item3 bg-img">
            <div class="normal-title">
              <img src="../../assets/image/icon_bt.png" /><span>告警监测</span>
            </div>
            <div style="margin-top: 39px;" class="historyList">
              <div v-for="(item, index) in hisList" :key="index" @click="itemClick(item)">
                <div class="flex his-list">
                  <p style="width: 150px;">{{ item.addtime | formatTime }}</p>
                  <p class="elips" style="width: 100px;">
                    {{ item.equipName }}
                  </p>
                  <p class="elips" style="width: 200px;">
                    {{ item.alertInfo }}
                  </p>
                </div>
                <p class="line" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧两个item-->
      <div class="right">
        <div class="r-item1 bg-img flex ac jc">
          <div>
            <div class="today-high flex ac jc">
              <div>
                <p class="today-title">当日最高负荷</p>
                <p class="today-num flex jc ac">
                  {{ maxFuheThisDay | toThousands
                  }}<span class="today-dw">kW</span>
                </p>
              </div>
            </div>
            <div class="flex ac jbt">
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">当日用电量</p>
                  <p class="today-num flex jc ac">
                    {{ thisDayDianliang | toThousands
                    }}<span class="today-dw">kWh</span>
                  </p>
                </div>
              </div>
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">变压器容量</p>
                  <p class="today-num flex ac jc">
                    {{ bianyaqiCapacity }}<span class="today-dw">MVA</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="flex ac jbt">
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">本月用电量</p>
                  <p class="today-num flex jc ac">
                    {{ thisMonthDianliang | toThousands
                    }}<span class="today-dw">kWh</span>
                  </p>
                </div>
              </div>
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">上月用电量</p>
                  <p class="today-num flex jc ac">
                    {{ lastMonthDianliang | toThousands
                    }}<span class="today-dw">kWh</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="flex ac jbt">
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">变压器台数</p>
                  <p class="today-num flex ac jc">
                    {{ bianyaqiCount }}<span class="today-dw">台</span>
                  </p>
                </div>
              </div>
              <div class="today-bottom flex ac jc">
                <div>
                  <p class="today-title flex jc ac">变电站</p>
                  <p class="today-num flex ac jc">
                    {{ bianDianZhanCount }}<span class="today-dw">个</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="r-item2 bg-img flex_row_center">
          <div class="header-title">
            <img src="../../assets/image/icon_bt.png" /><span>采集通讯终端状态</span>
          </div>
          <pieCharts pieWidth="400" pieHeight="275" isLoopPie :dataList="teminalState" :isBorder="false" />
        </div>
        <div class="r-item3 bg-img flex_row_center">
          <div class="header-title">
            <img src="../../assets/image/icon_bt.png" /><span>告警统计</span>
          </div>
          <pieCharts pieWidth="400" pieHeight="285" :isBorder="false" :dataList="policyTotal"></pieCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pieCharts from '../../components/pieCharts/index'
// import bCharts from '../components/pictorialCharts/b_index.vue'
import barCharts from '../../components/barCharts/index'
import { toThousands } from '../../assets/js/common.js'

export default {
  name: 'Index',
  components: {
    pieCharts,
    barCharts
  },
  filters: {
    formatTime (time) {
      if (time) {
        return time.split('T')[0] + ' ' + time.split('T')[1]
      }
      return
    },
    toThousands (num) {
      return toThousands(num)
    }
  },
  computed: mapState([
    'needRefresh',
    'refreshAnatype'
  ]),
  watch: {
    refreshAnatype: {
      handler (e) {
        if (e && this.needRefresh) {
          let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          this.getData(userInfo.siteIdSet[0])
        }
      },
      deep: true
    }
  },
  data () {
    return {
      /* 终端状态 */
      teminalState: [],
      siteName: '',
      maxFuheThisDay: 0, //当日最高负荷
      thisDayDianliang: 0, //当日用电量
      bianyaqiCapacity: 0, //变压器容量
      thisMonthDianliang: 0, //本月用电量
      lastMonthDianliang: 0, //上月用电量
      bianyaqiCount: 0, //变压器台数
      bianDianZhanCount: 0, //变电站
      daySplites: [],
      ifUrl: '',
      policyTotal: [],
      todayWorkOrder: [],
      quexian: {
        y: [
          {
            name: '',
            type: 'bar',
            color: '#FC5457',
            barMaxWidth: 16, //最大宽度
            data: []
          }
        ],
        x: {
          data: []
        },
        grid: [25, 39, 55, 30]
      },
      /* 告警监测数据 */
      hisList: []
    }
  },
  created () {
    // 获取当前和之前的时间差
    let activeDay = '2019-12-31'
    let disDay = this.daysDistance(this.today(), activeDay)
    this.daySplites = this.spliteNumber(disDay)
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (userInfo) {
      let data = {
        userId: userInfo.userId || '',
        clientId: userInfo.clients[0].clientId || ''
      }
      this.getData(data)
    } else {
      // 没有登录跳转到登录页面
      this.$router.replace({
        path: '/login'
      })
    }
    //console.log(window.localStorage.getItem("userInfo").,'哈哈哈哈')
  },
  mounted () { },
  methods: {
    // 获取首页数据
    getData (data) {
      let params = {
        userId: data.userId,
        clientId: data.clientId
      }
      this.$store.dispatch('getAdminData', params).then(res => {
        this.ifUrl = res.siteImage
        this.siteName = res.clientName
        this.maxFuheThisDay = res.maxFuheThisDay //当日最高负荷
        this.thisDayDianliang = res.thisDayDianliang //当日用电量
        this.bianyaqiCapacity = res.bianyaqiCapacity / 1000 //变压器容量
        this.thisMonthDianliang = res.thisMonthDianliang //本月用电量
        this.lastMonthDianliang = res.lastMonthDianliang //上月用电量
        this.bianyaqiCount = res.bianyaqiCount //变压器台数
        this.bianDianZhanCount = res.bianDianZhanCount //变电站

        this.todayWorkOrder = []
        let total = 0
        for (let it of res.WOExecCountThisDay) {
          total += it.count
        }
        for (let it of res.WOExecCountThisDay) {
          let item = {
            name: it.type,
            value: (it.count / total).toFixed(4) * 100
          }
          this.todayWorkOrder.push(item)
        }
        // 待消除缺陷
        this.quexian.y[0].data = res.quexian.quexian
        this.quexian.x.data = res.quexian.month
        // 告警监测
        this.hisList = res.alertInfo

        // 采集通讯终端
        this.teminalState = []
        let total1 = 0
        for (let it of res.clientCommState) {
          total1 += it.value
        }
        for (let it of res.clientCommState) {
          let item = {
            name: it.name,
            value: (it.value / total1).toFixed(4) * 100
          }
          this.teminalState.push(item)
        }

        // 告警统计
        this.policyTotal = res.alertRealTime
      })
    },
    itemClick (item) {
      // parent.addTab('告警监测', `/bukong/hisdata.aspx?anaType=${item.siteFid}&equipFid=${item.equipFid}&alertLevel=${item.alertType}&scanState=${item.state}`)
      // parent.addTab('告警监测', `/bukong/GJ_xiangqing.aspx?id=${item.Id}`)
      let propsData = {
        name: 'Gaojingjc',
        params: `?id=${item.Id}`
      }
      this.$store.dispatch('propsRouteData', propsData)
    },
    //获取格式化今天的日期
    today () {
      var today = new Date()
      var str = ''
      str += today.getFullYear() + '-'
      var month = today.getMonth() + 1 //返回值是 0（一月） 到 11（十二月） 之间的一个整数。
      if (month < 10) {
        str += '0'
      }
      str += month + '-'
      var day = today.getDate() //返回值是 1 ~ 31 之间的一个整数
      if (day < 10) {
        str += '0'
      }
      str += day
      return str
    },
    //date1和date2是2019-06-18格式
    daysDistance (date1, date2) {
      //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
      date1 = Date.parse(date1)
      date2 = Date.parse(date2)
      //计算两个日期之间相差的毫秒数的绝对值
      var ms = Math.abs(date2 - date1)
      //毫秒数除以一天的毫秒数,就得到了天数
      var days = Math.floor(ms / (24 * 3600 * 1000))
      return days
    },
    spliteNumber (number) {
      let at = []
      if (number <= 9) {
        at.push(JSON.stringify(number))
      } else if (number >= 10 || number <= 99) {
        at.push(JSON.stringify(number).substring(0, 1))
        at.push(JSON.stringify(number).substring(1, 2))
      } else if (number >= 100 || number <= 999) {
        at.push(JSON.stringify(number).substring(0, 1))
        at.push(JSON.stringify(number).substring(1, 2))
        at.push(JSON.stringify(number).substring(2, 3))
      }
      return at
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  /* 鼠标放上去变成小手 */
  cursor: pointer;
}

.flex {
  display: flex;
}

.jbt {
  justify-content: space-between;
}

.ac {
  align-items: center;
}

.jc {
  justify-content: center;
}

// 主页面布局，七个模块
.seven-item {
  // padding: 8px 8px 0px 8px;

  .max-bg {
    width: 100%;
    flex: 2.8;
    height: 620px;
  }

  .right {
    flex: 1;
    width: 100%;
    margin-left: 16px;

    .r-item1 {
      width: 100%;
      position: relative;
      height: 327px;
    }

    .r-item2 {
      width: 100%;
      height: 282px;
      position: relative;
      margin-top: 12px;
    }

    .r-item3 {
      width: 100%;
      height: 305px;
      position: relative;
      margin-top: 12px;
    }
  }
}

.left-bt {
  // padding: 16px 0px 0px 0px;

  .l-item1 {
    width: 100%;
    height: 305px;
    position: relative;
    flex: 1;
    margin-right: 16px;
  }

  .l-item2 {
    width: 100%;
    height: 305px;
    position: relative;
    flex: 1;
    margin-right: 16px;
  }

  .l-item3 {
    width: 100%;
    height: 305px;
    position: relative;
    flex: 1.5;
  }
}

.home-all {
  width: 100%;
  background: #021331;
}

.tx-center {
  text-align: center;
}

.p-relative {
  position: relative;
}

.bg-img {
  background-image: url("../../assets/image/bgLackTran.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.bg-map {
  width: 100%;
  height: 620px;
  background: #072646;
  position: relative;
  border: 1px solid rgba(115, 199, 255, 1);
  margin-bottom: 11px;
}

.bg-map-title {
  position: absolute;
  width: 100%;
  z-index: 10000;
}

.bg-map-title .left {
  width: 422px;
  height: 55px;
  background: rgba(66, 132, 201, 0.9);
  border: 1px solid rgba(115, 199, 255, 1);
}

.bg-map-title .left-title {
  font-size: 24px;
  font-family: Tensentype ZhiHeiJ;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
}

.bg-map-title .day {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.bg-map-title .num-bg {
  width: 24px;
  height: 34px;
  background: rgba(0, 66, 136, 1);
  margin: 0px 6px 0px 6px;
  font-size: 30px;
  font-family: LcdD;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.bg-map2 {
  width: 1356px;
  height: 618px;
}

.bg-left-bottom1 {
  width: 351px;
  height: 305px;
  margin-top: 15px;
  align-items: center;
}

.bg-left-bottom2 {
  width: 569px;
  height: 305px;
  margin-left: 14px;
  margin-top: 15px;
}

.bg-right-top {
  width: 399px;
  height: 327px;
  margin-left: 20px;
}

.bg-right-mid {
  width: 399px;
  height: 282px;
  margin-top: 12px;
  margin-left: 20px;
}

.bg-right-bottom {
  width: 399px;
  height: 305px;
  margin-top: 15px;
  margin-left: 20px;
}

.header-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  top: 15px;
  left: 15px;
  position: absolute;
}

.header-title span {
  padding-left: 8px;
}

.his-list {
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(207, 233, 252, 1);
  padding: 20px 20px 10px 20px;
}

.his-list p {
  padding-left: 6px;
}
.historyList {
  width: 100%;
  height: 260px;
  overflow: scroll;
  cursor: pointer;
}
.historyList::-webkit-scrollbar {
  display: none;
}
.elips {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line {
  height: 1px;
  background: rgba(42, 83, 126, 1);
  margin-left: 20px;
  margin-right: 20px;
}

.normal-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  top: 15px;
  left: 15px;
  position: absolute;
}

.normal-title span {
  padding-left: 8px;
}

.today-high {
  width: 320px;
  height: 65px;
  background: rgba(5, 64, 112, 1);
}

.today-bottom {
  width: 155px;
  //flex: 1;
  height: 65px;
  background: rgba(5, 64, 112, 1);
  margin-top: 10px;
}

.today-bottom .to-left {
  margin-left: 9px;
}

.today-bottom .to-right {
  margin-right: 9px;
}

.today-bottom .to-bottom {
  margin-bottom: 10px;
}

.today-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(69, 179, 255, 1);
}

.today-num {
  font-size: 24px;
  font-family: HYXiaoBoHuaYueYuan;
  font-weight: bold;
  color: rgba(207, 233, 252, 1);
}

.today-dw {
  font-size: 15px;
  font-family: Arial;
  font-weight: 400;
  color: rgba(207, 233, 252, 1);
}
</style>
