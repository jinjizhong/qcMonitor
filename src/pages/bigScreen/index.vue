<template>
  <div class="index-all" @click="noneTo()">
    <img
      class="fanhuiStyle"
      @click="toback()"
      v-if="boolBack"
      src="../../assets/image/bigscreen/fanhui.png"
    />
    <template v-if="pageType === 'index'">
      <!-- 大屏顶部-->
      <indexTitle
        @itemClick="leftTitleClick"
        @tuichu="tuichu()"
        :loginOutTo="loginOutTo"
      />
      <!-- 大屏中间六个订单 -->
      <div class="index-middle f-between">
        <div class="m1 f-center">
          <div class="tx-center">
            <span>客户总数</span>
            <div class="f-center color5">
              <p>{{ indexData.clientNum }}</p>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="m2 f-center">
          <div class="tx-center">
            <span>站点总量</span>
            <div class="f-center color4">
              <p>{{ indexData.siteNum }}</p>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="m3 f-center">
          <div class="tx-center">
            <span>变电总容量</span>
            <div class="f-center color6">
              <p>{{ indexData.biandianNum }}</p>
              <span>MVA</span>
            </div>
          </div>
        </div>
        <div class="m4 f-center">
          <div class="tx-center">
            <span>线路总长</span>
            <div class="f-center color2">
              <p>{{ indexData.operatLength }}</p>
              <span>km</span>
            </div>
          </div>
        </div>
        <div class="m5 f-center">
          <div class="tx-center">
            <span>终端总量</span>
            <div class="f-center color3">
              <p>{{ indexData.terminal }}</p>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="m6 f-center">
          <div class="tx-center">
            <span>完成工单总数</span>
            <div class="f-center color1">
              <p>{{ indexData.orderNum }}</p>
              <span>个</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间通知消息 -->
      <div class="f-center" @click="noticeClick()">
        <div id="notice" class="index-notice f-center">
          <!-- <marquee class="f-center" behavior="scroll" direction="up" loop="2" :scrolldelay="delay" onMouseOut="this.start()" onMouseOver="this.stop()">
			</marquee> -->
          <div class="f-center">
            <img
              class="noticeIcon"
              src="../../assets/image/bigscreen/icon_info.png"
            />
            <span>{{ alertInfo }}</span>
          </div>
          <!-- <marquee onMouseOut="this.start()" onMouseOver="this.stop()">
            <img class="noticeIcon" src="../../assets/image/bigscreen/icon_info.png" />
            <span>{{notice}}</span>
          </marquee> -->
        </div>
      </div>

      <!--下面的echarts图形  -->
      <div class="index-bottom f-between">
        <div class="b-left charts_inset_shadow">
          <pieCharts
            style="position: relative;"
            pieWidth="390"
            pieHeight="365"
            :isBorder="false"
            title="客户行业分类统计"
            hasTitle
            :dataList="hangye"
          />
          <!-- <p class="line"></p> -->
          <!-- <p style="position: absolute; color: #FFF0FF; top: 872px;left: 198px;">TOP 5</p> -->
          <pieCharts
            style="position: relative;top: 41px;"
            pieWidth="390"
            pieHeight="365"
            :isBorder="false"
            title="能效服务统计"
            hasTitle
            :dataList="nengxiao"
          />
        </div>
        <div>
          <chineseMap
            @mapClick="mapClick"
            mapWidth="1100"
            mapHeight="790"
          ></chineseMap>
        </div>
        <div class="b-right charts_inset_shadow">
          <div class="inner">
            <div class="item-left-center">
              <img src="../../assets/image/bigscreen/icon_bt.png" /><span
                class="text"
                >节能减排</span
              >
            </div>
            <div class="itemAll">
              <img src="../../assets/image/bigscreen/img_zhjn.png" />
              <div class="item-rt">
                <span>{{ indexData.jn.jnTitle1 }}</span>
                <div class="item-left-center">
                  <p class="num">{{ indexData.jn.jnTitle1Value }}</p>
                  <p class="danwei">吨标准煤</p>
                </div>
              </div>
            </div>
            <div class="itemAll">
              <img src="../../assets/image/bigscreen/img_tpf.png" />
              <div class="item-rt">
                <span>{{ indexData.jn.jnTitle2 }}</span>
                <div class="item-left-center">
                  <p class="num">{{ indexData.jn.jnTitle2Value }}</p>
                  <p class="danwei">吨</p>
                </div>
              </div>
            </div>
            <div style="margin-top: 100px;">
              <div class="jianpaiStyle">
                <div class="item1 f-center">
                  <p>{{ jianpai.month1 }}</p>
                </div>
                <div class="item2">
                  <p class="top">节能减排量</p>
                  <p class="num">{{ jianpai.value1 }}<span>kg</span></p>
                </div>
                <div class="item3">
                  <p>环比</p>
                  <div class="f-center">
                    <img src="../../assets/image/bigscreen/icon_zengjia.png" />
                    <span class="num">{{ jianpai.huanbi }}%</span>
                  </div>
                </div>
              </div>
              <div class="jianpaiStyle">
                <div class="item1 f-center">
                  <p>{{ jianpai.month2 }}</p>
                </div>
                <div class="item2">
                  <p class="top">节能减排量</p>
                  <p class="num">{{ jianpai.value2 }}<span>kg</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="pageType === 'map'">
      <chineseMap @mapClick="mapClick"></chineseMap>
    </template>
    <template v-if="pageType === 'admin'">
      <!-- <iframe class="admin-iframe" :src="adminUrl"></iframe> -->
      <!-- <homeIndex class="admin-iframe"></homeIndex> -->
    </template>
  </div>
