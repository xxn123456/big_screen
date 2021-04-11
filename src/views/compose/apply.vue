<template>
  <!-- 服务商应用 -->
  <div class="friend-warp">
    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-select v-model="menu.check" placeholder="请选择" @change="applyMenuSelect">
          <el-option v-for="item in menu.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search" @click="searchApply">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addApply" />
      </div>
    </div>
    <div class="cont">
      <el-table v-loading="loading" :data="friendPacks" align="center" header-align="center">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />
        <el-table-column type="expand" label="详情">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 应用信息 -->
              <el-form-item label="应用id">
                <span>{{ props.row.id }}</span>
              </el-form-item>

              <el-form-item label="应用名称">
                <span>{{ props.row.packName }}</span>
              </el-form-item>

              <el-form-item label="应用创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="应用更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
              <!-- 组件模块 -->
              <el-form-item label="组件id">
                <span>{{ props.row.ov.compent.compentId }}</span>
              </el-form-item>
              <el-form-item label="组件类别">
                <span>{{ props.row.ov.compent.compentType }}</span>
              </el-form-item>

              <el-form-item label="组件名称">
                <span>{{ props.row.ov.compent.compentName }}</span>
              </el-form-item>

              <el-form-item label="组件">
                <span>{{ props.row.ov.compent.compentPath }}</span>
              </el-form-item>

              <el-form-item label="指标名称">
                <span>{{ props.row.compentOption }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="packName" label="应用名称" />

        <el-table-column prop="ov.compent.compentName" label="组件名称" />

        <el-table-column label="对应指标">

          <template slot-scope="scope">

            <div class="pack-chart-option">
              <el-tag v-for="item in scope.row.ov.checkIndicators" :key="item.index">{{ item.label }}</el-tag>
            </div>
          </template>

        </el-table-column>

        <!-- <el-table-column prop="compentOption" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.compentOption!=null"><i class="el-icon-check"></i></span>
            <span v-else><i class="el-icon-close"></i></span>
          </template>
        </el-table-column> -->

        <el-table-column prop="compentOption" label="调用频率">
          <template slot-scope="scope">
            <span>每天</span>
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="修改时间" />

        <el-table-column fixed="right" label="应用调整" width="240">
          <template slot-scope="scope">
            <div class="chart-change">
              <!-- <div>
                   <el-button type="text" @click="changePackOption(scope.row)" icon="el-icon-magic-stick" size="small"> 样式调整</el-button>
              </div> -->
              <!-- <div>
                   <el-button type="text" @click="setUnit(scope.row)" icon="el-icon-coordinate" size="small">生成应用</el-button>
              </div> -->
              <div>
                <el-button type="text" icon="el-icon-data-analysis" size="small" @click="previewChart(scope.row)">应用预览</el-button>
              </div>

            </div>

          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="editApply(scope.row)"> 修改</el-button>
            <el-button type="text" @click="delApply(scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">

      <el-pagination background layout="prev, pager, next" :total="total" @current-change="applyChange" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="应用名称:" :label-width="formLabelWidth">
          <el-input v-model="form.packName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="组件:" :label-width="formLabelWidth">
          <el-cascader v-model="form.compent.check" :options="form.compent.option" />
        </el-form-item>

        <el-form-item label="指标项:" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="form.target.state"
            class="inline-input"
            :fetch-suggestions="sourceRule"
            placeholder="请输入指标项名称"
            @select="handleSearch"
          >
            <i slot="suffix" class="el-icon-delete el-input__icon" @click="removeTargetSearch" />
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="选中值:" :label-width="formLabelWidth">
          <el-tag v-for="(tag,index) in form.target.checks" :key="tag.id" closable @close="closeTag(index)">
            {{ tag.value }}
          </el-tag>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 应用调整 -->

    <el-dialog :title="dialogTitle" :visible.sync="packDialogOptionChange" width="60%">
      <!-- 图表配置调整 -->
      <div class="pack-option-change">

        <div class="left">
          <component :is="packOld.ov.compent.compentPath" :option="packOld.compentOption" />
        </div>

        <div class="right">

          <el-collapse v-model="activeNames">
            <el-collapse-item title="背景" name="1">
              <el-form>
                <el-form-item label="背景颜色:" :label-width="formLabelWidth">
                  <el-input v-model="chartOptionForm.bgColor" autocomplete="off" />
                </el-form-item>
              </el-form>

            </el-collapse-item>
            <el-collapse-item title="标题" name="2">
              <el-form>
                <el-form-item label="背景颜色:" :label-width="formLabelWidth">
                  <el-radio-group v-model="chartOptionForm.titleOption.check">
                    <el-radio v-for="item in chartOptionForm.titleOption.options" :key="item.index" :label="item.id">
                      {{ item.label }}

                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>

            </el-collapse-item>
            <el-collapse-item title="风格" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="x轴" name="4">
              <el-form>
                <el-form-item label="刻度线:" :label-width="formLabelWidth">
                  <el-input v-model="chartOptionForm.bgColor" autocomplete="off" />
                </el-form-item>
                <el-form-item label="轴线线:" :label-width="formLabelWidth">
                  <el-input v-model="chartOptionForm.bgColor" autocomplete="off" />
                </el-form-item>
              </el-form>

            </el-collapse-item>
            <el-collapse-item title="y轴" name="5">
              <el-form>
                <el-form-item label="刻度线:" :label-width="formLabelWidth">
                  <el-input v-model="chartOptionForm.bgColor" autocomplete="off" />
                </el-form-item>
                <el-form-item label="轴线线:" :label-width="formLabelWidth">
                  <el-input v-model="chartOptionForm.bgColor" autocomplete="off" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>

        </div>
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
  getApplys,
  getApplyMenu,
  addApply,
  editApply,
  delApply,
  queryApplyCompent,
  queryApplyCompentById,
  queryApplyTarget,
  queryApplyTargetById,
  applyProdChart
} from '@/api/compose.js'
import querystring from 'querystring'
export default {
  filters: {
    ellipsisOption: function(value) {
      // console.log(value);
      if (value != undefined) {
        const new_value = value.substring(0, 100)
        return new_value + '....'
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      serverSearch: '',
      menu: {
        check: '',
        options: []
      },
      friendPacks: [],
      // 弹窗相关字段
      dialogFormVisible: false,
      packDialogOptionChange: false,
      // 应用调整信息
      packOld: {
        compentOption: null,
        ov: {
          compent: {
            compentPath: null
          }
        }

      },
      activeNames: null,
      // 应用配置项
      chartOptionForm: {
        bgColor: '',
        titleOption: {
          check: '2',
          options: [{
            id: '1',
            label: '居左'
          },
          {
            id: '2',
            label: '居中'
          },
          {
            id: '3',
            label: '居右'
          }
          ]
        }
      },
      dialogTitle: '',
      formLabelWidth: '120px',
      form: {
        packName: '',
        targetItemName: '',
        compent: {
          check: [],
          option: [{
            value: '1',
            label: '按年统计'
          },
          {
            value: '2',
            label: '按月统计'
          }
          ]
        },
        target: {
          checks: [],
          restaurants: [],
          state: '',
          id: ''
        },
        targetItem: {
          check: '',
          option: [{
            value: '1',
            label: '按年统计'
          },
          {
            value: '2',
            label: '按月统计'
          }
          ]
        }
      },
      chartForm: {
        packId: null,
        option: null
      },
      submitState: 0,
      // 组件类别
      compentTypeString: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    // 获取所有应用
    this.getApplys()
    // 获取所有应用菜单
    this.getApplyMenu()
  },
  methods: {

    getApplys() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize
        })
        this.loading = true
        getApplys(msg).then((res) => {
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
          this.friendPacks = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取菜单并且根据菜单进行选择数据
    getApplyMenu() {
      return new Promise((resolve, reject) => {
        getApplyMenu().then((res) => {
          const {
            respData
          } = res
          this.menu = respData
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    applyMenuSelect() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'menuId': this.menu.check
        })
        this.loading = true
        getApplys(msg).then((res) => {
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
          this.friendPacks = respData.records
          this.total = respData.total

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addApply() {
      this.form = {
        packName: '',
        targetItemName: '',
        compent: {
          check: [],
          option: []
        },
        target: {
          checks: [],
          restaurants: [],
          state: '',
          id: ''
        },
        targetItem: {
          check: '',
          option: []
        }
      }
      this.queryApplyCompent()
      this.queryApplyTarget()
      this.dialogTitle = '添加应用'
      this.dialogFormVisible = true
      this.submitState = 0
    },
    sourceRule(queryString, cb) {
      var restaurants = this.form.target.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSearch(item) {
      this.form.target.id = item.id
      this.form.target.checks.push(item)
    },
    // 删除所有搜素内容
    removeTargetSearch() {
      this.form.target.state = ''
    },

    queryApplyCompent() {
      return new Promise((resolve, reject) => {
        queryApplyCompent().then((res) => {
          const {
            respData
          } = res
          console.log(respData)
          this.form.compent.option = respData.option

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 搜素所有指标项目
    queryApplyTarget() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          queryName: ''
        })

        queryApplyTarget(msg).then((res) => {
          console.log(res)
          const {
            respData
          } = res
          const new_restaurants = []
          respData.forEach(function(item, index) {
            new_restaurants.push({
              'id': item.id,
              'value': item.indicatorName
            })
          })
          this.form.target.restaurants = new_restaurants

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    closeTag(targetIndex) {
      this.form.target.checks.splice(targetIndex, 1)
    },

    editApply(row) {
      this.dialogTitle = '修改应用'
      this.dialogFormVisible = true
      this.queryApplyCompentById(row.id)

      this.form.id = row.id
      const applyCell = Object.assign({}, row)
      this.form.packName = applyCell.packName

      const checkTargets = applyCell.ov.checkIndicators
      const new_check = []
      checkTargets.forEach((item, index) => {
        new_check.push({
          id: item.id,
          value: item.label
        })
      })
      this.form.target.checks = new_check
      this.submitState = 1
    },
    queryApplyCompentById(id) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'packId': id
        })
        queryApplyCompentById(msg).then((res) => {
          const {
            respData
          } = res
          this.form.compent = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryApplyTargetById(id) {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'packId': id
        })
        queryApplyTargetById(msg).then((res) => {
          const {
            respData
          } = res
          this.form.target = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    delApply(packId) {
      this.submitState = 2
      this.form.id = packId
      this.handleSubmit()
    },
    addProTableRow() {
      this.tableUnitForm.option.push({
        label: ''
      })
    },
    removeProTableRow() {
      this.tableUnitForm.option.pop()
    },
    // 配置应用option
    changePackOption(row) {
      this.packDialogOptionChange = true
      this.packOld = Object.assign({}, row)
      console.log(this.packOld)
    },

    // 生成应用模块
    setUnit(row) {
      console.log(row)
      this.chartForm.packId = row.id
      this.chartForm.option = row.compentOption
      this.submitState = 4

      this.handleSubmit()
    },
    handleSubmit() {
      switch (this.submitState) {
        case 0:
          return new Promise((resolve, reject) => {
            const new_targetIds = []
            const hasCheckTargstId = this.form.target.checks
            hasCheckTargstId.forEach((item, index) => {
              new_targetIds.push(item.id)
            })
            const msg = JSON.stringify({
              'packName': this.form.packName,
              'compentIdList': this.form.compent.check,
              'targetId': new_targetIds.toString()
            })
            addApply(msg).then((res) => {
              this.dialogFormVisible = false
              this.getApplys()

              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
          // 添加应用
        case 1:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify({
              'id': this.form.id,
              'packName': this.form.packName,
              'compentIdList': this.form.compent.check,
              'menuIndexIdList': this.form.target.check
            })
            editApply(msg).then((res) => {
              this.dialogFormVisible = false
              this.getApplys()
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
            delApply(msg).then((res) => {
              this.getApplys()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 4:
          return new Promise((resolve, reject) => {
            // let msg = JSON.stringify(this.chartForm);

            const msg = {
              packId: this.chartForm.packId,
              option: this.chartForm.option
            }

            applyProdChart(msg).then((res) => {
              const {
                respCode
              } = res
              if (respCode == '10000') {
                const h = this.$createElement
                this.$notify({
                  title: 'success',
                  message: h('i', {
                    style: 'color: teal'
                  }, '生成应用成功')
                })
                this.proChartDialog = false
              }
              this.getApplys()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        default:
      }
    },

    applyChange(page) {
      console.log('执行翻页')
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': page,
          'pageSize': this.pageSize,
          'menuId': this.menu.check
        })
        this.loading = true
        getApplys(msg).then((res) => {
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
          this.friendPacks = respData.records
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    searchApply() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'packName': this.serverSearch,
          'menuId': this.menu.check
        })

        getApplys(msg).then((res) => {
          const {
            respData
          } = res

          this.friendPacks = respData.records
          this.total = respData.total
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    previewChart(row) {
      this.$router.push({
        path: '/compose/test',
        query: {
          applyId: row.id
        }
      })
    }
  }

}

</script>

<style scoped>
  .el-tag+.el-tag {
    margin-top: 10px;
  }
  .chart-change{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pack-chart-option{
    display: flex;
    flex-direction: column;
    width: 80%;

  }

</style>
<style lang="scss" scoped>
  .friend-warp {
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

      .demo-table-expand {

        .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }
      }

      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
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

    .pack-option-change {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;

      .left {
        width: 50%;
        height: 300px;
        background-color: #090e4e;
        padding: 30px 15px;

      }

      .right {
        width: calc(50% - 30px);
        padding-left: 30px;
        height: 100%;
      }
    }
  }

</style>
