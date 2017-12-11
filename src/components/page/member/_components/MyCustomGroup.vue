<template>
    <div>
        <el-table :data="groupList" border :expand-row-keys="expands" row-key="id" @row-click="changeExpand" v-loading="groupLoading">
            <el-table-column label="condition" align="center" type="expand">
                <template scope="scope">
                    <div class="line"></div>
                    <el-row class="condition-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">最后交易时间：</el-col>
                            <el-col :span="18">{{ scope.row.condition.lastTradeTime | conditionContent('1') }}</el-col>
                        </el-col>
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">成交金额：</el-col>
                            <el-col :span="18">{{ scope.row.condition.tradeAmount | conditionContent('2') }}</el-col>
                        </el-col>
                    </el-row>
                    <el-row class="condition-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">客单均价：</el-col>
                            <el-col :span="18">{{ scope.row.condition.avgPrice | conditionContent('2') }}</el-col>
                        </el-col>
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">交易笔数：</el-col>
                            <el-col :span="18">{{ scope.row.condition.tradeCount | conditionContent('3') }}</el-col>
                        </el-col>
                    </el-row>
                    <el-row class="condition-row goods-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">已购买宝贝：</el-col>
                            <el-col :span="18">
                                <a class="goods" v-for="item in scope.row.condition.tradeItems.tradeItemsDetail" :href="'https://detail.tmall.com/item.htm?id='+item.numIid" target="_blank" :key="item.numIid">
                                    <img class="inline-img" :src="item.picUrl" :alt="item.title" :title="item.title">
                                </a>
                            </el-col>
                        </el-col>
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">未购买宝贝：</el-col>
                            <el-col :span="18">
                                <a class="goods" v-for="item in scope.row.condition.disTradeItems.disTradeItemsDetail" :href="'https://detail.tmall.com/item.htm?id='+item.numIid" target="_blank" :key="item.numIid">
                                    <img :src="item.picUrl" :alt="item.title" :title="item.title">
                                </a>
                            </el-col>
                        </el-col>
                    </el-row>

                    <el-row class="condition-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">卖家旗帜：</el-col>
                            <el-col :span="18" style="line-height:18px;">
                                <span class="inline-block" v-show="scope.row.condition.flag.indexOf(0) >= 0">无标旗</span>
                                <img class="inline-block" v-show="scope.row.condition.flag.indexOf(1) >= 0" src="../../../../../static/img/flag1.png" alt="">
                                <img class="inline-block" v-show="scope.row.condition.flag.indexOf(2) >= 0" src="../../../../../static/img/flag2.png" alt="">
                                <img class="inline-block" v-show="scope.row.condition.flag.indexOf(3) >= 0" src="../../../../../static/img/flag3.png" alt="">
                                <img class="inline-block" v-show="scope.row.condition.flag.indexOf(4) >= 0" src="../../../../../static/img/flag4.png" alt="">
                                <img class="inline-block" v-show="scope.row.condition.flag.indexOf(5) >= 0" src="../../../../../static/img/flag5.png" alt="">
                            </el-col>
                        </el-col>
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">会员等级：</el-col>
                            <el-col :span="18">
                                <span v-if="scope.row.condition.grade.length>=5">不限</span>
                                <span v-else>
                                    <span v-show="scope.row.condition.grade.indexOf(0) >= 0">店铺会员</span>
                                    <span v-show="scope.row.condition.grade.indexOf(1) >= 0">普通会员</span>
                                    <span v-show="scope.row.condition.grade.indexOf(2) >= 0">高级会员</span>
                                    <span v-show="scope.row.condition.grade.indexOf(3) >= 0">VIP会员</span>
                                    <span v-show="scope.row.condition.grade.indexOf(4) >= 0">高级会员</span>
                                </span>
                            </el-col>
                        </el-col>
                    </el-row>

                    <el-row class="condition-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">交易来源：</el-col>
                            <el-col :span="18">
                                <span v-if="scope.row.condition.orderFrom.length>=5">不限</span>
                                <span v-else>
                                    <span v-show="scope.row.condition.orderFrom.indexOf('WAP') >= 0">手机</span>
                                    <span v-show="scope.row.condition.grade.indexOf('HITAO') >= 0">嗨淘</span>
                                    <span v-show="scope.row.condition.grade.indexOf('TOP') >= 0">TOP平台</span>
                                    <span v-show="scope.row.condition.grade.indexOf('TAOBAO') >= 0">淘宝</span>
                                    <span v-show="scope.row.condition.grade.indexOf('JHS') >= 0">聚划算</span>
                                </span>
                            </el-col>
                        </el-col>
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">过滤黑名单：</el-col>
                            <el-col :span="18">
                                <span v-show="scope.row.condition.black == 1">是</span>
                                <span v-show="scope.row.condition.black == 2">否</span>
                            </el-col>
                        </el-col>
                    </el-row>

                    <el-row class="condition-row">
                        <el-col class="condition-item" :span="12">
                            <el-col class="condition-item-title" :span="6">地区：</el-col>
                            <el-col :span="18">
                                <span v-for="item in areaIdToName(scope.row.condition.area)" :key="item.area">{{item}}</span>
                            </el-col>
                        </el-col>
                    </el-row>

                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="组名" align="left" min-width="120"></el-table-column>
            <el-table-column prop="userCount" label="会员人数" align="center" min-width="85"></el-table-column>
            <el-table-column prop="mobileNumber" label="手机号码数" align="center" min-width="100"></el-table-column>
            <el-table-column label="操作" align="center" width="270">
                <template scope="scope">
                    <member-list class="text-margin" :memberListId="scope.row.id"></member-list>
                    <a class="text-margin" @click.stop="deleteCustom(scope.row.id)" href="javascript:;">删除分组</a>
                    <a class="text-margin" target="_blank" :href="globalUrl+'/memberGrouping/groupExport?token='+token+'&id='+scope.row.id">导出会员</a>
                    <a class="text-margin" target="_blank" :href="'/activity?id='+scope.row.id">立即营销</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- <el-pagination class="change-page" v-show="groupListNumber > 10" @current-change="pageChange" :current-page="groupListPage" layout="total, prev, pager, next, jumper" :total="groupListNumber">
        </el-pagination> -->
    </div>
