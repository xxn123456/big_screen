<template>
  <div class="user">
    <div class="logo">
      <!-- 用户图像 -->
      <img :src="userLogo" alt="">
    </div>
    <div class="name">
      <span class="user-label">账号:</span><span>{{ user.userName }}</span>
    </div>
    <div class="role">
      <span class="user-label"> 角色:</span>
      <el-tag>{{ user.ov.roles[0].roleName }}</el-tag>
    </div>
    <div class="phone">
      <span class="user-label">手机号码:</span>
      <span>{{ user.phone }}</span>
    </div>
    <div class="creatTime">
      <span class="user-label"> 创建时间:</span>
      <span>{{ user.createTime }}</span>
    </div>

    <div class="btns">
      <el-button type="primary" size="small" round @click="changeData">修改资料</el-button>
    </div>
    <el-dialog title="编辑资料" :visible.sync="DialogFormVisible" width="33%">
      <el-form :model="userInfoform">
        <el-form-item label="头像：" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 返回用户预览图片 -->
            <img v-if="userInfoform.userPic" :src="prewLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input v-model="userInfoform.phone" placeholder="请输入内容" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="passWordDialogFormVisible" width="33%">
      <el-form ref="ruleForm" :model="form" :rules="freeRules">

        <el-form-item label="旧密码：" :label-width="formLabelWidth" prop="oldPassword">
          <el-input v-model="form.oldPassword" placeholder="请输入内容" />
        </el-form-item>
        <!-- 校验密码逻辑 -->
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="checkPassword">
          <el-input v-model="form.checkPassword" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  // 获取用户信息
  getUserAbout,
  // 编辑用户
  editUserAbout,
  // 更新密码
  updataPassWord
} from '@/api/user.js'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
  // 使用图片上传接口
import {
  uploadCompentImg
} from '@/api/compent.js'
import imgUrl from '@/utils/setDeafult.js'
import role from '../../../../mock/role'
export default {
  data() {
    // 定义校验规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password !== '') {
          // 如果没有填写密码就进行校验规则
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      DialogFormVisible: false,
      passWordDialogFormVisible: false,
      checkPassWordDialogFormVisible: false,
      formLabelWidth: '120px',
      // 用户信息
      user: {
        userName: '',
        userPic: '',
        ov: {
          roles: [{
            roleName: ''
          }]
        },
        phone: '',
        createTime: ''
      },
      // 修改用户信息弹窗
      userInfoform: {
        id: '',
        phone: '',
        userPic: '',
        prePic: ''
      },
      // 更新密码
      form: {
        userId: '',
        oldPassword: '',
        password: '',
        checkPassword: '',
        salt: ''
      },
      // 更新密码验证规则
      freeRules: {
        passoword: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPassword: [{
          required: true,
          validator: validatePass2,
          trigger: 'blur'
        }]

      },

      submitState: 0

    }
  },
  computed: {
    userLogo() {
      return imgUrl + this.user.userPic
    },
    prewLogo() {
      return imgUrl + this.userInfoform.userPic
    }
  },
  mounted() {
    this.getUserAbout()
  },
  methods: {
    // 修改用户资料
    changeData() {
      this.DialogFormVisible = true
      this.userInfoform = {
        id: localStorage.getItem('id'),
        phone: this.user.phone,
        userPic: this.user.userPic
      }
      this.submitState = 0

      console.log('执行修改逻辑')
    },
    getUserAbout() {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem('id')
        const msg = JSON.stringify({
          'id': userId
        })
        getUserAbout(msg).then((res) => {
          const {
            respData
          } = res
          this.user = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 代码上传前检测
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 上传预览
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传图片
    uploadImg(f) {
      const formData = new FormData()
      formData.append('file', f.file)
      return new Promise((resolve, reject) => {
        uploadCompentImg(formData).then((res) => {
          const {
            respData
          } = res

          this.userInfoform.userPic = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 生成随机四位数字符串
    devRand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    // 修改密码
    changePassWord() {
      this.passWordDialogFormVisible = true
      const new_salt = String(this.devRand(1000, 9999))
      this.form.userId = localStorage.getItem('id')

      this.form.salt = new_salt

      this.submitState = 1
    },
    handleSubmit() {
      switch (this.submitState) {
        //  修改用户资料
        case 0:
          return new Promise((resolve, reject) => {
            this.userInfoform.id = localStorage.getItem('id')
            const msg = JSON.stringify(this.userInfoform)
            editUserAbout(msg).then((res) => {
              const {
                respCode
              } = res
              if (respCode == '10000') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })

                this.getUserAbout()
              }

              console.log('关闭弹窗')
              this.DialogFormVisible = false

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 更新用户密码
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              userId: this.form.userId,
              oldPassword: this.form.oldPassword,
              newPassword: this.form.checkPassword,
              salt: this.form.salt
            })
            updataPassWord(msg).then((res) => {
              const {
                respCode
              } = res
              if (respCode == '10000') {
                // 清空token 跳转到登录界面
                removeToken()
                //  刷新界面
                this.$router.go(0)
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 预留接口
        case 2:
          break
        default:
      }
    }

  }
}

</script>
<style lang="scss" scoped>
  .user {
    width: 600px;
    height: 800px;
    margin: 0 auto;
    background-color: #fff;
    color: #606266;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 100%;
      height: 180px;
      text-align: center;
      margin-bottom: 80px;
      margin-top: 15px;

      img {
        height: 180px;
        width: 180px;
      }
    }

    .name {
      width: 400px;

      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .user-label {
        margin-right: 15px;
      }

    }

    .role {
      width: 400px;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .user-label {
        margin-right: 15px;
      }
    }

    .phone {
      width: 400px;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .user-label {
        margin-right: 15px;
      }
    }

    .creatTime {
      width: 400px;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .user-label {
        margin-right: 15px;
      }
    }

    .btns {
      width: 400px;
      display: flex;
      flex-wrap: row;
      justify-content: center;
      margin-top: 200px;
      margin-bottom: 50px;
    }

    // 图片上传优化
    .avatar-uploader {
      .el-upload {

        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .el-upload:hover {
        border-color: #409EFF;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;
      }

      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }

  }

</style>
