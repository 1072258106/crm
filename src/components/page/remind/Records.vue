<template>
    <!-- 我是短信发送记录 -->
    <div>
        <div class="seachBg">
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">
                    <label>客户动态：</label>
                    <div>
                        <el-select v-model="form.status" placeholder="全部">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>查询条件：</label>
                    <div>
                        <el-input v-model="form.kw" placeholder="订单号"></el-input>
                    </div>
                </el-col>

                <el-col :span="8" class="search_item text-right">
                    <el-button @click="getList" type="primary">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- table -->
        <div class="table-container top16 bottom16">
            <el-table :data="lists" style="width: 100%" :border="true" v-loading="listLoading">
                <el-table-column prop="tid" label="订单编号" width="155px" align="center">
                </el-table-column>
                <el-table-column label="短信内容" prop="message" align="left" min-width="200">
                    <template scope="scope">
                        <div :title="scope.row.message">
                            {{ scope.row.message | overflow }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="买家信息" align="left" width="180" class-name="buyer-info">
                    <template scope="scope">
                        <p>
                            <span>真实姓名：</span>{{ scope.row.true_name }}</p>
                        <p>
                            <span>手机号：</span> {{ scope.row.mobile }}</p>
                        <p>
                            <span>昵称：</span>{{ scope.row.buyer_nick }}</p>
                        <!-- <el-popover trigger="hover" placement="right">
                                        <p>真实姓名: {{ scope.row.true_name }}</p>
                                        <p>手机号: {{ scope.row.mobile }}</p>
                                        <div slot="reference" class="name-wrapper">
                                            <span>{{ scope.row.buyer_nick }}</span>
                                        </div>
                                    </el-popover> -->
                    </template>
                </el-table-column>
                <el-table-column label="发送时间" width="150" align="center" prop="created_at">
                </el-table-column>
                <el-table-column label="客户动态" prop="status_name" width="100px" align="left">
                </el-table-column>
            </el-table>

            <div class="text-center">
                <el-pagination v-if="total > 10" :current-page.sync="page" @current-change="getList" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                kw: "",
                status: -1
            },
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
                    label: "提交发送",
                    value: 2
                },
                {
                    label: "发送成功",
                    value: 3
                }
            ],
            lists: [],
            page: 1,
            pageSize: 10,
            total: 0,
            listLoading: false
        }
    },
    filters: {
        overflow: function(text) {
            let result
            if (text.length > 70) {
                result = text.substring(0, 70) + '...'
            } else {
                result = text
            }
            return result
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            this.$http.get('/remind/get_record_list', {
                params: {
                    page: this.page,
                    page_size: this.pageSize,
                    keyword: this.form.kw,
                    status: this.form.status
                }
            }).then(
                response => {
                    this.listLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.lists = responseData.data.list;
                        this.total = responseData.data.total;
                    }
                }
                )
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style scoped>
.buyer-info span {
    width: 60px;
    text-align: right;
    display: inline-block;
}
</style>


