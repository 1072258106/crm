<template>
  <el-col  class="custom-content" :offset="1" :span="20">
    <div @click="noLimiteArea" :class="areaRadio == 1? 'select-button':'trade_time-button'">不限</div>
    <div @click="getCityList" :class="areaRadio == 2? 'select-button':'trade_time-button'">指定</div>
    <el-select v-show="areaRadio == 2" v-model="areaInfo.list" style="width:600px" multiple placeholder="请选择">
        <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId">
        </el-option>
    </el-select>
  </el-col>
</template>
<script>
    export default{
        data () {
            return {
                areaRadio: 1,
                cityList:[],
                boxVisible: false
            }
        },
        props: {
            areaInfo:{
                list: []
            },
            reset:{
                type:Boolean
            }
        },
        mounted(){
        },
        watch: {
            'reset': function() {
                this.areaInfo.list = []
                this.areaRadio = 1
            }
        },
        methods: {
            noLimiteArea () {
                this.areaInfo.list = []
                this.areaRadio = 1
            },
            getCityList () {
                this.$http.get("http://memberapi.iqincheng.com/memberGrouping/areaList").then(
                    response => {
                        let res = response.data
                        this.cityList = res.data.list
                    }
                )
                this.areaRadio = 2
                this.boxVisible = true
            },
            setAreaInfo () {
                this.boxVisible = false
                this.areaInfo.list = []
            }
        }
    }
</script>
<style scoped>
    .trade_time-button,
    .select-button{
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
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 5px;
    }
    .select-button{
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
        box-shadow: -1px 0 0 0 #20a0ff;
    }
    .el-checkbox-button{
        margin-bottom:5px;
    }
</style>
