<template>
  <div class="config">
    <div>
    <div class="config-text">
            文字组件
    </div>
      <input type="text" placeholder="请输入标题" class="config-input" v-model="title">
    </div>

     <div class="config-h">
       <span @click="sure_chart">确定</span>
      </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        title:"请输入描述"

      }

    },
    methods: {

       sure_chart(){
        this.$emit('change_type2',{
          title:this.title
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
   
  .config-text{
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

  .config-h{

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
