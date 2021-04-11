import request from '@/utils/request'



// 获取所有角色
export function getRoles(data) {
    return request({
        url: '/manage/pc/pcRole/getPcRoleListPage',
        method: 'post',
        data
    })
}

// 添加角色
export function addRoles(data) {
    return request({
        url: '/manage/pc/pcRole/insertPcRole',
        method: 'post',
        data
    })
}

// 获取单个角色信息
export function getRole(data) {
    return request({
        url: '/manage/pc/pcRole/getPcRoleById',
        method: 'post',
        data
    })
}
// 修改角色
export function updateRole(data) {
    return request({
        url: '/manage/pc/pcRole/updatePcRole',
        method: 'post',
        data
    })
}

// 删除角色
export function delRole(data) {
    return request({
        url: '/manage/pc/pcRole/deletePcRole',
        method: 'post',
        data
    })
}

// 编辑菜单

export function eidtRoleMenu(data) {
    return request({
        url: '/manage/pc/pcRole/distributionMenu',
        method: 'post',
        data
    })
}




// 获取选中菜单
export function getRoleMenu(data) {
    return request({
        url: '/manage/pc/pcMenu/getPcMenuListByRoleId',
        method: 'post',
        data
    })
}

// 获取角色指标

export function getRoleTarget(data) {
    return request({
        url: '/manage/pc/pcRole/getRoleIndicator',
        method: 'post',
        data
    })
}
// 保存角色当前指标
export function saveRoleTarget(data) {
    return request({
        url: '/manage/pc/pcRole/addRoleIndicatorRelation',
        method: 'post',
        data
    })
}







