<template>
  <div class="report_nx_content">
    <!---------------- Header Query --------------->
    <div class="top_header flex_row_yCenter">
      <div class="select_box flex_row_yCenter">
        <p class="p_title">客户名称</p>
        <el-select class="common_input" v-model="companyId" placeholder="请选择" @change="handleCompany">
          <el-option v-for="item in companyList" :key="item.clientId" :label="item.clientName" :value="item.clientId">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">厂站名称</p>
        <el-select class="common_input" v-model="siteId" placeholder="请选择" @change="handleSite">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">设备类型</p>
        <el-select class="common_input" v-model="equipType" placeholder="请选择" @change="handleEquType">
          <el-option v-for="(item, index) in equipTypeList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">报警级别</p>
        <el-select class="common_input" v-model="bjLevel" placeholder="请选择" @change="handleWarnLevel">
          <el-option v-for="(item, index) in bjLevelList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">报警类型</p>
        <el-select class="common_input" v-model="bjType" placeholder="请选择" @change="handleWarnType">
          <el-option v-for="(item, index) in bjTypeList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">确认状态</p>
        <el-select class="common_input" v-model="confirmState" placeholder="请选择" @change="handleConfirmState">
          <el-option v-for="(item, index) in confirmStateList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">时间范围</p>
        <el-date-picker v-model="dateTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-mm-dd hh:mm:ss" @change="handleDateRange">
        </el-date-picker>
      </div>
      <div class="select_box flex_row_yCenter">
        <el-button @click="inquire()" type="primary">查询</el-button>
        <el-button @click="reset()" type="primary">重置</el-button>
      </div>

    </div>
    <!----------------- Table ---------------------->
    <div class="table_content">
      <el-table v-loading="loading" class="table_report" :header-cell-style="{ background: '#F8F8F9' }" :data="gjData">
        <el-table-column prop="addtime" label="报警时间" />
        <el-table-column width="260" prop="equName" label="监测设备" />
        <el-table-column width="300" prop="alertInfo" label="报警描述" />
        <el-table-column prop="canshuName" label="测点名称" />
        <el-table-column prop="alertLevel" label="报警级别">
          <template slot-scope="scope">
            <span v-if="scope.row.alertLevel=='预警'" style="color:#ffcc00;">{{scope.row.alertLevel}}</span>
            <span v-else-if="scope.row.alertLevel=='二级告警'" style="color:#ff6600;">{{scope.row.alertLevel}}</span>
            <span v-else-if="scope.row.alertLevel=='一级告警'" style="color:#ff0000;">{{scope.row.alertLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="AlertResultType" label="报警类型" />
        <el-table-column prop="strState" label="确认状态" />
        <el-table-column prop="scanState" label="查看状态">
          <template slot-scope="scope">
            <span :style="{color: scope.row.scanState=='已查看' ? '#333333' : '#FF1B1B'}">{{scope.row.scanState}}</span>
          </template>
        </el-table-column>
        <!-- 0处理1详情 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :style="{color: scope.row.czState=='1' ? '#409EFF' : '#FF1B1B'}" @click="toDetail(scope.row)"
              type="text">
              {{scope.row.czState | formatCz}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!----------------- Pagination ------------------>
    <div class="page_box">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible="dialogVisible" width="65%" :before-close="handleClose">
      <div style="margin-bottom: 10px;">
        <p class="dialog_title">报警记录</p>
        <div class="record_content flex_row">
          <p class="record_p">厂站名称：{{alertDetail.siteName}}</p>
          <p class="record_p">监测设备：{{alertDetail.equipName}}</p>
          <p class="record_p">测点名称：{{alertDetail.canshuName}}</p>
          <p class="record_p">报警类型：{{alertDetail.alertType}} </p>
          <p class="record_p">故障发生时间：{{alertDetail.addtime}}</p>
          <!-- <p class="record_p">故障持续时间：{{alertDetail.continueTime}}</p> -->
          <p class="record_p">报警描述：{{alertDetail.alertInfo}}</p>
        </div>
      </div>
      <div style=" background: #F8F8F8; ">
        <div style="padding-top: 10px;margin-bottom: 10px; margin-left: 10px;" class="flex_row_yCenter">
          <p class="p_title">时间范围</p>
          <el-select style="width:100px;" v-model="timeRangeId" placeholder="请选择" @change="handleTimeRange">
            <el-option v-for="item in timeRangeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-table class="table_report" :header-cell-style="{ background: '#F8F8F9' }"
          :row-style="{ background: '#F8F8F9'}" :data="gjEquData" size="small">
          <el-table-column width="135" prop="addtime" label="报警时间" />
          <el-table-column width="230" prop="equName" label="监测设备" />
          <el-table-column width="90" prop="canshuName" label="测点名称" />
          <el-table-column prop="alertInfo" label="报警描述" />
          <el-table-column width="90" prop="alertLevel" label="报警级别">
            <template slot-scope="scope">
              <span v-if="scope.row.alertLevel=='预警'" style="color:#ffcc00;">{{scope.row.alertLevel}}</span>
              <span v-else-if="scope.row.alertLevel=='二级告警'" style="color:#ff6600;">{{scope.row.alertLevel}}</span>
              <span v-else-if="scope.row.alertLevel=='一级告警'" style="color:#ff0000;">{{scope.row.alertLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column width="90" prop="alertType" label="报警类型" />
          <el-table-column width="120" prop="confirmState" label="确认状态" />
        </el-table>
        <div class="page_box">
          <el-pagination @current-change="handleCurrentChangeEqu" :current-page.sync="currentPageEqu"
            :page-size="pageSizeEqu" :total="totalEqu" layout="total, prev, pager, next">
          </el-pagination>
        </div>
      </div>
      <div v-if="this.dialogType==0">
        <p class="dialog_title">确认选项</p>
        <div style="min-height: 45px;" class="flex_row_yCenter">
          <el-radio v-model="radio" label="4" @change="confirmHandle">误发</el-radio>
          <el-radio v-model="radio" label="1" @change="confirmHandle">人为动作</el-radio>
          <el-radio v-model="radio" label="3" @change="confirmHandle">可忽略</el-radio>
          <el-radio v-model="radio" label="2" @change="confirmHandle">转发工单</el-radio>
          <el-select v-if="radio=='2'" style="width:100px; margin-right: 5px;" v-model="zfId" placeholder="请选择"
            @change="handleZf" size="small" change="confirmHandle">
            <el-option v-for="item in zfList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="zfId=='2'" style="width:150px; margin-right: 25px;" v-model="teamId" placeholder="请选择"
            @change="handleTeam" size="small">
            <el-option v-for="item in ywTeamList" :key="item.fid" :label="item.teamName" :value="item.fid">
            </el-option>
          </el-select>
          <!-- <el-radio v-model="radio" label="5" @change="confirmHandle">恢复确认</el-radio> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="this.dialogType==0">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { equipTypeList, bjTypeList, confirmStateList } from '../../assets/js/config.js'
export default {
  name: 'gaojingjc',
  components: {
  },
  data () {
    return {
      loading: false,
      companyList: [{
        clientId: '',
        clientName: '全部'
      }],
      companyId: '',
      siteList: [],
      siteId: '',
      equipTypeList: equipTypeList,
      equipType: '',
      bjLevelList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '预警',
          value: '0'
        },
        {
          name: '二级告警',
          value: '1'
        },
        {
          name: '一级告警',
          value: '2'
        }
      ],
      bjLevel: '',
      bjTypeList: bjTypeList,
      bjType: '',
      confirmStateList: confirmStateList,
      confirmState: '',
      dateTime: '',
      startTime: '',
      endTime: '',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      currentPageEqu: 1,
      pageSizeEqu: 5,
      totalEqu: 0,
      gjData: [],
      gjEquData: [],
      dialogTitle: '报警处理',
      dialogType: 0,
      dialogVisible: false,
      timeRangeList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '一分钟',
          value: '0'
        },
        {
          name: '一个月',
          value: '1'
        },
        {
          name: '两个月',
          value: '2'
        },
        {
          name: '三个月',
          value: '3'
        },
        {
          name: '近半年',
          value: '4'
        }
      ],
      timeRangeId: '',
      radio: '',
      zfList: [
        {
          name: '计划库',
          value: '001'
        },
        {
          name: '抢修工单',
          value: '002'
        }
      ],
      zfId: '',
      teamId: '',
      alertDetail: {},
      siteTeamId: '',
      equip1Fid: '',
      alertFid: '',
      alertInfo: '',
      equipRouteId: ''
    }
  },
  created () {
    this.equipRouteId = this.routeObjSave.equipFid || ''
    this.bjLevel = this.routeObjSave.bjLevel || ''
    this.getInfo()
    this.getWarnList()
  },
  mounted () {
  },
  computed: mapState([
    'userClients',
    'myCompanyId',
    'curuserId',
    'headerSite',
    'ywTeamList',
    'routeObjSave'
  ]),
  watch: {
    routeObjSave: {
      handler () {
        // console.log(e, 'lpllplp')
      },
      deep: true
    }
    // myCompanyId (newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.companyId = newVal
    //     this.getInfo()
    //   }
    // }
  },
  filters: {
    formatCz (value) {
      return value == '0' ? '处理' : '详情'
    }
  },
  methods: {
    // 获取筛选数据
    async getInfo () {
      const that = this
      that.companyList = that.companyList.concat(that.userClients)
      // await that.$store.dispatch('getCuruserId')
      // that.companyId = that.myCompanyId == '' ? that.userClients[0].clientId : that.myCompanyId
      let siteData = {
        userId: that.curuserId,
        clientFid: that.companyId
      }
      that.siteList = [{
        label: '全部',
        value: ''
      }]
      that.$store.dispatch('getSite', siteData).then(res => {
        that.siteList = that.siteList.concat(res.options)
        that.siteId = that.siteList[0].value
      })
    },
    // 获取告警列表
    getWarnList () {
      this.loading = true
      let data = {
        userId: this.curuserId,
        companyId: this.companyId,
        siteId: this.siteId,
        equipType: this.equipType,
        bjLevel: this.bjLevel,
        bjType: this.bjType,
        confirmState: this.confirmState,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        equip1Fid: this.equipRouteId
      }
      this.$store.dispatch('getPolicyList', data).then(res => {
        if (res) {
          this.loading = false
          this.gjData = res.alertInfoList
          this.total = res.amonut || 0
        } else {
          this.loading = false
        }
      })
    },
    // 选择客户筛选
    async handleCompany (e) {
      this.companyId = e
      this.siteId = ''
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteList = [{
        label: '全部',
        value: ''
      }]
      this.siteList = this.siteList.concat(this.headerSite)
    },
    // 选择厂站筛选
    handleSite (e) {
      this.siteId = e
    },
    // 选择设备类型筛选
    handleEquType (e) {
      this.equipType = e
    },
    // 选择报警级别筛选
    handleWarnLevel (e) {
      this.bjLevel = e
    },
    // 选择报警类型筛选
    handleWarnType (e) {
      this.bjType = e
    },
    // 选择确认状态筛选
    handleConfirmState (e) {
      this.confirmState = e
    },
    // 时间范围筛选
    handleDateRange (e) {
      this.startTime = e[0] || ''
      this.endTime = e[1] || ''
    },
    // 弹窗时间范围筛选
    handleTimeRange (e) {
      this.timeRangeId = e
      this.getAlertEquip()
    },
    // 处理转发工单
    async handleZf (e) {
      if (e == '1') {
        let data = {
          siteId: this.siteTeamId
        }
        await this.$store.dispatch('getYwTeam', data)
      } else {
        this.zfId = e
        this.teamId = ''
      }
    },
    // 选择运维班组时
    handleTeam (e) {
      this.teamId = e
    },
    // 选择确认选项时
    confirmHandle () {
      this.zfId = ''
      this.teamId = ''
    },
    // 查询
    inquire () {
      this.getWarnList()
    },
    // 重置
    reset () {
      this.companyId = ''
      this.siteId = ''
      this.equipType = ''
      this.bjLevel = ''
      this.bjType = ''
      this.confirmState = ''
      this.dateTime = ''
      this.startTime = ''
      this.endTime = ''
      this.equipRouteId = ''
      this.currentPage = 1
      this.getWarnList()
    },
    // 类型范围筛选
    handleType (e) {
      this.timeType = e
    },
    // 查看
    toDetail (item) {
      // console.log(item, 'czState')

      const that = this
      if (item.scanState == '未查看') {
        let data = {
          alertId: item.alertFid
        }
        that.$store.dispatch('alertUpdateState', data).then(res => {
          if (res.result == 'success') {
            that.getWarnList()
          } else {
            // that.$message.error('操作失败！');
          }
        })
      }
      if (item.czState == '0') {
        that.dialogTitle = '报警处理'
        that.dialogType = 0
      } else {
        that.dialogTitle = '详情'
        that.dialogType = 1
      }
      let data = {
        alertId: item.alertFid
      }
      that.dialogVisible = true
      that.equip1Fid = item.equip1Fid
      that.alertFid = item.alertFid
      that.alertInfo = item.alertInfo

      that.$store.dispatch('getAlertDetail', data).then(res => {
        that.alertDetail = res.alertDetail
        that.siteTeamId = res.alertDetail.siteFid
        let equData = {
          userId: that.curuserId,
          equip1Fid: that.equip1Fid,
          timeRange: that.timeRangeId,
          pageSize: that.pageSizeEqu,
          pageIndex: that.currentPageEqu,
        }
        that.$store.dispatch('getAlertInfoListByEquip', equData).then(res => {
          that.totalEqu = res.amonut
          that.gjEquData = res.alertInfoList
        })
      })
    },
    getAlertEquip () {
      const that = this
      let equData = {
        userId: that.curuserId,
        equip1Fid: that.equip1Fid,
        timeRange: that.timeRangeId,
        pageSize: that.pageSizeEqu,
        pageIndex: that.currentPageEqu,
      }
      that.$store.dispatch('getAlertInfoListByEquip', equData).then(res => {
        that.totalEqu = res.amonut
        that.gjEquData = res.alertInfoList
      })
    },
    // 弹窗关闭时
    handleClose () {
      this.dialogVisible = false
      this.timeRangeId = ''
      this.radio = ''
      this.currentPageEqu = 1
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getWarnList()
    },
    // 分页弹框设备
    handleCurrentChangeEqu (val) {
      this.currentPageEqu = val
      this.getAlertEquip()
    },
    confirm () {
      const that = this
      if (that.radio == '') {
        that.$message.error('请先选择确认选项！')
        return false
      } else if (that.radio == '2' && that.zfId == '') {
        that.$message.error('请选择转发工单选项！')
        return false
      }
      let data = {
        userId: that.curuserId,
        equip1Fid: that.equip1Fid,
        confirmState: that.radio,
        alertId: that.alertFid,
        alertInfo: that.alertInfo,
        siteId: that.siteTeamId,
        woType: that.zfId
      }
      that.$store.dispatch('getAlertSaveData', data).then(res => {
        if (res.result == 'success') {
          that.$message({
            message: '操作成功！',
            type: 'success'
          })
          that.dialogVisible = false
          that.getWarnList()
        } else {
          that.$message.error('操作失败！');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.report_nx_content {
  // min-height: calc(100vh - 200px);
  background-color: #ffffff;
}
.top_header {
  // height: 60px;
  padding-left: 39px;
  padding-top: 10px;
  flex-wrap: wrap;
}
.select_box {
  margin-right: 15px;
  margin-bottom: 20px;
}
.common_input {
  width: 200px;
}
.common_input2 {
  width: 200px;
}
.p_title {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}
.table_content {
  display: flex;
  padding: 0px 39px 30px 39px;
  .table_report {
    max-height: 635px;
  }
}
.page_box {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-end;
  padding-bottom: 10px;
}
.record_content {
  flex-wrap: wrap;
}
.record_p {
  min-width: 155px;
  margin-right: 33px;
  margin-bottom: 5px;
}
.dialog_title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 8px;
}
.tableRowClassName {
  background-color: #f8f8f8;
}
</style>
