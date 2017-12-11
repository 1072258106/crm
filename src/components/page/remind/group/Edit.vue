<template>
    <div class="table-container" ref="container">
        <table class="table-default table border" v-loading.body="loading">
            <tr>
                <td>
                    <label class="sub-title">分组名称：</label>
                    <div class="sub-body">
                        <el-col :span="4">
                            <el-input v-model="stepInfo.name" :disabled="group_id == 2" placeholder="请输入分组名"></el-input>
                        </el-col>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="sub-title">商品设置：</label>
                    <div class="sub-body">
                        该分组拥有
                        <span class="text-danger text-bold">{{itemSize}}</span>
                        件商品
                        <a href="javascript:void(0)" class="a-primary" @click="modal.item.visable=true">设置商品
                        </a>
                        <update-goods class="no-margin"></update-goods>
                        <el-dialog title="选择商品" size="large" :visible.sync="modal.item.visable" @open="open">
                            <el-transfer v-if="modal.item.visable" filterable :filter-method="filterMethod" filter-placeholder="请输入商品名称" class="my-transfer item-select-pannel margin-bottom-20" v-model="stepInfo.num_iid" :titles="['所有商品','已选商品']" :props="{key:'num_iid',label:'title'}" :render-content="renderFunc" :data="modal.item.list">
                                <update-goods class="transfer-footer" slot="left-footer" size="small"></update-goods>
                            </el-transfer>
                            <div style="text-align:right;">
                                <el-button @click="cancle">取 消</el-button>
                                <!-- <el-button @click="modal.item.visable = false">取 消</el-button>                                 -->
                                <el-button type="primary" @click="modal.item.visable = false">确 认</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="sub-title">规则设置：</label>
                    <div class="sub-body condition">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item v-for="step in stepInfo.steps" :key="step.id" :title="step.step_step==1?'阶段一：客户刚拍下催付':'阶段二：订单关闭前催付'" :name="'step'+step.step_step">
                                <div>
                                    <label class="sub-title">是否开启：</label>
                                    <div class="sub-body">
                                        <el-switch v-model="step.step_status" :on-value="1" :off-value="0" on-color="#13ce66" on-text="开" off-text="关" off-color="#ff4949">
                                        </el-switch>
                                    </div>
                                </div>
                                <div>
                                    <label class="sub-title">时间设置：</label>
                                    <div class="sub-body">
                                        <span class="pre_text">下单后</span>
                                        <el-col :span="4">
                                            <el-select v-model="step.step_time" placeholder="请选择">
                                                <el-option v-for="item in timeOptions[step.step_step]" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <span class="pre_text">内未付款，自动发消息提醒买家付款</span>
                                    </div>
                                </div>
                                <div>
                                    <v-msg v-model="step.step_text" :module="1" :step-id="step.step_step"></v-msg>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>

                </td>
            </tr>
            <tr class="fixed-row" :style="'width:'+(width+32)+'px;'">
                <td colspan="2">
                    <div class="text-right">
                        <el-button type="danger" @click="save">保存</el-button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import vMsg from '../../../common/Msg';
