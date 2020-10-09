<template>
  <div class="right_screen">
    <BigScreenBox class="left_item" width="1245" height="1039" title="经济园区能效监测">
      <div class="data_box flex_row">
        <template v-for="(item, key) in dataTitleList">
          <DataBox :key="key" :name="item.name" :num="item.num" :dataIcon="item.dataIcon" :showLine="item.showLine" />
        </template>
      </div>
      <div class="area_box">
        <img class="area_bg" src="../../assets/image/secondBig/yuanqu.png" alt="img">
        <template v-for="(point, key) in pointList">
          <PointItem :key="key" :top="point.top" :left="point.left" :pointIcon="point.pointIcon" :type="point.type"
            :data="point.data" :pointWord="point.pointWord" :color="point.color" />
        </template>
        <!-- ------------ 图例 --------------- -->
        <div class="map_info flex_column">
          <p style="color:#CBEBFF;font-size:16px;margin: 10px 0 12px 20px;">图例</p>
          <div>
            <p class="map_p flex_row_yCenter">
              <img class="info_img" width="15" height="15" src="../../assets/image/customerBig/icon_gyyq.png"
                alt="img" /><span class="info_word">工厂园区</span>
            </p>
            <p class="map_p flex_row_yCenter">
              <img class="info_img" width="15" height="15" src="../../assets/image/customerBig/icon_syjz.png"
                alt="img" /><span class="info_word">商业建筑</span>
            </p>
            <p class="map_p flex_row_yCenter">
              <img class="info_img" width="15" height="15" src="../../assets/image/customerBig/icon_ynqy.png"
                alt="img" /><span class="info_word">重点用能企业</span>
            </p>
            <p class="map_p flex_row_yCenter">
              <img class="info_img" width="15" height="12" src="../../assets/image/customerBig/icon_gf.png"
                alt="img" /><span class="info_word">光伏</span>
            </p>
          </div>
        </div>
      </div>
    </BigScreenBox>
    <div class="flex_column">
      <BigScreenBox class="rt_item" width="603" height="288" title="园区能效指标">
        <div class="flex_row_xCenter">
          <table class="gridtable">
            <tr class="tr_header">
              <td class="header_item">项目</td>
              <td class="header_item">当前值</td>
              <td class="header_item">同比2019</td>
              <td class="header_item">完成情况</td>
            </tr>
            <tr v-for="(item, key) in tableData" :key="key">
              <td :style="{ paddingTop: item.id==0 ? '25px' : '12px' }">{{item.pro}}</td>
              <td :style="{ paddingTop: item.id==0 ? '25px' : '12px' }">{{item.num}}</td>
              <td class="flex_row_center"
                :style="{paddingTop: item.id==0 ? '25px' : '12px', color: item.type=='up' ? '#D9424D' : '' || item.type=='down' ? '#3DCF7F' : ''}">
                <span style="margin-right: 5px;">{{item.percent}}</span>
                <img v-if="item.type=='up'" src="../../assets/image/secondBig/icon_shangsheng.png" alt="img">
                <img v-else-if="item.type=='down'" src="../../assets/image/secondBig/icon_xiajiang.png" alt="img">
                <span v-else></span>
              </td>
              <td :style="{ paddingTop: item.id==0 ? '25px' : '12px' }">
                <span style="color:#3DCF7F;">{{item.status}}</span>
              </td>
            </tr>
          </table>
        </div>
      </BigScreenBox>
      <BigScreenBox class="rb_item" width="603" height="724" title="园区能耗监测">
        <div class="flex_row cir_top_box">
          <div class="flex_column_yCenter cir_left">
            <circleBox style="margin:36px 0px 16px 0px;" color="#F79F00" data="6321" unit="tce" word="今日综合能耗" />
            <p class="p_word">今日用电能耗：1230万kWh</p>
          </div>
          <div class="gradient_line1"></div>
          <div class="flex_column_yCenter cir_right">
            <circleBox style="margin:36px 0px 16px 0px;" color="#16E6FF" data="890" unit="kWh" word="今日发电量" />
            <p class="p_word">光伏总装机容量：6832kWp</p>
            <p class="p_word">今年新增光伏装机容量：1200kWp</p>
            <p class="p_word">今日碳减排量：0.8t</p>
          </div>
        </div>
        <div class="gradient_line2"></div>
        <div class="flex_column_yCenter">
          <circleBox style="margin:34px 0px 5px 0px;" color="#018AF4" data="28977" unit="kW" word="实时用电负荷" />
        </div>
        <div class="flex_column_yCenter">
          <barCharts :axisXInterval="axisXInterval" barWidth="500" barHeight="210" :dataList="dlList" :xName="dlListX"
            unitL="(kw)" :gridPos="bigPos" :chartColorList="chartColorList" fontChartsColor="#9ACBEA"
            lineChartsColor="#0D3B6D" :returnRes="returnRes" />
          <p class="chart_title">实时用电负荷</p>
        </div>
      </BigScreenBox>
    </div>
  </div>
