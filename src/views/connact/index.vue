<template>
  <div class="screen-control-wrap">

    <div v-show="page==1" class="a-one">
      <div class="title">
        请确保大屏设计分辨率与设备分辨率一致?
        <br>
        <span style="font-size:12px;">
          标准格式1920*1080,其他格式需要自己在大屏里面设计幕部宽度
        </span>

      </div>
      <div class="pic">
        <img src="./img/p7747.png" alt="">
      </div>
    </div>
    <div v-show="page==2" class="a-two">
      <div class="ewm">
        <div class="az">
          <img src="./img/downimg.png" alt="">
          <span>安卓设备</span>
        </div>
        <div class="ios">
          <img src="./img/downimg.png" alt="">
          <span>ios设备</span>
        </div>
      </div>

    </div>
    <div v-show="page==3" class="a-three">
      <div class="title">
        开始你的大屏
      </div>
      <div class="cont">
        确保设备apk网络正常,apkwebscoket可以正常连接
      </div>
    </div>

    <div v-if="page==4" style="width:1920px;height:1080px;color:#fff;" class="screen">
      <tem-one :layout-data="layout" />
    </div>
    <div class="handel-btn">
      <el-button type="primary" round :disabled="redu" @click="reduPage">上一步</el-button>
      <el-button type="primary" round :disabled="add" @click="addPage">下一步</el-button>
    </div>
  </div>
</template>
<script>
import screenfull from 'screenfull'
import TemOne from '@/views/connact/screenLayout.vue'
import {
  getLayout
} from '@/api/layout.js'
import querystring from 'querystring'
export default {
  components: {
    TemOne
  },
  data() {
    return {
      isFullscreen: false,
      page: 1,
      add: false,
      redu: false,
      layout: []

    }
  },

  mounted() {
    console.log('界面刷新了')
    this.getLayout()
  },
  methods: {
    getLayout() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          id: this.$route.query.sid
        })
        getLayout(msg).then((res) => {
          const {
            respData
          } = res
          this.layout = JSON.parse(respData.layout)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    addPage() {
      if (this.page >= 3) {
        this.page = 4
        this.add = true
        this.redu = false
        screenfull.toggle()

        console.log('已经全屏')
      } else {
        this.page++
        this.add = false
      }
    },
    reduPage() {
      if (this.page == 4) {

      }

      if (this.page <= 1) {
        this.page = 1
        this.redu = true
        this.add = false
        screenfull.toggle()
      } else {
        this.page--
        this.redu = false
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .screen-control-wrap {
    width: 100%;
    height: 100vh;
    // width: 1920px;
    // height: 1080px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.8);

    position: relative;

    .a-one {
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      color: #fff;
      position: relative;

      .title {
        position: absolute;
        width: 500px;
        height: 40px;
        font-size: 24px;
        color: #fff;
        top: 100px;
        animation: onetitlemove 2s;
        animation-fill-mode: forwards;

      }

      .pic {
        position: absolute;
        width: 960px;
        height: 540px;
        top: 180px;
        right: 50%;
        margin-right: -480px;
        animation: onepicmove 2s;
        animation-fill-mode: forwards;

        img {
          width: 100%;
          height: 100%;
        }
      }

    }

    .a-two {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .ewm {
        width: 800px;
        height: 600px;
        display: flex;
        flex-direction: row;
        color: #fff;
        animation: twomove 2s;
        animation-fill-mode: forwards;

      }

      .az {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 200px;
          height: 200px;
        }

        span {
          margin-top: 10px;
        }

      }

      .ios {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 200px;
          height: 200px;
        }

        span {
          margin-top: 10px;
        }

      }

    }

    .a-three {
      width: 100%;
      height: 100%;
      position: relative;

      .title {
        position: absolute;
        width: 500px;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        color: #fff;
        left: 50%;
        margin-left: -250px;
        text-align: center;
        animation: threeTitlemove 2s;
        animation-fill-mode: forwards;
      }

      .cont {

        position: absolute;
        width: 500px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        left: 50%;

        margin-left: -250px;
        text-align: center;
        animation: threeContmove 3s;
        animation-fill-mode: forwards;

      }
    }

    .handel-btn {
      position: absolute;
      width: 200px;
      height: 40px;
      right: 50px;
      bottom: 40px;

    }

    .sreen {
      position: absolute;
      z-index: 3;
      top: 0px;
      left: 0px;
      overflow: hidden;
    }

    // color: #fff;
  }

  @-webkit-keyframes onetitlemove {
    0% {
      left: -500px;
    }

    ;

    100% {
      left: 200px;
    }
  }

  @-webkit-keyframes onepicmove {
    0% {
      right: -50%;
    }

    ;

    100% {
      right: 50%;
    }
  }

  @-webkit-keyframes twomove {
    0% {
      transform: scale(0, 0);
    }

    ;

    100% {
      transform: scale(1, 1);
    }
  }

  @-webkit-keyframes threeTitlemove {
    0% {
      top: -150px;
    }

    ;

    100% {
      top: 150px;
    }
  }

  @-webkit-keyframes threeContmove {
    0% {
      top: -300px;
    }

    ;

    100% {
      top: 300px;
    }
  }

</style>
