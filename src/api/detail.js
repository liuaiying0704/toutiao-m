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

// 评论
// source文章id
export const allComments = (source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source,
      offset
    }
  })
}
// 评论
// source文章id
export const allRequests = (source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'c',
      source,
      offset
    }
  })
}

// 关注用户
export const attentionUser = (userid) => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target: userid
    }
  })
}
// 取消关注
export const deleteAttentionUser = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 收藏  collected like
export const collected = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const deleteCollected = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 点赞
export const likings = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 取消点赞
export const deleteLikings = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
// 发表评论
export const publishComment = (target, content) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content
    }
  })
}
// 对评论回复
export const publishRequest = (target, content, requestId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content,
      art_id: requestId
    }
  })
}
