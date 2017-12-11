<template>
  <div id="myEcharts" ref="mychart"></div>
</template>
<script>
var echarts = require('echarts');
export default {
    data(){
        return {
            myChart: {}
        }
    },
    mounted: function(){
        let dom = this.$refs.mychart
        this.myChart = echarts.init(dom);
    },
    methods:{
        initLine() {
            let xAxis = []
            let yAxis = []
            this.axis.forEach(function(value) {
                xAxis.push(value.date)
                yAxis.push(value.value)
            }) 

            // 绘制图表
            this.myChart.setOption({
                tooltip: {},
                xAxis: {
                    data: xAxis,
                    axisLabel: {
                        rotate: 60,
                        interval: 0
                    },
                    axisTick: {
                        interval: 0
                    }
                },
                yAxis: {},
                grid: {//倾斜后控制间隔
                    x: 40,
                    x2: 100,
                    y2: 80
                },
                series: [{
                    name: '',
                    type: 'line',
                    smooth: true,
                    data: yAxis
                }]
            });
        },
        initPie() {
            let title = []
            this.axis.forEach(function(value) {
                title.push(value.name)
            })
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:title
                },
                series: [
                    {
                        name: '催付效果',
                        type:'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                },
                                color: '#fff'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:this.axis
                    }
                ],
                color: ['#13ce66','rgb(230,66,66)']
            };
            this.myChart.setOption(option)
        }
        
    },
    props:{
        axis: {
            type: Array
        },
        type:''
    },
    watch:{
        'axis': function () {
            if(this.type == 'line'){
                this.initLine()
            }else if(this.type == 'pie'){
                this.initPie()
            }    
        }
    }
}
</script>
<style scoped>
#myEcharts{
    height: 500px;
    width: 100%;
}
</style>

