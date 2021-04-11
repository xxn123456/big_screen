import request from '@/utils/request'

// 获取组件归类
export function getApplyType(data) {
    return request({
        url: '/manage/pc/compentType/getPcCompentTypeList',
        //此处admin是代理
        method: 'get',
        data
    })
}
// 获取组件
export function getApplys(data) {
    return request({
        url: '/manage/user/login',
        //此处admin是代理
        method: 'post',
        data
    })
}