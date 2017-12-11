<template>
    <div>
        <table class="table-default table table-container" ref="container">
            <tr>
                <td>
                    <label class="sub-title">开关设置：</label>
                    <div class="sub-body">
                        <el-col :span="4">
                            <el-switch v-model="stepInfo.step_status" :on-value="1" :off-value="0" on-color="#13ce66" on-text="开" off-text="关" off-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div v-if="stepInfo.step_id==1">
                        <label class="sub-title">时间设置：</label>
                        <div class="sub-body">
                            付款超过
                            <el-select v-model="stepInfo.step_time" placeholder="请选择">
                                <el-option v-for="item in timeOptions[0]" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            还未发货，自动发短信安抚
                        </div>
                    </div>
                    <div v-if="stepInfo.step_id==5">
                        <label class="sub-title">时间设置：</label>
                        <div class="sub-body">
                            客户确认收货后
                            <el-select v-model="stepInfo.step_time" placeholder="请选择">
                                <el-option v-for="item in timeOptions[1]" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            内未评价，自动发送短信提醒客户好评
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">金额过滤：</label>
                        <div class="sub-body">
                            <div style="width:320px">
                                <el-col :span="7">
                                    <el-input v-model.number="stepInfo.filters.price.min" placeholder="0.00" class="money"></el-input>
                                </el-col>
                                <el-col :span="2" class="text-center">-</el-col>
                                <el-col :span="7">
                                    <el-input v-model.number="stepInfo.filters.price.max" placeholder="0.00" class="money"></el-input>
                                </el-col>
                            </div>&nbsp;元之间的订单不发短信
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">商品过滤：</label>
                        <div class="sub-body">
                            <p>已设置了
                                <span class="text-danger text-bold">{{itemSize}}</span>
                                件商品不发短信
                                <a href="javascript:void(0)" @click="modal.item.visable=true">设置商品
                                </a>
                                <el-dialog title="商品过滤" size="large" :visible.sync="modal.item.visable" @open="open">
                                    <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入商品名称" class="my-transfer item-select-pannel margin-bottom-20" v-model="stepInfo.filters.num_iid" :titles="['所有商品','过滤商品']" :props="{key:'num_iid',label:'title'}" :render-content="renderFunc" :data="modal.item.list">
                                        <update-goods class="transfer-footer" slot="left-footer" size="small"></update-goods>
                                    </el-transfer>
                                    <div style="text-align:right;">
                                        <el-button @click="cancle">取 消</el-button>
                                        <el-button type="primary" @click="modal.item.visable = false">确 认</el-button>
                                    </div>
                                </el-dialog>
                            </p>
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">地区过滤：</label>
                        <div class="sub-body">
                            <el-select v-model="stepInfo.filters.areas" style="width:600px" multiple placeholder="请选择">
                                <el-option v-for="item in areas" :key="item.area_id" :label="item.name" :value="item.area_id">
                                </el-option>
                            </el-select>

                            &nbsp;&nbsp;已设置了
                            <span class="text-danger text-bold">{{areaSize}}</span>个地区的客户不发短信
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">标旗过滤：</label>
                        <div class="sub-body">
                            <el-checkbox-group v-model="stepInfo.filters.flags" class="checkbox">
                                <el-checkbox :label="0">无标旗</el-checkbox>
                                <el-checkbox :label="1"><img src="../../../../static/img/flag1.png" alt=""></el-checkbox>
                                <el-checkbox :label="2"><img src="../../../../static/img/flag2.png" alt=""></el-checkbox>
                                <el-checkbox :label="3"><img src="../../../../static/img/flag3.png" alt=""></el-checkbox>
                                <el-checkbox :label="4"><img src="../../../../static/img/flag4.png" alt=""></el-checkbox>
                                <el-checkbox :label="5"><img src="../../../../static/img/flag5.png" alt=""></el-checkbox>
                            </el-checkbox-group>
                            &nbsp;&nbsp;&nbsp;选中的标旗订单不发短信
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">等级过滤：</label>
                        <div class="sub-body">
                            <el-checkbox-group v-model="stepInfo.filters.grade" class="filterbox">
                                <el-checkbox :label="0">店铺会员</el-checkbox>
                                <el-checkbox :label="1">普通会员</el-checkbox>
                                <el-checkbox :label="2">高级会员</el-checkbox>
                                <el-checkbox :label="3">VIP会员</el-checkbox>
                                <el-checkbox :label="4">至尊VIP会员</el-checkbox>
                            </el-checkbox-group>
                            &nbsp;&nbsp;&nbsp;所选等级的会员不发短信
                        </div>
                    </div>
                    <div>
                        <label class="sub-title">会员过滤：</label>
                        <div class="sub-body">
                            黑名单用户不发短信
                            <router-link to="/member/black">设置黑名单</router-link>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <v-msg v-model="stepInfo.step_text" :module="2" @changeText="handlerChangeText" :step-id="stepInfo.step_id" :btn-compony="true" :btn-number="true" :btn-url-link="true"></v-msg>
                </td>
            </tr>
            <tr class="fixed-row" :style="'width:'+width+'px;'">
                <td colspan="2" class="text-right">
                    <el-button type="danger" @click="save">保存</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import vMsg from '../../common/Msg';
