<template>
    <div @click="blur">
        
        <el-col :span="24">
            <div class="editor">
                <el-row>  
                    <!--编辑区的标题-->
                    <el-col :span="24">
                        <div class="editor-title">
                            <el-row style="background:#fff;">
                                <el-col :span="12" style="padding-left:8px;">
                                    名称：<el-input @change="htmlNameVety" :maxlength="15" v-model="htmlName" class="find" size="small"></el-input>&nbsp;&nbsp;&nbsp;1-15个字以内
                                </el-col>
                                <el-col :span="12" style="text-align:center;">
                                    <el-button type="primary" class="btn" @click.stop="show">预览</el-button>                                    
                                    <el-button type="primary" class="btn" @click.stop="save">保存</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!--编辑区-->
                    <el-col :span="24">
                        <div class="editor-area">
                            <el-row>
                                <el-col :span="6">
                                    <div class="editor-left">
                                        <el-row>
                                            <el-col :span="24">
                                                <h4 style="text-align:center;padding:16px;">选择模块</h4>
                                            </el-col>
                                            <el-col :span="24">
                                                <div class="select">
                                                    <el-row>
                                                        <el-col :span="12" v-for="(item,index) in items" :key="index">
                                                            <div v-if="index == 0 || index == 1 || index == 4" class="word">
                                                                <div class="icon-box" @click.stop="insertElements(index)">
                                                                    <img :src="item.icon" alt="">
                                                                    <p>{{item.text}}</p>
                                                                </div>
                                                            </div>

                                                            <!-- 商品 -->
                                                            <div v-if="index == 2" class="word insert-goods">
                                                                <div class="icon-box" @click.stop="getGoods">
                                                                    <img :src="item.icon" alt="">
                                                                    <p>{{item.text}}</p>
                                                                </div>
                                                            </div>

                                                            <!-- 优惠券 -->
                                                            
                                                            <div v-if="index == 3" class="word insert-quan">
                                                                <div class="icon-box" @click.stop="getQuan">
                                                                    <img :src="item.icon" alt="">
                                                                    <p>{{item.text}}</p>
                                                                </div>
                                                            </div>


                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="editor-center">
                                        <div class="editor-show">
                                            <div class="show-top">

                                            </div>
                                            <!-- 编辑的展示框 -->
                                            <div class="show-middle king" id="works">
                                                <div right="myright" :class="index == nowIndex ? 'elements selected' : 'elements'" v-for="(item,index) in elements" :key="index" :style="'left:'+item.css.left+'px;top:'+item.css.top+'px;font-size:'+item.css.fontSize+'px;padding:'+item.css.padding+'px;color:'+item.css.color+';background:'+item.css.background+';z-index:'+item.css.zIndex+';border-width:'+item.css.borderWidth+'px;border-style:solid;border-color:'+borderColor+';text-align:'+item.css.textAlign+';transform:'+item.css.transform+';'" @click.stop="choose(index,$event)">
                                                    <a target="_blank" v-if="item.type == 'text'" :style="'color:'+item.css.color+';'">
                                                        <span class="text">{{item.text || '请输入文字'}}</span>
                                                    </a>
                                                    <a target="_blank" v-if="item.type == 'img'">
                                                        <img class="single-img" :src="item.src + '?w=377'" alt="">
                                                    </a>
                                                    <a target="_blank" v-if="item.type == 'goods'" class="goods-container" :style="'color:'+item.css.color+';'">
                                                        <span class="goods-bg"><img :src="item.pic" alt=""></span>
                                                        <span class="goods-name">{{item.title}}</span>
                                                        <span class="goods-price" :style="'color:'+item.css.priceColor+';'">￥{{item.price}}</span>
                                                    </a>
                                                    <a v-if="item.type == 'quan'">
                                                        <div class="quan-container">
                                                            <span class="quan-number">{{item.quanValue}}</span>
                                                            <span class="quan-name">{{item.quanName}}</span>
                                                            <span class="quan-des">有效期至{{item.quanEndTime}}</span>
                                                        </div>
                                                    </a>
                                                    

                                                    <div style="height:200px;" v-if="item.type == 'video' && item.videoShow" v-html="item.videoSrc">
                                                        
                                                    </div>

                                                    <!-- 上下移动的操作 -->
                                                    <div class="up_down_del">
                                                        <span v-if="nowIndex != 0" @click.stop="changeArr('up')"><i class="icon iconfont icon-jiantoushang"></i></span>
                                                        <span v-if="nowIndex != elements.length-1" @click.stop="changeArr('down')"><i class="icon iconfont icon-jiantouxia"></i></span>
                                                        <span @click.stop="changeArr('del')"><i class="icon iconfont icon-cha"></i></span>
                                                    </div>
                                                    <!-- 图片操作的点 -->
                                                    <!-- <span class="dot-left-top dot" @click=""></span> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="editor-right">
                                        <el-row>
                                            <el-col :span="24">
                                                <h4 style="text-align:center;">设置属性</h4>
                                            </el-col>
                                            <el-col :span="24"  v-if="valueShow" class="control-box">
                                                <el-row v-if="controlType == 'text'">
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">文本内容</el-col>
                                                        <el-col :span="18">
                                                            <el-input  v-model="elements[nowIndex].text"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">字体大小</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.fontSize" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">跳转链接</el-col>
                                                        <el-col :span="18">
                                                            <el-input @blur="addHttp" v-model="elements[nowIndex].href"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">内边距</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.padding" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">边框大小</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.borderWidth" @change="change" :max="10"></el-slider>
                                                        </el-col>
                                                    </el-row> -->
                                                    <el-row justify="space-between">
                                                        <el-col :span="6">字体对齐</el-col>
                                                        <el-col :span="18">
                                                            <el-radio-group v-model="elements[nowIndex].css.textAlign">
                                                                <el-radio-button label="left">左对齐</el-radio-button>
                                                                <el-radio-button label="center">居中</el-radio-button>
                                                                <el-radio-button label="right">右对齐</el-radio-button>
                                                            </el-radio-group>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">字体颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-if="controlType == 'text'" v-model="elements[nowIndex].css.color"></el-color-picker>
                                                        </el-col>
                                                        <el-col :span="6" class="control-title">背景颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                        </el-col>
                                                    </el-row>
                                                </el-row>
                                                <!-- 横向位置<el-slider v-model="left" @change="change" :min="-100"></el-slider>
                                                纵向位置<el-slider v-model="top" @change="change" :min="-100"></el-slider> -->
                                                <!-- 图片状态下的操作框 -->
                                                <el-row v-if="controlType == 'img'">
                                                    <el-row>
                                                            <!-- <el-upload
                                                                action="http://testcrmapi.niubaifa.com/tools/image_upload"
                                                                :show-file-list="false"
                                                                :headers="header">
                                                                <i class="el-icon-plus"></i>
                                                            </el-upload> -->

                                                            <el-upload
                                                                class="avatar-uploader"
                                                                :action="uploadUrl"
                                                                :show-file-list="false"
                                                                :on-success="handleAvatarSuccess"
                                                                :before-upload="beforeAvatarUpload"
                                                                :headers="header">
                                                                <img v-if="elements[nowIndex].src" :src="elements[nowIndex].src" class="avatar">
                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                            </el-upload>
                                                        <!-- <el-col v-for="(item,index) in imgList" :key="index">

                                                        </el-col> -->
                                                    </el-row>
                                                    <!-- <el-dialog v-model="bigImgVisible" size="tiny">
                                                        <img width="100%" :src="elements[nowIndex].src" alt="">
                                                    </el-dialog> -->
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">跳转链接</el-col>
                                                        <el-col :span="18">
                                                            <el-input @blur="addHttp" v-model="elements[nowIndex].href"></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">内边距</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="elements[nowIndex].css.padding" @change="change"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">背景颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- <el-row>
                                                        <el-col :span="6" class="control-title">高度</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="height" @change="change" :max="677"></el-slider>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col :span="6" class="control-title">宽度</el-col>
                                                        <el-col :span="18">
                                                            <el-slider v-model="width" @change="change" :max="375"></el-slider>
                                                        </el-col>
                                                    </el-row> -->
                                                </el-row>
                                                <!-- 商品的操作框 -->
                                                <el-row v-if="controlType == 'goods'">
                                                    <el-row justify="space-between">
                                                        <!-- 商品列表 -->
                                                        <div class="ul-container ul-container-goods">
                                                            <h2>商品列表</h2>
                                                            <ul v-if="goodsList.length > 0">
                                                                <li v-for="(goods,index) in goodsList" :key="index" @click.stop="selectGoods(goods)" :title="goods.title">
                                                                    <img :src="goods.pic_url" alt=""><span :title="goods.title">{{goods.title}}</span>
                                                                </li>
                                                            </ul>
                                                            <div v-else>您暂时没有商品</div>
                                                        </div>
                                                        <el-col :span="6" class="control-title">背景颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                        </el-col>
                                                        <el-col :span="6" class="control-title">标题颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.color"></el-color-picker>
                                                        </el-col>
                                                        <el-col :span="6" class="control-title">价格颜色</el-col>
                                                        <el-col :span="6">
                                                            <el-color-picker v-model="elements[nowIndex].css.priceColor"></el-color-picker>
                                                        </el-col>
                                                    </el-row>
                                                </el-row>
                                                <!-- 优惠券的操作框 -->
                                                <el-row v-if="controlType == 'quan'">
                                                    <el-row justify="space-between">
                                                        <div class="ul-container ul-container-quan">
                                                            <h2>优惠券列表</h2>
                                                            <ul v-if="quanList.length>0">
                                                                <li class="quan-container" v-for="(quan,index) in quanList" :key="index" @click.stop="selectQuan(quan)">
                                                                    <span class="quan-number">{{quan.coupons[0].denominations / 100}}</span>
                                                                    <span class="quan-name">满{{quan.coupons[0].condition /100}}减{{quan.coupons[0].denominations / 100}}</span>
                                                                    <span class="quan-des">有效期至{{quan.coupons[0].endTime.slice(0, 10)}}</span>
                                                                </li>
                                                            </ul>
                                                            <div v-else>您暂时还没有优惠券</div>
                                                        </div>
                                                        <el-row>
                                                            <el-col :span="6" class="control-title">背景颜色</el-col>
                                                            <el-col :span="6">
                                                                <el-color-picker v-model="elements[nowIndex].css.background"></el-color-picker>
                                                            </el-col>
                                                        </el-row>
                                                    </el-row>
                                                </el-row>

                                                <!-- 视频的操作框 -->
                                                <el-row v-if="controlType == 'video'" class="control-video">
                                                    <el-row justify="space-between">
                                                        <el-col :span="6" class="control-title">视频地址</el-col>
                                                        <el-col :span="18">
                                                            <el-input placeholder="请插入优酷、腾讯的通用视频链接" @change="modify(nowIndex)" @blur="verify(nowIndex)" v-model="elements[nowIndex].videoSrc"></el-input>
                                                            <span class="tip">请插入优酷、腾讯的通用视频链接</span>
                                                        </el-col>
                                                    </el-row>
                                                </el-row>

                                                
                                                <!-- <el-button @click="fixTop">置于顶层</el-button> -->
                                                <!-- <el-button @click="animate">动画</el-button> -->
                                                <!-- <el-button @click="deleteThis">删除</el-button>             -->
                                            </el-col>
                                            
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!--编辑区尾部-->
                    <el-col :span="24">
                        <div class="foot"></div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <!-- 预览效果 -->
        <el-dialog title="预览效果" :visible.sync="showVisible">
            <show :content="showContent"></show>
        </el-dialog>
    </div>
