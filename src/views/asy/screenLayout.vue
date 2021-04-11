<template>
  <div class="user-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" />大屏列表</span>
      <div class="search">
        <!-- <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button> -->
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addScreen" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="usersData">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="bigScreenName" label="大屏名称" />

        <el-table-column prop="bigScreenType" label="类型">
          <template slot-scope="scope">
            <span>拖拽大屏</span>
          </template>

        </el-table-column>

        <el-table-column prop="bigScreenSize" label="大屏规格" />

        <el-table-column prop="screenUrl" label="预览网址" />

        <el-table-column prop="createTime" label="大屏创建时间">
          <!-- <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
          </template> -->

        </el-table-column>

        <el-table-column fixed="right" label="界面集成" width="200">
          <template slot-scope="scope">
            <div>
              <span><i class="el-icon-magic-stick" /></span>
              <el-button size="mini" type="text" @click="enterScreenLayout(scope.row)">设计界面
              </el-button>
              <br>
              <span><i class="el-icon-picture-outline" /></span>
              <el-button size="mini" type="text" @click="uploadPrew(scope.row)">上传截图
              </el-button>
            </div>

          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">

            <el-button size="mini" type="text" @click="editUser(scope.row)">修改
            </el-button>

            <el-button size="mini" type="text" @click="delScreen(scope.row)">删除
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
        <el-form-item label="大屏名称：" :label-width="formLabelWidth">
          <el-input v-model="form.screenName" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="大屏类别：" :label-width="formLabelWidth">
          <el-select v-model="form.screenType.check" placeholder="请选择">
            <el-option
              v-for="item in form.screenType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="大屏规格：" :label-width="formLabelWidth">
          <el-input v-model="form.screenSize" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="第三方网址：" :label-width="formLabelWidth">
          <el-input v-model="form.screenUrl" placeholder="请输入内容" />
        </el-form-item>

        <!-- <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-select v-model="form.userRole.check" placeholder="请选择">
            <el-option v-for="item in form.userRole.options" :key="item.value" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
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

    <!-- 上传预览图 -->

    <el-dialog :title="dialogTilte" :visible.sync="imgdialogFormVisible" width="33%">
      <el-form :model="preForm">

        <el-form-item label="模板图片" :label-width="formLabelWidth">

          <el-upload
            class="upload-demo"
            action="#"
            :http-request="uploadExamImg"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2000kb</div>
          </el-upload>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imgdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upImgSuccess">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  userCreateScreen,
  getuserCreateScreen,
  updataUserScreen,
  delUserScreen
} from '@/api/user.js'
import {
  uploadExamImg
} from '@/api/exam.js'

import querystring from 'querystring'
export default {
  data() {
    return {
      serverSearch: '',
      usersData: [],
      formLabelWidth: '100px',
      dialogTilte: '',
      form: {
        id: null,
        screenName: '',
        screenType: {
          check: '',
          options: [{
            value: '0',
            label: '拖拽大屏'
          }]
        },
        screenSize: '1920*1080',
        targetNums: '13',
        createTime: '2019',
        screenUrl: ''
      },
      currentPage: 0,
      pageSize: 10,
      total: 0,
      // 数据弹窗
      DialogFormVisible: false,
      // 删除确定弹窗
      delDialogVisible: false,
      // 预览图弹窗
      imgdialogFormVisible: false,
      fileList: [],
      preForm: {
        id: '',

        img: ''

      },
      submitState: 0,
      loading: false
    }
  },
  mounted() {
    this.getuserCreateScreen()
  },
  methods: {
    getuserCreateScreen() {
      this.loading = true
      const user_id = localStorage.getItem('id')
      return new Promise((resolve, reject) => {
        const msg = {
          'current': this.currentPage,
          'size': this.pageSize,
          'userId': user_id
        }
        getuserCreateScreen(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          if (respCode == '10000') {
            this.usersData = respData.records
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            return false
          }
          console.log(res)

          // this.usersData = respData.records;
          this.total = respData.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    addScreen() {
      this.dialogTilte = '添加大屏'
      this.form = {

        screenName: '',
        screenType: {
          check: '',
          options: [{
            value: '0',
            label: '拖拽大屏'
          }]
        },
        screenSize: '1920*1080',
        targetNums: '13',
        createTime: '2019',
        screenUrl: ''

      }
      this.DialogFormVisible = true
      this.submitState = 0
    },
    devRand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    enterScreenLayout(row) {
      console.log('设计界面')
      this.$router.push({
        path: '/bea',
        query: {
          screenId: row.id
        }
      })
    },
    editUser(row) {
      this.dialogTilte = '修改大屏'
      this.submitState = 1
      const new_screen = Object.assign({}, row)

      this.form = {
        id: new_screen.id,
        screenName: new_screen.bigScreenName,
        screenType: {
          check: '0',
          options: [{
            value: '0',
            label: '拖拽大屏'
          }]
        },
        screenSize: '1920*1080',
        screenUrl: ''

      }
      this.DialogFormVisible = true
    },
    delScreen(row) {
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
    uploadPrew(row) {
      this.preForm.id = row.id
      this.dialogTilte = '上传大屏预览图'
      this.imgdialogFormVisible = true
    },
    upImgSuccess() {
      return new Promise((resolve, reject) => {
        const user = localStorage.getItem('id')

        const msg = JSON.stringify({
          'id': this.preForm.id,
          'previewImgUrl': this.preForm.img
        })
        updataUserScreen(msg).then((res) => {
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
          this.getuserCreateScreen()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 图片上传监测
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    uploadExamImg(f) {
      console.log('进入文件上传')
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', f.file)
        console.log('得到传参')
        console.log(f)
        uploadExamImg(formData).then((res) => {
          const {
            respData
          } = res
          this.fileList.push({
            name: f.file.name
          })
          this.preForm.img = respData
          resolve()
        }).caftch(error => {
          reject(error)
        })
      })
    },
    // 图片上传回调
    handleAvatarSuccess(res, file) {
      console.log('组件上传成功')
      // this.form.imageUrl = URL.createObjectURL(file.raw);
    },

    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const user = localStorage.getItem('id')
            const msg = JSON.stringify({
              'userId': user,
              'bigScreenName': this.form.screenName,
              'bigScreenType': 0,
              'bigScreenSize': '1920*1080',
              'bigScreenUrl': 'www.yjhily.top'
            })
            userCreateScreen(msg).then((res) => {
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

              this.getuserCreateScreen()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const user = localStorage.getItem('id')

            const msg = JSON.stringify({
              'id': this.form.id,
              'userId': user,
              'bigScreenName': this.form.screenName,
              'bigScreenType': 0,
              'bigScreenSize': '1920*1080',
              'bigScreenUrl': 'www.yjhily.top'
            })
            updataUserScreen(msg).then((res) => {
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

              this.getuserCreateScreen()
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
              id: this.form.id
            })
            delUserScreen(msg).then((res) => {
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
              this.getuserCreateScreen()
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
      this.getuserCreateScreen()
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
