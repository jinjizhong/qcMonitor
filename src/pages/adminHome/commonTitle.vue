<template>
  <div :class="{common_title_kehu: !noIcon, common_title_noIcon: noIcon}" @click="toPage">
    <img style="margin-right:5px;" v-if="!noIcon" src="../../assets/image/admin/icon_sy_bt.png" alt="img">
    <span class="word">{{titleName}}</span>
  </div>
</template>

<script>

export default {
  name: 'commonTitle',
  props: {
    titleName: {
      type: String,
      default: ''
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    routeData: {
      type: [Array, Object],
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    toPage () {
      const that = this
      let propsData = {}
      switch (that.titleName) {
        case '报警统计':
          propsData = {
            name: 'Gaojingjc',
            params: null,
            isReload: null
          }
          that.$store.dispatch('propsRouteData', propsData)
          break
        case '当月工作计划':
          break
        case '未消除缺陷':
          break
        case '负荷曲线':
          propsData = {
            name: 'Gonglvjc',
            params: '?state=0'
          }
          that.$store.dispatch('propsRouteData', propsData)
          break
        case '电量监测':
          break
        case '本月最高负荷':
          var timeType = 'month_day'
          propsData = {
            name: 'Gonglvjc',
            params: `?timeType=${timeType}`
          }
          that.$store.dispatch('propsRouteData', propsData)
          break
        case '本月用电量':
          break
        case '功率因数':
          propsData = {
            name: 'Gonglvysjc',
            params: null
          }
          that.$store.dispatch('propsRouteData', propsData)
          break
        case '频率':
          break
        case '电压合格率':
          propsData = {
            name: 'Dianyajc',
            params: null
          }
          that.$store.dispatch('propsRouteData', propsData)
          break
        default:
          propsData = {}
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.common_title_kehu {
  display: flex;
  margin: 15px 5px 0 20px;
  font-weight: bold;
}
.common_title_noIcon {
  margin-left: 23px;
  margin-bottom: 3px;
  font-size: 16px;
  font-weight: 400;
}
.word {
  font-size: 16px;
  font-family: Microsoft YaHei;
  color: #36adff;
  cursor: pointer;
}
</style>