import UpdateGoods from '../../../common/UpdateGoods';
import Vue from "vue";
export default {
    components: {
        vMsg,
        UpdateGoods
    },
    data() {
        return {
            lsModal: {
                model: [],
                data: []
            },
            loading: false,
            updating: false,
            stepInfo: {
                id: "",
                name: "",
                num_iid: [],
                steps: [
                    {
                        step_status: 0,
                        step_step: 1,
                        step_time: 5,
                        id: "",
                        step_text: "亲的订单尚未付款，为确保心爱的宝贝早日启程、顺利抵达，记得尽早付款哦~立即付款可点链接{订单短链}"
                    },
                    {
                        step_status: 0,
                        step_step: 2,
                        step_time: 4260,
                        id: "",
                        step_text: "主人，您拍下的订单还有3小时即将关闭，您不要我了吗？快来付款把我带回家吧！立即付款可点链接{订单短链}"
                    }
                ]
            },
            activeName: "step1",
            //时间设置选项
            timeOptions: [
                []
                , [
                    { value: 5, label: '5分钟' }, { value: 10, label: '10分钟' }, { value: 15, label: '15分钟' }, { value: 20, label: '20分钟' }, { value: 25, label: '25分钟' }, { value: 30, label: '30分钟' }, { value: 60, label: '1小时' }
                ],
                [
                    { value: 4260, label: '1小时' }, { value: 4200, label: '2小时' }, { value: 4140, label: '3小时' }, { value: 4080, label: '4小时' }, { value: 4020, label: '5小时' }
                ]
            ],
            group_id: this.$route.params.id,
            modal: {
                item: {
                    visable: false,
                    list: []
                }
            },
            // 商品过滤提供的渲染模板
            renderFunc(h, option) {
                return (
                    <div class="item-span" >
                        <a><img class="image" src={option.pic_url} /></a>
                        < span class="title" title={option.title} > {option.title} </span>
                    </div>
                );
            },
            // 商品过滤筛选
            filterMethod(query, item) {
                return item.title.indexOf(query) > -1;
            },
            width: 0,
        }
    },
    computed: {
        itemSize() {
            return this.stepInfo.num_iid.length;
        }
    },
    methods: {
        open() {
            this.lsModal.model = this.stepInfo.num_iid;
            this.lsModal.data = this.modal.item.list;
        },
        cancle() {
            this.stepInfo.num_iid = this.lsModal.model;
            this.modal.item.list = this.lsModal.data;
            this.modal.item.visable = false
        },
        getGroupInfo() {
            this.loading = true;
            this.$http.get('/remind/get_info', {
                params: {
                    group_id: this.group_id
                }
            }).then(
                response => {
                    this.loading = false;
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.stepInfo = responseData.data;
                    }
                }
                )
        },
        getItems() {
            this.$http.get("/user/items")
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.modal.item.list = responseData.data.list;
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: responseData.message,
                            duration: 3000
                        });
                    }
                }
                )
        },
        save() {
            if (this.stepInfo.name.length <= 0) {
                this.$message.error('请输入分组名称');
                return;
            }
            this.$http.post("/remind/group", this.stepInfo)
                .then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        this.$message.success(responseData.message);
                        const group_id = responseData.data.group_id;
                        //更新记录
                        this.$store.dispatch('remind/updateGroups')
                            .then(
                            () => {
                                const to = '/remind/group/' + group_id;
                                // 跳转刚新增的页面
                                this.$router.push(to);
                            }
                            )

                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        updateGoods() {
            this.updating = true;
            let that = this
            setTimeout(function() {
                that.$http.get("/common/reload_items ").then(
                    response => {
                        if (response.data.code == 0) {
                            that.updating = false
                            that.$message({
                                message: '更新完成',
                                type: 'success'
                            });
                        }
                    }
                )
            }, 500)
        },
        //获取宽度
        getWidth() {
            let that = this;
            Vue.nextTick(function () {
                // DOM 更新了
                let container = that.$refs.container;
                that.width = container.offsetWidth;
            })
        }
    },
    mounted() {
        this.getItems();
        if ('undefined' !== typeof (this.$route.params.id)) {
            this.getGroupInfo();
        }
        if (this.$route.params.id == 1) {
            this.$router.push('/remind/group/disabled');
        }

         //获取宽度
        this.getWidth();
        let that = this;
        window.onresize = function() {
            that.getWidth();
        }
    },
    watch: {
        '$route': function(to, from) {
            if ('undefined' !== typeof (this.$route.params.id)) {
                this.group_id = this.$route.params.id;
                this.getGroupInfo();
            } else {
                this.group_id = undefined;
                this.stepInfo = {
                    id: "",
                    name: "",
                    num_iid: [],
                    steps: [
                        {
                            step_status: 0,
                            step_step: 1,
                            step_time: 5,
                            id: "",
                            step_text: ""
                        },
                        {
                            step_status: 0,
                            step_step: 2,
                            step_time: 4260,
                            id: "",
                            step_text: ""
                        }
                    ]
                };
            }
        }
    }
}
</script>
<style lang="scss" scoped>
$border_color: #e4e4e4;
$font_color:#666;
.condition-table {
    border: 1px solid $border_color;
    width: 100%;
    color: $font_color;
    background-color: #fff;
    border-radius: 4px;
    &>tr {
        &>td {
            &:first-child {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
            padding: 10px;
        }
    }
}

.condition {
    font-size: 14px;
    color: #666;
    .a-primary {
        color: #008fff;
    }
}

.pre_text {
    float: left;
    margin-right: 10px;
    line-height: 36px;
}
.no-margin{
    margin:0;
}
</style>
<style lang="scss">
.el-form-item__label {
    padding: 11px 12px 11px 0;
}

.el-form-item__content {
    line-height: inherit;
}

.sub-body .item-select-pannel {
    text-align: center;
}

.sub-body .item-select-pannel>div {
    text-align: left;
}
</style>



