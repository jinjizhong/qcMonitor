<template>
  <div id="home">
    <div class="header">
      <div class="login_left_content">
        <img class="left_img" src="../../assets/image/login/logo.png" alt="image" />
      </div>
      <div class="login_right_content">
        <p class="right_p">
          平台已安全运行<span id="ChangeCode" class="right_spe">{{safeDay}}</span>天，登录<span
            class="right_spe">{{loginCount}}</span>次
        </p>
      </div>
    </div>
    <div class="main">
      <div class="login_box">
        <div class="title">用户登录</div>
        <div class="input_box">
          <div class="user_box" style="margin-bottom: 22px;">
            <img style="margin: 0 15px;" width="20" height="20" src="../../assets/image/login/login_icon_user.png"
              alt="image">
            <input v-model="userName" class="flex_1" type="text" id="username" name="username" placeholder="请输入账号"
              style="-webkit-box-shadow: 0 0 0 9900px white inset; height: 98%;">
          </div>
          <div class="password_box" style="margin-bottom: 22px;">
            <img style="margin: 0 15px;" width="20" height="20" src="../../assets/image/login/login_icon_password.png"
              alt="image">
            <input v-model="userPassword" class="flex_1" type="password" id="password" name="password"
              placeholder="请输入密码" @keyup.enter="logBtn">
          </div>
          <div class="user_box" v-if="isShowValidateCode">
            <img style="margin: 0 15px;" width="20" height="20" src="../../assets/image/login/login_icon_valid.png"
              alt="image">
            <input v-model="userValiCode" class="flex_1" type="text" id="valicode" name="valicode" placeholder="验证码"
              @keyup.enter="logBtn">
            <a style="float:right;margin-left:11px" @click="changeValiCode" title="看不清上面的字符">
              <img id='valiimg' :src="valiCodeImg" alt="看不清上面的字符？点击换一个" style="vertical-align:top" /></a>
          </div>
        </div>
        <!--p id="remember-password">
						<input type="checkbox" name="staylogin" value=1 id="staylogin" style="margin-bottom:0px"/><label for="staylogin" style="display:inline;font-weight:normal;font-size:90%;float:none;width:auto">保留我的登录状态</label>
					</p-->
        <!-- <div class="choose_box">
          <div class="radio">
            <input id="radio-1" name="chooseType" type="radio" v-model="radio" value="1">
            <label for="radio-1" class="radio-label">调度中心</label>
          </div>
          <div class="radio">
            <input id="radio-2" name="chooseType" type="radio" v-model="radio" value="2">
            <label for="radio-2" class="radio-label">运维平台</label>
          </div>
          <div class="radio">
            <input id="radio-3" name="chooseType" type="radio" v-model="radio" value="3">
            <label for="radio-3" class="radio-label">车载系统</label>
          </div>
        </div> -->
        <div class="login_btn" @click="logBtn">登录</div>
      </div>
    </div>
    <div class="footer">
      <p class="first_word">维护电话：52004129</p>
      <p class="second_word">Copyright &copy;2018-2020 全程（上海）智能科技有限公司 <a
          href="http://www.beian.miit.gov.cn">沪ICP备19034136号<img src="../../assets/image/login/cn_icp.gif" border="0"
            align="absmiddle"></a></p>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'login',
  components: {

  },
  // computed: mapState([
  //   'curuserId',
  //   'headerClient'
  // ]),
  data () {
    return {
      userName: '',
      userPassword: '',
      userValiCode: '',
      safeDay: '',
      loginCount: '',
      valiCodeImg: '', //验证码图片
      radio: '2',
      isShowValidateCode: false
    }
  },
  async created () {
    await this.isLogin()
    this.changeValiCode()
  },
  methods: {
    // 登录
    logBtn () {
      if (this.userName == '') {
        this.$message.error('账号不能为空！');
        return false
      }
      if (this.userPassword == '') {
        this.$message.error('密码不能为空！');
        return false
      }
      let data = {
        UserName: this.userName,
        Password: this.compile(this.userPassword),
        //Password: this.userPassword,
        ValidateCode: this.userValiCode,
        LoginTarget: this.radio
      }
      this.$store.dispatch('userLogin', data).then(res => {
        if (res) {
          let subsystems = res.result.userInfo ? res.result.userInfo.subsystems : []
          let userInfo = res.result.userInfo || {}
          if (subsystems.length > 0 && subsystems.length < 2) {
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
            this.chooseSet(userInfo.subsystems[0])
          } else if (subsystems.length >= 2) {
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
            this.$router.push({
              path: '/loginChoose',
              name: 'LoginChoose'
            })
          } else {
            this.$message.error(res.result)
            this.getSiteLoginInfo()
          }
        } else {
          this.$message.error('未知错误!')
        }
      })
    },
    compile (code) {
      var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },
    chooseSet (item) {
      switch (item.name) {
        case '运维平台':
          this.$router.replace({
            path: '/index'
          })
          break;
        case '调度中心':
          this.$router.replace({
            path: '/bigIndex'
          })
          break;
        case '车载系统':
          this.$router.replace({
            path: '/carIndex'
          })
          break;
        default:
          // window.location.href = item.route
          break;
      }
    },
    // 是否已经登录
    isLogin () {
      this.$store.dispatch('isLogin', {}).then(res => {
        if (res && res.result) {
          this.$router.push({
            path: '/index',
            // query: {
            //   type: 'toHome'
            // }
          })
        } else {
          this.getSiteLoginInfo()
          this.getSafeDay()
        }
      })
    },
    // 获取验证码显示和登录次数
    getSiteLoginInfo () {
      this.$store.dispatch('siteLoginInfo', {}).then(res => {
        if (res) {
          this.loginCount = res.result.loginCount
          this.isShowValidateCode = res.result.isShowValidateCode
        }
      })
    },
    // 当前登录用户ID
    // getUserId () {
    //   this.$store.dispatch('userId', {}).then(() => {
    //     // console.log(res, '当前登录用户信息')
    //   })
    // },
    // 当前登录用户信息
    // getUserInfo () {
    //   this.$store.dispatch('userInfo', {}).then(() => {
    //     // console.log(res, '当前登录用户ID')
    //   })
    // },
    // 获取安全天数
    getSafeDay () {
      let s1 = '2019/11/30'
      let s2 = new Date()
      s1 = new Date(s1.replace(/-/g, '/'));
      let days = s2.getTime() - s1.getTime();
      this.safeDay = parseInt(days / (1000 * 60 * 60 * 24));
    },
    // 更换验证码
    changeValiCode () {
      this.valiCodeImg = this.BaseUrl + '/_pro/res/ValidateCode.aspx?now=' + new Date().getTime();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// #home {
//   background-color: #ffffff;
// }
input {
  background: none;
  outline: none;
  border: none;
}
button {
  border: 0;
  outline: none;
}
.radio {
  margin: 0.5rem;
}

.radio input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.radio input[type="radio"] + .radio-label:before {
  content: "";
  background: #f4f4f4;
  border-radius: 50%;
  border: 1px solid #b4b4b4;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  position: relative;
  margin-right: 5px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}

.radio input[type="radio"]:checked + .radio-label:before {
  background-color: #006fbc;
  box-shadow: inset 0 0 0 4px #f4f4f4;
}

.radio input[type="radio"]:focus + .radio-label:before {
  outline: none;
  border-color: #006fbc;
}

.radio input[type="radio"]:disabled + .radio-label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}

.radio input[type="radio"] + .radio-label:empty:before {
  margin-right: 0;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  height: 100px;
}

.login_left_content {
  margin-left: 12.5rem;
}

.left_img {
  width: 100%;
  height: 100%;
}

.login_right_content {
  margin-right: 12.5rem;
}

.right_p {
  color: #333333;
  font-size: 22px;
}

.right_spe {
  color: #006fbc;
  font-size: 34px;
  margin: 0 10px;
}

.main {
  width: 100%;
  height: 700px;
  background-image: url(../../assets/image/login/img_login_bg.jpg);
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.login_box {
  width: 535px;
  // height: 560px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.13);
  opacity: 0.95;
  border-radius: 4px;
  position: absolute;
  top: 73px;
  right: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;
}

.login_box .title {
  color: #006fbc;
  font-size: 28px;
  margin-top: 50px;
  margin-bottom: 40px;
}

.user_box,
.password_box {
  width: 386px;
  height: 56px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(179, 179, 179, 1);
}

.flex_1 {
  flex: 1;
  height: 100%;
  font-size: 16px;
}
.choose_box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  // justify-content: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 388px;
}
.login_btn {
  width: 383px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: rgba(0, 111, 188, 1);
  border-radius: 4px;
  font-size: 18px;
  color: #ffffff;
  margin-top: 52px;
  cursor: pointer;
}
.login_btn:hover {
  opacity: 0.8;
  transition: all ease 0.7s;
}
.login_btn:active,
.login_btn:focus {
  color: #409eff;
}
.footer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
}

.first_word {
  margin-bottom: 10px;
}

.first_word,
.second_word {
  color: #666666;
  font-size: 16px;
}
</style>
