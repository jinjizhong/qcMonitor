<template>
  <div class="left-screen f-between">
    <!-- :style="{'width': width+'px','height': height+'px'}"-->
    <!-- 左边 -->
    <div>
      <div class="plan-days f-center">
        <p>平台安全运行</p>
        <span v-for="(item,index) in daySplites" :key="index">
          {{ item }}
        </span>
        <p>天</p>
      </div>
      <div class="left-content charts_inset_shadow">
        <div style="height: 289px;width: 334px;">
          <barCharts title="当日负荷" barWidth="334" barHeight="289" :dataList="todayElectLoad.y"
            :xName="todayElectLoad.x.data" unitL="(kW)" unit="(时)" :gridPos="todayElectLoad.grid"
            fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :isBorder="false" />
          <!-- <div class="header-title"><img src="../../assets/image/bigscreen/icon_bt.png"/><span>当日负荷</span></div>
				<lineCharts barWidth="340" barHeight="270" :bool="true"
				:xDataList="todayElectLoad.x" :yDataList="todayElectLoad.y"/> -->
        </div>
        <p class="line-column" />
        <div style="height: 289px;width: 334px;">
          <!-- <columCharts normal title="总用电量" :dataList="totalElecUsed" barWidth="320" barHeight="260" /> -->
          <barCharts title="总用电量" barWidth="334" barHeight="289" unitL="kWh" unit="(日)" :dataList="totalElecUsed.y"
            :xName="totalElecUsed.x" :gridPos="totalElecUsed.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
            :isBorder="false" />
          <!-- <div class="header-title" style="position: absolute;"><img src="../../assets/image/bigscreen/icon_bt.png"/><span>总用电量</span></div>
				<rCharts barWidth="320" barHeight="275" :dataConfig="totalElecUsed"/> -->
        </div>
        <p class="line-column" />
        <div style="height: 289px;width: 334px;">
          <barCharts unitL="万kWh" unit="(月)" barWidth="334" barHeight="289" title="发电量与上网电量"
            :dataList="creatAndOnLine.y" :xName="creatAndOnLine.x" :gridPos="creatAndOnLine.grid"
            fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :isBorder="false" />

          <!-- <div class="header-title" style="position: absolute;"><img src="../../assets/image/bigscreen/icon_bt.png"/><span>发电量与上网电量</span></div>
					<rCharts style="position: absolute;" barWidth="320" barHeight="250" :dataConfig="creatAndOnLine"/> -->
        </div>
      </div>
    </div>

    <!-- 中间 -->
    <div>
      <div class="charts_inset_shadow mid-content-top">
        <div class="f-between">
          <div class="header-title"><img src="../../assets/image/bigscreen/icon_bt.png" /><span>客户厂站</span></div>
          <input type="text" class="search-style" placeholder="请输入搜索厂站" />
        </div>
        <div class="f-between" style="width: 573px;cursor: pointer;">
          <p class="mid-top-title">裕安大厦</p>
          <div @click="changePic()"><img src="../../assets/image/bigscreen/icon_qiehuan.png" />
            <!-- <span class="mid-top-swich">{{changeto.name}}</span> -->
          </div>
        </div>
        <div class="flex mid-banner-mar">
          <div class="charts_inset_shadow mid-banner">
            <!-- 这里加入左屏大图 -->
            <!-- http://www.hightopo.com/demo/drainage-pump-station/ 
						http://www.hightopo.com/demo/simplebuilding/
					-->
            <img class="kuoda" @click="kuoda()" src="../../assets/image/bigscreen/kuoda.png" />
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"
              class="iframeStyle" :src="changeto.bannerUrl"></iframe>
            <img @click="firstVideo()" class="video-first" src="../../assets/image/bigscreen/firstVideo.png" />
          </div>
          <div class="mid-right">
            <div class="mid-right-item flex" :class="index===0? '':'mar-top'" v-for="(item,index) in electInfo"
              :key="index">
              <p class="h-line" />
              <span class="i-name f-center" v-text="item.value" />
              <span class="i-num f-center" :class="index===0? 'color2':'color4'" v-text="item.key" />
              <span class="i-name f-center" v-text="item.dw" />
            </div>
            <div class="f-center" style="margin-top: 66px;">
              <warterCharts warterWidth="82" warterHeight="82" bgcolor="#04061d" :font="font" :dataConfig="warterData1"
                shadowBlur="0" />
              <warterCharts warterWidth="82" warterHeight="82" bgcolor="#04061d" :font="font" :dataConfig="warterData2"
                shadowBlur="0" />
            </div>
          </div>
        </div>
        <!-- 中间的 ===当日用电量  和 工单执行量 -->
        <div class="f-between">
          <div style="height: 280px;width: 401px;">
            <lineCharts barWidth="404" barHeight="280" title='当日用电量' :bool="true" :hasShadow="true"
              :dataConfig="useElected" />
          </div>
          <p class="line-row" />
          <div style="height: 280px;width: 401px;">
            <!-- 不规则的山峰图 -->
            <pCharts title="工单执行量" barWidth="399" barHeight="270" :dataConfig="doOrderData" />
          </div>
        </div>
      </div>
      <!-- 中间下面的 ===发电功率  和 总发电量 -->
      <div class="charts_inset_shadow mid-content-bottom f-between">
        <div style="height: 275px;width: 404px;">
          <barCharts unitL="(MW)" unit="(时)" barWidth="404" barHeight="275" title="发电功率" :dataList="createElecPower.y"
            :xName="createElecPower.x" :gridPos="createElecPower.grid" fontChartsColor="#9ACBEA"
            lineChartsColor="#0D3B6D" :isBorder="false" />

        </div>
        <p class="line-row" />
        <div style="height: 275px;width: 404px;">
          <barCharts unitL="万kWh" unit="(月)" barWidth="404" barHeight="275" title="总发电量" :dataList="totalElecCreat.y"
            :xName="totalElecCreat.x" :gridPos="totalElecCreat.grid" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
            :isBorder="false" />
        </div>
      </div>
    </div>
    <div class="popWindow" v-if="popShow">
      <img class="right_sx" @click="suoxiao()" src="../../assets/image/bigscreen/suoxiao.png" />
      <iframe v-if="changeto.type==2" class="iframeStyle" frameborder="no" border="0" marginwidth="0" marginheight="0"
        scrolling="yes" allowtransparency="yes" :src="changeto.bannerUrl" />
      <img v-else class="iframeStyle" :src="changeto.bannerUrl" />
    </div>

    <!-- 右边 -->
    <div>
      <div class="right-content charts_inset_shadow r-top">
        <div class="header-title"><img src="../../assets/image/bigscreen/icon_bt.png" /><span>告警</span></div>
        <div class="flex">
          <div>
            <div class="charts-title r-con-left">实时告警(个)</div>
            <div class="flex four-mod-pad">
              <div class="four-mod f-center" @click="policyClick('kaiguan')">
                <div class="flex_column_center">
                  <p class="num color1">{{policy.swich.value}}</p>
                  <p class="title">{{policy.swich.name}}</p>
                </div>
              </div>
              <div class="four-mod f-center" @click="policyClick('yaoxin')">
                <div class="flex_column_center">
                  <p class="num color1">{{policy.remote.value}}</p>
                  <p class="title">{{policy.remote.name}}</p>
                </div>
              </div>
            </div>
            <div class="flex four-mod-pad">
              <div class="four-mod f-center">
                <div class="flex_column_center" @click="policyClick('yaoce')">
                  <p class="num color1">{{policy.limite.value}}</p>
                  <p class="title">{{policy.limite.name}}</p>
                </div>
              </div>
              <div class="four-mod f-center" @click="policyClick('baohu')">
                <div class="flex_column_center">
                  <p class="num color1">{{policy.protected.value}}</p>
                  <p class="title">{{policy.protected.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="charts-title r-con-left">告警处理</div>
            <barCharts :yList="yList" barWidth="390" barHeight="280" unitL="(个)" unit="(日)" :dataList="policySolve.y"
              :xName="policySolve.x" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :gridPos="policySolve.grid"
              :isBorder="false" />
            <!-- <lineCharts style="padding-left: 20px;" barWidth="379" barHeight="280" :normal='true' :bool="true"
					:xDataList="policySolve.x" :yDataList="policySolve.y" :smooth='false'/> -->
          </div>
        </div>
      </div>
      <div class="right-content charts_inset_shadow r-middle">
        <div class="header-title"><img src="../../assets/image/bigscreen/icon_bt.png" /><span>运维工单</span></div>
        <div class="flex">
          <div>
            <div class="charts-title r-con-left">最新工单(个)</div>
            <div class="flex four-mod-pad">
              <div class="six-mod f-center" @click="orderClick('yichang')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.error.value}}</p>
                  <p class="title">{{order.error.name}}</p>
                </div>
              </div>
              <div class="six-mod f-center" @click="orderClick('daijieshou')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.jieshou.value}}</p>
                  <p class="title">{{order.jieshou.name}}</p>
                </div>
              </div>
              <div class="six-mod f-center" @click="orderClick('daidaochang')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.arrive.value}}</p>
                  <p class="title">{{order.arrive.name}}</p>
                </div>
              </div>
            </div>
            <div class="flex four-mod-pad">
              <div class="six-mod f-center" @click="orderClick('daifankui')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.feedback.value}}</p>
                  <p class="title">{{order.feedback.name}}</p>
                </div>
              </div>
              <div class="six-mod f-center" @click="orderClick('yiwancheng')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.yanshou.value}}</p>
                  <p class="title">{{order.yanshou.name}}</p>
                </div>
              </div>
              <div class="six-mod f-center" @click="orderClick('yiyanshou')">
                <div class="flex_column_center">
                  <p class="num color1">{{order.complete.value}}</p>
                  <p class="title">{{order.complete.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="charts-title r-con-left">工单处理</div>
            <barCharts :yList="yList" barWidth="390" barHeight="280" unitL="(个)" unit="(日)" :dataList="orderSolve.y"
              :xName="orderSolve.x" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" :gridPos="orderSolve.grid"
              :isBorder="false" />
          </div>
        </div>
      </div>
      <div class="right-content charts_inset_shadow f-between r-bottom">
        <!-- <barCharts barWidth="334" barHeight="275" title="智能巡检" :dataList="policyElected.y" :xName="policyElected.x" :yList="yPolicy"></barCharts> -->
        <div style="height: 275px;width: 404px;">
          <barCharts unitL="(个)" unit="(日)" title="智能巡检" :dataList="policyElected.y" :xName="policyElected.x"
            barWidth="360" barHeight="275" :gridPos="policyElected.grid" fontChartsColor="#9ACBEA"
            lineChartsColor="#0D3B6D" :isBorder="false" />
        </div>
        <!-- <pieCharts pieWidth="334" pieHeight="275" isLoopPie title="终端状态" :dataConfig="teminalState" /> -->

        <pieCharts :hasTitle="true" :pieRadius="pieRadius" pieHeight="285" pieWidth="285" fontColor="#FFFFFF"
          :showLable="false" title="终端状态" :dataList="teminalState" :piePosition="commonPiePosition"
          :chartColorList="colorListZD" />
      </div>
    </div>
  </div>
</template>

<script>
import warterCharts from '../../components/warterCharts/index.vue'
import barCharts from '../../components/barCharts/index'
import pCharts from '../../components/pictorialCharts/p_index.vue'
// import bCharts from '../components/pictorialCharts/b_index.vue'
// import columCharts from '../components/pictorialCharts/colum_index.vue'
import lineCharts from '../../components/pictorialCharts/line_index.vue'
import pieCharts from '../../components/pictorialCharts/pie_index.vue'

import uuid from 'uuid/v1'
export default {
  name: 'leftScreen',
  components: {
    warterCharts,
    barCharts,
    pCharts,
    // bCharts,
    // columCharts,
    lineCharts,
    pieCharts
  },
  data () {
    return {
      yList: [{ interval: 1 }],
      height: 0,
      width: 0,
      changeto: {
        type: 2,
        name: '切换为3D模型',
        bannerUrl: ''
      },
      popShow: false,
      warterData1: [0, '', '分', '主变健康度'],
      warterData2: [0, '', '次', '告警总数'],
      font: ['#A9DEFF', 18],
      electInfo: [
        { 'key': 0, 'value': '站点安全运行', 'dw': '天' },
        { 'key': 0, 'value': '电压等级', 'dw': 'KV' },
        { 'key': 0, 'value': '主变数量', 'dw': '台' },
        { 'key': 0, 'value': '变电容量', 'dw': 'MVA' }
      ],
      policy: {
        swich: { 'key': 0, 'value': '开关变位' },
        remote: { 'key': 0, 'value': '遥信变位' },
        limite: { 'key': 0, 'value': '遥测越限' },
        protected: { 'key': 0, 'value': '保护信号' }
      },
      order: {
        error: { 'key': 0, 'value': '异常' },
        jieshou: { 'key': 0, 'value': '待接收' },
        arrive: { 'key': 0, 'value': '待到场' },
        feedback: { 'key': 0, 'value': '待反馈' },
        yanshou: { 'key': 0, 'value': '已完成' },
        complete: { 'key': 0, 'value': '已验收' }
      },
      /* 智能巡检数据 */
      policyElected: {
        y: [{
          name: '正常',
          type: 'bar',
          color: '#35B271',
          data: []
        },
        {
          name: '异常',
          type: 'bar',
          color: '#D9424D',
          data: []
        }],
        x: [],
        grid: [25, 90, 50, 35]
      },
      /* 总用电量 */
      totalElecUsed: {
        x: ['1', '2', '3', '4', '5', '6'],
        y: [{
          name: '',
          type: 'bar',
          barWidth: '39%',
          data: []
        }],
        grid: [25, 90, 50, 35]
      },
      /* 总发电量 */
      totalElecCreat: {
        y: [{
          name: '',
          type: 'bar',
          barWidth: '35%',
          data: []
        }],
        x: ['1', '2', '3', '4', '5', '6'],
        grid: [25, 90, 50, 20]
      },
      /* 当日用电量 */
      useElected: {
        y: {
          unit: '(kWh)',
          data: []
        },
        x: {
          unit: '(时)',
          data: []
        }
      },
      /* 工单执行量 */
      doOrderData: {
        x: [1, 2, 3, 4, 5, 6],
        y: [2, 1, 3, 4, 5, 1]
      },
      /* 发电量与上网电量 */
      creatAndOnLine: {
        y: [{
          name: '发电量',
          type: 'bar',
          data: []
        },
        {
          name: '上网电量',
          type: 'bar',
          data: []
        }],
        x: [],
        grid: [25, 90, 50, 35]
      },
      /* 发电功率 */
      createElecPower: {
        y: [{
          name: '',
          type: 'line',
          color: '#00A8F6',
          data: []
        }],
        x: [],
        grid: [25, 90, 50, 20]
      },
      /* 当日负荷 */
      todayElectLoad: {
        y: [{
          name: '',
          type: 'line',
          data: [],
          smooth: true
        }],
        x: {
          unit: '(时)',
          data: []
        },
        grid: [25, 90, 50, 20]
      },
      /* 告警处理 */
      policySolve: {
        y: [{
          type: 'line',
          smooth: true,
          color: '#00A8F6',
          data: []
        }],
        x: [],
        grid: [45, 40, 50, 50]
      },
      /* 工单处理 */
      orderSolve: {
        y: [{
          type: 'line',
          smooth: true,
          data: []
        }],
        x: [],
        grid: [35, 40, 60, 50]
      },
      /* 终端状态 */
      teminalState: [],
      pieRadius: ['35%', '50%'],
      commonPiePosition: ['vertical', 'center', 'center'],
      colorListZD: ['#35B271', '#D9424D', '#00A8F6'],
      daySplites: []
    }
  },
  created () {
    // window.onresize = function (){
    //     alert(this.windowClient.width+'呵呵呵'+this.windowClient.height);
    // }
    /* this.height=document.body.clientHeight || document.documentElement.clientHeight;
    this.width=document.body.clientWidth || document.documentElement.clientWidth;;
	console.log('宽度：'+this.width+'高度：'+this.height) */

    this.getLeftScreenData();
    this.getLeftMidData();
    this.getLeftRightBottom();
  },
  methods: {
    // 获取左屏数据
    getLeftScreenData () {
      this.$store.dispatch('BigScreen/getLeftScreen').then((res) => {

        this.daySplites = this.spliteNumber(res.platformWorkTime);
        // 当日负荷
        this.todayElectLoad.y[0].data = res.thisDayFuhe.fuhe;
        this.todayElectLoad.x.data = res.thisDayFuhe.time;
        // 总用电量
        this.totalElecUsed.x = res.totalDianliang.day;
        this.totalElecUsed.y[0].data = res.totalDianliang.dianliang
        // 发电量与上网电量
        this.creatAndOnLine.x = res.faAndShangwangDianliang.month;
        this.creatAndOnLine.y[0].data = res.faAndShangwangDianliang.fadianliang;
        this.creatAndOnLine.y[1].data = res.faAndShangwangDianliang.shangwangdianliang;
        // 发电功率
        this.createElecPower.x = res.faDianGongLv.month;
        this.createElecPower.y[0].data = res.faDianGongLv.fadianliang;
        // 总发电量
        this.totalElecCreat.x = res.totalFadianliang.month;
        this.totalElecCreat.y[0].data = res.totalFadianliang.fadianliang;
        // 告警处理
        this.policy.swich = res.alertRealTime[0]
        this.policy.remote = res.alertRealTime[1]
        this.policy.limite = res.alertRealTime[2]
        this.policy.protected = res.alertRealTime[3]

        this.policySolve.x = res.AlertDealWith.x;
        this.policySolve.y[0].data = res.AlertDealWith.y;
        // 工单处理
        this.order.error = res.latestWorkOrder[0];
        this.order.jieshou = res.latestWorkOrder[1];
        this.order.arrive = res.latestWorkOrder[2];
        this.order.feedback = res.latestWorkOrder[3];
        this.order.yanshou = res.latestWorkOrder[4];
        this.order.complete = res.latestWorkOrder[5];
        this.orderSolve.x = res.workOrderDealWith.x;
        this.orderSolve.y[0].data = res.workOrderDealWith.y;
        // 智能巡检
        this.policyElected.x = res.zhinengxunjian.xAxis;
        this.policyElected.y[0].data = res.zhinengxunjian.yAxis1.data;
        this.policyElected.y[1].data = res.zhinengxunjian.yAxis2.data;
      });
    },
    // 获取左屏中间厂站数据
    getLeftMidData () {
      let params = {
        siteFid: "0b526dfa_1012_43d9_b01d_aaf400dd5cdc"
      };
      this.$store.dispatch('BigScreen/getLeftMidData', params).then((res) => {
        this.changeto.bannerUrl = res.graph
        this.graph = res.graph
        this.imghref = res.imghref

        this.electInfo[0].key = res.siteWorkTime == null ? 0 : res.siteWorkTime;
        this.electInfo[1].key = res.voltageGrade;
        this.electInfo[2].key = res.zhubianCount;
        this.electInfo[3].key = parseInt(res.biandianCapacity) / 1000;

        this.useElected.y.data = res.thisDayDianliang.dianliang;
        this.useElected.x.data = res.thisDayDianliang.hour;
        this.doOrderData.x = res.woExecCount.month;
        this.doOrderData.y = res.woExecCount.count;

        let score = 65 //  res.zhubianHealthDegree
        let waterColor1 = this.getWaterColor(score / 100)

        this.warterData1 = [parseInt(score) / 100, waterColor1[0], score + '分', '主变健康度']
        this.warterData2 = [0.3, '#BF3B48', res.alertCount + '次', '告警总数']
      })
    },
    getWaterColor (value) {
      let color = value < 0.6 ? ['#BF3B48', '#ffd1d1'] : ['#00A8F6', '#d0f5de']
      return color
    },
    // 获取左屏右下角数据
    getLeftRightBottom () {
      this.$store.dispatch('BigScreen/getLeftRightBottom').then((res) => {
        // 终端状态 res.clientCommState
        let arr1 = [];
        let arr2 = [];
        let total = 0;
        for (let it of res.clientCommState) {
          arr1.push(it.name + "：" + it.value);
          total += it.value;
        }
        for (let it of res.clientCommState) {
          arr2.push({ value: (it.value / total * 100).toFixed(1), name: it.name + "：" + it.value })
        }
        // this.teminalState = {
        //   dataLegend: arr1,
        //   dataSeries: arr2
        // }
        this.teminalState = arr2;
      })
    },
    changePic () {
      if (this.changeto.type === 1) {
        this.changeto = {
          type: 2,
          name: '切换为3D模型',
          bannerUrl: this.graph
        };
      } else {
        this.changeto = {
          type: 1,
          name: '切换为主接线图',
          bannerUrl: this.imghref
        };
      }
    },
    suoxiao () {
      this.popShow = false;
    },
    firstVideo () {
      // 视频的点击事件，右屏显示
    },
    kuoda () {
      this.popShow = true;
    },
    policyClick (item) {
      const value = {
        "id": uuid(),
        "type": item
      };
      //存储实时告警的数据类型
      localStorage.setItem('policy', JSON.stringify(value));
    },
    orderClick (item) {
      const value = {
        "id": uuid(),
        "type": item
      };
      //存储工单的数据类型
      localStorage.setItem('order', JSON.stringify(value));
    },
    // 分割数字
    spliteNumber (number) {
      let at = [];
      if (number >= 10 && number <= 99) {
        at.push("0")
        at.push(JSON.stringify(number).substring(0, 1))
        at.push(JSON.stringify(number).substring(1, 2))
      } else if (number >= 100 && number <= 999) {
        at.push(JSON.stringify(number).substring(0, 1))
        at.push(JSON.stringify(number).substring(1, 2))
        at.push(JSON.stringify(number).substring(2, 3))
      }
      return at;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.video-first {
  height: 102px;
  width: 160px;
  position: relative;
  left: 413.5px;
  bottom: 106px;
  pointer-events: none;
  cursor: pointer;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #9acbea;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #9acbea;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #9acbea;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #9acbea;
}
.line-row {
  height: 250px;
  width: 1px;
  background: rgba(6, 52, 120, 1);
}
.line-column {
  width: 310px;
  height: 1px;
  background: rgba(6, 52, 120, 1);
  margin-left: 9px;
  margin-right: 9px;
}
.flex {
  display: flex;
}
.color1 {
  color: #f79f00;
}
.color2 {
  color: #00c986;
}
.color3 {
  color: #9acbea;
}
.color4 {
  color: #00a8f6;
}
.search-style {
  width: 180px;
  height: 26px;
  background: #07325a;
  margin-right: 20px;
  border-radius: 2px;
  border: none;
  padding-left: 10px;
  color: #9acbea;
}
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.f-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-screen {
  padding: 22px 22px 22px 22px;
  // background-color: #04061d;
  display: flex;
}
.iframeStyle {
  width: 100%;
  height: 100%;
  border: none;
}
.header-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  padding: 10px 20px;
}
.header-title span {
  padding-left: 8px;
}
.charts-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(154, 203, 234, 1);
}
.plan-days {
  width: 335px;
  height: 138px;
  background-image: url("../../assets/image/bigscreen/img_anquanyunxing.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.plan-days span {
  width: 25px;
  display: flex;
  align-items: center;
}
.plan-days p {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  margin: 15px 10px 0px 10px;
}
.plan-days span {
  font-size: 42px;
  font-family: Acens;
  font-weight: 400;
  color: red;
  padding: 20px 15px 0px 5px;
}
.left-content {
  width: 334px;
  height: 870px;
  margin-top: 20px;
}
/* 中间 */
.mid-content-top {
  width: 810px;
  height: 730px;
}
.mid-content-bottom {
  width: 810px;
  height: 275px;
  margin-top: 20px;
}
.mid-top-title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(236, 236, 236, 1);
  margin: 10px 30px;
}
.mid-top-swich {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(217, 66, 77, 1);
  padding-left: 6px;
}
.mid-banner-mar {
  margin: 0px 20px;
}
.mid-banner {
  width: 573px;
  height: 360px;
  background: #000000;
}
.mid-banner .kuoda {
  position: absolute;
  margin-left: 545px;
  margin-top: 6px;
}
.mid-right {
  padding-left: 7px;
}
.mid-right-item {
  width: 188px;
  height: 43px;
  background: rgba(10, 30, 67, 1);
}
.mid-right .h-line {
  width: 1px;
  height: 43px;
  background: rgba(50, 153, 245, 1);
}
.mid-right .mar-top {
  margin-top: 8px;
}
.mid-right .i-name {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  padding-left: 10px;
}
.mid-right .i-num {
  font-size: 24px;
  font-family: DIN;
  font-weight: 400;
  padding: 0px 0px 0px 8px;
}
.popWindow {
  position: absolute;
  width: 1280px;
  height: 880px;
  background-color: #000000;
  left: 220px;
  top: 110px;
  z-index: 9999;
  /* border: 1px solid #F1F7FF; */
}
.popWindow .right_sx {
  position: absolute;
  z-index: 99999;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
}
/* 右边 */
.right-content {
  width: 680px;
}
.r-con-left {
  padding: 5px 0px 10px 30px;
}
/* 四个模块聚集区域 */
.four-mod-pad {
  padding: 0px 0px 0px 30px;
}
.four-mod {
  width: 120px;
  height: 110px;
  background: rgba(10, 30, 67, 1);
  margin-left: 6px;
  margin-top: 6px;
  cursor: pointer;
}
.four-mod .num {
  font-size: 28px;
  font-family: DIN;
  font-weight: 400;
}
.four-mod .title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
/* 六个模块聚集区域 */

.six-mod {
  width: 82px;
  height: 110px;
  background: rgba(10, 30, 67, 1);
  margin-left: 6px;
  margin-top: 6px;
  cursor: pointer;
}
.six-mod .num {
  font-size: 28px;
  font-family: DIN;
  font-weight: 400;
}
.six-mod .title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
}
.r-top {
  height: 354px;
}

.r-middle {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 351px;
}
.r-bottom {
  height: 275px;
}
.iframeStyle::-webkit-scrollbar {
  display: none;
}
</style>
