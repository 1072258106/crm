<template>
    <div>
        <el-col :span="24">
            <div class="search margin-bottom-20">

                <el-form :inline="true" :model="search" class="tz-panel">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="8" class="search_item">

                            <label>查询条件：</label>
                            <div>
                                <el-col :span="24">
                                    <el-input v-model="search.keyword" placeholder="请输入手机号码/订单号/买家昵称"></el-input>
                                </el-col>
                            </div>
                        </el-col>

                        <el-col :span="7" class="search_item">
                            <label>状态：</label>
                            <div>
                                <el-select v-model="search.status" placeholder="请选择">
                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>

                        <el-col :span="7" class="search_item text-right">
                            <div>
                                <el-button type="primary" @click="onSubmit">搜索</el-button>
                            </div>
                        </el-col>
                    </el-row>

                </el-form>

            </div>

        </el-col>
        <!-- 搜索框 -->
        <el-col :span="24">
            <div class="table-container">
                <el-tag type="warning" class="margin-bottom-20">
                    <i class="el-icon-information"></i>系统仅保留近30天的短信发送记录
                </el-tag>

                <el-table :data="datas" class="margin-bottom-20" style="width: 100%" :border="true" v-loading="dataLoading">
                    <el-table-column prop="tid" label="订单编号" align="center">
                    </el-table-column>
                    <el-table-column label="买家信息">
                        <template scope="scope">
                            <p class="userinfo">
                                <span>真实姓名：</span> {{ scope.row.true_name }}</p>
                            <p class="userinfo">
                                <span>手机号：</span> {{ scope.row.mobile }}</p>
                            <p class="userinfo">
                                <span>用户昵称：</span>{{ scope.row.buyer_nick }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message" label="发送内容"></el-table-column>
                    <el-table-column label="发送时间" align="center" prop="created_at" width="150"></el-table-column>
                    <el-table-column label="短信状态" align="center" prop="status_name" width="85"></el-table-column>

                </el-table>
                <div class="margin-bottom-20 text-center">
                    <el-pagination v-if="total > 10" :current-page="search.page" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-col>
        <!-- 内容列表 -->

        <!-- 分页 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 筛选的选项
            statusOptions: [
                {
                    label: "全部",
                    value: -1
                },
                {
                    label: "等待发送",
                    value: 1
                },
                {
                    label: "已发送",
                    value: 2
                },
                {
                    label: "成功",
                    value: 3
                },
            ],
            search: {
                step_id: this.$route.params.step_id,
                keyword: "",
                status: -1,
                page: 1,
                page_size: 10
            },
            total: 0,
            datas: [],
            dataLoading: false
        }
    },
    methods: {
        getList(search) {
            this.dataLoading = true;
            var _this = this;
            _this.$http.get('/care/logs', {
                params: search
            }).then(
                response => {
                    this.dataLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.datas = responseData.data.list;
                        this.total = responseData.data.total;
                    }
                },
                error => {

                }
                )
        },
        // 搜索按钮提交事件
        onSubmit() {
            // console.log(this.search);
            this.getList(this.search);
        },
        handleCurrentChange(val) {
            this.search.page = val;
            this.getList(this.search);
        }
    },
    mounted() {
        this.getList(this.search);
    }
}
</script>

<style scoped>
.el-input,
.el-select {
    max-width: 300px;
}

.userinfo {
    padding-left: 65px;
    position: relative;
}

.userinfo span {
    width: 60px;
    text-align: right;
    position: absolute;
    left: 0;
    top: 0;
}
</style>
