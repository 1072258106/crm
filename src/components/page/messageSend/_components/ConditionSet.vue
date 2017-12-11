<template>
    <div style="display:inline-block;">
        <el-button type="primary" size="small" @click="visible = true">筛选会员店铺</el-button>
        <el-dialog title="选择群发对象：筛选会员" @open="openDialog" :visible.sync="visible" size="large">
            <el-tag type="warning" class="margin-bottom-20" v-if="!isSync">
                    <i class="el-icon-information"></i>您还没有同步好店铺会员，当前无法筛选出结果！
                    <router-link to="/member">立即前去同步</router-link>
            </el-tag>
            <condition-set :condition="condition"></condition-set>
            <div class="text-center">
                <el-button type="warning" @click="search">确认筛选</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import conditionSet from '../../../common/ConditionSet'
export default {
    components: {
        conditionSet
    },
    data() {
        return {
            visible: false,
            isSync: true,
            condition: {
                area: [],
                lastTradeTime: {
                    min: '',
                    max: ''
                },
                tradeAmount: {
                    min: 0,
                    max: 0
                },
                avgPrice: {
                    min: 0,
                    max: 0
                },
                tradeCount: {
                    min: 0,
                    max: 0
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
                orderFrom: ["WAP", "HITAO", "TOP", "TAOBAO", "JHS"],
            }
        }
    },
    mounted() {
        this.getSyncProcess();
    },
    methods: {
        search() {
            this.$http.post('/activity/search?type=1', this.condition)
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        //弹窗确认人数
                        this.$confirm('共筛选出符合条件的会员:' + responseData.data.mobile + "个,是否确定？", '筛选结果', {
                            type: 'warning'
                        })
                            .then(
                            () => {
                                this.searchResult();
                            }
                            ).catch(
                            () => {

                            }
                            );

                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        searchResult() {
            this.$http.post('/activity/search', this.condition)
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        //返回结果
                        const file = {
                            uid: Date.parse(new Date()),
                            name: '筛选会员',
                            percentage: 100,
                            number: responseData.data.mobile
                        };
                        this.$emit('condition-success', {
                            file: file,
                            total: responseData.data.total
                        })
                        this.visible = false;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        openDialog() {
            this.condition = {
                area: [],
                lastTradeTime: {
                    min: '',
                    max: ''
                },
                tradeAmount: {
                    min: 0,
                    max: 0
                },
                avgPrice: {
                    min: 0,
                    max: 0
                },
                tradeCount: {
                    min: 0,
                    max: 0
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
            };
        },
        getSyncProcess() {
            this.$http.get("http://memberapi.iqincheng.com/member/syncStatus").then(
                response => {
                    let res = response.data
                    if (res.code == 0) {
                        if(res.data.process == -1){
                            this.isSync = false
                        }
                    }
                }
            )
        },
    }

}
</script>

