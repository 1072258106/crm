<template>
    <div>
        <el-row class="custom-groupname custom-group-item">
            <el-col class="custom-title" :span="3">最后交易时间：</el-col>
            <el-col class="custom-content" :offset="1" :span="20">
                <el-radio-group v-model="lastTradeTimeRidio" @change="getLastTradeTime" class="inline-block">
                    <el-radio-button :label="1">不限</el-radio-button>
                    <el-radio-button :label="2">近30天</el-radio-button>
                    <el-radio-button :label="3">近90天</el-radio-button>
                </el-radio-group>
                <div class="inline-block my-time-picker" v-show="timeChooseBoxVisible">
                    <el-col :span="9">
                        <el-date-picker style="width:100%;" v-model="customLastTradeTime.min" type="date" placeholder="选择日期"></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center;line-height:36px;">-</el-col>
                    <el-col :span="9">
                        <el-date-picker style="width:100%;" v-model="customLastTradeTime.max" type="date" placeholder="选择日期"></el-date-picker>
                    </el-col>
                    <el-col :span="3" style="line-height:36px;">
                        <!-- <a class="btn" href="javascript:;" @click="cancelSet">取 消</a> -->
                        <!-- <a class="btn"  href="javascript:;" @click="setCustomLastTradeTime(customLastTradeTime)">确 定</a> -->
                        <el-button @click="setCustomLastTradeTime(customLastTradeTime)" size="small" style="margin-left:4px;">确定</el-button>
                    </el-col>
                </div>
                <div v-show="!timeChooseBoxVisible" @click="clickTradeTimeButton" :class="lastTradeTimeRidio == 4? 'select-button':'trade_time-button'" class="inline-block" style="margin-left:4px;">{{btnText}}</div>
            </el-col>
        </el-row>
        <el-row class="custom-tradeamount custom-group-item">
            <el-col class="custom-title" :span="3">交易金额：</el-col>
            <condition-bar type="tradeAmount" :conditionInfo="condition.tradeAmount"></condition-bar>
        </el-row>
        <el-row class="custom-avg custom-group-item">
            <el-col class="custom-title" :span="3">客单均价：</el-col>
            <condition-bar type="price" :conditionInfo="condition.avgPrice"></condition-bar>
        </el-row>
        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">订单笔数：</el-col>
            <condition-bar type="tradeCount" :conditionInfo="condition.tradeCount"></condition-bar>
        </el-row>
        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">所在地区：</el-col>
            <choose-area :areaInfo="areaInfo" :reset="areaReset"></choose-area>
        </el-row>
        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">购买过的宝贝：</el-col>
            <select-goods :goodsInfo="condition.tradeItems"></select-goods>
        </el-row>
        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">未购买过的宝贝：</el-col>
            <select-goods :goodsInfo="condition.disTradeItems"></select-goods>
        </el-row>
        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">会员等级：</el-col>
            <el-col class="custom-content" :offset="1" :span="20">
                <el-checkbox-group v-model="condition.grade" class="filterbox filterbox-checkbox">
                    <el-checkbox :label="0">店铺会员</el-checkbox>
                    <el-checkbox :label="1">普通会员</el-checkbox>
                    <el-checkbox :label="2">高级会员</el-checkbox>
                    <el-checkbox :label="3">VIP会员</el-checkbox>
                    <el-checkbox :label="4">至尊VIP会员</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>

        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">交易来源：</el-col>
            <el-col class="custom-content" :offset="1" :span="20">
                <el-checkbox-group v-model="condition.orderFrom" class="filterbox filterbox-checkbox">
                    <el-checkbox :label="'WAP'">手机</el-checkbox>
                    <el-checkbox :label="'HITAO'">嗨淘</el-checkbox>
                    <el-checkbox :label="'TOP'">TOP平台</el-checkbox>
                    <el-checkbox :label="'TAOBAO'">淘宝</el-checkbox>
                    <el-checkbox :label="'JHS'">聚划算</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>

        <el-row class="custom-count custom-group-item">
            <el-col class="custom-title" :span="3">卖家旗帜：</el-col>
            <el-col class="custom-content" :offset="1" :span="20">
                <el-checkbox-group v-model="condition.flag" class="checkbox filterbox filterbox-checkbox">
                    <el-checkbox :label="0">无标旗</el-checkbox>
                    <el-checkbox :label="1"><img src="../../../static/img/flag1.png" alt=""></el-checkbox>
                    <el-checkbox :label="2"><img src="../../../static/img/flag2.png" alt=""></el-checkbox>
                    <el-checkbox :label="3"><img src="../../../static/img/flag3.png" alt=""></el-checkbox>
                    <el-checkbox :label="4"><img src="../../../static/img/flag4.png" alt=""></el-checkbox>
                    <el-checkbox :label="5"><img src="../../../static/img/flag5.png" alt=""></el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>

        <el-row class="custom-groupname custom-group-item">
            <el-col class="custom-title" :span="3">过滤黑名单：</el-col>
            <el-col class="custom-content filterbox-checkbox" :offset="1" :span="20">
                <el-radio class="radio" v-model="condition.black" :label="1">是</el-radio>
                <el-radio class="radio" v-model="condition.black" :label="2">否</el-radio>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { formatDate } from "../../function/formatDate.js"
