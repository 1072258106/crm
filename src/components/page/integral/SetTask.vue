
<template>
    <!-- 任务设置 -->
    <div class="table-container">
        <table class="tabled">
            <tr>
                <th class="top_title" style="text-align:left;padding-left:16px;">条件设置</th>
                <th class="top_title">操作</th>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>新订单送积分：</label>
                        <div> 针对新订单，客户成交订单并确认收货后系统会自动赠送积分，同时可以选择短信通知客户</div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>【店铺会员】每成交1元赠送</span>
                            <input v-model.number="memberLevel.shopMember" placeholder="" type="text" @change="Verify(memberLevel.shopMember)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>【普通会员】每成交1元赠送</span>
                            <input v-model.number="memberLevel.simpleMember" placeholder="" type="text" @change="Verify(memberLevel.simpleMember)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>【高级会员】每成交1元赠送</span>
                            <input v-model.number="memberLevel.seniorMember" placeholder="" type="text" @change="Verify(memberLevel.seniorMember)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>【VIP会员】每成交1元赠送</span>
                            <input v-model.number="memberLevel.vipMember" placeholder="" type="text" @change="Verify(memberLevel.vipMember)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>【至尊VIP会员】每成交1元赠送</span>
                            <input v-model.number="memberLevel.topVipMember" placeholder="" type="text" @change="Verify(memberLevel.topVipMember)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label>短信通知：</label>
                        <div>
                            客户确认收货后系统会自动发短信通知买家获得积分
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label>短信开关：</label>
                        <div>
                            <el-radio-group v-model="radio" @change="changgeRadio" fill="#999" text-color="#666" size="small">
                                <el-radio class="radio" :label="1">是</el-radio>
                                <el-radio class="radio" :label="0" style="padding-left:13px;">否</el-radio>
                            </el-radio-group>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb" v-if="radio==1">
                        <el-row class="tb">
                            <label>短信文案：</label>
                            <div>
                                <div class="msgWord"> {{smsNotice.value}}</div>
                            </div>
                        </el-row>
                        <el-row class="tb">
                            <label></label>
                            <div style="width:715px;">
                                <el-button type="text" @click="dialogFormMsg = true">修改文案</el-button>
                                <el-button type="text" @click="sendInfo(1)" style="float:right;">发送记录</el-button>
                            </div>
                        </el-row>
                        </el-col>
                        <el-row>
                            <el-col :span="4" class="right"></el-col>
                        </el-row>
                    </el-row>

                    </el-form>
                </td>

                <td>
                    <el-switch v-model="newOrder.status" @change="setIntegralInfo" :on-value="1" :off-value="0" on-color="#13ce66" off-color="#ff4949" on-text="开" off-text='关'>
                    </el-switch>
                </td>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>历史订单送积分：</label>
                        <div>
                            对历史订单批量送积分，使用此功能需先开启新订单送积分功能 每成交1元赠送 1 积分
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label></label>
                        <div>
                            <span>每成交1元赠送</span>
                            <input v-model.number="oldOrder.value" placeholder="" type="text" @change="Verify(oldOrder.value)">
                            <span>积分</span>
                        </div>

                    </el-row>
                </td>
                <td>
                    <el-button type="success" :disabled='disOr' @click="oneButton">一键赠送</el-button>
                </td>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>绑定会员卡送积分：</label>
                        <div>
                            <el-col :span="22">
                                <input v-model.number="bindCard.value" placeholder="" type="text" @change="Verify(bindCard.value)">
                                <span>积分</span>
                                <span style="color:#999;"> （注：客户输入手机号码和验证码完成会员卡绑定，验证码发送需要消耗短信）</span>
                            </el-col>
                            <el-col :span="2" class="left" style="float:right;">
                                <el-button type="text" @click="sendInfo(3)">发送记录</el-button>
                            </el-col>
                        </div>

                    </el-row>
                </td>
                <td>
                    <el-switch v-model="bindCard.status" @change="setIntegralInfo" :on-value="1" :off-value="0" on-color="#13ce66" off-color="#ff4949" on-text="开" off-text='关'>
                    </el-switch>
                </td>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>收藏店铺送积分：</label>
                        <div>
                            <input v-model.number="shopCollection.value" placeholder="" type="text" @change="Verify(shopCollection.value)">
                            <span>积分</span>
                            <span style="color:#999;"> （注：客户首次收藏店铺赠送积分）</span>
                        </div>

                    </el-row>
                </td>
                <td>
                    <el-switch v-model="shopCollection.status" :on-value="1" :off-value="0" on-color="#13ce33" off-color="#ff4949" on-text="开" off-text='关' @change="setIntegralInfo">
                    </el-switch>
                </td>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>每日签到积分：</label>
                        <div>
                            <input v-model.number="everyDaySign.value" placeholder="" type="text" @change="Verify(everyDaySign.value)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label>连续签到积分：</label>
                        <div>
                            <input v-model.number="continuityDaySign.value" placeholder="" type="text" @change="Verify(continuityDaySign.value)">
                            <span>积分</span>
                            <span style="color:#999;">（注：每连续签到一次额外赠送积分）</span>
                        </div>
                    </el-row>
                </td>
                <td>
                    <el-switch v-model="everyDaySign.status" :on-value="1" :off-value="0" on-color="#13ce33" off-color="#ff4949" on-text="开" off-text='关' @change="setIntegralInfo">
                    </el-switch>
                </td>
            </tr>
            <tr>
                <td>
                    <el-row :span="18" class="tb">
                        <label>登记生日送积分：</label>
                        <div>
                            <input v-model.number="setBirthday.value" placeholder="" type="text" @change="Verify(setBirthday.value)">
                            <span>积分</span>
                        </div>
                    </el-row>
                    <el-row :span="18" class="tb">
                        <label>生日当天送积分：</label>
                        <div>
                            <input v-model.number="birthday.value" placeholder="" type="text" @change="Verify(birthday.value)">
                            <span>积分</span>
                        </div>
                    </el-row>
                </td>
                <td>
                    <el-switch v-model="setBirthday.status" @change="setIntegralInfo" :on-value="1" :off-value="0" on-color="#13ce66" off-color="#ff4949" on-text="开" off-text='关'>
                    </el-switch>
                </td>
            </tr>
        </table>
        <!-- 修改文案弹框start -->
        <el-dialog title="编辑短信文案" :visible.sync="dialogFormMsg" class="left">
            <el-form :model="msgForm">
                <el-form-item label="" class="left">
                    <el-input resize="vertical" name="textarea1" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="smsNoticeValue1"> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="18">
                        <input type="button" @click=" addText" value="买家昵称">
                        <input type="button" @click=" addText" value="订单金额">
                        <input type="button" @click=" addText" value="积分数量">
                        <input type="button" @click=" addText" value="会员积分链接">
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormMsg = false">取 消</el-button>
                <el-button type="primary" @click="confirmMsg">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改文案弹框end -->
        <!-- 发送记录对话框 -->
        <el-dialog title="发送记录" :visible.sync="dialogSendTable">
            <el-table :data="sendData" v-loading="sendLoading">
                <el-table-column property="id" label="编号" align="center" min-width="100"></el-table-column>
                <el-table-column property="content" label="内容" align="left"></el-table-column>
                <el-table-column property="sendTime" label="发送时间" align="center" width="110">
                    <template scope="scope">
                        <span>
                            {{ scope.row.sendTime.substr(0,10)}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="" label="是否成功" align="center" width="90">
                    <template scope="scope">
                        <span class="text-danger" v-if="scope.row.sendSuccess==true">成功</span>
                        <span class="text-danger" v-if="scope.row.sendSuccess==false">失败</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class=" top16 bottom16 text-center">
                <el-pagination v-show=" sendTotal>10 " :current-page.sync="sendCurrentPage" @current-change="handleCurrentSend" :page-size="size" layout="total,prev, pager, next,jumper" :total="sendTotal">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            disOr: false,//一键赠送的状态
            sendCurrentPage: 1,//发送记录的当前页数
            dialogFormMsg: false,//短信文案的弹窗开关
            smsNoticeValue1: "",//短信文案内容
            msgForm: { word: "" },
            sendTotal: 10,
            sendData: [],
            dialogSendTable: false,
            canChange:false,//短信开关是否可以触发change事件
            radio: -1,//是否编辑短信
            newOrder: { status: 0 },//新的订单
            setBirthday: { value: 11, status: 1 },
            memberLevel: { simpleMember: 2, vipMember: 4, seniorMember: 3, topVipMember: 5, shopMember: 1 },
            birthday: { value: 12, status: 1 },
            continuityDaySign: { value: 10, status: 1 },
            everyDaySign: { value: 9, status: 1 },
            shopCollection: { value: 8, status: 1 },
            bindCard: { value: 7, status: 1 },
            oldOrder: { value: 6, status: 1 },
            smsNotice: { value: "", status: 1 },
            size: 10,
            sendLoading: false
        };
    },
    methods: {
        // 一键赠送
        oneButton() {
            this.$http.post('http://memberapi.iqincheng.com//integral/oldOrderIntegral')
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.disOr = true;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // tab1开始设置信息
        setIntegralInfo() {
            //签到和生日，开启和关闭应当操作多个元素
            this.birthday.status = this.setBirthday.status;
            this.continuityDaySign.status = this.everyDaySign.status;
            let strJson = {
                birthday: this.birthday,
                oldOrder: this.oldOrder,
                continuityDaySign: this.continuityDaySign,
                smsNotice: {
                    value: this.smsNotice.value,
                    status: this.radio
                },
                bindCard: this.bindCard,
                newOrder: {
                    memberLevel: this.memberLevel,
                    status: this.newOrder.status
                },
                shopId: '',
                shopCollection: this.shopCollection,
                everyDaySign: this.everyDaySign,
                setBirthday: this.setBirthday,
            };
            
            let strJson1 = JSON.stringify(strJson);
            this.$http.post('http://memberapi.iqincheng.com/integral/setting', {
                params: strJson1
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.$message({
                            type: responseData.code == 0 ? "success" : "error",
                            message: responseData.message
                        });
                    }
                }
                )
        },

        confirmMsg() {
            this.smsNotice.value = this.smsNoticeValue1;
            this.setIntegralInfo();
            this.dialogFormMsg = false;
        },
        // 修改文案
        addText(e) {
            var obj = document.getElementsByName('textarea1')[0];
            var len = obj.selectionStart;
            let insertStr;
            if (e.target.value == '会员积分链接') {
                insertStr = ' ' + this.$store.state.userInfo.shop_link;
            } else {
                insertStr = "{" + e.target.value + "}";
            }
            this.smsNoticeValue1 = this.smsNoticeValue1.substring(0, len) + insertStr + this.smsNoticeValue1.substring(len);
        },

        Verify(val) {
            var myreg1 = /^[0-9]*$/;
            if (myreg1.test(val)) {
                this.setIntegralInfo();
            } else {
                this.$message.error('必须为数字');
                return false;
            }
        },
        // 获取信息
        getIntegralInfo() {
            this.$http.get('http://memberapi.iqincheng.com/integral/info')
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.memberLevel = responseData.data.newOrder.memberLevel;
                        this.setBirthday = responseData.data.setBirthday;
                        this.birthday = responseData.data.birthday;
                        this.continuityDaySign = responseData.data.continuityDaySign;
                        this.everyDaySign = responseData.data.everyDaySign;
                        this.shopCollection = responseData.data.shopCollection;
                        this.bindCard = responseData.data.bindCard;
                        this.oldOrder = responseData.data.oldOrder;
                        this.smsNotice = responseData.data.smsNotice;
                        this.radio = responseData.data.smsNotice.status;
                        this.newOrder.status = responseData.data.newOrder.status;
                        this.smsNoticeValue1 = this.smsNotice.value;
                        if (responseData.data.oldOrder.status == 1) {
                            this.disOr = true;
                        } else {
                            this.disOr = false;
                        }
                    }
                }
                )
        },
        // 发送记录
        sendInfo(sendType) {
            this.sendLoading = true;
            this.$http.get('http://memberapi.iqincheng.com/integral/sendLog', {
                params: {
                    type: sendType,
                    page: this.sendCurrentPage,
                    pageSize: this.size
                }
            })
                .then(
                response => {
                    this.sendLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.sendData = responseData.data.list;
                        this.dialogSendTable = true;
                    }
                }
                )
        },
        //绑定会员卡发送分页
        handleCurrentSend() {
            this.sendInfo(3);
        },
        changgeRadio(val) {
            if(!this.canChange) {//第一次不触发，从第二次开始触发（因为第一次是从api获取的值，并非用户更改）
                this.canChange = true;
                return false;
            }
            this.setIntegralInfo();
        }
    },
    mounted() {
        this.getIntegralInfo();
    }
};
</script>
<style lang="scss" scoped>
.msgWord {
    width: 700px;
    padding: 5px 8px;
    border: 1px solid #ddd;
    color: #666 !important;
    font-size: 12px;
    line-height: 25px;
    background: #fdfdfd;
    border-radius: 5px;
}

