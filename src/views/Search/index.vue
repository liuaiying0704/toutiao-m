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
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 搜索历史
// 搜索历史
// 搜索历史
import SearchHistory from './components/SearchHistory.vue'
import SearchResults from './components/SearchResults.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
export default {
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestions
  },
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
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
  methods: {
    onSearch () {
      // 回车触发，显示结果
      this.isShowSearchResult = true
    },
    onCancel () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      // 如果keywords没有值，显示搜索
      // 如果keywords有值，显示搜索建议
      this.isShowSearchResult = false
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
