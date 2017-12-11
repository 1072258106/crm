<template>
    <div style="display:inline-block;">
        <input type="button" class="button" @click="handleClick" :value="label">
        <el-dialog title="淘宝商品短链接" @open="data=''" :visible.sync="visible" v-if="type == 1" size="tiny">
            <p style="font-size:12px;">请输入您的商品链接,我们将自动帮您转成短链接插入到短信文案中</p>
            <el-input v-model="data" placeholder="请输入您的商品链接"></el-input>
            <p style="font-size:12px;background:#d9edf7;color:#447e9b;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;margin-top:15px;line-height:25px;">说明： 可以将您的店铺商品链接生成域名为c.tb.cn的短链，支持一键跳手淘。
                <span>短链的投放效果数据（比如点击次数、引导成交等）可以在淘宝官方的ECRM中进行查看；</span>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="活动/优惠券短链接" @open="data=''" :visible.sync="visible" v-if="type == 3" size="tiny">
            <p style="font-size:12px;">请输入您的活动/优惠券的长链接，我们将自动帮您转成短链接插入到短信文案中</p>
            <el-input v-model="data" placeholder="请输入您的活动/优惠券的长链接"></el-input>
            <p style="font-size:12px;background:#d9edf7;color:#447e9b;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;margin-top:15px;line-height:25px;">说明： 可以将您的店铺活动/优惠券的长链接生成域名为c.tb.cn的短链，支持一键跳手淘。
                <span>短链的投放效果数据（比如点击次数、引导成交等）可以在淘宝官方的ECRM中进行查看；</span>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="亲橙短链" @open="data=''" :visible.sync="visible" v-if="type == 4" size="tiny">
            <p style="font-size:12px;">请输入您的长链接，我们将自动帮您转成短链接插入到短信文案中</p>
            <el-input v-model="data" placeholder="请输入要转化的链接"></el-input>
            <p style="font-size:12px;background:#d9edf7;color:#447e9b;text-indent:1em;border-radius:4px;padding:10px 10px 35px 10px;margin-top:15px;line-height:25px;">说明： 可以将您的店铺商品、店铺首页、淘宝活动以及任意链接生成域名为www.qc.gs的短链，支持一键跳手淘。
                <span>短链的投放效果数据（比如点击次数、打开手机型号等）可以直接在亲橙CRM中进行查看；</span>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
<script>
import { urlQuery } from '../../function/utils'
export default {
    data() {
        return {
            data: '',
            visible: false,
            module: 4,
            step: 1
        }
    },
    props: {
        label: {
            type: String,
            default: '淘短链'
        },
        type: {
            type: Number,
            default: 2
        }
    },
    mounted() {
        if(this.$route.meta.name == '创建活动') {
            this.module = 4
        }
        if(this.$route.meta.thirdTitle == '功能设置') {
            this.module = 9
            console.log('step:',this.$route.params.step_id)
            this.step = parseInt(this.$route.params.step_id)
        }
    },
    watch: {
        '$route': function() {
            if(this.$route.meta.name == '创建活动') {
                this.module = 4
            }
            if(this.$route.meta.thirdTitle == '功能设置') {
                this.module = 9
                console.log('step:',this.$route.params.step_id)
                this.step = parseInt(this.$route.params.step_id)
            }
        }
    },
    methods: {
        getShortUrl() {
            let resolveData = this.data;
            //验证
            if (this.type === 1) {
                resolveData = urlQuery("id", resolveData);
                if (resolveData.length == 0) {
                    this.$message.error("请输入有效的商品链接");
                    return;
                }
            }
            else if (this.type === 3) {
                let reg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
                if (!reg.test(resolveData)) {
                    this.$message.error("请输入有效的活动链接");
                    return;
                }
            }
            this.$http.post('/activity/short_url', {
                type: this.type,
                data: resolveData,
                module: this.module,
                step: this.step
            }).then(
                response => {
                    const responseData = response.data;
                    if (responseData.code == 0) {
                        const short_url = responseData.data.short_link;
                        //返回短链接
                        this.$emit('success', short_url);
                        this.visible = false;
                    } else {
                        this.$message.error(responseData.message);
                    }
                }
                )
        },
        handleClick() {
            if (this.type === 2) {
                this.getShortUrl();
            } else {
                this.visible = true;
            }
        },
        confirm() {
            this.getShortUrl();
        }
    }
}
</script>
<style lang="scss" scoped>
.button {
    background-color: #20a0ff;
    border-radius: 4px;
    border: 0;
    padding: 4px 8px;
    color: #fff;
    cursor: pointer;
}
</style>
