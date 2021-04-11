import request from '@/utils/request'

// 上传图片
export function upload(data) {
    return request({
        url: '/manage/base64Upload',
        //此处admin是代理
        method: 'post',
        data
    })
}