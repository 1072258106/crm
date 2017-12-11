<template>
    <div>
        <!-- 会员积分设置 -->
        <div class="title_tag">
            <i class="el-icon-warning"></i>设置你的店铺积分规则，用户可以通过完成任务来赚取积分，积分可以兑换您设置的奖品。</div>
        <!-- tab按钮切换 -->
        <div>
            <el-button-group>
                <router-link :to="{ path:'/integral'}" tag="el-button" active-class="el-button--primary" exact>任务设置</router-link>
                <router-link :to="{ path:'/integral/setprice'}" tag="el-button" active-class="el-button--primary" exact>奖品设置</router-link>
                <router-link :to="{ path:'/integral/settao'}" tag="el-button" active-class="el-button--primary" exact>手淘发布</router-link>
            </el-button-group>
        </div>
        <el-row>
            <!-- tab选项卡 -->
            <transition name="el-fade-in">
                <router-view></router-view>
            </transition>
        </el-row>
    </div>
</template>
<script>
export default {

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
    &+div {
        margin: 20px 0px;
        text-align: center;
    }
}
</style>


        