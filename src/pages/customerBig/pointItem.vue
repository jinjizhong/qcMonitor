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
    }
  },
  data () {
    return {
      detailContent: false
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
    background-image: url("../../assets/image/customerBig/img_yp_bg.png");
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
      font-size: 16px;
      font-weight: bold;
      color: rgba(77, 178, 255, 1);
    }
    .h_line {
      margin: 11px 0 21px 0;
      width: 100%;
      height: 1px;
      background-color: #2e6b99;
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
</style>
