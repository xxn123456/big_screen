<template>
  <div class="screen-title">
    <span>{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'HeadOne',
  props: ['chartOption', 'chartData', 'isOnResize'],
  data(){
    return{
       title:"大屏标题描述"
    }
  },
  watch:{
     chartOption(){

      
       this.$nextTick(()=>{
         this.title=this.chartData.base.title
       })
     }
  },
 
}
</script>
<style lang="scss" scoped>
    .screen-title {
      background-image: url('../img/newtop1.png');
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-origin: center;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items:center;
    }
</style>
