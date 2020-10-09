<template>
  <div>
    <div class="top-header flex_row_yCenter">
      <p class="p-title">区域中心：</p>
      <el-cascader :options="placeCenter" v-model="selectedOptions" />
      <p class="p-title">运维班组：</p>
      <el-select class="time3" style="width: 160px;" v-model="teamItem" placeholder="请选择" @change="chooseTeam">
        <el-option v-for="(item, index) in teamsList" :key="index" :label="item.TeamName" :value="item.fid" />
      </el-select>
      <p class="p-title">时间选择：</p>
      <el-date-picker class="time2" v-model="startTime" type="year" placeholder="选择日期" @change="handleDate" :clearable="false" />
      <el-select class="time3" v-model="monthType" placeholder="请选择" @change="handleTime">
        <el-option v-for="(item, index) in dateList" :key="index" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <!-- 工单数量 -->
    <div class="third_info" v-if="boolTo !== 2">
      <div class="topBanner">
        <div class="b-left">
          <div class="i-top fc">
            <img class="logo" :src="icon1" />
            <div class="item">
              <p class="title">抢修工单数量（个）</p>
              <p class="num c1">{{ orderNum.qiangxiu }}</p>
            </div>
          </div>
          <p class="line" />
          <div class="i-bottom fc">
            <img class="logo" :src="icon2" />
            <div class="item">
              <p class="title">计划工单数量（个）</p>
              <p class="num c2">{{ orderNum.jihua }}</p>
            </div>
          </div>
        </div>
        <!-- 工单来源 -->
        <div class="b-right">
          <div class="third_title">
            <span class="blue_line"></span>
            <span>工单来源</span>
          </div>
          <barCharts v-if="boolTo == 0" barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="orderFromList" :xName="mouthList" />
          <barCharts v-if="boolTo == 1" barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="orderFromList" :xName="orderFromX" />
        </div>
      </div>
    </div>
    <!-- 工单完成统计 -->
    <div class="third_info" v-if="boolTo == 0">
      <div class="third_title">
        <span class="blue_line"></span>
        <span>工单完成统计</span>
      </div>
      <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" unitR="(完成率/%)" :dataList="orderComplete" :xName="mouthList" needSecondUnit />
    </div>
    <!-- 班组工单完成统计 -->
    <div class="third_info" v-if="boolTo == 0">
      <div class="third_title">
        <span class="blue_line"></span>
        <span>班组工单完成统计</span>
      </div>
      <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" unitR="(完成率/%)" :dataList="orderTeamComplete" :xName="mouthList" />
    </div>
    <!-- 班组单位个人工单量 -->
    <div class="third_info fc" v-if="boolTo == 0">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>班组单位个人工单量</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(人/个)" :dataList="teamPerComplete" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>班组排名</span>
        </div>
        <div class="bottomList">
          <el-table :data="teamsAll" height="300" border style="width: 100%;">
            <el-table-column prop="date" label="月份" />
            <el-table-column prop="bestTeam" label="最佳班组" />
            <el-table-column prop="qxOrderLateNum" width="140" label="抢修工单迟到次数" />
            <el-table-column prop="qxOrderWCL" label="抢修工单完成率" />
            <el-table-column prop="jhOrderWCL" label="计划工单完成率" />
            <el-table-column prop="jhOrderJetLag" label="计划工单工时差" />
            <el-table-column prop="score" label="总分" />
          </el-table>
        </div>
      </div>
    </div>

    <!-- 按月份筛选 -->
    <div class="third_info fc" v-if="boolTo == 1">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>班组工单完成情况</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="orderTeamComplete" :xName="teamsX" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>班组个人工单量统计</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="teamPerComplete" :xName="teamsX" />
      </div>
    </div>

    <!-- 按班组筛选 -->
    <div class="third_info fc" v-if="boolTo == 2">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>工单来源</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="orderFromList" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>工单数量统计</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="orderComplete" :xName="mouthList" />
      </div>
    </div>
    <div class="third_info fc" v-if="boolTo == 2">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>抢修工单平均响应时间</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(时间/秒)" :dataList="qxResponseTime" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>抢修工单平均到场时间</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(时间/秒)" :dataList="qxArriveTime" :xName="mouthList" />
      </div>
    </div>
    <div class="third_info fc" v-if="boolTo == 2">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>计划工单平均工时差</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(时间/分)" :dataList="jhAvgTimeCha" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>计划工单平均到场时间偏差</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(时间/分)" :dataList="jhAvgTimePian" :xName="mouthList" />
      </div>
    </div>
    <div class="third_info fc" v-if="boolTo == 2">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>工单平均完成时间</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(时间/时)" :dataList="orderCompleteAvg" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>工单异常率</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(异常率/%)" :dataList="orderErrorRate" :xName="mouthList" />
      </div>
    </div>
    <div class="third_info fc" v-if="boolTo == 2">
      <div class="t-left">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>工单完成率</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="(完成率/%)" :dataList="orderCompleteRate" :xName="mouthList" />
      </div>
      <div class="t-right">
        <div class="third_title">
          <span class="blue_line"></span>
          <span>单位个人工单量统计</span>
        </div>
        <barCharts barWidth="100%" barHeight="300" unitL="工单量/个" :dataList="teamPerComplete" :xName="mouthList" />
      </div>
    </div>
  </div>
