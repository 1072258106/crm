<template>
    <div style="display:inline-block;">
        <el-button type="primary" size="small" @click="visible = true">输入手机号码</el-button>
        <el-dialog title="选择群发对象：输入号码" @open="form.number=''" :visible.sync="visible" size="tiny">
            <el-form ref="input_form" :rules="rules" :model="form">
                <el-form-item prop="number">
                    <el-input type="textarea" v-model="form.number" :rows="10"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "vInput",
    data() {
        const checkInput = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号，一行一个'));
            }
            const mobiles = value.match(/(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/g);
            if (mobiles.length > 0) {
                callback();
            } else {
                callback(new Error("请输入手机号，一行一个"));
            }
        };
        return {
            visible: false,
            form: {
                number: ""
            },
            rules: {
                number: [
                    { validator: checkInput, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit() {
            //判断手机号是否正确
            this.$refs['input_form'].validate((valid) => {
                if (valid) {
                    //提交号码
                    const mobiles = this.form.number.match(/(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})/g);
                    this.$http.post('/activity/input', {
                        phone: mobiles
                    }).then(
                        response => {
                            const responseData = response.data;
                            if (responseData.code == 0) {
                                //返回结果
                                const file = {
                                    uid: Date.parse(new Date()),
                                    name: '输入手机号码',
                                    percentage: 100,
                                    number: responseData.data.mobile
                                };
                                this.$emit('input-success', {
                                    file: file,
                                    total: responseData.data.total
                                })
                            }
                            this.visible = false;
                        }
                        )
                } else {
                    this.$message.error('请输入手机号码，一行一个');
                    return false;
                }
            })
        }
    }
}
</script>

