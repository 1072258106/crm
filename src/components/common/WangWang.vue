<template>
    <a target="_blank" :href="linkUrl">

        <span class="vam padding-right-10" v-if="iconPosition=='right'">
            {{text}}
        </span>

        <img border="0" class="vam wang-icon" :src="imgSrc" />
        <span class="vam padding-left-10" v-if="iconPosition=='left'">
            {{text}}
        </span>
    </a>
</template>

<script>
//阿里旺旺图标
export default {
    computed: {
        linkUrl() {
            return "http://www.taobao.com/webww/ww.php?ver=3&touid=" + this.nick + "&siteid=cntaobao&status=2&charset=utf-8";
        },
        imgSrc() {
            return "http://amos.alicdn.com/realonline.aw?v=2&uid=" + this.nick + "&site=cntaobao&s=2&charset=utf-8";
        },
        text() {
            let reslut;
            if(this.message) {
                reslut = this.message;
            }else {
                reslut = this.nick;
            }
            return reslut;
        }
    },
    props: {
        nick: {
            type: String,
            required: true
        },
        message: {
            type: String
        },
        iconPosition: {
            type: String,
            default: "left"
        }

    }

}
</script>

<style lang="sass" type="text/css">
.vam {vertical-align: middle;}
.padding-left-10 {padding-left: 10px;}
.padding-right-10 {padding-right: 10px;}
.wang-icon {width: 24px;height: 24px;}
</style>



