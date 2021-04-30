<template>
    <div class="img-one">
        <div class="des">
            选中图片开始上传

        </div>
        <img :src="url|h_img" alt="" class="r_img" v-show="url!==null">
          
    </div>
</template>
<script>
 import IMGURL from "@/utils/setDeafult.js";
export default {
    
    name:"ImgOne",
    props: ['chartOption', 'chartData', 'isOnResize'],
    data(){
        return{
            url: null
        }
    },
     filters: {
      h_img(val) {
        return IMGURL + val
      }

    },
    watch:{
        chartOption(){
            this.url=this.chartOption.url
        }
    },
    mounted(){
         this.url=this.chartOption.url
    }
}
</script>
<style scoped>
.img-one{
    width: 100%;
    height: 100%;
    margin: 0 auto;
  
    position: relative;
    overflow: hidden;
}
.des{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
      display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.r_img{
    width: 100%;
    height: 100%;
}

</style>