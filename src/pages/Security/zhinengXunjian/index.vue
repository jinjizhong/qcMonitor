<template>
  <div class="pageIndex">
    <div class="contentAll">
      <div class="flex ac">
        <el-input class="input-sc" v-model="searchTo" placeholder="请输入" />
        <img class="search-btn" src="../../../assets/image/admin/icon_srarch.png" />
      </div>
      <div class="flex jcb xj">
        <div>
          <p class="xj-title">本次巡检时间为2019-07-24 10:00:00，方式为自动巡检。</p>
          <div class="flex ac">
            <p class="xj-state-title">过去已为您进行<span class="color-red">436</span>次自动巡检，
              排查<span class="color-red">15</span>项设备风险。当前自动巡检</p>
            <img class="img-check" src="../../../assets/image/admin/icon_kai.png" />
          </div>
        </div>
        <div class="flex">
          <div class="xj-btn flex ac jcc" @click="xunjian">
            <img src="../../../assets/image/admin/icon_srarch_white.png" />
            <span class="text">一键巡检</span>
          </div>
          <img class="xj-setting" src="../../../assets/image/admin/icon_guanli.png" />
        </div>
      </div>
      <div class="middle-policy flex">
        <img :src="statusDetail.status?statusDetail.imgOK:statusDetail.imgError" />
        <div>
          <p v-if="!statusDetail.status" class="title1 color-yello">系统为您检查了 {{statusDetail.num}} 项设备，发现以下风险，请及时维护!</p>
          <p v-else class="title1 color-green">系统为您检查了 {{statusDetail.num}} 项设备，未发现风险!</p>
          <p class="title2">巡检编号：{{statusDetail.bianhao}}</p>
        </div>
      </div>
      <!-- 中间两列表 -->
      <div class="title-table flex jcb">
        <div style="width: 100%;">
          <p class="listTitle">[ 电力设备 ]</p>
          <div v-if="dianliStatu==0" class="flex jcc">
            <div class="flex_column_yCenter">
              <img src="../../../assets/image/admin/img_wjyc.png" />
              <p class="color-green" style="padding-top: 10px;">未发现异常</p>
            </div>
          </div>
          <el-table v-if="dianliStatu==1" v-loading="loading" :data="tableData" border class="tableStyle" height="253">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </div>
        <div style="width: 100%; padding-left: 20px;">
          <p class="listTitle">[ 通讯采集终端 ]</p>
          <div v-if="tongxunStatu==0" class="flex jcc">
            <div class="flex_column_yCenter">
              <img src="../../../assets/image/admin/img_wjyc.png" />
              <p class="color-green" style="padding-top: 10px;">未发现异常</p>
            </div>
          </div>
          <el-table v-if="tongxunStatu==1" v-loading="loading" :data="tableData" border class="tableStyle" height="253">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </div>
      </div>
      <!-- 巡检日志 -->
      <div class="title-table">
        <div class="flex ac">
          <p class="listTitle">[ 巡检日志 ]</p>
          <p class="ct-title">巡检结果</p>
          <el-radio-group v-model="radio1" @change="statusChange" size="small">
            <el-radio-button label="全部" />
            <el-radio-button label="正常" />
            <el-radio-button label="异常" />
          </el-radio-group>
          <p class="ct-title">巡检方式</p>
          <el-radio-group v-model="radio2" @change="typeChange" size="small">
            <el-radio-button label="全部" />
            <el-radio-button label="自动" />
            <el-radio-button label="手动" />
          </el-radio-group>
          <p class="ct-title">开始时间</p>
          <div class="block">
            <el-date-picker v-model="dateTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="pickerOptions" :clearable="false">
            </el-date-picker>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" border class="tableStyle" height="253">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" />
        </el-table>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'znxunjian',
  components: {
  },
  data () {

    return {
      searchTo: '',
      radio1: '全部',
      radio2: '全部',
      dianliStatu: 1,
      tongxunStatu: 1,
      statusDetail: {
        status: false,
        imgError: require("../../../assets/image/admin/icon_xjyc.png"),
        imgOK: require("../../../assets/image/admin/icon_xjzc.png"),
        num: 166,
        bianhao: "ZNXJ1910101005"
      },
      dateTime: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      loading: true
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 3000)
    this.getCompany()
  },
  mounted () { },
  methods: {
    getCompany () {
      let clientData = {
        userId: this.$store.state.curuserId
      }
      this.$store.dispatch('getClient', clientData).then(res => {
        if (res) {
          this.companyList = res.options
          this.selectedCompany = res.options[0].value
          this.getData()
        }
      })
    },
    getData () { },
    xunjian () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.dianliStatu = 0
        this.tongxunStatu = 0
        this.statusDetail.status = true
      }, 3000)
    },
    statusChange (value) {
      console.log(value)
    },
    typeChange (value) {
      console.log(value)
    },
    pickerOptions (value) {
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pageIndex {
  width: 100%;
  background: #ffffff;
}
.contentAll {
  padding: 37px 50px 37px 50px;
}
.flex {
  display: flex;
}
.ac {
  align-items: center;
}
.jcc {
  justify-content: center;
}
.jcb {
  justify-content: space-between;
}
.input-sc {
  width: 390px;
}
.search-btn {
  width: 20px;
  height: 20px;
  margin-left: -30px;
  z-index: 999;
}

.xj {
  margin-top: 39px;
}
.xj-title {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 26px;
}
.xj-state-title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-top: 17px;
}
.img-check {
  width: 40px;
  height: 20px;
  margin: 18px 0px 0px 10px;
}
.xj-btn {
  width: 160px;
  height: 52px;
  background: rgba(0, 111, 188, 1);
  border-radius: 26px;
  cursor: pointer;
  img {
  }
  .text {
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
}
.xj-setting {
  width: 46px;
  height: 46px;
  margin-left: 20px;
}
.color-red {
  color: #ff1b1b;
  font-weight: bold;
}
.color-yello {
  color: #ff8e29;
}
.color-green {
  color: #3fb820;
}
.middle-policy {
  margin-top: 60px;
  img {
    width: 69px;
    height: 68px;
    margin-right: 18px;
  }
  .title1 {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
  .title2 {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-top: 20px;
  }
}
.title-table {
  margin-top: 39px;
  .listTitle {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .ct-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding-left: 56px;
    padding-right: 10px;
  }
}
.tableStyle {
  width: 100%;
  margin-top: 10px;
}
.el-bt {
  margin-right: 6px;
}
</style>
