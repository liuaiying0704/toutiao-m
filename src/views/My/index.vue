<template>
  <div class="my">
    <!-- 1、头部--用户信息 -->
    <header>
      <!-- 登陆的盒子 isLogin为【!!this.$store.state.user.token = true】的情形，-->
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!--第二个盒子 展示用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 图片 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <!-- 右侧 -->
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button size="mini" round class="code-btn"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>

        <!-- 第三个盒子 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录的盒子 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/mobile.png" alt="" />
          <span>登陆 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 2、主体 -->
    <main>
      <!-- 历史搜索 -->
      <div>
        <van-grid column-num="2" class="grid" clickable :border="false">
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="iconfont toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="iconfont toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知  小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 3、底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="loginOut"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      // ！！两个感叹号，，转为布尔值。
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    loginOut () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLogin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          console.log(data)
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登陆')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// 视口背景色
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px); //100vh  等于视口高度375px
}
// 背景图样式
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/banner.png') no-repeat 0 0 / cover;
}

// 用户信息
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  //粉丝
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.link {
  margin: 20px 0;
}
// 未登录的盒子
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
      width: 1.76rem;
      height: 1.76rem;
    }
    span {
      font-size: 0.37333rem;
      color: #fff;
      margin-top: 0.13333rem;
    }
  }
}
</style>
