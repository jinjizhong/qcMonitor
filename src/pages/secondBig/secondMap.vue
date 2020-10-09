<template>
  <div class="index-all" @click="noneTo()">
    <!-- 顶部-->
    <midTop></midTop>

    <!-- 地图和模态框 -->
    <div id="container" class="qc_map">
      <!-- 地图模态弹窗 -->
      <div :style="{ opacity: isShow }" ref="modelContent" class="modolWindow">
        <p class="title">{{ modelValue.name }}</p>
        <div class="flex_row_xCenter">
          <p class="line"></p>
        </div>
        <div class="flex_row_xCenter bt-text">
          <div>
            <p class="name">
              变压器总容量：<span class="value">{{ modelValue.zongRongliang }}MW</span>
            </p>
            <p class="name">
              当前实时总功率：<span class="value">{{ modelValue.zongGonglv }}MW</span>
            </p>
            <p class="name">
              当前告警数量：<span class="value">{{ modelValue.alertNum }}个</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import midTop from './component/middleTop.vue'
// import { mapState } from 'vuex'
import AMap from 'AMap' // 引入高德地图
export default {
  name: 'secondMap',
  // computed: {
  //   ...mapState({
  //     alertInfo: (state) => state.BigScreen.alertInfo,
  //   }),
  // },
  components: {
    midTop
  },

  data () {
    return {
      pageType: 'index', //控制当前页面显示：index表示首页，map表示地图站点,admin表示后台
      adminUrl: '', //跳转到后台的链接
      loginOutTo: false,
      boolBack: false,
      isShow: 0, //model show
      map: null,
      up: require('../../assets/image/bigscreen/icon_xiala.png'),
      down: require('../../assets/image/bigscreen/icon_shouqi.png'),
      positionIcon: require('../../assets/image/secondBig/icon_shangyejianzhu.png'),
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
      notice: '',
      hangye: [],
      nengxiao: [],
      alertType: 0,
      noticeTime: '', //报警时间
    }
  },
  created () {
    let self = this
    self.getData()
    window.addEventListener(
      'storage',
      function (event) {
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

  mounted () {
    this.initMap()
    this.getMapMarkers()
    // if (this.$route.params.pathName !== 'toHome') {
    //   this.toThree();
    // }
  },
  methods: {
    initMap () {
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
    getMapMarkers () {
      let that = this
      // 
      let markerContent = '<div class="point_map_style">' +
        '<img src="' + that.positionIcon + '">">' +
        '<div class="pulse"></div><div class="pulse1"></div><div class="pulse2"></div>' +
        '</div>';

      for (let i = 0; i < that.mapData.length; i += 1) {
        let marker = new AMap.Marker({
          // icon: that.positionIcon,
          content: markerContent,
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
            offset: new AMap.Pixel(180, 80),
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
    xialaClick () {
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
    itClick (item) {
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
    noneTo () {
      this.loginOutTo = false
    },
    tuichu () {
      this.loginOutTo = true
    },
    // 跳转到告警监测
    noticeClick () {
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
    leftTitleClick (item) {
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
    toback () {
      this.pageType = 'index'
      this.boolBack = false
    },
    mapClick (mapParams) {
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
    toThree () {
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
.index-all {
  width: 100%;
}
.qc_map {
  width: 100%;
  height: 100vh;
}
.co {
  color: rgb(44, 160, 248);
}

.modolWindow {
  width: 268px;
  height: 184px;
  background: rgba(3, 37, 71, 0.3);
  //border: 1px solid rgba(77, 178, 255, 1);
  opacity: 0.6;
  background-repeat: no-repeat;
  background-image: url("../../assets/image/secondBig/tanchuang_bj.png");
  position: relative;
  z-index: 100;
  // padding: 22px 25px 23px 25px;

  .title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    text-align: center;
    padding: 20px 0px 10px 0px;
    font-weight: bold;
    color: rgba(77, 178, 255, 1);
  }
  .line {
    // margin: 11px 0 21px 10px;
    width: 180px;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(133, 239, 255, 0.01),
      rgba(53, 213, 247, 0.93),
      rgba(78, 121, 204, 0.28),
      rgba(134, 251, 255, 0)
    );
  }
  .bt-text {
    padding-top: 20px;
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
