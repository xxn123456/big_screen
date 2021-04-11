<template>
  <div class="big-screen">
    <div v-if="loading" class="loading-wrap">
      加载中...
    </div>
    <div v-else class="cont">
      <div v-for="(item,index) in screenTable" :key="item.index" class="screen-warp">

        <img :src="item.previewImgUrl|preImg" alt="">
        <div v-show="screenTable[index].active==true" class="screen-title" @mouseenter="startBigScreen(index)">
          <span>{{ item.name }}</span>
        </div>
        <div v-show="screenTable[index].active==false" class="handle-screen" @mouseleave="showBigTitle(index)">

          <span><i class="el-icon-view" /><span style="margin-left:8px;" @click="prewScreen(item.id)">预览</span></span>
          <!-- <span><i class="el-icon-delete" style="position:relative;top: 2px;"></i><span
              style="margin-left:8px;" @click="delScreen(item.id)">删除</span></span> -->
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import {
  getuserCreateScreen
} from '@/api/user.js'
import imgUrl from '@/utils/setDeafult.js'
import querystring from 'querystring'
export default {
  filters: {
    preImg: function(value) {
      return imgUrl + value
    }
  },
  data() {
    return {
      test: true,
      dialogTitle: '',
      DialogFormVisible: false,
      formLabelWidth: '150px',
      form: {
        id: null,
        name: '',
        atter: '0',
        templeteCompent: {
          check: '0',
          options: [{
            id: '0',
            label: '拖拽模板容器',
            compent: 'templete-one'
          },
          {
            id: '1',
            label: 'iframe模板容器',
            compent: 'templete-two'
          }
          ]
        },
        otherScreenUrl: ''
      },
      currentPage: 1,
      pageSize: 10,
      screenTable: [],
      subState: null,
      loading: true

    }
  },
  mounted() {
    this.getuserCreateScreen()
  },
  methods: {
    startBigScreen(index) {
      this.screenTable[index].active = false
    },
    showBigTitle(index) {
      this.screenTable[index].active = true
    },
    getuserCreateScreen() {
      this.loading = true
      const user_id = localStorage.getItem('id')
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'current': this.currentPage,
          'size': this.pageSize,
          'userId': user_id
        })
        getuserCreateScreen(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          if (respCode == '10000') {
            const old_data = respData.records
            const new_data = []
            old_data.forEach((item, index) => {
              new_data.push({
                id: item.id,
                name: item.bigScreenName,
                previewImgUrl: item.previewImgUrl,
                active: false
              })
            })
            this.screenTable = new_data

            this.loading = false
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    prewScreen(screenId) {
      this.$router.push({
        path: '/soc',
        query: {
          sid: screenId
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .big-screen {
    width: 100%;
    min-height: 850px;
    background-color: #fff;

    .loading-wrap {
      width: 100%;
      height: 850px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .cont {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .screen-warp {
        width: 25%;
        height: 210px;
        margin-top: 15px;
        padding-left: 7.5px;
        padding-right: 7.5px;
        position: relative;

        .add-screen-wrap {
          width: 100%;
          height: 100%;
          background-color: #1f2549;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .add-screen {}
        }

        .screen-title {

          position: absolute;
          left: 7.5px;
          bottom: 0px;
          width: calc(100% - 15px);
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          background-color: rgba(32, 38, 74, 0.8);

        }

        .handle-screen {
          position: absolute;
          left: 7.5px;
          bottom: 0px;
          width: calc(100% - 15px);
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          background-color: rgba(32, 38, 74, 0.9);
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          cursor: pointer;

        }

        img {
          width: 100%;
          height: 100%;
          // filter: blur(1px);
        }
      }
    }

  }

</style>
