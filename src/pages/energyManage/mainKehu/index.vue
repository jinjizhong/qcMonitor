<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <span class="choose_label">选择厂站:</span>
      <el-select v-model="siteMod" placeholder="请选择厂站" @change="handleSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <!-- 中间的banner和信息展示 -->
    <div class="bannerData bor-top">
      <img class="banner" :src="topHeaderData.siteImage" />
      <div class="all">
        <div class="item bor-bottom">
          <div class="bg">
            <img class="logo" :src="icon1" />
            <div>
              <p class="p1">今年用电(kWh)</p>
              <p class="p2">{{ topHeaderData.thisYearUsed.value }}</p>
            </div>
          </div>
          <div></div>
        </div>
        <!-- <div style="height: 8px;width: 290px;background-color: #f0f2f5;"></div> -->
        <div class="item">
          <div class="bg">
            <img class="logo" :src="icon2" />
            <div>
              <p class="p1">本月估算电度电费(元)</p>
              <p class="p2">{{ topHeaderData.thisMonthCharge.value }}</p>
            </div>
          </div>
          <div>
            <p class="p3">
              同比
              <span :class="topHeaderData.thisMonthCharge.tongbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.thisMonthCharge.tongbi }}</span>
            </p>
            <p class="p4">
              环比
              <span :class="topHeaderData.thisMonthCharge.huanbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.thisMonthCharge.huanbi }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="all">
        <div class="item bor-bottom">
          <div class="bg">
            <img class="logo" :src="icon3" />
            <div>
              <p class="p1">本月用电(kWh)</p>
              <p class="p2">{{ topHeaderData.thisMonthUsed.value }}</p>
            </div>
          </div>
          <div>
            <p class="p3">
              同比
              <span :class="topHeaderData.thisMonthUsed.tongbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.thisMonthUsed.tongbi }}</span>
            </p>
            <p class="p4">
              环比
              <span :class="topHeaderData.thisMonthUsed.huanbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.thisMonthUsed.huanbi }}</span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <img class="logo" :src="icon4" />
            <div>
              <p class="p1">全年综合节能(吨标准煤)</p>
              <p class="p2">{{ topHeaderData.thisYearSaving.value }}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div class="all">
        <div class="item bor-bottom">
          <div class="bg">
            <img class="logo" :src="icon5" />
            <div>
              <p class="p1">今日用电(kWh)</p>
              <p class="p2">{{ topHeaderData.todayUsed.value }}</p>
            </div>
          </div>
          <div>
            <p class="p3">
              同比
              <span :class="topHeaderData.todayUsed.tongbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.todayUsed.tongbi }}</span>
            </p>
            <p class="p4">
              环比
              <span :class="topHeaderData.todayUsed.huanbi.indexOf('-') == -1 ? 'color-red' : 'color-green'">{{ topHeaderData.todayUsed.huanbi }}</span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="bg">
            <img class="logo" :src="icon6" />
            <div>
              <p class="p1">累计减少碳排放量(kg)</p>
              <p class="p2">{{ topHeaderData.carbonSaving.value }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-right">
        <div>
          <div class="title">
            <img class="logo" :src="icon7" />
            <p style="padding-left:5px">负载率(%)</p>
          </div>
          <div class="rb-scroll">
            <div class="rightItem">
              <div v-for="(item, index) in topHeaderData.fuzailv" :key="index">
                <p>{{ item.name }}</p>
                <p style="color: #000000;font-size: 20px;">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-right">
        <div>
          <div class="title">
            <img class="logo" :src="icon8" />
            <p style="padding-left:5px">本月平均功率因数</p>
          </div>
          <div class="rb-scroll">
            <div class="rightItem">
              <div v-for="(item, index) in topHeaderData.gonglvysh" :key="index">
                <p>{{ item.name }}</p>
                <p style="color: #000000;font-size: 20px;">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 本月用电量与电费 -->
    <div class="all-width-bg ">
      <div class="headerTitle">
        <p class="left"></p>
        <p class="right">本月用电量与电费</p>
      </div>
      <barCharts barWidth="100%" barHeight="300" unitL="(用电量/kWh)" unitR="(电度电费/元)" :dataList="energyData.y" :xName="energyData.x" needSecondUnit :returnRes="returnRes" />
    </div>
    <!-- 中分两表 -->
    <!-- <div class="flex-two-bg">
        <div class="item-bg">
          <div>
            <div class="headerTitle" style="padding-left:30px">
              <p class="left"></p>
              <p class="right">本月分时段用电</p>
            </div>
            <pieCharts :hasTitle="hasTitle" pieHeight="300" pieWidth="800" :dataList="yongdianData" :piePosition="piePosition" :centerText="allFengGu" centerTextColor="#333"></pieCharts>
          </div>
        </div>
        <div class="item-bg">
          <div>
            <div class="headerTitle" style="padding-left:30px">
              <p class="left"></p>
              <p class="right">本月估算电费</p>
            </div>
            <pieCharts :hasTitle="hasTitle" pieHeight="300" pieWidth="800" :dataList="dianfeiData" :piePosition="piePosition" centerTextColor="#333"></pieCharts>
          </div>
        </div>
      </div> -->

    <!-- 本月稳态电能质量异常时长统计 -->
    <!-- <div class="all-width-bg">
        <div>
          <div class="headerTitle">
            <p class="left"></p>
            <p class="right">本月稳态电能质量异常时长统计</p>
          </div>
          
          <barCharts style="margin-left: 20px;" barWidth="100%" barHeight="300" :dataList="elecErrorSum.y" :xName="elecErrorSum.x" />
        </div>
      </div> -->
    <!-- 本月重点能耗设备和本月变压器经济运行情况 -->
    <div class="flex-two-bg">
      <div class="item-bg">
        <div>
          <div class="nenghaoStyle">
            <div class="headerTitle">
              <p class="left"></p>
              <p class="right">本月重点能耗设备</p>
            </div>
            <div>
              <!-- <span class="shebeiTitle">设备类型</span>
                <el-select style="width:100px" v-model="siteId" placeholder="请选择" @change="shebeiType">
                  <el-option v-for="(item,index) in equipTypeList" :key="index" :label="item.name" :value="item.value" />
                </el-select> -->
            </div>
          </div>
          <columCharts normal :dataList="electUsed" hasSwich xName="(kWh)" barWidth="800" barHeight="300" @swich="swich" />
        </div>
      </div>
      <div class="item-bg">
        <div>
          <div class="headerTitle" style="padding-left:30px">
            <p class="left"></p>
            <p class="right">本月变压器经济运行情况</p>
          </div>
          <div class="yx-style">
            <img :src="icon9" alt="" />
            <div class="list">
              <div class="bg align item" v-for="(item, index) in topHeaderData.bianyaqiWorkState" :key="index">
                <p>{{ item.name }}：</p>
                <button disabled="disabled" :class="item.value == '经济' ? 'color1' : '' || item.value == '空载' ? 'color2' : '' 
					|| item.value == '重载' ? 'color3' : ''|| item.value == '超载' ? 'color4' : ''|| item.value == '轻载' ? 'color5' : ''">
                  {{ item.value }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import barCharts from '../../../components/barCharts/index.vue';
// import hCharts from '../../../components/pictorialCharts/h_index.vue'
import columCharts from '../../../components/pictorialCharts/colum_index.vue';
export default {
  name: 'mainkehu',
  components: {
    barCharts,
    columCharts
  },
  computed: mapState(['equipTypeList', 'curuserId', 'myCompanyId', 'userClients']),
  data () {
    return {
      returnRes: ['', '日'],
      hasTitle: false,
      rankType: 1,
      headerSite: [],
      siteMod: '',
      icon1: require('../../../assets/image/energy/icon_top_jnyd.png'),
      icon2: require('../../../assets/image/energy/icon_top_bygsdf.png'),
      icon3: require('../../../assets/image/energy/icon_top_byyd.png'),
      icon4: require('../../../assets/image/energy/icon_top_byzhjn.png'),
      icon5: require('../../../assets/image/energy/icon_top_jryd.png'),
      icon6: require('../../../assets/image/energy/icon_top_ljjstpl.png'),
      icon7: require('../../../assets/image/energy/icon_top_fzl.png'),
      icon8: require('../../../assets/image/energy/icon_top_glys.png'),
      icon9: require('../../../assets/image/energy/icon_bianyaqi.png'),
      bannerData: {
        bannerImg: require('../../../assets/image/energy/banner.png'),
        todayUse: {}
      },
      topHeaderData: {
        siteImage: '',
        thisYearUsed: {
          value: 0
        },
        thisMonthUsed: {
          value: 0,
          tongbi: '',
          huanbi: ''
        },
        todayUsed: {
          value: 0,
          tongbi: '',
          huanbi: ''
        },
        thisMonthCharge: {
          value: 0,
          tongbi: '',
          huanbi: ''
        },
        thisYearSaving: {
          value: 0
        },
        carbonSaving: {
          value: 0
        }
      },
      energyData: {
        y: [
          {
            name: '用电量',
            type: 'bar',
            unit: 'kWh',
            barWidth: '35%',
            data: []
          },
          {
            name: '电度电费',
            type: 'bar',
            unit: '元',
            barWidth: '35%',
            yAxisIndex: 1,
            data: []
          }
        ],
        x: []
      },
      piePosition: ['vertical', 'right', 'center'],
      yongdianData: [],
      dianfeiData: [],
      siteId: '001',
      elecErrorSum: {
        x: [],
        y: [
          {
            name: 'Ⅰ级风险',
            type: 'bar',
            barWidth: '39%',
            stack: 'two',
            data: []
          },
          {
            name: 'Ⅱ级风险',
            type: 'bar',
            barWidth: '39%',
            stack: 'two',
            data: []
          },
          {
            name: 'Ⅲ级风险',
            type: 'bar',
            barWidth: '39%',
            stack: 'two',
            data: []
          }
        ]
      },
      electUsed: {
        nameList: [],
        y: [],
        x: [
          {
            name: '',
            type: 'bar',
            barWidth: '35%',
            data: []
          }
        ]
      },
      allFengGu: '', //峰谷差
      zongdianfei: ''
    };
  },
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getInfo()
      }
    }
  },
  created () {
    let date = new Date();
    this.returnRes[0] = date.getMonth() + 1 + '月';
    this.getInfo()
  },
  async mounted () {
  },
  methods: {
    async getInfo () {
      await this.$store.dispatch('getCuruserId');
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      this.$store.dispatch('equipType', ''); //获取设备类型
      let params = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: 'NengXiao-home'
      };
      this.$store.dispatch('getSite', params).then(ee => {
        this.headerSite = ee.options;
        this.siteMod = this.headerSite[0].value;
        this.getNXHeader();
        this.getNXElecUsed();
        this.getWentai();
        this.getEquipTop10();
      });
    },
    shebeiType (value) {
      this.siteId = value;
      this.getEquipTop10();
    },
    swich () {
      if (this.rankType == 0) {
        this.rankType = 1;
      } else {
        this.rankType = 0;
      }
      this.getEquipTop10();
    },
    // 头部的数据
    getNXHeader () {
      let params = {
        anaType: 'NengXiao-home',
        siteFid: this.siteMod
      };
      this.$store.dispatch('nxKehuHeader', params).then(res => {
        this.topHeaderData = res;
      });
    },
    // 用电和电费图表数据
    getNXElecUsed () {
      let self = this;
      let params = {
        anaType: 'NengXiao-home',
        siteFid: self.siteMod
      };
      self.$store.dispatch('nxKehuElecUsed', params).then(res => {
        self.energyData.x = res.daysOfMonth;
        // 本月用电量与电费
        self.energyData.y[0].data = res.elec;
        self.energyData.y[1].data = res.charge;

        self.allFengGu = `峰谷差\n${res.fenggucha}kWh`;
        self.allMoney = `总电费\n${res.zongdianfei}元`;
        // 本月分时段用电
        for (let a of res.fengpinggu) {
          self.yongdianData.push(self.formatPie(a.name, a.value, a.percent, ''));
        }
        for (let b of res.chargePie) {
          self.dianfeiData.push(self.formatPie(b.name, b.value, b.percent, ''));
        }
      });
    },
    // 稳态电能
    getWentai () {
      let params = {
        anaType: 'NengXiao-home',
        siteFid: this.siteMod
      };
      this.$store.dispatch('nxWenTai', params).then(res => {
        this.elecErrorSum.x = res.daysOfMonth;
        this.elecErrorSum.y[0].data = res.level1;
        this.elecErrorSum.y[1].data = res.level2;
        this.elecErrorSum.y[2].data = res.level3;
      });
    },
    // 能耗设备和前十项排序
    getEquipTop10 () {
      let params = {
        anaType: 'NengXiao-home',
        siteFid: this.siteMod,
        equipType: this.siteId,
        rankType: this.rankType
      };
      this.$store.dispatch('equipTop10', params).then(res => {
        this.electUsed.y = [];
        this.electUsed.x[0].data = [];
        for (let it of res.equipTop10) {
          this.electUsed.y.unshift(it.name);
          this.electUsed.x[0].data.unshift(it.value);
        }
      });
    },
    // 格式化饼图数据
    formatPie (name, value, percent, unit) {
      let item = {
        name: name,
        value: percent.split('%')[0],
        label: {
          normal: {
            formatter: ['{b}: {c}%', value + unit].join('\n')
          }
        }
      };
      return item;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: center;
}
.align {
  align-items: center;
}
.mainindex {
  max-width: 1770px;
  min-width: 800px;
  // background-color: #ffffff;
}
.bor-top {
  border-top: 12px solid #f0f2f5;
}
.bor-bottom {
  border-bottom: 8px solid #f0f2f5;
}
.top {
  height: 60px;
  padding-left: 28px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}
