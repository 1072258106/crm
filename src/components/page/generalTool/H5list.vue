<template>
    <div>
        <el-dialog title="预览效果" :visible.sync="showVisible">
            <show :content="content"></show>
        </el-dialog>
        <el-row>
            <el-col :span="24" class="my-list">
                <div class="goods-list">
                    <el-row>
                        <el-col :span="24">
                            <div class="goods-title">
                                <span>我的H5手机网页</span>
                                <!-- <el-button type="primary" class="goods-add">开始制作</el-button> -->
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="res-table">
                                <el-table
                                    v-loading="dataLoading"
                                    :data="tableData"
                                    style="width: 100%"
                                    :border="true">
                                    <el-table-column
                                        prop="title"
                                        label="名称"
                                        align="left">
                                    </el-table-column>
                                    <el-table-column
                                        prop="create_time"
                                        label="创建日期"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="short_url"
                                        label="URL链接"
                                        align="left">
                                    </el-table-column>
                                    <el-table-column
                                        prop="visit_count"
                                        label="点击次数 "
                                        width="85"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        width="150"
                                        label="操作"
                                        align="center">
                                        <template scope="scope">
                                            <el-button @click="show(scope.row.content)" type="text" size="small">预览</el-button>
                                            <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
                                            <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                        <el-col :span="24" class="page-part">
                            <div class="page">
                                <el-pagination
                                style="text-align:center;"
                                    v-if="dataTotal>10"
                                    @current-change="getH5list"
                                    :current-page="currentPage"
                                    :page-size="10"
                                    layout="prev, pager, next, jumper"
                                    :total="dataTotal"
                                    class="pagelist">
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import show from './_components/Show'
    export default {
        data(){
            return {
                currentPage: 1,
                tableData: [],
                dataLoading: false,
                dataTotal:0,
                showVisible: false,
                content: ''
            }
        },
        components:{
            show
        },
        methods: {
            getH5list() {
                this.dataLoading = true;
                this.$http.get('/tools/page').then(
                    response => {
                        this.dataLoading = false;
                        let res = response.data;
                        if(res.code == 0 && res.data.list.length > 0) {
                            this.tableData = res.data.list;
                            this.dataTotal = res.data.total;
                        }
                    }
                )
            },
            show(content) {
                this.showVisible = true;
                this.content = content;
            },
            del(id) {
                this.$confirm('删除后将无法恢复，是否继续', {
                    confirmButtonText: '确定删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$http.delete('/tools/page?id='+id).then(
                        response => {
                            let res = response.data;
                            if(res.code == 0){
                                this.getH5list();
                            }else{
                                this.$message.error(res.message)
                            }
                        }
                    )
                })
                
            },
            edit(id) {
                this.$router.push('/tools/h5?id='+id);
            }
        },
        mounted() {
            this.getH5list()
        }
    }
</script>

<style scoped lang="scss">
    .made{
        height:54px;
        line-height:54px;
        vertical-align:left;
        border:1px solid #d4f0fc;
        background:#e6f3fc url(../../../../static/img/H5.png) no-repeat 25px center;
        border-radius:4px;
        font-size:14px;
        color:#666666;
        text-indent:4em;
    }
    .my-list{
        height:520px;
        background:#fff;
        border:1px solid #e4e4e4;
        margin-top:24px;
        .goods-list{
            font-size:14px;
            color:#666;
            .goods-title{
                height:56px;
                line-height:56px;
                text-indent:2.2em;
                span{
                    font-size:16px;
                    color:#666;
                    font-weight:bold;
                }
                .goods-add{
                    float:right;
                    margin-right:24px;
                    margin-top:10px;
                }
            }
            .res-table{
                margin:0 24px 24px 30px;
                color:#666;
            }
            .page-part{
                position:relative;
                .page{
                    width:600px;
                    width: 50%;  
                    height: 50%;  
                    overflow: auto;  
                    margin: auto;      
                }
            }
        }
    }
</style>
