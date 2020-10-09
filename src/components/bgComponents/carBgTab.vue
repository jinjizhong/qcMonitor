<template>
  <div class="tab-all"
       :style="{width: `${bgWidth}px`, height: `${bgHeight}px`,backgroundImage: bgImg}">
    <div class="title f-center">
      <img style="margin-right: 6px;"
           src="../../assets/image/icon_btys.png" />
      <p style="margin-right: 6px;">{{title}}</p>
      <img src="../../assets/image/icon_btys.png" />
    </div>

    <tabs style="position: absolute;"
          v-if="TabList.length!==0"
          :TabList="TabList"
          @tabClick="tabClick" />
    <div class="scroll-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import tabs from './tabs.vue'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImg: {
      type: String,
      default: `url(${require('../../assets/image/bigscreen/img_car_bg1.png')})`
    },
    bgWidth: {
      type: [String, Number],
      default: 431
    },
    bgHeight: {
      type: [String, Number],
      default: 880
    },
    TabList: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  components: {
    tabs
  },
  data () {
    return {
    }
  },
  methods: {
    tabClick (index) {

      /* 
      {
        title: '告警',
        isDedult: true
      }, {
        title: '预警',
        isDedult: false
      }
       */
      // for(let it of this.TabList){
      // 	it.isDedult=false;
      // 	if(item.isDedult===it.isDedult){
      // 		it.isDedult=true;
      // 	}
      // }
      for (let i = 0; i < this.TabList.length; i++) {
        if (index === i) {
          this.$emit("tabClick", this.TabList[i].type);
          this.TabList[i].isDedult = true;
        } else {
          this.TabList[i].isDedult = false;
        }

      }
    }
  }
}
</script>

<style scoped>
.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.f-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.f-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-all {
  position: relative;
  /* 		background-image: url("../../assets/image/img_car_bg1.png"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  padding-top: 27px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.tab-bg {
  width: 428px;
  height: 45px;
  margin-left: 1px;
  margin-top: 27px;
  background: rgba(11, 80, 128, 1);
  box-shadow: 0px 1px 0px 0px rgba(48, 191, 238, 1);
}

.tab-title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
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

.scroll-wrap {
  height: 700px;
  /* width: 100%; */
  margin-top: 20px;
  /* overflow: scroll;
		overflow-x: hidden; */
}

.scroll-content {
  position: relative;
  transition: top 0.5s;
}
</style>
