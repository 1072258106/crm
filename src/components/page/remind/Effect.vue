<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">催付总效果</div>

            <el-row>
                <el-col :span="8">
                    <div class="total">
                        <label>催付次数</label>
                        <span>
                            <font class="text-bold count-span-red">{{total.send_count}}</font>次</span>
                    </div>
                </el-col>

                <el-col :span="8">

                    <div class="total">
                        <label>成功催付订单</label>
                        <span>
                            <font class="text-bold count-span-green">{{total.success_send_count}}</font>次</span>
                    </div>

                </el-col>

                <el-col :span="8">

                    <div class="total">
                        <label>成功催付金额</label>
                        <span>
                            <font class="text-bold count-span-orange">{{total.success_money_total}}</font>元</span>
                    </div>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="text-center" style="padding:16px;">
                    <!-- <schart canvasId="sendChart" type="pie" :data="sendChart"></schart> -->
                    <e-charts type="pie" :axis="sendChart"></e-charts>
                </el-col>
                <el-col :span="12" class="text-center" style="padding:16px;">
                    <!-- <schart canvasId="moneyChart" type="pie" :data="moneyChart"></schart> -->
                    <e-charts type="pie" :axis="moneyChart"></e-charts>
                </el-col>
            </el-row>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">催付分时段效果分析</div>
            <div class="panel-body">
                <el-row>
                    <el-col :span="12">

                        <el-radio-group v-model="type" size="small">
                            <el-radio-button :label="1">成功催付金额</el-radio-button>
                            <el-radio-button :label="2">成功催付订单数</el-radio-button>
                            <el-radio-button :label="3">成功催付率</el-radio-button>
                            <el-radio-button :label="4">催付次数</el-radio-button>
                        </el-radio-group>

                    </el-col>

                    <el-col :span="12">
                        <div class="text-right">
                            <el-button type="text" @click="time = 1" :class="{'no-active':time!=1}">近7天</el-button>
                            <el-button type="text" @click="time = 2" :class="{'no-active':time!=2}">近30天</el-button>
                            <el-button type="text" @click="time = 3" :class="{'no-active':time!=3}">上个月</el-button>
                        </div>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="24">
                        <!-- <schart canvasId="daysChart" :width="schartWidth" type="line" :data="daysChart"></schart> -->
                        <e-charts type="line" :axis="lineChart"></e-charts>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">分阶段催付效果统计</div>
            <div class="panel-body">
                <el-table :data="stepTotalList" border v-loading="stepLoading">
                    <el-table-column prop="step_name" align="center" label="催付时段"></el-table-column>
                    <el-table-column prop="send_count" align="center" label="催付次数"></el-table-column>
                    <el-table-column prop="success_send_count" align="center" label="成功催付次数"></el-table-column>
                    <el-table-column prop="success_money_total" align="center" label="成功催付金额"></el-table-column>
                    <el-table-column align="center" label="催付成功率">
                        <template scope="scope">
                            {{scope.row.success_ratio}}%
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">订单催付近7天效果统计</div>
            <div class="panel-body">
                <el-table :data="DayTotalList" border v-loading="dayLoading">
                    <el-table-column prop="date" align="center" label="时间段"></el-table-column>
                    <el-table-column prop="send_count" align="center" label="催付次数"></el-table-column>
                    <el-table-column prop="success_send_count" align="center" label="成功催付次数"></el-table-column>
                    <el-table-column prop="success_money_total" align="center" label="成功催付金额"></el-table-column>
                    <el-table-column align="center" label="催付成功率">
                        <template scope="scope">
                            {{scope.row.success_ratio}}%
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import ECharts from '../../common/ECharts.vue';
import Schart from 'vue-schart';
export default {
    components: {
        'e-charts': ECharts,
        Schart
    },
    data() {
        return {
            total: {
                success_send_count: 0,
                send_count: 0,
                fail_send_count: 0,
                fail_money_total: 0,
                success_money_total: 0
            },
            type: 1,
            time: 1,
            daysChart: [],
            stepTotalList: [],
            DayTotalList: [],
            stepLoading: false,
            dayLoading: false
        }
    },
    computed: {
        lineChart() {
            return this.daysChart
        },
        sendChart() {
            return [
                {
                    name: '催付成功订单',
                    value: this.total.success_send_count
                }, {
                    name: '催付失败订单',
                    value: this.total.fail_send_count
                }

            ]
        },
        moneyChart() {
            return [
                {
                    name: '催付成功金额',
                    value: this.total.success_money_total
                }, {
                    name: '催付失败金额',
                    value: this.total.fail_money_total
                }
            ]
        },
        schartWidth() {
            var screenWidth = document.body.clientWidth;
            return screenWidth * 7 / 8 - 111;
        }
    },
    methods: {
        getTotal() {
            this.$http.get('/remind/get_total')
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.total = responseData.data;
                    }
                }
                )
        },
        getDaysTotal() {
            this.$http.get('/remind/get_total_days', {
                params: {
                    time: this.time,
                    type: this.type
                }
            }).then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        const data = responseData.data.list;
                        this.daysChart = data;
                        
                    }
                }
                )
        },
        getStepTotal() {
            this.stepLoading = true;
            this.$http.get('/remind/get_total_step')
                .then(
                response => {
                    this.stepLoading = false;
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.stepTotalList = responseData.data.list;
                    }
                }
                )
        },
        get7DayTotal() {
            this.dayLoading = true;
            this.$http.get('/remind/get_total_7day')
                .then(
                response => {
                    this.dayLoading = false;
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.DayTotalList = responseData.data.list.reverse();
                    }
                }
                )
        }
    },
    mounted() {
        this.getTotal();
        this.getDaysTotal();
        this.getStepTotal();
        this.get7DayTotal();
    }
    ,
    watch: {
        time: 'getDaysTotal',
        type: 'getDaysTotal'
    }
}
</script>

<style lang="scss" scoped>
.total {
    padding: 10px;
    border-right: 1px solid rgb(223, 230, 236);
    border-bottom: 1px solid rgb(223, 230, 236);
    text-align: center;
    &>label {
        display: block;
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
    }
    &>span {
        color: #999;
        font-size: 20px;
        font-weight: 700;
    }
}
</style>
<style lang="scss">
.no-active>span {
    color: #666 !important;
}
</style>


