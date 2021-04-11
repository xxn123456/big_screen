<template>
  <div class="markdown">
    <div class="container">

      <mavon-editor ref="md" v-model="content" style="min-height: 600px" @imgAdd="$imgAdd" @change="change" />
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import {
  mavonEditor
} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: '',
  components: {
    mavonEditor
  },
  props: [],
  data() {
    return {
      content: '',
      contentHtml: '',
      html: '',
      configs: {}
    }
  },
  mounted() {

  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()

      formdata.append('image', $file)

      this.$refs.md[pos] = $file
      this.$http({
        url: 'http://localhost:3000/upload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log('文件上传成功')
        console.log(res)
        const _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel(pos) {
      delete this.md[pos]
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.contentHtml = render
    },
    // 提交
    submit() {
      console.log(this.content)
      console.log(this.html)
      this.$message.success('提交成功，已打印至控制台！')
    }
  }
}

</script>
