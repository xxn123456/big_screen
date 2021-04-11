<template>
  <div class="target-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchDimension">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addDimension" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="dictionarys">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />
        <el-table-column prop="dimensionName" label="维度" />
        <el-table-column prop="targetType" label="下级指标项">
          <template slot-scope="scope">
            <!-- 传递维度id -->
            <el-button type="text" @click="seeTargetItem(scope.row.id)">查看</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editDictionary(scope.row)">修改</el-button>
            <el-button type="text" @click="delDictionary(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="dictionaryChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="form.dimensionName" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getDictionarys,
  addDictionarys,
  editDictionary,
  delDictionary
} from '@/api/dictionary.js'
export default {
  data() {
    return {
      serverSearch: '',
      dictionarys: [],
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '100px',
      form: {

      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getDictionarys()
  },
  methods: {
    getDictionarys() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        })
        this.loading = true
        getDictionarys(msg).then((res) => {
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
          this.dictionarys = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addDimension() {
      this.dialogTitle = '添加维度字典'
      this.dialogFormVisible = true
      this.form = {}
      this.submitState = 0
    },
    editDictionary(row) {
      this.dialogTitle = '修改维度字典'
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
      this.submitState = 1
    },
    delDictionary(row) {
      this.form.id = row.id
      this.submitState = 2
      this.handleSubmit()
    },
    seeTargetItem(dictionaryId) {
      this.$router.push({
        path: '/target/item',
        query: {
          id: dictionaryId
        }
      })
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            addDictionarys(msg).then((res) => {
              this.dialogFormVisible = false
              this.getDictionarys()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          //  修改维度
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            editDictionary(msg).then((res) => {
              this.dialogFormVisible = false
              this.getDictionarys()
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
            delDictionary(msg).then((res) => {
              this.dialogFormVisible = false
              this.getDictionarys()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    searchDimension() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'dimensionName': this.serverSearch
        })
        getDictionarys(msg).then((res) => {
          const {
            respData
          } = res
          this.dictionarys = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分页
    dictionaryChange(page) {
      this.currentPage = page
      this.getDictionarys()
    }

  }

}

</script>
<style lang="scss" scoped>
  .target-warp {
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
