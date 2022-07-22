import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  // 路由懒加载
  { path: '/login', component: () => import('@/views/Login') },
  // layout
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      }
    ]
  },
  // 搜索页面
  { path: '/search', component: () => import('@/views/Search') },
  // 文章
  { path: '/detail', component: () => import('@/views/Detail') }
]
const router = new VueRouter({
  routes
})
export default router
