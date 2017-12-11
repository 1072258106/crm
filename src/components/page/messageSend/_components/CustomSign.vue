<template>
    <div style="display:inline-block">
        <el-button type="text" @click="visible=true">申请自定义签名</el-button>
        <el-dialog title="申请自定义签名" :visible.sync="visible" size="tiny">
            <el-form ref="sign-form" :rules="rules" :model="form">
                <el-form-item prop="sign_name">
                    <el-input v-model="form.sign_name" placeholder="请输入自定义签名"></el-input>
                </el-form-item>
                <p style="font-size:12px;background:#d9edf7;color:#447e9b;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;margin-top:15px;line-height:25px;">
                    说明：<br/> 1.自定义签名字数限制为2-12个字
                    <br/> 2.不能使用官方的签名，如：“天猫”、“淘宝”等
                    <br/> 3.自定义签名请使用您的“店铺名”或“品牌名”，使用其他签名短信审核不会通过！
                    <br/>
                </p>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            form: {
                sign_name: this.sign
            },
            rules: {
                sign_name: [
                    { required: true, message: '请输入短信签名', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    props: [
        'sign',
        'channelId'
    ],
    methods: {
        confirm() {

            this.$refs['sign-form'].validate((valid) => {
                if (valid) {
                    this.$http.post('/activity/sign', {
                        sign_name: this.form.sign_name,
                        channel_id: this.channelId
                    }).then(
                        response => {
                            const responseData = response.data;
                            if (responseData.code == 0) {
                                this.visible = false;
                                this.$emit('custom-success', this.sign_name);
                            } else {
                                this.$message.error(responseData.message);
                            }
                        }
                        )
                } else {
                    return false;
                }
            });

        }
    },
    watch: {
        sign: function(val) {
            this.form.sign_name = val;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog__body {
    padding: 20px 20px 30px 20px;
}
</style>

