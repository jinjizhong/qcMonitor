<template>
  <div class="workOrder_box">
    <div class="item_box"
         style="margin-top: 20px;">
      <p class="header_title"><span style="color:#333333;margin-left:10px;">基本信息</span></p>
      <p class="item_content">
        <span class="item_label">工单类别：<span style="color:#333;">{{workOrderData.type}}</span></span>
        <span class="item_label">工单等级：<span style="color:#333;">{{workOrderData.lever}}</span></span>
        <span class="item_label">客户名称：<span style="color:#333;">{{workOrderData.userName}}</span></span>
        <span class="item_label">厂站名称：<span style="color:#333;">{{workOrderData.portNam}}</span></span>
        <span class="item_label">运维班组：<span style="color:#333;">{{workOrderData.classBand}}</span></span>
        <span class="item_label">负责人：<span style="color:#333;">{{workOrderData.principal}}</span></span>
        <span class="item_label">开始时间：<span style="color:#333;">{{workOrderData.startTime1}}</span></span>
        <span class="item_label">结束时间：<span style="color:#333;">{{workOrderData.endTime1}}</span></span>
        <span class="item_label2">维护设备：<span style="color:#333;">{{workOrderData.maintenDevice}}</span></span>
        <span class="item_label2">工单描述：<span style="color:#333;">{{workOrderData.description}}</span></span>
      </p>
    </div>
    <div class="item_box"
         style="margin-top: 20px;">
      <p class="header_title"><span style="color:#333333;margin-left:10px;">处理详情</span></p>
      <p class="item_content">
        <span class="item_label">工作情况：<span style="color:#333;">{{workOrderData.workCase}}</span></span>
        <span class="item_label">验收情况：<span style="color:#333;">{{workOrderData.checkCase}}</span></span>
        <span class="item_label">开始时间：<span style="color:#333;">{{workOrderData.startTime2}}</span></span>
        <span class="item_label">结束时间：<span style="color:#333;">{{workOrderData.endTime2}}</span></span>
        <span class="item_label">实际执行：<span style="color:#333;">{{workOrderData.realExecute}}</span></span>
        <span class="item_label">验收时间：<span style="color:#333;">{{workOrderData.checkTime}}</span></span>
        <span class="item_label2">处理反馈：<span style="color:#333;">{{workOrderData.checkFeedback}}</span></span>
        <span class="item_label2 flex_row">附件：<img v-for="(item,key) in workOrderData.accessory"
               :key="key"
               :src="item"
               width="150"
               height="100"
               style="margin-right: 20px;"
               alt="img"></span>
      </p>
    </div>
    <div class="item_box"
         style="margin-top: 20px;">
      <p class="header_title"><span style="color:#333333;margin-left:10px;">历史进度</span></p>
      <ul class="time_vertical">
        <li><b></b><span class="timeline_title">创建任务</span><span class="timeline_title">张三</span><span class="timeline_title">运维负责人</span><span class="timeline_title">2017-7-17 15:30:00</span></li>
        <li><b></b><span class="timeline_title">审批任务</span><span class="timeline_title">张三</span><span class="timeline_title">运维负责人</span><span class="timeline_title">2017-7-17 15:30:00</span></li>
        <li><b></b><span class="timeline_title">执行任务</span><span class="timeline_title">张三</span><span class="timeline_title">运维负责人</span><span class="timeline_title">2017-7-17 15:30:00</span></li>
        <li><b></b><span class="timeline_title">完成任务</span><span class="timeline_title">张三</span><span class="timeline_title">运维负责人</span><span class="timeline_title">2017-7-17 15:30:00</span></li>
        <li><b></b><span class="timeline_title">验收任务</span><span class="timeline_title">张三</span><span class="timeline_title">运维负责人</span><span class="timeline_title">2017-7-17 15:30:00</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workOrderData: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      data: null
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.workOrder_box {
  min-height: 650px;
  padding: 0 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .item_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header_title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    background: rgba(240, 242, 245, 1);
    margin-bottom: 5px;
  }
  .item_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    .item_label {
      width: 50%;
      margin-top: 10px;
      color: #666666;
    }
    .item_label2 {
      width: 100%;
      margin-top: 10px;
      color: #666666;
    }
    // flex-direction: wrap;
  }
}

/*纵向时间轴*/
.time_vertical {
  list-style-type: none;
  border-left: 1px solid #4bbd6b;
  width: 100%;
  margin-left: 30px;
  margin-top: 10px;
  li {
    position: relative;
    height: 30px;
  }
  .timeline_title {
    margin-left: 80px;
    color: #333;
  }
}

.time_vertical li a {
  display: inline-block;
  margin-left: 20px;
  margin-top: 15px;
  text-decoration: none;
  color: #4bbd6b;
}

.time_vertical li b:after {
  content: "";
  position: absolute;
  top: 0px;
  left: -9px;
  width: 13px;
  height: 13px;
  border: 2px solid #4bbd6b;
  border-radius: 10px;
  background: #ffffff;
}
</style>
