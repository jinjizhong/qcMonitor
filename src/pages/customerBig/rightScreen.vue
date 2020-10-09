<template>
  <div class="right_screen">
    <div class="left_content charts_inset_shadow flex_column_yCenter">
      <div class="jj_title">
        <img src="../../assets/image/bigscreen/icon_bt.png" />
        <span class="common_kehu_title">经济园区能效监测</span>
      </div>
      <div class="data_box flex_row">
        <template v-for="(item, key) in dataList">
          <div class="data_item flex_column_center" :key="key">
            <div class="name">{{item.name}}</div>
            <div :style="{color: item.color}" class="value">{{item.value}}<span class="unit">个</span></div>
          </div>
          <div v-if="item.id!==3" :key="key" class="data_line"></div>
        </template>
      </div>
      <div class="area_box">
        <img class="area_bg" src="../../assets/image/customerBig/img_map.png" alt="img">
        <template v-for="(point, key) in pointList">
          <pointItem :key="key" :top="point.top" :left="point.left" :pointIcon="point.pointIcon" :type="point.type"
            :data="point.data" :pointWord="point.pointWord" />
        </template>
        <div class="map_info flex_column">
          <p style="color:#CBEBFF;font-size:16px;margin: 12px 0 15px 20px;">图例</p>
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

    </div>
    <div class="right_side">
      <div class="top_content charts_inset_shadow">
        <div>
          <img src="../../assets/image/bigscreen/icon_bt.png" />
          <span class="common_kehu_title">园区能效指标</span>
        </div>
        <div>
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
                <img v-if="item.type=='up'" src="../../assets/image/bigscreen/icon_shangsheng.png" alt="img">
                <img v-else-if="item.type=='down'" src="../../assets/image/bigscreen/icon_xiajiang.png" alt="img">
                <span v-else></span>
              </td>
              <td :style="{ paddingTop: item.id==0 ? '25px' : '12px' }">
                <span style="color:#3DCF7F;">{{item.status}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="bottom_content charts_inset_shadow">
        <div>
          <img src="../../assets/image/bigscreen/icon_bt.png" />
          <span class="common_kehu_title">园区能耗监测</span>
        </div>
        <div class="bt_item flex_row">
          <circleBox style="margin:0 21px 0 22px;" data="6321" unit="tce" word="今日综合能耗" />
          <div class="p_box">
            <p class="p_word">今日用电能耗：1230万kWh</p>
          </div>
        </div>
        <img style="margin:0 0 0 22px;" src="../../assets/image/customerBig/img_line.png" alt="img">
        <div class="bt_item flex_row">
          <circleBox style="margin:0 21px 0 22px;" color="#00C986" data="890" unit="kWh" word="今日发电量" />
          <div class="p_box">
            <p class="p_word">光伏总装机容量：6832kWp</p>
            <p class="p_word">今年新增光伏装机容量：1200kWp</p>
            <p class="p_word">今日碳减排量：0.8t</p>
          </div>
        </div>
        <img style="margin:0 0 0 22px;" src="../../assets/image/customerBig/img_line.png" alt="img">
        <div class="bt_item flex_row">
          <circleBox style="margin:0 21px 0 22px;" color="#48B4FF" data="28977" unit="kW" word="实时用电负荷" />
          <div class="chart_box">
            <p class="chart_title">实时用电负荷</p>
            <barCharts :axisXInterval="axisXInterval" barWidth="360" barHeight="180" :dataList="dlList" :xName="dlListX"
              unitL="(kw)" :gridPos="bigPos" :chartColorList="chartColorList" fontChartsColor="#9ACBEA"
              lineChartsColor="#0D3B6D" :returnRes="returnRes" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barCharts from '../../components/barCharts/index'
import circleBox from './circleBox.vue'
import pointItem from './pointItem.vue'
import { rightScreenPoint } from '../../assets/js/config'

export default {
  name: 'Right',
  components: {
    circleBox,
    barCharts,
    pointItem
  },
  data () {
    return {
      pointList: rightScreenPoint,
      axisXInterval: 2,
      bigPos: [8, 30, 20, 15],
      chartColorList: ['#48B4FF'],
      dlListX: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      dlList: [{
        name: '',
        type: 'bar',
        barWidth: '35%',
        unit: 'kw',
        // stack: 'two',
        data: ['800', '850', '830', '900', '950', '1000', '1200', '1500', '1600', '2100', '2850', '2897']
      }],
      returnRes: ['', ''],
      qy: require("../../assets/image/customerBig/icon_map_zdynqy.png"),
      jz: require("../../assets/image/customerBig/icon_map_syjz.png"),
      yq: require("../../assets/image/customerBig/icon_map_gyyq.png"),
      gf: require("../../assets/image/customerBig/icon_map_gf.png"),
      data1: {
        zrl: '5000',
        fh: '1250',
        num: '1'
      },
      data2: {
        zrl: '8000',
        fh: '5600',
        num: '0'
      },
      data3: {
        zrl: '600',
        fdl: '9835',
      },
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
        }],
      dataList: [
        {
          id: 0,
          name: '接入工厂园区数量',
          value: '5',
          style: 1,
          color: '#FC7635'
        }, {
          id: 1,
          name: '接入商业建筑数量',
          value: '15',
          style: 2,
          color: '#FF2323'
        }, {
          id: 2,
          name: '接入光伏发电站数量',
          value: '52',
          style: 1,
          color: '#4184FE'
        }, {
          id: 3,
          name: '采集设备数量',
          value: '2800',
          style: 2,
          color: '#00A6F3'
        }]
    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.common_kehu_title {
  color: #9acbea;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-left: 5px;
}
.right_screen {
  width: 100%;
  display: flex;
  .left_content {
    width: 1247px;
    height: 1032px;
    margin: 24px 24px 0 24px;
    position: relative;
    .jj_title {
      position: absolute;
      top: 19px;
      left: 32px;
    }
    .data_box {
      width: 1060px;
      height: 106px;
      background: rgba(3, 37, 71, 0.5);
      margin-top: 76px;
      align-items: center;
      .data_line {
        width: 1px;
        height: 60%;
        background: rgba(77, 178, 255, 0.15);
      }
      .data_item {
        height: 100%;
        flex: 1;
        .name {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #9acbea;
        }
        .value {
          font-size: 30px;
          font-family: DIN;
          font-weight: 400;
          margin-top: 10px;
        }
        .unit {
          color: #9acbea;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          margin-left: 2px;
        }
      }
    }
  }
  .right_side {
    margin-top: 24px;
    .top_content {
      padding: 20px;
      width: 561px;
      height: 250px;
      margin-bottom: 22px;
    }
    .bottom_content {
      padding: 20px;
      width: 561px;
      height: 678px;
    }
  }
}
.area_box {
  position: relative;
  margin-top: 23px;
  width: 960px;
  height: 100%;
  .area_bg {
    position: absolute;
  }
  .map_info {
    position: absolute;
    bottom: 50px;
    right: -85px;
    width: 143px;
    height: 155px;
    background: rgba(72, 180, 255, 0.2);
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
.table_content {
  color: #9acbea;
  width: 100%;
  .t_th {
    background: rgba(77, 178, 255, 0.1);
    width: 100%;
    height: 46px;
    display: block;
  }
}
.bt_item {
  margin-top: 28px;
  margin-bottom: 28px;
}
.chart_box {
  position: relative;
  .chart_title {
    position: absolute;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    top: -10px;
    left: 180px;
    color: rgba(72, 180, 255, 1);
  }
}
.p_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .p_word {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(154, 203, 234, 1);
    margin-bottom: 15px;
  }
}
.gridtable {
  color: #9acbea;
  border-collapse: collapse;
  width: 100%;
  overflow-y: scroll;
  margin-top: 30px;
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
}
.tr_header {
  height: 46px;
  background: rgba(77, 178, 255, 0.1);
  border-bottom: 1px solid #4db2ff;
  font-size: 18px;
  .header_item {
    color: rgba(77, 178, 255, 1);
    font-weight: 400;
  }
}
</style>
