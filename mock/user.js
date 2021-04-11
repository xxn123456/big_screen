const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    },
    other: {
        token: 'other-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin',
        menu: [{
            path: '/example',
            component: 'layout/index',
            name: 'Example',
            meta: {
                title: 'Example',
                icon: 'example'
            },
            children: [{
                    path: 'create',
                    component: 'views/example/create',
                    name: '管理员界面',
                    meta: { title: '管理权限', icon: 'edit' }
                },
                {
                    path: 'edit',
                    component: 'views/example/edit',
                    name: '读者界面',
                    meta: { title: '会员权限', noCache: true, activeMenu: '/example/list' }
                },
                {
                    path: 'list',
                    component: 'views/example/list',
                    name: '其他权限',
                    meta: { title: '其他权限', icon: 'list' }
                }
            ]
        }]
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor',
        menu: [{
            path: '/example',
            component: 'layout/index',
            name: 'Example',
            meta: {
                title: 'Example',
                icon: 'example'
            },
            children: [{
                    path: 'create',
                    component: 'views/example/create',
                    name: '管理员界面',
                    meta: { title: '管理权限', icon: 'edit' }
                },
                {
                    path: 'edit',
                    component: 'views/example/edit',
                    name: '读者界面',
                    meta: { title: '会员权限', noCache: true, activeMenu: '/example/list' }
                }
            ]
        }, ]
    },
    'other-token': {
        roles: ['other'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'vistor',
        menu: [{
            path: '/example',
            component: 'layout/index',
            name: 'Example',
            meta: {
                title: 'Example',
                icon: 'example'
            },
            children: [

                {
                    path: 'list',
                    component: 'views/example/list',
                    name: '其他权限',
                    meta: { title: '其他权限', icon: 'list' }
                }
            ]
        }, ]
    },
}

export default [
    // user login
    {
        url: '/vue-element-admin/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 20000,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/vue-element-admin/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]