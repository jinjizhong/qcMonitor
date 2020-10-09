<template>
  <div>
    <!-- 头部 -->
    <div class="top-header flex_row_yCenter">
      <!-- <p class="p-title">选择公司：</p>
      <el-select v-model="selectedCompany" placeholder="请选择公司" @change="chooseCompany">
        <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <p class="p-title">厂站：</p>
      <el-select v-model="siteId" placeholder="请选择厂站" @change="chooseSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <p class="p-title">站点监测：</p>
      <el-select v-model="siteMonite" placeholder="请选择" @change="chooseMonite">
        <el-option v-for="item in placeCenter" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="bottom-area">
      <div class="banner-flex">
        <div class="b-img" :style="{ backgroundImage: bg1 }">
          <p class="title">环境温湿度</p>
          <p class="content" v-for="(item,index) in huanjing" :key="index">
            {{item.name}}：{{item.value}}</p>
        </div>
        <div class="b-img" :style="{ backgroundImage: bg2 }">
          <p class="title">水浸</p>
          <p class="content"></p>
          <div class="fc">
            <p class="content">异常</p>
            <img class="e-img" :src="errorLogo" />
          </div>
        </div>
        <div class="b-img" :style="{ backgroundImage: bg3 }">
          <p class="title">烟雾</p>
          <p class="content">1#异常</p>
          <div class="fc">
            <p class="content">2#异常</p>
            <img class="e-img" :src="errorLogo" />
          </div>
        </div>
        <div class="b-img f-center" :style="{ backgroundImage: bg4 }">
          <img src="../../../assets/image/donghuan/icon_shipin_bofang.png">
        </div>
      </div>
      <div class="bt-flex">
        <div class="bt-item fbt">
          <div class="lr">
            <img :src="logo1" />
            <div>
              <p class="t">告警个数(个)</p>
              <p class="num">0</p>
            </div>
          </div>
          <p class="line" />
          <div class="lr">
            <img :src="logo2" />
            <div>
              <p class="t">预警个数(个)</p>
              <p class="num">0</p>
            </div>
          </div>
        </div>
        <div class="bt-item" v-for="(item, index) in listContent" :key="index">
          <div class="fc i-top">
            <img v-if="index == 0" :src="icon0" />
            <img v-if="index == 1" :src="icon1" />
            <img v-if="index == 2" :src="icon2" />
            <img v-if="index == 3" :src="icon3" />
            <img v-if="index == 4" :src="icon4" />
            <img v-if="index == 5" :src="icon5" />
            <img v-if="index == 6" :src="icon6" />
            <img v-if="index == 7" :src="icon7" />
            <p class="t-title">{{ item.title }}</p>
          </div>
          <p class="i-center">
            总数量：<span>{{ item.totalCount }}</span>个
          </p>
          <p class="ll" />
          <div class="bottom flex_row_xCenter" v-if="item.type == 0">
            <el-popover placement="right" width="100" trigger="hover">
              <div>
                <p v-for="(i, index1) in item.work" :key="index1">
                  {{ i.equipName }} {{ i.state }}
                </p>
              </div>
              <p class="b-text" slot="reference" :class="item.work.length == 0 ? '' : 'color1'">
                运行：<span>{{ item.work.length }}</span>
              </p>
            </el-popover>
            <el-popover placement="right" width="100" trigger="hover">
              <div>
                <p v-for="(i, index1) in item.fault" :key="index1">
                  {{ i.equipName }} {{ i.state }}
                </p>
              </div>
              <p class="b-text" slot="reference" :class="item.fault.length == 0 ? '' : 'color2'">
                故障： <span>{{ item.fault.length }}</span>
              </p>
            </el-popover>
            <el-popover placement="right" width="100" trigger="hover">
              <div>
                <p v-for="(i, index1) in item.stop" :key="index1">
                  {{ i.equipName }} {{ i.state }}
                </p>
              </div>
              <p class="b-text" slot="reference" :class="item.stop.length == 0 ? '' : 'color3'">
                停止：<span>{{ item.stop.length }}</span>
              </p>
            </el-popover>
          </div>
          <div class="bottom flex_row_xCenter" v-if="item.type == 1">
            <el-popover placement="right" width="100" trigger="hover">
              <div>
                <p v-for="(i, index1) in item.normal" :key="index1">
                  {{ i.equipName }} {{ i.state }}
                </p>
              </div>
              <p class="b-text" slot="reference" :class="item.normal.length == 0 ? '' : 'color1'">
                正常：<span>{{ item.normal.length }}</span>
              </p>
            </el-popover>
            <el-popover placement="right" width="100" trigger="hover">
              <div>
                <p v-for="(i, index1) in item.abnormal" :key="index1">
                  {{ i.equipName }} {{ i.state }}
                </p>
              </div>
              <p class="b-text" slot="reference" :class="item.abnormal.length == 0 ? '' : 'color2'">
                异常：<span>{{ item.abnormal.length }}</span>
              </p>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDate } from '../../../assets/js/common.js'
