import request from '@/utils/request'

//获取当前菜单列表
export function getMenu() {
    return request({
        url: '/manage/pc/pcMenu/getPcMenuList',
        //此处admin是代理
        method: 'get',

    })
}

// 添加菜单
export function addMenu(data) {
    return request({
        url: '/manage/pc/pcMenu/insertPcMenu',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 修改菜单
export function editMenu(data) {
    return request({
        url: '/manage/pc/pcMenu/updatePcMenu',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 获取应用中的菜单
export function getApplyMenu() {
    return request({
        url: '/manage/pc/pcMenu/getStatisticalMenu',
        //此处admin是代理
        method: 'get'
    })
}




// 删除菜单

export function removeMenu(data) {
    return request({
        url: '/manage/pc/pcMenu/deletePcMenu',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 获取顶级目录

export function getTopMenu(data) {
    return request({
        url: '/manage/pc/pcMenu/getPcMenuById',
        //此处admin是代理
        method: 'post',
        data
    })
}

//### 服务厂商模块

export function getFriends(data) {
    return request({
        url: '/manage/pc/serviceProvider/getPcServiceProviderListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}

//添加服务厂商
export function addFriend(data) {
    return request({
        url: '/manage/pc/serviceProvider/insertPcServiceProvider',
        //此处admin是代理
        method: 'post',
        data
    })
}
//编辑服务厂商
export function editFriend(data) {
    return request({
        url: '/manage/pc/serviceProvider/updatePcServiceProvider',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 删除服务厂商
export function delFriend(data) {
    return request({
        url: '/manage/pc/serviceProvider/deletePcServiceProvider',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 根据服务厂商providerId获取对应api

export function getApiByFriend(data) {
    return request({
        url: '/manage/pc/apis/getPcApisListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
export function getApiByFriendChange(data) {
    return request({
        url: '/manage/pc/apis/getPcApisListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 查询api 对应的服务厂商信息
export function getFriendMsgByApi(data) {
    return request({
        url: '/manage/pc/serviceProvider/getPcServiceProviderById',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 连接测试api
export function testApi(data) {
    return request({
        url: '/manage/pc/apis/connectionTest',
        //此处admin是代理
        method: 'post',
        data
    })
}


// 添加api
export function addApi(data) {
    return request({
        url: '/manage/pc/apis/insertPcApis',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 编辑api
export function editApi(data) {
    return request({
        url: '/manage/pc/apis/updatePcApis',
        //此处admin是代理
        method: 'post',
        data
    })
}
//删除api
export function delApi(data) {
    return request({
        url: '/manage/pc/apis/deletePcApis',
        //此处admin是代理
        method: 'post',
        data
    })
}

//获取所有厂商
export function getAllFriend() {
    return request({
        url: '/manage/pc/serviceProvider/getPcServiceProvider',
        //此处admin是代理
        method: 'get'
    })
}

//查看api属于哪一个服务厂商
export function queryFriendByApi(data) {
    return request({
        url: '/manage/pc/apis/getPcApisById',
        //此处admin是代理
        method: 'post',
        data
    })
}

//# 应用模块
// 获取所有应用
export function getApplys(data) {
    return request({
        url: '/manage/pc/pack/getPcPackListPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
//新增应用
export function addApply(data) {
    return request({
        url: '/manage/pc/pack/insertPcPack',
        //此处admin是代理
        method: 'post',
       
        data
    })
}
//修改应用
export function editApply(data) {
    return request({
        url: '/manage/pc/pack/updatePcPack',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 删除
export function delApply(data) {
    return request({
        url: '/manage/pc/pack/deletePcPack',
        //此处admin是代理
        method: 'post',
        data
    })
}

//获取应用组件信息
export function queryApplyCompent() {
    return request({
        url: '/manage/pc/pack/getCompentTypeAddPack',
        //此处admin是代理
        method: 'get'
    })
}
// 获取应用组件通过应用id
export function queryApplyCompentById(data) {
    return request({
        url: '/manage/pc/pack/getCompentTypeUpdatePack',
        //此处admin是代理
        method: 'post',
        data
    })
}

//获取应用弹窗 获取指标项
export function queryApplyTarget(data) {
    return request({
        url: '/manage/indicator/getIndicatorListByName',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
// 获取组件的指标信息通过应用id

export function queryApplyTargetById(data) {
    return request({
        url: '/manage/pc/pack/getMenuIndexUpdatePack',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 通过应用生成一张图表

export function applyProdChart(data) {
    return request({
        url: '/manage/pc/pack/generateCharts',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 根据应用id 查询应用信息

export function queryApplyChart(data) {
    return request({
        url: '/manage/pc/pack/getPcPackById',
        //此处admin是代理
        method: 'post',
        data
    })
}


// 获取大屏列表
export function getScreen(data) {
    return request({
        url: '/manage/bigScreen/getBigScreenPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 创建大屏

export function addScreen(data) {
    return request({
        url: '/manage/bigScreen/addBigScreen',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 修改大屏

export function updataScreen(data) {
    return request({
        url: '/manage/bigScreen/updateBigScreen',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 删除大屏
export function delScreen(data) {
    return request({
        url: '/manage/bigScreen/deleteBigScreen',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
// 获取大屏信息

export function getScreenDetail(data) {
    return request({
        url: '/manage/bigScreen/getBigScreenById',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}









