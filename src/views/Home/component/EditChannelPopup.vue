<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '99%' }"
    closeable
  >
    <div class="popupMain">
      <!-- 1、我的频道 -->
      <div class="my-channel">
        <!-- 标题 -->
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 内容 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in channels"
            :key="item.id"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannels(item, index)"
            ><template #icon>
              <van-icon
                name="cross"
                class="iconcha"
                v-show="isEdit && item.name !== '推荐'"
            /></template>
          </van-grid-item>
        </van-grid>
      </div>
      <!--2、 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>

        <van-grid gutter="9px" :border="false">
          <van-grid-item
            :text="item.name"
            :border="false"
            gutter="10px"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
// api
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    channels: {
      type: Array
    }
  },
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    // 获取所有频道列表,并且处理数据data
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      //   console.log(this.allChannels)
    },
    // 点击我的频道的每一项，，子传父删除数据
    onClickMyChannels (channels, index) {
      // 1\删除数据传值
      if (this.isEdit && channels.name !== '推荐') {
        this.$emit('delChannels', channels.id)
      }
      // 2\编辑状态下，切换传值
      if (!this.isEdit) {
        // 切换
        this.isShow = false
        this.$emit('changeActive', index)
      }
    },
    // 3、 添加频道
    addMyChannel (myChannel) {
      this.$emit('addMyChannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        // const res = this.channels.find((i) => i.id === item.id)
        // if (res) {
        //   return false
        // } else {
        //   return true
        // }
        // return !res

        return !this.channels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
}
.edit-btn {
  color: red;
  padding: 0 30px;
  height: 48px;
  border: 0.02667rem solid red;
}
.iconcha {
  font-size: 12px;
}
// 我的频道

.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;
    background-color: #eee;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
      }
    }
  }
}

// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    background-color: #eee;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
  :deep(.van-icon-plus:before) {
    font-size: 0.3rem;
  }
}
</style>
