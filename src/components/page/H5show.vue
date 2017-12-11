<template>
  <div :class="isPC ? 'show-middle show-pc' : 'show-middle'" id="works">
        <div :class="isFireFox ? 'firefox show-container' : 'show-container'">
            <div class="box">
                <div right="myright" class="elements" v-for="(item,index) in elements" :key="index" :style="'left:'+item.css.left+'px;top:'+item.css.top+'px;font-size:'+item.css.fontSize+'px;padding:'+item.css.padding+'px;color:'+item.css.color+';background:'+item.css.background+';z-index:'+item.css.zIndex+';border-width:'+item.css.borderWidth+'px;border-style:solid;border-color:'+item.css.borderColor+';transform:'+item.css.transform+';'"  v-if="item.videoShow">
                    <a target="_blank" v-if="item.type == 'text'" :style="'color:'+item.css.color+';'" :href="item.href || 'javascript:;'">
                        <span>{{item.text || '请输入文字'}}</span>
                    </a>
                    <a target="_blank" v-if="item.type == 'img'" :href="item.href || 'javascript:;'">
                        <img class="single-img" :src="item.src+'?s='+widowWidth" alt="">
                    </a>
                    <a target="_blank" v-if="item.type == 'goods'" class="goods-container" :style="'color:'+item.css.color+';'" :href="'http://'+item.href">
                        <span class="goods-bg"><img :src="item.pic" alt=""></span>
                        <span class="goods-name">{{item.title}}</span>
                        <span class="goods-price" :style="'color:'+item.css.priceColor+';'">￥{{item.price}}</span>
                    </a>
                    <a class="quan-container" v-if="item.type == 'quan'" :href="'http://'+item.href" target="_blank">
                        <span class="quan-number">10</span>
                        <span class="quan-name">{{item.quanName}}</span>
                        <span class="quan-des">有效期至{{item.quanEndTime}}</span>
                    </a>
                    

                    <div style="height:200px;" v-if="item.type == 'video'" v-html="item.videoSrc">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isPC" class="canvas-container">
            <p>用手机查看</p>
            <canvas id="canvas" height="170" width="170"></canvas>
        </div>
</div>
</template>
<script>
import axios from 'axios'
import QRCode from 'qrcode'
    export default{
        data(){
            return {
                elements:[],
                isPC: false,
                isFireFox:false,
                startPosition: {
                    left: 0,
                    top: 0
                },
                boxPosition: {
                    left: 0,
                    top: 0
                }
            }
        },
        computed: {
            widowWidth() {
                let width = document.getElementsByTagName('html')[0].offsetWidth;
                return width;
            }
        },
        mounted() {
            console.info(this)
            this.getMeta();
            console.info(this.$route.query.id)
            console.info(this.$route.query.shop_id)
            let params = {
                id: this.$route.query.id,
                shop_id: parseInt(this.$route.query.shop_id)
            }
            this.$http.get(this.$store.state.globalApi+'/h5/page',{
                params: params
            }).then(
                response => {
                    response = response.data;
                    if(response.code == 0) {
                        document.getElementsByTagName('title')[0].innerHTML = response.data.title;//更改网页的标题
                        let page = JSON.parse(response.data.content);
                        //let page = res.data.list[0];
                        console.info(page)
                        this.elements = page;
                        //绘制二维码
                        let canvas = document.getElementById('canvas');
                        let opt = { errorCorrectionLevel: 'H', margin: 3 }
                        QRCode.toCanvas(canvas, response.data.short_url, opt, function(error) {});
                    }
                }
            )

            //判断是否为pc端
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
                this.isPC = false;
            } else if (/(Android)/i.test(navigator.userAgent)) {  
                this.isPC = false;
            } else {  
                this.isPC = true;
                document.getElementById('app').style.backgroundImage = 'url(../../../static/img/bg.png)';
                document.getElementById('app').style.backgroundColor = '#97bbd0';
                if(navigator.userAgent.indexOf("Firefox") > -1){//判断是否为火狐
                    this.isFireFox = true;
                }
            };  
        },
        methods:{
            getMeta() {
                let meta = document.createElement("meta");
                meta.name = 'viewport';
                meta.content='"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"';
                let body = document.getElementsByTagName('body')[0];
                body.appendChild(meta);
                document.getElementById('app').style.overflow = 'visible';
            },
            modify(str) {//修改iframe大小
                let result,regWidth,regHeight;
                if(str.indexOf('youku')){
                    regWidth = /(width=)\S\S\S?/;
                    regHeight = /(height=)\S\S\S?/;
                    this.elements[this.nowIndex].videoShow = true;                    
                }else if(str.indexOf('qq')){
                    regWidth = /(width=")\S\S\S\S?/;
                    regHeight = /(height=")\S\S\S\S?/;
                    this.elements[this.nowIndex].videoShow = true;                    
                }else{
                    this.elements[this.nowIndex].videoShow = false;
                }
                result = str.replace(regWidth,'width=100% ');
                result = result.replace(regHeight,'height=100% ');
                console.info(result)
                return result;
            },
        }
    }
</script>

<style lang="scss" scoped>

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
        background-image: url('../../../static/img/quan_bg.png');
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

    .show-pc{
        background-image:url(../../../static/img/phone-bg.png);
        background-repeat: no-repeat;
        padding:14px 24px;
        left: 50%;
        margin-left: -165px;
        position: absolute;
        top: 50%;
        margin-top: -362px;
        width: 316px;
    }
    .show-pc .show-container{
        background-color:#fff;
        width:316px;
        height: 700px;
        padding:0;
        border-radius:43px;
        overflow: hidden;
        position: relative;
    }
    .show-pc .show-container .box{
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .show-pc .show-container .box::-webkit-scrollbar  
        {  
            width: 0px;  
            height: 16px;  
            background-color: rgba(0,0,0,1);  
        }  
    .show-pc .firefox .box{
        width:105%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .canvas-container{
        position: absolute;
        top:150px;
        right: -140px;
        width:140px;
        height: 160px;
        p{
            height: 20px;
            line-height: 20px;
            text-align: center;
            color:#fff;
        }
    }
    
</style>

