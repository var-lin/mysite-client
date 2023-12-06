import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from "./router"
import "./eventBus"  // 事件总线

// vuex全局数据
import store from "./store"
store.dispatch("setting/fetchSetting")

import showMessage from './utils/showMessage'
Vue.prototype.$showMessage = showMessage;

import isMobile from "@/utils/isMobile"; // 判断是否为移动端 true为是false为不是
Vue.prototype.$isMobile = isMobile;

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