import request from '@/utils/request'
// import store from '@/store/index'
/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
// 用户认证（登录注册）
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 请求用户信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/** 编辑资料
 * 获取默认值渲染页面
 * @returns Promise
 */
export const getUserMessage = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/**
 *编辑用户资料
 * @param {*} name 昵称
 * @param {*} gender 性别，0-男，1-女
 * @param {*} birthday 生日，格式'2018-12-20'
 * @param {*} real 真实姓名
 * @param {*} intro 个人介绍
 * @returns Promise
 */
export const patchUserMessage = (name, gender, birthday, real, intro) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data: {
      name,
      gender,
      birthday,
      real_name: real,
      intro
    }
  })
}
// 上传 头像图片
export const sendEditUserPhoto = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'patch',
    data: file
  })
}
