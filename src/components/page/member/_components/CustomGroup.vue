<template>
    <div>
            <el-tag type="warning" class="margin-bottom-20" v-if="!isSync">
                    <i class="el-icon-information"></i>您还没有同步好店铺会员，当前无法筛选出结果！
                    <router-link to="/member">立即前去同步</router-link>
            </el-tag>
            <el-row class="custom-groupname custom-group-item">
                <el-col class="custom-title" :span="3">
                    组名：
                </el-col>
                <el-col class="custom-content" :offset="1" :span="20">
                    <el-input v-model="groupName" style="width:30%" aria-required="用户组必填"></el-input>
                    <span class="err" v-show="isTipShow">请先填写组名</span>
                </el-col>
            </el-row>
            <keep-alive>
            <condition-set :bak-condition="bakCondition" :condition="condition"></condition-set>
            </keep-alive>
            <el-row class="btn-container">
                <el-button :disabled="!canSubmite" @click="setCustomGroup" type="primary" class="btn">提交</el-button>
            </el-row>
    </div>
</template>
<script>
import { formatDate } from "../../../../function/formatDate.js"
import conditionSet from "../../../common/ConditionSet.vue"
export default {
    components:{
        'condition-set': conditionSet
    },
    props: {
        getListAgain: {
            type: Number
        },
       isAdd: {}
    },
    data() {
        return {
            bakCondition:{},
            canSubmite: false,
            isTipShow: true,
            groupName: '',
            isSync: true,
            condition: {
                area: [],
                lastTradeTime: {
                    min: '',
                    max: ''
                },
                tradeAmount: {
                    min: '',
                    max: ''
                },
                avgPrice: {
                    min: '',
                    max: ''
                },
                tradeCount: {
                    min: '',
                    max: ''
                },
                tradeItems: {
                    ids: [],
                    title: ''
                },
                disTradeItems: {
                    ids: [],
                    title: ''
                },
                grade: [0, 1, 2, 3, 4],
                flag: [0, 1, 2, 3, 4, 5],
                black: 1,
                orderFrom: ["WAP", "HITAO", "TOP", "TAOBAO", "JHS"]
            }

        }
    },
    mounted() {
        this.bakCondition = this.cloneObj(this.condition)
        this.getSyncProcess()
    },
    watch: {
        'areaInfo.list': function() {
            this.condition.area = this.areaInfo.list
        },
        groupName: function() {
            if(this.groupName){
                this.canSubmite = true
                this.isTipShow = false
            }else{
                this.canSubmite = false
                this.isTipShow = true
            }
        }
    },
    methods: {
        cloneObj(obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return
            } else if (window.JSON) {
                str = JSON.stringify(obj), //系列化对象
                    newobj = JSON.parse(str) //还原
            } else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                        cloneObj(obj[i]) : obj[i];
                }
            }
            return newobj
        },
        setCustomGroup() {
            if (!this.groupName) {
                this.isTipShow = true
                return
            }
            let params = {
                groupName: this.groupName,
                condition: JSON.stringify(this.condition)
            }
            this.$http.post("http://memberapi.iqincheng.com/memberGrouping/groupCreate", params)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        this.isAdd.isAdd = !this.isAdd.isAdd
                        this.condition = this.cloneObj(this.bakCondition)
                        this.groupName = ''
                    } else {
                        this.$message.error('创建失败')
                    }
                }
                )
        },
        getSyncProcess() {
            this.$http.get("http://memberapi.iqincheng.com/member/syncStatus").then(
                response => {
                    let res = response.data               
                    if (res.code == 0) {
                        if(res.data.process == -1){
                            this.isSync = true
                        }
                    }
                }
            )
        },
    }
}
</script>
<style scoped>
.custom-group-item {
    margin-bottom: 15px;
}

.custom-title {
    text-align: right;
    line-height: 36px;
    font-size: 14px;
}

.trade_time-button,
.select-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background: #fff;
    border: 1px solid rgb(191, 203, 217);
    color: rgb(31, 45, 61);
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
}

.select-button {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff;
}

.condition-p {
    color: #333;
    font-weight: bold;
    margin: 20px 0;
}

.filterbox-checkbox {
    margin-top: 7px;
}

.err {
    color: #ff4949;
    font-size: 12px;
}
.btn-container{
    padding:8px 16px;
    background: #E6F3FC;
}
.btn{
    float: right;
}
</style>

