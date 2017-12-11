<template>
    <div>
        <el-row class="data-container">
            <el-row>
                <div class="data-title">{{ step_id | title }}</div>
            </el-row>
            <el-row>
                <el-col :span="24" class="margin-bottom-20">
                    <div class="tz-alert primary">
                        <i class="el-icon-information"></i>
                        {{ step_id | desc }}
                        <a v-show="step_id == 1" class="link" target="_blank" href="https://ecrm.taobao.com/jxt/jxtHomepage.htm#//bvip.tmall.com/crm-settings/officialVipLevel.htm">去设置会员等级</a>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="groupList" border v-loading="listLoading">

                <el-table-column label="组名" min-width="180">
                    <template scope="scope">
                        <p>{{scope.row.groupName}}</p>
                        <groupNameDes :groupType="step_id" :description="scope.row.condition"></groupNameDes>
                    </template>
                </el-table-column>

                <el-table-column prop="userCount" label="会员人数" align="center" min-width="85"></el-table-column>
                <el-table-column prop="tradeCount" label="交易次数" align="center" min-width="85"></el-table-column>
                <el-table-column prop="tradeAmount" label="成交金额" align="center" min-width="85"></el-table-column>
                <el-table-column prop="avgPrice" label="客单均价" align="center" min-width="85"></el-table-column>
                <el-table-column prop="anmountRatio" label="成交占比" align="center" min-width="85"></el-table-column>
                <el-table-column prop="mobileNumber" label="手机号码" align="center" min-width="120"></el-table-column>
                <el-table-column label="操作" align="center" width="210">
                    <template scope="scope">
                        <member-list class="text-margin" :memberListId="scope.row.id"></member-list>
                        <!-- <el-button type="primary" size="mini" @click="getMemberList(scope.row.id)">查看会员</el-button> -->
                        <a class="text-margin" target="_blank" :href="globalUrl+'/memberGrouping/groupExport?token='+token+'&id='+scope.row.id">导出会员</a>
                        <a class="text-margin" target="_blank" :href="'/activity?id='+scope.row.id">立即营销</a>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import groupNameDes from './_components/GroupNameDes.vue'
import member_list from './_components/MemberList.vue'
export default {
    components: {
        'groupNameDes': groupNameDes,
        'member-list': member_list
    },
    data() {
        return {
            globalUrl:'',
            token:'',
            step_id: this.$route.params.type,
            groupList: [],
            memberList: [],
            memberListVisible: false,
            memberNumber: 0,
            memberListPage: 1,
            memberListPageSize: 10,
            currentGroupId: 0,
            listLoading: false
        }
    },
    mounted() {
        this.globalUrl = this.$store.state.memberGlobalUrl
        this.token = this.$store.state.token
        this.getGroupList()
    },
    computed: {
    },
    filters: {
        desc: function(value) {
            const descs = [
                '',
                '会员等级是同步淘宝官方的会员等级制度，',
                '卖家后台自定义的会员标签',
                '在本店产生过交易的次数',
                '针对在本店消费的不同的金额进行分组',
                '最近一次购买的时间来计算用户的活跃程度',
                '订单的交易来源，淘宝、聚划算、还是手淘',
                '根据手机的类型进行分组'
            ];
            return descs[value];
        },
        title: function(value) {
            const title = [
                '',
                '会员等级',
                '会员标签',
                '购买频次',
                '客单均价',
                '活跃程度',
                '订单来源',
                '手机类型'
            ];
            return title[value];
        }
    },
    beforeUpdate() {
        this.step_id = this.$route.params.type
    },
    methods: {
        getGroupList() {
            this.listLoading = true
            this.$http.get("http://memberapi.iqincheng.com/memberGrouping/groupList", {
                params: {
                    groupType: this.step_id
                }
            }).then(
                response => {
                    this.listLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.groupList = res.data.list
                    }
                }
                )
        },
        getMemberList(id) {
            this.currentGroupId = id
            this.$http.get("http://memberapi.iqincheng.com/memberGrouping/memberList", {
                params: {
                    id: this.currentGroupId,
                    page: this.memberListPage,
                    pageSize: this.memberListPageSize
                }
            }).then(
                response => {
                    this.memberListVisible = true
                    let res = response.data
                    this.memberList = res.data.list
                    this.memberNumber = res.data.total
                }
                )

        },
        memberListSizeChange(val) {//修改自定义名单每页显示个数
            this.customPageSize = val
            this.getMemberList()
        },
        memberListCurrentChange(val) {//修改自定义名单当前页
            this.customPage = val
            this.getMemberList()
        }
    },
    watch: {
        '$route'(to, from) {
            this.step_id = to.params.type
            this.getGroupList()
        }
    }

}
</script>

<style scoped>
.link {
    color: #58b7ff;
}

.data-container {
    border: 1px solid #e4e4e4;
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
    margin-bottom: 15px;
}

.change-page {
    margin-top: 15px;
    text-align: center;
}

.el-table .cell {
    padding: 0;
}
.text-margin{
    margin: 0 4px;
}
</style>
