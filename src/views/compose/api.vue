<template>
  <!-- 接口管理 -->
  <div class="api-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchApi">搜索</el-button>
      </div>
      <div class="search-main">

        <el-button type="text" icon="el-icon-back" size="big" @click="toFriend">返回上一级</el-button>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addApi" />
      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="apis">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="apiName" label="接口名称" />
        <el-table-column prop="apiUrl" label="接口url" />

        <el-table-column prop="apiProtocol" label="接口协议" />

        <el-table-column prop="ov.providerName" label="服务厂商" />

        <el-table-column prop="apiType" label="接口类型" />

        <el-table-column prop="createTime" label="添加时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="testApi(scope.row)">连接测试
            </el-button>
            <el-button size="mini" type="text" @click="editApi(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="text" @click="delApi(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1" @current-change="apiChange" />
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">

        <el-form-item label="接口名称:" :label-width="formLabelWidth">

          <el-input v-model="form.apiName" placeholder="请输入内容" />

        </el-form-item>

        <el-form-item label="服务商名称:" :label-width="formLabelWidth">
          <span>{{ form.providerName }}</span>
        </el-form-item>
        <el-form-item label="接口地址:" :label-width="formLabelWidth">

          <el-input v-model="form.apiUrl" placeholder="请输入内容" />

        </el-form-item>
        <el-form-item label="接口协议:" :label-width="formLabelWidth">
          <el-radio v-model="form.protocol.check" label="1">http</el-radio>
          <el-radio v-model="form.protocol.check" label="2">https</el-radio>
        </el-form-item>
        <el-form-item label="接口类型:" :label-width="formLabelWidth">
          <el-select v-model="form.requestType.check" placeholder="请选择">
            <el-option
              v-for="item in form.requestType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.requestType.check=='post'" label="接口参数:" :label-width="formLabelWidth">
          <el-input v-model="form.apiParameter" autosize placeholder="请输入内容" type="textarea" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="api返回结果集" :visible.sync="josnDialogFormVisible" width="33%">
      <div>
        <json-viewer :value="testJson" :expand-depth="4" copyable sort />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getApiByFriend,
  // 分页
  getApiByFriendChange,
  getAllFriend,
  testApi,
  addApi,
  queryFriendByApi,
  getFriendMsgByApi,
  editApi,
  delApi
} from '@/api/compose.js'
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    JsonViewer
  },

  data() {
    return {
      serverSearch: '',
      apis: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      dialogTitle: '',
      form: {
        apiName: '',
        apiUrl: '',
        apiParameter: '',
        api: {
          check: '',
          option: []
        },
        providerName: '',
        apiType: '',
        requestType: {
          check: '',
          options: [{
            value: 'get',
            label: 'get'
          }, {
            value: 'post',
            label: 'post'
          }]
        },
        protocol: {
          check: '1'
        }
      },
      submitState: 0,
      Fid: '',
      pageSize: 10,
      currentPage: 0,
      loading: false,
      testJson: {},
      josnDialogFormVisible: false
    }
  },
  mounted() {
    // 获取服务厂商id
    this.Fid = this.$route.query.id
    this.getApiByFriend(this.Fid)
  },
  methods: {
    toFriend() {
      this.$router.push({
        path: '/compose/data'
      })
    },
    getApiByFriend(friendId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'providerId': this.Fid,
          'pageSize': this.pageSize,
          'currentPage': this.currentPage
        })
        this.loading = true
        getApiByFriend(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
          this.apis = respData.records
          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    testApi(row) {
      return new Promise((resolve, reject) => {
        const msg = {
          'apiUrl': row.apiUrl,
          'apiType': row.apiType,
          'apiProtocol': row.apiProtocol,
          'apiParameter': row.apiParameter
        }
        testApi(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          this.josnDialogFormVisible = true

          console.log(respData)

          const new_data = JSON.parse(respData)

          console.log(new_data)

          this.testJson = new_data
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addApi() {
      this.form = {
        apiName: '',
        apiUrl: '',
        apiParameter: '',
        api: {
          check: '',
          option: []
        },
        providerName: '',
        apiType: '',
        requestType: {
          check: '',
          options: [{
            value: 'get',
            label: 'get'
          }, {
            value: 'post',
            label: 'post'
          }]
        },
        protocol: {
          check: '1'
        }
      }
      this.getFriendMsgByApi()
      this.dialogTitle = '添加api'
      this.dialogFormVisible = true
      this.submitState = 0
    },
    getFriendMsgByApi() {
      return new Promise((resolve, reject) => {
        const msg = {
          'id': this.Fid
        }
        getFriendMsgByApi(msg).then((res) => {
          const {
            respData
          } = res
          this.form.providerName = respData.providerName
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询对应厂商
    queryFriend() {
      return new Promise((resolve, reject) => {
        getAllFriend().then((res) => {
          const {
            respData
          } = res
          // console.log(res);
          this.form.api.option = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑api
    editApi(row) {
      this.queryFriendByApi(row.id)
      this.dialogTitle = '编辑api'
      this.dialogFormVisible = true
      this.queryFriend()
      this.getFriendMsgByApi()
      const new_form = Object.assign({}, row)
      this.form.id = new_form.id
      this.form.apiName = new_form.apiName
      this.form.apiUrl = new_form.apiUrl
      this.form.requestType.check = new_form.apiType
      this.form.apiParameter = new_form.apiParameter
      // 设置提交类型
      this.submitState = 1
    },
    queryFriendByApi(apiId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'id': apiId
        })
        queryFriendByApi(msg).then((res) => {
          const {
            respData
          } = res
          console.log('查询api对应服务厂商部分')
          this.form.api.check = respData.providerId
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    delApi(row) {
      this.form.id = row.id
      this.submitState = 2

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleSubmit()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            let new_httpProcol
            if (this.form.protocol.check == '1') {
              new_httpProcol = 'http'
            } else {
              new_httpProcol = 'https'
            }
            const msg = JSON.stringify({
              'apiName': this.form.apiName,
              'apiUrl': this.form.apiUrl,
              'providerId': this.Fid,
              'apiType': this.form.requestType.check,
              'apiProtocol': new_httpProcol,
              'apiParameter': this.form.apiParameter
            })
            addApi(msg).then((res) => {
              this.dialogFormVisible = false
              const {
                respData,
                respCode
              } = res
              if (respCode == '10000') {
                this.$message({
                  type: 'success',
                  message: '新增api成功!'
                })
              }
              this.getApiByFriend()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:

          return new Promise((resolve, reject) => {
            let new_httpProcol
            if (this.form.protocol.check == '1') {
              new_httpProcol = 'http'
            } else {
              new_httpProcol = 'https'
            }

            const msg = JSON.stringify({
              'id': this.form.id,
              'apiName': this.form.apiName,
              'apiUrl': this.form.apiUrl,
              'apiProtocol': new_httpProcol,
              'providerId': this.form.api.check,
              'apiType': this.form.requestType.check,
              'apiParameter': this.form.apiParameter

            })
            editApi(msg).then((res) => {
              this.dialogFormVisible = false
              this.getApiByFriend()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id
            })
            delApi(msg).then((res) => {
              const {
                respCode
              } = res
              if (respCode == '10000') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getApiByFriend()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除异常!'
                })
              }

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    apiChange(page) {
      console.log('分页')
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'providerId': this.Fid,
          'currentPage': page,
          'pageSize': this.pageSize
        })
        getApiByFriendChange(msg).then((res) => {
          const {
            respData
          } = res
          this.apis = respData.records

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchApi() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'providerId': this.Fid,
          'pageSize': this.pageSize,
          'apiName': this.serverSearch,
          'currentPage': this.currentPage
        })
        getApiByFriendChange(msg).then((res) => {
          const {
            respData
          } = res
          this.apis = respData.records

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
  .api-warp {
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
        justify-content: space-between;
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
