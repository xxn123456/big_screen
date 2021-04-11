import request from '@/utils/request'

//获取指标归类
export function getTargetType(data) {
    return request({
        url: '/manage/indicatorType/getIndicatorTypePage',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//添加指标归类
export function addTargetType(data) {
    return request({
        url: '/manage/indicatorType/addIndicatorType',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 修改指标归类
export function editTargetType(data) {
    return request({
        url: '/manage/indicatorType/updateIndicatorType',
        //此处admin是代理
        method: 'post',
        data
    })
}
//删除指标归类
export function delTargetType(data) {
    return request({
        url: '/manage/indicatorType/deleteIndicatorType',
        //此处admin是代理
        method: 'post',
        data
    })
}