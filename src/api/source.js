import request from '@/utils/request'

//获取数据源

export function getSource(data) {
    return request({
        url: '/manage/datasource/getDatasourcePage',
        //此处admin是代理
        method: 'post',
        data
    })
}

//添加数据源
export function addSource(data) {
    return request({
        url: '/manage/datasource/addDatasource',
        //此处admin是代理
        method: 'post',
        data
    })
}
//修改数据源
export function editSource(data) {
    return request({
        url: '/manage/datasource/updateDatasource',
        //此处admin是代理
        method: 'post',
        data
    })
}
//删除数据源
export function delSource(data) {
    return request({
        url: '/manage/datasource/deleteDatasource',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 查询对应数据源

export function querySource() {
    return request({
        url: '/manage/datasource/getDatasourceList',
        //此处admin是代理
        method: 'get'
    })
}

export function queryDimension() {
    return request({
        url: '/manage/datasource/getDatasourceList',
        //此处admin是代理
        method: 'get'
    })
}


export function queryProvider(data) {
    return request({
        url: '/manage/pc/serviceProvider/getPcServiceProvider',
        //此处admin是代理
        method: 'get',
        params: { data }
    })
}
