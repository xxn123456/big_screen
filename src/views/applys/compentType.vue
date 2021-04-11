<template>
  <div class="target-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchTargets">搜索</el-button>
      </div>
      <div class="search-main">

        <el-button type="success" icon="el-icon-plus" size="small" @click="addCompentTypes" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="targets">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />

        <el-table-column prop="compentTypeName" label="组件类别" />

        <el-table-column prop="compentType" label="组件类别名">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.compentType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="compentTypeIcon" label="组件类别url" />

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editCompentTypes(scope.row)">修改</el-button>
            <el-button type="text" @click="delCompentTypes(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="TargetsChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="组件类别名称:" :label-width="formLabelWidth">
          <el-input v-model="form.compentTypeName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="类别别名:" :label-width="formLabelWidth">
          <el-input v-model="form.compentType" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组件类别url:" :label-width="formLabelWidth">
          <el-input v-model="form.compentTypeIcon" autocomplete="off" />
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
  getCompentTypes,
  addCompentTypes,
  editCompentTypes,
  delCompentTypes
} from '@/api/compent.js'
export default {
  data() {
    return {
      serverSearch: '',
      targets: [{
        id: '1',
        targetType: '折线图'

      }, {
        id: '2',
        targetType: '柱状图'
      }

      ],
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '120px',
      form: {

        targetType: ''
      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false

    }
  },
  mounted() {
    this.getCompentTypes()
  },
  methods: {

    //  获取所有组件分类

    getCompentTypes() {
      const msg = JSON.stringify({
        'currentPage': this.currentPage,
        'pageSize': 10
      })
      this.loading = true
      return new Promise((resolve, reject) => {
        getCompentTypes(msg).then((res) => {
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
          console.log(res)
          this.targets = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加指标归类
    addCompentTypes() {
      this.dialogTitle = '添加组件类别'
      this.dialogFormVisible = true
      this.form = {}
      this.submitState = 0
    },
    editCompentTypes(row) {
      this.dialogTitle = '修改组件类别'

      this.dialogFormVisible = true
      this.form = Object.assign({}, row)

      this.submitState = 1
    },
    delCompentTypes(row) {
      this.form = {}
      this.form.id = row.id
      this.submitState = 2
      this.submitHandle()
    },
    submitHandle() {
      switch (this.submitState) {
        // 新增角色
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            addCompentTypes(msg).then((res) => {
              this.dialogFormVisible = false
              this.getCompentTypes()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            editCompentTypes(msg).then((res) => {
              this.dialogFormVisible = false
              this.getCompentTypes()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            delCompentTypes(msg).then((res) => {
              this.getCompentTypes()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    TargetsChange(page) {
      this.currentPage = page
      this.getCompentTypes()
    },
    searchTargets() {
      const msg = JSON.stringify({
        'currentPage': this.currentPage,
        'pageSize': this.pageSize,
        'compentTypeName': this.serverSearch
      })
      return new Promise((resolve, reject) => {
        getCompentTypes(msg).then((res) => {
          const {
            respData
          } = res
          this.targets = respData.records

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
