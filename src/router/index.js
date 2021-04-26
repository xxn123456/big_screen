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
    path: '/401',
    component: () =>
      import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/screenAdmin',
    component: Layout,
    meta: {
      title: '系统',
      icon: 'el-icon-s-home',
    },
    redirect: '/screenAdmin/user',
    children: [{
        path: 'user',
        component: () =>
          import('@/views/user/index'),
          name: '用户管理',
      
        meta: {
          title: '用户管理',
          affix: true,
          icon: 'el-icon-s-home'
        }
      },
      {
        path: 'role',
        component: () =>
          import('@/views/role/index'),
        name:"角色管理",
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: 'meun',
        component: () =>
          import('@/views/menu/index'),
        name:"菜单管理",
        meta: {
          title: '菜单管理',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },

  {
    path: '/source_conect',
    component: Layout,
    meta: {
      title: '数据源',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: 'type',
        component: () =>
          import('@/views/sourceType/index'),
        name:"数据源类别管理",
        meta: {
          title: '数据源类别管理',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: 'index',
        component: () =>
          import('@/views/source/index'),
          name:"数据源连接管理",
        meta: {
          title: '数据源连接管理',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },

  {
    path: '/target',
    component: Layout,
    meta: {
      title: '指标',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: 'type',
        component: () =>
          import('@/views/targetType/index'),
        name: '指标类别管理',
        meta: {
          title: '指标类别管理',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: 'index',
        component: () =>
          import('@/views/target/index'),
        name: '指标管理',
        meta: {
          title: '指标管理',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },

  {
    path: '/compent',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: 'type',
        component: () =>
          import('@/views/componentType/index'),
          name: '组件类别管理',
        meta: {
          title: '组件类别管理',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: 'index',
        component: () =>
          import('@/views/component/index.vue'),
          name: '大屏组件',
        meta: {
          title: '大屏组件',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },

  {
    path: '/screen',
    component: Layout,
    meta: {
      title: '可视化大屏',
      icon: 'el-icon-s-home',
    },
    children: [
     
      {
        path: 'index',
        component: () =>
          import('@/views/screen/index'),
          name: '数字大屏',
        meta: {
          title: '数字大屏',
          icon: 'el-icon-s-home'
        }
      },
      
     
    ]
  },
  {
    path: '/produceScreen',
    component: () =>
      import('@/views/screen/produceScreen.vue'),
      name: '设计大屏',
    meta: {
      title: '设计大屏',
      icon: 'el-icon-s-home'
    }
  },

  // 界面设置
  {
    path: '/bea',
    component: () =>
      import('@/views/users/packageBoard.vue'),
    name: '设计界面',
    hidden: true,

    meta: {
      title: '设计界面',
      icon: 'el-icon-s-platform'
    }
  },


  {
    path: '/test',
    component: () =>
      import('@/views/test/test.vue'),
    name: '组件测试',
    hidden: true,

    meta: {
      title: '设计界面',
      icon: 'el-icon-s-platform'
    }
  }
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
