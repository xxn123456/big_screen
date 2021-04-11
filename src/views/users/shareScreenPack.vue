<template>
  <div class="share-pack-wrap">
    <div class="search">
      <div class="btns">
        请选择大屏
      </div>
      <div class="btns">
        <el-select v-model="selectName.check" placeholder="请选择" @change="getRoleScreenPack">
          <el-option v-for="item in selectName.options" :key="item.index" :label="item.name" :value="item.id" />
        </el-select>

      </div>
    </div>
    <div v-show="loading" class="load">
      加载中...
    </div>
    <div v-show="!loading" class="share-pack">
      <div v-show="screen.options.length>0" class="screen-title">
        {{ screen.title }}
      </div>
      <div v-show="screen.options.length>0" class="packs">
        <div class="left">
          <el-checkbox-group v-model="screen.check" @change="showScreenCheck">
            <el-checkbox v-for="s in screen.options" :key="s.index" :label="s.packId">{{ s.packName }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="right" />

      </div>

      <div v-show="screen.options.length==0">
        请先给角色分配大屏
      </div>

    </div>
    <div v-show="!loading" class="share-pack-check">
      <div class="screen-title">
        当前选中指标项
      </div>
      <div class="packs">
        <div class="left">
          <el-tag v-for="item in TargetTags" :key="item.index">
            {{ item.packName }}
          </el-tag>

        </div>
        <div class="right">
          <el-button type="text" @click="saveRoleScreenPack">保存</el-button>
          <el-button type="text">清空</el-button>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import {
  getRoleScreen,
  getRoleScreenPack,
  saveRoleScreenPack
} from '@/api/role.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      role: {
        id: null
      },
      // 选择大屏下拉
      selectName: {
        check: '',
        options: []
      },
      screen: {
        title: '远程诊断大屏',
        check: [],
        options: []
      },
      TargetTags: [],
      loading: true
    }
  },

  mounted() {
    this.init()

    this.getRoleScreen()
  },
  methods: {
    // 获取当前角色有哪些大屏
    getRoleScreen() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          'roleId': this.role.id
        })
        getRoleScreen(msg).then((res) => {
          const {
            respData
          } = res
          this.selectName.options = respData.option

          if (respData.option.length > 0) {
            this.selectName.check = respData.option[0].id
            this.getRoleScreenPack()
          }
          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取当前该角色大屏下面拥有哪些应用
    getRoleScreenPack() {
      this.loading = true

      const msg = JSON.stringify({
        'roleId': this.role.id,
        'bigScreenId': this.selectName.check
      })
      return new Promise((resolve, reject) => {
        getRoleScreenPack(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            })
          } else {
            return false
          }
          const new_option = respData.option
          const x = []
          new_option.forEach((item, index) => {
            x.push({
              packId: item.id,
              packName: item.name
            })
          })
          this.screen.options = x
          this.screen.check = respData.check
          // ----

          let new_options_target
          const x2 = []

          const new_hasCheck = respData.check

          new_hasCheck.forEach((item, index) => {
            new_options_target = this.screen.options.filter((ele, index) => {
              return ele.packId == item
            })

            x2.push({
              'packId': new_options_target[0].packId,
              'packName': new_options_target[0].packName
            })
          })

          this.TargetTags = x2

          // ---

          this.screen.title = respData.title
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveRoleScreenPack() {
      const msg = JSON.stringify({
        'roleId': this.role.id,
        'bigScreenId': this.selectName.check,
        'check': this.screen.check
      })
      return new Promise((resolve, reject) => {
        saveRoleScreenPack(msg).then((res) => {
          const {
            respCode
          } = res
          if (respCode == '10000') {
            this.getRoleScreenPack()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    showScreenCheck(hasCheck) {
      const new_item = []
      let new_options
      const x = []

      hasCheck.forEach((item, index) => {
        new_options = this.screen.options.filter((ele, index) => {
          return ele.packId == item
        })

        x.push({
          'packId': new_options[0].packId,
          'packName': new_options[0].packName
        })
      })

      this.TargetTags = x
    },
    init() {
      this.role.id = this.$route.query.id
      this.screen.title = ''
    }
  }
}

</script>
<style scoped>
  .el-tag+.el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }

</style>

<style lang="scss">
  .share-pack-wrap {
    width: 1200px;
    min-height: 850px;
    // background-color: #fff;
    margin: 0 auto;
    border-radius: 4px;
    .load{
      width: calc(100% - 30px);
      min-height: 400px;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }

    .search {
      width: calc(100% - 30px);
      height: 80px;
      background-color: #fff;
      padding-left: 15px;
      padding-right: 15px;
      //   padding-bottom: 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .btns {
        margin-right: 15px;
      }
    }

    .share-pack {
      width: calc(100% - 30px);
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 30px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding-bottom: 30px;

      .screen-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
      }

      .packs {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 15px;

        .left {
          width: 80%;
        }

        .right {
          width: 20%;
        }
      }
    }

    .share-pack-check {
      width: calc(100% - 30px);
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 30px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding-bottom: 30px;

      .screen-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
      }

      .packs {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 15px;

        .left {
          width: 80%;
        }

        .right {
          width: 20%;
        }
      }
    }

    .many-handle {
      width: calc(100% - 30px);
      background-color: #fff;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 30px;
      text-align: center;
    }
  }

</style>