export default {
  name: 'siteChoose',
  components: {},
  computed: mapState([
    'headerSite',
    'userClients',
    'myCompanyId',
    'curuserId'
  ]),
  data () {
    const currentDate = getDate({
      format: true
    })
    return {
      anaType: 'DongHuan-QuYu',
      icon0: require('../../../assets/image/donghuan/icon_bt_ups.png'),
      icon1: require('../../../assets/image/donghuan/icon_bt_xdc.png'),
      icon2: require('../../../assets/image/donghuan/icon_bt_fj.png'),
      icon3: require('../../../assets/image/donghuan/icon_bt_gps.png'),
      icon4: require('../../../assets/image/donghuan/icon_bt_kt.png'),
      icon5: require('../../../assets/image/donghuan/icon_bt_txxl.png'),
      icon6: require('../../../assets/image/donghuan/icon_bt_sf6.png'),
      icon7: require('../../../assets/image/donghuan/icon_bt_mj.png'),
      errorLogo: require('../../../assets/image/donghuan/icon_yichang.png'),
      logo1: require('../../../assets/image/donghuan/icon_gjgs.png'),
      logo2: require('../../../assets/image/donghuan/icon_yjgs.png'),
      bg1: `url(${require('../../../assets/image/donghuan/img_hjwd.png')})`,
      bg2: `url(${require('../../../assets/image/donghuan/img_sj.png')})`,
      bg3: `url(${require('../../../assets/image/donghuan/img_yw.png')})`,
      bg4: `url(${require('../../../assets/image/donghuan/img_shipin.png')})`,
      listContent: [],
      // selectedCompany: '',
      selectedOptions: '',
      siteMonite: '',
      // companyList: [],
      siteList: [],
      placeCenter: [],
      huanjing: [],
      startTime: currentDate,
      companyId: '',
      siteId: ''
    }
  },
  created () {
    this.getSite()
  },
  mounted () { },
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getSite()
      }
    }
  },
  methods: {
    // 获取公司
    // getCompany () {
    //   let clientData = {
    //     userId: this.$store.state.curuserId
    //   }
    //   this.$store.dispatch('getClient', clientData).then(res => {
    //     if (res) {
    //       this.companyList = res.options
    //       this.selectedCompany = res.options[0].value
    //       this.getSite()
    //     }
    //   })
    // },
    // 获取厂站
    async getSite () {
      await this.$store.dispatch('getCuruserId')
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: this.anaType
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
      this.getArea()
    },
    // 获取区域
    getArea () {
      let params = {
        anaType: this.anaType,
        siteFid: this.siteId
      }
      this.$store.dispatch('getArea', params).then(res => {
        if (res) {
          this.placeCenter = res.options
          this.siteMonite = this.placeCenter.length > 0 ? this.placeCenter[0].value : ''
          this.siteAreaData()
          this.getData()
        }
      })
    },
    //获取数据
    getData () {
      let params = {
        areaFid: this.siteMonite,
        anaType: this.anaType,
        siteFid: this.siteId
      }
      this.listContent = []
      this.$store.dispatch('loadAreaEquip', params).then(res => {
        if (res) {
          for (let it of res.innertSite) {
            if (it.totalCount == null) {
              it.totalCount = 0
            }
          }
          this.listContent = res.innertSite
        }
      })
    },
    // 选择厂站
    chooseSite (value) {
      this.siteId = value
    },
    // 选择站内监测
    chooseMonite (value) {
      this.siteMonite = value
      this.siteAreaData()
      this.getData()
    },
    //获取站点区域检测的数据
    siteAreaData () {
      let params = {
        areaFid: this.siteMonite,
        anaType: this.anaType,
        siteFid: this.siteId
      }
      this.$store.dispatch('getSiteAreaData', params).then(res => {
        if (res) {
          this.huanjing = res.xiaofang
        }
      })
    },
    // hover展示信息
    hoverTo () {
      //console.log('哈哈哈哈')
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
.fc {
  display: flex;
  align-items: center;
}
.bottom-area {
  padding-left: 60px;
  padding-right: 60px;
  background-color: #ffffff;
}
.banner-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  .b-img {
    width: 100%;
    height: 160px;
    background-size: cover;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    .title {
      font-size: 22px;
      padding: 30px 0px 0px 50px;
    }
    .content {
      font-size: 16px;
      padding: 12px 0px 0px 50px;
    }
    .e-img {
      margin-top: 10px;
      margin-left: 8px;
    }
  }
}
.bt-flex {
  width: 100%;
  min-height: 680px;
  margin-top: 20px;
  .bt-item {
    width: 32.5%;
    height: 210px;
    margin-left: 0.45%;
    margin-top: 10px;
    float: left;
    border: 1px solid rgba(219, 219, 219, 1);
    font-family: Microsoft YaHei;
    cursor: pointer;
    font-weight: 400;
    color: rgba(26, 26, 26, 1);
    // 第一个item
    .lr {
      display: flex;
      align-items: center;
      padding-left: 30px;
      padding-right: 60px;
    }
    .line {
      width: 1px;
      height: 150px;
      background: rgba(219, 219, 219, 1);
    }
    .t {
      font-size: 16px;
      padding-left: 10px;
    }
    .num {
      padding-left: 10px;
      font-size: 36px;
    }
    // 后面的item
    .i-top {
      margin-left: 29px;
      margin-top: 23px;
    }
    .t-title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      padding-left: 8px;
    }
    .i-center {
      display: flex;
      justify-content: center;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-top: 39px;
    }
    .ll {
      width: 100%;
      height: 1px;
      background-color: #dbdbdb;
      margin-top: 41px;
    }
    .bottom {
      padding: 0px 39px 0px 39px;
    }
    .b-text {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      padding: 18px 20px 0px 20px;
    }
  }
}
.fbt {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.p-title {
  margin-left: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.color1 {
  color: #13cf5a;
}
.color2 {
  color: #ff1b1b;
}
.color3 {
  color: #006fbc;
}
</style>
