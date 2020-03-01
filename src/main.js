import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式
Vue.config.productionTip = false

Vue.use(ElementUI) // 注册全局组件
// vue.use实际上 会调用element-ui对象里的一个方法 install方法
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
