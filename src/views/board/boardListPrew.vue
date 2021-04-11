<template>
  <!-- 预览界面 -->

  <div class="board-one">
    <div v-for="item in userLayout.container" :key="item.index" class="three-chart">
      <component :is="item.ov.compent.compentPath" :option="item.compentOption" />

    </div>
  </div>

</template>
<script>
import draggable from 'vuedraggable'
import {
  mapState
} from 'vuex'
export default {
  components: {
    draggable
  },
  data() {
    return {
      userLayout: {
        container: [],
        containerOption: {
          animation: 150,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        }
      },
      // 操作窗展示块
      cont: null
    }
  },
  computed: {
    // asy.vue 接受到路由变化会请求接收到相应layout 结构
    ...mapState({
      layout: state => state.user.layout // 理解为传入state对象，修改state.count属性
    })
  },
  watch: {
    layout() {
      this.userLayout.container = this.layout
    }
  }

}

</script>
<style lang="scss" scoped>
  .board-one {
    width: 100%;
    min-height: 100vh;
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // overflow: hidden;

    // 重新填写的样式
    .three-chart {
      width: calc(33.3% - 15px);
      height: 314px;
      background-color: #fff;
      margin-left: 7.5px;
      margin-right: 7.5px;
      margin-bottom: 15px;
      float: left;
      position: relative;

      .handle-btns {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

    }

  }

</style>
