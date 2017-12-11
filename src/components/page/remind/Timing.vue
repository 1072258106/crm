<template>
    <div>
        <div class="tz-alert primary margin-bottom-20">
            <i class="el-icon-information"></i> &nbsp;宝贝定时催付设置： 设置好时间节点，针对未付款的订单统一催付!
        </div>
        <div class="table-container" ref="container">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(step,index) in steps" :key="step.id" :title="'第'+(index+1)+'阶段'" :name="'step'+step.pr_step">
                    <div>
                        <label class="sub-title">是否开启：</label>
                        <div class="sub-body">
                            <el-switch v-model="step.pr_status" :on-value="1" :off-value="0" on-color="#13ce66" on-text="开" off-text="关" off-color="#ff4949">
                            </el-switch>
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">时间设置：</label>
                        <div class="sub-body">
                            <el-col :span="4">
                                <el-select v-model="step.pr_time" placeholder="请选择" style="width:100%;">
                                    <el-option v-for="item in timeOptions" :key="item" :label="item+':00'" :value="item*60">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <span style="margin-left:8px;font-size: 12px;color: #999;">时，针对未付款的订单统一催付</span>
                        </div>
                    </div>
                    <div>
                        <v-msg v-model="step.pr_text" :module="1" :step-id="step.pr_step"></v-msg>
                    </div>
                    <div class="fixed-row" :style="'width:'+width+'px;padding:7px 16px;'">
                        <label class="sub-title"></label>
                        <div class="sub-body text-right">
                            <el-button type="danger" @click="onSubmit(index)">保存</el-button>
                        </div>

                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import vMsg from '../../common/Msg';
import Vue from "vue";
export default {
    components: {
        vMsg
    },
    data() {
        return {
            activeName: "step101",
            steps: [
                {
                    pr_time: 480,
                    pr_text: "",
                    pr_step: 101,
                    id: "",
                    pr_status: 0
                },
                {
                    pr_time: 780,
                    pr_text: "",
                    pr_step: 102,
                    id: "",
                    pr_status: 0
                },
                {
                    pr_time: 1200,
                    pr_text: "",
                    pr_step: 103,
                    id: "",
                    pr_status: 0
                }
            ],
            timeOptions: Array.from(new Array(24), (val, index) => index),
            width: 0
        }
    },
    methods: {
        onSubmit() {
            let that = this;
            let allTrue = true;
            this.steps.forEach(function(step,index) {
                that.$http.post('/remind/update_timing_step', step)
                    .then(
                    response => {
                        if(response.data.code != 0) {
                            allTrue = false;
                            that.$message({
                                type: 'error',
                                message: response.data.message
                            });
                        }
                        if(index == that.steps.length - 1 && allTrue) {
                            that.$message({
                                type: 'success',
                                message: response.data.message
                            });
                        }
                    })
            });
            
        },
        getSteps() {
            this.$http.get('/remind/get_timing_list')
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.steps = responseData.data.list;
                    }
                }
                )
        },
        //获取宽度
        getWidth() {
            let that = this;
            Vue.nextTick(function () {
                // DOM 更新了
                let container = that.$refs.container;
                that.width = container.offsetWidth;
            })
        }

    },
    mounted() {
        this.getSteps();
         //获取宽度
        this.getWidth();
        let that = this;
        window.onresize = function() {
            that.getWidth();
        }
    }
}
</script>


<style lang="scss">
.el-form-item__label {
    padding: 11px 12px 11px 0;
}

.el-form-item__content {
    line-height: inherit;
}
</style>