.choose_label {
  padding-right: 18px;
}
//banner+设备信息展示
.bannerData {
  height: 280px;
  width: 100%;
  display: flex;
  //banner
  .banner {
    flex: 1;
    height: 280px;
  }
  //信息展示
  .all {
    flex: 1.5;
    margin-left: 10px;
    background: rgba(255, 255, 255, 1);
    .item {
      min-width: 60px;
      height: 136px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      padding-right: 10px;
      align-items: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      .logo {
        width: 42px;
        height: 42px;
        margin-right: 6px;
      }
      .p1 {
        color: #333333;
      }
      .p2 {
        font-size: 24px;
        font-family: Arial;
        color: #1a1a1a;
      }
      .p3 {
        color: #333333;
      }
      .p4 {
        color: #333333;
      }
    }
  }
  .color-red {
    color: #ff1b1b;
  }
  .color-green {
    color: #14d15c;
  }
  //右边的
  .banner-right {
    flex: 1;
    min-width: 50px;
    height: 280px;
    background-color: #ffffff;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 42px;
      height: 42px;
    }
    .title {
      display: flex;
      align-items: center;
    }
    // 滚动列表
    .rb-scroll {
      padding-top: 20px;
      display: flex;
      justify-content: center;
      .rightItem {
        // width: 140px;
        height: 180px;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
        font-size: 14px;
        span {
          font-size: 24px;
          padding-left: 5px;
        }
      }
      .rightItem::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.all-width-bg {
  //width: 1770px;
  max-width: 1770px;
  min-width: 800px;
  height: 360px;
  background-color: #ffffff;
  margin-top: 12px;
}
.flex-two-bg {
  display: flex;
  margin-top: 12px;
  .item-bg {
    flex: 1;
    height: 360px;
    background: rgba(255, 255, 255, 1);
  }
}
.headerTitle {
  display: flex;
  align-items: center;
  padding: 20px 0px 15px 20px;
  .left {
    width: 4px;
    height: 22px;
    background: rgba(0, 111, 188, 1);
  }
  .right {
    height: 16px;
    font-size: 16px;
    display: flex;
    align-items: center;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding-left: 8px;
  }
}
.nenghaoStyle {
  padding: 0px 30px 0px 30px;
  display: flex;
  //justify-content: space-between;
  align-items: center;
}
.yx-style {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 39px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  .img {
    width: 150px;
    height: 150px;
  }
  .list {
    margin-left: 60px;
    .item {
      margin: 0px 0px 15px 0px;
    }
    button {
      width: 106px;
      height: 30px;
      border: none;
      vertical-align: middle;
      text-align: center;
    }
    .color1 {
      background: #e4ffee;
      color: #13cf5a;
    }
    .color2 {
      background: #e5f4ff;
      color: #0086e3;
    }
    .color3 {
      background: #fff2e7;
      color: #ff8e29;
    }
    .color4 {
      background: #ffd6d6;
      color: #ff1b1b;
    }
    .color5 {
      background: #d7efff;
      color: #36adff;
    }
  }
}
.shebeiTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-right: 10px;
}
</style>
