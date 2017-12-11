<template>
    <!-- 查看会员 列表 -->
    <span>
        <a @click.stop="showMemberList" href="javascript:;">查看会员</a>
        <el-dialog title="查看会员" size="large" :visible.sync="memberListVisible">
            <el-table :data="memberList" border v-loading="memberLoading">
                <el-table-column min-width="110" prop="buyerNick" label="会员昵称" align="left"></el-table-column>

                <el-table-column prop="trueName" label="姓名" align="left" width="85"></el-table-column>

                <el-table-column min-width="105" label="会员等级" align="left">
                    <template scope="scope">
                        <span v-if="scope.row.grade == 0">店铺会员</span>
                        <span v-if="scope.row.grade == 1">普通会员</span>
                        <span v-if="scope.row.grade == 2">高级会员</span>
                        <span v-if="scope.row.grade == 3">VIP会员</span>
                        <span v-if="scope.row.grade == 4">至尊VIP会员</span>
                    </template>
                </el-table-column>

                <el-table-column prop="tradeCount" label="交易次数" align="center" width="85"></el-table-column>

                <el-table-column prop="tradeAmount" label="成交金额" align="center" width="85"></el-table-column>
                <el-table-column prop="avgPrice" label="客单均价" align="center" width="85"></el-table-column>
                <el-table-column prop="lastTradeTime" min-width="150" label="上次交易时间" align="center"></el-table-column>

                <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-show="totalMember>10" class="change-page" @current-change="showMemberList" :current-page.sync="page" :page-size="10" layout="prev, pager, next, jumper, total" :total="totalMember">
            </el-pagination>

            <div slot="footer" class="dialog-footer dialog-col-button" style="padding-bottom:6px;">
                <el-button @click.stop="memberListVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
    </span>
</template>
<script>
export default {
    data() {
        return {
            memberListVisible: false,
            page: 1,
            memberList: [],
            totalMember: 0,
            memberLoading: false
        }
    },
    props: {
        memberListId: {
            type: String
        }
    },
    mounted() {
        //this.showMemberList()
    },
    methods: {
        showMemberList() {
            this.memberListVisible = true;
            this.memberLoading = true;
            this.$http.get("http://memberapi.iqincheng.com/memberGrouping/memberList", {
                params: {
                    id: this.memberListId,
                    page: this.page,
                    pageSize: 10
                }
            }).then(
                response => {
                    this.memberLoading = false;
                    let res = response.data
                    if(res.code == 0) {
                        this.memberList = res.data.list
                        this.totalMember = res.data.total
                    }
                }
                )
        }
    }

}
</script>
<style scoped>
.change-page {
    margin-top: 15px;
    text-align: center;
}
</style>

