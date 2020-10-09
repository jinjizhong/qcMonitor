<template>
  <div>
    <img class="fanhuiStyle" @click="toback()" v-if="boolBack" src="../../assets/image/bigscreen/fanhui.png" />
    <div class="header_content">
      <img :style="{marginLeft:boolBack?'66px':'34px'}" src="../../assets/image/home/img_logo.png" alt="img">
      <div class="header_middle">
        <div class="menu_item" v-for="(item, key) in menuJson" :key="key" @click="headerMenu(item)">
          <span class="menu_item_name">{{item.name}}</span>
          <div v-show="item.checked" class="line"></div>
        </div>
      </div>
      <div class="header_right">
        <div class="bell_content" @mouseover="mouseOverBell" @mouseleave="mouseLeaveBell">
          <img src="../../assets/image/home/icon_bell.png" alt="img">
          <div class="red_pot">
            <span>{{bellNum}}</span>
          </div>
          <div class="hover_bell_content" v-show="showBellContent">
            <div style="position: absolute; left: 0; top: -23px; width: 100%; height: 23px;"></div>
            <div>
              <div class="flex_row" style="margin-bottom: 15px;">
                <img src="../../assets/image/home/icon_inf_tz.png" alt="img">
                <p @click="toPersonalCenter" class="bell_item_span1">通知</p>
                <p class="bell_item_span2">({{notice.amount}})</p>
              </div>
              <div style="border-bottom: 1px solid #ECECEC;">
                <div class="item_words_box" v-for="(alert,key) in notice.detail" :key="key">
                  <p class="item_word">{{alert.alertLevel}}：{{alert.alertInfo}}</p>
                  <p class="item_words_time">{{alert.alertTime}}</p>
                </div>
              </div>
            </div>
            <div>
              <div class="flex_row" style="margin: 15px 0;">
                <img src="../../assets/image/home/icon_inf_qjzn.png" alt="img">
                <p class="bell_item_span1">情景智能</p>
                <p class="bell_item_span2">({{qingjing.amount}})</p>
              </div>
              <div style="border-bottom: 1px solid #ECECEC;">
                <div class="item_words_box" v-for="(alert,key) in qingjing.detail" :key="key">
                  <p class="item_word">{{alert.alertLevel}}：{{alert.alertInfo}}</p>
                  <p class="item_words_time">{{alert.alertTime}}</p>
                </div>
              </div>
            </div>
            <div>
              <div class="flex_row" style="margin: 15px 0;">
                <img src="../../assets/image/home/icon_inf_bj.png" alt="img">
                <p class="bell_item_span1" @click="toGaojin">报警</p>
                <p class=" bell_item_span2">({{newAlertList.amount}})</p>
              </div>
              <div>
                <div class="item_words_box" v-for="(alert,key) in newAlertList.detail" :key="key"
                  @click="toGaojin(alert)">
                  <p class="item_word">{{alert.alertLevel}}：{{alert.alertInfo}}</p>
                  <p class="item_words_time">{{alert.alertTime}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_row" style="position:relative" @mouseover="mouseOverUserInfo" @mouseleave="mouseLeaveUserInfo">
          <img src="../../assets/image/home/icon_user.png" alt="img">
          <span class="user_name">{{userInfo.realName}}</span>
          <div class="user_info_content" v-if="showUserName">
            <div style="position: absolute; left: 0; top: -15px; width: 100%; height: 15px;"></div>
            <p @click="toPersonalCenter" class="user_info_item">个人中心</p>
            <p @click="changePsd" class="user_info_item">个人设置</p>
            <p @click="logOut" class="user_info_item">注销登出</p>
            <!-- <p @click="test" class="user_info_item">Test</p> -->
          </div>
        </div>
        <p style="margin-left: 28px; min-width: 155px"></p>
        <p class="now_time">{{nowTime}}</p>
      </div>
    </div>
    <div class="main_content">
      <div :class="{left_side_expand: isExpand, left_side_shrink: !isExpand}">
        <div class="header">
          <img class="expand_img" :src="expandImg" alt="img" @click="expandLeft">
        </div>
        <div v-for="(menu, key) in menuList" :key="key" class="left_item"
          :class="{ left_item_default: !menu.isLeftActive, left_item_active: menu.isLeftActive }" @click="toItem(menu)"
          @mouseover="mouseOver(menu)" @mouseleave="mouseLeave(menu)">
          <img :src="menuIcon[menu.name]" alt="img">
          <span v-show="isExpand">{{menu.name}}</span>
          <div class="child_content" v-show="menu.showChild && menu.children.length > 0">
            <div class="block_area"></div>
            <div style="width:100%;" v-for="(item, key) in menu.children" :key="key">
              <p class="child_name" @click.stop="toMenuItem(item)">{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right_side grey_bg" :style="{backgroundColor: this.currentPage=='AdminHome' ? '#021331' : ''}">
        <!-- 标签功能模块 -->
        <div class="tag_box">
          <div :class="{tag_item: tag.isActive, tag_item_default: !tag.isActive}" v-for="(tag, key) in tagList"
            :key="key" @click="toTag(tag)">
            <span class="tag_name">{{tag.name}}</span>
            <img @click.stop="closeTag(tag)" class="tag_close" :src="tag.isActive ? closeSrc : closeSrcDefault"
              alt="img">
          </div>
          <div class="tag_item tag_xx" @mouseover="mouseOverXx" @mouseleave="mouseLeaveXx">
            <span style="margin-right: 5px">标签选项</span>
            <img :src="showXx ? xxzhankai : xxshouqi" alt="img">
            <div class="xx_content" v-if="showXx">
              <p @click="closeAll" class="xx_item">关闭所有页</p>
              <p @click="closeNow" class="xx_item" style="margin: 10px 0;">关闭当前页</p>
              <p @click="closeOther" class="xx_item">关闭其他页</p>
            </div>
          </div>
        </div>
        <!-- 打开每个功能页面 -->
        <!-- <transition name="fade"> -->
        <!-- v-if="isMyComponent" -->
        <template v-for="(item,key) in tagList">
          <template v-if="item.href">
            <component :key="key" v-show="item.isActive"
              :class="[{ component_style: !item.href }, { iframe_box: item.href}]" :is="item.routeName"
              :pageSrc="item.href" :needRefresh="needRefresh" />
          </template>
        </template>
        <keep-alive :exclude="excludeComponent" :max="5">
          <component v-if="!pageSrc" class="component_style" :is="currentPage"></component>
        </keep-alive>
        <!-- <component :class="[{ component_style: !this.pageSrc }, { iframe_box: this.pageSrc}]" :is="currentPage"
              :pageSrc="pageSrc">
            </component> -->
        <!-- </keep-alive> -->
        <!-- <keep-alive v-if="!isMyComponent">
            <component class="component_style" v-bind:is="currentPage"></component>
            <iframe class="iframe_box" :src="pageSrc" scrolling="auto" ref="iframe" frameborder="0"></iframe>
          </keep-alive> -->

        <!-- </transition> -->
        <!-- <slot></slot> -->
      </div>
    </div>
    <!-- 快捷入口内容 -->
    <div class="float_content" @mouseover="mouseOverFast" @mouseleave="mouseLeaveFast">
      <div class="hover_float_content" v-show="showFastContent">
        <div>
          <span class="choose_label">选择公司</span>
          <select name="company-choice" v-model="companyId" class="common_choice" @change="handleClient">
            <option class="common_choice_item" v-for="item in userClients" :key="item.clientId" :value="item.clientId">
              {{item.clientName}}
            </option>
          </select>
        </div>
        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">快捷入口</p>
          <div class="item_fast_box">
            <div class="fast_btn" v-for="(item, key) in quickEntryList" :key="key" @click="toMenuItem(item)">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 个人设置 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisiblePwd" width="25%" :before-close="handleClose">
      <div class="flex_column_yCenter">
        <div style="margin-bottom: 10px;" class="flex_row_yCenter">
          <div class="pwd_label">原密码：</div>
          <el-input class="pwd_input" v-model="oldPwd" placeholder="请输入原密码" show-password></el-input>
        </div>
        <div style="margin-bottom: 10px;" class="flex_row_yCenter">
          <div class="pwd_label">新密码：</div>
          <el-input class="pwd_input" v-model="newPwd" placeholder="请输入新密码" show-password></el-input>
        </div>
        <div class="flex_row_yCenter">
          <div class="pwd_label">确认密码：</div>
          <el-input class="pwd_input" v-model="confirmNewPwd" placeholder="请输入确认密码" show-password></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { menuIcon, anaTypeData } from '../../assets/js/config'
import { formatTime } from '../../assets/js/common.js'
// import AdminHome from '../adminHome/index'
import AdminHome from '../adminHome/kehuIndex'
// 电力监控
import Dianlijiance from '../dianlijiankong/index'
// 运行监测
import Dianliujc from '../runningMonitor/dianliujc'
import Dianyajc from '../runningMonitor/dianyajc'
import Gonglvjc from '../runningMonitor/gonglvjc'
import Gonglvysjc from '../runningMonitor/gonglvysjc'
import Xuliangjc from '../runningMonitor/xuliangjc'
import Gaojingjc from '../runningMonitor/gaojingjc'
// 设备监测
import Dianrongqi from '../deviceMonitor/dianrongqi'
import Bianyaqi from '../deviceMonitor/bianyaqi'
import Duanluqi from '../deviceMonitor/duanluqi'
// 运维分析
import Gongdanfx from '../operationManage/orderAnalysis'
import Yunweibaojingfx from '../operationManage/yunweiPolicy'
import Kehubaojingfx from '../operationManage/kehuPolicy'
import Jiankangdufx from '../operationManage/healthAnalysis'
// 动环监控
import Zhandianjc from '../dongHuan/siteChoose'
// 智能安防
import Shishishipin from '../Security/monitorTo'
// 运维管理
import Zhinengxunjian from '../Security/zhinengXunjian'
import OrderManage from '../Security/orderManage'
// 能效管理
import Nengxiaoshouye from '../energyManage/mainKehu'
import Nengxiaoyunweishouye from '../energyManage/mainYunwei'
import Dianfeifx from '../energyManage/dianfei'
import Bianyaqifx from '../energyManage/sunhaofenxi'
import Dianyapiancha from '../energyManage/dianyapiancha'
import Sangxiangbupingheng from '../energyManage/sanxiang'
import Xiebofx from '../energyManage/xiebofenxi'
// 个人中心
import PersonalCenter from '../Security/personalCenter'
import Reportclient_NX from '../energyManage/report/reportNx'
import Reportclient_YW from '../energyManage/report/reportYw'
import Report_YW_Insider from '../energyManage/report/reportYwInsider'
import Report_NX_Insider from '../energyManage/report/reportNxInsider'

// 以下是iframe页面
import Yekuogl from '../iframePage/Yekuogl'
import Xunjiangl from '../iframePage/Xunjiangl'
import Caozuopiaogl from '../iframePage/Caozuopiaogl'
import Report_YW from '../iframePage/ReportYW'
import Report_NX from '../iframePage/ReportNX'
import Kehufuwu from '../iframePage/Kehufuwu'
import Myyekuo from '../iframePage/Myyekuo'
import Myjiaojieban from '../iframePage/Myjiaojieban'
import Myshenhe from '../iframePage/Myshenhe'
import Operationlogs from '../iframePage/Operationlogs'
import Systemclass from '../iframePage/Systemclass'
import Baseclass from '../iframePage/Baseclass'
import Zhenjiangl from '../iframePage/Zhenjiangl'
import Shenhepz from '../iframePage/Shenhepz'
import Hetonggl from '../iframePage/Hetonggl'
import Teamgl from '../iframePage/Teamgl'
import Sitegl from '../iframePage/Sitegl'
import Clientgl from '../iframePage/Clientgl'
import Companynews from '../iframePage/Companynews'
import Bannergl from '../iframePage/Bannergl'
import Zhibangl from '../iframePage/Zhibangl'
import Bukonggl from '../iframePage/Bukonggl'
import Zutaigongju from '../iframePage/Zutaigongju'
import Caijishebei from '../iframePage/Caijishebei'
import Zichanpz from '../iframePage/Zichanpz'
import Lilvpz from '../iframePage/Lilvpz'
import Shiduanpz from '../iframePage/Shiduanpz'
import Rolegl from '../iframePage/Rolegl'
import Usergl from '../iframePage/Usergl'
import Shebeizichan from '../iframePage/Shebeizichan'
import Baseinfor_gqj from '../iframePage/JibenxinxiGQJ'
import Kucungl_gqj from '../iframePage/KucunguanliGQJ'
import Rukugl_gqj from '../iframePage/RukuguanliGQJ'
import Lingyonggl_gqj from '../iframePage/LinyongguanliGQJ'
import Baofeigl_gqj from '../iframePage/BaofeiguanliGQJ'
import Repairgl_gqj from '../iframePage/WeixiudengjiGQJ'
import Baseinfor_beipin from '../iframePage/JibenxinxiBP'
import Kucungl_beipin from '../iframePage/KucunguanliBP'
import Rukugl_beipin from '../iframePage/RukuguanliBP'
import Lingyonggl_beipin from '../iframePage/LinyongguanliBP'
import Baofeigl_beipin from '../iframePage/BaofeiguanliBP'
import Repairgl_beipin from '../iframePage/WeixiudengjiBP'
import Car_ruku from '../iframePage/Car_ruku'
import Car_dingwei from '../iframePage/Car_dingwei'
import Car_repair from '../iframePage/Car_repair'
import Boardgl from '../iframePage/Boardgl'
import ReportDetail from '../iframePage/ReportDetail'

export default {
  name: 'home',
  components: {
    AdminHome,
    Dianliujc,
    Dianyajc,
    Gonglvjc,
    Gonglvysjc,
    Xuliangjc,
    Dianlijiance,
    Dianrongqi,
    Bianyaqi,
    Duanluqi,
    Gongdanfx,
    Yunweibaojingfx,
    Kehubaojingfx,
    Jiankangdufx,
    Zhandianjc,
    Shishishipin,
    Zhinengxunjian,
    Nengxiaoshouye,
    Nengxiaoyunweishouye,
    Dianfeifx,
    Bianyaqifx,
    Dianyapiancha,
    Sangxiangbupingheng,
    Xiebofx,
    PersonalCenter,
    Gaojingjc,
    Yekuogl,
    Xunjiangl,
    Caozuopiaogl,
    Reportclient_YW,
    Report_YW,
    Kehufuwu,
    Myyekuo,
    Myjiaojieban,
    Myshenhe,
    Operationlogs,
    Systemclass,
    Baseclass,
    Zhenjiangl,
    Shenhepz,
    Hetonggl,
    Teamgl,
    Sitegl,
    Clientgl,
    Companynews,
    Bannergl,
    Zhibangl,
    Bukonggl,
    Zutaigongju,
    Caijishebei,
    Zichanpz,
    Lilvpz,
    Shiduanpz,
    Rolegl,
    Usergl,
    Shebeizichan,
    Baseinfor_gqj,
    Kucungl_gqj,
    Rukugl_gqj,
    Lingyonggl_gqj,
    Baofeigl_gqj,
    Repairgl_gqj,
    Baseinfor_beipin,
    Kucungl_beipin,
    Rukugl_beipin,
    Lingyonggl_beipin,
    Baofeigl_beipin,
    Repairgl_beipin,
    Car_ruku,
    Car_dingwei,
    Car_repair,
    Boardgl,
    ReportDetail,
    Reportclient_NX,
    Report_NX,
    OrderManage,
    Report_NX_Insider,
    Report_YW_Insider
  },
  // computed: mapState([
  //   'userClients',
  //   'propsData',
  //   'quickEntryList'
  // ]),
  computed: {
    ...mapState({
      userClients: state => state.userClients,
      propsData: state => state.propsData,
      quickEntryList: state => state.quickEntryList,
      callBackData: state => state.WS.callBackData
    }),
    ...mapGetters('WS', {
      getSocket: 'onEvent'
    })
  },
  data () {
    return {
      boolBack: false,
      needRefresh: false,
      dialogVisiblePwd: false,
      currentPage: 'PersonalCenter',
      excludeComponent: ['bianyaqi', 'dianrongqi', 'duanluqi', 'dianfei', 'sunhao', 'monitorTo', 'dianliujc', 'dianyajc', 'gonglvjc', 'gonglvysjc', 'gaojingjc', 'reportClientNx', 'reportClientYw'],
      refreshComponent: 'Bianyaqi,Dianrongqi,Duanluqi,Shishishipin,Dianfeifx,Bianyaqifx,AdminHome,Dianliujc,Dianyajc,Gonglvjc,Gonglvysjc,Sangxiangbupingheng',
      pageSrc: null,
      isNowTag: true,
      isMyComponent: true, //是否使用外部链接
      isExpand: true, // 左侧是否展开
      showFastContent: false, //是否展示快捷入口
      showBellContent: false, //是否展示铃铛入口
      showXx: false, // 是否展示标签选项
      showUserName: false, //是否展示用户名下内容
      expandImg: require("../../assets/image/home/shouqi.png"),
      xxshouqi: require('../../assets/image/home/icon_bq_shouqi.png'),
      xxzhankai: require('../../assets/image/home/icon_bq_zhankai.png'),
      closeSrc: require('../../assets/image/home/close.png'),
      closeSrcDefault: require('../../assets/image/home/close_default.png'),
      // expandedImg: require("../../assets/image/home/zhankai.png"),
      nowTime: formatTime(new Date().getTime() / 1000, 'Y-M-D h:m:s'),
      companyId: '',
      userName: 'admin',
      bellNum: 0,
      tagList: [{
        name: '个人中心',
        routeName: 'PersonalCenter',
        isActive: true,
        href: null,
      }, {
        name: '首页',
        routeName: 'AdminHome',
        isActive: false,
        href: null,
      }], //标签列表管理
      menuList: [],
      menuIcon: menuIcon,
      menuJson: [],
      itemFastList: [],
      oldPwd: '',
      newPwd: '',
      confirmNewPwd: '',
      alertList: [],
      notice: [],
      qingjing: [],
      newAlertList: []
    }
  },
  watch: {
    propsData: {
      handler (e) {
        this.routeToPage(e)
      },
      deep: true
    },
    getSocket (a, b) {
      if (a !== b && a) {
        this.bellNum = 0
        this.newAlertList = JSON.parse(a)
        this.bellNum = this.notice.amount + this.qingjing.amount + this.newAlertList.amount
      }
    }
  },
  async created () {
    this.userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {}
    this.menuJson = this.userInfo.menuJson
    this.menuList = this.userInfo.menuJson[0].items
    for (let i of this.menuList) {
      i.isLeftActive = false
    }

    this.initWarn()

    await this.$store.dispatch('saveUserClients')
    this.companyId = this.userClients[0].clientId || ''
    window.localStorage.setItem('changeClientId', this.companyId)

    this.getNewTime()
    this.getQuickEntry()
    this.getHeaderMessage()

    if (this.$route.params.type == 1 || this.$route.params.type == 2) {
      this.boolBack = true
    }
    // 监听localstore存储
    this.listenStore();
    if (this.$route.params.name) {
      this.routeToPage(this.$route.params)
    }
  },
  mounted () {
    // 接收iframe发来的信息
    window.addEventListener('message', this.iframeToPage)
  },
  methods: {
    toback () {
      let data = {
        pathName: 'toHome'
      };
      // 判断是从大屏来的还是车载来的
      if (this.$route.params.type == 1) {
        this.$router.replace({
          name: "bigIndex",
          params: data
        })
      } else if (this.$route.params.type == 2) {
        this.$router.replace({
          name: "carIndex",
          params: data
        })
      }
    },
    // 测试
    test () {
      let data = {
        name: '报告',
        routeName: 'Report_NX_Insider',
        href: null
      }
      this.toMenuItem(data)
      // https://e.intellqc.com/ana_home/#/reportDetail?id=qwqwq111
    },
    initWarn () {
      const that = this;
      that.$store.dispatch('WS/wsInit') //初始化ws
      let wsType = 'qc|alert|'
      let userId = `${wsType}${that.userInfo.userId}` // ${that.userInfo.userId}

      setInterval(() => {
        that.$store.dispatch("WS/wsSend", userId)
      }, 2000)
    },
    // 获取快捷入口
    async getQuickEntry () {
      const that = this
      let data = {
        userId: that.userInfo.userId
      }
      await this.$store.dispatch('quickEntry', data)
    },
    // 点击头部菜单
    headerMenu (item) {
      for (let i of this.menuJson) {
        i.checked = false
      }
      item.checked = !item.checked
      this.menuList = item.items

      // 左侧点击状态重置
      // for (let i of this.menuList) {
      //   i.isLeftActive = false
      // }
    },
    // 是否展开左侧
    expandLeft () {
      this.isExpand = !this.isExpand
      if (this.isExpand) {
        this.expandImg = require("../../assets/image/home/shouqi.png")
      } else {
        this.expandImg = require("../../assets/image/home/zhankai.png")
      }

    },
    // 打开指定标签页
    toItem (item) {
      if (this.tagList.length > 18) {
        this.$message({
          message: '最多打开18个标签页',
          type: 'warning'
        })
        return false
      }
      if (!item.routeName && !item.href) {
        return false
      }
      // this.isMyComponent = true
      this.currentPage = item.routeName
      this.pageSrc = item.href
      if (item.children && item.children.length == 0 && this.tagList.filter(i => i.routeName == item.routeName).length == 0) {
        let data = {
          name: item.name,
          routeName: item.routeName,
          href: item.href,
          isActive: true
        }
        this.tagList.push(data)
        // 客户首页刷新机制特殊处理
        if (item.routeName == 'AdminHome') {
          this.excludeComponent.push('kehuIndex')
        }
      }
      for (let i of this.tagList) {
        i.isActive = false
      }
      let routeNum = this.tagList.findIndex(i => i.routeName === item.routeName)
      this.tagList[routeNum].isActive = true

      // 点击状态展示
      this.menuJsonChange(item)

    },
    // 打开指定标签页(有子列表时)
    async toMenuItem (item) {
      if (this.tagList.length > 18) {
        this.$message({
          message: '最多打开18个标签页',
          type: 'warning'
        })
        return false
      }
      if (item.params) {
        let routeData = this.routeCatchChange(item.params)
        await this.$store.dispatch('routeObjSave', routeData)
      } else if (item.isReload) {
        await this.$store.dispatch('routeObjSave', {})
      } else {
        await this.$store.dispatch('routeObjSave', {})
      }
      if (this.tagList.filter(i => i.routeName == item.routeName).length == 0) {
        this.currentPage = item.routeName
        this.pageSrc = item.params && item.href ? item.href + item.params : item.href
        for (let i of this.tagList) {
          i.isActive = false
        }
        let data = {
          name: item.name,
          routeName: item.routeName,
          href: this.pageSrc,
          isActive: true
        }
        this.tagList.push(data)
      } else {
        this.currentPage = item.routeName
        // this.pageSrc = item.params ? item.href + item.params : item.href
        for (let i of this.tagList) {
          i.isActive = false
        }
        let routeNum = this.tagList.findIndex(i => i.routeName === item.routeName)
        this.tagList[routeNum].isActive = true
        this.tagList[routeNum].href = item.params && item.href ? item.href + item.params : item.href
        // this.getNeedRefresh(item.routeName)
      }
      this.menuJsonChange(item)
      // 左侧点击状态展示
      // for (let i of this.menuJson) {
      //   if (i.items.length > 0) {
      //     for (let j of i.items) {
      //       j.isLeftActive = false
      //     }
      //   }
      // }
      // this.menuList.map((menuItem) => {
      //   if (menuItem.children.length > 0) {
      //     for (let child of menuItem.children) {
      //       if (child.routeName == item.routeName) {
      //         menuItem.isLeftActive = true
      //       }
      //     }
      //   }
      // })
    },
    // iframe接收信息
    async iframeToPage (event) {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      if (!data.name) {
        return false
      }
      if (this.tagList.length > 18) {
        this.$message({
          message: '最多打开18个标签页',
          type: 'warning'
        })
        return false
      }
      let myArr = [{
        name: '报告详情',
        routeName: 'ReportDetail',
        href: `${process.env.VUE_APP_BASEURL}/ana_home/#/reportDetail`
      }]
      let newArr = await this.steamroller(this.menuJson).concat(myArr)
      let routeList = newArr.filter(i => {
        return i.routeName && i.routeName == data.name
      })
      routeList[0].params = data.params
      this.toMenuItem(routeList[0])
    },
    // 页面路由跳转
    async routeToPage (data) {
      if (this.tagList.length > 18) {
        this.$message({
          message: '最多打开18个标签页',
          type: 'warning'
        })
        return false
      }
      let myArr = [{
        name: '报告详情',
        routeName: 'ReportDetail',
        href: `${process.env.VUE_APP_BASEURL}/ana_home/#/reportDetail`
      }]
      let newArr = await this.steamroller(this.menuJson).concat(myArr)
      let routeList = newArr.filter(i => {
        return i.routeName && i.routeName == data.name
      })
      routeList[0].params = data.params
      if (data.isReload) {
        routeList[0].isReload = data.isReload || null
      } else {
        this.toMenuItem(routeList[0])
      }
      // if (data.params && data.params !== '') {
      //   routeList[0].href = routeList[0].href + data.params
      // }
    },
    // 路由后缀截取
    routeCatchChange (item) {
      let obj = {}
      //以&为分界切割
      let arr = item.slice(1, item.length).split('&') //[]
      arr.forEach(function (val) {
        //切割=两边的数据
        let arr1 = val.split('=')
        obj[arr1[0]] = arr1[1]
      })
      return obj
    },
    // 数组偏平化
    steamroller (arr) {
      let that = this
      return arr.reduce((prev, next) => {
        if (next.items) {
          return prev.concat(Array.isArray(next.items) ? that.steamroller(next.items) : next)
        } else {
          return prev.concat(Array.isArray(next.children) && next.children.length > 0 ? that.steamroller(next.children) : next)
        }
      }, [])
    },
    // 标签打开
    async toTag (item) {
      // 客户首页刷新机制特殊处理
      if (item.routeName == 'AdminHome') {
        this.excludeComponent = this.excludeComponent.filter(item => item !== 'kehuIndex')
      }
      this.pageSrc = item.href
      this.currentPage = item.routeName
      for (let i of this.tagList) {
        i.isActive = false
      }
      item.isActive = true

      this.menuJsonChange(item)
      // this.getNeedRefresh(item.routeName)
    },
    menuJsonChange (item) {
      // 左侧点击状态展示
      for (let i of this.menuJson) {
        if (i.items.length > 0) {
          for (let j of i.items) {
            j.isLeftActive = false
          }
        }
        i.checked = false
      }
      this.menuJson.map(menuItem => {
        if (menuItem.items.length > 0) {
          for (let i of menuItem.items) {
            if (i.children.length > 0) {
              for (let j of i.children) {
                if (j.routeName == item.routeName) {
                  this.menuList = menuItem.items
                  menuItem.checked = true
                  i.isLeftActive = true
                }
              }
            } else {
              if (i.routeName == item.routeName) {
                this.menuList = menuItem.items
                menuItem.checked = true
                i.isLeftActive = true
              }
            }
          }
        }
      })
    },
    // 标签页面是否需要刷新
    async getNeedRefresh (value) {
      let data = {
        needRefresh: this.refreshComponent.indexOf(value) > -1 ? true : false,
        refreshAnatype: anaTypeData[value] || ''
      }
      this.$store.dispatch('propsNeedRefresh', data)
    },
    // 关闭标签页
    async closeTag (item) {
      if (this.tagList.length < 2) {
        this.$message({
          message: '当仅有一个标签页时不允许被删除',
          type: 'warning'
        })
        return false
      }
      // 客户首页刷新机制特殊处理
      if (item.routeName == 'AdminHome') {
        this.excludeComponent = this.excludeComponent.filter(item => item !== 'kehuIndex')
      }
      if (item.routeName == 'Gaojingjc') {
        // console.log(this.propsData, 'propsData')
        let propsData = {
          name: 'Gaojingjc',
          params: null,
          isReload: true
        }
        await this.$store.dispatch('propsRouteData', propsData)
        // this.$store.dispatch('routeObjSave', {})
      }
      this.tagList = this.tagList.filter(i => i.routeName !== item.routeName)
      if (item.routeName == this.currentPage) {
        let tagNum = this.tagList.length - 1
        this.currentPage = this.tagList[tagNum].routeName
        this.pageSrc = this.tagList[tagNum].href

        this.tagList[tagNum].isActive = true
        this.menuJsonChange(this.tagList[tagNum])
      }
    },
    // 打开个人中心页
    toPersonalCenter () {
      let data = {
        name: '个人中心',
        routeName: 'PersonalCenter',
        isActive: true,
        href: null
      }
      this.toMenuItem(data)
    },
    // 修改我的密码
    changePsd () {
      this.dialogVisiblePwd = true
    },
    // 关闭个人设置
    handleClose () {
      this.dialogVisiblePwd = false
      this.oldPwd = ''
      this.newPwd = ''
      this.confirmNewPwd = ''
    },
    // 确认修改密码
    confirmPassword () {
      if (this.oldPwd == '') {
        this.$message.error('请输入原密码！')
        return false
      }
      if (this.newPwd == '') {
        this.$message.error('请输入新密码！')
        return false
      }
      if (this.confirmNewPwd == '') {
        this.$message.error('请输入确认密码！')
        return false
      }
      if (this.newPwd !== this.confirmNewPwd) {
        this.$message.error('两次密码输入不一致！')
        return false
      }
      let data = {
        userId: this.userInfo.userId,
        password: this.compile(this.oldPwd),
        newPassword: this.compile(this.confirmNewPwd)
      }
      this.$store.dispatch('modifyPassword', data).then(res => {
        if (res && res.state) {
          this.$message({
            message: '修改密码成功!',
            type: 'success'
          });
          this.handleClose()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    compile (code) {
      var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },
    // 移入
    mouseOver (item) {
      item.showChild = true
    },
    // 移出
    mouseLeave (item) {
      item.showChild = false
    },
    // 快捷入口移入
    mouseOverFast () {
      this.showFastContent = true
    },
    // 快捷入口移出
    mouseLeaveFast () {
      this.showFastContent = false
    },
    // 铃铛入口移入
    mouseOverBell () {
      this.showBellContent = true
    },
    // 铃铛入口移出
    mouseLeaveBell () {
      this.showBellContent = false
    },
    // 标签选项移入
    mouseOverXx () {
      this.showXx = true
    },
    // 标签选项移出
    mouseLeaveXx () {
      this.showXx = false
    },
    // 用户名下内容移入
    mouseOverUserInfo () {
      this.showUserName = true
    },
    // 用户名下内容移出
    mouseLeaveUserInfo () {
      this.showUserName = false
    },
    // 获取最新时间
    getNewTime () {
      const that = this
      setInterval(() => {
        let date = new Date().getTime() / 1000
        that.nowTime = formatTime(date, 'Y-M-D h:m:s')
      }, 1000)
    },
    // 关闭所有页
    closeAll () {
      this.tagList = [{
        name: '个人中心',
        routeName: 'PersonalCenter',
        isActive: true,
        href: null
      }]
      this.pageSrc = null
      this.currentPage = this.tagList[0].routeName
      this.menuJsonChange(this.tagList[0])
    },
    // 关闭当前页
    closeNow () {
      if (this.tagList.length < 2) {
        this.$message({
          message: '当仅有一个标签页时不允许被删除',
          type: 'warning'
        })
        return false
      }
      this.tagList = this.tagList.filter(i => i.routeName !== this.currentPage)
      let tagNum = this.tagList.length - 1
      this.pageSrc = this.tagList[tagNum].href
      this.currentPage = this.tagList[tagNum].routeName
      this.tagList[tagNum].isActive = true
      this.menuJsonChange(this.tagList[tagNum])
    },
    // 关闭其他页
    closeOther () {
      this.tagList = this.tagList.filter(i => i.routeName == this.currentPage)
      this.currentPage = this.tagList[0].routeName
      this.pageSrc = this.tagList[0].href
    },
    // 登出
    logOut () {
      const that = this
      that.$store.dispatch('userloginOut', {}).then(res => {
        if (res && res.result) {
          window.localStorage.removeItem('userInfo')
          window.localStorage.removeItem('changeClientId')
          that.$router.replace({
            path: '/login',
          })
        } else {
          that.$message.error('注销登出失败！')
        }
      })
    },
    listenStore () {
      let self = this
      window.addEventListener(
        'storage',
        function (event) {
          /*  告警 */
          if (event.key === 'policy') {
            let propsData = {
              name: 'Gaojingjc',
              params: `?type=policy&value=` + JSON.parse(event.newValue).type
            }
            self.$store.dispatch('propsRouteData', propsData)

          } else if (event.key === 'order') {
            //跳转工单
            let propsData = {
              name: 'Workordergl',
              params: `?type=newOrder&value=` + JSON.parse(event.newValue).type
            }
            self.$store.dispatch('propsRouteData', propsData)
          }
        }, true)
    },
    // 更换我的公司
    handleClient (e) {
      let data = e.target.value || ''
      this.$store.dispatch('changeMyClient', data)
    },
    // 获取头部铃铛信息
    getHeaderMessage () {
      const that = this
      let data = {
        userId: that.userInfo.userId
      }
      this.$store.dispatch('getHeaderMessage', data).then(res => {
        that.notice = res.result.notice
        that.qingjing = res.result.qingjing
        that.alertList = res.result.alert
        that.bellNum = that.notice.amount + that.qingjing.amount
      })
    },
    // 头部跳转告警监测
    toGaojin () {
      let propsData = {
        name: 'Gaojingjc',
        params: null
      }
      this.$store.dispatch('propsRouteData', propsData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.grey_bg {
  background-color: #f0f2f5;
}
.iframe_box {
  width: 100%;
  height: calc(100% - 45px);
}
.fanhuiStyle {
  position: absolute;
  top: 10px;
  left: 6px;
}
.component_style {
  width: 100%;
  height: calc(100vh - 110px);
  overflow: scroll;
}
.header_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background-color: #006fbc;
  color: #ffffff;
  background-image: url("../../assets/image/home/img_nav_bg.png");
  background-repeat: no-repeat;
  background-position: center right;
  .header_middle {
    display: flex;
    .menu_item {
      margin-right: 3.6vw;
      cursor: pointer;
      position: relative;
      .line {
        position: absolute;
        bottom: -8px;
        width: 100%;
        height: 1px;
        background: #fff;
      }
      .menu_item_name {
        font-size: 1vw;
      }
    }
  }
  .header_right {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-right: 31px;
    position: relative;
    .bell_content {
      cursor: pointer;
      display: flex;
      margin-right: 38px;
      position: relative;
      .red_pot {
        position: absolute;
        top: -5px;
        right: -10px;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 0, 5, 1);
        border-radius: 50%;
        span {
          font-size: 10px;
          transform: scale(0.8);
        }
      }
      .hover_bell_content {
        position: absolute;
        padding: 16px 15px 0px 15px;
        top: 45px;
        right: -75px;
        width: 380px;
        min-height: 100px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 6px 30px 0px rgba(185, 185, 185, 0.45);
        border-radius: 8px;
        z-index: 99999;
      }
      .hover_bell_content::before {
        position: absolute;
        top: -10px;
        right: 75px;
        content: "";
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
      }
      .bell_item_span1 {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 8px;
        margin-right: 5px;
      }
      .bell_item_span2 {
        font-size: 16px;
        font-weight: bold;
        color: rgba(255, 27, 27, 1);
      }
      .item_words_box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #333333;
        font-size: 14px;
        margin: 15px 0;
        .item_words_time {
          min-width: 139px;
        }
        .item_word {
          min-width: 38px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item_words_box:hover {
        opacity: 0.8;
        transition: all ease 0.3s;
      }
    }
    .user_name {
      font-size: 0.88vw;
      cursor: pointer;
      margin-left: 5px;
    }
    .now_time {
      font-size: 0.88vw;
      position: absolute;
      right: 0px;
    }
  }
}
.main_content {
  display: flex;
  .left_side_expand {
    display: flex;
    flex-direction: column;
    min-width: 100px;
    min-height: calc(100vh - 70px);
    background-color: #272d32;
  }
  .left_side_shrink {
    display: flex;
    flex-direction: column;
    min-width: 70px;
    min-height: calc(100vh - 70px);
    background-color: #272d32;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 39px;
    border-bottom: 1px solid #69859c;
    .expand_img {
      width: 17px;
      height: 14px;
      margin-right: 18px;
      cursor: pointer;
    }
  }
  .left_item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // height: 70px;
    min-height: 50px;
    max-width: 80px;
    padding: 10px;
    position: relative;
    .child_content {
      display: flex;
      width: 120px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      box-shadow: 0px 7px 18px 0px rgba(168, 177, 191, 0.64);
      border-radius: 5px;
      padding: 5px 0;
      position: absolute;
      top: 0px;
      right: -132px;
      z-index: 99999;
      .child_name {
        text-align: center;
        color: #333;
        padding: 8px 0;
      }
      .child_name:hover {
        color: #ffffff;
        background-color: #006fbc;
        transition: all ease 0.3s;
      }
      .block_area {
        position: absolute;
        width: 12px;
        height: 100%;
        top: 0;
        left: -12px;
      }
    }
  }
  .left_item:hover {
    cursor: pointer;
    background-color: #007ed5;
    color: #fff;
    transition: all ease 0.3s;
  }
  .left_item_default {
    color: #99a2a8;
  }
  .left_item_active {
    cursor: pointer;
    background-color: #007ed5;
    color: #fff;
  }
  .right_side {
    flex: 1;
    padding: 0 20px;
    .tag_box {
      display: flex;
      height: 40px;
      position: relative;
      padding-right: 100px;
      .tag_name {
        // min-width: 30px;
        height: 20px;
        // white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tag_item {
        display: flex;
        height: 20px;
        align-items: center;
        justify-content: center;
        padding: 5px 13px;
        margin-top: 5px;
        background: rgba(0, 111, 188, 1);
        border: 1px solid rgba(0, 111, 188, 1);
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
      }
      .tag_item_default {
        display: flex;
        height: 20px;
        align-items: center;
        justify-content: center;
        padding: 5px 13px;
        margin-top: 5px;
        border-radius: 5px;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
        background-color: #ffffff;
        color: #666666;
        border: 1px solid rgba(204, 204, 204, 1);
      }
      .tag_close {
        // margin-left: 5px;
        width: 16px;
        height: 15px;
      }
      .tag_close:hover {
        cursor: pointer;
        transform: scale(1.2);
        transition: all ease 0.3s;
      }
      .tag_xx {
        position: absolute;
        // min-width: 75px;
        right: -5px;
        .xx_content {
          color: #666666;
          font-size: 15px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(219, 219, 219, 1);
          box-shadow: 0px 3px 7px 0px rgba(188, 188, 188, 0.34);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          padding: 9px 12px;
          width: 78px;
          top: 30px;
          right: 0;
          z-index: 99999;
        }
        .xx_item:hover {
          color: #006fbc;
          transition: all ease 0.3s;
          cursor: pointer;
        }
        // .xx_content::before {
        //   position: absolute;
        //   top: -10px;
        //   right: 38px;
        //   content: "";
        //   width: 0;
        //   height: 0;
        //   border-left: 10px solid transparent;
        //   border-right: 10px solid transparent;
        //   border-bottom: 10px solid #fff;
        // }
      }
    }
  }
}
.user_info_content {
  position: absolute;
  color: #666666;
  font-size: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(219, 219, 219, 1);
  box-shadow: 0px 3px 7px 0px rgba(188, 188, 188, 0.34);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 10px 12px 5px 12px;
  width: 75px;
  top: 33px;
  right: -25px;
  z-index: 99999;
}
.user_info_item {
  margin-bottom: 5px;
}
.user_info_item:hover {
  cursor: pointer;
  color: #006fbc;
  transition: all ease 0.3s;
}
.float_content {
  position: fixed;
  right: 0px;
  top: 162px;
  width: 39px;
  height: 39px;
  background-image: url("../../assets/image/home/xuanfu.png");
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 134, 227, 1);
  box-shadow: 0px 2px 12px 0px rgba(0, 134, 227, 0.53);
  cursor: pointer;
  .common_choice {
    background: #ffffff;
    height: 40px;
    width: 200px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(219, 219, 219, 1);
    border-radius: 3px;
    position: relative;
    .common_choice_item {
      position: absolute;
      top: 100px;
    }
  }
  .hover_float_content {
    padding: 20px;
    width: 410px;
    min-height: 70px;
    background: #ffffff;
    box-shadow: 0px 2px 12px 0px #eee;
    position: absolute;
    top: 0;
    left: -450px;
  }
}
.choose_label {
  font-weight: bold;
  margin-right: 15px;
}

.item_fast_box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  .fast_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    height: 25px;
    background: rgba(246, 247, 248, 1);
    border: 1px solid rgba(235, 235, 235, 1);
    border-radius: 2px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .fast_btn:hover {
    background-color: #006fbc;
    color: #ffffff;
    transition: all ease 0.3s;
  }
}
.pwd_label {
  width: 90px;
}
.pwd_input {
  width: 65%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
