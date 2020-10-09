<template>
  <div class="map_box">
    <div id="container"
         class="qc_map position_relative">
      <div class="search_box">
        <input ref="searchInput"
               v-model="inputVal"
               type="text"
               placeholder="搜索电站"
               maxlength="20" />
        <img class="search_img"
             src="../../assets/image/search.png"
             alt="img">
      </div>
      <!-- 地图模态弹窗 -->
      <div :style="{opacity: isShow}"
           ref="modelContent"
           class="custom-info">
        <div class="info-top">
          <div class="titleD">
            <span class="title_name">{{modelData.name}}</span>
          </div>
          <div class="header_right_content">
            <img class="close_img"
                 @click="closeInfoWindow"
                 src="../../assets/image/close.png"
                 alt="img">
          </div>
        </div>
        <div class="info_middle flex_column">
          <div style="margin-left: 13px; width: 280px; height: 191px; background-color: #30BFEE; opacity: 0.5;"></div>
          <p class="flex_row_yCenter site_des"
             style="margin-top: 10px;"><span style="margin-right: 10px;">客户联系人：王伟 </span><img width="18"
                 height="18"
                 src="../../assets/image/car_phone.png"> <span style="color: #30BFEE;">18336254121</span></p>
          <p class="flex_row_yCenter site_des"><span style="margin-right: 3px;">待确认警告：</span><span style="color:#FF771C;font-size:bold;">2</span></p>
          <p class="flex_row_yCenter site_des"><span style="margin-right: 3px;">待消除缺陷：</span> <span style="color:#FF771C;font-size:bold;">5</span></p>
          <div class="flex_row"
               style="margin: 5px 15px 10px 15px; justify-content: space-around;">
            <div class="middle_btn"
                 v-for="(item, key) in middleInfo"
                 :key="key"
                 @click="middleBtn(item)">{{item.name}}</div>
          </div>
        </div>
        <div class="info_arrow">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="154.625"
               height="50.375"
               viewBox="0 0 154.625 50.375">
            <path id="line"
                  :style="{fill:arrow_color}"
                  d="M152,26a6,6,0,0,1-5.91-5H36.546L5,64.383,3.386,63.2,35,19H146.09A6,6,0,1,1,152,26Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,152,16Z"
                  transform="translate(-3.375 -14)" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
export default {
  name: "adminMap",
  computed: {
  },
  components: {
  },
  data () {
    return {
      map: null,
      inputVal: '',
      isShow: 0, //model show
      isPosition: false,
      modelData: {
        name: '',
        type: ''
      },
      positionIcon: require('../../assets/image/admin_map_circle.png'),
      markers: [],
      dataMarker: [],
      middleInfo: [{
        name: '电力监控',
        route: ''
      }, {
        name: '变压器监测',
        route: ''
      }, {
        name: '设备资产',
        route: ''
      }],
      arrow_color: '#008DED'
    }
  },
  created () {
    // console.log(this.$route.params.center, 'center')
  },
  async mounted () {
    await this.$store.dispatch('getMaps')
    this.markers = this.$store.state.mapData.cell
    this.dataMarker = this.$store.state.mapDataCopy
    this.init()
  },
  methods: {
    //初始化
    init () {
      const that = this
      that.map = new AMap.Map('container', {
        center: this.$route.params.center || [121.5983748436, 31.1962651835],
        resizeEnable: true,
        zoom: 15,
        mapStyle: "amap://styles/darkblue",
        // features: ['bg', 'road', 'building', 'point'], // 地图显示要素
        // showLabel: true //不显示地图文字标记
      })
      that.handleMarker()
    },
    // marker点击事件
    handleMarker () {
      const that = this
      that.map.clearMap() //清除地图覆盖物
      // let markerContent = `<div class="circle_marker"></div>`
      // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
      for (let i = 0; i < that.markers.length; i++) {
        let marker = new AMap.Marker({
          icon: that.positionIcon,
          position: that.markers[i].addr,
          offset: new AMap.Pixel(-13, -30)
        })
        marker.setMap(that.map)
        marker.switchId = that.markers[i].switchId
        marker.type = that.markers[i].type
        marker.name = that.markers[i].name
        marker.videoHref = that.markers[i].videoHref || []
        // 给标记加一个点击事件，传入对应的参数
        marker.on('click', (e) => {
          const { type, name, videoHref } = e.target
          that.modelData = { type, name }
          // that.isPosition = type == 'site' ? true : false
          // that.arrow_color = type == 'site' ? '#f79f00' : '' || type == 'car' ? '#ff3333' : '' || type == 'people' ? '#30bfee' : ''
          that.videoHref = type == 'site' ? videoHref : []
          let infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: this.$refs.modelContent,
            offset: new AMap.Pixel(230, 120)
          });
          infoWindow.open(that.map, marker.getPosition())
          if (infoWindow.getIsOpen()) {
            that.isShow = 1
          }
        })
      }
    },
    closeInfoWindow () {
      let that = this
      that.isShow = 0
      that.videoSrc = ''
      that.map.clearInfoWindow()
    },
    middleBtn () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.qc_map {
  width: 100%;
  height: 618px;
}
.circle_marker {
  width: 20px;
  height: 20px;
  background: rgba(0, 141, 237, 1);
  border: 1px solid rgba(24, 166, 255, 1);
  border-radius: 50%;
  z-index: 999;
}
.map_info {
  width: 150px;
  height: 175px;
  position: absolute;
  bottom: 63px;
  left: 77px;
  background: rgba(15, 94, 146, 0.5);
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
    background: rgba(15, 32, 56, 1);
    border: 1px solid rgba(48, 191, 238, 1);
    color: #30bfee;
    z-index: 99999;
    cursor: pointer;
    margin-bottom: 11px;
  }
  .map_normal {
    border: 1px solid rgba(48, 191, 238, 1);
  }
  .map_active {
    border: 1px solid rgba(75, 90, 120, 1) !important;
  }
}
.search_box {
  position: absolute;
  top: 86px;
  left: 26px;
  z-index: 99999;
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
  width: 100%;
  // height: 350px;
  background: rgba(10, 59, 107, 1);
  border: 1px solid rgba(29, 183, 235, 1);
  z-index: 99999;
  position: absolute;
  bottom: 0;
  right: 100px;
}
.custom-info {
  width: 306px;
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

.info_middle {
  font-size: 12px;
  .site_des {
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
    margin: 0 10px 5px 15px;
  }
  .middle_btn {
    width: 75px;
    text-align: center;
    border: 1px solid rgba(69, 179, 255, 1);
    color: rgba(69, 179, 255, 1);
    padding: 5px;
    cursor: pointer;
  }
  .middle_btn:hover {
    background: rgba(69, 179, 255, 1);
    color: #fff;
    transition: all ease 0.5s;
  }
}

.info_arrow {
  position: absolute;
  bottom: 133px;
  left: -85px;
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
