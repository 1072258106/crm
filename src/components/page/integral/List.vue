<template>
    <div>
        <!-- 会员积分清单 -->
        <div class="title_tag">
            <i class="el-icon-warning"></i>会员积分档案，你可以在这里查看单个会员的积分明细，还可以手动调整积分。</div>
        <div class="seachBg margin-bottom-20">
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">

                    <label>会员昵称：</label>
                    <div>
                        <el-col :span="24">
                            <el-input v-model="form.name" placeholder="" size=""></el-input>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item" min-width="100">
                    <label>会员等级：</label>
                    <div>
                        <el-select v-model="form.status" placeholder="所有会员">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value "></el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>累计积分：</label>
                    <div>
                        <el-col :span="11">
                            <el-input v-model="form.startAccumulateIntegral" placeholder=""></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.endAccumulateIntegral" placeholder=""></el-input>
                        </el-col>
                    </div>
                </el-col>
            </el-row>

            <el-row type="flex" justify="space-between" style="margin-top:16px">
                <el-col :span="7" class="search_item">
                    <label>
                        当前积分：
                    </label>
                    <div>
                        <el-col :span="11">
                            <el-input v-model="form.startCurrentIntegral" placeholder=""></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.endCurrentIntegral" placeholder=""></el-input>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item" style="text-align:right;">
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-col>

            </el-row>
        </div>
        <!-- table -->
        <div class="table-container">
            <el-table :data="tableData" border v-loading="dataLoading">
                <el-table-column prop="buyerNick" label="会员昵称" align="left" min-width="180">
                </el-table-column>
                <el-table-column prop="grade" label="会员等级" align="left" min-width="85">
                    <template scope="scope">
                        <span v-if="scope.row.grade==-1">临时会员</span>
                        <span v-if="scope.row.grade==0">店铺会员</span>
                        <span v-if="scope.row.grade==1">普通会员</span>
                        <span v-if="scope.row.grade==2">高级会员</span>
                        <span v-if="scope.row.grade==3">VIP会员</span>
                        <span v-if="scope.row.grade==4">至尊VIP会员</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="会员手机号" align="center" width="130">
                </el-table-column>
                <el-table-column prop="wx" label="会员微信号" align="center" width="150">
                </el-table-column>
                <el-table-column prop="" label="生日" align="center" width="150">
                    <template scope="scope">
                        <span v-if="scope.row.birthday==null"></span>
                        <span v-else>
                            {{ scope.row.birthday.substr(0,10) }}</span>
                    </template>

                </el-table-column>
                <el-table-column prop="accumulateIntegral" label="累计积分" align="center" min-width="90">
                </el-table-column>
                <el-table-column prop="currentIntegral" label="当前积分" align="center" min-width="90">
                </el-table-column>
                <el-table-column label="操作" align="left" min-width="170">
                    <template scope="scope">
                        <a href="javascript:;" type="text" @click=" integralBox1(scope.row.buyerNick) ">积分明细</a>
                        <a href="javascript:;" type="text" @click=" integralBox2(scope.row.currentIntegral,scope.row.buyerNick) ">调整积分</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class=" top16 text-center">
                <el-pagination v-if="total > 10" layout="total,prev, pager, next,jumper" @current-change="getList" :current-page.sync="currentPage" :page-size="size" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 弹框1table -->
        <el-dialog title="会员明细" :visible.sync="dialogTableVisible">
            <el-table :data="tableIntegral" v-loading="integralLoading">
                <el-table-column property="id" label="ID" align="center" min-width="150"></el-table-column>
                <el-table-column property="createdAt" label="时间" width="" align="center">
                    <template scope="scope" width="90">
                        <span v-if="scope.row.createdAt==null"></span>
                        <span v-else>
                            {{ scope.row.createdAt.substr(0,10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="typeName" label="积分变更类型" align="left"></el-table-column>
                <el-table-column property="integral" label="积分变更数值" align="center"></el-table-column>
            </el-table>
            <div class=" top16 bottom16 text-center">
                <el-pagination v-if="total2 > size" layout="total,prev, pager, next,jumper" @current-change="integralDetails(boxBbuyerNick)" :current-page.sync="currentBoxPage1" :page-size="size" :total="total2">
                </el-pagination>
            </div>
        </el-dialog>

        <!-- 弹框2form -->
        <el-dialog title="积分调整" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80px">
                <el-col :span='20' class="formBox">
                    <el-form-item label="当前积分：" :label-width="formLabelWidth" class="text-align">
                        <el-input v-model="form.currentScore" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='20' class="formBox">
                    <el-form-item label="调整数额：" :label-width="formLabelWidth" class="text-align">
                        <el-input v-model="form.updateIntegral" auto-complete="off"></el-input>
                        <span class="remarks"> 正值为增加，负值为减少</span>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="integralConfirm(form.name2)">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            total: 10,
            size: 10,
            total2: 2,
            boxBbuyerNick: '',
            currentBoxPage1: 1,
            currentPage: 1,
            form: {
                name: '',
                name2: '',
                status: '',
                startAccumulateIntegral: '',
                endAccumulateIntegral: '',
                startCurrentIntegral: '',
                endCurrentIntegral: '',
                updateIntegral: 0,
                currentScore: 0
            },
            statusOptions: [
                {
                    label: "所有会员",
                    value: ""
                },
                {
                    label: "临时会员",
                    value: -1
                },
                {
                    label: "店铺会员",
                    value: 0
                },
                {
                    label: "普通会员",
                    value: 1
                },
                {
                    label: "高级会员",
                    value: 2
                },
                {
                    label: "VIP会员",
                    value: 3
                },
                {
                    label: "至尊VIP会员",
                    value: 4
                }
            ],
            tableIntegral: [],
            total2: 10,
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            dataLoading: false,
            integralLoading: false
        }
    },
    computed: {
    },
    methods: {
        getList() {
            this.dataLoading = true;
            this.$http.get('http://memberapi.iqincheng.com/member/integralList', {
                params: {
                    buyerNick: this.form.name,
                    grade: this.form.status,
                    startAccumulateIntegral: this.form.startAccumulateIntegral,
                    endAccumulateIntegral: this.form.endAccumulateIntegral,
                    startCurrentIntegral: this.form.startCurrentIntegral,
                    endCurrentIntegral: this.form.endCurrentIntegral,
                    page: this.currentPage,
                    pageSize: this.size
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
        integralDetails(name) {
            this.integralLoading = true;
            this.$http.get('http://memberapi.iqincheng.com/integral/recordList', {
                params: {
                    buyerNick: name,
                    page: this.currentBoxPage1,
                    pageSize: this.size
                }
            }).then(
                response => {
                    this.integralLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.tableIntegral = responseData.data.list;
                        this.total2 = responseData.data.total;
                    }
                }
                )
        },

        integralModify(name) {
            this.$http.post('http://memberapi.iqincheng.com/integral/update', {
                buyerNick: name,
                integral: this.form.updateIntegral
            }).then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.getList();
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                    }
                }
                )
        },
        integralBox1(name) {
            this.currentBoxPage1 = 1;
            this.boxBbuyerNick = name;
            this.currentBoxPage1 = 1;
            this.integralDetails(name);
            this.dialogTableVisible = true;
        },
        integralBox2(score, name) {
            this.form.updateIntegral = 0;
            this.form.currentScore = score;
            this.form.name2 = name;
            this.dialogFormVisible = true;
        },
        integralConfirm(name) {
            this.integralModify(name);
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
    background-color: #e6f3fc;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 45px;
    padding: 8px 16px;
}

.remarks {
    float: left;
    color: red;
}

.formBox {
    padding-left: 0px;
    padding-bottom: 1px;
}

.formBox .el-form-item {
    margin-bottom: 20px;
}

.line {
    text-align: center;
    line-height: 36px;
}

.el-icon-warning:before {
    padding-right: 8px;
}

.el-dialog__footer {
    padding: 115px 20px 15px!important;
}
</style>


