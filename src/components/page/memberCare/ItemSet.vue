<template>
    <div>
        <el-row class="margin-bottom-8">
            <el-col :span="8">
                已设置了
                <span class="text-danger text-bold">{{itemSize}}</span>
                件商品发短信
            </el-col>
            <el-col :span="8" class="text-right">
                <el-button type="primary" size="small" @click="openModal">添加商品</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
                <el-table class="table" :data="list" border style="width:100%">
                    <el-table-column label="商品" min-width="200px" header-align="center" align="left">
                        <template scope="scope">
                            <div class="itemSpace">
                                <img :src="scope.row.pic_url" width="48px" height="48px" />
                                <a :href="'https://item.taobao.com/item.htm?id='+scope.row.num_iid">{{scope.row.title}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="复购周期（天）" v-if="stepId == 3" width="150px" align="center" prop="rebuy_cycle"></el-table-column>
                    <el-table-column label="使用手册" v-if="stepId == 2" width="150px" align="center" prop="manual_link"></el-table-column>
                    <el-table-column label="操作" width="150px" align="center">
                        <template scope="scope">
                            <el-button type="text" @click="deleteItem(scope.row.num_iid)" size="small">删除</el-button>
                            <el-button type="text" @click="chooseLink(scope.row.num_iid,scope.$index)" size="small">选择使用手册</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" v-if="false" class="text-center" :total="1000">
                </el-pagination>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="linkVisible" title="选择手册" size="tiny" style="line-height:0;">
          <el-row><router-link to="/tools/h5" type="button">前去创建使用手册</router-link></el-row>
          <el-table :data="manual_link_list" border v-loading="false" style="margin-top:16px;">
                <el-table-column prop="title" label="网页名称" align="left" min-width="130"></el-table-column>

                <el-table-column prop="short_url" label="网页短链" align="left" min-width="130"></el-table-column>

                <el-table-column label="操作" align="center" width="85">
                    <template scope="scope">
                        <a href="javascript:;" @click="setLink(scope.row.short_url)">选择</a>
                    </template>
                </el-table-column>
          </el-table>
        </el-dialog>
        

        <el-dialog :visible.sync="modal.visable" title="添加商品" size="large">

            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item v-if="stepId == 3" label="复购周期：" prop="cycle" class="margin-bottom-20">
                    <el-col :span="6">
                        <el-input v-model.number="form.cycle" size="small">
                            <template slot="append">天</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item prop="num_iids" label="选择商品：">
                    <el-transfer style="text-align:left;" filterable :filter-method="filterMethod" filter-placeholder="请输入商品名称" class="my-transfer" v-model="form.num_iids" :titles="['所有商品','选中商品']" :props="{key:'num_iid',label:'title'}" :render-content="renderFunc" :data="filter_data">
                        <update-goods class="transfer-footer" slot="left-footer" size="small"></update-goods>
                    </el-transfer>
                </el-form-item>
            </el-form>

            <div slot="footer" class="text-right">
                <el-button @click="modal.visable = false">取 消</el-button>
                <el-button type="primary" @click="addItem">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import UpdateGoods from '../../common/UpdateGoods';
export default {
    components: {
        UpdateGoods
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            itemList: this.data,//已添加的商品列表
            num_iids: this.numIids,//已添加的商品的ids
            // 添加商品的弹窗
            modal: {
                visable: false,
                origin_data: [],
            },
            form: {
                num_iids: [],
                cycle: 0,
                manual_link: ""
            },
            manual_link_total:0,
            manual_link_list: [],
            currentPage:1,
            linkVisible:false,
            setNowId:0,
            setNowIndex:0,
            selectLink:'',
            rules: {
                cycle: [
                    { required: true, type: "number", message: "请输入复购的时间", trigger: 'blur' },
                ],
                num_iids: [
                    { required: true, message: "请至少选择一个商品", type: "array" }
                ]
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
        }
    },
    props: {
        //列表数据
        data: {
            type: Array,
            required: true
        },
        numIids: {
            type: Array,
            required: true
        },
        stepId: {
            type: Number,
            required: true,
            default: 1
        }
    },
    computed: {
        itemSize() {
            return this.itemList.length;
        },
        list() {
            return this.itemList.slice((this.page - 1) * this.pageSize, (this.page * this.pageSize) - 1);
        },
        filter_data() {
            const filterIids = this.num_iids;
            // 过滤一次已经存在的
            return this.modal.origin_data.filter(function(item) {
                return filterIids.indexOf(item.num_iid) == -1;
            }, filterIids);
        }
    },
    methods: {
        addItem: function() {
            //添加商品
            this.$refs['form'].validate(
                (valid) => {
                    if (valid) {
                        this.$http.post('/member_care/edit', this.form)
                            .then(
                            response => {
                                let responseData = response.data;
                                if (responseData.code == 0) {
                                    this.$message.success(responseData.message);
                                    // 提交数据回
                                    //列表数据 //配置数组增加
                                    this.num_iids.push.apply(this.num_iids, this.form.num_iids);
                                    const editItems = responseData.data;
                                    this.itemList.unshift.apply(this.itemList, editItems);
                                    this.$emit('selected', this.num_iids);
                                    this.modal.visable = false;
                                } else {
                                    this.$message.error(responseData.message);
                                }
                            },
                            error => {
                                this.$message.error("添加失败");
                            }
                            )
                    } else {
                        this.$message.error("错误提交!");
                        return false;
                    }
                }
            )
        },
        deleteItem(id) {
            this.itemList = this.itemList.filter(function(item) {
                return item.num_iid != id;
            }, id);
            this.num_iids.splice(this.num_iids.indexOf(id), 1);
            this.$emit('selected', this.num_iids);
        },
        // 获取商品
        getItems() {
            this.$http.get("user/items")
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.modal.origin_data = responseData.data.list;
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
        getLinkList() {
            this.$http.get('/tools/page?page='+this.currentPage).then(
                response => {
                    let res = response.data;
                    if(res.code == 0 && res.data.list.length>0) {
                        this.manual_link_list = res.data.list;
                        this.manual_link_total = res.data.total;
                    }else if(res.data.list.length <= 0) {
                        this.$confirm('您还没有H5网页', {
                            confirmButtonText: '前去创建',
                            cancelButtonText: '取消'
                        }).then(() => {
                            this.$router.push('/tools/h5/')
                        })
                    }else{
                        this.$message.error(res.message)
                    }
                }
            )
        },
        openModal() {
            this.modal.visable = true;
            this.form.num_iids = [];
            this.form.cycle = 0;
            this.form.manual_link = "";
        },
        chooseLink(id,index) {
            this.linkVisible = true;
            this.setNowId = id;
            this.setNowIndex = index;
            this.getLinkList();
        },
        setLink(link) {
            this.linkVisible = false;
            let params = {
                'num_iids': [this.setNowId],
                'manual_link': link
            }
            this.$http.post('/member_care/edit',params).then(
                response => {
                    console.info(response)
                    let res = response.data;
                    if(res.code == 0){
                        this.list[this.setNowIndex].manual_link = link;
                    }else {
                        this.$message.error(res.message)
                    }
                }
            )
        }
    },
    watch: {
        stepId: function(val, oldVal) {
        },
        data: function(val, oldVal) {
            this.itemList = val;
        },
        numIids: function(val, oldVal) {
            this.num_iids = val;
        }
    },
    mounted() {
        //初始化商品列表
        this.getItems();

    }
}
</script>

<style lang="scss" scoped>
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
    }
}

.margin-bottom-8 {
    margin-bottom: 8px;
}
</style>


