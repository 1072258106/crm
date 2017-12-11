<template> 
    <table class="table-default table table-container" ref="container">
        <tr>
            <td>
                <label class="sub-title">开关设置：</label>
                <div class="sub-body">
                    <el-switch v-model="stepInfo.step_status" :on-value="1" :off-value="0" on-color="#13ce66" on-text="开" off-text="关" off-color="#ff4949">
                    </el-switch>
                </div>
            </td>
        </tr>
        <!-- 开关设置 -->
        <tr>
            <td>
                <!-- 生日关怀/时间设置 -->
                <div v-if="step_id == 2">
                    <label class="sub-title">时间设置：</label>
                    <div class="sub-body">
                        指定商品发货后
                        <el-select v-model="stepInfo.filters.hour" size="small" style="width:100px" placeholder="请选择">
                            <el-option v-for="item in [12,24,48]" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        小时，自动发关怀短信
                    </div>
                </div>

                <!-- 使用关怀/时间设置 -->
                <div v-if="step_id == 3">
                    <label class="sub-title">时间设置：</label>
                    <div class="sub-body">
                        距离最后一次购买指定商品达到复购周期后，自动发送关怀短信。
                    </div>
                </div>
                <!-- 复购关怀/时间设置 -->
                <div v-if="step_id == 4">
                    <label class="sub-title">发送时间：</label>
                    <div class="sub-body">
                        <el-select v-model="stepInfo.filters.day" size="small" style="width:120px" placeholder="请选择">
                            <el-option v-for="item in options.days" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        &emsp;
                        <el-select v-model="stepInfo.filters.hour" size="small" style="width:100px" placeholder="请选择">
                            <el-option v-for="item in options.hours" :key="item" :label="item+':00'" :value="item+':00'">
                            </el-option>
                        </el-select>
                        &emsp;开始发短信
                    </div>

                </div>
                <!-- 复购关怀/发送时间 -->
                <div v-if="step_id == 5">
                    <label class="sub-title">时间设置：</label>
                    <div class="sub-body">
                        离最后一次交易满
                        <el-select v-model="stepInfo.filters.day" size="small" style="width:100px" placeholder="请选择">
                            <el-option v-for="item in [30,60,90]" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select> 天时,自动发送关怀短信
                    </div>

                </div>
                <!-- 休眠关怀/时间设置 -->
                <div>
                    <label class="sub-title">等级过滤：</label>
                    <div class="sub-body">
                        <el-checkbox-group v-model="stepInfo.filters.grade" class="filterbox">
                            <el-checkbox :label="0">店铺会员</el-checkbox>
                            <el-checkbox :label="1">普通会员</el-checkbox>
                            <el-checkbox :label="2">高级会员</el-checkbox>
                            <el-checkbox :label="3">VIP会员</el-checkbox>
                            <el-checkbox :label="4">至尊VIP会员</el-checkbox>
                        </el-checkbox-group>
                        &nbsp;&nbsp;&nbsp;所选等级的会员不发短信
                    </div>

                </div>
                <!-- 会员过滤 -->
                <div>
                    <label class="sub-title">
                        会员过滤：
                    </label>
                    <div class="sub-body">
                        黑名单用户不发短信
                        <router-link to="/member/black">设置黑名单</router-link>
                    </div>

                </div>
                </div>
            </td>
        </tr>
        <!-- 条件设置  -->
        <tr v-if="step_id == 2 || step_id == 3">
            <td>
                <label class="sub-title">商品设置：</label>
                <div class="sub-body">
                    <item-set :data="stepInfo.list" :num-iids="stepInfo.filters.num_iid" @selected="stepInfo.filters.num_iid=arguments[0]" :step-id="Number(step_id)"></item-set>
                </div>
            </td>
        </tr>
        <!-- 商品设置 -->
        <tr>
            <td>
                <v-msg v-model="stepInfo.step_text" :module="9" @changeText="handlerChangeText" :step-id="stepInfo.step_id"></v-msg>
            </td>
        </tr>
        <tr class="fixed-row" :style="'width:'+width+'px;'">
            <td colspan="2" class="text-right">
                <el-button type="danger" @click="save">保存</el-button>
            </td>
        </tr>
    </table> 
</template>

<script>
import vMsg from '../../common/Msg.vue';
import itemSet from './ItemSet.vue';
import Vue from "vue";
export default {
    components: {
        vMsg, itemSet
    },
    data() {
        return {
            // 短信设置内容
            stepInfo: {
                id: "",
                step_id: 0,
                step_name: "",
                step_status: 0,
                step_text: "",
                step_time: 0,
                filters: {
                    day: 0,
                    hour: "0",
                    grade: [],
                    num_iid: []
                },
                list: []
            },
            options: {
                days: [
                    {
                        value: -1,
                        label: "生日前一天"
                    },
                    {
                        value: 0,
                        label: "生日当天"
                    },
                    {
                        value: 1,
                        label: "生日后一天"
                    }
                ],
                hours: Array.from(new Array(23), (val, index) => index + 1)
            },
            width: 0,

        }
    },
    computed: {
        step_id() {
            return this.$route.params.step_id;
        }
    },
    methods: {
        // 获取设置
        getSetting() {
            this.$http.get('/member_care/setting', {
                params: {
                    step_id: this.$route.params.step_id
                }
            }).then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.stepInfo = responseData.data;
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: responseData.message,
                            duration: 3000
                        });
                    }
                }
                )
        },
        handlerChangeText: function(value) {
            this.stepInfo.step_text = value;
        },
        saveSmsSign(sign) {
            return this.$store.dispatch("saveSmsSign", sign);
        },
        //保存设置
        save() {
            //判断字数
            var sign = this.$store.state.userInfo.sms_sign;
            if (!(sign.length >= 2 && sign.length <= 12)) {
                return this.$message.error("签名必须是2-12位");
            }
            this.saveSmsSign()
                .then(
                response => {
                    var responseData = response.data;
                    if (responseData.code == 0) {
                        let post_data = {
                            "step_id": this.stepInfo.step_id,
                            "step_status": this.stepInfo.step_status,
                            "step_text": this.stepInfo.step_text,
                            "step_time": this.stepInfo.step_time,
                            "filters": this.stepInfo.filters
                        };
                        //成功
                        this.$http.post("/member_care/setting", post_data)
                            .then(
                            response => {
                                this.$message({
                                    message: response.data.message,
                                    type: response.data.code == 0 ? "success" : "error"
                                })

                            }
                            )
                    } else {
                        this.$message.error(responseData.message);
                    }
                },
                error => {

                }
                )
        },
        getWidth() {
            let that = this;
            Vue.nextTick(function () {
                // DOM 更新了
                let container = that.$refs.container;
                that.width = container.offsetWidth;
            })
        }

    },
    beforeMount() {
        this.getSetting();
    },
    mounted() {
         //获取宽度
        this.getWidth();
        let that = this;
        window.onresize = function() {
            that.getWidth();
        }
    },
    watch: {
        '$route'(to, form) {
            this.getSetting();
        }
    }
}
</script>

