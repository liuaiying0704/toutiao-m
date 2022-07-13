import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  // 路由懒加载
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/', redirect: '/login' }
]
const router = new VueRouter({
  routes
})
export default router
