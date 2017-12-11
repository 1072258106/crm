<template>
    <div>
        <!--发送记录统计-->
        <el-row>
            <div class="count">
                <el-col :span="6">
                    <div class="countEach">
                        <p>营销活动</p>
                        <span class="text-danger">{{Statistics.total || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach">
                        <p>营销号码</p>
                        <span style="color:green;">{{Statistics.human_count || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach">
                        <p>成功号码</p>
                        <span style="color:rgb(222, 167, 38);">{{Statistics.send_count || 0}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="countEach" style="border:0;">
                        <p>链接打开</p>
                        <span class="text-primary">{{Statistics.open_count || 0}}</span>
                    </div>
                </el-col>
            </div>
        </el-row>

        <!--发送记录搜索-->
        <el-row>
            <div class="search">
                <el-row type="flex" justify="space-between">
                    <el-col :span="7" class="search_item">
                        <label>
                            短信文案：
                        </label>
                        <div>
                            <el-col :span="24">
                                <el-input v-model="search.keyword" placeholder="关键词" class="select"></el-input>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item">
                        <label>
                            发送日期：
                        </label>
                        <div>
                            <el-col :span="11">
                                <el-date-picker v-model="search.start_time" type="date" style="width:100%" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker v-model="search.end_time" type="date" style="width:100%" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-col>

                    <el-col :span="7" class="search_item text-right">
                        <el-button type="primary" class="btns" @click="searchList">搜索</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-row>

        <!--状态数据显示-->
        <el-row :gutter="24">
            <ul class="state">
                <!-- <li > -->
                <el-col :span="6" v-for="(item , index) in dataRecords" style="margin-bottom:16px;" :key="index">
                    <div class="state-one">
                        <el-row>
                            <el-col :span="24">
                                <div class="state-show">
                                    状态：
                                    <span style="color:#00b5ff;" 　v-if="item.ac_status == '4'">{{item.ac_status_name}}</span>
                                    <span style="color:#ff8a52;" v-else>{{item.ac_status_name}}</span>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-msg">
                                    <p :title="item.ac_text">【{{item.ac_sign}}】{{item.ac_text}} 回复T退订</p>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-info">
                                    <span style="margin-top:12px;">活动名称：{{item.ac_name}}</span><br>
                                    <!-- <span>创建时间：{{item.ac_created}}</span><br> -->
                                    <span>发送时间：{{item.ac_send_time}}</span><br>
                                    <!-- <span>短信长度：70字占1条</span><br> -->
                                    <span>营销人数：{{item.ac_count}}</span><br>
                                    <span>失败号码：{{item.ac_error_count}}</span><br>
                                    <span>扣除短信：{{item.ac_send_count*item.sms_count }}</span><br>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="state-btn">
                                    <el-row>
                                        <el-col :span="12">
                                            <router-link tag="button" v-if="item.ac_status == '4'" class="el-button btn el-button--primary" :to="'records/'+item.id">查看效果</router-link>
                                            <el-button v-else type="primary" :disabled="true">查看效果</el-button>
                                        </el-col>
                                        <el-col :span="12">
                                            <router-link tag="button" v-if="item.ac_status == '4'" class="el-button btn el-button--primary" :to="'status/'+item.id">查看状态</router-link>
                                            <el-button v-else type="primary" :disabled="true">查看状态</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <!-- </li> -->
            </ul>
        </el-row>

        <!--分页显示-->
        <el-row>
            <el-col :span="24" class="page-part">
                <div class=" top16 bottom16 text-center">
                    <el-pagination v-show="total>search.page_size" :current-page.sync="search.page" @current-change="handleCurrentChange" :page-size="search.page_size" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { formatDate } from "../../../function/formatDate.js";
export default {
  data() {
    return {
      total: 0,
      search: {
        id: "",
        keyword: "",
        start_time: "",
        end_time: "",
        page_size: 8,
        page: 1
      },
      Statistics: {
        total: 0,
        human_count: 0,
        send_count: 0,
        open_count: 0,
        error_count: 0
      },
      dataRecords: []
    };
  },
  methods: {
    getLists() {
      let start_time, end_time;
      this.search.start_time != ""
        ? (start_time = formatDate(this.search.start_time))
        : (start_time = this.search.start_time);
      this.search.end_time != ""
        ? (end_time = formatDate(this.search.end_time))
        : (end_time = this.search.end_time);
      this.$http
        .get("/activity", {
          params: {
            keyword: this.search.keyword,
            start_time: start_time,
            end_time: end_time,
            page_size: this.search.page_size,
            page: this.search.page
          }
        })
        .then(response => {
          let responseData = response.data;
          if (responseData.code == 0) {
            this.dataRecords = responseData.data.list;
            this.total = responseData.data.total;
            console.log(responseData.data);
          } else {
            this.$message.error(responseData.message);
          }
        });
    },
    getStatistic() {
      this.$http.get("/activity/statistic").then(response => {
        let responseData = response.data;
        if (responseData.code == 0) {
          this.Statistics = responseData.data;
          console.log(responseData.data);
        } else {
          alert(responseData.message);
        }
      });
    },
    handleCurrentChange() {
      this.getLists();
    },
    searchList() {
      this.getLists();
    }
  },
  mounted() {
    this.getStatistic();
    this.getLists();
  }
};
</script>

<style scoped lang="scss">
.count {
  background: #fff;
  height: 74px;
  .countEach {
    height: 74px;
    border-right: 1px solid #e4e4e4;
    text-align: center;
    color: #666;
    font-size: 14px;
    overflow: hidden;
    p {
      margin-top: 17px;
      margin-bottom: 7px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      color: #999;
    }
  }
}

.btn {
  width: auto;
}

.state {
  margin-top: 24px;
  .state-one {
    // border: 1px solid #e4e4e4;
    overflow: hidden;
    height: 324px;
    background: #fff;
    .state-show {
      height: 48px;
      border-bottom: 1px solid #e4e4e4;
      line-height: 48px;
      text-align: center;
      font-size: 18px;
      color: #666;
      span {
        color: #00a950;
      }
    }
    .state-msg {
      width: 110%;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 102px;
      border-bottom: 1px solid #e4e4e4;
      color: #666;
      font-size: 14px;
      text-indent: 2em;
      padding: 0 8px;
      p {
        word-break: break-all;
        margin: 8px;
        margin-top: 5px;
        height: 92px;
        padding-right: 10%;
      }
    }
    .state-info {
      height: 118px;
      border-bottom: 1px solid #e4e4e4;
      color: #989898;
      font-size: 14px;
      span {
        display: inline-block;
        text-indent: 3em;
      }
    }
    .state-btn {
      line-height: 47px;
      text-align: center;
    }
  }
  .state-two {
    border: 1px solid #e4e4e4;
    height: 414px;
    background: #fff;
  }
  .state-three {
    border: 1px solid #e4e4e4;
    height: 414px;
    background: #fff;
  }
  .state-four {
    border: 1px solid #e4e4e4;
    height: 414px;
    background: #fff;
  }
}

.page-part {
  position: relative;
  .page {
    width: 50%;
    height: 50%;
    overflow: auto;
    margin: auto;
    text-align: center;
    margin-top: 26px;
  }
}

.search {
  margin-top: 16px;
  padding: 16px;
  color: #666;
  background-color: #fff;
  overflow: auto;
}

.line {
  text-align: center;
  line-height: 36px;
}
</style>


