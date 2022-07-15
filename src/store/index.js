// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义数据
  state: {
    // user: {}
    // user: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
    user: getToken() || {}
  },
  // 修改数据
  mutations: {
    setUser (state, playload) {
      state.user = playload
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(playload))
      setToken(playload)
    }
  }
})
