<template>
  <div class="target-warp">
    <!-- 指标项管理 -->

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">

        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-select v-model="searchTargetType.check" placeholder="指标类别" style="width:120px;">
          <el-option v-for="item in searchTargetType.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-cascader v-model="searchDimension.check" :options="searchDimension.options" placeholder="选择维度" />

        <el-autocomplete
          v-model="form.source.state"
          class="inline-input"
          :fetch-suggestions="sourceRule"
          placeholder="数据源名称"
          @select="querySearchSource"
        />

        <el-button type="primary" icon="el-icon-search" @click="searchTarget">搜索</el-button>
      </div>
      <div class="search-main">
        <div />

        <el-button type="success" icon="el-icon-plus" size="small" @click="addTarget" />
      </div>

    </div>

    <div class="cont">
      <!-- api 展示表格 -->
      <el-table v-show="tab==1" v-loading="loading" :data="targets">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />
        <el-table-column prop="indicatorName" label="指标名称" />

        <el-table-column prop="viewName" label="简称" />

        <el-table-column prop="ov.indicatorType" label="指标类别" />

        <el-table-column prop="ov.dimensionId" label="维度信息" />

        <el-table-column prop="ov.datasource.databaseName" label="数据源名称" />

        <el-table-column prop="indicatorUnit" label="单位" />

        <el-table-column prop="querySql" label="sql语句" />

        <el-table-column prop="inputType" label="数据接入类型">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.ov.datasource.datasourceType==0"><i>第三方api</i></span>

              <span v-else>数据库</span>

            </div>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editTarget(scope.row)">修改</el-button>
            <el-button type="text" @click="delTarget(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- sql 展示表格 -->

    </div>

    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="changeTarget" />
    </div>

    <!-- 新版指标项管理 -->

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="指标项名称:" :label-width="formLabelWidth">
          <el-input v-model="form.indicatorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="简称:" :label-width="formLabelWidth">
          <el-input v-model="form.viewName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="指标分类:" :label-width="formLabelWidth">
          <el-select v-model="form.targetItemType.check" placeholder="请选择">
            <el-option
              v-for="item in form.targetItemType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维度:" :label-width="formLabelWidth">
          <el-cascader v-model="form.indicatorItem.check" :options="form.indicatorItem.options" />
        </el-form-item>

        <el-form-item label="数据源:" :label-width="formLabelWidth">

          <el-autocomplete
            v-model="form.source.state"
            class="inline-input"
            :fetch-suggestions="sourceRule"
            placeholder="请输入内容"
            @select="handleSearchSearch"
            @blur="querySource(form.source.state)"
          />
        </el-form-item>

        <el-form-item label="指标单位:" :label-width="formLabelWidth">
          <el-input v-model="form.indicatorUnit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="sql脚本:" :label-width="formLabelWidth">
          <el-input v-model="form.querySql" type="textarea" :rows="5" placeholder="请输入内容" />
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
  getTarget,
  addTarget,
  editTarget,
  delTarget,
  getDimensionById,
  getTargetType
  // 用于查询api 厂商数据
} from '@/api/target.js'
import {
  querySource,
  queryDimension
} from '@/api/source.js'
import querystring from 'querystring'
import api from '../../resource/api'
export default {
  data() {
    return {
      serverSearch: '',
      searchTargetType: {
        check: '',
        options: [

        ]
      },
      searchDimension: {
        check: [],
        options: [

        ]
      },
      serverSoure: {
        restaurants: [],
        state: '',
        id: ''
      },
      targets: [],
      active: {
        api: 'primary',
        sql: 'text'
      },
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '120px',
      form: {
        id: null,
        indicatorName: '',
        viewName: '',
        targetItemType: {
          check: '',
          options: [{
            value: '',
            label: ''
          }]
        },
        source: {
          restaurants: [],
          state: '',
          id: ''
        },
        indicatorItem: {
          check: [],
          options: [{
            value: '1',
            label: '时间维度',
            children: [{
              value: '11',
              label: '按天统计'
            },
            {
              value: '11',
              label: '按月统计'
            }
            ]
          },
          {
            value: '2',
            label: '地理维度'
          }

          ]
        },
        indicatorUnit: '',
        querySql: ''

      },
      radio: '1',
      // tab 为1 就是api 指标 否则就是 sql 指标
      tab: 1,
      queryType: '',
      submitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false

    }
  },
  mounted() {
    // 查询对应指标项
    this.getTarget()
    // 查询对应数据源
    this.querySource()
    // 查询所有维度
    this.queryDimension()
    // 查询所有指标归类
    this.getTargetType()
  },
  methods: {
    querySearchSource(item) {
      console.log(item)
      this.serverSoure.id = item.id
    },
    changeTableTab(num) {
      //  动态切换表格
      this.tab = num
      this.getTarget()
      if (this.tab == 1) {
        this.active = {
          api: 'primary',
          sql: 'text'
        }
      } else {
        this.active = {
          api: 'text',
          sql: 'primary'
        }
      }
    },
    // 获取表格信息
    getTarget() {
      const msg = JSON.stringify({
        current: this.currentPage,
        size: this.pageSize
      })
      this.loading = true
      return new Promise((resolve, reject) => {
        getTarget(msg).then((res) => {
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
          this.targets = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    sourceRule(queryString, cb) {
      var restaurants = this.form.source.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 处理联想搜索
    handleSearchSearch(item) {
      this.form.source.id = item.id
    },
    addTarget() {
      this.dialogTitle = '添加指标项'
      // 查询所有数据源
      this.querySource()
      // 查询所有维度
      this.queryDimension()
      // 查询所有指标归类
      this.getTargetType()
      this.dialogFormVisible = true
      this.queryType = ''
      this.form = {
        id: null,
        indicatorName: '',
        indicatorUnit: '',
        viewName: '',
        targetItemType: {
          check: '',
          options: [{
            value: '',
            label: ''
          }]
        },
        source: {
          restaurants: [],
          state: '',
          id: ''
        },
        indicatorItem: {
          check: [],
          options: []
        },
        indicatorUnit: '',
        querySql: ''

      }
      // this.queryTargetByItem();
      // this.queryFriendByTarget();
      // this.queryAllMenu();
      // this.queryAllFriend();
      this.submitState = 0
    },
    // 查询对应数据来源
    querySource(souerName) {
      return new Promise((resolve, reject) => {
        querySource().then((res) => {
          console.log(res)
          const {
            respData
          } = res
          const new_restaurants = []
          respData.forEach(function(item, index) {
            new_restaurants.push({
              'id': item.id,
              'value': item.datasourceName
            })
          })
          this.form.source.restaurants = new_restaurants
          this.serverSoure.restaurants = new_restaurants

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryDimension() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          id: ''
        })
        getDimensionById(msg).then((res) => {
          const {
            respData
          } = res

          this.form.indicatorItem.options = respData.respData.options
          this.searchDimension.options = respData.respData.options

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有指标分类
    getTargetType() {
      return new Promise((resolve, reject) => {
        getTargetType().then((res) => {
          const {
            respData
          } = res

          const new_type = []

          respData.forEach((item, index) => {
            new_type.push({
              value: item.id,
              label: item.name
            })
          })
          // 填写弹窗 指标分类
          this.form.targetItemType.options = new_type
          //  填写搜素输入框 指标类别
          this.searchTargetType.options = new_type

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    queryAllFriend() {
      return new Promise((resolve, reject) => {
        queryAllFriend().then((res) => {
          const {
            respData
          } = res
          this.form.friend.option = respData.option
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    editTarget(row) {
      this.dialogTitle = '修改指标'
      this.dialogFormVisible = true
      this.queryType = row.id
      const new_form = Object.assign({}, row)

      this.form.id = new_form.id
      // 指标名称
      this.form.indicatorName = new_form.indicatorName
      // 指标简称
      this.form.viewName = new_form.viewName
      // 指标类型
      this.form.targetItemType.check = new_form.indicatorType
      // 查询所有指标项
      this.getTargetType()
      // 查询所有维度
      this.queryDimension()
      // 当前维度
      this.form.indicatorItem.check = new_form.ov.dimensionArr

      // 数据源
      this.form.source.state = new_form.ov.datasourceId
      this.form.source.id = new_form.datasourceId
      // 指标单位

      this.form.indicatorUnit = new_form.indicatorUnit
      // sql 语句

      this.form.querySql = new_form.querySql

      this.submitState = 1
    },
    delTarget(id) {
      this.form.id = id
      this.submitState = 2
      this.handleSubmit()
    },

    handleSubmit() {
      switch (this.submitState) {
        case 0:
          const new_indicatorItem = this.form.indicatorItem.check
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              // 指标名称
              'indicatorName': this.form.indicatorName,
              // 简称
              'viewName': this.form.viewName,
              // 指标类别
              'indicatorType': this.form.targetItemType.check,
              // 指标维度
              'dimensionId': new_indicatorItem[new_indicatorItem.length - 1],
              //  数据源id
              'datasourceId': this.form.source.id,
              // 指标单位
              'indicatorUnit': this.form.indicatorUnit,
              // 执行sql 语句
              'querySql': this.form.querySql
            })

            addTarget(msg).then((res) => {
              this.dialogFormVisible = false
              this.getTarget()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          return new Promise((resolve, reject) => {
            const new_indicatorItem = this.form.indicatorItem.check
            const msg = JSON.stringify({
              'id': this.form.id,
              'indicatorName': this.form.indicatorName,
              // 简称
              'viewName': this.form.viewName,
              // 指标类别
              'indicatorType': this.form.targetItemType.check,
              // 指标维度
              'dimensionId': new_indicatorItem[new_indicatorItem.length - 1],
              //  数据源id
              'datasourceId': this.form.source.id,
              // 指标单位
              'indicatorUnit': this.form.indicatorUnit,
              // 执行sql 语句
              'querySql': this.form.querySql
            })
            editTarget(msg).then((res) => {
              const {
                respData
              } = res
              this.dialogFormVisible = false
              this.getTarget()
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
            delTarget(msg).then((res) => {
              this.getTarget()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    // 分页
    changeTarget(page) {
      const msg = JSON.stringify({
        'currentPage': page,
        'pageSize': this.pageSize,
        'inputType': this.tab
      })
      this.loading = true
      return new Promise((resolve, reject) => {
        getTarget(msg).then((res) => {
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
          this.targets = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchTarget() {
      const dis = this.searchDimension.check

      const msg = JSON.stringify({
        // 指标名称
        'indicatorName': this.serverSearch,
        // 指标类别
        'indicatorType': this.searchTargetType.check,
        // 维度id
        'dimensionId': dis[dis.length - 1],
        // 数据源id
        'datasourceId': this.serverSoure.id,
        'current': this.currentPage,
        'size': this.pageSize
      })
      return new Promise((resolve, reject) => {
        getTarget(msg).then((res) => {
          const {
            respData
          } = res
          this.targets = respData.records
          this.total = respData.total

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
