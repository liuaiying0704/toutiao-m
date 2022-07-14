<template>
  <div>
    <van-nav-bar title="登陆" @click-left="backToPrePage" class="navBar">
      <template #left><van-icon name="cross" /> </template>
    </van-nav-bar>
    <!-- 手机、验证码表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="iconfont toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        type="password"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <!-- 左侧图标 -->
        <template #label>
          <span class="iconfont toutiao-yanzhengma"></span>
        </template>
        <!-- 右侧按钮 发送验证码-->
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// form表单的button点击触发submit，提交表单，需要绑定name，用于标识
// import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    // onSubmit (values) {
    //   console.log('submit', values)
    // }
    // 给登陆按钮绑定事件，事件名修改为login
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间为0，则持续展示
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
// 自定义导航栏样式
.navBar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-cell__title) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .iconfont {
    font-size: 0.49333rem;
  }
  .code-btn {
    color: #666;
    background-color: #eee;
    padding: 0 10px;
  }
}
</style>
