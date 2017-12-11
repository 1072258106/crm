<template>
    <div class="black">
        <!-- 搜索两个黑名单列表 -->
        <el-row type="flex" justify="space-between" style="margin-bottom:16px;" class="search-box">
            <el-col :span="7" class="search_item">
                <label>
                    手机号：
                </label>
                <div>
                    <el-col :span="24">
                        <el-input v-model.number="mobile" placeholder="请输入手机号码"></el-input>
                    </el-col>
                </div>
            </el-col>

            <el-col :span="7" class="search_item text-right">
                <el-button type="primary" class="search-black" @click="searchTwoList">搜索</el-button>
            </el-col>

        </el-row>
        <!-- 中差评黑名单 -->
        <el-row class="data-container">
            <el-row>
                <div class="data-title">中差评黑名单</div>
            </el-row>
            <el-row style="margin:16px 0" class="tz-alert primary">
                <i class="el-icon-information"></i>&nbsp;中差评黑名单客户，在发短信的时候可以设置过滤黑名单不发短信</el-row>

            <el-table :data="BadReviewList" border style="width: 100%" v-loading="badReviewLoading">
                <el-table-column prop="nickName" label="会员昵称" align="left" min-width="100"></el-table-column>

                <el-table-column prop="mobile" label="手机号码" align="center" min-width="120"></el-table-column>

                <el-table-column prop="nums" label="中差评次数" align="center" width="100"></el-table-column>

                <el-table-column label="操作" align="center" width="98">
                    <template scope="scope">
                        <a href="javascript:;" @click="deleteBadReview(scope.row.id)">设为白名单</a>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="change-page" v-show="BadReviewNumber>10" @size-change="badReviewSizeChange" @current-change="badReviewCurrentChange" :current-page="BadReviewPage" :page-sizes="[10, 20, 30, 40]" :page-size="BadReviewPageSize" layout="total, sizes, prev, pager, next, jumper" :total="BadReviewNumber">
            </el-pagination>
        </el-row>
        <!--  自定义黑名单  -->
        <el-row class="data-container">
            <el-row>
                <div class="data-title">自定义黑名单</div>
            </el-row>
            <el-row style="margin:16px 0" class="tz-alert primary">
                <i class="el-icon-information"></i>&nbsp;手动添加黑名单，在发短信的时候可以设置过滤黑名单不发短信</el-row>
            <el-row style="margin:8px 0">
                <el-button type="primary" @click="showAddBlackBox" style="float:right">添加黑名单</el-button>
            </el-row>
            <el-table :data="customList" border style="width: 100%" v-loading="customLoading">
                <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>

                <el-table-column label="操作" align="center" width="98">
                    <template scope="scope">
                        <a href="javascript:;" @click="deleteCustom(scope.row.id)">设为白名单</a>
                    </template>
                </el-table-column>
            </el-table>

            <!-- confirm框 -->

            <el-dialog size="tiny" title="添加黑名单" :visible.sync="dialogFormVisible">
                <el-form class="dialog-col-form">
                    <el-form-item label-width="60px" label="手机号：">
                        <el-input v-model.number="addBlackValue"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer dialog-col-button" style="padding-bottom:6px;">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBlack">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 分页器 -->
            <el-pagination class="change-page" v-show="customNumber > 10" @size-change="customSizeChange" @current-change="customCurrentChange" :current-page="customPage" :page-size="customPageSize" layout="total, prev, pager, next, jumper" :total="customNumber">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            BadReviewNumber: 0,//中差评名单总数
            BadReviewPageSize: 10,//中差评名单默认的每页大小
            BadReviewPage: 1,//中差评名单默认页
            BadReviewList: [],//中差评名单列表
            customList: [],//自定义黑名单列表
            customNumber: 0,//自定义名单总数
            customPageSize: 10,//自定义名单默认的每页大小
            oldCuspageSize: 10,
            customPage: 1,//自定义名单默认页
            dialogFormVisible: false,//confirm框默认关闭状态
            addBlackValue: "",//添加的黑名单的号码
            mobile: '',
            badReviewLoading: false,
            customLoading: false
        }
    },
    methods: {
        searchTwoList() {
            if(this.mobile && typeof(this.mobile) != 'number'){
                this.alertFail('手机号格式不对')
                return
            }
            let mobile = this.mobile
            this.badReviewLoading = true
            this.customLoading = true
            this.$http.get("http://memberapi.iqincheng.com/backlist/bad", {
                params: {
                    pageSize: this.BadReviewPageSize,
                    page: this.BadReviewPage,
                    mobile: mobile
                }
            }).then(
                response => {
                    this.badReviewLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.BadReviewList = res.data.list
                        this.BadReviewNumber = res.data.total
                    }
                }
                )
            this.$http.get("http://memberapi.iqincheng.com//backlist/custom", {
                params: {
                    pageSize: this.customPageSize,
                    page: this.customPage,
                    mobile: mobile
                }
            }).then(
                response => {
                    this.customLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.customList = res.data.list
                        this.customNumber = res.data.total
                    }
                }
                )
        },
        getBadReviewList() {
            this.badReviewLoading = true
            this.$http.get("http://memberapi.iqincheng.com/backlist/bad", {
                params: {
                    pageSize: this.BadReviewPageSize,
                    page: this.BadReviewPage
                }
            }).then(
                response => {
                    this.badReviewLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.BadReviewList = res.data.list
                        this.BadReviewNumber = res.data.total
                    }
                }
                )
        },
        getCustomList() {
            this.customLoading = true
            this.$http.get("http://memberapi.iqincheng.com//backlist/custom", {
                params: {
                    pageSize: this.customPageSize,
                    page: this.customPage
                }
            }).then(
                response => {
                    this.customLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.customList = res.data.list
                        this.customNumber = res.data.total
                    }
                }
                )
        },
        addBlack() {
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.addBlackValue)) {
                this.alertFail('请输入正确手机号')
                return;
            }
            this.dialogFormVisible = false
            let params = {
                'mobile': this.addBlackValue
            }
            this.$http.post("http://memberapi.iqincheng.com/backlist/insert", params)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.alertSuccess('添加成功')
                        this.getCustomList()
                    } else {
                        this.alertFail('添加出错')
                    }
                }
                )

        },
        deleteCustom(val) {
            let params = {
                id: val
            }
            this.$http.post("http://memberapi.iqincheng.com/backlist/delete", params)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.alertSuccess('设置成功')
                        this.getCustomList()
                    } else {
                        this.alertFail('设置出错')
                    }
                }
                )
        },
        deleteBadReview(val) {
            let formdata = new FormData();
            formdata.append('id', val);
            this.$http.post("http://memberapi.iqincheng.com/backlist/badDelete", formdata)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.alertSuccess('删除成功')
                        this.getCustomList()
                    } else {
                        this.alertFail('删除出错')
                    }
                }
                )
        },
        alertSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        alertFail(msg) {
            this.$message.error(msg);
        },
        badReviewSizeChange(val) {//修改中差评名单每页显示个数
            this.BadReviewPageSize = val
            this.getBadReviewList()
        },
        badReviewCurrentChange(val) {//修改中差评当前页
            this.BadReviewPage = val
            this.getBadReviewList()
        },
        customSizeChange(val) {//修改自定义名单每页显示个数
            this.customPageSize = val
            this.getCustomList()
        },
        customCurrentChange(val) {//修改自定义名单当前页
            this.customPage = val
            this.getCustomList()
        },
        showAddBlackBox() {
            this.dialogFormVisible = true
            this.addBlackValue = ''
        }
    },
    mounted() {
        this.getBadReviewList()
        this.getCustomList()
    }
}
</script>
<style scoped>
.data-container {
    background: #fff;
    padding: 0 15px 20px;
    margin-bottom: 20px;
}

.data-title,
.common-title,
.msg-title {
    height: 47px;
    line-height: 47px;
    font-size: 18px;
    color: #666;
    font-weight: bold;
    border-bottom: 1px solid #e4e4e4;
}

.data-msg {
    font-size: 12px;
    margin: 16px 0;
}

.table_col {
    flex: 1;
}

.add_black {
    position: absolute;
    right: 15px;
    top: 54px;
}

.change-page {
    margin-top: 15px;
    text-align: center;
}

.dialog-col-form {
    float: left;
    width: 70%;
    margin-bottom: 20px;
    margin-top: 6px;
}

.search-box {
    padding: 16px;
    color: #666;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    overflow: auto;
    font-size: 14px;
    margin: 16px 0;
}
</style>
