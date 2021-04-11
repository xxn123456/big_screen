import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}

// koa 图片上传
export function uploadImg(data) {
  return request({
    url: 'http://localhost:3000/upload', // 假地址 自行替换
    method: 'post',
    headers: {
            'Content-Type': 'multipart/form-data'
          },
    data
  })
}

// koa 创建博客文章

export function addArticle(data) {
  return request({
    url: 'http://localhost:3000/article/creatArticle', // 假地址 自行替换
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
// koa 获取 之前发表的文章

export function getArticle(data) {
  return request({
    url: 'http://localhost:3000/article/getArticle', // 假地址 自行替换
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

