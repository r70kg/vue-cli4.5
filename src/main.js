import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 数据请求
import myserver from './api/index'
Vue.prototype.msv = myserver
// 非生产环境不生产提示信息
Vue.config.productionTip = process.env !== 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
