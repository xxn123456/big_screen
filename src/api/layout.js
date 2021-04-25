import request from '@/utils/request'

// 查询所有组件类别

export function findAllComponentType(data) {
  return request({
    url: '/componentType/findAllComponentType', // 假地址 自行替换
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data
  })
}

// 根据组件类型查找组件

export function findComponentByType(data) {
  return request({
    url: '/component/findComponentByType',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function update(data) {
  return request({
    url: '/screen/update',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}


export function findScreen(data) {
  return request({
    url: 'screen/findOne',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}




