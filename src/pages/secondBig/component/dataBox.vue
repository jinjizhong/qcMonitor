<template>
  <div class="data_box flex_column">
    <p class="name">{{name}}</p>
    <p class="data_num">{{num}}<span class="data_unit">个</span></p>
    <div class="icon_box">
      <img class="data_icon floatUpDown" :src="dataIcon" alt="img" width="47" height="47">
    </div>
    <div v-show="showLine" class="split_line"></div>
  </div>
</template>

<script>

export default {
  name: 'commonTitle',
  props: {
    name: {
      type: String,
      default: ''
    },
    num: {
      type: [String, Number],
      default: ''
    },
    dataIcon: {
      type: String,
      default: ''
    },
    showLine: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.data_box {
  font-family: Microsoft YaHei;
  height: 235px;
  // background: coral;
  flex: 1;
  position: relative;
  .name {
    font-size: 18px;
    font-weight: 400;
    color: #9acbea;
    margin: 30px 0px 3px 69px;
  }
  .data_num {
    font-size: 34px;
    font-family: DIN;
    color: rgba(64, 230, 254, 1);
    margin: 0px 0px 0px 67px;
  }
  .data_unit {
    font-size: 18px;
    font-weight: 400;
    color: rgba(154, 203, 234, 1);
    margin-left: 2px;
  }
  .icon_box {
    width: 138px;
    height: 126px;
    background-image: url("../../../assets/image/secondBig/group.png");
    margin: 3px 0px 0px 98px;
    position: relative;
    .data_icon {
      position: absolute;
      left: 45px;
      top: -8px;
    }
  }

  .split_line {
    width: 2px;
    height: 142px;
    position: absolute;
    top: 35px;
    right: 0px;
    background: linear-gradient(
      0deg,
      rgba(0, 160, 233, 0) 0%,
      rgba(0, 160, 233, 0.99) 52%,
      rgba(0, 160, 233, 0) 100%
    );
  }
}
</style>
