<template>
  <runningModel :rmData="rmData" />
</template>

<script>
import runningModel from '../model.vue'
export default {
  name: 'dianyajc',
  components: {
    runningModel
  },
  data () {
    return {
      rmData: {
        thirdName: '回路',
        equType: '1',
        anaType: 'Jiance_Dianya',
        name: '电压监测',
        unitL: '(电压/V)',
        tableFields: [{
          name: '时间',
          label: '时间'
        }, {
          name: '线电压Uab',
          label: '线电压Uab/V'
        }, {
          name: '线电压Ubc',
          label: '线电压Ubc/V'
        }, {
          name: '线电压Uca',
          label: '线电压Uca/V'
        }],
        jsonFields: {
          时间: '时间',
          线电压Uab: '线电压Uab',
          线电压Ubc: '线电压Ubc',
          线电压Uca: '线电压Uca'
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
