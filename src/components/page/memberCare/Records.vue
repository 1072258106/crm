<template>
    <div>
        <div class="seachBg">
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">
                    <label>查询条件：</label>
                    <div>
                        <el-col :span="24">
                            <el-input v-model="search.keyword" placeholder="请输入手机号码/订单号/买家昵称"></el-input>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>搜索状态：</label>
                    <div>
                        <el-select v-model="search.status" placeholder="请选择">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="8" class="search_item" style="line-height: 36px;">
                    <el-button type="primary" @click="onSubmit" style="float: right;">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 搜索框 -->
        <div class="table-container top16">
            <el-tag type="warning" class="margin-bottom-20">
                <i class="el-icon-information"></i>系统仅保留近30天的短信发送记录
            </el-tag>
            <el-table :data="datas" class="margin-bottom-20" style="width: 100%" :border="true" v-loading="dataLoading">
                <el-table-column prop="buyer_nick" label="买家昵称" align="left" width="160">
                </el-table-column>
                <el-table-column label="真实姓名" align="left" prop="true_name" width="85">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" align="center" width="110">
                </el-table-column>
                <el-table-column prop="message" label="发送内容" align="left">
                </el-table-column>
                <el-table-column label="发送时间" align="center" width="110">
                    <template scope="scope">
                        <!-- <el-icon name="time"></el-icon> -->
                        <span style="margin-left: 10px">{{ scope.row.created_at.substr(0,10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="短信状态" prop="status_name" align="left" width="100">
                </el-table-column>
            </el-table>
            <div class=" bottom16 text-center">
                <el-pagination v-if="total > 10" :current-page="search.page" @current-change="handleCurrentChange" layout="total,prev, pager, next,jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 内容列表 -->

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
            var _this = this;
            this.dataLoading = true;
            _this.$http.get('/member_care/logs', {
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
/* .el-input,
.el-select {
    width: 300px;
} */
</style>
