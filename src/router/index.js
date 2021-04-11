import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: () => import('@/layout/index.vue'),
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
        import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
      import('@/views/login/login.vue'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
      import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
      import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/board',
  component: Layout,
  redirect: '/board/one',
  meta: {
    title: '模板',
    icon: 'dashboard'
  },
  hidden: true,
  children: [{
    path: 'one',
    component: () =>
        import('@/views/board/boardOne.vue'),
    name: '模板一',
    meta: {
      title: '模板一',
      icon: 'dashboard'
    }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: '首页',
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
      affix: true
    }
  }]
},

// 界面设置
{
  path: '/bea',
  component: () =>
      import('@/views/users/packageBoard.vue'),
  name: '设计界面',

  meta: {
    title: '设计界面',
    icon: 'el-icon-s-platform'
  }
},
// 大屏遥控
{
  path: '/soc',
  component: () =>
      import('@/views/connact/index.vue'),
  name: '大屏遥控',
  hidden: true,
  meta: {
    title: '大屏遥控',
    icon: 'el-icon-s-platform'
  }
},

// 用户使用手册

{
  path: '/change',
  component: Layout,
  hidden: true,
  children: [{
    path: 'info',
    component: () =>
          import('@/views/dashboard/editor/changeInfo.vue'),
    name: '修改密码',
    meta: {
      title: '修改密码',
      icon: 'el-icon-edit-outline'
    }
  },
  {
    path: 'pwd',
    component: () =>
          import('@/views/dashboard/editor/changepwd.vue'),
    name: '修改密码',
    meta: {
      title: '修改密码',
      icon: 'el-icon-edit-outline'
    }
  }
  ]
},
{
  path: '/test',
  component: Layout,
  hidden: true,
  children: [{
    path: '',
    component: () =>
        import('@/views/test/test.vue'),
    name: '测试界面',
    meta: {
      title: '测试界面',
      icon: 'el-icon-s-home'
    }
  }]
},
{
  path: '/planLayout',
  component: () =>
        import('@/views/users/createLayout.vue'),
  hidden: true,
  name: '界面设计',
  meta: {
    title: '界面设计',
    icon: 'el-icon-s-home'
  }
},
{
  path: '/screen',
  component: () =>
    import('@/views/test/screen.vue'),
  hidden: true,
  meta: {
    title: '测试大屏',
    icon: 'el-icon-s-home'
  }
},
{
  path: '/packBoard',
  component: () =>
      import('@/views/users/packageBoard.vue'),
  name: '订阅',
  hidden: true,
  meta: {
    title: '订阅',
    icon: 'el-icon-s-platform'
  }
}
  // {
  //   path: '/doc',
  //   component: Layout,
  //   meta: {
  //     title: '使用文档',
  //     icon: 'el-icon-s-order',
  //   },
  //   children:[
  //     {
  //       path: 'user',
  //       component: () =>
  //         import('@/views/document/user/ransitionPage.vue'),
  //       name: '用户使用文档',
  //       meta: {
  //         title: '用户使用文档',
  //         icon: 'el-icon-s-order'
  //       }
  //     },
  //     {
  //       path: 'admin',
  //       component: () =>
  //         import('@/views/document/admin/ransitionPage.vue'),
  //       name: '管理员使用文档',
  //       meta: {
  //         title: '管理员使用文档',
  //         icon: 'el-icon-s-order'
  //       }
  //     },
  //   ]

  // }

  // 统计分析模块
  // {
  //     path: '/asy',
  //     component: Layout,
  //     meta: { title: '统计分析', icon: 'dashboard' },
  //     children: [
  //         {
  //             path: 'base',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '基础医疗服务',
  //             meta: { title: '基础医疗服务', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'bulic',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '公共卫生服务',
  //             meta: { title: '公共卫生服务', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'pet',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '分级诊断服务',
  //             meta: { title: '分级诊断服务', icon: 'dashboard', }
  //         },   {
  //             path: 'compose',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '综合管理服务',
  //             meta: { title: '综合管理服务', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'self',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '居民自助服务',
  //             meta: { title: '居民自助服务', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'all',
  //             component: () =>
  //                 import ('@/views/asy/base.vue'),
  //             name: '统计分析服务',
  //             meta: { title: '统计分析服务', icon: 'dashboard', }
  //         }
  //     ]
  // },

  // 权限路由模块
  // {
  //     path: '/user',
  //     component: Layout,
  //     redirect: '/user/index',
  //     meta: { title: '权限管理', icon: 'dashboard' },
  //     children: [{
  //             path: 'roleAdmin',
  //             component: () =>
  //                 import ('@/views/users/roleAdmin.vue'),
  //             name: '角色管理',
  //             meta: { title: '角色管理', icon: 'dashboard' }
  //         },
  //         {
  //             path: 'index',
  //             component: () =>
  //                 import ('@/views/users/userAdmin.vue'),
  //             name: '用户管理',
  //             meta: { title: '用户管理', icon: 'dashboard', }
  //         }
  //     ]
  // },

  // 集成管理
  // {
  //     path: '/compose',
  //     component: Layout,
  //     redirect: '/compose/index',
  //     meta: { title: '集成管理', icon: 'dashboard' },
  //     children: [{
  //             path: 'index',
  //             component: () =>
  //                 import ('@/views/compose/menu.vue'),
  //             name: '菜单管理',
  //             meta: { title: '菜单管理', icon: 'dashboard' }
  //         },
  //         {
  //             path: 'userLayout',
  //             component: () =>
  //                 import ('@/views/compose/userLayout.vue'),
  //             name: '模板管理',
  //             meta: { title: '模板管理', icon: 'dashboard' }
  //         },
  //         {
  //             path: 'apply',
  //             component: () =>
  //                 import ('@/views/compose/apply.vue'),
  //             name: '应用接入管理',
  //             meta: { title: '应用接入管理', icon: 'dashboard' }
  //         },
  //         {
  //             path: 'data',
  //             component: () =>
  //                 import ('@/views/compose/firend.vue'),
  //             name: '服务商管理',
  //             meta: { title: '服务商管理', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'dataApi',
  //             component: () =>
  //                 import ('@/views/compose/api.vue'),
  //             name: '接口管理',
  //             hidden: true,
  //             meta: { title: '接口管理', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'test',
  //             component: () =>
  //                 import ('@/views/compose/applyTest.vue'),
  //             name: '图表预览',
  //             hidden: true,
  //             meta: { title: '图表预览', icon: 'dashboard', }
  //         }

  //     ]
  // },

  // 应用配置模块
  // {
  //     path: '/apply',
  //     component: Layout,
  //     redirect: '/apply/index',
  //     meta: { title: '服务商应用', icon: 'dashboard' },
  //     children: [{
  //             path: 'index',
  //             component: () =>
  //                 import ('@/views/applys/apply.vue'),
  //             name: '图表组件',
  //             meta: { title: '图表组件', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'compentType',
  //             component: () =>
  //                 import ('@/views/applys/compentType.vue'),
  //             name: '组件类别',
  //             meta: { title: '组件类别', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'detail',
  //             component: () =>
  //                 import ('@/views/applys/applyDetail.vue'),
  //             name: '应用详情',
  //             hidden: true,
  //             meta: { title: '应用详情', icon: 'dashboard', }
  //         }
  //     ]
  // },

  // 指标管理模块
  // {
  //     path: '/target',
  //     component: Layout,
  //     meta: { title: '指标管理', icon: 'dashboard' },
  //     children: [

  //         {
  //             path: 'target',
  //             component: () =>
  //                 import ('@/views/targets/targetAdmin.vue'),
  //             name: '指标',

  //             meta: { title: '指标', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'item',
  //             component: () =>
  //                 import ('@/views/targets/targetItem.vue'),
  //             name: '指标项管理',

  //             meta: { title: '指标项管理', icon: 'dashboard', }
  //         },
  //         {
  //             path: 'dictionary',
  //             component: () =>
  //                 import ('@/views/targets/dictionary.vue'),
  //             name: '字典管理',
  //             meta: { title: '字典管理', icon: 'dashboard' }
  //         }
  //     ]
  // },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //     path: '/document',
  //     component: Layout,
  //     children: [{
  //         path: 'index',
  //         component: () =>
  //             import ('@/views/document/index.vue'),
  //         name: '使用文档',
  //         meta: { title: '使用文档', icon: 'el-icon-s-order'}
  //     }]
  // },
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
