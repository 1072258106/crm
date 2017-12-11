<template>
    <div class="member">
        <el-form ref="form" :model="formNumber2">
            <el-form-item>
                <p class="time" v-on:click="changeTime('.time')"><b>最后交易时间：</b><span class="active">不限</span><span>近30天</span><span>近90天</span><span style="display:block;">指定</span>
                    <span style="display:none;">指定
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            style="width:125px;"
                            :picker-options="pickerOptions0">
                        </el-date-picker>——
                        <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择日期"
                            style="width:125px;"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </span>
                </p>
            </el-form-item>
            <el-form-item>
                <p class="money" v-on:click="changeTime('.money')"><b>交易金额：</b><span class="active">不限</span><span>1-100元</span><span>100元以上</span><span style="display:block;">指定</span>
                    <span style="display:none;">指定
                        <el-input v-model="input1" placeholder="" size="small" class="select"></el-input>——
                        <el-input v-model="input2" placeholder="" size="small" class="select"></el-input>
                    </span>
                </p>
            </el-form-item>
            <el-form-item>
                <p class="perMoney" v-on:click="changeTime('.perMoney')"><b>客单均价：</b><span class="active">不限</span><span>1-100元</span><span>100元以上</span><span style="display:block;">指定</span>
                <span style="display:none;">指定
                    <el-input v-model="input3" placeholder="" size="small" class="select"></el-input>——
                    <el-input v-model="input4" placeholder="" size="small" class="select"></el-input>
                </span>
                </p>
            </el-form-item>
            <el-form-item>
                <p class="counts" v-on:click="changeTime('.counts')"><b>订单笔数：</b><span class="active">不限</span><span>1笔</span><span>2笔及以上</span><span style="display:block;">指定</span>
                <span style="display:none;">指定
                    <el-input v-model="input5" placeholder="" size="small" class="select"></el-input>——
                    <el-input v-model="input6" placeholder="" size="small" class="select"></el-input>
                </span>
                </p>
            </el-form-item>
            <el-form-item>
                <p class="areas" v-on:click="selectArea"><b>所在地区：</b><span class="active">不限</span><span style="display:block;">指定</span>
                <span style="display:none;position:relative;height:30px;">
                    <i v-for="item in selectedArea" style="font-style:normal;">{{item}},</i>
                </span>
                <table class="areaList">
                    <tr>
                        <td><input type="checkbox" id="beijing" name="area" value="北京"><label for="beijing">北京</label></td>
                        <td><input type="checkbox" id="tianjin" name="area" value="天津"><label for="tianjin">天津</label></td>
                        <td><input type="checkbox" id="hebei" name="area" value="河北省"><label for="hebei">河北省</label></td>
                        <td><input type="checkbox" id="shanxi" name="area" value="山西省"><label for="shanxi">山西省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="a" name="area" value="内蒙古自治区"><label for="a">内蒙古自治区</label></td>
                        <td><input type="checkbox" id="b" name="area" value="辽宁省"><label for="b">辽宁省</label></td>
                        <td><input type="checkbox" id="c" name="area" value="吉林省"><label for="c">吉林省</label></td>
                        <td><input type="checkbox" id="d" name="area" value="黑龙江省"><label for="d">黑龙江省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="e" name="area" value="上海"><label for="e">上海</label></td>
                        <td><input type="checkbox" id="f" name="area" value="江苏省"><label for="f">江苏省</label></td>
                        <td><input type="checkbox" id="g" name="area" value="浙江省"><label for="g">浙江省</label></td>
                        <td><input type="checkbox" id="h" name="area" value="安徽省"><label for="h">安徽省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="i" name="area" value="福建省"><label for="i">福建省</label></td>
                        <td><input type="checkbox" id="j" name="area" value="江西省"><label for="j">江西省</label></td>
                        <td><input type="checkbox" id="k" name="area" value="山东省"><label for="k">山东省</label></td>
                        <td><input type="checkbox" id="l" name="area" value="河南省"><label for="l">河南省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="m" name="area" value="湖北省"><label for="m">湖北省</label></td>
                        <td><input type="checkbox" id="n" name="area" value="湖南省"><label for="n">湖南省</label></td>
                        <td><input type="checkbox" id="o" name="area" value="广东省"><label for="o">广东省</label></td>
                        <td><input type="checkbox" id="p" name="area" value="广西壮族自治区"><label for="p">广西壮族自治区</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="q" name="area" value="海南省"><label for="q">海南省</label></td>
                        <td><input type="checkbox" id="r" name="area" value="重庆"><label for="r">重庆</label></td>
                        <td><input type="checkbox" id="s" name="area" value="四川省"><label for="s">四川省</label></td>
                        <td><input type="checkbox" id="t" name="area" value="贵州省"><label for="t">贵州省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="u" name="area" value="云南省"><label for="u">云南省</label></td>
                        <td><input type="checkbox" id="v" name="area" value="西藏自治区"><label for="v">西藏自治区</label></td>
                        <td><input type="checkbox" id="w" name="area" value="陕西省"><label for="w">陕西省</label></td>
                        <td><input type="checkbox" id="x" name="area" value="甘肃省"><label for="x">甘肃省</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="y" name="area" value="青海省"><label for="y">青海省</label></td>
                        <td><input type="checkbox" id="z" name="area" value="宁夏回族自治区"><label for="z">宁夏回族自治区</label></td>
                        <td><input type="checkbox" id="xin" name="area" value="新疆维吾尔自治区"><label for="xin">新疆维吾尔自治区</label></td>
                        <td><input type="checkbox" id="f" name="area" value="台湾"><label for="g">台湾</label></td>
                    </tr>
                    <tr style="border-bottom:1px solid #e4e4e4;">
                        <td><input type="checkbox" id="tai" name="area" value="香港特别行政区"><label for="tai">香港特别行政区</label></td>
                        <td><input type="checkbox" id="ao" name="area" value="澳门特别行政区"><label for="ao">澳门特别行政区</label></td>
                        <td><input type="checkbox" id="hai" name="area" value="海外"><label for="hai">海外</label></td>
                    </tr>
                    <tr style="position:relative;">
                        <input type="button" value="确定" @click="submitArea" id="btn">
                    </tr>
                </table>
                </p>
            </el-form-item>
            <el-form-item>
                <p class="buyed" v-on:click="changeTime('.buyed')"><b>购买过宝贝：</b><span class="active">不限</span><span>指定</span></p>
            </el-form-item>
            <el-form-item>
                <p class="nobuy" v-on:click="changeTime('.nobuy')"><b>未购买过宝贝：</b><span class="active">不限</span><span>指定</span></p>
            </el-form-item>
            <el-form-item label="会员等级：" label-width="98px">
                <el-checkbox-group v-model="formNumber2.type">
                    <el-checkbox label="店铺会员" name="type"></el-checkbox>
                    <el-checkbox label="普通会员" name="type"></el-checkbox>
                    <el-checkbox label="高级会员" name="type"></el-checkbox>
                    <el-checkbox label="VIP会员" name="type"></el-checkbox>
                    <el-checkbox label="至尊VIP会员" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="交易来源：" label-width="98px">
                <el-checkbox-group v-model="formNumber2.sources">
                    <el-checkbox label="嗨淘" name="sources"></el-checkbox>
                    <el-checkbox label="聚划算" name="sources"></el-checkbox>
                    <el-checkbox label="普通淘宝" name="sources"></el-checkbox>
                    <el-checkbox label="TOP平台" name="sources"></el-checkbox>
                    <el-checkbox label="手机淘宝" name="sources"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="卖家旗帜：" label-width="98px">
                <el-checkbox-group v-model="formNumber2.flag">
                    <el-checkbox label="a" name="flag"><img src="../../../static/img/flag1.png" alt=""></el-checkbox>
                    <el-checkbox label="b" name="flag"><img src="../../../static/img/flag2.png" alt=""></el-checkbox>
                    <el-checkbox label="c" name="flag"><img src="../../../static/img/flag3.png" alt=""></el-checkbox>
                    <el-checkbox label="d" name="flag"><img src="../../../static/img/flag4.png" alt=""></el-checkbox>
                    <el-checkbox label="e" name="flag"><img src="../../../static/img/flag5.png" alt=""></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="过滤黑名单：" label-width="98px">
                <el-radio-group v-model="formNumber2.blackList">
                    <el-radio label="是" style="margin-right:12px;"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formNumber2:{

                    type:[],
                    sources:[],
                    flag:[],
                    blackList:''
                },
                value1:'',
                value2:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                selectedArea:[]
            }
        },
        methods:{
            changeTime(ele){
                var oSpan=$(ele).find('span');
                var oLength=oSpan.length;
                for(var i = 0;i < oLength;i++){
                    oSpan[i].onclick = function(){
                        $(this).addClass("active").siblings().removeClass("active");
                    };
                }
                oSpan[oLength-2].onclick = function(){
                    $(this).css({"display":"none"}).next().css({"display":"block"}).addClass("active").siblings().removeClass("active");
                }
                oSpan[oLength-1].onclick = function(){
                    $(this).css({"display":"none"}).prev().css({"display":"block"})
                }
            },
            selectArea(){
                var oSpan=$('.areas').find('span');
                var oLength=oSpan.length;
                for(var i = 0;i < oLength;i++){
                    oSpan[i].onclick = function(){
                        $(this).addClass("active").siblings().removeClass("active");
                    };
                }
                oSpan[oLength-2].onclick = function(){
                    $(this).css({"display":"none"}).next().css({"display":"block"}).addClass("active");
                    $(this).prev().removeClass("active");
                    $('.areaList').css({"display":"block"});
                }
                oSpan[oLength-1].onclick = function(){
                    $(this).css({"display":"none"}).prev().css({"display":"block"}).addClass("active");
                    $('.areaList').css({"display":"none"});
                }
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            submitArea(){
                var _this=this;
                _this.selectedArea=[];
                $('input:checkbox[name=area]:checked').each(function(){
                    _this.selectedArea.push($(this).val());
                });
                $('.areaList').css({"display":"none"});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .member{
        p{  
            height:30px;
            line-height:30px;
            margin-bottom:20px;
            b{
                width:98px;
                text-align:right;
                float:left;
                font-weight:normal;
            }
            span{
                border:1px solid #e4e4e4;
                padding:2px 30px;
                background:#eee;
                margin:0 5px 5px 0;
                color:#666;
                display:block;
                float:left;
                cursor:pointer;
            }
        }
    }
    .active{
        border:1px solid #0096ff !important;
        background: #fff url(../../../static/img/focus.png) no-repeat scroll right top !important;
    }
    .select{
        width:120px;
        height:20px;
    }
    .areaList{
        width:628px;
        padding:4px 20px;
        height:360px;
        border:1px solid #e4e4e4;
        background:#fff;
        z-index:10;
        position:absolute;
        top:-370px;
        left:47px;
        display:none;
        border-radius:4px;
        tr{
            td{
                padding:2px 26px;
                font-size:12px;
                label{
                    cursor:pointer;
                }
            }
        }
        #btn{
            height:30px;
            line-height:30px;
            padding:0 30px;
            font-size:12px;
            background:#1B9AF7;
            border:1px solid #1B9AF7;
            color:#fff;
            cursor:pointer;
            position:absolute;
            right:24px;
            border-radius:4px;
        }
    }
</style>