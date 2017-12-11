<template>
    <div>
        <div class="seachBg">

            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="search_item">
                    <label>手机号码：</label>
                    <div>
                        <el-col :span="24">
                            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                        </el-col>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>短信文案：</label>
                    <div>
                        <el-input v-model="form.keyword" placeholder="关键词 "></el-input>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item">
                    <label>
                        发送日期：
                    </label>
                    <div>
                        <el-col :span="11">
                            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width:100%">
                            </el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="form.date2" type="date" placeholder="选择日期" style="width:100%">
                            </el-date-picker>
                        </el-col>
                    </div>
                </el-col>
            </el-row>

            <el-row type="flex" justify="space-between" style="margin-top:16px">
                <el-col :span="7" class="search_item">
                    <label>
                        发送状态：
                    </label>
                    <div>
                        <el-select v-model="form.status" placeholder="选择">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value "></el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="7" class="search_item text-right">
                    <a target="_blank" class="link buttons-right" :href="globalUrl+'/activity/export?token='+token+'&'+exportParams">导出</a>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-col>

            </el-row>
        </div>

        <div class="tz-alert primary margin-bottom-20" style="margin-top:16px;">
            <i class="el-icon-information"></i>
            短息回执在发送完成后72小时内统计完成，系统保留近30天的短信记录。
        </div>
        <!-- 表格 -->
        <div class="table-container">
            <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
                <el-table-column prop="batch_id" label="批次" width="160" align="center">
                </el-table-column>
                <el-table-column prop="message" label="信息内容" min-width="200" class-name="over-visible">
                    <template scope="scope ">
                        <div class="msg-content " :title="scope.row.message ">
                            {{ scope.row.message | overflow }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="115" align="center">
                </el-table-column>
                <el-table-column prop="mobile_type" label="号码类别" width="85">
                </el-table-column>
                <el-table-column prop="province_name" label="归属地">
                </el-table-column>
                <el-table-column prop="created_at" label="发送时间" width="135" align="center">
                </el-table-column>
                <el-table-column prop="callback_at" label="回执时间" width="135" align="center">
                </el-table-column>
                <el-table-column prop="callback_tip" label="回执标识" width="110">
                </el-table-column>
                <el-table-column prop="send_status_name" label="发送状态" width="85" align="left">
                </el-table-column>
            </el-table>
            <div class=" top16 bottom20 text-center ">
                <el-pagination v-if="total> 10" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" :total="total">
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
            token: '',
            globalUrl: '',
            total: 10,
            size: 10,
            currentPage: 1,
            tableData: [],
            form: {
                mobile: '',
                keyword: '',
                date1: '',
                date2: '',
                status: -1
            },
            statusOptions: [
                {
                    label: "全部",
                    value: -1
                },
                {
                    label: "成功",
                    value: 1
                },
                {
                    label: "失败",
                    value: 0
                },
                {
                    label: "未知",
                    value: 2
                }
            ],
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            tableLoading: false
        }
    },
    computed: {
        exportParams() {
            let start_time='', end_time='', id = ''
            if(this.form.date1) {
                start_time = this.changeTime(this.form.date1)
            }
            if(this.form.date2) {
                end_time = this.changeTime(this.form.date2, 2)
            }
            if(this.id) {
                id = this.id
            }
            let params = '&keyword='+ this.form.keyword + '&mobile=' + this.form.mobile + '&status=' + this.form.status + '&start_time=' + start_time + '&end_time=' + end_time + '&id='+id
            return params
        },
        id() {
            return this.$route.params.id;
        },
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
        changeTime(time, type){
            let result
            if(type == 2){
                result = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' 23:59:59'
            }else{
                result = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' 00:00:00'
            }
            return result
        },
        handleCurrentChange(val) {
            this.getList();
        },
        getList() {
            let date1, date2;
            this.form.date1 != '' ? date1 = formatDate(this.form.date1) : date1 = '';
            this.form.date2 != '' ? date2 = formatDate(this.form.date2) : date2 = '';
            this.tableLoading = true;
            this.$http.get('/activity/records', {
                params: {
                    id: this.id,
                    keyword: this.form.keyword,
                    mobile: this.form.mobile,
                    status: this.form.status,
                    start_time: date1,
                    end_time: date2,
                    page: this.currentPage,
                    page_size: this.pageSize,
                }
            }).then(
                response => {
                    this.tableLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.tableData = responseData.data.list;
                        this.total = responseData.data.total;
                    }
                }
                )
        },
        onSubmit() {
            this.getList();
        }
    },
    mounted() {
        this.token = this.$store.state.token
        this.globalUrl = this.$store.state.globalApi
        this.getList();
    }
}
</script>

<style scoped lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
    span {
        width: 25%;
        display: block;
        float: left;
        line-height: 36px;
        font-size: 13px;
        padding-left: 20px;
    }
}

.btnStyle {
    text-align: center;
    margin-top: 36px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}


.line {
    text-align: center;
    line-height: 36px;
}


// 表格
.table-common {
    font-size: 12px;
    color: #666666;
}

//分页
.top16 {
    margin-top: 16px;
}

.msg-content {
    position: relative;
}


.msg-flow {
    display: none;
    position: absolute;
    bottom: -20px;
    right: -20px;
    margin: auto;
    height: 50px;
    width: 200px;
    background: #fff;
}

.el-table .over-visible .cell {
    overflow: visible;
}

.link {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid rgb(191, 203, 217);
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.link:hover{
    opacity: 0.8;
}
</style>

