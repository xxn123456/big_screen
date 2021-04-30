<template>
  <div class="config">
    <div>
      <div class="config-text">
        文字组件
      </div>

      <el-upload class="upload-demo" :action="'/component/upload'|h_img" multiple :limit="1" :file-list="fileList"
        :on-success="uploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5000kb</div>
      </el-upload>

    </div>

    <div class="config-h">
      <span @click="sure_chart">确定</span>
    </div>

  </div>
</template>

<script>
  import IMGURL from "@/utils/setDeafult.js";
  export default {
    data() {
      return {
        url: null,
        fileList: []

      }

    },
    filters: {
      h_img(val) {
        return IMGURL + val
      }

    },
    methods: {
      uploadSuccess(response, file, fileList) {
        let {
          code,
          url
        } = response;
        if (code == "200") {
          this.url = url;
        } else {
          this.$message("上传图片异常")
        }
       

      },

      sure_chart() {
        this.$emit('change_type2', {
          url: this.url
        });
      }

    }
  }

</script>
<style scoped>
  .config {
    width: 100%;
    min-height: 100px;
  }

  .config-text {
    text-align: center;
    color: #999;
    margin-top: 15px;
    margin-bottom: 15px;

  }

  .config-input {
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    margin-top: 15px;
    margin-bottom: 15px;

  }

  .config-h {

    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: center;
    font-weight: bold;


  }
  .upload-demo{
      text-align: center;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #fff;
    font-size: 14px;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #fff;
    font-size: 14px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff;
    font-size: 14px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #fff;
    font-size: 14px;
  }

  input:focus::-webkit-input-placeholder {
    color: #fff;
    font-size: 14px;
  }

</style>
