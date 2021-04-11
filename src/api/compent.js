import request from '@/utils/request'

//获取组件分类
export function getCompentTypes(data) {
    return request({
        url: '/manage/pc/compentType/getPcCompentTypeListPage',
        //此处admin是代理
        method: 'post',
        data

    })
}
//添加组件分类
export function addCompentTypes(data) {
    return request({
        url: '/manage/pc/compentType/insertPcCompentType',
        //此处admin是代理
        method: 'post',
        data

    })
}
// 编辑组件分类
export function editCompentTypes(data) {
    return request({
        url: '/manage/pc/compentType/updatePcCompentType',
        //此处admin是代理
        method: 'post',
        data

    })
}
// 删除组件分类
export function delCompentTypes(data) {
    return request({
        url: '/manage/pc/compentType/deletePcCompentType',
        //此处admin是代理
        method: 'post',
        data

    })
}

// 添加组件
export function addCompent(data) {
    return request({
        url: '/manage/pc/compent/insertPcCompent',
        //此处admin是代理
        method: 'post',
        data

    })
}
// 修改组件
export function editCompent(data) {
    return request({
        url: '/manage/pc/compent/updatePcCompent',
        //此处admin是代理
        method: 'post',
        data
        
    })
}
// 删除组件
export function delCompent(data) {
    return request({
        url: '/manage/pc/compent/deletePcCompent',
        //此处admin是代理
        method: 'post',
        data
        
    })
}
// 组件图片上传
export function uploadCompentImg(data) {
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
// 获取所有组件分类
export function queryAllCompentType() {
    return request({
        url: '/manage/pc/compentType/getPcCompentTypeList',
        //此处admin是代理
        method: 'get'
        
    })
}

// 根据组件分类查组件
export function queryCompentByType(data) {
    return request({
        url: '/manage/pc/compent/getPcCompentList',
        //此处admin是代理
        method: 'post',
        data

    })
}


// 根据组件值查询对应组件分类


export function queryAllCompentTypeById(data) {
    return request({
        url: '/manage/pc/compent/getPcCompentById',
        //此处admin是代理
        method: 'post',
        data
        
    })
}