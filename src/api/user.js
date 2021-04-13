import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/user/login',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取用户信息
export function getInfo(data) {
  return request({
    url: '/user/getUserInfo',
    // 此处admin是代理
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data
  })
}


// 查找所有用户
export function findAll(data) {
  return request({
    url: '/user/findAll',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 注册用户

export function create(data) {
  return request({
    url: '/user/regist',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 删除用户
export function del(data) {
  return request({
    url: '/user/del',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}


// 查找所有角色
export function findAllRole(data) {
  return request({
    url: '/role/findAllRole',
    // 此处admin是代理
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data
  })
}

