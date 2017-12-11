<template>
    <el-row>
        <el-col :span="3">
            <div class="logo">
                <a href="#">
                    <div class="coord1 box-size">
                        <router-link to="/index"> <img src="../../../static/img/logo2.png" width="44" alt="" /></router-link>
                    </div>
                    <div class="coord2 box-size" style="width:70%">
                        <router-link to="/index">
                            <span class="visible-lg-inline-block">亲橙CRM</span>
                        </router-link>
                    </div>
                </a>
            </div>
        </el-col>
        <el-col :span="21">
            <div class="headerBar">
                <el-row type="flex" justify="space-between">
                    <el-col :span="8">
                        <div class="pagenav">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item v-show="secondTitle">{{secondTitle}}</el-breadcrumb-item>
                                <el-breadcrumb-item v-show="thirdTitle">{{thirdTitle}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="user-info">
                            <span>
                                {{userInfo.seller_nick}}
                                <i class="span-line"></i>
                                <el-button type="text" @click="loginOut">退出</el-button>
                            </span>
                            <span>
                                短信余额：
                                <span class="text-danger">{{userInfo.sms_remainder}}</span>
                                <i class="span-line"></i>
                                <router-link to="/recharge">短信充值</router-link>
                            </span>
                            <span>
                                <a href="/static/assets/亲橙CRM使用教程.pptx" target="_blank">使用教程</a>
                            </span>
                            <span>
                                <wang-wang nick="杭州莫名科技有限公司" message="联系客服" icon-position="right"></wang-wang>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>

        </el-col>
    </el-row>
</template>
<script>
import wangWang from "./WangWang";

export default {
  components: {
    wangWang
  },
  data() {
    return {
      secondTitle: "",
      thirdTitle: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.name) {
        this.secondTitle = to.meta.name;
      } else if (to.meta.names) {
        if (to.params.step_id) {
          this.secondTitle = to.meta.names[to.params.step_id];
        }
        if (to.params.type) {
          this.secondTitle = to.meta.names[to.params.type];
        }
      } else if (to.matched[1].meta.names) {
        this.secondTitle = to.matched[1].meta.names[to.params.step_id];
      } else if (to.matched[1].meta.name) {
        this.secondTitle = to.matched[1].meta.name;
      } else {
        this.secondTitle = "";
      }
      if (to.meta.thirdTitle) {
        this.thirdTitle = to.meta.thirdTitle;
      } else {
        this.thirdTitle = "";
      }
      if (this.thirdTitle == "查看效果") {
        //查看效果面包屑
        this.secondTitle = "发送记录";
      }
    }
  },
  mounted() {
    if (this.$route.meta.name) {
      this.secondTitle = this.$route.meta.name;
    } else if (this.$route.meta.names) {
      if (this.$route.params.step_id) {
        this.secondTitle = this.$route.meta.names[this.$route.params.step_id];
      }
      if (this.$route.params.type) {
        this.secondTitle = this.$route.meta.names[this.$route.params.type];
      }
    } else if (this.$route.matched[1].meta.names) {
      this.secondTitle = this.$route.matched[1].meta.names[
        this.$route.params.step_id
      ];
    } else if (this.$route.matched[1].meta.name) {
      this.secondTitle = this.$route.matched[1].meta.name;
    } else {
      this.secondTitle = "";
    }
    if (this.$route.meta.thirdTitle) {
      this.thirdTitle = this.$route.meta.thirdTitle;
    } else {
      this.thirdTitle = "";
    }

    if (this.thirdTitle == "查看效果") {
      //查看效果面包屑
      this.secondTitle = "发送记录";
    }
  },
  methods: {
    loginOut() {
      this.$store.commit("setToken", "");
      this.$cookie.delete("Access-Token");
      window.location =
        "https://oauth.taobao.com/authorize?client_id=21664542&response_type=code&redirect_uri=http://crm.iqincheng.com/crm/index.php";
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  background: #2a2d32;
  box-sizing: border-box;
  border-bottom: 1px solid #151515;
}

.logo a {
  display: block;
  height: 63px;
  line-height: 63px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  font-size: 19px;
  color: #fff;
  letter-spacing: 2px;
  text-align: center;
}

.coord1 {
  float: left;
  width: 30%;
  border-right: 1px solid #151515;
}

.coord2 {
  float: left;
  width: 70%;
}

.box-size {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}

.logo a span {
  vertical-align: middle;
}

.logo div img {
  width: 42px;
  height: 42px;
  vertical-align: middle;
}

@media (max-width: 1400px) {
  .logo div img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .logo a {
    font-size: 17px;
    letter-spacing: 1px;
  }
}

.headerBar {
  border: 1px solid #e4e4e4;
  height: 62px;
  padding: 0px 24px;
}

.pagenav {
  height: 100%;
}

.pagenav .el-breadcrumb {
  line-height: 64px;
}

.user-info {
  height: 64px;
  color: #666666;
  text-align: right;
}

.user-info > span {
  height: 64px;
  line-height: 64px;
  padding: 0px 10px;
  display: inline-block;
  border-right: 1px solid #e4e4e4;
  font-size: 14px;
}

.user-info > span * {
  vertical-align: middle;
}

.user-info > span:last-child {
  border-right: none;
}

.span-line {
  display: inline-block;
  height: 30px;
  border-right: 1px solid #e4e4e4;
}
</style>
