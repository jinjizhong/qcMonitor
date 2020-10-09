<template>
  <div class="map_box" @click="noneTo()">
    <!-- <img class="fanhuiStyle" @click="toback()" v-if="!boolBack" src="../../assets/image/bigscreen/fanhui.png" /> -->
    <template v-if="pageType=='map'">
      <!-- 大屏顶部-->
      <indexTitle @itemClick="leftTitleClick" class="header_box" @tuichu="tuichu()" :loginOutTo="loginOutTo" />
      <!-- <indexTitle :location="indexData.location" :weather="indexData.weather" class="header_box"/> -->
      <!-- 中间通知消息 -->
      <div class="noticeCenter" @click="noticeClick()">
        <div id="notice" class="index-notice f-center">
          <div class="f-center">
            <img class="noticeIcon" src="../../assets/image/bigscreen/icon_info.png" />
            <span class="noticeStyle">{{alertInfo}}</span>
          </div>
        </div>
      </div>
      <div id="container" class="qc_map position_relative">
        <div class="map_info flex_column">
          <p style="color:#CFE9FC;font-size:16px;margin: 12px 0 15px 39px;">
            图例
          </p>
          <div class="flex_column_center">
            <p style="margin-bottom: 8px;">
              <img class="info_img" width="15" height="15" src="../../assets/image/bigscreen/icon_tuli_zhandian.png"
                alt="img" /><span class="info_word">站点</span>
            </p>
            <p style="margin-bottom: 8px;">
              <img class="info_img" width="15" height="18" src="../../assets/image/bigscreen/icon_tuli_danbing.png"
                alt="img" /><span class="info_word">人员</span>
            </p>
            <p style="margin-bottom: 8px;">
              <img class="info_img" width="18" height="13" src="../../assets/image/bigscreen/icon_tuli_cheliang.png"
                alt="img" /><span class="info_word">车辆</span>
            </p>
            <!-- <p><img class="info_img" width="18" height="12" src="../../assets/image/bigscreen/map_video.png" alt="img" /><span class="info_word">视频</span></p> -->
          </div>
        </div>
        <div class="info_box flex_column">
          <div v-for="(item, index, key) in mapItems" class="map_item" :class="{ map_active: item.isActive }" :key="key"
            @click="mapItemBtn(item)">
            {{ item.name }}
          </div>
        </div>
        <div class="search_box">
          <input id="searchInput" ref="searchInput" v-model="inputVal" type="text" placeholder="请输入关键字"
            maxlength="20" />
          <img class="search_img" src="../../assets/image/bigscreen/search.png" alt="img" />
        </div>
        <!-- 地图模态弹窗 -->
        <div :style="{ opacity: isShow }" ref="modelContent" class="custom-info">
          <div class="info-top">
            <div class="titleD">
              <span class="title_name">{{ modelData.name }}</span>
              <img v-if="modelData.type == 'people'" width="22" height="27"
                src="../../assets/image/bigscreen/icon_mike.png" alt="img" />
            </div>
            <div class="header_right_content">
              <img class="fullScreen_img" @click="fullScreenWindow" src="../../assets/image/bigscreen/fullScreen.png"
                alt="img" />
              <img class="close_img" @click="closeInfoWindow" src="../../assets/image/bigscreen/close.png" alt="img" />
            </div>
          </div>
          <div class="info-middle">
            <div v-if="isPosition">
              <div class="flex_row_yCenter" style="z-index: 999;padding: 15px;">
                <p style="font-size: 20px; color:#fff; ">站点接线图：</p>
                <!-- <div class="video_name"
                  v-for="(item, key) in videoHref"
                  :key="key">
                  <div @click="playVideo(item.href)">{{item.name}}</div>
                </div> -->
              </div>
              <!-- <video v-if="videoSrc!==''" style='width: 100%;height: 100%;' preload='auto' :src='videoSrc' controls='controls' autoplay>
                your browser does not support the video tag
              </video> -->
            </div>
            <iframe ref="middleRefs" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes"
              allowtransparency="yes" style="width: 100%;height: 300px;" :src="myGraph" />
            <!-- <video style='width: 100%;height: 100%;' 
              autoPlay='autoPlay'
              loop='loop'
              src='http://172.16.10.20:99/img/video/jiankong.mov'
              controls='controls'>
                your browser does not support the video tag
            </video> -->
          </div>
          <div class="info_arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="154.625" height="50.375" viewBox="0 0 154.625 50.375">
              <path id="line" :style="{ fill: arrow_color }"
                d="M152,26a6,6,0,0,1-5.91-5H36.546L5,64.383,3.386,63.2,35,19H146.09A6,6,0,1,1,152,26Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,152,16Z"
                transform="translate(-3.375 -14)" />
            </svg>
          </div>
        </div>
      </div>

    </template>
    <!-- 后台管理 -->
    <template v-if="pageType=='admin'">
      <iframe class="admin-iframe" :src="adminUrl"></iframe>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AMap from 'AMap' // 引入高德地图
