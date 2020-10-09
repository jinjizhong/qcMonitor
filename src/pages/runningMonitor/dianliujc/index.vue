<template>
  <runningModel :rmData="rmData" />
</template>

<script>
import runningModel from '../model.vue'
export default {
  name: 'dianliujc',
  components: {
    runningModel
  },
  data () {
    return {
      rmData: {
        thirdName: '回路', // 设备or回路选项
        equType: '1', // loopOrEquip配置
        anaType: 'Jiance_Dianliu',
        name: '电流监测',
        unitL: '(电流/A)',
        tableFields: [{
          name: '时间',
          label: '时间'
        }, {
          name: 'A相电流',
          label: 'A相电流/A'
        }, {
          name: 'B相电流',
          label: 'B相电流/A'
        }, {
          name: 'C相电流',
          label: 'C相电流/A'
        }], // 表格配置
        jsonFields: {
          时间: '时间',
          A相电流: 'A相电流',
          B相电流: 'B相电流',
          C相电流: 'C相电流'
        }, // excel表格配置
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
