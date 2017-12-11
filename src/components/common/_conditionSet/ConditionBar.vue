<template>
    <el-col class="custom-content" :offset="1" :span="20">
        <el-radio-group v-model="conditionInfoRidio" @change="chooseConditionResult" style="display:inline-block;float:left">
            <el-radio-button :key="item.des" v-for="item in details" :label="item.label">{{item.des}}</el-radio-button>
        </el-radio-group>
        <div v-show="boxVisible" style="display:inline-block;width:220px;float:left;margin-left:8px;line-height:36px;">
            <el-col :span="9">
                <el-input v-model.number="customConditionResult.min"></el-input>
            </el-col>
            <el-col :span="2" style="text-align:center;line-height:36px;">-</el-col>
            <el-col :span="9">
                <el-input v-model.number="customConditionResult.max"></el-input>
            </el-col>
            <el-col :span="4">
                <!-- <a class="btn" href="javascript:;" @click="cancelSet">取 消</a> -->
                <!-- <a class="btn"  href="javascript:;" @click="setConditionResult">确 定</a> -->
                <el-button size="small" @click="setConditionResult" style="margin-left:4px;">确 定</el-button>
            </el-col>
        </div>
        <div v-show="!boxVisible" @click="clickTradeTimeButton" :class="conditionInfoRidio == 4? 'select-button':'trade_time-button'" style="display:inline-block;float:left;margin-left:4px;">{{btnText}}</div>
        <!-- <el-dialog size="tiny" :title="boxTitle" :visible.sync="boxVisible">
                <el-col :span="6"><el-input v-model.number="customConditionResult.min"></el-input></el-col>
                <el-col :span="2" style="text-align:center;line-height:36px;">-</el-col>
                <el-col :span="6"><el-input v-model.number="customConditionResult.max"></el-input></el-col>
                <div slot="footer" class="dialog-footer dialog-col-button" style="padding-bottom:6px;">
                    <el-button @click="boxVisible = false">取 消</el-button>
                    <el-button type="primary" @click="setConditionResult">确 定</el-button>
                </div>
        </el-dialog> -->
    </el-col>
</template>
<script>
export default {
    data() {
        return {
            boxTitle: '',
            details: '',
            key: 1,
            conditionInfoRidio: 0,
            oldConditionInfoRidio: 0,
            boxVisible: false,
            btnText: '指定',
            customConditionResult: {
                min: '',
                max: ''
            },
            threeType: {
                tradeCount: {
                    details: [
                        {
                            des: '不限',
                            label: 0,
                            value: {
                                min: -1,
                                max: -1
                            }
                        },
                        {
                            des: '1笔',
                            label: 1,
                            value: {
                                min: 1,
                                max: 1
                            }
                        },
                        {
                            des: '2笔以上',
                            label: 2,
                            value: {
                                min: 2,
                                max: -1
                            }
                        }
                    ],
                    boxTitle: '指定订单笔数'
                },
                price: {
                    boxTitle: '指定客单均价',
                    details: [
                        {
                            des: '不限',
                            label: 0,
                            value: {
                                min: -1,
                                max: -1
                            }
                        },
                        {
                            des: '1-100元',
                            label: 1,
                            value: {
                                min: 1,
                                max: 100
                            }
                        },
                        {
                            des: '100元以上',
                            label: 2,
                            value: {
                                min: 100,
                                max: -1
                            }
                        }
                    ]
                },
                tradeAmount: {
                    boxTitle: '指定交易金额',
                    details: [
                        {
                            des: '不限',
                            label: 0,
                            value: {
                                min: -1,
                                max: -1
                            }
                        },
                        {
                            des: '1-100元',
                            label: 1,
                            value: {
                                min: 1,
                                max: 100
                            }
                        },
                        {
                            des: '100元以上',
                            label: 2,
                            value: {
                                min: 100,
                                max: -1
                            }
                        }
                    ]
                }
            }
        }
    },
    mounted() {
        this.boxTitle = this.threeType[this.type].boxTitle
        this.details = this.threeType[this.type].details
        this.chooseConditionResult()

    },
    watch: {
        conditionInfoRidio: function() {
            if (this.conditionInfoRidio != 4) {
                this.boxVisible = false
                this.btnText = '指定'
            }
        },
        conditionInfo: function() {
            this.conditionInfoRidio = 0
            this.oldConditionInfoRidio = 0
            this.customConditionResult.min = ''
            this.customConditionResult.max = ''
        }
    },
    props: {
        type: '',
        conditionInfo: {

        }
    },
    methods: {
        chooseConditionResult() {
            if (this.conditionInfoRidio == 4) {
                return
            }
            this.conditionInfo.min = this.details[this.conditionInfoRidio].value.min
            this.conditionInfo.max = this.details[this.conditionInfoRidio].value.max

        },
        clickTradeTimeButton() {
            this.oldConditionInfoRidio = this.conditionInfoRidio
            this.boxVisible = true
            // this.conditionInfoRidio = 4
        },
        setConditionResult() {
            if (typeof (this.customConditionResult.min) != 'number' || typeof (this.customConditionResult.max) != 'number') {
                alert('请输入数字')
                return
            }
            this.conditionInfoRidio = 4//在点击确定按钮后，才显示选中
            this.boxVisible = false
            if (!this.customConditionResult.min) {
                this.conditionInfo.min = -1
            } else {
                this.conditionInfo.min = this.customConditionResult.min
            }
            if (!this.customConditionResult.max) {
                this.conditionInfo.max = -1
            } else {
                this.conditionInfo.max = this.customConditionResult.max
            }
            if (this.conditionInfo.min == -1 && this.conditionInfo.max == -1) {
                this.btnText = '不限'
            } else if (this.conditionInfo.max == -1) {
                this.btnText = this.conditionInfo.min + '以上'
            } else if (this.conditionInfo.min == -1) {
                this.btnText = this.conditionInfo.max + '以下'
            } else {
                this.btnText = this.conditionInfo.min + '  至  ' + this.conditionInfo.max
            }
        }
    }
}
</script>
<style scope>
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
    color: #f7ba2a;
    margin: 20px 0;
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
