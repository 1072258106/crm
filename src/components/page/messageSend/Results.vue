<template>
    <div>
        <el-row>
            <!--双十一大促-->
            <el-col :span="24">
                <div class="promotion">
                    <el-row>
                        <el-col :span="24">
                            <div class="pro-title">
                                <h3>{{ ActyName.ac_name }} </h3>
                                <p>创建时间:
                                    <span>
                                        {{ ActyName.ac_created }}
                                    </span>
                                    &emsp;发送时间:
                                    <span>
                                        {{ ActyName.ac_send_time }}
                                    </span>
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="pro-msg">
                                <span :title="'【'+ActyName.ac_sign+'】 '+ActyName.ac_text+' 回复T退订' ">
                                    【{{ActyName.ac_sign}}】 {{ ActyName.ac_text }} 回复T退订</span>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="pro-total">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="pro-each">
                                            <p>营销号码</p>
                                            <span class="count-span-red">
                                                {{ ActyName.ac_count }} <a v-show="ActyName.ac_count>0" :href="globalUrl+'/activity/export?token='+token+'&id='+id" target="_blank"><i class="iconfont icon-xiazai"></i></a>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="pro-each">
                                            <p>字数/占用条数</p>
                                            <span class="count-span-green">
                                                {{ ActyName.message_count }}/<span>{{ ActyName.sms_count }}</span>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="pro-each">
                                            <p>
                                                失败号码
                                                <el-popover placement="right" title="失败可能存在的原因是：" width="320" trigger="hover">
                                                    <img src="../../../../static/img/why.png" alt="" slot="reference" /> 1、 短信内容违规，人工审核不通过；<br>2、 手机号码错误或不存在，停机、关机、欠费、或不在服务区；<br>3、 手机用户收件箱已满；<br>4、 手机用户回复过“N”退订短信，被短信通道列为黑名单；<br>5、 短时间内同一号码营销次数过多，被限制发送；<br>6、 国家政策限制，特殊时期，部分地区限制发送。
                                                </el-popover>
                                            </p>
                                            <span class="count-span-orange">
                                                {{ ActyName.ac_error_count }} <a v-show="ActyName.ac_error_count>0" :href="globalUrl+'/activity/export?token='+token+'&id='+id+'&status=0'" target="_blank"><i class="iconfont icon-xiazai"></i></a>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="pro-each" style="border:0;">
                                            <p>
                                                扣除短信
                                                <el-popover placement="right" title="扣除短信：" width="320" trigger="hover">
                                                    <img src="../../../../static/img/why.png" alt="" slot="reference" /> 短信发送预扣费，按发送成功计费，失败的号码自动返还费用，72小时内返还完成
                                                </el-popover>
                                            </p>
                                            <span class="count-span-blue">
                                                {{(ActyName.ac_count - ActyName.ac_error_count)*ActyName.sms_count }}
                                            </span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <!--活动效果-->
            <el-col :span="24">
                <div class="result">
                    <el-row>
                        <el-col :span="24">
                            <div class="res-title">
                                <h3>活动效果</h3>
                                <p>
                                    <a href="javascript:void(0)" :class="{'text-primary':time == 7}" @click="time=7">近7天</a>
                                    <a href="javascript:void(0)" :class="{'text-primary':time == 15}" @click="time=15">近15天</a>
                                    <a href="javascript:void(0)" :class="{'text-primary':time == 30}" @click="time=30">近30天</a>
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="res-total">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="res-each">
                                            <el-row>
                                                <el-col :span="10" style="height:73px;position:relative;">
                                                    <div class="showtu">
                                                        <img src="../../../../static/img/list1.png" alt="">
                                                    </div>
                                                </el-col>
                                                <el-col :span="14" style="text-align:left;">
                                                    <p>链接打开
                                                        <el-popover placement="right" title="链接打开：" width="320" trigger="hover">
                                                            <img src="../../../../static/img/why.png" alt="" slot="reference" /> 系统只能统计淘短链和亲橙短链的打开次数，其它链接无法统计
                                                        </el-popover>
                                                    </p>
                                                    <span class="count-span-red">{{ ActEffect.open}} </span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="res-each">
                                            <el-row>
                                                <el-col :span="10" style="height:73px;position:relative;">
                                                    <div class="showtu" style="background:#98d87d;">
                                                        <img src="../../../../static/img/list2.png" alt="">
                                                    </div>
                                                </el-col>
                                                <el-col :span="14" style="text-align:left;">
                                                    <p>成交订单(淘宝)</p>
                                                    <span class="count-span-green">{{ ActEffect.volume}}</span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="res-each">
                                            <el-row>
                                                <el-col :span="10" style="height:73px;position:relative;">
                                                    <div class="showtu" style="background:#ffd86e;">
                                                        <img src="../../../../static/img/list3.png" alt="">
                                                    </div>
                                                </el-col>
                                                <el-col :span="14" style="text-align:left;">
                                                    <p>成交金额(淘宝)</p>
                                                    <span class="count-span-orange">{{ ActEffect.amount}}</span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="res-each" style="border:0;">
                                            <el-row>
                                                <el-col :span="10" style="height:73px;position:relative;">
                                                    <div class="showtu" style="background:#f3857c;">
                                                        <img src="../../../../static/img/list4.png" alt="">
                                                    </div>
                                                </el-col>
                                                <el-col :span="14" style="text-align:left;">
                                                    <p>
                                                        ROI(投入产出比)
                                                        <el-popover placement="right" title="ROI(投入产出比)：" width="320" trigger="hover">
                                                            <img src="../../../../static/img/why.png" alt="" slot="reference" /> ROI=淘宝成交金额/短信成本（短信成本按4分/条计算）
                                                        </el-popover>
                                                    </p>
                                                    <span class="count-span-blue">{{ROI}}</span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="res-table">
                                <el-table :data="list" style="width: 100%" max-height="314px;" :border="true" v-loading="listLoading">
                                    <el-table-column prop="date" label="日期" min-width="85" align="center">
                                    </el-table-column>
                                    <el-table-column prop="open" label="打开链接" min-width="85" align="center">
                                    </el-table-column>
                                    <el-table-column prop="volume" label="成交订单" min-width="85" align="center">
                                    </el-table-column>
                                    <el-table-column prop="amount" label="成交金额" min-width="85" align="center">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="85">
                                        <template scope="scope">
                                            <el-button type="text" size="small" @click="getListInfo(scope.row.date)">查看订单</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                        <!-- 分页 -->
                        <el-col :span="24">
                            <div class="block pad text-center">
                                <el-pagination v-if="total>10" :current-page.sync="page.currentPage" @current-change="handleCurrentChange" :page-size="page.size" layout="total, prev, pager, next, jumper" :total="total">
                                </el-pagination>
                            </div>
                        </el-col>
                        <!-- 查看订单 -->
                        <el-dialog title="查看订单" :visible.sync="listInfoVisible" size="large">
                            <el-table :data="effectList" border v-loading="effectLoading">
                                <el-table-column property="buyer_nick" label="姓名" min-width="85"></el-table-column>
                                <el-table-column align="center" property="create_time" label="创建时间" min-width="150"></el-table-column>
                                <el-table-column align="center" property="payment" label="金额" min-width="150"></el-table-column>
                                <el-table-column align="center" property="receiver_mobile" label="手机号码" min-width="150"></el-table-column>
                                <el-table-column align="center" property="tid" label="订单编号" min-width="150"></el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination class="change-page" v-show="effectListTotal > 10" @current-change="getListInfo" :current-page="effectListPage" layout="total, prev, pager, next, jumper" :total="effectListTotal">
                            </el-pagination>
                        </el-dialog>

                        <el-col :span="23">
                            <div class="res-chart">
                                <el-row>
                                    <el-col :span="24" class="res-nav">
                                        <el-radio-group v-model="changeTotal" size="small">
                                            <el-radio-button label="1">成交订单</el-radio-button>
                                            <el-radio-button label="2">成交金额</el-radio-button>
                                            <el-radio-button label="3">打开链接</el-radio-button>
                                        </el-radio-group>
                                        <!-- <ul>
                                            <li :class="{'primary':changeTotal == 1}" @click="changeTotal=1">成交订单</li>
                                            <li :class="{'primary':changeTotal == 2}" @click="changeTotal=2">成交金额</li>
                                            <li :class="{'primary':changeTotal == 3}" @click="changeTotal=3">打开链接</li>
                                        </ul> -->
                                    </el-col>
                                    <el-col :span="24">
                                        <e-charts type="line" :axis="dataChart"></e-charts>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <!--尾部模块-->
                            <div class="footer">
                                <p>版权所有@杭州莫名科技有限公司 浙ICP备14001257号-1{{id}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ECharts from "../../common/ECharts.vue";
export default {
  components: {
    "e-charts": ECharts
  },
  data() {
    return {
      effectList: [],
      listInfoVisible: false,
      effectListTotal: 0,
      effectListPage: 1,
      changeTotal: 1,
      time: 7,
      ActyName: {
        ac_text: "",
        ac_sign: ""
      },
      page: {
        currentPage: 1,
        size: 10
      },
      ActEffect: {
        volume: "",
        amount: "",
        open: "",
        ROI: ""
      },
      tableData: [],
      dataChart: [],
      dataChart1: [],
      dataChart2: [],
      dataChart3: [],
      schartWidth: 0,
      listLoading: false,
      effectLoading: false
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    globalUrl() {
      return this.$store.state.globalApi;
    },
    id() {
      return this.$route.params.id;
    },
    word() {
      return this.ActyName.ac_text.length + this.ActyName.ac_sign.length;
    },
    // ROI() {
    //     let count = this.ActyName.ac_count * this.ActyName.sms_count
    //     let num = count == 0 ? 0 : Math.round(this.ActEffect.amount / (count * 0.04));
    //     return num == 0 ? 0 : (1 / num);
    // },
    ROI() {
      let count = this.ActyName.ac_send_count * this.ActyName.sms_count;
      let inNum = count * 0.04;
      let outNum = this.ActEffect.amount;
      let result = "";
      if (count == 0) {
        result = inNum + "：" + outNum;
      } else {
        let num = Math.round(outNum / inNum);
        result = "1：" + num;
      }
      return result;
    },
    total() {
      console.info("total:", this.tableData.length);
      return this.tableData.length;
    },
    list() {
      let b = this.tableData.slice(
        (this.page.currentPage - 1) * this.page.size,
        this.page.currentPage * this.page.size
      );
      return b;
    }
  },
  methods: {
    getListInfo(date) {
      this.listInfoVisible = true;
      this.effectLoading = true;
      this.$http
        .get("/activity/effect_order", {
          params: {
            id: this.id,
            date: date
          }
        })
        .then(response => {
          this.effectLoading = false;
          console.info("数据", response);
          let res = response.data;
          this.effectList = res.data.list;
          this.effectListTotal = res.data.total;
        });
    },
    handleCurrentChange() {
      this.getActivityList();
    },
    getScreenWidth() {
      var screenWidth = document.body.clientWidth;
      this.schartWidth = screenWidth * 7 / 8 - 111;
    },
    // 获取活动名称
    getActivityName() {
      this.$http
        .get("/activity", {
          params: {
            id: this.id
          }
        })
        .then(response => {
          console.log(response);
          let responseData = response.data;
          if (responseData.code == 0) {
            this.ActyName = responseData.data;
          }
        });
    },
    // 查看活动效果
    getActivityList() {
      this.listLoading = true;
      this.$http
        .get("/activity/effect", {
          // id 必填
          params: {
            id: this.id,
            time: this.time
          }
        })
        .then(response => {
            this.listLoading = false;
          let responseData = response.data;
          if (responseData.code == 0) {
            this.ActEffect.volume = responseData.data.volume;
            this.ActEffect.amount = responseData.data.amount;
            this.ActEffect.open = responseData.data.open;

            this.dataChart1 = [];
            this.dataChart2 = [];
            this.dataChart3 = [];
            responseData.data.list.forEach(function(element) {
              this.dataChart1.push({
                date:
                  element.date && element.date.length >= 10
                    ? element.date.slice(5, 10)
                    : "",
                value: element.volume
              });
              this.dataChart2.push({
                date:
                  element.date && element.date.length >= 10
                    ? element.date.slice(5, 10)
                    : "",
                value: element.amount
              });
              this.dataChart3.push({
                date:
                  element.date && element.date.length >= 10
                    ? element.date.slice(5, 10)
                    : "",
                value: element.open
              });
            }, this);
            this.changeTotal = 1;
            this.dataChart = this.dataChart1;
            //表格列表
            this.tableData = responseData.data.list.reverse();
          }
        });
    }
  },
  watch: {
    time: function(val, oldVal) {
      this.getActivityList();
    },
    changeTotal: function(val, oldVal) {
      if (val == 1) {
        this.dataChart = this.dataChart1;
      }
      if (val == 2) {
        this.dataChart = this.dataChart2;
      }
      if (val == 3) {
        this.dataChart = this.dataChart3;
      }
    }
  },
  mounted() {
    this.getScreenWidth();
    this.getActivityName();
    this.getActivityList();
  }
};
</script>

<style scoped lang="scss">
.promotion {
  background: #fff;
}

.pad {
  margin-bottom: 20px;
  padding-left: 20px;
}

.pro-title {
  height: 47px;
  line-height: 47px;
  border-bottom: 1px solid #e4e4e4;
  color: #666;
  padding: 0px 16px;
  h3 {
    font-size: 18px;
    font-weight: bold;
    float: left;
    color: #666;
  }
  p {
    font-size: 14px;
    float: right;
  }
}

.pro-msg {
  height: 67px;
  line-height: 67px;
  text-indent: 2em;
  border-bottom: 1px solid #e4e4e4;
  color: #666;
  font-size: 14px;
  overflow: hidden;
}

.pro-total {
  color: #666;
  text-align: center;
  overflow: hidden;
  p {
    font-size: 14px;
    padding-top: 17px;
    margin-bottom: 7px;
    img {
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  span {
    font-size: 20px;
    font-weight: bold;
  }
  .pro-each {
    height: 73px;
    border-right: 1px solid #e4e4e4;
    position: relative;
  }
}

.result {
  background: #fff;
  margin-top: 24px;
}

.res-title {
  height: 47px;
  line-height: 47px;
  border-bottom: 1px solid #e4e4e4;
  color: #666;
  padding: 0px 16px;
  h3 {
    font-size: 18px;
    float: left;
  }
  p {
    font-size: 14px;
    float: right;
    a {
      color: #666;
    }
  }
}

.res-total {
  color: #666;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  p {
    font-size: 14px;
    margin-top: 17px;
    margin-bottom: 7px;
    img {
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  span {
    font-size: 20px;
    font-weight: bold;
  }
  .showtu {
    width: 56px;
    height: 56px;
    background: #49a9ee;
    border-radius: 50%;
    margin-top: 10px;
    position: absolute;
    right: 24px;
    img {
      margin-top: 12px;
    }
  }
  .res-each {
    height: 73px;
    border-right: 1px solid #e4e4e4;
  }
}

.res-table {
  margin: 16px;
}

.res-chart {
  height: 356px;
  margin-left: 16px;
  .res-nav ul {
    width: 237px;
    height: 26px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-left: 8px;
    margin-top: 16px;
    li {
      cursor: pointer;
      color: #666;
      font-size: 13px;
      text-align: center;
      float: left;
      width: 78px;
      height: 26px;
      line-height: 26px;
      border-right: 1px solid #e4e4e4;
    }
    .primary {
      background: #20a0ff;
      color: #fff;
    }
  }
}

.footer {
  font-size: 14px;
  color: #ccc;
  height: 43px;
  text-align: center;
  line-height: 43px;
  background: #f4f4f4;
}
</style>