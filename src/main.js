import Vue from 'vue';
import Vuex from 'vuex'
import qs from 'qs';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import "babel-polyfill";
import NProgress from 'vue-nprogress';
import VueCookie from 'vue-cookie';

import App from './App';
import router from './router/router.config';
import axios from './http';
import '../theme/index.css';
import '../theme/iconfont.css';
import store from './store/index.js'
import '../static/css/iconfont.css';

Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(NProgress);
Vue.use(VueCookie);

const nprogress = new NProgress();

new Vue({
    router,
    store,
    axios,
    nprogress,
    render: h => h(App)
}).$mount('#app');

