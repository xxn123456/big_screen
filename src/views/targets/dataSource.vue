<template>
  <div class="target-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入数据源名称" style="width:200px;" />

        <el-select v-model="searchSourceType.check" placeholder="类型" style="width:120px;">
          <el-option v-for="item in searchSourceType.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-autocomplete
          v-model="searchSourceProvider.state"
          class="inline-input"
          :fetch-suggestions="sourceRule"
          placeholder="请输入服务厂商"
          @select="handleSearch"
        />

        <el-button type="primary" icon="el-icon-search" @click="searchSource">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addSource" />

      </div>

    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="source">
        <el-table-column type="selection" width="55" />

        <el-table-column prop="datasourceName" label="数据源名称" />

        <el-table-column prop="ov.providerId" label="服务商名称" />

        <el-table-column type="expand">

          <template slot-scope="props">
            <!-- api 扩展模块 -->
            <el-form v-if="props.row.datasourceType==0" label-position="left" inline class="demo-table-expand">
              <el-form-item label="api名称:">
                <span>{{ props.row.apiName }}</span>
              </el-form-item>
              <el-form-item label="api路径:">
                <span>{{ props.row.apiUrl }}</span>
              </el-form-item>
              <el-form-item label="api协议:">
                <span>{{ props.row.apiProtocol }}</span>
              </el-form-item>

              <el-form-item label="api请求方法:">
                <span>{{ props.row.apiMethod }}</span>
              </el-form-item>
              <el-form-item label="api携带参数:">
                <span>{{ props.row.apiParameter }}</span>
              </el-form-item>
            </el-form>
            <!-- 数据库扩展模块 -->
            <el-form v-else label-position="left" inline class="demo-table-expand">
              <el-form-item label="数据库名称:">
                <span>{{ props.row.databaseName }}</span>
              </el-form-item>
              <el-form-item label="数据库类型:">
                <span>{{ props.row.databaseType }}</span>
              </el-form-item>
              <el-form-item label="数据库地址:">
                <span>{{ props.row.databaseUrl }}</span>
              </el-form-item>
              <el-form-item label="数据用户名:">
                <span>{{ props.row.databaseName }}</span>
              </el-form-item>
              <el-form-item label="数据库密码:">
                <span>{{ props.row.databasePassword }}</span>
              </el-form-item>
              <el-form-item label="数据库连接表名:">
                <span>{{ props.row.databaseTable }}</span>
              </el-form-item>
            </el-form>
          </template>

        </el-table-column>

        <el-table-column label="数据源类型" prop="datasourceType" />

        <el-table-column prop="call_Frequency" label="调用频率" />

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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%" top="50px">
      <el-form :model="form">

        <el-form-item label="数据源名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />

        </el-form-item>

        <el-form-item label="服务厂商:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="form.provider.state"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          />
        </el-form-item>

        <el-form-item label="数据源类型:" :label-width="formLabelWidth">
          <el-radio v-model="form.inputType" :label="0" @change="changeinputType">第三方api</el-radio>
          <el-radio v-model="form.inputType" :label="1" @change="changeinputType">数据库连接</el-radio>
        </el-form-item>

        <!-- 输入api信息 -->
        <el-form-item v-show="form.inputType==0" label="api名称:" :label-width="formLabelWidth">
          <el-input v-model="form.api.name" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="form.inputType==0" label="api路径:" :label-width="formLabelWidth">
          <el-input v-model="form.api.url" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="form.inputType==0" label="api方法:" :label-width="formLabelWidth">
          <el-radio v-model="form.api.method" :label="1">get</el-radio>
          <el-radio v-model="form.api.method" :label="2">post</el-radio>
        </el-form-item>

        <el-form-item v-show="form.inputType==0" label="api协议:" :label-width="formLabelWidth">
          <el-radio v-model="form.api.agree" :label="1">http</el-radio>
          <el-radio v-model="form.api.agree" :label="2">https</el-radio>
        </el-form-item>

        <el-form-item v-show="form.inputType==0" label="api参数:" :label-width="formLabelWidth">
          <el-input v-model="form.api.dataArgument" type="textarea" :rows="6" autocomplete="off" />
        </el-form-item>
        <!-- 输入数据库信息 -->

        <el-form-item v-show="form.inputType==1" label="数据库名称:" :label-width="formLabelWidth">
          <el-input v-model="form.source.name" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="form.inputType==1" label="数据库路径:" :label-width="formLabelWidth">
          <el-input v-model="form.source.url" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="form.inputType==1" label="数据库类型:" :label-width="formLabelWidth">
          <el-select v-model="form.source.type.check" placeholder="">
            <el-option
              v-for="item in form.source.type.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-show="form.inputType==1" label="数据库登录名:" :label-width="formLabelWidth">
          <el-input v-model="form.source.username" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="form.inputType==1" label="数据库密码:" :label-width="formLabelWidth">
          <el-input v-model="form.source.password" autocomplete="off" show-password />
        </el-form-item>

        <el-form-item v-show="form.inputType==1" label="连接测试:" :label-width="formLabelWidth">
          <el-button type="text" icon="el-icon-close">连接</el-button>
        </el-form-item>
        <el-form-item v-show="form.inputType==1" label="数据库表名:" :label-width="formLabelWidth">
          <el-input v-model="form.source.tableName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="调用频率:" :label-width="formLabelWidth">
          <el-cascader v-model="form.requestNum.check" :options="form.requestNum.options" />
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
  getSource,
  addSource,
  editSource,
  delSource,
  queryProvider
} from '@/api/source.js'
import querystring from 'querystring'
export default {
  data() {
    return {
      serverSearch: '',
      searchSourceType: {
        check: '',
        options: [{
          value: '0',
          label: 'api'
        },
        {
          value: '1',
          label: '数据库'
        }
        ]
      },
      searchSourceProvider: {
        restaurants: [],
        state: '',
        id: ''
      },
      source: [],
      dictionarys: [],
      dialogFormVisible: false,
      dialogTitle: '',
      formLabelWidth: '120px',
      form: {
        id: '',
        name: '',
        inputType: 0,
        provider: {
          restaurants: [],
          state: '',
          id: ''
        },
        api: {
          name: '',
          url: '',
          method: 1,
          agree: 1,
          dataArgument: ''
        },
        source: {
          name: '',
          url: '',
          type: {
            check: '1',
            options: [{
              value: '1',
              label: 'mysql数据库'
            },
            {
              value: '2',
              label: 'oracle数据库'
            }
            ]
          },
          username: '',
          password: '',
          tableName: ''

        },
        requestNum: {
          check: [],
          options: [{
            value: '1',
            label: '手动'
          },
          {
            value: '2',
            label: '自动',
            children: [{
              value: '21',
              label: '5秒'
            },
            {
              value: '24',
              label: '每天'
            },
            {
              value: '22',
              label: '每周'
            },
            {
              value: '22',
              label: '每月'
            }
            ]
          }

          ]
        }

      },
      subsmitState: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    // 查询数据源
    this.getSource()
    // 查询默认服务商
    this.queryProvider()
  },
  methods: {
    sourceRule(queryString, cb) {
      var restaurants = this.form.provider.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    // 处理联想搜索
    handleSearch(item) {
      this.searchSourceProvider.id = item.id
    },
    getSource() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          current: this.currentPage,
          size: this.pageSize
        })
        this.loading = true
        getSource(msg).then((res) => {
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

          this.source = respData.records

          // this.dictionarys = respData.records;
          // this.total = respData.total;

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetSource() {
      this.form = {
        id: '',
        name: '',
        inputType: 0,
        provider: {
          restaurants: [],
          state: '',
          id: ''
        },
        api: {
          name: '',
          url: '',
          method: 1,
          agree: 1,
          dataArgument: ''
        },
        source: {
          name: '',
          url: '',
          type: {
            check: '1',
            options: [{
              value: '1',
              label: 'mysql数据库'
            },
            {
              value: '2',
              label: 'oracle数据库'
            }
            ]
          },
          username: '',
          password: '',
          tableName: ''
        },
        requestNum: {
          check: [],
          options: [{
            value: '1',
            label: '手动'
          },
          {
            value: '2',
            label: '自动',
            children: [{
              value: '21',
              label: '5秒'
            },
            {
              value: '24',
              label: '每天'
            },
            {
              value: '22',
              label: '每周'
            },
            {
              value: '22',
              label: '每月'
            }
            ]
          }

          ]
        }

      }
    },
    //
    addSource() {
      this.dialogTitle = '添加数据源'

      this.resetSource()
      // 查询对应服务商
      this.queryProvider()
      this.dialogFormVisible = true
    },
    changeinputType(x) {
      // 输入类型为1 就是代表api，为2就是代表mysql,修改值切换请求方法
      this.submitState = x
    },
    queryProvider() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          providerName: ''
        })
        queryProvider(msg).then((res) => {
          const {
            respData
          } = res
          const new_restaurants = []
          respData.forEach(function(item, index) {
            new_restaurants.push({
              'id': item.id,
              'value': item.providerName
            })
          })
          this.searchSourceProvider.restaurants = new_restaurants
          this.form.provider.restaurants = new_restaurants

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 联想匹配
    querySearch(queryString, cb) {
      var restaurants = this.form.provider.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选中当前服务厂商
    handleSelect(item) {
      this.form.provider.id = item.id
    },
    editTargetType(row) {
      this.dialogTitle = '修改数据源'
      const new_form = Object.assign({}, row)
      this.dialogFormVisible = true

      console.log(new_form)
      this.form.inputType = Number(new_form.datasourceType)

      switch (this.form.inputType) {
        case 0:
          // 修改api 数据源
          this.form = {
            id: new_form.id,
            name: new_form.datasourceName,
            inputType: Number(new_form.datasourceType),
            provider: {
              restaurants: [],
              state: new_form.ov.providerId,
              id: new_form.providerId
            },
            api: {
              name: new_form.apiName,
              url: new_form.apiUrl,
              method: 1,
              agree: 1,
              dataArgument: new_form.apiParameter
            },
            source: {
              name: '',
              url: '',
              type: {
                check: '1',
                options: [{
                  value: '1',
                  label: 'mysql数据库'
                },
                {
                  value: '2',
                  label: 'oracle数据库'
                }
                ]
              },
              username: '',
              password: '',
              tableName: ''

            },
            requestNum: {
              check: [],
              options: [{
                value: '1',
                label: '手动'
              },
              {
                value: '2',
                label: '自动',
                children: [{
                  value: '21',
                  label: '5秒'
                },
                {
                  value: '24',
                  label: '每天'
                },
                {
                  value: '22',
                  label: '每周'
                },
                {
                  value: '22',
                  label: '每月'
                }
                ]
              }

              ]
            }

          }
          this.submitState = 2

          break
        case 1:
          // 修改数据库数据源

          this.form = {
            id: new_form.id,
            name: new_form.datasourceName,
            inputType: Number(new_form.datasourceType),
            provider: {
              restaurants: [],
              state: new_form.ov.providerId,
              id: new_form.providerId
            },
            api: {
              name: '',
              url: '',
              method: 1,
              agree: 1,
              dataArgument: ''
            },
            source: {
              name: new_form.databaseName,
              url: new_form.databaseUrl,
              type: {
                check: '1',
                options: [{
                  value: '1',
                  label: 'mysql数据库'
                },
                {
                  value: '2',
                  label: 'oracle数据库'
                }
                ]
              },
              username: new_form.databaseUsername,
              password: new_form.databasePassword,
              tableName: new_form.databaseTable

            },
            requestNum: {
              check: [],
              options: [{
                value: '1',
                label: '手动'
              },
              {
                value: '2',
                label: '自动',
                children: [{
                  value: '21',
                  label: '5秒'
                },
                {
                  value: '24',
                  label: '每天'
                },
                {
                  value: '22',
                  label: '每周'
                },
                {
                  value: '22',
                  label: '每月'
                }
                ]
              }

              ]
            }

          }
          this.submitState = 3
          break
        default:
      }

      // this.form = Object.assign({}, row);
    },
    delTargetType(row) {
      this.form.id = row.id
      this.submitState = 4
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
          // 添加api 数据源
          return new Promise((resolve, reject) => {
            const new_form = {
              'datasourceName': this.form.name,
              // "providerId": this.form.provider.state,
              'providerId': this.form.provider.id,
              'datasourceType': this.form.inputType,
              'apiName': this.form.api.name,
              'apiUrl': this.form.api.url,
              // "apiProtocol":this.form.api.agree,
              'apiProtocol': 'https',
              'apiParameter': this.form.api.dataArgument,
              'call_Frequency': '自动'
            }
            const msg = JSON.stringify(new_form)
            addSource(msg).then((res) => {
              this.dialogFormVisible = false
              // this.getTargetType();
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 1:
          //  添加数据库数据源
          return new Promise((resolve, reject) => {
            const new_form = {
              'datasourceName': this.form.name,
              // "providerId": this.form.provider.state,
              'providerId': this.form.provider.id,
              'datasourceType': this.form.inputType,
              'databaseName': this.form.source.name,
              'databaseUrl': this.form.source.url,
              'databaseType': 'mysql',
              'databaseUsername': this.form.source.username,
              'databasePassword': this.form.source.password,
              'databaseTable': this.form.source.tableName,
              'call_Frequency': '自动'
            }
            const msg = JSON.stringify(new_form)
            addSource(msg).then((res) => {
              this.dialogFormVisible = false
              // this.getTargetType();
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          // 修改api数据源
          return new Promise((resolve, reject) => {
            const new_form = {
              'id': this.form.id,
              'datasourceName': this.form.name,
              // "providerId": this.form.provider.state,
              'providerId': this.form.provider.id,
              'datasourceType': this.form.inputType,
              'apiName': this.form.api.name,
              'apiUrl': this.form.api.url,
              // "apiProtocol":this.form.api.agree,
              'apiProtocol': 'https',
              'apiParameter': this.form.api.dataArgument,
              'call_Frequency': '自动'
            }
            const msg = JSON.stringify(new_form)
            editSource(msg).then((res) => {
              this.dialogFormVisible = false

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        case 3:
          // 修改数据库数据源
          return new Promise((resolve, reject) => {
            const new_form = {
              'id': this.form.id,
              'datasourceName': this.form.name,
              // "providerId": this.form.provider.state,
              'providerId': this.form.provider.id,
              'datasourceType': this.form.inputType,
              'databaseName': this.form.source.name,
              'databaseUrl': this.form.source.url,
              'databaseType': 'mysql',
              'databaseUsername': this.form.source.username,
              'databasePassword': this.form.source.password,
              'databaseTable': this.form.source.tableName,
              'call_Frequency': '自动'
            }
            const msg = JSON.stringify(new_form)
            editSource(msg).then((res) => {
              this.dialogFormVisible = false
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 4:
          return new Promise((resolve, reject) => {
            const new_form = {
              id: this.form.id
            }
            const msg = JSON.stringify(new_form)
            delSource(msg).then((res) => {
              this.dialogFormVisible = false
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },
    // 搜索数据源
    searchSource() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          current: this.currentPage,
          size: this.pageSize,
          datasourceName: this.serverSearch,
          datasourceType: this.searchSourceType.check,
          providerId: this.searchSourceProvider.id
        })
        getSource(msg).then((res) => {
          const {
            respData
          } = res
          this.source = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分页
    TargetTypeChange(page) {
      this.currentPage = page
      this.getSource()
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
<style scoped>
  .demo-table-expand {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

</style>
