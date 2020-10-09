<template>
  <runningModel :rmData="rmData" />
</template>

<script>
import runningModel from '../model.vue'
export default {
  name: 'gonglvjc',
  components: {
    runningModel
  },
  data () {
    return {
      rmData: {
        thirdName: '回路',
        equType: '1',
        anaType: 'Jiance_Gonglv',
        name: '功率监测',
        unitL: '(功率/kW)',
        tableFields: [{
          name: '时间',
          label: '时间'
        }, {
          name: '总有功功率',
          label: '总有功功率/kW'
        }, {
          name: '总无功功率',
          label: '总无功功率/kW'
        }],
        jsonFields: {
          时间: '时间',
          总有功功率: '总有功功率',
          总无功功率: '总无功功率'
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
