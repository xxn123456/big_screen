import request from '@/utils/request'

// 储存布局信息
export function saveLayout(data) {
  return request({
    url: '/manage/bigScreen/saveBigScreenLayout', // 假地址 自行替换
    method: 'post',
    data
  })
}

// 获取大屏布局详情

export function getLayout(data) {
    return request({
      url: '/manage/bigScreen/getBigScreenById', // 假地址 自行替换
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }


