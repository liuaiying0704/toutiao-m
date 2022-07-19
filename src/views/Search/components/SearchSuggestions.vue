<template>
  <div>
    <van-cell v-for="(item, index) in highLightData" :key="index">
      <template #icon>
        <van-icon name="search" class="search-icon"></van-icon>
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
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
    // 请求建议数据
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
.search-icon {
  padding-top: 10px;
}
</style>
