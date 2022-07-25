<template>
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
            <van-image round width="35px" height="35px" :src="item.aut_photo" />
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
                @click="showRequestPopup(item)"
              >
                回复 {{ item.reply_count }}
              </button>

              <!-- 回复评论列表 -->
            </div>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
    <!-- 每条评论 -->
    <van-popup
      v-model="requestPoppupShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ReplyList
        :item="requestItem"
        ref="ReplyList"
        :article="articleRequest"
        :lastComId="lastComId"
        :commCount="commCount"
      ></ReplyList>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { allComments, allRequests } from '@/api/detail'
import ReplyList from './ReplyList.vue'
export default {
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      limit: 20,
      lastid: '',
      lastComId: '',
      comId: '',
      author: '',
      show: false,
      articleComments: [],
      articleDetailItem: [],
      requestItem: '',
      articleRequest: [],
      commCount: '',
      requestPoppupShow: false
    }
  },
  components: { ReplyList },
  created () {
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
    // 2-1评价列表
    async allComments () {
      try {
        const res = await allComments(this.$router.history.current.query.id)
        this.articleComments = res.data.data.results
        this.lastid = res.data.data.last_id
        this.commCount = this.articleComments.reply_count
        // console.log(1, this.lastid)
        console.log(this.articleComments)
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

    // 点击每条评论的回复按钮
    showRequestPopup (item) {
      // 避免循环popup
      this.requestPoppupShow = true
      // this.$refs.ReplyList.show = true
      this.requestItem = item
      console.log(item)
      this.comId = this.requestItem.com_id
      this.allRequests()
    },
    // 3-1获取回复列表
    async allRequests () {
      try {
        const res = await allRequests(this.comId)
        this.articleRequest = res.data.data.results
        // console.log(res)
        this.lastComId = res.data.data.last_id
        // console.log(1, this.lastComId)
        // console.log(this.articleComments)
        return this.articleRequest || []
      } catch (error) {
        return []
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
    border: none;
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
  color: green;
  position: absolute;
  right: 40px;
  top: 100px;
  font-size: 28px;
}
</style>
