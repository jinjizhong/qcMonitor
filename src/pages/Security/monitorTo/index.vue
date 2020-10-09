<template>
  <div>
    <div class="top-header flex_row_yCenter">
      <p class="p-title">选择厂站：</p>
      <el-select v-model="siteId" placeholder="请选择厂站" @change="headerSite">
        <el-option v-for="item in headerSite" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <p class="p-title">视频设备名称：</p>
      <el-select v-model="teamItem" placeholder="请选择" @change="chooseTeam">
        <el-option v-for="item in headerVideo" :key="item.fid" :label="item.name" :value="item.fid" />
      </el-select>
    </div>
    <!-- 下面的视频 -->
    <div class="video-all-bg">
      <div v-if="bannerNum==1">
        <div class="third_info f-bt">
          <div class="item" style="height: 728px;">
            <vue-aliplayer-v2 class="video_model1" @ready="handleReady" ref="VueAliplayerV2" id="player-11"
              :options="options" />
          </div>
        </div>
      </div>
      <div v-if="bannerNum==4">
        <div class="third_info f-bt">
          <div class="four_vidoe">
            <ali-player ref="player" class="aliplayer" width="100%" height="100%" control-bar-visibility="hover"
              :source="url" />
          </div>
          <div class="four_vidoe">
            <ali-player ref="player" class="aliplayer" width="100%" height="100%" control-bar-visibility="hover"
              :source="url" />
          </div>
        </div>
        <div class="third_info f-bt">
          <div class="four_vidoe">
            <ali-player ref="player" class="aliplayer" width="100%" height="100%" control-bar-visibility="hover"
              :source="url" />
          </div>
          <div class="four_vidoe">
            <ali-player ref="player" class="aliplayer" width="100%" height="100%" control-bar-visibility="hover"
              :source="url" />
          </div>
        </div>
      </div>
      <div v-if="bannerNum==6" class="six_info">
        <div class="six-item f-bt">
          <div class="max-bg">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
          <div class="right">
            <div class="min-bg">
              <video width="100%" height="100%" controls="controls" src=""></video>
            </div>
            <div class="min-bg mar">
              <video width="100%" height="100%" controls="controls" src=""></video>
            </div>
          </div>
        </div>
        <div class="six-item f-bt">
          <div class="min-bg">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
          <div class="min-bg mar-l">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
          <div class="min-bg mar-l">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
        </div>
      </div>
      <div v-if="bannerNum==8" class="eight_info">
        <div class="eight-item f-bt">
          <div class="max-bg">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
          <div class="right">
            <div class="min-bg">
              <video width="100%" height="100%" controls="controls" src=""></video>
            </div>
            <div class="min-bg mar">
              <video width="100%" height="100%" controls="controls" src=""></video>
            </div>
            <div class="min-bg">
              <video width="100%" height="100%" controls="controls" src=""></video>
            </div>
          </div>
        </div>
        <div class="eight-item f-bt">
          <div class="min-bg ">
            <video width="100%" height="100%" controls="controls" src=""></video>
          </div>
          <div class="min-bg mar-l"><video width="100%" height="100%" controls="controls" src=""></video></div>
          <div class="min-bg mar-l"><video width="100%" height="100%" controls="controls" src=""></video></div>
          <div class="min-bg mar-l"><video width="100%" height="100%" controls="controls" src=""></video></div>
        </div>
      </div>
      <div v-if="bannerNum==9">
        <div class="third_info f-bt">
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV201" id="player-01"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV202" id="player-02"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-03"
              :options="options" />
          </div>
        </div>
        <div class="third_info f-bt">
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-04"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-05"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-06"
              :options="options" />
          </div>
        </div>
        <div class="third_info f-bt">
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-07"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-08"
              :options="options" />
          </div>
          <div class="item">
            <vue-aliplayer-v2 class="video_model9" @ready="handleReady" ref="VueAliplayerV2" id="player-09"
              :options="options" />
          </div>
        </div>
      </div>
      <div class="flex-btn">
        <img v-for="(item,index) in imgList" :key="index" :src="item.isChoose==true?item.iconActive:item.icon"
          @click="iconClick(item,index)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'monitorTo',
  data () {
    return {
      url: '',
      options: {  //配置项
        isLive: true,
        useH5Prism: true,
        source: '' // 'https://krgb01.setrtmp.com/live/44030700991320500051.m3u8'
      },
      bannerNum: 1,
      imgList: [
        {
          icon: require('../../../assets/image/logo/btn_yp_normal.png'),
          iconActive: require('../../../assets/image/logo/btn_yp_active.png'),
          isChoose: false,
          bgNum: 1
        },
        {
          icon: require('../../../assets/image/logo/btn_sp_normal.png'),
          iconActive: require('../../../assets/image/logo/btn_sp_active.png'),
          isChoose: false,
          bgNum: 4
        },
        {
          icon: require('../../../assets/image/logo/btn_lp_normal.png'),
          iconActive: require('../../../assets/image/logo/btn_lp_active.png'),
          isChoose: false,
          bgNum: 6
        },
        {
          icon: require('../../../assets/image/logo/btn_bp_normal.png'),
          iconActive: require('../../../assets/image/logo/btn_bp_active.png'),
          isChoose: false,
          bgNum: 8
        },
        {
          icon: require('../../../assets/image/logo/btn_jp_normal.png'),
          iconActive: require('../../../assets/image/logo/btn_jp_active.png'),
          isChoose: false,
          bgNum: 9
        }
      ],
      companyId: '',
      siteId: '',
      selectedCompany: '',
      selectedOptions: '',
      videoList: [],
      teamItem: '',
    }
  },
  created () {
    this.getCompany()
    // this.$refs.VueAliplayerV2.play();
  },
  mounted () {
  },
  computed: mapState([
    'headerSite',
    'headerVideo',
    'userClients',
    'myCompanyId',
    'curuserId'
  ]),
  watch: {
    myCompanyId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.companyId = newVal
        this.getCompany()
      }
    }
  },
  methods: {
    // 头部信息获取
    async getCompany () {
      await this.$store.dispatch('getCuruserId')
      this.companyId = this.myCompanyId == '' ? this.userClients[0].clientId : this.myCompanyId
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId,
        anaType: 'Anfang-Shipin'
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteId = this.headerSite[0].value
      let videoData = {
        siteFid: this.siteId, // '0b526dfa_1012_43d9_b01d_aaf400dd5cdc', // this.siteId,
        anaType: 'Anfang-Shipin'
      }
      await this.$store.dispatch('realtimeVideo', videoData)
      this.teamItem = this.headerVideo.length > 0 ? this.headerVideo[0].fid : {}
      this.options.source = this.headerVideo[0].url
    },
    // 选择视频名称时
    chooseTeam (e) {
      let newArr = this.headerVideo.filter(item => item.fid == e)
      this.options.source = newArr[0].url || ''
    },
    handleReady (e) {
      // console.log(`ready`, e);
    },
    iconClick (item, index) {
      for (let i = 0; i < this.imgList.length; i++) {
        if (index === i) {
          this.imgList[i].isChoose = true
          this.bannerNum = this.imgList[i].bgNum
        } else {
          this.imgList[i].isChoose = false
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  cursor: pointer;
}
.top-header {
  height: 60px;
  padding-left: 10px;
  background-color: #ffffff;
}
.f-bt {
  display: flex;
  justify-content: space-between;
}
.video-all-bg {
  margin-top: 12px;
  background: #021331;
}
.third_info {
  width: 100%;
  .item {
    width: 100%;
    height: 237.2px;
    // background: #ffffff;
    margin: 8px 4px 0px 4px;
  }
}
// 六排版的
.six_info {
  width: 100%;
  .six-item {
    padding: 8px 8px 0px 8px;
    .max-bg {
      width: 100%;
      flex: 2;
      // height: 568px;
    }
    .right {
      flex: 1;
      margin-left: 8px;
    }
    .mar {
      margin-top: 8px;
    }
    .min-bg {
      width: 100%;
      height: 237.2px;
    }
    .mar-l {
      margin-left: 8px;
    }
  }
}
// 八排版的
.eight_info {
  width: 100%;
  .eight-item {
    padding: 8px 8px 0px 8px;
    .max-bg {
      width: 100%;
      flex: 3;
      // height: 640px;
    }
    .right {
      flex: 1;
      margin-left: 8px;
    }
    .mar {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .min-bg {
      width: 100%;
      height: 176px;
    }
    .mar-l {
      margin-left: 8px;
    }
  }
}

.flex-btn {
  display: flex;
  margin-top: 6px;
  padding-bottom: 6px;
  img {
    margin-left: 8px;
  }
}
.p-title {
  margin-left: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.video_model1 {
  width: 100%;
  height: 728px !important;
}
.video_model9 {
  width: 100%;
  height: 237.2px !important;
}
.four_vidoe {
  width: 100%;
  height: 360px;
  background: #ffffff;
  margin: 8px 4px 0px 4px;
}
</style>
