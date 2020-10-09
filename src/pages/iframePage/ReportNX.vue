<template>
  <iframe class="iframe_box" :src="pageSrc" scrolling="auto" ref="iframe" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'reportNX',
  props: {
    // iframe src
    pageSrc: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.iframe_box {
  width: 100%;
  height: 100%;
}
</style>
