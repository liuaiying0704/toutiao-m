<template>
  <div>
    <!-- 每一篇文章的结构  列表 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了~~~"
        :error.sync="error"
        error-text="出错了，请重新加载！"
        offset="300"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem> </van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
// 引入组件
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api'
export default {
  props: {
    // 频道id
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: { ArticleItem },

  data () {
    return {
      articles: [],
      pre_timestamp: '',
      // van-list
      loading: false,
      finished: false,
      error: false,
      // 下拉刷新，新数据在最上面
      refreshing: false
    }
  },
  created () {
    this.getArticleList()
  },

  methods: {
    // 获取频道的文章并且处理数据
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // 保存第一次的页码
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        // console.log(data)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          console.log(error)
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },

    // 加载下一页的数据
    async loadNextPage () {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        // 加载完全部的数据
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          // 将n页的数据，合并放在articles数组的最上面
          this.articles.unshift(...data.data.results)
        } else {
          // 将n页的数据，合并放在articles数组的后面
          this.articles.push(...data.data.results)
        }

        // 更新页码，以免报错dic
        this.pre_timestamp = data.data.pre_timestamp
        // loading---加载完，van自动设置为true就不能 继续加载，因此请求完数据设置为false
        // this.loading = false
      } catch (error) {
        // this.loading = false
        // 出错时，会执行此处的代码，van组件库以封装好出现文本，加载中的文版要隐藏，因此this.loading=false
        this.error = true
      } finally {
        this.loading = false // try\catch 后，finally的语句 一定会执行。因此这里有this.loading = false，上面的都可以省略
        this.refreshing = false // 刷新完数据设置为false
      }
    }
  }
}
</script>

<style></style>
