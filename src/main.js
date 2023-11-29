import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from "./router"
import "./eventBus"  // 事件总线
// import { Search } from 'vant-green'; // vant移动端适配组件
// import 'vant-green/lib/index.css';
// Vue.use(Search);

// vuex全局数据
import store from "./store"
store.dispatch("setting/fetchSetting")

import showMessage from './utils/showMessage'
Vue.prototype.$showMessage = showMessage;

// import "./mock"

// 注册全局指令
import vLoading from "./directives/loading"
import vLazy from "./directives/lazy"
Vue.directive("loading", vLoading)
Vue.directive("lazy", vLazy)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')