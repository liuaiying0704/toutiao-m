<template>
  <!-- 每条评论 -->
  <van-row class="row-comment" type="flex" justify="left">
    <van-col span="3">
      <van-image round width="35px" height="35px" :src="item.aut_photo" />
    </van-col>
    <!-- 父评论 -->
    <van-col span="21">
      <div class="textName">
        <span>{{ item.aut_name }}</span>
        <button class="request-button btn1">
          <van-icon name="good-job-o" /> 赞
          {{ item.like_count }}
        </button>
      </div>
      <div class="textNumber">{{ item.content }}</div>
      <div class="textTime">
        {{ item.pubdate | toTime }}
        <button type="default" class="request-button" @click="show = true">
          回复 {{ item.reply_count }}
        </button>
      </div>
    </van-col>
  </van-row>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: ['item', 'commCount'],
  data () {
    return {
      show: false,
      active: ''
    }
  },
  // 处理循环数据的时间格式化   几年前
  filters: {
    toTime (val) {
      return dayjs(val).fromNow()
    }
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
</style>
