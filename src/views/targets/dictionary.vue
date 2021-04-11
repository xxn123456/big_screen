<template>
  <div class="target-warp">

    <div class="table-mh">
      <!-- <span><i class="el-icon-tickets"></i> 数据列表</span> -->
      <div class="search" />
      <div class="search-main">
        <el-button type="primary" size="small" @click="addDimension">添加维度</el-button>

      </div>

    </div>
    <div class="cont">
      <!-- 新版结构 -->

      <el-table v-loading="loading" :data="dictionarys" row-key="id" default-expand-all :tree-props="{children: 'childDicDimensionList', hasChildren: 'hasChildren'}">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column type="index">
        </el-table-column> -->

        <el-table-column prop="dimensionName" label="维度名称" />

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="修改时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.parentId!=0" @click="addChidrenDimension(scope.row)">添加下级维度</el-button>
            <el-button type="text" @click="editDictionary(scope.row)">修改</el-button>
            <el-button type="text" @click="delDictionary(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 老版结构 -->
      <!-- <el-table :data="dictionarys" v-loading="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="dimensionName" label="维度">

        </el-table-column>
        <el-table-column prop="targetType" label="下级指标项">
          <template slot-scope="scope">

            <el-button type="text" @click="seeTargetItem(scope.row.id)">查看</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editDictionary(scope.row)">修改</el-button>
            <el-button type="text" @click="delDictionary(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table> -->

    </div>
    <div class="page">
      <!-- 分页处理 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="total" @current-change="dictionaryChange">
      </el-pagination> -->
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="维度名称:" :label-width="formLabelWidth">
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
        id: '',
        dimensionName: '',
        parentId: 0
      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [{
        ID: 3,
        DIMENSION_NAME: '时间维度',
        CREATE_TIME: '2020-7-6',
        UPDATE_TIME: '2020-7-9',
        children: [{
          ID: 31,
          DIMENSION_NAME: '按年统计',
          CREATE_TIME: '2020-7-6',
          UPDATE_TIME: '2020-7-9'
        }, {
          ID: 32,
          DIMENSION_NAME: '按月统计',
          CREATE_TIME: '2020-7-6',
          UPDATE_TIME: '2020-7-9'
        }, {
          ID: 33,
          DIMENSION_NAME: '按日统计',
          CREATE_TIME: '2020-7-6',
          UPDATE_TIME: '2020-7-9'
        }]
      }]
    }
  },
  mounted() {
    this.getDictionarys()
  },
  methods: {
    getDictionarys() {
      return new Promise((resolve, reject) => {
        this.loading = true
        getDictionarys().then((res) => {
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
          this.dictionarys = respData
          // this.total = respData.total;

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addDimension() {
      this.dialogTitle = '添加维度'
      this.dialogFormVisible = true
      this.form = {
        dimensionName: '',
        parentId: 0
      }
      this.submitState = 0
    },
    addChidrenDimension(row) {
      const new_form = Object.assign({}, row)
      this.dialogFormVisible = true
      this.form = {
        dimensionName: '',
        parentId: new_form.id
      }
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
          // 添加维度
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
