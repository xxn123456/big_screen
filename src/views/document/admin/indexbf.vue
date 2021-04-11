<template>
  <div class="user-documnet">
    <div class="left">
      <el-tree
        :data="trees"
        default-expand-all
        :highlight-current="true"
        icon-class="el-icon-document"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trees: [{
        label: '整体逻辑',
        url: '/document/admin/all1',
        children: [{
          label: '生成指标',
          url: '/document/admin/all1'
        },
        {
          label: '生成订阅应用',
          url: '/document/admin/all2'
        },
        {
          label: '配置普通用户菜单权限',
          url: '/document/admin/all3'

        },
        {
          label: '发布应用',
          url: '/document/admin/all4'

        }
        ]
      }, {
        label: '系统扩展',
        url: '/document/admin/expand1',
        children: [{
          label: '扩展菜单',
          url: '/document/admin/expand1'
        },
        {
          label: '扩展模板',
          url: '/document/admin/expand2'
        },
        {
          label: '扩展组件',
          url: '/document/admin/expand3'
        }
        ]
      }, {
        label: '权限管理',
        url: '/document/admin/role1',
        children: [{
          label: '角色管理',
          url: '/document/admin/role1'
        },
        {
          label: '用户管理',
          url: '/document/admin/role2'
        }
        ]
      },
      {
        label: '集成管理',
        url: '/document/admin/compose1',
        children: [{
          label: '菜单管理',
          url: '/document/admin/compose1'
        },
        {
          label: '模板管理',
          url: '/document/admin/compose2'
        },
        {
          label: '应用管理',
          url: '/document/admin/compose3'
        },
        {
          label: '服务商管理',
          url: '/document/admin/compose4'
        }
        ]
      },
      {
        label: '服务商应用管理',
        url: '/document/admin/friend1',
        children: [{
          label: '图表组件',
          url: '/document/admin/friend1'
        },
        {
          label: '组件类别',
          url: '/document/admin/friend2'
        }
        ]
      },
      {
        label: '指标管理',
        url: '/document/admin/target1',
        children: [{
          label: '指标',
          url: '/document/admin/target1'
        },
        {
          label: '指标项管理',
          url: '/document/admin/target2'
        },
        {
          label: '字典管理',
          url: '/document/admin/target3'
        }
        ]
      }

      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      // 点击树形结构进行跳转
      this.$router.push({
        path: data.url
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .user-documnet {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px 15px;
    background-color: #fff;
    display: flex;
    flex-direction: row;

    .left {
      width: 20%;
      min-height: 100vh;
    }
    .right {
      width: 80%;
      min-height: 100vh;
    }

  }

</style>
