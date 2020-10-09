<template>
  <div v-if="$isPc" class="device_box" ref="deviceInfo">
    <div class="flex_row_yCenter title">
      <img width="15" height="12" style="margin-right:5px;" src="../../assets/image/admin/icon_sbxx.png" alt="image" />
      <span style="font-weight:bold;">设备信息</span>
    </div>
    <div class="device_content">
      <div class="word">{{ deviceName }}</div>
      <div class="img_box">
        <img class="device_img" :src="equipImage" alt="image" />
      </div>
    </div>
    <div v-if="isOpenStatus" class="device_status flex_row_yCenter">
      <span class="status_word">开关状态:</span>
      <span :class="{
          sucState: runningStatus == 0,
          failState: runningStatus == 1
        }">{{ runningStatus | formatKaiGuan }}</span>
      <span :class="{
          sucCircle: runningStatus == 0,
          failCircle: runningStatus == 1
        }"></span>
    </div>
    <div v-else class="device_status flex_row_yCenter">
      <span class="status_word">运行状态:</span>
      <span :class="{
          sucState: runningStatus == 1,
          failState: runningStatus == 0
        }">{{ runningStatus | formatRunning }}</span>
      <span :class="{
          sucCircle: runningStatus == 1,
          failCircle: runningStatus == 0
        }"></span>
    </div>
    <div v-if="!txShow" class="device_status flex_row_yCenter">
      <span class="status_word">通讯状态:</span>
      <span :class="{
          sucState: communicateStatus == 0,
          failState: communicateStatus == 1
        }">{{ communicateStatus | formatCommunicate }}</span>
      <span :class="{
          sucCircle: communicateStatus == 0,
          failCircle: communicateStatus == 1
        }"></span>
    </div>
    <div class="btn_box">
      <div v-if="warnData[0]!==0" class="err_btn" @click="warnDataBtn('gj')">
        告警({{ warnData[0] }})
      </div>
      <div v-else class="err_btn_zero" @click="warnDataBtn('gj')">告警({{ warnData[0] }})</div>
      <div v-if="warnData[1]!==0" class="warn_btn" @click="warnDataBtn('yj')">
        预警({{ warnData[1] }})
      </div>
      <div v-else class="warn_btn_zero" @click="warnDataBtn('yj')">预警({{ warnData[1] }})</div>
    </div>

    <p class="info_list" v-for="(item, key) in deviceInfoList" :key="key">
      <span>{{ item.AttrName }}: </span>
      <span class="right">{{ item.AttrValue }}</span>
    </p>
    <div :style="{ height: lineHeight }" class="line"></div>
  </div>
  <div v-else>
    <p class="comment">基本信息</p>
    <p class="info_list" v-for="(item, key) in deviceInfoList" :key="key">
      <span>{{ item.AttrName }}: </span>
      <span class="right">{{ item.AttrValue }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'deviceInfo',
  props: {
    // 设备名称
    deviceName: {
      type: [String],
      default: ''
    },
    // 运行状态
    runningStatus: {
      type: [String, Number, Array],
      default: null
    },
    // 通讯状态
    communicateStatus: {
      type: [String, Number, Array],
      default: null
    },
    // 告警/预警
    warnData: {
      type: Array,
      default () {
        return []
      }
    },
    // 参数信息列表
    deviceInfoList: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否展示通讯状态
    txShow: {
      type: Boolean,
      default: false
    },
    // 运行状态文字修改
    runningWord: {
      type: String,
      default: '运行状态'
    },
    // 开关or运行状态
    isOpenStatus: {
      type: Boolean,
      default: false
    },
    // 设备图片
    equipImage: {
      type: String,
      default: null
    }
  },
  filters: {
    formatRunning (value) {
      return value == '1' ? '运行' : '停止'
    },
    formatKaiGuan (value) {
      return value == '0' ? '分' : '合'
    },
    formatCommunicate (value) {
      return value == '0' ? '正常' : '异常'
    }
  },
  data () {
    return {
      deviceHeight: '',
      lineHeight: 0
    }
  },
  created () { },
  mounted () {
    this.deviceHeight = this.$refs.deviceInfo.offsetHeight
    this.lineHeight = `${this.deviceHeight * 0.9}px`
  },
  methods: {
    warnDataBtn (value) {
      this.$emit('warnDataBtn', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media screen and (max-width: 700px) {
  .info_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 12vw;
    background-color: #ffffff;
    font-size: 3vw;
    span {
      color: #4d4d4d;
      margin-left: 3vw;
      margin-right: 3vw;
    }
  }
  p {
    border-bottom: 1px solid #e5e5e7;
    color: #4d4d4d;
  }
  // p:last-child{
  // 	border-bottom: none;
  // }
  .comment {
    font-size: 3vw;
    margin-left: 3vw;
    height: 7vw;
    color: #333333;
  }
}

.device_box {
  // width: 18.68%;
  min-height: 728px;
  padding: 16px 19px 16px 21px;
  position: relative;
  background-color: #ffffff;
  .title {
    margin-bottom: 16px;
  }
  .line {
    position: absolute;
    right: 0;
    top: 5%;
    width: 1px;
    background-color: #cccccc;
  }
  .device_content {
    margin-bottom: 20px;
    .word {
      font-weight: bold;
      color: #006fbc;
      font-size: 16px;
      margin-bottom: 5px;
    }
    .img_box {
      width: 100%;
      height: 240px;
      background-color: #eeeeee;
      position: relative;
      .device_img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
      }
    }
  }
  .device_status {
    margin-bottom: 10px;
    .status_word {
      color: #000;
      font-size: 16px;
    }
    .sucState {
      color: #3fb820;
      margin: 0 10px;
    }
    .sucCircle {
      background-color: #3fb820;
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    .failState {
      color: #ff3636;
      margin: 0 10px;
    }
    .failCircle {
      background-color: #ff3636;
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
  }
  .btn_box {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    .err_btn {
      width: 116px;
      height: 40px;
      line-height: 40px;
      background: #ff3636;
      color: #ffffff;
      border-radius: 5px;
      text-align: center;
      margin-right: 20px;
    }
    .warn_btn {
      width: 116px;
      height: 40px;
      line-height: 40px;
      background: #fc7635;
      color: #ffffff;
      border-radius: 5px;
      text-align: center;
    }
    .err_btn_zero {
      width: 116px;
      height: 40px;
      line-height: 40px;
      background-color: #dce1e5;
      color: #4d4d4d;
      border-radius: 5px;
      text-align: center;
      margin-right: 20px;
      border: 1px solid #dce1e5;
      cursor: pointer;
    }
    .warn_btn_zero {
      width: 116px;
      height: 40px;
      line-height: 40px;
      background-color: #dce1e5;
      color: #4d4d4d;
      border-radius: 5px;
      text-align: center;
      border: 1px solid #dce1e5;
      cursor: pointer;
    }
    .warn_btn:hover,
    .err_btn:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: all ease 0.3s;
    }
  }
  @media screen and (min-width: 700px) {
    .info_list {
      color: #000;
      margin-bottom: 15px;
      font-size: 14px;
    }
  }
}
</style>
