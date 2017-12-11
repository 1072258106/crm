<template>
    <div>
        <!-- 奖品设置 -->
        <div class="table-container margin-bottom-20">
            <el-row :span="24">
                <el-col :span="3" class="title2"> 添加奖品：</el-col>
                <el-button type="primary" @click="openCard" style="margin-right: 5px;">优惠券</el-button>
                <el-button type="primary" @click="openFlow" style="margin-right: 5px;">流量红包</el-button>
                <el-button type="primary" @click="openPurchase" style="margin-right: 5px;">积分换购</el-button>
            </el-row>
        </div>
        <div class="table-container">
            <!-- tab2初始化 -->
            <el-table :data="priceData" border style="margin-bottom:20px;" v-loading="priceLoading">
                <el-table-column prop="prizeType" label="奖品类型" align="left" min-width="100">
                    <template scope="scope">
                        <span v-if="scope.row.prizeType==1">
                            优惠券</span>
                        <span v-if="scope.row.prizeType==2">流量红包</span>
                        <span v-if="scope.row.prizeType==3">积分兑换</span>
                    </template>
                </el-table-column>
                <el-table-column prop="prizeName" label="奖品名称" align="left" min-width="110">
                </el-table-column>
                <el-table-column prop="" label="兑奖有效期" align="center" width="190px">
                    <template scope="scope">
                        <span>
                            {{ scope.row.startTime.substr(0,10)}}—{{ scope.row.endTime.substr(0,10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="prizeCount" label="奖品数量" align="center" min-width="90">
                </el-table-column>
                <el-table-column prop="remanentCount" label="剩余数量" align="center" min-width="90">
                </el-table-column>
                <el-table-column prop="integralCount" label="兑奖消耗" align="center" min-width="90">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" width="180">
                    <template scope="scope">
                        <el-button type="text" @click="editMsg(scope.row.id,scope.row.prizeType)">
                            编辑</el-button>
                        <el-button type="text" @click="deleteMsg(scope.row.id)">删除</el-button>
                        <el-button type="text" @click="exchangeRecord(scope.row.id)">兑换记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="兑换记录" :visible.sync="dialogFormExchange">
            <el-table :data="exchangeData" v-loading="exchangeLoading">
                <el-table-column property="buyerNick" label="会员昵称" width="" align="left"></el-table-column>
                <el-table-column property="integralCount" label="兑奖消耗" align="center"></el-table-column>
                <el-table-column property="prizeId" label="奖品ID" align="center"></el-table-column>
                <el-table-column property="createTime" label="时间" width="110" align="center">
                </el-table-column>
                <!-- <el-table-column property="shopId" label="shopId" align="center"></el-table-column> -->
            </el-table>
            <div class=" top16  text-center">
                <el-pagination v-if="exchangeTotal > 10" layout="total,prev, pager, next,jumper" @current-change="exchangeRecord" :current-page.sync="exchangeCurrentPage" :page-size="size" :total="exchangeTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormExchange = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormExchange = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 兑换记录弹框start -->
        <el-dialog title="优惠券" :visible.sync="dialogFormVisible1">
            <div class="title_tag">推荐使用店铺优惠券，请勿设置无门槛优惠券，以免因链接泄露导致损失。</div>
            <el-form :model="cardForm" :rules="form_rules" ref="cardForm">
                <el-form-item label="奖品名称：" :label-width="formLabelWidth" prop="prizeName">
                    <el-input v-model="cardForm.prizeName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换时间：" :label-width="formLabelWidth" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择时间" v-model="cardForm.startTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择时间" v-model="cardForm.endTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="优惠券链接：" :label-width="formLabelWidth" prop="couponLink">
                    <el-col :span="16">
                        <el-input v-model="cardForm.couponLink" auto-complete="off" placeholder="建议使用店铺优惠券"></el-input>
                    </el-col>
                    <el-col :span="8" style="padding-left: 1%;">
                        <a href="https://login.taobao.com/member/login.jhtml?redirectURL=http%3A%2F%2Fsmf.taobao.com%2Findex.htm%3Fmenu%3Dyhkq%26module%3Dyhkq" target="_blank">去创建优惠券链接 </a>
                    </el-col>
                </el-form-item>
                <el-form-item label="奖品数量：" :label-width="formLabelWidth" prop="prizeCount">
                    <el-input v-model.number="cardForm.prizeCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换消耗积分：" :label-width="formLabelWidth" prop="integralCount">
                    <el-input v-model.number="cardForm.integralCount" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="cardAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 优惠券弹框start 1-->
        <el-dialog title="流量红包" :visible.sync="dialogFormVisible2">
            <div class="title_tag" style="line-height: 30px;">要使用流量钱包的奖品首先需要去淘宝后台签约开启流量钱包权益，并且给流量钱包预充值，确保帐户可用余额充足！手机流量奖品创建后由系统自动发放，用户获得后系统将立即发奖，无需手工操作，当账户余额不足时将停止发放！</div>
            <el-form :model="flowForm" :rules="form_rules" ref="flowForm">
                <el-form-item label="奖品名称：" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="flowForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换时间：" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-form-item prop="startTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择日期" v-model="flowForm.startTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择时间" v-model="flowForm.endTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="流量红包大小：" :label-width="formLabelWidth">
                    <el-select v-model="flowForm.selected" placeholder="">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value "></el-option>
                    </el-select>
                    <span style="padding-left: 1%;">您还有没开启流量钱包</span>
                    <a href="https://login.taobao.com/member/login.jhtml?redirectURL=http%3A%2F%2Fecrm.taobao.com%2Fjxt%2FjxtHomepage.htm#//ecrm.taobao.com/benefit/advanced/benefit_type_list.htm?from=juxingtai&vip=true" target="_blank" style="padding-left: 1%;">前去开启 </a>
                </el-form-item>
                <el-form-item label="奖品数量：" :label-width="formLabelWidth" prop="priceNum">
                    <el-input v-model.number="flowForm.priceNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换消耗积分：" :label-width="formLabelWidth" prop="lostIntegral">
                    <el-input v-model.number="flowForm.lostIntegral" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="flowAdd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="积分换购" :visible.sync="dialogFormVisible3">
            <div class="title_tag" style="line-height: 30px;">什么是积分换购？会员消耗积分兑换“粉丝福利购”的购买权限，先领券后购物，可以直接用优惠券抵价。积分换购的商品必须加入【淘宝客】推广计划才能添加。</div>
            <el-form :model="purchaseForm" :rules="form_rules" ref="purchaseForm">
                <el-form-item label="奖品名称：" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="purchaseForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="兑换时间：" :label-width="formLabelWidth" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseForm.startTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime" style="padding: 0px;">
                            <el-date-picker type="date" placeholder="选择时间" v-model="purchaseForm.endTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品链接：" :label-width="formLabelWidth" prop="goodsLink">
                    <el-input class="." v-model="purchaseForm.goodsLink" @focus="goodsList" :readonly="true" auto-complete="off" style="background: #eee;"></el-input>
                </el-form-item>
                <el-form-item label="优惠券链接：" :label-width="formLabelWidth" prop="cardLink">
                    <el-col :span="16">
                        <el-input v-model="purchaseForm.cardLink" auto-complete="off" placeholder="建议使用店铺优惠券"></el-input>
                    </el-col>
                    <el-col :span="8" style="padding-left: 1%;">
                        <a href="https://login.taobao.com/member/login.jhtml?redirectURL=http%3A%2F%2Fsmf.taobao.com%2Findex.htm%3Fmenu%3Dyhkq%26module%3Dyhkq" target="_blank" style="padding-left: 1%;">去创建优惠券链接 </a>
                    </el-col>
                </el-form-item>
                <el-form-item label="奖品数量：" :label-width="formLabelWidth" prop="priceNum">
                    <el-input v-model.number="purchaseForm.priceNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="淘宝客PID：" :label-width="formLabelWidth">
                    <el-input v-model="tbPid" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="兑换消耗积分：" :label-width="formLabelWidth" prop="lostIntegral">
                    <el-input v-model.number="purchaseForm.lostIntegral" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="purchaseAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 积分换购弹框start3 -->
        <el-dialog title="请选择您想添加的商品" :visible.sync="dialogImgLink">
            <el-table :data="imgData" v-loading="imgLoading">
                <el-table-column property="" label="图片">
                    <template scope="scope">
                        <div style="padding-top: 8px;">
                            <img :src="scope.row.pic_url" width="60" height="60"></div>
                    </template>
                </el-table-column>
                <el-table-column property="title" label="名称" width="200" align="left"></el-table-column>
                <el-table-column property="price" label="价格" align="centr"></el-table-column>
                <el-table-column property="" label="状态" align="left">
                    <template scope="scope">
                        <span class="text-primary" v-if="scope.row.approveStatus=='onsale'">出售中</span>
                        <span class="text-primary" v-else>下架</span>
                    </template>
                </el-table-column>
                <el-table-column property="" label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="confirmGoods(scope.row.numIid)">
                            选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class=" top20  text-center">
                <el-pagination v-if="goodsTotal > 10" layout="total,prev, pager, next,jumper" @current-change="goodsList" :current-page.sync="goodscurrentPage" :page-size="size" :total="goodsTotal">
                </el-pagination>
            </div>
        </el-dialog>
        <!-- 商品链接弹框start 4-->
    </div>
</template>
<script>
import { formatDate } from '../../../function/formatDate.js'
export default {
    data() {
        var validateURL = (rule, value, callback) => {
            var myreg1 = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
            if (!myreg1.test(value) && value != '') {
                callback(new Error('url格式不合法!'));
            } else {
                callback();
            }
        };
        return {
            editId: '',
            editType: '',
            exchangeTotal: 0,
            exchangeCurrentPage: 1,
            sendCurrentPage: 1,
            dialogFormMsg: false,
            smsNoticeValue1: "",
            msgWidth: "0px",
            goodscurrentPage: 1,
            goodsTotal: "",
            size: 10,
            priceData: [],
            imgData: [],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            dialogFormExchange: false,
            dialogImgLink: false,
            formLabelWidth: '110px',
            cardForm:
            {
                prizeName: "",
                startTime: "",
                endTime: "",
                couponLink: "",
                prizeCount: "",
                integralCount: ""
            },
            flowForm: {
                name: "",
                startTime: "",
                selected: 1,
                endTime: "",
                link: "",
                priceNum: "",
                lostIntegral: ""
            },
            purchaseForm: {
                name: "",
                startTime: "",
                selected: "",
                endTime: "",
                goodsLink: "",
                cardLink: "",
                priceNum: "",
                lostIntegral: ""
            },
            tbPid: "",
            numIid: "",
            statusOptions: [
                {
                    label: "1M流量包部",
                    value: 1
                },
                {
                    label: "2M流量包",
                    value: 2
                },
                {
                    label: "3M流量包",
                    value: 3
                },
                {
                    label: "5M流量包",
                    value: 5
                },
                {
                    label: "10M流量包",
                    value: 10
                },
                {
                    label: "20M流量包",
                    value: 20
                },
                {
                    label: "30M流量包",
                    value: 30
                },
                {
                    label: "50M流量包",
                    value: 50
                }
            ],
            boxType: 3,
            exchangeData: [{
            }],
            // 正则验证
            form_rules: {
                prizeName: [{ required: true, message: '奖品名称不能为空', trigger: 'change' }],
                startTime: [{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }],
                endTime: [{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }],
                couponLink: [{ validator: validateURL, trigger: 'blur' }],
                prizeCount: [{ required: true, message: '奖品数量不能为空', }, { type: 'number', message: '奖品数量必须为数字值' }],
                integralCount: [{ required: true, message: '兑换消耗积分不能为空', }, { type: 'number', message: '兑换消耗积分必须为数字值' }],
                name: [{ required: true, message: '请输入奖品名称', trigger: 'change' }],
                priceNum: [{ required: true, message: '奖品数量不能为空' }, { type: 'number', message: '奖品数量必须为数字值' }],
                lostIntegral: [{ required: true, message: '兑换消耗积分不能为空' }, { type: 'number', message: '兑换消耗积分必须为数字值' }],
                goodsLink: [{ required: true, message: '商品链接不能为空', trigger: 'change' }],
                cardLink: [{ validator: validateURL, trigger: 'blur' }]
            },
            priceLoading: false,
            exchangeLoading: false,
            imgLoading: false
        }
    },
    methods: {
        checkDate(startTime, endTime) {
            if (startTime.getTime() - endTime.getTime() > 0) {
                this.$message.error('结束时间不能小于开始时间！');
                return false;
            } else {
                return true;
            }
        },
        openCard() {
            this.editId = '';
            this.dialogFormVisible1 = true;
            this.boxType = 1;
            this.cardForm.prizeName = '';
            this.cardForm.startTime = '';
            this.cardForm.endTime = '';
            this.cardForm.couponLink = '';
            this.cardForm.prizeCount = '';
            this.cardForm.integralCount = '';
            if (this.$refs.cardForm) {
                this.$refs.cardForm.resetFields();
            }
        },
        openFlow() {
            this.editId = '';
            this.dialogFormVisible2 = true;
            this.boxType = 2;
            this.flowForm.name = '';
            this.flowForm.startTime = '';
            this.flowForm.endTime = '';
            this.flowForm.selected = 1;
            this.flowForm.priceNum = '';
            this.flowForm.lostIntegral = '';
            if (this.$refs.flowForm) {
                this.$refs.flowForm.resetFields();
            }
        },
        openPurchase() {
            this.editId = '';
            this.dialogFormVisible3 = true;
            this.boxType = 3;
            this.purchaseForm.name = '';
            this.purchaseForm.startTime = '';
            this.purchaseForm.endTime = '';
            this.purchaseForm.goodsLink = '';
            this.purchaseForm.cardLink = '';
            this.purchaseForm.priceNum = '';
            this.purchaseForm.lostIntegral = '';
            if (this.$refs.purchaseForm) {
                this.$refs.purchaseForm.resetFields();
            }
        },
        // 获取商品链表
        goodsList() {
            this.imgLoading = true;
            this.$http.get('/user/items')
                .then(
                response => {
                    this.imgLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.dialogImgLink = true;
                        this.imgData = responseData.data.list;
                        this.goodsTotal = responseData.data.total;
                    }
                }
                )
        },
        confirmGoods(numIid) {
            this.numIid = numIid;
            this.dialogImgLink = false;
            this.purchaseForm.goodsLink = "https://item.taobao.com/item.htm?id=" + numIid;
        },
        prizeList() {
            this.priceLoading = true;
            this.$http.get('http://memberapi.iqincheng.com/integral/prizeList')
                .then(
                response => {
                    this.priceLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.priceData = responseData.data.list;
                        if(this.priceData.length > 0) {
                            this.tbPid = responseData.data.list[0].tbPid;
                        }
                    }
                }
                )
        },
        // 优惠券添加
        cardCreate() {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeCreate', {
                prizeType: this.boxType,
                prizeName: this.cardForm.prizeName,
                startTime: formatDate(this.cardForm.startTime),
                endTime: formatDate(this.cardForm.endTime),
                couponLink: this.cardForm.couponLink,
                prizeCount: this.cardForm.prizeCount,
                integralCount: this.cardForm.integralCount,
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible1 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 流量红包添加
        flowCreate() {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeCreate', {
                prizeType: this.boxType,
                prizeName: this.flowForm.name,
                startTime: formatDate(this.flowForm.startTime),
                endTime: formatDate(this.flowForm.endTime),
                phoneTraffic: this.flowForm.selected,
                prizeCount: this.flowForm.priceNum,
                integralCount: this.flowForm.lostIntegral
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible2 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 积分换购
        purchaseCreate() {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeCreate', {
                prizeType: this.boxType,
                prizeName: this.purchaseForm.name,
                startTime: formatDate(this.purchaseForm.startTime),
                endTime: formatDate(this.purchaseForm.endTime),
                tbPid: this.tbPid,
                itemLink: this.purchaseForm.goodsLink,
                numIid: this.numIid,
                couponLink: this.purchaseForm.cardLink,
                prizeCount: this.purchaseForm.priceNum,
                integralCount: this.purchaseForm.lostIntegral
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible3 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        deleteMsg(id) {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeDelete', {
                id: id
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 编辑信息
        editMsg(id, type) {
            this.editId = id;
            this.editType = type;
            this.$http.get('http://memberapi.iqincheng.com/integral/prizeInfo', {
                params: {
                    id: id
                }
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        if (type == 1) {
                            let data = responseData.data;
                            this.dialogFormVisible1 = true;
                            this.cardForm.prizeName = data.prizeName;
                            this.cardForm.startTime = new Date(data.startTime);
                            this.cardForm.endTime = new Date(data.endTime);
                            this.cardForm.couponLink = data.couponLink;
                            this.cardForm.prizeCount = data.prizeCount;
                            this.cardForm.integralCount = data.integralCount;
                        }
                    }
                    if (type == 2) {
                        let data = responseData.data;
                        this.flowForm.name = data.prizeName;
                        this.flowForm.startTime = new Date(data.startTime);
                        this.flowForm.endTime = new Date(data.endTime);
                        this.flowForm.selected = data.phoneTraffic;
                        this.flowForm.priceNum = data.prizeCount;
                        this.flowForm.lostIntegral = data.integralCount;
                        this.dialogFormVisible2 = true;
                    }
                    if (type == 3) {
                        let data = responseData.data;
                        this.purchaseForm.name = data.prizeName;
                        this.purchaseForm.startTime = new Date(data.startTime);
                        this.purchaseForm.endTime = new Date(data.endTime);
                        this.purchaseForm.goodsLink = data.itemLink;
                        this.purchaseForm.cardLink = data.couponLink;
                        this.purchaseForm.priceNum = data.prizeCount;
                        this.purchaseForm.lostIntegral = data.integralCount;
                        this.dialogFormVisible3 = true;
                        let idx = this.purchaseForm.goodsLink.indexOf("=");
                        let str = this.purchaseForm.goodsLink.substring(idx + 1);
                        this.numIid = str;
                    }
                }
                )
        },
        cardAdd() {
            // 优惠券添加
            if (this.editId) {
                this.$refs['cardForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.cardForm.startTime, this.cardForm.endTime) == false) {
                        return false;
                    }
                    this.confirmEditCard(this.editId, this.editType);
                });
            } else {
                this.boxType = 1;
                this.$refs['cardForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.cardForm.startTime, this.cardForm.endTime) == false) {
                        return false;
                    }
                    this.cardCreate();
                });
            }
        },
        flowAdd() {
            // 流量红包添加
            if (this.editId) {
                this.$refs['flowForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.flowForm.startTime, this.flowForm.endTime) == false) {
                        return false;
                    }
                    this.confirmEditFlow(this.editId, this.editType);
                });
            } else {
                this.boxType = 2;
                this.$refs['flowForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.flowForm.startTime, this.flowForm.endTime) == false) {
                        return false;
                    }
                    this.flowCreate();
                });
            }
        },
        purchaseAdd() {
            if (this.editId) {
                this.$refs['purchaseForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.purchaseForm.startTime, this.purchaseForm.endTime) == false) {
                        return false;
                    }
                    this.confirmEditPurchase(this.editId, this.editType);
                });
            } else {
                this.boxType = 3;
                this.$refs['purchaseForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    if (this.checkDate(this.purchaseForm.startTime, this.purchaseForm.endTime) == false) {
                        return false;
                    }
                    this.purchaseCreate();
                });
            }
        },
        // 确认修改编辑信息优惠券
        confirmEditCard(id, type) {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeEdit', {
                id: id,
                prizeType: type,
                prizeName: this.cardForm.prizeName,
                startTime: formatDate(this.cardForm.startTime),
                endTime: formatDate(this.cardForm.endTime),
                couponLink: this.cardForm.couponLink,
                prizeCount: this.cardForm.prizeCount,
                integralCount: this.cardForm.integralCount,
            }
            )
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible1 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 确认修改编辑信息流量红包
        confirmEditFlow(id, type) {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeEdit', {
                id: id,
                prizeType: type,
                prizeName: this.flowForm.name,
                startTime: formatDate(this.flowForm.startTime),
                endTime: formatDate(this.flowForm.endTime),
                phoneTraffic: this.flowForm.selected,
                prizeCount: this.flowForm.priceNum,
                integralCount: this.flowForm.lostIntegral
            }
            )
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible2 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 确认修改编辑信息积分兑换
        confirmEditPurchase(id, type) {
            this.$http.post('http://memberapi.iqincheng.com/integral/prizeEdit', {
                id: id,
                prizeType: type,
                prizeName: this.purchaseForm.name,
                startTime: formatDate(this.purchaseForm.startTime),
                endTime: formatDate(this.purchaseForm.endTime),
                tbPid: this.tbPid,
                itemLink: this.purchaseForm.goodsLink,
                numIid: this.numIid,
                couponLink: this.purchaseForm.cardLink,
                prizeCount: this.purchaseForm.priceNum,
                integralCount: this.purchaseForm.lostIntegral
            })
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.prizeList();
                        this.dialogFormVisible3 = false;
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                }
                )
        },
        // 兑换记录
        exchangeRecord(id) {
            this.dialogFormExchange = true;
            this.exchangeLoading = true;
            this.$http.get('http://memberapi.iqincheng.com/integral/prizeRecord', {
                params: {
                    prizeId: id,
                    page: this.exchangeCurrentPage,
                    pageSize: 10
                }
            })
                .then(
                response => {
                    this.exchangeLoading = false;
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        this.exchangeData = responseData.data.list;
                        this.exchangeTotal = responseData.data.total;
                    }
                }
                )
        },
    },
    mounted() {
        this.prizeList();
    }
};
</script>
<style lang="scss" scoped>
.title_tag {
    color: #666;
    border: 1px solid #d4f0fc;
    background-color: #e6f3fc;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 45px;
    padding: 8px 16px;
    &>.el-icon-warning:before {
        padding-right: 8px;
    }
}

.title2 {
    font-size: 14px;
    color: #666;
    font-weight: bold;
    width: 85px;
    line-height: 34px;
    padding-left: 15px;
}

.el-dialog__header {
    padding: 20px 33px 0;
}

.el-form-item {
    padding: 10px;
}

.line {
    text-align: center;
    line-height: 36px;
}

.el-dialog__body {
    padding: 30px 60px;
}
</style>



