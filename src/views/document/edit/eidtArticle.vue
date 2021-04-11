<template>
  <div class="artice">
    <div class="top">
      <div class="article-name">
        <el-input v-model="form.title" placeholder="文章标题" />
      </div>
      <div class="article-type">
        <el-input-number v-model="form.orderNum" :min="1" :max="10" label="描述文字" />
      </div>
    </div>
    <div class="mavon-boy">
      <mavon-editor
        ref="md"
        v-model="form.editorContent"
        :subfield="false"
        :ishljs="true"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @change="changeData"
        @save="saveArticle"
      />

    </div>

  </div>
</template>
<script>
import {
  addArticle,
  updataArticle,
  uploadImg,
  getArticleDetail
} from '@/api/article.js'

import querystring from 'querystring'

import imgUrl from '@/utils/setDeafult.js'

import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    return {
      subState: 0,
      form: {
        id: '',
        dirId: '',
        title: '',
        orderNum: 0,
        editorContent: ''
      },

      editorContentHtml: null
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      const article_id = this.$route.query.article
      if (article_id) {
        // 0是新增1 是修改
        this.subState = 1
        const msg = querystring.stringify({
          id: article_id
        })
        return new Promise((resolve, reject) => {
          getArticleDetail(msg).then((res) => {
            const {
              respData
            } = res
            this.form.id = respData.id,
            this.form.dirId = respData.dirId,
            this.form.title = respData.name,
            this.form.orderNum = respData.orderNum
            this.form.editorContent = respData.content
            console.log(res)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      } else {
        this.subState = 0
      }
    },

    saveArticle() {
      if (this.subState == 0) {
        const msg = {
          dirId: this.$route.query.dirId,
          name: this.form.title,
          orderNum: this.form.orderNum,
          content: this.form.editorContent,
          htmlContent: this.editorContentHtml
        }
        const new_msg = JSON.stringify(msg)
        addArticle(new_msg).then((res) => {
          const {
            respCode
          } = res
          if (respCode == '10000') {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '恭喜你，这是一条成功消息',
              type: 'error'
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        const msg = {
          id: this.$route.query.article,
          name: this.form.title,
          orderNum: this.form.orderNum,
          content: this.form.editorContent,
          htmlContent: this.editorContentHtml
        }
        const new_msg = JSON.stringify(msg)
        updataArticle(new_msg).then((res) => {
          const {
            respCode
          } = res
          if (respCode == '10000') {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '恭喜你，这是一条成功消息',
              type: 'error'
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    },
    //  md 文本编辑器 获取相应md 文件" @change="changeData"
    changeData(value, render) {
      this.editorContentHtml = render
    },
    $imgAdd(pos, $file) {
      return new Promise((resolve, reject) => {
        var formdata = new FormData()
        formdata.append('file', $file)
        // this.img_file[pos] = $file;
        uploadImg(formdata).then((res) => {
          const {
            respData
          } = res
          const new_imgUrl = imgUrl + respData
          this.$refs.md.$img2Url(pos, new_imgUrl)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    $imgDel(pos) {
      delete this.img_file[pos]
    }
  }
}

</script>
<style lang="scss" scoped>
  .artice {
    width: 100%;
    height: 100%;

    .top {
      width: 100%;
      height: 60px;
      display: flex;

      .article-name {
        width: 300px;
        margin-right: 15px;
      }

      .role-type {

        width: 150px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;

      }

      .article-type {
        width: 150px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;
      }
    }

    .mavon-boy {

      width: 100%;
      height: 100%;
      overflow: hidden;

    }

  }

</style>
