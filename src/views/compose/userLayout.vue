<template>
  <div class="mode-example">
    <div class="search">
      <div class="title" />
      <div class="search-mian">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:500px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchExam">搜索</el-button>
        <div class="add-mode">
          <el-button type="text" icon="el-icon-plus" @click="addExam">添加</el-button>
        </div>
      </div>
    </div>
    <div v-loading="loading" class="cont">
      <div v-for="(item,index) in exams" :key="item.index" class="tl-item">
        <div class="tl-pic" @click="selectMode">
          <el-image :src="item.examImgUrl">
            <div
              slot="error"
              class="image-slot"
              style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;"
            >
              <span>请完善展示图</span><span class="dot">(─‿‿─)</span>
            </div>
          </el-image>

        </div>
        <div class="tl-handle">

          <el-button type="text" icon="el-icon-edit" @click="editExam(index)">设计布局</el-button>
          <span>{{ item.examName }}</span>
          <el-button type="text" icon="el-icon-delete" @click="delExam(index)">修改模板</el-button>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="1" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">

        <el-form-item label="模板名称" :label-width="formLabelWidth">

          <el-input v-model="form.examName" placeholder="请输入内容" />

        </el-form-item>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getExam,
  addExam,
  editExam,
  delExam,
  uploadExamImg,
  queryExam
} from '@/api/exam.js'

import {
  upload
} from '@/api/uploadfile.js'
import imgUrl from '@/utils/setDeafult.js'
// 基础折线图
export default {

  data() {
    return {
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '100px',
      currentPage: 1,
      pageSize: 10,
      fileList: [],
      submitState: 0,
      serverSearch: '',
      exams: [],
      form: {
        id: '',
        examName: '',
        examPath: '',
        uploadExamImgUrl: '',
        modelImgUrl: ''
      },
      loading: false
    }
  },
  mounted() {
    this.getExam()
  },
  methods: {
    selectMode() {
      this.$router.push({
        path: '/board/one'
      })
    },
    addExam() {
      this.dialogTitle = '创建空白模板'
      this.dialogFormVisible = true
      this.submitState = 0
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 文件上传
    handleAvatarSuccess(res, file) {
      console.log('组件上传成功')
      // this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    getExam() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        })
        this.loading = true
        getExam(msg).then((res) => {
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
          const new_exam = respData.records
          this.exams = []

          for (let i = 0; i < new_exam.length; i++) {
            this.exams.push({
              examId: new_exam[i].id,
              examName: new_exam[i].modelName,
              examPath: new_exam[i].modelPath,
              examImgUrl: imgUrl + new_exam[i].modelImgUrl,
              examUrl: new_exam[i].modelImgUrl
            })
          }

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 模板图片上传
    uploadExamImg(f) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', f.file)
        uploadExamImg(formData).then((res) => {
          const {
            respData
          } = res
          this.fileList.push({
            name: f.file.name
          })
          this.form.uploadExamImgUrl = imgUrl + respData
          this.form.modelImgUrl = respData
          resolve()
        }).caftch(error => {
          reject(error)
        })
      })
    },
    editExam(index) {
      this.dialogTitle = '修改模板'
      this.dialogFormVisible = true
      const new_exam = Object.assign({}, this.exams[index])
      this.form.id = new_exam.examId
      this.form.examName = new_exam.examName
      this.form.examPath = new_exam.examPath
      // this.form.modelImgUrl=new_exam.
      this.submitState = 1
    },
    delExam(index) {
      this.form.id = this.exams[index].examId
      console.log(this.form.id)

      this.submitState = 2
      this.submitHandle()
    },
    submitHandle() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'modelName': this.form.examName,
              'modelPath': this.form.examPath,
              'modelImgUrl': this.form.modelImgUrl
            })
            addExam(msg).then((res) => {
              console.log('添加成功')
              this.getExam()
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
              'modelName': this.form.examName,
              'modelPath': this.form.examPath,
              'modelImgUrl': this.form.modelImgUrl
            })
            editExam(msg).then((res) => {
              console.log('添加成功')
              this.getExam()
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
            delExam(msg).then((res) => {
              console.log('删除')
              this.getExam()

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    searchExam() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'modelName': this.serverSearch
        })
        this.loading = true
        getExam(msg).then((res) => {
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
          const new_exam = respData.records
          for (let i = 0; i < new_exam.length; i++) {
            this.exams.push({
              examId: new_exam[i].id,
              examName: new_exam[i].modelName,
              examPath: new_exam[i].modelPath,
              examImgUrl: imgUrl + new_exam[i].modelImgUrl,
              examUrl: new_exam[i].modelImgUrl
            })
          }

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

</script>
<style scoped>
       .el-image{
            width: 100%;
            height: 100%;

       }

</style>
<style lang="scss" scoped>
  .mode-example {
    width: 1200px;
    margin: 0 auto;

    border: 1px solid #ebeef5;

    .search {
      height: 140px;
      width: 100%;
      display: flex;
      flex-direction: row;
      background-color: #fff;

      .title {
        width: 280px;
        margin-top: 40px;
        font-size: 40px;
        color: #2b2b2b;
      }

      .search-mian {
        width: calc(100% - 280px);
        margin-top: 50px;
        position: relative;

        .add-mode {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }

    .cont {
      width: 100%;
      // width: 100%;
      min-height: 450px;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      // justify-content: space-between;

      .tl-item {
        width: calc(25% - 15px);
        height: 210px;
        background-color: #fff;
        margin-top: 20px;
        margin-left: 7.5px;
        margin-right: 7.5px;

        .tl-pic {
          height: calc(100% - 50px);

          img {
            width: 100%;
            height: 100%;
          }
        }

        .tl-handle {
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          border-top: 1px solid #d6d6d6;
          padding: 0px 10px 0 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

      }

      .tl-item:nth-of-type(5n) {
        margin-right: 0px;
      }

    }

    .page {
      width: 100%;
      text-align: center;
    }
  }

</style>
