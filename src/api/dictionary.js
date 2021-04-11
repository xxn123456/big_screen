import request from '@/utils/request'

// //login/login.vue 执行逻辑
// export function getDictionarys(data) {
//     return request({
//         url: '/manage/pc/dimension/getPcDimensionListPage',
//         //此处admin是代理
//         method: 'post',
//         data
//     })
// }

// //添加维度
// export function addDictionarys(data) {
//     return request({
//         url: '/manage/pc/dimension/insertPcDimension',
//         //此处admin是代理
//         method: 'post',
//         data
//     })
// }
// // 修改维度
// export function editDictionary(data) {
//     return request({
//         url: '/manage/pc/dimension/updatePcDimension',
//         //此处admin是代理
//         method: 'post',
//         data
//     })
// }
// //删除维度

// export function delDictionary(data) {
//     return request({
//         url: '/manage/pc/dimension/deletePcDimension',
//         //此处admin是代理
//         method: 'post',
//         data
//     })
// }


//获取维度
export function getDictionarys(data) {
    return request({
        url: '/manage/dicDimension/getDicDimensionList',
        //此处admin是代理
        method: 'get',
        data
    })
}

//添加维度
export function addDictionarys(data) {
    return request({
        url: '/manage/dicDimension/addDicDimension',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 修改维度
export function editDictionary(data) {
    return request({
        url: '/manage/dicDimension/updateDicDimension',
        //此处admin是代理
        method: 'post',
        data
    })
}
//删除维度

export function delDictionary(data) {
    return request({
        url: '/manage/dicDimension/deleteDicDimension',
        //此处admin是代理
        method: 'post',
        data
    })
}