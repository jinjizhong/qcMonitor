<template>
  <runningModel :rmData="rmData" />
</template>

<script>
import runningModel from '../model.vue'
export default {
  name: 'gonglvysjc',
  components: {
    runningModel
  },
  data () {
    return {
      rmData: {
        thirdName: '回路',
        equType: '1',
        anaType: 'Jiance_Gonglvys',
        name: '功率因数监测',
        unitL: '',
        tableFields: [{
          name: '时间',
          label: '时间'
        }, {
          name: 'A相功率因数',
          label: 'A相功率因数'
        }, {
          name: 'B相功率因数',
          label: 'B相功率因数'
        }, {
          name: 'C相功率因数',
          label: 'C相功率因数'
        }],
        jsonFields: {
          时间: '时间',
          A相功率因数: 'A相功率因数',
          B相功率因数: 'B相功率因数',
          C相功率因数: 'C相功率因数'
        }
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
