<template>
  <!-- 封装的顶部tabbar -->
  <div class="tab-bg f-around tab-title">
    <div v-for="(item,index) in TabList"
         :key="index"
         @click="tabClick(index)">
      <p class="f-center"
         :class="item.isDedult?'color-light':'color-none'">{{item.title}}</p>
      <p class="line"
         v-if="item.isDedult" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    TabList: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  methods: {
    tabClick (index) {
      // for(let it of this.TabList){
      // 	it.isDedult=false;
      // 	if(item.isDedult===it.isDedult){
      // 		it.isDedult=true;
      // 	}
      // }
      this.$emit("tabClick", index);

    }
  }
}
</script>

<style scoped>
.f-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.tab-bg {
  width: 428px;
  height: 45px;
  margin-left: 1px;
  margin-top: 27px;
  background: rgba(11, 80, 128, 1);
  box-shadow: 0px 1px 0px 0px rgba(48, 191, 238, 1);
  z-index: 9999999;
}
.color-none {
  width: 90px;
  color: #c2d1e6;
  cursor: pointer;
}

.color-light {
  width: 90px;
  color: #30bfee;
  cursor: pointer;
}

.line {
  width: 90px;
  height: 3px;
  position: absolute;
  margin-top: 6px;
  background: rgba(48, 191, 238, 1);
}
</style>
