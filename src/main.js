import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 自适应
import 'lib-flexible'
// 数据请求
import myserver from './api/index'
Vue.prototype.msv = myserver
// 全局混入
import mixIn from './mixins/index'
// 非生产环境不生产提示信息
Vue.config.productionTip = process.env !== 'production'
new Vue({
  mixins: [mixIn],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
