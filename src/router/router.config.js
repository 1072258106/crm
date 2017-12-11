import Vue from 'vue';
import Router from 'vue-router';
import { getUserInfo, getConfirmOrderNum } from "../api/common"
import store from "../store/index"
import { MessageBox } from 'element-ui'

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/Index.vue'], resolve),
                    name: ''
                },
                {
                    path: "/activity",
                    component: resolve => require(['../components/page/messageSend/Main.vue'], resolve),
                    children: [
                        {
                            path: '',
                            // /create.vue
                            component: resolve => require(['../components/page/messageSend/Create.vue'], resolve),
                            meta: {
                                name: '创建活动'
                            }
                        },
                        {
                            path: 'records',
                            component: resolve => require(['../components/page/messageSend/Records.vue'], resolve),
                            meta: {
                                name: '发送记录'
                            }
                        },
                        {
                            path: 'records/:id(\\d+)',
                            component: resolve => require(['../components/page/messageSend/Results.vue'], resolve),
                            meta: {
                                is_child: true,
                                thirdTitle: '查看效果'
                            }
                        },
                        {
                            path: 'status/:id(\\d+)?',
                            component: resolve => require(['../components/page/messageSend/Status.vue'], resolve),
                            meta: {
                                is_child: true,
                                name: '状态查询'
                            },
                            beforeEnter(to, from, next) {
                                if ('undefined' == typeof (to.params.id)) {
                                    to.meta.is_child = false;
                                }
                                next();
                            }
                        }
                    ]
                },//活动群发
                {
                    path: '/care/:step_id',
                    component: resolve => require(['../components/page/care/Index.vue'], resolve),  //订单关怀-发货提醒
                    meta: {
                        names: ['', '迟发提醒', '发货提醒', '到货提醒', '', '好评提醒', '好评感谢', '差评安抚', '退款关怀', '签收提醒', '付款关怀']
                    },
                    children: [
                        {
                            // 条件设置
                            path: "",
                            component: resolve => require(['../components/page/care/Setting.vue'], resolve),
                            meta: {
                                thirdTitle: '功能设置',
                            }
                        },
                        {
                            // 发送记录
                            path: "records",
                            meta: {
                                thirdTitle: '发送记录',
                                is_child: true
                            },
                            component: resolve => require(['../components/page/care/Records.vue'], resolve)
                        },
                        {
                            path: "effect",
                            meta: {
                                thirdTitle: '效果统计',
                                is_child: true
                            },
                            component: resolve => require(['../components/page/care/Effect.vue'], resolve)
                        }
                    ]
                },//售中关怀
                {
                    path: '/remind',
                    component: resolve => require(['../components/page/remind/Main.vue'], resolve),  //订单催付-订单关怀
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/page/remind/group/Main.vue'], resolve),
                            children: [
                                {
                                    path: "group",
                                    redirect: 'group/2',
                                    name: '宝贝分组催付'
                                },
                                {
                                    path: "group/:id(\\d+)?",
                                    component: resolve => require(['../components/page/remind/group/Edit.vue'], resolve),
                                    meta: {
                                        name: '宝贝分组催付',
                                        is_child: true
                                    }
                                }, {
                                    path: "group/add",
                                    component: resolve => require(['../components/page/remind/group/Edit.vue'], resolve),
                                    meta: {
                                        thirdTitle: '添加个性催付',
                                        is_child: true
                                    }
                                }, {
                                    path: "group/disabled",
                                    component: resolve => require(['../components/page/remind/group/Disabled.vue'], resolve),
                                    meta: {
                                        thirdTitle: '不催付宝贝',
                                        is_child: true
                                    }
                                }
                            ]
                        }
                        , {
                            path: 'timing',
                            meta: {
                                name: '活动定时催付'
                            },
                            component: resolve => require(['../components/page/remind/Timing.vue'], resolve)  //订单催付-售前关怀
                        },
                        {
                            path: 'effect',
                            meta: {
                                name: '催付效果统计'
                            },
                            component: resolve => require(['../components/page/remind/Effect.vue'], resolve)  //订单催付-效果统计
                        },
                        {
                            path: 'records',
                            meta: {
                                name: '短信发送记录'

                            },
                            component: resolve => require(['../components/page/remind/Records.vue'], resolve)  //订单催付-发送记录
                        },
                        {
                            path: 'top',
                            meta: {
                                name: '催付优秀案例'
                            },
                            component: resolve => require(['../components/page/remind/Top.vue'], resolve)  //订单催付-优秀案例
                        }
                    ]
                },// 订单催付
                {
                    path: '/follow/:step_id',
                    meta: {
                        names: ['', '升级关怀', '使用关怀', '复购关怀', '生日关怀', '休眠关怀']
                    },
                    component: resolve => require(['../components/page/memberCare/Index.vue'], resolve),  //订单关怀-发货提醒
                    children: [
                        {
                            // 条件设置
                            path: "",
                            meta: {
                                thirdTitle: '功能设置'
                            },
                            component: resolve => require(['../components/page/memberCare/Setting.vue'], resolve)
                        },
                        {
                            // 发送记录
                            path: "records",
                            meta: {
                                is_child: true,
                                thirdTitle: '发送记录'
                            },
                            component: resolve => require(['../components/page/memberCare/Records.vue'], resolve)
                        },
                        {
                            path: "effect",
                            meta: {
                                thirdTitle: '效果统计',
                                is_child: true
                            },
                            component: resolve => require(['../components/page/memberCare/Effect.vue'], resolve)
                        }
                    ]
                },//会员关怀
                {
                    path: "/member",
                    component: resolve => require(['../components/page/member/Main.vue'], resolve),
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/page/member/Index.vue'], resolve),
                            meta: {
                                name: '会员资料'
                            },
                        },
                        {
                            path: 'group/:type(\\d+)?',
                            component: resolve => require(['../components/page/member/Group.vue'], resolve),
                            meta: {
                                names: ['', '会员等级', '会员标签', '购买频次', '客单均价', '活跃程度', '订单来源', '手机类型', '我的分组']
                            }
                        },
                        {
                            path: 'black',
                            component: resolve => require(['../components/page/member/Black.vue'], resolve),
                            meta: {
                                name: '黑名单管理'
                            },
                        },
                        {
                            path: '/member/my_group',
                            component: resolve => require(['../components/page/member/MyGroup.vue'], resolve),
                            meta: {
                                name: '我的分组'
                            },
                        }
                    ]
                },
                {
                    path: "/integral",
                    component: resolve => require(['../components/page/integral/Main.vue'], resolve),
                    meta: {
                        name: '会员积分设置'
                    },
                    children: [
                        {
                            path: "",
                            component: resolve => require(['../components/page/integral/Setting.vue'], resolve),
                            children: [
                                {
                                    path: "",
                                    component: resolve => require(['../components/page/integral/SetTask.vue'], resolve),
                                    meta: {
                                        thirdTitle: "任务设置",
                                    }
                                },
                                {
                                    path: "setprice",
                                    component: resolve => require(['../components/page/integral/SetPrice.vue'], resolve),
                                    meta: {
                                        thirdTitle: "奖品设置",
                                        is_child: true
                                    }
                                },
                                {
                                    path: "settao",
                                    component: resolve => require(['../components/page/integral/SetTao.vue'], resolve),
                                    meta: {
                                        thirdTitle: "手淘设置",
                                        is_child: true
                                    }
                                }
                            ]
                        },
                        {
                            path: "list",
                            component: resolve => require(['../components/page/integral/List.vue'], resolve),
                            meta: {
                                name: "会员积分清单",

                            }
                        },
                        {
                            path: "records",
                            component: resolve => require(['../components/page/integral/Records.vue'], resolve),
                            meta: {
                                name: "会员积分记录",

                            }
                        }
                    ]
                }, //会员积分
                {
                    path: '/developing',
                    meta: {
                        name: '正在开发中'
                    },
                    component: resolve => require(['../components/page/generalTool/Developing.vue'], resolve)  //实用工具-h5网页制作
                }, {
                    path: '/tools',
                    component: {
                        template:`
                        <router-view></router-view>
                        `
                    },
                    children:[
                        {
                            path: 'h5',
                            component: resolve => require(['../components/page/generalTool/H5.vue'],resolve),
                            children:[
                                {
                                    path: '',
                                    component: resolve => require(['../components/page/generalTool/H5make.vue'],resolve),
                                    meta: {
                                        name: 'H5制作',
                                    }
                                },{
                                    path: 'h5list',
                                    component: resolve => require(['../components/page/generalTool/H5list.vue'] ,resolve),
                                    meta: {
                                        name: '我的H5',
                                        is_child: true
                                    }
                                }
                            ]
                        },{
                            path: 'phone_split',
                            component: resolve => require(['../components/page/generalTool/PhoneSplit.vue'] ,resolve),
                            meta: {
                                name: '手机号码筛选'
                                
                            }
                        }
                    ]
                },
                
                // {
                //     path: '/h5',
                //     meta: {
                //         name: 'H5网页制作',
                //         is_child: true
                //     },
                //     component: resolve => require(['../components/page/generalTool/H5old.vue'], resolve)  //实用工具-h5网页制作
                // },
                // {
                //     path: '/h5list',
                //     meta: {
                //         name: 'H5网页列表',
                //         is_child: true
                //     },
                //     component: resolve => require(['../components/page/generalTool/H5list.vue'], resolve)  //实用工具-h5网页制作列表页
                // },
                {
                    path: '/setting',
                    meta: {
                        name: '系统设置',
                    },
                    component: resolve => require(['../components/page/Setting.vue'], resolve)
                },
                {
                    path: '/recharge',
                    component: resolve => require(['../components/page/recharge/Recharge.vue'], resolve),
                    children: [
                        {
                            path: '',
                            meta: {
                                name: '短信充值',
                            },
                            component: resolve => require(['../components/page/recharge/Message.vue'], resolve)
                        },
                        {
                            path: 'records',
                            meta: {
                                name: '充值记录',
                                is_child: true
                            },
                            component: resolve => require(['../components/page/recharge/Records.vue'], resolve)
                        },
                        {
                            path: 'expend',
                            meta: {
                                name: '消耗记录',
                                is_child: true
                            },
                            component: resolve => require(['../components/page/recharge/Expend.vue'], resolve)
                        }
                    ]
                }
            ]
        },
        {
            name: "oauth",
            path: '/oauth',
            component: resolve => require(['../components/page/Init.vue'], resolve)
        },
        {
            name: "h5",
            path: '/h5',
            component: resolve => require(['../components/page/H5show.vue'], resolve)
        },
    ]
});

