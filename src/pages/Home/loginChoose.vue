<template>
  <div class="flex_row_center choose_log_box">
    <img class="title_name" src="../../assets/image/login/img__xtrk_logo.png" alt="img">
    <div class="user_name_box" @mouseover="mouseOverUserInfo" @mouseleave="mouseLeaveUserInfo">
      <img src="../../assets/image/home/icon_user.png" alt="img">
      <span class="user_name">{{userInfo.realName}}</span>
      <img class="xiala_icon" :src="showUserName ? xxzhankai : xxshouqi" alt="img">
      <div class="user_info_content" v-if="showUserName">
        <div style="position: absolute; left: 0; top: -15px; width: 100%; height: 15px;"></div>
        <p @click="logOut" class="user_info_item">注销登出</p>
      </div>
    </div>
    <div class="flex_row">
      <div class="set_choose_box flex_column_center" v-for="(item, key) in subsystems" :key="key"
        @click="chooseSet(item)">
        <img style="margin-bottom: 10px;" :src="menuIcon[item.name]" alt="img">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { menuIcon } from '../../assets/js/config'

export default {
  name: 'LoginChoose',
  components: {
  },
  data () {
    return {
      xxshouqi: require('../../assets/image/home/icon_bq_shouqi.png'),
      xxzhankai: require('../../assets/image/home/icon_bq_zhankai.png'),
      showUserName: false,
      userInfo: {},
      menuIcon: menuIcon,
      subsystems: [
        {
          name: "调度中心",
          route: ''
        },
        {
          name: "车载系统",
          route: ''
        },
        {
          name: "运维平台",
          route: ''
        },
        {
          name: "全程大学",
          route: ''
        },
        {
          name: "仿真系统",
          route: ''
        }]
    }
  },
  async created () {
    this.userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {}
    this.subsystems = this.userInfo.subsystems
  },
  methods: {
    chooseSet (item) {
      switch (item.name) {
        case '运维平台':
          this.$router.replace({
            path: '/index'
          })
          break;
        case '调度中心':
          this.$router.replace({
            path: '/bigIndex'
          })
          break;
        case '车载系统':
          this.$router.replace({
            path: '/carIndex'
          })
          break;
        default:
          // window.location.href = item.route
          break;
      }
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
    // 用户名下内容移入
    mouseOverUserInfo () {
      this.showUserName = true
    },
    // 用户名下内容移出
    mouseLeaveUserInfo () {
      this.showUserName = false
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.choose_log_box {
  width: 100%;
  min-height: 100vh;
  background-image: url("../../assets/image/login/img_xrk_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .title_name {
    position: absolute;
    top: 1.35vw;
    left: 9vw;
  }
  .user_name_box {
    position: absolute;
    top: 1.5vw;
    right: 9vw;
    display: flex;
    align-items: center;
    cursor: pointer;
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
      padding: 5px 10px;
      width: 75px;
      top: 33px;
      right: -25px;
      z-index: 99999;
    }
    .user_info_item:hover {
      cursor: pointer;
      color: #006fbc;
      transition: all ease 0.3s;
    }
    .user_name {
      color: #fff;
      font-size: 16px;
      margin-left: 5px;
      margin-right: 10px;
    }
    .xiala_icon {
      width: 13px;
      height: 8px;
    }
  }
  .set_choose_box {
    width: 12.5vw;
    height: 16.1vw;
    box-shadow: 3px 1px 18px 0px rgba(11, 83, 161, 0.64);
    background-color: #fff;
    border-radius: 5px;
    margin-right: 12px;
    opacity: 0.8;
  }
  .set_choose_box:hover {
    cursor: pointer;
    transition: all ease 0.3s;
    opacity: 1;
    color: #006fbc;
  }
}
</style>
