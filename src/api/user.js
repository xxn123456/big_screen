import request from '@/utils/request'

//login/login.vue 执行逻辑
export function login(data) {
    return request({
        url: '/user/login',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}


//login/index.vue 执行逻辑方便调试
// export function login(data) {
//   return request({
//     url: '/dev-api1/vue-element-admin/user/login',
//     url: '/dev-api2/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }



export function getInfo() {
    return request({
        url: '/user/getUserInfo',
        //此处admin是代理
        method: 'get'
    })
}

// export function getInfo(token) {
//     return request({
//         url: '/vue-element-admin/user/info',
//         method: 'get',
//         params: {
//             token
//         }
//     })
// }


export function logout(data) {
    return request({
        url: '/manage/out/logout',
        //此处admin是代理
        method: 'post',
        //baseURL: 'https://some-domain.com/api/',配置基本url
        data
    })
}

// export function logout() {
//     return request({
//         url: '/vue-element-admin/user/logout',
//         method: 'post'
//     })
// }

// 获取所有用户信息

export function getUsers(data) {
    return request({
        url: '/manage/pc/user/getPcUserList',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

//新增用户

export function addUser(data) {
    return request({
        url: '/manage/pc/user/insertPcUser',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

// 获取所有角色


export function getAllRole() {
    return request({
        url: '/manage/pc/pcRole/getPcRoleList',
        //此处admin是代理
        method: 'get',

        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

// 获取用户当前拥有角色
export function getUserHasRole(data) {
    return request({
        url: '/manage/pc/user/getPcUserById',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

export function editUser(data) {
    return request({
        url: '/manage/pc/user/updatePcUser',
        //此处admin是代理
        method: 'post',
        data

        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

// 删除用户操作

export function delUser(data) {
    return request({
        url: '/manage/pc/user/deletePcUser',
        //此处admin是代理
        method: 'post',
        data

        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

// 查询用户菜单下面新发布的应用
export function queryUserMenuApply(data) {
    return request({
        url: '/manage/pc/user/getUserSubscription',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}


export function queryUserMenuApplyNum(data) {
    return request({
        url: '/manage/pc/user/getSubscriptionCount',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

// 保存用户相应模板
export function saveUserMenuApply(data) {
    return request({
        url: '/manage/pc/user/userSubscription',
        //此处admin是代理
        method: 'post',
        data
        //baseURL: 'https://some-domain.com/api/',配置基本url

    })
}

export function changeUserModeMenu(data) {
    return request({
        url: '/manage/pc/user/getSubscriptionPack',
        //此处admin是代理
        method: 'post',
        data
    })
}

//根据菜单id 查询菜单对应信息
export function queryMenuAbout(data) {
    return request({
        url: '/manage/pc/pcMenu/getPcMenuById',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 查询用户订阅应用(用户布局)

export function getUserLayout(data) {
    return request({
        url: '/manage/pc/user/getSubscriptionPacks',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 获取用户资料
export function getUserAbout(data) {
    return request({
        url: '/manage/pc/user/getPcUserById',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 修改用户资料

export function editUserAbout(data) {
    return request({
        url: '/manage/pc/user/changeUserInfo',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 校验密码
export function updataPassWord(data) {
    return request({
        url: '/manage/pc/user/editPassword',
        //此处admin是代理
        method: 'post',
        data
    })
}

// 创建用户大屏
export function userCreateScreen(data) {
    return request({
        url: '/manage/bigScreen/addBigScreen',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 获取用户大屏
export function getuserCreateScreen(data) {
    return request({
        url: '/manage/bigScreen/getBigScreenPage',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 更新用户大屏

export function updataUserScreen(data) {
    return request({
        url: '/manage/bigScreen/updateBigScreen',
        //此处admin是代理
        method: 'post',
        data
    })
}
// 删除用户大屏
export function delUserScreen(data) {
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













