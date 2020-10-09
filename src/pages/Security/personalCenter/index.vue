<template>
  <div>
    <!-- 下面的列表和公告 -->
    <div class="flex li-content">
      <!-- 左侧布局 -->
      <div class="left">
        <!-- 我的审核 -->
        <div class="item">
          <div class="flex jcb listTitle">
            <div class="flex">
              <img src="../../../assets/image/logo/icon_wodeshenhe.png" />
              <p class="p-title">我的审核</p>
            </div>
            <p class="more" @click="toPage('check')">更多>></p>
          </div>
          <div class="tableStyle">
            <el-table :header-cell-style="{ background: '#F8F8F9' }" :data="myCheckData" height="212">
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="clientName" label="客户" />
              <el-table-column prop="siteName" label="厂站" />
              <el-table-column prop="teamName" label="运维班组" />
              <el-table-column prop="manager" label="负责人" />
              <el-table-column prop="state" label="状态" />
              <el-table-column prop="datetime" label="创建时间" />
              <el-table-column prop="title" label="流程" />
              <el-table-column prop="flow" label="审批" />
            </el-table>
          </div>
        </div>
        <!-- 我的报警 -->
        <div class="item">
          <div class="flex jcb listTitle">
            <div class="flex">
              <img src="../../../assets/image/logo/icon_wodebaojing.png" />
              <p class="p-title">我的报警</p>
            </div>
            <p class="more" @click="toPage('alert')">更多>></p>
          </div>
          <div class="tableStyle">
            <el-table :header-cell-style="{ background: '#F8F8F9' }" :data="myAlertData" height="212">
              <el-table-column prop="detail" label="详情" />
              <el-table-column prop="addtime" label="时间" />
              <el-table-column prop="siteName" label="厂站" />
              <el-table-column prop="equipName" label="设备" />
              <el-table-column prop="canshuName" label="参数" />
              <el-table-column prop="alertLevel" label="类型" />
            </el-table>
          </div>
        </div>
        <!-- 我的报告 -->
        <div class="item_report">
          <div class="flex jcb listTitle">
            <div class="flex">
              <img src="../../../assets/image/logo/icon_wodebaogao.png" />
              <p class="p-title">我的报告</p>
            </div>
            <p class="more" @click="toPage('report')">更多>></p>
          </div>
          <div class="tableStyle">
            <el-table :header-cell-style="{ background: '#F8F8F9' }" :data="myReportData" height="220">
              <el-table-column prop="reportCode" label="报告编号" />
              <el-table-column prop="reportTitle" label="报告名称" />
              <el-table-column prop="reportType" label="时间类型" />
              <el-table-column prop="reportTime" label="报告日期" />
              <el-table-column prop="buildType" label="生成方式" />
              <el-table-column prop="reportState" label="报告状态" />
            </el-table>
          </div>
        </div>
      </div>
      <!-- 右侧布局 -->
      <div class="right">
        <img class="right-top1" @click="dialogVisible = true" src="../../../assets/image/admin/img_quick.png" />
        <div class="right-top2">
          <div class="flex r-title">
            <img src="../../../assets/image/logo/icon_txl.png" />
            <p class="p-title">通讯录</p>
          </div>
          <div class="flex ac">
            <el-autocomplete class="input-sc" v-model="searchTo" :fetch-suggestions="querySearch" placeholder="请输入内容"
              @select="handleSelect" value-key="name" popper-class="my_autocomplete">
              <template slot-scope="{ item }">
                <span class="name">{{ item.name }}</span>
                <span class="phone">{{ item.phNo }}</span>
              </template>
            </el-autocomplete>
            <img class="search-btn" src="../../../assets/image/admin/icon_srarch.png" />
          </div>
        </div>
        <div class="right-mid1">
          <div class="flex r-title">
            <img src="../../../assets/image/home/icon_inf_tz.png" />
            <p class="p-title">通知</p>
          </div>
          <p class="list-line" />
          <div class="news-list" :class="[{flex_column_center: tongzhiList.length==0}]">
            <template v-if="tongzhiList.length > 0">
              <div class="item" v-for="(item, index) in tongzhiList" :key="index">
                <p class="title" :class="item.choose ? 'c1' : ''">{{ item.title }}</p>
              </div>
            </template>
            <div style="color: #909399;" v-else>
              暂无通知
            </div>
          </div>
        </div>
        <div class="right-mid2">
          <div class="flex r-title">
            <img src="../../../assets/image/logo/icon_gg.png" />
            <p class="p-title">公告</p>
          </div>
          <p class="list-line" />
          <div class="news-list" :class="[{flex_column_center: newsList.length==0}]">
            <template v-if="newsList.length > 0">
              <div class="item" v-for="(item, index) in newsList" :key="index" @click="newsClick(item, index)">
                <p class="title" :class="item.choose ? 'c1' : ''">{{ item.title }}</p>
              </div>
            </template>
            <div style="color: #909399;" v-else>
              暂无公告
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <div class="flex r-title">
            <img src="../../../assets/image/logo/icon_wodejiaojieban.png" />
            <p class="p-title">我的交接班</p>
          </div>
          <div class="flex jcb jiaojieban">
            <img @click="toPage('jiaoban')" src="../../../assets/image/logo/img_jiaoban.png" />
            <img @click="toPage('jieban')" src="../../../assets/image/logo/img_jieban.png" />
          </div>
        </div>
      </div>
    </div>
    <!--快捷功能弹框 -->
    <el-dialog title="快捷功能设置(最多设置15项)" :visible.sync="dialogVisible">
      <!-- 顶部的tabbar -->
      <el-tabs v-model="activeName" @tab-click="handleClick" style="max-height: 600px; overflow：scroll;">
        <el-tab-pane v-for="(item, index) in quickMenu" :label="item.name" :name="item.id" :key="index">
          <div class="flex" v-for="(item1, index1) in item.items" :key="index1">
            <p class="check-title">{{item1.name}}</p>
            <div class="checkItem">
              <div class="checkbox flex" v-for="(item2, index2) in item1.children" :key="index2">
                <el-checkbox style="margin-top: 6px;" v-model="item2.selected">
                  {{item2.name}}
                </el-checkbox>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <p style="margin: 20px 0px 10px 0px;" class="list-line" />
      <div class="flex jcc">
        <el-button @click="confirm" type="primary">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 公告 -->
    <el-dialog title="公告" :visible.sync="dialogNotice">
      <p style="">{{ noticeTitle }}</p>
      <p style="">{{ noticeContent }}</p>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'personalCenter',
  components: {},
  computed: mapState(['curuserId']),
  data () {
    return {
      userId: '',
      myCheckData: [],
      myAlertData: [],
      myReportData: [],
      searchRes: [],
      newsList: [],
      tongzhiList: [],
      checked: false,
      dialogVisible: false,
      dialogNotice: false,
      searchTo: '',
      noticeTitle: '',
      noticeContent: '',
      quickMenu: [],
      activeName: 'menu_znyw'
    }
  },
  created () {
    this.getPersonalCenter()
  },
  mounted () { },
  methods: {
    // 获取个人中心数据
    async getPersonalCenter () {
      const that = this
      await that.$store.dispatch('getCuruserId')
      that.userId = that.curuserId
      let data = {
        userId: that.userId
      }
      that.$store.dispatch('personalCenter', data).then(res => {
        if (res) {
          that.myCheckData = res.result.personalCenter.shenpi || []
          that.myAlertData = res.result.personalCenter.alert || []
          that.myReportData = res.result.personalCenter.report || []
          that.searchRes = res.result.personalCenter.contacts || []
          that.newsList = res.result.personalCenter.board || []
          that.tongzhiList = res.result.personalCenter.notice || []
          that.quickMenu = res.result.personalCenter.quickMenu || []
          for (let i of that.newsList) {
            i.choose = false
          }
        }
      })
    },
    // 跳转路由页面
    toPage (item) {
      const that = this
      let checkData = {
        name: 'Myshenhe',
        params: null
      }
      let alertData = {
        name: 'Gaojingjc',
        params: null,
        isReload: null
      }
      let reportData = {
        name: 'Reportclient_YW',
        params: null
      }
      let jiaobanData = {
        name: 'Myjiaojieban',
        params: '?type=1'
      }
      let jiebanData = {
        name: 'Myjiaojieban',
        params: '?type=2'
      }
      switch (item) {
        case 'check':
          that.$store.dispatch('propsRouteData', checkData)
          break;
        case 'alert':
          that.$store.dispatch('propsRouteData', alertData)
          break;
        case 'report':
          that.$store.dispatch('propsRouteData', reportData)
          break;
        case 'jiaoban':
          that.$store.dispatch('propsRouteData', jiaobanData)
          break;
        case 'jieban':
          that.$store.dispatch('propsRouteData', jiebanData)
          break;
        default:
          break;
      }
    },
    // 公告点击查看相关详情
    newsClick (item, index) {
      for (var i = 0; i < this.newsList.length; i++) {
        if (index == i) {
          this.newsList[i].choose = true
        } else {
          this.newsList[i].choose = false
        }
      }

      this.dialogNotice = true
      this.noticeTitle = item.title
      this.noticeContent = item.detail
    },
    // 快捷弹框里面的tabbar切换事件
    handleClick () {
      // console.log(tab, event)
    },
    // 确定快捷入口
    confirm () {
      const that = this
      let myEntryList = []
      for (let i of that.quickMenu) {
        for (let j of i.items) {
          for (let k of j.children) {
            if (k.selected) {
              myEntryList.push(k)
            }
          }
        }
      }
      if (myEntryList.length > 15) {
        that.$message.error('最多设置15个快捷入口!')
      } else {
        let quickMenu = JSON.stringify(myEntryList)
        let data = {
          userId: that.userId,
          quickMenu
        }
        that.$store.dispatch('quickMenu', data).then(res => {
          if (res && res.result.quickMenu) {
            that.getQuickEntry()
            that.$message({
              message: '快捷入口设置成功！',
              type: 'success'
            })
            that.activeName = 'menu_znyw'
            that.dialogVisible = false
          } else {
            that.$message.error('快捷入口设置失败!')
          }
        })
      }
    },
    // 获取快捷入口
    async getQuickEntry () {
      const that = this
      let data = {
        userId: that.userId
      }
      await this.$store.dispatch('quickEntry', data)
    },
    // 输入框查询返回选择
    handleSelect () {
      // console.log(item)
    },
    //输入框查询
    querySearch (queryString, cb) {
      const that = this
      let res = that.searchRes
      let results = queryString ? res.filter(that.createFilter(queryString)) : res;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 输入框查询返回
    createFilter (queryString) {
      return res => {
        return (res.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || res.phNo.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top-header {
  height: 80px;
  padding-left: 10px;
  background-color: #ffffff;
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
.el-title {
  cursor: pointer;
  padding-top: 30px;
  padding-left: 20px;
}
.el-bottons {
  margin-top: 22px;
  margin-left: 30px;
}
.tag-button {
  margin-right: 12px;
  padding: 8px 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  background: #ecf4fa;
  color: #333333;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    font-size: 14px;
  }
}
// 标签点击状态
.bg-click {
  background: #006fbc;
  color: #ffffff;
}
// 功能管理
.energy {
  padding-right: 20px;
  cursor: pointer;
  img {
    width: 24px;
    height: 22px;
  }
  p {
    padding-left: 5px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 111, 188, 1);
  }
}
.p-title {
  margin-left: 8px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.li-content {
  // margin-top: 10px;
  .left {
    background: #ffffff;
    flex: 2.7;
    margin-right: 4px;
    .item {
      width: 100%;
      height: 272px;
      border-bottom: 8px solid #f0f2f5;
    }
    .item_report {
      width: 100%;
      height: 272px;
    }
    .listTitle {
      padding: 10px 30px 10px 41px;
      .more {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(0, 111, 188, 1);
        cursor: pointer;
      }
    }
  }
  .right {
    background: #f0f2f5;
    flex: 1;
    margin-left: 4px;
  }
}
.tableStyle {
  margin: 0px 30px 0px 41px;
}
.right-top1 {
  width: 100%;
  cursor: pointer;
  height: 120px;
  border-bottom: 6px solid #f0f2f5;
}
.right-top2 {
  width: 100%;
  height: 132px;
  background: #ffffff;
  border-bottom: 8px solid #f0f2f5;
}
.r-title {
  padding: 10px 0px 10px 30px;
}
.right-mid1 {
  width: 100%;
  height: 192px;
  background: #ffffff;
  border-bottom: 8px solid #f0f2f5;
}
.right-mid2 {
  width: 100%;
  height: 192px;
  background: #ffffff;
  border-bottom: 8px solid #f0f2f5;
}
.right-bottom {
  width: 100%;
  height: 162px;
  background: #ffffff;
}
.input-sc {
  width: 80%;
  // min-width: 60px;
  margin-left: 30px;
}
.search-btn {
  width: 20px;
  height: 20px;
  margin-left: -30px;
  z-index: 999;
}
.jiaojieban {
  margin: 15px 10% 0px 10%;
  cursor: pointer;
}
// 公告新闻列表
.news-list {
  width: 100%;
  height: 145px;
  overflow-x: hidden;
  overflow-y: scroll;
  .item {
    padding: 10px 20px 10px 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // cursor: pointer;
    .title {
      font-size: 16px;
      cursor: pointer;
    }
    .content {
      font-size: 14px;
      padding-top: 16px;
      margin-bottom: 10px;
      color: rgba(102, 102, 102, 1);
    }
  }
}
.list-line {
  height: 1px;
  background: #eeeeee;
}
.news-list::-webkit-scrollbar {
  display: none;
}
.text-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; //作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
  -webkit-line-clamp: 2; //显示的行
}
.c1 {
  color: #006fbc;
}
.check-title {
  flex: 1;
  margin-top: 18px;
  font-size: 15px;
  color: #000000;
}
.checkItem {
  flex: 9;
  margin-top: 12px;
  margin-left: 22px;
}
.checkbox {
  float: left;
  margin-right: 35px;
}
.my_autocomplete {
  .name {
    margin-right: 5px;
  }
}
</style>
