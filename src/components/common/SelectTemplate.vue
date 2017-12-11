<template>
    <span>

        <el-button size="small" @click="dialogVisable = true">短信模板</el-button>
        <el-dialog title="短信模板" :visible.sync="dialogVisable" @open="getList()" size="small">
            <el-tabs v-model="activeName" @tab-click="handleClick" v-if="module==4">
                <el-tab-pane :key="item.name" v-for="(item, index) in strategy" :label="item.title" :name="item.name">
                </el-tab-pane>
            </el-tabs>
            <el-table v-loading="listLoading" class="margin-bottom-20" :data="list" :default-sort="{prop:'used',order:'descending'}" style="width:100%">
                <el-table-column prop="def_text" label="模板内容"></el-table-column>
                <el-table-column prop="used" class-name="text-danger" align="center" label="使用次数" :width="100">
                </el-table-column>
                <el-table-column label="操作" align="center" width="60">
                    <template scope="scope">
                        <el-button type="text" @click="select(scope.row)">使用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text-center">
                <el-pagination v-show="total>10" @current-change="handleCurrentChange" :current-page.sync="page" layout="total,prev, pager, next,jumper" :total="total">
                </el-pagination>
            </div>
        </el-dialog>
    </span>
</template>
<script>
/**
 * 选择短信模板的按钮组件
 * 需要监听时间 selected
 */
export default {
    data() {
        return {
            activeName: '101',
            list: [],
            total: 0,
            pageName: 0,
            page: 1,
            dialogVisable: false,
            strategy: [
                {
                    title: "促销",
                    name: '101'
                },
                {
                    title: "聚划算",
                    name: '102'
                },
                {
                    title: "双11",
                    name: '103'
                },
                {
                    title: "双12",
                    name: '104'
                },
                {
                    title: "618",
                    name: '105'
                },
                {
                    title: "店庆",
                    name: '106'
                },
                {
                    title: "上新",
                    name: '107'
                },
                {
                    title: "节日",
                    name: '108'
                }
            ],
            listLoading:false,
        }
    },
    props: {
        module: {
            type: Number,
            default: 1
        },
        step: {
            type: Number,
            default: 1
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.getList();
        },
        handleClick(tab) {
            this.page = 1;
            this.pageName = tab.name;
            this.getList();
        },
        select(item) {
            //提交使用记录，
            this.$http.get('/system/use_template', {
                params: {
                    id: item.id
                }
            }).then(
                response => {
                    this.$emit('selected', item.def_text);
                    this.dialogVisable = false;
                }
                )
        },
        getList() {
            this.listLoading = true;
            //开始获取短信模板
            this.$http.get("/system/template", {
                params: {
                    step: this.step,
                    module: this.module,
                    page: this.page,
                    strategy: this.pageName,
                    page_size: 10
                }
            }).then(
                response => {
                    this.listLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        this.list = data.list;
                        this.total = data.total;
                    }
                }
                )
        }
    }
}
</script>

