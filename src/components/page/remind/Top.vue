<template>
    <div class="table-container">
        <table class="tabled" v-for="(item, index) in lists" :key="index" style="margin-bottom:16px;">
            <tbody>
                <tr class=" top_title">
                    <td style="width:162px;">
                        <span class="text-danger">TOP{{index + 1}}:</span> {{item.shop_name}}</td>
                    <td>催单成功率
                        <span class="text-danger">{{item.ratio}}</span>%</td>
                    <td>成功催付订单数：
                        <span class="text-danger">{{item.success_count}}</span>
                    </td>
                    <td>成功催付金额：
                        <span class="text-danger">{{item.success_money_count}}</span>
                    </td>
                </tr>
                <tr v-for="(step, key) in item.steps" :key="key">
                    <td colspan="5" class="left font">{{step.step_text || '暂无内容'}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lists: []
        }
    },
    methods: {
        getLists() {
            //获取接口
            this.$http.get('/remind/get_top_case')
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        console.info(responseData);
                        let data = responseData.data;
                        this.lists = data.list;
                        console.info(this.lists);
                    } else {
                        alert(responseData.message);
                    }
                }
                )
        }
    },
    filters: {
        time: function(value) {
            if (value < 60) {
                return value + "分钟";
            } else if (value < 60 * 24) {
                return Math.ceil(value / 60) + "小时";
            } else {
                return Math.ceil(value / (60 * 24)) + "天";
            }
        }
    },
    mounted() {
        this.getLists();
    }
}
</script>

<style lang="scss" scoped>
.tabled {
    width: 100%;
    line-height: 24px;
    text-align: left;
    border-collapse: collapse;
    border-bottom: 1px solid rgb(223, 230, 236);
    border-radius: 15px;
    font-size: 12px;
    background: #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    .title {
        background: #fff;
    }
    .top_title {
        border: 1px solid rgb(223, 230, 236);
        &>td {

            padding: 8px 18px 8px 18px;
            background: #eef1f6;
            color: rgb(31, 45, 61);
        }
    }
    tr {
        &:hover {
            background: #eef1f6!important;
        }
        td {
            border: 1px solid rgb(223, 230, 236);
            font-size: 12px;
            font-weight: bold;
            color: #989898;
            ;
            &:hover {
                background: #eef1f6!important;
            }
        }
        .left {
            text-align: left!important;
        }
        .font {
            color: #858585;
            padding: 8px 18px;
            font-weight: normal;
        }
    }
}
</style>


