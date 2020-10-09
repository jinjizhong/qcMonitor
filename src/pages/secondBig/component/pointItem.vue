<template>
  <div @mouseover="mouseOver" @mouseleave="mouseLeave" class="icon_box flex_column_center"
    :style="{top: top, left: left}">
    <img :src="pointIcon" alt="img">
    <!-- <p class="word">{{pointWord}}</p> -->
    <div v-if="type!=='qy'" class="hover_content" v-show="detailContent">
      <p class="h_word">{{pointWord}}</p>
      <p class="h_line"></p>
      <div v-if="type!=='gf'">
        <p class="h_label">配电总容量：<span class="h_value">{{data.zrl}}kVA</span> </p>
        <p class="h_label">当前实时功率负荷：<span class="h_value">{{data.fh}}kW</span></p>
        <p class="h_label">当前告警数量：<span class="h_value">{{data.num}}个</span></p>
      </div>
      <div v-else>
        <p class="h_label">装机总容量： <span class="h_value">{{data.zrl}}kWp</span> </p>
        <p class="h_label">当月累计发电量：<span class="h_value">{{data.fdl}}kWh</span></p>
      </div>
    </div>
    <div class="container">
      <!-- <div class="dot" :style="styleDot"></div> -->
      <div class="pulse" :style="stylePulse"></div>
      <div class="pulse1" :style="stylePulse"></div>
      <div class="pulse2" :style="stylePulse"></div>
    </div>
    <!-- v-show="detailContent" -->
  </div>
</template>

<script>

export default {
  name: 'commonTitle',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    pointIcon: {
      type: String,
      default: ''
    },
    pointWord: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '0px'
    },
    left: {
      type: String,
      default: '0px'
    },
    color: {
      type: String,
      default: '#F79F00'
    },
  },
  data () {
    return {
      detailContent: false,
      styleDot: {
        borderColor: this.color
      },
      stylePulse: {
        borderColor: this.color,
        boxShadow: `1px 1px 30px ${this.color}`
      }
    }
  },
  created () {
  },
  methods: {
    mouseOver () {
      this.detailContent = true
    },
    mouseLeave () {
      this.detailContent = false
    },
  }
}
</script>

<style lang="scss" scoped>
.icon_box {
  // z-index: 10;
  position: absolute;
  .hover_content {
    position: absolute;
    background-image: url("../../../assets/image/secondBig/tanchuang_bj.png");
    background-repeat: no-repeat;
    width: 215px;
    height: 137px;
    top: -30px;
    right: -260px;
    z-index: 999999;
    padding: 22px 25px 23px 25px;
    font-family: Microsoft YaHei;
    .h_label {
      font-size: 16px;
      font-weight: 400;
      color: rgba(154, 203, 234, 1);
      margin-bottom: 5px;
    }
    .h_value {
      font-size: 18px;
      font-weight: 400;
      color: rgba(77, 178, 255, 1);
    }
    .h_word {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(77, 178, 255, 1);
    }
    .h_line {
      margin: 11px 0 21px 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(
        90deg,
        rgba(133, 239, 255, 0.01),
        rgba(53, 213, 247, 0.93),
        rgba(78, 121, 204, 0.28),
        rgba(134, 251, 255, 0)
      );
    }
  }
}
.icon_box:hover {
  cursor: pointer;
}
.word {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(72, 180, 255, 1);
  z-index: 999;
  font-size: 14px;
  margin-top: 5px;
}
@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }

  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }

  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }

  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes warn1 {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }

  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }

  50% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
  }

  75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes myfirst {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  /* 40% {transform: scale(3);} */
  60% {
    opacity: 0.8;
  }
  /* 80% {transform: scale(5);} */
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.container {
  position: absolute;
  /*border: 1px solid #000; hovertree.com */
}
/* 保持大小不变的小圆圈 何问起 */
.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  left: -7px;
  top: 59px;
  border-width: 1px;
  border-style: solid;
  // border-radius: 50% / 50%;
  border-radius: 50%;
  z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈  */
.pulse {
  position: absolute;
  width: 25px;
  height: 18px;
  top: 55px;
  left: -16px;
  border-width: 2px;
  border-style: solid;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: myfirst 2s ease-out;
  -moz-animation: myfirst 2s ease-out;
  animation: myfirst 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.pulse1 {
  position: absolute;
  width: 46px;
  height: 35px;
  top: 47px;
  left: -27px;
  border-width: 2px;
  border-style: solid;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: myfirst 1.7s ease-out;
  -moz-animation: myfirst 1.7s ease-out;
  animation: myfirst 1.7s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.pulse2 {
  position: absolute;
  width: 70px;
  height: 58px;
  left: -39px;
  top: 35px;
  border-width: 2px;
  border-style: solid;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn1 1.5s ease-out;
  -moz-animation: warn1 1.5s ease-out;
  animation: warn1 1.5s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>