import { cloneObj } from "../../function/cloneObj.js"
import conditionBar from './_conditionSet/ConditionBar.vue'
import chooseArea from './_conditionSet/ChooseArea.vue'
import selectGoods from './_conditionSet/SelectGoods.vue'
export default {
    components: {
        'condition-bar': conditionBar,
        'choose-area': chooseArea,
        'select-goods': selectGoods
    },
    props: {
        getListAgain: {
            type: Number
        },
        condition: {},
        bakCondition: {},
        isAdd: {}
    },
    data() {
        return {
            lastTradeTimeRidio: 1,
            oldLastTradeTimeRidio: 1,
            btnText: '指定',
            timeChooseBoxVisible: false,
            customLastTradeTime: {
                min: '',
                max: ''
            },
            areaInfo: {
                list: []
            },
            areaReset: false
        }
    },
    mounted() {
        this.getLastTradeTime()
    },
    watch: {
        'areaInfo.list': function() {
            this.condition.area = this.areaInfo.list
        },
        groupName: function() {
            this.canSubmite = false
        },
        condition: function() {
            this.lastTradeTimeRidio = 1//最近交易时间改为不限
            this.oldLastTradeTimeRidio = 1//最近交易时间改为不限
            this.customLastTradeTime.min = ''//最近交易时间改为不限
            this.customLastTradeTime.max = ''//最近交易时间改为不限
            this.timeChooseBoxVisible = false
            this.areaReset = !this.areaReset//地区改变
        },
        lastTradeTimeRidio: function() {
            if (this.lastTradeTimeRidio != 4) {
                this.btnText = '指定'
                this.timeChooseBoxVisible = false
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
            let condition = this.cloneObj(this.condition)
            condition.tradeAmount = condition.tradeAmount.result
            condition.avgPrice = condition.avgPrice.result
            condition.tradeCount = condition.tradeCount.result
            let params = {
                groupName: this.groupName,
                condition: JSON.stringify(condition)
            }
            // let formdata = new FormData()
            // formdata.append('groupName', this.groupName)
            // formdata.append('condition', condition)
            this.$http.post("http://memberapi.iqincheng.com/memberGrouping/groupCreate", params)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        this.isAdd.isAdd = !this.isAdd.isAdd
                    } else {
                        this.$message.error('删除失败')
                    }
                }
                )
        },
        computeDate(day) {
            let today = new Date()
            let todayStr = Date.parse(new Date())
            let intervalStr = day * 60 * 60 * 24 * 1000//时间戳间隔
            let minTradeTimeStr = todayStr - intervalStr//计算出小的时间戳 
            let minTradeTime = formatDate(minTradeTimeStr)
            return minTradeTime
        },
        getLastTradeTime() {
            let today = new Date()
            if (this.lastTradeTimeRidio == 1) {
                this.condition.lastTradeTime.min = -1
                this.condition.lastTradeTime.max = -1
            }
            if (this.lastTradeTimeRidio == 2) {
                this.condition.lastTradeTime.max = formatDate(today)
                this.condition.lastTradeTime.min = this.computeDate(30)
            }
            if (this.lastTradeTimeRidio == 3) {
                this.condition.lastTradeTime.max = formatDate(today)
                this.condition.lastTradeTime.min = this.computeDate(90)
            }
        },
        clickTradeTimeButton() {
            this.oldLastTradeTimeRidio = this.lastTradeTimeRidio
            this.timeChooseBoxVisible = true
            // this.lastTradeTimeRidio = 4
        },
        setCustomLastTradeTime() {
            this.lastTradeTimeRidio = 4 //在点击确定按钮后，才显示选中
            this.timeChooseBoxVisible = false
            if (!this.customLastTradeTime.min) {
                this.condition.lastTradeTime.min = -1
            } else {
                this.condition.lastTradeTime.min = formatDate(this.customLastTradeTime.min)
            }
            if (!this.customLastTradeTime.max) {
                this.condition.lastTradeTime.max = -1
            } else {
                this.condition.lastTradeTime.max = formatDate(this.customLastTradeTime.max)
            }
            if (this.condition.lastTradeTime.min == -1 && this.condition.lastTradeTime.max == -1) {
                this.btnText = '不限'
            } else if (this.condition.lastTradeTime.max == -1) {
                this.btnText = this.condition.lastTradeTime.min + '之后'
            } else if (this.condition.lastTradeTime.min == -1) {
                this.btnText = this.condition.lastTradeTime.max + '之前'
            } else {
                this.btnText = this.condition.lastTradeTime.min + '  至  ' + this.condition.lastTradeTime.max
            }
        },
        cancelSet() {
            this.timeChooseBoxVisible = false
            this.lastTradeTimeRidio = this.oldLastTradeTimeRidio
        }
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

.inline-block {
    display: inline-block;
    float: left;
}

.my-time-picker {
    width: 320px;
    margin-left: 8px;
}

.btn {
    font-size: 12px;
    margin-left: 4px;
}

.btn:hover {
    background: #20a0ff;
    color: #fff;
}
</style>


