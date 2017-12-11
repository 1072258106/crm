<template>
  <div>
      <p v-show="groupType != 1">{{description | getDes(groupType)}}</p>
      <p v-show="groupType == 1">{{gradeDes}}</p>
  </div>
</template>
<script>
    export default{
        'name': 'groupNameDes',
        props: {
            description: {},
            groupType:String
        },
        data () {
            return {
                privileges: [],
                gradeDes: ''
            }
        },
        mounted () {
            this.groupType = this.$route.params.type
            if(this.groupType == 1){
                //this.getPrivileges()
            }
        },
        watch:{
            '$route'(to, from) {
                this.groupType = to.params.type
            }
        },
        methods:{
            getPrivileges() {
                this.$http.get("http://memberapi.iqincheng.com/h5/privileges").then(
                    response => {
                        let res = response.data
                        let arr = res.data.list
                        for(var i = 0,des= '';i<arr.length;i++){
                            des = '交易金额' + arr[i].promotion.nextUpgradeAmount + '或交易次数' + arr[i].promotion.nextUpgradeCount
                            this.privileges[i+1] = des
                        }
                        this.gradeDes = privileges[parseInt(description.grade[0])]
                    }
                )
            }
        },
        filters: {
            getDes: function(description,groupType) {
                let result,title
                if(groupType == 2 && description.tbGroupId){//会员标签
                    title = "标签Id："
                    result = description.tbGroupId[0]
                    result = title + result
                }
                if(groupType == 3 && description.tradeCount){//购买频次
                    title = '成交笔数：'
                    if(description.tradeCount.min == -1 && description.tradeCount.max == -1){
                        result = '不限'
                    }else if(description.tradeCount.min == -1){
                        result = description.tradeCount.max + '次以内'
                    }else if(description.tradeCount.max == -1){
                        result = description.tradeCount.min + '次以上'
                    }else{
                        result = description.tradeCount.min + '-' + description.tradeCount.max + '次'
                    }
                    result = title + result
                }
                if(groupType == 4 && description.avgPrice){//客单均价
                    title = '客单均价：'
                    if(description.avgPrice.min == -1 && description.avgPrice.max == -1){
                        result = '不限'
                    }else if(description.avgPrice.min == -1){
                        result = description.avgPrice.max + '元以内'
                    }else if(description.avgPrice.max == -1){
                        result = description.avgPrice.min + '元以上'
                    }else{
                        result = description.avgPrice.min + '-' + description.avgPrice.max + '元'
                    }
                    result = title + result
                }
                if(groupType == 5 && description.lastTradeDays){//活跃程度
                    title = '最近购买在'
                    if(description.lastTradeDays.min == -1 && description.lastTradeDays.max == -1){
                        result = '不限'
                    }else if(description.lastTradeDays.min == -1){
                        result = description.lastTradeDays.max + '天内'
                    }else if(description.lastTradeDays.max == -1){
                        result = description.lastTradeDays.min + '天前'
                    }else{
                        result = description.lastTradeDays.min + '-' + description.lastTradeDays.max + '天'
                    }
                    result = title + result
                }
                if(groupType == 6 && description.orderFrom){//订单来源
                    title = '订单来源：'
                    if(description.orderFrom[0] == 'JHS'){
                        result = '聚划算'
                    }
                    if(description.orderFrom[0] == 'WAP'){
                        result = '手机'
                    }
                    if(description.orderFrom[0] == 'TAOBAO'){
                        result = '淘宝'
                    }
                    if(description.orderFrom[0] == 'JHS'){
                        result = '聚划算'
                    }
                    if(description.orderFrom[0] == 'TOP'){
                        result = 'TOP平台'
                    }
                    if(description.orderFrom[0] == 'HITAO'){
                        result = '嗨淘'
                    }
                    result = title + result
                }
                if(groupType == 7 && description.numberType){//号码类型
                    title = '号码类型：'
                    if(description.numberType == 1){
                        result = '移动号码'
                    }
                    if(description.numberType == 2){
                        result = '联通号码'
                    }
                    if(description.numberType == 3){
                        result = '电信号码'
                    }
                    result = title + result
                }
                return result
            }
        }
    }
</script>
