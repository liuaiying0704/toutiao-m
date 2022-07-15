<template>
  <div>
    <van-nav-bar title="登陆" @click-left="backToPrePage" class="navBar">
      <template #left><van-icon name="cross" /> </template>
    </van-nav-bar>
    <!-- 手机、验证码表单 -->
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 左侧图标 -->
        <template #label>
          <span class="iconfont toutiao-yanzhengma"></span>
        </template>
        <!-- 右侧按钮 发送验证码-->
        <template #right-icon>
          <van-count-down
            v-if="isShow"
            :time="5 * 1000"
            @finish="isShow = false"
          />
          <van-button
            class="code-btn"
            size="mini"
            round
            v-else
            @click="sendCode"
            native-type="button"
          >
            发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: false
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    // onSubmit (values) {
    //   console.log('submit', values)
    // }

    // 1、登陆按钮绑定事件，事件名修改为login
    async login () {
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间为0，则持续展示
      })
      try {
        const res = await login(this.mobile, this.code)
        //  存储token
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (err) {
        const status = err.response.status
        let message = '登陆错误，请刷新~'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(err.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登陆错误，请刷新~')
        //     break
        //   default:
        //     this.$toast.fail('登陆错误，请刷新~')
        //     break
        // }
      }
    },
    // 2、发送验证码
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证码
        await sendCode(this.mobile)
        // 点击按钮显示倒计时
        this.isShow = true
      } catch (err) {
        // 1、校验失败
        if (!err.response) {
          this.$toast.fail('手机格式不正确')
        } else {
          // 验证码导致的失败
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
          console.log(err.response.data.message)
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
