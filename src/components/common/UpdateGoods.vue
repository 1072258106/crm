<template>
        <a href="javascript:void(0)" class="a-primary update-goods" @click="updateGoods" v-loading.fullscreen="updating">更新商品</a>
        <!-- <el-button type="text" href="javascript:void(0)" class="a-primary"  v-else-if="updating">更新中</el-button> -->
</template>
<script>
    export default{
        data() {
            return {
                updating: false
            }
        },
        methods: {
            updateGoods() {
                this.updating = true;
                let that = this
                setTimeout(function() {
                    that.$http.get("/common/reload_items ").then(
                        response => {
                            that.updating = false
                            if (response.data.code == 0) {
                                that.$message({
                                    message: '更新完成',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(response.data.message);
                            }
                        }
                    )
                }, 500)
            }
        }
    }
</script>
<style scope>
    .update-goods{
        margin-left:8px;
    }
</style>
