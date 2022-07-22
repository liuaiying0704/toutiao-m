<template>
  <div class="results-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="300"
    >
      <van-cell v-for="item in results" :key="item.art_id" :title="item.title">
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    },
    results: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      page: 1,
      loading: false,
      finished: false,
      error: false,
      isEdit: false
    }
  },
  created () {},
  methods: {
    async onLoad () {
      try {
        this.page++
        const res = await getSearchResults(this.page, this.keywords)
        if (res.data.data.results.length === 0) {
          this.finished = true
          this.loading = false
          return
        }
        this.$parent.results.push(...res.data.data.results)
        console.log(this.$parent.results)
        // console.log(res)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.results-container {
  background-color: #f5f7f9;
  height: calc(100vh - 100px); //100vh  等于视口高度375px
}
:deep(.van-row .col) {
  height: 96px;
  // background-color: pink;
  border-bottom: 2px solid #ccc;
  margin: 20px 32px 20px 20px;
  color: rgb(50, 50, 51);
  font-size: 28px;
}
</style>
