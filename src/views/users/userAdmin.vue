<template>
  <div class="user-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addUser" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="usersData">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="userName" label="账号" />
        <el-table-column prop="ov.roleNames" label="角色">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.ov.roleNames }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="手机" />

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>

        </el-table-column>

        <el-table-column prop="updateTime" label="最后登录">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="isUse" label="是否启用">

          <template slot-scope="scope">
            <el-switch v-model="scope.row.isUse">
            </el-switch>
          </template>
        </el-table-column> -->

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editUser(scope.row)">修改
            </el-button>

            <el-button size="mini" type="text" @click="delUser(scope.row)">删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="usersChange" />
    </div>

    <el-dialog :title="dialogTilte" :visible.sync="DialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="用户：" :label-width="formLabelWidth">
          <el-input v-model="form.userName" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item v-show="this.submitState==0" label="密码：" :label-width="formLabelWidth">
          <el-input v-model="form.passoWord" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-select v-model="form.userRole.check" placeholder="请选择">
            <el-option v-for="item in form.userRole.options" :key="item.value" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入内容" />
        </el-form-item>
        <!-- <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch v-model="form.userState">
          </el-switch>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹窗 -->

    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>是否删除当前用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import {
  getUsers,
  addUser,
  editUser,
  delUser,
  getAllRole,
  getUserHasRole
} from '@/api/user.js'
export default {

  data() {
    return {
      serverSearch: '',
      usersData: [],
      formLabelWidth: '100px',
      dialogTilte: '',
      form: {
        id: '',
        phone: '',
        userRole: {
          check: '',
          options: [{
            value: 'sssss',
            label: 'admin'
          }, {
            value: 'ssssss',
            label: 'wd'
          }]
        }

      },
      currentPage: 0,
      pageSize: 10,
      total: 0,
      // 数据弹窗
      DialogFormVisible: false,
      // 删除确定弹窗
      delDialogVisible: false,
      submitState: 0,
      loading: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.loading = true
      return new Promise((resolve, reject) => {
        const msg = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }
        getUsers(msg).then((res) => {
          const {
            respData,
            respCode
          } = res

          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            return false
          }

          this.usersData = respData.records
          this.total = respData.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    addUser() {
      this.dialogTilte = '添加用户'
      this.DialogFormVisible = true
      // 获取所有角色
      this.getRole()
      this.submitState = 0
    },
    devRand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    editUser(row) {
      this.dialogTilte = '修改用户'
      this.submitState = 1
      this.DialogFormVisible = true
      this.getUserHasRole(row.id)
      // 获取所有角色
      this.getRole()
    },
    delUser(row) {
      this.submitState = 2
      this.delDialogVisible = true
      this.form.id = row.id
    },
    getUserHasRole(userId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'id': userId
        })
        getUserHasRole(msg).then((res) => {
          const {
            respData
          } = res
          this.form.id = respData.id
          this.form.userName = respData.userName
          this.form.userRole.check = respData.ov.roles[0].id
          this.form.phone = respData.phone
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRole() {
      return new Promise((resolve, reject) => {
        getAllRole().then((res) => {
          const {
            respData
          } = res
          this.form.userRole.options = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const new_salt = String(this.devRand(1000, 9999))
            const msg = JSON.stringify({
              'userName': this.form.userName,
              'userPwd': this.form.passoWord,
              'roleIdList': [this.form.userRole.check],
              'phone': this.form.phone,
              'salt': new_salt,
              'sex': 0
            })
            addUser(msg).then((res) => {
              const {
                respCode
              } = res

              if (respCode == '10000') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'primary'
                })
                this.DialogFormVisible = false
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
              }

              this.getUsers()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id,
              'userName': this.form.userName,
              'phone': this.form.phone,
              'roleIdList': [this.form.userRole.check],
              'sex': 0

            })
            editUser(msg).then((res) => {
              const {
                respCode
              } = res

              if (respCode == '10000') {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'primary'
                })
                this.DialogFormVisible = false
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
                this.DialogFormVisible = false
              }

              this.getUsers()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })

          break
          // 删除用户操作
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id
            })
            delUser(msg).then((res) => {
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
              } else {
                this.$message({
                  showClose: true,
                  message: '操作失败',
                  type: 'danger'
                })
              }
              this.getUsers()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    // 分页展示
    usersChange(page) {
      this.currentPage = page
      this.getUsers()
    },
    // 搜索用户
    searchUser() {
      return new Promise((resolve, reject) => {
        const msg = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'userName': this.serverSearch
        }
        getUsers(msg).then((res) => {
          const {
            respData
          } = res

          this.usersData = respData.records
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
  .user-warp {
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
