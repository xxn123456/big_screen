<template>
  <!-- 模板一 -->
  <draggable
    v-model="userLayout.container"
    class="board-one"
    element="div"
    :options="userLayout.containerOption"
    @change="dragChange"
  >

    <div
      v-for="(item,index) in userLayout.container"
      :key="item.index"
      class="three-chart"
      @mouseenter="showApplyHandle(index)"
      @mouseleave="closeApplyHandle(index)"
    >
      <component :is="item.ov.compent.compentPath" :option="item.compentOption" />
      <div v-show="cont==index" class="handle-btns">
        <el-button type="danger" icon="el-icon-delete" circle @click="delApply(index)" />
      </div>
    </div>

  </draggable>

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
    ...mapState({
      layout: state => state.user.layout // 理解为传入state对象，修改state.count属性
    })

  },
  watch: {
    layout() {
      console.log('布局发生改变')
      this.userLayout.container = this.layout
      this.$store.dispatch('user/setLayout', this.userLayout.container)
    }
  },
  methods: {
    showApplyHandle(index) {
      this.cont = index
    },
    closeApplyHandle(index) {
      this.cont = null
    },
    // 界面发生变化传递界面值
    dragChange() {
      console.log('界面发生变化')
      this.$store.dispatch('user/setLayout', this.userLayout.container)
    },
    // 删除布局中的应用
    delApply(index) {
      console.log(index)
      this.userLayout.container.splice(index, 1)
      this.$store.dispatch('user/setLayout', this.userLayout.container)
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
