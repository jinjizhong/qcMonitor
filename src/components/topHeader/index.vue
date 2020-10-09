<template>
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
    <span class="choose_label">{{thirdName}}:</span>
    <el-select v-if="isCedian=='0'" style="width: 239px" v-model="equipId" placeholder="请选择" @change="handleEquip">
      <el-option v-for="item in headerEquip" :key="item.value" :label="item.label" :value="item">
      </el-option>
    </el-select>
    <el-select v-else-if="isCedian=='1'" style="width: 239px" v-model="shebeiFid" placeholder="请选择"
      @change="handleShebei">
      <el-option v-for="item in nxOption" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Top',
  props: {
    equType: {
      type: String,
      default: ''
    },
    anaType: {
      type: String,
      default: ''
    },
    // 第三级选项名称
    thirdName: {
      type: String,
      default: '设备'
    },
    // 选择进线测量点
    isCedian: {
      type: String,
      default: '0'
    },
    // 选择具体的某个设备回路
    chooseMyId: {
      type: String,
      default: ''
    }
  },
  computed: mapState([
    'headerClient',
    'headerSite',
    'headerEquip',
    'curuserId',
    'nxOption',
    'needRefresh',
    'refreshAnatype',
    'userClients',
    'myCompanyId'
  ]),
  created () {
    this.getTopInfo()
  },
  data () {
    return {
      companyId: '',
      siteId: '',
      equipId: {},
      shebeiFid: '',
      selectValue: [],
      refreshType: '',
      companyIdChange: false
    }
  },
  watch: {
    refreshAnatype: {
      handler (e) {
        if (e && this.needRefresh) {
          this.refreshType = e
          this.getTopInfo()
        } else {
          this.refreshType = ''
        }
      },
      deep: true
    },
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
      // await this.$store.dispatch('saveUserClients')
      // let clientData = {
      //   userId: this.curuserId
      // }
      // await this.$store.dispatch('getClient', clientData)
      // this.companyId = this.companyIdChange ? this.companyId : this.userClients[0].clientId
      // console.log(this.userClients)
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: this.refreshType == '' ? this.anaType : this.refreshType
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite.length > 0 ? this.headerSite[0].value : ''
      this.selectValue = [] // 置空
      if (this.isCedian == '0') {
        let equData = {
          siteFid: this.siteId,
          loopOr1Equip: this.equType,
          anaType: this.refreshType == '' ? this.anaType : this.refreshType
        }
        await this.$store.dispatch('getEquip', equData)
        let chooseArr = await this.headerEquip.filter(item => item.value == this.chooseMyId) // 判断传过来的id是否有误
        // console.log(chooseArr, 'chooseArr')

        this.equipId = this.chooseMyId == '' || chooseArr.length == 0 ? this.headerEquip[0] : chooseArr[0]

        if (this.equipId) {
          this.selectValue.push(this.companyId, this.siteId, this.equipId.value, this.equipId.label)
        } else {
          this.selectValue.push(this.companyId, this.siteId, '', '')
        }

        this.$emit('topInfoSelect', this.selectValue)
      } else if (this.isCedian == '1') {
        let nxData = {
          siteFid: this.siteId,
          anaType: this.refreshType == '' ? this.anaType : this.refreshType
        }
        await this.$store.dispatch('getNexiaoOption', nxData)
        this.shebeiFid = this.nxOption.length > 0 ? this.nxOption[0].value : ''
        this.selectValue.push(this.companyId, this.siteId, this.shebeiFid)
        this.$emit('topInfoSelect', this.selectValue)
      }
    },
    // // 公司
    // handleClient (value) {
    //   this.selectValue = []
    //   let data = {
    //     clientFid: value,
    //     anaType: this.refreshType == '' ? this.anaType : this.refreshType
    //   }
    //   this.companyId = value
    //   this.siteId = ''
    //   this.equipId = ''
    //   this.$store.state.headerEquip = []
    //   this.$store.dispatch('getSite', data)
    //   this.$emit('change', this.selectValue)
    // },
    // 厂站
    handleSite (value) {
      this.selectValue = []
      let data = {
        siteFid: value,
        loopOr1Equip: this.equType,
        anaType: this.refreshType == '' ? this.anaType : this.refreshType
      }
      this.siteFid = value
      this.equipId = ''
      this.$store.dispatch('getEquip', data)
      this.$emit('change', this.selectValue)
    },
    // 设备
    handleEquip (item) {
      this.selectValue = []
      this.selectValue.push(this.companyId, this.siteId, item.value, item.label)
      this.$emit('change', this.selectValue)
    },
    // 进线
    handleShebei (value) {
      this.selectValue = []
      this.selectValue.push(this.companyId, this.siteId, value)
      this.$emit('change', this.selectValue)
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
</style>
