<template>
    <div>
        <el-row class="data-container">
            <el-row>
                <div class="data-title">自定义分组</div>
            </el-row>
            <custom-group :isAdd="isAdd" :getListAgain="getListAgain"></custom-group>
        </el-row>

        <el-row class="data-container">
            <el-row>
                <div class="data-title">我的自定义分组</div>
            </el-row>
            <my-custom-group :isAdd="isAdd" :getListAgain="getListAgain"></my-custom-group>
        </el-row>

    </div>
</template>

<script>
import customGroup from './_components/CustomGroup.vue'
import myCustomGroup from './_components/MyCustomGroup.vue'
export default {
    data() {
        return {
            getListAgain: 1,
            isAdd: {
                isAdd: false
            }
        }
    },
    components: {
        'customGroup': customGroup,
        'myCustomGroup': myCustomGroup
    }
}
</script>
<style scoped>
.data-container {
    background: #fff;
    padding: 0 15px 20px;
    margin-bottom: 20px;
}

.data-title {
    height: 47px;
    line-height: 47px;
    font-size: 18px;
    color: #666;
    font-weight: bold;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 15px;
}
</style>
