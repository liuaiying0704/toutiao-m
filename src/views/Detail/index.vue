<template>
  <div class="detail">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="header"
      color="#1989fa"
    />

    <!--title  -->
    <div class="title">{{ articleDetailItem.title }}</div>
    <!-- main -->
    <div class="main">
      <van-row>
        <van-col span="4"
          ><van-image
            width="35px"
            height="35px"
            round
            :src="articleDetailItem.aut_photo"
        /></van-col>
        <van-col span="10" class="text"
          ><div>{{ articleDetailItem.aut_name }}</div>
          <div style="color: rgb(183, 183, 183)">
            {{ articleTime }}
          </div></van-col
        >
        <van-col span="10">
          <van-button
            type="info"
            @click="attentionFn"
            :class="{ active: articleDetailItem.is_followed === true }"
          >
            <van-icon
              name="plus"
              size="small"
              v-show="articleDetailItem.is_followed === false"
            />{{ articleDetailItem.is_followed ? '已关注' : '关注' }}
          </van-button>
        </van-col>
      </van-row>
    </div>

    <!-- content -->
    <article
      v-html="articleDetailItem.content"
      v-highlight
      class="markdown-body content"
    ></article>

    <!-- 正文结束 -24 + 16  16--->
    <div class="separator">
      <span class="fen"></span>
      正文结束
      <span class="fen"></span>
    </div>

    <!-- 评论列表 13-16-12-->
    <div class="comment">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        loading-text="加载中，请稍后"
      >
        <van-cell v-for="(item, index) in articleComments" :key="index">
          <van-row class="row-comment">
            <van-col span="3">
              <van-image
                round
                width="35px"
                height="35px"
                :src="item.aut_photo"
              />
            </van-col>
            <van-col span="21">
              <div class="textName">
                <span>{{ item.aut_name }}</span>
                <button class="request-button btn1">
                  <van-icon name="good-job-o" /> 赞 {{ item.like_count }}
                </button>
              </div>
              <div class="textNumber">{{ item.content }}</div>
              <div class="textTime">
                {{ item.pubdate | toTime }}
                <button
                  type="default"
                  class="request-button"
                  @click="show = true"
                >
                  回复 {{ item.reply_count }}
                  <!-- <Reply ref="showPopup"></Reply> -->
                  <van-popup
                    v-model="show"
                    position="top"
                    :style="{ height: '99%' }"
                  >
                    aa
                  </van-popup>
                </button>
              </div>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>

    <!-- 没有更多 -->
    <div class="nomore">没有更多</div>
    <!-- 底部 -->
    <div class="articleFooter">
      <van-tabbar class="buttom1">
        <van-button
          class="btn1"
          round
          type="primary"
          size="mini"
          @click="commentShow"
          >评论</van-button
        >
        <van-popup
          v-model="isCommentShow"
          position="bottom"
          :style="{ height: '120px' }"
          class="popup"
        >
          <van-field
            v-model.trim="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="输入框内容右对齐"
            show-word-limit
            input-align="left"
            @input="inputPublishFn"
          />
          <span class="publish" v-if="isLength === false">发布</span>
          <span class="publishLength" v-else>发布</span>
        </van-popup>
        <van-tabbar-item
          :badge="articleDetailItem.comm_count"
          icon="comment-o"
        ></van-tabbar-item>
        <van-tabbar-item class="btnFooter">
          <template #icon>
            <van-icon
              name="star-o"
              :class="{ current: articleDetailItem.is_collected === true }"
              @click="collectedFn"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item class="btnFooter">
          <template #icon>
            <van-icon
              name="good-job-o"
              :class="{
                attitude: articleDetailItem.attitude === 1 ? true : false
              }"
              @click="likeFn"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          icon="share"
          class="btnFooter zhuanfa"
        ></van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 底部  -->
  </div>
