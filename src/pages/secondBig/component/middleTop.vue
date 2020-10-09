<template>
  <div class="all-bg">
    <!-- 大屏顶部-->
    <div class="topTitle flex jbt">
      <div class="left-area flex ac">
        <img src="../../../assets/image/bigscreen/icon_nav_dingwei.png" />
        <iframe class="weather" :src="weatherUrl" width="200" scrolling="no" height="28" frameborder="0"
          allowtransparency="true" />
      </div>
      <div class="middle-area">智能运维调度指挥系统</div>
      <div class="right-area flex ac">
        <img @click="toHome" src="../../../assets/image/secondBig/icon_zhuye.png" />
        <img src="../../../assets/image/secondBig/icon_kuapingtai.png" />
        <img src="../../../assets/image/secondBig/icon_baojing.png" />
        <img src="../../../assets/image/secondBig/icon_yonghu.png" />
      </div>
    </div>
    <!-- 大屏中间-->
    <div class="index-middle">
      <div class="six-bg flex jbt ac">
        <div class="flex" v-for="(item,index) in middleData" :key="index">
          <div class="item-group">
            <img class="top-icon floatUpDown" :src="item.icon" />
          </div>
          <div class="item flex_column_center">
            <p class="item-name">{{item.name}}</p>
            <div class="flex ac">
              <p class="item-num">{{item.num}}</p>
              <p class="item-name">{{item.dw}}</p>
            </div>
          </div>
          <div class="mid-line" v-if="index<5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      weatherUrl: '',
      middleData: [{
        icon: require("../../../assets/image/secondBig/icon_kehuzongshu.png"),
        name: '客户总数',
        num: '105',
        dw: '个'
      },
      {
        icon: require("../../../assets/image/secondBig/icon_zhandianshuliang.png"),
        name: '站点总量',
        num: '150',
        dw: '个'
      },
      {
        icon: require("../../../assets/image/secondBig/icon_biandianzongdianliang.png"),
        name: '变电总容量',
        num: '560',
        dw: 'MVA'
      },
      {
        icon: require("../../../assets/image/secondBig/icon_xianluzongchang.png"),
        name: '线路总长',
        num: '1460',
        dw: 'km'
      },
      {
        icon: require("../../../assets/image/secondBig/icon_zhongduanzongliang.png"),
        name: '终端总量',
        num: '9960',
        dw: '个'
      },
      {
        icon: require("../../../assets/image/secondBig/icon_wanchenggongdanzongshu.png"),
        name: '完成工单总数',
        num: '488',
        dw: '个'
      }
      ]
    }
  },
  mounted () {
    // 天气
    this.weatherUrl = this.WeatherUrl;
  },
  methods: {
    toHome () {
      this.$router.replace({
        name: 'secondMiddle'
      })
      //this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  /* 鼠标放上去变成小手 */
  cursor: pointer;
}
.flex {
  display: flex;
}

.jbt {
  justify-content: space-between;
}

.jbc {
  justify-content: center;
}

.ac {
  align-items: center;
}
.all-bg {
  background-color: #04061d;
}
/* 顶部的title样式 */
.topTitle {
  width: 100%;
  height: 109px;
  background-image: url("../../../assets/image/secondBig/farme_nav.png");
  position: absolute;
  z-index: 100;
  .left-area {
    margin-left: 20px;
    padding-top: 20px;
    opacity: 1;
    height: 20px;
    width: 240px;
  }
  .middle-area {
    font-size: 38px;
    font-family: Tensentype;
    font-weight: normal;
    line-height: 36px;
    padding-top: 22px;
    letter-spacing: 5px;
    height: 35px;
    color: rgba(203, 235, 255, 1);
  }
  .right-area {
    padding-top: 18px;
    margin-right: 20px;
    height: 20px;
    width: 240px;
    img {
      margin-left: 33px;
      height: 24px;
      width: 24px;
    }
  }
}
.weather {
  border: none;
  padding-left: 12px;
}
// 中间
.index-middle {
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 110px;
  .six-bg {
    margin: 0px 24px 0px 24px;
    height: 156px;
    border-radius: 4px;
    border: 2px solid rgba(2, 38, 65, 1);
    background: linear-gradient(
      rgba(2, 38, 65, 1),
      #04061d,
      #04061d,
      rgba(2, 38, 65, 1)
    );
    .item {
      margin-right: 20px;
    }
    .item-name {
      font-size: 18px;
      font-family: Microsoft YaHei;
      margin-left: 5px;
      font-weight: 400;
      color: rgba(154, 203, 234, 1);
      line-height: 36px;
    }
    .item-num {
      font-size: 32px;
      font-family: DIN;
      font-weight: 400;
      margin-left: 8px;
      color: rgba(64, 230, 254, 1);
      line-height: 36px;
    }
  }
  .item-group {
    width: 138px;
    height: 126px;
    background-image: url("../../../assets/image/secondBig/group.png");
    margin: 3px 0px 0px 20px;
    position: relative;
    .top-icon {
      position: absolute;
      left: 43px;
      top: -8px;
    }
  }
  .mid-line {
    width: 3px;
    height: 118px;
    background: linear-gradient(
      rgba(2, 38, 65, 1),
      #00a0e9,
      rgba(2, 38, 65, 1)
    );
    opacity: 0.5;
  }
}
</style>
