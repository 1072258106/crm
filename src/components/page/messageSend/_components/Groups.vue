<template>
    <div class="groups-select" style="display:inline-block;">
        <el-button type="primary" size="small" @click="groupVisible = true">选择会员分组</el-button>
        <el-dialog title="选择群发对象：会员分组" :visible.sync="groupVisible" size="large">
            <!-- <el-form ref="form" label-position="top">
                <el-form-item v-for="(groupType,index) in groupTypes" :key="groupType.id" :label="groupType.name+'：'" class="group-item" v-show="groupLists.filter(function(value){return value.groupType==groupType.id;},groupType).length>0">
                    <el-checkbox-group v-model="group_ids">
                        <el-checkbox v-for="group in groupLists.filter(function(value){return value.groupType==groupType.id;},groupType)" :key="group.id" :label="group.id">
                            <span class="group-name" :title="group.groupName">{{group.groupName}}</span>
                            <span class="group-number">({{group.mobileNumber}})</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form> -->
            <el-row class="group-container">
                <div class="group-item" v-for="(groupType,index) in groupTypes" :key="groupType.id" :label="groupType.name+'：'" v-show="groupLists.filter(function(value){return value.groupType==groupType.id;},groupType).length>0">
                    <h2>{{groupType.name+'：'}}</h2>
                    <el-checkbox-group v-model="group_ids" style="padding-left:15px;border-bottom:1px solid rgb(223, 230, 236)">
                        <el-checkbox v-for="group in groupLists.filter(function(value){return value.groupType==groupType.id;},groupType)" :key="group.id" :label="group.id">
                            <span class="group-name" :title="group.groupName">{{group.groupName}}</span>
                            <span class="group-number">({{group.mobileNumber}})</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-row>
            <!-- <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(groupType,index) in groupTypes" :key="groupType.id" :title="groupType.name+'：'" :name="index" v-show="checkList[index].length > 0">
                    <el-checkbox-group v-model="group_ids">
                        <el-checkbox v-for="group in checkList[index]" :key="group.id" :label="group.id">
                            <span class="group-name" :title="group.groupName">{{group.groupName}}</span>
                            <span class="group-number">({{group.mobileNumber}})</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="groupVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            groupVisible: false,
            group_ids: [],
            groups: {
                name: "",
                list: [
                    {
                        id: 0,
                        groupName: ""
                    }
                ]
            },
            groupTypes: [],
            groupLists: []
        }
    },

    methods: {
        getGroup() {
            this.$http.get('http://memberapi.iqincheng.com/memberGrouping/groupType')
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.groupTypes = responseData.data;

                    }
                }
                )
        },
        getGroupList() {
            this.$http.get('http://memberapi.iqincheng.com/memberGrouping/groupList')
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.groupLists = responseData.data.list;

                    }
                }
                )
        },
        save() {
            if (this.group_ids.length == 0) {
                this.$message.error("至少选中一个分组");
                return false;
            }
            this.$http.post('/activity/group', {
                group_id: this.group_ids
            })
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        //返回结果
                        const file = {
                            uid: Date.parse(new Date()),
                            name: '选择分组',
                            percentage: 100,
                            number: responseData.data.mobile
                        };
                        this.$emit('group-success', {
                            file: file,
                            total: responseData.data.total
                        })
                        this.groupVisible = false;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        }
    },
    mounted() {
        this.getGroup();
        this.getGroupList();
    }
}
</script>
<style scoped>


.group-container{
    border: 1px solid rgb(223, 230, 236);
    border-bottom: none;
}
.group-item h2{
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: #e6f6ff;
    color: rgb(72, 87, 106);
    cursor: pointer;
    border-bottom: 1px solid rgb(223, 230, 236);
    font-size: 13px;
}
</style>
