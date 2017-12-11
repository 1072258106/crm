<template>
    <div>

        <el-row :gutter="24">
            <el-col :md="6">
                <div class="myinfos">
                    <p>我的信息</p>
                    <ul>
                        <li>我的账户：{{userInfo.seller_nick}}</li>
                        <li>当前版本：{{userInfo.version}}</li>
                        <li>到期时间：{{userInfo.deadline}}
                            <a href="https://fuwu.taobao.com/ser/detail.htm?service_code=FW_GOODS-1926295" target="_blank">软件续费</a>
                        </li>
                        <li>短信余额：{{userInfo.sms_remainder}}
                            <router-link to="/recharge">短信充值</router-link>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :md="6">
                <div class="banners">
                    <a :href="linkUrl" target="_blank">
                        <img src="../../../static/img/banner500.jpg" alt="" width="100%" height="126"></a>
                </div>
            </el-col>
            <el-col :md="6">
                <div class="banners">
                    <a :href="linkUrl" target="_blank"><img src="../../../static/img/banner300.jpg" width="100%" height="126" alt=""></a>
                </div>
            </el-col>
            <el-col :md="6">
                <div class="banners">
                    <a :href="rechargeLink" target="_blank"><img src="../../../static/img/banner10.jpg" width="100%" height="126" alt=""></a>
                </div>
            </el-col>

            <el-col :md="18">
                <div class="notices">
                    <div>
                        <ul style="overflow:auto;height:50px;">
                            <li v-for="items in notice.list" :key="items.id">
                                <el-row>
                                    <el-col :span="16">
                                        <a href="javascript:void(0)" @click="showDetail(items.id)">{{items.title}}</a>
                                    </el-col>
                                    <el-col :span="8">
                                        <span>{{items.create_time}}</span>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!--头部广告中心模块(隐藏)-->

        <el-row :gutter="24">
            <el-col :lg="18">
                <div class="data-center">
                    <div class="data-title">
                        数据中心
                        <div class="data-tab">
                            <a href="javascript:void(0)" :class="{'active':time == 1}" @click="time = 1">昨日</a>
                            <a href="javascript:void(0)" :class="{'active':time == 7}" @click="time = 7">近7天</a>
                            <a href="javascript:void(0)" :class="{'active':time == 30}" @click="time = 30">近30天</a>
                        </div>
                    </div>
                    <div class="data-info">
                        <el-row v-loading="loading" style="height:152px;">
                            <el-col :span="4" v-for="(stat, index) in statistics" :key="stat.title">
                                <div :class="[{'data-list':index != 5},{'data-list6':index == 5}]">
                                    <span class="icon-container">
                                        <i :class="'icon iconfont icon-'+iconList[index]"></i>
                                    </span>
                                    <span class="member">{{stat.title}}</span>
                                    <p>{{['下单客户','发送条数','催付订单','互动次数','复购人数','收到好评'][index]}}：
                                        <b>
                                            <span>{{stat.value[0]}}</span>{{['人','条','单','次','人','个'][index]}}</b>
                                    </p>
                                    <p>{{['付款客户','成功条数','催付成功','发放积分','复购订单','收到中差评'][index]}}：
                                        <b>
                                            <span>{{stat.value[1]}}</span>{{['人','条','单','','单','个'][index]}}</b>
                                    </p>
                                    <p>{{['新增会员','成功率','挽救金额','兑换积分','复购金额','收到追评'][index]}}：
                                        <b>
                                            <span>{{stat.value[2]}}</span>{{['人','%','元','','元','个'][index]}}</b>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>

            <el-col :lg="6" :md="24">
                <div class="myinfo">
                    <p>我的信息</p>
                    <ul>
                        <li>我的账户：{{userInfo.seller_nick}}</li>
                        <li>当前版本：{{userInfo.version}}</li>
                        <li>到期时间：{{userInfo.deadline}}
                            <a href="https://fuwu.taobao.com/ser/detail.htm?service_code=FW_GOODS-1926295" target="_blank">软件续费</a>
                        </li>
                        <li>短信余额：{{userInfo.sms_remainder}}
                            <router-link to="/recharge">短信充值</router-link>
                        </li>
                    </ul>
                </div>
            </el-col>
            <!-- 我的信息 -->
        </el-row>
        <!--数据中心模块-->

        <el-row :gutter="24">
            <el-col :lg="18" :md="24">
                <div class="data-common">
                    <div class="common-title">
                        常用功能
                    </div>
                    <div class="common-info">
                        <el-row>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" placement="top-start">
                                    <div slot="content">短信群发：聚划算、大促、店庆、上<br/>新、清仓等活动群发短信通知会员</div>
                                    <router-link to="/activity">
                                        <div class="entry">
                                            <i class="icon iconfont icon-xinxi"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">短信群发</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" placement="top-start">
                                    <div slot="content">订单催付：针对下单未付款的<br/>客户，自动发短信提醒客户付款</div>
                                    <router-link to="/remind/group">
                                        <div class="entry" style="background:#98d87d;">
                                            <i class="icon iconfont icon-cuifu"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">订单催付</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" placement="top-start">
                                    <div slot="content">发货提醒：商家在卖家后台点发货<br/>后，系统将自动发短信通知买家</div>
                                    <router-link to="/care/2">
                                        <div class="entry" style="background:#ffd562;">
                                            <i class="icon iconfont icon-02"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">发货提醒</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" placement="top-start">
                                    <div slot="content">到货提醒：快递到达客户所在<br/>城市自动发短信通知客户</div>
                                    <router-link to="/care/3">
                                        <div class="entry" style="background:#f27b71;">
                                            <i class="icon iconfont icon-daohuo"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">到货提醒</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                    <div slot="content">签收提醒：客户签收快递后，<br/>自动发短信提醒客户引导好评</div>
                                    <router-link to="/care/9">
                                        <div class="entry" style="background:#8996e7;">
                                            <i class="icon iconfont icon-shouhuo"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">签收提醒</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                    <div slot="content">升级关怀：客户在本店的会员<br/>等级提升，自动发短信通知客户</div>
                                    <router-link to="/follow/1">
                                        <div class="entry" style="background:#ff6699;">
                                            <i class="icon iconfont icon-shengjivip"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">升级关怀</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                    <div slot="content">会员分组：通过选择多种标签<br/>组合筛选出自己的目标会员</div>
                                    <router-link to="/member/my_group">
                                        <div class="entry" style="background:#98c0ff;">
                                            <i class="icon iconfont icon-huiyuan"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">会员分组</p>
                            </el-col>
                            <el-col :span="3" class="list-show">
                                <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                    <div slot="content">积分设置：设置本店的会员积分规则，<br/>客户通过积分任务来获取积分兑换奖品</div>
                                    <router-link to="/integral">
                                        <div class="entry" style="background:#54beb6;">
                                            <i class="icon iconfont icon-jifen"></i>
                                        </div>
                                    </router-link>
                                </el-tooltip>
                                <p class="common">积分设置</p>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>

            <el-col :span="6">
                <div class="notice">
                    <p>系统公告</p>
                    <div>
                        <ul style="overflow:auto;height:140px;">
                            <li v-for="items in notice.list" :key="items.id">
                                <el-row>
                                    <el-col :lg="16" :md="24">
                                        <a href="javascript:void(0)" @click="showDetail(items.id)">{{items.title}}</a>
                                    </el-col>
                                    <el-col :lg="8" :md="24">
                                        <span>{{items.create_time}}</span>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!--常用功能模块模块-->

        <el-row :gutter="24">
            <el-col :lg="18" :md="24">
                <div class="msg-center">
                    <div class="msg-title">
                        短信中心
                    </div>
                    <div class="msg-info">
                        <el-row>
                            <el-col :span="12" style="border-right:1px solid #e4e4e4;height:194px;">
                                <el-row>
                                    <el-col :span="24" class="title">
                                        短信群发&nbsp;&nbsp;&nbsp;
                                        <span>聚划算、大促、店庆、上新、清仓等活动群发短信通知会员</span>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-row>
                                            <el-col :span="6">
                                                <img src="../../../static/img/iconfont-active.png" alt="">
                                            </el-col>
                                            <el-col :span="10" class="unique">
                                                特色介绍：<br/>
                                                <span>支持淘短链</span><br/>
                                                <span>支持发优惠券</span><br/>
                                                <span>支持导入号码发送</span><br/>
                                                <span>专业防360拦截测试</span>
                                            </el-col>
                                            <el-col :span="8" style="margin-top:21px;">
                                                <el-button type="primary" class="msg-btn" @click="testModal.visible = true;testModal.module = 4;">一键测试</el-button><br/>
                                                <el-button type="primary" class="msg-btn" @click="$router.push('/activity')">创建活动</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="24" class="title">
                                        订单催付
                                        <span>客户拍下未付款,通过发短信来催客户付款</span>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-row>
                                            <el-col :span="6">
                                                <img src="../../../static/img/spritesheet.png" alt="">
                                            </el-col>
                                            <el-col :span="10" class="unique">
                                                特色介绍：<br/>
                                                <span>一键跳手淘付款</span><br/>
                                                <span>宝贝分组个性催付</span><br/>
                                                <span>分三个阶段灵活催付</span><br/>
                                                <span>双11等活动定时催付</span>
                                            </el-col>
                                            <el-col :span="8" style="margin-top:21px;">
                                                <el-button type="primary" class="msg-btn" @click="testModal.visible = true;testModal.module = 1;">一键测试</el-button><br/>
                                                <el-button type="primary" class="msg-btn" @click="$router.push('/remind/group')">设置功能</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-dialog @close="handerClose" :title="testModal.module==4?'短信群发测试':'订单催付测试'" :visible.sync="testModal.visible" size="tiny">
                <p style="background:#6d6d6d;color:#fff;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;">{{testModal.module==1?testModal.remind:testModal.activity}}</p>
                <p style="padding-top:15px;background:url(../../../static/img/jiao.png) no-repeat 32px top">
                    短信测试：
                    <el-input v-model="testModal.mobile" placeholder="请输入手机号码" style="width:180px;height:26px;"></el-input>
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="testModal.visible = false">取 消</el-button>
                    <el-button type="primary" @click="testSend">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 测试弹窗 -->
            <!--订单关怀模块-->
            <el-col :lg="18" :md="24">
                <div class="order-data">
                    <p>订单关怀&nbsp;&nbsp;&nbsp;
                        <span>从客户拍下付款到收获评价之间的全自动订单关怀</span>
                    </p>
                    <el-row>
                        <el-col :span="3" style="margin-left:24px;">
                            <el-row>
                                <el-col :span="19">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/10'}" style="display:block;width:100%;" :class="care[8].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">付款关怀：买家付款后,自动发<br/>送短信给买家提示付款成功</div>
                                                <div :class="care[8].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[8].step_name}}</span>
                                                    <i class="icon iconfont icon-payment"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[8].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[8].yesterday}}</span><br>
                                            <span>累计：{{care[8].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="arrow">
                                        <el-row>
                                            <el-col :span="15">
                                                <div class="arrow-left"></div>
                                            </el-col>
                                            <el-col :span="9">
                                                <div class="arrow-right"></div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row>
                                <el-col :span="19">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/1'}" style="display:block;width:100%;" :class="care[0].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">迟发提醒：发货超时自动发短信<br/>安抚买家，解释延迟发货的原因</div>
                                                <div :class="care[0].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[0].step_name}}</span>
                                                    <i class="icon iconfont icon-chifatixing"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[0].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[0].yesterday}}</span><br>
                                            <span>累计：{{care[0].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="arrow">
                                        <el-row>
                                            <el-col :span="15">
                                                <div class="arrow-left"></div>
                                            </el-col>
                                            <el-col :span="9">
                                                <div class="arrow-right"></div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row>
                                <el-col :span="19">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/2'}" style="display:block;width:100%;" :class="care[1].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">发货提醒：商家在卖家后台点发<br/>货后，系统将自动发短信通知买家</div>
                                                <div :class="care[1].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[1].step_name}}</span>
                                                    <i class="icon iconfont icon-02"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[1].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[1].yesterday}}</span><br>
                                            <span>累计：{{care[1].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="arrow">
                                        <el-row>
                                            <el-col :span="15">
                                                <div class="arrow-left"></div>
                                            </el-col>
                                            <el-col :span="9">
                                                <div class="arrow-right"></div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row>
                                <el-col :span="19">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/3'}" style="display:block;width:100%;" :class="care[2].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">到货提醒：快递到达客户所在城<br/>市自动发短信通知客户</div>
                                                <div :class="care[2].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[2].step_name}}</span>
                                                    <i class="icon iconfont icon-daohuo"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[2].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[2].yesterday}}</span><br>
                                            <span>累计：{{care[2].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="arrow">
                                        <el-row>
                                            <el-col :span="15">
                                                <div class="arrow-left"></div>
                                            </el-col>
                                            <el-col :span="9">
                                                <div class="arrow-right"></div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <el-row>
                                <el-col :span="14">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/9'}" style="display:block;width:100%;" :class="care[7].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">签收提醒：客户签收快递后，自<br/>动发短信提醒客户引导好评</div>
                                                <div :class="care[7].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[7].step_name}}</span>
                                                    <i class="icon iconfont icon-shouhuo"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[7].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[7].yesterday}}</span><br>
                                            <span>累计：{{care[7].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="9">
                                    <div class="arrow uni-arrow">
                                        <el-row>
                                            <el-col :span="14">
                                                <div class="arrow-one"></div>
                                            </el-col>
                                            <el-col :span="1">
                                                <div class="arrow-two">

                                                </div>
                                            </el-col>
                                            <el-col :span="9">
                                                <el-row>
                                                    <el-col :span="16">
                                                        <div class="arrow-three"></div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="arrow-four"></div>
                                                    </el-col>
                                                    <el-col :span="16" style="margin-top:138px;">
                                                        <div class="arrow-three"></div>
                                                    </el-col>
                                                    <el-col :span="8" style="margin-top:138px;">
                                                        <div class="arrow-four"></div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="7">
                            <el-row style="position:absolute;top:-80px;">
                                <el-col :span="12" style="height:126px;margin-bottom:28px;">
                                    <el-row>
                                        <el-col :span="16">
                                            <div class="order-flow">
                                                <router-link :to="{path:'/care/5'}" style="display:block;width:100%;" :class="care[3].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                                    <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                        <div slot="content">好评提醒：客户确认收货后未评<br/>价，自动发短信提醒客户好评</div>
                                                        <div :class="care[3].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                            <span>{{care[3].step_name}}</span>
                                                            <i class="icon iconfont icon-kefu"></i>
                                                        </div>
                                                    </el-tooltip>
                                                </router-link>
                                                <div class="flow-bottom">
                                                    <span>状态：
                                                        <i v-if="care[3].step_status==1" style="color:#108ee9;">已开启</i>
                                                        <i v-else>已关闭</i>
                                                    </span><br>
                                                    <span>昨日：{{care[3].yesterday}}</span><br>
                                                    <span>累计：{{care[3].total}}</span>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="arrow">
                                                <el-row>
                                                    <el-col :span="20">
                                                        <div class="arrow-left"></div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="arrow-right"></div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8" style="height:126px;margin-bottom:28px;">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/7'}" style="display:block;width:100%;" :class="care[5].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">差评安抚：客户给中差评后，自<br/>动发短信安抚客户售后介入</div>
                                                <div :class="care[5].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[5].step_name}}</span>
                                                    <i class="icon iconfont icon-xinsui"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[5].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[5].yesterday}}</span><br>
                                            <span>累计：{{care[5].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12" style="height:126px;">
                                    <el-row>
                                        <el-col :span="16">
                                            <div class="order-flow">
                                                <router-link :to="{path:'/care/6'}" style="display:block;width:100%;" :class="care[4].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                                    <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                        <div slot="content">好评感谢：买家给好评后自动发<br/>短信感谢买家</div>
                                                        <div :class="care[4].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                            <span>{{care[4].step_name}}</span>
                                                            <i class="icon iconfont icon-haoping"></i>
                                                        </div>
                                                    </el-tooltip>
                                                </router-link>
                                                <div class="flow-bottom">
                                                    <span>状态：
                                                        <i v-if="care[4].step_status==1" style="color:#108ee9;">已开启</i>
                                                        <i v-else>已关闭</i>
                                                    </span><br>
                                                    <span>昨日：{{care[4].yesterday}}</span><br>
                                                    <span>累计：{{care[4].total}}</span>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="arrow">
                                                <el-row>
                                                    <el-col :span="20">
                                                        <div class="arrow-left"></div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="arrow-right"></div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8" style="height:126px;">
                                    <div class="order-flow">
                                        <router-link :to="{path:'/care/8'}" style="display:block;width:100%;" :class="care[6].step_status==0 ? 'icon-gray' : 'icon-blue'">
                                            <el-tooltip class="item" effect="dark" content="" placement="top-start">
                                                <div slot="content">退款关怀：当买家申请退款时，<br/>发送短信关怀买家</div>
                                                <div :class="care[6].step_status==0 ? 'flow-top icon-gray' : 'flow-top icon-blue'">
                                                    <span>{{care[6].step_name}}</span>
                                                    <i class="icon iconfont icon-tuikuan"></i>
                                                </div>
                                            </el-tooltip>
                                        </router-link>
                                        <div class="flow-bottom">
                                            <span>状态：
                                                <i v-if="care[6].step_status==1" style="color:#108ee9;">已开启</i>
                                                <i v-else>已关闭</i>
                                            </span><br>
                                            <span>昨日：{{care[6].yesterday}}</span><br>
                                            <span>累计：{{care[6].total}}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <!--广告模块-->
            <el-col :lg="6" :md="24" style="position:absolute;right:0;">
                <div class="banner">
                    <a :href="linkUrl" target="_blank">
                        <img src="../../../static/img/banner500.jpg" alt="" width="100%" height="126"></a>
                </div>
                <div class="banner">
                    <a :href="linkUrl" target="_blank"><img src="../../../static/img/banner300.jpg" width="100%" height="126" alt=""></a>
                </div>
                <div class="banner">
                    <a :href="rechargeLink" target="_blank"><img src="../../../static/img/banner10.jpg" width="100%" height="126" alt=""></a>
                </div>
                <div class="banner">
                    <a href="https://fuwu.taobao.com/serv/manage_service.htm?service_code=FW_GOODS-1926295" target="_blank"><img src="../../../static/img/haopingsongli.jpg" width="100%" height="126" alt=""></a>
                </div>
            </el-col>
        </el-row>
        <!--短信中心模块-->

        <el-row :gutter="24" style="height:370px;">
            <el-col :lg="18" :md="24">
                <div class="client-data">
                    <p>客户关怀&nbsp;&nbsp;&nbsp;
                        <span>针对老客户,定期自动化维系客户,增加会员粘性</span>
                    </p>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="3" v-for="item in memberCare" :key="item.total" v-if="item.step < 6">
                            <div class="client-flow">
                                <router-link :to="{path:'/follow/'+item.step}">
                                    <el-tooltip class="item" effect="dark" placement="top-start">
                                        <div slot="content" v-html="desc(item.step)"></div>
                                        <div :class="item.step_status == 1 ? 'client-top blue-icon':'client-top'">
                                            <span>{{item.step_name}}</span>
                                            <!-- <img :src="'../../../static/img/membercare_'+item.step+'.png'" /> -->
                                            <i :class="'icon iconfont icon-'+memberCareIcon[item.step]"></i>
                                        </div>
                                    </el-tooltip>
                                </router-link>
                                <div class="client-bottom">
                                    <span>状态：
                                        <span style="color:#108ee9;" v-show="item.step_status == 1">已开启</span>
                                        <span v-show="item.step_status == 0">已关闭</span>
                                    </span><br>
                                    <span>昨日：{{item.yesterday}}</span><br>
                                    <span>累计：{{item.total}}</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :lg="24" :md="24">
                <!--尾部模块-->
                <div class="footer">
                    <p>版权所有@杭州莫名科技有限公司 浙ICP备14001257号-1</p>
                </div>
            </el-col>
        </el-row>
        <!--客户关怀模块-->
        <el-dialog :title="notice.title" :visible.sync="notice.dialogVisible">
            <div v-html="notice.content"></div>
        </el-dialog>
        <!-- 公告弹窗 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            nick: "杭州莫名科技有限公司",
            rechargeLink:
                "https://fuwu.taobao.com/ser/assemble_param.htm?activityCode=&promIds=&subParams=itemCode%3AFW_GOODS-1000302486-v9%2CcycleNum%3A100%2CcycleUnit%3A1&commonParams=onlyContent%3A1%3BoutTradeCode%3A919043971085373440%3BoutTradeType%3A1878925607%3BappKey%3A21664542",
            testModal: {
                visible: false,
                activity:
                    "【亲橙CRM】亲爱的会员，我家宝贝抢先上新了，您是老顾客，已备好专属优待券，快来领取 c.tb.cn/c.1ETGk 回复T退订",
                remind:
                    "【亲橙CRM】亲，您在本店购买的宝贝尚未付款，今天付款即可安排发货，快点链接带回家吧 c.tb.cn/C.5Zndj 回复T退订",
                mobile: "",
                module: 1
            },
            notice: {
                dialogVisible: false,
                list: [],
                title: "",
                content: ""
            },
            care: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            dataCenter: [],
            // 数据中心
            statistics: [],
            // 数据中心时间
            time: 1,
            // 会员关怀
            memberCare: [],
            iconList: [
                "huiyuan1",
                "xinxi",
                "cuifu",
                "jifen",
                "fugouyingxiao",
                "pingjia"
            ],
            memberCareIcon: [
                "",
                "shengjivip",
                "shiyong",
                "kehufugou",
                "shengri",
                "xiumian"
            ],
            loading: false
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        linkUrl() {
            return (
                "http://www.taobao.com/webww/ww.php?ver=3&touid=" +
                this.nick +
                "&siteid=cntaobao&status=2&charset=utf-8"
            );
        }
    },
    methods: {
        //页面数据的初始化
        getData() {
            var _this = this;
            //系统公告接口
            _this.$http.get("/system/notice").then(response => {
                this.notice.list = response.data.data.list;
            });
            //获取数据中心数据
            _this.getCenterData();
            //订单关怀接口
            _this.$http.get("/care/statistics").then(response => {
                this.care = response.data.data;
            });
            //客户关怀接口数据
            _this.$http.get("/member_care/statistics").then(response => {
                this.memberCare = response.data.data;
                console.info("客户关怀", this.memberCare);
            });
        },
        //封装获取数据中心接口方法
        getCenterData() {
            this.loading = true;
            this.$http
                .get("/common/statistics", {
                    params: {
                        time: this.time
                    }
                })
                .then(response => {
                    this.loading = false;
                    this.statistics = response.data.data;
                });
        },
        testSend() {
            if (
                !/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
                    this.testModal.mobile
                )
            ) {
                this.$message.error("请输入有效的手机号");
                return false;
            }
            let content =
                this.testModal.module == 1
                    ? this.testModal.remind
                    : this.testModal.activity;
            let postData = {
                mobile: this.testModal.mobile,
                content: content,
                module: this.testModal.module,
                step: 1
            };
            this.$http.post("/user/send_test", postData).then(response => {
                this.$message({
                    message: response.data.message,
                    type: response.data.code == 0 ? "success" : "error"
                });
                this.testModal.visible = false;
            });
        },
        desc(value) {
            const descs = [
                "",
                "升级关怀：客户在本店的会员等<br/>级提升，自动发短信通知客户",
                "使用关怀：给客户推送产品的使<br/>用手册，让客户更好的体验产品服务",
                "复购关怀：主要针对消费品（如牙膏），当客<br/>户快要使用完了自动发短信提醒客户再次购买",
                "生日关怀：针对登记了会员生日信息的<br/>客户，生日到了自动发短信关怀客户",
                "休眠关怀：针对长时间未来本店购物<br/>的老客户，自动发短信来激活客户",
                "满月礼关怀：客户在本店的首次购<br/>物后满30天，自动发短信关怀客户",
                "周年礼关怀：客户在本店的首次购物<br/>后满一年，自动发短信关怀客户"
            ];
            return descs[value];
        },
        handerClose() {
            this.testModal.mobile = "";
        },
        showDetail(id) {
            this.$http
                .get("system/notice", {
                    params: {
                        id: id
                    }
                })
                .then(response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        const data = responseData.data;
                        this.notice.title = data.title;
                        this.notice.content = data.content;
                        this.notice.dialogVisible = true;
                    }
                });
        }
    },
    watch: {
        time: function(value) {
            this.getCenterData();
        }
    },
    mounted() {
        this.getData();
    }
};
</script>
<style>
.el-loading-mask {
    position: absolute;
    z-index: 1999;
    background-color: rgba(255, 255, 255, .9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
}
</style>

<style scoped lang="scss">
@import "../../../static/css/main.config.scss";
.active {
    color: #2db7f5 !important;
}

.myinfos {
    height: 200px;
    border: 1px solid #e4e4e4;
    background: #fff;
    margin-bottom: 24px;
    p {
        height: 47px;
        line-height: 47px;
        font-size: 18px; // font-weight: bold;
        color: $color;
        border-bottom: 1px solid #e4e4e4;
        text-indent: 1.5em;
    }
    ul {
        margin-left: 28px;
        margin-top: 10px;
        li {
            line-height: 32px;
            font-size: 14px;
            color: $color;
            a {
                font-weight: normal !important;
                font-size: 14px;
                color: #2db7f5;
                float: right;
                margin-right: 15px;
            }
        }
    }
}

.banners {
    height: 126px;
    background: #d0d0d0;
    margin-bottom: 24px;
}

.notices {
    border: 1px solid #e4e4e4;
    height: 50px;
}

.notices ul {
    margin-left: 28px;
}

.notices ul li {
    line-height: 26px;
    font-size: 14px;
    color: #666666;
}

.notices ul li span {
    color: #989898;
    float: right;
    font-size: 12px;
    margin-right: 15px;
}

.myinfos,
.banners,
.notices {
    display: none;
}

@media screen and (max-width: 1516px) {
    .myinfos,
    .banners {
        display: block;
    }
    .notices {
        display: block;
        background: #fff;
        border: 0px;
    }
}

.data-center,
.data-common,
.order-data {
    height: 200px;
    background: #fff;
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
    text-indent: 1.5em;
}

.data-title .data-tab {
    float: right;
    font-size: 12px;
    font-weight: normal;
    margin-right: 11px;
    a {
        color: #656565;
        margin-right: 2px;
    }
}

.data-list {
    border-right: 1px solid #e4e4e4;
    height: 152px;
}

.data-list6 {
    border-right: 0px !important;
    height: 152px;
}

.data-info {
    color: #989898;
    font-size: 12px;
    p {
        margin-left: 18px;
        line-height: 25px;
    }
    .icon-container {
        width: 32px;
        height: 32px;
        background: #fff;
        border: 0;
        margin-left: 18px;
        margin-top: 20px;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        .icon {
            color: #2db7f5;
            font-size: 28px;
        }
    }
    img {
        width: 32px;
        height: 32px;
        background: #fff;
        border: 0;
        margin-left: 18px;
        margin-top: 20px;
    }
    .member {
        margin-left: 22px;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
        position: absolute;
        top: 26px;
    } // }
}

.data-common,
.msg-center {
    margin-top: 24px;
}

.msg-center {
    height: 244px;
    background: #fff;
}

.order-data {
    height: 374px;
    margin-top: -3px;
    p {
        border-top: 1px solid #e4e4e4;
        padding: 8px 25px;
        color: #666;
        font-weight: bold;
        span {
            font-size: 12px;
            color: #989898;
            font-weight: normal;
        }
    }
    .arrow {
        margin-top: 150px;
        .arrow-left {
            background: #e4e4e4;
            height: 5px;
            margin-top: 7px;
        }
        .arrow-right {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 12px solid #e4e4e4;
            border-bottom: 10px solid transparent;
        }
    }
    .uni-arrow {
        margin-top: 71px;
        .arrow-one {
            margin-top: 87px;
            height: 5px;
            background: #e4e4e4;
        }
        .arrow-two {
            margin-top: 5px;
            width: 5px;
            height: 158px;
            background: #e4e4e4;
        }
        .arrow-three {
            margin-top: 5px;
            width: 20px;
            height: 4px;
            background: #e4e4e4;
        }
        .arrow-four {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-left: 19px solid #e4e4e4;
            border-bottom: 8px solid transparent;
        }
    }
    .order-flow {
        height: 126px;
        margin-top: 90px;
        border: 1px solid #e4e4e4;
        border-radius: 6px;
        .flow-top {
            height: 68px;
            border-bottom: 1px solid #e4e4e4;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            span {
                display: block;
                padding-top: 4px;
                height: 22px;
                line-height: 24px;
                font-size: 14px;
                color: #666666;
                font-weight: bold;
            }
            .icon {
                font-size: 30px;
                color: #666;
            }
        }
        .icon-blue {
            .icon {
                color: rgb(16, 142, 233);
            }
        }
        .flow-bottom {
            height: 58px;
            span {
                font-size: 12px;
                margin-left: 9px;
                color: #989898;
                i {
                    font-style: normal;
                }
            }
        }
    }
}

