<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" /> 搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多按钮 -->
      <span class="iconfont toutiao-gengduo" @click="showPopup"></span>
      <!-- 弹出层 -->
      <!-- <van-popup
        v-model="isShow"
        position="bottom"
        :style="{ height: '99%' }"
        closeable
      ></van-popup> -->
      <EditChannelPopup
        ref="popup"
        :channels="channels"
        @delChannels="delChannelsFn"
        @changeActive="changeActiveFn"
        @addMyChannel="addMyChannelFn"
      ></EditChannelPopup>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannels } from '@/api'
import ArticleList from './component/ArticleList.vue'
// 引入子组件EditChannelPopup
import EditChannelPopup from './component/EditChannelPopup.vue'
// api
import {
  getMyChannelsByLocal,
  setMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api/channel'
export default {
  name: 'channels',
  components: {
    ArticleList,
    EditChannelPopup
  },
  data () {
    return {
      channels: [],
      active: ''
      // isShow: false
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getMyChannels()
  },
  methods: {
    // A 获取我的频道的数据
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          // 1\离线状态
          // 如果你是离线状态
          // 1.1 如果本地储存有数据直接用本地储存的数据
          // 1.2 如果本地储存没有数据 发送请求获取默认频道数据  比如手动删除本地数据，默认是添加删除离线本地存储
          const channels = getMyChannelsByLocal()
          if (channels) {
            // 本地存储
            this.channels = channels
          } else {
            // 发送请求
            const res = await getMyChannels()
            // console.log(res)
            this.channels = res.data.data.channels
          }
        } else {
          // 2、登陆状态
          // 2.1发送请求获取
          const res = await getMyChannels()
          // console.log(res)
          this.channels = res.data.data.channels
        }
      } catch (err) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    // B 弹出层显示，v-model进行设置
    showPopup () {
      // this.isShow = true
      // 自组件传值isShow
      this.$refs.popup.isShow = true
    },
    // C 传参的active为index，更改频道
    changeActiveFn (active) {
      this.active = active
    },
    // D 删除数据  我的频道
    async delChannelsFn (id) {
      this.channels = this.channels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        // 离线-数据存储在本地存储中
        setMyChannelsByLocal(this.channels)
      } else {
        // 2、登陆状态
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },

    // E 添加频道
    async addMyChannelFn (myChannel) {
      this.channels.push(myChannel)
      if (!this.isLogin) {
        // 1、离线-数据存储在本地存储中
        setMyChannelsByLocal(this.channels)
      } else {
        // 2、登陆状态
        try {
          await addMyChannel(myChannel.id, this.channels.length)
        } catch (error) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      this.$toast.success('添加用户频道成功')
    }
    // F 数据持久化，离线、登陆
    // 离线-数据存储在本地存储中，取数据在本地存储，本地没有数据，发送请求获取默认的数据
    // 登陆-数据发送接口
    // channel.js
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

// tabs 选项卡
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    // background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
/* // 头部固定的样式 */
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
