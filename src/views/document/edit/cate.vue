<template>
  <div class="user-warp">
    <div class="table-mh">
      <span><i class="el-icon-tickets" />使用手册</span>
      <div class="search">
        <!-- <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button> -->
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addCatal" />
      </div>
    </div>
    <div class="cont">
      <el-table
        v-loading="loading"
        :data="usersData"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >>
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="目录名称" />
        <el-table-column prop="orderNum" label="顺序" />
        <el-table-column label="顺序">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.roleType==0" size="medium">仅管理员可见</el-tag>
            <el-tag v-show="scope.row.roleType==1" size="medium">仅用户可见</el-tag>
            <el-tag v-show="scope.row.roleType==2" size="medium">所有人都可见</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结构调整">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="text" @click="addSonCatal(scope.row)">
              增加子目录
            </el-button> -->

          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="updataCatal(scope.row)">修改
            </el-button>
            <el-button size="mini" type="text" @click=" delCatal(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog :title="dialogTilte" :visible.sync="DialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="目录名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="可见：" :label-width="formLabelWidth">
          <el-select v-model="form.roleType.check" placeholder="请选择">
            <el-option v-for="item in form.roleType.options" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" :label-width="formLabelWidth">
          <el-input-number v-model="form.orderNum" :min="1" :max="10" label="描述文字" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>是否删除当前目录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {
  getCatal,
  addCatal,
  updataCatal,
  delCatal
} from '@/api/article.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      serverSearch: '',
      usersData: [],
      formLabelWidth: '100px',
      dialogTilte: '',
      form: {
        id: '',
        name: '',
        roleType: {
          check: '0',
          options: [{
            id: '0',
            label: '管理员'
          },
          {
            id: '1',
            label: '用户'
          },
          {
            id: '2',
            label: '都可见'
          }
          ]
        },
        orderNum: 0,
        parentId: 0
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
    this.getCatal()
  },
  methods: {
    getCatal() {
      this.loading = true
      return new Promise((resolve, reject) => {
        const msg = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        }
        getCatal(msg).then((res) => {
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

          this.usersData = respData
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetCatal() {
      this.form = {
        id: '',
        name: '',
        roleType: {
          check: '0',
          options: [{
            id: '0',
            label: '管理员'
          },
          {
            id: '1',
            label: '用户'
          },
          {
            id: '2',
            label: '都可见'
          }
          ]
        },
        orderNum: 0,
        parentId: 0
      }
    },

    addCatal() {
      this.dialogTilte = '添加目录'
      // 重置表单
      this.resetCatal()
      this.DialogFormVisible = true
      // 获取所有角色
      this.submitState = 0
    },
    // 添加子目录
    addSonCatal(row) {
      this.dialogTilte = '添加子目录'
      this.resetCatal()
      this.DialogFormVisible = true
      this.form.parentId = row.id
      // 获取所有角色
      this.submitState = 3
    },

    devRand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    updataCatal(row) {
      this.dialogTilte = '修改目录'
      this.form.id = row.id
      this.form.name = row.name
      this.form.roleType.check = row.roleType
      this.form.orderNum = row.orderNum
      this.DialogFormVisible = true
      this.submitState = 1
    },
    delCatal(row) {
      this.submitState = 2
      this.delDialogVisible = true
      this.form.id = row.id
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'name': this.form.name,
              'roleType': this.form.roleType.check,
              'orderNum': this.form.orderNum,
              'parentId': 0

            })
            addCatal(msg).then((res) => {
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

              this.getCatal()
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
              'name': this.form.name,
              'roleType': this.form.roleType.check,
              'orderNum': this.form.orderNum,
              'parentId': 0

            })
            updataCatal(msg).then((res) => {
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

              this.getCatal()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })

          break
          // 删除用户操作
        case 2:
          return new Promise((resolve, reject) => {
            const msg = querystring.stringify({
              'id': this.form.id
            })
            delCatal(msg).then((res) => {
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
              this.getCatal()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 添加子目录
        case 3:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'name': this.form.name,
              'roleType': this.form.roleType.check,
              'orderNum': this.form.orderNum,
              'parentId': this.form.parentId
            })
            addCatal(msg).then((res) => {
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

              this.getCatal()
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
      this.getCatal()
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
