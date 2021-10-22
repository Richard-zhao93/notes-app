import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import themeColor from './mixins/themeColor'

// 引入初始化全局样式
import '@/assets/styles/global.css'
// 引入 icons
import '@/assets/icons'

// 全局混入 颜色主题
Vue.mixin(themeColor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
