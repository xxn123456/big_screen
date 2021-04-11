<template>
  <!-- 分配应用到大屏 -->
  <div class="frend-warp">
    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 远程诊断大屏应用分配</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchfriend">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addFriend" />
      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="friends">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="providerName" label="服务商名称" />

        <el-table-column prop="createTime" label="添加时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="修改时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editFriend(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="text" @click="delFriend(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="friendsChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">

        <el-form-item label="服务商名称" :label-width="formLabelWidth">

          <el-input v-model="form.providerName" placeholder="请输入内容" />

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getFriends,
  addFriend,
  editFriend,
  delFriend
} from '@/api/compose.js'
export default {

  data() {
    return {
      serverSearch: '',
      friends: [],
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '100px',
      form: {
        id: '',
        providerName: ''
      },
      submitState: 0,
      currentPage: 0,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getFriends()
  },
  methods: {

    getFriends() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        })
        this.loading = true
        getFriends(msg).then((res) => {
          const {
            respData,
            respCode
          } = res

          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            return false
          }
          this.friends = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addFriend() {
      this.form = {}
      this.dialogTitle = '添加服务商'
      this.dialogFormVisible = true
      this.submitState = 0
    },
    editFriend(row) {
      this.dialogTitle = '修改服务商'
      this.dialogFormVisible = true
      this.submitState = 1
      this.form = Object.assign({}, row)
    },
    delFriend(row) {
      this.form = {},
      this.form.id = row.id
      this.submitState = 2
      this.submitHandle()
    },
    lookApi(row) {
      this.$router.push({
        path: '/compose/dataApi',
        query: {
          id: row.id
        }
      })
    },
    submitHandle() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            addFriend(msg).then((res) => {
              console.log('添加成功')
              this.dialogFormVisible = false
              this.getFriends()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            editFriend(msg).then((res) => {
              console.log('修改成功')
              this.dialogFormVisible = false
              this.getFriends()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            delFriend(msg).then((res) => {
              console.log('删除成功')
              this.dialogFormVisible = false
              this.getFriends()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    friendsChange(page) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': page,
          'pageSize': this.pageSize
        })
        getFriends(msg).then((res) => {
          const {
            respData
          } = res
          this.friends = respData.records

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchfriend() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'providerName': this.serverSearch
        })
        getFriends(msg).then((res) => {
          const {
            respData
          } = res
          this.friends = respData.records

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
  .frend-warp {
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    background-color: #fff;

    .table-mh {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .search {
        min-width: 400px;
        text-align: right;
        overflow: hidden;
      }

      .search-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
      }

    }

    .cont {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      .handle-btn {
        color: #1890ff;
      }
    }

    .page {
      height: 100px;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

</style>
