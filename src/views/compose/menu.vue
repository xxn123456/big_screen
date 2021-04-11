<template>
  <div class="menu-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <!-- <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
      </div>
      <div class="search-main">

        <el-button type="success" icon="el-icon-plus" size="small" @click="addMenu" />

      </div>

    </div>
    <div class="cont">
      <el-table
        v-loading="loading"
        :data="menuData"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="menuName" label="菜单名称" />

        <el-table-column prop="menuIcon" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="menuType" label="类别">

          <template slot-scope="scope">
            <!-- 判断是否为 -->
            <span v-show="scope.row.menuType=='C'">菜单</span>
            <span v-show="scope.row.menuType=='M'">目录</span>
          </template>

        </el-table-column>

        <el-table-column prop="menuSort" label="排序" :sortable="true" :sort-method="sortMenuByNum" />

        <el-table-column prop="menuShow" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isShow" :disabled="true" />
          </template>

        </el-table-column>

        <el-table-column prop="menuPath" label="组件路径" />

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editMenu(scope.row)">修改
            </el-button>
            <el-button size="mini" type="text" :disabled="scope.row.orderNum!=1" @click="addMenuMu(scope.row)">新增
            </el-button>
            <el-button size="mini" type="text" @click="removeMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 添加菜单 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">

          <span>{{ form.catetory }}</span>

        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.menuType" @change="getMenuTypeCheck">
            <el-radio label="M">目录</el-radio>
            <el-radio label="C">菜单</el-radio>

          </el-radio-group>

        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">

          <el-input v-model="form.menuName" placeholder="请输入内容" />

        </el-form-item>

        <el-form-item label="菜单图标" :label-width="formLabelWidth">

          <el-input v-model="form.icon" placeholder="请输入内容" />

        </el-form-item>

        <el-form-item label="排序" :label-width="formLabelWidth">

          <el-input-number v-model="form.menuSort" :min="1" :max="9" label="描述文字" />

        </el-form-item>

        <el-form-item label="组件url" :label-width="formLabelWidth">

          <el-input v-model="form.menuPath" placeholder="请输入内容" />

        </el-form-item>
        <el-form-item label="组件路径" :label-width="formLabelWidth">
          <el-input v-model="form.component" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="是否可见" :label-width="formLabelWidth">

          <el-switch v-model="form.isShow" />

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMenuHand">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getMenu,
  addMenu,
  editMenu,
  removeMenu,
  getTopMenu
} from '@/api/compose.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogTitle: '',
      form: {
        // 上级目录

        parentId: 0,
        menuType: 'M',
        menuSort: null,
        icon: 'el-icon-edit',
        menuName: '新建菜单',
        orderNum: 0,
        // 路由地址
        menuPath: '/asy',
        // 菜单地址
        component: 'layout/index',
        isShow: ''

      },
      // 表单校验规则

      menuChirdrenId: 0,
      formLabelWidth: '100px',
      serverSearch: '',
      // 菜单列表结构
      menuData: [],
      submitType: 2,
      loading: true
    }
  },
  mounted() {
    // 获取菜单列表
    this.getMenu()
  },

  methods: {
    // 获取菜单
    getMenu() {
      return new Promise((resolve, reject) => {
        this.loading = true
        getMenu().then((res) => {
          const {
            respData
          } = res
          this.menuData = respData
          this.loading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取上级目录

    // 添加目录
    addMenu() {
      this.dialogTitle = '添加目录'
      this.dialogFormVisible = true
      // 新增目录
      this.form = {
        parentId: 0,
        menuType: 'M',
        menuSort: 1,
        catetory: '顶级目录'
      }
      this.submitType = 0
    },
    // 编辑菜单
    editMenu(row) {
      this.dialogTitle = '修改'
      this.dialogFormVisible = true
      const menuTableRow = Object.assign({}, row)
      const newFrom = {
        'id': menuTableRow.menuId,
        'menuName': menuTableRow.menuName,
        'parentId': menuTableRow.parentId,
        'menuType': menuTableRow.menuType,
        'menuPath': menuTableRow.menuPath,
        'component': menuTableRow.component,
        'icon': menuTableRow.icon,
        // 菜单级别 1代表目录 2代表菜单
        'orderNum': menuTableRow.orderNum,
        // 菜单排序生成id
        'menuSort': menuTableRow.menuSort,
        'isShow': menuTableRow.isShow
      }
      this.form = newFrom
      this.submitType = 1
    },
    // 删除菜单
    removeMenu(row) {
      return new Promise((resolve, reject) => {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const menuDelId = JSON.stringify({
            'menuId': row.menuId
          })
          removeMenu(menuDelId).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getMenu()
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })
    },
    // 新增菜单
    addMenuMu(row) {
      this.form = {}
      const new_row = Object.assign({}, row)
      this.form.catetory = new_row.menuName
      this.dialogTitle = '添加菜单'
      this.dialogFormVisible = true
      this.form.menuType = 'C'
      this.form.parentId = new_row.menuId

      this.submitType = 3

      console.log('进行新增菜单或者目录')
    },
    submitMenuHand() {
      // console.log(this.form);
      switch (this.submitType) {
        case 0:
          // 新增目录

          return new Promise((resolve, reject) => {
            if (this.form.menuType == 'M') {
              this.form.orderNum = 1
            } else {
              this.form.orderNum = 2
            }
            let hidden
            if (this.form.isShow == 0) {
              hidden = 0
            } else {
              hidden = 1
            }
            console.log('新增菜单')
            const msg = JSON.stringify({
              'menuName': this.form.menuName,
              'parentId': 0,
              'menuType': this.form.menuType,
              'menuPath': this.form.menuPath,
              'component': this.form.component,
              'icon': this.form.icon,
              // 菜单级别 1代表目录 2代表菜单
              'orderNum': this.form.orderNum,
              // 菜单排序生成id
              'menuSort': this.form.menuSort,
              'isShow': hidden
            })
            addMenu(msg).then((res) => {
              const {
                respData
              } = res
              this.dialogFormVisible = false
              this.getMenu()
              resolve()
            }).catch(error => {
              console.log('新增失败')
              reject(error)
            })
          })
          break
        case 1:
          // 修改
          return new Promise((resolve, reject) => {
            let hidden
            if (this.form.isShow == true) {
              hidden = 0
            } else {
              hidden = 1
            }
            const msg = JSON.stringify({
              'id': this.form.id,
              'menuName': this.form.menuName,
              'parentId': this.form.parentId,
              'menuType': this.form.menuType,
              'menuPath': this.form.menuPath,
              'component': this.form.component,
              'icon': this.form.icon,
              // 菜单级别 1代表目录 2代表菜单
              'orderNum': this.form.orderNum,
              // 菜单排序生成id
              'menuSort': this.form.menuSort,
              'isShow': hidden
            })
            editMenu(msg).then((res) => {
              const {
                respData
              } = res
              this.dialogFormVisible = false
              this.getMenu()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 2:
          return new Promise((resolve, reject) => {
            const msg = JSON.stringify(this.form)
            addMenu(msg).then((res) => {
              const {
                respData
              } = res
              this.dialogFormVisible = false
              this.getMenu()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
          break
        case 3:
          return new Promise((resolve, reject) => {
            if (this.form.menuType == 'M') {
              this.form.orderNum = 1
            } else {
              this.form.orderNum = 2
            }
            let hidden
            if (this.form.isShow == true) {
              hidden = 0
            } else {
              hidden = 1
            }
            console.log('新增菜单')
            const msg = JSON.stringify({
              'menuName': this.form.menuName,
              'parentId': this.form.parentId,
              'menuType': this.form.menuType,
              'menuPath': this.form.menuPath,
              'component': this.form.component,
              'icon': this.form.icon,
              // 菜单级别 1代表目录 2代表菜单
              'orderNum': this.form.orderNum,
              // 菜单排序生成id
              'menuSort': this.form.menuSort,
              'isShow': hidden
            })
            addMenu(msg).then((res) => {
              const {
                respData
              } = res
              this.dialogFormVisible = false
              this.getMenu()
              resolve()
            }).catch(error => {
              console.log('新增失败')
              reject(error)
            })
          })
          break

        default:
            // 失败
      }
    },
    handleClick(row) {
      console.log(row)
    },
    getParen(id) {
      console.log('1' + '1')
    },
    // 添加菜单
    sortMenuByNum(a, b) {
      return a - b
    },

    getMenuTypeCheck() {
      console.log(this.form.checkList)
    }
  }
}

</script>
<style lang="scss" scoped>
  .menu-warp {
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
