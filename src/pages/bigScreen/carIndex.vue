<template>
  <div class="map_box" @click='noneTo()'>
    <img class="fanhuiStyle" @click="toback()" v-if="boolBack" src="../../assets/image/bigscreen/fanhui.png" />
    <div id="container" v-if="pageType=='map'" class="qc_map">
      <!-- 大屏顶部-->
      <!-- <div class="index-title f-between">
        <div class="flex_row_yCenter">
          <img width="20" height="20" style="margin: 0 7px 0 75px;"
            src="../../assets/image/bigscreen/icon_nav_mulu.png" />
          <img width="16" height="10" style="margin-right: 60px;" src="../../assets/image/bigscreen/icon_xiala.png" />
          <p class="time">{{time}}</p>
        </div>
        <img class="title" src="../../../assets/image/bigscreen/bigscreen/carHeader.png" />
        <div class="flex_row_yCenter">
          <img src="../../../assets/image/bigscreen/bigscreen/icon_nav_dingwei.png" />
          <p style="font-size: 18px; color: #EDF2F8;margin: 0 15px 0 5px;">{{location}}</p>
          <p style="font-size: 18px; color: #EDF2F8;">{{weather}}</p>
          <img style="margin-left:20px;" src="../../assets/image/bigscreen/icon_nav_zhuye.png" />
          <img style="margin-left:20px;" src="../../assets/image/bigscreen/icon_nav_uers.png" />
          <img style="margin: 0 132px 0 5px;" src="../../assets/image/bigscreen/icon_shouqi.png" />
        </div>
      </div> -->
      <indexTitle :img="headerImg" :hasImg="false" @itemClick="leftTitleClick" :mar="false" @tuichu="tuichu()"
        :listItem="listItem" :loginOutTo="loginOutTo" />
      <transition name="fade">
        <middleModel @closeModel="handleCloseModel" :title="middleTitle" :isShow="isShowMiddle">
          <!-- 模态框具体展示信息 -->
          <policyDetail v-if="popState==='left'" :topInfo="alertInfoTo" :listContent="alertTable"></policyDetail>
          <workOrderInfo v-if="popState==='right'" :workOrderData="workOrderData"></workOrderInfo>
        </middleModel>
      </transition>
      <!-- 右侧内容 -->
      <transition name="move-right">
        <div class="right_box" v-if="isRightOpen">
          <img class="animation_right_img" @click="animationRightImg" :src="this.isRightOpen ? zhanKaiIcon : shouQiIcon"
            alt="img">
          <carBgTab title="工单" bgWidth="430" bgHeight="550" :bgImg="carBg2" :TabList="rightTabList"
            @tabClick="tabRightClick">
            <div :style="{overflowY: overflowRight}" class="table_box right_style">
              <p v-for="(item, index, key) in workOrderList" :key="key" class="flex_row table_item"
                @click="toDetail(item, index)">

                <span style="color:#FF9228;width:35%;padding-left:4%;" class="text-eli">{{item.title}}</span>
                <span style="width:10%;" class="text-eli">{{item.UserName}}</span>
                <span style="width:30%;" class="text-eli">{{item.addtime}}</span>
                <transition name="fade">
                  <img v-show="item.showArrow" class="arrow_car" src="../../assets/image/bigscreen/car_arrow.png"
                    alt="img">
                </transition>
              </p>
            </div>
          </carBgTab>
          <carBgTab :title="teamName" bgWidth="430" bgHeight="310" style="margin-top: 20px;" :bgImg="carBg3">
            <div v-for="(item, key) in classList" :key="key">
              <p class="flex_row_yCenter teamStyle" :class="item.isSignIn==1?'c-active':'c-hidden'">
                <span class="flex_row_yCenter" style="width: 39%;">
                  <img style="margin-right:15px;" :src="item.isSignIn==1?img1:img2" alt="img">
                  <span class="text-eli" style="width: 100px;">{{item.name}}</span>
                  <p class="teamii" v-if="item.isManager==1">组长</p>
                </span>
                <span class="text-eli" style="width: 16%;">{{item.zhiye}} </span>
                <!-- <span :style="{color: item.job=='高压电工' ? '#FF771C' : '#08D167'}">{{item.job}}</span> -->
                <span class="text-eli" style="width: 30%;">{{item.phoneNo}}</span>
              </p>
            </div>
          </carBgTab>
        </div>
        <img v-else class="animation_right_img2" @click="animationRightImg"
          :src="this.isRightOpen ? zhanKaiIcon : shouQiIcon" alt="img">
      </transition>
      <!-- 左侧内容 -->
      <transition name="move-left">
        <div class="left_box" v-if="isLeftOpen">
          <img class="animation_left_img" @click="animationLeftImg" :src="this.isLeftOpen ? shouQiIcon : zhanKaiIcon"
            alt="img">
          <carBgTab title="实时报警" bgWidth="430" bgHeight="880" :bgImg="carBg1" @tabClick="tabClick"
            :TabList="leftTabList">
            <div :style="{overflowY: overflowLeft}" style="max-height: 700px; font-size: 16px;"
              class="table_box left_style">
              <p v-for="(item, key) in policyList" :key="key" class="flex_row table_item" @click="toPlicy(item,key)">
                <span style="width:26%;padding-right:2%;padding-left:2%" class="text-eli">{{item.alertEquip}}</span>
                <span style="color:#30BFEE;width:20%;" class="text-eli">{{item.alertResultType}}</span>
                <span style="width:20%" class="text-eli"
                  :style="{'color':item.state==='未转工单'?'#FF3333':'#08D167'}">{{item.state}}</span>
                <span style="width:30%" class="text-eli">{{item.addtime}}</span>
                <transition name="fade">
                  <img v-show="item.leftArror" class="left_arr" src="../../assets/image/bigscreen/car_arrow.png"
                    alt="img">
                </transition>
                <!-- <img v-if="item.leftArror"
                  style="position: absolute;transform:rotate(180deg);margin-left: 280px;margin-top: -66px;"
                  src="../../assets/image/bigscreen/car_arrow.png" /> -->
              </p>
            </div>
          </carBgTab>
        </div>
        <img v-else class="animation_left_img2" @click="animationLeftImg"
          :src="this.isLeftOpen ? shouQiIcon : zhanKaiIcon" alt="img">
      </transition>
      <!-- 中间通知消息 -->
      <div class="flex_row_center" @click="noticeClick()">
        <div class="index-notice flex_row_center"><img
            src="../../assets/image/bigscreen/icon_info.png" /><span>{{alertInfo}}</span></div>
      </div>
      <div class="map_info flex_column">
        <p style="color:#CFE9FC;font-size:16px;margin: 12px 0 15px 39px;">图例</p>
        <div class="flex_column_center">
          <p style="margin-bottom: 8px;"><img class="info_img" width="15" height="15"
              src="../../assets/image/bigscreen/icon_tuli_zhandian.png" alt="img" /><span class="info_word">站点</span>
          </p>
          <p style="margin-bottom: 8px;"><img class="info_img" width="15" height="18"
              src="../../assets/image/bigscreen/icon_tuli_danbing.png" alt="img" /><span class="info_word">人员</span></p>
          <p style="margin-bottom: 8px;"><img class="info_img" width="18" height="13"
              src="../../assets/image/bigscreen/icon_tuli_cheliang.png" alt="img" /><span class="info_word">车辆</span>
          </p>
        </div>
      </div>
      <div class="info_box flex_row">
        <div v-for="(item, index, key) in mapItems" class="map_item" :class="{map_active: item.isActive}" :key="key"
          @click="mapItemBtn(item)">
          {{item.name}}
        </div>
      </div>
      <!-- 地图模态弹窗 -->
      <div :style="{opacity: isShow}" ref="modelContent" class="custom-info">
        <div class="info-top">
          <div class="titleD">
            <span class="title_name">{{modelData.name}}</span>
          </div>
          <div class="header_right_content">
            <img class="fullScreen_img" @click="fullScreenWindow" src="../../assets/image/bigscreen/fullScreen.png"
              alt="img">
            <img class="close_img" @click="closeInfoWindow" src="../../assets/image/bigscreen/close.png" alt="img">
          </div>
        </div>
        <div class="info_middle flex_column">
          <div ref="middleRefs"
            style="margin-left: 13px; width: 280px; height: 191px; background-color: #30BFEE; opacity: 0.5;"></div>
          <div class="site_name">{{modelData.name}}</div>
          <p class="flex_row_yCenter site_des"><span style="margin-right: 10px;">客户联系人：王伟 </span><img width="18"
              height="18" src="../../assets/image/bigscreen/car_phone.png"> <span
              style="color: #30BFEE;">18336254121</span></p>
        </div>
        <div class="info_arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="154.625" height="50.375" viewBox="0 0 154.625 50.375">
            <path id="line" :style="{fill:arrow_color}"
              d="M152,26a6,6,0,0,1-5.91-5H36.546L5,64.383,3.386,63.2,35,19H146.09A6,6,0,1,1,152,26Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,152,16Z"
              transform="translate(-3.375 -14)" />
          </svg>
        </div>
      </div>
    </div>
    <!-- 后台管理 -->
    <!-- <template v-if="pageType=='admin'">
      <iframe class="admin-iframe" :src="adminUrl"></iframe>
    </template> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AMap from 'AMap' // 引入高德地图
