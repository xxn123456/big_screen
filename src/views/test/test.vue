<template>
  <div class="test">
    <p>折线图样例展示</p>

    <div class="line-ms">
      <!-- <radar-one /> -->
    </div>


    <span @click="send" style="color:#fff;">测试</span>

  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
    this.sockets.subscribe("sendAll", (res) => {
       console.log("接受",res);
    });
  },
  methods:{
    send(){
       this.$socket.emit("sendMsg",{
         "screen_id":6,
         "scoket_id":this.$socket.id
       });
      
    }
  }
}

</script>
<style scoped>
  .test{
    width: 100%;
    height: 100vh;
    background-color: #090e4e;
  }

  .line-ms {
    width: 500px;
    height: 300px;
    padding: 10px;
    margin: 0 auto;
  }

</style>
