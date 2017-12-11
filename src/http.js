import axios from 'axios'
import store from './store/index.js'
import router from './router/router.config'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.BASE_URL;
// http request 拦截器
axios.interceptors.request.use(

    config => {
        if(config.url == '/h5/page') {
            return config;
        }
        if (config.method == 'get' || config.method == 'delete') {//如果请求方式是get
            if (store.state.token) {    // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers['Access-Token'] = store.state.token;
            }
            return config;
        } else if (config.method == 'post') {//如果请求方式是post
            if (store.state.token) {    // 判断是否存在token，如果存在的话，则每个http header都加上token
                // console.log("ccccccc" + JSON.stringify(config));
                config.headers['Access-Token'] = store.state.token;
                if (config.url.indexOf('memberapi.iqincheng.com') == -1) {
                    config.headers['Content-Type'] = 'application/json';
                } else {
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    config.transformRequest = [function (data) {
                        // Do whatever you want to transform the data
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                        }
                        return ret.substring(0, ret.length - 1);
                    }];
                }
            }
            return config;
        }
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        switch (response.status) {
            case 200:
                return response;
                break;

            default:
                // 处理异常;    
                break;
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.data.code) {
                case 1000:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)  // 返回接口返回的错误信息
    });

export default axios;