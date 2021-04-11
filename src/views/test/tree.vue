<template>
  <div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
    />

    <div class="buttons">
      <el-button @click="getCheckedKeys">通过 node 获取</el-button>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [{
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [
            {
              id: 211,
              label: '二级 2-1',
              children: [
                {
                  id: 2111,
                  label: '二级 2-1'
                },
                {
                  id: 2112,
                  label: '二级 2-1'
                }
              ]
            },
            {
              id: 212,
              label: '二级 2-1'
            }

          ]
        }, {
          id: 22,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 31,
          label: '二级 3-1'
        }, {
          id: 32,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    getCheckedNodes() {
      // console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()));
      this.$refs.tree.setCheckedKeys([2])
    },
    getCheckedKeys() {
      const checkedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.tree.getCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      console.log(checkedKeys)
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}

</script>
