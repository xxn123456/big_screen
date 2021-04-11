import request from '@/utils/request'

// 获取角色大屏列表
export function getRoleScreen() {
  return request({
    url: '/manage/bigScreen/getBigScreenList',
    method: 'get'
  })
}

