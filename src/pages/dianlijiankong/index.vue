<template>
  <div>
    <div class="top_header">
      <!-- <span v-if="$isPc" class="choose_label">公司:</span>
      <el-select v-if="$isPc" v-model="companyId" placeholder="请选择" @change="handleClient">
        <el-option v-for="item in headerClient" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <span v-if="$isPc" class="choose_label">厂站:</span>
      <el-select v-if="$isPc" v-model="siteId" placeholder="请选择" @change="handleSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span v-if="$isPc" class="choose_label">类型:</span>
      <el-select v-if="$isPc" v-model="svgId" placeholder="请选择" @change="handleSvg">
        <el-option v-for="item in siteSvgList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="jk_content flex_row">
      <!-- <div v-if="!isFull" class="right_side">
        <div class="rt_title flex_row_yCenter">
          <img src="../../assets/image/admin/icon_ssjkz.png" alt="img" />
          <span class="rt_word">实时监控中</span>
        </div>
        <div class="jk_h">综合接线图</div>
        <div>
          <div
            class="jiexian_content"
            v-for="(item, key) in siteSvgList"
            :key="key"
          >
            <span style="color:#333333;">{{ item.label }}</span>
            <span class="jiexian_detail" @click="toDetail(item)">概况</span>
          </div>
        </div>
        <div style="margin: 25px 0;" class="line"></div>
        <div style="margin: 10px 0;" class="jk_h">操作日志记录</div>
        <el-table
          :header-cell-style="{ background: '#F1F1F1' }"
          :data="logData"
          stripe
          style="width: 100%;min-height: 100px;max-height: 500px;"
        >
          <el-table-column prop="people" label="操作人" />
          <el-table-column prop="action" label="动作指令" />
          <el-table-column prop="time" label="时间" />
        </el-table>
      </div> -->
      <!-- flex: this.isFull ? 1 : 0.85,
      minHeight: this.isFull ? 'calc(100vh - 22px)' : 'calc(100vh - 136px)' -->
      <div class="left_side">
        <iframe :src="jkSrc" scrolling="auto" width="100%" height="100%" ref="iframe"></iframe>
        <!-- <div class="full_screen" @click="fullScreen">{{ fullScreenWord }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'dianlijiankong',
  components: {},
  data () {
    return {
      companyId: '',
      siteId: '',
      equipId: '',
      svgId: '',
      logData: [],
      anaType: 'YunWei-DianLi',
      jkSrc: '',
      isFull: true,
      fullScreenWord: '全屏'
    }
  },
  computed: mapState([
    'headerClient',
    'headerSite',
    'siteSvgList',
    'curuserId',
    'userClients',
    'myCompanyId'
  ]),
  created () {
    this.getTopInfo()
  },
  mounted () {
    // console.log(this.$refs.iframe)
  },
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getTopInfo()
      }
    }
  },
  methods: {
    async getTopInfo () {
      await this.$store.dispatch('getCuruserId')
      // let clientData = {
      //   userId: this.curuserId
      // }
      // await this.$store.dispatch('getClient', clientData)
      // this.companyId = this.headerClient[0].value
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: this.anaType
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
      let svgData = {
        siteFid: this.siteId,
        anaType: this.anaType
      }
      await this.$store.dispatch('getSiteSvg', svgData)
      this.svgId = this.siteSvgList[0].value
      this.jkSrc = this.siteSvgList[0].value ? `${this.BaseUrl}${this.siteSvgList[0].value}` : ''
    },
    // 公司
    handleClient (value) {
      let data = {
        clientFid: value,
        anaType: this.anaType
      }
      this.companyId = value
      this.siteId = ''
      this.jkSrc = ''
      this.$store.dispatch('getSite', data)
    },
    // 厂站
    handleSite (value) {
      let data = {
        siteFid: value,
        loopOr1Equip: this.equType,
        anaType: this.anaType
      }
      this.siteFid = value
      this.svgId = ''
      this.jkSrc = ''
      this.$store.dispatch('getSiteSvg', data)
    },
    // 组态图
    handleSvg (value) {
      this.svgId = value
      this.jkSrc = `${this.BaseUrl}${value}`
    },
    // 概况
    toDetail (item) {
      this.jkSrc = `${this.BaseUrl}${item.value}`
    },
    fullScreen () {
      this.isFull = !this.isFull
      if (this.isFull) {
        this.fullScreenWord = '取消全屏'
      } else {
        this.fullScreenWord = '全屏'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top_header {
  width: 100%;
  height: 60px;
  display: flex;
  background-color: #ffffff;
  align-items: center;
  margin-bottom: 12px;
  .choose_label {
    margin-right: 10px;
    margin-left: 10px;
  }
}
.jk_content {
  width: 100%;
  height: 100%;
  .right_side {
    background: #ffffff;
    min-height: calc(100vh - 95px);
    flex: 0.15;
    padding: 22px 20px;
    .rt_title {
      margin-bottom: 30px;
      .rt_word {
        margin-left: 5px;
        color: #ff1b1b;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .jiexian_content {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      .jiexian_detail {
        color: #006fbc;
        cursor: pointer;
      }
      .jiexian_detail:hover {
        opacity: 0.8;
        transition: all ease 0.3s;
      }
    }
  }
  .left_side {
    position: relative;
    width: 100%;
    // flex: 1;
    min-height: calc(100vh - 95px);
    height: calc(100vh - 195px);
    .full_screen {
      position: absolute;
      left: 5px;
      top: 5px;
      cursor: pointer;
      color: #3d7eff;
    }
    .full_screen:hover {
      opacity: 0.8;
      transition: all ease 0.8s;
    }
  }
}
.jk_h {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.line {
  background-color: #eeeeee;
  width: 100%;
  height: 1px;
}
</style>
