<template>
  <div class="menu-board">
    <div class="mark">
      <el-badge :value="mark" class="item">
        <el-button size="small" type="primary" plain @click="toMark">订阅应用</el-button>
      </el-badge>
    </div>
    <component :is="pcMb" />
  </div>
</template>
<script>
import BoardOne from '@/views/board/boardOne.vue'
import BoardList from '@/views/board/boardList.vue'
import boardListPrew from '@/views/board/boardListPrew.vue'
import {
  mapState
} from 'vuex'
import {
  queryUserMenuApplyNum,
  getUserLayout
} from '@/api/user.js'
export default {
  components: {
    BoardOne,
    BoardList,
    boardListPrew
  },
  data() {
    return {
      pcMb: 'board-list-prew',
      mark: 0,
      userId: ''
    }
  },
  computed: {
    ...mapState({
      menuId: state => state.tagsView.menuId,
      layout: state => state.user.layout

    })
  },
  mounted() {
    this.userId = localStorage.getItem('id')
    this.getMark()
    this.getUserLayout()
  },
  methods: {
    toMark() {
      this.$router.push({
        path: '/packBoard',
        // 传递参数到
        query: {
          userId: this.userId,
          menuId: this.menuId
        }
      })
    },
    getMark() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'userId': this.userId,
          'menuId': this.menuId
        })
        queryUserMenuApplyNum(msg).then((res) => {
          // 用户发布的应用
          const {
            respData
          } = res

          this.mark = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserLayout() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'userId': this.userId,
          'menuId': this.menuId
        })
        getUserLayout(msg).then((res) => {
          const {
            respData
          } = res

          this.$store.dispatch('user/setLayout', respData)
          // console.log("判断布局是否为空");

          if (this.layout.length == 0) {
            this.$message({
              message: '暂无订阅数据,前往订阅进行布局分配',
              type: 'warning'
            })
          }

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .menu-board {
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    padding-top: 10px;
    height: 100%;
    margin: 0 auto;

    .mark {
      width: calc(100% - 15px);
      height: 40px;
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin: 0 auto;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }

</style>
