<template>
  <deviceModel :dmData="dmData" />
</template>

<script>
import deviceModel from '../model.vue'
export default {
  name: 'duanluqi',
  components: {
    deviceModel
  },
  data () {
    return {
      dmData: {
        name: '断路器',
        equType: '2',
        anaType: 'SheBei-DuanLuqi',
        isOpenStatus: true,  // 开关or运行状态
        txShow: false,  // 是否展示通讯状态
        tableStatus: [
          {
            name: '分',
            type: 0
          },
          {
            name: '合',
            type: 2
          }
        ], //监测数据中状态数据显示
        typeList: [
          {
            id: '1',
            name: '采样值',
            value: ''
          }
        ],
        leixing: '' // 初始类型值
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