.left {
    text-align: left;
    padding-left: 8px;
}

.el-dialog__header {
    padding: 20px 33px 0;
}

.right {
    text-align: right;
    padding-right: 8px;
    font-weight: bold;
}

.el-form-item {
    padding: 10px;
}

.tb {
    &>label {
        width: 125px;
        float: left;
        text-align: right;
        font-weight: bold;
        &+div {
            margin-left: 125px;
            text-align: left;
            padding-left: 8px;
        }
    }
}

.tabled {
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background: #fff;
    border-collapse: collapse;
    border: 1px solid #dddddd;
    margin: 0px 0px 20px 0px;
    input {
        text-align: center;
    }
    .top_title {
        background: #eef1f6;
        font-size: 12px;
        color: rgb(31, 45, 61);
    }
    tr {
        .font {
            font-weight: bold;
        }
        td {
            border: 1px solid rgb(223, 230, 236);
            font-size: 12px;
            color: #666;
            padding: 0px 8px;
        }
    }
}

.line {
    text-align: center;
}

input[type="text"] {
    width: 50px;
    height: 25px;
}

input[type="button"] {
    background-color: #20a0ff;
    border-radius: 4px;
    border: 0;
    margin-left: 4px;
    padding: 4px 8px;
    color: #fff;
    cursor: pointer;
}

.el-dialog__body {
    padding: 30px 60px;
}

.el-col-3 {
    height: 40px;
}
</style>
<style>
.el-dialog__title {
    padding-left: 10px;
}
</style>

