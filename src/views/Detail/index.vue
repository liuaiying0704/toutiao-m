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
    <div class="title">11</div>
    <!-- main -->
    <div class="main">
      <van-row>
        <van-col span="4"
          ><van-image
            width="35px"
            height="35px"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        /></van-col>
        <van-col span="10" class="text"
          ><div>11</div>
          <div>22</div></van-col
        >
        <van-col span="10">
          <van-button type="info">
            <van-icon name="plus" size="small" />关注
          </van-button></van-col
        >
      </van-row>
    </div>

    <!-- content -->
    <div class="content">4</div>
    <!-- 正文结束 -24 + 16  16--->
    <div class="separator">
      <span class="fen"></span>
      正文结束
      <span class="fen"></span>
    </div>
    <!-- 没有更多 -->
    <div class="nomore">没有更多</div>
  </div>
</template>
<script>
import { articleDetail } from '@/api/detail'
export default {
  data () {
    return {
      articleDetailItem: {}
    }
  },
  created () {
    this.articleDetail()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async articleDetail () {
      const res = await articleDetail(this.$router.history.current.query.id)
      this.articleDetailItem = res.data.data
      console.log(res)
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
    height: 156px;
    background-color: pink;
    padding: 50px 32px;
    box-sizing: border-box;
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
    background-color: yellow;
    padding: 55px 32px;
  }
  // 正文结束
  .separator {
    width: 750px;
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
  .nomore {
    height: 100px;
    color: #969799;
    text-align: center;
    font-size: 28px;
  }
}
</style>
