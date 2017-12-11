<template>
    <div class="member-index">
        <el-row class="data-container">
            <el-row>
                <div class="data-title">会员资料补全</div>
            </el-row>
            <el-row class="tz-alert primary margin-bottom-20">
                <i class="el-icon-information"></i>&nbsp;因为淘宝接口只支持获取近三个月订单，如果要向更多的客户发送短信，需要手动导入当前店铺三个月前的订单数据。
                <a href="/static/assets/会员资料导入帮助.docx" target="_blank">查看导入帮助</a>
            </el-row>
            <!-- 三步走 -->
            <el-row type="flex" justify="space-between">
                <el-col :span="7" class="complete-item" v-loading="syncLoading">
                    <div class="item-title">第一步：同步本店会员</div>
                    <div class="member-status" :memberStatusInfo="memberStatusInfo" v-if="syncProcess == 100">
                        <p>时间范围：
                            <em>{{memberStatusInfo.startTime}}&nbsp;至&nbsp;{{memberStatusInfo.endTime}}</em>
                        </p>
                        <p>您还有
                            <span>{{memberStatusInfo.noMobileNum}}</span>个会员没有手机号码，快去下载订单导入</p>
                    </div>
                    <div class="info-button" v-else-if="syncProcess == -1" @click="syncNow">立即同步</div>
                    <el-button class="margin-button" type="primary" :loading="true" v-else-if="syncProcess >= 0 && syncProcess < 100">同步中</el-button>
                </el-col>

                <el-col :span="7" class="complete-item">
                    <div class="item-title">第二步：从淘宝导出本店历史订单</div>
                    <a class="download buttons info-button" target="_blank" href="http://tradearchive.taobao.com/trade/itemlist/list_export_order.htm">点击下载订单</a>
                </el-col>

                <el-col :span="8" class="complete-item">
                    <div class="item-title">第三步：将导出的订单上传到软件里</div>
                    <!-- <el-upload class="upload" :show-file-list="false" action="uploadAction" :on-success="upload">
                                                                <el-button class="upload" size="big" type="primary">点击导入订单</el-button>
                                                            </el-upload> -->
                    <el-progress style="width:300px;margin:30px auto 0;" v-if="uploadPecent >= 0 && uploadPecent < 100" :percentage="uploadPecent"></el-progress>
                    <el-upload v-else class="upload" :show-file-list="false" action="http://memberapi.iqincheng.com/order/orderImport" :on-success="upload" :headers="header" :on-progress="uploadProgress">
                        <el-button class="upload" size="big" type="primary">点击导入订单</el-button>
                    </el-upload>
                    <div class="upload-record">导入时系统会自动过滤重复订单,
                        <span @click="showTable">查看导入记录</span>
                    </div>
                </el-col>
            </el-row>

            <!-- 导入历史的表格 -->
            <el-dialog title="查看导入历史记录" :visible.sync="dialogTableVisible" size="large" border>
                <el-table :data="recordData" v-loading="recordLoading">
                    <el-table-column property="tempFileName" label="文件名" min-width="150"></el-table-column>
                    <el-table-column align="center" property="startTime" label="订单开始时间" width="150"></el-table-column>
                    <el-table-column align="center" property="endTime" label="订单结束时间" width="150"></el-table-column>
                    <el-table-column align="center" property="uploadTime" label="上传时间" width="150"></el-table-column>
                    <el-table-column label="处理状态" width="85">
                        <template scope="scope">
                            <span v-if="scope.row.status == 2">已处理</span>
                            <span v-if="scope.row.status == 1">正在处理</span>
                            <span v-if="scope.row.status == 0">未处理</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination class="change-page" v-show="uploadListTotal > 10" @current-change="uploadListPageChange" :current-page="uploadListPage" layout="total, prev, pager, next, jumper" :total="uploadListTotal">
                </el-pagination>
            </el-dialog>
        </el-row>
        </el-row>

        <el-row class="data-container">
            <el-row>
                <div class="data-title">店铺会员资料</div>
            </el-row>
            <el-row class="total-member" :totalMember="totalMember" type="flex" justify="space-between" v-loading="infoLoading">
                <el-col :span="4" class="member-item">
                    <span class="icon-container">
                        <i class="icon iconfont icon-huiyuan"></i>
                    </span>
                    <div class="member-num">
                        <p>会员人数</p>
                        <span>{{totalMember.nums}}
                            <em>位</em>
                        </span>
                    </div>
                </el-col>
                <el-col :span="4" class="member-item">
                    <span class="icon-container">
                        <i class="icon iconfont icon-dingdan"></i>
                    </span>
                    <div class="order-num">
                        <p>订单笔数</p>
                        <span>{{totalMember.orderTotal}}
                            <em>笔</em>
                        </span>
                    </div>
                </el-col>
                <el-col :span="4" class="member-item">
                    <span class="icon-container">
                        <i class="icon iconfont icon-jine"></i>
                    </span>
                    <div class="order-amount">
                        <p>成交金额</p>
                        <span>{{totalMember.orderAmount}}
                            <em>元</em>
                        </span>
                    </div>
                </el-col>
                <el-col :span="4" class="member-item">
                    <span class="icon-container">
                        <i class="icon iconfont icon-junjia"></i>
                    </span>
                    <div class="avg-amount">
                        <p>客单均价</p>
                        <span>{{totalMember.amountAvg}}
                            <em>元</em>
                        </span>
                    </div>
                </el-col>
                <el-col :span="4" class="member-item">
                    <span class="icon-container">
                        <i class="icon iconfont icon-phone-e"></i>
                    </span>
                    <div class="phone-num">
                        <p>手机号码</p>
                        <span>{{totalMember.nums}}
                            <em>个</em>
                        </span>
                    </div>
                </el-col>
            </el-row>

            <!-- 搜索 -->
            <el-form :model="memberInfoData" class="demo-form-inline search-box">
                <!-- 777 -->
                <el-row type="flex" justify="space-between" class="middle-space">
                    <el-col :span="7" class="search_item">

                        <label>会员昵称：</label>
                        <div>
                            <el-col :span="24">
                                <el-input v-model="memberInfoData.nickName" placeholder=""></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>会员等级：</label>
                        <div>
                            <el-select v-model="selectValue" placeholder="请选择">
                                <el-option v-for="item in memberInfoData.options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>交易次数：</label>
                        <div>
                            <el-col :span="11">
                                <el-input v-model.number="memberInfoData.tradeCount.min"></el-input>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-input v-model.number="memberInfoData.tradeCount.max"></el-input>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="space-between">
                    <el-col :span="7" class="search_item">
                        <label>成交金额：</label>
                        <div>
                            <el-col :span="11">
                                <el-input v-model.number="memberInfoData.money.min"></el-input>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-input v-model.number="memberInfoData.money.max"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>交易时间：</label>
                        <div>
                            <el-col :span="11">
                                <el-date-picker v-model="beginLastTradeTime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker v-model="endLastTradeTime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search-item search-item-right">
                        <!-- <a target="_blank" class="link buttons-right" :href="globalUrl+'/memberGrouping/groupExport?token='+token">导出会员</a> -->
                        <a target="_blank" class="link buttons-right" :href="globalUrl+'/member/groupExport?token='+token+'&'+exportParams">导出会员</a>
                        <!-- <el-button class="buttons-right" type="primary" @click="exportGroup">导出会员</el-button> -->
                        <el-button class="buttons-right" type="primary" @click="getMemberInfoList" style="margin-right:8px;">查找会员</el-button>
                    </el-col>

                </el-row>
            </el-form>
            <!-- 搜索 -->

            <!-- 表格 -->
            <el-table :data="memberInfoList" border style="width: 100%" v-loading="tableLoading">

                <el-table-column label="会员昵称" min-width="220">
                    <template scope="scope">
                        <wang-wang :nick="scope.row.buyerNick"></wang-wang>
                    </template>
                </el-table-column>

                <el-table-column prop="trueName" label="姓名"></el-table-column>

                <el-table-column label="会员等级" width="85">
                    <template scope="scope">
                        <span v-if="scope.row.grade == 0">店铺会员</span>
                        <span v-if="scope.row.grade == 1">普通会员</span>
                        <span v-if="scope.row.grade == 2">高级会员</span>
                        <span v-if="scope.row.grade == 3">VIP会员</span>
                        <span v-if="scope.row.grade == 4">至尊VIP会员</span>
                    </template>
                </el-table-column>

                <el-table-column prop="tradeCount" label="交易次数" align="center" width="85"></el-table-column>

                <el-table-column prop="tradeAmount" label="成交金额" align="center" width="85"></el-table-column>

                <el-table-column prop="lastTradeTime" label="上次交易时间" align="center" min-width="150"></el-table-column>

                <el-table-column prop="mobile" label="手机号码" align="center" min-width="120"></el-table-column>

                <el-table-column label="操作" align="center" width="85">
                    <template scope="scope">
                        <a href="javascript:;" @click="showDetail(scope.row)">查看详细</a>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <!-- <el-pagination class="change-page" v-show="memberInfoList" @size-change="pageSizeChange" @current-change="pageChange" :current-page="page" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="memberInfoListNumber">
                                            </el-pagination> -->
            <el-pagination class="change-page" v-show="memberInfoListNumber > 10" @current-change="pageChange" :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="memberInfoListNumber">
            </el-pagination>
        </el-row>
        <!-- 用户详细 -->
        <el-dialog :detailInfo="detailInfo" title="客户资料" :visible.sync="detailContainerVisible" size="large">
            <div class="info-container">
                <!-- <div class="middle_line"></div> -->
                <el-row class="detail-item-1">
                    <div :span="12" class="avatar">
                        <img :src="detailInfo.avatar || defaultAvatar" alt="">
                    </div>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-item">
                    <el-col :span="10" class="nickname">
                        <div>
                            <span class="detail-item-span">客户昵称：</span>
                            <div class="detail-item-data">{{detailInfo.buyerNick}}</div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="realname">
                        <div>
                            <span class="detail-item-span">真实姓名：</span>
                            <div class="detail-item-data">{{detailInfo.trueName}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-item">
                    <el-col :span="10" class="grank-member">
                        <div>
                            <span class="detail-item-span">会员等级：</span>
                            <div class="detail-item-data" v-if="detailInfo.grade == 0">店铺会员</div>
                            <div class="detail-item-data" v-if="detailInfo.grade == 1">普通会员</div>
                            <div class="detail-item-data" v-if="detailInfo.grade == 2">高级会员</div>
                            <div class="detail-item-data" v-if="detailInfo.grade == 3">VIP会员</div>
                            <div class="detail-item-data" v-if="detailInfo.grade == 4">至尊VIP会员</div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="grank-credit">
                        <div>
                            <span class="detail-item-span">信用等级：</span>
                            <div class="detail-item-data">{{detailInfo.creditLevel}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-item">
                    <el-col :span="10" class="place">
                        <div>
                            <span class="detail-item-span">所在地区：</span>
                            <div class="detail-item-data">{{detailInfo.city}}</div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="trade-count">
                        <div>
                            <span class="detail-item-span">交易次数：</span>
                            <div class="detail-item-data">{{detailInfo.tradeCount}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-item">
                    <el-col :span="10" class="trade-avg">
                        <div>
                            <span class="detail-item-span">客单均价：</span>
                            <div class="detail-item-data">{{detailInfo.avgPrice}}</div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="trade-amount">
                        <div>
                            <span class="detail-item-span">成交金额：</span>
                            <div class="detail-item-data">{{detailInfo.tradeAmount}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="detail-item" type="flex" justify="space-between">
                    <el-col :span="10" class="trade-success">
                        <div>
                            <span class="detail-item-span">交易成功宝贝件数：</span>
                            <div class="detail-item-data">{{detailInfo.itemNum}}</div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="trade-fail">
                        <div>
                            <span class="detail-item-span">交易关闭宝贝件数：</span>
                            <div class="detail-item-data">{{detailInfo.itemCloseCount}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-item">

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">上次交易时间：</span>
                            <div class="detail-item-data">{{detailInfo.lastTradeTime}}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-form label-width="126px" class="big-space form">
                <el-row type="flex" justify="space-between" class="detail-item">

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">手机：</span>
                            <el-input v-model="detailInfo.mobile"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">邮箱：</span>
                            <el-input v-model="detailInfo.email"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="space-between" class="detail-item">

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">QQ：</span>
                            <el-input v-model="detailInfo.qq"></el-input>
                        </div>
                    </el-col>

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">微信：</span>
                            <el-input v-model="detailInfo.wx"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="space-between" class="detail-item">

                    <el-col :span="10" class="last-tradetime">
                        <div>
                            <span class="detail-item-span">生日：</span>
                            <el-date-picker class="el-input" v-model="detailInfo.birthday" type="date" placeholder="选择日期"></el-date-picker>
                        </div>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="detailContainerVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateMemberInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import wangWang from "../../common/WangWang"
import { formatDate } from "../../../function/formatDate.js"
export default {
    components: {
        wangWang
    },
    data() {
        return {
            token: '',
            globalUrl: '',
            //上传的头部参数
            header: {
                'Access-Token': this.$store.state.token
            },
            syncProcess: {
                type: Number
            },
            syncLoading: true,
            detailContainerVisible: false,
            defaultAvatar: 'https://assets.alicdn.com/app/sns/img/default/avatar-120.png',
            detailInfo: {},
            // updateMemberData:{
            //     id:'',
            //     mobile:'',
            //     email:'',
            //     qq:'',
            //     wx:'',
            //     birthday:''
            // },
            memberStatusInfo: {},
            totalMember: {},
            recordData: [],
            uploadListPage: 1,
            uploadListTotal: 0,
            dialogTableVisible: false,
            page: 1,
            pageSize: 10,
            memberInfoList: [],
            memberInfoListNumber: 0,
            memberInfoData: {
                nickName: '',
                tradeCount: {
                    min: '',
                    max: ''
                },
                tradeTime: {
                    begin: '',
                    end: ''
                },
                money: {
                    min: '',
                    max: ''
                },
                options: [{
                    value: '',
                    label: '所有等级'
                }, {
                    value: '0',
                    label: '店铺会员'
                }, {
                    value: '1',
                    label: '普通会员'
                }, {
                    value: '2',
                    label: '高级会员'
                }, {
                    value: '3',
                    label: 'VIP会员'
                }, {
                    value: '4',
                    label: '至尊VIP会员'
                }
                ]
            },
            beginLastTradeTime: '',
            endLastTradeTime: '',
            selectValue: '',
            uploadPecent: -1,
            infoLoading: false,
            tableLoading: false,
            recordLoading: false
        }
    },
    mounted() {
        this.globalUrl = this.$store.state.memberGlobalUrl
        this.token = this.$store.state.token
        this.getMemberStatus()
        this.getTotalMember()
        this.getMemberInfoList()
        this.getSyncProcess()
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        exportParams() {
            let params = ''
            if (this.memberInfoData.nickName) {
                params += '&buyerNick=' + this.memberInfoData.nickName
            }
            if (this.selectValue) {
                params += '&grade=' + this.selectValue
            }
            if (this.memberInfoData.tradeCount.min) {
                params += '&tradeCount=' + this.memberInfoData.tradeCount.min
            }
            if (this.memberInfoData.tradeCount.max) {
                params += '&endTradeCount=' + this.memberInfoData.tradeCount.max
            }
            if (this.memberInfoData.money.min) {
                params += '&tradeAmount=' + this.memberInfoData.money.min
            }
            if (this.memberInfoData.money.max) {
                params += '&endTradeAmount=' + this.memberInfoData.money.max
            }
            if (this.beginLastTradeTime) {
                params += '&lastTradeTime=' + this.changeTime(this.beginLastTradeTime)
            }
            if (this.endLastTradeTime) {
                params += '&endLastTradeTime=' + this.changeTime(this.endLastTradeTime)
            }
            return params
        }
    },
    watch: {
    },
    methods: {
        changeTime(time) {
            let result
            //return time.getFullYear()
            result = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' 00:00:00'
            return result
        },
        getSyncProcess() {
            this.syncLoading = true
            this.$http.get("http://memberapi.iqincheng.com/member/syncStatus").then(
                response => {
                    let res = response.data
                    if (res.code == 0) {
                        this.syncProcess = res.data.process
                        this.syncLoading = false
                    }
                }
            )
        },
        syncNow() {
            let that = this
            this.$http.post("http://memberapi.iqincheng.com/member/sync").then(
                response => {
                    let res = response.data
                    if (res.code == 0) {//开始同步
                        let timer = setInterval(function() {
                            that.getSyncProcess()
                            if (this.syncProcess == 100) {
                                clearInterval(timer)
                            }
                        }, 1000)
                    } else if (res.code == 7003) {
                        this.alertFail('您已经同步过了')
                        this.getSyncProcess()
                    } else {
                        this.alertFail('系统出错')
                    }
                }
            )

        },
        showTable() {
            this.dialogTableVisible = true
            this.getUploadList()
        },
        uploadAction() {
            this.$http.post("http://memberapi.iqincheng.com/order/orderImport")
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.alertSuccess('上传成功')
                    } else {
                        this.alertFail('上传出错')
                    }
                }
                )
        },
        upload(response) {
            if (response.code == 0) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
            } else if (response.code == 1) {
                this.$message.error('上传失败')
            } else {
                this.$message.error(response.message)
            }
        },
        getUploadList() {
            this.recordLoading = true
            this.$http.get("http://memberapi.iqincheng.com/order/importList", {
                params: {
                    pageSize: 10,
                    page: this.uploadListPage
                }
            }).then(
                response => {
                    this.recordLoading = false
                    let res = response.data
                    if(res.code == 0) {
                        this.recordData = res.data.list
                        this.uploadListTotal = res.data.total
                    }
                }
                )
        },
        getMemberStatus() {
            this.$http.get("http://memberapi.iqincheng.com/member/syncStatus").then(
                response => {
                    let res = response.data
                    if(res.code == 0) {
                        this.memberStatusInfo = res.data
                        this.memberStatusInfo.startTime = this.memberStatusInfo.startTime.slice(0, 10)
                        this.memberStatusInfo.endTime = this.memberStatusInfo.endTime.slice(0, 10)
                    }
                    
                }
            )
        },
        getTotalMember() {
            this.infoLoading = true
            this.$http.get("http://memberapi.iqincheng.com/member/total").then(
                response => {
                    this.infoLoading = false
                    let res = response.data
                    if (res.code == 0) {
                        this.totalMember = res.data
                    }
                }
            )
        },
        pageChange(val) {
            this.page = val
            this.getMemberInfoList()
        },
        uploadListPageChange(val) {
            this.uploadListPage = val
            this.getUploadList()
        },
        alertSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        alertFail(msg) {
            this.$message.error(msg);
        },
        showDetail(info) {
            this.detailContainerVisible = true
            this.detailInfo = info
        },
        updateMemberInfo() {
            this.detailContainerVisible = false
            let params = {
                'id': this.detailInfo.id,
                'mobile': this.detailInfo.mobile,
                'email': this.detailInfo.email,
                'qq': this.detailInfo.qq,
                'wx': this.detailInfo.wx
            }
            if (this.detailInfo.birthday) {
                params.birthday = formatDate(this.detailInfo.birthday)
            }

            this.$http.post("http://memberapi.iqincheng.com/member/update", params)
                .then(
                response => {
                    if (response.data.code == 0) {
                        this.alertSuccess('修改成功')
                        //this.getMemberInfoList()
                    } else {
                        this.alertFail('修改出错')
                    }
                }
                )
        },
        getMemberInfoList() {
            this.tableLoading = true
            let params = {
                pageSize: this.pageSize,
                page: this.page
            }
            if (this.memberInfoData.nickName) {
                params.buyerNick = this.memberInfoData.nickName
            }
            if (this.selectValue) {
                params.grade = this.selectValue
            }
            if (this.memberInfoData.tradeCount.min) {
                params.tradeCount = this.memberInfoData.tradeCount.min
            }
            if (this.memberInfoData.tradeCount.max) {
                params.endTradeCount = this.memberInfoData.tradeCount.max
            }
            if (this.memberInfoData.money.min) {
                params.tradeAmount = this.memberInfoData.money.min
            }
            if (this.memberInfoData.money.max) {
                params.endTradeAmount = this.memberInfoData.money.max
            }
            if (this.memberInfoData.tradeTime.begin) {
                params.lastTradeTime = this.memberInfoData.tradeTime.begin
            }
            if (this.memberInfoData.tradeTime.end) {
                params.endLastTradeTime = this.memberInfoData.tradeTime.end
            }
            if (this.beginLastTradeTime) {
                params.lastTradeTime = this.beginLastTradeTime
            }
            if (this.endLastTradeTime) {
                params.endLastTradeTime = this.endLastTradeTime
            }

            this.$http.get("http://memberapi.iqincheng.com/member/list", {
                params
            }).then(
                response => {
                    this.tableLoading = false
                    let res = response.data
                    if(res.code == 0) {
                        this.memberInfoList = res.data.list
                        this.memberInfoListNumber = res.data.total
                    }
                }
                )
        },
        uploadProgress (event, file, fileList) {
            this.uploadPecent = parseInt(event.percent)
        }
    }

}
</script>
<style scoped lang="scss">
@import "font/iconfont.css";
.data-container {
    background: #fff;
    padding: 0 15px 20px;
    margin-bottom: 20px;
}

.data-title,
.common-title,
.msg-title {
    height: 47px;
    line-height: 47px;
    font-size: 18px;
    color: #666;
    font-weight: bold;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 15px;
}

.data-msg {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.data-msg a {
    color: #245269;
}

.complete {
    margin-top: 15px;
}

.complete-item {
    height: 168px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    position: relative;
}

.complete-item .item-title {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-radius: 0 3px;
    text-align: center;
    font-size: 14px;
}

.info-button {
    display: block;
    margin: 20px auto;
    color: #fff;
    background-color: #20a0ff;
    text-align: center;
    line-height: 36px;
    width: 110px;
    height: 36px;
    border-radius: 5px;
    font-size: 14px;
    width: 116px;
    cursor: pointer;
}

.margin-button {
    display: block;
    margin: 20px auto;
}

.upload {
    width: 116px;
    margin: 10px auto 0;
}

.upload-record {
    font-size: 12px;
    text-align: center;
    margin-top: 20px;
    span {
        color: #337ab7;
        cursor: pointer;
    }
}

.member-status {
    font-size: 12px;
    padding: 8px;
    p {
        margin-bottom: 5px;
        span {
            color: #20a0ff;
        }
        em {
            font-style: normal;
            text-align: left;
        }
    }
}

.total-member {
    text-align: center;
    line-height: 20px;
    padding-top: 15px;
    margin-bottom: 30px;
    .member-item {
        div {
            padding-top: 10px;
        }
        p {
            margin-bottom: 5px;
        }
    }
}




.my-input {
    width: 70%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: none;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.my-label {
    width: 30%;
    font-size: 14px;
}

.my-input :focus {
    outline: none;
    border-color: #20a0ff;
}

.el-date-editor.el-input {
    width: 100%;
}


.change-page {
    margin-top: 15px;
    text-align: center;
}



.link :hover {
    background: rgb(249, 200, 85);
    border-color: rgb(249, 200, 85);
    color: #fff;
}

.avatar {
    width: 99px;
    height: 99px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
}

.detail-edit {
    margin-bottom: 15px;
    .detail-edit-left {
        text-align: left;
    }
    .detail-edit-left {
        text-align: right;
    }
    span {
        width: 15%;
        float: left;
        line-height: 36px;
        height: 36px;
    }
    .el-input {
        width: 70%;
        float: left;
    }
}




/*9.25开会后加*/

// .search-item-right{
//     text-align: right;
// }
// .search-item-left{
//     text-align: left;
// }
// .search-item-center{
//     text-align: center;
// }
.search-box {
    padding: 16px;
    color: #666;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    overflow: auto;
    font-size: 14px;
    margin: 16px 0;
}

.text {
    text-align: center;
    line-height: 36px;
}

.line {
    text-align: center;
    line-height: 36px;
}

.link {
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 10px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid rgb(191, 203, 217);
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    background-color: #20a0ff;
    color: #fff;
    margin-left: 8px;
}

.middle-space {
    margin-bottom: 16px;
}

.big-space {
    margin-top: 32px;
}

.detail-item {
    margin-bottom: 16px;
    height: 36px;
    line-height: 36px;
}


.form .detail-item>.el-col {
    background: #fff;
}

.detail-item .el-col>div {
    padding-left: 126px;
    position: relative;
    height: 100%;
}

.detail-item-span {
    position: absolute;
    width: 126px;
    top: 0;
    left: 0;
    text-align: right;
    color: #292929;
}

.el-form-item__label {
    color: #292929;
    font-weight: bold;
}

.detail-item-data {
    // background:#99a9bf;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 8px;
    border-radius: 3px;
}

.detail-item-1 {
    margin-bottom: 32px;
}

.label {
    text-align: right;
    line-height: 36px;
}

.buttons-right {
    float: right;
}

.table-title {
    text-align: right;
    border-right: 1px solid #333;
}

.table-content {
    text-indent: 8px;
}

.table-row {
    border: 1px solid #333;
    border-top: none;
}

.el-row-first .table-row {
    border-right: none;
}

.avatar-table {
    border: 1px solid #333;
    box-sizing: border-box;
}

.table-row-first {
    border-top: 1px solid #333;
}

.middle_line {
    height: 230px;
    position: absolute;
    top: 175px;
    left: 0;
    right: 0;
    margin: auto;
    width: 1px;
    background: #ccc;
}

.member-item {
    box-shadow: 0 0 1px #aaaaaa;
    padding-left: 90px;
    position: relative;
    height: 75px;
    border-radius: 5px;
    .icon-container {
        position: absolute;
        height: 50px;
        width: 50px;
        background: #20a0ff;
        top: 12px;
        left: 12px;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        .icon {
            font-size: 24px;
            color: #fff;
        }
    }
}

.member-item>p {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    text-align: left;
    text-indent: 16px;
}

.member-item>div {
    p {
        font-size: 12px;
        color: #989898;
    }
    height:60px;
    text-align: left;
    span {
        font-size: 20px;
        font-weight: bold;
        color: #666;
    }
    em {
        font-size: 12px;
        font-style: normal;
        margin-left: 8px;
    }
}
</style>


