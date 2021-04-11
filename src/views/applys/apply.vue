<template>
  <div class="apply-layout">
    <!-- 应用容器 -->
    <div class="apply-types">

      <div class="apply-type-name">
        <span>类别：</span>
        <el-button type="primary" size="mini">组件</el-button>
      </div>
      <div class="apply-type">
        <div v-for="(item,index) in chartTab" :key="item.index" class="apply" @click="changeTab(index)">
          <img :src="item.compentTypeIcon" alt="">
          <span>{{ item.compentTypeName }}</span>
        </div>
      </div>

    </div>

    <div v-loading="loading" class="applys">
      <!-- 应用容器 -->
      <template>
        <div
          v-for="(item,index) in allCompents"
          :key="item.index"
          class="apply-cont"
          @mouseenter="openEditChart(item.compentId)"
          @mouseleave="closeEditChart(item.compentId)"
        >
          <div class="apply-logo">
            <img :src="item.compentUrl" alt="">
          </div>
          <div class="apply-title">
            {{ item.compentName }}
          </div>
          <!-- 动态显示菜单 -->
          <div v-show="editCont==item.compentId" class="apply-handle">
            <el-button type="primary" icon="el-icon-edit" circle @click="editCompent(index)" />
            <el-button type="success" icon="el-icon-view" circle @click="seeCompent(item)" />
            <el-button type="info" icon="el-icon-delete" circle @click="delCompent(index)" />

          </div>
        </div>
        <!-- 添加图表 -->

        <div class="apply-cont" @click="addCompent">
          <div class="add-logo" style="height: 160px;">
            <img src="/charttypes/add.png" alt="">
          </div>
          <div class="add-title">
            新增
          </div>
        </div>
      </template>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="form">
        <el-form-item label="组件名称:" :label-width="formLabelWidth">
          <el-input v-model="form.compentName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="组件别名:" :label-width="formLabelWidth">
          <el-input v-model="form.compentAlias" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组件地址:" :label-width="formLabelWidth">
          <el-input v-model="form.compentPath" autocomplete="off" />
        </el-form-item>

        <!-- 查询组件的类别或者根据id 查组件归类 -->
        <el-form-item label="组件类别:" :label-width="formLabelWidth">
          <el-select v-model="form.compentType.check" placeholder="请选择">
            <el-option
              v-for="item in form.compentType.option"
              :key="item.id"
              :label="item.compentTypeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="组件图片:" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              class="avatar"
              style="width:498px;
  height: 300px;"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="组件骨架:" :label-width="formLabelWidth">
          <el-input v-model="form.defaultOption" type="textarea" :autosize="{ minRows: 3}" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getApplyType
} from '@/api/apply.js'
  // 加载配置文件
import {
  uploadCompentImg,
  queryCompentByType,
  queryAllCompentTypeById,
  addCompent,
  editCompent,
  delCompent,
  queryAllCompentType
} from '@/api/compent.js'

import { upload } from '@/api/uploadfile.js'