</template>

<script>
import pieCharts from '../../components/pieCharts/index'
import chineseMap from '../../components/mapCharts/chineseMap'
import indexTitle from '../../components/bgComponents/indexTitle.vue'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapState({
      alertInfo: (state) => state.BigScreen.alertInfo,
    }),
  },
  components: {
    pieCharts,
    chineseMap,
    indexTitle,
  },

  data() {
    return {
      pageType: 'index', //控制当前页面显示：index表示首页，map表示地图站点,admin表示后台
      adminUrl: '', //跳转到后台的链接
      delay: 600,
      loginOutTo: false,
      boolBack: false,
      indexData: {
        time: '' /* 时间 */,
        location: '上海' /* 地址位置 */,
        weather: '晴22-30° 南风4-5级' /* 天气 */,
        clientNum: 0, //客户总量
        siteNum: 0 /* 站点总量 */,
        biandianNum: 0, //变电总容量
        operatLength: 0 /* 运维线路总长 */,
        terminal: 0 /* 终端总量 */,
        orderNum: 0 /* 订单数 */,
        jn: {
          jnTitle1: '综合节能',
          jnTitle1Value: 0,
          jnTitle2: '累计减少碳排放量',
          jnTitle2Value: 0,
        },
      },
      jianpai: {
        month1: '',
        value1: 0,
        huanbi: 0,
        month2: '',
        value2: 0,
      },
      notice: '',
      hangye: [],
      nengxiao: [],
      alertType: 0,
      noticeTime: '', //报警时间
    }
  },
  created() {
    let self = this
    self.getData()
    window.addEventListener(
      'storage',
      function(event) {
        /*
              ?type=policy&value=kaiguan // 实时告警==》开关变位
               ?type=policy&value=yaoxin // 实时告警==》遥信变位
               ?type=policy&value=yaoce // 实时告警==》遥测越限
               ?type=policy&value=baohu // 实时告警==》保护信号
               
               ?type=newOrder&value=yichang // 最新工单==》异常
               ?type=newOrder&value=daijieshou // 最新工单==》待接收
               ?type=newOrder&value=daidaochang // 最新工单==》待到场
               ?type=newOrder&value=daifankui // 最新工单==》待反馈
               ?type=newOrder&value=yiwancheng // 最新工单==》已完成
               ?type=newOrder&value=yiyanshou // 最新工单==》已验收
             */
        /*  告警 */
        if (event.key === 'policy') {
          // self.pageType = 'admin'
          // self.adminUrl = self.AdminUrl + '?type=policy&value=' + JSON.parse(event.newValue).type
          // self.boolBack = true
          let data = {
            name: 'Gaojingjc',
            params: null,
            type: 1,
          }
          self.$router.push({
            name: 'home',
            params: data,
          })
        } else if (event.key === 'order') {
          //跳转工单
          // self.pageType = 'admin'
          // self.adminUrl = self.AdminUrl + '?type=newOrder&value=' + JSON.parse(event.newValue).type
          // self.boolBack = true
          let data = {
            name: 'Workordergl',
            params: null,
            type: 1,
          }
          self.$router.push({
            name: 'home',
            params: data,
          })
        }
      },
      true
    )
  },

  mounted() {
    if (this.$route.params.pathName !== 'toHome') {
      this.toThree()
    }
  },
  methods: {
    noneTo() {
      this.loginOutTo = false
    },
    tuichu() {
      this.loginOutTo = true
    },
    getData() {
      // 获取中屏数据
      let self = this
      self.$store.dispatch('BigScreen/getCenterScreen').then((res) => {
        if (res) {
          let allData = res.data
          self.indexData.clientNum = allData.clientNum
          self.indexData.siteNum = allData.siteNum
          self.indexData.biandianNum = allData.bianRongliang
          self.indexData.operatLength = allData.dianLanchangdu
          self.indexData.terminal = allData.zhongDuanNum
          self.indexData.orderNum = allData.workOrderNum
          // 客户行业分类统计
          self.hangye = []
          for (let it of allData.hangYeNum) {
            let val =
              (
                parseFloat(it.value) / parseFloat(allData.clientHangyeSum)
              ).toFixed(1) * 100
            let item = {
              name: it.name,
              value: val,
            }
            self.hangye.push(item)
          }
          // 能效服务统计
          self.nengxiao = []
          for (let it of allData.clientAreaNum) {
            let val =
              (
                parseFloat(it.value) / parseFloat(allData.clientAreaSum)
              ).toFixed(1) * 100
            let item = {
              name: it.name,
              value: val,
            }
            self.nengxiao.push(item)
          }
          // 节能减排
          self.indexData.jn.jnTitle1Value = allData.jieneng
          self.indexData.jn.jnTitle2Value = allData.tanpailiang
          self.jianpai.month1 = allData.twoMonth[1].month
          self.jianpai.value1 = allData.twoMonth[1].value
          self.jianpai.month2 = allData.twoMonth[0].month
          self.jianpai.value2 = allData.twoMonth[0].value
          self.jianpai.huanbi = allData.huanbi
        }
      })
    },
    // 跳转到告警监测
    noticeClick() {
      let data = {
        name: 'Gaojingjc',
        params: null,
        type: 1,
      }
      this.$router.push({
        name: 'home',
        params: data,
      })
    },
    leftTitleClick(item) {
      //this.pageType = 'admin'
      //this.adminUrl = this.AdminUrl + "?type=" + item.route;
      //this.boolBack = true;
      let data = {
        name: item.route,
        params: null,
        type: 1,
      }
      if (item.route == '') {
        this.$router.push({
          name: 'home',
          params: data,
        })
      } else {
        this.$router.replace({
          name: 'carIndex',
          params: data,
        })
      }
    },
    toback() {
      this.pageType = 'index'
      this.boolBack = false
    },
    mapClick(mapParams) {
      this.$router.push({
        name: 'qcMap',
        params: {
          name: mapParams.name,
          center: mapParams.center,
          around: '',
        },
      })
      // 用this.$route.query.name接收参数
    },
    toThree() {
      //三个屏幕打开新的界面
      let leftRoute = this.$router.resolve({
        path: '/leftScreen',
        name: 'leftScreen',
        // query: { cpdfId: id },
        // params: { cpdfId: id }
      })
      let rightRoute = this.$router.resolve({
        path: '/rightScreen',
        name: 'rightScreen',
        // query: { cpdfId: id },
        // params: { cpdfId: id }
      })
      window.open(
        leftRoute.href,
        '_blank',
        'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes'
      )
      window.open(
        rightRoute.href,
        '_blank',
        'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes'
      )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  /* 鼠标放上去变成小手 */
  cursor: pointer;
}
.fanhuiStyle {
  position: absolute;
  top: 18px;
  left: 26px;
}
.admin-iframe {
  width: 100%;
  height: 1080px;
  background-color: #ffffff;
}
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.f-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index-all {
  width: 100%;
}
.tx-center {
  text-align: center;
}
/* 顶部的title样式 */
.index-title {
  width: 100%;
  height: 80px;
  background-image: url('../../assets/image/bigscreen/img_nav_bj.png');
  position: relative;
}
.index-title .title {
  margin-left: 405px;
  margin-right: 293px;
}
/* 顶部左边 */
.title-left {
  margin-bottom: 20px;
  margin-left: 95px;
}
.title-left .l2 {
  margin-left: 10px;
}
.title-left .time {
  font-size: 18px;
  font-family: DIN;
  font-weight: bold;
  color: rgba(154, 203, 234, 1);
  padding-left: 30px;
}
/* 顶部右边 */
.title-right {
  margin-right: 117px;
  margin-bottom: 20px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
.title-right .r1 {
  margin-right: 7px;
}
.title-right .r2 {
  margin-right: 11px;
}
.title-right .r3 {
  margin-right: 30px;
}
.title-right .r4 {
  margin-right: 20px;
}
.title-right .r5 {
  margin-right: 8px;
}
.index-middle {
  margin-top: 32px;
  margin-bottom: 29px;
  width: 100%;
}
.index-middle span {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(169, 222, 255, 1);
}
.index-middle p {
  font-size: 34px;
  font-family: DIN;
  font-weight: 400;
}
.index-middle .m1 {
  margin-left: 36px;
  width: 280px;
  height: 93px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj1.png');
}
.index-middle .m2 {
  width: 280px;
  height: 91px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m3 {
  width: 280px;
  height: 91px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m4 {
  width: 280px;
  height: 91px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m5 {
  width: 280px;
  height: 91px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m6 {
  width: 280px;
  height: 93px;
  background-image: url('../../assets/image/bigscreen/img_shuju_bj3.png');
  margin-right: 36px;
}
.color1 {
  color: #00c986;
}
.color2 {
  color: #367bf8;
}
.color3 {
  color: #e6cf03;
}
.color4 {
  color: #fc7635;
}
.color5 {
  color: #d9424d;
}
.color6 {
  color: #00a8f6;
}
/* 通知 */
.index-notice {
  background-image: url('../../assets/image/bigscreen/notice_bg.png');
  width: 1000px;
  height: 40px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #d9424d;
  cursor: pointer;
}
.index-notice span {
  margin-left: 10px;
}
.noticeIcon {
  margin-right: 10px;
}
/* 下面图表 */
.index-bottom {
  margin-top: 10px;
}
.index-bottom .b-left {
  width: 20%;
  height: 766px;
  margin-left: 24px;
}
.line {
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(6, 52, 120, 1);
  border: 0.5px solid rgba(6, 52, 120, 1);
}
.index-bottom .b-right {
  width: 20%;
  height: 766px;
  margin-right: 24px;
}
.index-bottom .inner {
  padding: 18px 21px 0px 21px;
}
.text {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  padding-left: 5px;
}
.itemAll {
  padding: 50px 0px 0px 8%;
  display: flex;
  align-items: center;
}
.item-rt {
  padding-left: 20px;
}
.item-left-center {
  display: flex;
  align-items: center;
}
.itemAll span {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
.itemAll .num {
  font-size: 30px;
  font-family: DIN;
  font-weight: 400;
  color: rgba(0, 201, 134, 1);
}
.itemAll .danwei {
  font-size: 16px;
  padding-left: 5px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 201, 134, 1);
}
/* 节能 */

.jn-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
.jn-radus {
  width: 242px;
  height: 14px;
  background-color: rgba(13, 50, 100, 1);
  border-radius: 7px;
  margin-top: 18px;
}
.jn-show {
  background-color: #00c986;
  border-radius: 7px;
  height: 14px;
}
.jn-num {
  font-size: 18px;
  font-family: DIN;
  font-weight: 400;
  color: rgba(0, 192, 129, 1);
  height: 14px;
  padding-left: 10px;
  opacity: 0.9;
}
.jianpaiStyle {
  display: flex;
  align-items: center;
  padding-top: 60px;
  padding-left: 30px;
  .item1 {
    width: 56px;
    height: 46px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/image/bigscreen/icon_daily.png');
    p {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 168, 245, 1);
    }
  }
  .item2 {
    padding-left: 20px;
    .top {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(154, 203, 234, 1);
    }
    .num {
      font-size: 30px;
      font-weight: 400;
      color: rgba(0, 168, 245, 1);
      opacity: 0.9;
      span {
        font-size: 18px;
      }
    }
  }
  .item3 {
    padding-left: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    p {
      font-size: 16px;
      color: rgba(154, 203, 234, 1);
    }
    img {
      margin-top: 16px;
      width: 13px;
      height: 20px;
    }
    .num {
      margin-top: 16px;
      padding-left: 8px;
      font-size: 18px;
      color: rgba(217, 66, 77, 1);
    }
  }
}
</style>
