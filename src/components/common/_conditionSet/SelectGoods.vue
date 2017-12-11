<template>
    <el-col class="custom-content" :offset="1" :span="20">
        <div @click="noLimiteGoods" :class="goodsRadio == 1? 'select-button':'trade_time-button'">不限</div>
        <div v-if="goodsInfo.ids.length >= 1 " @click="getGoodsList" :class="goodsRadio == 2? 'select-button':'trade_time-button'">{{goodsInfo.ids.length}}件商品</div>
        <div v-else-if="goodsInfo.title" @click="getGoodsList" :class="goodsRadio == 2? 'select-button':'trade_time-button'">{{goodsInfo.title}}</div>
        <div v-else @click="getGoodsList" :class="goodsRadio == 2? 'select-button':'trade_time-button'">指定</div>
        <div class="goods-box" v-show="boxVisible">
            <h2>挑选宝贝</h2>
            <span class="close" @click="boxVisible = false">X</span>
            <el-tabs v-model="activeSearch" type="card">
                <el-tab-pane label="精确查询" name="1"></el-tab-pane>
                <el-tab-pane label="模糊查询" name="2"></el-tab-pane>
            </el-tabs>
            <div v-show="activeSearch == 1">
                <!-- <goods-list></goods-list> -->
                <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入商品名称" class="my-transfer my-transfer-luban item-select-pannel" v-model="filters.num_iid" :titles="['所有宝贝','筛选的宝贝']" :props="{key:'num_iid',label:'title'}" :render-content="renderFunc" :data="modal.item.list">
                    <update-goods class="transfer-footer" slot="left-footer" size="small"></update-goods>
                </el-transfer>
            </div>
            <div class="not-clear" v-show="activeSearch == 2">
                <el-row>
                    <el-col :span="20">
                        <el-input v-model="inputTitle" placeholder="关键字"></el-input>
                    </el-col>
                </el-row>
                <el-row class="data-msg">所有导入亲橙CRM的订单【标题】中含此关键词的会员，将全部被筛选出来！</el-row>
            </div>
            <div slot="footer" class="dialog-footer dialog-col-button" style="padding-bottom:6px;">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="setGoodsInfo">确 定</el-button>
            </div>
        </div>
    </el-col>
</template>
<script>
import UpdateGoods from '../../common/UpdateGoods';
export default {
    components: {
        UpdateGoods
    },
    data() {
        return {
            lsModal: {
                model: [],
                data: []
            },
            inputTitle: '',
            boxVisible: false,
            activeSearch: 1,
            goodsRadio: 1,
            activeSearch: '1',
            modal: {
                item: {
                    visable: false,
                    list: [],
                    total: 0
                }
            },
            // 商品过滤提供的渲染模板
            renderFunc(h, option) {
                return (
                    <div class="item-span">
                        <a><img class="image" src={option.pic_url} /></a>
                        <span class="title" title={option.title}>{option.title}</span>
                    </div>
                );
            },
            // 商品过滤筛选
            filterMethod(query, item) {
                return item.title.indexOf(query) > -1;
            },
            filters: {
                num_iid: []
            }
        }
    },
    props: {
        goodsInfo: {

        }
    },
    watch: {
        goodsInfo: function() {
            this.goodsInfo.ids = []
            this.goodsInfo.title = ''
            this.goodsRadio = 1
            this.filters.num_iid = []
            this.inputTitle = ''
        }
    },
    methods: {
        cancel() {
            this.filters.num_iid = this.lsModal.model;
            this.modal.item.list = this.lsModal.data;
            this.boxVisible = false;
        },
        noLimiteGoods() {
            this.goodsRadio = 1
            this.goodsInfo.ids = []
            this.goodsInfo.title = ''
            this.boxVisible = false
        },
        getGoodsList() {
            this.lsModal.model = this.filters.num_iid;
            this.lsModal.data = this.modal.item.list;
            //this.goodsRadio = 2
            this.boxVisible = true
            this.$http.get("/user/items").then(
                response => {
                    let res = response.data
                    this.modal.item.list = res.data.list
                }
                )

        },
        setGoodsInfo() {
            this.goodsRadio = 2
            this.boxVisible = false
            if (this.filters.num_iid.length >= 1) {
                this.goodsInfo.ids = this.filters.num_iid
                this.goodsInfo.title = ''
            } else {
                this.goodsInfo.ids = []
                this.goodsInfo.title = this.inputTitle
            }
        }
    }
}
</script>   
<style scoped>
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

.el-checkbox-button {
    margin-bottom: 5px;
}

.data-msg {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    padding: 15px;
    margin-top: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.item-select-pannel {
    position: static;
}

.goods-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 50px;
    z-index: 111;
    height: 515px;
    padding: 16px 50px;
    width: 75%;
    box-sizing: border-box;
}

.goods-box h2 {
    font-size: 18px;
}

.goods-box .close {
    position: absolute;
    top: 16px;
    right: 16px;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
}

.goods-box .dialog-footer {
    position: absolute;
    bottom: 16px;
    right: 16px;
    text-align: right;
}
</style>
