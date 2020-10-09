<template>
  <div class="rightScreen">
    <!-- 第一列 -->
    <div class="firstColumn">
      <div class="top-area">
        <barCharts title="客户数量统计" :yList='yList' barWidth="334" barHeight="324" :dataList="customerCount"
          :xName="customerCountX" unitL="(个)" :gridPos="customerCountPos" :chartColorList="chartColorList"
          fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" isBorder />
      </div>
      <div class="middle-area">
        <pieCharts title="区域客户统计" pieBottom="5" :dataList="customerCountByQuyu" isLoopPie hasTitle />
      </div>
      <div class="bottom-area">
        <pieCharts title="区域运维人员" pieBottom="5" :dataList="yunweiUserAmountByQuyu" isLoopPie hasTitle />
      </div>
    </div>
    <!-- 左边的第二列，和第一列是一样的 -->
    <div class="firstColumn">
      <div class="top-area">
        <pieCharts title="客服响应统计" pieBottom="5" :dataList="kefuResponse" isLoopPie hasTitle />
      </div>
      <div class="middle-area">
        <barCharts title="客服工单" barWidth="334" barHeight="336" :dataList="kefuWO" :xName="kefuWOX" unitL="(个)"
          :gridPos="bigPos" :chartColorList="chartColorList" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
          isBorder />
      </div>
      <div class="bottom-area">
        <barCharts title="客服工单执行" barWidth="334" barHeight="324" :dataList="kefuWOExec" :xName="kefuWOExecX" unitL="(个)"
          :gridPos="bigPos" :chartColorList="chartColorList" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D"
          isBorder />
      </div>
    </div>
    <!-- 第三列 -->
    <div class="thirdColumn">
      <div class="charts_inset_shadow pos_relative first_item">
        <div class="common_title" style="top: 20px;">
          <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/bigscreen/icon_bt.png"
            alt="image">
          <span>客服动态</span>
        </div>
        <div v-if="kefuDynamic&&kefuDynamic.length>0" class="flex_row_center earth_item"
          :style="{backgroundImage:kfdtImg}">
          <div class="earth_title">客户服务</div>
          <div class="item_content item1">
            <span>呼出接通率</span><span style="margin-left:5px;color:#34BB7C;">{{kefuDynamic[0].value}}</span>
          </div>
          <div class="item_content item2">
            <span>呼入接通率</span><span style="margin-left:5px;color:#34BB7C;">{{kefuDynamic[1].value}}</span>
          </div>
          <div class="item_content item3">
            <span>转接来电响应率</span><span style="margin-left:5px;color:#34BB7C;">{{kefuDynamic[2].value}}</span>
          </div>
          <div class="item_content item4">
            <span>平台响应率</span><span style="margin-left:5px;">{{kefuDynamic[3].value}}</span>
          </div>
          <div class="item_content item5">
            <span>客服投诉率</span><span style="margin-left:5px;color:#34BB7C;">{{kefuDynamic[4].value}}</span>
          </div>
          <div class="item_content item6">
            <span>邮件响应率</span><span style="margin-left:5px;">{{kefuDynamic[5].value}}</span>
          </div>
          <div class="item_content item7">
            <span>app响应率</span><span style="margin-left:5px;">{{kefuDynamic[6].value}}</span>
          </div>
          <div class="item_content item8">
            <span>微博响应率</span><span style="margin-left:5px;">{{kefuDynamic[7].value}}</span>
          </div>
          <div class="item_content item9">
            <span>回访率</span><span style="margin-left:5px;">{{kefuDynamic[8].value}}</span>
          </div>
          <div class="item_content item10">
            <span>IM响应率 </span><span style="margin-left:5px;">{{kefuDynamic[9].value}}</span>
          </div>
          <div id="earthGravity">
            <div id="earth">
              <div id="earthFilterContainer"></div>
            </div>
          </div>
        </div>
        <barCharts title="客服数据统计" fontChartsColor="#9ACBEA" lineChartsColor="#0D3B6D" barWidth="800" barHeight="260"
          :dataList="kefuDataStatistics" :xName="kefuDataStatisticsX" unitL="(条)" unit="(时)" :gridPos="kefuDataPos"
          :isBorder="false" :chartColorList="chartColorListStatistic" />
      </div>
      <div class="flex_row second_item charts_inset_shadow pos_relative">
        <div>
          <pieCharts pieWidth="336" pieHeight="324" title="客户满意度" hasTitle :dataList="customerStatisfaction"
            :isBorder="false" />
        </div>

        <div>
          <div class="common_title" style="top: 20px;left: 419px;">
            <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/bigscreen/icon_bt.png"
              alt="image">
            <span>坐席动态</span>
          </div>
          <div class="flex_row bottom-right">
            <div class="item f-center" v-for="(item,index) in zuoxiData" :key="index">
              <div>
                <img class="icon" :src="item.logo" />
                <div class="zhu">
                  <div class="z-show" :style="{'height':item.value}">
                    <p class="pp">{{item.value}}</p>
                  </div>
                </div>
                <p class="text">{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第四列 -->
    <div class="firstColumn">
      <div class="top-area zhiban-bg">
        <div class="common_title pos_relative">
          <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/bigscreen/icon_bt.png"
            alt="image">
          <span>
            值班信息
          </span>
        </div>
        <div style="margin-top: 55px;" class="flex_column_center">
          <p class="zb_item" v-for="(item, index) in zhiBanInfo" :key="index">
            <span class="f1">{{item.name}}</span>
            <span class="f2">{{item.value}}</span>
            <span class="f3">{{item.phNo}}</span>
          </p>
        </div>
      </div>
      <div class="middle-area">
        <pieCharts title="人员技能" pieBottom="5" :dataList="staffSkill" isLoopPie hasTitle />
      </div>
      <div class="bottom-area charts_inset_shadow">
        <div class="common_title pos_relative" style="top: 20px;">
          <img style="width: 29px; height: 13px; margin-right: 8px;" src="../../assets/image/bigscreen/icon_bt.png"
            alt="image">
          <span>运维资源</span>
        </div>
        <div class="fourth-bottom">
          <div class="f-item">
            <img :src="logo1" />
            <p class="text">运维车辆</p>
            <p class="num">{{yunWeiResource.carTotal}}</p>
            <p>辆</p>
          </div>
          <div class="f-item">
            <img :src="logo2" />
            <p class="text">运维人员</p>
            <p class="num">{{yunWeiResource.userTotal}}</p>
            <p>人</p>
          </div>
          <div class="f-item">
            <img :src="logo3" />
            <p class="text">专业设备</p>
            <p class="num">{{yunWeiResource.deviceTotal}}</p>
            <p>件</p>
          </div>
        </div>
      </div>
      <!-- <div style="margin-top:23px;">
				<pieCharts pieWidth="334" pieHeight="255" title="站点统计" :dataList="data2" isBorder></pieCharts>
			</div>
			<div style="margin-top:23px;">
				<pieCharts pieWidth="334" pieHeight="255" title="变电容量统计" :dataList="data3" isBorder></pieCharts>
			</div>
			<div style="margin-top:23px;">
				<barCharts barWidth="334" barHeight="277" title="终端统计" :dataList="zdTotalData" :yName="yNameZD" isBorder isRow>
				</barCharts>
			</div> -->
    </div>
  </div>
</template>

<script>
import pieCharts from '../../components/pieCharts/index'
import barCharts from '../../components/barCharts/index'

export default {
  name: 'rightScreen',
  components: {
    pieCharts,
    barCharts
  },
  data () {
    return {
      yList: [{ interval: 1 }],
      kfdtImg: `url(${require('../../assets/image/bigscreen/img_kfdt.png')})`,
      kfgdImg: `url(${require('../../assets/image/bigscreen/img_bg_kfgd.png')})`,
      zhibanxinxi: `url(${require('../../assets/image/bigscreen/img_zhibanxinxi.png')})`,
      logo1: require('../../assets/image/bigscreen/icon_ywcl.png'),
      logo2: require('../../assets/image/bigscreen/icon_ywry.png'),
      logo3: require('../../assets/image/bigscreen/icon_zysb.png'),
      customerCountX: [],
      customerCount: [{
        name: '',
        type: 'bar',
        barWidth: '25%',
        // stack: 'two',
        data: []
      }], //客户数量统计
      customerCountPos: [25, 90, 30, 20],
      customerCountByQuyu: [], //区域客户统计
      kefuWO: [{
        name: '在线处理',
        type: 'bar',
        barWidth: '39%',
        stack: 'two',
        data: []
      }, {
        name: '工单转换',
        type: 'bar',
        barWidth: '39%',
        stack: 'two',
        data: []
      }], //客服工单
      kefuWOX: [],
      yunweiUserAmountByQuyu: [], //区域运维人员
      kefuWOExec: [{
        name: '已完成',
        type: 'bar',
        barWidth: '39%',
        stack: 'two',
        data: []
      }, {
        name: '待完成',
        type: 'bar',
        barWidth: '39%',
        stack: 'two',
        data: []
      }], //客服工单执行
      kefuWOExecX: [],
      zhiBanInfo: [], //值班人员
      staffSkill: [], //人员技能
      yunWeiResource: {
        carTotal: '',
        userTotal: '',
        deviceTotal: ''
      }, //运维资源
      kefuResponse: [], //客服响应统计
      kefuDynamic: [], //客服动态
      kefuDataPos: [25, 90, 50, 20],
      kefuDataStatistics: [{
        name: '',
        type: 'line',
        data: [],
        smooth: true,
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,168,246,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,168,246,0.3)'
                }
              ],
              globaCoord: false
            }
          }
        }, //填充区域样式
        markArea: {}
      }], //客服数据统计
      kefuDataStatisticsX: [],
      chartColorListStatistic: ['#00A8F6', '#3ED381', '#F38051'],
      customerStatisfaction: [], //客户满意度
      zuoxiData: [
        {
          logo: require('../../assets/image/bigscreen/icon_thz.png'),
          title: '通话中',
          value: '30%'
        }, {
          logo: require('../../assets/image/bigscreen/icon_hhz.png'),
          title: '会话中',
          value: '60%'
        }, {
          logo: require('../../assets/image/bigscreen/icon_kxz.png'),
          title: '空闲中',
          value: '10%'
        }
      ],
      bigPos: [25, 90, 30, 45],
      chartColorList: ['#3ED381',
        '#00A8F6',
        '#00A8F6',
        '#F38051',
        '#3ED381',
        '#FFFF00',
        '#367BF8',
        '#D9424D',
        '#038cc4',
        '#75abd0',
        '#afd6dd']
    }
  },
  created () {
    this.getRightScreen()
  },
  methods: {
    getRightScreen () {
      this.$store.dispatch('BigScreen/getRightScreen').then(res => {
        this.customerCountX = res.customerCount.month
        this.customerCount[0].data = res.customerCount.data
        this.customerCountByQuyu = res.customerCountByQuyu

        this.kefuWO[0].data = res.kefuWO.yAxis1.data
        this.kefuWO[1].data = res.kefuWO.yAxis2.data
        this.kefuWOX = res.kefuWO.xAxis

        this.kefuWOExec[0].data = res.kefuWOExec.yAxis1.data
        this.kefuWOExec[1].data = res.kefuWOExec.yAxis2.data
        this.kefuWOExecX = res.kefuWOExec.xAxis

        this.yunweiUserAmountByQuyu = res.yunweiUserAmountByQuyu
        this.zhiBanInfo = res.zhiBanInfo
        this.staffSkill = res.staffSkill
        this.yunWeiResource = res.yunWeiResource
        this.kefuResponse = res.kefuResponse
        this.kefuDynamic = res.kefuDynamic
        this.kefuDataStatistics[0].data = res.kefuDataStatistics.yAxis
        this.kefuDataStatisticsX = res.kefuDataStatistics.xAxis
        this.customerStatisfaction = res.customerStatisfaction
        this.zuoxiData[0].value = res.zuoxiDynamic[0].percent
        this.zuoxiData[1].value = res.zuoxiDynamic[1].percent
        this.zuoxiData[2].value = res.zuoxiDynamic[2].percent
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.rightScreen {
  width: 100%;
  display: flex;
  /*左边第一个列 */
  .firstColumn {
    width: 334px;
    display: flex;
    flex-direction: column;
    margin-left: 21px;
    .top-area {
      width: 334px;
      height: 324px;
      margin-top: 24px;
    }
    .middle-area {
      width: 334px;
      height: 336px;
      margin-top: 24px;
    }
    .bottom-area {
      width: 334px;
      height: 324px;
      margin-top: 24px;
    }
  }
  /*左边第三个列 */
  .thirdColumn {
    width: 800px;
    display: flex;
    flex-direction: column;
    margin-left: 21px;

    .first_item {
      width: 100%;
      margin-top: 24px;
      height: 685px;

      .earth_item {
        width: 100%;
        height: 420px;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;

        .earth_title {
          color: #9acbea;
          font-size: 22px;
          font-weight: bold;
        }

        .item_content {
          font-size: 16px;
          color: #9acbea;
          height: 35px;
          line-height: 35px;
          padding: 0 20px;
          background: rgba(4, 51, 85, 0.8);
          border: 1px solid rgba(0, 168, 246, 1);
        }

        .item1 {
          position: absolute;
          left: 160px;
          top: 123px;
        }

        .item2 {
          position: absolute;
          left: 100px;
          top: 166px;
        }

        .item3 {
          position: absolute;
          left: 33px;
          top: 220px;
        }

        .item4 {
          position: absolute;
          left: 90px;
          top: 295px;
        }

        .item5 {
          position: absolute;
          left: 200px;
          top: 370px;
          z-index: 5;
        }

        .item6 {
          position: absolute;
          left: 360px;
          top: 350px;
        }

        .item7 {
          position: absolute;
          right: 110px;
          top: 300px;
        }

        .item8 {
          position: absolute;
          right: 35px;
          top: 208px;
        }

        .item9 {
          position: absolute;
          right: 125px;
          top: 138px;
        }

        .item10 {
          position: absolute;
          right: 275px;
          top: 68px;
        }
      }

      .woker_order {
        width: 100%;
        height: 263px;

        .worker_item {
          width: 190px;
          height: 107px;
          background-repeat: no-repeat;
          background-position: center;
          align-items: center;
        }
      }
    }

    .second_item {
      margin-top: 21px;
      width: 100%;
      height: 324px;

      .section {
        color: #9acbea;
        font-size: 16px;
        margin-left: 12px;
      }

      .spe {
        font-size: 24px;
        margin: 0 12px;
      }
    }

    .bottom-right {
      position: absolute;
      top: 80px;
      left: 410px;
      .item {
        /* padding-left: 79px; */
        width: 100px;
        .icon {
          margin-left: 5px;
          margin-bottom: 3px;
        }
        .zhu {
          width: 34px;
          height: 156px;
          position: relative;
          background: rgba(4, 27, 59, 1);

          .z-show {
            background: rgba(0, 168, 246, 1);
            width: 34px;
            position: absolute;
            bottom: 0px;
            .pp {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(0, 168, 246, 1);
              margin-top: -26px;
            }
          }
        }
        .text {
          width: 42px;
          height: 12px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(154, 203, 234, 1);
          line-height: 21px;
          opacity: 0.9;
          padding-top: 19px;
        }
      }
    }
  }
}
/* 第四个的最底部的 */
.fourth-bottom {
  margin: 39px 0px 0px 39px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(154, 203, 234, 1);
  .f-item {
    display: flex;
    align-items: center;
    padding-top: 30px;
  }

  .text {
    padding-left: 25px;
  }
  .num {
    padding-left: 7px;
    padding-right: 7px;
    font-size: 24px;
    font-family: DIN;
    font-weight: 400;
    color: rgba(243, 128, 81, 1);
  }
}

.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.zhiban-bg {
  background-image: url("../../assets/image/bigscreen/img_zhibanxinxi.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.zb_item {
  width: 100%;
  display: flex;
  z-index: 999;
  justify-content: center;
  margin-bottom: 41px;
  color: #d9424d;
  font-size: 16px;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines;
  .f1 {
    width: 69px;
  }
  .f2 {
    width: 50px;
    padding-left: 16px;
  }
  .f3 {
    width: 100px;
    padding-left: 16px;
  }
}
.line {
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(6, 52, 120, 1);
  border: 0.5px solid rgba(6, 52, 120, 1);
}

.word {
  color: #9acbea;
}

.table_title {
  color: #9acbea;
  font-size: 16px;
  height: 70px;
  display: flex;
  align-items: center;
}

table.gridtable {
  color: #9acbea;
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
  overflow-y: scroll;
}

table.gridtable tr {
  width: 100%;
  color: #00a6f4;
}

table.gridtable th {
  border-bottom: 1px solid #00a8f6;
  padding-bottom: 15px;
  font-size: 16px;
}

table.gridtable td {
  padding: 8px;
  text-align: center;
  color: #9acbea;
  font-size: 14px;
}

#earth {
  position: absolute;
  z-index: 999;
  width: 22px;
  height: 3px;
  border-radius: 50%;
  background-color: rgba(51, 190, 255, 1);
  overflow: hidden;
  box-sizing: border-box;
  border: 0px solid white;
  box-shadow: 0px 0px 3px 3px rgba(51, 190, 255, 0.9);
  animation: gravityRotationY 3s infinite;
  animation-timing-function: linear;
}

#earthGravity {
  position: absolute;
  width: 22px;
  height: 3px;
  border-radius: 50%;
  animation: gravityRotationX 3s infinite;
  animation-timing-function: linear;
  z-index: 999;
}

@keyframes gravityRotationX {
  0% {
    transform: translateX(-312px);
    animation-timing-function: ease-in;
  }

  25% {
    transform: translateX(0px);
    animation-timing-function: ease-out;
  }

  32% {
    z-index: -1000;
    animation-timing-function: ease-in;
  }

  32.1% {
    z-index: 999;
    animation-timing-function: ease-out;
  }

  50% {
    transform: translateX(312px);
    animation-timing-function: ease-in;
  }

  75% {
    transform: translateX(0px);
    animation-timing-function: ease-out;
  }

  100% {
    transform: translateX(-312px);
    animation-timing-function: ease-in;
  }
}

@keyframes gravityRotationY {
  0% {
    transform: translateY(-0px) scale(1, 1);
    animation-timing-function: ease-out;
    transform-origin: top top;
  }

  25% {
    transform: translateY(-90px) scale(0.8, 0.8);
    animation-timing-function: ease-in;
  }

  50% {
    transform: translateY(0px) scale(1, 1);
    animation-timing-function: ease-out;
  }

  75% {
    transform: translateY(88px) scale(1.8, 1.8);
    animation-timing-function: ease-in;
  }

  100% {
    transform: translateY(0px) scale(1, 1);
    animation-timing-function: ease-out;
  }
}
</style>