</template>
<script>
import {
  articleDetail,
  allComments,
  attentionUser,
  deleteAttentionUser,
  collected,
  deleteCollected,
  likings,
  deleteLikings
} from '@/api/detail'
import dayjs from '@/utils/dayjs'
import 'github-markdown-css/github-markdown-light.css'
// import Reply from './component/Reply'
export default {
  name: 'Detail',
  components: {
    // Reply
  },
  data () {
    return {
      articleDetailItem: {},
      articleComments: {},
      htmlCode: '',
      error: false,
      loading: false,
      finished: false,
      limit: 20,
      lastid: '',
      isCommentShow: false,
      author: '',
      message: '',
      isLength: false,
      show: false
    }
  },
  created () {
    this.articleDetail()
    this.allComments()
  },
  computed: {
    articleTime () {
      const relativeTime = dayjs(this.articleDetailItem.pubdate).fromNow()
      return relativeTime
    }
  },
  // 处理循环数据的时间格式化   几年前
  filters: {
    toTime (val) {
      return dayjs(val).fromNow()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 1、文章内容content
    async articleDetail () {
      const res = await articleDetail(this.$router.history.current.query.id)
      this.articleDetailItem = res.data.data
      this.author = res.data.data.aut_id
      console.log(res)

      // console.log(this.$router.history.current.query.id)
    },
    // 2-1评价列表
    async allComments () {
      try {
        const res = await allComments(this.$router.history.current.query.id)
        this.articleComments = res.data.data.results
        this.lastid = res.data.data.last_id
        // console.log(1, this.lastid)
        // console.log(this.articleComments)
        return this.articleComments || []
      } catch (error) {
        return []
      }
    },
    // 2-2分页
    async onLoad () {
      try {
        const res = await allComments(
          this.$router.history.current.query.id,
          this.lastid
        )
        // console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          this.loading = false
        }
        this.articleComments = [
          ...this.articleComments,
          ...res.data.data.results
        ]
        // console.log(this.articleComments)
        this.lastid = res.data.data.last_id
        this.loading = false
        // console.log(this.lastid)
      } catch (error) {
        console.log(error.message)
        this.loading = false
        this.error = true
      }
    },
    // 关注用户
    async attention () {
      try {
        const res = await attentionUser(this.author)
        if (res.status === 201) {
          this.$toast.success('已关注成功')
        }
        console.log(res)
        return res
      } catch (error) {
        this.$toast.fail('关注失败，请重试')
      }
    },
    // 取消关注
    async deleteAttentionUser () {
      try {
        const res = await deleteAttentionUser(this.author)
        if (res.status === 204) {
          this.$toast.success('取消关注成功')
        }
        console.log(res)
        return res
      } catch (error) {
        this.$toast.fail('取消关注失败')
      }
    },
    // 调用
    attentionFn () {
      if (this.articleDetailItem.is_followed === false) {
        this.attention()
        this.articleDetailItem.is_followed = true
      } else {
        this.deleteAttentionUser()
        this.articleDetailItem.is_followed = false
      }
    },
    // collectedFn  likeFn
    // 收藏
    async collected () {
      try {
        const res = await collected(this.author)
        if (res.status === 201) {
          this.$toast.success('已收藏')
        }
        console.log(res)
        return res
      } catch (error) {
        this.$toast.fail('收藏失败，请重试')
        console.log(error.message)
      }
    },
    // 取消收藏
    async deleteCollected () {
      try {
        const res = await deleteCollected(this.author)
        if (res.status === 204) {
          this.$toast.success('已取消收藏')
        }
        console.log(res)
      } catch (error) {
        this.$toast.fail('取消收藏失败，请重试')
        console.log(error.message)
      }
    },
    // 点赞
    async likings () {
      try {
        const res = await likings(this.author)
        if (res.status === 201) {
          this.$toast.success('已点赞')
        }
        console.log(res)
      } catch (error) {
        this.$toast.fail('点赞失败')
        console.log(error.message)
      }
    },
    // 取消点赞
    async deleteLikings () {
      try {
        const res = await deleteLikings(this.author)
        if (res.status === 204) {
          this.$toast.success('已取消点赞')
        }
        console.log(res)
        return res
      } catch (error) {
        this.$toast.fail('取消点赞失败')
        console.log(error.message)
      }
    },
    // 点击事件
    // 收藏
    collectedFn () {
      if (this.articleDetailItem.is_collected === false) {
        this.collected()
        this.articleDetailItem.is_collected = true
      } else {
        this.deleteCollected()
        this.articleDetailItem.is_collected = false
      }
    },
    // 点赞
    likeFn () {
      if (this.articleDetailItem.attitude !== 1) {
        this.likings()
        this.articleDetailItem.attitude = 1
      } else {
        this.deleteLikings()
        this.articleDetailItem.attitude = -1
      }
    },
    inputPublishFn () {
      if (this.message.length !== 0) {
        this.isLength = true
        console.log(this.message.length)
      }
    },
    // 显示评论
    commentShow () {
      this.isCommentShow = true
    },
    // 显示点赞弹出层
    showReplyPopup () {
      console.log(this.$refs)
      this.$refs.showPopup.show = true
    }
  }
}
</script>

