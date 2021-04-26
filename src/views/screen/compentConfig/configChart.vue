<template>
  <div class="config">
    <div>
      <div class="config-text">
        图表组件
      </div>
      <input type="text" v-model="title" class="config-input">


      <input type="text" v-model="targetNames" class="config-input">
      <div class="config-input">
        <el-cascader v-model="target" :options="targetOptions" placeholder="选择指标项"></el-cascader>
      </div>


      <div class="config-h">
       <span @click="sure_chart">确定</span>
      </div>
    </div>

  </div>
</template>


<script>
  import {
    findTypeAndTarget
  } from "@/api/targetType.js";
  export default {
    data() {
      return {
        title:"图表名称",
        targetNames:"a指标",
        target:[],
        targetOptions:[]
      }

    },
    mounted() {
      this.findTypeAndTarget();
    },
    methods: {
      findTypeAndTarget() {
        return new Promise((resolve, reject) => {
          findTypeAndTarget().then((res) => {
            let {
              code,
              data
            } = res;
            if (code == "200") {

              this.targetOptions=data;

            }

          })
        })
      },
      sure_chart(){
        this.$emit('change',{
          title:this.title,
          target_id:this.target[1],
          targetNames: this.targetNames
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
    font-size: 14px;

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
