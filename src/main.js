import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from "lodash";

// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 清除移动端样式
import "@/sass/resetMobile.less"

//解决控制台 touchstart 事件警告
import 'default-passive-events'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
Vue.prototype._ = lodash
new Vue({
    router, store, render: h => h(App)
}).$mount('#app')

