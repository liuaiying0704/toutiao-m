<template>
  <div class="history-container">
    <van-cell title="搜索" size="middle">
      <template #extra>
        <!-- 点击删除按钮，显示v-else -->
        <van-icon name="delete-o" v-if="isShow" @click="delFn" />
        <div v-else>
          <span @click="allFn">全部删除 </span>
          <span @click="finishFn">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="item in searchList"
      :key="item"
      @click="SearchHistoryFn(item)"
    >
      <van-icon
        name="cross"
        v-show="!isShow"
        style="border: 1px solid #ccc"
        class="cross"
      />
    </van-cell>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  // props: ['searchList'],
  data () {
    return {
      searchList: '',
      isShow: true
    }
  },
  created () {
    // 获取keywords
    this.searchList = storage.get('keywords')
  },
  methods: {
    SearchHistoryFn (item) {
      // console.log(item)
      if (this.isShow === true) {
        this.$emit('searchFn', item)
      } else {
        this.searchList = this.searchList.filter((ele) => item !== ele)
        storage.set('keywords', this.searchList)
      }
    },
    // 删除
    delFn () {
      this.isShow = false
    },
    allFn () {
      this.searchList = []
      storage.remove('keywords')
    },
    finishFn () {
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="less">
.history-container {
  background-color: #f5f7f9;
  height: calc(100vh - 100px); //100vh  等于视口高度375px
  .cross {
    border-radius: 50%;
  }
}
</style>
