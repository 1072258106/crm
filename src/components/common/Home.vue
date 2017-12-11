<template>
    <div class="wrapper">
        <header>
            <v-head></v-head>
        </header>
        <el-row class="container">
            <el-col :span="3" class="menu">
                <v-sidebar></v-sidebar>
            </el-col>
            <el-col :span="21" class="content-body">
                <div class="content">
                    <nprogress-container></nprogress-container>
                    <transition name="el-fade-in" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    components: {
        vHead, vSidebar, NprogressContainer
    }
}
</script>
