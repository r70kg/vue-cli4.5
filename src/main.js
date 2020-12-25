import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 自适应
import 'lib-flexible'
// 全局引入 可优化
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 数据请求
import myserver from './api/index'
Vue.prototype.msv = myserver
// 引入 echarts
import ECharts from 'vue-echarts'
// 按需导入echarts的图形类型
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
// 导入工具部分
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
// register component to use
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/dataZoom';
// 全局注册chart组件
Vue.component('chart', ECharts)
// 全局函数
import globalFunction from './global/global'
// 非生产环境不生产提示信息
Vue.config.productionTip = process.env !== 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
