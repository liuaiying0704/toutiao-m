import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1、下载引入字体图标
import '@/assets/fonts/iconfont.css'
// 2、下载引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 3、引入amfe-flexible
import 'amfe-flexible/index.min.js'
// 4、使用 将 `px` 转为 `rem
// 下载postcss-pxtorem@5.1.1 -D，新建文件写入代码，无需引入

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
