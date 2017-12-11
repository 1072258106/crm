<template>
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

                                    <el-input class="editable" :id="'text_'+module+'_'+stepId" type="textarea" @input="handleInput" :rows="5" placeholder="请输入内容" v-model="content">
                                    </el-input>

                                    <div class="unexit">【短信签名】</div>
                                </div>
                            </div>
                        </div>
                        <div class="margin-bottom-10">
                            <div class="insert">
                                <label class="sub-title">插入短链：</label>
                                <div class="sub-body">
                                    <el-col :span="21" class="var-btn-panel">
                                        <input type="button" @click="insertVariable" value="买家昵称">
                                        <input type="button" @click="insertVariable" value="买家姓名">
                                        <input type="button" v-show="btnStatus.logistical" @click="insertVariable" value="物流公司">
                                        <input type="button" v-show="btnStatus.logistical" @click="insertVariable" value="物流编号">
                                        <input type="button" v-show="btnStatus.city" @click="insertVariable" value="城市">
                                        <input type="button" v-show="btnStatus.member" @click="insertVariable" value="会员等级">
                                        <input type="button" v-show="btnStatus.member" @click="insertVariable" value="会员折扣">
                                        <input type="button" v-show="btnStatus.member" @click="insertVariable" value="会员积分链接">
                                        <input type="button" v-show="btnStatus.orderLink" @click="insertVariable" value="订单短链">
                                        <input type="button" v-show="btnStatus.itemLink" @click="insertVariable" value="商品短链">
                                        <input type="button" v-show="btnStatus.menualLink" @click="insertVariable" value="使用手册">
                                        <url-button label="淘短链（优惠券）" v-show="btnStatus.shortUrl" @success="insertUrlVariable" :type="3" />
                                    </el-col>
                                    <el-col :span="3">
                                        <select-template class="float-right" :module="module" :step="stepId" @selected="handlerSelected"></select-template>
                                    </el-col>
                                </div>
                            </div>
                        </div>
                        <!-- 插入短链 -->
                        <div class="margin-bottom-10">
                            <div class="insert" :class="{'is-error':signError}">
                                <label class="sub-title">短信签名：</label>
                                <div class="sub-body">

                                    <div class="el-input">
                                        <el-col :span="6">
                                            <input v-model.lazy="sms_sign" @keyup.enter="e=>this.sms_sign=e.target.value" placeholder="请输入短信签名，2-12个字" class="el-input__inner" />

                                        </el-col>
                                        <span class="sign help-text">
                                            &nbsp;&nbsp;签名2-12个字以内，请使用店铺名或品牌名
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- 短信签名 -->
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
                        <!-- 发送测试 -->
                    </div>
                </el-col>
                <el-col :span="8" class="preview">
                    <el-row>
                        <el-col :offset="9" :span="15" style="background:#f5f5f9;">
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
</template>

<script>
import selectTemplate from "./SelectTemplate";
import urlButton from "../common/UrlButton";
export default {
    components: {
        selectTemplate,
        urlButton
    },
    data() {
        return {
            input: "",
            // 短信输入验证
            signError: false,
            // 输入测试号码
            testMobile: "",
            // 双向绑定的短信内容，局部变量
            content: this.value
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
        //预览短信
        previewContent() {
            let content = this.content
                .replace(/{买家姓名}/g, "亲小橙")
                .replace(/{买家昵称}/g, "亲亲客户大大")
                .replace(/{物流公司}/g, "顺丰速递")
                .replace(/{物流编号}/g, "123456789012")
                .replace(/{城市}/g, "杭州")
                .replace(/{会员等级}/g, "至尊VIP会员")
                .replace(/{会员折扣}/g, "8.5折")
                .replace(/{订单短链}/g, "tb.cn/x")
                .replace(/{商品短链}/g, "tb.cn/x")
                .replace(/{亲橙短链}/g, "tb.cn/x")
                .replace(/{会员积分连接}/g, "tb.cn/x");
            return "【" + this.sms_sign + "】" + content;
        },
        //签名
        sms_sign: {
            get: function() {
                let sms_sign = this.$store.state.userInfo.sms_sign;
                this.signError = !(sms_sign.length > 1 && sms_sign.length < 13);
                return sms_sign;
            },
            set: function(newValue) {
                this.signError = !(newValue.length > 1 && newValue.length < 13);
                this.$store.commit("setSmsSign", newValue);
            }
        },
        //字数
        words() {
            return this.previewContent.length;
        },
        //条数
        section() {
            return this.words > 70 ? Math.ceil(this.words / 67) : 1;
        },
        //按钮的状态
        btnStatus() {
            return {
                logistical:
                    this.module == 2 && (this.stepId == 2 || this.stepId == 3),
                city: this.module == 2 && this.stepId == 3,
                member: this.module == 9 && this.stepId == 1,
                itemLink: this.module == 9 && this.stepId == 3,
                orderLink: this.module != 9,
                menualLink: this.module == 9 && this.stepId == 2,
                shortUrl:
                    this.module == 9 && (this.stepId == 4 || this.stepId == 5)
            };
        }
    },
    methods: {
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
                mobile: this.testMobile,
                content: this.previewContent,
                module: this.module,
                step: this.stepId
            };
            this.$http.post("/user/send_test", postData).then(response => {
                this.$message({
                    message: response.data.message,
                    type: response.data.code == 0 ? "success" : "error"
                });
            });
        },
        //插入变量
        insertVariable(e) {
            var len = $(
                "#text_" + this.module + "_" + this.stepId + ">textarea"
            ).prop("selectionStart");
            let insertStr;
            if (e.target.value == "会员积分链接") {
                insertStr = " " + this.$store.state.userInfo.shop_link;
            } else {
                insertStr =
                    (e.target.value == "订单短链" ? " " : "") +
                    "{" +
                    e.target.value +
                    "}";
            }
            this.content =
                this.content.substring(0, len) +
                insertStr +
                this.content.substring(len);
            console.info("content", this.content);
            this.$emit("input", this.content);
        },
        //插入变量
        insertUrlVariable(str) {
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
        //短信文案改变事件函数
        handleInput() {
            this.$emit("input", arguments[0]);
        },
        // 选择模板
        handlerSelected(text) {
            this.$emit("input", text);
        }
    },
    watch: {
        value: function(val) {
            this.content = val;
        }
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
        bottom: 2px;
        color: #989898;
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
            background-color: #20a0ff;
            border-radius: 4px;
            border: 0;
            padding: 4px 8px;
            color: #fff;
            cursor: pointer;
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
        background: url(../../../static/img/msg-top.png) no-repeat;
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
            word-break: break-all;
            max-height: 158px;
            min-height: 50px;
            overflow-y: auto;
            width: 90%;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            margin: 10px auto;
            background: #fff;
        }
    }
}
</style>