</template>

<script>
import BigScreenBox from '../../components/bigScreenBox/index'
import CircleBox from './component/circleBox'
import DataBox from './component/dataBox'
import PointItem from './component/pointItem.vue'
import BarCharts from '../../components/barCharts/index'
import { rightScreenPointAction } from '../../assets/js/config'
export default {
  name: 'secondRight',
  computed: {
  },
  components: {
    BigScreenBox,
    CircleBox,
    BarCharts,
    DataBox,
    PointItem
  },

  data () {
    return {
      pointList: rightScreenPointAction,
      axisXInterval: 2,
      bigPos: [8, 30, 20, 10],
      chartColorList: ['#48B4FF'],
      dlListX: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      dlList: [{
        name: '',
        type: 'bar',
        barWidth: '35%',
        unit: 'kw',
        itemStyle: {
          color: new this.$echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: 'rgba(1,138,244,1)' },
              { offset: 1, color: 'rgba(77,105,231,0.02)' }
            ]
          )
        },
        // stack: 'two',
        data: ['800', '850', '830', '900', '950', '1000', '1200', '1500', '1600', '2100', '2850', '2897']
      }],
      dataTitleList: [{
        name: '接入工业园区数量',
        num: 105,
        showLine: true,
        dataIcon: require("../../assets/image/secondBig/icon_jierugongyeyuanqu.png")
      }, {
        name: '接入商业建筑数量',
        num: 150,
        showLine: true,
        dataIcon: require("../../assets/image/secondBig/icon_jierushangyejianzhu.png")
      }, {
        name: '接入光伏发电站数量',
        num: 560,
        showLine: true,
        dataIcon: require("../../assets/image/secondBig/icon_jieruguangfufadianzhan.png")
      }, {
        name: '采集设备数量',
        num: 1460,
        showLine: false,
        dataIcon: require("../../assets/image/secondBig/icon_caijishebeishuliang.png")
      }],
      returnRes: ['', ''],
      tableData: [
        {
          id: 0,
          pro: '单位增加值能耗量',
          num: '0.355tce/万元',
          percent: '3.2%',
          type: 'down',
          status: '正常'
        }, {
          id: 1,
          pro: '能耗总量',
          num: '102万tce',
          percent: '1.3%',
          type: 'up',
          status: '正常'
        }, {
          id: 2,
          pro: '单位增加值碳排放量',
          num: '0.981tCO２e/万元',
          percent: '2.8%',
          type: 'down',
          status: '正常'
        }]
    }
  },
  created () {
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.right_screen {
  display: flex;
}
.left_item {
  margin: 24px 24px 0px 24px;
}
.rt_item {
  margin-top: 24px;
}
.rb_item {
  margin-top: 25px;
}
.cir_top_box {
  position: relative;
  .p_word {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(154, 203, 234, 1);
    margin-bottom: 12px;
  }
  .cir_left {
    flex: 1;
  }
  .cir_right {
    flex: 1;
  }
  .gradient_line1 {
    width: 2px;
    height: 266px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(70, 226, 255, 0.97) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}
.gradient_line2 {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(70, 226, 255, 0.97) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.5;
}
.gridtable {
  color: #9acbea;
  border-collapse: collapse;
  width: 90%;
  overflow-y: scroll;
  margin-top: 25px;
}
.gridtable tr {
  width: 100%;
  color: rgba(77, 178, 255, 1);
}
.gridtable th {
  border-bottom: 1px solid #00a8f6;
  padding-bottom: 15px;
  font-size: 16px;
}
.gridtable td {
  padding: 12px;
  text-align: center;
  color: #9acbea;
  font-size: 16px;
  text-align: left;
}
.tr_header {
  height: 46px;
  font-size: 18px;
  .header_item {
    color: rgba(77, 178, 255, 1);
    font-weight: 400;
  }
}
.chart_title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #48b4ff;
}
.area_box {
  position: relative;
  // margin-top: 15px;
  width: 100%;
  height: 757px;
  .area_bg {
    position: absolute;
    left: 105px;
  }
  .map_info {
    position: absolute;
    bottom: 35px;
    right: 52px;
    width: 143px;
    height: 155px;
    background: rgba(6, 22, 109, 0.1);
    border: 1px solid #019ebe;
    box-shadow: 0px 0px 10px #019ebe inset;
    .map_p {
      margin-bottom: 5px;
      margin-left: 20px;
    }
    .info_word {
      color: #cbebff;
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
</style>
