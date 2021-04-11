import request from '@/utils/request'

//新指标项管理

export function getTargets(data) {
    return request({
        url: '/manage/pc/indexType/getPcIndexTypeListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}

//新增指标项
export function addTargets(data) {
    return request({
        url: '/manage/pc/indexType/insertPcIndexType',
        //此处admin是代理
        method: 'post',
        data
    })
}
//修改指标项
export function editTargetType(data) {
    return request({
        url: '/manage/pc/indexType/updatePcIndexType',
        //此处admin是代理
        method: 'post',
        data
    })
}
//删除指标项
export function delTargetType(data) {
    return request({
        url: '/manage/pc/indexType/deletePcIndexType',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 根据指标项ip 查询 当前维度
export function getDimensionById(data) {
    return request({
        url: 'manage/indicator/getDimensionById',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 获取指标分类

export function getTargetType(get) {
    return request({
        url: '/manage/indicatorType/getIndicatorTypeList',
        //此处admin是代理
        method: 'get'
    })
}


//获取指标项
export function getTargetItem(data) {
    return request({
        url: '/manage/pc/indexItem/getPcIndexItemListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 根据维度id 查询指标项

//api 更新点

export function getTargetItemByDid(data) {
    return request({
        url: '/manage/pc/indexItem/getPcIndexItemListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 获取所有维度
export function queryDimension() {
    return request({
        url: '/manage/pc/dimension/getPcDimensionList',
        //此处admin是代理
        method: 'get'
    })
}
//添加指标项目
export function addTargetItem(data) {
    return request({
        url: '/manage/pc/indexItem/insertPcIndexItem',
        //此处admin是代理
        method: 'post',
        data
    })
}
//修改指标项
export function editTargetItem(data) {
    return request({
        url: '/manage/pc/serviceProvider/updatePcServiceProvider',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 查询指标项目对应维度同过指标项id

export function queryDimensionByTarget(data) {
    return request({
        url: '/manage/pc/indexItem/getPcIndexItemById',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 删除指标项
export function delTargetItem(data) {
    return request({
        url: '/manage/pc/indexItem/deletePcIndexItem',
        //此处admin是代理
        method: 'post',
        data
    })
}

//指标管理
//获取所有指标项(新)


export function getTarget(data) {
    return request({
        url: '/manage/indicator/getIndicatorPage',
        //此处admin是代理
        method: 'post',
        data
    })
}

//增加指标项(新)
export function addTarget(data) {
    return request({
        url: '/manage/indicator/addIndicator',
        //此处admin是代理
        method: 'post',
        data
    })
}
//修改指标项(新)

export function editTarget(data) {
    return request({
        url: '/manage/indicator/updateIndicator',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 删除指标项(新)

export function delTarget(data) {
    return request({
        url: '/manage/indicator/deleteIndicator',
        //此处admin是代理
        method: 'post',
        data
    })
}

//  变更指标状态
export function changeTargetState(data) {
    return request({
        url: '/manage/indicator/changeIndicatorStatus',
        //此处admin是代理
        method: 'post',
        data
    })
}


//查询对应指标项

export function queryTargetByItem(data) {
    return request({
        url: '/manage/pc/index/getDimensionIndexItem',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 查询服务厂商
export function queryFriendByTarget(data) {
    return request({
        url: '/manage/pc/index/getProviderApis',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 根据用户id 查询拥有的指标
export function queryTargetByUser(data) {
    return request({
        url: '/manage/indicator/getIndicatorListByUserId',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
//根据指标项id 查询对应指标图表数据

export function queryChartOptionByTarget(data) {
    return request({
        url: '/manage/indicator/getIndicatorDataById',
        //此处admin是代理
        method: 'post',
        data
    })
}




