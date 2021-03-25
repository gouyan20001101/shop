// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import comComponents from './components'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//
// Vue.prototype.$preImg = "http://localhost:3000";
Vue.prototype.$preImg = "";


//全局组件
for (let i in comComponents) {
    Vue.components(i, comComponents[i])
}

//全局过滤器
import comFilters from './filters'
for (let i in comFilters) {
    Vue.filter(i, comFilters[i])
}

//数据请求
import store from './store/index'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})