<template>
    <div class="cust-img">
          <img :src="imgUrl" alt="请配图片路径" :style="textStyle">
    </div>
</template>
<script>
export default {
    name:"CustImg",
    data(){
        return{
           imgUrl:'',
           textStyle:{
                width: '500px',
                height: '300px'
           }
        }
    }
}
</script>
<style lang="scss" scoped>
.cust-img{
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #fff;
}
    
</style>