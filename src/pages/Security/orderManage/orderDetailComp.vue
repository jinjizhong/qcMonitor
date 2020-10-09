<template>
  <div class="detaisContent">
    <div class="titleStyle flex_row_yCenter">
      <p>基本信息</p>
    </div>
    <!-- 详情内容 -->
    <div>
      <div class="flex">
        <p class="details">工单类别：<span>{{dataDetail.woType}}</span></p>
        <p class="details">工单等级：<span>{{dataDetail.woLevel}}</span></p>
      </div>
      <div class="flex">
        <p class="details">客户：<span>{{dataDetail.clientName}}</span></p>
        <p class="details">厂站：<span>{{dataDetail.siteName}}</span></p>
      </div>
      <div class="flex">
        <p class="details">运维班组：<span>{{dataDetail.teamName}}</span></p>
        <p class="details">负责人：<span>{{dataDetail.teamManager}}</span></p>
      </div>
      <p class="details">工单名称：<span>{{dataDetail.title}}</span></p>
      <p class="details">关联设备：<span>{{dataDetail.equipNames}}</span></p>
      <div class="flex">
        <p class="details">起始时间：<span>{{dataDetail.startTime}}</span></p>
        <p class="details">结束时间：<span>{{dataDetail.endTime}}</span></p>
      </div>
      <p class="details">工单描述：<span>{{dataDetail.description}}</span></p>
      <p class="details">工单备注：<span>{{dataDetail.remarks}}</span></p>
      <p class="details">工单附件：<a style="margin-left:10px" v-for="(item,index) in dataDetail.attachments" :key="index"
          :href="item.url">{{item.name}}</a></p>
      <p class="details">审批意见：<span>{{dataDetail.feedBack}}</span></p>
    </div>
    <div v-if="dataDetail.woType=='计划工单'" class="titleStyle flex_row_yCenter">
      <p>操作票</p>
    </div>
    <el-table v-if="dataDetail.woType=='计划工单'" :data="tickets" height="140" :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}">
      <el-table-column prop="ticketCode" align="center" label="操作票编号" />
      <el-table-column prop="ticketName" align="center" label="操作任务" />
      <el-table-column prop="ticketState" label="操作票状态" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="caozuopDetal(scope.row)" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="titleStyle flex_row_yCenter">
      <p>处理详情</p>
    </div>
    <div>
      <div class="flex">
        <p class="details">任务状态：<span>{{dataDetail.wo_state}}</span></p>
      </div>
      <div class="flex">
        <p class="details">开始时间：<span>{{dataDetail.realStart}}</span></p>
        <p class="details">验收时间：<span>{{dataDetail.realEnd}}</span></p>
      </div>
    </div>
    <div class="titleStyle flex_row_yCenter">
      <p>历史进度</p>
    </div>
    <el-timeline class="history">
      <el-timeline-item v-for="(item, index) in historyList" :key="index" :color="color1">
        <!-- item.type==1?color1:''||item.type==2?color2:'' -->
        <!-- :style="{color:item.type==1?color1:''||item.type==2?color2:''}" -->
        <p class="flex_row">
          <span style="flex:1;">{{item.status}}</span>
          <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
            <span class="nameType" style="flex:2;">{{item.name}}</span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="item.job" placement="top-start">
            <span class="nameType" style="flex:2;">{{item.job}}</span>
          </el-tooltip>
          <span style="flex:1;">{{item.time|formatTime}}</span>
        </p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    orderFid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataDetail: {
        "fid": "",
        "woCode": "",
        "woType": "",
        "woLevel": "",
        "description": "",
        "title": "",
        "clientName": "",
        "siteName": "",
        "startTime": '',
        "endTime": '',
        "equipNames": "",
        "teamName": "",
        "teamManager": "",
        "realStart": '',
        "realEnd": '',
        "woState": "",
        "wo_state": "",
        "FeedBack": "",
        "remarks": '',
        "attachments": []
      },
      tickets: [],
      color1: '#4BBD6B',
      color2: '#FF1B1B',
      historyList: []
    }
  },
  filters: {
    formatTime (time) {
      return time.split('T')[0] + ' ' + time.split('T')[1]
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    // 获取工单详情
    getDetails () {
      let params = {
        woId: this.orderFid
      }
      this.$store.dispatch('getOrderDetail', params).then(res => {
        //console.log(JSON.stringify(res))
        if (res) {
          this.dataDetail = res.dataDetail
          this.tickets = res.tickets
          this.historyList = res.operatelogs
        }
      });
    },
    // 操作票
    caozuopDetal (params) {
      //console.log(params)
      let propsData = {
        name: 'Caozuopiaogl',
        params: `?fid=${params.fid}`
      }
      this.$store.dispatch('propsRouteData', propsData)
      this.$emit("detailReload")
      // let propsData = {
      //     name: '',
      //     params: params.fid
      //   }
      //   this.$store.dispatch('propsRouteData', propsData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.flex {
  display: flex;
}
.detaisContent {
  // padding: 0px 20px 0px 20px;
  margin-top: -39px;
  max-height: 820px;
  overflow-y: scroll;
}
.titleStyle {
  width: 80wh;
  height: 32px;
  margin-top: 9px;
  background-color: #f0f2f5;
  p {
    padding-left: 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
}
.details {
  flex: 1;
  padding: 10px 0px 0px 20px;
}
.history {
  padding-top: 10px;
  padding-left: 20px;
}
.nameType {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
