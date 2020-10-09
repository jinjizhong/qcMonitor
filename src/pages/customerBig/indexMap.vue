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
      style="position:absolute"
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
    <!-- 地图和模态框 -->
    <div id="container" class="qc_map">
      <!-- <div class="pos_left">
        <div class="xialaMenu flex_row_yCenter" @click="xialaClick()">
          <div class="flex_row_xCenter">
            <p>{{nowValue}}</p>
            <div><img :src="upOrDown?down:up" /></div>
          </div>
        </div>
        <div v-if="upOrDown" class="down_pop">
          <div class="list_item">
            <p v-for="(item,index) in compamyList" :key="index" @click="itClick(item)">
              <span :class="item.choose?'co':''">{{item.name}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="pos_right charts_inset_shadow">
        <pieCharts pieWidth="336" pieHeight="342" title="客户行业分类统计" hasTitle :dataList="customerTotal" :isBorder="false" />
      </div> -->
      <!-- 地图模态弹窗 -->
      <div :style="{ opacity: isShow }" ref="modelContent" class="modolWindow">
        <p class="title">{{ modelValue.name }}</p>
        <p class="line"></p>
        <p class="name">
          变压器总容量：<span class="value"
            >{{ modelValue.zongRongliang }}MW</span
          >
        </p>
        <p class="name">
          当前实时总功率：<span class="value"
            >{{ modelValue.zongGonglv }}MW</span
          >
        </p>
        <p class="name">
          当前告警数量：<span class="value">{{ modelValue.alertNum }}个</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import pieCharts from '../../components/pieCharts/index.vue'
import indexTitle from '../../components/bgComponents/indexTitle.vue'
import { mapState } from 'vuex'
import AMap from 'AMap' // 引入高德地图
export default {
  name: 'Index',
  computed: {
    ...mapState({
      alertInfo: (state) => state.BigScreen.alertInfo,
    }),
  },
  components: {
    indexTitle,
    pieCharts,
  },

  data() {
    return {
      pageType: 'index', //控制当前页面显示：index表示首页，map表示地图站点,admin表示后台
      adminUrl: '', //跳转到后台的链接
      loginOutTo: false,
      boolBack: false,
      isShow: 0, //model show
      map: null,
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
      up: require('../../assets/image/bigscreen/icon_xiala.png'),
      down: require('../../assets/image/bigscreen/icon_shouqi.png'),
      positionIcon: require('../../assets/image/customerBig/icon_dingweidian.png'),
      nowValue: '上海裕安大厦物业管理公司',
      modelValue: {
        name: '裕安大厦',
        zongRongliang: 4,
        zongGonglv: 1.3,
        alertNum: 2,
      },
      compamyList: [
        { name: '上海环球都会物业管理公司', choose: false },
        { name: '上海裕安大厦物业管理公司', choose: false },
        { name: '上海众达汽车冲压件有限公司', choose: false },
        { name: '全程（上海）智能科技有限公司', choose: false },
        { name: '上海华测品正检测技术有限公司', choose: false },
        { name: '上海中环协信物业管理公司', choose: false },
        { name: '东利科技有限公司', choose: false },
        { name: '宁波北斗星商业信息技术有限公司', choose: false },
        { name: '云思智慧有限公司', choose: false },
        { name: '广州上海隧原科技有限公司', choose: false },
        { name: '形忆科技有限公司', choose: false },
        { name: '广州金利时电池厂', choose: false },
        { name: '宿州灵璧科技有限公司', choose: false },
        { name: '桐城恒丰大厦物业管理公司', choose: false },
        { name: '奇沃晟芯电子有限公司', choose: false },
        { name: '深圳泽友物业管理公司', choose: false },
        { name: '厦门唯壹软件技术有限公司', choose: false },
      ],
      mapData: [
        {
          name: '裕安大厦',
          center: '121.524659,31.228544',
          type: 'site',
          zongRongliang: 4,
          zongGonglv: 1.3,
          alertNum: 2,
        },
        {
          name: '众达汽车冲压件有限公司',
          center: '121.20436, 31.315164',
          type: 'site',
          zongRongliang: 3.2,
          zongGonglv: 0.65,
          alertNum: 4,
        },
        {
          name: '仲益大厦',
          center: '121.465915, 31.231644',
          type: 'people',
          zongRongliang: 6.4,
          zongGonglv: 2.25,
          alertNum: 0,
        },
        {
          name: '都会广场',
          center: '121.471765, 31.170368',
          type: 'site',
          zongRongliang: 4,
          zongGonglv: 1.25,
          alertNum: 1,
        },
        {
          name: '检测技术有限公司',
          center: '121.526177, 31.090757',
          type: 'site',
          zongRongliang: 3,
          zongGonglv: 0.95,
          alertNum: 1,
        },
        {
          name: '上海嘉里食品工业有限公司',
          center: '121.621896, 31.339923',
          type: 'site',
          zongRongliang: 0,
          zongGonglv: 0,
          alertNum: 0,
        },
        { name: '东煌大厦', center: '116.481036, 39.986131', type: 'site' },
        { name: '美克大厦', center: '121.441217, 31.19394', type: 'site' },
        { name: '安徽大厦', center: '116.41614, 39.988027', type: 'site' },
        { name: '碧水大厦', center: '116.282014, 40.117705', type: 'site' },
      ],
      markers: [],
      upOrDown: false,
      jianpai: {
        month1: '',
        value1: 0,
        huanbi: 0,
        month2: '',
        value2: 0,
      },
      customerTotal: [
        {
          name: '电力',
          value: 12,
          percent: '12%',
        },
        {
          name: '钢铁',
          value: 18,
          percent: '18%',
        },
        {
          name: '商场',
          value: 21,
          percent: '21%',
        },
        {
          name: '污水治理',
          value: 11,
          percent: '11%',
        },
        {
          name: '其他',
          value: 38,
          percent: '38%',
        },
      ],
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
    this.initMap()
    this.getMapMarkers()
    // if (this.$route.params.pathName !== 'toHome') {
    //   this.toThree();
    // }
  },
  methods: {
    initMap() {
      const that = this
      //console.log(that.$route.params.center)
      that.map = new AMap.Map('container', {
        center: that.$route.params.center,
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 18,
        mapStyle: 'amap://styles/darkblue',
        features: ['bg', 'road', 'building', 'point'], // 地图显示要素
        // showLabel: true //不显示地图文字标记
      })
    },
    // 获取地图的点
    getMapMarkers() {
      let that = this
      for (let i = 0; i < that.mapData.length; i += 1) {
        let marker = new AMap.Marker({
          icon: that.positionIcon,
          position: this.mapData[i].center.split(','),
          offset: new AMap.Pixel(-13, -30),
        })
        marker.setMap(that.map)
        marker.zongRongliang = this.mapData[i].zongRongliang
        marker.name = this.mapData[i].name
        marker.zongGonglv = this.mapData[i].zongGonglv
        marker.alertNum = this.mapData[i].alertNum

        that.map.add(marker)
        // 给标记加一个点击事件，传入对应的参数
        marker.on('click', (e) => {
          const { name, zongRongliang, zongGonglv, alertNum } = e.target

          that.modelValue = {
            name: name,
            zongRongliang: zongRongliang,
            zongGonglv: zongGonglv,
            alertNum: alertNum,
          }

          let infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: this.$refs.modelContent,
            offset: new AMap.Pixel(160, 0),
          })
          infoWindow.open(that.map, marker.getPosition())
          if (infoWindow.getIsOpen()) {
            that.isShow = 1
          } else {
            that.isShow = 0
          }
        })
        that.markers.push(marker)
      }
    },
    xialaClick() {
      if (this.upOrDown) {
        this.upOrDown = false
      } else {
        this.upOrDown = true
      }
      for (let it of this.compamyList) {
        if (it.name == this.nowValue) {
          it.choose = true
        } else {
          it.choose = false
        }
      }
    },
    itClick(item) {
      for (let it of this.compamyList) {
        if (it.name == item.name) {
          it.choose = true
          this.nowValue = it.name
          this.upOrDown = false
        } else {
          it.choose = false
        }
      }
    },
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
        path: '/right',
        name: 'right',
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
  top: 108px;
  width: 100%;
  position: absolute;
  z-index: 99;
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
  background-color: rgba(2, 22, 50, 0.8);
  background-image: url('../../assets/image/bigscreen/img_shuju_bj1.png');
}
.index-middle .m2 {
  width: 280px;
  height: 91px;
  background-color: rgba(2, 22, 50, 0.8);
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m3 {
  width: 280px;
  height: 91px;
  background-color: rgba(2, 22, 50, 0.8);
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m4 {
  width: 280px;
  height: 91px;
  background-color: rgba(2, 22, 50, 0.8);
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m5 {
  width: 280px;
  height: 91px;
  background-color: rgba(2, 22, 50, 0.8);
  background-image: url('../../assets/image/bigscreen/img_shuju_bj2.png');
}
.index-middle .m6 {
  width: 280px;
  height: 93px;
  background-color: rgba(2, 22, 50, 0.8);
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
.qc_map {
  width: 100%;
  height: 100vh;
}
.pos_left {
  position: absolute;
  top: 267px;
  left: 39px;
  z-index: 99;
}
.pos_right {
  position: absolute;
  width: 334px;
  height: 342px;
  top: 267px;
  right: 39px;
  z-index: 99;
  background-color: rgba(1, 28, 67, 0.9);
}
.xialaMenu {
  width: 334px;
  height: 50px;
  z-index: 99;
  background-color: rgba(6, 52, 120, 0.8);
  // background: rgba(6, 52, 120, 0.6);
  border: 1px solid rgba(6, 52, 120, 1);
  border-radius: 4px;
  p {
    padding-left: 20px;
    color: #cbebff;
    width: 280px;
  }
  img {
    width: 18px;
    height: 10px;
  }
}
.down_pop {
  width: 332px;
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: rgba(2, 22, 50, 1);
  border: 1px solid rgba(72, 180, 255, 0.6);
  opacity: 0.9;
  p {
    line-height: 40px;
    padding-left: 20px;
    color: rgba(154, 203, 234, 1);
  }
  p:hover {
    color: rgb(44, 160, 248);
  }
  .list_item {
    margin-top: 10px;
  }
}
.co {
  color: rgb(44, 160, 248);
}
// .down_pop::-webkit-scrollbar {
//   display: none;
// }
.modolWindow {
  width: 245px;
  height: 139px;
  background: rgba(3, 37, 71, 0.3);
  //border: 1px solid rgba(77, 178, 255, 1);
  opacity: 0.6;
  background-repeat: no-repeat;
  background-image: url('../../assets/image/customerBig/img_tcbg.png');
  position: relative;
  z-index: 100;
  padding: 22px 25px 23px 25px;

  .title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(77, 178, 255, 1);
  }
  .line {
    margin: 11px 0 21px 0;
    width: 238px;
    height: 1px;
    background: rgba(46, 107, 153, 1);
  }
  .name {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(154, 203, 234, 1);
  }
  .value {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(77, 178, 255, 1);
  }
}
</style>
