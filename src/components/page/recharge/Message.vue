<template>
    <!-- 短信充值 -->
    <div>
        <el-table :data="msgData" border style="width: 100%" v-loading="dataLoading">
            <el-table-column prop="name" label="短信套餐" min-width="200" align="left">
                <template scope="scope">
                    <span type=" primary ">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="original_price1 " label="原价 " align="left " min-width="100">
                <template scope="scope ">
                    <span type="primary " class="text-uderline ">{{ scope.row.original_price }}分/每条</span>
                </template>
            </el-table-column>
            <el-table-column prop="unit_price " label="限时促销 " align="left " min-width="110">
                <template scope="scope ">
                    <span type="primary ">
                        <span>{{ scope.row.unit_price }}</span>分/每条</span>
                </template>
            </el-table-column>
            <el-table-column prop="price " label="套餐价格 " align="left " min-width="110">
                <template scope="scope">
                    <span type="primary ">
                        <span>{{ scope.row.price}}</span>元</span>
                </template>
            </el-table-column>
            <el-table-column prop="price " label="操作 " align="center" width="70">
                <template scope="scope">
                    <el-button size="small " type="text" @click="Recharge(scope.row.id)">充值</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-row :gutter="25" style="margin-top:16px; ">
            <el-col :span="6" v-for="(item,index) in saleData" :key="index">
                <div class="card">
                    <div class="left" style="border-right:1px solid #fff;">
                        <div>
                            ¥
                            <span>{{item.price}}</span>
                        </div>
                        <div class="tabfont">限时大促</div>
                    </div>
                    <div class="left">
                        <p>{{item.unit_price}}分/每条</p>
                        <p class="old">{{item.original_price}}分/每条</p>
                        <p>{{item.name.substr(9)}}</p>
                    </div>
                    <button @click="Recharge(item.id)">立即充值</button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msgData: [],
            saleData: [],
            page: {
                currentPage: 1,
                size: 10,
                total: 0
            },
            dataLoading: false
        }
    },
    methods: {
        // 充值
        Recharge(id) {
            let tempwindow = window.open('_blank');
            this.$http.get('/recharge/purchase', {
                params: {
                    pid: id,
                }
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        tempwindow.location = responseData.data.url;
                    } else {
                        alert(responseData.message);
                    }
                }
                )
        },
        getRechargeLists() {
            //短信充值
            this.dataLoading = true;
            this.$http.get('/recharge/recharge')
                .then(
                response => {
                    this.dataLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        let tpllist = [];
                        let salelist = [];
                        for (var index = 0; index < data.list.length; index++) {
                            var element = data.list[index];
                            if (element.name.indexOf('限时大促') < 0) {
                                tpllist.push(element);
                            }
                            if (element.name.indexOf('限时大促') > 0) {
                                salelist.push(element);
                            }
                        }
                        this.msgData = tpllist;
                        this.saleData = salelist;
                    } else {
                        alert(responseData.message);
                    }
                }
                )
        }
    },
    mounted() {
        this.getRechargeLists();
    }
}
</script>
<style lang="scss" scoped>
.card {
    height: 130px;
    box-sizing: border-box;
    width: 100%;
    background: #d24034;
    padding: 16px;
    color: #fff;
    &>div {
        width: 50%;
        height: 65%;
        box-sizing: border-box;
        text-align: center;
        b {
            display: block;
            float: left;
            width: 8px;
        }
        &>div {
            width: 100%;
            height: 50%;
        }
        @media (max-width:1365px) {
            span {
                font-size: 25px;
                font-weight: bold;
            }
        }
        @media (min-width:1365px) {
            span {
                font-size: 32px;
                font-weight: bold;
            }
        }
        p {
            width: 100%;
            font-size: 14px;
            padding-left: 8px;
        }
        .old {
            color: #f59f9e;
            text-decoration: line-through;
        }
    }
    button {
        width: 100%;
        background: #d89532;
        font-weight: bold;
        color: #ffffff;
        border: none;
        height: 26px;
        margin-top: 8px;
        &:hover {
            background: #f59b2e;
            cursor: pointer;
            border: none;
        }
    }
}

.tabfont {
    text-align: center;
    padding-top: 1px;
    color: #ffff8e;
    padding-left: 16px; // font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    box-sizing: border-box;
}

@media (max-width:1414px) {
    .tabfont {
        font-size: 17px;
    }
}

@media (min-width:1414px) {
    .tabfont {
        font-size: 19px;
    }
}

.left {
    float: left;
}
</style>

