<template>
  <div class="show-middle king show-pc" id="works">
      <div :class="isFireFox ? 'firefox show-container' : 'show-container'">
          <div class="box">
            <div right="myright" class="elements" v-for="(item,index) in elements" :key="index" :style="'left:'+item.css.left+'px;top:'+item.css.top+'px;font-size:'+item.css.fontSize+'px;padding:'+item.css.padding+'px;color:'+item.css.color+';background:'+item.css.background+';z-index:'+item.css.zIndex+';border-width:'+item.css.borderWidth+'px;border-style:solid;border-color:'+item.css.borderColor+';transform:'+item.css.transform+';'"  v-if="item.videoShow">
                <a target="_blank" v-if="item.type == 'text'" :style="'color:'+item.css.color+';'" :href="item.href || 'javascript:;'">
                    <span>{{item.text || '请输入文字'}}</span>
                </a>
                <a target="_blank" v-if="item.type == 'img'" :href="item.href || 'javascript:;'">
                    <img class="single-img" :src="item.src" alt="">
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
                

                <div v-if="item.type == 'video'" v-html="item.videoSrc" style="height:200px;">
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                elements:[],
                isFireFox: false
            }
        },
        props:{
            content:''
        },
        watch: {
            content() {
                this.show()
            }
        },
        methods: {
            show() {
                console.info('showcon',this.content)
                let page = JSON.parse(this.content);
                this.elements = page;
            }
        },
        mounted() {
            //判断是否为火狐
            if(navigator.userAgent.indexOf("Firefox") > -1){//判断是否为火狐
                this.isFireFox = true;
            } 
            this.show();
        }
    }
</script>
<style>
.el-dialog__body{
    height:auto;
    max-height: inherit;
}
</style>

<style lang="scss" scoped>
.show-middle{
    background-image:url(../../../../../static/img/top.png);
    background-repeat: no-repeat;
    padding-top: 27px;
    width: 375px;
    margin:0 auto;
    min-height: 525px;
}
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
        background-image: url('../../../../../static/img/quan_bg.png');
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

    .show-pc{
        background-image:url(../../../../../static/img/phone-bg.png);
        background-repeat: no-repeat;
        padding:14px 24px;
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

</style>

