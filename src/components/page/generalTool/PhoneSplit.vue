<template>
    <div>
        <div class="tz-alert primary margin-bottom-20">
            <i class="el-icon-information"></i> &nbsp;帮助用户筛选选定号码归属地和运营商的号码
        </div>
    <div class="box">
            <div class="stepContent">
                <div class="margin-bottom-20">
                    <el-upload :action="uploadUrl" 
                        :show-file-list="false" 
                        :on-success="handleSuccess" 
                        :on-error="handleFail" 
                        :on-progress="handlePro" 
                        :before-upload="beforeUpload" 
                        :headers="header" 
                        style="display:inline-block;">
                        <el-button type="primary">导入号码</el-button>
                    </el-upload>
                    <span class="help-text">
                        导入号码支持excel、csv、txt文件，一行一个号码，文件大小50M以内
                    </span>
                </div>
                <el-table :data="files" style="width:100%">
                    <el-table-column label="名称" prop="name" min-width="200px"></el-table-column>
                    <el-table-column label="上传进度" header-align="center">
                        <template scope="scope">
                            <el-progress :percentage="scope.row.percentage" :status="scope.row.percentage==100?'success':''"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="号码数量">
                        <template scope="scope">
                            <span v-if="scope.row.isProcessing"><i class="el-icon-loading"></i>&nbsp;处理中...</span><span v-if="!scope.row.isProcessing">{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button v-if="scope.$index==0" @click="deleteFile" size="mini" type="text">全部删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>        
            <div class="stepContent">
                <div>
                    <label class="sub-title">运营商：</label>
                    <div class="sub-body">
                        <el-checkbox :indeterminate="mobileType.isIndeterminate" v-model="mobileType.checkAll" @change="handleMobileTypeCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="search.mobile_type" @change="handleMobileTypeChange">
                            <el-checkbox v-for="option in mobileType.options" :label="option" :key="option">{{option}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div>
                    <label class="sub-title">所在地：</label>
                    <div class="sub-body">
                        <el-checkbox :indeterminate="area.isIndeterminate" v-model="area.checkAll" @change="handleAreaCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="search.area_id" @change="handleAreaChange">
                            <el-checkbox v-for="option in area.options" :label="option.area_id" :key="option.area_id">{{option.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>          
            <div class="stepContent">
                <div class="margin-bottom-20">
                    <label class="sub-title">筛选结果：</label>
                    <div class="sub-body" style="line-height: 30px;">
                        <span class="text-danger text-bold">{{total}} </span>个
                    </div>
                </div>  
                <el-button type="primary" :loading="filtering" @click="filters">开始筛选</el-button>
                <el-button type="primary" :disabled="total == 0" @click="download">导出号码</el-button>
            </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            filtering:false,
            header: {
                "Access-Token": this.$store.state.token
            },
            files:[],
            mobileType:{
                checkAll:true,
                isIndeterminate:false,
                options:['移动', '联通', '电信']

            },
            area:{
                checkAll:false,
                isIndeterminate:false,
                options:[]
            },
            search: {
                mobile_type:['移动', '联通', '电信'],
                area_id:[]
            },
            total:0
        }
    },
    computed: {
        uploadUrl() {
            return this.$store.state.globalApi + "tools/mobile";
        },
        exportUrl() {
            return this.$store.state.globalApi + 'tools/mobile_export?token=' + this.$store.state.token;
        }
    },
    methods: {
        //判断是否符合上传条件
        beforeUpload(file) {
            const isExcel = file.type === "application/vnd.ms-excel";
            const isNewExcel =
                file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const isCSV = file.type === "text/csv";
            const isTXT = file.type === "text/plain";
            const isLt5M = file.size / 1024 / 1024 < 50;
            if (!isExcel && !isNewExcel && !isCSV && !isTXT) {
                this.$message.error("上传手机号码文件只能是 Excel 或CSV 或TXT 格式!");
                return false;
            }
            if (!isLt5M) {
                this.$message.error("上传手机号码文件大小不能超过 5MB!");
                return false;
            }
            // 添加上传的文件
            const _file = {
                uid: file.uid,
                name: file.name,
                percentage: 0,
                isProcessing:true,
                number: 0
            };
            this.files.push(_file);
            return true;
        },
        //上传成功
        handleSuccess(response, file) {
            //修改原来的记录
            this.files.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(file.percentage);
                    array[index].number = file.response.data;
                    array[index].isProcessing = false;
                }
            }, file);
        },
        handleFail(err, file) {
            console.info("文件上传失败", err, file);
        },
        //上传过程中
        handlePro(event, file) {
            this.files.forEach(function(value, index, array) {
                if (value.uid == file.uid) {
                    array[index].percentage = parseInt(event.percent);
                }
            });
        },
        //全部删除文件
        deleteFile() {
            this.$http
                .post("/tools/mobile_delete")
                .then(response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.files = [];
                        this.total = 0;
                        this.$message.success("删除成功");
                    } else {
                        this.$message.error("删除失败");
                    }
                });
        },
        // 开始筛选
        filters() {
            if (this.files.length === 0) {
                this.$message.warning("您还未上传手机号码");
                return;
            }
            this.filtering = true;
            this.$http.post('/tools/mobile_filter', this.search)
            .then(
                response => {
                    if (response.data.code == 0) {
                        let data = response.data.data;
                        this.total = data.total;
                        this.filtering = false;
                    } else {
                        this.filtering = false;
                        this.$message.error(response.data.message);
                    }
                }
            )
        },
        // 导出号码
        download(){
            let tempwindow = window.open('_blank');
            tempwindow.location = this.exportUrl;
        },
        // 运营商全选事件
        handleMobileTypeCheckAllChange(event) {
            this.search.mobile_type = event.target.checked ? this.mobileType.options : [];
            this.mobileType.isIndeterminate = false;
        },
        // 运营商手机号码选择事件
        handleMobileTypeChange(value) {
            let checkedCount = value.length;
            this.mobileType.checkAll = checkedCount === this.mobileType.options.length;
            this.mobileType.isIndeterminate = checkedCount > 0 && checkedCount < this.mobileType.options.length;
        },
        // 地区全选事件
        handleAreaCheckAllChange(event) {
            let allArea = [];
            if (event.target.checked) {
                this.area.options.forEach(function(value,index) {
                    allArea.push(value.area_id);
                });
            }
            
            //@todo 不选中是否筛选
            this.search.area_id = event.target.checked ? allArea : [];
            this.area.isIndeterminate = false;
        },
        // 地区选择事件
        handleAreaChange(value) {
            let checkedCount = value.length;
            this.area.checkAll = checkedCount == this.area.options.length;
            this.area.isIndeterminate = checkedCount > 0 && checkedCount < this.area.options.length;
        },
        // 获取地区
        getAreas() {
            this.$http.get("/system/area_list")
                .then(
                response => {
                    if (response.data.code == 0) {
                        let data = response.data.data;
                        this.area.options = data.list;
                        this.area.checkAll = true;
                        let allArea = [];
                        this.area.options.forEach(function(value,index) {
                                allArea.push(value.area_id);
                            });
                        this.search.area_id = allArea;
                    }
                }
                )
        }
    },
    mounted(){
        this.getAreas();
        
    }
}
</script>
<style lang="scss" scoped>
.box {
    background-color: #ffffff;
    .stepContent {
        border-bottom: 1px solid #ccc;
        padding: 20px;
        border-right: none;
        .help-text {
            font-size: 14px;
            color: #ccc;
        }
        &:last-child {
            border-bottom: none;
        }
    }
    
    // 勾选框对齐
    label.el-checkbox {
        width:130px;
        & + .el-checkbox {
            margin-left: 0px !important;
        }
    }
}
</style>

