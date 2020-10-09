<template>
  <div class="index-title f-between">

    <div class="f-center title-left" :class="mar?'mar-bt':'pad-top'" @mouseover="leftBtn()" @mouseout="outLeave">
      <img src="../../assets/image/bigscreen/icon_nav_mulu.png" />
      <img class="l2" :src="filterBoolean?upImg:downImg" />
      <p class="time">{{time}}</p>
      <div class="filter-list" :class="mar?'s1':'s2'" v-show="filterBoolean">
        <div class="item f-center" v-for="(item,index) in listItem" :key="index" @click="itemClick(item)">{{item.title}}
        </div>
      </div>
    </div>
    <div class="title">
      <img :src="hasImg?headerImg:img" />
    </div>

    <div class="f-center title-right" :class="mar?'mar-bt':'pad-top'">
      <img class="r1" src="../../assets/image/bigscreen/icon_nav_dingwei.png" />
      <!-- <p class="r2">{{location}}</p>
			<p class="r3"></p> -->
      <iframe class="weather" :src="weatherUrl" width="200" scrolling="no" height="28" frameborder="0"
        allowtransparency="true" />
      <img v-if="alertType==0" class="r4" src="../../assets/image/bigscreen/icon_baojing_normal.png" />
      <img v-else class="r4" :src="mar?policyLogo:policyLogo2" />
      <!-- <audio autoplay loop :src="sounds"></audio> -->
      <img @click="toHome" v-if="hasImg" class="r4" src="../../assets/image/bigscreen/icon_nav_zhuye.png" />
      <img class="r5" src="../../assets/image/bigscreen/icon_nav_uers.png" />
      <!-- @mouseout="rightLeave" -->
      <div @mouseover="loginOut">
        <img style="width: 16px;height: 10px;" :src="loginOutTo?upImg:downImg" />
        <!-- 退出登录 -->
        <div class="out-list" :class="mar?'s1':'s2'" v-if="loginOutTo">
          <div class="item f-center" v-for="(item,index) in loginOutList" :key="index" @click="outTo(item)">
            {{item.title}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      alertType: state => state.BigScreen.alertType,
    })
  },
  props: {
    filterList: {
      type: Array,
      default () {
        return []
      }
    },
    mar: {
      type: Boolean,
      default: true
    },
    hasImg: {
      type: Boolean,
      default: true
    },
    img: {
      type: String,
      default: ""
    },
    loginOutTo: {
      type: Boolean,
      default: false
    },
    listItem: {
      type: Array,
      default () {
        return [{
          id: 1,
          title: "管理平台",
          route: ""
        },
        {
          id: 2,
          title: "车载系统",
          route: "chezai"
        }]
      }
    }
  },
  data () {
    return {
      time: '',
      policyLogo: require('../../assets/image/bigscreen/yujing.gif'),
      policyLogo2: require('../../assets/image/bigscreen/yujing2.gif'),
      location: '上海',
      headerImg: require("../../assets/image/bigscreen/header.png"),
      /* 地址位置 */
      weather: '晴11°-20° 北风4-5级',
      /* 天气 */
      filterBoolean: false,
      loginto: false,
      upImg: require('../../assets/image/bigscreen/icon_shouqi.png'),
      downImg: require('../../assets/image/bigscreen/icon_xiala.png'),
      weatherUrl: '',
      // alertType: 0,
      alertInfo: '',
      sounds: '',
      loginOutList: [
        {
          id: 1,
          title: "退出"
        }]
    }
  },
  created () {
    let self = this;
    self.getPolicy();
    var time1 = new Date();
    self.time = time1.getFullYear() + "年" + (time1.getMonth() + 1) + "月" + time1.getDate() + "日  " + self.check(time1.getHours()) +
      ":" +
      self.check(time1.getMinutes()) + ":" + self.check(time1.getSeconds())
  },
  mounted () {
    this.weatherUrl = this.WeatherUrl;
    this.getNewTime();
  },
  methods: {
    // 获取报警信息数据
    getPolicy () {
      let params = {
        clientFid: "",
        siteFid: "",
        teamFid: ""
      };
      this.$store.dispatch('BigScreen/getAlert', params).then((res) => {
        // this.alertType = res.alert.state;
        if (res.alert.data.length > 0) {
          this.alertInfo = res.alert.data[0].alertInfo;
          this.sounds = res.alert.data[0].soundSrc;
        }
        this.$emit('alertInfo', res.alert)
      });
    },
    // 获取最新时间
    getNewTime () {
      let self = this;
      //页面加载调用
      //每1秒刷新时间
      setInterval(function () {
        //获取年月日
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();
        //获取时分秒
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        h = self.check(h);
        m = self.check(m);
        s = self.check(s);
        self.time = year + "年" + month + "月" + day + "日  " + h + ":" + m + ":" + s
      }, 1000);
      // 请求报警接口
      // setInterval(function () {
      //   self.getPolicy();
      // }, 5000);

    },
    // 退出登录
    loginOut () {
      // if (this.loginto) {
      //   this.loginto = false
      // } else {
      //   this.loginto = true
      // }
      this.loginto = true
      this.$emit('tuichu')
    },
    outLeave () {
      this.filterBoolean = false;
    },
    outTo () {
      // let href = this.AdminUrl.replace('/main/', '/_pro/?logout=true');
      // location.replace(href)
      const self = this
      self.$store.dispatch('userloginOut', {}).then(res => {
        if (res && res.result) {
          window.localStorage.removeItem('userInfo')
          window.localStorage.removeItem('changeClientId')
          self.$router.replace({
            path: '/login',
          })
        } else {
          self.$message.error('注销登出失败！')
        }
      })
    },
    rightLeave () {
      this.loginto = false;
    },
    //左侧选择
    leftBtn () {
      // if (this.filterBoolean === false) {
      //   this.filterBoolean = true;
      // } else {
      //   this.filterBoolean = false;
      // }
      this.loginto = false;
      this.filterBoolean = true;
    },
    //左侧点击
    itemClick (item) {
      this.filterBoolean = false;
      this.$emit('itemClick', item)
    },
    //返回首页
    toHome () {
      let data = {
        pathName: 'toHome'
      };
      this.$router.replace({
        name: "bigIndex",
        params: data
      })
    },
    check (i) {
      var num;
      i < 10 ? num = "0" + i : num = i;
      return num;
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}
.filter-list {
  position: absolute;
  height: 100px;
  width: 145px;

  border: 1px solid rgba(2, 62, 104, 1);
  left: 80px;
  color: #9acbea;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  cursor: pointer;
  z-index: 999999;
}
.s1 {
  top: 60px;
  background: rgba(4, 23, 51, 1);
}
.s2 {
  top: 78px;
  background: #063a5c;
}
.filter-list .item {
  width: 100%;
  height: 35px;
  margin-top: 10px;
}

.filter-list .item:hover {
  background: #037cbc;
  color: #ffffff;
}

.out-list {
  position: absolute;
  height: 60px;
  width: 145px;
  border: 1px solid rgba(2, 62, 104, 1);
  right: 60px;
  color: #9acbea;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  cursor: pointer;
  z-index: 999999;
  .item {
    width: 100%;
    height: 35px;
    margin-top: 10px;
  }
  .item:hover {
    background: #037cbc;
    color: #ffffff;
  }
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

/* 顶部的title样式 */
.index-title {
  width: 100%;
  height: 80px;
  background-image: url("../../assets/image/bigscreen/img_nav_bj.png");
  position: relative;
  z-index: 100;
}

.index-title .title {
  // width: 23%;
  // margin-left: 300px;
  // margin-right: 140px;
}

/* 顶部左边 */
.title-left {
  width: 20%;
  margin-left: 5%;
  cursor: pointer;
}

.title-left .l2 {
  width: 16px;
  height: 10px;
  margin-left: 10px;
}

.title-left .time {
  font-size: 18px;
  font-family: DIN;
  /* font-weight: bold; */
  color: rgba(154, 203, 234, 1);
  padding-left: 30px;
}

/* 顶部右边 */
.title-right {
  margin-right: 4%;
  width: 20%;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
.mar-bt {
  padding-bottom: 20px;
}
.pad-top {
  padding-top: 30px;
  padding-bottom: 30px;
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
  margin-right: 10px;
  cursor: pointer;
}

.title-right .r5 {
  margin-right: 8px;
}
.weather {
  border: none;
  padding-right: 12px;
}
</style>
