<template>
  <div class="user-documnet">
    <div class="left">
      <el-tree
        :data="trees"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        icon-class="el-icon-document"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="right">
      <div class="markdown-body" style="background-color:#fff;" v-html="editorContentHtml" />
    </div>
  </div>
</template>
<script>
import {
  getCatal,
  getArticleDetail
} from '@/api/article.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      trees: [],
      editorContentHtml: null,
      defaultProps: {
        children: 'docList',
        label: 'name'
      }
    }
  },
  mounted() {
    this.getCatal()
  },
  methods: {
    handleNodeClick(treeItem) {
      // 点击树形结构进行跳转
      const msg = querystring.stringify({
        id: treeItem.id
      })
      return new Promise((resolve, reject) => {
        getArticleDetail(msg).then((res) => {
          this.editorContentHtml = res.respData.htmlContent
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCatal() {
      return new Promise((resolve, reject) => {
        getCatal().then((res) => {
          const {
            respData
          } = res
          this.trees = respData
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
  .user-documnet {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px 15px;
    background-color: #fff;
    display: flex;
    flex-direction: row;

    .left {
      width: 20%;
      min-height: 100vh;
    }

    .right {
      width: 80%;
      min-height: 100vh;
      .markdown-body{
        width: 100%;
        height: 100%;
        color: #000;
        img{
          max-width: 100%;
        }
      }

    }

  }

</style>
