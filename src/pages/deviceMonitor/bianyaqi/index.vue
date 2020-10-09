<template>
  <deviceModel :dmData="dmData" />
</template>

<script>
import deviceModel from '../model.vue'

export default {
  name: 'bianyaqi',
  components: {
    deviceModel
  },
  data () {
    return {
      dmData: {
        name: '变压器',
        equType: '2',
        anaType: 'SheBei-BianYaQi',
        isOpenStatus: false,  // 开关or运行状态
        txShow: true,  // 是否展示通讯状态
        tableStatus: [
          {
            name: '动作',
            type: 2
          },
          {
            name: '复归',
            type: 0
          }
        ], //监测数据中状态数据显示
        typeList: [
          {
            id: '1',
            name: '采样值',
            value: ''
          }
        ], // 数值类型选项
        leixing: '' // 初始类型值
      }
    }
  },
  created () {
  }
  // activated () {
  //   console.log('11')
  //   clearInterval(this.timer)
  // },
  // deactivated () {
  //   console.log('22')
  //   clearInterval(this.timer)
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
