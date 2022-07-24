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

// 5.dayjs   封装utils下
// dayjs:https://day.js.org/docs/zh-CN/parse/date
// import dayjs from 'dayjs'
// const relativeTime = require('dayjs/plugin/relativeTime')
// dayjs.extend(relativeTime)
// require('dayjs/locale/zh-cn')
// // import 'dayjs/locale/zh-cn' // ES 2015
// dayjs.locale('zh-cn') // 全局使用
// dayjs().locale('zh-cn').format() // 当前实例使用
// // new Date()
// // console.log(dayjs().format('YYYY-MM-DD HH-mm-ss'))

// 6、使用highlight
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
// 代码高亮
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
