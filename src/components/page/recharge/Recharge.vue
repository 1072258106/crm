<template>
    <div>
        <div class="title_tag">服务到期时间：
            <i class="el-icon-warning"></i>
            <span> {{deadline}}</span>(剩余
            <span class="text-danger">{{DateMinus(deadline) }}</span>天)
        </div>
        <div>
            <el-button-group>
                <router-link :to="{path:'/recharge'}" tag="el-button" active-class="el-button--primary" exact>短信充值</router-link>
                <router-link :to="{path:'/recharge/records'}" tag="el-button" active-class="el-button--primary" exact>充值记录</router-link>
                <router-link :to="{path:'/recharge/expend'}" tag="el-button" active-class="el-button--primary" exact>消耗记录</router-link>
            </el-button-group>
        </div>
        <div class="table-container" style="margin-bottom:20px">
            <div class="stepInfo">
                <div class="line"></div>
                <div class="stepIco stepIco1"><span>1</span>
                    <em class="right-line"></em>
                    <div class="stepText">选择套餐充值</div>
                </div>
                <div class="stepIco stepIco2"><span>2</span>
                    <em class="left-line"></em><em class="right-line"></em>
                    <div class="stepText">同意协议并完成付款</div>
                </div>               
                <div class="stepIco stepIco3"><span>3</span>
                    <em class="left-line"></em><em class="right-line"></em>
                    <div class="stepText">服务市场后台确认订单</div>
                </div>
                
                 <div class="stepIco stepIco3"><span>4</span>
                    <em class="left-line"></em>
                    <div class="stepText">充值成功</div>
                </div>
            </div>
        </div>
        <el-row>
            <!-- tab选项卡 -->
            <div class="table-container">
                <transition name="el-fade-in">
                    <router-view></router-view>
                </transition>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        deadline() {
            return this.$store.state.userInfo.deadline;
        }
    },
    methods: {
        DateMinus(sDate) {
            var sdate = new Date(sDate);
            var now = new Date();
            var days = sdate.getTime() - now.getTime();
            var day = parseInt(days / (1000 * 60 * 60 * 24));
            return day;
        }
    }

}
</script>
<style lang="scss" scoped>
.text-uderline {
    text-decoration: line-through;
}

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
    &+div {
        margin: 20px 0px;
        text-align: center;
    }
}


</style>
<style scope>
    .stepInfo{
        height: 64px;
        width: 90%;
        margin:0 auto;
        position: relative;
    }
    .left-line{
        position: absolute;
        top:14px;
        width:50%;
        right:52%;
        height:3px;
        background:#bfcbd9;
        z-index:11;
    }
    .right-line{
        position: absolute;
        top:14px;
        width:50%;
        left:52%;
        height:3px;
        background:#bfcbd9;
        z-index:11;
    }
    .stepIco{
        text-align: center;
        width:25%;
        float: left;
        box-sizing: border-box;
        padding-top:44px;
        font-weight: 700;
        font-size: 14px;
        color:#20a0ff;
        position: relative;
    }
    .stepIco span{
        position: absolute;
        top:0;
        left: 0;
        right:0;
        margin:auto;
        height: 28px;
        width:28px;
        line-height: 28px;
        background:#20a0ff;
        border-radius: 50%;
        color:#fff;
        z-index:111;
        text-align: center;
    }
    
</style>

