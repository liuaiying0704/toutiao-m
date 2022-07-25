<template>
  <div>
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像  hidden  @click="$refs.file.click()    accept=".png,.jpg"-->
    <input type="file" ref="file" @change="onFileChange" hidden />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="40"
        height="40"
        round
        :src="getUser.photo"
        fit="cover"
      />
    </van-cell>
    <!-- 头像弹出层 -->
    <van-popup
      v-model="imageShow"
      style="height: 100%"
      position="bottom"
      @close="imageShow = false"
    >
      <UpdatePhoto
        :userImage="userImage"
        :imageShow.sync="imageShow"
        :updatePhoto.sync="getUser.photo"
      ></UpdatePhoto>
    </van-popup>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      @click="showNickName = true"
      :value="getUser.name"
    />
    <van-popup
      v-model="showNickName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight" />

      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
    /></van-popup>
    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="getUser.gender === 1 ? '女' : '男'"
      is-link
      @click="showSexPicker = true"
    />
    <van-popup v-model="showSexPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="Sexcolumns"
        @cancel="showSexPicker = false"
        @confirm="onSexConfirm"
      />
    </van-popup>
    <!--生日 -->
    <van-cell
      title="生日"
      :value="getUser.birthday"
      is-link
      @click="showBirthdayPicker = true"
    />

    <van-popup v-model="showBirthdayPicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthdayPicker = false"
        @confirm="onBirthdayConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import UpdatePhoto from './component/UpdatePhoto.vue'
import { getUserMessage, patchUserMessage } from '@/api/user'
export default {
  components: {
    UpdatePhoto
  },
  data () {
    return {
      // 获取用户信息
      getUser: '',

      // 性别
      showSexPicker: false,
      Sexcolumns: ['男', '女'],

      // 生日
      showBirthdayPicker: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 12, 30),
      currentDate: new Date(),
      imageShow: false,
      photo: '',

      // 昵称
      showNickName: false,
      message: '',
      userImage: ''
    }
  },
  created () {
    // 获取用户资料
    this.getUserMessage()
  },
  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {})
  },
  methods: {
    // 获取用户资料
    async getUserMessage () {
      const res = await getUserMessage()
      this.getUser = res.data.data
      // console.log(this.getUser)
    },
    // 图片上传
    // 提交头像的修改
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blod数据
      this.userImage = window.URL.createObjectURL(file)
      console.log(this.userImage)
      //   this.userImage
      // 展示预览图片的弹出层
      this.imageShow = true
      // 同一张图片，change事件不会触发
      this.$refs.file.value = ''
    },

    // 昵称取消，保存
    //  patchUserMessage(name, gender, birthday, real, intro)
    async onClickLeft () {
      this.showNickName = false
    },
    onClickRight () {
      this.showNickName = false
      this.getUser.name = this.message
      const res = patchUserMessage(this.getUser.name, null, null, null, null)
      console.log(res)
    },
    // 性别
    onSexConfirm (value, index) {
      this.showSexPicker = false
      this.getUser.gender = index
      const res = patchUserMessage(null, this.getUser.gender, null, null, null)
      console.log(res)
    },
    // 生日
    onBirthdayConfirm (value) {
      this.showBirthdayPicker = false
      this.getUser.birthday = dayjs(value).format('YYYY-MM-DD')
      console.log(this.getUser.birthday)
      patchUserMessage(null, null, this.getUser.birthday, null, null)
    }
  }
}
</script>

<style lang="less" scoped>
// 头部
.page-nav-bar {
  background: #1989fa;
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
</style>