.order p {
    width: 350px;
}

.msg-center .msg-info {
    font-size: 16px;
    color: #666666;
    .title {
        margin: 18px;
        margin-left: 25px;
        font-weight: bold;
    }
    span {
        font-size: 12px;
        color: #989898;
        font-weight: normal;
    }
    .unique {
        font-size: 12px;
        color: #666666;
        font-weight: bold;
        margin-top: 14px;
        line-height: 19px;
    }
    img {
        width: 72px;
        height: 112px;
        margin-left: 25px;
        margin-bottom: 26px;
    }
    .msg-btn {
        margin-bottom: 13px;
        padding: 5px;
    }
}

.client-data {
    overflow: hidden;
    background: #fff;
    p {
        border-top: 1px solid #e4e4e4;
        padding: 8px 25px;
        font-weight: bold;
        color: #666;
        span {
            font-size: 12px;
            color: #989898;
            font-weight: normal;
        }
    }
    & > p + div {
        padding: 25px 25px;
    }
    .client-flow {
        border: 1px solid #e4e4e4;
        border-radius: 6px;
        .client-top {
            border-bottom: 1px solid #e4e4e4;
            text-align: center;
            padding: 10px 0px;
            cursor: pointer;
            color: #666;
            span {
                font-size: 14px;
                color: #666666;
                font-weight: bold;
                display: block;
                margin-bottom: 4px;
            }
            .icon {
                font-size: 28px;
            }
        }
        .blue-icon {
            color: rgb(16, 142, 233) !important;
        }
        .client-bottom {
            padding: 10px;
            span {
                font-size: 12px;
                color: #989898;
            }
        }
    }
}

