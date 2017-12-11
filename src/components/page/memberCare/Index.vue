<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="tz-alert primary margin-bottom-20">
                    <i class="el-icon-information"></i> &nbsp;{{step_id | desc('title')}}：{{step_id | desc('desc')}}（为了不影响买家休息，22点至早晨8点的短信都延迟到8点后发出）
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 提醒任务条 -->
            <el-col :span="24">
                <div class="text-center margin-bottom-20">
                    <el-button-group>
                        <router-link :to="settingLink" tag="el-button" active-class="el-button--primary" exact>功能设置</router-link>
                        <router-link :to="recordsLink" tag="el-button" active-class="el-button--primary" exact>发送记录</router-link>
                        <router-link :to="effectLink" tag="el-button" active-class="el-button--primary" exact>效果统计</router-link>
                    </el-button-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- tab选项卡 -->
            <transition name="el-fade-in">
                <router-view></router-view>
            </transition>
        </el-row>
        <!-- <el-row>
            <el-col :span="24">
                <div class="footer">
                    <p>版权所有@杭州莫名科技有限公司 浙ICP备14001257号-1</p>
                </div>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
export default {

    data() {
        var _this = this;
        return {
            step_id: this.$route.params.step_id
        }
    },
    computed: {
        settingLink() {
            return "/follow/" + this.step_id;
        },
        recordsLink() {
            return "/follow/" + this.step_id + "/records";
        },
        effectLink() {
            return "/follow/" + this.step_id + "/effect"
        }
    },
    filters: {
        desc: function(value, field) {
            const descs = [
                "不同阶段描述性文字"
                , {
                    title: "升级关怀",
                    icon: "",
                    desc: "客户在本店的会员等级提升了，自动发短信关怀客户。"
                }, {
                    title: "使用关怀",
                    icon: "",
                    desc: "给客户推送产品的使用手册，让客户更好的体验产品服务"
                }, {
                    title: "复购关怀",
                    icon: "",
                    desc: "主要针对消费品（如牙膏），当客户快要使用完了自动发短信提醒客户再次购买"
                }
                , {
                    title: "生日关怀",
                    icon: "",
                    desc: "针对登记了会员生日信息的客户，生日到了自动发短信关怀客户"
                }
                , {
                    title: "休眠关怀",
                    icon: "",
                    desc: "针对长时间未来本店购物的老客户，自动发短信来激活客户"
                }
            ];
            return descs[value][field];
        }
    },
    beforeUpdate() {
        this.step_id = this.$route.params.step_id;
    }

}
</script>