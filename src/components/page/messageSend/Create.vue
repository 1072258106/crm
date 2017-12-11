<template>
    <div>
        <div class="tz-alert primary margin-bottom-20">
            <h4>
                <i class="el-icon-information"></i>&nbsp;短信群发公告：</h4>
            <p>1.为了避免打扰客户休息，短信发送时间为8:00-22:00，超过时间顺延到次日发送（大促期间，相应发送时段以公告为准）</p>
            <p>2.为防止发违规信息而引起客户投诉，所有营销类短息都需要人工审核，请提交正规的短信文案测试或发送，否则有可能审核通不过。</p>
            <p>3.根据淘宝规定，本平台只接受正规的电商会员营销短信，欲发送加微信、加QQ群等其它非电商等内容请联系客服QQ：158208689</p>

        </div>
        <div class="table-container" ref="container">
            <table class="table-default table">
                <tr>
                    <td>
                        <label class="sub-title">活动名称：</label>
                        <div class="sub-body">
                            <el-col :span="4">
                                <el-input v-model="active.ac_name" placeholder="请输入活动名称" />
                            </el-col>
                            <span class="help-block">&nbsp;10个字以内</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>
                            <label class="sub-title">选择客户：</label>
                            <div class="sub-body">
                                <el-upload :action="globalApi+'/activity/upload'" :show-file-list="false" :on-success="handleSuccess" :on-error="handleFail" :on-progress="handlePro" :before-upload="beforeUpload" :headers="header" style="display:inline-block;">
                                    <el-button type="primary" size="small">上传手机号码</el-button>
                                </el-upload>
                                <v-input @input-success="handleInputSuccess" />
                                <v-condition @condition-success="handleConditionSuccess" />
                                <v-groups @group-success="handleGroupSuccess" />
                                <p class="help-block">
                                    "上传手机号码" 支持Excel、Txt、CSV文件，一行一个号码，每次导入最大支持50M
                                    <a href="/static/assets/upload.csv" target="_blank">下载Excel模板</a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <label class="sub-title">已选客户：</label>
                            <div class="sub-body">
                                <el-table :data="userFiles" style="width:100%;">
                                    <el-table-column prop="name" width="300px" label="名称"></el-table-column>
                                    <el-table-column label="进度" header-align="center">
                                        <template scope="scope">
                                            <el-progress :percentage="scope.row.percentage" :status="scope.row.percentage==100?'success':''"></el-progress>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="number" align="center" label="人数"></el-table-column>
                                    <el-table-column label="操作" align="center">
                                        <template scope="scope">
                                            <el-button v-if="scope.$index==0" @click="deleteFile" size="mini" type="text">全部删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div v-if="total > 0" class="tz-alert success tiny" style="margin-top:5px">
                                    <i class="el-icon-information"></i>
                                    号码去重后共选择
                                    <span class="text-danger">{{total}}</span>个号码
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <!-- 群发对象 -->
                <tr>

                    <td>
                        <div>
                            <v-msg v-model="active.ac_text" @channel-change="handleChannelChange" @sign-change="handleSignChange" :step-id="1" :module="4" />
                        </div>
                    </td>
                </tr>
            </table>
             <div class="fixed-row fixed-row-send" :style="'width:'+width+'px;'">
                <label class="sub-title">执行任务：</label>
                <div class="sub-body" style="paddding:4px 0;">
                    <el-col :span="12">
                        <el-radio class="radio send-time" v-model="sendMethod" @click="active.ac_send_time=''" :label="1" style="width:100px;">立即发送</el-radio>
                        <el-radio class="radio send-time" v-model="sendMethod" :label="2" style="width:100px;">定时发送</el-radio>
                        <el-date-picker v-if="sendMethod == 2" @change="timeSelected" v-model="sendTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择发送时间" align="right" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="danger" @click="save">确认发送</el-button>
                    </el-col>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vInput from "./_components/Input";