</template>

<script>
    import show from './_components/Show';
    export default{
        components: {
            show
        },
        data() {
            return {
                header: {
                    "Access-Token": this.$store.state.token
                },
                htmlName: '',
                htmlId:'',
                items:[
                    {
                        'icon': '../../../../static/img/word.png',
                        'text': '文字'
                    },
                    {
                        'icon': '../../../../static/img/pic.png',
                        'text': '图片'
                    },
                    {
                        'icon': '../../../../static/img/goods.png',
                        'text': '商品'
                    },
                    {
                        'icon': '../../../../static/img/quan.png',
                        'text': '优惠券'
                    },
                    {
                        'icon': '../../../../static/img/radio.png',
                        'text': '视频'
                    }
                ],
                elements:[],
                left: 0,
                top:0,
                padding:0,
                fontSize:12,
                priceColor:'#ff5500',
                color: '#000',
                borderWidth:0,
                borderColor: '#000',
                background: '#fff',
                width:0,
                height:0,
                href:'',//除视频外的元素的跳转地址
                text:'请输入文字',
                src:'',
                videoSrc:'',
                nowIndex: {
                    type: Number
                },
                valueShow: false,
                controlType: 'text',
                startPosition: {
                    left: 0,
                    top: 0
                },
                showPhone: false,
                goodsList:[],
                zIndex: 0,
                quanList:[],
                quanListShow: false,
                showVisible: false,//预览框可见参数
                showContent: '',//预览传递的参数
                bigImgVisible: false,
                imageUrl:''
            }
        },
        computed: {
            uploadUrl() {
                return this.$store.state.globalApi + '/tools/image_upload';
            }
            // width() {
            //     if(document.getElementsByClassName('selected')[0]){
            //         console.info(document)
            //         console.info('computWidth:',document.getElementsByClassName('selected')[0])
            //     }
            //     //console.info('computWidth:',document.getElementsByClassName('seleted')[0].offsetWidth)
            //     return 'auto';
            // },
            // height() {
            //     return 'auto';
            // }
        },
        watch:{
            //将控制器的值赋予当前元素
            'left': function() {
                this.elements[this.nowIndex].css.left = this.left
            },
            'top': function() {
                this.elements[this.nowIndex].css.top = this.top
            },
            'padding': function() {
                this.elements[this.nowIndex].css.padding = this.padding
            },
            'color': function() {
                this.elements[this.nowIndex].css.color = this.color
            },
            'background': function() {
                this.elements[this.nowIndex].css.background = this.background
            },
            'fontSize': function() {
                this.elements[this.nowIndex].css.fontSize = this.fontSize
            },
            'priceColor': function() {
                this.elements[this.nowIndex].css.priceColor = this.priceColor
            },
            'borderWidth': function() {
                this.elements[this.nowIndex].css.borderWidth = this.borderWidth
            },
            'borderColor': function() {
                this.elements[this.nowIndex].css.borderColor = this.borderColor
            },
            'transform':function() {
                this.elements[this.nowIndex].css.transform = this.transform
            },
            'videoSrc': function() {
                this.elements[this.nowIndex].videoSrc = this.videoSrc
            },
            'height': function() {
                this.elements[this.nowIndex].css.height = this.height
            },
            'width': function() {
                this.elements[this.nowIndex].css.width = this.width
            },
            'text': function() {
                this.elements[this.nowIndex].text = this.text
            }
            // 'src': function() {
            //     this.elements[this.nowIndex].src = this.src
            // },

        },
        methods: {
            insertElements (index,obj) {
                let item = {
                    'type': 'text',
                    'href': '',
                    'text': '请输入文字',
                    'src': '',
                    'videoShow': true,
                    'css': {
                        'left': 0,
                        'top': 0,
                        'color': '#000',
                        'fontSize': 12,
                        'lineHeight': 12,
                        'height': '100',
                        'width': 'auto',
                        'background': '#fff',
                        'padding': 8,
                        'borderWidth': 1,
                        'borderColor': '#000',
                        'transform': 'none',
                        'zIndex': 0,
                        'borderWidth':0,
                        'textAlign':'left'
                    },
                };
                if (index == 1) {
                    item.type = 'img';
                }
                if (index == 2) {
                    item.type = 'goods';
                    item.pic = obj.pic_url;
                    item.href = obj.item_link;
                    item.price = obj.price;
                    item.title = obj.title;
                    item.css.priceColor = '#ff5500';
                }
                if (index == 3) {
                    item.type = 'quan';
                    item.quanValue = obj.coupons[0].denominations / 100;
                    item.quanName = '满'+obj.coupons[0].condition / 100+'减'+obj.coupons[0].denominations / 100;
                    item.quanEndTime = obj.coupons[0].endTime.slice(0, 10);
                    item.href = obj.activity_url;
                }
                if (index == 4) {
                    item.type = 'video';
                    item.videoSrc = '';
                    item.videoShow = false;
                }
                this.elements.push(item)
                this.nowIndex = this.elements.length - 1;//插入新的元素就选择这个元素
                this.valueShow = true//插入新的元素就对这个元素开启控制
                this.controlType = item.type;//插入新的元素就选择这个元素的控制器类型
            },
            choose (index) {
                // if(this.nowIndex == index) {
                //     return
                // }
                console.info('index:',index)
                console.info('elements:',this.elements)
                console.info('top:',this.top)
                this.nowIndex = index

                this.valueShow = true//开启控制器
                //将控制器转换为当前元素的类型
                this.controlType = this.elements[index].type;

                //图片获取高宽度
                console.info('computedWid:',document.getElementsByClassName('elements')[index])
                this.width = document.getElementsByClassName('elements')[index].offsetWidth
                this.height = document.getElementsByClassName('elements')[index].offsetHeight
                //图片获取高宽度

                //将控制器的值赋为当前元素的值
                this.left = this.elements[index].css.left
                this.top = this.elements[index].css.top
                this.padding = this.elements[index].css.padding
                this.color = this.elements[index].css.color
                this.text = this.elements[index].text
                //将控制器的值赋为当前元素的值

                return false;
                //右键删除
                // document.oncontextmenu = function(ev){
                //     if(ev.target.getAttribute('right') == 'myright') {

                //     }
                    
                // };
            },
            change () {
                console.info(this.left)
            },
            animate() {  
                this.transform = 'rotate(30deg)';
            },
            dragStart(index,e) {
                this.choose(index)
                this.startPosition.left = e.screenX;
                this.startPosition.top = e.screenY;
            },
            dragEnd(e) {
                console.info('end',e)
                this.left += e.screenX - this.startPosition.left;
                this.top += e.screenY - this.startPosition.top;
            },
            getGoods() {
                this.$http.get("user/items")
                .then(
                response => {
                    let responseData = response.data;
                    if(responseData.code == 0 && responseData.data.list.length>0){
                        this.goodsList = responseData.data.list
                        this.insertElements(2,this.goodsList[0])
                    }else{
                        this.$confirm('您暂时没有商品', {
                            confirmButtonText: '前去创建',
                            cancelButtonText: '取消'
                        }).then(() => {
                            window.open('https://aliyx.taobao.com');
                        })
                    }
                }
                )
                let that = this;
            },
            getQuan() {
                this.$http.get('http://memberapi.iqincheng.com/integral/getCoupons').then(
                response => {
                    console.info('res',response)
                    let res = response.data;
                    if(res.code == 0 && res.data.list.length>0){
                        console.info('券信息',res.data.list)
                        this.quanList = res.data.list;
                        this.insertElements(3,this.quanList[0])
                    }else{
                        this.$confirm('您还没有优惠券', {
                            confirmButtonText: '前去创建',
                            cancelButtonText: '取消'
                        }).then(() => {
                            window.open('https://aliyx.taobao.com/coupon');
                        }).catch(() => {
                                 
                        });
                    }
                })
            },
            fixTop() {
                this.zIndex++;
                this.elements[this.nowIndex].css.zIndex = this.zIndex;
            },
            save() {
                // let content = document.getElementById('works').innerHTML;
                // console.info('content',content)
                // this.showPhone = true;
                // setTimeout(function(){
                //     let newContainer = document.getElementById('showPhone');
                //     console.log(newContainer)
                //     newContainer.innerHTML = content;
                // },0)
                
                //保存页面
                if(!this.htmlName){
                    this.$alert('请输入网页名称', '', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                let content = JSON.stringify(this.elements);
                let params = {
                    title: this.htmlName,
                    content: content
                }
                let postUrl = '/tools/page';
                if(this.htmlId) {
                    params.id = this.htmlId;
                    postUrl = '/tools/page_edit';
                }
                this.$http.post(postUrl,params).then(
                    response => {
                        console.info('上传页面后',response);
                        let res = response.data;
                        if(res.code == 0){
                            this.$alert('操作成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('h5/h5list')
                                }
                            });
                        }
                    }
                )
            },
            changeArr(how) {
                if(how == 'up'){
                    let save = this.elements[this.nowIndex];
                    this.elements[this.nowIndex] = this.elements[this.nowIndex - 1];
                    this.elements[this.nowIndex-1] = save;
                    this.nowIndex = this.nowIndex - 1;
                }
                if(how == 'down'){
                    let save = this.elements[this.nowIndex];
                    this.elements[this.nowIndex] = this.elements[this.nowIndex + 1];
                    this.elements[this.nowIndex+1] = save;
                    this.nowIndex = this.nowIndex + 1;
                }
                if(how == 'del'){
                    this.elements.splice(this.nowIndex,1);
                    this.nowIndex = -1;
                    this.valueShow = false;
                }
            },
            selectGoods(goods) {
                this.elements[this.nowIndex].pic = goods.pic_url;
                this.elements[this.nowIndex].href = goods.item_link;
                this.elements[this.nowIndex].price = goods.price;
                this.elements[this.nowIndex].title = goods.title;
            },
            selectQuan(quan) {
                this.elements[this.nowIndex].quanValue = quan.coupons[0].denominations / 100;
                this.elements[this.nowIndex].quanName = '满'+quan.coupons[0].condition / 100+'减'+quan.coupons[0].denominations / 100;
                this.elements[this.nowIndex].quanEndTime = quan.coupons[0].endTime.slice(0, 10);
                this.elements[this.nowIndex].href = quan.activity_url;
            },
            blur() {
                // this.nowIndex = -1;
                // this.valueShow = false;
            },
            show() {
                this.showContent = JSON.stringify(this.elements);
                this.showVisible = true
            },
            init() {
                this.htmlName = '';
                this.htmlId = '';
                this.elements = [];
                this.nowIndex=-1;
                this.valueShow = false;
                this.controlType = 'text';
                this.showPhone = false;
                this.goodsList = [];
                this.zIndex = 0;
                this.quanListShow = false;
                this.showVisible = false;
                this.showContent =  '';
            },
            verify(index) {
                let str = this.elements[index].videoSrc
                if(str.indexOf('youku')<0 && str.indexOf('qq')<0) {
                    this.$message.error('请插入优酷、腾讯的通用视频链接');
                    this.elements[index].videoShow = false;
                }
            },
            modify(index) {//修改iframe大小
                let str = this.elements[index].videoSrc
                let result,regWidth,regHeight;
                if(str.indexOf('youku') >= 0){
                    regWidth = /(width=)\S\S\S?/;
                    regHeight = /(height=)\S\S\S?/;
                    this.elements[index].videoShow = true;   
                    console.log('youku')                 
                }else if(str.indexOf('qq') >= 0){
                    regWidth = /(width=")\S\S\S\S?/;
                    regHeight = /(height=")\S\S\S\S?/;
                    this.elements[index].videoShow = true;    
                    console.log('qq')                
                }
                result = str.replace(regWidth,'width=100% ');
                result = result.replace(regHeight,'height=100% ');
                console.info(result)
                this.elements[index].videoSrc = result;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file) {
                console.info(file)
            },
            handleAvatarSuccess(res) {
                console.info(res)
                if(res.code == 0) {
                    this.elements[this.nowIndex].src = res.data.path;
                }else{
                    this.$message.error(res.message)
                }
            },
            addHttp() {
                let href = this.elements[this.nowIndex].href;
                if(href.indexOf('http://') < 0 && href.indexOf('https://') < 0){
                    this.elements[this.nowIndex].href = 'http://' + this.elements[this.nowIndex].href
                }
            },
            htmlNameVety() {
                if(this.htmlName.length >= 15) {
                    this.$message.error('最多只能输入15个字符')
                }
            }
        },
        mounted() {
            if(this.$route.query.id) {
                this.htmlId = this.$route.query.id;
                this.$http.get('/tools/page?id='+this.htmlId).then(
                    response => {
                        let res = response.data;
                        this.elements = JSON.parse(res.data.content)
                        this.htmlName = res.data.title;
                    }
                )
            }
        },
        
    }
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #7b7878;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped lang="scss">
    
  

    @import "../../../../static/css/main.scss";
    
    .remind{
        height:54px;
        line-height:54px;
        vertical-align:left;
        border:1px solid #d4f0fc;
        background:#e6f3fc;
        border-radius:4px;
        font-size:14px;
        color:#666666;
        text-indent:4em;
    }
    .icon-box{
        width: 64px;
        margin:0 auto;
        text-align: center;
        cursor: pointer;
    }
    .editor{
        height:950px;
        margin-top:24px;
        border:1px solid #e4e4e4;
        .editor-title{
            font-size:$font;
            color:$color;
            height:47px;
            line-height:47px;
            border-bottom:1px solid #e4e4e4;
            .find{
                width:200px;
                height:26px;
            }
            h3{
                font-size:$h1-font;
                
                font-weight:bold;
                text-indent:1.5em;
            }
            .btn{
                width:90px;
                height:32px;
                margin-top:8px;
                float:right;
                margin-right:16px;
            }
        }
        .editor-area{
            color:#fff;
            background:#282828;
            .editor-left{
                h4{
                    height:54px;
                    line-height:54px;
                    font-size:$h2-font;
                    
                    font-weight:bold;
                    text-indent:1.5em;
                }
                .select{
                    .word{
                        margin-top:28px;
                        margin-left:26px;
                        p{
                            font-size:$h2-font;
                            
                            font-weight:bold;
                        }
                    }
                }
            }
            .editor-center{
                overflow-y:auto;
                height: 694px;
                .editor-show{
                    width:377px;
                    margin:54px auto 0;
                    background:#fff;
                    .show-top{
                        height:27px;
                        background:url(../../../../static/img/top.png)
                    }
                    .show-middle{
                        min-height:550px;
                        position: relative;
                    }
                    .show-words{
                        height:122px;
                        border:0;
                        overflow:hidden;
                        p{
                            font-size:$h2-font;
                            
                            font-weight:bold;
                            margin:10px;
                        }
                    }
                    .show-bottom{
                        height:260px;
                        background:#dfe0dc;
                    }
                }
            }
            .editor-right{
                height:694px;
                background:#545454;
                padding:16px;
                box-sizing: border-box;
                h4{
                    height:54px;
                    line-height:54px;
                    font-size:$h2-font;
                    
                    font-weight:bold;
                    text-indent:1.5em;
                }
                .edit{
                  background:#dfe0dc;
                  .pic-show{
                      color:$scolor;
                      font-size:$font;
                      height:37px;
                      line-height:37px;
                      text-indent:1.5em;
                  }
                  .pic-list{
                      height:190px;
                      background:#fff;
                      margin:24px;
                      margin-top:14px;
                  }
                  .pic-tips{
                      text-indent:1.5em;
                      color:$scolor;
                      font-size:$font;
                  }
                  .pic-link{
                      height:68px;
                      background:#fff;
                      margin:24px;
                      margin-top:14px;
                  }
                  .button{
                      height:42px;
                      line-height:42px;
                      text-align:center;
                      margin-top:190px;
                      .btn-sure{
                          background:#fff;
                      }
                      .btn-cancel{
                          background:#fff;
                      }
                  }
                }
            }
        }
        .foot{
            height:18px;
        }
    }

    img{
        display: block;
        border:none;
    }
    // luban_add
    //自定义滚动条样式
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 5px;  
    height: 16px;  
    background-color: rgba(0,0,0,0.3);  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px #f5f5f5;  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px #f5f5f5;  
    background-color: #555;  
}  

.ul-container{
    margin-bottom: 16px;
}
    //插入商品，
    
    .ul-container-goods{
        max-height:300px;
        overflow-y: auto;
        ul{
            background:#ccc;
            overflow-x: hidden;
            li{
                height: 50px;
                line-height: 50px;
                list-style: none;
                margin:4px 0;
                cursor: pointer;
                background:#fff;
                color:#000;
                overflow: hidden;
                position: relative;
                box-sizing:border-box;
                padding-left: 50px;
                img{
                    position: absolute;
                    top:0;
                    left:0;
                    height: 50px;
                    width:50px;
                    background:#fff;
                }
                span{
                    display: block;
                    overflow: hidden;
                    height: 50px;
                    width:100%;
                    padding:0 8px;
                    box-sizing: border-box;
                }
            }
        }
    }
    //插入优惠券

        .ul-container-quan{
            max-height:300px;
            overflow-y: auto;
            ul{
                background:#ccc;
                overflow-x: hidden;
                li{
                    cursor: pointer;
                }
            }
        }
        .ul-container:focus{
            outline: none;
        }
        
//插入视频
.control-video .el-col{
    position: relative;
}
.tip{
    position: absolute;
    bottom:-15px;
    left: 0;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    color:red;
}

    #showPhone{
        height:667px;
        width:375px;
        position: fixed;
        left: 0;
        top:0;
        background: red;
        z-index:5555555;
    }



