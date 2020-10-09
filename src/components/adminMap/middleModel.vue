<template>
  <div v-if="isShow"
       class="middle_model">
    <div class="title_box flex_row">
      <span class="title_word">{{title}}</span>
      <img @click="closeModel"
           width="16"
           height="16"
           src="../../assets/image/bigscreen/close.png"
           alt="img">
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'middleModel',
  props: {
    // 判断模态框显示 
    isShow: {
      type: Boolean,
      default: false
    },
    // 标题名字
    title: {
      type: [String],
      default: ''
    },
  },
  data () {
    return {
    }
  },
  methods: {
    closeModel (value) {
      this.$emit('closeModel', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.middle_model {
  width: 762px;
  min-height: 700px;
  padding: 0px 20px 10px 20px;
  background: rgba(15, 88, 123, 1);
  border: 1px solid rgba(14, 85, 120, 1);
  z-index: 999;
  position: absolute;
  top: 210px;
  left: 0;
  right: 0;
  margin: 0 auto;
  .title_box {
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    .title_word {
      color: #cfe9fc;
    }
    img:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}
</style>
