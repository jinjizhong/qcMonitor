<template>
  <div class="big_screen_box" :style="{
      width: width.indexOf('%') > 0 ? width : `${width}px`,
      height: height.indexOf('%') > 0 ? height : `${height}px`
    }">
    <div v-if="!needSecondTitle" class="header">
      <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
      <p class="h_title">{{title}}</p>
    </div>
    <div v-if="needSecondTitle" class="header_twice">
      <div class="left">
        <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
        <p class="h_title">{{title}}</p>
      </div>
      <div class="right">
        <img class="h_icon" src="../../assets/image/secondBig/frame_title_prefix.png" alt="img">
        <p class="h_title">{{secTitle}}</p>
      </div>
    </div>
    <img class="frameUp" src="../../assets/image/secondBig/frame_up.png" alt="img">
    <img class="frameDown" src="../../assets/image/secondBig/frame_down.png" alt="img">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    secTitle: {
      type: String,
      default: ''
    },
    needSecondTitle: {
      type: Boolean,
      default: false
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
.big_screen_box {
  background: rgba(6, 22, 109, 0.1);
  border: 1px solid rgba(1, 158, 190, 1);
  box-shadow: 0px 0px 10px #019ebe inset;
  position: relative;
  .frameUp {
    position: absolute;
    top: -3px;
    left: -3px;
  }
  .frameDown {
    position: absolute;
    bottom: -3px;
    right: 0px;
  }
  .header {
    display: flex;
    // width: 331px;
    height: 47px;
    background: linear-gradient(
      90deg,
      rgba(3, 86, 138, 1) 0%,
      rgba(3, 86, 138, 0) 100%
    );
    align-items: center;
    .h_icon {
      margin-left: 15px;
      margin-right: 15px;
    }
    .h_title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(67, 220, 255, 1);
    }
  }
  .header_twice {
    display: flex;
    align-items: center;
    // width: 331px;
    height: 47px;
    .left {
      display: flex;
      align-items: center;
      flex: 1;
      height: 47px;
      background: linear-gradient(
        90deg,
        rgba(3, 86, 138, 1) 0%,
        rgba(3, 86, 138, 0) 100%
      );
    }
    .right {
      display: flex;
      align-items: center;
      flex: 1;
      height: 47px;
      background: linear-gradient(
        90deg,
        rgba(3, 86, 138, 1) 0%,
        rgba(3, 86, 138, 0) 100%
      );
    }
    .h_icon {
      margin-left: 15px;
      margin-right: 15px;
    }
    .h_title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(67, 220, 255, 1);
    }
  }
}
</style>
