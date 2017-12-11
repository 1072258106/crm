<template>
    <!-- 手淘发布 -->
    <div class="table-container">
        <el-row>
            <el-col :span="12">
                <el-form :model="cloneData">
                    <el-form-item label="手淘活动链接：" :label-width="formLabelWidth">
                        <el-col :span="20">
                            <el-input placeholder="" id="activityLink1" v-model="activityLink1" @change="changeInputUrl"> </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button v-clipboard:copy="activityLink1" v-clipboard:success="onCopy" v-clipboard:error="onError" style="margin-left: 8px;">复制</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="手淘活动短链：" :label-width="formLabelWidth">
                        <el-col :span="20">
                            <el-input placeholder="" v-model="userInfo.shop_link"> </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button v-clipboard:copy="userInfo.shop_link" v-clipboard:success="onCopy" v-clipboard:error="onError" style="margin-left: 8px;">复制</el-button>
                        </el-col>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="手淘活动链接：" :label-width="formLabelWidth">
                        <div>
                            <canvas id="canvas"></canvas>
                        </div>
                    </el-form-item>
                    <el-form-item label="帮助看链接：" :label-width="formLabelWidth">
                        <a href="" class="padl8" target="_blank">装修到手机菜单自定义</a><br>
                        <a href="" class="padl8" target="_blank">装修到手机店铺首页</a><br>
                        <a href="" class="padl8" target="_blank">装修到旺旺互动服务窗</a><br>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12" class="padl8">
                <el-row class="title padl8">活动页面效果预览：</el-row>
                <el-row class="padl8"><img src="../../../../static/img/shouji.png" alt="" width="377"></el-row>
            </el-col>
        </el-row style="margin-bottom:20px;">
    </div>
</template>
<script>
import Vue from 'vue'
import QRCode from 'qrcode'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(QRCode)
export default {
    data() {
        return {
            cloneData: {},
            activityLink1: "https://qtop.ews.m.jaeapp.com/?t=" + new Date().getTime() + "#!/init/" + this.$store.state.userInfo.shop_id,
            activityLink2: "",
            formLabelWidth: '110px',
            url: ""
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        onCopy: function(e) {
            this.$message({
                message: '复制成功！',
                type: 'success'
            });
        },
        onError: function(e) {
            this.$message({
                message: '复制失败！',
                type: 'error'
            });
        },
        //输入框url改变事件
        changeInputUrl() {
            this.useqrcode();
        },
        useqrcode() {
            let opt = { errorCorrectionLevel: 'H', margin: 3 }
            var canvas = document.getElementById('canvas');
            QRCode.toCanvas(canvas, this.activityLink1, opt, function(error) {
            });
        }
    },
    mounted() {
        this.useqrcode();
    }
};
</script>
<style lang="scss" scoped>
#canvas {
    width: 200px!important;
    height: 200px!important;
}

.padl8 {
    padding-left: 8px;
}

.el-form-item {
    padding: 10px;
}

.title {
    font-size: 14px;
    color: #666;
    padding-bottom: 8px;
}
</style>


                 
             
                