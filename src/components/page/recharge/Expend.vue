<template>
  <div>
      <el-table :data="tableList" border>
        <el-table-column prop="date" label="日期" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="sms_num" label="发送号码数" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="success_num" label="消耗短信条数" align="center" min-width="100">
        </el-table-column>
    </el-table>
    <div class="text-center" style="margin-top:16px;">
        <el-pagination v-show="total>20" @current-change="getExpendList" :current-page.sync="page" layout="total,prev, pager, next,jumper" :total="total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
    export default{
        data() {
            return {
                tableList:[
                    
                ],
                total:0,
                page:1,
                pageSize:20
            }
        },
        methods:{
            getExpendList() {
                let params = {
                    page: this.page,
                    pageSize: this.pageSize
                }
                this.$http.get('/user/consume',params).then(
                    response => {
                        let res = response.data;
                        if(res.code == 0 && res.data.list.length > 0){
                            this.tableList = res.data.list;
                            this.total = res.data.total;
                        }
                    }
                )
            }
        },
        mounted() {
            this.getExpendList();
        }
    } 
</script>
