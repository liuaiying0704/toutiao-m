// 引入axios
import axios from 'axios'
import store from '@/store/index'
// 配置axiosde 默认配置
// 创建一个全新的axios的对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 拦截器
// 请求拦截器
// 每一次请求，都会执行一次

// 响应拦截器
// 每一次请求响应回来，都会执行一次
request.interceptors.request.use(
  // 发送请求之前做什么
  // config本次请求的配置
  // 必须返回出去config
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 请求错误的处理方法
  (error) => {
    return Promise.reject(error)
  }
)
export default request
