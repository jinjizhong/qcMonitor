<template>
  <div class="all">
    <div v-if="title !== ''" class="flex title">
      <img class="title-logo" src="../../assets/image/admin/icon_ssjc.png" /><span>{{ title }}</span>
    </div>
    <div v-if="title !== ''" class="line">
      <p class="title-line" />
    </div>
    <!-- 中间选项和状态 -->
    <div v-if="btnData.length > 0" class="f-bwn">
      <div class="flex btns">
        <div v-for="(item, index) in btnData" :key="index">
          <div class="button btn-mar-left" :class="item.type == 1 ? 'btnColor' : ''" @click="btnClick(index, item)">
            {{ item.name }}
          </div>
        </div>

        <!-- <button class="btn-mar-left">数据</button> -->
      </div>
      <div v-if="status.length > 0" class="flex">
        <div class="flex points" v-for="(item, index) in status" :key="index">
          <p class="round color3FB820" :class="
              item.type === 0
                ? 'color3FB820'
                : '' || item.type === 1
                ? 'colorFF9239'
                : '' || item.type === 2
                ? 'colorFF3636'
                : ''
            " />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 下面的list -->
    <!-- 表标题 -->
    <!-- <div class="item-list-title">
			<p class="s1" v-for="(item1,index1) in listTitle" :key='index1' :style="{width: `${100/listTitle.length}%`}" >
				{{item1.name}}
			</p>
		</div> -->
    <!-- 内容 -->
    <div class="item-list-content" :height="tableHeight">
      <el-table :height="tableHeight" :data="listContent" stripe style="width: 100%;" v-loading="tLoad">
        <slot></slot>
      </el-table>
      <!-- :height="tableHeight" -->
      <!-- <div v-for="(item2,index2) in listContent" :key='index2'>
				<div class="list-item">
					<div v-for="(item3,index3) in item2.array" :key='index3' class="l1" :style="{width: `${100/listTitle.length}%`}">
						<p v-if="item3==='0'" class="round color3FB820"></p>
						<p v-else-if="item3==='1'" class="round colorFF9239"></p>
						<p v-else-if="item3==='2'" class="round colorFF3636"></p>
						<span v-else>{{item3}}</span>
					</div>
				</div>
				<p class="list-line"/>
			</div> -->
    </div>
    <div v-if="$isPc">
      <JsonExcel v-if="isExport" :data="listContent" :fields="jsonFields" :name="exportName" class="export_xlx">
        <span>导出</span>
        <!-- <img src="download_icon.png" /> -->
      </JsonExcel>
    </div>

  </div>
</template>

<script>
import JsonExcel from 'vue-json-excel'
export default {
  components: {
    JsonExcel
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    btnData: {
      type: Array,
      default () {
        return []
      }
    },
    status: {
      type: Array,
      default () {
        return []
      }
    },
    tableHeight: {
      type: [String, Number],
      default: 250
    },
    listTitle: {
      type: Array,
      default () {
        return [
          {
            name: '序号'
          },
          {
            name: '监测内容'
          },
          {
            name: '状态'
          },
          {
            name: '监测时间'
          }
        ]
      }
    },
    listContent: {
      type: Array,
      default () {
        return []
      }
    },
    jsonFields: {
      type: Object,
      default () {
        return {}
      }
    },
    isExport: {
      type: Boolean,
      default: false
    },
    tLoad: {
      type: Boolean,
      default: false
    },
    exportName: {
      type: String,
      default: 'table.xls'
    }
  },
  data () {
    return {
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    btnClick (index, item) {
      for (let i = 0; i < this.btnData.length; i++) {
        if (i == index) {
          this.btnData[i].type = 1
        } else {
          this.btnData[i].type = 0
        }
      }
      this.$emit('btnClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 700px) {
  .title-line {
    width: 90px !important;
  }

  .title {
    font-size: 14px !important;
  }

  .title-logo {
    height: 12px !important;
    width: 10px !important;
  }

  .button {
    width: 45px !important;
    height: 20px !important;
    line-height: 20px !important;
    font-size: 12px !important;
  }

  .points {
    padding-right: 9px !important;
  }

  .points span {
    font-size: 12px !important;
  }
}

.flex {
  display: flex;
  align-items: center;
}

.f-bwn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all {
  width: 96%;
  background-color: #ffffff;
  padding-left: 2%;
  padding-right: 2%;
  position: relative;
  .export_xlx {
    position: absolute;
    top: -45px;
    right: 26px;
    background: #ff8e29;
    cursor: pointer;
    color: #ffffff;
    width: 90px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
  }
  .export_xlx:hover {
    opacity: 0.8;
    transition: all ease 0.8s;
  }
}

.line {
  position: relative;
  height: 1px;
  background-color: #cccccc;
}

.title-line {
  position: absolute;
  height: 2px;
  width: 110px;
  background-color: #1277d2;
}

.title {
  height: 43px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}

.title-logo {
  width: 21px;
  height: 16px;
  padding-left: 6px;
  margin-right: 6px;
}

/* 按钮集合 */
.btns {
  height: 54px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}

.btns .button {
  width: 70px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btnColor {
  color: #ffffff;
  background-color: #1277d2;
}

.btn-mar-left {
  margin-left: 15px;
}

/* 点警告集合 */
.points {
  height: 54px;
  padding-right: 18px;
}

.round {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.points span {
  font-size: 14px;
  font-family: Adobe Heiti Std;
  font-weight: bold;
  color: #333333;
  padding-left: 6px;
}

/*绿色 */
.color3FB820 {
  background-color: #3fb820;
}

/* 红色 */
.colorFF3636 {
  background-color: #ff3636;
}

/* 黄色 */
.colorFF9239 {
  background-color: #ff9239;
}

/* 下面的list */
.item-list-title {
  width: 100%;
  height: 40px;
  line-height: 41px;
  background: #f0f2f5;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  margin-bottom: 5px;
  margin-right: 20px;
  display: flex;

  .s1 {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
}

.item-list-content {
  width: 100%;
  //   height: 60%;
  margin-bottom: 5px;
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: scroll;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;

  .list-item {
    display: flex;
    align-items: center;
    height: 39px;

    .l1 {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
    }
  }

  .list-line {
    height: 1px;
    background: #eeeeee;
  }
}

.item-list-content::-webkit-scrollbar {
  display: none;
}
</style>
