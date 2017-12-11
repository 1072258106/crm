<template>
    <el-dialog
        :title="title"
        :visible.sync="showVisible"
        size="tiny">
        <p style="font-size:12px;">{{hint}}</p>
        <el-input v-model="input" :placeholder="tips"></el-input>
        <p style="font-size:12px;background:#d9edf7;color:#447e9b;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;margin-top:15px;">{{contentsLeft}}<span style="color:#f73234;">{{contentsRight}}</span></p> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="showVisible = false">{{showVisible}}</el-button>
            <el-button type="primary" @click="showVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return{
                input:'',
                showVisible:false
            }
        },
        computed:{
            shows(){
                this.showVisible=this.show.showV;
                return this.showVisible;
            }
        },
        props:[
            'show',
            'title',
            'hint',
            'tips',
            'contentsLeft',
            'contentsRight'
        ]
    }
</script>

<style>

</style>