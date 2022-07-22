<template>
  <div class="searchSuggestions-container">
    <van-cell
      :title="item"
      v-for="(item, index) in highLightData"
      :key="index"
      @click="SearchSuggestionFn(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 搜索建议：待做功能
// 点击建议，获取搜索结果列表
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // keywords: 'getSearchSuggestion'
    // 不打印第一个输入的建议
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 1、请求建议数据
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        // 如果没有数据进行提示
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        // console.log(res)
        // 过滤掉null，undefined等
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    // 2、点击搜索框
    SearchSuggestionFn (item) {
      // console.log(item)
      // const item = item.(/^<span style="color: red">$/, 1)
      console.log(item)
      this.$emit('searchFn', item)
    }
  },
  computed: {
    highLightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.searchSuggestions-container {
  background-color: #f5f7f9;
  height: calc(100vh - 100px); //100vh  等于视口高度375px
}
.search-icon {
  padding-top: 10px;
}
</style>
