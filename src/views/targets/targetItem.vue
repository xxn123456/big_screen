<template>
  <div class="target-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchTargetItem">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addTargetItem" />
      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="targetItems">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />
        <el-table-column prop="targetItemName" label="指标项名称" />

        <el-table-column prop="ov.targetType" label="归类" />

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editTargetItem(scope.row)">修改</el-button>
            <el-button type="text" @click="delTargetItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="targetItemChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="form.targetItemName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="字典维度:" :label-width="formLabelWidth">
          <el-select v-model="form.dimension.check" placeholder="请选择">
            <el-option
              v-for="item in form.dimension.option"
              :key="item.dimensionName"
              :label="item.dimensionName"
              :value="item.id"
            />
          </el-select>
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
  getTargetItemByDid,
  getTargetItem,
  addTargetItem,
  queryDimension,
  editTargetItem,
  queryDimensionByTarget,
  delTargetItem
} from '@/api/target.js'
export default {
  data() {
    return {
      serverSearch: '',
      targetItems: [],
      // 弹窗相关字段
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '120px',
      form: {
        targetItemName: '',
        dimension: {
          check: '',
          option: []
        }
      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Did: '',
      loading: false

    }
  },
  mounted() {
    // this.getTargetItems();
    const friendId = this.$route.query.id

    this.Did = this.$route.query.id

    this.getTargetItemByDid()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    // 添加指标
    addTargetItem() {
      this.dialogTitle = '添加指标项'
      this.dialogFormVisible = true
      this.queryDimension()
      this.submitState = 0
    },

    // 获取指标项目
    getTargetItems() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        })
        getTargetItem(msg).then((res) => {
          const {
            respData
          } = res

          this.targetItems = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTargetItemByDid() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'dimensionId': this.Did,
          'pageSize': this.pageSize,
          'currentPage': this.currentPage
        })
        this.loading = true
        getTargetItemByDid(msg).then((res) => {
          const {
            respData,
            respCode
          } = res
          if (respCode == '10000') {
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
          this.targetItems = respData.records
          this.total = respData.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryDimension() {
      // queryDimension
      return new Promise((resolve, reject) => {
        queryDimension().then((res) => {
          const {
            respData
          } = res
          this.form.dimension.option = respData
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改指标项
    editTargetItem(row) {
      this.dialogTitle = '修改指标项'
      this.dialogFormVisible = true
      const new_form = Object.assign({}, row)

      this.form.targetItemName = new_form.targetItemName
      this.form.id = new_form.id
      this.queryDimension()
      this.queryDimensionByTarget(row.id)
      // 查询所有维度
      this.submitState = 1
    },
    queryDimensionByTarget(targetId) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'id': targetId
        })
        queryDimensionByTarget(msg).then((res) => {
          const {
            respData
          } = res

          // 查询指标项对应的维度
          this.form.dimension.check = respData.dimensionId
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    delTargetItem(row) {
      this.form.id = row.id
      this.submitState = 2
      this.handleSubmit()
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id,
              'targetItemName': this.form.targetItemName,
              'dimensionId': this.form.dimension.check
            })
            addTargetItem(msg).then((res) => {
              const {
                respData
              } = res
              this.targetItems = respData.records
              this.getTargetItems()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id,
              'targetItemName': this.form.targetItemName,
              'dimensionId': this.form.dimension.check
            })
            editTargetItem(msg).then((res) => {
              this.getTargetItems()
              console.log('修改成功')
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
            delTargetItem(msg).then((res) => {
              this.getTargetItems()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    // 分页模块
    targetItemChange(page) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': page,
          'pageSize': this.pageSize
        })
        getTargetItem(msg).then((res) => {
          const {
            respData
          } = res
          this.targetItems = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchTargetItem() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'targetItemName': this.serverSearch
        })
        getTargetItem(msg).then((res) => {
          const {
            respData
          } = res
          this.targetItems = respData.records
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
