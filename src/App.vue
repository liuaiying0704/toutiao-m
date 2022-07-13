<template>
  <div id="app">
    <div>toutiao</div>
    <span class="iconfont toutiao-fenxiang"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <!-- px--rem -->
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 694px;
  height: 88px;
  border-radius: 10px;
  background-color: #6db4fb;
}
</style>
