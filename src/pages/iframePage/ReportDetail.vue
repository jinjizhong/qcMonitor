<template>
  <iframe v-if="isRouterAlive" class="iframe_box" :src="pageSrc" scrolling="auto" ref="iframe" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'reportDetail',
  props: {
    // iframe src
    pageSrc: {
      type: String,
      default: ''
    },
  },
  watch: {
    pageSrc: {
      handler () {
        this.reload()
      },
      deep: true
    },
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
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
