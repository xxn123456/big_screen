<template>
  <div class="role-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchRoles">搜索</el-button>
      </div>
      <div class="search-main">

        <el-button type="success" icon="el-icon-plus" size="small" @click="addRole" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="roleData">
        <el-table-column type="selection" width="55" />

        <el-table-column type="index" width="50" />

        <el-table-column prop="introduction" label="角色名称" />
        <el-table-column prop="roleName" label="权限字符">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.roleName }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="添加时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="界面集成">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-s-data" @click="setMenu(scope.row)">分配菜单</el-button>
            <br>
            <el-button type="text" icon="el-icon-data-analysis" @click="setTarget(scope.row)">分配指标</el-button>

          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="text" @click="delRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="rolesChange" />
    </div>

    <!-- 分配菜单 -->
    <el-dialog :title="dialogTitle" :visible.sync="setMenuDialogFormVisible" width="33%">
      <el-form :model="menuForm">
        <el-form-item label="菜单权限:" :label-width="formLabelWidth">

          <!-- 展开所有菜单节点 -->

          <el-tree ref="menuTree" :data="menuForm.menus" show-checkbox node-key="id" highlight-current />

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setMenuDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配大屏 -->
    <el-dialog title="分配大屏" :visible.sync="setScreenDialog" width="33%">

      <el-form :model="screenForm">

        <el-form-item label="拥有的大屏:" :label-width="formLabelWidth">
          <el-checkbox-group v-model="screenForm.check">
            <el-checkbox v-for="s in screenForm.options" :key="s.index" :label="s.id">{{ s.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setScreenDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配指标 -->

    <el-dialog title="分配指标" :visible.sync="setTargetDialog" width="33%">

      <el-form :model="targetsForm">

        <el-form-item label="拥有的大屏:" :label-width="formLabelWidth">
          <el-checkbox-group v-model="targetsForm.check">
            <el-checkbox v-for="s in targetsForm.options" :key="s.index" :label="s.id">{{ s.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setScreenDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加角色 -->

    <el-dialog :title="dialogTitle" :visible.sync="addRoleDialogFormVisible" width="33%">
      <el-form :model="addRoleForm">

        <el-form-item label="名称 ：" :label-width="formLabelWidth">
          <el-input v-model="addRoleForm.introduction" placeholder="请输入内容" />

        </el-form-item>

        <el-form-item label="角色标识 ：" :label-width="formLabelWidth">

          <el-input v-model="addRoleForm.roleName" placeholder="请输入内容" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除角色 -->

    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>是否删除当前角色</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import {
  getRoles,
  getRole,
  addRoles,
  delRole,
  updateRole,
  // 4
  eidtRoleMenu,
  getRoleMenu,
  getRoleTarget,
  saveRoleTarget
  // 获取角色菜单应用
  // getRoleApply,
  // getRoleScreen,
  // setRoleScreen,
  // // 设置角色菜单应用
  // setRoleApply
} from '@/api/role.js'
import {
  getMenu
} from '@/api/compose.js'
import querystring from 'querystring'

export default {
  data() {
    return {
      serverSearch: '',
      roleData: [],
      // 菜单弹窗
      formLabelWidth: '150px',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setMenuDialogFormVisible: false,
      setModeDialogFormVisible: false,
      setTargetDialog: false,
      // 删除当前角色弹窗
      delDialogVisible: false,
      setScreenDialog: false,
      dialogTitle: '',
      // 分配菜单应用(订阅功能)
      setResDialogFormVisible: false,

      //  分配菜单树形
      menuForm: {
        menus: [],
        checkedKeys: []
      },
      // 分配屏幕
      screenForm: {
        roleId: '',
        check: [],
        options: []
      },
      // 分配应用
      resForm: {
        roleId: '',
        menu: [],
        error: false
      },
      targetsForm: {
        roleId: '',
        check: [],
        options: []
      },

      // 添加角色
      addRoleDialogFormVisible: false,
      addRoleForm: {

      },
      submitState: null,
      test: [],
      currentPage: 0,
      pageSize: 10,
      total: 0,
      loading: true

    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    setTarget(row) {
      this.targetsForm.roleId = row.id
      this.setTargetDialog = true
      const msg = JSON.stringify({
        'roleId': row.id
      })

      return new Promise((resolve, reject) => {
        getRoleTarget(msg).then((res) => {
          const {
            respData
          } = res

          this.targetsForm.check = respData.check
          const new_option = respData.option
          const x = []
          new_option.forEach((item, index) => {
            x.push({
              id: item.id,
              label: item.name
            })
          })
          this.targetsForm.options = x
          this.submitState = 5
          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    setMenu(row) {
      console.log('设置菜单')
      this.submitState = 4
      this.setMenuDialogFormVisible = true
      this.menuForm.id = row.id
      this.getRoleMenu(row.id)
    },
    // 获取所有菜单
    getRoleMenu(id) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'roleId': id
        })
        getRoleMenu(msg).then((res) => {
          const {
            respData
          } = res
          this.menuForm.menus = respData.menu

          this.$refs.menuTree.setCheckedKeys(respData.checkedKeys)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 分配菜单
    getRoleCheck(id) {
      console.log('ss')

      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'roleId': id
        })
        checkRoleMenu(msg).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 添加角色
    addRole() {
      this.dialogTitle = '添加角色'
      this.addRoleDialogFormVisible = true
      this.submitState = 0
    },
    // 获取单个角色信息
    getRole(roleId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'roleId': roleId
        })
        getRole(msg).then((res) => {
          const {
            respData
          } = res
          this.addRoleForm = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取角色列表
    getRoles() {
      return new Promise((resolve, reject) => {
        const msg = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }
        this.loading = true
        getRoles(msg).then((res) => {
          const {
            respData,
            respCode
          } = res

          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }

          this.roleData = respData.records
          this.total = respData.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    editRole(row) {
      this.dialogTitle = '修改角色'
      this.addRoleDialogFormVisible = true
      this.submitState = 1
      this.getRole(row.id)
    },
    delRole(roleId) {
      this.delDialogVisible = true
      this.submitState = 2
      this.resForm.roleId = roleId
    },
    handleSubmit() {
      switch (this.submitState) {
        // 新增角色
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'roleName': this.addRoleForm.roleName,
              'introduction': this.addRoleForm.introduction
            })
            addRoles(msg).then((res) => {
              const {
                respCode
              } = res
              this.addRoleDialogFormVisible = false
              if (respCode == '10000') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'primary'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
              }
              console.log('添加成功')
              this.getRoles()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 修改角色
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.addRoleForm.id,
              'roleName': this.addRoleForm.roleName,
              'introduction': this.addRoleForm.introduction
            })
            updateRole(msg).then((res) => {
              this.addRoleDialogFormVisible = false
              this.getRoles()

              resolve()
            }).catch(error => {
              reject(error)
            })
          })

          break
          // 删除当前角色
        case 2:

          return new Promise((resolve, reject) => {
            const msg = {
              'id': this.resForm.roleId
            }

            delRole(msg).then((res) => {
              const {
                respCode
              } = res

              if (respCode == '10000') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'primary'
                })
                this.delDialogVisible = false
                this.getRoles()
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
              }

              this.getRoles()

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 编辑角色菜单操作
        case 4:
          console.log('sss')

          // let MeneHasCheckKey = this.$refs.menuTree.getCheckedKeys().map(String);
          const checkedKeys = this.$refs.menuTree.getHalfCheckedKeys().map(String)

          const halfCheckedKeys = this.$refs.menuTree.getCheckedKeys().map(String)
          checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)

          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'roleId': this.menuForm.id,
              'menuIdList': checkedKeys
            })
            eidtRoleMenu(msg).then((res) => {
              const {
                respCode
              } = res
              this.setMenuDialogFormVisible = false
              if (respCode == '10000') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'primary'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
              }
              console.log('编辑菜单成功')
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 给角色分配指标
        case 5:
          const msg = JSON.stringify({
            roleId: this.targetsForm.roleId,
            check: this.targetsForm.check
          })

          return new Promise((resolve, reject) => {
            saveRoleTarget(msg).then((res) => {
              this.setTargetDialog = false
              this.getRoles()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })

          break
        default:
      }
    },
    rolesChange(page) {
      this.currentPage = page
      this.getRoles()
    },
    searchRoles() {
      return new Promise((resolve, reject) => {
        const msg = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'roleName': this.serverSearch
        }

        getRoles(msg).then((res) => {
          const {
            respData
          } = res

          this.roleData = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }

}

</script>
<style lang="scss" scoped>
  .role-warp {
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    background-color: #fff;

    .table-mh {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .search {
        min-width: 400px;
        text-align: right;
        overflow: hidden;
      }

      .search-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
      }

    }

    .cont {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      .handle-btn {
        color: #1890ff;
      }
    }

    .page {
      height: 100px;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

</style>
