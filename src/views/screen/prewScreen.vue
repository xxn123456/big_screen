<template>
  <div class="prew_screen">
    <tem-one :layout-data="layout" @reciveIndex="setTargetAndCss" />
  </div>
</template>
<script>
  import TemOne from '@/views/screen/prewLayout.vue'
  export default {
    data() {
      return {
        layout: []
      }
    },
    components: {
      TemOne

    },
    mounted() {

      this.screen_id = this.$route.query.id;

      this.sockets.subscribe("sendAll", (res) => {
        this.layout = null;

        this.layout = JSON.parse(res);

      });

      this.send();

    },
    methods: {
      setTargetAndCss() {

      },
      send() {
        this.$socket.emit("sendMsg", {
          "screen_id": this.screen_id,
          "scoket_id": this.$socket.id
        });

      }
    }
  }

</script>

<style lang="scss" scoped>
  .prew_screen {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    background-color: #11085f;
    display: flex;
    flex-direction: column;
    color: #fff;
    overflow: hidden;
  }

</style>
