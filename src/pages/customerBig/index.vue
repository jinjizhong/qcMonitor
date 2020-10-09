<template>
  <div class="index-all" @click="noneTo()">
    <img
      class="fanhuiStyle"
      @click="toback()"
      v-if="boolBack"
      src="../../assets/image/bigscreen/fanhui.png"
    />
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
            <!-- <p>{{ indexData.clientNum }}</p> -->
            <p>105</p>
            <span>个</span>
          </div>
        </div>
      </div>
      <div class="m2 f-center">
        <div class="tx-center">
          <span>站点总量</span>
          <div class="f-center color4">
            <!-- <p>{{ indexData.siteNum }}</p> -->
            <p>150</p>
            <span>个</span>
          </div>
        </div>
      </div>
      <div class="m3 f-center">
        <div class="tx-center">
          <span>变电总容量</span>
          <div class="f-center color6">
            <!-- <p>{{ indexData.biandianNum }}</p> -->
            <p>560</p>
            <span>MVA</span>
          </div>
        </div>
      </div>
      <div class="m4 f-center">
        <div class="tx-center">
          <span>线路总长</span>
          <div class="f-center color2">
            <!-- <p>{{ indexData.operatLength }}</p> -->
            <p>1460</p>
            <span>km</span>
          </div>
        </div>
      </div>
      <div class="m5 f-center">
        <div class="tx-center">
          <span>终端总量</span>
          <div class="f-center color3">
            <!-- <p>{{ indexData.terminal }}</p> -->
            <p>9960</p>
            <span>个</span>
          </div>
        </div>
      </div>
      <div class="m6 f-center">
        <div class="tx-center">
          <span>完成工单总数</span>
          <div class="f-center color1">
            <!-- <p>{{ indexData.orderNum }}</p> -->
            <p>488</p>
            <span>个</span>
          </div>
        </div>
      </div>
    </div>

    <!--下面的echarts图形  -->
    <div class="index-bottom">
      <div class="b-left charts_inset_shadow">
        <pieCharts
          pieWidth="336"
          pieHeight="342"
          title="客户行业分类统计"
          hasTitle
          :dataList="customerTotal"
          :isBorder="false"
        />
        <pieCharts
          style="margin-top:60px"
          pieWidth="336"
          pieHeight="342"
          title="区域客户统计"
          hasTitle
          :dataList="areaCustomer"
          :isBorder="false"
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
        <div class="list_title">
          <img
            class="left"
            src="../../assets/image/bigscreen/icon_bt.png"
            alt=""
          />
          <span class="right">客户</span>
        </div>
        <div class="list_content">
          <p
            v-for="(item, index) in compamyList"
            :key="index"
            @click="itClick(item)"
          >
            <span>{{ item.name }}</span>
          </p>
        </div>
      </div>
    </div>
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
      compamyList: [
        { name: '裕安大厦', choose: false, center: [121.524659, 31.228544] },
        {
          name: '众达汽车冲压件有限公司',
          choose: false,
          center: [121.20436, 31.315164],
        },
        { name: '仲益大厦', choose: false, center: [121.465915, 31.231644] },
        {
          name: '都会广场',
          choose: false,
          center: [121.471765, 31.170368],
        },
        {
          name: '检测技术有限公司',
          choose: false,
          center: [121.526177, 31.090757],
        },
        {
          name: '上海嘉里食品工业有限公司',
          choose: false,
          center: [121.621896, 31.339923],
        },
        { name: '东煌大厦', choose: false, center: [116.481036, 39.986131] },
        { name: '美克大厦', choose: false, center: [121.441217, 31.19394] },
        { name: '安徽大厦', choose: false, center: [116.41614, 39.988027] },
        { name: '碧水大厦', choose: false, center: [116.282014, 40.117705] },
        { name: '红星美凯龙北五环商场', choose: false },
        { name: '东环广场', choose: false },
        { name: '博雅国际中心', choose: false },
        { name: '天津永立电梯厂', choose: false },
        { name: '北京曲美家具厂', choose: false },
        { name: '北京昆泰嘉禾酒店', choose: false },
        { name: '北辰时代大厦', choose: false },
        { name: '博雅国际中心', choose: false },
        { name: '芜湖中央城商业广场', choose: false },
        { name: '昆山希瑞造纸', choose: false },
        { name: '上海安装集团检测中心', choose: false },
        { name: 'IBM中国开发中心', choose: false },
        { name: '上安检测中心', choose: false },
        { name: '上海浦江埃纳迪斯仪表有限公司', choose: false },
        { name: '上海良友大厦', choose: false },
        { name: '虹口星游城', choose: false },
        { name: '海尔集团华北区分公司', choose: false },
        { name: '山东泰山锅炉厂', choose: false },
        { name: '天津明德莱茵科技有限公司', choose: false },
        { name: '天津六力国际学校', choose: false },
        { name: '上海ABB高压电机有限公司', choose: false },
        { name: '居然之家西四环商场', choose: false },
        { name: '万隆汇洋灯饰广场', choose: false },
        { name: '宏汇广场', choose: false },
        { name: '生命科技产业园', choose: false },
        { name: '海洋大学临港校区线上检测试点项目', choose: false },
        { name: '长海医院线上检测试点项目', choose: false },
        { name: '临沂大学线上检测试点项目', choose: false },
        { name: '微创医疗器械(上海)有限公司', choose: false },
        { name: '上海中优城市广场', choose: false },
        { name: '上海麦吉丽日用品公司', choose: false },
        { name: '上海信谊天平药业有限公司', choose: false },
        { name: '汉泰电气成套设备厂', choose: false },
        { name: '金沙江大酒店', choose: false },
        { name: '红星美凯龙西五环商场', choose: false },
        { name: '上海玛辛电气有限公司', choose: false },
        { name: '上海良友大厦', choose: false },
        { name: '芜湖中国人民银行总行线上检测试点项目', choose: false },
        { name: '上海浦江埃纳迪斯仪表有限公司', choose: false },
        { name: '康明斯集团（上海）有限公司', choose: false },
        { name: '中信银行大厦', choose: false },
        { name: '皖南医学院', choose: false },
        { name: '芜湖中医院线上检测试点项目', choose: false },
        { name: '临沂沂南垃圾发电厂', choose: false },
        { name: '南京江北区垃圾发电厂', choose: false },
      ],
      customerTotal: [
        {
          name: '商业楼宇',
          value: 12,
          percent: '12%',
        },
        {
          name: '公共设施',
          value: 20,
          percent: '20%',
        },
        {
          name: '制造',
          value: 51,
          percent: '51%',
        },
      ],
      areaCustomer: [
        {
          name: '上海',
          value: 42,
          percent: '42%',
        },
        {
          name: '安徽',
          value: 38,
          percent: '38%',
        },
        {
          name: '北京',
          value: 20,
          percent: '20%',
        },
      ],
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
    // self.getData()
    window.addEventListener(
      'storage',
      function(event) {
        /*  告警 */
        if (event.key === 'policy') {
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
    // if (this.$route.params.pathName !== 'toHome') {
    //   this.toThree()
    // }
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
    itClick(item) {
      if (item.center) {
        this.$router.push({
          name: 'indexMap',
          params: {
            name: item.name,
            center: item.center,
            around: '',
          },
        })
      }
    },
    toback() {
      this.pageType = 'index'
      this.boolBack = false
    },
    mapClick(mapParams) {
      this.$router.push({
        name: 'indexMap',
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
        path: '/left',
        name: 'Left',
        // query: { cpdfId: id },
        // params: { cpdfId: id }
      })
      let rightRoute = this.$router.resolve({
        path: '/right',
        name: 'Right',
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
  display: flex;
  justify-content: space-between;
}
.index-bottom .b-left {
  width: 334px;
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
  width: 334px;
  height: 766px;
  // background: rgba(2, 22, 50, 1);
  // border: 1px solid rgba(72, 180, 255, 0.6);
  opacity: 0.9;
  p {
    line-height: 40px;
    padding-left: 20px;
    color: rgba(154, 203, 234, 1);
  }
  p:hover {
    cursor: pointer;
    color: rgb(44, 160, 248);
  }
  margin-right: 24px;
}

.list_title {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .left {
    width: 29px;
    height: 13px;
    margin-left: 20px;
  }
  .right {
    font-size: 20px;
    padding-left: 8px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(154, 203, 234, 1);
  }
}
.list_content {
  width: 334px;
  height: 686px;
  overflow-x: hidden;
  overflow-y: scroll;
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
</style>
