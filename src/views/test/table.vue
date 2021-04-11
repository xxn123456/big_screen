<template>
  <div>
    <div class="markdown-body" style="background-color:#fff;height:550px;" v-html="editorContentHtml" />
    <mavon-editor ref="md" v-model="editorContent" :ishljs="true" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData" @save="addArticle" />
  </div>
</template>
<script>
import {
  uploadImg,
  addArticle,
  getArticle
} from '@/api/qiniu.js'

import querystring from 'querystring'

import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return {
      editorId: 0,

      editorContent: '',
      editorContentHtml: null
    }
  },
  mounted() {
    this.getArticle()
  },

  methods: {
    // 处理markdown数据，data为markdown文件读出的字符串
    getArticle() {
      const msg = {
        id: this.editorId
      }
      const new_msg = querystring.stringify(msg)
      getArticle(new_msg).then((res) => {
        this.editorContentHtml = res.data.content
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    addArticle() {
      const msg = {
        title: '博客文章',
        author: 'wd',
        category: 'it',
        content: this.editorContentHtml
      }
      const new_msg = querystring.stringify(msg)
      addArticle(new_msg).then((res) => {
        this.editorId = res.data.id
        this.getArticle()

        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    //  md 文本编辑器 获取相应md 文件" @change="changeData"
    changeData(value, render) {
      // console.log("获取md文本");
      // console.log(value);
      // console.log("获取html文本");

      this.editorContentHtml = render
      // console.log(render);
    },
    $imgAdd(pos, $file) {
      return new Promise((resolve, reject) => {
        var formdata = new FormData()
        formdata.append('userImg', $file)
        // this.img_file[pos] = $file;
        uploadImg(formdata).then((res) => {
          this.$refs.md.$img2Url(pos, res.url)
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