</template>

<script>
import barCharts from '../../../components/barCharts/index.vue'
import { formatTime } from '../../../assets/js/common.js'
export default {
  name: 'orderAnalys',
  components: {
    barCharts
  },
  data () {
    return {
      boolTo: 0, //0代表全部，1代表月，2代表班组
      icon1: require('../../../assets/image/analysis/icon_gjgs.png'),
      icon2: require('../../../assets/image/analysis/icon_yjgs.png'),
      selectDeviceValue: [],
      selectedOptions: '',
      placeCenter: [],
      teamItem: '',
      teamsList: [],
      monthType: '',
      minuteType: '15',
      startTime: '2019',
      orderNum: {
        // 计划和抢修工单
        qiangxiu: 0,
        jihua: 0
      },
      mouthList: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      orderFromX: ['系统生成', '调度生成', '客服生成', '运维生成'],
      teamsX: [],
      orderFromList: [], //工单来源
      orderComplete: [], //工单完成统计
      orderTeamComplete: [], //班组工单完成统计
      teamPerComplete: [], //班组单位个人工单量
      teamsAll: [], //班组排名
      qxResponseTime: [], //抢修工单平均响应时间
      qxArriveTime: [], //抢修工单平均到场时间
      jhAvgTimeCha: [], //计划工单平均工时差
      jhAvgTimePian: [], //计划工单平均到场时间偏差
      orderCompleteAvg: [], //工单平均完成时间
      orderErrorRate: [], //工单异常率
      orderCompleteRate: [], //工单完成率
      dateList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '1月',
          value: '1'
        },
        {
          id: '2',
          name: '2月',
          value: '2'
        },
        {
          id: '3',
          name: '3月',
          value: '3'
        },
        {
          id: '4',
          name: '4月',
          value: '4'
        },
        {
          id: '5',
          name: '5月',
          value: '5'
        },
        {
          id: '6',
          name: '6月',
          value: '6'
        },
        {
          id: '7',
          name: '7月',
          value: '7'
        },
        {
          id: '8',
          name: '8月',
          value: '8'
        },
        {
          id: '9',
          name: '9月',
          value: '9'
        },
        {
          id: '10',
          name: '10月',
          value: '10'
        },
        {
          id: '11',
          name: '11月',
          value: '11'
        },
        {
          id: '12',
          name: '12月',
          value: '12'
        }
      ],
      hasTitle: false
    }
  },
  created () {
    // 运维班组数据
    this.$store.dispatch('getTeamList').then(res => {
      let item = {
        TeamName: '全部',
        fid: ''
      }
      this.teamsList.push(item)
      this.teamsList = this.teamsList.concat(res.teamList)
      for (let it of res.teamList) {
        this.teamsX.push(it.TeamName)
      }

      this.getData()
    })
  },
  mounted () {
    let time = new Date()
    this.startTime = JSON.stringify(time.getFullYear())
  },
  methods: {
    getData () {
      // 判断班组和月份显示
      if (this.monthType == '' && this.teamItem == '') {
        this.boolTo = 0
      } else if (this.monthType == '' && this.teamItem !== '') {
        this.boolTo = 2
      } else if (this.monthType !== '' && this.teamItem == '') {
        this.boolTo = 1
      }
      let params = {
        year: this.startTime,
        month: this.monthType,
        teamFid: this.teamItem
      }
      this.$store.dispatch('workOrderAnalysis', params).then(res => {
        // 工单数量
        //console.log(JSON.stringify(res))
        this.orderFromList = [] //工单来源
        this.orderComplete = [] //工单完成统计
        this.orderTeamComplete = [] //班组工单完成统计
        this.teamPerComplete = [] //班组单位个人工单量
        this.teamsAll = [] //班组排名

        this.qxResponseTime = [] //抢修工单平均响应时间
        this.qxArriveTime = [] //抢修工单平均到场时间
        this.jhAvgTimeCha = [] //计划工单平均工时差
        this.jhAvgTimePian = []//计划工单平均到场时间偏差
        this.orderCompleteAvg = [] //工单平均完成时间
        this.orderErrorRate = [] //工单异常率
        this.orderCompleteRate = [] //工单完成率

        if (res) {
          if (this.boolTo == 0) {
            this.orderNum.qiangxiu = res.orderNumObj.qxNum
            this.orderNum.jihua = res.orderNumObj.jhNum
            this.orderFromList.push(
              this.echartsItem(
                '系统生成',
                'bar',
                res.echarts1.xtscCell,
                '#FF8E29',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '调度生成',
                'bar',
                res.echarts1.ddscCell,
                '#13CF5A',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '客服生成',
                'bar',
                res.echarts1.kfscCell,
                '#36ADFF',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '运维生成',
                'bar',
                res.echarts1.ywscCell,
                '#0086E3',
                ''
              )
            )

            let addIt = { yAxisIndex: 1 }
            this.orderComplete.push(
              this.echartsItem(
                '抢修完成率',
                'line',
                res.echarts2.qxwanchenglvCell,
                '#FF8E29',
                addIt
              )
            )
            this.orderComplete.push(
              this.echartsItem(
                '计划完成率',
                'line',
                res.echarts2.jhwanchengLvCell,
                '#36ADFF',
                addIt
              )
            )
            this.orderComplete.push(
              this.echartsItem(
                '抢修',
                'bar',
                res.echarts2.qxCell,
                '#FF8E29',
                ''
              )
            )
            this.orderComplete.push(
              this.echartsItem(
                '计划',
                'bar',
                res.echarts2.jhCell,
                '#36ADFF',
                ''
              )
            )

            for (let it of res.echarts3) {
              this.orderTeamComplete.push(
                this.echartsItem(
                  it.teamName,
                  'line',
                  it.theOrderWclCell,
                  '',
                  addIt
                )
              )
              this.orderTeamComplete.push(
                this.echartsItem(
                  it.teamName,
                  'bar',
                  it.theOrderNumdCell,
                  '',
                  ''
                )
              )
            }

            for (let it of res.echarts4) {
              this.teamPerComplete.push(
                this.echartsItem(it.teamName, 'bar', it.cell, '', '')
              )
            }

            this.teamsAll = res.tjtb
          } else if (this.boolTo == 1) {
            this.orderNum.qiangxiu = res.qxnum
            this.orderNum.jihua = res.jxnum

            let it = { stack: 'two' }
            this.orderFromList.push(
              this.echartsItem('抢修', 'bar', res.echarts1.cell1, '#FF8E29', it)
            )
            this.orderFromList.push(
              this.echartsItem('计划', 'bar', res.echarts1.cell2, '#36ADFF', it)
            )

            this.orderTeamComplete.push(
              this.echartsItem('抢修', 'bar', res.echarts2.cell1, '#FF8E29', it)
            )
            this.orderTeamComplete.push(
              this.echartsItem('计划', 'bar', res.echarts2.cell1, '#36ADFF', it)
            )
            this.orderTeamComplete.push(
              this.echartsItem(
                '完成率',
                'line',
                res.echarts2.cell3,
                '#13CF5A',
                ''
              )
            )

            let valueList = []
            for (let it of res.echarts3) {
              valueList.push(it.value)
            }
            this.teamPerComplete.push(
              this.echartsItem('工单量', 'bar', valueList, '', '')
            )
          } else if (this.boolTo == 2) {
            this.orderFromList.push(
              this.echartsItem(
                '系统生成',
                'bar',
                res.echarts1.xtscCell,
                '#FF8E29',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '调度生成',
                'bar',
                res.echarts1.ddscCell,
                '#13CF5A',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '客服生成',
                'bar',
                res.echarts1.kfscCell,
                '#36ADFF',
                ''
              )
            )
            this.orderFromList.push(
              this.echartsItem(
                '运维生成',
                'bar',
                res.echarts1.ywscCell,
                '#0086E3',
                ''
              )
            )

            this.orderComplete.push(
              this.echartsItem(
                '抢修',
                'bar',
                res.echarts2.qxCell,
                '#FF8E29',
                ''
              )
            )
            this.orderComplete.push(
              this.echartsItem(
                '计划',
                'bar',
                res.echarts2.jhCell,
                '#36ADFF',
                ''
              )
            )
            let smooth = { smooth: true }
            this.qxResponseTime.push(
              this.echartsItem('秒', 'line', res.echarts3, '#36ADFF', smooth)
            )
            this.qxArriveTime.push(
              this.echartsItem('秒', 'line', res.echarts4, '#36ADFF', smooth)
            )
            this.jhAvgTimeCha.push(
              this.echartsItem('分', 'line', res.echarts5, '#36ADFF', smooth)
            )
            this.jhAvgTimePian.push(
              this.echartsItem('分', 'line', res.echarts6, '#36ADFF', smooth)
            )

            this.orderCompleteAvg.push(
              this.echartsItem(
                '抢修',
                'line',
                res.echarts7.cell0,
                '#FF8E29',
                smooth
              )
            )
            this.orderCompleteAvg.push(
              this.echartsItem(
                '计划',
                'line',
                res.echarts7.cell1,
                '#36ADFF',
                smooth
              )
            )

            this.orderErrorRate.push(
              this.echartsItem(
                '抢修',
                'line',
                res.echarts8.cell0,
                '#FF8E29',
                ''
              )
            )
            this.orderErrorRate.push(
              this.echartsItem(
                '计划',
                'line',
                res.echarts8.cell1,
                '#36ADFF',
                ''
              )
            )

            this.orderCompleteRate.push(
              this.echartsItem(
                '抢修',
                'line',
                res.echarts9.cell0,
                '#FF8E29',
                ''
              )
            )
            this.orderCompleteRate.push(
              this.echartsItem(
                '计划',
                'line',
                res.echarts9.cell1,
                '#36ADFF',
                ''
              )
            )

            this.teamPerComplete.push(
              this.echartsItem(
                '抢修',
                'bar',
                res.echarts10.cell0,
                '#FF8E29',
                ''
              )
            )
            this.teamPerComplete.push(
              this.echartsItem(
                '计划',
                'bar',
                res.echarts10.cell1,
                '#36ADFF',
                ''
              )
            )
          }
        }
      })
    },
    //选择班组
    chooseTeam (value) {
      this.teamItem = value
      this.monthType = ''
      this.getData()
    },
    // 选择年份
    handleDate (value) {
      let date = value.getTime() / 1000
      this.startTime = formatTime(date, 'Y')
      this.getData()
    },
    // 选择月份
    handleTime (value) {
      this.teamItem = ''
      this.monthType = value
      this.getData()
    },
    //echarts结构item
    echartsItem (name, type, dataList, color, second) {
      let item = {
        name: name,
        type: type,
        barWidth: '10%',
        barGap: 0,
        color: color,
        data: dataList
      }
      if (second == '') {
        return item
      } else {
        return Object.assign(item, second)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top-header {
  height: 60px;
  padding-left: 10px;
  background-color: #ffffff;
}
.third_info {
  background-color: #ffffff;
  margin-top: 12px;
  .third_title {
    display: flex;
    height: 45px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 15px;
    padding-left: 25px;
  }
  .t-left {
    flex: 1;
    border-right: 6px solid #f0f2f5;
  }
  .t-right {
    flex: 1;
    border-left: 6px solid #f0f2f5;
  }
}
.fc {
  display: flex;
  align-items: center;
  justify-content: center;
}
.topBanner {
  display: flex;
  width: 100%;
  .b-left {
    width: 100%;
    height: 380px;
    flex: 1;
    .i-top {
      height: 190px;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #dbdbdb;
    }
    .i-bottom {
      height: 190px;
    }
    .item {
      margin-left: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      .title {
        font-size: 16px;
        color: rgba(26, 26, 26, 1);
      }
      .num {
        font-size: 36px;
      }
    }
    .c1 {
      color: #ff8e29;
    }
    .c2 {
      color: #36adff;
    }
  }
  .b-right {
    flex: 2.2;
    width: 100%;
    border-left: 10px solid #f0f2f5;
  }
  .logo {
    width: 59px;
    height: 59px;
  }
}
.bottomList {
  width: 100%;
  height: 300px;
}

.p-title {
  margin-left: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
</style>
