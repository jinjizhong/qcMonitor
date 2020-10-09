<template>
  <div class="comment">
    <div class="item top">
      <button>返回</button>
      <div class="zi">
        <div class="zi_row">
          <p>设备名称：高压电源进线柜变压器</p>
          <p>设备编码：AZMQ0001</p>
        </div>
        <div class="zi_row">
          <p>设备型号：SFZZ-52000/230</p>
          <p>设备状态：<span>运行中 </span></p>
        </div>
        <div class="zi_row">
          <p>投运日期：2019-08-19</p>
          <p>所属站点：加枫路20号</p>
        </div>
      </div>

    </div>
    <div class="content flex_row_center">
      <div class="item left">
        <div class="item_top">
          <h3>安全评估</h3>
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :clearable="false">
            </el-date-picker>
          </div>
          <div class="flex_column_yCenter">
            <radarCharts raderWidth="300" :radius='radius' raderHeight="300" :dataConfig="dataConfig" />
          </div>
        </div>
      </div>
      <div class="item right">
        <div class="item_top">
          <h3>设备运行情况</h3>
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :clearable="false">
            </el-date-picker>
          </div>
          <div class="flex_column_yCenter">
            <warterCharts warterWidth="250" warterHeight="250" :dataConfig="warterData" />
          </div>
        </div>
      </div>
    </div>
    <div class="content flex_row_center">
      <div class="item left">
        <div class="item_top">
          <h3>故障率</h3>
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :clearable="false">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="item right">
        <div class="item_top">
          <h3>设备未来使用年限</h3>
        </div>
      </div>
    </div>
    <div class="item top flex_row_center">
      <div class="item_top">
        <h3>试验报告</h3>
        <div class="block">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { deviceInfoList } from '../../assets/js/config.js'
import radarCharts from '../../components/pictorialCharts/radar_index.vue'
import warterCharts from '../../components/warterCharts/index.vue'
export default {
  name: 'securityAnalyze',
  components: {
    radarCharts,
    warterCharts
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dataConfig: {
        indicator: [],
        range: [],
        value: []
      },
      anquan: [],
      kekao: [],
      jingji: [],
      value1: '',
      radius: 60,
      warterData: [0.6, '#FFA657', '60分', ''],
      borderColor: '#FF8E29'
      //hasTitle: false
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let params = {
        transFid: ''
      }
      // 清空雷达图
      this.dataConfig.value = []
      this.dataConfig.indicator = []
      this.dataConfig.range = []
      this.$store.dispatch('getHealth', params).then(res => {
        if (res) {
          this.jingji = res.ReturnData.jingji
          this.anquan = res.ReturnData.anquan
          this.kekao = res.ReturnData.kekao

          for (let it of res.ReturnData.theEcharts) {
            this.dataConfig.value.push(it.num)
            this.dataConfig.indicator.push({
              text: it.name
            })
            this.dataConfig.range.push({
              name: it.name,
              max: it.max
            })
          }
        }
      })
    }
  },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.comment {
  width: 100%;
  height: 100%;
}

.item {
  background-color: #ffffff;
}

.top {
  flex: 1;
  height: 150px;
}

button {
  width: 100px;
  height: 34px;
  margin: 20px 3%;
  background-color: #e5f3fd;
  color: #006fbc;
}

.zi {
  width: 99%;
  height: 16px;
  display: flex;
  margin: 0 3%;
}

.zi_row {
  margin: 0 10% 2% 0;

  span {
    color: #ff8e29;
  }
}

.content {
  width: 100%;
  height: 280px;
  margin: 9px 0 9px 0;

  .left {
    flex: 1;
    height: 100%;
    margin-right: 9px;
  }

  .right {
    flex: 2;
    height: 100%;
  }
}

h3 {
  float: left;
  padding-left: 15px;
  border-left: 5px solid #006fbc;
  margin: 19px 0 0 41px;
}
.block {
  float: right;
  margin: 17px 23px 0 0;
}
.i-left {
  width: 500px;
  height: 500px;
  // padding: 76px 249px 29px 180px;
}
</style>