</template>

<script>
import memberList from './MemberList.vue'
export default {
    data() {
        return {
            expands:[],
            globalUrl:'',
            token:'',
            groupList: [],
            areaList: [],
            groupListNumber:0,
            groupListPage:1,
            conditionResult: {
                tradeAmount: '',
                groupType: {
                    type: Number
                }
            },
            memberListId: {
                type: Number
            },
            groupLoading: false
        }
    },
    components: {
        'member-list': memberList
    },
    props: {
        getListAgain: {
            type: Number
        },
        isAdd:{}
    },
    mounted() {
        this.globalUrl = this.$store.state.memberGlobalUrl
        this.token = this.$store.state.token
        this.getCustomGroupList()
        this.getAreaList()
    },
    watch: {
        'isAdd.isAdd': function(){
            this.getCustomGroupList()
        }
    },
    methods: {
        getCustomGroupList() {
            this.groupLoading = true;
            this.$http.get("http://memberapi.iqincheng.com/memberGrouping/groupList?groupType=9").then(
                response => {
                    this.groupLoading = false;
                    if (response.data.code == 0) {
                        if (response.data.data.list.length > 0) {
                            this.groupList = response.data.data.list
                            this.groupListNumber = response.data.data.total
                            this.expands.push(response.data.data.list[0].id)
                        }
                    }
                }
            )
        },
        deleteCustom(id) {
            let params = {
                'id': id
            }
            // let formdata = new FormData();
            // formdata.append('id', id);
            this.$http.post("http://memberapi.iqincheng.com/memberGrouping/groupDelete", params)
                .then(
                response => {
                    if (response.data.data == 1) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getCustomGroupList()
                    } else {
                        this.$message.error('删除失败')
                    }
                }
                )
        },
        changeExpand(row) {
            if(this.expands[0] == row.id){
                this.expands.splice(0,1)
                return
            }
            this.expands.splice(0,1)
            this.expands.push(row.id)
        },
        getAreaList() {
            this.$http.get("http://memberapi.iqincheng.com/memberGrouping/areaList")
                .then(
                response => {
                    this.areaList = response.data.data.list
                }
                )
        },
        areaIdToName(idList) {
            for (var i = 0; i < idList.length; i++) {
                for (var j = 0; j < this.areaList.length; j++) {
                    if (idList[i] == this.areaList[j].areaId) {
                        idList[i] = this.areaList[j].name
                        break;
                    }
                }
            }
            return idList
        },
        pageChange (val) {
            this.groupListPage = val
        }

    },
    filters: {
        conditionContent: function(condition, conditionType) {
            let result
            if (conditionType == 1) {//天数
                if (condition.min == -1 && condition.max == -1) {
                    result = '不限'
                } else {
                    result = condition.min + '  至  ' + condition.max
                }
            }
            if (conditionType == 2) {//交易金额,客单均价
                if (condition.min == -1 && condition.max == -1) {
                    result = '不限'
                } else if (condition.max == -1) {
                    result = condition.min + '以上'
                } else {
                    result = condition.min + '  至  ' + condition.max + '元'
                }
            }
            if (conditionType == 3) {//交易笔数
                if (condition.min == -1 && condition.max == -1) {
                    result = '不限'
                } else if (condition.min == 1 && condition.max == 1) {
                    result = '1笔'
                } else if (condition.min == 2 && condition.max == -1) {
                    result = '2笔以上'
                } else {
                    result = condition.min + '  至  ' + condition.max + '笔'
                }
            }
            return result
        },
        // flags: function (value) {
        //   let result = ''
        //   if()
        // }
    }
}
</script>
<style scoped>
.goods {
    display: inline;
}

.inline-img {
    display: inline;
    max-width: 100%;
    height: 20px;
    padding: 4px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
}



.condition-item span {
    margin-right: 8px;
}




/* 9.25加 */

.condition-item-title {
    text-align: right;
}
.text-margin{
    margin: 0 4px;
}

.condition-item div:first-child{
    padding-right: 8px;
}
.condition-item {
    height: 14px;
    line-height: 14px;
    margin-bottom: 8px;
}

.goods-row .condition-item {
    height: 30px;
    line-height: 30px;
}
.line{
    position: absolute;
    height: 165px;
    width: 1px;
    background:#ccc;
    left: 0;
    right: 0;
    margin:auto;
    top:0;
    bottom: 0;
    box-sizing: border-box;
}
.change-page{
    margin-top:16px;
}
.inline-block{
    display: inline-block;
    float: left;
}
</style>