import imgUrl from '@/utils/setDeafult.js'
export default {

  data() {
    return {
      baseUrl: imgUrl,
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '100px',
      compentTypeId: '',
      chartTab: [{
        compentTypeId: '',
        compentTypeName: '折线图',
        compentPath: 'hsh-test',
        compentTypeIcon: '/charttypes/bingtu.svg'

      }],
      contShow: 0,
      allCompents: [

      ],
      editCont: null,
      form: {
        id: '',
        compentName: '',
        // 组件别名
        compentAlias: '',
        compentPath: '',
        // 预览图片地址
        imageUrl: '',
        compentType: {
          check: '',
          option: []
        },
        // 组件图片地址
        compentImgUrl: '',
        defaultOption: null

      },
      submitState: 0,
      loading: false
    }
  },
  computed: {
    compentDefaultOption() {
      return JSON.stringify(this.form.defaultOption)
    }
  },
  mounted() {
    this.getApplyType()
  },
  methods: {
    uploadImg(f) {
      const formData = new FormData()
      formData.append('file', f.file)

      return new Promise((resolve, reject) => {
        uploadCompentImg(formData).then((res) => {
          const {
            respData
          } = res
          this.form.compentImgUrl = respData
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 切换选项卡
    changeTab(index) {
      this.queryCompentByType(this.chartTab[index].id)
      this.compentTypeId = this.chartTab[index].id
    },
    // 组件预览
    seeCompent(detail) {
      console.log(detail)
      const compentMsg = JSON.stringify(detail)
      this.$router.push({
        path: '/apply/detail',
        query: {
          apply: compentMsg
        }
      })
    },
    // 查看编辑按钮
    openEditChart(id) {
      this.editCont = id
    },
    closeEditChart() {
      this.editCont = null
    },
    // 对图片的处理
    handleAvatarSuccess(res, file) {
      console.log('组件上传成功')
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 获取所有组件类型
    getApplyType() {
      return new Promise((resolve, reject) => {
        getApplyType().then((res) => {
          const {
            respData
          } = res
          this.chartTab = respData
          const compentId = respData[0].id
          // 修复新增，删除之后组件异常
          this.compentTypeId = respData[0].id
          this.queryCompentByType(compentId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 通过组件类别查询组件 主要用于新增，编辑
    queryCompentByType(id) {
      const msg = JSON.stringify({
        'compentTypeId': id
      })
      this.loading = true
      return new Promise((resolve, reject) => {
        queryCompentByType(msg).then((res) => {
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

          this.allCompents = []

          respData.forEach((element, index) => {
            this.allCompents.push({
              compentId: respData[index].id,
              compentName: respData[index].compentName,
              compentUrl: imgUrl + respData[index].compentUrl,
              compentPath: respData[index].compentPath,
              ov: respData[index].ov
            })
          })

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加组件
    addCompent() {
      // 将弹窗清空
      this.form = {
        id: '',
        compentName: '',
        compentPath: '',
        compentAlias: '',
        // 预览图片地址
        imageUrl: '',
        compentType: {
          check: '',
          option: []
        },
        // 组件图片地址
        compentImgUrl: '',
        defaultOption: null

      }
      this.dialogTitle = '添加组件'

      this.dialogFormVisible = true
      this.queryAllCompentType()
      this.submitState = 0
    },
    // 查询所有组件类型
    queryAllCompentType() {
      return new Promise((resolve, reject) => {
        queryAllCompentType().then((res) => {
          const {
            respData
          } = res
          console.log(respData)
          this.form.compentType.option = respData

          console.log('查询到对应数据')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    editCompent(index) {
      this.dialogTitle = '修改组件'
      this.dialogFormVisible = true
      // 查询所有组件类型
      this.queryAllCompentType()
      const compentId = this.allCompents[index].compentId
      this.queryAllCompentTypeById(compentId)
      this.submitState = 1
    },
    // 根据组件查询对应组件类型id
    queryAllCompentTypeById(compentId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'id': compentId
        })
        queryAllCompentTypeById(msg).then((res) => {
          const {
            respData
          } = res
          this.form.compentType.check = respData.compentTypeId
          this.form.compentName = respData.compentName
          this.form.id = respData.id
          this.form.compentPath = respData.compentPath
          this.form.imageUrl = imgUrl + respData.compentUrl
          this.form.compentImgUrl = respData.compentImgUrl
          this.form.defaultOption = respData.compentOption
          this.form.compentAlias = respData.compentAlias
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    delCompent(index) {
      this.submitState = 2
      this.form.id = this.allCompents[index].compentId
      this.handleSubmit()
    },
    // 处理表单提交结构
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'compentName': this.form.compentName,
              'compentAlias': this.form.compentAlias,
              'compentPath': this.form.compentPath,
              'compentUrl': this.form.compentImgUrl,
              'compentTypeId': this.form.compentType.check,
              'compentOption': this.form.defaultOption
            })
            addCompent(msg).then((res) => {
              const {
                respData
              } = res

              this.dialogFormVisible = false
              this.queryCompentByType(this.compentTypeId)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })

          break
        case 1:
          return new Promise((resolve, reject) => {
            let new_defaultOption

            if (this.form.defaultOption == null) {
              new_defaultOption = this.form.defaultOption
            } else {
              new_defaultOption = this.form.defaultOption.replace(/[\r\n]/g, '')
            }

            const msg = JSON.stringify({
              'id': this.form.id,
              'compentName': this.form.compentName,
              'compentAlias': this.form.compentAlias,
              'compentPath': this.form.compentPath,
              'compentUrl': this.form.compentImgUrl,
              'compentTypeId': this.form.compentType.check,
              'compentOption': new_defaultOption
            })
            editCompent(msg).then((res) => {
              const {
                respData
              } = res

              this.dialogFormVisible = false
              this.queryCompentByType(this.compentTypeId)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id
            })
            delCompent(msg).then((res) => {
              const {
                respData
              } = res
              console.log('删除组件成功')
              this.dialogFormVisible = false

              this.queryCompentByType(this.compentTypeId)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    }

  }
}

</script>
<style scoped>
.avatar-uploader{
  width: 500px;
  height: 300px;

}
.el-upload{
  width: 500px;
  height: 300px;
}

</style>
<style lang="scss" scoped>
  .apply-layout {
    width: 1200px;
    height: 100%;
    margin: 0 auto;

    .apply-types {
      width: 100%;
      height: 150px;
      padding: 15px 30px;
      background-color: #fff;

      .apply-type {
        width: 100%;
        display: flex;
        flex-direction: row;

        .apply {
          width: 60px;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          margin-right: 20px;
          margin-top: 15px;

          img {
            width: 50px;
            height: 30px;
          }

          span {
            font-size: 12px;
            color: #969799;
          }
        }
      }

    }

    .applys {
      width: 100%;
      min-height: 200px;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .apply-cont {
        width: 220px;
        height: 200px;
        margin-right: 25px;
        margin-bottom: 15px;
        background-color: #fff;
        position: relative;

        .apply-logo {
          height: calc(100%- 60px);
          width: clac(100% -20px);
          padding: 10px;

          img {
            width: 100%;
            height: auto;
          }

        }

        .apply-title {
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          text-align: center;
          background-color: #fff;
        }

        .apply-handle {
          position: absolute;
          top: 0px;
          right: 0px;
          font-size: 12px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

        }

        .add-logo {

          width: clac(100% -20px);
          padding: 10px;
          overflow: hidden;

          img {
            width: 100%;
            height: 160px;
          }

        }

        .add-title {
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          text-align: center;
          background-color: #fff;
        }
      }

      .apply-cont:nth-of-type(5n) {
        margin-right: 0px;
      }

    }

    .avatar-uploader {
      /deep/.el-upload {
        border: 1px dashed #d9d9d9;
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
      }

      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }

</style>
