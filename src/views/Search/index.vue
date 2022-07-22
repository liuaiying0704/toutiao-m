<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- 搜索结果、历史、建议 -->
    <!--    :searchList="searchList" -->
    <component
      :is="componentName"
      :keywords="keywords"
      @searchFn="searchFn"
      :results="results"
    ></component>
  </div>
</template>

<script>
// 搜索历史
// 搜索历史
// 搜索历史
import SearchHistory from './components/SearchHistory.vue'
import SearchResults from './components/SearchResults.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
import storage from '@/utils/storage'
import { getSearchResults } from '@/api/search'

export default {
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestions
  },
  data () {
    return {
      keywords: '',
      isShowSearchResult: false,
      searchList: [],
      page: 1,
      results: []
    }
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResults'
      }
      return 'SearchSuggestions'
    }
  },
  created () {},
  methods: {
    async onSearch (item) {
      // 回车触发，显示结果
      this.isShowSearchResult = true
      // 添加keywords到数组
      if (this.searchList.indexOf(this.keywords) === -1) {
        this.searchList.unshift(this.keywords)
        // 存储keywords
        storage.set('keywords', this.searchList)
      }
      // 1、获取搜索结果
      try {
        const res = await getSearchResults(this.page, this.keywords)
        this.results = res.data.data.results || []
        console.log(this.results)
      } catch (error) {
        console.log(error)
        return []
      }
    },

    // 2、加载更多

    onCancel () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      // 如果keywords没有值，显示搜索
      // 如果keywords有值，显示搜索建议
      this.isShowSearchResult = false
    },
    // 点击历史、建议列表数据，调用回车时间，获取搜索结果。
    searchFn (item) {
      console.log(item)
      // 处理数据
      // const reg = /<span style="color: red">[\s\S]*<\/span>/
      const span1 = '<span style="color: red">'
      const span2 = '</span>'
      item = item
        .replace(new RegExp(span1, 'g'), '')
        .replace(new RegExp(span2, 'g'), '')
      this.keywords = item
      console.log(this.keywords)
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
// 属性选择器
.van-search__action {
  color: #fff;
}
</style>
