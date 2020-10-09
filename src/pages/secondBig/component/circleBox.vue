<template>
  <div class="circle_box flex_column_center">
    <p>
      <span :style="{color: color}" class="data">{{data}}</span>
      <span :style="{color: color}" class="unit">{{unit}}</span>
    </p>
    <p class="word">{{word}}</p>
  </div>
</template>

<script>

export default {
  name: 'commonTitle',
  props: {
    color: {
      type: String,
      default: '#F38051'
    },
    data: {
      type: [String, Number],
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    word: {
      type: String,
      default: ''
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
.circle_box {
  width: 150px;
  height: 120px;
  background-image: url("../../../assets/image/secondBig/ring.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .word {
    font-size: 14px;
    font-weight: bold;
    color: #9acbea;
  }
  p {
    font-family: Microsoft YaHei;
    font-weight: 400;
    .data {
      font-size: 20px;
    }
    .unit {
      font-size: 14px;
    }
  }
}
</style>
