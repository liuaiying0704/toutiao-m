<template>
  <div @click="detailFn">
    <!-- 无图片的 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
    />

    <!-- 一张图片的 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 1"
    >
      <!-- 图片 -->
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 三张图片的 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 3"
    >
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文字描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true,
      id: ''
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} 评论${art.comm_count} ${relativeTime}`
    }
  },
  methods: {
    detailFn () {
      this.$router.push({
        path: 'detail',
        query: {
          id: this.articleInfo.art_id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
