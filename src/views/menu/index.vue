<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="batchDel">删除</el-button>
      <!-- <el-button>导出</el-button> -->
    </div>


    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange" row-key="id" :tree-props="{children: 'children'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180" align="left">
        </el-table-column>


        <el-table-column prop="router_compent" label="vue组件名称" width="180" align="left" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column prop="path" label="vue组件路径" width="180" align="left" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column prop="router" label="vue组件路由" width="180" align="right" :formatter="Tableformatter">
        </el-table-column>


        <el-table-column prop="rp_id" label="上层菜单" width="180" align="right" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" align="right" :formatter="Tableformatter">
        </el-table-column>



        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" background
        :total="total" @current-change="currentChange">
      </el-pagination>
    </div>

    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="菜单名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="vue前端组件:">
          <el-input v-model="form.router_compent"></el-input>
        </el-form-item>


        <el-form-item label="vue组件路径:">
          <el-input v-model="form.path"></el-input>
        </el-form-item>

        <el-form-item label="vue组件路由:">
          <el-input v-model="form.router"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单:">
          <treeselect :options="menus" :value="form.p_id" @select="select_menu" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    findAll,
    findAllMenu,
    create,
    update,
    del,
    batchDel
  } from "@/api/menu.js";
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import qs from 'query-string';
  export default {
    data() {
      return {
        search: {
          time: "",
          name: ""
        },
        multipleSelection: [],
        form: {
          id: "",
          name: "",
          path: "",
          router_compent: "",
          p_id: 0,
          router: "",
        },
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total: 400,
        dialogVisible: false,
        menus: []

      }
    },
    components: {
      Treeselect
    },
    mounted() {
      this.findAll();
    },
    methods: {
      get_tree(data) {
        let cloneData = JSON.parse(JSON.stringify(data))
        return cloneData.filter(parent => {
          let branchArr = cloneData.filter(child => parent['id'] == child['p_id']);
          branchArr.length > 0 ? parent['children'] = branchArr : '';
          return parent['p_id'] == 0;
        })
      },

      get_tree_all(data) {
        let first_menu = this.get_tree(data);
        let new_menus = [{
          id: 0,
          p_id: 0,
          label: "顶级菜单",
          children: first_menu
        }];
        return new_menus
      },

      findAllMenu() {
        return new Promise((resolve, reject) => {
          findAllMenu().then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              let new_list = data.map((el, index) => {
                return {
                  id: el.id,
                  label: el.name,
                  path: el.path,
                  router_compent: el.router_compent,
                  p_id: el.p_id,
                  router: el.role_router,
                  createdAt: el.createdAt
                }
              });

              this.menus=this.get_tree_all(new_list);


            }

          })
        })

      },
      select_menu(node, instanceId) {

        this.form.p_id = node.p_id;

      },
      Tableformatter(row, column, cellValue, index) {
        if (cellValue == "" || cellValue == null || cellValue == undefined) {
          return "字段为空值"
        } else {
          return cellValue
        }
      },
      // 按照固定条件搜索
      searchList() {
        console.log("进入搜索");
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        return new Promise((resolve, reject) => {
          findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              let new_list = data.rows.map((el, index) => {
                return {
                  id: el.id,
                  name: el.name,
                  path: el.path,
                  router_compent: el.router_compent,
                  p_id: el.p_id,
                  router: el.role_router,
                  createdAt: el.createdAt
                }
              })
              this.get_tree(new_list);
              this.total = data.count;
            } else {
              this.$message("获取分页失败")
            }

          })
        })


      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 批量删除
      batchDel() {
        let msg_del_before = this.multipleSelection.map((el, index) => {
          return {
            id: el.id
          }
        });
        let msg_del_after = [];
        msg_del_before.forEach((el, index) => {
          msg_del_after.push(el.id)
        });
        let msg = qs.stringify({
          batchList: msg_del_after
        });
        batchDel(msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.findAll();

          } else {
            this.$message("批量删除失败")
          }

        })
      },
      findAll() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        return new Promise((resolve, reject) => {
          findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              let new_list = data.rows.map((el, index) => {
                return {
                  id: el.id,
                  name: el.name,
                  path: el.path,
                  router_compent: el.router_compent,
                  p_id: el.p_id,
                  router: el.role_router,
                  createdAt: el.createdAt
                }
              })
              this.tableData = this.get_tree(new_list);
              this.total = data.count;
            } else {
              this.$message("获取分页失败")
            }

          })
        })

      },
      handleAdd() {
        this.cleanRow();
        this.findAllMenu();
        this.dialogVisible = true;
        this.submitState = 0;
      },
      // 进行编辑
      handleEdit(index, row) {
        this.findAllMenu();
        this.dialogVisible = true;
        this.submitState = 1;
        let new_row = Object.assign({}, row);
        this.form.id = new_row.id;
        this.form.name = new_row.name;
        this.form.path = new_row.path;
        this.form.router_compent = new_row.router_compent;
        this.form.router = new_row.router;


      },
      cleanRow() {
        for (let key in this.form) {
          if (key != "p_id") {
            this.form[key] = '';

          }



        }
      },
      // 进行删除
      handleDelete(index, row) {
        let msg_del = qs.stringify({
          id: row.id
        });
        del(msg_del).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.dialogVisible = false;
            // 刷新表格
            this.findAll();
          } else {
            this.messages("删除失败")
          }

        })

      },
      // 当前页发生改变
      handleCurrentChange() {

      },
      submit() {
        switch (this.submitState) {
          case 0:
            console.log("开始")

            let msg_create = qs.stringify({
              name: this.form.name,
              path: this.form.path,
              router_compent: this.form.router_compent,
              p_id: this.form.p_id,
              role_router: this.form.router
            });
            create(msg_create).then((res) => {
              let {
                articleType,
                code
              } = res;
              if (code == "200") {
                this.dialogVisible = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("新增失败")
              }

            })
            break;
          case 1:

            let msg_updata = qs.stringify({
              id: this.form.id,
              name: this.form.name,
              path: this.form.path,
              router_compent: this.form.router_compent,
              p_id: this.form.p_id,
              role_router: this.form.router
            });
            update(msg_updata).then((res) => {
              let {
                articleType,
                code
              } = res;
              if (code == "200") {
                this.dialogVisible = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("修改失败")
              }

            })
            break;
          default:
            this.$message("操作异常")

        }

      },
      handleClose() {
        this.dialogVisible = false;
      },
      currentChange(page) {
        this.currentPage = page;
        this.findAll();
      }
    }
  }

</script>
<style lang="scss" scoped>
  .table-wrap {
    width: 100%;
    padding: 90px 60px;
    color: #555555;
    background-color: #fff;

    .table-handle-btns {
      width: 100%;
      height: 50px;

    }

    .search {

      width: 100%;
      height: 50px;

      .demonstration {
        display: inline-block;
        width: 80px;
        height: 40px;
        margin-right: 10px;
      }

      .search-name {
        width: 240px;
      }

    }

    .table-main {
      width: 100%;

    }

    .page-nation {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      text-align: center;

    }
  }

</style>
