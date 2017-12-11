<template>
    <div>
        <div class="margin-bottom-20">
            <el-tag type="warning">此分组下的宝贝不执行催付</el-tag>
            <el-button type="text" @click="add">添加宝贝</el-button>
        </div>
        <!-- 添加催付商品 -->
        <el-dialog title="选择商品" size="large" :visible.sync="boxVisible" @open="open">
            <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入商品名称" class="my-transfer item-select-pannel margin-bottom-20" v-model="num_iid" :titles="['非不催付商品','不催付商品']" :props="{key:'num_iid',label:'title',disabled:'0'}" :render-content="renderFunc" :data="goodsList">
                <update-goods class="transfer-footer" slot="left-footer" size="small"></update-goods>
            </el-transfer>
            <div style="text-align:right;">
                <el-button @click="cancle">取 消</el-button>
                <!-- <el-button @click="modal.item.visable = false">取 消</el-button>                                 -->
                <el-button type="primary" @click="addNoRemind">确 认</el-button>
            </div>
        </el-dialog>
        <!-- 添加催付商品 -->
        <el-table :data="data" class="margin-bottom-20" style="width:100%" @selection-change="handleSelectionChange" border v-loading="dataLoading">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="商品信息">
                <template scope="scope">
                    <div class="itemSpace">
                        <img :src="scope.row.item_image" width="48px" height="48px" />
                        <a :href="'https://item.taobao.com/item.htm?id='+scope.row.item_id" target="_blank">{{scope.row.item_title}}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="100" align="center">
                <template scope="scope">
                    <span class="text-danger text-bold">￥</span>{{scope.row.item_price}}
                </template>
            </el-table-column>
            <el-table-column label="移动到分组" width="180" align="center">
                <template scope="scope">
                    <el-dropdown split-button size="small" type="primary" trigger="click" @command="singleMoveCommand" @click="singleMove(scope.row.item_id)">
                        全店宝贝
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="group.group_id+'|'+scope.row.item_id" v-for="group in groups" :key="group.group_id">{{group.pr_name}}</el-dropdown-item>
                            <el-dropdown-item v-if="groups.length==0" disabled>暂无个性分组</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="clear">
            <el-col :span="11">
                <span class="title">选中的宝贝移动到分组：</span>
                <el-dropdown split-button size="small" type="primary" trigger="click" @command="multipleCommand" @click="multipleClick">
                    全店宝贝
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="group.group_id+''" v-for="group in groups" :key="group.group_id">{{group.pr_name}}</el-dropdown-item>
                        <el-dropdown-item v-if="groups.length==0" disabled>暂无个性分组</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="11">
                <el-pagination v-if="total > 10" :current-page="page" layout="prev, pager, next" :total="total">
                </el-pagination>
            </el-col>

        </div>
    </div>
</template>
<script>
import UpdateGoods from '../../../common/UpdateGoods.vue';
export default {
    components: {
        UpdateGoods
    },
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            multipleSelection: [],
            //添加非催付
            lsModal: {
                model: [],
                data: []
            },
            num_iid:[],
            goodsList:[],
            boxVisible: false,

            // 商品过滤筛选
            filterMethod(query, item) {
                return item.title.indexOf(query) > -1;
            },
            // 商品过滤提供的渲染模板
            renderFunc(h, option) {
                return (
                    <div class="item-span" >
                        <a><img class="image" src={option.pic_url} /></a>
                        < span class="title" title={option.title} > {option.title} </span>
                    </div>
                );
            },
            dataLoading: false 
        }
    },
    computed: {
        groups() {
            return this.$store.getters['remind/customGroups'];
        },
    },
    methods: {
        getList() {
            this.dataLoading = true;
            this.$http.get("/remind/get_item_list", {
                params: {
                    group_id: 1,
                    page: this.page,
                    page_size: this.pageSize
                }
            })
                .then(
                response => {
                    this.dataLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.data = responseData.data.list;
                        this.total = responseData.data.total;
                    }
                }
                );
        },
        multipleClick() {
            let num_iids = [];
            for (var item of this.multipleSelection) {
                num_iids.push(item.item_id);
            }
            this.updateItemGroup(num_iids, 2);
        },
        multipleCommand(command) {
            let num_iids = [];
            for (var item of this.multipleSelection) {
                num_iids.push(item.item_id);
            }
            this.updateItemGroup(num_iids, command);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        singleMove(id) {
            let num_iids = [];
            num_iids.push(id);
            this.updateItemGroup(num_iids, 2);
        },
        singleMoveCommand(command) {
            const args = command.split('|');
            const group_id = args[0];
            let num_iids = [];
            num_iids.push(args[1]);
            this.updateItemGroup(num_iids, group_id);
        },
        updateItemGroup(num_iids, group_id) {
            if (num_iids.length == 0) {
                this.$message.error("请至少选择一个商品");
                return;
            }
            this.$http.post('/remind/update_item_group', {
                item_ids: num_iids,
                group_id: group_id
            }).then(
                response => {
                    let responseData = response.data;
                    if (responseData.code === 0) {
                        this.$message({
                            message: responseData.message
                        });
                        this.page = 1;
                        this.getList();
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        //添加非催付
        open() {
            this.lsModal.model = this.num_iid;
            this.lsModal.data = this.goodsList;
        },
        cancle() {
            this.num_iid = this.lsModal.model;
            this.goodsList = this.lsModal.data;
            this.boxVisible = false
        },
        addNoRemind() {
            this.$http.post("/remind/group", {
                'group_id': 1,
                'name': '不催付宝贝',
                'num_iid': this.num_iid
            }).then(
                response => {
                    // console.info(response)
                    this.getList();
                }
            )
            this.boxVisible = false
        },
        getGoodsList() {
            this.$http.get("/user/items")
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.goodsList = responseData.data.list;
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: responseData.message,
                            duration: 3000
                        });
                    }
                }
                )
        },
        getGroupInfo() {
            this.$http.get('/remind/get_info', {
                params: {
                    group_id: 1
                }
            }).then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.num_iid = responseData.data.num_iid;
                    }
                }
                )
        },
        add() {
            this.boxVisible = true;
            this.getGoodsList();
            this.getGroupInfo();
        }
    },
    mounted() {
        this.getList();
        this.getGoodsList();
        this.getGroupInfo();
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 14px;
}

.itemSpace {
    padding: 5px 0px;

    &>img {
        border: 0;
        margin: 0px;
        padding: 0px;
        vertical-align: middle;
    }
    &>a {
        display: inline-block;
        vertical-align: middle;
        color: #008fff;
    }
}
</style>


