<template>
    <div>
        <div class="tz-alert primary margin-bottom-20">
            <i class="el-icon-information"></i> &nbsp;宝贝分组催付： 请点击"添加个性催付"按钮来创建分组,把同一类宝贝放一个组定制专属催付文案!
        </div>
        <div class="tz-panel">
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
                <el-tab-pane name="/remind/group/2">
                    <span slot="label">
                        全店宝贝
                    </span>
                </el-tab-pane>
                <el-tab-pane :name="'/remind/group/'+group.group_id" :label="group.pr_name" v-for="group in groups" :key="group.group_id" :closable="true">
                </el-tab-pane>
                <!-- 循环系统的分组 -->
                <el-tab-pane name="/remind/group/disabled" label="不催付宝贝">
                </el-tab-pane>
                <el-tab-pane name="/remind/group/add">
                    <span slot="label">
                        添加个性催付
                    </span>
                </el-tab-pane>
            </el-tabs>
            <transition name="el-fade-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: this.$route.path
        }
    },
    computed: {
        groups() {
            return this.$store.getters['remind/customGroups'];
        }
    },
    methods: {
        handleTabClick(tab) {
            this.$router.push(tab.name);
        },
        handleTabRemove(name) {
            const group_id = name.substring(name.lastIndexOf('/') + 1);
            this.$http.post('/remind/group_delete', {
                group_id: Number(group_id)
            }).then(
                response => {
                    const responseData = response.data;
                    this.$message({
                        type: responseData.code == 0 ? 'success' : 'error',
                        message: responseData.message
                    });
                    this.$store.dispatch('remind/updateGroups')
                        .then(
                        () => {
                            //如果在当前页面，则跳转全店宝贝页面
                            if (name == this.activeName) {
                                this.$router.push('/remind/group/2');
                            }
                        }
                        )
                }
                )
        }
    },
    mounted() {
        this.$store.dispatch('remind/getGroups');
    },
    watch: {
        '$route': function(to) {
            this.activeName = to.path;
        }
    }
}
</script>
<style>
.el-collapse-item__header {
    background: rgb(230, 246, 255);
}
</style>