<style scoped lang="less">
.detail {
  .header {
    background-color: #3296fa;
    :deep(.van-nav-bar__title) {
      color: #fff;
    }
    :deep(.van-nav-bar .van-icon) {
      color: #fff;
    }
  }

  .title {
    // background-color: pink;
    padding: 50px 32px;
    box-sizing: border-box;
    font-size: 40px;
    color: #3a3a3a;
    font-weight: 700;
  }
  .main {
    height: 84px;
    padding: 0 32px;
    box-sizing: border-box;
    .text {
      color: #323233;
      font-size: 0.37333rem;
      line-height: 0.64rem;
    }
    :deep(.van-button) {
      height: 58px;
      border-radius: 58px;
      margin-left: 1.8rem;
    }
  }
  // content
  .content {
    // background-color: yellow;
    padding: 55px 32px;
    box-sizing: border-box;
  }
  // 正文结束
  .separator {
    height: 48px;
    margin: 32px 0.7rem;
    color: #969799;
    font-size: 28px;
    .fen {
      width: 240px;
      height: 12px;
      border-bottom: #ccc 2px solid;
      display: inline-block;
      vertical-align: middle;
    }
  }
  // 评论
  // .comment {
  // }
  .nomore {
    height: 100px;
    color: #969799;
    text-align: center;
    font-size: 28px;
    line-height: 100px;
  }
  // 评论
  .comment {
    .row-comment {
      margin: 20px 32px 0 32px;
      padding-bottom: 20px;
    }
    .textName {
      color: #406599;
      font-size: 0.34667rem;
    }
    .textNumber {
      font-size: 32px;
      position: relative;
      margin: 32px 0;
      .btn1 {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .textTime {
      font-size: 24px;
    }
    .request-button {
      font-size: 0.28rem;
      color: #222;
    }
    .request-button {
      width: 134px;
      height: 48px;
      border-radius: 48px;
      border: 2px #ccc solid;
      background-color: #fff;
      margin-left: 20px;
    }
  }
  // 底部
  .articleFooter {
    width: 750px;
  }
  .buttom1 {
    color: rgb(107, 163, 216);
    padding-top: 10px;
    :deep(.van-tabbar-item--active) {
      color: #646566;
    }
    .van-cell {
      width: 596px;
      background-color: rgb(245, 247, 249);
    }
    .van-popup--bottom {
      padding: 32px 0 32px 32px;
      box-sizing: border-box;
    }

    .publish {
      position: absolute;
      right: 40px;
      top: 100px;
      color: #6ba3d8;
      font-size: 28px;
    }
  }
  .btn1 {
    width: 246px;
    background-color: #fff;
    color: #000;
    border: 1px solid #333;
    margin: 20px;
  }
}
:deep(pre) {
  display: block;
  font-family: monospace;
  white-space: pre;
  overflow: auto;
  // 发表评论
}
.active {
  background-color: #fff;
  color: #333;
}
.current {
  color: red;
}
.attitude {
  color: red;
}
.publishLength {
  color: red;
  position: absolute;
  right: 40px;
  top: 100px;
  font-size: 28px;
}
</style>