import indexTitle from '../../components/bgComponents/indexTitle.vue'
import { diffentArr } from '../../assets/js/common'
export default {
  name: 'qcMap',
  computed: {
    ...mapState({
      alertInfo: state => state.BigScreen.alertInfo,
      mapData: state => state.mapData,
      mapDataCopy: state => state.mapDataCopy,
      callBackData: state => state.WS.callBackData
    }),
    ...mapGetters('WS', {
      getSocket: 'onEvent'
    })
  },
  components: {
    indexTitle
  },
  data () {
    return {
      boolBack: false,
      loginOutTo: false,
      adminUrl: "",//跳转到后台的链接
      pageType: 'map',//控制当前页面显示：index表示首页，map表示地图站点,admin表示后台
      map: null,
      notice: "",
      markers: [],
      cluster: null,
      inputVal: '',
      isShow: 0, //model show
      isPosition: false,
      indexData: {
        time: '2019-08-19 10:00:00' /* 时间 */,
        location: '上海' /* 地址位置 */,
        weather: '晴22-30° 南风4-5级' /* 天气 */
      },
      modelData: {
        name: '',
        type: ''
      },
      myGraph: '', // 站点组态图地址
      videoHref: [],
      videoSrc: '',
      mapItems: [
        {
          name: '站点',
          type: 'site',
          isActive: false
        },
        {
          name: '人员',
          type: 'people',
          isActive: false
        },
        {
          name: '车辆',
          type: 'car',
          isActive: false
        }
      ],
      peopleIcon: require('../../assets/image/bigscreen/biaoji_people.png'),
      positionIcon: require('../../assets/image/bigscreen/biaoji_site.png'),
      carIcon: require('../../assets/image/bigscreen/biaoji_car.png'),
      mikeIcon: require('../../assets/image/bigscreen/icon_mike.png'),
      dataMarker: [],
      arrow_color: '#0A3B6B',
      markersTwo: null,
      markersThree: null,
      carId: '' // 车的id'6e09f918_d4ef_4f27_8ed3_ab4800f5f488'
    }
  },
  async created () {
    const that = this
    await that.$store.dispatch('getMaps')
    // this.markers = this.mapData
    // this.dataMarker = this.mapDataCopy
    that.init()
    await that.getMapMarkers()
    that.carView()
    window.addEventListener("storage", function (event) {
      /*  告警 */
      if (event.key === 'policy') {
        let data = {
          name: 'Gaojingjc',
          params: null,
          type: 1
        }
        that.$router.push({
          name: 'home',
          params: data
        })
      } else if (event.key === 'order') {
        //跳转工单
        let data = {
          name: 'Workordergl',
          params: null,
          type: 1
        }
        that.$router.push({
          name: 'home',
          params: data
        })
      }
    }, true);

  },
  watch: {
    getSocket (a, b) {
      console.log(a, '============', b)
      if (a !== b && a) {
        this.markAndLine(a)//地图画点和划线
      }
    }
  },
  methods: {
    // 车辆实时位置
    carView () {
      let self = this;
      self.$store.dispatch('WS/wsInit') //初始化ws
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

      // 获取班组绑定的车辆id
      let param = {
        userId: userInfo.userId || ''
      }
      self.carId = 'qc|car|'
      self.$store.dispatch('BigScreen/getTeamCar', param).then((res) => {
        if (res && res.teamCar.length > 0) {
          if (res.teamCar.length == 1) {
            for (let it of res.teamCar) {
              self.carId += it.carId
            }
          } else {
            for (let it of res.teamCar) {
              self.carId += ',' + it.carId
            }
          }
          setInterval(function () {
            self.$store.dispatch("WS/wsSend", self.carId);
          }, 2000)
        }
      })
      // setInterval(() => {
      //   self.$store.dispatch("WS/wsSend", 'qc|car|6e09f918_d4ef_4f27_8ed3_ab4800f5f488')
      // }, 2000)
    },
    noneTo () {
      this.loginOutTo = false
    },
    tuichu () {
      this.loginOutTo = true
    },
    noticeClick () {
      let data = {
        name: 'Gaojingjc',
        params: null,
        type: 1
      }
      this.$router.push({
        name: 'home',
        params: data
      })
    },
    leftTitleClick (item) {
      //this.pageType = 'admin'
      //this.adminUrl = this.AdminUrl + "?type=" + item.route;
      //this.boolBack = true;
      let data = {
        name: item.route,
        params: null,
        type: 1
      }
      if (item.route == "") {
        this.$router.push({
          name: 'home',
          params: data
        })
      } else {
        this.$router.replace({
          name: 'carIndex',
          params: data
        })
      }
    },
    // 右侧图例筛选
    async mapItemBtn (item) {
      item.isActive = !item.isActive
      if (item.isActive) {
        let newMapItems = this.mapItems.filter(v => {
          return !v.isActive
        })
        let result = []
        newMapItems.map(j => {
          result = this.markers.filter(item => item.type == j.type).concat(result)
        })
        let diffArr = await diffentArr(result, this.markers)
        for (let i of diffArr) {
          this.map.remove(i)
          // 从点聚合中移除
          this.cluster.removeMarker(i)
        }
      } else {
        let result = []
        result = this.markers.filter(i => i.type == item.type).concat(result)
        for (let i of result) {
          this.map.add(i)
          // 从点聚合中添加
          this.cluster.addMarker(i)
        }
      }
      // this.handleMarker()
    },
    //初始化地图
    init () {
      const that = this
      that.map = new AMap.Map('container', {
        center: that.$route.params.center,
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 9,
        mapStyle: 'amap://styles/darkblue',
        features: ['bg', 'road', 'building', 'point'], // 地图显示要素
        // showLabel: true //不显示地图文字标记
      })
      // AMap.plugin(['AMap.Scale'], () => {
      //   that.map.addControl(new AMap.Scale())
      // })
      // 输入提示
      let autoOptions = {
        input: "searchInput"
      }
      var auto = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: that.map
      }) //构造地点查询类
      AMap.event.addListener(auto, "select", select) //注册监听，当选中某条记录时会触发
      function select (e) {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name)  //关键字查询
      }
      // that.handleMarker()
    },
    // 地图点聚合方法
    pointCluster () {
      let that = this
      //console.log('当前===》',that.markers.length)
      let count = that.markers.length;
      const _renderClusterMarker = (context) => {
        // 根据总数配置自定义颜色
        // let factor = Math.pow(context.count / count, 1 / 18);
        let div = document.createElement('div');
        // let Hue = 180 - factor * 180;
        // let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
        // let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
        // let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
        // let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
        let shadowColor = 'hsla(201, 40%, 81%, 0.15)'
        div.style.backgroundColor = 'rgba(118,186,222,0.85)' // bgColor;
        let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        div.style.border = 'solid 1px rgba(214,241,255,1)'// borderColor;
        div.style.borderRadius = size / 2 + 'px';
        div.style.boxShadow = '0 0 1px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = '#FFFFFF';
        div.style.fontSize = '15px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div)
      };
      // 点聚合
      that.cluster = new AMap.MarkerClusterer(that.map, that.markers, {
        gridSize: 20,
        renderClusterMarker: _renderClusterMarker
      })
    },
    // 获取地图的点
    getMapMarkers () {
      let that = this
      for (let i = 0; i < this.mapData.length; i += 1) {
        let marker = new AMap.Marker({
          icon: this.mapData[i].type == 'people' ? that.peopleIcon : '' || this.mapData[i].type == 'car' ? that.carIcon : '' || this.mapData[i].type == 'site' ? that.positionIcon : '',
          position: this.mapData[i].center.split(','),
          offset: new AMap.Pixel(-13, -30)
        })
        marker.setMap(that.map)
        marker.switchId = this.mapData[i].switchId
        marker.type = this.mapData[i].type
        marker.name = this.mapData[i].name
        marker.graph = this.mapData[i].graph || ''
        marker.videoHref = this.mapData[i].videoHref || []
        // 给标记加一个点击事件，传入对应的参数
        marker.on('click', e => {
          const { type, name, videoHref, graph } = e.target
          // 车辆，人员暂不开放
          if (type == 'car' || type == 'people') {
            return false
          }
          that.modelData = { type, name }
          that.isPosition = type == 'site' ? true : false
          that.arrow_color = type == 'site' ? '#00CCA8' : '' || type == 'car' ? '#FFBE3F' : '' || type == 'people' ? '#FF454B' : ''
          that.videoHref = type == 'site' ? videoHref : []
          that.myGraph = type == 'site' ? graph : ''
          let infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: this.$refs.modelContent,
            offset: new AMap.Pixel(350, 0)
          })
          infoWindow.open(that.map, marker.getPosition())
          if (infoWindow.getIsOpen()) {
            that.isShow = 1
          }
        })
        that.markers.push(marker)
      }
      that.pointCluster() //点聚合
    },
    // 在地图上画出车辆标识点和线
    markAndLine (carData) {
      const that = this
      let newMarkerList = that.markers.filter(item => item.type == 'car')
      if (newMarkerList.length > 0) {
        for (let i of newMarkerList) {
          that.map.remove(i)
          that.cluster.removeMarker(i)
        }
      }
      let pathParam = JSON.parse(carData)
      let marker = null
      for (let it of pathParam) {
        let path1 = [];
        if (it.data.length > 0) {
          for (let i = 0; i < it.data.length; i++) {
            // 标记第一个点
            if (i == 0) {
              marker = new AMap.Marker({
                icon: that.carIcon,
                position: [it.data[i].jingDu, it.data[i].weiDu],
                offset: new AMap.Pixel(-13, -30)
              })
              marker.setMap(that.map)
              marker.type = 'car'
              that.markers.push(marker)
              that.map.add(marker)
              that.cluster.addMarker(marker)
            }
            path1.push([it.data[i].jingDu, it.data[i].weiDu])
          }
        }
        // path1.push([121.605229657942, 31.3238136816662])
        //轨迹划线
        let oldLine = new AMap.Polyline({
          path: path1,
          strokeWeight: 2,
          strokeOpacity: 1,
          strokeColor: 'red'
        })
        that.map.add(oldLine)
      }
    },
    // marker点击事件（方法已废弃）
    handleMarker () {
      const that = this
      that.map.clearMap() //清除地图覆盖物
      that.markers = []
      // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
      for (let i = 0; i < that.markers.length; i++) {
        let marker = new AMap.Marker({
          icon: that.markers[i].type == 'people' ? that.peopleIcon : '' || that.markers[i].type == 'car' ? that.carIcon : '' || that.markers[i].type == 'site' ? that.positionIcon : '',
          position: that.markers[i].center.split(','),
          offset: new AMap.Pixel(-13, -30)
        })
        marker.setMap(that.map)
        marker.switchId = that.markers[i].switchId
        marker.type = that.markers[i].type
        marker.name = that.markers[i].name
        marker.videoHref = that.markers[i].videoHref || []
        // 给标记加一个点击事件，传入对应的参数
        marker.on('click', e => {
          const { type, name, videoHref } = e.target
          if (type == 'car' || type == 'people') {
            return false
          }
          that.modelData = { type, name }
          that.isPosition = type == 'site' ? true : false
          that.arrow_color = type == 'site' ? '#00CCA8' : '' || type == 'car' ? '#FFBE3F' : '' || type == 'people' ? '#FF454B' : ''
          that.videoHref = type == 'site' ? videoHref : []
          let infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: this.$refs.modelContent,
            offset: new AMap.Pixel(350, 0)
          })
          infoWindow.open(that.map, marker.getPosition())
          if (infoWindow.getIsOpen()) {
            that.isShow = 1
          }
        })
        that.markers.push(marker)
      }
      let count = that.markers.length;
      const _renderClusterMarker = (context) => {
        let factor = Math.pow(context.count / count, 1 / 18);
        let div = document.createElement('div');
        let Hue = 180 - factor * 180;
        let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
        let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
        let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
        let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
        div.style.backgroundColor = bgColor;
        let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        div.style.border = 'solid 1px ' + borderColor;
        div.style.borderRadius = size / 2 + 'px';
        div.style.boxShadow = '0 0 1px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = fontColor;
        div.style.fontSize = '15px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div)
      };
      // 点聚合
      that.cluster = new AMap.MarkerClusterer(that.map, that.markers, {
        gridSize: 80,
        renderClusterMarker: _renderClusterMarker
      })
    },
    //限制地图显示范围
    lockMapBounds () {
      const qcMap = this.map
      let bounds = new AMap.Bounds(
        [121.919307, 31.501695],
        [121.025981, 30.960945]
      )
      qcMap.setLimitBounds(bounds)
    },
    //取消地图显示限制
    unlockMapBounds () {
      this.map.clearLimitBounds()
    },
    closeInfoWindow () {
      let that = this
      that.isShow = 0
      that.videoSrc = ''
      that.map.clearInfoWindow()
    },
    fullScreenWindow () {
      // var el = e.srcElement.parentElement.parentElement.children[1] || e.target.parentElement.parentElement.children[1]; //target兼容Firefox
      var el = this.$refs.middleRefs
      this.fullScreen(el)
    },
    fullScreen (el) {
      let isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      if (!isFullscreen) {
        //进入全屏,多重短路表达式
        (el.requestFullscreen && el.requestFullscreen()) ||
          (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
          (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
          (el.msRequestFullscreen && el.msRequestFullscreen())
      } else {
        //退出全屏,三目运算符
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : ''
      }
    },
    //播放视频
    playVideo (videoSrc) {
      this.videoSrc = videoSrc
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
.noticeCenter {
  position: absolute;
  padding-left: 20%;
  padding-top: 120px;
  z-index: 999;
}
/* 通知 */
.index-notice {
  background-image: url("../../assets/image/bigscreen/notice_bg.png");
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
.noticeStyle {
  width: 100%;
}
.qc_map {
  width: 100%;
  height: 100vh;
}
.header_box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999999;
}
.map_info {
  width: 150px;
  height: 175px;
  position: absolute;
  bottom: 63px;
  left: 77px;
  background: rgba(15, 32, 56, 1);
  border-top: 1px solid rgba(52, 209, 254, 1);
  border-bottom: 1px solid rgba(52, 209, 254, 1);
  z-index: 999;
  .info_word {
    font-size: 16px;
    color: #cfe9fc;
    margin-left: 21px;
  }
}
.info_box {
  position: absolute;
  top: 170px;
  right: 75px;
  .map_item {
    width: 120px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background: #30bfee;
    border: 1px solid rgba(48, 191, 238, 1);
    color: #001c38;
    z-index: 99999;
    cursor: pointer;
    margin-bottom: 11px;
  }
  .map_normal {
    border: 1px solid rgba(48, 191, 238, 1);
  }
  .map_active {
    background-color: #001c38 !important;
    color: #30bfee !important;
    border: 1px solid rgba(75, 90, 120, 1) !important;
  }
}
.search_box {
  position: absolute;
  top: 112px;
  left: 72px;
  z-index: 999;
  input {
    width: 280px;
    height: 39px;
    background: rgba(12, 56, 94, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    outline: none;
    border: none;
    color: #cfe9fc;
    padding: 0 10px;
  }
  input:focus {
    border: none;
  }
  input::-webkit-input-placeholder {
    color: #cfe9fc;
  }
  .search_img {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 8px;
    right: 15px;
  }
}
.content_box {
  width: 541px;
  // height: 350px;
  background: rgba(10, 59, 107, 1);
  border: 1px solid rgba(29, 183, 235, 1);
  z-index: 99999;
  position: absolute;
  bottom: 0;
  right: 100px;
}
.custom-info {
  width: 541px;
  // height: 350px;
  background: rgba(10, 59, 107, 1);
  border: 1px solid rgba(29, 183, 235, 1);
}
.info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  .titleD {
    display: flex;
    align-items: center;
    .title_name {
      font-size: 16px;
      font-weight: bold;
      color: #a9deff;
      margin-right: 10px;
    }
  }
}

.info-top div {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

.info-middle {
  font-size: 12px;
  // padding: 10px 6px;
  // line-height: 20px;
}

.info_arrow {
  position: absolute;
  bottom: 25px;
  left: -78px;
  margin: 0 auto;
}
.header_right_content {
  display: flex;
  .fullScreen_img {
    width: 18px;
    height: 18px;
    transition-duration: 0.25s;
    margin-right: 10px;
  }
  .close_img {
    width: 18px;
    height: 18px;
    transition-duration: 0.25s;
  }

  .fullScreen_img:hover,
  .close_img:hover {
    box-shadow: 0px 0px 5px #000;
    cursor: pointer;
  }
}
.info-middle img {
  float: left;
  margin-right: 6px;
}
.video_name {
  color: #cfe9fc;
  padding: 10px;
  border: 1px solid #cfe9fc;
  border-radius: 6px;
  margin-right: 12px;
  cursor: pointer;
}
</style>