//页面展示的样式
.show-middle .selected{//选中时的样式，成品不应该有，只在制作的时候有
    position: relative;
    border: 1px solid #e5e7ea;
    box-shadow: 0 0 15px 0 #d65600;
    .up_down_del{
        background: #7f8798;
        display: block;
        width:32px;
        position: absolute;
        top:0;
        right: -32px;
        span{
            display: block;
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-align: center;
            font-size: 16px;
            color: #000;
        }
        span:hover{
            background:#d65600;
            color:#fff;
        }
    }
}
//以下成品也css代码相同
.elements{
    display: block;
    width:100%;
    box-sizing: border-box;
    margin: 8px 0;
    a{
        display: block;
        width:100%;
        .single-img{//插入图片的样式
            width:100%;
            display: block;
            box-sizing: border-box;
        }
    }
    .up_down_del{//默认状态下的操作框
        display:none;
    }
}
.elements:focus{
    outline: none;
}
.elements:hover{
    cursor: pointer;
}


// 优惠券的样式
    .quan-container{
        width: 144px;
        height: 88px;
        position: relative;
        display: block;
        background-image: url('../../../../static/img/quan_bg.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        color:#fff;
        margin: 0 auto;
    }
    .quan-number{
        position: absolute;
        left: 0;
        top:5px;
        height: 70px;
        width: 50px;
        line-height: 70px;
        text-align: center;
        color:#fff;
        font-size: 20px;
    }
    .quan-name{
        height: 70px;
        line-height: 70px;
        width: 94px;
        text-align: center;
        position: absolute;
        right: 0;
        top:5px;
        font-size: 14px;
    }
    .quan-des{
        height: 15px;
        line-height: 15px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        position: absolute;
        left: 0;
        bottom:8px;
    }
//商品的样式
    .goods-container{
        width:200px;
        position: relative;
        display: block;
        font-size: 12px;
        .goods-bg{
            display: block;
            width: 100%;
            img{
                display: block;
                border: none;
                width: 100%;
                margin:0 auto;
            }
            // background-image: url(https://img.alicdn.com/bao/uploaded/i7/TB1Xb7tkyFTMKJjSZFAYXIkJpXa_M2.SS2);
            // background-repeat: no-repeat;
            // background-size: contain;
            // background-position: center center;
            // background-color: #ccc;
        }
        .goods-name{
            display: block;
            width: 100%;
            line-height: 20px;
            height: 40px;
        }
        .goods-price{
            display: block;
            width: 100%;
            height:20px;
            line-height: 20px;
            color: #ff5500;
        }
    }


    //操作部分的样式
    .control-box{
        line-height: 36px;
        font-size: 14px;
    }
    .control-box >.el-row >.el-row{
        margin:4px 0;
    }
</style>