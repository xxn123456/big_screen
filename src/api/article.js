import request from '@/utils/request'

// 获取所有目录
export function getCatal(data) {
  return request({
    url: '/manage/usingDocument/getDocDirectoryListById',
    method: 'post',
    data
  })
}
// 添加目录

export function addCatal(data) {
  return request({
    url: '/manage/usingDocument/addDocDirectory',
    method: 'post',
    data
  })
}

// 更新目录

export function updataCatal(data) {
  return request({
    url: '/manage/usingDocument/updateDocDirectory',
    method: 'post',
    data
  })
}

// 删除目录
export function delCatal(data) {
  return request({
    url: '/manage/usingDocument/deleteDocDirectory',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}




// 添加文章
export function addArticle(data) {
  return request({
    url: '/manage/usingDocument/addUsingDocument',
    method: 'post',
    data
  })
}

// 更新文章
export function updataArticle(data) {
  return request({
    url: '/manage/usingDocument/updateUsingDocument',
    method: 'post',
    data
  })
}

// 删除文章

export function delArticle(data) {
  return request({
    url: '/manage/usingDocument/deleteUsingDocument',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取文章详情
export function getArticleDetail(data) {
  return request({
    url: '/manage/usingDocument/getUsingDocumentById',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    data
  })
}


// 上传图片

export function uploadImg(data) {
  return request({
      url: '/manage/pc/file/fileUpload ',
      //此处admin是代理
      method: 'post',
      headers: {
          'Content-Type':'multipart/form-data'
      },
      data
      
  })
}