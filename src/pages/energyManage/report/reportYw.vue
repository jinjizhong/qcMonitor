<template>
  <div class="report_nx_content">
    <div class="top_header flex_row_yCenter">
      <div class="select_box flex_row_yCenter">
        <p class="p_title">厂站名称</p>
        <el-select class="common_input" v-model="siteId" placeholder="请选择厂站" @change="handleSite">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">时间类型</p>
        <el-select class="common_input" v-model="timeType" placeholder="请选择" @change="handleType">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">时间范围</p>
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleDateRange">
        </el-date-picker>
      </div>
    </div>
    <div class="table_content">
      <el-table class="table_report" :header-cell-style="{ background: '#F8F8F9' }" :data="reportData">
        <el-table-column prop="reportCode" label="报告编号" />
        <el-table-column prop="siteName" label="厂站名称" />
        <el-table-column prop="tittle" label="报告名称" />
        <el-table-column prop="type" label="时间类型" />
        <el-table-column prop="reportDate" label="报告日期" />
        <el-table-column prop="receiveTime" label="接收日期" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_box">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'reportClientYw',
  components: {
  },
  data () {
    return {
      companyId: '',
      siteId: '',
      dateRange: '',
      timeType: '2',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      siteList: [{
        label: '全部',
        value: '0'
      }],
      dateHoursList: [
        {
          id: 0,
          name: '全部',
          value: '2'
        },
        {
          id: 1,
          name: '月报告',
          value: '0'
        },
        {
          id: 2,
          name: '年报告',
          value: '1'
        }
      ],
      reportData: [],
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.getInfo()
  },
  mounted () {
  },
  computed: mapState([
    'userClients',
    'myCompanyId',
    'curuserId'
  ]),
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getInfo()
      }
    }
  },
  methods: {
    // 获取筛选数据
    async getInfo () {
      const that = this
      await that.$store.dispatch('getCuruserId')
      that.companyId = that.myCompanyId == '' ? that.userClients[0].clientId : that.myCompanyId
      let siteData = {
        userId: that.curuserId,
        clientFid: that.companyId
      }
      that.siteList = [{
        label: '全部',
        value: '0'
      }]
      that.$store.dispatch('getSite', siteData).then(res => {
        that.siteList = that.siteList.concat(res.options)
        that.siteId = that.siteList[0].value
        that.getReportList()
      })
    },
    // 获取报告列表
    getReportList () {
      let reportData = {
        userId: this.curuserId,
        type: 1,   // 1运维0能效
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        siteId: this.siteId, // 全部
        timeType: this.timeType, //月报告1年报告2全部
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.$store.dispatch('getReport', reportData).then(res => {
        this.total = res.report.amount
        this.reportData = res.report.list
      })
    },
    // 选择厂站筛选
    handleSite (e) {
      this.siteId = e
      this.getReportList()
    },
    // 类型范围筛选
    handleType (e) {
      this.timeType = e
      this.getReportList()
    },
    // 时间范围筛选
    handleDateRange (e) {
      this.startTime = e[0] || ''
      this.endTime = e[1] || ''
      this.getReportList()
    },
    // 查看报告详情
    handleClick (item) {
      let propsData = {
        name: 'ReportDetail',
        params: `?id=${item.reportId}`
      }
      this.$store.dispatch('propsRouteData', propsData)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getReportList()
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
  height: 60px;
  padding-left: 39px;
  padding-top: 10px;
}
.select_box {
  margin-right: 15px;
}
.common_input {
  width: 170px;
}
.p_title {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}
.table_content {
  display: flex;
  padding: 30px 39px 30px 39px;
  .table_report {
    max-height: 660px;
  }
}
.page_box {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-end;
  padding-bottom: 10px;
}
</style>
