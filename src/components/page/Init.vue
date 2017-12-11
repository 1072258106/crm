<template>
    <el-row :class="visible ? 'login-page' : 'login-page-white'"  v-if="visible">
        <el-row class="login-container">
            <div class="formContainer">
                <div class="login-title">亲橙CRM欢迎您</div>
                <el-row class="content-title">完善信息可领取50条短信</el-row>
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="短信签名：">
                        <el-input v-model="form.sms_sign"></el-input>
                        <span>用于短信签名，2-12字符建议用店铺名或品牌名</span>
                    </el-form-item>
                    <el-form-item prop="qq" label="QQ号码：">
                        <el-input v-model="form.qq"></el-input>
                        <span>用于日常客服问题沟通和短信联系</span>
                    </el-form-item>
                    <el-form-item prop="mobile" label="手机号码：">
                        <el-input v-model="form.mobile"></el-input>
                        <span>用于短信测试和店长日报的接收</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="save" type="primary">立即领取50条短信</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
        <div class="swiper-container">
            <div class="swiper-item" style="background-image:url(../../../static/img/bg-1.jpg);"></div>
            <div class="swiper-item" style="background-image:url(../../../static/img/bg-2.jpg);"></div>
            <div class="swiper-item" style="background-image:url(../../../static/img/bg-3.jpg);"></div>
        </div>
    </el-row>
</template>
<script>
import { Loading } from 'element-ui';
export default {
    data() {
        //手机号验证
        const validateMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入正确的手机号'));
            }
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }

        };
        return {
            visible: false,
            form: {
                sms_sign: "",
                qq: '',
                mobile: ''
            },
            rules: {
                qq: [
                    { required: true, message: '请输入QQ号码', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validateMobile, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        save() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$http.post('/user/gift', this.form)
                        .then(
                        response => {
                            const responseData = response.data;
                            if (responseData.code === 0) {
                                this.$router.push('/');
                            } else {
                                this.$message.error(responseData.message);
                            }
                        }
                        )
                } else {
                    return false;
                }
            })
        }
    },
    mounted() {
        this.$nextTick(function () {
            let index = 0;
            let slideList = document.getElementsByClassName('swiper-item');
            setInterval(function(){
                if(index > slideList.length-1){
                    index = 0;
                }
                for(var i = 0;i<slideList.length;i++) {
                    slideList[i].style.opacity = 0;                    
                }
                slideList[index].style.opacity = 1;
                index++
            },4000)
        })
        if (this.userInfo.mobile.length > 0) {
            this.$router.push('/');
        } else {
            this.visible = true;
            this.form.sms_sign = this.userInfo.sms_sign;
        }
    }

}
</script>
<style lang="scss" scoped>
.login-container{
    width: 514px;
    width: 614px;
    height:447px;
    position: absolute;
    left: 0;
    top:0;
    bottom:0;
    right: 0;
    margin:auto;
    z-index: 11;
    background: rgba(255, 255, 255,0.7);
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.7);
    border-radius: 8px;
}
.login-title {
    width: 275px;
    padding-left:64px;
    height: 88px;
    color: #20a0ff;
    font-size: 36px; // font-weight: bold;
    line-height: 88px;
    margin:0 auto;
    background: url("../../../static/img/logo2.png") left center no-repeat;
    background-size:64px 64px;
    text-align: center;
    font-weight: bold;
}

.formContainer {
    width: 480px;
    padding: 16px 66px;
    margin:0 auto;
    //background: #fff;
    .content-title {
        text-align: center;
        color: #666;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 16px;
    }
    .el-form-item {
        margin-bottom: 8px;
        font-weight: bold;
        span {
            color: #666;
            font-size: 12px;
            font-weight: normal;
            display: block;
            margin-top: -7px;
        }
        .el-button--primary {
            background: #20a0ff;
            width: 480px;
            margin-left: -80px;
            border: 1px solid #20a0ff;
            font-size: 18px;
            margin-top: 16px;
            &:hover {
                border: 1px solid #20a0ff;
                background: #20a0ff;
            }
        }
    }
}


.login-page {
    height: 100%;
}

.login-page-white {
    height: 100%;
    background: #fff;
}


</style>
<style>
.el-form-item__error {
    margin-top: -12px;
}
.swiper-container{
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
}
.swiper-container .el-carousel__container{
    height: 100%;
}
.swiper-item{
    height: 100%;
    width:100%;
    background-size:cover;
    background-repeat: no-repeat;
    position: absolute;
    top:0;
    left:0;
    transition: opacity 1s;
}
</style>


