import request from '@/utils/request'

// 登录接口
export function queryMysql(data) {
  return request({
    url: '/sql/queryMysql',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}


