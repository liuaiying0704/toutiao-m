import request from '@/utils/request'
import storage from '@/utils/storage'
// 我的频道
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 推荐频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 在本地存储中，存取我的频道数据
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelsByLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)

// 删除频道
/**
 *
 * @param {Sring|Number} target 删除用户频道id
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {Number} id 频道的id
 * @param {Number} seq 添加的频道的索引下标
 * @returns Promise
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
