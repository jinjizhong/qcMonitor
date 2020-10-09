<template>
  <deviceModel :dmData="dmData" />
</template>

<script>
import deviceModel from '../model.vue'
export default {
  name: 'dianrongqi',
  components: {
    deviceModel
  },
  data () {
    return {
      dmData: {
        equType: '2',
        anaType: 'SheBei-DianRongQi',
        isOpenStatus: true,  // 开关or运行状态
        txShow: false,  // 是否展示通讯状态
        tableStatus: [
          {
            name: '开',
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
            name: '最小值',
            value: 'min'
          },
          {
            id: '2',
            name: '平均值',
            value: 'avg'
          },
          {
            id: '3',
            name: '最大值',
            value: 'max'
          }
        ], // 数值类型选项
        leixing: 'avg' // 初始类型值
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
