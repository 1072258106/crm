<template>
    <div>
        <el-table :data="recordsData" border style="width: 100%" v-loading="recordsLoading">
            <el-table-column prop="type" label="充值类型" align="left" min-width="100">
            </el-table-column>
            <el-table-column prop="source" label="来源" min-width="110">
            </el-table-column>
            <el-table-column prop="old_value" label="充值前余额" min-width="100" align="left">
                <template scope="scope">
                    <span type="primary" v-if="scope.row.old_value != null">
                        <span>{{ scope.row.old_value }}</span>条</span>
                    <span type="primary" v-if="scope.row.old_value == null">
                        <span>--</span></span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" align="left" min-width="90">
                <template scope="scope">
                    <span type="primary">
                        <span>{{ scope.row.amount }}</span>元</span>
                </template>
            </el-table-column>
            <el-table-column prop="units" label="条数" align="center">
                <template scope="scope">
                    <span type="primary">
                        {{ scope.row.units }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="bill_time" label="订购时间" align="center" min-width="100">
                <template scope="scope">
                    <span type="primary">
                        {{ scope.row.bill_time.substr(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status_name" label="订购状态" align="center" width="85">
                <template scope="scope">
                    <a href="javascript:;" v-if="scope.row.status===1" @click="confirmOrder(scope.row.id)" >确认订单</a>
                    <span v-else-if="scope.row.status===6" >{{ scope.row.status_name }}</span>
                    <span v-else-if="scope.row.status===3" >{{ scope.row.status_name }}</span>
                    <a href="javascript:;" @click="createOrder(scope.row.id, scope.row.pid)" v-else-if="scope.row.status===0" >{{ scope.row.status_name }}</a>
                    <a href="javascript:;" @click="confirmPay(scope.row.id)" v-else-if="scope.row.status===4" >{{ scope.row.status_name }}</a>
                    <a href="javascript:;" @click="confirmOrder(scope.row.id)" v-else >{{ scope.row.status_name }}</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class=" top16  text-center">
            <el-pagination v-show="page.total>10 " :current-page.sync="page.currentPage" @current-change="getRecordsLists" :page-size="page.size" layout="total,prev, pager, next,jumper" :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            recordsData: [],
            page: {
                currentPage: 1,
                size: 10,
                total: 0
            },
            recordsLoading: false
        }
    },
    methods: {
        // 待创建订单
        createOrder(id, pid) {
            let tempwindow = window.open('_blank');
            this.$http.get('/recharge/purchase', {
                params: {
                    pid: pid,
                    id: id
                }
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        tempwindow.location = responseData.data.url;
                    } else {
                        this.$message.error("操作失败！");
                    }
                }
                )
        },
        // 待创付款订单
        confirmPay(id) {
            let tempwindow = window.open('_blank');
            this.$http.get('/recharge/pay', {
                params: {
                    id: id
                }
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        console.log(responseData.data.url);
                        tempwindow.location = responseData.data.url;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        // 待确认订单
        confirmOrder(id) {
            let tempwindow = window.open('_blank');
            this.$http.get('/recharge/confirm', {
                params: {
                    id: id,
                }
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        console.log(responseData.data.url);
                        tempwindow.location = responseData.data.url;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        getRecordsLists() {
            //充值记录
            this.recordsLoading = true;
            this.$http.get('/recharge/records', {
                params: {
                    page: this.page.currentPage,
                    page_size: this.page.size
                }
            })
                .then(
                response => {
                    this.recordsLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        this.recordsData = data.list;
                        this.page.total = data.total;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        }
    },
    mounted() {
        this.getRecordsLists();
    }
}
</script>
