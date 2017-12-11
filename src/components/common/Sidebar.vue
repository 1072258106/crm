<template>
    <div class="menu-container">
        <el-menu class="menu" :default-active="activeIndex" @select="handleSelect" unique-opened router>
            <!--首页-->
            <el-menu-item index="/index">
                <i class="iconfont icon-shouye"></i>首页</el-menu-item>

            <!--短信群发-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont icon-duanxinqunfajilu"></i>短信群发</template>
                <el-menu-item index="/activity" style="padding-left:45px;">创建活动</el-menu-item>
                <el-menu-item index="/activity/records" style="padding-left:45px;">发送记录</el-menu-item>
                <el-menu-item index="/activity/status" style="padding-left:45px;">状态查询</el-menu-item>
            </el-submenu>

            <!--订单关怀(售前关怀)-->
            <el-submenu index="3">
                <template slot="title">
                    <i class="iconfont icon-cuifukuan-zheng"></i>订单关怀</template>
                <el-menu-item index="/care/10" style="padding-left:45px;">付款关怀</el-menu-item>
                <el-menu-item index="/care/1" style="padding-left:45px;">迟发提醒</el-menu-item>
                <el-menu-item index="/care/2" style="padding-left:45px;">发货提醒</el-menu-item>
                <el-menu-item index="/care/3" style="padding-left:45px;">到货提醒</el-menu-item>
                <el-menu-item index="/care/9" style="padding-left:45px;">签收提醒</el-menu-item>
                <el-menu-item index="/care/5" style="padding-left:45px;">好评提醒</el-menu-item>
                <el-menu-item index="/care/6" style="padding-left:45px;">好评感谢</el-menu-item>
                <el-menu-item index="/care/7" style="padding-left:45px;">差评安抚</el-menu-item>
                <el-menu-item index="/care/8" style="padding-left:45px;">退款关怀</el-menu-item>
            </el-submenu>

            <!--订单催付-->
            <el-submenu index="8">
                <template slot="title">
                    <i class="iconfont icon-dingdanguanhuai"></i>订单催付</template>
                <el-menu-item index="/remind/group" style="padding-left:45px;">宝贝分组催付</el-menu-item>
                <el-menu-item index="/remind/timing" style="padding-left:45px;">活动定时催付</el-menu-item>
                <el-menu-item index="/remind/effect" style="padding-left:45px;">催付效果统计</el-menu-item>
                <el-menu-item index="/remind/records" style="padding-left:45px;">短信发送记录</el-menu-item>
                <el-menu-item index="/remind/top" style="padding-left:45px;">催付优秀案例</el-menu-item>
            </el-submenu>

            <!--会员关怀(售中关怀)-->
            <el-submenu index="4">
                <template slot="title">
                    <i class="iconfont icon-huiyuanguanhuai"></i>会员关怀</template>
                <el-menu-item index="/follow/1" style="padding-left:45px;">升级关怀</el-menu-item>
                <el-menu-item index="/follow/2" style="padding-left:45px;">使用关怀</el-menu-item>
                <el-menu-item index="/follow/3" style="padding-left:45px;">复购关怀</el-menu-item>
                <el-menu-item index="/follow/4" style="padding-left:45px;">生日关怀</el-menu-item>
                <el-menu-item index="/follow/5" style="padding-left:45px;">休眠关怀</el-menu-item>
            </el-submenu>

            <!--会员管理-->
            <el-submenu index="5">
                <template slot="title">
                    <i class="iconfont icon-huiyuanguanli"></i>会员管理</template>
                <el-menu-item index="/member" style="padding-left:45px;">会员资料</el-menu-item>
                <el-menu-item index="/member/my_group" style="padding-left:45px;">我的分组</el-menu-item>
                <el-menu-item index="/member/group/1" style="padding-left:45px;">会员等级</el-menu-item>
                <el-menu-item index="/member/group/2" style="padding-left:45px;">会员标签</el-menu-item>
                <el-menu-item index="/member/group/3" style="padding-left:45px;">购买频次</el-menu-item>
                <el-menu-item index="/member/group/4" style="padding-left:45px;">客单均价</el-menu-item>
                <el-menu-item index="/member/group/5" style="padding-left:45px;">活跃程度</el-menu-item>
                <el-menu-item index="/member/group/6" style="padding-left:45px;">订单来源</el-menu-item>
                <el-menu-item index="/member/group/7" style="padding-left:45px;">手机类型</el-menu-item>
                <el-menu-item index="/member/black" style="padding-left:45px;">黑名单管理</el-menu-item>
            </el-submenu>

            <!--会员积分-->
            <el-submenu index="6">
                <template slot="title">
                    <i class="iconfont icon-huiyuanjifen"></i>会员积分</template>
                <el-menu-item index="/integral" style="padding-left:45px;">会员积分设置</el-menu-item>
                <el-menu-item index="/integral/list" style="padding-left:45px;">会员积分清单</el-menu-item>
                <el-menu-item index="/integral/records" style="padding-left:45px;">会员积分记录</el-menu-item>
            </el-submenu>

            <!--实用工具-->
            <el-submenu index="7">
                <template slot="title">
                    <i class="iconfont icon-gongju"></i>实用工具</template>
                    <el-menu-item index="/tools/h5" style="padding-left:45px;">H5手机网页</el-menu-item>
                     <el-menu-item index="/tools/phone_split" style="padding-left:45px;">手机号码筛选</el-menu-item>
            </el-submenu>

            <!--充值中心-->
            <el-menu-item index="/recharge">
                <i class="iconfont icon-chongzhizhongxin"></i>充值中心</el-menu-item>

            <!--系统设置-->
            <el-menu-item index="/setting">
                <i class="iconfont icon-settings"></i>系统设置</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    computed: {
        //父路由的时候--路径的选择
        activeIndex() {
            let _this = this;
            if ("undefined" != typeof (_this.$route.meta.is_child) && _this.$route.meta.is_child === true) {
                let path = _this.$route.path;
                let parentIndex = path.substring(0, path.lastIndexOf('/'));
                return parentIndex;
            }
            return _this.$route.path;
        },
        //开发中
        developing(){
            return process.env.NODE_ENV == 'development';
        }
    },
    methods: {
        handleSelect(key, keyPath) {
        }
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    width: 224px;
    left: 0;
    top: 76px;
    bottom: 0;
}

.el-menu-item {
    font-size: 12px;
}

.el-menu-item i {
    margin-right: 10px;
    font-size: 16px;
}

.el-submenu {
    color: #989898;
    font-size: 12px;
}

.el-submenu i {
    margin-right: 10px;
    font-size: 16px;
}

.el-submenu :hover {
    color: #fff;
}













/*  */

.menu-container {
    overflow: hidden;
    height: 100%;
}

.menu {
    width: 110%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 10% 0 0;
}
</style>
