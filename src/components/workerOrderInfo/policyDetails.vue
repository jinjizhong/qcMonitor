<template>
  <div class="policyDetail_box">
    <div class="item-top">
      <p class="item_content">
        <span class="item_label">监测设备：<span style="color:#333;">{{topInfo.alertEquip}}</span></span>
        <span class="item_label">故障发生时间：<span style="color:#333;">{{topInfo.startTime}}</span></span>
        <span class="item_label">时间范围：<span style="color:#333;">{{topInfo.startTime}}-{{topInfo.endtime}}</span></span>
        <span class="item_label">故障持续时间：<span style="color:#333;">{{topInfo.timeDifference}}</span></span>
        <span class="item_label">确认选项：<span style="color:#333;">{{topInfo.yesOption}}</span></span>
        <span class="item_label">故障类型：<span style="color:#333;">{{topInfo.alertResultType}}</span></span>
      </p>
      <div class="header_title">
        <p class="s1 f-center">序号</p>
        <p class="s2 f-center">事件时间</p>
        <p class="s3 f-center">监测设备</p>
        <p class="s4 f-center">事件描述</p>
      </div>
      <div class="list-content">
        <div v-for="(item,index) in listContent" :key="index">
          <p class="list-item">
            <span class="l1 f-center">{{item.num}}</span>
            <span class="l2 f-center">{{item.startTime}}</span>
            <span class="l3 f-center">{{item.alertEquip}}</span>
            <span class="l4 f-center">{{item.alertInfo}}</span>

          </p>
          <p class="list-line" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    policyDetailData: {
      default: () => {
        return {}
      },
      type: Object
    },
    topInfo: {
      default: () => {
        return {}
      },
      type: Object
    },
    listContent: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.policyDetail_box {
  min-height: 650px;
  padding: 0 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .item-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header_title {
    width: 100%;
    height: 41px;
    line-height: 41px;
    background: #e1e2e6;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 5px;
    margin-top: 20px;
    display: flex;
    .s1 {
      width: 10%;
    }
    .s2 {
      width: 20%;
    }
    .s3 {
      width: 20%;
    }
    .s4 {
      width: 50%;
    }
  }

  .item_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    padding-top: 10px;
    .item_label {
      width: 45%;
      margin-top: 15px;
      padding-left: 10px;
      color: #666666;
    }

    .item_label2 {
      width: 100%;
      margin-top: 10px;
      color: #666666;
    }
  }
  .list-content {
    width: 100%;
    height: 450px;
    margin-bottom: 5px;
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    .list-item {
      display: flex;
      align-items: center;
      line-height: 43px;
      .l1 {
        width: 10%;
      }
      .l2 {
        width: 20%;
      }
      .l3 {
        width: 20%;
      }
      .l4 {
        width: 50%;
      }
    }
    .list-line {
      height: 1px;
      background: #eeeeee;
    }
  }
  .list-content::-webkit-scrollbar {
    display: none;
  }
}
</style>
