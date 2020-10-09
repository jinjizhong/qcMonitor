<template>
  <div id="app">
    <router-view></router-view>
    <iframe src="/__sys/refresh.aspx" style='display:none' name="refframe" id="refframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    // this.$store.dispatch('getCuruserId')
  },
  methods: {}
}
</script>

<style lang="scss">
@import "./assets/style/_variable.scss";

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
}

// 地图标点样式
@keyframes point_map_animate {
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

.point_map_style {
  position: relative;
  z-index: 999999;

  .pulse {
    position: absolute;
    width: 25px;
    height: 18px;
    border-width: 2px;
    top: 123px;
    left: 2px;
    border-color: #f52b2c;
    box-shadow: 1px 1px 30px #f52b2c;
    border-style: solid;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    -webkit-animation: point_map_animate 2s ease-out;
    -moz-animation: point_map_animate 2s ease-out;
    animation: point_map_animate 2s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .pulse1 {
    position: absolute;
    width: 46px;
    height: 35px;
    top: 113px;
    left: -8px;
    border-width: 2px;
    border-style: solid;
    border-color: #f52b2c;
    box-shadow: 1px 1px 30px #f52b2c;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    -webkit-animation: point_map_animate 1.7s ease-out;
    -moz-animation: point_map_animate 1.7s ease-out;
    animation: point_map_animate 1.7s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .pulse2 {
    position: absolute;
    width: 70px;
    height: 58px;
    top: 104px;
    left: -20px;
    border-color: #f52b2c;
    box-shadow: 1px 1px 30px #f52b2c;
    border-width: 2px;
    border-style: solid;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    -webkit-animation: point_map_animate 1.5s ease-out;
    -moz-animation: point_map_animate 1.5s ease-out;
    animation: point_map_animate 1.5s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
}

#app,
* {
  margin: 0;
  padding: 0;
}

body {
  padding: 0px;
  @include bg_color_primary($bg-color-primary);
  /* 采用函数调用 */
}

// html {
//   /* $default-bg  $big-screen-bg */
//   // @include bg_color_primary($bg-color-primary); /* 采用函数调用 */
// }

select:focus {
  outline: none;
}

.charts_inset_shadow {
  box-shadow: 0px 0px 29px rgba(63, 189, 255, 0.2) inset;
  background-color: rgb(2, 6, 17);
  border: 1px solid #063478;
  border-radius: 4px;
}

.common_title {
  color: #9acbea;
  font-size: 20px;
  position: absolute;
  top: 26px;
  left: 16px;
  z-index: 999;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.pos_relative {
  position: relative;
}

.flex_row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.flex_row_xCenter {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

.flex_row_yCenter {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.flex_row_center {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.flex_column {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.flex_column_xCenter {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
}

.flex_column_yCenter {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}

.flex_column_center {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.right_content {
  flex: 1;
  min-height: 728px;
  background-color: #ffffff;
}

.blue_line {
  width: 4px;
  height: 22px;
  background: rgba(0, 111, 188, 1);
  margin-right: 8px;
}

.time1 {
  width: 90px;
}

.time2 {
  width: 120px;
  margin-left: 1%;
}

.time3 {
  width: 95px;
  margin-left: 1%;
}

.el-popover {
  background: rgba(0, 0, 0, 0.7) !important;
  color: #ffffff !important;
  word-wrap: break-word;
  /* border: 1px solid rgba(238, 238, 238, 1) !important;
  box-shadow: 0px 5px 9px 0px rgba(193, 193, 193, 0.9) !important;
  border-radius: 4px !important; */
}

.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none !important;
}

.el-select-dropdown {
  position: absolute !important;
}

/*animation-delay:1s*/
@keyframes floatUpDown {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(7px);
  }
}

@-webkit-keyframes floatUpDown {
  0% {
    -webkit-transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(7px);
  }
}

.floatUpDown {
  animation: floatUpDown 2s infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  -webkit-animation: floatUpDown 2s infinite;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-direction: alternate;
}
</style>