.common-info {
    color: #666666;
    font-size: 16px;
    .list-show {
        text-align: center;
    }
    .entry {
        width: 62px;
        height: 62px;
        margin: 24px auto;
        background: #49a9ee;
        border-radius: 4px;
        line-height: 62px;
        text-align: center;
        .icon {
            font-size: 40px;
            color: #fff;
        }
    }
}

@media screen and (max-width: 1516px) {
    .myinfo {
        display: none;
    }
}

.myinfo {
    height: 200px;
    background: #fff;
}

.myinfo p,
.notice p {
    height: 47px;
    line-height: 47px;
    font-size: 18px;
    font-weight: bold;
    color: #666666;
    border-bottom: 1px solid #e4e4e4;
    text-indent: 1.5em;
}

.myinfo ul {
    margin-left: 28px;
    margin-top: 10px;
}

.myinfo ul li {
    line-height: 32px;
    font-size: 14px;
    color: #666666;
}

.myinfo ul li a {
    font-size: 14px;
    color: #2db7f5;
    font-weight: bold;
    float: right;
    margin-right: 15px;
}

@media screen and (max-width: 1516px) {
    .notice {
        display: none;
    }
}

.notice {
    height: 200px;
    margin-top: 24px;
    background: #fff;
}

.notice ul {
    margin-left: 28px;
    margin-top: 10px;
}

.notice ul li {
    line-height: 26px;
    font-size: 14px;
    color: #666666;
}

.notice ul li span {
    color: #989898;
    float: right;
    font-size: 12px;
    margin-right: 15px;
}

@media screen and (max-width: 1516px) {
    .banner {
        display: none;
    }
}

.banner {
    height: 126px;
    background: #d0d0d0;
    margin-top: 24px;
}

.footer {
    font-size: 14px;
    color: #ccc;
    height: 43px;
    text-align: center;
    line-height: 43px;
}
</style>