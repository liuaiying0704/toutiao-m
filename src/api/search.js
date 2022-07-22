import request from '@/utils/request'
/**
 * 获取联想建议
 * @param {*} q
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
/**
 *  获取结果
 * @param {Object} params 搜索条件{}
 * @returns Promise
 */
export const getSearchResults = (page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      q
    }
  })
}