const OAUTH_URL = 'https://oauth.taobao.com/authorize?client_id=21664542&response_type=code&redirect_uri=http://api.iqincheng.com/oauth';

router.beforeEach((to, from, next) => {
    if(to.name == 'h5'){
        next();
        return;
    }
    //手动设置token或者后台授权
    if (to.name === "oauth") {
        if ("undefined" === typeof (to.query.token)) {
            window.location = OAUTH_URL;
        }
        Vue.cookie.set('Access-Token', to.query.token);
        store.commit("setToken", to.query.token);
    }
    //token过期
    if (store.state.token.length === 0) {
        const token = Vue.cookie.get('Access-Token');
        if (token !== null) {
            store.commit("setToken", token);
        } else {
            if (process.env.NODE_ENV == 'production') {
                window.location = OAUTH_URL;
            } else {
                store.commit("setToken", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wX2lkIjo2OTkxOTc0Nywic2Vzc2lvbl9rZXkiOiI2MjAxMDEzZDQ2ZmE3OWE0NWYwODVaWjQ3OTgzMjdmZmE0OGVkMWZkZjBkYzg0Mzc4NzM5Nzk2MyJ9.PxW7gnKbxutVJ9hNwwiKc88Mb_hCE6-8nF-EpYjInQM');
            }
            
        }
    }
    getUserInfo()
        .then(
        response => {
            let responseData = response.data;
            if (responseData.code == 0) {
                store.commit("setUserInfo", responseData.data);
                next();
            } else {
                //错误处理
                window.location = OAUTH_URL;
            }

        },
        error => {

        }
        )
        // 确认订单弹窗提示
        if (to.path != "/recharge/records") {
            showConfirmOrder();
            
        }
    


})
/**
 * 确认订单弹窗提示
 */
function showConfirmOrder() {
    getConfirmOrderNum()
        .then(
            response => {
                let responseData = response.data;
                if (responseData.code == 0) {
                    let total = responseData.data.total;
                    if (total > 0) {
                        MessageBox.alert("您购买的短信已经完成付款，请前去确认账单短信才会到账！",'提示',{
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            callback: action =>{
                                router.push('/recharge/records');
                            }
                        });
                    }
                }
            }
        )
}

export default router;