import middleModel from '../../components/adminMap/middleModel.vue'
import carBgTab from '../../components/bgComponents/carBgTab.vue'
import workOrderInfo from '../../components/workerOrderInfo/index.vue'
import policyDetail from '../../components/workerOrderInfo/policyDetails.vue'
import indexTitle from '../../components/bgComponents/indexTitle.vue'
import { diffentArr } from '../../assets/js/common'


export default {
  name: "carIndex",
  computed: {
    ...mapState({
      alertInfo: state => state.BigScreen.alertInfo,
      mapData: state => state.mapData,
      mapDataCopy: state => state.mapDataCopy
    }),
    ...mapGetters('WS', {
      getSocket: 'onEvent'
    })
  },
  components: {
    middleModel,
    carBgTab,
    workOrderInfo,
    policyDetail,
    indexTitle
  },
  data () {
    return {
      img1: require("../../assets/image/bigscreen/icon_gongzuozhong.png"),
      img2: require("../../assets/image/bigscreen/icon_xiujia.png"),
      boolBack: false,
      alertInfoTo: {
        "equipFid": "",
        "alertEquip": "",
        "startTime": "",
        "timeDifference": "",
        "alertResultType": "",
        "yesOption": ""
      },
      listItem: [{
        id: 1,
        title: "管理平台",
        route: ""
      }],
      loginOutTo: false,
      alertTable: [],
      time: '2019-08-19 10:00:00',/* 时间 */
      pageType: "map",
      location: '上海',/* 地址位置 */
      weather: '晴22-30° 南风4-5级',/* 天气 */
      headerImg: require("../../assets/image/bigscreen/carHeader.png"),
      middleTitle: '',
      popState: '',
      map: null,
      isShowMiddle: false,
      testContent: 'test',
      isShow: 0, //model show
      isRightOpen: true,
      isLeftOpen: true,
      isPosition: false,
      showArrow: false,
      overflowRight: 'scroll',
      overflowLeft: 'scroll',
      carBg1: `url(${require('../../assets/image/bigscreen/img_car_bg1.png')})`,
      carBg2: `url(${require('../../assets/image/bigscreen/img_car_bg2.png')})`,
      carBg3: `url(${require('../../assets/image/bigscreen/img_car_bg3.png')})`,
      rightTabList: [{ title: '抢修工单', isDedult: true, type: 0 }, { title: '计划工单', isDedult: false, type: 1 }],
      leftTabList: [{ title: '告警', isDedult: true, type: 0 }, { title: '预警', isDedult: false, type: 1 }],
      qiangXiuList: [{
        content: '加枫路20号停电',
        name: '张晓鹏',
        time: '09:22:00',
        showArrow: false
      }],
      teamName: '',
      workOrderList: [],
      classList: [],
      modelData: {
        name: '',
        type: ''
      },
      videoHref: [],
      videoSrc: '',
      mapItems: [{
        name: '站点',
        type: 'site',
        isActive: false
      }, {
        name: '人员',
        type: 'people',
        isActive: false
      }, {
        name: '车辆',
        type: 'car',
        isActive: false
      }],
      policyList: [{
        content: '加枫路20号1#主变',
        xinhao: '事故信号',
        status: '已转工单',
        state: 1,
        leftArror: false,
        time: '09:22:00'
      }],
      peopleIcon: require('../../assets/image/bigscreen/biaoji_people.png'),
      positionIcon: require('../../assets/image/bigscreen/biaoji_site.png'),
      carIcon: require('../../assets/image/bigscreen/biaoji_car.png'),
      mikeIcon: require('../../assets/image/bigscreen/icon_mike.png'),
      shouQiIcon: require('../../assets/image/bigscreen/img_shouqi.png'),
      zhanKaiIcon: require('../../assets/image/bigscreen/img_zhankai.png'),
      markers: [],
      dataMarker: [],
      arrow_color: '#0A3B6B',
      notice: '加枫路20号1#配变信号异常',
      workOrderData: {
        type: '计划工单',
        lever: 'T1',
        userName: '全程上海总部',
        portNam: '上海厂区',
        classBand: '运维A组',
        principal: '张三',
        startTime1: '2019-7-30 16:01:28',
        endTime1: '2019-7-30 20:01:28',
        maintenDevice: '1#变压器 2#变压器 3#变压器',
        description: '更换绕组',
        workCase: '已完成',
        checkCase: '已完成',
        startTime2: '2019-7-30 16:01:28',
        endTime2: '2019-7-30 20:01:28',
        realExecute: '运维A组负责人张三',
        checkTime: '2019-7-30 20:01:28',
        checkFeedback: '对现场进行勘察，并妥善消缺',
        accessory: []
      },
      carId: '6e09f918_d4ef_4f27_8ed3_ab4800f5f488'
    }
  },
  async created () {
    let self = this
    //先dispach，再拿到userid
    this.$store.dispatch('getCuruserId')
    await this.$store.dispatch('getMaps')
    this.init()
    this.getCarHomeLeftList(0);
    this.getCarHomeRightList(0);
    this.getTeamMember();
    if (this.$route.params.type) {
      this.boolBack = true
    }



  },
  watch: {
    getSocket: function (a, b) {
      // console.log(a, '============', b)
      if (a !== b && a) {


        // console.log("触发事件：");
        // console.log("a:"+JSON.stringify(a));
        // console.log("b:"+JSON.stringify(b));
      }
    }
  },
  mounted () {

  },
  methods: {
    // 实时报警切换
    tabClick (item) {
      this.getCarHomeLeftList(item)
      this.isShowMiddle = false
      this.workOrderList.map(item => item.showArrow = false)
      this.policyList.map(item => item.leftArror = false)
    },
    // 工单切换
    tabRightClick (item) {
      //item == 1 ? this.currentList = this.jiHuaList : this.currentList = this.qiangXiuList
      this.workOrderList.map(item => item.showArrow = false)
      this.isShowMiddle = false
      this.policyList.map(item => item.leftArror = false)
      this.getCarHomeRightList(item);
    },
    // 获取车载左侧实时报警列表数据
    getCarHomeLeftList (type) {
      let params = {
        alertType: type,
        userFid: this.$store.state.curuserId
      };
      this.$store.dispatch("BigScreen/getCarHomeLeftList", params).then((res) => {
        this.policyList = [];
        if (res) {
          for (let it of res.alertList) {
            let item = {
              fid: it.fid,
              alertEquip: it.alertEquip,
              alertResultType: it.alertResultType,
              state: it.state,
              addtime: it.addtime,
              leftArror: false
            }
            this.policyList.push(item)
          }
        }
      });
    },
    // 报警详情数据
    getCarHomeLeftDetails (alertFid) {
      let params = {
        timeNum: '2',
        alertFid: alertFid
      };
      this.$store.dispatch("BigScreen/getCarHomeLeftDetails", params).then((res) => {
        if (res) {
          this.alertInfoTo = res.returnInfo.alertInfo[0]
          this.alertTable = res.returnInfo.alertTable
        }
      })
    },
    // 获取车载右侧实时工单数据
    getCarHomeRightList (orderType) {

      let params = {
        orderType: orderType,
        userFid: this.$store.state.curuserId
      };
      this.$store.dispatch("BigScreen/getCarHomeRightList", params).then((res) => {
        this.workOrderList = [];
        if (res) {
          for (let it of res.orderList) {
            let item = {
              fid: it.fid,
              title: it.title,
              UserName: it.UserName,
              addtime: it.addtime,
              showArrow: false
            }
            this.workOrderList.push(item)
          }
        }
      });
    },
    // 工单详情数据
    getCarHomeRightDetails (orderFid) {
      let params = {
        orderFid: orderFid
      };
      this.$store.dispatch("BigScreen/getCarHomeRightDetails", params).then((res) => {

        if (res) {
          let it = res.returnInfo.worderInfo;
          this.workOrderData = {
            type: it.type,
            lever: it.level,
            userName: it.clientName,
            portNam: it.siteName,
            classBand: it.teameName,
            principal: it.teamLeader,
            startTime1: it.startTime,
            endTime1: it.endTime,
            maintenDevice: it.equName,
            description: it.remarks,
            workCase: it.state,
            checkCase: it.ysState,
            startTime2: it.startTime,
            endTime2: it.endTime,
            realExecute: it.person,
            checkTime: it.yanshoutime,
            checkFeedback: it.workOrderDesc,
            accessory: it.fileHref
          }
        }

      });
    },
    // 获取车载右侧班组成员
    getTeamMember () {
      //console.log('当前按==》' + this.$store.state.curuserId)
      let params = {
        userFid: this.$store.state.curuserId
      };
      this.$store.dispatch("BigScreen/getTeamMember", params).then((res) => {

        if (res) {
          this.teamName = res.teamName;
          this.classList = res.teamPrList;
        }

      });
    },
    leftTitleClick (item) {
      //console.log(JSON.stringify(item),'和哈哈哈')
      let data = {
        name: item.route,
        params: null,
        type: 2
      }
      this.$router.push({
        name: "home",
        params: data
      })
    },
    tuichu () {
      this.loginOutTo = true
    },
    async toback () {
      // this.pageType = 'map'
      // await this.$store.dispatch('BigScreen/getMaps')
      // this.init();
      // this.boolBack = false;
      let data = {
        pathName: 'toHome'
      };
      this.$router.replace({
        name: "bigIndex",
        params: data
      })
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
    handleCloseModel () {
      this.isShowMiddle = false
      this.overflowRight = 'scroll'
      this.workOrderList.map(item => item.showArrow = false)

      this.policyList.map(item => item.leftArror = false)

    },
    noneTo () {
      this.loginOutTo = false
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
    //初始化
    init () {
      const that = this
      // || [121.5246784687, 31.228610076]
      that.map = new AMap.Map('container', {
        center: [121.5246784687, 31.228610076],
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
      // let autoOptions = {
      //   input: "searchInput"
      // }
      // var auto = new AMap.Autocomplete(autoOptions);
      // var placeSearch = new AMap.PlaceSearch({
      //   map: that.map
      // }) //构造地点查询类
      // AMap.event.addListener(auto, "select", select) //注册监听，当选中某条记录时会触发
      // function select (e) {
      //   placeSearch.setCity(e.poi.adcode)
      //   placeSearch.search(e.poi.name)  //关键字查询
      // }

      //  let marker = new AMap.Marker({
      //   icon: that.carIcon,
      //   position:[121.6012400000,31.3161133333],
      //   offset: new AMap.Pixel(-13, -30) //icon定位
      //  })

      // console.log(JSON.stringify(this.mapData))
      for (let i = 0; i < this.mapData.length; i += 1) {

        // let div = document.createElement('div')
        // let htmlData = `
        //   <div class='flex_row_center' style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">
        //   </div>`
        // div.innerHTML = htmlData
        let marker = new AMap.Marker({
          icon: this.mapData[i].type == 'people' ? that.peopleIcon : '' || this.mapData[i].type == 'car' ? that.carIcon : '' || this.mapData[i].type == 'site' ? that.positionIcon : '',
          position: this.mapData[i].center.split(','),
          offset: new AMap.Pixel(-13, -30) //icon定位
        })
        marker.setMap(that.map)
        marker.switchId = this.mapData[i].switchId
        marker.type = this.mapData[i].type
        marker.name = this.mapData[i].name
        marker.videoHref = this.mapData[i].videoHref || []
        // 给标记加一个点击事件，传入对应的参数
        marker.on('click', e => {
          const { type, name, videoHref } = e.target
          // 车辆，人员暂不开放
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
            offset: new AMap.Pixel(239, 110) //弹窗定位
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
        gridSize: 80,
        renderClusterMarker: _renderClusterMarker
      })
    },
    //限制地图显示范围
    lockMapBounds () {
      const qcMap = this.map
      let bounds = new AMap.Bounds([121.919307, 31.501695], [121.025981, 30.960945])
      qcMap.setLimitBounds(bounds)
    },
    //取消地图显示限制
    unlockMapBounds () {
      this.map.clearLimitBounds()
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
    closeInfoWindow () {
      let that = this
      that.isShow = 0
      that.videoSrc = ''
      that.map.clearInfoWindow()
    },
    animationRightImg () {
      this.isRightOpen = !this.isRightOpen
    },
    animationLeftImg () {
      this.isLeftOpen = !this.isLeftOpen
    },
    toDetail (item) {
      this.middleTitle = "工单详细信息";
      this.popState = "right";
      this.workOrderList.map(item => item.showArrow = false)
      this.policyList.map(item => item.leftArror = false)
      item.showArrow = true
      this.overflowRight = 'hidden'
      this.overflowLeft = 'scroll'
      this.testContent = item.content
      this.isShowMiddle = true

      this.getCarHomeRightDetails(item.fid);

    },
    toPlicy (item) {
      this.middleTitle = "告警分析";
      this.popState = "left";
      this.policyList.map(item => item.leftArror = false)
      this.workOrderList.map(item => item.showArrow = false)
      item.leftArror = true
      this.overflowLeft = 'hidden'
      this.overflowRight = 'scroll'
      this.testContent = item.content
      this.isShowMiddle = true

      this.getCarHomeLeftDetails(item.fid)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fanhuiStyle {
  position: absolute;
  z-index: 999999;
  top: 12px;
  left: 60px;
}
.admin-iframe {
  width: 100%;
  height: 1080px;
  background-color: #ffffff;
}
.qc_map {
  width: 100%;
  height: 100vh;
  position: relative;
  .right_box {
    width: 431px;
    z-index: 999;
    position: absolute;
    right: 10px;
    top: 159px;
  }
  .left_box {
    width: 431px;
    z-index: 999;
    position: absolute;
    left: 10px;
    top: 159px;
  }
  .animation_right_img {
    width: 28px;
    height: 90px;
    z-index: 999;
    position: absolute;
    left: -28px;
    bottom: 146px;
  }
  .animation_right_img:hover,
  .animation_right_img2:hover,
  .animation_left_img:hover,
  .animation_left_img2:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  .animation_right_img2 {
    width: 28px;
    height: 90px;
    z-index: 999;
    position: absolute;
    right: 0;
    top: calc(50% - 45px);
  }
  .animation_left_img {
    width: 28px;
    height: 90px;
    z-index: 999;
    position: absolute;
    right: -28px;
    bottom: 146px;
  }
  .animation_left_img2 {
    width: 28px;
    height: 90px;
    z-index: 999;
    position: absolute;
    left: 0;
    top: calc(50% - 45px);
  }
}
.header_box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
}
.map_info {
  width: 150px;
  height: 142px;
  position: absolute;
  bottom: 63px;
  left: 77px;
  background: rgba(15, 94, 146, 0.5);
  border-top: 1px solid rgba(52, 209, 254, 1);
  border-bottom: 1px solid rgba(52, 209, 254, 1);
  z-index: 98;
  .info_word {
    font-size: 16px;
    color: #cfe9fc;
    margin-left: 21px;
  }
}
.info_box {
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
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
    margin-right: 11px;
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
  width: 306px;
  // height: 350px;
  background: rgba(10, 59, 107, 1);
  border: 1px solid rgba(29, 183, 235, 1);
  z-index: 90;
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
  .site_name {
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 10px 0 10px 15px;
  }
  .site_des {
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
    margin: 0 10px 10px 15px;
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
/* 通知 */
.index-notice {
  background-image: url("../../assets/image/bigscreen/notice_bg.png");
  width: 1000px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #d9424d;
  z-index: 100;
  position: absolute;
  top: 100px;
}
.index-notice span {
  margin-left: 10px;
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
.table_item {
  justify-content: space-around;
  font-size: 16px;
  color: #b1c2d8;
  padding: 10px 0;
  position: relative;
  .arrow_car {
    position: absolute;
    top: -55px;
    left: -193px;
    transform: rotateX(180deg);
  }
  .left_arr {
    position: absolute;
    top: -55px;
    left: 360px;
    transform: rotate(180deg);
  }
}

.table_item:hover {
  background: #1471ae;
  transition: all ease 0.8s;
  opacity: 0.8;
  cursor: pointer;
}
.table_box {
  max-height: 390px;
  width: 100%;
  position: absolute;
  top: 150px;
}
.left_style {
  margin: -55px 230px 0 0;
  padding: 55px 230px 0 0;
}
.right_style {
  margin: -55px 0 0 -230px;
  padding: 55px 0 0 230px;
}
.table_box::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

// .table_box::-webkit-scrollbar-thumb {
//   background-color: #1471ae;
// }

/* 顶部的title样式 */
.index-title {
  width: 100%;
  height: 80px;
  background-image: url("../../assets/image/bigscreen/img_nav_carBg.png");
  position: relative;
  z-index: 100;
}

/* 顶部左边 */
.time {
  font-size: 18px;
  font-family: HYXiaoBoHuaYueYuan;
  font-weight: bold;
  color: rgba(237, 242, 248, 1);
}

.move-right-enter-active {
  transition: all 0.8s;
  animation: show-in 0.8s;
}

.move-right-leave-active {
  transition: all 0.8s;
  animation: show-out 0.8s;
}
.move-right-enter,
.move-right-leave-to {
  opacity: 0;
}
.move-left-enter-active {
  transition: all 0.8s;
  animation: show-in-left 0.8s;
}

.move-left-leave-active {
  transition: all 0.8s;
  animation: show-out-left 0.8s;
}
.move-left-enter,
.move-left-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.text-eli {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@keyframes show-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes show-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
@keyframes show-in-left {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes show-out-left {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
.teamStyle {
  margin-left: 10px;
  justify-content: space-around;
  font-size: 16px;
  margin-bottom: 15px;
}
.teamii {
  width: 28px;
  height: 16px;
  background: rgba(255, 51, 51, 1);
  border-radius: 2px;
  text-align: center;
  font-size: 12px;
  color: #ffe9e9;
}
.c-active {
  color: #30bfee;
}
.c-hidden {
  color: #b1c2d8;
}
</style>
