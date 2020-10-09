<template>
  <!-- 工单管理 -->
  <div class="order_bg">
    <!-- 第一行 -->
    <div class="top_select">
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">工单类别</p>
        <el-select class="common_input" v-model="orderType" placeholder="请选择" @change="orderTypeClick">
          <el-option v-for="item in orderTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">客户</p>
        <el-select class="common_input" v-model="kehu" placeholder="请选择" @change="kehuClick">
          <el-option v-for="item in kehuList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">厂站</p>
        <el-select class="common_input" v-model="site" placeholder="请选择" @change="siteClick">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">运维班组</p>
        <el-select class="common_input" v-model="yunweiTeam" placeholder="请选择" @change="teamClick">
          <el-option v-for="item in yunweiList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">负责人</p>
        <el-select class="common_input" v-model="responseMan" placeholder="请选择" @change="responseClick">
          <el-option v-for="item in responseList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" class="btn" @click="getWorkOrder">查询</el-button>
    </div>
    <!-- 第二行 -->
    <div class="top_select">
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">逾期状态</p>
        <el-select class="common_input" v-model="yuStatu" placeholder="请选择" @change="yuClick">
          <el-option v-for="item in yuList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">工单状态</p>
        <el-select class="common_input" v-model="orderStatus" placeholder="请选择" @change="orderStatuClick">
          <el-option v-for="item in orderStatuList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">工单等级</p>
        <el-select class="common_input" v-model="orderLeval" placeholder="请选择" @change="levalClick">
          <el-option v-for="item in levalList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">起始时间</p>
        <!-- :picker-options="startOptions"  -->
        <el-date-picker class="common_input" width="200" v-model="startTime" value-format="yyyy-MM-dd" type="date"
          placeholder="选择起始时间" />
      </div>
      <div class="select_mode flex_row_yCenter">
        <p class="left_title">结束时间</p>
        <!-- :picker-options="endOptions" -->
        <el-date-picker class="common_input" width="200" v-model="endTime" value-format="yyyy-MM-dd" type="date"
          placeholder="选择结束时间" />
      </div>
      <el-button type="primary" class="btn" @click="revert">重置</el-button>
    </div>
    <div>
      <div class="listTop flex jbt">
        <p></p>
        <el-button type="primary" @click="dialogNew=true,orderTopTitle='新建工单',formOrder=null">+ 新建工单</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="table_content">
      <el-table class="table_list" v-loading="loading" height="580" :header-cell-style="{ background: '#F8F8F9' }"
        :data="workOrderData">
        <el-table-column prop="woCode" label="工单编号" />
        <el-table-column prop="clientName" label="客户" />
        <el-table-column prop="siteName" width="80" align="center" label="厂站" />
        <el-table-column prop="woType" width="80" align="center" label="工单类别" />
        <el-table-column prop="woLevel" width="80" align="center" label="工单等级" />
        <el-table-column prop="title" label="工单名称" />
        <el-table-column prop="equipName" align="center" label="关联设备">
          <template slot-scope="scope">
            {{scope.row.equipName|formatRow}}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" width="110" align="center" label="计划开始时间">
          <template slot-scope="scope">
            {{scope.row.startTime|formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" width="110" align="center" label="计划结束时间">
          <template slot-scope="scope">
            {{scope.row.endTime|formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="teamName" label="运维班组" />
        <el-table-column prop="addtime" width="110" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.addtime|formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="wo_state" width="100" label="工单状态">
          <template slot-scope="scope">
            <span>{{scope.row.wo_state}}</span>
            <img v-if="scope.row.yuqi_state=='1'" class="tagImg" src="../../../assets/image/admin/yuqi.png">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button v-if="scope.row.flow===10" @click="detalClick(scope.row)" type="text">详情</el-button>
            <!-- 待审批状态 -->
            <div v-if="scope.row.flow==1">
              <el-button @click="detalClick(scope.row)" type="text">详情</el-button>
              <el-button @click="cancelClick(scope.row)" type="text">取消审批</el-button>
            </div>
            <!-- 未提交状态 -->
            <div v-if="scope.row.flow==0">
              <el-button @click="editClick(scope.row)" type="text">编辑</el-button>
              <el-button @click="submitClick(scope.row)" type="text">提交</el-button>
              <el-button @click="deleteClick(scope.row)" type="text" style="color:red">删除</el-button>
            </div>
            <!-- 已驳回状态 -->
            <div v-if="scope.row.flow==99">
              <el-button v-if="scope.row.flow===10" @click="detalClick(scope.row)" type="text">详情</el-button>
              <el-button @click="editClick(scope.row)" type="text">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页页签 -->
    <div class="page_box">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <!-- 详情弹框 -->
    <el-dialog title="工单详细信息" top="2vh" v-if="dialogDetails" :visible.sync="dialogDetails">
      <orderDetail :orderFid='nowOrderId' @detailReload='dialogDetails=false' />
    </el-dialog>
    <!-- 新建(编辑)工单弹框 -->
    <el-dialog :title="orderTopTitle" width='39%' v-if="dialogNew" :visible.sync="dialogNew">
      <!-- 工单的表单 -->
      <newOrder :formOrder='formOrder' @quxiao='dialogNew=false' @newOrderReload='newOrderReload' />
    </el-dialog>
    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="18%" top="45vh">
      <span>删除后无法恢复，是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { orderStatuList } from '../../../assets/js/config'
import newOrder from './newOrderComp.vue'
import orderDetail from './orderDetailComp.vue'
export default {
  computed: mapState(['userClients']),
  components: {
    newOrder,
    orderDetail
  },
  data () {
    return {
      orderTopTitle: '新建工单',
      nowOrderId: '',//当前点击的工单id
      orderType: '',//工单类别
      orderTypeValue: '',
      kehu: '',//客户
      kehuValue: '',
      site: '',//厂站
      siteValue: '',
      yuStatu: '',//逾期状态
      yuStatuValue: '',
      orderStatus: '',//工单状态
      yunweiTeam: '',//运维班组
      yunweiTeamValue: '',
      responseMan: '',//负责人
      responseManValue: '',
      orderLeval: '',//工单等级
      orderLevalValue: '',
      startTime: '',//开始时间
      endTime: '',//结束时间
      currentPage: 1,//当前分页
      pageSize: 7,//最大分页显示
      total: 0,//列表总数
      // startOptions: {
      //   disabledDate (time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      formOrder: {},
      dialogNew: false,
      loading: true,
      orderTypeList: [
        { label: '全部', value: '' },
        { label: '计划', value: '001' },
        { label: '抢修', value: '002' }],
      yuList: [
        { label: '全部', value: '' },
        { label: '逾期', value: '1' },
        { label: '未逾期', value: '0' }],
      levalList: [
        { label: '全部', value: '' },
        { label: 'T1', value: '001' },
        { label: 'T2', value: '002' },
        { label: 'T3', value: '003' }],
      orderStatuList: orderStatuList,
      kehuList: [],
      siteList: [{
        "value": "",
        "label": "全部"
      }],
      yunweiList: [{
        "value": "",
        "label": "全部"
      }],
      responseList: [{
        "value": "",
        "label": "全部"
      }],
      dialogDetails: false,
      dialogVisible: false,
      workOrderData: []
    }
  },
  filters: {
    formatTime (time) {
      if (time && time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1]
      } else {
        return '-'
      }
    },
    formatRow (res) {
      if (res && res != null) {
        return res
      } else {
        return '-'
      }
    }
  },
  created () {

    this.getWorkOrder()
    // 获取客户筛选的list
    this.kehuList = [{
      "value": "",
      "label": "全部"
    }]
    for (let it of this.$store.state.userClients) {
      let item = {
        "value": it.clientId,
        "label": it.clientName
      }
      this.kehuList.push(item)
    }

  },
  methods: {
    // 工单类别筛选
    orderTypeClick (e) {
      this.orderTypeValue = e
    },
    // 客户筛选
    kehuClick (e) {
      let params = {
        userId: this.$store.state.curuserId,
        clientFid: e
      }
      this.kehuValue = e
      //客户筛选关联到厂站
      this.siteList = [{
        "value": "",
        "label": "全部"
      }]
      this.$store.dispatch('getSite', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.value,
              "label": it.label
            }
            this.siteList.push(item)
          }
          this.site = '全部'
          this.yunweiTeam = '全部'
          this.yunweiList = [{
            "value": "",
            "label": "全部"
          }]
          this.responseMan = '全部'
          this.responseList = [{
            "value": "",
            "label": "全部"
          }]
        }
      });

    },
    // 厂站筛选
    siteClick (e) {
      this.siteValue = e
      let params = {
        siteFid: e
      }
      // 选择全部清空
      if (e == '') {
        this.yunweiTeam = '全部'
        this.yunweiList = [{
          "value": "",
          "label": "全部"
        }]
        this.responseMan = '全部'
        this.responseList = [{
          "value": "",
          "label": "全部"
        }]
        return
      }
      // 根据厂站筛选关联到运维班组
      this.yunweiList = [{
        "value": "",
        "label": "全部"
      }]
      this.$store.dispatch('getYwTeam', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.fid,
              "label": it.teamName
            }
            this.yunweiList.push(item)
          }
          if (res.options.length == 0) {
            this.yunweiTeam = '全部'
            this.yunweiList = [{
              "value": "",
              "label": "全部"
            }]
            this.responseMan = '全部'
            this.responseList = [{
              "value": "",
              "label": "全部"
            }]
          }
        }
      })
    },
    // 运维班组筛选
    teamClick (e) {
      this.yunweiTeamValue = e
      let params = {
        teamId: e
      }

      // 选择全部清空
      if (e == '') {
        this.responseMan = '全部'
        this.responseList = [{
          "value": "",
          "label": "全部"
        }]
        return
      }

      // 根据运维班组筛选关联到负责人
      this.responseList = [{
        "value": "",
        "label": "全部"
      }]
      this.$store.dispatch('teamManager', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.fid,
              "label": it.realName
            }
            this.responseList.push(item)
          }
          if (res.options.length == 0) {
            this.responseMan = '全部'
            this.responseList = [{
              "value": "",
              "label": "全部"
            }]
          }
        }
      })
    },
    // 逾期状态筛选
    yuClick (e) {
      this.yuStatuValue = e

    },
    //工单状态筛选 
    orderStatuClick (e) {
      this.orderStatus = e
    },
    // 负责人筛选
    responseClick (e) {
      this.responseManValue = e
    },
    // 工单等级筛选
    levalClick (e) {
      this.orderLevalValue = e
    },
    // 获取工单list
    getWorkOrder () {
      this.loading = true
      // 工单状态flow和state
      let order = null
      if (this.orderStatus != '') {
        order = JSON.parse(this.orderStatus)
      }
      let params = {
        pageSize: this.pageSize,
        pageIndex: this.currentPage,
        woType: this.orderTypeValue,
        clientFid: this.kehuValue,
        siteFid: this.siteValue,
        equip1Type: '',
        flow: order == null ? '' : order.flow,
        state: order == null ? '' : order.state,
        teamId: this.yunweiTeamValue,
        teamMagId: this.responseManValue,
        woLevel: this.orderLevalValue,
        yuqiState: this.yuStatuValue,
        startTime: this.startTime == null ? '' : this.startTime,
        endTime: this.endTime == null ? '' : this.endTime
      }

      this.$store.dispatch('workOrderList', params).then(res => {
        if (res) {
          this.total = res.amount
          this.workOrderData = res.dataList
          this.loading = false
        }
      })

    },
    // 重置筛选
    revert () {
      this.orderType = '全部'
      this.orderTypeValue = ''
      this.kehu = '全部'
      this.kehuValue = ''
      this.site = '全部'
      this.siteValue = ''
      this.yunweiTeam = '全部'
      this.yunweiTeamValue = ''
      this.responseMan = '全部'
      this.responseManValue = ''
      this.yuStatu = '全部'
      this.yuStatuValue = ''
      this.orderStatus = ''
      this.orderLeval = '全部'
      this.orderLevalValue = ''
      this.startTime = ''
      this.endTime = ''
      this.siteList = [{
        "value": "",
        "label": "全部"
      }]
      this.yunweiList = [{
        "value": "",
        "label": "全部"
      }]
      this.responseList = [{
        "value": "",
        "label": "全部"
      }]
    },
    // 列表详情点击
    detalClick (e) {
      this.nowOrderId = e.fid
      this.dialogDetails = true
    },
    // 取消审批
    cancelClick (e) {
      let params = {
        userId: this.$store.state.curuserId,
        woId: e.fid
      }
      this.$store.dispatch('workOrderCancel', params).then(res => {
        if (res) {
          this.getWorkOrder()
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
        }
      })

    },
    // 编辑
    editClick (e) {
      this.orderTopTitle = '编辑工单'

      let params = {
        woId: e.fid
      }
      this.$store.dispatch('getOrderEdit', params).then(res => {
        if (res) {
          this.formOrder = res
          this.dialogNew = true
        }
      })

    },
    submitClick (e) {
      let params = {
        userId: this.$store.state.curuserId,
        woId: e.fid
      }
      this.$store.dispatch('workOrderSubmit', params).then((res) => {
        // console.log(res)
        if (res) {
          this.getWorkOrder()
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }
      })
    },
    deleteClick (e) {
      this.nowOrderId = e.fid
      this.dialogVisible = true
    },
    // 确认点击
    sureClick () {

      let params = {
        userId: this.$store.state.curuserId,
        woId: this.nowOrderId
      }
      this.$store.dispatch('workOrderDelete', params).then((res) => {
        if (res) {
          this.getWorkOrder()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.dialogVisible = false
        }
      })

    },
    // 新建工单返回刷新列表
    newOrderReload () {
      this.dialogNew = false
      this.getWorkOrder()
    },
    // 改变分页
    handleCurrentChange (e) {
      this.currentPage = e
      this.getWorkOrder()
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.order_bg {
  background-color: #ffffff;
}
.flex {
  display: flex;
}
.jbt {
  justify-content: space-between;
}
.ac {
  align-items: center;
}
.top_select {
  margin: 20px 0px 0px 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  display: flex;
  .left_title {
    width: 56px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    margin-right: 11px;
  }
  .common_input {
    width: 170px !important;
  }
  .select_mode {
    width: 280px;
  }
}
.btn {
  width: 86px;
  height: 38px;
}
.listTop {
  padding: 0px 30px 10px 30px;
}
.table_content {
  display: flex;
  padding: 0px 30px 20px 30px;
  .table_list {
    max-height: 660px;
  }
}
.page_box {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-right: 30px;
}
.tagImg {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 30px;
  top: 30px;
}
</style>