import UpdateGoods from '../../common/UpdateGoods';
import Vue from "vue";
export default {
    components: {
        vMsg,
        UpdateGoods
    },
    data() {
        return {
            // 短信设置内容
            stepInfo: {
                id: "",
                step_id: 0,
                step_name: "",
                step_status: 0,
                step_text: "",
                step_time: 0,
                filters: {
                    price: {
                        min: 0,
                        max: 0
                    },
                    areas: [],
                    flags: [],
                    grade: [],
                    num_iid: []
                }
            },
            modal: {
                item: {
                    visable: false,
                    list: [],
                    total: 0
                }
            },
            lsModal: {
                model: [],
                data: []
            },
            // 商品过滤提供的渲染模板
            renderFunc(h, option) {
                return (
                    <div class="item-span">
                        <a><img class="image" src={option.pic_url} /></a>
                        <span class="title" title={option.title}>{option.title}</span>
                    </div>
                );
            },
            // 商品过滤筛选
            filterMethod(query, item) {
                return item.title.indexOf(query) > -1;
            },
            areas: [],
            copyStepText: "",
            timeOptions: [
                [
                    { value: 720, label: '12小时' }, { value: 1440, label: '24小时' }, { value: 2160, label: '36小时' }, { value: 2880, label: '48小时' }, { value: 4320, label: '72小时' }
                ],
                [
                    { value: 5, label: '5分钟' }, { value: 10, label: '10分钟' }, { value: 15, label: '15分钟' }, { value: 20, label: '20分钟' }, { value: 25, label: '25分钟' }, { value: 30, label: '30分钟' }, { value: 60, label: '1小时' }
                ]
            ],
            width: 0,
            //lsLength: 0
        }
    },
    computed: {
        areaSize() {
            return this.stepInfo.filters.areas.length;
        },
        itemSize() {
            return this.stepInfo.filters.num_iid.length;
        }
    },
    methods: {
        // 获取设置
        getSetting(step_id) {
            this.$http.get('/care/setting', {
                params: {
                    step_id: step_id
                }
            }).then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.stepInfo = responseData.data;
                        this.copyStepText = this.stepInfo.step_text;
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
        // 获取商品
        getItems() {
            this.$http.get("user/items")
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.modal.item.list = responseData.data.list;
                        this.modal.item.total = responseData.data.total;
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
        // 获取地区
        getAreas() {
            this.$http.get("/system/area_list")
                .then(
                response => {
                    if (response.data.code == 0) {
                        let data = response.data.data;
                        this.areas = data.list;
                    }
                }
                )
        },
        handlerChangeText: function(value) {
            this.stepInfo.step_text = value;
        },
        saveSmsSign(sign) {
            return this.$store.dispatch("saveSmsSign", sign);
        },
        //保存设置
        save() {
            //判断字数
            var sign = this.$store.state.userInfo.sms_sign;
            if (!(sign.length >= 2 && sign.length <= 12)) {
                return this.$message.error("签名必须是2-12位");
            }
            this.saveSmsSign()
                .then(
                response => {
                    var responseData = response.data;
                    if (responseData.code == 0) {
                        let post_data = {
                            "step_id": this.stepInfo.step_id,
                            "step_status": this.stepInfo.step_status,
                            "step_text": this.stepInfo.step_text,
                            "step_time": this.stepInfo.step_time,
                            "filters": this.stepInfo.filters
                        };
                        //成功
                        this.$http.post("/care/setting", post_data)
                            .then(
                            response => {
                                this.$message({
                                    message: response.data.message,
                                    type: response.data.code == 0 ? "success" : "error"
                                })

                            }
                            )
                    } else {
                        this.$message.error(responseData.message);
                    }
                },
                error => {
                }
                )
        },
        open() {
            this.lsModal.model = this.stepInfo.filters.num_iid;
            this.lsModal.data = this.modal.item.list;
        },
        cancle() {
            this.stepInfo.filters.num_iid = this.lsModal.model;
            this.modal.item.list = this.lsModal.data;
            this.modal.item.visable = false
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
         //获取宽度
        this.getWidth();
        let that = this;
        window.onresize = function() {
            that.getWidth();
        }
    },
    beforeMount() {
        this.getSetting(this.$route.params.step_id);
        this.getAreas();
        this.getItems();
    },
    beforeRouteUpdate(to, from, next) {
        this.getSetting(to.params.step_id);
        next();
    }
}
</script>

