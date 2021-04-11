<template>
  <div class="father-cont">
    <div class="menu-main">
      <div class="handle-title">
        应用操作面板
      </div>
      <div class="menu-list">
        <div class="menu-name">
          基本医疗服务
        </div>
        <div class="menu">
          <div class="item-menu">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="应用 A" />
              <el-checkbox label="应用 B" />
              <el-checkbox label="应用 C" />

            </el-checkbox-group>
          </div>
          <div class="item-handle">
            <el-button type="primary" size="mini">新增</el-button>
            <el-button type="primary" size="mini">配置</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </div>
        </div>
      </div>

      <div class="menu-list">
        <div class="menu-name">
          公共卫生
        </div>
        <div class="menu">
          <div class="item-menu">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="应用 A" />
              <el-checkbox label="应用 B" />
              <el-checkbox label="应用 C" />

            </el-checkbox-group>
          </div>
          <div class="item-handle">
            <el-button type="primary" size="mini">新增</el-button>
            <el-button type="primary" size="mini">配置</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </div>
        </div>
      </div>

    </div>
    <div class="handle">
      <div class="handle-title">
        菜单操作面板
      </div>
      <!-- 操作菜单 -->
      <div class="hanlde-menu">
        <el-form :model="handleMenuForm">
          <!-- <el-form-item label="菜单名称：">
            <el-input v-model="input" placeholder="请输入内容" style="width: calc(100% - 100px);"></el-input>
          </el-form-item> -->

        </el-form>
        <div class="menu-show">
          <menu-tree />

        </div>
        <!-- <div class="menu-buttons">
              <el-button type="primary" size="mini">新增</el-button>
            <el-button type="primary" size="mini">删除</el-button>
        </div> -->

      </div>
    </div>
  </div>
</template>
<script>
import menuTree from '@/views/users/menuTree.vue'
export default {
  components: {
    menuTree
  },
  data() {
    return {
      id: 100,
      checkList: [],
      formMenuLabelWidth: '50',
      handleMenuForm: {},
      menuList: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1'
        },
        {
          id: 5,
          label: '二级 1-2'
        }
        ]
      }]
    }
  },
  methods: {
    append(data) {
      const newChild = {
        id: this.id++,
        label: 'testtest',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}

</script>
<style lang="scss">
  .father-cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .menu-main {
      width: 70%;
      padding: 30px 50px;

      .handle-title {
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
      }

      .menu-list {
        width: 100%;
        min-height: 100px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        margin-bottom: 50px;

        .menu-name {
          width: 200px;
        }

        .menu {
          width: calc(100% - 200px);
          padding-left: 50px;

          .item-menu {
            height: calc(100% - 70px);
          }

          .item-handle {
            height: 70px;
            text-align: right;

          }

        }

      }

    }

    .handle {
      width: 30%;
      padding: 30px 50px;

      .handle-title {
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
      }

      .menu-buttons {
        text-align: right;
      }
    }
  }

</style>
