<template>
  <!-- 评论列表弹层 -->
  <div>
    <!-- 标题 -->
    <van-nav-bar
      :title="`${item.reply_count}条回复`"
      left-arrow
      @click-left="navBarClickLeft"
    />
    <!-- 每条评论 -->
    <Reply :item="item"></Reply>
    <!-- 评论回复 -->
    <van-cell title="全部回复" size="large" class="comment-request" />
    <Commit :article="article" :lastComId="lastComId"></Commit>
    <!-- 没有更多了 -->
    <van-col span="24" class="nomore">没有更多了</van-col>
    <!-- 底部 -->
    <van-tabbar v-model="active">
      <van-button type="defalut" round @click="commitQuestPopup"
        >评论</van-button
      >
    </van-tabbar>
    <!-- 弹出层 -->
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
        placeholder="请输入留言"
        show-word-limit
        @input="inputPublishFn"
      />
      <span class="publish" v-if="isLength === false">发布</span>
      <span class="isLength" v-else @click="publishRequest">发布</span>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import Reply from './Reply.vue'
import Commit from './Commit.vue'
import { publishRequest } from '@/api/detail'
export default {
  components: { Reply, Commit },
  props: ['item', 'commCount', 'article', 'lastComId'],
  data () {
    return {
      isCommentShow: false,
      active: '',
      message: '',
      isLength: false,
      commitQuestPopupShow: false
    }
  },
  // 处理循环数据的时间格式化   几年前
  filters: {
    toTime (val) {
      return dayjs(val).fromNow()
    }
  },
  methods: {
    navBarClickLeft () {
      this.$router.go(-1)
    },
    commitQuestPopup () {
      this.isCommentShow = true
      console.log(11444)
    },
    inputPublishFn () {
      if (this.message.length !== 0) {
        this.isLength = true
        // console.log(this.message.length)
      } else {
        this.isLength = false
      }
    },
    // 发表评论的请求
    async publishRequest () {
      try {
        await publishRequest(this.item.com_id, this.message, this.item.aut_id)
        this.message = ''
        this.isLength = false
      } catch (error) {
        console.log(error.message)
        this.$toast.fail('发布失败')
      }
    }
    // requestClick () {
    //   this.publishRequest()
    // }
  }
}
</script>

<style lang="less" scoped>
.row-comment {
  margin: 20px 32px 0 32px;
  padding-bottom: 20px;
  position: relative;
}
.van-col--21 {
  text-align: left;
}
.textName {
  color: #406599;
  font-size: 0.34667rem;
}
.textNumber {
  font-size: 32px;
  position: relative;
  margin: 32px 0;
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
.btn1 {
  position: absolute;
  right: 20px;
  top: -2px;
  border: none;
}
.comment-request {
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;

  .van-cell__title {
    text-align: left;
  }
}
// 没有更多
.nomore {
  color: #969799;
  font-size: 0.37333rem;
  line-height: 1.33333rem;
  text-align: center;
}
.van-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  height: 80px;
  border: none;
  background-color: #fff;
}
.van-tabbar {
  background-color: #ff69b4;
}
//#6ba3d8;  h120px   298--88       background-color: #f5f7f9;      color: #6ba3d8;   #6ba3d8;
.van-field {
  width: 654px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}

.publish {
  position: absolute;
  right: 8px;
  top: 92px;
  color: #6ba3d8;
  font-size: 28px;
}
:deep(.van-cell__value) {
  background-color: #f5f7f9;
  width: 596px;
  height: 176px;
}
.isLength {
  color: #6ba3d8;
}
</style>
