import Vue from 'vue'
import Vuex from 'vuex'
import * as api from "../api/common"
import remind from './modules/remind'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        remind
    },
    // 状态
    state: {
        userInfo: {},
        // 验证token，先默认，后期再处理
        // @todo 替换获取方式
        token: '',
        memberGlobalUrl: 'http://memberapi.iqincheng.com/',//会员用的全局api
        globalUrl: 'http://crm.iqincheng.com/',//全局url
        globalApi: process.env.BASE_URL// 测试阶段除会员外的全局api
    },
    // 只能此方法改变state，只能同步改变
    mutations: {
        // 设置用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setToken(state, token) {
            state.token = token;
        },
        setSmsSign(state, sign) {
            state.userInfo.sms_sign = sign;
        }
    },
    actions: {
        // 访问API获取用户的信息
        getUserInfo({ commit }) {
            api.getUserInfo()
                .then(Response => {
                    commit("setUserInfo", undefined);
                })
        },
        // 保存短信签名
        saveSmsSign({ commit, state }) {
            let sign = state.userInfo.sms_sign;
            return api.setSmsSign(sign);
        }
    }
})