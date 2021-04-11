<template>
  <div class="target-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchTargetType">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addTargetType" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="dictionarys">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />
        <el-table-column prop="name" label="指标类名称" />

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="editTargetType(scope.row)">修改</el-button>
            <el-button type="text" @click="delTargetType(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="TargetTypeChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="指标类名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
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
  getTargetType,
  addTargetType,
  editTargetType,
  delTargetType
} from '@/api/targetType.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      serverSearch: '',
      dictionarys: [],
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '100px',
      form: {
        id: '',
        name: ''
      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getTargetType()
  },
  methods: {
    getTargetType() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          current: this.currentPage,
          size: this.pageSize
        })
        this.loading = true
        getTargetType(msg).then((res) => {
          console.log(res)
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
    addTargetType() {
      this.dialogTitle = '添加指标'
      this.dialogFormVisible = true
      this.form = {
        name: ''
      }
      this.submitState = 0
    },

    editTargetType(row) {
      this.dialogTitle = '修改指标类'
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
      this.submitState = 1
    },
    delTargetType(row) {
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
            addTargetType(msg).then((res) => {
              this.dialogFormVisible = false
              this.getTargetType()
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
            editTargetType(msg).then((res) => {
              this.dialogFormVisible = false
              this.getTargetType()
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
            delTargetType(msg).then((res) => {
              this.dialogFormVisible = false
              this.getTargetType()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    searchTargetType() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          searchName: this.serverSearch,
          current: this.currentPage,
          size: this.pageSize
        })
        getTargetType(msg).then((res) => {
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
    TargetTypeChange(page) {
      this.currentPage = page
      this.getTargetType()
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
