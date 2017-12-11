<template>
    <div>
        <el-row>
            <el-row class="made">
                H5手机网页制作：帮您制作H5手机网页,生成您专属的URL链接,可将链接插入到短信文案中营销
            </el-row>
            <!-- 提醒任务条 -->
            <el-row class="margin-top-20">
                <div class="text-center">
                    <el-button-group>
                        <router-link to="/tools/h5" tag="el-button" active-class="el-button--primary" exact>H5制作</router-link>
                        <router-link to="/tools/h5/h5list" tag="el-button" active-class="el-button--primary" exact>我的H5</router-link>
                    </el-button-group>
                </div>
            </el-row>
            <!-- tab选项卡 -->
            <transition name="el-fade-in">
                <router-view></router-view>
            </transition>

        </el-row>
    </div>
</template>

<script>
    
</script>
<style scoped>
    .box{
        height:400px;
        background-image:url(../../../../static/img/phone.png);
        background-repeat: no-repeat;
        background-size:100% ;
        background-position: center center;
        width: 194px;
        box-sizing: border-box;
        padding:51px 13px;
        margin:0 auto;
    }
    .contianer{
        height: 297px;
        width: 169px;
        position: relative;
        background:#fff;
    }
    .words{
        position: absolute;
    }
    .selected{
        border: 1px solid #000;
    }

    .made{
        height:54px;
        line-height:54px;
        vertical-align:left;
        border:1px solid #d4f0fc;
        background:#e6f3fc url(../../../../static/img/H5.png) no-repeat 25px center;
        border-radius:4px;
        font-size:14px;
        color:#666666;
        padding-left:4em;
    }
</style>