import vMsg from "./_components/Msg";
import vGroups from "./_components/Groups";
import vCondition from "./_components/ConditionSet";
import Vue from "vue";
export default {
    components: {
        vInput,
        vMsg,
        vGroups,
        vCondition
    },
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            header: {
                "Access-Token": this.$store.state.token
            },
            sendMethod: 1,
            userFiles: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            active: {
                ac_name: "",
                ac_channel: 1,
                ac_sign: "",
                ac_text: "",
                ac_send_time: "",
                ac_short_url: ""
            },
            sendTime: "",
            total: 0,
            width: 0
        };
    },
    computed: {
        globalApi() {
            return this.$store.state.globalApi;
        }
    },
    methods: {
        //判断是否符合上传条件
        beforeUpload(file) {
            const isExcel = file.type === "application/vnd.ms-excel";
            const isNewExcel =
                file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const isCSV = file.type === "text/csv";
            const isTXT = file.type === "text/plain";
            const isLt5M = file.size / 1024 / 1024 < 50;
            if (!isExcel && !isNewExcel && !isCSV && !isTXT) {
                this.$message.error("上传手机号码文件只能是 Excel 或CSV 或TXT 格式!");
                return false;
            }
            if (!isLt5M) {
                this.$message.error("上传手机号码文件大小不能超过 50MB!");
                return false;
            }
            // 添加上传的文件
            const _file = {
                uid: file.uid,
                name: file.name,
                percentage: 0,
                number: 0
            };
            this.userFiles.push(_file);
            return true;
        },
        //上传成功
        handleSuccess(response, file) {
            //修改原来的记录
            this.userFiles.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(file.percentage);
                    array[index].number = file.response.data.mobile;
                }
            }, file);
            this.total = file.response.data.total;
        },
        handleFail(err, file) {
            console.info("文件上传失败", err, file);
        },
        //上传过程中
        handlePro(event, file) {
            console.info("ev:", event, file);
            this.userFiles.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(event.percent);
                }
            });
        },
        handleInputSuccess(data) {
            this.userFiles.push(data.file);
            this.total = data.total;
        },
        handleGroupSuccess(data) {
            this.userFiles.push(data.file);
            this.total = data.total;
        },
        handleConditionSuccess(data) {
            this.userFiles.push(data.file);
            this.total = data.total;
        },
        save() {
            if (this.active.ac_name == "") {
                this.$message.error("活动名称不能为空");
                return false;
            }
            //保存活动
            this.$http.post("/activity", this.active).then(response => {
                const responseData = response.data;
                if (responseData.code == 0) {
                    this.$message.success("创建完成");
                    this.$router.push("/activity/records");
                } else {
                    this.$message.error(responseData.message);
                }
            });
            //跳转发送记录
        },
        timeSelected(value) {
            if (Date.parse(this.sendTime) < Date.parse(new Date())) {
                this.$message.error("请选择比现在更迟的时间");
                this.sendTime = "";
                return;
            }
            this.active.ac_send_time = value;
        },
        handleChannelChange(channel_id) {
            this.active.ac_channel = channel_id;
        },
        handleSignChange(sign_id) {
            this.active.ac_sign = sign_id;
        },
        //全部删除文件
        deleteFile() {
            this.$http
                .post("/activity/delete", {
                    key: 0
                })
                .then(response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.userFiles = [];
                        this.total = 0;
                        this.$message.success("删除成功");
                    } else {
                        this.$message.error("删除失败");
                    }
                });
        },
        getWidth() {
            let that = this;
            Vue.nextTick(function() {
                // DOM 更新了
                let container = that.$refs.container;
                that.width = container.offsetWidth;
            });
        }
    },
    mounted() {
        //获取宽度
        this.getWidth();
        //删除之前的会员
        this.$http.post("/activity/delete", {
            key: 0
        });
        //判断是否有已选分组
        if ("undefined" !== typeof this.$route.query.id) {
            this.$http
                .post("/activity/group", {
                    group_id: [this.$route.query.id]
                })
                .then(response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        //返回结果
                        const file = {
                            uid: Date.parse(new Date()),
                            name: "选择分组",
                            percentage: 100,
                            number: responseData.data.mobile
                        };
                        this.handleGroupSuccess({
                            file: file,
                            total: responseData.data.total
                        });
                    } else {
                        this.$message.error(responseData.message);
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.send-time {
    margin-left: 12px;
}
</style>

