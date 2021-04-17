import request from '@/utils/request'
// 搜索分页
export function findAll(data) {
  return request({
    url: '/component/findAll',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 查找文章详情
export function findOne(data) {
  return request({
    url: '/component/findOne',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 创建文章类别
export function create(data) {
    return request({
      url: '/component/create',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
// 修改文章类别
export function update(data) {
    return request({
      url: '/component/update',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

// 删除文章类别

export function del(data) {
    return request({
      url: '/component/del',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

  // 批量删除文章类别

export function batchDel(data) {
  return request({
    url: '/component/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function findcomponentAndType(data) {
  return request({
    url: '/component/findcomponentAndType',
    // 此处admin是代理
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data
  })
}






