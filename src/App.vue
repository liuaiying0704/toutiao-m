<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import request from './utils/request'
// 1、下载axios
// 2\axiosde 配置
export default {
  data () {
    return {}
  },
  created () {
    console.dir(request) // request.defaults.baseURL
  }
}
</script>

<style></style>
