<template>
    <div>
        <!-- 会员积分记录 -->
        <div class="title_tag">
            <i class="el-icon-warning"></i>会员的积分的获取及消耗</div>
        <div class="seachBg margin-bottom-20">
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">
                    <label>搜索时间：</label>
                    <div>
                        <el-col :span="24">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line " :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>会员昵称：</label>
                    <div>
                        <el-input v-model="form.buyerNick" placeholder=""></el-input>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>变更类型：</label>
                    <div>
                        <el-select v-model="form.type" placeholder="全部">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value "></el-option>
                        </el-select>
                    </div>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="24" class="btn">
                    <el-button type="primary" @click="onSubmit">查找</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- table -->
        <div class="table-container">
            <el-table :data="tableData" border class="top16" v-loading="dataLoading">
                <el-table-column prop="createdAt" label="时间" align="center" min-width="102">
                    <template scope="scope">
                        <span>
                            {{ scope.row.createdAt.substr(0,10) || ' ' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="buyerNick" label="会员昵称" align="left" min-width="112">
                </el-table-column>
                <el-table-column prop="id" label="会员编号" align="center" min-width="112">
                </el-table-column>
                <el-table-column prop="typeName" label="积分变更类型" align="left" min-width="112">
                </el-table-column>
                <el-table-column prop="integral" label="积分变更数值" align="center" min-width="112">
                </el-table-column>
            </el-table>
            <div class=" top16 text-center">
                <el-pagination v-if="total > 10" layout="total,prev, pager, next,jumper" @current-change="getList" :current-page.sync="currentPage" :page-size="size" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<script>
import { formatDate } from '../../../function/formatDate.js'
export default {
    data() {
        return {
            tableData: [],
            total: 10,
            size: 10,
            currentPage: 1,
            form: {
                buyerNick: '',
                startTime: '',
                endTime: '',
                type: ''
            },
            statusOptions: [
                {
                    label: "全部",
                    value: ''
                },
                {
                    label: "新订单",
                    value: 1
                },
                {
                    label: "历史订单",
                    value: 2
                },
                {
                    label: "绑会员卡",
                    value: 3
                },
                {
                    label: "收藏店铺",
                    value: 4
                },
                {
                    label: "每日签到",
                    value: 5
                },
                {
                    label: "连续签到",
                    value: 6
                },
                {
                    label: "登记生日",
                    value: 7
                },
                {
                    label: "生日当天",
                    value: 8
                },
                {
                    label: "兑换",
                    value: 9
                },
                {
                    label: "系统调整",
                    value: 10
                }
            ],
            dataLoading: false
        }
    },
    computed: {
    },
    methods: {
        getList() {
            this.dataLoading = true;
            let startTime, endTime;
            this.form.startTime != '' ? startTime = formatDate(this.form.startTime) : startTime = '';
            this.form.endTime != '' ? endTime = formatDate(this.form.endTime) : endTime = '';
            this.$http.get('http://memberapi.iqincheng.com/integral/recordList', {
                params: {
                    startTime: startTime,
                    endTime: endTime,
                    buyerNick: this.form.buyerNick,
                    type: this.form.type,
                    page: this.currentPage,
                    pageSize: this.size,
                }
            }).then(
                response => {
                    this.dataLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.tableData = responseData.data.list;
                        this.total = responseData.data.total;
                    }
                }
                )
        },
        onSubmit() {
            this.currentPage = 1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
}
</script>

<style scoped>
.title_tag {
    height: 45px;
    color: #666;
    border: 1px solid #d4f0fc;
    background-color: #e6f3fc;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 45px;
    padding: 8px 16px;
}

.el-icon-warning:before {
    padding-right: 8px;
}

.line {
    text-align: center;
    line-height: 36px;
}

.btn {
    text-align: right;
    float: left;
    padding-top: 16px;
}
</style>
