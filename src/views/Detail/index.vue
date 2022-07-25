<template>
  <div class="detail">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="header"
      color="#fff"
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
    <CommentList
      :articleComments="articleComments"
      :commCount="articleDetailItem.comm_count"
      ref="comment"
    ></CommentList>

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
        <!-- 发布评价 -->
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
            placeholder="输入留言"
            show-word-limit
            input-align="left"
            @input="inputPublishFn"
          />
          <span class="publish" v-if="isLength === false">发布</span>
          <span class="publishLength" v-else @click="publishComment">发布</span>
        </van-popup>
        <van-tabbar-item
          :badge="articleDetailItem.comm_count"
          icon="comment-o"
        ></van-tabbar-item>
        <van-tabbar-item class="btnFooter">
          <template #icon>
            <van-icon
              name="star-o"
              v-if="articleDetailItem.is_collected !== true"
              @click="collectedFn"
            />
            <!-- 收藏 -->
            <van-icon
              name="star-o"
              v-else
              @click="collectedFn"
              class="current"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item class="btnFooter">
          <template #icon>
            <van-icon
              name="good-job-o"
              @click="likeFn"
              v-if="articleDetailItem.attitude !== 1"
            />
            <!-- 点赞 -->
            <van-icon
              name="good-job-o"
              class="attitude"
              v-else
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
// API
import {
  articleDetail,
  attentionUser,
  deleteAttentionUser,
  collected,
  deleteCollected,
  likings,
  deleteLikings,
  publishComment
} from '@/api/detail'

import 'github-markdown-css/github-markdown-light.css'
import CommentList from './component/CommentList.vue'

export default {
  name: 'Detail',
  components: {
    CommentList
  },
  data () {
    return {
      articleTime: '',
      articleDetailItem: {},
      articleComments: {},
      htmlCode: '',
      isCommentShow: false,
      author: '',
      artId: '',
      message: '',
      isLength: false,
      show: false,
      publishList: []
    }
  },
  created () {
    this.articleDetail()
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
      this.artId = res.data.data.art_id // 文章ID
      // console.log(res)

      // console.log(this.$router.history.current.query.id)
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
        const res = await collected(this.artId)
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
        const res = await deleteCollected(this.artId)
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
        const res = await likings(this.artId)
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
        const res = await deleteLikings(this.artId)
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
        // console.log(this.message.length)
      } else {
        this.isLength = false
      }
    },
    // 显示评论
    commentShow () {
      this.isCommentShow = true
    },
    // 点击发布，发表评论的请求
    async publishComment () {
      try {
        const res = await publishComment(this.artId, this.message)
        this.publishList = res.data.data.new_obj
        this.$refs.comment.articleComments.unshift(this.publishList)
        this.articleDetailItem.comm_count++
        this.message = ''
        this.isLength = false
      } catch (error) {
        console.log(error.message)
        this.$toast.fail('发布失败')
      }
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

    :deep(.van-icon-arrow-left) {
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
  // 评论列表
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
      line-height: 0.55rem;
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
    border: 0.02667rem solid #eee;
    margin: 20px;
  }
  .textName .btn1 {
    border: none;
    position: absolute;
    right: 0;
    top: 0;
  }
}
:deep(pre) {
  display: block;
  font-family: monospace;
  white-space: pre;
  overflow: auto;
}
.active {
  background-color: #fff;
  color: #333;
  border: 0.02667rem solid #ebedf0;
}
.current {
  color: red;
}
.attitude {
  color: red;
}
.publishLength {
  color: #6ba3d8;
  position: absolute;
  right: 40px;
  top: 100px;
  font-size: 28px;
}
</style>
