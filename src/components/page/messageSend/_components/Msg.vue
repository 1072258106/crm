<template>
    <div>
        <div class="message">
            <div class="message-set">
                <el-row>
                    <el-col :span="16">
                        <div class="writer">
                            <div class="margin-bottom-10">
                                <label class="sub-title">短信文案：</label>
                                <div class="sub-body">
                                    <div class="smsContainer">
                                        <div class="fix" contenteditable="false">您已经输入
                                            <span class="high-light">{{words}}</span>
                                            个字,预计扣除
                                            <span class="high-light">{{section}}</span>
                                            条短信,以实际字数为准! &nbsp;&nbsp;
                                            <el-tooltip content="每条短信按70个字处理(包括签名)，超过一条按每条短信67个字处理" placement="top">
                                                <a href="javascript:void(0)">计费规则</a>
                                            </el-tooltip>

                                        </div>
                                        <el-input class="editable" :id="'text_'+module+'_'+stepId" type="textarea" @input="handleInput" :rows="5" placeholder="请输入内容" v-model="content" @change="blackWordsTest">
                                        </el-input>
                                        <div :class="blackWords.length>0 ? 'unexit bottom32' : 'unexit bottom2'">回复T退订【短信签名】</div>
                                        <div class="black_words_tip" v-if="blackWords.length>0">短信中含有违禁词：
                                          <b v-for="(item,index) in blackWords" :key="index">{{item}}&nbsp;&nbsp;</b>
                                          <span>(该条短信将无法发送，请去掉违禁词)</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- 短信内容 -->
                            <div class="margin-bottom-10">
                                <div class="insert">
                                    <label class="sub-title">插入短链：</label>
                                    <div class="sub-body">
                                        <el-col :span="21" class="var-btn-panel">
                                            <url-button label="淘短链（商品）" @success="insertVariable" :type="1" />
                                            <url-button label="淘短链（店铺）" @success="insertVariable" :type="2" />
                                            <url-button label="淘短链（活动）" @success="insertVariable" :type="3" />
                                            <input type="button" @click="getLinkList" value="H5手机网页" class="inserBtn">

                                            <!-- <url-button label="亲橙短链" :type="4" /> -->
                                        </el-col>
                                        <el-col :span="3">
                                            <select-template class="float-right" :module="module" :step="stepId" @selected="handlerSelected"></select-template>
                                        </el-col>
                                        <div>
                                            <el-col :span="24" class="sign help-text">
                                                注意：插入短链前后请加空格，否则可能导致手机端无法打开网页！
                                            </el-col>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- 插入变量 -->
                            <div class="margin-bottom-10">
                                <div class="insert" :class="{'is-error':signError}">
                                    <label class="sub-title">短信签名：</label>
                                    <div class="sub-body">

                                        <div class="el-input">
                                            <el-col :span="6">
                                                <el-select v-model="sign" @change="handleSignSelected" placeholder="请选择">
                                                    <el-option v-for="item in channel.sign" :key="item.value" :label="item.label" :value="item">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                            <span class="sign help-text">
                                                <custome-sign :channel-id="channel_id" :sign="customeSign" @custom-success="handleCustomSuccess" />
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="margin-bottom-10">
                                <div class="insert">
                                    <label class="sub-title">辅助工具：</label>
                                    <div class="sub-body var-btn-panel">
                                        <!-- <input type="button" class="button" @click="blackWordsTest" value="违禁词检查"> -->
                                        <input type="button" class="button" @click="dangerWordsShow" value="易拦截词检查">
                                        <router-link to="/tools/h5" type="button" class="button">制作H5手机网页</router-link>
                                        <router-link to="/tools/phone_split" type="button" class="button">筛选手机号码</router-link>
                                        <!-- <input type="button" class="button" @click="goToH5" value="制作H5手机网页">
                                        <input type="button" class="button" @click="goToH5" value="删选手机号码"> -->
                                    </div>
                                </div>
                            </div>
                            <!-- 辅助工具 -->
                            <div>
                                <label class="sub-title">发送测试：</label>
                                <div class="sub-body">
                                    <el-col :lg="6" :md="10" :sm="10">
                                        <el-input placeholder="请输入手机号" v-model="testMobile">
                                            <el-button slot="append" @click="sendTest">测试</el-button>
                                        </el-input>
                                    </el-col>
                                </div>
                            </div>
                            <!-- 短信签名 -->
                        </div>
                    </el-col>
                    <!-- 短信测试 -->
                    <el-col :span="8" class="preview">
                        <el-row>
                            <el-col :span="15" :offset="9" style="background:#f5f5f9;">
                                <el-row>
                                    <el-col :span="24">
                                        <div class="msg-top">
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="msg-cen">
                                            <div class="msg-show">
                                                {{previewContent}}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="msg-bot">
                                            <div style="margin:3px;">
                                                <p>说明：亲橙CRM只接受发正规的电商内容短信,其它内容有可能审核通不过</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- 短信预览 -->
                </el-row>
            </div>

        </div>

        <!-- 易拦截词谈弹框 -->
        <el-dialog :visible.sync="dangerWordsVisible" title="易拦截词列表" size="tiny">
            <div class="tz-alert primary margin-bottom-20">
              <strong>关于短信拦截：</strong> 苹果手机不会拦截任何短信，部分安卓手机系统自带有拦截功能，或者安装了360手机助手、QQ手机管家等软件具有拦截功能。拦截软件都有保密的敏感词库，亲橙CRM通过大量测试案例在不停收集易拦截敏感词， 通过优化短信文案可以降低拦截率，例如“优惠券”可优化为“优蕙券”。
            </div>
            <el-table :data="dangerWords" border>
                <el-table-column prop="oldWords" label="易拦截词" align="center"></el-table-column>
                <el-table-column prop="changeWords" label="建议替换为" align="center"></el-table-column>
                <!-- <el-table-column label="操作">
                    <template scope="scope">
                        <span>{{scope.row.oldWords}}</span> >>> <span>{{scope.row.changeWords}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" width="85" align="center">
                    <template scope="scope">
                      <el-button type="text" size="small" @click="replaceDangerWords(scope.row.oldWords,scope.row.changeWords)">替换</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- H5网页弹框 -->
        <el-dialog :visible.sync="linkVisible" title="选择手机网页" size="tiny">
          <el-row><router-link to="/tools/h5" type="button">前去创建H5手机网页</router-link></el-row>
          <el-table :data="manual_link_list" border v-loading="false" style="margin-top:16px;">
                <el-table-column prop="title" label="网页名称" align="left" min-width="130"></el-table-column>

                <el-table-column prop="short_url" label="网页短链" align="left" min-width="130"></el-table-column>

                <el-table-column label="操作" align="center" width="85">
                    <template scope="scope">
                        <a href="javascript:;" @click="inserLink(scope.row.short_url)">插入</a>
                    </template>
                </el-table-column>
          </el-table>
        </el-dialog>
        
    </div>
</template>

<script>
import selectTemplate from "../../../common/SelectTemplate";
import urlButton from "../../../common/UrlButton";
import customeSign from "./CustomSign";
export default {
  components: {
    selectTemplate,
    urlButton,
    customeSign
  },
  data() {
    return {
      input: "",
      // 短信输入验证
      signError: false,
      // 输入测试号码
      testMobile: "",
      content: this.value,
      channels: [],
      channel_id: "877425538141130752", //选择的通道id
      channel: {
        open_name: "默认通道",
        sign: [
          {
            is_system: 1,
            label: "亲橙crm",
            is_default: 1,
            value: 1,
            channel_id: "0"
          }
        ],
        id: "877425538141130752",
        is_default: 1
      }, //选择的通道
      sign: {
        is_system: 1,
        label: "亲橙crm",
        is_default: 1,
        value: 1,
        channel_id: "0"
      }, //选择的签名
      sign_id: 1,
      customeSign: "",
      black_words: [],
      linkVisible: false,
      manual_link_list:[],
      manual_link_total:0,
      selectLink:'',
      currentPage:1,
      blackWords:[],
      allBlackWords:[],
      dangerWordsVisible:false,
      dangerWords:[]
    };
  },
  props: {
    stepId: {
      type: Number,
      required: true,
      default: 1
    },
    module: {
      type: Number,
      required: true,
      default: 1
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    previewContent() {
      return "【" + this.sign.label + "】" + this.content + " 回复T退订";
    },
    //字数
    words() {
      return this.previewContent.length;
    },
    //条数
    section() {
      return this.words > 70 ? Math.ceil(this.words / 67) : 1;
    }
  },
  methods: {
    handleSignSelected(sign) {
      this.sign_id = sign.value;
      this.$emit("sign-change", sign.value);
    },
    //发送测试
    sendTest() {
      if (
        !/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
          this.testMobile
        )
      ) {
        this.$message.error("请输入有效的手机号");
        return false;
      }
      let postData = {
        phone: this.testMobile,
        ac_text: this.content,
        ac_channel: this.channel_id,
        ac_sign: this.sign_id
      };

      this.$http.post("/activity/test", postData).then(response => {
        this.$message({
          message: response.data.message,
          type: response.data.code == 0 ? "success" : "error"
        });
      });
    },
    //插入变量
    insertVariable(str) {
      var len = $(
        "#text_" + this.module + "_" + this.stepId + ">textarea"
      ).prop("selectionStart");
      let insertStr = " " + str;

      this.content =
        this.content.substring(0, len) +
        insertStr +
        this.content.substring(len);
      this.$emit("input", this.content);
    },
    // 选择模板
    handlerSelected(text) {
      this.$emit("input", text);
    },
    //短信内容修改
    handleInput() {
      this.$emit("input", arguments[0]);
    },
    getChannels() {
      this.$http.get("/activity/channels").then(response => {
        const responseData = response.data;
        if (responseData.code == 0) {
          this.channels = responseData.data.list;
          this.getDefaultChannel();
        }
      });
    },
    //获取默认签名
    getDefaultChannel() {
      const channel = this.channels.filter(function(value) {
        return value.is_default === 1;
      });
      // 修改父类的通道选择
      this.channel = channel[0];
      this.channel_id = channel[0].id;
      this.$emit("channel-change", this.channel_id);
      const defaultSigns = this.channel.sign.filter(function(value) {
        return value.is_default === 1;
      });
      if (defaultSigns.length > 1) {
        const customeSigns = defaultSigns.filter(function(value) {
          return value.is_system === 0;
        });
        if (customeSigns.length > 0) {
          // 存在自定义分组
          this.sign = customeSigns[0];
          this.$emit("sign-change", this.sign.value);
          this.customeSign = customeSigns[0].label;
          return;
        }
      }
      this.sign = defaultSigns[0];

      this.$emit("sign-change", this.sign.value);
    },
    handleCustomSuccess(newValue) {
      this.getChannels();
    },
    blackWordsTest() {
        // if(!this.content){
        //   return;
        // }
        // this.$http.post("/tools/black_words", {
        //     content: this.content
        // }).then(response => {
        //     let res = response.data;
        //     if(res.data.list.length>0 && res.data.list != this.blackWords && res.code == 0 ) {
        //         this.blackWords = res.data.list;
        //     }else if(res.data.list.length <= 0){
        //         this.blackWords = [];
        //     }
        // })
        let _blackWords = []
        this.allBlackWords.forEach(function(element) {
            if(this.content.indexOf(element) >= 0){
                _blackWords.push(element)
            }
        }, this);
        this.blackWords = _blackWords;
    },
    dangerWordsShow() {
      this.dangerWordsVisible = true;
      this.getDangerWords();
    },
    //获取手机网页列表
    getLinkList() {
      this.linkVisible = true;
      this.$http.get('/tools/page?page='+this.currentPage).then(
          response => {
              let res = response.data;
              if(res.code == 0 && res.data.list.length>0) {
                  this.manual_link_list = res.data.list;
                  this.manual_link_total = res.data.total;
              }else if(res.data.list.length <= 0) {
                  this.$confirm('您还没有H5网页', {
                      confirmButtonText: '前去创建',
                      cancelButtonText: '取消'
                  }).then(() => {
                      this.$router.push('/tools/h5/')
                  })
              }else{
                  this.$message.error(res.message)
              }
          }
      )
    },
    //确定选取手册
    inserLink(link) {
      this.linkVisible = false;
      this.insertVariable(link);
    },
    //获取违禁词列表
    getAllBlackWords() {
        let now = Date.parse(new Date());
        if(localStorage.blackWords && (now - JSON.parse(localStorage.blackWords).time) < 86400000){
            this.allBlackWords = JSON.parse(localStorage.blackWords).list;
        }else{
            this.$http.get('/tools/all_black_words').then(
              response => {
                  let res = response.data;
                  if(res.code == 0) {
                      this.allBlackWords = res.data.list
                      let time = Date.parse(new Date());
                      let json = {
                         "time": time,
                         "list": res.data.list
                      }
                      let str = JSON.stringify(json)
                      localStorage.blackWords = str;
                  }
              }
            )
        }
    },
    //易拦截词
    getDangerWords() {
        let data = {
           content: this.content
        }
        this.$http.post('/tools/inaccessible_words',data).then(
            response => {
                console.info(response)
                let res = response.data;
                if(res.code == 0) {
                    this.dangerWords = res.data.list
                }
            }
        )
    },
    replaceDangerWords(oldWords,changeWords) {
        this.content = this.content.replace(oldWords,changeWords);
        this.dangerWordsVisible = false;
    }
  },
  watch: {
    value: function(val) {
      this.content = val;
    },
    channel_id: function(val) {
      this.$emit("channel-change", val);
    }
  },
  mounted() {
    this.getChannels();
    this.getAllBlackWords();
  }
};
</script>

<style scoped lang="scss">
.message {
  padding: 10px 0px;
  .message-txt {
    font-size: 16px;
    color: #666;
    font-weight: bold;
    text-align: center;
    border-right: 1px solid #e4e4e4;
  }
}

.margin-bottom-10 {
  margin-bottom: 8px;
}

.writer,
.test {
  color: #666;
  font-size: 14px;
}

.writer {
  .smsContainer {
    position: relative;
  }

  .editable {
    position: relative;
  } // 输入框
  .unexit {
    position: absolute;
    left: 3px;
    color: #989898;
  }
  .bottom2{
    bottom:2px;
  }
  .bottom32{
    bottom: 32px;
  }
  .fix {
    height: 26px;
    line-height: 26px;
    background: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    a {
      color: #008fff;
    }
    .high-light {
      color: #ff6600;
      font-weight: bold;
    }
  }

  .var-btn-panel {
    & > input {
      cursor: pointer;
      &.short {
        padding: 0 20px;
        text-indent: 0.5em;
        background: #cc0033 url(../../../../../static/img/short.png) no-repeat
          2px 4px;
      }
    }
  } // 变量按钮
}

.sign,
.signer {
  line-height: 36px;
}

.sign {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.test .send {
  margin-top: 5px;
  margin-left: 5px;
}

.test .send a {
  color: #008fff;
  line-height: 25px;
}

.preview {
  padding-left: 10px;
  font-size: 14px;
  color: #666;
  .msg-top {
    height: 27px;
    background: url(../../../../../static/img/msg-top.png) no-repeat;
    background-size: 100% 100%;
  }
  .msg-bot {
    min-height: 50px;
    width: 90%;
    height: auto;
    border: 1px solid #e4e4e4;
    margin: 5px auto;
    background: #666666;
    border-radius: 4px;
    color: #fff;
  }
  .msg-cen {
    height: 174px;
    .msg-show {
      padding: 8px;
      max-height: 158px;
      min-height: 50px;
      overflow-y: auto;
      word-break: break-all;
      width: 90%;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      margin: 10px auto;
      background: #fff;
    }
  }
}
</style>

<style lang="scss">
.editable {
  span {
    color: #cc0066;
  }
  a {
    color: #cc0066;
  }
}
.button{
  background-color: #999;
    border-radius: 4px;
    border: 0;
    padding: 4px 8px;
    color: #fff;
    cursor: pointer;
}
.inserBtn{
  background-color: #20a0ff;
    border-radius: 4px;
    border: 0;
    padding: 4px 8px;
    color: #fff;
    cursor: pointer;
}
.black_words_tip{
    border: 1px solid #d4f0fc;
    background-color: #ff4949;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    padding-left:8px;
}
</style>
