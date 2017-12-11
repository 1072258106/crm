 <template>
    <!-- 我是系统设置 -->
    <div class="search ">
        <div class="title_tag">
            <i class="el-icon-warning"></i>请留下您的联系方式，我们会每天推送一天的订单催付量和短信</div>
        <div class="box_content">
            <el-form ref="form" :rules="form_rules" :model="form" label-width="80px">
                <!-- `checked` 为 true 或 false -->
                <div class="texy_bo">
                    <el-form-item>
                        <el-col :span="18">
                            <el-checkbox :true-label="1" :false-label="0" v-model="form.status">每天短信接收前一天短信发送量订单催付量</el-checkbox>
                        </el-col>
                    </el-form-item>
                </div>

                <el-col :span="18">
                    <el-form-item label="发送时间：" style="width:350px;">
                        <el-time-select v-model="form.time" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间">
                        </el-time-select>
                    </el-form-item>
                </el-col>

                <el-col :span="18">
                    <el-form-item label="手机：" prop="mobile" style="width:350px;">
                        <el-input v-model="form.mobile" auto-complete="on"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="QQ：" prop="qq" style="width:350px;">
                        <el-input v-model="form.qq"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        var validateMobile = (rule, value, callback) => {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (value === '') {
                callback(new Error('手机号必填'));
            } else if (!myreg.test(value)) {
                callback(new Error('手机号格式不合法!'));
            } else {
                callback();
            }
        };
        var validateQQ = (rule, value, callback) => {
            var myreg1 = /^([0-9]*)$/;
            if (!myreg1.test(value)) {
                callback(new Error('QQ格式不合法!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                status: this.$store.state.userInfo.daily_status,
                mobile: this.$store.state.userInfo.mobile,
                time: this.$store.state.userInfo.daily_time,
                qq: this.$store.state.userInfo.email,
            },
            form_rules: {
                mobile: [
                    { validator: validateMobile, trigger: 'blur' }
                ],
                qq: [
                    { validator: validateQQ, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getList() {
            this.$http.post('/user/setting', {
                mobile: this.form.mobile,
                qq: this.form.qq,
                daily_time: this.form.time,
                daily_status: this.form.status
            }).then(
                response => {
                    let responseData = response.data;
                    this.$message({
                        type: responseData.code == 0 ? "success" : "error",
                        message: responseData.message
                    });

                }
                )
        },
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.getList();
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.title_tag {
    color: #666;
    border: 1px solid #d4f0fc;
    background-color: #e6f3fc;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 45px;
    padding: 8px 16px;
    &>.el-icon-warning:before {
        padding-right: 8px;
    }
}

.el-form-item {
    margin-bottom: 20px;
}

.margin-top-60 {
    margin-top: 30px;
}

.box_content {
    padding: 20px;
    height: 290px;
    background: #fff;
}

.el-date-editor.el-input {
    width: 272px;
}

.texy_bo {
    margin-bottom: -10px;
}
</style>
