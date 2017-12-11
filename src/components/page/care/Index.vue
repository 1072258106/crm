<template>
    <div>
        <el-row>
            <el-col :span="24" class="margin-bottom-20">
                <div class="tz-alert primary">
                    <i class="el-icon-information"></i> &nbsp;{{step_id | desc('title')}} ：{{step_id | desc('desc')}}（为了不影响买家休息，22点至早晨8点的短信都延迟到8点后发出）
                </div>
            </el-col>
            <!-- 提醒任务条 -->
            <el-col :span="24" class="margin-bottom-20">
                <div class="text-center">
                    <el-button-group>
                        <router-link :to="settingLink" tag="el-button" active-class="el-button--primary" exact>功能设置</router-link>
                        <router-link :to="recordsLink" tag="el-button" active-class="el-button--primary" exact>发送记录</router-link>
                        <router-link :to="effectLink" tag="el-button" active-class="el-button--primary" exact>效果统计</router-link>
                    </el-button-group>
                </div>
            </el-col>
            <!-- tab选项卡 -->
            <transition name="el-fade-in">
                <router-view></router-view>
            </transition>

            <!-- <el-col :span="24">
                <div class="footer">
                    <p>版权所有@杭州莫名科技有限公司 浙ICP备14001257号-1</p>
                </div>
            </el-col> -->
        </el-row>
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
            return "/care/" + this.step_id;
        },
        recordsLink() {
            return "/care/" + this.step_id + "/records";
        },
        effectLink() {
            return "/care/" + this.step_id + "/effect"
        }
    },
    filters: {
        desc: function(value, field) {
            const descs = [
                "不同阶段描述性文字"
                , {
                    title: "迟发提醒",
                    icon: "",
                    desc: "短信提前安抚客户，告知延迟发货的原因，请求客户谅解。"
                }, {
                    title: "发货提醒",
                    icon: "",
                    desc: "商家在卖家后台点发货后，系统将自动发短信通知买家。"
                }, {
                    title: "到货提醒",
                    icon: "",
                    desc: "快递到买家所在的城市立即发送短信通知，提醒买家注意留人在家签收。"
                }
                , {
                    title: "售后关怀",
                    icon: "",
                    desc: "已废除"
                }
                , {
                    title: "好评提醒",
                    icon: "",
                    desc: "提醒收货未评价的客户，用优惠券、返现等方式引导买家好评。"
                }
                , {
                    title: "好评感谢",
                    icon: "",
                    desc: "感谢客户对本店的支持，鼓励客户分享购物经验，欢迎下次再来。"
                }
                , {
                    title: "差评安抚",
                    icon: "",
                    desc: "第一时间安抚买家情绪，客服介入服务到满意为止。"
                }
                , {
                    title: "退款关怀",
                    icon: "",
                    desc: "退款成功后告知客户成功退款并致歉，用真诚挽留客户"
                }
                , {
                    title: "签收提醒",
                    icon: "",
                    desc: "在客户签收快递后的第一时间发短信提醒客户：确认收货并给5分好评有返现奖励！"
                }
                , {
                    title: "付款关怀",
                    icon: "",
                    desc: "买家付款完成之后，系统将自动发短信通知买家，告知会尽快安排发货。"
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