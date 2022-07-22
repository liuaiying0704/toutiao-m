import request from '@/utils/request'
/**
 *获取新闻详情
 * @param {String|Number} articleId 文章id
 * @returns Promise
 */
export const articleDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
