<template>
    <el-col :span="24">
        <div class="effect margin-bottom-20">
            <el-row>
                <el-col :span="6" class="total">
                    <label>今日发送</label>
                    <span class="count-span-red">{{totals.today}}</span>
                </el-col>
                <el-col :span="6" class="total">
                    <label>昨日发送</label>
                    <span class="count-span-green">{{totals.yesterday}}</span>
                </el-col>
                <el-col :span="6" class="total">
                    <label>累计发送</label>
                    <span class="count-span-orange">{{totals.all}}</span>
                </el-col>
                <el-col :span="6" class="total">
                    <label>链接打开（总）</label>
                    <span class="count-span-blue">{{totals.link_count}}</span>
                </el-col>
            </el-row>
        </div>
        <!-- 统计数据 -->
        <div class="tz-panel">
            <h4>统计数据曲线图</h4>
            <div class="panel-body">
                <el-row>
                    <el-col :span="12">
                        <el-radio-group v-model="type" size="small">
                            <el-radio-button label="4">发送次数</el-radio-button>
                            <el-radio-button label="5">打开链接</el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="12">
                        <div class="text-right">
                            <el-button type="text" @click="time = 1" :class="{'no-active':time==2}">近7天</el-button>
                            <el-button type="text" @click="time = 2" :class="{'no-active':time==1}">近30天</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <e-charts type="line" :axis="data"></e-charts>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-col>
</template>
<script>
import ECharts from '../../common/ECharts.vue';
export default {
    components: {
        'e-charts': ECharts
    },
    data() {
        return {
            step_id: this.$route.params.step_id,
            type: 4,
            time: 1,
            totals: {
                yesterday: 0,
                all: 0,
                link_count: 0,
                today: 0
            },
            canvasId: 'myCanvas',
            chartType: 'line',
            data: [],
            options: {

            }
        }
    },
    watch: {
        type: 'getCharData',
        time: 'getCharData'
    },
    methods: {
        getCharData() {
            this.$http.get('/care/chart', {
                params: {
                    step_id: this.step_id,
                    time: this.time,
                    type: this.type
                }
            }).then(
                response => {
                    this.chartType = this.type == 1 ? 'line' : '2';
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        this.data = data.list
                    }
                }
                )
        },
        getTotalData() {
            this.$http.get("/care/total", {
                params: {
                    step_id: this.step_id
                }
            }).then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        this.totals = data;
                    }
                }
                )
        }
    },
    mounted() {
        this.getTotalData();
        this.getCharData();
    }

}
</script>


<style lang="scss" scoped>
.effect {

    background-color: #fff;

    .total {
        padding: 10px;
        border-right: 1px solid rgb(223, 230, 236);
        &:last-child {
            border: none;
        }
        text-align: center;
        &>label {
            display: block;
            font-size: 14px;
            color: #666666;
            margin-bottom: 10px;
        }
        &>span {
            font-size: 20px;
            font-weight: 700;
        }
    }
}
</style>

<style lang="scss">
.no-active>span {
    color: #666 !important;
}
</style>



